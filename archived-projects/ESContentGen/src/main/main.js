// 主进程的主要逻辑
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 保持对window对象的全局引用
let mainWindow;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, '../../preload.js')
    }
  });

  // 加载应用的index.html
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  // 在开发环境中打开开发者工具
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // 当window被关闭，这个事件会被触发
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// 这个方法将会在Electron结束初始化和创建浏览器窗口的时候调用
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    // 在macOS上，当点击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (mainWindow === null) createWindow();
  });
});

// 当全部窗口关闭时退出
app.on('window-all-closed', function () {
  // 在macOS上，除非用户用Cmd + Q确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') app.quit();
});

// 在这里可以添加主进程的其他逻辑
// 例如，处理来自渲染进程的IPC消息
ipcMain.on('message-from-renderer', (event, arg) => {
  console.log(arg); // 打印来自渲染进程的消息
  event.reply('message-from-main', 'Hello from main process!');
});