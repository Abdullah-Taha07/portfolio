/* Regressions invisible to category scores still block Lighthouse acceptance. */
import fs from 'node:fs';
import path from 'node:path';
const dir = path.resolve(process.argv[2] || '.lighthouseci');
if (!fs.existsSync(dir)) {console.error('No Lighthouse directory:',dir);process.exit(2);}
const reports = fs.readdirSync(dir).filter(name => name.endsWith('.report.json'));
if (!reports.length) {console.error('No Lighthouse JSON reports');process.exit(2);}
let failed = 0;
for (const name of reports) {
  const data = JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
  const audit = data.audits?.['label-content-name-mismatch'];
  const mismatches = audit?.details?.items || [];
  if (audit && (audit.score === 0 || mismatches.length)) {
    failed += mismatches.length || 1;
    console.error(name,'accessible-name mismatches:',mismatches.map(x=>x.node?.selector||'unknown').join(', '));
  }
}
console.log('Lighthouse accessible-name audit:',reports.length,'reports,',failed,'findings');
if (failed) process.exitCode = 1;
