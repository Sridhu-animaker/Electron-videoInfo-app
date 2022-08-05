const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

const ffmpeg = require("fluent-ffmpeg");
let mainWindow;
app.on("ready", () => {
  console.log("Electron app is ready.....");
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metaData) => {
    mainWindow.webContents.send("video:metadata", metaData.format.duration);
    console.log("Vodeo duration:", metaData.format.duration);
  });
});
