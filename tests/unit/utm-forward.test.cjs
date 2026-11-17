/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS hook compiles the actual TS module in this Node-only test harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const ts = require('typescript');

require.extensions['.ts'] = (mod, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  });
  mod._compile(outputText, filename);
};

const {
  APP_HOSTS,
  FIRST_TOUCH_KEY,
  FIRST_TOUCH_MAX_AGE_MS,
  MAX_VALUE_LENGTH,
  UTM_KEYS,
  utmForwardBoot,
  utmForwardBootScript,
} = require('../../src/lib/utm-forward.ts');
const {
  STATS_CHOICE_EVENT,
  STATS_CONSENT_KEY,
  STATS_CONSENT_NO,
  STATS_CONSENT_YES,
  STATS_OPT_OUT_KEY,
} = require('../../src/lib/stats/client.ts');

// The settings the layout passes (src/app/[lang]/layout.tsx).
const config = {
  appHosts: [...APP_HOSTS],
  storageKey: FIRST_TOUCH_KEY,
  maxAgeMs: FIRST_TOUCH_MAX_AGE_MS,
  maxLength: MAX_VALUE_LENGTH,
  utmKeys: [...UTM_KEYS],
  consentKey: STATS_CONSENT_KEY,
  consentYes: STATS_CONSENT_YES,
  consentNo: STATS_CONSENT_NO,
  optOutKey: STATS_OPT_OUT_KEY,
  choiceEvent: STATS_CHOICE_EVENT,
};

const NOW = Date.parse('2026-11-17T10:00:00Z');

/** A fake page: the address, the referrer, localStorage, consent signals and the listeners the forwarder adds. */
function page({
  search = '',
  pathname = '/vi',
  referrer = '',
  hostname = 'elynto.io',
  storage = new Map(),
  consent = null,
  gpc = false,
  dnt = null,
  blockedStorage = false,
  now = NOW,
} = {}) {
  if (consent !== null) storage.set(STATS_CONSENT_KEY, consent);
  const listeners = { document: {}, window: {} };
  const localStorage = {
    getItem: (k) => {
      if (blockedStorage) throw new Error('SecurityError');
      return storage.has(k) ? storage.get(k) : null;
    },
    setItem: (k, v) => {
      if (blockedStorage) throw new Error('SecurityError');
      storage.set(k, String(v));
    },
    removeItem: (k) => {
      if (blockedStorage) throw new Error('SecurityError');
      storage.delete(k);
    },
  };
  const window = {
    location: { search, pathname, hostname },
    localStorage,
    addEventListener: (type, fn) => ((listeners.window[type] ??= []).push(fn)),
  };
  const document = {
    referrer,
    addEventListener: (type, fn, capture) => {
      assert.equal(capture, true, 'listens in the capture phase');
      (listeners.document[type] ??= []).push(fn);
    },
  };
  const navigator = { globalPrivacyControl: gpc, doNotTrack: dnt };
  const env = { window, document, navigator, now: () => now };
  /** Click a link: returns the href the browser would follow. */
  const click = (href, type = 'click') => {
    const anchor = { href };
    const target = { closest: (selector) => (selector === 'a[href]' ? anchor : null) };
    for (const fn of listeners.document[type] ?? []) fn({ target });
    return anchor.href;
  };
  const choice = (value) => {
    storage.set(STATS_CONSENT_KEY, value);
    for (const fn of listeners.window[STATS_CHOICE_EVENT] ?? []) fn();
  };
  return { env, storage, click, choice, listeners };
}

const boot = (p) => utmForwardBoot(config, p.env);
const stored = (p) => (p.storage.has(FIRST_TOUCH_KEY) ? JSON.parse(p.storage.get(FIRST_TOUCH_KEY)) : null);
const params = (href) => Object.fromEntries(new URL(href).searchParams);
const AD = '?utm_source=facebook&utm_medium=paid_social&utm_campaign=202611_launch&utm_content=video_a&utm_term=crm&fbclid=abc&gclid=x&email=a@b.c';
const SIGNUP = 'https://beta.elynto.io/sign-up';

test('the key, the lifetime, the hosts and the five keys match the app; consent values come from the site', () => {
  assert.equal(FIRST_TOUCH_KEY, 'ely_attr');
  assert.equal(FIRST_TOUCH_MAX_AGE_MS, 30 * 24 * 3600 * 1000);
  assert.deepEqual([...APP_HOSTS], ['beta.elynto.io', 'app.elynto.io']);
  assert.deepEqual([...UTM_KEYS], ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']);
  assert.deepEqual([STATS_CONSENT_YES, STATS_CONSENT_NO], ['v1:yes', 'v1:no']);
});

test('with consent: the first touch is kept (utm values, landing path, referring host) and added to app links', () => {
  const p = page({
    search: AD,
    pathname: '/vi/features/plan',
    referrer: 'https://l.facebook.com/l.php?u=https%3A%2F%2Felynto.io&h=secret',
    consent: STATS_CONSENT_YES,
  });
  boot(p);
  assert.deepEqual(stored(p), {
    ts: NOW,
    utm_source: 'facebook',
    utm_medium: 'paid_social',
    utm_campaign: '202611_launch',
    utm_content: 'video_a',
    utm_term: 'crm',
    landing: '/vi/features/plan',
    ref: 'l.facebook.com',
  });
  assert.deepEqual(params(p.click(SIGNUP)), {
    utm_source: 'facebook',
    utm_medium: 'paid_social',
    utm_campaign: '202611_launch',
    utm_content: 'video_a',
    utm_term: 'crm',
    landing: '/vi/features/plan',
    ref: 'l.facebook.com',
  });
  for (const key of ['fbclid', 'gclid', 'email', 'h']) assert.equal(key in stored(p), false, key);
  for (const value of ['abc', 'a@b.c', 'secret']) assert.equal(p.storage.get(FIRST_TOUCH_KEY).includes(value), false, value);
});

test('with consent: first touch wins on later pages, and a page without a campaign still forwards it', () => {
  const storage = new Map();
  boot(page({ search: '?utm_source=google&utm_medium=cpc', storage, consent: STATS_CONSENT_YES }));
  const later = page({ search: '?utm_source=other', storage, now: NOW + 1000 });
  boot(later);
  assert.equal(stored(later).utm_source, 'google');
  assert.deepEqual(params(later.click(SIGNUP)), { utm_source: 'google', utm_medium: 'cpc', landing: '/vi' });
  const plain = page({ storage, now: NOW + 2000 });
  boot(plain);
  assert.equal(params(plain.click('https://app.elynto.io/sign-in')).utm_source, 'google');
});

test('without consent: nothing is stored, and links carry only the utm values of the page itself', () => {
  for (const consent of [null, STATS_CONSENT_NO]) {
    const p = page({ search: AD, referrer: 'https://l.facebook.com/', consent });
    boot(p);
    assert.equal(p.storage.has(FIRST_TOUCH_KEY), false, String(consent));
    assert.deepEqual(params(p.click(SIGNUP)), {
      utm_source: 'facebook',
      utm_medium: 'paid_social',
      utm_campaign: '202611_launch',
      utm_content: 'video_a',
      utm_term: 'crm',
    });
  }
  const none = page({ search: '?ref=x&fbclid=abc' });
  boot(none);
  assert.equal(none.click(SIGNUP), SIGNUP);
});

test('a refusal, an old opt-out, Global Privacy Control or Do Not Track removes a stored touch', () => {
  const kept = JSON.stringify({ ts: NOW - 1000, utm_source: 'tiktok', landing: '/en' });
  for (const signals of [
    { consent: STATS_CONSENT_NO },
    { consent: STATS_CONSENT_YES, gpc: true },
    { consent: STATS_CONSENT_YES, dnt: '1' },
    { consent: STATS_CONSENT_YES, optOut: true },
  ]) {
    const storage = new Map([[FIRST_TOUCH_KEY, kept]]);
    if (signals.optOut) storage.set(STATS_OPT_OUT_KEY, '1');
    const p = page({ storage, ...signals });
    boot(p);
    assert.equal(p.storage.has(FIRST_TOUCH_KEY), false, JSON.stringify(signals));
    assert.equal(p.click(SIGNUP), SIGNUP, 'nothing stored is forwarded');
  }
});

test('consent given or withdrawn during the visit applies at once', () => {
  const p = page({ search: '?utm_source=zalo&utm_medium=social' });
  boot(p);
  assert.equal(p.storage.has(FIRST_TOUCH_KEY), false);
  p.choice(STATS_CONSENT_YES);
  assert.equal(stored(p).utm_source, 'zalo');
  assert.equal(stored(p).landing, '/vi');
  p.choice(STATS_CONSENT_NO);
  assert.equal(p.storage.has(FIRST_TOUCH_KEY), false);
  assert.deepEqual(params(p.click(SIGNUP)), { utm_source: 'zalo', utm_medium: 'social' });
  assert.equal(typeof p.listeners.window.storage?.[0], 'function', 'a choice made in another tab applies too');
});

test('the stored touch is read back only while valid: at most 30 days old, a real time, a utm value, known keys', () => {
  const read = (value) => {
    const p = page({ storage: new Map([[FIRST_TOUCH_KEY, value]]), consent: STATS_CONSENT_YES });
    boot(p);
    return p.click(SIGNUP) === SIGNUP ? null : params(p.click(SIGNUP));
  };
  assert.deepEqual(read(JSON.stringify({ ts: NOW - 1000, utm_source: 'tiktok', landing: '/en', other: 'x', fbclid: 'y' })), {
    utm_source: 'tiktok',
    landing: '/en',
  });
  assert.ok(read(JSON.stringify({ ts: NOW - FIRST_TOUCH_MAX_AGE_MS, utm_source: 'x' })));
  assert.equal(read(JSON.stringify({ ts: NOW - FIRST_TOUCH_MAX_AGE_MS - 1, utm_source: 'x' })), null);
  assert.equal(read(JSON.stringify({ ts: NOW + 1, utm_source: 'x' })), null);
  assert.equal(read(JSON.stringify({ ts: NOW, landing: '/en' })), null);
  for (const bad of ['', 'not json', '[]', '{"ts":"1"}', 'x'.repeat(2001)]) assert.equal(read(bad), null, bad.slice(0, 20));
});

test('values are cleaned and cut to 100 characters without splitting a character', () => {
  const long = 'a'.repeat(99) + '😀' + 'b';
  const p = page({ search: `?utm_campaign=${encodeURIComponent(long)}&utm_source=%0Dfb%00`, consent: STATS_CONSENT_YES });
  boot(p);
  assert.equal(Array.from(stored(p).utm_campaign).length, 100);
  assert.equal(stored(p).utm_campaign.endsWith('😀'), true);
  assert.equal(stored(p).utm_source, 'fb');
  const blank = page({ search: '?utm_source=%20%20', consent: STATS_CONSENT_YES });
  boot(blank);
  assert.equal(blank.storage.has(FIRST_TOUCH_KEY), false);
});

test('only http(s) links to exactly an app host are changed, never a parameter they already have', () => {
  const p = page({ search: '?utm_source=facebook&utm_campaign=202611_launch', consent: STATS_CONSENT_YES });
  boot(p);
  assert.equal(
    p.click('https://app.elynto.io/sign-in?utm_source=newsletter'),
    'https://app.elynto.io/sign-in?utm_source=newsletter&utm_campaign=202611_launch&landing=%2Fvi',
  );
  assert.equal(p.click('https://BETA.elynto.io/x').startsWith('https://beta.elynto.io/x?utm_source=facebook'), true);
  assert.equal(p.click(SIGNUP, 'auxclick').includes('utm_source=facebook'), true, 'a middle-click too');
  for (const href of [
    'https://elynto.io/vi/pricing',
    'https://evil.example/?next=beta.elynto.io',
    'https://beta.elynto.io.evil.example/sign-up',
    'mailto:hello@elynto.io',
    'javascript:alert(1)',
    'not a url',
    'https://beta.elynto.io/sign-up?utm_source=x&utm_campaign=y&landing=%2F',
  ]) {
    assert.equal(p.click(href), href, href);
  }
});

test('blocked storage still forwards the page campaign; a same-site or non-http referrer is not kept', () => {
  const blocked = page({ search: '?utm_source=email', consent: STATS_CONSENT_YES, blockedStorage: true });
  boot(blocked);
  assert.deepEqual(params(blocked.click(SIGNUP)), { utm_source: 'email' });
  const sameSite = page({ search: '?utm_source=zalo', referrer: 'https://elynto.io/en', consent: STATS_CONSENT_YES });
  boot(sameSite);
  assert.equal('ref' in stored(sameSite), false);
  const app = page({ search: '?utm_source=zalo', referrer: 'android-app://com.zing.zalo/', consent: STATS_CONSENT_YES });
  boot(app);
  assert.equal('ref' in stored(app), false);
});

test('the inline <head> script is this same function and runs on its own (no outside references)', () => {
  const script = utmForwardBootScript(config);
  assert.equal(script.includes('</'), false, 'cannot close the script element');
  // Run the script text as a page would, with the fake page as its globals.
  const p = page({ search: '?utm_source=facebook&utm_medium=paid_social', consent: STATS_CONSENT_YES });
  new Function('window', 'document', 'navigator', script)(p.env.window, p.env.document, p.env.navigator);
  assert.equal(stored(p).utm_source, 'facebook');
  assert.equal(params(p.click(SIGNUP)).utm_medium, 'paid_social');
  // Installed once: a second run adds no second listener.
  new Function('window', 'document', 'navigator', script)(p.env.window, p.env.document, p.env.navigator);
  assert.equal(p.listeners.document.click.length, 1);
});
