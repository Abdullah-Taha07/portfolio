import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
for (const path of ['index.html','en/index.html','mishwar-case-study.html']) {
  test(`${path}: fonts are nonblocking and available without JS`, () => {
    const html = readFileSync(new URL('../'+path, import.meta.url), 'utf8');
    assert.match(html, /fonts\.googleapis\.com\/css2/);
    assert.match(html, /rel="stylesheet" media="print" onload="this\.media='all'"/);
    assert.match(html, /<noscript>\s*<link[^>]*fonts\.googleapis\.com\/css2[^>]*>\s*<\/noscript>/);
  });
}