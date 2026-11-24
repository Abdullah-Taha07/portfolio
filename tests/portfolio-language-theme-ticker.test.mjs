import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const src = f => readFileSync(new URL('../'+f, import.meta.url), 'utf8');
const ar = src('index.html'), en = src('en/index.html');
const js = src('js/portfolio-fsd.js'), enJs = src('js/portfolio-nav-en.js');
const css = src('css/portfolio-fsd.css');

test('ticker markup closes the Arabic aria-label before any child', () => {
  assert.match(ar, /class="container ticker-content"[^>]*aria-label="Scrollable technology list"><span>JAVASCRIPT<\/span>/);
  assert.doesNotMatch(ar, /aria-label="[^">]*<span>JAVASCRIPT/);
  assert.match(ar, /<section class="section container" id="about"/);
});
test('initial language follows browser locale only when no saved choice exists', () => {
  assert.match(js, /navigator\.languages/);
  assert.match(js, /navigator\.language/);
  assert.match(js, /storedLang === 'ar' \|\| storedLang === 'en'/);
  assert.match(js, /\^ar\(\?:\[-_\]\|\$\)/);
  assert.match(js, /setStored\('at-portfolio-lang',lang\)/);
});
test('dark stays the default and light choice is persisted across both pages', () => {
  assert.match(ar, /<html[^>]*data-theme="dark"/);
  assert.match(en, /<html[^>]*data-theme="dark"/);
  assert.match(js, /getStored\('at-portfolio-theme'\) === 'light' \? 'light' : 'dark'/);
  assert.match(enJs, /readTheme\(\) === 'light' \? 'light' : 'dark'/);
  assert.match(enJs, /localStorage\.setItem\('at-portfolio-theme', theme\)/);
  assert.match(en, /id="theme-toggle-en"/);
});
test('explicit Arabic selection from English page is not lost to device locale', () => {
  assert.match(enJs, /localStorage\.setItem\('at-portfolio-lang', 'ar'\)/);
  assert.match(js, /setStored\('at-portfolio-lang',lang\)/);
});
test('light background has a colored, layered canvas and readable CTA text', () => {
  assert.match(css, /--bg:#e6f0f4/);
  assert.match(css, /linear-gradient\(148deg, #e7f2f5/);
  assert.match(css, /html\[data-theme=light\] \.button\.primary/);
  assert.doesNotMatch(css, /background-attachment: fixed/);
  assert.doesNotMatch(css, /--surface:#fff;/);
});
