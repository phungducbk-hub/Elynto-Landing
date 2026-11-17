/* eslint-disable @typescript-eslint/no-require-imports -- Compile actual content modules in the Node harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const ts = require('typescript');
require.extensions['.ts'] = (mod, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  mod._compile(outputText, filename);
};
const { allPageKeys, pageGroups, pagePath } = require('../../src/lib/pages.ts');
const { en } = require('../../src/content/pages/en.ts');
const { vi } = require('../../src/content/pages/vi.ts');

test('all footer links and contextual guide links resolve to complete pages in both languages', () => {
  assert.equal(new Set(pageGroups.flatMap(group => group.pages)).size, 17);
  assert.equal(pageGroups.flatMap(group => group.pages).length, allPageKeys.length);
  for (const pages of [vi, en]) {
    assert.deepEqual(Object.keys(pages).sort(), [...allPageKeys].sort());
    for (const key of allPageKeys) {
      assert.ok(pages[key].title && pages[key].description && pages[key].navLabel, key);
      assert.ok(pagePath(key));
      if (key !== 'faq') assert.ok(pages[key].sections.length, key);
      for (const section of pages[key].sections) {
        for (const link of section.links ?? []) assert.ok(pages[link.page], `${key} -> ${link.page}`);
      }
      assert.notEqual(pages[key].title, (pages === en ? vi : en)[key].title, `${key} is localized`);
    }
  }
});

test('policy versions and functional controls are consistent across both locales', () => {
  for (const pages of [en, vi]) {
    for (const key of ['terms', 'privacy', 'cookies', 'cancellation']) assert.equal(pages[key].updatedAt, '2026-11-17');
    assert.deepEqual(pages.cookies.sections.filter(section => section.action).map(section => section.action).sort(), ['clearLanguage', 'statsOptOut']);
    assert.equal(pages.contact.sections.filter(section => section.emailSubject).length, 3);
    for (const key of ['pricing', 'status', 'changelog']) assert.equal(pages[key], undefined);
  }
});
