import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const f = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=f('index.html'), js=f('js/portfolio-fsd.js'), study=f('mishwar-case-study.html'), studyJs=f('js/mishwar-case-study.js');
test('main site contains working language-independent contact links and updated LinkedIn identity',()=>{
 assert.match(html,/https:\/\/www\.linkedin\.com\/in\/abdalla-mohamed07\//);
 assert.doesNotMatch(html,/abdalla-taha-abdel-alim-mohammed-097116228/);
 assert.match(html,/https:\/\/wa\.me\/966548000536/);
 assert.match(html,/mailto:abdalla\.tm@outlook\.sa/);
 assert.match(html,/tel:\+201009614155/);
});
test('Mishwar app chooser retains verified three applications',()=>{
 for(const u of ['https://mishwar-rider.vercel.app/','https://mishwar-captain.vercel.app/','https://mishwar-admin-gamma.vercel.app/']) assert.ok(js.includes(u) && study.includes(u),u);
 assert.match(js,/mishwar-chooser/);
});
test('all public projects remain listed with no fabricated demo URLs and no code-opening button',()=>{
 assert.equal((js.match(/\{id:'[^']+',title:/g)||[]).length,15);
 assert.equal((js.split('const translations =')[0].match(/live:'/g)||[]).length,10);
 const gallery=js.slice(js.indexOf('function renderProjects'),js.indexOf('function applyLanguage'));
 assert.match(gallery,/trainingGroupIntroduced/);
 assert.match(gallery,/!p\.live/);
 assert.doesNotMatch(gallery,/sourceLink/);
});
test('mobile PWA and Java Android engineering are explicitly and accurately scoped',()=>{
 assert.match(html,/Mobile Apps · PWA &amp; Android/);
 for(const tech of ['Android Java','Android SDK','Gradle','Custom Tabs','Service Workers','Web App Manifest']) assert.ok(html.includes(tech),tech);
 assert.match(study,/Google Play \/ App Store/);
 assert.match(study,/Android Java/);
 assert.match(study,/GPS/);
 assert.match(study,/PWA/);
});
test('case study is accessible bilingually with evidence and engineering limitations',()=>{
 assert.match(study,/data-lang="ar"/);
 assert.match(study,/data-lang="en"/);
 assert.match(study,/id="case-lang-toggle"/);
 assert.match(studyJs,/localStorage/);
 assert.match(study,/MISHWAR_MAIN_FULL_AUDIT_AR\.md/);
 assert.match(study,/route-trust\.test\.mjs/);
 assert.match(study,/staff-security\.test\.mjs/);
 assert.match(study,/live-tracking-eta\.test\.mjs/);
 assert.match(html,/mishwar-case-study\.html/);
});
test('social preview and favicon use selected anonymized avatar',()=>{
 assert.match(html,/property="og:image"/);
 assert.match(html,/images\/abdalla-share-avatar-v1\.jpg/);
 assert.match(html,/images\/abdalla-avatar-icon-v1\.png/);
 assert.match(study,/images\/abdalla-share-avatar-v1\.jpg/);
});
test('SEO support and separate styling are present',()=>{
 assert.match(f('robots.txt'),/sitemap\.xml/);
 assert.match(f('sitemap.xml'),/mishwar-case-study\.html/);
 assert.match(study,/<meta name="description"/);
 assert.match(study,/mishwar-case-study\.css/);
});
