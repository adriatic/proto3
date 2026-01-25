const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow = null;

/**
 * Emit a supervisor log to the renderer (if still alive)
 */
function emitLog(win, level, message, meta = {}) {
  if (!win || win.isDestroyed()) return;

  win.webContents.send("supervisor:log", {
    ts: Date.now(),
    level,
    message,
    meta,
  });
}

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

  // Log only after renderer is ready
  mainWindow.webContents.on("did-finish-load", () => {
    emitLog(mainWindow, "info", "Renderer finished loading");
  });

  // Last safe moment to talk to renderer
  mainWindow.on("close", () => {
    emitLog(mainWindow, "info", "Electron window closing");
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

/**
 * IPC sanity check (already working)
 */
ipcMain.handle("ping-main", async (_evt, payload) => {
  console.log("[main] ping received:", payload);
  return { ok: true, from: "main", at: Date.now() };
});

app.whenReady().then(createWindow);

/**
 * Deterministic shutdown:
 * closing the window quits the app on all platforms
 */
app.on("window-all-closed", () => {
  app.quit();
});
