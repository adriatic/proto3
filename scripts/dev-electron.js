#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

const electronBin = path.join(
  __dirname,
  "..",
  "node_modules",
  ".bin",
  "electron"
);

const child = spawn(electronBin, ["."], {
  stdio: "inherit",
});

let shuttingDown = false;

const shutdown = () => {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log("\n🛑 Shutting down Electron...");
  child.kill("SIGTERM");
  process.exit();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("exit", shutdown);
