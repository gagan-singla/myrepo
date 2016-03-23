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

var common   = require('../module/common');
var products = require('../module/products');

var app = express.Router();
//required js
var configure = require('../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
}

app.get(['/digitalcode'],function(req,res){
	var xml = '<?xml version="1.0" encoding="UTF-8"?><Response><Say  voice="alice" language="en-US" loop="0">Thank You for viewing demo Auctionsoftware Forward Auction.Your Approval Key is '+req.param('key')+'</Say></Response>';
	res.header('Content-Type','text/xml').send(xml);
	res.end();
	return false;
});

app.post(['/shippinginfo'], function(req, res){
	var cart = require('../module/cart');
	q.all([cart.getCartDetails(req,config.mysql,q)]).then(function(results){
		$arr.cart = results[0][0][0]; 
		common.tplFile('shipping-info.tpl');
		common.headerSet(0);
		common.loadTemplateHeader(req,res,$arr);
	});
});

app.post(['/feedbackinfo'], function(req, res){
	var dashboard = require('../module/dashboard');
	$arr.bid = req.param('bid');
	q.all([dashboard.getFeedBack(req,config.mysql,q)]).then(function(results){
		$arr.feedback = results[0][0][0];
		q.all([dashboard.getFeedBackData(req,config.mysql,q)]).then(function(resu){  
			$arr.review = resu[0][0][0];   
			$arr.review_type = resu[0][0];            
			common.tplFile('feedback-info.tpl');
			common.headerSet(0);
			common.loadTemplateHeader(req,res,$arr);
		});     
	});
});

app.post(['/addshippinginfo'], function(req, res){
	var cart = require('../module/cart');
	var dashboard = require('../module/dashboard');
	$arr.bid = req.param('bid');
		q.all([cart.getCartDetails(req,config.mysql,q)]).then(function(results){
		req.body.id = req.body.bid;
		q.all([dashboard.getBuynowRecord(req,config.mysql,q)]).then(function(resu){  
			$arr.cart = results[0][0][0];
			$arr.cart.shipping_info =  resu[0][0][0].shipping_info;
			$arr.cart.shipping_service =  resu[0][0][0].tracking_service;
			$arr.cart.shipping_id =  resu[0][0][0].tracking_number;
			common.tplFile('add-shipping-info.tpl');
			common.headerSet(0);
			common.loadTemplateHeader(req,res,$arr);
		});     
	});
});

app.post(['/viewshippingtrackinfo'], function(req, res){
	var cart = require('../module/cart');
	var dashboard = require('../module/dashboard');
	$arr.bid = req.param('bid');
	q.all([cart.getCartDetails(req,config.mysql,q)]).then(function(results){
		req.body.id = req.body.bid;
		q.all([dashboard.getBuynowRecord(req,config.mysql,q)]).then(function(resu){  
			$arr.cart = results[0][0][0];
			$arr.cart.shipping_info =  resu[0][0][0].shipping_info;
			$arr.cart.shipping_service =  resu[0][0][0].tracking_service;
			$arr.cart.shipping_id =  resu[0][0][0].tracking_number;
			common.tplFile('view-shipping-info.tpl');
			common.headerSet(0);
			common.loadTemplateHeader(req,res,$arr);
		});     
	});
});

app.post(['/updateshippinginfo'], function(req, res){

	var cart = require('../module/cart');
	var dashboard = require('../module/dashboard');
	$arr.bid = req.param('bid');	
	q.all([dashboard.getBuynowRecord(req,config.mysql,q)]).then(function(results){
		if(results[0][0].length == 0) {
			$arr['error'] = true;
			res.send(JSON.stringify($arr));
			res.end();return false;
		}
		else {
			var bid = req.body.id;
			req.body.id = results[0][0][0].project_id; 
			q.all([products.productDetail(req,config.mysql,q)]).then(function(resu) {   
				req.body.id = results[0][0][0].id;               
				if(resu[0][0][0].user_id != req.session.userid) {
					$arr['error'] = true;
					res.send(JSON.stringify($arr));
					res.end();return false;
				}
				else {
					dashboard.updateShippTrackInfo(req,config.mysql,q,bid);
					$arr['error'] = false;
					res.send(JSON.stringify($arr));
					res.end();return false;
				}
			});
		} 	
	});
});

app.post('/contact', function(req, res){
	common.checkLogin(req,res,0);
	message = require('../module/message');
	q.all([products.productDetail(req,config.mysql,q)]).then(function(results){ 
		var dat = require('date-util');
		var pid = results[0][0][0] 
		req.body.fromid = req.session.userid;
		req.body.first_name = pid.first_name;
		req.body.last_name = pid.last_name;     
		req.body.r_id = Date.parse(new Date())/1000;     
		req.body.toemail = pid.email;
		req.body.toid = pid.user_id;
		req.body.pid = pid.id;
		req.body.subject = 'Buyer Sent a Message Regards '+pid.title;
		req.session.placedcontract = true;
		message.addmessages(req,config.mysql,q);
		res.writeHead(302, {
			'Location': '/product/view/'+req.body.id
		});
		res.end();return false;
	});
});

app.post('/save', function(req, res){
	common.checkLogin(req,res,0);
	$arr.error = '';
	var attach = require('../module/attach');
	attach.save('product',req,res);
	q.all(products.save(req,res,config.mysql,q)).then(function(results){ 
		customerio = require('../module/customerio');
		customerio.uid = req.session.userid;
		customerio.inits();   
		customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});    
		customerio.sendEmail({event:'project_posted',content:{user:req.session.first_name+' '+req.session.last_name,name: req.body.title,url : config.url+'/product/view/'+results[0].insertId}});
		res.writeHead(302, {
			'Location': '/product/my'
		});
		res.end();return false;
	});
});

app.get('/post', function(req, res){
	var user = require('../module/user');
	common.checkLogin(req,res,0);


	var allow = common.checkPermission('allow_to_post',req);
	req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 :  req.param('id');
	if(!allow)
	{
		common.tplFile('subscription_denied.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
		return false;
	}

	if(req.body.id == 0)
	{
		var allow = common.checkLimitReached('monthly_project_limit',req);

		if(!allow)
		{
			$arr['messgae'] = 'Sorry! You have reached Monthly Limit of Product Posting.To add more products upgrade membership!';
			common.tplFile('subscription_limit_reached.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
			return false;
		}
		var allow = common.checkLimitReached('project_limit',req);

		if(!allow)
		{
			$arr['messgae'] = 'Sorry! You have reached Total Limit of Product Posting.To add more products upgrade membership!';
			common.tplFile('subscription_limit_reached.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
			return false;
		}
	}


	q.all([user.userInfo(req,config.mysql,q,req.session.userid,['paypal_address','zip','country','state','city']),common.locations(req,config.mysql,q)]).then(function(results)
	{  
		$arr.user = results[0][0][0];
		$arr.user.zip = (results[0][0][0].zip == null) ? '' : results[0][0][0].zip;
		$arr.user.state = (results[0][0][0].state == null) ? '' : results[0][0][0].state;
		$arr.user.country = (results[0][0][0].country == null) ? '' : results[0][0][0].country;
		$arr.user.city = (results[0][0][0].city == null) ? '' : results[0][0][0].city;
		var dateFormat = require('dateformat');
		$arr.datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		$arr.externalcss = ['datePicker'];
		$arr.externaljs = ['jquery.datePicker'];
		$arr['fee'] = global.general.feature_listing_fee;
		$arr.locations=results[1][0];
		common.checkLogin(req,res,0);
		$arr.error = '';
		products.post(req, res, $arr);
	});
});


app.get(['/my/','/my/:page'], function(req, res){
	res.writeHead(302, {
		'Location': '/dashboard'
	});
	res.end();return false;
	$arr.error = '';
	common.checkLogin(req,res,0);
	req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
	q.all([products.myproducts(req,config.mysql,q,0),products.myproducts(req,config.mysql,q,1)]).then(function(results){ 
		$arr['projects'] = products.shortDescribe(results[0][0]);
		$arr['pagination'] = products.shortDescribe(results[1][0]).length;
		var pagination = require('pagination');
		var paginator = new pagination.SearchPaginator({prelink:'/product/my', current:  req.body.page, rowsPerPage: 15, totalResult: $arr['pagination']});
		$arr['pagination_html'] = paginator.render();
		common.tplFile('myprojects.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);	
	});
});

app.get(['/view/','/view/:id','/bid/:pid','/buynow/:sid'], function(req, res){

	console.log('sesion check');

	console.log(req.session);
	console.log('sesion check end');
  $arr.error = '';
  req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
  req.body.id = (typeof(req.param('pid')) !== 'undefined') ? req.param('pid') : req.body.id;
  req.body.id = (typeof(req.param('sid')) !== 'undefined') ? req.param('sid') : req.body.id;
  $arr['externaljs'] = ['owl.carousel'];
  $arr['externalcss'] = ['owl.carousel','owl.theme','home_1'];
  $arr['bidshow'] = (typeof(req.param('pid')) !== 'undefined') ? true : false;
  $arr['buyshow'] = (typeof(req.param('sid')) !== 'undefined') ? true : false;
  q.all(products.productDetail(req,config.mysql,q)).then(function(results){ 
      bids = require('../module/bid');
      var dateFormat = require('dateformat');
      var date = require('date-utils');
      datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
      prdt = results[0][0];
      closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
      if((Date.compare(closeddate,datenow) <= 0) && prdt['market_status'] == 'open')
      {
         res.writeHead(302, {
             'Location': '/product/close/'+req.body.id 
         });
         res.end();return false;
      }
      user = require('../module/user');
      q.all([bids.bidHistory(req,config.mysql,q,0),bids.bidHistory(req,config.mysql,q,1),products.bidWinner(req,config.mysql,q),products.auctionSold(req,config.mysql,q),products.productImage(req,config.mysql,q),user.userInfo(req,config.mysql,q,prdt.user_id,['first_name','last_name']),products.otherItems(req,config.mysql,q,prdt.category_id,req.body.id),products.isinWatchlist(req,config.mysql,q)]).then(function(results2){ 
           $arr['bids'] = results2[0][0]; 
           $arr['bcnt'] = results2[1][0][0]['bid'];
           $arr['winbid'] = $arr['highbid'] = $arr['soldhim'] = $arr['placedbid'] = $arr['inwatchlist'] = false;
           $arr['placedbidamount'] = 0;
           $arr['users'] = results2[5][0][0];
           $arr['oproject'] = products.shortDescribe(results2[6][0]);
           if(results2[2][0].length > 0)
           {
            	$arr['winbid'] = true;
           } 
           if(results2[3][0].length > 0)
           {
           		$arr['soldhim'] = true;
           } 
           if(results2[0][0].length > 0 && typeof(req.session) !== 'undefined' && results2[2][0].length == 0)
           {
				if(results2[0][0][0]['user_id'] == req.session.userid)
				{
				  $arr['highbid'] = true;
				}
           }
		   if(results2[7][0].length > 0)
		   {
				$arr['inwatchlist'] = true;
		   } 
           if(typeof(req.session.placedbid) !== 'undefined')
           {            
				$arr['placedbidamount'] =req.session.placedbidamount;
				delete req.session.placedbid;
				delete req.session.placedbidamount;
				$arr['placedbid'] = true;
           } 
           $arr['project'] = products.shortDescribe(results[0]); 
           $arr['images'] = results2[4][0];
           $arr['projects'] = $arr['project'][0];
            if(typeof(req.session.placedcontract) !== 'undefined')
           {
             delete req.session.placedcontract;
             $arr['placecontract'] = true;
           }
           $arr.user_location=req.session.country;
           common.tplFile('product.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
     });
    });
});

app.get('/closeall/',function(req,res) {
    
  var bids = require('../module/bid');
  var dateFormat = require('dateformat');
  var date = require('date-utils');
  datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
  cart = require('../module/cart.js')
  var addTasksToProject = function(pid, cb) { // called once for each project row
  var prdt = pid; 

  req.params.id = pid.id;
  var bids = require('../module/bid');
 
  closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
  if((Date.compare(closeddate,datenow) <= 0 ) && prdt['market_status'] == 'open') { 
         q.all([bids.selectAwardBid(req,config.mysql,q)]).then(function(results1){
           if(results1[0][0].length > 0)
           {
              var bid = results1[0][0][0];
		      if(pid.rprice <= bid.proposed_amount) {  
					status = 'sold';				
					products.closeProjects(req,config.mysql,q,status,pid.id);
					payments = require('../module/payment');
					bids.makeAwardBid(req,config.mysql,q,bid['id']);
					payments.transactionid = 0;
					payments.gateway = 'account';
					payments.sessionsdata = [];
					payments.sessionsdata.title = pid.title;
					payments.sessionsdata.email = bid.email;
					payments.sessionsdata.url = $arr.config.url+'/product/view/'+pid.id;
					payments.sessionsdata.userid = bid.user_id;
					payments.sessionsdata.first_name = bid.first_name;
					payments.sessionsdata.last_name = bid.last_name;
					req.body.commission = $arr.config.general.commission_fee;
					payments.payid = pid.id;
					payments.type = 'winner';
					payments.name = prdt.title;
					payments.amount = bid.proposed_amount+pid.shipping_price;
					payments.insertInvoice();
					cart.insertBidnow(req,config.mysql,q,payments);				
					payments = require('../module/payment');
					message = require('../module/message');
	
					var dat = require('date-util');
					req.body.toid = bid.user_id;
					req.body.first_name = bid.first_name;
					req.body.last_name = bid.last_name;
					req.body.r_id = Date.parse(new Date())/1000;
					req.body.toemail = bid.email;
					req.body.fromid = pid.user_id;
					req.body.pid = pid.id;
					req.body.subject = 'Congrats! You Won the Item ';
					req.body.message = 'You Won the item.<br />Item Title : '+pid.title+'<br />Item Price : US$'+payments.amount+'<br />Item URL: '+$arr.config.url+'/product/view/'+pid.id+'<br />Contact Seller :'+pid['first_name']+'<br />Seller email address : '+pid['email'];
				  
					if(pid['phone'] != '' && pid['phone'] != null)
					{
						req.body.message += '<br />Seller Contact Phone: '+pid.phone;
					}
					message.addWithoutmessages(req,config.mysql,q);
					customerio = require('../module/customerio');
		  
					customerio.uid = req.body.toid;
					customerio.inits();
					customerio.createCustomer({email:req.body.toemail,user:{firstName:req.body.first_name,lastName:req.body.last_name}});
				  
					customerio.sendEmail({event:'winner_buyer',content:{subject:req.body.subject,fname:req.body.first_name,tname:req.body.last_name,message:req.body.message,url:$arr.config.url+'/product/view/'+pid.id,title:pid.title,price:payments.amount}});
				}  
           } 
           else if(prdt['market_status'] == 'open')
           {
             status = 'closed';
             products.closeProjects(req,config.mysql,q,status,pid.id);
           } 
            cb(null);  
           });
          }
  };
  q.all([products.productDetails(req,config.mysql,q)]).then(function(results){ 
    if(results[0][0].length > 0)
    {  
      var async = require('async');
      async.each(results[0][0], addTasksToProject, function(err) {
          if (err) return console.error(err);
          res.send('200');
        });
    }
    else
    {
       res.send('200');
       res.end();
    }
  }); 
});

app.get('/payment/:id', function(req, res){
	var dashboard = require('../module/dashboard');
	req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
	var profile = require('../module/profile_settings');
	q.all([profile.shippingDetails(req,config.mysql,q,req.session.userid),dashboard.getBuynowRecord(req,config.mysql,q)]).then(function(results) {
		bid = results[1][0];
		if(bid.length == 0)
		{
			res.writeHead(302, {
				'Location': '/dashboard/mywon'
			});
			res.end();return false;
		}  
		else if(bid[0].user_id != req.session.userid)
		{
			res.writeHead(302, {
				'Location': '/dashboard/mywon'
			});
			res.end();return false;
		}  
		else
		{
			price = bid[0].amount;
			cart  = require('../module/cart');
			q.all([cart.checkout(req,config.mysql,q,req.session.userid)]).then(function(results) {
				$arr['price'] = price;
				$arr['shipping'] = {};
				if(results[0][0].length > 0)
				{
					$arr['shipping'] = results[0][0][0];
				} 
				var braintrees = require('../module/braintrees');
				braintrees.generateToken(global.bgateway,templateCallback,req);
				function templateCallback(err,response)
				{
					$arr.id = req.param('id');
					creditcard = require('../module/creditcard');
					q.all([creditcard.AllMyPayments(req,$arr.config.mysql,q)]).then(function(results)
					{	
						$arr.creditCards =  results[0][0];
						$arr.clientToken = response.clientToken;
						$arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');		
						$arr.externalcss = ['buyer2'];
						common.tplFile('checkout_confirm_bid.tpl');
						common.headerSet(1);
						common.loadTemplateHeader(req,res,$arr);
					});
				}      
			});  
		}		
	});
});  

app.get('/close/:id', function(req, res){
	
	var bids = require('../module/bid');	
	var dateFormat = require('dateformat');
	var date = require('date-utils');
	datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	q.all([bids.selectAwardBid(req,config.mysql,q),products.productDetail(req,config.mysql,q)]).then(function(results){ 
		prdt = results[1][0][0];
		closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
		cart = require('../module/cart.js')
		if((Date.compare(closeddate,datenow)<= 0 ) && prdt['market_status'] == 'open')
		{
			var bid = results[0][0][0];
			var pid = results[1][0][0];
			status = 'closed';
			if(results[0][0].length > 0) {
				if(pid.rprice <= bid.proposed_amount){	
					payments = require('../module/payment');
					bids.makeAwardBid(req,config.mysql,q,bid['id']);
					payments.transactionid = 0;
					payments.gateway = 'account';
					payments.sessionsdata = [];
					payments.sessionsdata.title = pid.title;
					payments.sessionsdata.email = pid.email;
					payments.sessionsdata.url = $arr.config.url+'/product/view/'+pid.id;
					payments.sessionsdata.userid = pid.user_id;
					payments.sessionsdata.first_name = pid.first_name;
					payments.sessionsdata.last_name = pid.last_name;
					payments.sessionsdata.wfirst_name = bid.first_name;
					payments.sessionsdata.wlast_name = bid.last_name;
					payments.sessionsdata.wphone  = bid.phone;
					payments.sessionsdata.wemail = bid.email;
					payments.payid = req.param('id');
					payments.type = 'winner';
					payments.name = prdt.title;
					payments.amount = bid.proposed_amount+pid.shipping_price;
					payments.insertInvoice();
					req.body.commission = $arr.config.general.commission_fee;
					payments.sessionsdata.userid = bid.user_id;
					cart.insertBidnow(req,config.mysql,q,payments);
					message = require('../module/message');
					
					var dat = require('date-util');
					req.body.toid = bid.user_id;
					req.body.first_name = bid.first_name;
					req.body.last_name = bid.last_name;
					req.body.r_id = Date.parse(new Date())/1000;
					req.body.toemail = bid.email;
					req.body.fromid = pid.user_id;
					req.body.pid = pid.id;
					req.body.subject = 'Congrats! You Won the Item ';
					req.body.message = 'You Won the item.<br />Item Title : '+pid.title+'<br />Item Price : US$'+payments.amount+'<br />Item URL: '+$arr.config.url+'/product/view/'+pid.id+'<br />Contact Seller :'+pid['first_name']+'<br />Seller email address : '+pid['email'];
					
					if(pid['phone'] != '' && pid['phone'] != null)
					{
						req.body.message += '<br />Seller Contact Phone: '+pid.phone;
					}
					message.addWithoutmessages(req,config.mysql,q);
					customerio = require('../module/customerio');
					
					customerio.uid = req.body.toid;
					customerio.inits();
					customerio.createCustomer({email:req.body.toemail,user:{firstName:req.body.first_name,lastName:req.body.last_name}});
					
					customerio.sendEmail({event:'winner_buyer',content:{subject:req.body.subject,fname:req.body.first_name,tname:req.body.last_name,message:req.body.message,url:$arr.config.url+'/product/view/'+pid.id,title:pid.title,price:payments.amount}});
								  
					
					status = 'sold'
				} 
			} 
			else if(prdt['market_status'] == 'open') {
				status = 'closed';
			} 
			products.closeProject(req,config.mysql,q,status);
			res.writeHead(302, {
				'Location': '/product/view/'+req.param('id')
			});
			res.end();return false;
		} 
		else {
			res.writeHead(302, {
				'Location': '/product/view/'+req.param('id')
			});
			res.end();return false;
		}	
	});
});

app.post('/watchlist',function(req,res)
{
   var log = common.checkLoginajax(req,res,0);
   if(!log) {
     data = {access:false}
     common.ajaxjson(res,data);
   }
   else
   {
    q.all([products.isinWatchlist(req,config.mysql,q),products.productDetail(req,config.mysql,q)]).then(function(results)
    {  
       if(results[0][0].length > 0)
       {
         data = {access:true,isadded:true}
         common.ajaxjson(res,data);   
       } 
       else
       {
        products.addWatchlist(req,config.mysql,q);
        customerio = require('../module/customerio');
        customerio.uid = req.session.userid;
        customerio.inits();         
        customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});          
        customerio.sendEmail({event:'watchlist_added',content:{user:req.session.first_name+' '+req.session.last_name,title: results[1][0][0].title}});
        data = {access:true,isadded:false}
        common.ajaxjson(res,data);   
       } 
    }); 
   } 
});

app.get('/buy/:id', function(req, res){
	common.checkLogin(req,res,0);	
	bids = require('../module/bid');
	user = require('../module/user');
	req.body.id = req.param('id');
	q.all([bids.maxcheckbidPlaced(req,config.mysql,q),products.productDetail(req,config.mysql,q),user.userInfo(req,config.mysql,q,req.session.userid,['balance','reserve_amount'])]).then(function(results){ 
	
	maxisthere = results[0][0].length;	
	maxuid = 0;
	maxamt = 0;
	maxbid = [];
	if(maxisthere > 0)
	{
		maxbid = results[0][0][0];
		maxuid = maxbid.user_id;
		maxamt = maxbid.amt;
	}  	
	prdt = results[1][0][0];
	req.body.title = prdt.title;
	if(maxuid == req.session.userid)
	{
		results[2][0][0]['reserve_amount'] = results[2][0][0]['reserve_amount'] - maxamt;
	}  
	var dateFormat = require('dateformat');
	var date = require('date-utils');
	results[1][0][0]['wsprice'] = results[1][0][0]['wprice']+config.perbid;
	datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
	maxamnt = (maxuid > 0 && maxuid == req.session.user_id) ?  maxamt : 0;
	req.body.placeamt =  config.perbid;
	if((Date.compare(closeddate,datenow) <= 0 ) && prdt['market_status'] == 'open')
	{
		res.writeHead(302, {
			'Location': '/product/close/'+req.param('id')
		});
		res.end();return false;
	}
	else if(prdt['market_status'] != 'open')
	{
		res.writeHead(302, {
			'Location': '/product/view/'+req.param('id')
		});
		res.end();return false;
	} 
	else if((results[2][0][0]['balance'] - results[2][0][0]['reserve_amount'])  < results[1][0][0]['bprice']+results[1][0][0]['shipping_price'])
	{
		req.session.page = config.url+'/product/buy/'+req.param('id')+'/';
		res.writeHead(302, {
			'Location': '/package'
		});
		res.end();return false;
	} 
	else {
			if(maxuid > 0)
			{
				req.body.bid = maxbid.id;
				req.body.buid = maxbid.user_id;
				req.body.amt = maxbid.amt+results[1][0][0]['shipping_price'];
				bids.reduceReserve(req,config.mysql,q); 
				bids.removeBidReserve(req,config.mysql,q);	
			} 
			var pid = results[1][0][0];
			payments = require('../module/payment');
			bids.makeBought(req,config.mysql,q,parseFloat(pid.bprice,2)+parseFloat(results[1][0][0]['shipping_price'],2));
			bids.reduceBalance(req,config.mysql,q,parseFloat(pid.bprice,2)+parseFloat(results[1][0][0]['shipping_price'],2));
			payments.transactionid = 0;
			payments.gateway = 'account';
			payments.sessionsdata = [];
			payments.sessionsdata.title = pid.title;
			payments.sessionsdata.email = req.session.email;
			payments.sessionsdata.url = config.url+'/product/buy/'+pid.id;
			payments.sessionsdata.userid = req.session.userid;
			payments.sessionsdata.first_name = req.session.first_name;
			payments.sessionsdata.last_name = req.session.last_name;
			payments.payid = req.param('id');
			payments.type = 'bought';
			payments.name = prdt.title;
			payments.amount = pid.bprice+pid.shipping_price;
			payments.insertInvoice();
			payments.sessionsdata.userid = pid.user_id;
			payments.sessionsdata.email = pid.email;
			payments.sessionsdata.first_name = pid.first_name;
			payments.sessionsdata.last_name = pid.last_name;
			payments.type = 'sold';
			payments.insertInvoice();
			status = 'sold'
			products.closeProject(req,config.mysql,q,status);
			res.writeHead(302, {
				'Location': '/product/view/'+req.param('id')
			});
			res.end();return false;		
		}  
	});
});

app.get('/cart/clear', function(req, res){
       cart = require('../module/cart');
       q.all([cart.clearAllCart(req,config.mysql,q,parseInt(config.general.cart_timer)+12)]).then(function(results)
       {
           var prdt = results[0][0];
           for(i in prdt) {
				cart.updateDeleteBooked(req,config.mysql,q,prdt[i]);
				cart.minusReduceCart(req,config.mysql,q);
				if(i == prdt.length - 1) {
				  res.send('Success');
				  res.end();
				  return false;
				}  
           } 
           if(prdt.length == 0)
           {
              res.send('No Cart');
              res.end();
              return false;
           }
           
       });
 });
 
app.get('/removecart/:id', function(req, res){
	cart = require('../module/cart');
	if(typeof(req.session.timer) === 'undefined') {
		req.session.timer = config.general.cart_timer;  
	}
	cart.removeitem(req.param('id'),req,res,config.mysql);
});

app.get('/cart/:id', function(req, res){
   cart = require('../module/cart');
   if(typeof(req.session.timer) === 'undefined')
   {
	   req.session.timer = config.general.cart_timer;  
   }
   cart.addItem(req.param('id'),req,res,config.mysql);
}); 

app.get('/cart/remove/:action', function(req, res){
      cart = require('../module/cart');
      if(typeof(req.session.pid) !== 'undefined') {
			for(i in req.session.pid) {        
				cart.removeTempItem(req,config.mysql,q,req.session.pid[i],req.session.products[i]['qty_add']);
				cart.minusReduceCart(req,config.mysql,q);
				delete req.session.pid[i];
				delete req.session.products[i]; 
				req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
				req.session.products = req.session.products.filter(function(n){ return n != undefined });
				if(req.session.pid.length == 0)
				{
					delete req.session.temp_cart_id;
					delete req.session.temp_time_id;
					delete req.session.pid;
					delete req.session.products;
					delete req.session.timer;
					if(req.param('action') == 'ajax')
					{
						var send = [];
						send['success'] = true;
						res.send(JSON.stringify(send));
						res.end();
						return false;
					} 
					else
					{
						res.writeHead(302, {
							'Location': '/'
						});
						res.end();return false;
					} 
				}       
			}  
	  }  
      else {
		    if(req.param('action') == 'ajax') {
				var send = [];
				send['success'] = true;
				res.send(JSON.stringify(send));
				res.end();
				return false;
		   } 
		   else {
			  res.writeHead(302, {
				   'Location': '/'
			   });
			  res.end();return false;
		  } 
      }  
});

app.get('/checkout/cart', function(req, res){
       cart = require('../module/cart');
       $arr.externalcss = ['buyer2'];
       if(typeof(req.session.pid) === 'undefined')
       {
               res.writeHead(302, {
                     'Location': '/'
               });
               res.end();return false;
       } 
       else
       {
             req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
             req.session.products = req.session.products.filter(function(n){ return n != undefined });
             if(req.session.pid.length == 0)
             {
                   res.writeHead(302, {
                     'Location': '/'
                   });
                   res.end();return false;
             }
       } 
       req.body.sid = (!req.session.pid instanceof Array) ? req.session.pid : req.session.pid.join(',');
	   q.all([cart.productDetailItems(req,config.mysql,q)]).then(function(results){
	
			var prdct = results[0][0];
			for(i in prdct)
			{
				prdt = prdct[i]; 
				var m = req.session.pid.indexOf(prdt.id);			
				var dateFormat = require('dateformat');
				prdt['qty'] = parseInt(prdt['qty']);
				prdt['booked'] = parseInt(prdt['booked']);
				prdt['sold'] = parseInt(prdt['sold']);
				req.session.products[m]['qty_add'] = parseInt(req.session.products[m]['qty_add']);
				var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
				var closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");         
				req.session.products[m]['booked'] = prdt['booked'];   
				req.session.products[m]['error'] = '';
			}
			common.tplFile('checkout.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
		}); 
});

app.post('/checkout/update', function(req, res){
       cart = require('../module/cart');
       if(typeof(req.session.pid) === 'undefined')
       {
               res.writeHead(302, {
                     'Location': '/'
               });
               res.end();return false;
       } 
       else
       {
             req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
             req.session.products = req.session.products.filter(function(n){ return n != undefined });
             if(req.session.pid.length == 0)
             {
                   res.writeHead(302, {
                     'Location': '/'
                   });
                   res.end();return false;
             }
       } 
       req.body.sid = (!req.session.pid instanceof Array) ? req.session.pid : req.session.pid.join(',');
       q.all([cart.productDetailItems(req,config.mysql,q)]).then(function(results){
            var prdct = results[0][0];
            for(i in prdct)
			{
			  prdt = prdct[i]; 
			  var m = req.session.pid.indexOf(prdt.id);          
			  var dateFormat = require('dateformat');
			  prdt['qty'] = parseInt(prdt['qty']);
			  prdt['booked'] = parseInt(prdt['booked']);
			  prdt['sold'] = parseInt(prdt['sold']);
			  req.session.products[m]['qty_add'] = parseInt(req.session.products[m]['qty_add']);
			  var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
			  var closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");         
			  req.session.products[m]['booked'] = prdt['booked'];   
			  req.session.products[m]['error'] = '';
			  if((Date.compare(closeddate,datenow) <= 0 ) && prdt['market_status'] == 'open' && !k_l)
			  {
				 req.session.products[m]['error'] = 'Project Closed!';
				 delete req.session.products[m];
				 delete req.session.pid[i];
			  }
			  else if(prdt['qty'] - prdt['sold'] - prdt['booked'] - parseInt(req.body['pid['+prdt['id']+']']) + req.session.products[m]['qty_add']  < 0)            {
				 req.session.products[m]['error'] = (prdt['qty'] - prdt['sold'] - prdt['booked']+ req.session.products[m]['qty_add'])+' Qty available.Remaining all are Booked / Sold!'
			  }
			  else if(prdt['market_status'] != 'open')
			  {
				  req.session.products[m]['error'] = 'Project Sold!'
				  delete req.session.products[m];
				  delete req.session.pid[i];
			  }
			  else
			  {
				cart.upDateItemBooked(req,config.mysql,q,prdt['id'],req.session.products[m]['qty_add'],req.body['pid['+prdt['id']+']']);
				req.session.products[m]['qty_add'] = req.body['pid['+prdt['id']+']'];
				req.session.products[m]['error'] = '';
			  }  
			  if(prdct.length-1 == i)
			  {
				   req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
				   req.session.products = req.session.products.filter(function(n){ return n != undefined });
				   if(req.session.pid.length == 0)
				   {
					 delete req.session.temp_cart_id;
					 delete req.session.temp_time_id;
					 delete req.session.pid;
					 delete req.session.products;
					 delete req.session.timer;
				   } 
				   res.writeHead(302,{
						 'Location': '/product/checkout/cart/'
				   });
				   res.end();
				   return false;
			  } 
		   } 
       });        
});

app.get('/test',function(req,res){
	fg = 454;
	cart = require('../module/cart');
	q.all([cart.selectCartItems(req,config.mysql,q,fg)]).then(function(resu)
	{ 
		console.log(resu);
	});  
});

app.post(['/bidpayment/:id','/bidpayment/:id/:error'], function(req, res){
     var dashboard = require('../module/dashboard');
     var product = require('../module/products');
     req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
     $arr['error'] = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
     q.all([dashboard.getBuynowRecord(req,config.mysql,q)]).then(function(results){
        bid = results[0][0];
        q.all([product.productDetailId(req,config.mysql,q,bid[0].project_id)]).then(function(data2){      
              pid = data2[0][0][0];
              if(bid.length == 0)
              {
                 res.writeHead(302, {
                     'Location': '/dashboard/mywon'
                 });
                 res.end();return false;
              }  
              else if(bid[0].user_id != req.session.userid)
              {
                  res.writeHead(302, {
                     'Location': '/dashboard/mywon'
                 });
                 res.end();return false;
              }  
              else
              {
                 price = bid[0].amount;
				 if(req.body.paymentMethodNonceInputField == '')
				 {
				 	 req.body.paymentMethodNonceInputField = req.body.payment_method_nonce;
				 }
				 if(req.body.payment_method_nonce == '')
				 {
				  	req.body.payment_method_nonce = req.body.paymentMethodNonceInputField;
				 }
				 req.body.commission = config.general.commission_fee;
				 if(req.param('savecard') == 1 || req.param('savepaypal') == 1)
				 {
					  var braintrees = require('../module/braintrees');
					  global.bgateway.mysql = $arr.config.mysql;        
					  braintrees.saveCreditCard(global.bgateway,req,res,payProcess);
				 }
				 else if(req.param('paymentmethod') == 'cc' || req.param('paymentmethod') == 'paypal')
				 {
				  	  payProcess(1,'');
				 } 
				 else
				 {
				   creditcard = require('../module/creditcard');
				   q.all([creditcard.PickPayments(req,$arr.config.mysql,q,req.param('paymentmethod'))]).then(function(resu) {				  
					  if(resu[0][0][0].user_id == req.session.userid)
					  {
						req.body.token = resu[0][0][0].token_id;
						payProcess(1,'');
					  }
					  else
					  {
						res.writeHead(302, {
						 'Location': '/product/checkout/confirm/Invalid Card'
						});
						res.end();return false;
					  }
					});  
				 } 

                 function payProcess(err,resp){
					if(err == 0)
						{
						res.writeHead(302, {
						'Location': '/product/checkout/confirm/'+resp
						});
						res.end();
						return false;
					} 
					if(req.param('savecard') == 1)
					{
						var pay = {
						amount: price,
						paymentMethodToken: resp.creditCard.token,
						options: {
							submitForSettlement: true
						}};
					} 
					else if(req.param('savepaypal') == 1)
					{
						var pay = {
						amount: price,
						paymentMethodToken: resp.paypalAccount.token,
						options: {
							submitForSettlement: true
						}};
					} 
					else if(typeof(req.body.token) !== 'undefined')
					{
						var pay = {
						amount: price,
						paymentMethodToken: req.body.token,
						options: {
							submitForSettlement: true
						}};
					}
					else
					{
						var pay = {
						amount: price,
						paymentMethodNonce: req.param('paymentMethodNonceInputField'),
						options: {					
							submitForSettlement: true
						}};
					} 

					var ml = global.bgateway.transaction.sale(pay, function (err, result) {	
						if(result.success) {
							if(result.transaction.status) {
								cart = require('../module/cart');
								q.all([cart.insertCartDetails(req,config.mysql,q,result.transaction.id,price)]).then(function(results) {
									cart_id = results[0][0].insertId;
									cart.paidBuynow(req,config.mysql,q,cart_id,config.general.escrow);
									customerio = require('../module/customerio');
									
									customerio.uid = pid['user_id'];
									customerio.inits();
									customerio.createCustomer({email:pid['email'],user:{firstName:pid['first_name'],lastName:pid['last_name']}});
									
									customerio.sendEmail({event:'item_sold',content:{user:pid['first_name']+' '+pid['last_name'],bname:req.param('f_name'),bphone:req.param('phone'),bemail:req.param('email'),qty:1,price: 1*(pid['bprice']+pid['shipping_price']),title: pid['title'],url:global.url+'/product/view/'+pid['id']}});
									
									res.writeHead(302, {
										'Location': '/dashboard/mywon'
									});
									res.end();return false;
								});
							}
							else
							{
								$arr['error'] = result.transaction.processorResponseText;
								res.writeHead(302, {
									'Location': '/product/bidpayment/'+req.body.id+'/'+$arr['error']
								});
								res.end();return false;
							}  
					}
					else {
						$arr['error'] = '';					
						$arr['error'] += result.message;					
						res.writeHead(302, {
							'Location': '/product/bidpayment/'+req.body.id+'/'+$arr['error']
						});
						res.end();
						return false;
					}  
				});  
				}
            }              
		});
	}); 
});             


app.post('/checkout/pay', function(req, res){ 
     req.session.cartdetails = req.body;
     var brain_cust_id = global.bcustomer_prefix+req.session.userid;
     price = 0;
     for(i in req.session.products)
     {
          price = price+(req.session.products[i].qty_add)*(req.session.products[i].bprice+req.session.products[i].shipping_price);
     } 
     if(req.body.paymentMethodNonceInputField == '')
     {
      	  req.body.paymentMethodNonceInputField = req.body.payment_method_nonce;
     }
     if(req.body.payment_method_nonce == '')
     {
     	 req.body.payment_method_nonce = req.body.paymentMethodNonceInputField;
     }
     req.body.commission = config.general.commission_fee;
     if(req.param('savecard') == 1 || req.param('savepaypal') == 1)
     {
		var braintrees = require('../module/braintrees');
		global.bgateway.mysql = $arr.config.mysql;        
		braintrees.saveCreditCard(global.bgateway,req,res,payProcess);
     }
     else if(req.param('paymentmethod') == 'cc' || req.param('paymentmethod') == 'paypal')
     {
       payProcess(1,'');
     } 
     else
     {
       creditcard = require('../module/creditcard');
       q.all([creditcard.PickPayments(req,$arr.config.mysql,q,req.param('paymentmethod'))]).then(function(resu)
       {
        if(resu[0][0][0].user_id == req.session.userid)
        {
          req.body.token = resu[0][0][0].token_id;
          payProcess(1,'');
        }
        else
        {
            res.writeHead(302, {
             'Location': '/product/checkout/confirm/Invalid Card'
            });
            res.end();return false;
        }  
         
       });  
     } 

     function payProcess(err,resp)
     {
         if(err == 0)
         {
			  res.writeHead(302, {
			  	'Location': '/product/checkout/confirm/'+resp
			  });
			  res.end();
			  return false;
         } 
         if(req.param('savecard') == 1)
         {
           var pay = {
			amount: price,
			paymentMethodToken: resp.creditCard.token,
			options: {
				  submitForSettlement: true
			}};
         } 
         else if(req.param('savepaypal') == 1)
         {
           var pay = {
			amount: price,
			paymentMethodToken: resp.paypalAccount.token,
			options: {
				  submitForSettlement: true
			}};
         } 
         else if(typeof(req.body.token) !== 'undefined')
         {
            var pay = {
			amount: price,
			paymentMethodToken: req.body.token,
			options: {
				  submitForSettlement: true
			}};
         }
         else
         {
            var pay = {
			amount: price,
			paymentMethodNonce: req.param('paymentMethodNonceInputField'),
			options: {
				  submitForSettlement: true
			}};
         } 
        
		var ml = global.bgateway.transaction.sale(pay , function (err, result) {
			if(result.success) {
				  if(result.transaction.status)
				  {
					 cart = require('../module/cart');
					 q.all([cart.insertCartDetails(req,config.mysql,q,result.transaction.id,price)]).then(function(results) {
						var fg = (req.session.pid instanceof  Array) ? req.session.pid.join(',') : req.session.pid;
						refund = 0.00;
						cart_id = results[0][0].insertId;			
						q.all([cart.selectCartItems(req,config.mysql,q,fg)]).then(function(resu) {
						var prd = resu[0][0];
						for(i in prd)
						{
						var m_add = req.session.pid.indexOf(prd[i].id);
						if(prd[i].market_status != 'open') {
							prefund = req.session.products[m_add]['qty_add']*(req.session.products[m_add]['bprice']+req.session.products[m_add]['shipping_price']); 
							available = 0;  
							req.session.products[m_add]['saled'] = 0;
						}
						else {					
							var available = prd[i].qty-prd[i].sold;
							var prefund = 0.00;
							if(available <= 0) {
								prefund = req.session.products[m_add]['qty_add']*(req.session.products[m_add]['bprice']+req.session.products[m_add]['shipping_price']); 
								req.session.products[m_add]['saled'] = 0;
							}  
							else if(available < req.session.products[m_add]['qty_add']) {
								var ref_prd = req.session.products[m_add]['qty_add']-available;
								prefund = ref_prd*(req.session.products[m_add]['bprice']+req.session.products[m_add]['shipping_price']);   
								req.session.products[m_add]['saled'] = available;
							}  
							else {					
								req.session.products[m_add]['saled'] = req.session.products[m_add]['qty_add'];
							}
						}  
						
						req.session.products[m_add]['refund'] = prefund;
						cart.insertBuynow(req,config.mysql,q,m_add,cart_id,config.general.escrow);
						refund +=  prefund;
						if(req.session.products[m_add]['saled'] > 0) {
							message = require('../module/message');				
							var dat = require('date-util');
							req.body.toid = req.session.userid;
							req.body.first_name = req.session.first_name;
							req.body.last_name = req.session.last_name;
							req.body.r_id = Date.parse(new Date())/1000;
							req.body.toemail = req.session.email;
							req.body.fromid = req.session.products[m_add].user_id;
							req.body.pid = req.session.products[m_add].id;
							req.body.subject = 'Regards Buying '+req.session.products[m_add]['saled']+' qty of '+req.session.products[m_add]['title'];
							req.body.message = 'Thank You for buying the item with us.Any Queries Please email us.';
							message.addmessages(req,config.mysql,q);
							cart.updateSold(req,config.mysql,q,prd[i]['id'],req.session.products[m_add]['saled']); 
							cart.insertBuyItemInvoices(req,config.mysql,q,m_add,cart_id);
						}  
						if((available - req.session.products[m_add]['saled']) <= 0 && prd[i]['market_status'] == 'open')
						{
							  cart.closeProduct(req,config.mysql,q,prd[i]['id']);
						}  
										   
						cart.cartPaidPrdt(req,config.mysql,q,prd[i]['id'],req.session.temp_cart_id,req.session.products[m_add]['qty_add']);
						if(i == prd.length - 1){			
						   delete req.session.pid;
						   delete req.session.products;
						   if(typeof(req.session.pid) !== 'undefined')
						   {
							 req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
							 req.session.products = req.session.products.filter(function(n){ return n != undefined });
							 if(req.session.pid.length == 0)
							 {
							   delete req.session.temp_cart_id;
							   delete req.session.temp_time_id;
							   delete req.session.pid;
							   delete req.session.products;
							   delete req.session.timer;
							 }
						   }
						   else
						   {
							   delete req.session.temp_cart_id;
							   delete req.session.temp_time_id;                                                       
							   delete req.session.timer;
						   } 
						   if(refund > 0)
						   {
								global.bgateway.transaction.refund(result.transaction.id, refund, function (err, refund_result) {
									if(refund_result.success)
									{ 
										cart.updateCartRefund(req,config.mysql,q,refund,refund_result.transaction.id,cart_id)
									}
									req.body.id = cart_id;    
									q.all([cart.getBuynowCartDetails(req,config.mysql,q)]).then(function(resq) {
										if(resq[0][0].length == 0)
										{
											res.writeHead(302, {
												'Location': '/product/checkout/paid/?id='+cart_id
											});
											res.end();return false;
										}  
										for(i in resq[0][0]) { 
											cart.updateInvoiceBuy(req,config.mysql,q,resq[0][0][i].id,cart_id,resq[0][0][i].project_id);     
											if(i == resq[0][0].length - 1)
											{  
												res.writeHead(302, {
													'Location': '/product/checkout/paid/?id='+cart_id
												});
												res.end();return false;
											} 
										} 
									});   
								});				  
						  } 
						  else
						  {   
							 req.body.id = cart_id;   
							 q.all([cart.getBuynowCartDetails(req,config.mysql,q)]).then(function(resq) { 
								 for(i in resq[0][0])
								 {
									   cart.updateInvoiceBuy(req,config.mysql,q,resq[0][0][i].id,cart_id,resq[0][0][i].project_id);     
									   if(i == resq[0][0].length - 1) { 
											 res.writeHead(302, {
											   'Location': '/product/checkout/paid/?id='+cart_id
											 });
											 res.end();return false;
										}
								  }   
							  });   
						  } 								  
						}  
					} 
					});	
				}); 
			}  
			else{
					$arr['error'] = result.transaction.processorResponseText;
					res.writeHead(302, {
					   'Location': '/product/checkout/confirm/'+$arr['error']
					});
					res.end();
					return false;
			}	
		} 
		else {	
			$arr['error'] = '';
			$arr['error'] += result.message;
			res.writeHead(302, {
			   'Location': '/product/checkout/confirm/'+$arr['error']
			});
			res.end();
			return false;
		} 	
	});
	}            
});  

app.get(['/checkout/paid'],function(req,res){
   cart = require('../module/cart');
   $arr.externalcss = ['buyer2'];
   q.all([cart.getCartDetails(req,config.mysql,q),cart.getBuynowCartDetails(req,config.mysql,q)]).then(function(results)
    {
		 $arr['cart'] = results[0][0][0];
		 $arr['buynow'] = results[1][0];
		 common.tplFile('checkout_paid.tpl');
		 common.headerSet(1);
		 common.loadTemplateHeader(req,res,$arr);
    });
});

app.get(['/checkout/confirm','/checkout/confirm/:error'], function(req, res){
	
	try {
		var price1 = 0;
		for (i in req.session.products) {
			price1 = price1 + (req.session.products[i].qty_add) * (req.session.products[i].bprice + req.session.products[i].shipping_price);
		}

	}catch(e){
		console.log("Error in getting price "+price1);
	}
	$arr.pro_price = price1;

	cart = require('../module/cart');
    $arr['error'] = (typeof(req.param('error')) !== 'undefined') ? req.param('error') : ''; 
    if(typeof(req.session.pid) === 'undefined') {
	   res.writeHead(302, {
			 'Location': '/'
	   });
	   res.end();return false;
   } 
   else
   {
	 req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
	 req.session.products = req.session.products.filter(function(n){ return n != undefined });
	 if(req.session.pid.length == 0)
	 {
		   res.writeHead(302, {
			 'Location': '/'
		   });
		   res.end();return false;
	 }
   }
    var profile = require('../module/profile_settings');
    q.all([profile.shippingDetails(req,config.mysql,q,req.session.userid)]).then(function(results){
			$arr['shipping'] = {};
			if(results[0][0].length > 0)
			{
			   $arr['shipping'] = results[0][0][0];
			}
			if(typeof(req.session.cartdetails) !== 'undefined')
			{
			  $arr['shipping'] = req.session.cartdetails;
			  $arr['shipping']['first_name'] = $arr['shipping']['f_name'];
			  $arr['shipping']['last_name'] = $arr['shipping']['l_name'];
			  delete req.session.cartdetails;	
			}             
          var braintrees = require('../module/braintrees');
          braintrees.generateToken(global.bgateway,templateCallback,req);
          function templateCallback(err,response) {
                creditcard = require('../module/creditcard');
                q.all([creditcard.AllMyPayments(req,$arr.config.mysql,q)]).then(function(results) {
                  $arr.creditCards =  results[0][0];
                  $arr.clientToken = response.clientToken;
                  $arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
                  
                  $arr.externalcss = ['buyer2'];
                  common.tplFile('checkout_confirm.tpl');
                  common.headerSet(1);
                  common.loadTemplateHeader(req,res,$arr);
               });
          }  
    });   
});

app.post('/confirm/', function(req, res){
  common.checkLogin(req,res,0);
  config.perbid = global.general.bidincrement;
  bids = require('../module/bid');
  user = require('../module/user');
  q.all([bids.maxcheckbidPlaced(req,config.mysql,q),products.productDetail(req,config.mysql,q),user.userInfo(req,config.mysql,q,req.session.userid,['balance','reserve_amount'])]).then(function(results){ 
      maxisthere = results[0][0].length;      
      maxuid = 0;
      maxamt = 0;
      maxbid = [];
      if(maxisthere > 0)
      {
        maxbid = results[0][0][0];
        maxuid = maxbid.user_id;
        maxamt = maxbid.amt;
      }      
      prdt = results[1][0][0];
      req.body.title = prdt.title;
      if(maxuid == req.session.userid)
      {
        results[2][0][0]['reserve_amount'] = results[2][0][0]['reserve_amount'] - maxamt;
      }  
      var dateFormat = require('dateformat');
      var date = require('date-utils');
      results[1][0][0]['wsprice'] = results[1][0][0]['wprice']+config.perbid;
      datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
      closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
      maxamnt = (maxuid > 0 && maxuid == req.session.user_id) ?  maxamt : 0;
      req.body.placeamt =  config.perbid;
     if((Date.compare(closeddate,datenow) <= 0 ) && prdt['market_status'] == 'open')
     {
        res.writeHead(302, {
           'Location': '/product/close/'+req.param('id')
       });
       res.end();return false;
     }
     else if(prdt['market_status'] != 'open')
     {
       res.writeHead(302, {
           'Location': '/product/view/'+req.param('id')
       });
       res.end();return false;
     } 
    else if(results[1][0][0]['wprice'] <= req.body.wsprice)
    {
         update = 0;        
         q.all(bids.placeBid(req,config.mysql,q,1)).then(function(resbid) {     
           req.body.placebid = resbid[0].insertId;           
           req.session.placedbid = true;
           req.session.placedbidamount = req.body.wsprice;
           delete customerio;
           customerio = require('../module/customerio');
           customerio.uid = req.session.userid;
           customerio.inits();           
           customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});            
           customerio.sendEmail({event:'bid_submitted',content:{user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice}});
           req.body.wssprice = parseFloat(req.body.wsprice,2)+parseFloat(results[1][0][0]['shipping_price'],2);        
           bids.updateBid(req,config.mysql,q);
           res.writeHead(302, {
               'Location': '/product/view/'+req.param('id')
           });
           res.end();return false;    
       });      
    }
    else
    {
      q.all(bids.placeBid(req,config.mysql,q,1)).then(function(resbid) {  
          req.body.placebid = resbid[0].insertId; 
          delete customerio;
          customerio = require('../module/customerio');
          customerio.uid = req.session.userid;
		  customerio.inits();
		  req.session.placedbid = true;
		  req.session.placedbidamount = req.body.wsprice;
		  customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});		  
		  customerio.sendEmail({event:'bid_submitted',content:{user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice}});         
          res.writeHead(302, {
                 'Location': '/product/view/'+req.param('id')
           });
          res.end();return false;
      });  
    }  
  });
});

app.post('/confirm/', function(req, res){
	common.checkLogin(req,res,0);
	var allow = common.checkPermission('allow_to_bid',req);
	if(!allow) {
		common.tplFile('subscription_denied.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
		return false;
	}  
	var allow = common.checkLimitReached('monthly_bid_limit',req);
	if(!allow) {
		$arr['messgae'] = 'Sorry! You have reached Monthly Limit of Product Bidding.To add more products upgrade membership!'; 
		common.tplFile('subscription_limit_reached.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
		return false;
	}
	var allow = common.checkLimitReached('bid_limit',req);
	if(!allow)
	{
		$arr['messgae'] = 'Sorry! You have reached Total Limit of Product Bidding.To add more products upgrade membership!'; 
		common.tplFile('subscription_limit_reached.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
		return false;
	}  
	bids = require('../module/bid');
	user = require('../module/user');
	q.all([bids.maxcheckbidPlaced(req,config.mysql,q),products.productDetail(req,config.mysql,q),user.userInfo(req,config.mysql,q,req.session.userid,['balance','reserve_amount'])]).then(function(results){ 
		maxisthere = results[0][0].length;      
		maxuid = 0;
		maxamt = 0;
		maxbid = [];
		if(maxisthere > 0)
		{
			maxbid = results[0][0][0];
			maxuid = maxbid.user_id;
			maxamt = maxbid.amt;
		}
		prdt = results[1][0][0];
		req.body.title = prdt.title;
		if(req.body.wsprice <= prdt.wprice) {
			req.session.placedbiderror = 'Please submit higher bid!';
			res.writeHead(302, {
				'Location': '/product/view/'+req.param('id')
			});
			res.end();return false;
		}
		if(maxuid == req.session.userid){
			results[2][0][0]['reserve_amount'] = results[2][0][0]['reserve_amount'] - maxamt;
		}  
		var dateFormat = require('dateformat');
		var date = require('date-utils');
		results[1][0][0]['wsprice'] = results[1][0][0]['wprice']+config.perbid;
		datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
		maxamnt = (maxuid > 0 && maxuid == req.session.user_id) ?  maxamt : 0;
		req.body.placeamt =  config.perbid;
		if((Date.compare(closeddate,datenow) <= 0 ) && prdt['market_status'] == 'open') {
			res.writeHead(302, {
				'Location': '/product/close/'+req.param('id')
			});
			res.end();return false;
		}
		else if(prdt['market_status'] != 'open')
		{
			res.writeHead(302, {
				'Location': '/product/view/'+req.param('id')
			});
			res.end();return false;
		}
		else if(results[1][0][0]['wprice'] <= req.body.wsprice)
		{
			update = 0;		
			q.all(bids.placeBid(req,config.mysql,q,1)).then(function(resbid) {   
				req.body.placebid = resbid[0].insertId;
				if(maxuid > 0)
				{
					req.body.bid = maxbid.id;
					req.body.buid = maxbid.user_id;
					req.body.amt = parseFloat(maxbid.amt,2)+parseFloat(results[1][0][0]['shipping_price'],2);
				} 
				req.session.placedbid = true;
				req.session.placedbidamount = req.body.wsprice;
				delete customerio;
				customerio = require('../module/customerio');
				customerio.uid = req.session.userid;
				customerio.inits();			
				customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});			
				customerio.sendEmail({event:'bid_submitted',content:{user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice}});         
				bids.updateBid(req,config.mysql,q);
				req.session.bidcountmonth = parseInt(req.session.bidcountmonth)+1;   
				req.session.bidcountyear = parseInt(req.session.bidcountyear)+1;
				res.writeHead(302, {
					'Location': '/product/view/'+req.param('id')
				});
				res.end();return false;    
			});		
		}
		else
		{
			q.all(bids.placeBid(req,config.mysql,q,1)).then(function(resbid) {  
				req.body.placebid = resbid[0].insertId; 
				delete customerio;
				customerio = require('../module/customerio');
				
				customerio.uid = req.session.userid;
				customerio.inits();
				req.session.placedbid = true;
				req.session.placedbidamount = req.body.wsprice;
				customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});
				
				customerio.sendEmail({event:'bid_submitted',content:{user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice}});
				req.session.bidcountmonth = parseInt(req.session.bidcountmonth)+1;   
				req.session.bidcountyear = parseInt(req.session.bidcountyear)+1;
				res.writeHead(302, {
					'Location': '/product/view/'+req.param('id')
				});
				res.end();return false;
			});  
		}  
	});
});

app.get(['/remove/','/remove/:id'], function(req, res){
	$arr.error = '';
	common.checkLogin(req,res,0);
	req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
	q.all(products.projectDetails(req,config.mysql,q,['user_id'],req.body.id)).then(function(results){
	if(req.session.userid ==  results[0][0]['user_id']) {
		products.removeProject(req,config.mysql,q,req.body.id);
	} 
	res.writeHead(302, {
		'Location': '/product/my'
	});	
	res.end();return false;    
    });
});

module.exports = app;