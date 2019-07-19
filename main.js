// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 1024,
    webPreferences: {
      preload: path.join(__dirname, './js/preload.js')
    }
  })
  // and load the index.html of the app.
  //mainWindow.loadFile('./src/index.html')
  setTimeout(x=>{
    mainWindow.loadURL('http://localhost:3100/rss?tipo=feed-radios&modo=vue')
    //mainWindow.setFullScreen(true)
  },1000)
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
