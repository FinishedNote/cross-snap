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

const generateReport = (outputDir, browsers) => {
  const html = `
  <html>
    <head>
      <title>Cross-Snap Report</title>
      <style>
          body {
          font-family: sans-serif;
          padding: 20px;
          display: flex;
          flex-direction: column;
          background: #f4f4f4;
        }
        h1 {
          font-size: 2rem;
          font-weight: 900;
          text-align: center;
        }
        .container {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 1em;
        }
        .browser {
          margin-bottom: 20px;
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
        }
        img {
          max-width: 400px;
          border-radius: 10px;
          border: 1px solid #ccc;
          box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
      <h1>Cross-Snap Report</h1>
      <div class="container">
      ${browsers
        .split(" ")
        .map(
          (b) => `
        <div class="browser">
          <h2>${b}</h2>
          <img src="${b}-snapshot.png" />
        </div>
      `
        )
        .join("\n")}
      </div>
    </body>
  </html>`;

  const filePath = path.join(outputDir, "report.html");
  fs.writeFileSync(filePath, html);

  console.log(`📄 Report generated: ${filePath}`);
};

const generateSnapshot = async (url, browsers, width, height) => {
  // Define the output directory (e.g. ../reports)
  const outputDir = path.join(__dirname, `../reports/${generateDate()}`);

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
  // return the directory where screenshots were saved so caller can reuse it
  return outputDir;
};

const snapshot = async ({
  url,
  width = 1440,
  height = 900,
  browsers = "chrome firefox webkit",
}) => {
  try {
    const outputDir = await generateSnapshot(url, browsers, width, height);
    generateReport(outputDir, browsers);
  } catch (err) {
    console.error(err);
  }
};

export default snapshot;
