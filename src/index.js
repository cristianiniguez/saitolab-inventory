const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow
let productsWindow
let transactionsWindow

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'views', 'main-window', 'index.html'));
  mainWindow.webContents.openDevTools();
};

app.on('ready', createMainWindow);