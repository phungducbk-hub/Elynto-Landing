import type { Device } from "./types";

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|embedly|python|curl|wget|httpclient|axios|node-fetch|go-http|java\//i;

export function isBot(userAgent: string) {
  return !userAgent || BOT.test(userAgent);
}

/**
 * Coarse device, browser and OS from a user agent. Only these categories are kept, never the
 * raw string. `touch` lets an iPad in desktop mode (Macintosh UA + touch screen) count as a tablet.
 */
export function describeUserAgent(userAgent: string, touch = false): { device: Device; browser: string; os: string } {
  const ua = userAgent;

  let os = "Khác";
  if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/CrOS/i.test(ua)) os = "ChromeOS";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = touch ? "iOS" : "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "Khác";
  if (/Edg(e|A|iOS)?\//i.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
  else if (/SamsungBrowser/i.test(ua)) browser = "Samsung Internet";
  else if (/coc_coc_browser|CocCoc/i.test(ua)) browser = "Cốc Cốc";
  else if (/Zalo/i.test(ua)) browser = "Zalo";
  else if (/FBAN|FBAV|Instagram/i.test(ua)) browser = "Facebook / Instagram";
  else if (/Firefox|FxiOS/i.test(ua)) browser = "Firefox";
  else if (/Chrome|CriOS/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua)) browser = "Safari";

  let device: Device = "desktop";
  if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua)) || (os === "iOS" && /Macintosh/i.test(ua))) {
    device = "tablet";
  } else if (/Mobi|iPhone|iPod|Android/i.test(ua)) {
    device = "mobile";
  }

  return { device, browser, os };
}
