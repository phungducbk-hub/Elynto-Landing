/** Formats a day of the illustrated month with the dictionary's pattern ("{dd}/10", "Oct {d}"). */
export function formatDay(pattern: string, day: number) {
  return pattern.replace("{dd}", String(day).padStart(2, "0")).replace("{d}", String(day));
}

/** Concrete dates in the product experience are stored as dd/mm/yyyy. */
export function formatWorkDate(value: string, lang: "vi" | "en") {
  if (lang === "vi") return value;
  const [day, month, year] = value.split("/").map(Number);
  if (!day || !month || !year) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, day)));
}
