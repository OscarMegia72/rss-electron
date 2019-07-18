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
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment')
const adaro = require('adaro');
// Routes
var index= require('./routes/index');
console.info("==================================")
console.info(`Server Start ${moment().format('HH:mm:ss')}`)
console.info("==================================")
// define app
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({limit: '2mb'}));
console.log("$$ "+path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));
app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
// routing
app.use('/', index);
var rssRouter = require('./routes/rss')
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
module.exports = app;
