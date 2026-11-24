import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const file = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ar=file('index.html'),en=file('en/index.html'),study=file('mishwar-case-study.html'),js=file('js/portfolio-fsd.js'),enJs=file('js/portfolio-search-en.js');
test('language selection opens fully translated standalone English page and preserves deep links',()=>{
  assert.match(js,/new URL\('en\/',window\.location\.href\)/);
  assert.match(js,/target\.searchParams\.delete\('lang'\)/);
  assert.match(js,/target\.hash=window\.location\.hash/);
  assert.match(en,/href="\.\.\/\?lang=ar" lang="ar"/);
});
test('visible labels are included in accessible names, not overridden with unrelated phrasing',()=>{
  for(const doc of [ar,en]){
    assert.doesNotMatch(doc,/aria-label="Abdalla Taha — Home"/);
    assert.doesNotMatch(doc,/aria-label="Egyptian phone number/);
    assert.doesNotMatch(doc,/aria-label="WhatsApp \+966/);
  }
  assert.match(js,/EN — switch to English/);
  assert.match(file('js/mishwar-case-study.js'),/EN — switch to English/);
  assert.match(study,/EN — switch to English/);
});
test('English gallery has search, role-pressed filters and all 15 static cards as a no-JS fallback',()=>{
  assert.match(en,/id="project-toolbar-en" hidden/);
  assert.match(en,/id="project-search-en"/);
  assert.match(en,/data-filter-en="training"/);
  assert.match(en,/portfolio-search-en\.js/);
  assert.equal((en.match(/class="project-card"/g)||[]).length,15);
  assert.match(enJs,/card\.hidden = !matches/);
  assert.match(enJs,/aria-pressed/);
  assert.match(file('css/portfolio-fsd.css'),/project-card\[hidden\]/);
});
test('Lighthouse detects mismatched accessible labels even with a perfect overall accessibility category',()=>{
  const config=JSON.parse(file('.lighthouserc.json'));
  assert.equal(config.ci.assert.assertions['categories:accessibility'][0],'error');
  assert.equal(config.ci.assert.assertions['categories:performance'][0],'warn');
  assert.match(file('.github/workflows/portfolio-lighthouse.yml'),/check-lighthouse-accessible-names/);
  assert.ok(existsSync(new URL('../scripts/verify-published-site.mjs',import.meta.url)));
});
