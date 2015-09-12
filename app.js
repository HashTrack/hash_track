require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
var favicon = require('serve-favicon');

// launch database connections
require('./models/db');
// connect to the Hashtag model
require('./models/hashtags');
// connect to the  user model
require('./models/users');
//require the passport config file
require('./controllers/api/config/passport'); 

// connect controllers
var twitter = require('./controllers/api/twitter');
var users = require('./controllers/api/users');
var index = require('./controllers/index');
var hashtags = require('./controllers/api/hashtags');
var sessions = require('./controllers/api/sessions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico')); 

// initialize passport
app.use(passport.initialize()); 

// mapping routes of the app
app.use('/api/twitter', twitter);
app.use('/register', users);
app.use('/login', sessions);
app.use('/', index);
app.use('/api/hashtags', hashtags);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
