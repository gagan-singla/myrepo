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

var express  = require('express');
var reload   = require('reload');
var sprintf  = require('sprintf').sprintf;
var common   = require('../module/common');
var register = require('../module/register'); 
var q 		 = require('q');
var https = require('https');
var app 	 = express.Router();





app.post('/save', function(req, res){
  data = req.body;
  var minute = 60 * 1000;
  res.cookie('email', data.email, { maxAge: minute });
  res.cookie('password', data.password, { maxAge: minute });
  res.cookie('first_name', data.first_name, { maxAge: minute });
  res.cookie('last_name', data.last_name, { maxAge: minute });
    res.cookie('country', data.country, { maxAge: minute });
    res.cookie('state', data.state, { maxAge: minute });
	if(data.email == '' || data.password == '' || data.repassword == '' || data.first_name == '' || data.last_name == '')
	{
		res.writeHead(302, {
		   'Location': '/index/reg/Required Field Was Missing'
		});
		res.end();return false;
	}
	Recaptcha = require('recaptcha').Recaptcha;
        
        var capcha = '';
  
	var data = {
	  remoteip:  req.connection.remoteAddress,
	  challenge: req.body.recaptcha_challenge_field,
	  response:  req.body.recaptcha_response_field
	};
        
     //    var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
      
       var PUBLIC_KEY  = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
         PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';
      
  var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);
  
  
  recaptcha.verify(function(success, error_code) {
     /* if (!success) {
             res.writeHead(302, {
       'Location': '/index/reg/Invalid Captcha'
        //add other headers here...
      });
      res.end();return false;
      } */
      
     /*   res.writeHead(302, {
            'Location': '/index/reg/'+success
             //add other headers here...
           });
           res.end();
           return false;
      */
      
      if(success == false)
      {
           res.writeHead(302, {
            'Location': '/index/reg/Invalid Captcha'
             //add other headers here...
           });
           res.end();
           
      
           return false;
      }
      else
      {
          
          q.all([register.checkemail(config.mysql,req)]).then(function(results){ 
		if(results[0][0].length > 0)
		{
			res.writeHead(302, {
				   'Location': '/index/reg/Email Already Exist!.'
			});
			res.end();return false;
		}
		else
		{
      
		  register.save(config.mysql,req, res);
      if(req.cookies.cookierefid && req.cookies.cookierefmed){
            res.clearCookie('cookierefid');
            res.clearCookie('cookierefmed');  
      }
      delete req.session.ref;
      delete req.session.media;  
       
    
    }     
    
    });  
          
      }
      
   
      
   });
   
  
   //return false;

  	
});



app.get(['/','/:id'], function(req, res){
	$arr.error = $arr.r_id =  '';
	register.loadPage(req, res, $arr,config);
});

app.get('/error/:error', function(req, res){
	$arr.error = req.param('error');
	register.loadPage(req, res, $arr,config);
});

app.post('/check_email_exist',function(req,res){

    q.all([register.checkemail(config.mysql, req)]).then(function (results) {
        if (results[0][0].length > 0) {
            res.json({'status' : false});
        }else{
            /*res.send(JSON.stringify({'success': true}));*/
            res.json({'status' : true});
        }
    }).fail(function(err){
        console.log(err.stack);
        throw err;
    })
});

module.exports = app;