const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const path = require('path');
const fs = require('fs');

let mainWindow = null;

app.on('ready', () => {
  console.log('The application is ready');

  mainWindow = new BrowserWindow();

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

  mainWindow.webContents.on('did-finish-load', () => {
    openFile();
  });

  mainWindow.on('close', () => {
    mainWindow = null;
  });
});

function openFile() {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filter: [{
      name: 'Markdown Files',
      extensions: ['md', 'txt', 'markdown']
    }]
  });

  if (!files) {
    return;
  }

  const file = files[0];
  const content = fs.readFileSync(file).toString();

  mainWindow.webContents.send('file-opened', file, content);
}

function saveFile(content) {
  const fileName = dialog.showSaveDialog(mainWindow, {
    title: 'Save HTML Output',
    defaultPath: app.getPath('documents'),
    filters: [{
      name: 'HTML Files',
      extensions: ['html']
    }]
  });

  if (!fileName) {
    return;
  }

  fs.writeFileSync(fileName, content);
}

exports.openFile = openFile;
exports.saveFile = saveFile;
