import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const f=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ar=f('index.html'),en=f('en/index.html'),js=f('js/portfolio-fsd.js'),study=f('mishwar-case-study.html');
const htmlLink=(s,v)=>s.includes(v);
test('first viewport tells a clear role, shows GitHub and exact portfolio count',()=>{
 assert.match(ar,/مطور Full-Stack أبني واجهات ويب/);
 assert.match(ar,/hero-github-link/);
 assert.match(ar,/https:\/\/github\.com\/Abdullah-Taha07/);
 assert.match(ar,/<strong>15<\/strong>/);
 assert.doesNotMatch(ar,/<strong>15<span>\+<\/span>/);
 assert.match(ar,/AI ومراجعة النتائج بنفسي/);
});
test('English is a standalone crawlable localized page with 15 static projects',()=>{
 assert.match(en,/<html[^>]*dir="ltr"[^>]*lang="en"/);
 assert.match(en,/rel="canonical"\/?>/);
 assert.match(en,/https:\/\/abdullah-taha07\.github\.io\/portfolio\/en\//);
 assert.equal((en.match(/class="project-card"/g)||[]).length,15);
 assert.match(en,/Coffee Company/);assert.match(en,/E-commerce Storefront/);
 assert.match(ar,/hreflang="en"/);assert.match(ar,/hreflang="ar"/);
 assert.match(f('sitemap.xml'),/\/portfolio\/en\//);
});
test('JavaScript-disabled main page has 15 project cards, with JS restoring full directory',()=>{
 assert.equal((ar.match(/data-static-project="true"/g)||[]).length,15);
 assert.match(js,/projectGrid\.replaceChildren\(frag\)/);
 assert.match(ar,/class="project-grid" id="project-grid"/);
});
test('selected projects showcase real existing links and no fabricated source-code buttons',()=>{
 for(const u of ['mishwar-case-study.html','https://abdullah-taha07.github.io/coffee-company/index.html','https://abdullah-taha07.github.io/E-commerce/'])assert.ok(ar.includes(u));
 assert.match(ar,/selectedTitle/);
 assert.match(ar,/mishwar-architecture-preview\.webp/);
 assert.match(en,/Architecture diagram, not a live app screenshot/);
 assert.doesNotMatch(ar,/class="source-link"/);
});
test('Mishwar decisions are explicit evidence, with honest AI assistance and pilot limitations',()=>{
 for(const source of ['route-trust.test.mjs','staff-security.test.mjs','live-tracking-eta.test.mjs'])assert.match(study,new RegExp(source.replaceAll('.','\\.')));
 assert.match(study,/id="decisions"/);
 assert.match(study,/id="decisions-en"/);
 assert.match(study,/أدوات برمجة مساعدة/);
 assert.match(study,/AI-assisted coding tools/);
 assert.match(study,/تجريبي/);
});
test('public links opening new tabs always use noopener, and all images have alternative text',()=>{
 for(const document of [ar,en,study]){
   const bad=[...document.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].filter(m=>!m[0].includes('noopener'));
   assert.deepEqual(bad.map(x=>x[0]),[]);
   for(const i of [...document.matchAll(/<img\b[^>]*>/g)])assert.match(i[0],/alt=/);
 }
});
test('portfolio keeps a local contact fallback without relying on JavaScript',()=>{
 assert.match(en,/mailto:abdalla\.tm@outlook\.sa/);
 assert.match(en,/tel:\+201009614155/);
 assert.match(ar,/href="mailto:abdalla\.tm@outlook\.sa/);
});
test('social-sharing image, original avatar, published case study and CI are wired',()=>{
 assert.ok(existsSync(new URL('../images/abdalla-share-avatar-v1.jpg',import.meta.url)));
 assert.ok(existsSync(new URL('../images/developer-avatar.webp',import.meta.url)));
 assert.ok(existsSync(new URL('../mishwar-case-study.html',import.meta.url)));
 assert.match(f('.github/workflows/portfolio-checks.yml'),/node --test tests\/\*\.test\.mjs/);
});
