import { chromium } from '@playwright/test';
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1440,height:1000}});
for(const [name,url] of [['icon','https://www.iconplatforms.com/en'],['talos','https://www.talosmind.ai']]) {
 await page.goto(url,{waitUntil:'networkidle',timeout:60000});
 console.log(name,await page.locator('h1,h2,p,body').evaluateAll(es=>es.slice(0,14).map(e=>({tag:e.tagName,text:e.innerText.slice(0,70),font:getComputedStyle(e).fontFamily,weight:getComputedStyle(e).fontWeight}))));
 console.log('fonts',await page.evaluate(()=>Array.from(document.fonts).map(f=>({family:f.family,status:f.status}))));
 await page.screenshot({path:`test-results/reference-${name}.png`});
}
await browser.close();
