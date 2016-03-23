/*============================================================================*\
|| ########################################################################## ||
|| # Auction Software Marketplace[*]version[*] Build [*]build[*]
|| # ---------------------------------------------------------------------- # ||
|| # Customer License # [*]license[*]
|| # ---------------------------------------------------------------------- # ||
|| # Copyright ©2014–[*]year[*] Develop Scripts LLC. All Rights Reserved    # ||
|| # This file may not be redistributed in whole or significant part.       # ||
|| # ------------- AUCTION SOFTWARE IS NOT FREE SOFTWARE ------------------ # ||
|| # http://www.auctionsoftwaremarketplace.com|support@auctionsoftware.com  # ||
|| # ---------------------------------------------------------------------- # ||
|| ########################################################################## ||
\*============================================================================*/

// #### load required Modules ##################################################

var http = require('http');
var https = require('https');
var express = require('express');
//var session = require('cookie-session');
var fs = require('fs');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var auctionsoftware = require('./auctionsoftware');
var cookieSession = require('express-session')

require( "console-stamp" )( console, {
	metadata: function () {
		return ("[" + process.memoryUsage().rss + "]");
	},
	colors: {
		stamp: "yellow",
		label: "white",
		metadata: "green"
	}
} );


//require runner
var app = express();

/*
app.use(cookieSession({
	secret: 'alphafor'
}))
*/

/*var cookieSession = require('cookie-session')

app.set('trust proxy', 1) // trust first proxy

 app.use(cookieSession({
 name: 'session',
 keys: ['bid123', '123#@!bid']
 }))

 //set session expiration time

 app.use(function (req, res, next) {
 req.sessionOptions.maxAge = 600 * 60 * 1000;
 req.session.maxAge = 600 * 60 * 1000;
 next();
 })*/
//set session expiration time

app.use(function (req, res, next) {
	next();
});
app.use(require('express-domain-middleware'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('cookiecnx'));
app.use(cookieSession({secret: '1234567890QWERTY', cookie:{maxAge:60000000}}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(auctionsoftware.auctionsoftware());

var upload  = require('jquery-file-upload-middleware');

// error handler
app.use(function(err, req, res, next) {
	console.error('An error occurred :', err.message);
	var common = require('./module/common');
	common.tplFile('error.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
	res.send(500);
});

configure = require('./configure');
//default setters
config = configure.app();
$arr = {
	config : config
};


var index = require('./routes/index'),
    login = require('./routes/login'),
	uploads = require('./routes/uploads'),
    register = require('./routes/register'),
    product = require('./routes/product'),
    packages = require('./routes/packages'),
    dashboard = require('./routes/dashboard'),
    profile_settings = require('./routes/profile_settings'),
    admincp = require('./routes/admincp/index'),
    facebook = require('./routes/facebook'),
    twitter = require('./routes/twitter'),
    linked = require('./routes/linked'),
    membership = require('./routes/membership'),
    admincplogin = require('./routes/admincp/login');
    stores = require('./routes/stores');
	adwords = require('./routes/adwords');
	paypal = require('./routes/paypal'),
	forum = require('./routes/forum');

app.use('/uploads',uploads);

app.use(multer({dest: __dirname+"/public/uploads/"}));

	app.use('/',index);	
	app.use('/login',login);
	app.use('/register',register);
	app.use('/index',index);
	app.use('/product',product);
	app.use('/package',packages);
	app.use('/dashboard',dashboard);
	app.use('/profile_settings',profile_settings);
	app.use('/profile',profile_settings);
	app.use('/facebook',facebook);
	app.use('/twitter',twitter);
	app.use('/linked',linked);
	app.use('/stores',stores);
	app.use('/admincp',admincp);
	app.use('/membership',membership);
	app.use('/admin',admincplogin);	

    app.use('/adwords',adwords);
	app.use('/paypal',paypal);
	app.use('/forum',forum);
	// index router
	// error handlers	
	// development error handler
	// will print stacktrace

// This line is from the Node.js HTTPS documentation.
var options = {
	key: fs.readFileSync('ssl/auction.pem'),
	cert: fs.readFileSync('ssl/auctionsoftwaremarketplace_com.crt')
};
	module.exports = app;
	//var server = http.createServer(app);
	var server = https.createServer(options, app).listen(2001);
	//server.listen(2002);

	// use socket.io
	var io = require('socket.io').listen(server);
	//turn off debug
	io.set('log level', 1);
	// define interactions with client
	io.sockets.on('connection', function(socket){    
	//send data to client	  
	socket.on('bidAddtime', function(msg){
		 io.sockets.emit('bidAddtime',  msg);
	});
   
});
