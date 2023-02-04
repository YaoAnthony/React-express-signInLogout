/* 
  调package环节
*/
var createError = require('http-errors');// error展示
var express = require('express'); //调用express
var path = require('path');  //调用path package
var cookieParser = require('cookie-parser'); // cookie载入
var logger = require('morgan');
var cors = require("cors") //跨域
// const debug = require("debug")("my-application")
const bodyParser = require("body-parser")

/**
 * 载入route
 */
//此处调用两个route js，一个变量代表一个分支
var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/login');
//使用express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//解析网页路径
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter); // 解析网页路径
app.use('/api/signup',signupRouter); // signup
app.use('/api/signin', signinRouter); // sign In
// catch 404 and forward to error handler 中间键负责搜索错误
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
