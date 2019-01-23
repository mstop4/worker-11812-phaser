const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1280,
    height: 750
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});