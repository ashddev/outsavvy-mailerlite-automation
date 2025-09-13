import emojiRegex from "emoji-regex";
import * as cheerio from "cheerio";

export function stripEmojisAndWhitespace(s: string): string {
  return s.replace(emojiRegex(), "").trim();
}

export function stripLinks(html: string): string {
  const $ = cheerio.load(html);
  $("a").remove();
  return $.html();
}

export function formatEventDate(startIso: string, endIso?: string): string {
  const start = new Date(startIso);
  const end = endIso ? new Date(endIso) : null;

  const dayName = start.toLocaleDateString("en-GB", {
    weekday: "short",
  });
  const month = start.toLocaleDateString("en-GB", { month: "short" });
  const day = start.toLocaleDateString("en-GB", { day: "numeric" });

  const fmt = (d: Date) =>
    d
      .toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC",
      })
      .toLowerCase()
      .replace(":00", "")
      .replace(" ", "");

  let timeDisplay = fmt(start);

  if (end) {
    const s = fmt(start);
    const e = fmt(end);

    const sSuffix = s.slice(-2);
    const eSuffix = e.slice(-2);

    if (sSuffix === eSuffix) {
      const sNoSuffix = s.slice(0, -2);
      timeDisplay = `${sNoSuffix}–${e}`;
    } else {
      timeDisplay = `${s}–${e}`;
    }
  }

  return `${dayName} — ${month} ${day} — ${timeDisplay}`;
}
