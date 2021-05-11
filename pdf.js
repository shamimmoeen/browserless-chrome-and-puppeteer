const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  const url = "https://mainulhassan.info/";

  const width = 1920;

  await page.setViewport({ width, height: 1 });

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  // Get scroll height of the rendered page and set viewport
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  const finalHeight = bodyHeight + 50;

  await page.emulateMediaType("screen");

  const timestamp = Date.now();

  await page.pdf({
    path: `./pdfs/${timestamp}.pdf`,
    printBackground: true,
    width,
    height: finalHeight,
    scale: 1,
    // pageRanges: "1", // we don't need this as we added some extra space to the height
  });

  await browser.close();
})();
