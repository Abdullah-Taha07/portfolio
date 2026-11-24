#!/usr/bin/env node
/** Print REAL Lighthouse category scores from report files; missing data is not success. */
import { readdirSync, readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
const dir = resolve(process.argv[2] || '.lighthouseci');
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const files = existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith('.json')) : [];
const reports = [];
for (const f of files) {
  let data;
  try { data = JSON.parse(readFileSync(resolve(dir,f),'utf8')); } catch { continue; }
  if (!data?.categories || !data?.finalUrl) continue;
  reports.push({url:data.finalUrl, filename:f, scores:Object.fromEntries(categories.map(k=>[k,Number.isFinite(data.categories[k]?.score)?Math.round(100*data.categories[k].score):null]))});
}
let markdown = '# Lighthouse measured results — informational only\n\n';
if (!reports.length) markdown += 'No Lighthouse JSON reports were found. **No score has been verified.**\n';
else {
  markdown += '| Page / run | Performance | Accessibility | Best Practices | SEO |\n|---|---:|---:|---:|---:|\n';
  for (const r of reports) markdown += `| ${r.url.replaceAll('|','\\|')} (${basename(r.filename)}) | ${categories.map(k=>r.scores[k]??'N/A').join(' | ')} |\n`;
}
markdown += '\nPassing CI / running Lighthouse does **not** imply 99/100 or 100/100. Verify production separately.\n';
console.log(markdown);
if (existsSync(dir)) writeFileSync(resolve(dir,'lighthouse-score-summary.md'),markdown,'utf8');
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY,markdown,'utf8');
