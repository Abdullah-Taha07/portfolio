import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const load=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=load('index.html'),js=load('js/portfolio-fsd.js');
const config=JSON.parse(load('.lighthouserc.json'));

test('English landing is selected before first paint using device or stored locale',()=>{
  assert.match(html,/Locale routing happens before first paint/);
  assert.match(html,/navigator\.languages/);
  assert.match(html,/localStorage\.getItem\('at-portfolio-lang'\)/);
  assert.match(html,/requested === 'ar' \|\| requested === 'en'/);
  assert.match(html,/location\.replace\(target\.href\)/);
  assert.match(html,/target\.hash = location\.hash/);
  assert.ok(html.indexOf('Locale routing happens before first paint')<html.indexOf('css/portfolio-fsd.css'));
});
test('Root Arabic can be expressly requested for reliable separate audits',()=>{
  assert.match(js,/const requestedLang = new URLSearchParams\(location\.search\)\.get\('lang'\)/);
  assert.match(js,/requestedLang === 'ar' \|\| requestedLang === 'en'/);
  assert.ok(config.ci.collect.url.some(s=>s.includes('/?lang=ar')));
  assert.ok(config.ci.collect.url.includes('http://127.0.0.1:4173/'));
  assert.ok(config.ci.collect.url.includes('http://127.0.0.1:4173/en/'));
});
test('Root font download does not swap late and shift hero buttons',()=>{
  assert.doesNotMatch(html,/fonts\.googleapis\.com[^"\n]*display=swap/);
  assert.match(html,/fonts\.googleapis\.com[^"\n]*display=optional/);
  assert.match(html,/rel="stylesheet" media="print"/);
});
test('Keep static 15-card gallery at first render and enhance only on demand',()=>{
  assert.match(js,/let galleryEnhanced = false/);
  assert.match(js,/if \(galleryEnhanced \|\| lang !== 'ar' \|\| projectGrid\.querySelectorAll\('\.project-card'\)\.length !== 15\)/);
  assert.match(js,/new IntersectionObserver/);
  assert.match(js,/galleryObserver\.observe\(projectGrid\)/);
  assert.match(js,/searchInput\.addEventListener\('input',renderProjects\)/);
  assert.match(js,/filterButtons\.forEach/);
  assert.equal((html.match(/data-static-project="true"/g)||[]).length,15);
});
test('Lighthouse targets 99 as warnings while preserving actual numeric readings',()=>{
  assert.equal(config.ci.assert.assertions['categories:performance'][1].minScore,.99);
  assert.equal(config.ci.assert.assertions['categories:performance'][0],'warn');
  assert.equal(config.ci.collect.numberOfRuns,2);
});


test('Locale bootstrap routes device languages, saved choices and deep links correctly',()=>{
  const script=html.match(/<script>\s*([\s\S]*?Locale routing happens before first paint[\s\S]*?)<\/script>/)?.[1];
  assert.ok(script,'inline locale bootstrap must be present');
  const sample=(locale,saved,search='',hash='')=>{
    const history=[];
    const location={protocol:'https:',href:'https://abdullah-taha07.github.io/portfolio/'+search+hash,search,hash,
      replace(next){history.push(next);}};
    const localStorage={getItem(){return saved;}};
    runInNewContext(script,{navigator:{languages:[locale],language:locale},localStorage,location,URL,URLSearchParams});
    return history;
  };
  assert.equal(sample('ar-SA',null).length,0);
  assert.deepEqual(sample('en-US',null),['https://abdullah-taha07.github.io/portfolio/en/']);
  assert.deepEqual(sample('fr-FR',null),['https://abdullah-taha07.github.io/portfolio/en/']);
  assert.equal(sample('en-US','ar').length,0);
  assert.deepEqual(sample('ar-SA','en','?source=ref','#projects'),[
    'https://abdullah-taha07.github.io/portfolio/en/?source=ref#projects'
  ]);
  assert.equal(sample('en-US',null,'?lang=ar').length,0);
});
