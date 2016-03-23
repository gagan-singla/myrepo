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

var express = require('express');
var common = require('../../module/common');
var app = express.Router();
var q = require('q');
var admin = require('../../module/admin');
var pagination = require('pagination');
//required js
var configure = require('../../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
}

app.get(['/login','/login/:error'],function(req,res)
{
	req.body.error = $arr['error'] =  (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
	common.tplFile('admincp/login.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
});

app.post(['/login/save'],function(req,res) {
	
	if(typeof(req.body.autologin)=='undefined')
	common.checkLogin(req,res,1);
	else
	req.session.autologin = req.body.autologinoption;
	
	var login = require('../../module/login');
	function processObject(row)
	{
		if(row.length > 0) {
			if(row[0].admin ==1) {
				delete req.session.userid;
				delete req.session.email;
				delete session;				
				req.session.admin = 1;
				req.session.email = row[0].email;
				req.session.userid = row[0].id;
				req.session.first_name = row[0].first_name;
				req.session.last_name = row[0].last_name;
				req.session.tpermission = 'no';
				$arr.loged = req.session;
				res.writeHead(302, {
					'Location': '/admincp/dashboard'
				});
				res.end();
			}
			else {
				res.writeHead(302, {
					'Location': '/admincp/login/Invalid login'
				});
				res.end();
			} 
		}  
		else {
			res.writeHead(302, {
				'Location': '/admin/login/Invalid login'
			});
			res.end();
		}  
	} 
	var userprocess = login.process(req,config.mysql,processObject); 
});

module.exports = app;