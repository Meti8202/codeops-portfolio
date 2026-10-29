const LOCALE = "en-ET";
const TIME_ZONE = "Africa/Addis_Ababa";

export const etb = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

const dateTime = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * @param {string | Date} isoOrDate
 * @returns {string}
 */
export function when(isoOrDate) {
  const date = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "—";
  return dateTime.format(date);
}

/**
 * @param {string | Date} isoOrDate
 * @returns {string}
 */
export function relative(isoOrDate) {
  const date = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "—";

  const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSec);
  const rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });

  if (abs < 60) return rtf.format(diffSec, "second");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  return rtf.format(Math.round(diffSec / 86400), "day");
}
