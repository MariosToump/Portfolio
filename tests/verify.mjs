import { chromium, webkit, devices } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';

const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
await mkdir('test-results', { recursive: true });
const results = [];
const errors = [];
for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  for (const lang of ['en', 'el']) {
    const page = await browser.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(`${base}/${lang}/`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => document.querySelector('.hero')?.classList.contains('is-entered'));
    assert.equal(await page.locator('html').getAttribute('lang'), lang);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.ambient-network').getAttribute('aria-hidden'), 'true');
    assert.equal(await page.locator('.ambient-network').evaluate(el => getComputedStyle(el).pointerEvents), 'none');
    assert.equal(await page.locator('h1').evaluate(el => getComputedStyle(el).fontFamily.split(',')[0].replaceAll('"', '')), 'Inter');
    assert.equal(await page.evaluate(() => [...document.fonts].filter(font => font.family === 'Inter' && font.status === 'loaded').length >= 2), true);
    assert.equal(await page.locator('.career-stage').count(), 4);
    assert.equal(await page.locator('.timeline .role-icon').count(), 6);
    assert.equal(await page.locator('.report-workflow[role="img"] .workflow-step').count(), 3);
    assert.equal(await page.locator('#projects .project-entry').count(), 3);
    assert.equal(await page.locator('#warlocks-android').count(), 1);
    assert.equal(await page.locator('#piano-app').count(), 1);
    assert.equal(await page.locator('#neon-riot').count(), 1);
    assert.doesNotMatch(await page.locator('#projects').innerText(), /Wedding media uploader|My Task Sleep|wedding-uploads|shutdown-timer-app/i);
    assert.deepEqual(await page.locator('#projects .source-link').evaluateAll(links => links.map(link => link.getAttribute('href'))), [
      'https://github.com/MariosToump/warlocks_on_android',
      'https://github.com/MariosToump/warlocks_on_android/releases/latest',
      'https://neon-riot.ui8.dev',
      'https://ui8.ai/forge/',
    ]);
    const music = await page.locator('#creative').innerText();
    assert.doesNotMatch(music, /Adobe|Photoshop|Premiere|After Effects/i);
    assert.match(music, lang === 'en' ? /two full-length albums/i : /δύο ολοκληρωμένα άλμπουμ/i);
    assert.equal(await page.locator('.timeline li:visible').count(), 6);
    for (const preview of await page.locator('.project-visual img').all()) {
      await preview.scrollIntoViewIfNeeded();
      await preview.evaluate(img => img.decode());
      assert.equal(await preview.evaluate(img => img.complete && img.naturalWidth > 0), true);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    assert.equal(await page.locator('.hero-portrait img').evaluate(img => img.complete && img.naturalWidth > 0), true);
    for (const width of [320, 360, 390, 768, 820, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, `${name} ${lang} ${width}: horizontal overflow`);
      const intactName = await page.locator('.name-part').evaluateAll(parts => parts.every(part => {
        const range = document.createRange();
        range.selectNodeContents(part);
        return range.getClientRects().length === 1 && part.scrollWidth <= part.clientWidth;
      }));
      assert.equal(intactName, true, `${name} ${lang} ${width}: name must not break inside a word`);
      const separatedPortrait = await page.evaluate(() => {
        const title = document.querySelector('h1').getBoundingClientRect();
        const portrait = document.querySelector('.hero-portrait').getBoundingClientRect();
        return title.right <= portrait.left || portrait.right <= title.left || title.bottom <= portrait.top || portrait.bottom <= title.top;
      });
      assert.equal(separatedPortrait, true, `${name} ${lang} ${width}: portrait must not overlap the name`);
    }
    await page.locator('.hero-portrait').hover();
    await page.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('.hero-portrait img')).transform).a > 1.01);
    await page.mouse.move(0, 0);
    await page.locator('[data-filter="technical"]').click();
    assert.equal(await page.locator('.timeline li:visible').count(), 4);
    assert.equal(await page.locator('#accenture').isVisible(), false);
    await page.locator('[data-filter="operations"]').click();
    assert.equal(await page.locator('.timeline li:visible').count(), 4);
    assert.equal(await page.locator('#sovel-web').isVisible(), false);
    await page.locator('[data-filter="all"]').click();
    assert.equal(await page.locator('.timeline li:visible').count(), 6);
    await page.locator('#issue').selectOption('1');
    await page.locator('#critical').check();
    await page.locator('#status').selectOption('1');
    assert.match(await page.locator('#summary-issue').innerText(), lang === 'en' ? /Cooling pump/ : /Αντλία/);
    assert.equal(await page.locator('#summary-status').innerText(), lang === 'en' ? 'In progress' : 'Σε εξέλιξη');
    assert.equal(await page.locator('#management-summary').getAttribute('aria-live'), 'polite');
    assert.equal(await page.locator('#management-summary').evaluate(el => el.classList.contains('is-critical')), true);
    await page.locator('#status').selectOption('2');
    assert.equal(await page.locator('#summary-status').innerText(), lang === 'en' ? 'Resolved' : 'Επιλύθηκε');
    await page.locator('button[type="reset"]').click();
    await page.waitForFunction(() => document.querySelector('#summary-status').textContent === document.querySelector('#status').options[0].textContent);
    assert.equal(await page.locator('#issue').inputValue(), '0');
    assert.equal(await page.locator('#critical').isChecked(), false);
    assert.equal(await page.locator('#status').inputValue(), '0');
    await page.goto(`${base}/${lang}/#project`);
    await page.locator('.utility .language-switch').click();
    assert.equal(new URL(page.url()).hash, '#project');
    assert.equal(new URL(page.url()).pathname, lang === 'en' ? '/el/' : '/en/');
    await page.goto(`${base}/${lang}/`);
    await page.keyboard.press('Tab');
    if (name === 'chromium') {
      assert.equal(await page.locator('.skip').evaluate(el => el === document.activeElement), true);
    } else {
      // Windows WebKit excludes links from its default Tab cycle. Check its
      // button focus, then verify skip-link activation with explicit focus.
      assert.equal(await page.locator('[data-print]').evaluate(el => el === document.activeElement), true);
      await page.locator('.skip').focus();
    }
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#main');
    await page.locator('#critical').focus();
    await page.keyboard.press('Space');
    assert.equal(await page.locator('#critical').isChecked(), true);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${name} ${lang} text zoom overflow`);
    await page.evaluate(() => document.documentElement.style.fontSize = '');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    await page.locator('.hero-portrait').hover();
    assert.equal(await page.locator('.hero-portrait img').evaluate(img => getComputedStyle(img).transform), 'none');
    await page.locator('[data-filter="technical"]').click();
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('.timeline li:visible').count(), 6);
    assert.equal(await page.locator('.demo').isVisible(), false);
    assert.equal(await page.locator('nav').isVisible(), false);
    if (name === 'chromium') await page.pdf({ path: `test-results/cv-${lang}.pdf`, format: 'A4', printBackground: true });
    await page.emulateMedia({ media: 'screen' });
    await page.locator('[data-filter="all"]').click();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${base}/${lang}/`);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.evaluate(() => document.fonts.check('16px "Inter"', 'Μάριος Τουμπούλας')), true);
    assert.equal(await page.evaluate(() => document.fonts.check('16px "Inter"', 'Επαγγελματική εμπειρία')), true);
    if (name === 'chromium') {
      await page.screenshot({ path: `test-results/desktop-${lang}.png`, fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: `test-results/mobile-${lang}.png`, fullPage: true });
    }
    const links = await page.locator('a[href]').evaluateAll(elements => elements.map(el => el.getAttribute('href')).filter(href => href.startsWith('/') || href.startsWith('#')));
    for (const href of links) {
      const url = new URL(href, page.url());
      const response = await page.request.get(url.href);
      assert.equal(response.ok(), true, `broken internal link: ${url}`);
      if (url.hash) {
        const html = await response.text();
        assert.ok(html.includes(`id="${url.hash.slice(1)}"`), `missing anchor ${url}`);
      }
    }
    await page.close();
    results.push(`${name} /${lang}/: widths 320, 360, 390, 768, 820, 1024, 1440; portrait and project images; 200% text; filters; demo; reset; keyboard; language anchor; fonts; reduced motion; print; internal links PASS`);
  }
  const mobile = await browser.newContext(name === 'webkit' ? devices['iPhone 13'] : devices['Pixel 7']);
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${base}/el/`);
  await mobilePage.locator('[data-filter="technical"]').tap();
  assert.equal(await mobilePage.locator('.timeline li:visible').count(), 4);
  await mobilePage.locator('#critical').tap();
  assert.equal(await mobilePage.locator('#critical').isChecked(), true);
  await mobilePage.locator('#status').selectOption('2');
  assert.equal(await mobilePage.locator('#summary-status').innerText(), 'Επιλύθηκε');
  await mobilePage.locator('button[type="reset"]').tap();
  assert.equal(await mobilePage.locator('#critical').isChecked(), false);
  await mobilePage.locator('.hero-portrait').tap();
  assert.equal(await mobilePage.locator('.hero-portrait img').evaluate(img => getComputedStyle(img).transform), 'none');
  assert.ok(await mobilePage.locator('.hero-portrait').evaluate(el => el.getBoundingClientRect().height >= 350));
  assert.equal(await mobilePage.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await mobilePage.setViewportSize({ width: 844, height: 390 });
  assert.equal(await mobilePage.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  results.push(`${name}: ${name === 'webkit' ? 'iPhone 13' : 'Pixel 7'} touch emulation PASS`);
  await mobile.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const fallback = await noJs.newPage();
  await fallback.goto(`${base}/el/`);
  assert.equal(await fallback.locator('.timeline li:visible').count(), 6);
  assert.equal(await fallback.locator('.filters').isVisible(), false);
  assert.equal(await fallback.locator('noscript').isVisible(), true);
  await noJs.close();
  await browser.close();
}
assert.deepEqual(errors, []);
for (const route of ['/', '/en/', '/el/']) assert.equal((await fetch(`${base}${route}`)).status, 200);
async function audit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await audit(path);
    else {
      assert.ok(!path.endsWith('.pdf'), `Private PDF in build: ${path}`);
      if (/\.(html|js|css)$/.test(path)) {
        const content = await readFile(path, 'utf8');
        assert.ok(!/marios_toump@|899\s?839\s?734|697\s?267\s?6786/.test(content), `Private contact in ${path}`);
      }
    }
  }
}
await audit('dist');
results.push('Root, static links and default privacy audit PASS. No physical-device tests performed.');
await writeFile('test-results/verification.txt', results.join('\n') + '\n');
console.log(results.join('\n'));
