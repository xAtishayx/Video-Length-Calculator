const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;


const ffmpeg = require("fluent-ffmpeg");
let win;

app.on("ready", () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });
  win.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submitted", (e, path) => {
  ffmpeg.ffprobe(path, (e, metadata) => {
    win.webContents.send('video:duration', metadata.format.duration)
  });
});
