import { launch } from 'puppeteer';

export async function fetchPageWithPuppeteer({ url }) {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const content = await page.content();
  await browser.close();
  return content;
}
