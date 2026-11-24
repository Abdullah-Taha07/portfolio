import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const f = (path) => readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('final hiring evidence tells the truth in Arabic and English', () => {
  const c=f('mishwar-case-study.html');
  for (const id of ['role-and-proof','role-and-proof-en','decisions','decisions-en']) assert.ok(c.includes(`id="${id}"`),id);
  assert.match(c,/أدوات برمجة مساعدة/);
  assert.match(c,/AI-assisted coding tools/);
  assert.match(c,/ليست اختبارًا مستقلًا لقدرتي على البرمجة دون أدوات مساعدة/);
  assert.match(c,/not independently validate my unaided coding ability/);
  assert.match(c,/route-trust\.test\.mjs/);
  assert.match(c,/staff-security\.test\.mjs/);
  assert.match(c,/live-tracking-eta\.test\.mjs/);
});
test('offline internal link, contact and CV checks pass', () => {
  const check=spawnSync(process.execPath,[fileURLToPath(new URL('../scripts/audit-site-links.mjs',import.meta.url))],{encoding:'utf8',timeout:20000});
  assert.equal(check.status,0,(check.stdout||'')+'\n'+(check.stderr||''));
});
test('Lighthouse scoreboard reports actual scores without inventing them', () => {
  assert.ok(existsSync(new URL('../scripts/summarize-lighthouse.mjs',import.meta.url)));
  const script=f('scripts/summarize-lighthouse.mjs');
  assert.match(script,/data\.categories\[k\]\?\.score/);
  assert.match(f('.github/workflows/portfolio-lighthouse.yml'),/Summarize measured Lighthouse scores/);
});
test('no new project screenshots or pretend production verification', () => {
  const r=f('README.md');
  assert.match(r,/Final hiring quality pass/);
  assert.match(r,/no project screenshots/);
  assert.match(r,/External demo URLs require manual verification/);
});
