import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://127.0.0.1:4321/en/');
await page.evaluate(() => document.fonts.ready);
for (const image of await page.locator('.project-visual img').all()) {
  await image.scrollIntoViewIfNeeded();
  await image.evaluate(img => img.decode());
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: 'test-results/preview.png' });
await page.locator('#projects').screenshot({ path: 'test-results/projects-preview.png' });
await page.locator('#experience').screenshot({ path: 'test-results/experience-preview.png' });
await page.locator('.feature').screenshot({ path: 'test-results/report-feature-preview.png' });
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto('http://127.0.0.1:4321/en/');
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/images/share.png' });
await browser.close();
