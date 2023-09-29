var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mobileRouter = require('./routes/mobile'); //khai báo routes

var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat')); 

var app = express();

//import & config thư viện body-parser (lấy dữ liệu từ form)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//khai báo & cấu hình thư viện mongoose để làm việc với DB
var mongoose = require("mongoose");
// var uri = "mongodb://localhost:27017"; //local DB
var uri = "mongodb://127.0.0.1:27017"; //local DB
// var uri1 = "mongodb+srv://ti3n120903:bNpjoTdXcoRswrCc@cluster0.ma3tufb.mongodb.net/"; //local DB
mongoose.connect(uri)
.then(() => console.log ("Connect to DB succeed !"))
.catch((err) => console.log (err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mobile', mobileRouter); //cấu hình routes

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
