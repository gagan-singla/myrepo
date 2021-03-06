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
var reload  = require('reload');
var sprintf = require('sprintf').sprintf;
var common  = require('../module/common');
var session = require('express-session');
var app	    = express.Router();
var cryptos =  require('../module/crypto.js');
var mysqli  = require('../module/mysqli');
var cookieParser = require('cookie-parser');

var q = require('q');





//login check router
app.post('/save', function(req,res)	{

	if(typeof(req.body.autologin)=='undefined'){
		common.checkLogin(req,res,1);
		
	}
	else
		req.session.autologin = req.body.autologinoption;
		
	var login = require('../module/login');
	
	function processObject(row)	{
			if(row.length > 0) {
				if(row[0].status == 'moderate' || row[0].status == 'unverified'){
					res.writeHead(302, {
						'Location': '/login?error=5'
					});
					res.end();return false;
				}
				if(row[0].status != 'active')
				{
					if(req.body.loginpage == 1) {
					res.writeHead(302, {
						'Location': '/login?error=2'
					});
					res.end();return false;
				}
				else  {
					res.writeHead(302, {
						'Location': '/index/log/Account Deactivated'
					});
					res.end();return false;
				}
			}				
			delete req.session.userid;
			delete req.session.email;
			delete req.session.first_name;
			delete req.session.last_name;
			delete req.session.permission;
			delete req.session.zipcode;
			delete req.session.phone
			delete session;
			var membership = require('../module/membership');
			var user = require('../module/user');
			q.all([membership.getUserMembership(res,config.mysql,q,row[0].id),user.getTotalProduct(res,config.mysql,q,row[0].id),user.getTotalBid(res,config.mysql,q,row[0].id),membership.getUserRolelogin(req,config.mysql,q,row[0].id),user.getTotalBuyNowProduct(res,config.mysql,q,row[0].id)]).then(function(result2) {
			//q.all([membership.getUserMembership(res,config.mysql,q,row[0].id)]).then(function(result2) {

				if(result2[3][0][0]){
					if( result2[3][0][0]['recurring'] == 1){
						var ch = global.bgateway.subscription.find(result2[3][0][0]['tran_id'], function (err, result) {

						     if(result.statusHistory[0].status != 'Active'){
						     	membership.updatePaid(req,config.mysql,q,row[0].id,0);
						     }
						     else{
						     	membership.updatePaid(req,config.mysql,q,row[0].id,1);
						     }
						     

						});
					}
				}
				req.session.permission = false;
				req.session.productcountyear = 0;
				req.session.bidcountyear = 0;
				req.session.productcountmonth = 0;
				req.session.bidcountmonth = 0;
				req.session.buynowcountyear = 0;
				req.session.buynowcountmonth = 0;

				var permissions = result2[0][0];

				if(permissions.length > 0) {
					req.session.permission = true;
				}
				for(i in permissions) {
					req.session[permissions[i]['varname']] = permissions[i]['value'];
					
				}

				req.session.productcountyear = (result2[1][0][0]['ycnt'] > 0) ? result2[1][0][0]['ycnt'] : 0;
				req.session.productcountmonth = (result2[1][0][0]['mcnt'] > 0) ? result2[1][0][0]['mcnt'] : 0;

				req.session.bidcountyear = (result2[2][0][0]['ycnt'] > 0) ? result2[2][0][0]['ycnt'] : 0;
				req.session.bidcountmonth = (result2[2][0][0]['mcnt'] > 0) ? result2[2][0][0]['mcnt'] : 0;

				req.session.buynowcountyear = (result2[4][0][0]['ycnt'] > 0) ? result2[4][0][0]['ycnt'] : 0;
				req.session.buynowcountmonth = (result2[4][0][0]['mcnt'] > 0) ? result2[4][0][0]['mcnt'] : 0;

				req.session.used_image_space = (result2[1][0][0]['used_image_space'] > 0) ? result2[1][0][0]['used_image_space'] : 0;
				req.session.email = row[0].email;


				req.session.userid = row[0].id;

				req.session.first_name = row[0].first_name;
				req.session.last_name = row[0].last_name;
				req.session.zipcode = row[0].zip;
				req.session.phone = row[0].phone;
				req.session.used_attach_space = result2[1][0][0].used_image_space;
				
				
				country=row[0].country;

				if(country == null)
				{

					req.session.country = '';
				}
				else
				{

					//req.session.country = country.toLowerCase();
					req.session.country = country;
				}



				req.session.test = true;


				console.log(result2[3][0].length);
				if(result2[3][0].length > 0)
				{
					req.session.membershipstatus = result2[3][0][0]['status']
				}
				else
				{
					req.session.membershipstatus = '';
				}

				/*if(typeof(result2[1][0][0]['status']) !== 'undefined') {
					req.session.membershipstatus = result2[1][0][0]['status']
				}
				else
				{
					req.session.membershipstatus = '';
				}
				*/

			
				$arr.loged = req.session;

				if(req.body.remember === '1')
				{
					
					
					res.cookie('cookiepassword',req.body.password);
					res.cookie('cookieemail',req.body.username);
				}
				else
				{
					res.clearCookie('cookiepassword');
					res.clearCookie('cookieemail');					
					
				}
				//Get url from login template to goto last url...
				if(req.body.last_url != 'undefined' && req.body.last_url != '' && req.body.last_url){
					res.writeHead(302, {
						'Location': req.body.last_url
					});
				}
				else{
					res.writeHead(302, {
						'Location': '/'
					});
				}
				res.end();return false;
			}).fail(function(err){
				console.log(err.stack);
				throw err;
			}).done();
		}  
		else {
			if(req.body.loginpage == 1) {
				res.writeHead(302, {
					'Location': '/login?error=1'
				});
				res.end();return false;
			}
			else {
				res.writeHead(302, {
				'Location': '/index/log/Invalid Username or Password'
				});
				res.end();return false;
			}
		}
		if(req.cookies.cookierefid && req.cookies.cookierefmed){
            res.clearCookie('cookierefid');
            res.clearCookie('cookierefmed');  
     	}
     	delete req.session.ref;
		delete req.session.media;  
	}	
	var userprocess = login.process(req,config.mysql,processObject);  
});

app.get('/', function(req,res)
{
    if(req.cookies.cookierefid && req.cookies.cookierefmed) {
    	req.session.ref = req.cookies.cookierefid;
    	req.session.media = req.cookies.cookierefmed;
    	$arr.refers = req.session.ref;
    	$arr.med = req.session.media;
	}
	console.log(common.last_url(req));
	$arr['last_url'] = common.last_url(req);
    Recaptcha = require('recaptcha').Recaptcha; 
        
      //    var PUBLIC_KEY  = config.captachapublickey,
        // PRIVATE_KEY = config.captachaprivatekey;
         
          var PUBLIC_KEY  = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
         PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';
         
         console.log(PUBLIC_KEY+'&&'+PRIVATE_KEY);
	 var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
	 $arr.captchahtml = recaptcha.toHTML();
         
    
	if(req.cookies.cookieemail) {
		$arr['cookieemail'] = req.cookies.cookieemail ;
		$arr['cookiepassword'] = req.cookies.cookiepassword ;
		
	}
	if(req.param('error')) {
		if(req.param('error') == 1) {
			$arr['login_error'] = 'Invalid Username/Password';
		}
		if(req.param('error') == 2) {
			$arr['login_error'] = 'Your account is deactivated/Moderate.Please contact Support';
		}
		if(req.param('error') == 3) {
			$arr['login_error'] = 'Registered successfully. Please check your mail to activate your account';
		}
		if(req.param('error') == 4) {
			$arr['login_error'] = 'Your account is activated!';
		}		
		if(req.param('error') == 5) {
			$arr['login_error'] = 'Verification link has not been activated yet';
		}
    }
    else {
      $arr['login_error'] ='';
    } 

    
   common.checkLogin(req,res,1);
   $arr.loged = req.session;
   var login = require('../module/login');
   login.login(req,res,$arr);

});

app.get('/logout', function(req, res){

	if(typeof(req.session.pid) === 'undefined') {
		delete req.session.userid;
		delete req.session.email;
		res.cookie('cookierefid',req.session.ref);
		res.cookie('cookierefmed',req.session.media);
		delete session;
		req.session.destroy();
		common.checkLogin(req,res,0);

	}
	else {
		var cart = require('../module/cart');
		var sess_length = req.session.pid.length;
		console.log('asdasd'+sess_length);
		for(i=0; i< sess_length; i++) {

			console.log(req.session.pid[i]);
			console.log(req.session.products[i]['qty_add']);

			cart.removeTempItem(req,config.mysql,q,req.session.pid[i],req.session.products[i]['qty_add']);
			//delete req.session.pid[i];
			//delete req.session.products[i]['qty_add'];
			req.session.pid = req.session.pid.filter(function(n){ return n != undefined });
			req.session.products = req.session.products.filter(function(n){ return n != undefined });

			delete req.session.pid[i];
			delete req.session.products[i]['qty_add'];

		}
		req.session.pid = [];
		console.log('asd'+req.session.pid.length);
		console.log('asd'+req.session.pid);
		if(req.session.pid.length == 0)	{
			delete req.session.temp_cart_id;
			delete req.session.temp_time_id;
			delete req.session.pid;
			delete req.session.products;
			delete req.session.timer;
			delete req.session.userid;
			delete req.session.email;
			delete req.session.phone;
			res.cookie('cookierefid',req.session.ref);
			res.cookie('cookierefmed',req.session.media);
			delete session;
			console.log('asdasd');
			req.session.destroy();
			common.checkLogin(req,res,0);

		}


	}
});

app.get('/forgot_password', function(req, res){
	$arr['textStatus'] = '';
	var url = require('url');
	var datas_ = url.parse(req.url,true).query;	
	if(datas_['id'] == '' || typeof(datas_['id']) == 'undefined')
	{   
	    $arr['step1'] =true;
		$arr['step2'] = false;
	    $arr['verifyurl'] = '';
		$arr['id'] =  '';
	}
	else
	{ 
	    $arr['step2'] =true;
		$arr['step1'] = false;
	    $arr['verifyurl'] = $arr['id'] =  datas_['id'];
	}
	     	
	common.tplFile('forgot_password.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
});

app.post('/forgot_password', function(req, res)
{	
	$mysqli = {email:req.body.email};
	strQuery = mysqli.mysqli($mysqli,12); 
	mysql = config.mysql;
	query =  mysql.query(strQuery, function (error, results, fields){
		if(results.length > 0 && results[0]['email'] == req.body.email )
		{   
			customerio = require('../module/customerio');
			customerio.uid = results[0]['id'];
			customerio.inits();     
			customerio.createCustomer({email:req.body.email,user:{firstName:results[0]['first_name'],lastName:results[0]['last_name']}}); 
    
		    var hw = cryptos.encrypt(req.body.email);
			var u_ID = results[0]['id'].toString() ;
			var id = cryptos.encrypt(u_ID);
			$arr['step1'] =true;
			$arr['step2'] = false;
			$arr['textStatus'] = 'An email has been dispatched to you to update your password';
			$arr['verifyurl'] =  config.url+'/login/forgot_password?id='+hw;
			customerio.sendEmail({event:'forgot_password',content:{passwordurl:$arr['verifyurl'],firstName:results[0]['first_name'],lastName:results[0]['last_name']}});
			$arr['id'] = id;
		}
	    else
		{
			$arr['textStatus'] = 'Email did not match with record';
		}
		
	});	
	common.tplFile('forgot_password.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
});

app.post('/changepassword', function(req, res){

		var u_ID = cryptos.decrypt(req.body.id);
		mysql = config.mysql;
        var md5 = require('MD5');
	    var password_salt = '12345'
	    var password = md5(md5(req.body.new_password)+password_salt);
		strQuery = mysqli.mysqli($mysqli,57);  
    
		$mysqli = {};
		var defered = q.defer();
		escape_data = [password,password_salt,u_ID];
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		res.writeHead(302, {
			'Location': '/login/'
		});
		res.end();return false;
  
});
app.get('/remainder',function(req, res){
    console.log('Remainder.Works');
  });


module.exports = app;
