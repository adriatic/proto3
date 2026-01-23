#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function check(label, ok, hint) {
  if (ok) {
    console.log(`✅ ${label}`);
  } else {
    console.error(`❌ ${label}`);
    if (hint) console.error(`   ↳ ${hint}`);
    process.exitCode = 1;
  }
}

const root = path.resolve(__dirname, "..");

// Node
check(
  "Node.js version >= 18",
  parseInt(process.versions.node.split(".")[0], 10) >= 18,
  "Upgrade Node.js (nvm install 18)"
);

// package.json
const pkgPath = path.join(root, "package.json");
check("package.json exists", fs.existsSync(pkgPath));

let pkg = null;
if (fs.existsSync(pkgPath)) {
  pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
}

// Electron
let electronOk = true;
try {
  require.resolve("electron", { paths: [root] });
} catch {
  electronOk = false;
}

check(
  "Electron installed",
  electronOk,
  "npm install --save-dev electron"
);

// Electron entry
if (pkg?.main) {
  check(
    "Electron main entry exists",
    fs.existsSync(path.join(root, pkg.main)),
    `Missing file: ${pkg.main}`
  );
} else {
  check(
    'package.json "main" field',
    false,
    'Add "main": "electron/main.js"'
  );
}

if (process.exitCode === undefined) {
  console.log("\n🎉 Environment looks sane");
} else {
  console.log("\n⚠️  Fix the issues above before running npm start");
}
