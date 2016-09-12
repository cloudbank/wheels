/**
 * Module dependencies
*/
var express = require('express')
, app = express()
, http = require('http')
, path = require('path')
, passport = require('passport');

var config = require('./config/config.js');
var api = require('./app/api')
require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'html'); // set up html for templating
app.engine('.html', require('ejs').__express);
var logger = require('morgan');
app.use(logger('dev'));// log every request to the console

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components')); //can't load bower_components without it

// required for passport
var cookieParser = require('cookie-parser');
app.use(cookieParser('qwertyyui'));
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())
 


var methodOverride = require('method-override')

app.use(methodOverride());
var session = require('express-session')
app.use(session({ secret: 'qwertyuio',resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());




require('./app/routes.js')(app, passport, api); // load our routes and pass in our app and fully configured passport and api calls

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

var server = http.createServer(app).listen(config.port, function () {
    console.log('Express server listening on port : '+server.address().port);
});

// test the cloudant connection
var Cloudant = require('cloudant')({account:config.cloudant.account, password:config.cloudant.password});
Cloudant.ping(function(er, reply) {
    if (er)
        return console.log('Failed to ping Cloudant. Did the network just go down?');
    else
        return console.log('Cloudant connection was successful');
});

