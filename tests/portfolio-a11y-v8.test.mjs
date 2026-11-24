import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('scrolling technology lists are keyboard reachable in Arabic and English',()=>{for(const p of ['index.html','en/index.html'])assert.match(read(p),/ticker-content[^>]*tabindex="0"[^>]*role="region"/);});
test('footer links have touch target size and non-color-only affordance',()=>{assert.match(read('css/portfolio-fsd.css'),/footer-inner a\{[^}]*min-height:36px[^}]*text-decoration:underline/);assert.match(read('css/mishwar-case-study.css'),/case-footer a,.case-section p a\{text-decoration:underline/);});
test('English font load will not force a late font swap',()=>{assert.match(read('en/index.html'),/display=optional/);});
test('axe serious and critical violations fail the browser CI gate',()=>{assert.match(read('.github/workflows/portfolio-checks.yml'),/STRICT_AXE: \"1\"/);});
