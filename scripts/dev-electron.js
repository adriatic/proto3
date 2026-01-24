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

/**
 * Tracks whether the supervisor (this script)
 * initiated shutdown.
 */
let supervisorInitiated = false;

/**
 * Supervisor-initiated shutdown (Ctrl-C, SIGTERM)
 */
const shutdown = () => {
  if (supervisorInitiated) return;
  supervisorInitiated = true;

  console.log("🛑 Supervisor shutting down Electron...");
  child.kill("SIGTERM");
};

/**
 * Electron exit observer (always runs)
 */
child.on("exit", (code, signal) => {
  if (supervisorInitiated) {
    console.log(
      `🧹 Electron terminated by supervisor (code=${code}, signal=${signal ?? "none"})`
    );
  } else {
    console.log(
      `🧹 Electron exited on its own (code=${code}, signal=${signal ?? "none"})`
    );
  }

  process.exit(code ?? 0);
});

/**
 * Wire supervisor signals
 */
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
