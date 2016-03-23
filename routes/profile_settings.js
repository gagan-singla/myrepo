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

var  util    = require('util');
var express = require('express');
var reload = require('reload');
var q = require('q');
var sprintf = require('sprintf').sprintf;
var common = require('../module/common');
var app = express.Router();


app.use(function(req,res,next)
{
  //req.session.userid = 1;	
  common.checkLogin(req, res, 0);
  
    //req.session.userid = 1;
    next();
});



var profile = require('../module/profile_settings');

app.get('/', function(req, res){	
     $arr['mcats'] =  $arr['users'] = '';
     $arr.externalcss = ['buyer2','change_psd']; 
	 var module = require('../module');
	 $arr.pagetitle = '';
	 $arr.ptitle = 'profile_settings';
	 common.checkLogin(req,res,0);
	q.all([profile.profileDetails(req,config.mysql,q,['email','id','first_name','last_name','aboutme','image','avatar','address1','address2','country','state','city','zip','phone','paypal_address','profile_url','verifyphone'])]).then(function(results){
		$arr['users'] = results[0][0][0];

		//console.log($arr['country']);
		for(i in $arr['users'])
		{
			if($arr['users'][i] == null)
			{
				$arr['users'][i] = '';
			}	
		}
		q.all(profile.listUserCategories(req,config.mysql,q)).then(function(results2){ 
		   $arr['mcats'] = results2[0][0]['mcat'];
		   common.tplFile('profile_settings.tpl');
		   common.headerSet(1);
		   common.loadTemplateHeader(req,res,$arr);
		});
	});	  
});

app.post('/address', function(req, res){
    req.session.zipcode = req.param('zipcode');
	profile.saveADetails(req,config.mysql,q);
	res.writeHead(302, {
             'Location': '/profile_settings/'
	}); 
	res.end();return false;
});

app.get('/view/:viewuid', function(req, res){
     $arr['mcats'] =  $arr['users'] = '';
     $arr.externalcss = ['buyer2','change_psd']; 
	 var module = require('../module');
	 $arr.pagetitle = '';
	 $arr.ptitle = 'profile_settings';
	 q.all(profile.profileDetails(req,config.mysql,q,['email','id','first_name','last_name','aboutme','image','avatar','address1','address2','country','state','city','zip','phone','paypal_address','profile_url'])).then(function(results){ 
		$arr['users'] = results[0][0];
		q.all(profile.listUserCategories(req,config.mysql,q)).then(function(results2){ 
		   $arr['mcats'] = results2[0][0]['mcat'];
		   console.log($arr['mcats']);
		   common.tplFile('profile_view.tpl');
		   common.headerSet(1);
		   common.loadTemplateHeader(req,res,$arr);
		});
	});	  
});

app.post('/shipping',function(req,res)
{
	$arr.externalcss = ['buyer2','change_psd']; 
	var uid = req.session.userid;
	q.all([profile.shippingDetails(req,config.mysql,q,uid)]).then(function(results){ 
		if(results[0][0].length == 0)
		{
			profile.addShippingDetails(req,config.mysql,q);
		}
		else
		{
			profile.updateShippingDetails(req,config.mysql,q);
		}  
		res.writeHead(302, {
			'Location': '/profile_settings/shipping'
		});
		res.end();return false;
	});
});

app.get('/shipping',function(req,res)
{
	$arr.externalcss = ['buyer2','change_psd']; 
	var uid = req.session.userid;
	q.all([profile.shippingDetails(req,config.mysql,q,uid),common.getLocations(req,config.mysql,q)]).then(function(results){
		if(results[0][0].length > 0)
		{
			$arr['shipping'] = results[0][0][0];
		}
		else
		{
			$arr['shipping'] = [];
			$arr['shipping']['first_name'] = '';
		}
		$arr.country = results[1][0];
		common.tplFile('shipping.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);		
	});
});

app.post('/update/', function(req, res){
	var attach = require('../module/attach');
	attach.save('profile',req,res);	
	$arr['save'] = true;

	q.all(profile.saveDetails(req,config.mysql,q)).then(function(results){
		var managecats = function(mcat, cb) {
			profile.managecategories(req,config.mysql,q,mcat);
			cb(null);  
		}	
		profile.removeCategories(req,config.mysql,q);
		if(typeof(req.body.categories) !='undefined')
		{
			var async = require('async');
			async.each(req.body.categories, managecats, function(err) {
				if (err) return console.error(err);
				res.writeHead(302, {
					'Location': '/profile_settings/'
				});
				res.end();return false;
			});
		}
		else
		{
			res.writeHead(302, {
				'Location': '/profile_settings/'
			}); 
			res.end();return false;
		}
	});
});

module.exports = app;