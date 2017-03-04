const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

let mainWindow = null;

app.on('ready', () => {
  console.log('The application is ready');

  mainWindow = new BrowserWindow();

  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

  mainWindow.on('close', () => {
    mainWindow = null;
  });
});
