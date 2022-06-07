var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var db = require('./config/db'); //db모듈 호출
var cors = require('cors');//교차통신 모듈 호출

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

if(!db) {
  console.log("/config/db.js file not exists");
  process.exit(1);
}

var app = express();

var conn = db.init();
db.conn(conn);

// const dbinfo ={
//   host:'localhost'
//   ,user:'root'
//   ,password:'1234'
//   ,database:'exer_vue'
// }

// mysql.createConnection(dbinfo).connect((err)=>{ //db 커넥션 연결 확인
//   if(err) {
//     console.log("mysql connect error "+err);
//   } else {
//     console.log("mysql connect success ");
//   }
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
