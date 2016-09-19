
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var flash = require('express-flash');
//var favicon = require('serve-favicon');

var app = express();
//var flash = require('connect-flash');
var passport = require('passport');

require('./config/passport')(passport);

//var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/db.js');

// all environments
//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.favicon());
//app.use(express.favicon('/public/images/favicon.ico'));
//app.use(express.favicon(path.join(__dirname, 'public','images','favicon.ico'))); 
//app.use('/favicon.ico', express.static('images/favicon.ico'));

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

//app.use(app.routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'karloduniyamuththime'}));
 //app.use(session({ secret: 'tobo!', cookie: { maxAge: new Date(Date.now() +     3600000), }}));
// app.use(session({secret: 'karlo duniya muththi me', cookie: {secure: false}}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./app/routes.js')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
