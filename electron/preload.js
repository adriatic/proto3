// electron/preload.js

const { contextBridge, ipcRenderer } = require("electron");

/**
 * This is the ONLY safe surface exposed to the renderer.
 * No Node APIs leak past this boundary.
 */
contextBridge.exposeInMainWorld("pact", {
  getIdentity: () => ipcRenderer.invoke("pact:getIdentity"),
  setDisplayName: (name) => ipcRenderer.invoke("pact:setDisplayName", name),

  onLog: (handler) => {
    ipcRenderer.on("supervisor:log", (_evt, payload) => {
      handler(payload);
    });
  },
});
