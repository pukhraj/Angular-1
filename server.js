require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var validation = require("validator");
var validator = require('express-validator');
var compressor = require('node-minify');




app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//import packages and use favicon icon path to access in application.
var favicon = require('serve-favicon'), path = require("path");
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
app.use('/static', express.static(path.join(__dirname, 'public')));




app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/',  require('./controllers/index.controller'));
app.use('/login', require('./controllers/login.controller'));
app.use('/about', require('./controllers/about.controller'));
app.use('/contact', require('./controllers/contact.controller'));
app.use('/logout', require('./controllers/logout.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/index', require('./controllers/index.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

 // Handle 404
  app.use(function(req, res) {
      res.status(400);
      res.render('404.ejs', {title: '404: File Not Found.'});
  });
  
  // Handle 500
  app.use(function(error, req, res, next) {
      res.status(500);
      res.render('500.ejs', {title:'500: Internal Server Error.', error: error});
  });





// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});



// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});