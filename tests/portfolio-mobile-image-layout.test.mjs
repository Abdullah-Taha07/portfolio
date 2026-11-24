import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css=readFileSync(new URL('../css/portfolio-fsd.css',import.meta.url),'utf8');
for(const file of ['index.html','en/index.html']){
 test(`${file}: photo and about text have a single accessible mobile layout`,()=>{
  const html=readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
  assert.match(html,/class="about-layout"/);
  assert.match(html,/class="profile-card"/);
  assert.match(html,/class="about-copy"/);
  assert.match(html,/id="profile-photo"/);
 });
}
test('mobile image/text layout contains grid children and prevents rotated visual spill',()=>{
 assert.match(css,/Mobile image\/text containment:/);
 assert.match(css,/\.hero, \.about-layout \{ grid-template-columns: minmax\(0, 1fr\); \}/);
 assert.match(css,/\.hero-visual \.system-window \{ transform: none; \}/);
 assert.match(css,/\.profile-card-foot \{ flex-wrap: wrap;/);
 assert.match(css,/overflow-wrap: anywhere;/);
});
