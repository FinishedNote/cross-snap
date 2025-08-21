import { firefox, chromium, webkit } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateDate = () => {
  // Implementation for generating a Windows-safe date string
  const date = new Date();
  // Remove colons and dots for Windows folder compatibility
  return date.toISOString().replace(/[:.]/g, "-");
};

const generateSnapshot = async (url, browsers, width, height) => {
  // Define the output directory (e.g. ./screenshots)
  const outputDir = path.join(
    __dirname,
    `../reports/screenshots/${generateDate()}`
  );

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browsersList = browsers.split(" ");
  for (const browserName of browsersList) {
    let browser;
    switch (browserName.toLowerCase()) {
      case "chrome":
        browser = await chromium.launch();
        break;
      case "firefox":
        browser = await firefox.launch();
        break;
      case "webkit":
        browser = await webkit.launch();
        break;
      default:
        console.error(`Unsupported browser: ${browserName}`);
        continue;
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    width = parseInt(width, 10) || 1440;
    height = parseInt(height, 10) || 900;
    await page.setViewportSize({ width, height });
    await page.goto(url);

    // Save screenshot
    const filePath = path.join(outputDir, `${browserName}-snapshot.png`);
    await page.screenshot({ path: filePath });
    await browser.close();
  }
};

const snapshot = ({
  url,
  width = 1440,
  height = 900,
  browsers = "chrome firefox webkit",
}) => {
  try {
    generateSnapshot(url, browsers, width, height);
    generateDate();
  } catch (err) {
    console.error(err);
  }
};

export default snapshot;
