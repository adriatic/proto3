const { app, BrowserWindow, ipcMain } = require("electron");

let hasCreatedWindow = false;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: require("path").join(__dirname, "preload.js"),
    },
  });

  hasCreatedWindow = true;
  win.loadURL("http://localhost:5173");
}

ipcMain.handle("ping-main", async (_evt, payload) => {
  console.log("[main] ping received:", payload);
  return { ok: true, from: "main", at: Date.now() };
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => hasCreatedWindow && app.quit());
