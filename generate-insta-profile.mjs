import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const photoB64 = fs.readFileSync(path.join(__dirname, "public", "ian-profile.jpg")).toString("base64");

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css');
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 800px;
    height: 800px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F9F3F0;
    position: relative;
  }
  .mesh {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 70% 70% at 25% 25%, rgba(212,112,126,0.2), transparent),
      radial-gradient(ellipse 60% 60% at 75% 75%, rgba(200,166,130,0.18), transparent),
      radial-gradient(ellipse 50% 50% at 50% 40%, rgba(245,208,214,0.12), transparent);
  }
  .content {
    position: relative; z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .photo {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 15%;
    border: 3px solid rgba(255,255,255,0.6);
    box-shadow: 0 8px 40px rgba(212,112,126,0.15), 0 2px 12px rgba(0,0,0,0.06);
    margin-bottom: 32px;
  }
  .logo-text {
    font-family: 'Pretendard', sans-serif;
    font-size: 72px;
    font-weight: 200;
    letter-spacing: -2px;
    background: linear-gradient(135deg, #6B3A3A 0%, #D4707E 40%, #C8A682 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
    margin-bottom: 14px;
  }
  .sub {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 24px;
    font-weight: 300;
    font-style: italic;
    color: rgba(110,98,102,0.4);
    letter-spacing: 2px;
    margin-bottom: 18px;
  }
  .tagline {
    font-family: 'Pretendard', sans-serif;
    font-size: 15px;
    font-weight: 300;
    color: rgba(110,98,102,0.45);
    letter-spacing: 0.5px;
  }
</style>
</head>
<body>
  <div class="mesh"></div>
  <div class="content">
    <img class="photo" src="data:image/jpeg;base64,${photoB64}" />
    <div class="logo-text">이안과 친구들</div>
    <div class="sub">Ian &amp; Friends</div>
    <div class="tagline">Private Date Matching</div>
  </div>
</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(__dirname, "insta-profile.png"),
    type: "png",
    clip: { x: 0, y: 0, width: 800, height: 800 },
  });
  await browser.close();
  console.log("Instagram profile saved to insta-profile.png");
})();
