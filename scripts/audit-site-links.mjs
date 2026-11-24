#!/usr/bin/env node
/** Validate local pages, referenced assets, same-page fragments and expected contact links.
 * No external network calls. Dynamic app links are checked for presence, not availability.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'en/index.html', 'mishwar-case-study.html', 'demo/mishwar-tour.html'];
const styles = ['css/portfolio-fsd.css', 'css/mishwar-case-study.css', 'demo/tour.css'];
const failures = [];
const note = (where, msg) => failures.push(`${where}: ${msg}`);
const read = path => readFileSync(resolve(root, path), 'utf8');
const localBase = 'https://portfolio-audit.invalid/';
let checked = 0;
let external = 0;
function verifyLink(source, original, fragment = true) {
  const raw = original.replaceAll('&amp;', '&').trim();
  if (!raw || /^\s*(?:mailto:|tel:|data:|blob:)/i.test(raw)) return;
  if (/^\s*javascript:/i.test(raw)) { note(source, `unsafe javascript URL: ${raw}`); return; }
  const externalScheme = /^[a-z][a-z\d+.-]*:/i.test(raw) || raw.startsWith('//');
  if (externalScheme) {
    try { const target = new URL(raw, localBase); if (target.protocol === 'https:' || target.protocol === 'http:') external++; else note(source, `unexpected URL scheme: ${raw}`); }
    catch { note(source, `malformed external URL: ${raw}`); }
    return;
  }
  let target;
  try { target = new URL(raw, new URL(source, localBase)); }
  catch { note(source, `malformed relative URL: ${raw}`); return; }
  if (target.origin !== new URL(localBase).origin) { external++; return; }
  let destination = decodeURIComponent(target.pathname).replace(/^\/+/, '');
  if (!destination || destination.endsWith('/')) destination += 'index.html';
  const targetFile = resolve(root, destination);
  const rootPrefix = root.endsWith(sep) ? root : root + sep;
  if (targetFile !== root && !targetFile.startsWith(rootPrefix)) { note(source, `path escapes repository: ${raw}`); return; }
  checked++;
  if (!existsSync(targetFile) || !statSync(targetFile).isFile()) { note(source, `missing: ${raw} -> ${relative(root, targetFile)}`); return; }
  const hash = target.hash.slice(1);
  if (!fragment || !hash || !destination.endsWith('.html')) return;
  const id = decodeURIComponent(hash).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const html = readFileSync(targetFile, 'utf8');
  if (!new RegExp(`\\bid\\s*=\\s*["']${id}["']`).test(html)) note(source, `missing fragment target: ${raw}`);
}

for (const page of pages) {
  if (!existsSync(resolve(root, page))) { note(page, 'page missing'); continue; }
  const html = read(page);
  for (const match of html.matchAll(/\b(?:href|src|poster)\s*=\s*(["'])(.*?)\1/gi)) verifyLink(page, match[2]);
  // Separate static-page navigation from external app availability. No HTTP claims here.
  for (const link of html.matchAll(/<a\b[^>]*target\s*=\s*["']_blank["'][^>]*>/gi)) {
    if (!/\brel\s*=\s*["'][^"']*\bnoopener\b/i.test(link[0])) note(page, 'external-tab link missing rel=noopener');
  }
}
for (const css of styles) {
  if (!existsSync(resolve(root, css))) continue;
  for (const match of read(css).matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) verifyLink(css, match[2], false);
}
for (const cv of ['files/Abdalla_FSD_ar.pdf', 'files/Abdalla_FSD_en.pdf']) {
  const f = resolve(root, cv);
  if (!existsSync(f)) { note(cv, 'CV missing'); continue; }
  if (statSync(f).size < 10000 || !readFileSync(f).subarray(0, 5).equals(Buffer.from('%PDF-'))) note(cv, 'invalid or unexpectedly short PDF');
}
const ar = read('index.html');
const en = read('en/index.html');
const study = read('mishwar-case-study.html');
for (const [name, data] of [['index.html', ar], ['en/index.html', en]]) {
  for (const expected of [
    'https://www.linkedin.com/in/abdalla-mohamed07/',
    'https://wa.me/966548000536',
    'mailto:abdalla.tm@outlook.sa',
    'mishwar-rider.vercel.app/', 'mishwar-captain.vercel.app/', 'mishwar-admin-gamma.vercel.app/'
  ]) if (!data.includes(expected)) note(name, `required contact/project link absent: ${expected}`);
  if (data.includes('abdalla-taha-abdel-alim-mohammed-097116228')) note(name, 'obsolete LinkedIn link');
}
for (const id of ['role-and-proof','role-and-proof-en','decisions','decisions-en']) if (!study.includes(`id="${id}"`)) note('mishwar-case-study.html', `proof section missing: ${id}`);
console.log(`LOCAL_LINK_AUDIT ${failures.length ? 'FAILED' : 'PASSED'} | ${checked} local references | ${external} external HTTP references (not requested over network)`);
for (const f of failures) console.error(` - ${f}`);
if (failures.length) process.exitCode = 1;
