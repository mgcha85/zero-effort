# MiniToolbox Chrome Extension

100% Client-Side Privacy Web Utilities Quick Launcher for Google Chrome & Chromium browsers.

## 🚀 How to Install in Developer Mode

1. Open Google Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** toggle in the top-right corner.
3. Click **Load unpacked** (압축해제된 확장 프로그램을 로드합니다).
4. Select the `extensions/chrome-minitoolbox` directory.
5. Pin the **MiniToolbox** icon to your toolbar for instant 1-click access to all 8 client-side utilities!

## 📦 How to Package for Chrome Web Store

Run:
```bash
cd extensions/chrome-minitoolbox
zip -r ../minitoolbox-chrome-extension.zip * -x "*.DS_Store"
```
Upload `minitoolbox-chrome-extension.zip` to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/).
