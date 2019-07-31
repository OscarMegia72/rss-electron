'use strict'
/***
 *     ██████╗ ███████╗ ██████╗ █████╗ ██████╗     ███╗   ███╗███████╗ ██████╗ ██╗ █████╗ 
 *    ██╔═══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗    ████╗ ████║██╔════╝██╔════╝ ██║██╔══██╗
 *    ██║   ██║███████╗██║     ███████║██████╔╝    ██╔████╔██║█████╗  ██║  ███╗██║███████║
 *    ██║   ██║╚════██║██║     ██╔══██║██╔══██╗    ██║╚██╔╝██║██╔══╝  ██║   ██║██║██╔══██║
 *    ╚██████╔╝███████║╚██████╗██║  ██║██║  ██║    ██║ ╚═╝ ██║███████╗╚██████╔╝██║██║  ██║
 *     ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚═╝╚═╝  ╚═╝
 *                                                                                        
 */
const dotenv = require('dotenv') 
dotenv.config()
global.config = require('../../config')
//=========
const createError = require('http-errors');
const express = require('express');
const debug = require('debug')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment')
const adaro = require('adaro');
// Routes
var index= require('./routes/index');
var cache = require('./routes/cache')
console.info("==================================")
console.info(`Server Start ${moment().format('HH:mm:ss')}`)
console.info("==================================")
// Define app
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({limit: '2mb'}));
console.log("$$ "+path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));
app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
// caching
app.use(cache.caching_file)
// routing
app.use('/', index);
const rssRouter = require('./routes/rss')
app.use('/rss', rssRouter);
app.use(cookieParser());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// // idiomas
// const i18n = require('i18n')
// i18n.configure({
//   locales:['es','en'],
//   directory: __dirname+"/locales",
//   defaultLocale:'es',
//   register: global,
//   logWarnFn: function (msg) {
//     console.log('warn', msg);
//   },
//   logErrorFn: function (msg) {
//       console.log('error', msg);
//   }
// })
// i18n.setLocale('en')
// app.use(i18n.init)
// app.use(function(err, req, res, next){
//   console.log("mylocale" )
//   next()
// })
module.exports = app;
