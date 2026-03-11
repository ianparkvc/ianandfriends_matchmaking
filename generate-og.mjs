import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    font-family: 'Pretendard', -apple-system, sans-serif;
    position: relative;
    background: #F9F3F0;
  }
  .mesh {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 30%, rgba(212,112,126,0.18), transparent),
      radial-gradient(ellipse 50% 60% at 80% 70%, rgba(200,166,130,0.15), transparent),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(220,140,160,0.10), transparent);
  }
  .content {
    position: relative; z-index: 1;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 100%;
    text-align: center;
    padding: 40px;
  }
  .label {
    font-size: 16px;
    letter-spacing: 4px;
    color: rgba(140,80,90,0.5);
    text-transform: uppercase;
    margin-bottom: 32px;
    font-weight: 400;
  }
  .title {
    font-size: 72px;
    font-weight: 200;
    letter-spacing: -2px;
    background: linear-gradient(135deg, #6B3A3A 0%, #D4707E 40%, #C8A682 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
    margin-bottom: 28px;
  }
  .desc {
    font-size: 20px;
    color: rgba(80,50,55,0.55);
    line-height: 1.6;
    font-weight: 300;
  }
  .domain {
    position: absolute;
    bottom: 36px;
    font-size: 15px;
    color: rgba(140,80,90,0.35);
    letter-spacing: 1px;
    font-weight: 400;
  }
</style>
</head>
<body>
  <div class="mesh"></div>
  <div class="content">
    <div class="label">Private Date Matching</div>
    <div class="title">이안과 친구들</div>
    <div class="desc">
      데이팅앱은 잊으세요.<br>
      신뢰할 수 있는 사람이 소개하는, 진짜 만남.
    </div>
  </div>
  <div class="domain" style="width:100%;text-align:center;">ianandpartners.com</div>
</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(__dirname, "public", "og-image.png"),
    type: "png",
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  await browser.close();
  console.log("OG image saved to public/og-image.png");
})();
