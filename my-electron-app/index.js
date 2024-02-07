// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920/2,
    height: 1080/2,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: "./assets/iconV2-removebg.png"
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./pages/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

app.whenReady().then(() => {
createWindow()

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
})

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') {
  app.quit()
}
})