function escapeField(value) {
  const str = value == null ? "" : String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * @param {Array<Record<string, unknown>>} rows
 * @param {string[]} [columns]
 * @returns {string}
 */
export function toCsv(rows, columns) {
  if (!rows || rows.length === 0) {
    return columns ? columns.join(",") + "\n" : "";
  }

  const cols = columns ?? Object.keys(rows[0]);
  const header = cols.map(escapeField).join(",");
  const body = rows
    .map((row) => cols.map((col) => escapeField(row[col])).join(","))
    .join("\n");

  return `${header}\n${body}\n`;
}

/**
 * @param {string} csvString
 * @param {string} filename
 */
export function downloadCsv(csvString, filename = "export.csv") {
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
