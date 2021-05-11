const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  const url = "https://mainulhassan.info/";

  const width = 1366;

  // Set width.
  await page.setViewport({ width, height: 1 });

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  // Get scroll height of the rendered page and set viewport
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewport({ width, height: bodyHeight });

  await page.waitForTimeout(3000);

  const timestamp = Date.now();

  await page.screenshot({
    path: `./images/${timestamp}.png`,
    fullPage: true,
  });

  await browser.close();
})();
