#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

function header(title) {
  console.log("\n" + "─".repeat(60));
  console.log(title);
  console.log("─".repeat(60));
}

const projectRoot = path.resolve(__dirname, "..");

header("Process & Execution Context");

console.log("process.cwd():        ", process.cwd());
console.log("__dirname (script):   ", __dirname);
console.log("projectRoot (guess):  ", projectRoot);
console.log("process.execPath:     ", process.execPath);
console.log("process.argv:         ", process.argv.join(" "));

header("package.json Resolution");

const pkgPath = path.join(projectRoot, "package.json");
if (!fs.existsSync(pkgPath)) {
  console.error("❌ package.json NOT FOUND at", pkgPath);
  process.exit(1);
}

console.log("package.json path:    ", pkgPath);

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

console.log("package.json main:    ", pkg.main ?? "(not set)");

if (pkg.main) {
  const resolvedMain = path.resolve(projectRoot, pkg.main);
  console.log("resolved main path:   ", resolvedMain);
  console.log(
    "main exists:          ",
    fs.existsSync(resolvedMain) ? "YES" : "NO ❌"
  );
}

header("Electron Resolution");

try {
  const electronIndex = require.resolve("electron", { paths: [projectRoot] });
  console.log("electron module index:", electronIndex);

  const electronBin = path.join(
    projectRoot,
    "node_modules",
    ".bin",
    "electron"
  );

  console.log("electron launcher:", electronBin);
  console.log(
    "launcher exists:     ",
    fs.existsSync(electronBin) ? "YES" : "NO ❌"
  );
} catch {
  console.error("❌ Electron NOT resolvable from project root");
}

header("Path Normalization Examples");

if (pkg.main) {
  console.log("path.join(root,main): ",
    path.join(projectRoot, pkg.main)
  );
  console.log("path.resolve(root,main):",
    path.resolve(projectRoot, pkg.main)
  );
}

header("Summary");

console.log("If Electron fails to launch:");
console.log("- process.cwd() should equal project root");
console.log("- package.json main must exist");
console.log("- resolved main path must exist");
console.log("- electron must resolve from project root");

console.log("\n✅ check-paths completed");
