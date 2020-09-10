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
  },
  show: false
}

const createWindows = () => {
  mainWindow = new BrowserWindow(startWindowOptions)
  productsWindow = new BrowserWindow(startWindowOptions)
  transactionsWindow = new BrowserWindow(startWindowOptions)
  
  mainWindow.loadFile(path.join(__dirname, 'views', 'main-window', 'index.html'));
  productsWindow.loadFile(path.join(__dirname, 'views', 'products-window', 'index.html'));
  transactionsWindow.loadFile(path.join(__dirname, 'views', 'transactions-window', 'index.html'));
  
  mainWindow.on('close', () => {
    app.quit()
  })
}

const showWindow = (win) => {
  win.show()
}

app.on('ready', () => {
  createWindows()
  showWindow(mainWindow)
  mainWindow.webContents.openDevTools();
});

ipcMain.on('open-window', (event, args) => {
  console.log(args)
  switch (args) {
    case 'products':
      showWindow(productsWindow)
      break
    case 'transactions':
      showWindow(transactionsWindow)
      break
    default:
      console.log('I dont know what are you saying')
  }
})