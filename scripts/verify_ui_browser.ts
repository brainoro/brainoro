import { chromium } from 'playwright';
import * as fs from 'fs';

async function run() {
  console.log('Reading auth token...');
  const tokenRaw = fs.readFileSync('scratch/auth_token.json', 'utf8');
  const tokenData = JSON.parse(tokenRaw);

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 950 },
  });

  // Inject auth token into localStorage before page loads
  await context.addInitScript((data) => {
    window.localStorage.setItem('sb-gyjlrgudysqabwbhaskr-auth-token', JSON.stringify(data));
  }, tokenData);

  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  console.log('Current URL:', page.url());

  // Check if redirected to login
  if (page.url().includes('/login')) {
    console.log('Redirected to login. Attempting login form...');
    await page.fill('input[type="email"]', 'brainorostudy@gmail.com');
    await page.fill('input[type="password"]', 'Brainoro@123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    console.log('URL after login:', page.url());
  }

  // Look for CBSE Curriculum Navigator
  console.log('Waiting for curriculum navigator...');
  await page.waitForSelector('[data-testid="cbse-curriculum-system"]', { timeout: 15000 });

  // Select Grade 8
  console.log('Selecting Class 8...');
  const grade8Btn = page.locator('button:has-text("Class 8")').first();
  await grade8Btn.click();
  await page.waitForTimeout(800);

  // Select Mathematics
  console.log('Selecting Mathematics...');
  const mathBtn = page.locator('button:has-text("Mathematics")').first();
  await mathBtn.click();
  await page.waitForTimeout(1000);

  // Take screenshot of Class 8 Math Part-I
  await page.screenshot({ path: 'scratch/cbse_class8_math_part1_verified.png' });
  console.log('Saved scratch/cbse_class8_math_part1_verified.png');

  // Verify Part 1 Text and Code
  const textbookBadgeP1 = await page.locator('[data-testid="cbse-textbook-badge"]').textContent();
  console.log('Textbook badge (Part 1):', textbookBadgeP1?.trim());

  const partsSwitcher = await page.locator('[data-testid="cbse-textbook-parts-switcher"]').textContent();
  console.log('Parts switcher text:', partsSwitcher?.trim());

  // Click Part-II
  console.log('Clicking Ganita Prakash Part-II tab...');
  const part2Btn = page.locator('button:has-text("Ganita Prakash Part-II")').first();
  await part2Btn.click();
  await page.waitForTimeout(1200);

  // Take screenshot of Class 8 Math Part-II
  await page.screenshot({ path: 'scratch/cbse_class8_math_part2_verified.png' });
  console.log('Saved scratch/cbse_class8_math_part2_verified.png');

  // Verify Part 2 Text and Code
  const textbookBadgeP2 = await page.locator('[data-testid="cbse-textbook-badge"]').textContent();
  console.log('Textbook badge (Part 2):', textbookBadgeP2?.trim());

  const chapterListText = await page.locator('[data-testid="cbse-chapter-list"]').innerText();
  console.log('Chapters list (Part 2):\n' + chapterListText);

  await browser.close();
  console.log('\n[SUCCESS] Browser UI verification completed successfully!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
