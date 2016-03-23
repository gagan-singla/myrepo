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

var express = require('express'),
passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy;
var common = require('../module/common');
var session = require('express-session');
var app = express.Router();
var cryptos =  require('../module/crypto.js');
var mysqli = require('../module/mysqli');
var q = require('q');
var user_json = [];

//required js
var configure = require('../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
} 

var FACEBOOK_APP_ID = global.facebook.api;
var FACEBOOK_APP_SECRET = global.facebook.key;
app.use(passport.initialize());
app.use(passport.session());

/*   
	Passport session setup.
	To support persistent login sessions, Passport needs to be able to
	serialize users into and deserialize users out of the session.  Typically,
	this will be as simple as storing the user ID when serializing, and finding
	the user by ID when deserializing.  However, since this example does not
	have a database of user records, the complete Facebook profile is serialized
	and deserialized. 
*/

passport.serializeUser(function(user, done) {
  user_json = user._json;
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/*
	Use the FacebookStrategy within Passport.
	Strategies in Passport require a `verify` function, which accept
	credentials (in this case, an accessToken, refreshToken, and Facebook
	profile), and invoke a callback with a user object.
*/

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: config.url+"/facebook/auth/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

//   GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: [ 'email' ] }),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

//   GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
      var register = require('../module/register');
      req.body.email = user_json.email;
      req.body.repassword = req.body.password = Math.random().toString(36).slice(2);
      console.log(req.body.repassword);
      req.body.first_name = user_json.first_name;
      req.body.last_name = user_json.last_name;
      req.body.fid = user_json.id;
      req.body.fid_json = JSON.stringify(user_json);
      q.all([register.checkemail(config.mysql,req),register.checkfid(config.mysql,req)]).then(function(results){ 
        if(results[1][0].length > 0)
        {
              var row = results[1][0];
              req.session.email = row[0].email;
              req.session.userid = row[0].id;
              req.session.first_name = row[0].first_name;
              req.session.last_name = row[0].last_name;
              $arr.loged = req.session;
              res.writeHead(302, {
                     'Location': '/product/my'
                    });
              res.end();return false;
        }
        else if(results[0][0].length > 0)
        {
          res.writeHead(302, {
               'Location': '/index/reg/Email Already Exist!.'
              });
              res.end();return false;
        }
        else
        {
           register.save(config.mysql,req, res);
        }  
         
      });
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = app;

