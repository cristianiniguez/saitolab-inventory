const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let windows = {
  mainWindow: null,
  productsWindow: null,
  transactionsWindow: null
}

const startWindowOptions = {
  width: 1500,
  height: 1200,
  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true
  }
}

const createMainWindow = () => {
  windows.mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    show: false
  })
  windows.mainWindow.loadFile(path.join(__dirname, 'views', 'main-window', 'index.html'));
  windows.mainWindow.on('close', () => {
    app.quit()
  })
  windows.mainWindow.maximize()
  windows.mainWindow.show()
}

const createProductsWindow = () => {
  windows.productsWindow = new BrowserWindow(startWindowOptions)
  windows.productsWindow.loadFile(path.join(__dirname, 'views', 'products-window', 'index.html'));
}

const createTransactionsWindow = () => {
  windows.transactionsWindow = new BrowserWindow(startWindowOptions)
  windows.transactionsWindow.loadFile(path.join(__dirname, 'views', 'transactions-window', 'index.html'));
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

ipcMain.on('show-msg-dialog', (event, args) => {
  const { win, type, message } = args
  dialog.showMessageBox(windows[win], {
    type: type,
    title: 'SaitoLab Inventory',
    message: message
  })
})