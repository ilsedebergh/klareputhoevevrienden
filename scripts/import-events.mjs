import fs from "node:fs/promises";
import path from "node:path";

import { parse } from "csv-parse/sync";
import ExcelJS from "exceljs";

import { createStory, listStories } from "./storyblok-management.mjs";

function usage() {
  console.log("Usage: node scripts/import-events.mjs <file.xlsx|file.csv> [--draft]");
}

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function getValue(row, keys) {
  for (const key of keys) {
    const normalized = normalizeKey(key);
    const value = row[normalized];

    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }

  return "";
}

function toNormalizedRow(row) {
  return Object.fromEntries(Object.entries(row).map(([key, value]) => [normalizeKey(key), value]));
}

function excelSerialToDate(serial) {
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  return new Date(excelEpoch.getTime() + serial * 86400000);
}

function normalizeDate(value) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "number") {
    return excelSerialToDate(value).toISOString();
  }

  const text = String(value).trim();
  const numeric = Number(text);
  if (!Number.isNaN(numeric) && numeric > 20000 && numeric < 60000) {
    return excelSerialToDate(numeric).toISOString();
  }

  const date = new Date(text);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }

  const match = text.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})$/);
  if (!match) {
    return "";
  }

  const [, day, month, year] = match;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return new Date(`${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T12:00:00`).toISOString();
}

function excelCellValueToPrimitive(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (value instanceof Date || typeof value === "number" || typeof value === "string") {
    return value;
  }

  if (typeof value === "object") {
    if ("text" in value && value.text) {
      return value.text;
    }

    if ("result" in value && value.result !== undefined && value.result !== null) {
      return value.result;
    }

    if ("richText" in value && Array.isArray(value.richText)) {
      return value.richText.map((part) => part.text || "").join("");
    }

    if ("hyperlink" in value && value.text) {
      return value.text;
    }
  }

  return String(value);
}

async function loadRows(filePath) {
  const resolvedPath = path.resolve(filePath);
  const extension = path.extname(resolvedPath).toLowerCase();

  if (extension === ".csv") {
    const input = await fs.readFile(resolvedPath, "utf8");
    return parse(input, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(resolvedPath);
  const worksheet = workbook.worksheets[0];

  if (!worksheet) {
    return [];
  }

  const headerRow = worksheet.getRow(1);
  const headers = [];
  const rows = [];

  headerRow.eachCell({ includeEmpty: true }, (cell, columnNumber) => {
    headers[columnNumber] = normalizeKey(excelCellValueToPrimitive(cell.value));
  });

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) {
      return;
    }

    const record = {};
    let hasValue = false;

    headers.forEach((header, columnNumber) => {
      if (!header) {
        return;
      }

      const value = excelCellValueToPrimitive(row.getCell(columnNumber).value);
      if (value !== "") {
        hasValue = true;
      }

      record[header] = value;
    });

    if (hasValue) {
      rows.push(record);
    }
  });

  return rows;
}

async function ensureActivitiesFolder(existingStories) {
  const folder = existingStories.find((story) => story.is_folder && story.slug === "activiteiten");

  if (!folder) {
    throw new Error("Folder 'activiteiten' not found. Run npm run bootstrap:cms first.");
  }

  return folder;
}

async function main() {
  const filePath = process.argv[2];
  const publish = !process.argv.includes("--draft");

  if (!filePath) {
    usage();
    process.exit(1);
  }

  const rows = await loadRows(filePath);
  const normalizedRows = rows.map(toNormalizedRow);
  const existingStories = await listStories();
  const activitiesFolder = await ensureActivitiesFolder(existingStories);
  const existingFullSlugs = new Set(existingStories.map((story) => story.full_slug));

  let createdCount = 0;
  let skippedCount = 0;

  for (const row of normalizedRows) {
    const title = getValue(row, ["titel", "title", "naam", "event", "evenement"]);
    const date = normalizeDate(getValue(row, ["datum", "date", "startdatum", "start_date"]));
    const location = getValue(row, ["locatie", "location", "plaats"]);
    const excerpt = getValue(row, [
      "korte_tekst",
      "omschrijving",
      "beschrijving",
      "excerpt",
      "tekst"
    ]);

    if (!title || !date) {
      skippedCount += 1;
      continue;
    }

    const slug = slugify(`${title}-${date.slice(0, 10)}`);
    const fullSlug = `activiteiten/${slug}`;

    if (existingFullSlugs.has(fullSlug)) {
      skippedCount += 1;
      continue;
    }

    await createStory(
      {
        name: title,
        slug,
        parent_id: activitiesFolder.id,
        content: {
          component: "event",
          title,
          date,
          location,
          excerpt,
          seo_title: title,
          seo_description: excerpt || location || title
        }
      },
      publish
    );

    existingFullSlugs.add(fullSlug);
    createdCount += 1;
    console.log(`created event ${fullSlug}`);
  }

  console.log(`Import finished. Created: ${createdCount}. Skipped: ${skippedCount}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
