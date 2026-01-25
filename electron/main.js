const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow = null;

/**
 * Buffer for supervisor logs that arrive
 * before the renderer is ready.
 */
const pendingSupervisorLogs = [];

/**
 * Emit a log originating from Electron main
 */
function emitLog(win, level, message, meta = {}) {
  if (!win || win.isDestroyed()) return;

  win.webContents.send("supervisor:log", {
    source: "main",
    ts: Date.now(),
    level,
    message,
    meta,
  });
}

/**
 * Listen for supervisor logs sent via stdin
 * (only in dev, via dev-electron.js)
 */
process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  const lines = chunk.split("\n");

  for (const line of lines) {
    if (!line.startsWith("__SUP_LOG__")) continue;

    try {
      const entry = JSON.parse(
        line.replace("__SUP_LOG__", "").trim()
      );

      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send("supervisor:log", entry);
      } else {
        pendingSupervisorLogs.push(entry);
      }
    } catch {
      // ignore malformed supervisor log lines
    }
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load Vite dev server
  mainWindow.loadURL("http://localhost:5173");

  /**
   * Renderer is fully alive here
   */
  mainWindow.webContents.on("did-finish-load", () => {
    emitLog(mainWindow, "info", "Renderer finished loading");

    // Flush any supervisor logs that arrived early
    for (const entry of pendingSupervisorLogs) {
      mainWindow.webContents.send("supervisor:log", entry);
    }
    pendingSupervisorLogs.length = 0;
  });

  /**
   * Last safe moment to talk to renderer
   */
  mainWindow.on("close", () => {
    emitLog(mainWindow, "info", "Electron window closing");
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

/**
 * IPC sanity check (already verified)
 */
ipcMain.handle("ping-main", async (_evt, payload) => {
  console.log("[main] ping received:", payload);
  return { ok: true, from: "main", at: Date.now() };
});

app.whenReady().then(createWindow);

/**
 * Deterministic shutdown on all platforms
 */
app.on("window-all-closed", () => {
  app.quit();
});
