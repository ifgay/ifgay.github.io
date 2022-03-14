
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const Datastore = require('nedb')
const { spawn } = require('child_process')
const { log } = require('console')

db = {};
db.download = new Datastore('db/download.db');
db.download.loadDatabase()


let mainWindow
function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    titleBarStyle: 'hidden',
    resizable:true,
    frame:false,
    useContentSize:false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/glue.js',
      contextIsolation: false
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
ipcMain.on('test_read_file', (e, path) => {
  console.log(path);
  e.sender.send('data_download_status', '就啊哈哈哈')
})
ipcMain.on('short_cmd_call', (e, cmd) => {
  if (cmd == 'window_close') {
    app.quit();
  }
  if (cmd == 'window_hidden') {
    mainWindow.minimize()
  }
})

ipcMain.on('download_remote_file_add', (e, url) => {

})
ipcMain.on('download_remote_file_add', (e, url) => {

})


