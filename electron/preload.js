const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("supervisor", {
  onLog: (handler) => {
    ipcRenderer.on("supervisor:log", (_evt, payload) => {
      handler(payload);
    });
  },
});
