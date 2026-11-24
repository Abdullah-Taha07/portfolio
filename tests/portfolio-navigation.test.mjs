import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
for (const name of ['index.html', 'en/index.html']) {
  test(`${name}: back-to-top anchor points to non-sticky document start`, () => {
    const html = file(name);
    assert.match(html, /<div id="top" aria-hidden="true"><\/div>/);
    assert.doesNotMatch(html, /<header[^>]*id="top"/);
    assert.equal((html.match(/id="top"/g) ?? []).length, 1);
    assert.match(html, /href="#top"/);
  });
}
test('Arabic floating top button clears old section fragment and scrolls to zero', () => {
  const js = file('js/portfolio-fsd.js');
  assert.match(js, /history\.replaceState/);
  assert.match(js, /window\.scrollTo\(\{top: 0, left: 0, behavior: 'instant'\}\)/);
});
test('English mobile navigation has a real dismissible accessible menu', () => {
  const html = file('en/index.html');
  const js = file('js/portfolio-nav-en.js');
  assert.match(html, /id="menu-toggle"/);
  assert.match(html, /aria-controls="primary-nav"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /html\.en-nav-ready \.nav-links\.is-open/);
  assert.match(html, /<script defer src="\.\.\/js\/portfolio-nav-en\.js"><\/script>/);
  assert.match(js, /event\.key === 'Escape'/);
  assert.match(js, /nav\.contains\(event\.target\)/);
  assert.match(js, /menu\.setAttribute\('aria-expanded', String\(open\)\)/);
});

test('hero headline uses confident value proposition in both locales', () => {
  const ar = file('index.html');
  const en = file('en/index.html');
  const js = file('js/portfolio-fsd.js');
  assert.match(ar, /أحوّل تحديات الأعمال إلى حلول رقمية عملية/);
  assert.match(en, /Turning business challenges into practical digital solutions/);
  assert.match(js, /أحوّل تحديات الأعمال إلى حلول رقمية عملية/);
  assert.match(js, /Turning business challenges into practical digital solutions/);
  assert.doesNotMatch(ar, /بمستوى يناسب خبرتي/);
});
