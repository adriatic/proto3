// electron/main.js
const path = require("path");
const { app, BrowserWindow } = require("electron");

const { ipcMain } = require("electron");
const { getIdentity, setDisplayName } = require("./identity");

const identity = require("../electron-dist/identity.js");

ipcMain.handle("pact:getIdentity", () => {
  return identity.getIdentity();
});

ipcMain.handle("pact:setDisplayName", (_evt, name) => {
  return identity.setDisplayName(name);
});

// ✅ IMPORTANT: load COMPILED identity
require(path.join(__dirname, "../electron-dist/identity.js"));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {

    app.quit();
  
});

