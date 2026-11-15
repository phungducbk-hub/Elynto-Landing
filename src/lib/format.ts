/** Formats a day of the illustrated month with the dictionary's pattern ("{dd}/10", "Oct {d}"). */
export function formatDay(pattern: string, day: number) {
  return pattern.replace("{dd}", String(day).padStart(2, "0")).replace("{d}", String(day));
}
