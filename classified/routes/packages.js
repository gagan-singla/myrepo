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
var express  = require('express');
var reload   = require('reload');
var q 		 = require('q');
var sprintf  = require('sprintf').sprintf;

var common = require('../module/common');
var packages = require('../module/packages');

var app = express.Router();
//required js
var configure = require('../configure');
//default setters
var config = configure.app();

$arr = {
  config : config
}

app.get('/', function(req, res){
  $arr.error = '';
  common.checkLogin(req,res,0);
  q.all(packages.show(req,config.mysql,q)).then(function(results){ 
     $arr['packages'] = results[0];
  	 common.tplFile('packages.tpl');
     common.headerSet(1);
	 $arr['pageofjs'] = 'package';
     common.loadTemplateHeader(req,res,$arr);    
  });
});

app.post('/paypal/', function(req, res){
    paypal = require('../module/paypal');
    paypal.paymentPaypal(req.body,req,config.mysql,res);
});

app.get('/paypal/', function(req, res){  
    paypal = require('../module/paypal');   
    paypal.paymentPaypal(req.query,req,config.mysql,res);
});

app.post('/pay/', function(req, res){
	common.checkLogin(req,res,0);
	$arr.error = '';
	var payment = require('../module/payment');
	var user = require('../module/user');
	id = req.session.userid;
	pid = req.param('id');
	payment.req = req;
	payment.res = res;
	q.all(user.userInfo(req,config.mysql,q,id,['email','id','customerid','paymentid','paymethod'])).then(function(results){ 
		q.all(packages.getPackageInfo(req,config.mysql,q,pid)).then(function(result){ 
			payment.amount = result[0][0]['price'];
			payment.payid = result[0][0]['id'];
			payment.name = result[0][0]['name'];
			payment.point = result[0][0]['points'];
			payment.type = 'package';
			payment.payAuthorize(req,results[0][0]);
		});
	});
});

app.get(['/buy/:id','/buy/:id/:error'], function(req, res){
     common.checkLogin(req,res,0);
     id = req.session.userid;
     pid = req.param('id');
     q.all(packages.getPackageInfo(req,config.mysql,q,pid)).then(function(result){       
		 $arr.amount = result[0][0]['price'];
		 $arr.name = result[0][0]['name'];
		 $arr.package = result[0][0]['name'];
		 $arr.error = req.param('error');
		 $arr['id'] = req.param('id'); 
		 common.tplFile('payment.tpl');
		 common.headerSet(1);
		 common.loadTemplateHeader(req,res,$arr);  
  	 });
});

module.exports = app;