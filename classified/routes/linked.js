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


var express = require('express')
  , passport = require('passport')
  , LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

// API Access link for creating client ID and secret:
// https://www.linkedin.com/secure/developer
var LINKEDIN_CLIENT_ID = global.linkedin.api;
var LINKEDIN_CLIENT_SECRET = global.linkedin.key;

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

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Linkedin profile is
//   serialized and deserialized.

passport.serializeUser(function(user, done) {
    user_json = user._json;
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    user_json = user._json.apiStandardProfileRequest;
	done(null, obj);
});

//   Use the LinkedinStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Linkedin
//   profile), and invoke a callback with a user object.

passport.use(new LinkedinStrategy({
    clientID:     LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL:  config.url+"/linked/auth/linkedin/callback",
    scope:        [ 'r_basicprofile', 'r_emailaddress'],
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    req.session.accessToken = accessToken;
    process.nextTick(function () {
      // To keep the example simple, the user's Linkedin profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Linkedin account with a user record in your database,
      // and return that user instead.
	    user_json = profile._json;
        return done(null, profile);
    });
  }
));

var app = express();

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

//   GET /auth/linkedin
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Linkedin authentication will involve
//   redirecting the user to linkedin.com.  After authorization, Linkedin
//   will redirect the user back to this application at /auth/linkedin/callback

app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }),  function(req, res){
    // The request will be redirected to Linkedin for authentication, so this
    // function will not be called.
});

//   GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    var register = require('../module/register');
      req.body.email = user_json.emailAddress;
      req.body.repassword = req.body.password = Math.random().toString(36).slice(2);
      req.body.first_name = user_json.firstName;
      req.body.last_name = user_json.lastName;
      req.body.lid = user_json.id;
      req.body.lid_json = JSON.stringify(user_json);
      q.all([register.checkemail(config.mysql,req),register.checklid(config.mysql,req)]).then(function(results){ 
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
                //add other headers here...
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

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = app;
