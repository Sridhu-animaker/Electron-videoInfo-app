const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

const ffmpeg = require("fluent-ffmpeg");
let mainWindow;
// The below method will be called initially.
app.on("ready", () => {

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // This should be true to aviod error while compiling.
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// On video submit we will recieve all the details in ipcMain (ffmpeg is used to get all the data)
ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metaData) => {
    mainWindow.webContents.send("video:metadata", metaData.format);
  });
});
