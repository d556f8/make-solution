import puppeteer from 'puppeteer';

export default async function getHtml(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('div.mt-2.flex.flex-wrap.gap-y-3');
  const html = await page.content();
  await browser.close();
  return html;
}
