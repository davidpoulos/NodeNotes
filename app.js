var express = require('express');

//Newly installed.
var exphbs  = require('express-handlebars');
var sassMiddleware = require('node-sass-middleware');
var browserify = require('browserify-middleware');
var mongoose = require('mongoose');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Initialize Routers.
var routes = require('./routes/index');
var users = require('./routes/users');
var API = require('./routes/api/index');
var noteAPI = require('./routes/api/notes/api');

var app = express();


//Pretty JSON API!
app.set('json spaces', 2);

// view engine setup
app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'layout'}));
app.set('view engine', 'hbs');


//Database
mongoose.connect('mongodb://localhost/note');

//Middleware

//SASS
app.use (
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    //prefix: '/stylesheets',
    debug: true,
  })
);

//Handlebars + Browserify
browserify.settings({
  transform: ['hbsfy']
 });


 //Browserify
 app.get('/javascripts/bundle.js', browserify('./client/script.js'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Use the routers.
app.use('/', routes);
app.use('/users', users);
app.use('/api', API);
app.use('/api/notes', noteAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.locals.pretty = true;
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
  app.locals.pretty = true;
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
