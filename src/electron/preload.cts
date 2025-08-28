// This script will get executed before the main window loads

const electron = require('electron');

// Just so TypeScript will STFU
type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
}

// These functions are exposed to the UI and are callable (window.electron.functionName())
electron.contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback: (statistics: Statistics) => void) => {
    // This lets electron listen/subscribe to a "channel" (aka our event bus)
    // When we receieve a message, our callback function can be executed
    electron.ipcRenderer.on('statistics', (_: Electron.IpcRendererEvent, stats: Statistics) => {
      callback(stats);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke('getStaticData'),
});