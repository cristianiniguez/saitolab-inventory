const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow
let productsWindow
let transactionsWindow

const startWindowOptions = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true
  }
}

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: { nodeIntegration: true },
  })
  mainWindow.loadFile(path.join(__dirname, 'views', 'main-window', 'index.html'));
  mainWindow.on('close', () => {
    app.quit()
  })
}

const createProductsWindow = () => {
  productsWindow = new BrowserWindow(startWindowOptions)
  productsWindow.loadFile(path.join(__dirname, 'views', 'products-window', 'index.html'));
}

const createTransactionsWindow = () => {
  transactionsWindow = new BrowserWindow(startWindowOptions)
  transactionsWindow.loadFile(path.join(__dirname, 'views', 'transactions-window', 'index.html'));
}

app.on('ready', () => {
  createMainWindow()
});

ipcMain.on('open-window', (event, args) => {
  switch (args) {
    case 'products':
      createProductsWindow()
      break
    case 'transactions':
      createTransactionsWindow()
      break
    default:
      console.log('I dont know what are you saying')
  }
})