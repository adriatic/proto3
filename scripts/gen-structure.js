#!/usr/bin/env node

/**
 * PACT Structure Generator
 *
 * This script enforces the declarative filesystem structure defined in
 * structure/pact.structure.json.
 *
 * Safety guarantees:
 * - Dry-run by default
 * - Never overwrites existing files
 * - Never deletes anything
 * - Idempotent
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const STRUCTURE_FILE = path.join(ROOT, "structure", "pact.structure.json");

const APPLY = process.argv.includes("--apply");

function log(prefix, message) {
  console.log(`${prefix} ${message}`);
}

function readStructure() {
  if (!fs.existsSync(STRUCTURE_FILE)) {
    throw new Error(`Missing structure file: ${STRUCTURE_FILE}`);
  }
  return JSON.parse(fs.readFileSync(STRUCTURE_FILE, "utf8"));
}

function ensureDir(dirPath) {
  const fullPath = path.join(ROOT, dirPath);
  if (fs.existsSync(fullPath)) {
    log("✓ exists:", dirPath);
    return;
  }
  if (APPLY) {
    fs.mkdirSync(fullPath, { recursive: true });
    log("+ created:", dirPath);
  } else {
    log("+ would create:", dirPath);
  }
}

function ensureFile(filePath, content) {
  const fullPath = path.join(ROOT, filePath);
  if (fs.existsSync(fullPath)) {
    log("! skip (exists):", filePath);
    return;
  }
  if (APPLY) {
    fs.writeFileSync(fullPath, content, "utf8");
    log("+ created:", filePath);
  } else {
    log("+ would create:", filePath);
  }
}

function main() {
  log(APPLY ? "[APPLY]" : "[DRY-RUN]", "PACT structure generator");

  const structure = readStructure();

  if (!structure.dirs || !structure.files) {
    throw new Error("Invalid structure file: expected dirs and files");
  }

  structure.dirs.forEach(ensureDir);

  Object.entries(structure.files).forEach(([file, content]) =>
    ensureFile(file, content)
  );

  log("✔ done:", "structure verified");
}

try {
  main();
} catch (err) {
  console.error("✖ error:", err.message);
  process.exit(1);
}
