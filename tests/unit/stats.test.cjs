/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS hook compiles the actual TS modules in this Node-only test harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const ts = require('typescript');

// Compile the actual small, dependency-free TS modules in memory. No browser or app server required.
require.extensions['.ts'] = (mod, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  });
  mod._compile(outputText, filename);
};

process.env.STATS_TIMEZONE = 'Asia/Ho_Chi_Minh';

const { toStatsEvent } = require('../../src/lib/stats/collect.ts');
const { aggregate, demoFunnel } = require('../../src/lib/stats/aggregate.ts');
const now = Date.parse('2026-11-15T10:00:00Z');
const context = { now, userAgent: 'Mozilla/5.0 Chrome/120.0', country: 'VN', host: 'elynto.io' };
const input = { type: 'demo', stage: 'view', visitor: 'visitor-0001', visit: 'visit-000001', path: '/vi' };
const event = (type, extra = {}) => toStatsEvent({ ...input, type, ...extra }, context);

test('collector rejects unsupported milestones and invalid identities', () => {
  for (const stage of [null, 'registered', 'signup_success', '', 1]) {
    assert.equal(toStatsEvent({ ...input, stage }, context), null);
  }
  assert.equal(toStatsEvent({ ...input, visitor: 'bad' }, context), null);
  assert.equal(toStatsEvent({ ...input, type: 'registration' }, context), null);
});

test('collector keeps only milestone metadata and strips command content and URL parameters', () => {
  const stored = toStatsEvent({ ...input, path: '/vi?email=private#work', command: 'confidential', email: 'private', cta: 'signup', location: 'hero', work: { title: 'secret' } }, context);
  assert.equal(stored.path, '/vi');
  assert.equal(stored.stage, 'view');
  for (const key of ['command', 'email', 'work', 'cta', 'location', 'occurredAt']) assert.equal(key in stored, false);
  assert.equal(event('cta', { cta: 'signup' }).stage, undefined);
});

test('clock bounds preserve valid beacon order and reject arbitrary dates', () => {
  assert.equal(toStatsEvent({ ...input, occurredAt: now - 100 }, context).ts, now - 100);
  for (const occurredAt of [0, Infinity, NaN, now - 300001, now + 300001, 'yesterday']) {
    assert.equal(toStatsEvent({ ...input, occurredAt }, context).ts, now);
  }
});

test('complete demo counts each visit once despite replay, duplicate and reordered delivery', () => {
  const sequence = [
    event('demo', { stage: 'view', occurredAt: now - 3000 }),
    event('demo', { stage: 'work_card', occurredAt: now - 2000 }),
    event('demo', { stage: 'work_list', occurredAt: now - 1000 }),
    event('cta', { cta: 'signup' }),
  ];
  const unordered = [...sequence, ...sequence].reverse();
  assert.deepEqual(demoFunnel(unordered), { demoViews: 1, workCards: 1, workLists: 1, signupAfterDemo: 1 });
  assert.deepEqual(demoFunnel([event('cta', { cta: 'signup' }), event('demo', { stage: 'work_list' }), event('demo', { stage: 'work_card' }), event('demo')]), { demoViews: 1, workCards: 1, workLists: 1, signupAfterDemo: 1 });
});

test('skipped stages, early signup clicks and separate visits do not complete the funnel', () => {
  const rows = [
    event('cta', { cta: 'signup', occurredAt: now - 4000 }),
    event('demo', { stage: 'view', occurredAt: now - 3000 }),
    event('demo', { stage: 'work_list', occurredAt: now - 2000 }),
    event('demo', { stage: 'work_card', visit: 'visit-000002', occurredAt: now - 1000 }),
  ];
  assert.deepEqual(demoFunnel(rows), { demoViews: 1, workCards: 0, workLists: 0, signupAfterDemo: 0 });
});

test('older pageview/CTA records retain totals; demo never becomes a registration or pageview', () => {
  const old = [event('pageview', { isNewVisitor: true }), event('cta', { cta: 'signup', location: 'hero' })];
  const report = aggregate([...old, event('demo')], '2026-11-14', '2026-11-16', 'day');
  assert.equal(report.totals.pageviews, 1);
  assert.equal(report.totals.signupClicks, 1);
  assert.equal(report.totals.signupVisitors, 1);
  assert.equal(report.totals.signupAfterDemo, 0);
  assert.equal(report.totals.demoViews, 1);
  assert.equal(report.periods.length, 3);
  assert.equal(report.periods[0].demoViews, 0);
  assert.equal(report.periods[1].demoViews, 1);
  assert.equal(report.periods[2].demoViews, 0);
  assert.equal('registrations' in report.totals, false);
  assert.equal(aggregate(old, '2026-11-16', '2026-11-16', 'month').totals.demoViews, 0);
});

test('client honors opt-out, DNT and GPC before storing an ID or sending demo events', async () => {
  const data = new Map();
  const sent = [];
  const keys = ['window', 'document', 'navigator'];
  const original = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const navigatorMock = { maxTouchPoints: 0, sendBeacon: (_, blob) => { sent.push(blob); return true; } };
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { localStorage: { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) }, location: { pathname: '/vi' } } });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { documentElement: { lang: 'vi' } } });
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: navigatorMock });
  try {
    const client = require('../../src/lib/stats/client.ts');
    client.setStatsOptOut(true);
    client.recordDemoStage('view');
    assert.equal(data.has('elynto-vid'), false);
    client.setStatsOptOut(false);
    navigatorMock.doNotTrack = '1';
    client.recordDemoStage('work_card');
    navigatorMock.doNotTrack = '0';
    navigatorMock.globalPrivacyControl = true;
    client.recordDemoStage('work_list');
    assert.equal(sent.length, 0);
    navigatorMock.globalPrivacyControl = false;
    client.recordDemoStage('view');
    const payload = JSON.parse(await sent[0].text());
    assert.equal(payload.type, 'demo');
    assert.equal(payload.stage, 'view');
    assert.equal(payload.path, '/vi');
    assert.equal(payload.lang, 'vi');
    assert.equal(typeof payload.occurredAt, 'number');
    assert.ok(payload.visitor);
    assert.equal('command' in payload, false);
  } finally {
    for (const key of keys) {
      if (original.get(key)) Object.defineProperty(globalThis, key, original.get(key));
      else delete globalThis[key];
    }
  }
});

test('signup and login use distinct verified routes, including older beta-root overrides', () => {
  const keys = ['NEXT_PUBLIC_SIGNUP_URL', 'NEXT_PUBLIC_LOGIN_URL'];
  const original = new Map(keys.map(key => [key, process.env[key]]));
  const filename = require.resolve('../../src/config/site.ts');
  const load = () => { delete require.cache[filename]; return require(filename).siteConfig; };
  try {
    delete process.env.NEXT_PUBLIC_SIGNUP_URL;
    delete process.env.NEXT_PUBLIC_LOGIN_URL;
    assert.equal(load().signupUrl, 'https://beta.elynto.io/sign-up');
    assert.equal(load().loginUrl, 'https://beta.elynto.io/sign-in');
    process.env.NEXT_PUBLIC_SIGNUP_URL = 'https://beta.elynto.io/?ref=landing';
    process.env.NEXT_PUBLIC_LOGIN_URL = 'https://beta.elynto.io';
    assert.equal(load().signupUrl, 'https://beta.elynto.io/sign-up?ref=landing');
    assert.equal(load().loginUrl, 'https://beta.elynto.io/sign-in');
    process.env.NEXT_PUBLIC_SIGNUP_URL = 'https://beta.elynto.io/custom-onboarding';
    assert.equal(load().signupUrl, 'https://beta.elynto.io/custom-onboarding');
  } finally {
    for (const key of keys) {
      if (original.get(key) === undefined) delete process.env[key];
      else process.env[key] = original.get(key);
    }
    delete require.cache[filename];
  }
});
