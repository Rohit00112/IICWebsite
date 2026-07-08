import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:3111';
const browser = await chromium.launch();
const page = await browser.newPage();

const errors = [];
const warnings = [];
const failed = [];

page.on('console', (msg) => {
  const t = msg.type();
  if (t === 'error') errors.push(msg.text());
  else if (t === 'warning') warnings.push(msg.text());
});
page.on('pageerror', (err) => errors.push('PAGEERROR: ' + err.message));
page.on('requestfailed', (req) => failed.push(`${req.failure()?.errorText} ${req.url()}`));
page.on('response', (res) => {
  if (res.status() >= 400) failed.push(`HTTP ${res.status()} ${res.url()}`);
});

await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4000);

console.log('=== CONSOLE ERRORS (' + errors.length + ') ===');
errors.forEach((e) => console.log('  • ' + e));
console.log('\n=== FAILED REQUESTS (' + failed.length + ') ===');
[...new Set(failed)].forEach((f) => console.log('  • ' + f));
console.log('\n=== WARNINGS (' + warnings.length + ') ===');
warnings.slice(0, 20).forEach((w) => console.log('  • ' + w));

await browser.close();
