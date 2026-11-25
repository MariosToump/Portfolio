import { chromium, webkit, devices } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';

const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
const ids = ['factory-reporting', 'piano-app', 'warlocks-android', 'neon-riot'];
const results = [], errors = [];
await mkdir('test-results', { recursive: true });
for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  for (const lang of ['en', 'el']) {
    const page = await browser.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    const routes = ['', 'experience/', ...ids.map(id => `work/${id}/`)];
    for (const route of routes) {
      await page.goto(`${base}/${lang}/${route}`);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('html').getAttribute('lang'), lang);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://marios-toumpoulas.pages.dev/${lang}/${route}`);
      assert.ok(await page.locator('meta[name=description]').getAttribute('content'));
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(img => img.decode());
      }
      for (const width of [320, 360, 390, 768, 820, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${name} ${lang}/${route} ${width}: overflow`);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => document.documentElement.style.fontSize = '200%');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${name} ${lang}/${route}: text zoom`);
      await page.evaluate(() => document.documentElement.style.fontSize = '');
      const links = await page.locator('a[href]').evaluateAll(els => els.map(el => el.getAttribute('href')).filter(href => href.startsWith('/') || href.startsWith('#')));
      for (const href of new Set(links)) {
        const url = new URL(href, page.url());
        const response = await page.request.get(url.href);
        assert.equal(response.ok(), true, `broken link ${url}`);
        if (url.hash) assert.ok((await response.text()).includes(`id="${url.hash.slice(1)}"`), `missing anchor ${url}`);
      }
      const other = lang === 'en' ? 'el' : 'en';
      await page.locator('.utility .language-switch').click();
      assert.equal(new URL(page.url()).pathname, `/${other}/${route}`);
      await page.goto(`${base}/${lang}/${route}`);
      if (!route) {
        assert.equal(await page.locator('h1').textContent(), lang === 'en' ? 'Marios Toumpoulas' : 'Μάριος Τουμπούλας');
        assert.deepEqual(await page.locator('.project-entry').evaluateAll(els => els.map(el => el.id)), ids);
        assert.match(await page.locator('.developer-title').innerText(), lang === 'en' ? /Software developer/ : /Προγραμματιστής/);
        assert.equal(await page.locator('.timeline').count(), 0);
        assert.equal(await page.locator('#report-demo').count(), 0);
        assert.match(await page.locator('#about').innerText(), lang === 'en' ? /two full-length albums/ : /δύο ολοκληρωμένα άλμπουμ/);
        await page.locator('.actions .primary').click();
        assert.equal(new URL(page.url()).hash, '#projects');
        await page.locator('#piano-app h3 a').click();
        assert.equal(new URL(page.url()).pathname, `/${lang}/work/piano-app/`);
        assert.equal(await page.locator('.project-detail a[href*=github]').count(), 0, 'private piano repository must stay private');
      } else if (route === 'experience/') {
        assert.equal(await page.locator('.timeline li:visible').count(), 6);
        await page.locator('[data-filter=technical]').click();
        assert.equal(await page.locator('.timeline li:visible').count(), 4);
        assert.equal(await page.locator('#accenture').isVisible(), false);
        await page.locator('[data-filter=operations]').click();
        assert.equal(await page.locator('.timeline li:visible').count(), 4);
        assert.equal(await page.locator('#sovel-web').isVisible(), false);
        await page.emulateMedia({ media: 'print' });
        assert.equal(await page.locator('.timeline li:visible').count(), 6);
        assert.equal(await page.locator('header.site-header').isVisible(), false);
        if (name === 'chromium') await page.pdf({ path: `test-results/cv-${lang}.pdf`, format: 'A4' });
        await page.emulateMedia({ media: 'screen' });
        assert.equal(await page.locator('[data-print]').isVisible(), true);
      } else if (route === 'work/factory-reporting/') {
        assert.equal(await page.locator('.workflow-step').count(), 3);
        await page.locator('#issue').selectOption('1');
        await page.locator('#critical').check();
        await page.locator('#status').selectOption('2');
        assert.equal(await page.locator('#summary-status').innerText(), lang === 'en' ? 'Resolved' : 'Επιλύθηκε');
        assert.equal(await page.locator('#management-summary').getAttribute('aria-live'), 'polite');
        assert.equal(await page.locator('#management-summary').evaluate(el => el.classList.contains('is-critical')), true);
        await page.locator('button[type=reset]').click();
        await page.waitForFunction(() => document.querySelector('#status').value === '0' && !document.querySelector('#critical').checked);
      }
      await page.goto(`${base}/${lang}/${route}`);
      if (name === 'chromium') {
        await page.keyboard.press('Tab');
        assert.equal(await page.locator('.skip').evaluate(el => el === document.activeElement), true);
        await page.keyboard.press('Enter');
        assert.equal(new URL(page.url()).hash, '#main');
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
      if (name === 'chromium') {
        await page.locator('h1').click();
        for (const image of await page.locator('img').all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(img => img.decode());
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.screenshot({ path: `test-results/${lang}-${route.replaceAll('/', '-') || 'home'}desktop.png`, fullPage: true });
        await page.setViewportSize({ width: 390, height: 844 });
        await page.screenshot({ path: `test-results/${lang}-${route.replaceAll('/', '-') || 'home'}mobile.png`, fullPage: true });
      }
    }
    await page.goto(`${base}/${lang}/#project`);
    await page.waitForURL(`**/${lang}/work/factory-reporting/`);
    await page.goto(`${base}/${lang}/#education`);
    await page.waitForURL(`**/${lang}/experience/#education`);
    await page.close();
    results.push(`${name} ${lang}: all 6 pages, 7 widths, 200% text, image decoding, internal links, language paths, project journeys, CV filters and print, demo/reset, reduced motion and legacy bookmarks PASS`);
  }
  const mobile = await browser.newContext(name === 'webkit' ? devices['iPhone 13'] : devices['Pixel 7']);
  const phone = await mobile.newPage();
  await phone.goto(`${base}/el/experience/`);
  await phone.locator('[data-filter=technical]').tap();
  assert.equal(await phone.locator('.timeline li:visible').count(), 4);
  await phone.goto(`${base}/el/work/factory-reporting/`);
  await phone.locator('#critical').tap();
  assert.equal(await phone.locator('#critical').isChecked(), true);
  await phone.setViewportSize({ width: 844, height: 390 });
  assert.equal(await phone.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await mobile.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const fallback = await noJs.newPage();
  await fallback.goto(`${base}/el/experience/`);
  assert.equal(await fallback.locator('.timeline li:visible').count(), 6);
  assert.equal(await fallback.locator('.filters').isVisible(), false);
  await fallback.goto(`${base}/el/work/factory-reporting/`);
  assert.equal(await fallback.locator('noscript').isVisible(), true);
  await noJs.close();
  await browser.close();
  results.push(`${name}: touch and no-JavaScript fallback PASS`);
}
assert.deepEqual(errors, []);
assert.equal((await fetch(base)).status, 200);
async function audit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await audit(path);
    else {
      assert.ok(!path.endsWith('.pdf'), `Private PDF in build: ${path}`);
      if (/\.(html|js|css)$/.test(path)) {
        const content = await readFile(path, 'utf8');
        assert.ok(!/marios_toump@|899\s?839\s?734|697\s?267\s?6786/.test(content), `Private contact in ${path}`);
        if (path.endsWith('.html')) assert.doesNotMatch(content, /Claims, operations &amp; practical tools|Skills in practice|Three projects I am actively/);
      }
    }
  }
}
await audit('dist');
results.push('Build privacy and retired-copy checks PASS. Mobile checks use emulation, not physical devices.');
await writeFile('test-results/verification.txt', results.join('\n') + '\n');
console.log(results.join('\n'));
