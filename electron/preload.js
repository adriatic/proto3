const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  pingMain: (payload) => ipcRenderer.invoke("ping-main", payload),
});
