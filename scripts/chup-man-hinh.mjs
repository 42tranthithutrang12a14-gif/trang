// Chụp ảnh một trang web công khai để làm hình minh họa cho hướng dẫn thao tác.
// Cách dùng: npm run chup -- <url> public/thao-tac/<slug>/<ten>.png [--rong 1280] [--cao 800] [--ca-trang]
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const [url, output, ...flags] = process.argv.slice(2);
const flagValue = (name, fallback) => {
  const index = flags.indexOf(name);
  return index >= 0 ? Number(flags[index + 1]) : fallback;
};

const target = output ? path.resolve(output) : "";
const allowedDir = path.resolve("public/thao-tac") + path.sep;
if (!url || !/^(https:\/\/|http:\/\/localhost[:/])/.test(url) || !target.startsWith(allowedDir) || !target.endsWith(".png")) {
  console.error("Cách dùng: npm run chup -- https://... public/thao-tac/<slug>/<ten>.png [--rong 1280] [--cao 800] [--ca-trang]");
  process.exit(1);
}

// Cloud sessions ship one Chromium build; the project's Playwright version may expect another.
const systemChromium = "/opt/pw-browsers/chromium";
const browser = await chromium.launch(existsSync(systemChromium) ? { executablePath: systemChromium } : {});
try {
  const page = await browser.newPage({
    viewport: { width: flagValue("--rong", 1280), height: flagValue("--cao", 800) },
    locale: "vi-VN",
  });
  const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await mkdir(path.dirname(target), { recursive: true });
  await page.screenshot({ path: target, fullPage: flags.includes("--ca-trang") });
  const size = await page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight, full: document.documentElement.scrollHeight }));
  console.log(JSON.stringify({
    status: response?.status() ?? null,
    title: await page.title(),
    image: "/" + path.relative(path.resolve("public"), target).split(path.sep).join("/"),
    image_width: size.width,
    image_height: flags.includes("--ca-trang") ? size.full : size.height,
  }, null, 2));
} finally {
  await browser.close();
}
