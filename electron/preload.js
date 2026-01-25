const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("supervisor", {
  onLog: (handler) => {
    ipcRenderer.on("supervisor:log", (_evt, payload) => {
      handler(payload);
    });
  },

  logFromRenderer: (entry) => {
    ipcRenderer.send("supervisor:renderer-log", entry);
  },
});
