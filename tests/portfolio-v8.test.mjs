import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const f = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ar=f('index.html'),en=f('en/index.html'),study=f('mishwar-case-study.html'),tour=f('demo/mishwar-tour.html'),script=f('demo/tour.js');
test('Arabic projects remain visible without JavaScript (all 15 project cards)',()=>{
 assert.equal((ar.match(/data-static-project="true"/g)||[]).length,15);
 assert.match(ar,/مشاريع تدريبية منجزة/);
 assert.match(ar,/class="mishwar-chooser"/);
});
test('safe tour has no production requests, no account credentials and explicit simulation disclosures',()=>{
 assert.match(ar,/demo\/mishwar-tour.html/);assert.match(en,/demo\/mishwar-tour.html/);
 assert.match(tour,/noindex, nofollow/);assert.match(tour,/role="tablist"/);
 assert.equal((tour.match(/role="tab"/g)||[]).length,3);
 assert.match(tour,/لا توجد رحلات أو دفعات أو موافقات حقيقية/);
 assert.doesNotMatch(script,/\bfetch\s*\(/);assert.doesNotMatch(script,/XMLHttpRequest/);assert.doesNotMatch(script,/localStorage/);
 assert.doesNotMatch(tour,/(?:API_KEY|SECRET_KEY|Authorization: Bearer)/);
});
test('real merged PRs have specific review links and are not presented as real-device acceptance',()=>{
 for(let n=1;n<=4;n++) assert.match(study,new RegExp('Mishwar_App/pull/'+n));
 assert.match(study,/أجهزة حقيقية/);
 assert.match(study,/not.*certify.*production readiness/i);
});
test('CI includes browser interactions, axe, Lighthouse reporting and source tests',()=>{
 const ci=f('.github/workflows/portfolio-checks.yml');
 assert.match(ci,/browser-accessibility:/);assert.match(ci,/browser_quality\.py --axe-required/);
 assert.match(ci,/axe-core@/);assert.match(ci,/node --test tests\/\*\.test\.mjs/);
 assert.match(f('.github/workflows/portfolio-lighthouse.yml'),/lhci/);
 assert.match(f('.lighthouserc.json'),/categories:accessibility/);
 assert.ok(existsSync(new URL('../scripts/CAPTURE_REAL_PUBLIC_PREVIEWS.ps1',import.meta.url)));
});
