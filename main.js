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
  setTimeout(x=>{
    mainWindow.loadURL('http://localhost:3100/rss?tipo=feed-radios&modo=vue')
  },3000)
  
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
// start api from electron
// const pm2 = require('pm2');
// (function(){
//   pm2.connect(function(err) { 
//     if(err){
//       console.log(err)
//     }
//     console.log("start api")
//     pm2.start({
//         script: 'npm -- run api',
//         autorestart : false 
//       }, (err, apps) => {
//         //pm2.disconnect()
//         if (err) { throw err }
//         setTimeout(x=>{
//           mainWindow.loadURL('http://localhost:3100/rss?tipo=feed-radios&modo=vue')
//          },1000)
//       })
//   })
     

// })()
/*
var app_api = require('./src/api/app');
var debug = require('debug')('myapp:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3100');
app_api.set('port', port);
var server = http.createServer(app_api);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
*/
