
const { app, BrowserWindow ,Menu,ipcMain} = require('electron')
const path = require('path')

const {spawn}=require('child_process')

function createWindow () {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'glue.js'),
      nodeIntegration:true
    }
  })
  mainWindow.loadFile('./dist/index.html')
  //mainWindow.webContents.openDevTools()
  Menu.setApplicationMenu(null)
}
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

