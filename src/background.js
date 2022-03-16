'use strict'
import { app, protocol, BrowserWindow,ipcMain} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import {exec} from 'child_process'
import { stdout } from 'process'
const isDevelopment = process.env.NODE_ENV !== 'production'
const electron = require('electron')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const Menu = electron.Menu
let win
async function createWindow() {
  //隐藏菜单栏
  // Menu.setApplicationMenu(null)
  // Create the browser window.
    win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
//命令行
let usbipList = 'usbip.exe list -r'
//查看本机可绑定的USB设备
let cmdPath = 'usbip'
//usbip的相对路径
let workerProcess

//主进程监听最小化窗口事件
ipcMain.on('minus-window',()=>{
  win.minimize();
})

//主进程监听关闭窗口事件
ipcMain.on('close-window',()=>{
  win.close()
})

//监听搜索usb设备的事件
ipcMain.on('search-usbs',(event,args)=>{
  // console.log(args)
  let cmd = usbipList + ' ' +args.ip
  exec(cmd,{cwd:cmdPath},(error,stdout,stderr)=>{
    event.reply('stdout',stdout)
  })
})