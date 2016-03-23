/*============================================================================*\
|| ########################################################################## ||
|| # Auction Software Marketplace[*]version[*] Build [*]build[*]
|| # ---------------------------------------------------------------------- # ||
|| # Customer License # [*]license[*]
|| # ---------------------------------------------------------------------- # ||
|| # Copyright Â©2014â€“[*]year[*] Develop Scripts LLC. All Rights Reserved    # ||
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

var async = require('async');


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
app.post('/fileupload', function(req, res){
	req.body.file = 2;
	res.send(JSON.stringify(req.files.product_image));
	res.end();
	return false;
});
app.post(['/updateshippinginfo'], function(req, res){

	var cart = require('../module/cart');
	var dashboard = require('../module/dashboard');
	message = require('../module/message');
	$arr.bid = req.param('bid');	
	var dat = require('date-util');
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
					q.all([dashboard.emailshipdetails(req,config.mysql,q)]).then(function(results5){

						req.body.first_name= results5[0][0][0].first_name;
                	    req.body.last_name=results5[0][0][0].last_name;
                  	 	req.body.toemail = req.body.email= results5[0][0][0].email;
                   		req.body.tophone =  results5[0][0][0].phone;
                   		req.body.toid = results5[0][0][0].user_id;
                   		req.body.pid = results5[0][0][0].project_id;
                   		req.body.r_id = Date.parse(new Date())/1000;
                   		req.body.subject = 'Track Your Product('+results5[0][0][0].title+')';
                   		req.body.message = results5[0][0][0].title+'  has been dispatched';
                   		req.body.phmessage = results5[0][0][0].title+'  has been dispatched';
                  		message.addmessages(req,config.mysql,q);

					});
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
	q.all([products.save(req,res,config.mysql,q),products.checkmailnotify(req,config.mysql,q,2),products.checksmsnotify(req,config.mysql,q,2)]).then(function(results){ 
		localm	= require('../module/localmail');
		

		console.log(results[1][0]);
		if(results[1][0].length > 0){

		    if(global.emailcio.status == 'yes'){

		       customerio = require('../module/customerio');
	  		   customerio.uid = req.session.userid;
	           customerio.inits();           
	           customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});            
	           customerio.sendEmail({event:'project_posted',content:{siteurl:config.url,user:req.session.first_name+' '+req.session.last_name,name: req.body.title,url : config.url+'/product/view/'+results[0].insertId}});

		       		
		   	}

		    else if(global.emaillocal.status == 'yes'){
		          

					q.all([localm.mailtemps(req,config.mysql,q,'project_posted')]).then(function(results2){

					if(results2){	

						var template = results2[0][0][0].template;
						var subject = results2[0][0][0].subject;
						
						template = template.replace('{{event.sitename}}' , "Auction Software.com");
						template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
						template = template.replace('{{event.name}}' ,  req.body.title);
						template = template.replace('{{event.url}}' , config.url+'/product/view/'+results[0].insertId);

						//console.log(template);



						localm.sendmail(template,subject,req.session.email);
					}

					else{

						console.log('No template named project_posted');
					}


						
					});

			}

			else{ console.log('No Mail Delivery method is selected'); }

		}
		
		else{ console.log('Email method is not Selected for product posting'); }


		if(results[2][0].length > 0){



			if(global.smstwo.status == 'yes'){

				twillio	= require('../module/twillio');

				q.all([twillio.smstemps(req,config.mysql,q,'project_posted')]).then(function(results3){

				if(results3){

					var template = results3[0][0][0].template;
										
					template = template.replace('{{event.sitename}}', "Auction Software.com");
                    template = template.replace('{{event.user}}', req.session.first_name + ' ' + req.session.last_name);
                    template = template.replace('{{event.name}}', req.body.title);
                    template = template.replace('{{event.url}}', config.url + '/product/view/' + req.body.p_id);

					
					//console.log(template);
					twillio.sendsms(template,req.session.phone);

				}
				else{

					console.log('No template name project_posted')
				}

				});

			}
		}
		else{ console.log('SMS method not selected for project_posted') }

		
		res.writeHead(302, {
			'Location': '/product/my'
		});
		res.end();return false;
	});
});

app.get(['/post','/post/:sid'], function(req, res){
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
    $arr.sid = (typeof(req.param('sid')) === 'undefined') ? 0 : req.param('sid');
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

	var adwords = require('../module/adwords');
	q.all([user.userInfo(req,config.mysql,q,req.session.userid,['paypal_address','zip','country','state','city']),common.locations(req,config.mysql,q),adwords.show_ads(req,config.mysql,q,'Sell an Item')]).then(function(results)
	{  
		$arr.user = results[0][0][0];
		$arr.user.zip = (results[0][0][0].zip == null) ? '' : results[0][0][0].zip;
		$arr.user.state = (results[0][0][0].state == null) ? '' : results[0][0][0].state;
		$arr.user.country = (results[0][0][0].country == null) ? '' : results[0][0][0].country;
		$arr.user.city = (results[0][0][0].city == null) ? '' : results[0][0][0].city;
		$arr['adwords'] = results[2][0]
		var dateFormat = require('dateformat');
		$arr.datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		$arr.externalcss = ['datePicker'];
		$arr.externaljs = ['jquery.datePicker'];
		$arr['fee'] = global.general.feature_listing_fee;
		$arr['home_page_fee'] = global.general.home_page_listing_fee;
		$arr.locations=results[1][0];
		$arr.page_name = 'Sell an Item';
		$arr['pid'] = common.randomNumber(5);
		common.checkLogin(req,res,0);
		$arr.error = '';
		products.post(req, res, $arr);
	}).fail(function(err){
		console.log(err.stack);
		throw err;
	}).done();
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

app.get(['/view/','/view/:id','/view/:id/:title','/bid/:pid','/buynow/:sid','/view/:id/:error'], function(req, res){

	
	
	Recaptcha = require('recaptcha').Recaptcha; 
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY  = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
    PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';
         

	var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
	$arr.captchahtml = recaptcha.toHTML();

  $arr.error = '';
  req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
  req.body.id = (typeof(req.param('pid')) !== 'undefined') ? req.param('pid') : req.body.id;
  req.body.id = (typeof(req.param('sid')) !== 'undefined') ? req.param('sid') : req.body.id;
	$arr.error = (typeof(req.param('error')) !== 'undefined') ? 1 : 0;

  $arr['externaljs'] = ['owl.carousel'];
  $arr['externalcss'] = ['owl.carousel','owl.theme','home_1'];
  $arr['bidshow'] = (typeof(req.param('pid')) !== 'undefined') ? true : false;
  $arr['buyshow'] = (typeof(req.param('sid')) !== 'undefined') ? true : false;
  q.all([products.productDetail(req,config.mysql,q),products.getAllCats(req,config.mysql,q),products.checkblocked(req,config.mysql,q)]).then(function(results){ 
      bids = require('../module/bid');
      var dateFormat = require('dateformat');
      var date = require('date-utils');
      datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
      var catnames = [];
      var cat_nos = 0;
      var cid = 0;
      var limits = 2;
      prdt = results[0][0][0];
	 // console.log(results[0][0][0]);
	 if(results[2][0].length > 0){
	 	$arr['blocked'] = 1;
	 }
	 else{
	 	$arr['blocked'] = 0;
	 }
		for(var j = 0;j< results[1][0].length; j++ ){

	  		if(prdt.category_id == results[1][0][j].id){
	  			
		  		catnames.push( results[1][0][j].name );
		  		
		  		if(results[1][0][j].parent_id != 0){
		  			cid = results[1][0][j].parent_id;

		  			for(var ij = 1;ij<limits;ij++ ){
		  				console.log(ij+':'+cid+':'+limits);
 		  			    for(var k = 0;k< results[1][0].length; k++ ){
 		  			    	if(cid == results[1][0][k].id){
 		  			    		if(results[1][0][k].parent_id != 0){
 		  			    			cid = results[1][0][k].parent_id;
 		  			    			catnames.push( results[1][0][k].name );
 		  			    			limits = limits + 1;
 		  			    		}
 		  			    		else{
 		  			    			catnames.push( results[1][0][k].name );
 		  			    		}
 		  			    	}

 		  			    }
		  		    	
		  		    	
		  		    }
		  		}
		  		else{
		  			//catnames.push( results[1][0][j].id );
		  		}

		  	}
		  	
		}

		console.log(catnames);
		console.log(catnames.length);
		catnames.reverse();
		$arr['cat'] = catnames;
		$arr['catnos'] = catnames.length;
			 

	  try {
		  if (parseFloat(prdt.rprice) <= parseFloat(prdt.wprice)) {
			  $arr.reservemeet = true;

		  }
	  }catch(e){
		  console.log("Error in reserve meet "+ e.stack);
	  }

      closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
	  addeddate = dateFormat(new Date(prdt['date_added']),"yyyy-mm-dd HH:MM:ss");
      if((Date.compare(closeddate,datenow) <= 0) && prdt['market_status'] == 'open')
      {
         res.writeHead(302, {
             'Location': '/product/close/'+req.body.id 
         });
         res.end();return false;
      }
	  $arr.live_status = 1;
	  if((Date.compare(addeddate,datenow) > 0) && prdt['market_status'] == 'open') {

	  	$arr.live_status = 0;
	  }
      user = require('../module/user');
	  req.body.pid = req.param('id');
      q.all([bids.bidHistory(req,config.mysql,q,0),bids.bidHistory(req,config.mysql,q,1),products.bidWinner(req,config.mysql,q),products.auctionSold(req,config.mysql,q),products.productImage(req,config.mysql,q),user.userInfo(req,config.mysql,q,prdt.user_id,['first_name','last_name']),products.otherItems(req,config.mysql,q,prdt.category_id,req.body.id),products.isinWatchlist(req,config.mysql,q),common.productQuestion(req, config.mysql, q),bids.getProxyDetails(req, $arr.config.mysql, q, 'get_highest_biduser'),bids.checkbidPlaced(req,config.mysql,q)]).then(function(results2){
		  $arr['bids'] = results2[0][0];
		  $arr['bcnt'] = results2[1][0][0]['bid'];
		  $arr['winbid'] = $arr['highbid'] = $arr['soldhim'] = $arr['placedbid'] = $arr['inwatchlist'] = $arr['user_bidded_status'] = false;
		  $arr['placedbidamount'] = 0;
		  $arr['users'] = results2[5][0][0];
		  $arr['oproject'] = products.shortDescribe(results2[6][0]);
		  $arr['proxy_bid_details'] = results2[9][0][0]
		  $arr['cat_question'] = results2[8][0];


			if(results2[10][0].length > 0){ //Get the last bid id
				if (results2[10][0][0].user_id == req.session.userid) {

					$arr['user_bidded_status'] = true;
					$arr['current_bid'] = (results2[10][0][0].proposed_amount).toFixed(2);
				}
			}


		  $arr['highbid_user_id'] = 0;

		  $arr['project'] = products.shortDescribe(results[0][0]);
		  if (results2[4][0].length > 0) {
			  $arr['images'] = results2[4][0];
		  }
		  $arr['projects'] = $arr['project'][0];
		  if (typeof(req.session.placedcontract) !== 'undefined') {
			  delete req.session.placedcontract;
			  $arr['placecontract'] = true;
		  }
		  if($arr['bcnt'] == 0){
			  	$arr['projects'].wprice = $arr['projects'].sprice;
			  	$arr.reservemeet = false;
		  }
		  //If proxy bidding set
		if(parseInt(global.general.proxy_bidding) > 0) {
			$arr['next_bid'] = (common.sumFloat(parseFloat($arr['projects'].wprice), global.general.proxy_bid_amount)).toFixed(2); //Set next bid
		}else{

			$arr['next_bid'] = (common.sumFloat(parseFloat( $arr['projects'].wprice),1)).toFixed(2);
		}
		  if (results2[0][0].length > 0 && typeof(req.session) !== 'undefined') {

			  // Maxbid is equal to current logged userid
			  if(parseInt(global.general.proxy_bidding) > 0 && results2[9][0].length > 0 && $arr['proxy_bid_details'].user_id == req.session.userid ) {
				  
				  $arr['highbid'] = true;
				  $arr['next_bid'] = (common.sumFloat($arr['proxy_bid_details'].maxamount, global.general.proxy_bid_amount)).toFixed(2);
				  $arr['current_bid'] = ($arr['proxy_bid_details'].maxamount).toFixed(2);
				  $arr['highbid_user_id'] = req.session.userid;
			  }
			  // If proxy bidding is off & curret user is highest user
			  else if (results2[0][0][0]['user_id'] == req.session.userid && parseInt(global.general.proxy_bidding) == 0) {
				  
				  $arr['highbid'] = true;
				  $arr['highbid_user_id'] = true;
				  $arr['highbid_user_id'] = req.session.userid;
				  $arr['next_bid'] = (common.sumFloat(parseFloat( $arr['projects'].wprice),1)).toFixed(2);

			  }
				// Highest userid from proxy bidding
			  if(parseInt(global.general.proxy_bidding)  > 0 && results2[9][0].length > 0){
				  
				  $arr['highbid_user_id'] =$arr['proxy_bid_details'].user_id;
			  }

		  }


			  $arr['similar_product_count'] = $arr['oproject'].length;
			 
			  if (results2[2][0].length > 0) {
				  $arr['winbid'] = true;
			  }
			  if (results2[3][0].length > 0) {
				  $arr['soldhim'] = true;
			  }

			  if (results2[7][0].length > 0) {
				  $arr['inwatchlist'] = true;
			  }
			  if (typeof(req.session.placedbid) !== 'undefined') {
				  $arr['placedbidamount'] = req.session.placedbidamount;
				  delete req.session.placedbid;
				  delete req.session.placedbidamount;
				  $arr['placedbid'] = true;
			  }

			  $arr.user_location = req.session.country;
			  $arr.user_id = req.session.userid;
			  common.tplFile('product.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req, res, $arr);

     }).fail(function(err){
		  console.log(err.stack);
		  throw err;
	  }).done();
    }).fail(function(err){
	  console.log(err.stack);
	  throw err;
  }).done();
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

         q.all([bids.selectAwardBid(req,config.mysql,q),bids.selectProxyAwardBid(req,config.mysql,q)]).then(function(results1){

            if(results1[0][0].length > 0)
           	{

				if(results1[1][0].length > 0 && results1[1][0][0].proposed_amount > results1[0][0][0].proposed_amount){
					var bid = results1[1][0][0];
				}else {
					var bid = results1[0][0][0];
				}
		      	if(pid.rprice <= bid.proposed_amount) {

					status = 'sold';				
					products.closeProjects(req,config.mysql,q,status,pid.id);
					payments = require('../module/payment');
					bids.makeAwardBid(req,config.mysql,q,results1[0][0][0].id);
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

                  if(pid.shipping_description == 'Local pick up only'){
                      req.body.local_pick = 1;
                  }else{
                      req.body.local_pick = 0;
                  }

					cart.insertBidnow(req,config.mysql,q,payments);				
					payments = require('../module/payment');
					message = require('../module/message');
	
					var dat = require('date-util');
					req.body.toid = bid.user_id;
					req.body.first_name = bid.first_name;
					req.body.last_name = bid.last_name;
					req.body.r_id = Date.parse(new Date())/1000;
					req.body.toemail = bid.email;
					req.body.tophone = bid.phone;
					req.body.fromid = pid.user_id;
					req.body.pid = pid.id;
					req.body.subject = 'Congrats! You Won the Item ';
					req.body.message = 'You Won the item.<br />Item Title : '+pid.title+'<br />Item Price : US$'+payments.amount+'<br />Item URL: '+$arr.config.url+'/product/view/'+pid.id+'<br />Contact Seller :'+pid['first_name']+'<br />Seller email address : '+pid['email'];
				  
					if(pid['phone'] != '' && pid['phone'] != null)
					{
						req.body.message += '<br />Seller Contact Phone: '+pid.phone;
					}
					message.addWithoutmessages(req,config.mysql,q);
					
					delete customerio;
 		   			localm	= require('../module/localmail');

					if(global.emailcio.status == 'yes'){

			           customerio = require('../module/customerio');
			           customerio.uid = req.body.toid;
			           customerio.inits();           
			           customerio.createCustomer({email:req.body.toemail,user:{firstName:req.body.first_name,lastName:req.body.last_name}});
					   customerio.sendEmail({event:'winner_buyer',content:{siteurl:config.url,subject:req.body.subject,fname:req.body.first_name,tname:req.body.last_name,message:req.body.message,url:$arr.config.url+'/product/view/'+pid.id,title:pid.title,price:payments.amount,unsub_url:global.unsub_url+'/'+req.body.toid}});
	       		
       	   			}

       	   			else if(global.emaillocal.status == 'yes'){
		          

						q.all([localm.mailtemps(req,config.mysql,q,'winner_buyer')]).then(function(results2){

							if(results2){

								var template = results2[0][0][0].template;
								var subject = results2[0][0][0].subject;

								template = template.replace('{{event.sitename}}' , 'AuctionSoftware.com');
								template = template.replace('{{event.subject}}' , req.body.subject);
								template = template.replace('{{event.fname}}' , req.body.first_name);
								template = template.replace('{{event.tname}}' ,  req.body.last_name);
								template = template.replace('{{event.message}}' , req.body.message);
								template = template.replace('{{event.url}}' , $arr.config.url+'/product/view/'+pid.id);
								template = template.replace('{{event.title}}' , pid.title);
								template = template.replace('{{event.price}}' , payments.amount);

								localm.sendmail(template,subject,req.body.toemail);

							}

							else{

								console.log('No template named winner_buyer');
							}

							
						});

					}

					else{ console.log('No Mail Delivery method is selected'); }

					if(global.smstwo.status == 'yes'){

						twillio	= require('../module/twillio');

						q.all([twillio.smstemps(req,config.mysql,q,'winner_buyer')]).then(function(results3){

						if(results3){

							var template = results3[0][0][0].template;
							template = template.replace('{{event.sitename}}' , 'AuctionSoftware.com');				
							template = template.replace('{{event.subject}}' , req.body.subject);
							template = template.replace('{{event.fname}}' , req.body.first_name);
							template = template.replace('{{event.tname}}' ,  req.body.last_name);
							template = template.replace('{{event.message}}' , req.body.message);
							template = template.replace('{{event.url}}' , $arr.config.url+'/product/view/'+pid.id);
							template = template.replace('{{event.title}}' , pid.title);
							template = template.replace('{{event.price}}' , payments.amount);
							
							//console.log(template);
							twillio.sendsms(template,req.body.tophone);

						}
						else{

							console.log('No template name winner_buyer')
						}

						});

					}

					
				}  
           } 
           else if(prdt['market_status'] == 'open')
           {
             status = 'closed';
             products.closeProjects(req,config.mysql,q,status,pid.id);
           } 
            cb(null);  
           }).fail(function(err){
			 console.log(err.stack);
			 throw err;
		 }).done();
          }
  };
  q.all([products.productDetails(req,config.mysql,q)]).then(function(results){
    if(results[0][0].length > 0)
    {  
      var async = require('async');
      async.each(results[0][0], addTasksToProject, function(err) {
          if (err) return console.error("Error in asynch "+err);
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

app.post(['/payment/:id'], function(req, res){

	res.writeHead(302, {
			   'Location': '/product/payment/'+req.param('id')
			});
			res.end();
			return false;

});

app.get(['/payment/:id','/payment/:id/:error'], function(req, res){
	var dashboard = require('../module/dashboard');
	req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');

	$arr.pkey = global.stripe.publishkey;
	$arr.vp_id = global.voguepay.merchantid;

	$arr.buynowid = req.body.id;
	//Enable Payments	
	
		if(global.voguepay.enabled == 'yes'){ $arr.vp = 1; }
		else{ $arr.vp = 0; }
		if(global.braintree.enabled == 'yes'){ $arr.bt = 1; }
		else{ $arr.bt = 0; }
		if(global.paypal.enabled == 'yes'){ $arr.pp = 1; }
		else{ $arr.pp = 0; }
		if(global.stripe.enabled == 'yes'){ $arr.st = 1; }
		else{ $arr.st = 0; }
		if(global.authorizenet.enabled == 'yes'){ $arr.at = 1; }
		else{ $arr.at = 0; }
	
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
			profile = require('../module/profile_settings');
			q.all([cart.checkout(req,config.mysql,q,req.session.userid),profile.shippingDetails(req,config.mysql,q,req.session.userid),products.productDetailId(req,config.mysql,q,bid[0].project_id)]).then(function(results) {
				try {
					$arr['price'] = price;
					$arr['shipping'] = {};

					if (results[0][0].length > 0) {
						$arr['shipping_address'] = results[0][0][0];
					}
					$arr['shipping_address'] = {};
					if (results[1][0].length > 0) {
						$arr['shipping'] = results[1][0][0];


					}
				}catch(e){
					console.log(e.stack);
				}
				// Adoptive Payment code

				var paypalarray = [];
				//add amount to vogue
				$arr.pro_price = price;

				admin_com_amount =  (parseFloat(config.general.commission_fee)/ 100 * price).toFixed(2); // Get admin commission

				price = (common.subFloat(price,admin_com_amount)).toFixed(2); // Modify seller amount (Orignail amt - dmin commission
				
				paypalarray.push({
					email: results[2][0][0].paypal_address,
					amount: price
				});

				paypalarray.push({
					email: config.paypal.address,
					amount: admin_com_amount
				});

				console.log(paypalarray);
				req.session.commission_fee = admin_com_amount;
				var paypaladaptive = require('../module/paypal-adaptive');
				

				paypaladaptive.paymentPaypal(req,price,req.body.id,paypalarray,templateCallback);
				function templateCallback(err,response)
				{
					//console.log('yutyutjtyjtyjtyj');
					//console.log('werwerwerwrwerwerwe')

					var braintree = require("braintree");
					var gateway = global.bgateway;

					$arr.clientToken = '';
					$arr.failedpament = '1';
					$arr.clientToken = '';
					// console.log('qwqwqwqwqwqwqw')
					if (err)
					{
						//console.log(response)
						$arr.failedpament = '0';
						//req.param('error') = err.Error;
						// console.log('errrrrrrrrrrrrererererer')
					}
					else
					{
						$arr.clientToken = response.payKey;
						$arr.paypalurltopay = (config.paypal.sandbox == 'yes') ? 'https://www.sandbox.paypal.com/webapps/adaptivepayment/flow/pay' : 'https://www.paypal.com/webapps/adaptivepayment/flow/pay'

					}

					//$arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
					gateway.clientToken.generate({}, function (err, response) {

	    				$arr.clientTokens = response.clientToken;
	    				console.log(response.clientToken);
						$arr.externalcss = ['buyer2'];
						if(err){
							$arr.paywcard = 0;
							common.tplFile('checkout_confirm_bid.tpl');
							common.headerSet(1);
							common.loadTemplateHeader(req,res,$arr);
						}
						else if(response.success == true){
							$arr.paywcard = 1;
							$arr.clientTokens = response.clientToken;
				    		console.log(response.clientToken);
							common.tplFile('checkout_confirm_bid.tpl');
							common.headerSet(1);
							common.loadTemplateHeader(req,res,$arr);
						}
						else{
							$arr.paywcard = 0;
							common.tplFile('checkout_confirm_bid.tpl');
							common.headerSet(1);
							common.loadTemplateHeader(req,res,$arr);
						}
						

					});
				}



				// Brantree Payment Code
			/*var braintrees = require('../module/braintrees');
			braintrees.generateToken(global.bgateway,templateCallback,req);
			function templateCallback(err,response)
			{
				//$arr.pro_detail = bid[0];
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
				}).fail(function(error){
					console.log(error.stack)
				}).done();
			}      */
			}).fail(function(error){
				console.log(error.stack);
				//throw error;
			}).done();
		}		
	}).fail(function(error){
		console.log(error.stack);
		//throw error;
	}).done();
});

// Insert record into checkout after winning bid for payment page
app.post(['/updateshippinginfobid'], function(req, res){
	
	var cart = require('../module/cart');
	var async = require('async');
	insertid = '';
	async.series([
			function(callback){
				cart.deleteshipbuynow(req,config.mysql,q);
				callback(null, 'one');
			},
			function(callback){
				q.all(cart.insertshipbuynow(req,config.mysql,q)).then(function(results) {
					insertid = results[0].insertId
					$finalout = {};
					$finalout['insid'] = insertid;

					res.send(JSON.stringify($finalout));
					res.end();return false;
				}).fail(function(err){
					console.log(err.stack);
					throw err;
				}).done();

			}
		],
// optional callback
		function(err, results){
			// results is now equal to ['one', 'two']
		});

});
app.get('/close/:id', function(req, res){

	var bids = require('../module/bid');	
	var dateFormat = require('dateformat');
	var date = require('date-utils');
	datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	
	q.all([bids.selectAwardBid(req,config.mysql,q),products.productDetail(req,config.mysql,q),bids.selectProxyAwardBid(req,config.mysql,q)]).then(function(results){
		prdt = results[1][0][0];
		closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
		cart = require('../module/cart.js')

		if((Date.compare(closeddate,datenow)<= 0 ) && prdt['market_status'] == 'open')
		{

			var pid = results[1][0][0];
			status = 'closed';
			if(results[0][0].length > 0) {
				if(results[2][0].length > 0 && results[2][0][0].proposed_amount > results[0][0][0].proposed_amount){
					var bid = results[2][0][0];

				}else {
					var bid = results[0][0][0];
				}
				if(pid.rprice <= bid.proposed_amount){	
					payments = require('../module/payment');
					bids.makeAwardBid(req,config.mysql,q,results[0][0][0]['id']);
					payments.transactionid = 0;
					payments.gateway = 'account';
					payments.sessionsdata = [];
					payments.sessionsdata.title = pid.title;
					payments.sessionsdata.email = pid.email;
					payments.sessionsdata.url = $arr.config.url+'/product/view/'+pid.id;

					payments.sessionsdata.userid = bid.user_id;

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
					req.body.tophone = bid.phone;
					req.body.fromid = pid.user_id;
					req.body.pid = pid.id;
					req.body.subject = 'Congrats! You Won the Item ';
					req.body.message = 'You Won the item.<br />Item Title : '+pid.title+'<br />Item Price : US$'+payments.amount+'<br />Item URL: '+$arr.config.url+'/product/view/'+pid.id+'<br />Contact Seller :'+pid['first_name']+'<br />Seller email address : '+pid['email'];
					
					if(pid['phone'] != '' && pid['phone'] != null)
					{
						req.body.message += '<br />Seller Contact Phone: '+pid.phone;
					}
					message.addWithoutmessages(req,config.mysql,q);
					
					delete customerio;
 		  
 		  			localm	= require('../module/localmail');

		 		  
				   	if(global.emailcio.status == 'yes'){

			           customerio = require('../module/customerio');
			           customerio.uid = req.body.toid;
			           
			           customerio.inits();           
			           customerio.createCustomer({email:req.body.toemail,user:{firstName:req.body.first_name,lastName:req.body.last_name}});
					   customerio.sendEmail({event:'winner_buyer',content:{siteurl:config.url,subject:req.body.subject,fname:req.body.first_name,tname:req.body.last_name,message:req.body.message,url:$arr.config.url+'/product/view/'+pid.id,title:pid.title,price:payments.amount,unsub_url: global.unsub_url+'/'+req.session.toid}});

			       		
		       	   	}

			       	else if(global.emaillocal.status == 'yes'){
				          

							q.all([localm.mailtemps(req,config.mysql,q,'winner_buyer')]).then(function(results2){

							if(results2){	

								var template = results2[0][0][0].template;
								var subject = results2[0][0][0].subject;
								template = template.replace('{{event.sitename}}' , 'AuctionSoftware.com');
								template = template.replace('{{event.subject}}' , req.body.subject);
								template = template.replace('{{event.fname}}' , req.body.first_name);
								template = template.replace('{{event.tname}}' ,  req.body.last_name);
								template = template.replace('{{event.message}}' , req.body.message);
								template = template.replace('{{event.url}}' , $arr.config.url+'/product/view/'+pid.id);
								template = template.replace('{{event.title}}' , pid.title);
								template = template.replace('{{event.price}}' , payments.amount);
								//console.log(template);
								localm.sendmail(template,subject,req.body.toemail);
							}

							else{

								console.log('No template named winner_buyer');
							}

								
							});

					}

					else{ console.log('No Mail Delivery method is selected'); }

					if(global.smstwo.status == 'yes'){

						twillio	= require('../module/twillio');

						q.all([twillio.smstemps(req,config.mysql,q,'winner_buyer')]).then(function(results3){

						if(results3){

							var template = results3[0][0][0].template;
							template = template.replace('{{event.sitename}}' , 'AuctionSoftware.com');					
							template = template.replace('{{event.subject}}' , req.body.subject);
							template = template.replace('{{event.fname}}' , req.body.first_name);
							template = template.replace('{{event.tname}}' ,  req.body.last_name);
							template = template.replace('{{event.message}}' , req.body.message);
							template = template.replace('{{event.url}}' , $arr.config.url+'/product/view/'+pid.id);
							template = template.replace('{{event.title}}' , pid.title);
							template = template.replace('{{event.price}}' , payments.amount);

							//console.log(template);
							twillio.sendsms(template,req.body.tophone);

						}
						else{

							console.log('No template name bid_submitted')
						}

						});

					}
								  
					
					status = 'sold'
				} 
			} 
			else if(prdt['market_status'] == 'open') {
				status = 'closed';
			}
			else{} 
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

	}).fail(function(err){
		console.log(err.stack);
	}).done();
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
    q.all([products.isinWatchlist(req,config.mysql,q),products.productDetail(req,config.mysql,q),products.checkmailnotify(req,config.mysql,q,4),products.checksmsnotify(req,config.mysql,q,4)]).then(function(results)
    {  
        if(results[0][0].length > 0)
        {
         data = {access:true,isadded:true}
         common.ajaxjson(res,data);   
        } 
        else
        {
        products.addWatchlist(req,config.mysql,q);
        
        delete customerio;
	    localm	= require('../module/localmail');

	  	if(results[2][0].length > 0){
		   	
		   	if(global.emailcio.status == 'yes'){

		      	customerio = require('../module/customerio');
		        customerio.uid = req.session.userid;
		        customerio.inits();           
		        customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});          
				customerio.sendEmail({event:'watchlist_added',content:{siteurl:config.url,user:req.session.first_name+' '+req.session.last_name,title: results[1][0][0].title,unsub_url:global.unsub_url+'/'+req.session.userid}});

		   		
			}

		   	else if(global.emaillocal.status == 'yes'){
		          

				q.all([localm.mailtemps(req,config.mysql,q,'watchlist_added')]).then(function(results2){

					var template = results2[0][0][0].template;
					var subject = results2[0][0][0].subject;
					template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
					template = template.replace('{{event.title}}' , results[1][0][0].title);
					//console.log(template);
					localm.sendmail(template,subject,req.session.email);

					
				});

			}

			else{ console.log('No Mail Delivery method is selected'); }
		}
		else{ console.log('Mail notification not selected'); }

		if(results[3][0].length > 0){


			if(global.smstwo.status == 'yes'){

				twillio	= require('../module/twillio');

				q.all([twillio.smstemps(req,config.mysql,q,'watchlist_added')]).then(function(results3){

				if(results3){

					var template = results3[0][0][0].template;
										
					template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
					template = template.replace('{{event.title}}' , results[1][0][0].title);
				//	console.log(template);
					twillio.sendsms(template,req.session.phone);

				}
				else{

					console.log('No template name watchlist_added')
				}

				});

			}
		}
		else{ console.log('SMS notification not selected'); }


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
		   //console.log("Clear cart res "+JSON.stringify(results[0][0]))
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

app.post('/save_dispute', function(req, res){
	dispute = require('../module/dispute');
	q.all([dispute.saveDispute(req, config.mysql, q)]).then(function (results) {
		res.send(JSON.stringify({'success': true}));
		res.end();
		return false;
	}).fail(function(err){
		console.log(err.stack);
		throw err;
	}).done();
});
 
app.get('/removecart/:id', function(req, res){
	cart = require('../module/cart');
	if(typeof(req.session.timer) === 'undefined') {
		req.session.timer = config.general.cart_timer;  
	}

	cart.removeitem(req.param('id'),req,res,config.mysql);
});

app.get('/cart/:id', function(req, res){

	console.log("************** In cart id *******************");
	var allow = common.checkPermission('allow_to_buy',req);

	if(!allow) {

		res.send(JSON.stringify({'success':true,membership_status : false}));
		res.end();
		return false;
	}
	var allow = common.checkLimitReached('monthly_buynow_limit',req);

	if(!allow) {

		res.send(JSON.stringify({'success':true,membership_status : false}));
		res.end();
		return false;

	}

	var allow = common.checkLimitReached('buynow_limit',req);
	if(!allow)
	{
		res.send(JSON.stringify({'success':true,membership_status : false}));
		res.end();
		return false;
	}

   cart = require('../module/cart');
   if(typeof(req.session.timer) === 'undefined')
   {
	   req.session.timer = $arr.config.general.cart_timer;
   }
   cart.addItem(req.param('id'),req,res,config.mysql);
});

app.get('/membership_reached', function(req, res){
	$arr['messgae'] = 'Sorry! You have reached  Limit of Product Buying.To add more products upgrade membership!';
	common.tplFile('subscription_limit_reached.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);

});

app.get('/cart/remove/:action', function(req, res){
      cart = require('../module/cart');
      if(typeof(req.session.pid) !== 'undefined') {
			/*for(i in req.session.pid) {
				cart.removeTempItem(req,config.mysql,q,req.session.pid[i],req.session.products[i]['qty_add']);
				cart.minusReduceCart(req,config.mysql,q);
				delete req.session.pid[i];
				delete req.session.products[i];
				req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
				req.session.products = req.session.products.filter(function(n){ return n != undefined });*/
		  var sess_length = req.session.pid.length;
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

	common.checkLogin(req,res,0);
	var allow = common.checkPermission('allow_to_buy',req);

	if(!allow) {

		res.writeHead(302, {
			'Location': '/product/membership_reached'
		});
		res.end();return false;
	}
	var allow = common.checkLimitReached('monthly_buynow_limit',req);

	if(!allow) {

		res.writeHead(302, {
			'Location': '/product/membership_reached'
		});
		res.end();return false;

	}

	var allow = common.checkLimitReached('buynow_limit',req);
	if(!allow)
	{
		res.writeHead(302, {
			'Location': '/product/membership_reached'
		});
		res.end();return false;
	}

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


			}//console.log("Product array is "+JSON.stringify(req.session.products));
			common.tplFile('checkout.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
		}).fail(function(err){
		   console.log(err.stack);
		   throw err;
	   }).done();
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


				// start Check membership
				req.session.buynowcountyear = parseInt(req.session.buynowcountyear) - parseInt(req.session.products[m]['qty_add']);
				req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) - parseInt(req.session.products[m]['qty_add']);

				req.session.buynowcountyear = parseInt(req.session.buynowcountyear) + parseInt(req.body['pid['+prdt['id']+']']);
				req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) + parseInt(req.body['pid['+prdt['id']+']']);

				var allow = common.checkLimitReached('monthly_buynow_limit',req);

				if(!allow) {

					req.session.buynowcountyear = parseInt(req.session.buynowcountyear) - parseInt(req.body['pid['+prdt['id']+']']);
					req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) - parseInt(req.body['pid['+prdt['id']+']']);

					req.session.buynowcountyear = parseInt(req.session.buynowcountyear) + parseInt(req.session.products[m]['qty_add']);
					req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) + parseInt(req.session.products[m]['qty_add']);
					$arr['messgae'] = 'Sorry! You have reached  Limit of Product Buying.To add more products upgrade membership!';
					common.tplFile('subscription_limit_reached.tpl');
					common.headerSet(1);
					common.loadTemplateHeader(req,res,$arr);
					return false;
				}
				var allow = common.checkLimitReached('buynow_limit',req);
				if(!allow)
				{
					req.session.buynowcountyear = parseInt(req.session.buynowcountyear) - parseInt(req.body['pid['+prdt['id']+']']);
					req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) - parseInt(req.body['pid['+prdt['id']+']']);

					req.session.buynowcountyear = parseInt(req.session.buynowcountyear) + parseInt(req.session.products[m]['qty_add']);
					req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) + parseInt(req.session.products[m]['qty_add']);
					$arr['messgae'] = 'Sorry! You have reached  Limit of Product Buying.To add more products upgrade membership!';
					common.tplFile('subscription_limit_reached.tpl');
					common.headerSet(1);
					common.loadTemplateHeader(req,res,$arr);
					return false;
				}

				// End Check membership
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
		//console.log(resu);
	});  
});


app.post(['/bidpaymentnoshiping/:id','/bidpaymentnoshiping/:id/:error'], function(req, res){
	var dashboard = require('../module/dashboard');
	var product = require('../module/products');
	req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
	$arr['error'] = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');

	//dashboard.deleteBuynowRecord(req,config.mysql,q)
	q.all([dashboard.getBuynowRecord(req,config.mysql,q)]).then(function(results){

		bid = results[0][0];
		q.all([product.productDetailId(req,config.mysql,q,bid[0].project_id)]).then(function(data2){
			pid = data2[0][0][0];
			price=req.body.price;
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
				cart = require('../module/cart');
				q.all([cart.insertCartDetailslocal(req,config.mysql,q,0,price)]).then(function(results) {
					cart_id = results[0][0].insertId;
					cart.paidBuynowlocal(req,config.mysql,q,cart_id,config.general.escrow);
					console.log("sucess");
					/*customerio = require('../module/customerio');

					customerio.uid = pid['user_id'];
					customerio.inits();
					customerio.createCustomer({email:pid['email'],user:{firstName:pid['first_name'],lastName:pid['last_name']}});

					customerio.sendEmail({event:'item_sold',content:{user:pid['first_name']+' '+pid['last_name'],bname:req.param('f_name'),bphone:req.param('phone'),bemail:req.param('email'),qty:1,price: 1*(pid['bprice']+pid['shipping_price']),title: pid['title'],url:global.url+'/product/view/'+pid['id']}});
*/
					res.writeHead(302, {
						'Location': '/dashboard/mywon'
					});
					res.end();return false;
				})

			}
		})
	})
});

app.post(['/bidpayment/:id','/bidpayment/:id/:error'], function(req, res){
     var dashboard = require('../module/dashboard');
     var product = require('../module/products');
     req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
     $arr['error'] = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
     console.log("Working");
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
				 if(req.body.payment_method_nonce != '')
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
				 else if(req.body.paymentmethod == 'cc' || req.param('paymentmethod') == 'paypal')
				 {
				 	console.log("Working2");
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
                 	console.log("Working3"+err);
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
							console.log('**qqq**********'+resp.creditCard.token+'***************');
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
							console.log('************'+req.body.token+'***************');
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
							paymentMethodNonce: req.body.payment_method_nonce,
							options: {					
								submitForSettlement: true
							}};
						} 

						var ml = global.bgateway.transaction.sale(pay, function (err, result) {	
							if(result.success) {
								if(result.transaction.status) {
									
									cart = require('../module/cart');
									// cart.insertCartDetails : Insert Into Checkout Table
									q.all([cart.insertCartDetails(req,config.mysql,q,result.transaction.id,price)]).then(function(results) {
										cart_id = results[0][0].insertId;
										
										cart.paidBuynow(req,config.mysql,q,cart_id,config.general.escrow);//update Paid status as paid in buynow
										req.body.trans_gateway = "Braintree";
										cart.paidBid(req,config.mysql,q,pid['id'],result.transaction.id);// Update paid status as paid in Invoice
										

										delete customerio;
									    localm	= require('../module/localmail');

									  
										if(global.emailcio.status == 'yes'){

									    customerio = require('../module/customerio');
									    customerio.uid = pid['user_id'];
									   
										customerio.inits();           
									   	customerio.createCustomer({email:pid['email'],user:{firstName:pid['first_name'],lastName:pid['last_name']}});        
										customerio.sendEmail({event:'item_sold',content:{siteurl:config.url,user:pid['first_name']+' '+pid['last_name'],bname:req.param('f_name'),bphone:req.param('phone'),bemail:req.param('email'),qty:1,price: price,title: pid['title'],url:global.url+'/product/view/'+pid['id'],unsub_url:global.unsub_url+'/'+pid['user_id']}});

											
									   	}

										else if(global.emaillocal.status == 'yes'){
									      

											q.all([localm.mailtemps(req,config.mysql,q,'item_sold')]).then(function(results2){

											if(results2){

												var template = results2[0][0][0].template;
												var subject = results2[0][0][0].subject;
												
												template = template.replace('{{event.user}}' , pid['first_name']+' '+pid['last_name']);
												template = template.replace('{{event.bname}}' , req.param('f_name'));
												template = template.replace('{{event.bphone}}' ,  req.param('phone'));
												template = template.replace('{{event.bemail}}' , req.param('email'));
												template = template.replace('{{event.qty}}' , 1);
												template = template.replace('{{event.price}}' , price);
												template = template.replace('{{event.title}}' , pid['title']);
												template = template.replace('{{event.url}}' , global.url+'/product/view/'+pid['id']);
												//console.log(template);
												localm.sendmail(template,subject,pid['email']);

											}

											else{

												console.log("No template named item_sold");
											}

												
											});

										}
										
										else{ console.log('No Mail Delivery method is selected'); }

										console.log('*************************************************');
										if(global.smstwo.status == 'yes'){

											twillio	= require('../module/twillio');

											q.all([twillio.smstemps(req,config.mysql,q,'item_sold')]).then(function(results3){

											if(results3){

												var template = results3[0][0][0].template;
																	
												template = template.replace('{{event.user}}' , pid['first_name']+' '+pid['last_name']);
												template = template.replace('{{event.bname}}' , req.param('f_name'));
												template = template.replace('{{event.bphone}}' ,  req.param('phone'));
												template = template.replace('{{event.bemail}}' , req.param('email'));
												template = template.replace('{{event.qty}}' , 1);
												template = template.replace('{{event.price}}' , 1*(pid['bprice']+pid['shipping_price']));
												template = template.replace('{{event.title}}' , pid['title']);
												template = template.replace('{{event.url}}' , global.url+'/product/view/'+pid['id']);
												//console.log(template);
												twillio.sendsms(template,pid['phone']);

											}

											else{

												console.log('No template name item_sold')
											}


											});



										}
										
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
									'Location': '/product/payment/'+req.body.id+'/'+$arr['error']
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

app.post('/checkout/paylocal', function(req, res){
	req.session.cartdetails = req.body;
	price = req.body.total_amount;
	cart = require('../module/cart');
	q.all([cart.insertCartDetailslocal(req,config.mysql,q,0,price)]).then(function(results) {
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
				req.body.shipppping = req.session.products[m_add]['getshiping'];
				cart.insertBuynowlocal(req,config.mysql,q,m_add,cart_id,config.general.escrow);
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
					req.body.trans_gateway = 'Paypal';
					cart.updateSold(req,config.mysql,q,prd[i]['id'],req.session.products[m_add]['saled']);
					cart.insertBuyItemInvoices(req,config.mysql,q,m_add,cart_id,0);
				}
				if((available - req.session.products[m_add]['saled']) <= 0 && prd[i]['market_status'] == 'open')
				{
					cart.closeProduct(req,config.mysql,q,prd[i]['id']);
				}

				cart.cartPaidPrdt(req,config.mysql,q,prd[i]['id'],req.session.temp_cart_id,req.session.products[m_add]['qty_add']);



				if(i == prd.length - 1){

					try {
						delete req.session.pid;
						delete req.session.products;
						if (typeof(req.session.pid) !== 'undefined') {
							req.session.pid = req.session.pid.filter(function (n) {
								return n != undefined
							});
							req.session.products = req.session.products.filter(function (n) {
								return n != undefined
							});
							if (req.session.pid.length == 0) {
								delete req.session.temp_cart_id;
								delete req.session.temp_time_id;
								delete req.session.pid;
								delete req.session.products;
								delete req.session.timer;
							}
						}
						else {
							delete req.session.temp_cart_id;
							delete req.session.temp_time_id;
							delete req.session.timer;
						}
					}catch(e){
						console.log(e.stack);
					}

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
					}).fail(function(error){
						console.log(error.stack);
						throw error;
					}).fail();

				}
			}
		}).fail(function(error){
			console.log(error.stack);
			throw error;
		}).done();
	}).fail(function(error){
		console.log(error.stack);
		throw error;
	}).done();
});


//Braintree payment for buynow
/*app.post('/checkout/paid', function(req, res){ 
	
	console.log(req.body);
});*/


app.post('/checkout/pay', function(req, res){ 
	
     req.session.cartdetails = req.body;
     var brain_cust_id = global.bcustomer_prefix+req.session.userid;
     price = 0;
     for(i in req.session.products)
     {
          price =(parseFloat(price) + req.session.products[i].qty_add * common.sumFloat(req.session.products[i].shipping_price,req.session.products[i].bprice)).toFixed(2);
		 console.log("shipping price "+req.session.products[i].shipping_price);
     }
     
	//price = req.body.total_amount;
	console.log('********** nounce1 ********');
		console.log(req.body.payment_method_nonce);
	console.log('********** nounce ********');
	
     if(req.body.payment_method_nonce != '')
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
     else if(req.body.paymentmethod == 'cc' || req.body.paymentmethod == 'paypal')
     {
     	
       payProcess(1,'');
     } 
     else
     {
       creditcard = require('../module/creditcard');
       q.all([creditcard.PickPayments(req,$arr.config.mysql,q,req.body.paymentmethod)]).then(function(resu)
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
     	
     	console.log('********** nounce2 ********');
		console.log(req.body.payment_method_nonce);
		console.log('********** nounce2 ********');
			
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
         	console.log('********************');
         	console.log(req.body.payment_method_nonce);
         	console.log('********************');
            var pay = {
			amount: price,
			paymentMethodNonce: req.body.payment_method_nonce,
			options: {
				  submitForSettlement: true
			}};
         } 

		console.log(global.bgateway.transaction)

		var ml = global.bgateway.transaction.sale(pay , function (err, result) {
			if(result.success) {

				  if(result.transaction.status)
				  {
					  req.body.trans_id = result.transaction.id;
					 
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
							prefund = (req.session.products[m_add]['qty_add']*(parseFloat(req.session.products[m_add]['bprice'])+parseFloat(req.session.products[m_add]['shipping_price']))).toFixed(2);
							available = 0;
							req.session.products[m_add]['saled'] = 0;
						}
						else {
							var available = prd[i].qty-prd[i].sold;

							
							var prefund = 0.00;
							if(available <= 0) {
								prefund = (req.session.products[m_add]['qty_add']*(parseFloat(req.session.products[m_add]['bprice'])+ parseFloat(req.session.products[m_add]['shipping_price'])).toFixed(2)).toFixed(2);
								req.session.products[m_add]['saled'] = 0;
							}
							else if(available < req.session.products[m_add]['qty_add']) {
								var ref_prd = req.session.products[m_add]['qty_add']-available;
								prefund = ref_prd*(parseFloat(req.session.products[m_add]['bprice'])+parseFloat(req.session.products[m_add]['shipping_price']));
								req.session.products[m_add]['saled'] = available;
							}
							else {
								req.session.products[m_add]['saled'] = req.session.products[m_add]['qty_add'];
							}
						}
						/*if(prd[i].shipping_description == 'Local pick up only'){
							req.body.local_pick = 1;
						}else{
							req.body.local_pick = 0;
						}*/
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
							req.body.tophone = req.session.phone;
							req.body.fromid = req.session.products[m_add].user_id;
							req.body.pid = req.session.products[m_add].id;
							req.body.subject = 'Regards Buying '+req.session.products[m_add]['saled']+' qty of '+req.session.products[m_add]['title'];
							req.body.message = 'Thank You for buying the item with us.Any Queries Please email us.';
							req.body.phmessage = 'Thank You for buying the item with us.Any Queries Please email us.';
							message.addmessages(req,config.mysql,q);
							cart.updateSold(req,config.mysql,q,prd[i]['id'],req.session.products[m_add]['saled']);
							req.body.trans_gateway = "Braintree";
							cart.insertBuyItemInvoices(req,config.mysql,q,m_add,cart_id,result.transaction.id);
							
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
									   	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!f');
											 res.writeHead(302, {
											   'Location': '/product/checkout/paid/?id='+cart_id
											 });
											 res.end();return false;
										}
								  }   
							  }).fail(function(err){
								 console.log(err.stack);
								 throw err;
							 }).done();
						  } 								  
						}  
					}
					});	
				}).fail(function(error){
						 console.log(error.stack);
						 throw error;
					 }).done();
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

// ******************** Adoptive Payment for buynow ************************

app.post(['/checkout/paypalpayment/','/checkout/paypalpayment/:error'], function(req, res) {
	price = 0;
	localprice = 0;
	witsipng = 0;
	/*for(i in req.session.products)
	{
		price =(parseFloat(price) + req.session.products[i].qty_add * common.sumFloat(req.session.products[i].shipping_price,req.session.products[i].bprice)).toFixed(2);
		console.log("shipping price "+req.session.products[i].shipping_price);
	}*/
	var paypalarray = [];
	var checkoutdetails = '';
	var admin_paid_amount = 0;

	try {
		for (i in req.session.products) {
			pricead = 0;
			var admin_com_amount = 0;
			//price =(parseFloat(price) + req.session.products[i].qty_add * common.sumFloat(req.session.products[i].shipping_price,req.session.products[i].bprice)).toFixed(2);
			price = req.session.products[i].qty_add * common.sumFloat(req.session.products[i].shipping_price,req.session.products[i].bprice).toFixed(2);;

			admin_com_amount =  (parseFloat(config.general.commission_fee)/ 100 * price).toFixed(2); // Get admin commission

			admin_paid_amount = common.sumFloat( admin_paid_amount,admin_com_amount); // Add admin commission  to admin account

			price = (common.subFloat(price,admin_com_amount)).toFixed(2); // Modify seller amount (Orignail amt - dmin commission

			pricead = 1;

			checkoutdetails += req.session.products[i].id + '-' + req.session.products[i].qty_add + '-' + pricead + '***';
			if (pricead > 0) {
				var obj = paypalarray.filter(function (obj) {
					return obj.email === req.session.products[i].paypal_address;
				})[0];
				if (typeof(obj) === 'undefined') {

					paypalarray.push({
						email: req.session.products[i].paypal_address,
						amount: price
					});
				}
				else {
					for (var j in paypalarray) {
						console.log(paypalarray[j].email)
						if (paypalarray[j].email == req.session.products[i].paypal_address) {
							paypalarray[j].amount = common.sumFloat(paypalarray[j].amount, price);
						}
					}
				}

				// For admin

			}
		}
	}catch(e){
		console.log(e.stack);
		throw err;
	}

	// Add total admin commission amount to admin account

	paypalarray.push({
		email: config.paypal.address,
		amount: admin_paid_amount
	});


	console.log("Paypal array is  "+JSON.stringify(paypalarray));
	cart = require('../module/cart');
	q.all([cart.insertbuynowCartDetails(req, config.mysql, q, '', price)]).then(function (results) {
		cart_id = results[0][0].insertId;
		cart.cartproductdetails(req, config.mysql, q, cart_id, checkoutdetails);
		req.session.cart_id = cart_id;
		var paypaladaptive = require('../module/paypal-adaptive');
		paypaladaptive.bulkpaymentPaypal(req, paypalarray, cart_id, templateCallbackn);
		function templateCallbackn(err, response) {
			$arr.clientToken = '';
			$arr.failedpament = '1';
			$arr.clientToken = '';
			if (err) {
				$arr.failedpament = '0';
			}
			else {

				$arr.clientToken = response.payKey;
				$arr.paypalurltopay = (config.paypal.sandbox == 'yes') ? 'https://www.sandbox.paypal.com/webapps/adaptivepayment/flow/pay' : 'https://www.paypal.com/webapps/adaptivepayment/flow/pay'
				/*console.log(response.payKey);
				console.log(config.paypal.sandbox);
				console.log($arr.paypalurltopay);*/
			}
			//$arr.externalcss = ['buyer2'];
			common.tplFile('paypal_checkout_confirm.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req, res, $arr);
		}
	}).fail(function (error) {
		console.log("Error : " + error.stack);
		throw error;
	}).done();
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
app.post(['/checkout/confirm/:error'], function(req, res){

	res.writeHead(302, {
			   'Location': '/product/checkout/confirm/'+req.param('error')
			});
			res.end();
			return false;

});


app.get(['/checkout/confirm','/checkout/confirm/:error'], function(req, res){

	var braintree = require("braintree");
	var gateway = global.bgateway;
	$arr.pkey = global.stripe.publishkey;
	$arr.vp_id = global.voguepay.merchantid;

    /*braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: "svzgk2s8q2pj6355",
      publicKey: "nj8q2sdkb5dtmhv9",
      privateKey: "aa4592c37c29993f50922549fa4f29d1"

    });*/
//Enable Payments	
	
if(global.voguepay.enabled == 'yes'){ $arr.vp = 1; }
else{ $arr.vp = 0; }
if(global.braintree.enabled == 'yes'){ $arr.bt = 1; }
else{ $arr.bt = 0; }
if(global.paypal.enabled == 'yes'){ $arr.pp = 1; }
else{ $arr.pp = 0; }
if(global.stripe.enabled == 'yes'){ $arr.st = 1; }
else{ $arr.st = 0; }
if(global.authorizenet.enabled == 'yes'){ $arr.at = 1; }
else{ $arr.at = 0; }

	
	try {
		var price1 = 0;
		$arr.pro_price = 0;
		$arr.localpickup_price = 0;
		for (i in req.session.products) {

			price1 = (parseFloat(price1) + req.session.products[i].qty_add * common.sumFloat(req.session.products[i].shipping_price, req.session.products[i].bprice)).toFixed(2);
			$arr.pro_price = price1;
		}

	}catch(e){
		console.log("Error in getting price "+ e.stack);
	}

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
    q.all([profile.shippingDetails(req,config.mysql,q,req.session.userid),common.getLocations(req,config.mysql,q)]).then(function(results){
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
	//console.log( braintrees.generateToken(global.bgateway, templateCallback, req))
	console.log('dasdasdasda');

    gateway.clientToken.generate({}, function (err, response) {

    	

    	$arr.country = results[1][0];
		$arr.externalcss = ['buyer2'];
		if(err){
			$arr.paywcard = 0;
			common.tplFile('checkout_confirm.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
		}
		else if(response.success == true){
			console.log('dasdasdasda2');
			$arr.paywcard = 1;
			$arr.clientTokens = response.clientToken;
    		console.log(response.clientToken);
			common.tplFile('checkout_confirm.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
		}
		else{
			$arr.paywcard = 0;
			common.tplFile('checkout_confirm.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
		}
		
    }); 

    

			
         /* var braintrees = require('../module/braintrees');
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
          }  */
    }).fail(function(error){
		console.log(error.stack);
		throw(error);
	}).done();
});

/*app.post('/confirm/', function(req, res){
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
 		  		localm	= require('../module/localmail');

 		  		q.all([bids.allbidders(req,config.mysql,q,prdt.id,req.session.userid)]).then(function(bidders){
 		  			
 		  			
 		  			var tot_bidders = bidders[0][0].length;
 		  			console.log('asdasd1111asd'+tot_bidders);
 		  				message = require('../module/message');
 		  				var dat = require('date-util');
 		  			//	message.addmessages(req,config.mysql,q);	
	 		  			for(var k=0;k<tot_bidders;k++ ){
	 		  				
	 		  			console.log(bidders[0][0][k].email);
	 		  			req.body.first_name= bidders[0][0][k].first_name;
                	    req.body.last_name=bidders[0][0][k].last_name;
                  	 	req.body.toemail = req.body.email= bidders[0][0][k].email;
                   		req.body.tophone =  bidders[0][0][k].phone;
                   		req.body.toid = bidders[0][0][k].user_id;
                   		req.body.pid = bidders[0][0][k].project_id;
                   		req.body.r_id = Date.parse(new Date())/1000;
                   		req.body.subject = 'You are outbid on Product '+req.body.title;
                   		req.body.message = 'Someone has bidded higher than your bid amount on 'req.body.title+'. Please <a href="'+$arr.config.spath+'product/view/'+req.body.pid+'">click here</a>';
                   		req.body.phmessage = req.body.title+' has been bidded with higher amount by someone.';
                  		message.addmessages(req,config.mysql,q);
	 		  				
	 		  				
	 		  			}

 		  			

 		  		});


 		   		if(global.emailcio.status == 'yes'){

		           customerio = require('../module/customerio');
		           customerio.uid = req.session.userid;
		           
		           customerio.inits();           
		           customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});            
		           customerio.sendEmail({event:'bid_submitted',content:{siteurl:config.url,user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice}});

		       		
	       	   	}

	       	    else if(global.emaillocal.status == 'yes'){
		          

					q.all([localm.mailtemps(req,config.mysql,q,'bid_submitted')]).then(function(results2){

					if(results2){

						var template = results2[0][0][0].template;
						var subject = results2[0][0][0].subject;
						
						template = template.replace('{{event.sitename}}' , "Auction Software.com");
						template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
						template = template.replace('{{event.title}}' ,  prdt.title);
						template = template.replace('{{event.amount}}' , req.body.wsprice);
						console.log(template);
						localm.sendmail(template,subject,req.session.email);

					}

					else{

						console.log('No template name bid_submitted')
					}

						
					});

				}


				else{ console.log('No Mail Delivery method is selected'); }

				if(global.smstwo.status == 'yes'){

					twillio	= require('../module/twillio');

					q.all([twillio.smstemps(req,config.mysql,q,'bid_submitted')]).then(function(results3){

					if(results3){

						var template = results3[0][0][0].template;
											
						template = template.replace('{{event.sitename}}' , "Auction Software.com");
						template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
						template = template.replace('{{event.title}}' ,  prdt.title);
						template = template.replace('{{event.amount}}' , req.body.wsprice);
						console.log(template);
						twillio.sendsms(template,req.session.phone);

					}

					else{

						console.log('No template name bid_submitted')
					}


					});



				}

			

           req.body.wssprice = parseFloat(req.body.wsprice,2)+parseFloat(results[1][0][0]['shipping_price'],2);        
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
		  	localm	= require('../module/localmail');

		  	q.all([bids.allbidders(req,config.mysql,q,prdt.id,req.session.userid)]).then(function(bidders){
 		  			
 		  			
 		  			var tot_bidders = bidders[0][0].length;
 		  			console.log('asdasd1111asd'+tot_bidders);
 		  				message = require('../module/message');
 		  				var dat = require('date-util');
 		  			//	message.addmessages(req,config.mysql,q);	
	 		  			for(var k=0;k<tot_bidders;k++ ){
	 		  				
	 		  				console.log(bidders[0][0][k].email);
	 		  			req.body.first_name= bidders[0][0][k].first_name;
                	    req.body.last_name=bidders[0][0][k].last_name;
                  	 	req.body.toemail = req.body.email= bidders[0][0][k].email;
                   		req.body.tophone =  bidders[0][0][k].phone;
                   		req.body.toid = bidders[0][0][k].user_id;
                   		req.body.pid = bidders[0][0][k].project_id;
                   		req.body.r_id = Date.parse(new Date())/1000;
                   		req.body.subject = 'Someone Bidded on product, you bid('+req.body.title+')';
                   		req.body.message = req.body.title+' has been bidded by someone. Please <a href="'+$arr.config.spath+'product/view/'+req.body.pid+'">click here</a>';
                   		req.body.phmessage = req.body.title+' has been bidded by someone.';
                  		 message.addmessages(req,config.mysql,q);
	 		  				
	 		  				
	 		  			}

 		  			

 		  		});
	
		   	if(global.emailcio.status == 'yes'){

	            customerio = require('../module/customerio');
    		    customerio.uid = req.session.userid;
    		    req.session.placedbid = true;
	  			req.session.placedbidamount = req.body.wsprice;

	            
		           
		           customerio.inits();           
		           customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});            
		           customerio.sendEmail({event:'bid_submitted',content:{siteurl:config.url,user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice}});

	       		
       	   	}

       	    else if(global.emaillocal.status == 'yes'){
	          

				q.all([localm.mailtemps(req,config.mysql,q,'bid_submitted')]).then(function(results2){

				if(results2){

					var template = results2[0][0][0].template;
					var subject = results2[0][0][0].subject;
					
					template = template.replace('{{event.sitename}}' , "Auction Software.com");
					template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
					template = template.replace('{{event.title}}' ,  prdt.title);
					template = template.replace('{{event.amount}}' , req.body.wsprice);
					console.log(template);
					localm.sendmail(template,subject,req.session.email);
				}
				else{

					console.log('No Template named bid_submitted');
				}

					
				});

			}

			else{ console.log('No Mail Delivery method is selected'); }

			if(global.smstwo.status == 'yes'){

					twillio	= require('../module/twillio');

					q.all([twillio.smstemps(req,config.mysql,q,'bid_submitted')]).then(function(results3){

					if(results3){

						var template = results3[0][0][0].template;
											
						template = template.replace('{{event.sitename}}' , "Auction Software.com");
						template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
						template = template.replace('{{event.title}}' ,  prdt.title);
						template = template.replace('{{event.amount}}' , req.body.wsprice);
						console.log(template);
						twillio.sendsms(template,req.session.phone);

					}

					else{

						console.log('No template name bid_submitted')
					}


					});



			}

			});

          res.writeHead(302, {
                 'Location': '/product/view/'+req.param('id')
           });

          res.end();return false;
      	}  
      
  	});
});*/


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
	bid = require('../module/bid');
	user = require('../module/user');
	/*q.all([bids.maxcheckbidPlaced(req,config.mysql,q),products.productDetail(req,config.mysql,q),user.userInfo(req,config.mysql,q,req.session.userid,['balance','reserve_amount'])]).then(function(results){
		console.log("1111");
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
		console.log("22222");
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
		console.log("3333333333");
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
		}*/

		/*else if(results[1][0][0]['wprice'] <= req.body.wsprice)
		{*/
			update = 0;


			async.waterfall([

				function(callback) {
					q.all([bids.maxcheckbidPlaced(req,config.mysql,q),products.productDetail(req,config.mysql,q),user.userInfo(req,config.mysql,q,req.session.userid,['balance','reserve_amount'])]).then(function(results) {
						
						maxisthere = results[0][0].length;
						maxuid = 0;
						maxamt = 0;
						maxbid = [];
						if (maxisthere > 0) {
							maxbid = results[0][0][0];
							maxuid = maxbid.user_id;
							maxamt = maxbid.amt;
						}
						prdt = results[1][0][0];
						req.body.starting_price = prdt.wprice;
						req.body.title = prdt.title;
						if (req.body.wsprice <= prdt.wprice) {
							req.session.placedbiderror = 'Please submit higher bid!';
							res.writeHead(302, {
								'Location': '/product/view/' + req.param('id')
							});
							res.end();
							return false;
						}
						if (maxuid == req.session.userid) {
							results[2][0][0]['reserve_amount'] = results[2][0][0]['reserve_amount'] - maxamt;
						}

						var dateFormat = require('dateformat');
						var date = require('date-utils');
						results[1][0][0]['wsprice'] = results[1][0][0]['wprice'] + config.perbid;
						datenow = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
						closeddate = dateFormat(new Date(prdt['date_closed']), "yyyy-mm-dd HH:MM:ss");
						maxamnt = (maxuid > 0 && maxuid == req.session.user_id) ? maxamt : 0;
						req.body.placeamt = config.perbid;
						if ((Date.compare(closeddate, datenow) <= 0 ) && prdt['market_status'] == 'open') {
							res.writeHead(302, {
								'Location': '/product/close/' + req.param('id')
							});
							res.end();
							return false;
						}
						else if (prdt['market_status'] != 'open') {
							res.writeHead(302, {
								'Location': '/product/view/' + req.param('id')
							});
							res.end();
							return false;
						}
						callback(null, results,maxbid);
					});
				},
				function(maxbidarray,maxbid, callback) {
					console.log("First fun");
					if(global.general.proxy_bidding) {
						// Get the highest bidding details from proxy table
						q.all(bid.getProxyDetails(req, $arr.config.mysql, q, 'get_highest_biduser')).then(function (highest_proxybid_details) {
							// Get the highest biided user from proxy table

							req.body.highest_proxy_userid = 0;
							req.body.highest_proxy_amount = 0

							if (highest_proxybid_details[0].length > 0) {

								req.body.highest_proxy_userid = highest_proxybid_details[0][0].user_id;
								req.body.highest_proxy_amount = highest_proxybid_details[0][0].maxamount;
							}
							// If bidder amount same as to the max  proxy bid value
							req.body.is_equal = false;
							if (req.session.userid != req.body.highest_proxy_userid && req.body.highest_proxy_amount == req.body.wsprice) {
								increment_amount = global.general.proxy_bid_amount;

								req.body.wsprice = req.body.wsprice - increment_amount;
								req.body.is_equal = true;
							}
							callback(null, maxbidarray,maxbid);

						}).fail(function (err) {
							console.log(err.stack);
							callback(err, 'done');
						}).done();
					}

				},
				function(maxbidarray,maxbid, callback) {

					// Get the last bidded infromation of bidder
					if(parseInt(global.general.proxy_bidding) > 0) {
						console.log("If proxybidding set");
						q.all(bid.checkUserExistInBidProxy(req, $arr.config.mysql, q)).then(function (proxy_user_exist) {

							//If user is already exist in proxybid table

							if (proxy_user_exist[0].length > 0) {

								if (proxy_user_exist[0][0].maxamount < req.body.wsprice) {
									q.all([bid.updateProxyBid(req, $arr.config.mysql, q), bid.getProxyDetails(req, $arr.config.mysql, q, 'get_highest_biduser'),bid.getProxyDetails(req, $arr.config.mysql, q, 'second_highest_biduser')]).then(function (proxy_user_exist) {
										latest_proxy_bid_details = proxy_user_exist[1][0][0];
										second_highest_proxy_bid_details = proxy_user_exist[2][0][0];

										callback(null, latest_proxy_bid_details,maxbidarray,maxbid);

									}).fail(function (err) {
										console.log(err.stack);

									});
								} else {
									res.writeHead(302, {
										'Location': '/product/view/' + req.param('id') + '/cannot bid lower than original proxy amount'
									});
									res.end();
									return false;
								}


							} else {

								q.all([bid.insertProxyBid(req, $arr.config.mysql, q), bid.getProxyDetails(req, $arr.config.mysql, q, 'get_highest_biduser'),bid.getProxyDetails(req, $arr.config.mysql, q, 'second_highest_biduser')]).then(function (proxy_user_exist) { //If user is not exist in proxybid table
									latest_proxy_bid_details = proxy_user_exist[1][0][0];
									second_highest_proxy_bid_details = proxy_user_exist[2][0][0];
									callback(null, latest_proxy_bid_details,maxbidarray,maxbid);// Pass the last proxy bidding details

								}).fail(function (err) {
									console.log(err.stack);

								});
							}


						}).fail(function (err) {
							console.log(err.stack);
							callback(err, 'done',maxbidarray,maxbid);
						}).done();
					}else{
						callback(null, "done",maxbidarray,maxbid);// Pass the last proxy bidding details
					}


				},
				function(latest_proxy_bid_details,maxbidarray,maxbid, callback) {

					// If proxy bidding is enabled
					if(parseInt(global.general.proxy_bidding) > 0) {
						//console.log("second fun");
						// IF current is user is not the last max bidder
						if(req.body.highest_proxy_userid != req.session.userid) {

							//Check current bid is greater then highest proxy bid
							var bid_diff =  parseFloat(req.body.wsprice) - parseFloat(req.body.highest_proxy_amount);

							// If cuurent bid is higher then proxy bid then add 10 bidamount in last proxy bid amount
							if (req.body.highest_proxy_amount < req.body.wsprice  && bid_diff > parseFloat(global.general.proxy_bid_amount) ) {

								req.body.wsprice = bid.fetch_minimum_bid(req.body.highest_proxy_amount, global.general.proxy_bid_amount);
							}
							if(req.body.highest_proxy_amount == 0){
								req.body.wsprice = req.body.starting_price
							}
							q.all(bid.placeBid(req, config.mysql, q, 1)).then(function (resbid) {
								req.body.placebid = resbid[0].insertId;
								q.all([bid.fetch_last_bid(req, $arr.config.mysql, q)]).then(function (bid_details) {

									last_bid_details = bid_details[0][0][0];
									if (last_bid_details.user_id != latest_proxy_bid_details.user_id && !(req.body.is_equal)) {

										if (latest_proxy_bid_details.maxamount >= last_bid_details.proposed_amount) {
											// Proxy bid amount being placed: req.body.wsprice is greater than highest proxy: highest_proxy_amount", 'NOTICE');
											req.body.next_bid = bid.fetch_minimum_bid(last_bid_details.proposed_amount, global.general.proxy_bid_amount);
											q.all(bid.insertBidsAsProxy(req, config.mysql, q,latest_proxy_bid_details.user_id)).then(function (resbid) {
												req.body.wsprice = req.body.next_bid;
												bid.updateBid(req, config.mysql, q);
												callback(null, maxbidarray,maxbid);

											}).fail(function (err) {
												console.log(err.stack);
												callback(err, maxbidarray,maxbid);
											}).done();
										} else if (latest_proxy_bid_details.maxamount == last_bid_details.proposed_amount)
											q.all(bid.insertBidsAsProxy(req, config.mysql, q,latest_proxy_bid_details.user_id)).then(function (resbid) {
												bid.updateBid(req, config.mysql, q);
												callback(null, maxbidarray,maxbid);

											}).fail(function (err) {
												console.log(err.stack);
												callback(err, maxbidarray,maxbid);
											}).done();
										else if (latest_proxy_bid_details.maxamount < last_bid_details.proposed_amount)
											q.all(bid.insertBidsAsProxy(req, config.mysql, q,latest_proxy_bid_details.user_id)).then(function (resbid) {
												bid.updateBid(req, config.mysql, q);
												callback(null, maxbidarray,maxbid);

											}).fail(function (err) {
												console.log(err.stack);
												callback(err, 'done');
											}).done();
									} else {
										//Same as orginal bidded amount
										if(req.body.is_equal){
											req.body.wsprice = common.sumFloat(req.body.wsprice,global.general.proxy_bid_amount);
											//console.log("*******************If same bid ******************8");
										}

										bid.updateBid(req, config.mysql, q);
										proxy_bid_status = false;
										callback(null, maxbidarray,maxbid);
									}

								}).fail(function (err) {
									console.log(err.stack);
									callback(err, maxbidarray, maxbid); //fetch_last_bid
								}).done();

							}).fail(function (err) {
								//console.log(err.stack);
								callback(err, maxbidarray, maxbid);
							}).done(); //Placebid End
						}else{

						 	callback(null, maxbidarray, maxbid);
						 }

					}else{ // IF proxy bidding is disable
						q.all(bid.placeBid(req, config.mysql, q, 1)).then(function (resbid) {
							//console.log("If Proxybid is false");
							req.body.placebid = resbid[0].insertId;
							bid.updateBid(req, config.mysql, q);
							callback(null, maxbidarray, maxbid);

						}).fail(function(err){
							console.log(err.stack);
							callback(err, maxbidarray, maxbid);
							throw err;
						}).done();
					}


				}


			], function (err, results,maxbid) {
				// result now equals 'done';
				console.log(err);

				if(maxuid > 0)
				{
					req.body.bid = maxbid.id;
					req.body.buid = maxbid.user_id;
					req.body.amt = parseFloat(maxbid.amt,2)+parseFloat(results[1][0][0]['shipping_price'],2);
				}
				req.session.placedbid = true;
				req.session.placedbidamount = req.body.wsprice;

				delete customerio;
				localm	= require('../module/localmail');
				q.all([bids.allbidders(req,config.mysql,q,prdt.id,req.session.userid),products.checkmailnotify(req,config.mysql,q,1),products.checksmsnotify(req,config.mysql,q,1),products.usermailnotify(req,config.mysql,q,results[1][0][0]['user_id'],10),products.usersmsnotify(req,config.mysql,q,results[1][0][0]['user_id'],10)]).then(function(bidders){


					var tot_bidders = bidders[0][0].length;

					message = require('../module/message');
					var dat = require('date-util');
					//	message.addmessages(req,config.mysql,q);
					console.log(results[1][0][0]);
					for(var k=0;k<tot_bidders;k++ ){
						console.log("In outbidder");
						req.body.nid = 7;
						req.body.first_name= bidders[0][0][k].first_name;
						req.body.last_name=bidders[0][0][k].last_name;
						req.body.toemail = req.body.email= bidders[0][0][k].email;
						req.body.tophone =  bidders[0][0][k].phone;
						req.body.toid = bidders[0][0][k].user_id;
						req.body.pid = bidders[0][0][k].project_id;
						req.body.r_id = Date.parse(new Date())/1000;
						req.body.subject = 'You are outbid on Product '+req.body.title;
						req.body.message = 'Someone has bidded higher than your bid amount on '+req.body.title+'. Please <a href="'+$arr.config.spath+'product/view/'+req.body.pid+'">click here</a>';
						req.body.phmessage = req.body.title+' has been bidded with higher amount by someone.';
						message.addmessages(req,config.mysql,q);


					}
					if(bidders[1][0].length > 0){
						if(global.emailcio.status == 'yes'){

							customerio = require('../module/customerio');
							customerio.uid = req.session.userid;

							customerio.inits();
							customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});
							customerio.sendEmail({event:'bid_submitted',content:{siteurl:config.url,user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice,unsub_url:global.unsub_url+'/'+req.session.userid}});


						}

						else if(global.emaillocal.status == 'yes'){


							q.all([localm.mailtemps(req,config.mysql,q,'bid_submitted')]).then(function(results2){

								if(results2){

									var template = results2[0][0][0].template;
									var subject = results2[0][0][0].subject;

									template = template.replace('{{event.sitename}}' , "Auction Software.com");
									template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
									template = template.replace('{{event.title}}' ,  prdt.title);
									template = template.replace('{{event.amount}}' , req.body.wsprice);
									//console.log(template);
									localm.sendmail(template,subject,req.session.email);

								}

								else{

									console.log("No templates named bid_submitted");
								}


							});

						}

						else{ console.log('No Mail Delivery method is selected'); }
					}
					else{

					console.log('Email notification not activated');

					}

					if(bidders[2][0].length > 0){

						if(global.smstwo.status == 'yes'){

							twillio	= require('../module/twillio');

							q.all([twillio.smstemps(req,config.mysql,q,'bid_submitted')]).then(function(results3){

								if(results3){

									var template = results3[0][0][0].template;

									template = template.replace('{{event.sitename}}' , "Auction Software.com");
									template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
									template = template.replace('{{event.title}}' ,  prdt.title);
									template = template.replace('{{event.amount}}' , req.body.wsprice);
									//console.log(template);
									twillio.sendsms(template,req.session.phone);

								}

								else{

									console.log('No template name bid_submitted')
								}


							});

						}
					}
					else{

					console.log('SMS notification not activated');

					}

					if(bidders[3][0].length > 0){

						if(global.emailcio.status == 'yes'){

							customerio = require('../module/customerio');
							customerio.uid = results[1][0][0]['user_id'];

							customerio.inits();
							customerio.createCustomer({email:req.session.email,user:{firstName:results[1][0][0]['first_name'],lastName:results[1][0][0]['last_name']}});
							customerio.sendEmail({event:'bid_received',content:{siteurl:config.url,user:results[1][0][0]['first_name']+' '+results[1][0][0]['last_name'],title: prdt.title,amount : req.body.wsprice}});


						}

						else if(global.emaillocal.status == 'yes'){


							q.all([localm.mailtemps(req,config.mysql,q,'bid_received')]).then(function(results2){

								if(results2){

									var template = results2[0][0][0].template;
									var subject = results2[0][0][0].subject;

									template = template.replace('{{event.sitename}}' , "Auction Software.com");
									template = template.replace('{{event.user}}' , results[1][0][0]['first_name']+' '+results[1][0][0]['last_name']);
									template = template.replace('{{event.title}}' ,  prdt.title);
									template = template.replace('{{event.amount}}' , req.body.wsprice);
									//console.log(template);
									localm.sendmail(template,subject,results[1][0][0]['email']);

								}

								else{

									console.log("No templates named bid_received");
								}


							});

						}

						else{ console.log('No Mail Delivery method is selected'); }
					}
					else{
						
						console.log('Email notification not activated');

					}

					if(bidders[4][0].length > 0){

						if(global.smstwo.status == 'yes'){

							twillio	= require('../module/twillio');

							q.all([twillio.smstemps(req,config.mysql,q,'bid_received')]).then(function(results3){

								if(results3){

									var template = results3[0][0][0].template;

									template = template.replace('{{event.sitename}}' , "Auction Software.com");
									template = template.replace('{{event.user}}' , results[1][0][0]['first_name']+' '+results[1][0][0]['last_name']);
									template = template.replace('{{event.title}}' ,  prdt.title);
									template = template.replace('{{event.amount}}' , req.body.wsprice);
									//console.log(template);
									twillio.sendsms(template,results[1][0][0]['phone']);

								}

								else{

									console.log('No template name bid_received')
								}


							});

						}
					}
					else{
					console.log('SMS notification not activated');

					}


					/*bids.updateBid(req,config.mysql,q);*/
					req.session.bidcountmonth = parseInt(req.session.bidcountmonth)+1;
					req.session.bidcountyear = parseInt(req.session.bidcountyear)+1;
					res.writeHead(302, {
						'Location': '/product/view/'+req.param('id')
					});
					res.end();return false;


				}).fail(function(err){
					console.log(err.stack);
				}).done();



			});






			/*q.all(bids.placeBid(req,config.mysql,q,1)).then(function(resbid) {
>>>>>>> .r3136
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
				localm	= require('../module/localmail');
				q.all([bids.allbidders(req,config.mysql,q,prdt.id,req.session.userid)]).then(function(bidders){


					var tot_bidders = bidders[0][0].length;
					console.log(tot_bidders);
					message = require('../module/message');
					var dat = require('date-util');
					//	message.addmessages(req,config.mysql,q);
					for(var k=0;k<tot_bidders;k++ ){

						console.log(bidders[0][0][k].email);
						req.body.nid = 7;
						req.body.first_name= bidders[0][0][k].first_name;
						req.body.last_name=bidders[0][0][k].last_name;
						req.body.toemail = req.body.email= bidders[0][0][k].email;
						req.body.tophone =  bidders[0][0][k].phone;
						req.body.toid = bidders[0][0][k].user_id;
						req.body.pid = bidders[0][0][k].project_id;
						req.body.r_id = Date.parse(new Date())/1000;
						req.body.subject = 'You are outbid on Product '+req.body.title;
                   		req.body.message = 'Someone has bidded higher than your bid amount on '+req.body.title+'. Please <a href="'+$arr.config.spath+'product/view/'+req.body.pid+'">click here</a>';
                   		req.body.phmessage = req.body.title+' has been bidded with higher amount by someone.';
						message.addmessages(req,config.mysql,q);


					}



				});

				if(resbid[1][0].length > 0){

					if(global.emailcio.status == 'yes'){

						customerio = require('../module/customerio');
						customerio.uid = req.session.userid;

						customerio.inits();
						customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});
						customerio.sendEmail({event:'bid_submitted',content:{siteurl:config.url,user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice}});


					}

					else if(global.emaillocal.status == 'yes'){


						q.all([localm.mailtemps(req,config.mysql,q,'bid_submitted')]).then(function(results2){

							if(results2){

								var template = results2[0][0][0].template;
								var subject = results2[0][0][0].subject;

								template = template.replace('{{event.sitename}}' , "Auction Software.com");
								template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
								template = template.replace('{{event.title}}' ,  prdt.title);
								template = template.replace('{{event.amount}}' , req.body.wsprice);
								//console.log(template);
								localm.sendmail(template,subject,req.session.email);

							}

							else{

								console.log("No templates named bid_submitted");
							}


						});

					}

					else{ console.log('No Mail Delivery method is selected'); }
				}
				else{
					
					console.log('Email notification not activated');

				}

				if(resbid[2][0].length > 0){

					if(global.smstwo.status == 'yes'){

						twillio	= require('../module/twillio');

						q.all([twillio.smstemps(req,config.mysql,q,'bid_submitted')]).then(function(results3){

							if(results3){

								var template = results3[0][0][0].template;

								template = template.replace('{{event.sitename}}' , "Auction Software.com");
								template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
								template = template.replace('{{event.title}}' ,  prdt.title);
								template = template.replace('{{event.amount}}' , req.body.wsprice);
								//console.log(template);
								twillio.sendsms(template,req.session.phone);

							}

							else{

								console.log('No template name bid_submitted')
							}


						});

					}
				}
				else{
				console.log('SMS notification not activated');

				}
				console.log('Mail & SMS to Seller');
				

				if(resbid[3][0].length > 0){

					if(global.emailcio.status == 'yes'){

						customerio = require('../module/customerio');
						customerio.uid = results[1][0][0]['user_id'];

						customerio.inits();
						customerio.createCustomer({email:req.session.email,user:{firstName:results[1][0][0]['first_name'],lastName:results[1][0][0]['last_name']}});
						customerio.sendEmail({event:'bid_received',content:{siteurl:config.url,user:results[1][0][0]['first_name']+' '+results[1][0][0]['last_name'],title: prdt.title,amount : req.body.wsprice}});


					}

					else if(global.emaillocal.status == 'yes'){


						q.all([localm.mailtemps(req,config.mysql,q,'bid_received')]).then(function(results2){

							if(results2){

								var template = results2[0][0][0].template;
								var subject = results2[0][0][0].subject;

								template = template.replace('{{event.sitename}}' , "Auction Software.com");
								template = template.replace('{{event.user}}' , results[1][0][0]['first_name']+' '+results[1][0][0]['last_name']);
								template = template.replace('{{event.title}}' ,  prdt.title);
								template = template.replace('{{event.amount}}' , req.body.wsprice);
								//console.log(template);
								localm.sendmail(template,subject,results[1][0][0]['email']);

							}

							else{

								console.log("No templates named bid_received");
							}


						});

					}

					else{ console.log('No Mail Delivery method is selected'); }
				}
				else{
					
					console.log('Email notification not activated');

				}

				if(resbid[4][0].length > 0){

					if(global.smstwo.status == 'yes'){

						twillio	= require('../module/twillio');

						q.all([twillio.smstemps(req,config.mysql,q,'bid_received')]).then(function(results3){

							if(results3){

								var template = results3[0][0][0].template;

								template = template.replace('{{event.sitename}}' , "Auction Software.com");
								template = template.replace('{{event.user}}' , results[1][0][0]['first_name']+' '+results[1][0][0]['last_name']);
								template = template.replace('{{event.title}}' ,  prdt.title);
								template = template.replace('{{event.amount}}' , req.body.wsprice);
								//console.log(template);
								twillio.sendsms(template,results[1][0][0]['phone']);

							}

							else{

								console.log('No template name bid_received')
							}


						});

					}
				}
				else{
				console.log('SMS notification not activated');

				}

				console.log('1stlalalalalalalalalalalalalalalalalalalalalala');

				bids.updateBid(req,config.mysql,q);
				req.session.bidcountmonth = parseInt(req.session.bidcountmonth)+1;
				req.session.bidcountyear = parseInt(req.session.bidcountyear)+1;
				res.writeHead(302, {
					'Location': '/product/view/'+req.param('id')
				});
				res.end();return false;
			});*/
		/*}
		else
		{
			q.all([bids.placeBid(req,config.mysql,q,1),products.checkmailnotify(req,config.mysql,q,1),products.checksmsnotify(req,config.mysql,q,1),products.usermailnotify(req,config.mysql,q,results[1][0][0]['user_id'],10),products.usersmsnotify(req,config.mysql,q,results[1][0][0]['user_id'],10)]).then(function(resbid) {
				req.body.placebid = resbid[0].insertId;

				delete customerio;
				localm	= require('../module/localmail');

				q.all([bids.allbidders(req,config.mysql,q,prdt.id,req.session.userid)]).then(function(bidders){


					var tot_bidders = bidders[0][0].length;

					message = require('../module/message');
					var dat = require('date-util');
					//	message.addmessages(req,config.mysql,q);
					for(var k=0;k<tot_bidders;k++ ){

						req.body.nid = 7;
						req.body.first_name= bidders[0][0][k].first_name;
						req.body.last_name=bidders[0][0][k].last_name;
						req.body.toemail = req.body.email= bidders[0][0][k].email;
						req.body.tophone =  bidders[0][0][k].phone;
						req.body.toid = bidders[0][0][k].user_id;
						req.body.pid = bidders[0][0][k].project_id;
						req.body.r_id = Date.parse(new Date())/1000;
						req.body.subject = 'You are outbid on Product '+req.body.title;
                   		req.body.message = 'Someone has bidded higher than your bid amount on '+req.body.title+'. Please <a href="'+$arr.config.spath+'product/view/'+req.body.pid+'">click here</a>';
                   		req.body.phmessage = req.body.title+' has been bidded with higher amount by someone.';
						message.addmessages(req,config.mysql,q);


					}



				});

				if(resbid[1][0].length > 0){

					if(global.emailcio.status == 'yes'){

						customerio = require('../module/customerio');
						customerio.uid = req.session.userid;
						req.session.placedbid = true;
						req.session.placedbidamount = req.body.wsprice;



						customerio.inits();
						customerio.createCustomer({email:req.session.email,user:{firstName:req.session.first_name,lastName:req.session.last_name}});
						customerio.sendEmail({event:'bid_submitted',content:{siteurl:config.url,user:req.session.first_name+' '+req.session.last_name,title: prdt.title,amount : req.body.wsprice}});


					}

					else if(global.emaillocal.status == 'yes'){


						q.all([localm.mailtemps(req,config.mysql,q,'bid_submitted')]).then(function(results2){

							if(results2){

								var template = results2[0][0][0].template;
								var subject = results2[0][0][0].subject;

								template = template.replace('{{event.sitename}}' , "Auction Software.com");
								template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
								template = template.replace('{{event.title}}' ,  prdt.title);
								template = template.replace('{{event.amount}}' , req.body.wsprice);
								//console.log(template);
								localm.sendmail(template,subject,req.session.email);
							}
							else{

								console.log('No template named bid_submitted');
							}


						});

					}

					else{ console.log('No Mail Delivery method is selected'); }
				}
				else{

					console.log('Email notification not activated');
				}

				if(resbid[2][0].length > 0){

					if(global.smstwo.status == 'yes'){

						twillio	= require('../module/twillio');

						q.all([twillio.smstemps(req,config.mysql,q,'bid_submitted')]).then(function(results3){

							if(results3){

								var template = results3[0][0][0].template;

								template = template.replace('{{event.sitename}}' , "Auction Software.com");
								template = template.replace('{{event.user}}' , req.session.first_name+' '+req.session.last_name);
								template = template.replace('{{event.title}}' ,  prdt.title);
								template = template.replace('{{event.amount}}' , req.body.wsprice);
								//console.log(template);
								twillio.sendsms(template,req.session.phone);

							}

							else{

								console.log('No template name bid_submitted')
							}


						});



					}
				}
				else{

					console.log('SMS notification not activated');

				}

				
				console.log('Mail & SMS to Seller');
				

				if(resbid[3][0].length > 0){

					if(global.emailcio.status == 'yes'){

						customerio = require('../module/customerio');
						customerio.uid = results[1][0][0]['user_id'];

						customerio.inits();
						customerio.createCustomer({email:req.session.email,user:{firstName:results[1][0][0]['first_name'],lastName:results[1][0][0]['last_name']}});
						customerio.sendEmail({event:'bid_received',content:{siteurl:config.url,user:results[1][0][0]['first_name']+' '+results[1][0][0]['last_name'],title: prdt.title,amount : req.body.wsprice}});


					}

					else if(global.emaillocal.status == 'yes'){


						q.all([localm.mailtemps(req,config.mysql,q,'bid_received')]).then(function(results2){

							if(results2){

								var template = results2[0][0][0].template;
								var subject = results2[0][0][0].subject;

								template = template.replace('{{event.sitename}}' , "Auction Software.com");
								template = template.replace('{{event.user}}' , results[1][0][0]['first_name']+' '+results[1][0][0]['last_name']);
								template = template.replace('{{event.title}}' ,  prdt.title);
								template = template.replace('{{event.amount}}' , req.body.wsprice);
								//console.log(template);
								localm.sendmail(template,subject,results[1][0][0]['email']);

							}

							else{

								console.log("No templates named bid_received");
							}


						});

					}

					else{ console.log('No Mail Delivery method is selected'); }
				}
				else{
					
					console.log('Email notification not activated');

				}

				if(resbid[4][0].length > 0){

					if(global.smstwo.status == 'yes'){

						twillio	= require('../module/twillio');

						q.all([twillio.smstemps(req,config.mysql,q,'bid_received')]).then(function(results3){

							if(results3){

								var template = results3[0][0][0].template;

								template = template.replace('{{event.sitename}}' , "Auction Software.com");
								template = template.replace('{{event.user}}' , results[1][0][0]['first_name']+' '+results[1][0][0]['last_name']);
								template = template.replace('{{event.title}}' ,  prdt.title);
								template = template.replace('{{event.amount}}' , req.body.wsprice);
								//console.log(template);
								twillio.sendsms(template,results[1][0][0]['phone']);

							}

							else{

								console.log('No template name bid_received')
							}


						});

					}
				}
				else{
				console.log('SMS notification not activated');

				}
				console.log('1stlalalalalalalalalalalalalalalalalalalalalala');
				req.session.bidcountmonth = parseInt(req.session.bidcountmonth)+1;
				req.session.bidcountyear = parseInt(req.session.bidcountyear)+1;
				res.writeHead(302, {
					'Location': '/product/view/'+req.param('id')
				});
				res.end();return false;
			});
		}*/

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

app.post('/bulkimport', function(req, res){

console.log('asdasdasdsad');
q.all([products.maincatVal(req,config.mysql,q),products.subcatVal(req,config.mysql,q),products.title_exist(req,config.mysql,q)]).then(function(allresults){
var files = req.body.csvs;
var details = [];
var errors_spec = [];

request = require('request');

crypto = require('crypto');
fs = require('fs');
parse = require('csv-parse');
admin = require('../module/admin');
async = require("async");
console.log(req.files.csvs.path);
  rs = fs.createReadStream(req.files.csvs.path);
  parser = parse({columns: true}, function(err, data){
  
  var valid_cols = ['category','sub_category','auction','buynow','sprice','rprice','bprice','mprice','qty','sell_location','title','description','tags','paypal_address','date_added','date_closed','shipping_description','shipping_price','image','video'];
  	if(typeof(data) != '' && typeof(data) != 'undefined'){
   	
	   	if(parser.options.columns.length == valid_cols.length){

		    var counts = data.length;
		    var autoinc = 0;
		    var autoins = 0;
		    var img_arr = [];
		    var array_id = [];
		    for(var i=0;i< counts;i++){
		      
		      	   	var title_added = 0;

	      	   	if(data[i].auction == 1 || data[i].buynow == 1){
			    	if(data[i].auction == 0 || data[i].auction == 1){

			    		req.body.auction = data[i].auction;
			    		if(data[i].buynow == 0 || data[i].buynow == 1){

			    			req.body.buynow = data[i].buynow;
			    			
			    			if(!isNaN( Number(data[i].qty) ) ) {
							    var remainder = (data[i].qty % 1);
							    if(remainder === 0) {
							        
							        req.body.qty = data[i].qty;
			    					
			    					if(!isNaN( Number(data[i].sprice) ) && !isNaN( Number(data[i].mprice) ) ) {
			    						
			    						req.body.sprice = data[i].sprice;
			    						req.body.mprice = data[i].mprice;
			    						
			    						if(!isNaN( Number(data[i].bprice) ) &&  !isNaN( Number(data[i].rprice) ) ) {
			    							console.log(data[i].bprice+'bna'+data[i].mprice);
			    							console.log(data[i].rprice+'apa'+data[i].sprice);
			    							if(parseFloat(data[i].mprice) >= parseFloat(data[i].bprice) && parseFloat(data[i].rprice) >= parseFloat(data[i].sprice)){

				    							req.body.rprice = data[i].rprice;
				    							req.body.bprice = data[i].bprice;
				    							
				    							var rxDate = /^(0[1-9]|1[0-2])(\/)(0[1-9]|1[0-9]|2[0-9]|3[0-1])(\/)(\d{4})( )(([0-1][0-9])|(2[0-3]))(:)([0-5][0-9])(:)([0-5][0-9])$/;
				    							var dtArray = data[i].date_added.match(rxDate);
				    							if(dtArray){
				    								req.body.date_added = data[i].date_added;
				    								var dtArray2 = data[i].date_closed.match(rxDate);
				    								if(dtArray2){
				    									req.body.date_closed = data[i].date_closed;
				    									//console.log(req.body.title + req.body.buynow+req.body.date_closed );
				    									var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
														if (reg.test(data[i].paypal_address)){
															 
															req.body.paypal_email = data[i].paypal_address;
															
															
																var cts = 0;												
																var sts = 0;
																
																for(var j = 0;j < allresults[0][0].length;j++){

																	if(allresults[0][0][j]['name'].replace(/,/g, " ") == data[i].category){

																		cts = 1;
																		var cid = allresults[0][0][j]['id'];

																	}

																}

																	if(cts == 1){
																		console.log(data[autoinc].category)
																		if(data[i].sub_category != ''){
																			for(var k = 0;k < allresults[1][0].length;k++){
																				if(allresults[1][0][k]['name'].replace(/,/g, " ") == data[i].sub_category && allresults[1][0][k]['parent_id'] == cid){
																				
																				sts = 1;
																				var sid = allresults[1][0][k]['id'];
																				
																				}
																			}
																		}
																		else{
																			sts = 1;
																			var sid = '';
																		}
																		if(sts == 1){
																			
																			

																			console.log(data[i].sub_category+req.body.title);

																			
																			req.body.save='moderate';
																			req.body.bulkupload = 'yes';
																	    	req.body.title = data[i].title;
																	    	req.body.description = data[i].description;
																	    	req.body.tags = data[i].tags;
																	    	req.body.auction = data[i].auction;
																	    	req.body.buynow = data[i].buynow;
																	    	req.body.qty = data[i].qty;
																	    	req.body.sprice = data[i].sprice;
																	    	req.body.rprice = data[i].rprice;
																	    	req.body.mprice = data[i].mprice;
																	    	req.body.bprice = data[i].bprice;
																	    	req.body.date_added = data[i].date_added;
																	    	req.body.date_closed = data[i].date_closed;
																	    	req.body.paypal_email = data[i].paypal_address;
																	    	req.body.shipping_description = data[i].shipping_description;
																	    	if(!isNaN( Number(data[i].shipping_price) )){
																	    		req.body.shipping_fee = data[i].shipping_price;

																	    	}
																	    	else{
																	    		req.body.shipping_fee = 0.00;
																	    	}
																	    	req.body.video = data[i].video;
																	    	req.body.cid = sid;
																	    	req.body.sid = sid;

																	    	
																	    	for(var l = 0;l < allresults[2][0].length;l++){
																	    		
																				if(allresults[2][0][l]['title'] == data[i].title){


																	    		
																					title_added = 1;

																				}

																			}
																			
																	    	
																	    	if(title_added == 0 ){

																	    			
																	    			var img_array = [];
																	    			
																					var img_path = global.paths.path+'public/uploads/product/';
																					var img_url = data[i].image;

																					
																					var filename = img_url.substring(img_url.lastIndexOf('/')+1);
																					var ext = filename.substr(filename.lastIndexOf('.')+1);
																					console.log(ext);
																					if(ext === 'jpg'||ext === 'jpeg'||ext === 'png'){
																							  	var random_string = filename + Date.now() + Math.random();
																							 	var name_hash = crypto.createHash('md5').update(random_string).digest('hex');
																							 	var new_name = name_hash+'.'+ext;
																					}

																					else{
																						
																						console.log('Unsupported Product image format');
																						new_name = '';
																						filename = '';
																						
																						
																					}

																					

																	    			var download = function(uri, filename,old,new_name, callback){
																	    				var	http =require('http');
																						request.head(uri, function(err, res, body){
																							/*console.log('content-type:', res.headers['content-type']);
																							console.log('content-length:', res.headers['content-length']);*/

																							
																								
																							
																								var file = fs.createWriteStream(filename);
																								  var request = http.get(uri, function(response) {
																								    response.pipe(file);
																								    file.on('finish', function() {

																										    var img_paths = global.paths.path+'public/uploads/product/';
																											fs.rename(img_paths+old, img_paths+new_name, function(error) {
																									    	if ( error ) {
																									    		console.log('ERROR: ' + err);
																									    																								
																									    	}
																									    	else{	

																									    		console.log('done'+new_name); 
																									    	}
																							    		
																							    	
																										});
																								      file.close(callback);
																								    });
																							//request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
																						})
																					})

																				}

																					

																					async.series([

																							download(img_url, img_path+filename,filename,new_name)
																							//rename(img_path+filename, img_path+new_name,filename,new_name)

																					]);

																						req.body.new_image = new_name;
																						req.body.old_image = filename;

																						img_array.name = new_name;
																						img_array.originalName = filename;
																						img_arr.push(img_array);
																						req.files.product_image = filename;


																					
																		    	
																		    	q.all(products.save(req, res, config.mysql, q)).then(function (l) {
			           																req.body.p_id = l[0].insertId;
			           																
			           																array_id.push(req.body.p_id);
			           																
			           																autoinc++;
			           																
																					console.log(img_arr);
																					
																					
																						console.log('############################');
																						console.log( img_arr[autoinc-1].name);
																						console.log( img_arr[autoinc-1].originalName);
																						console.log('############################');
			           																	admin.addAttachment(img_arr[autoinc-1],config.mysql, q, req.body.p_id);
			           																

			        															});

																			}
																			else{

																				console.log('Product already exists');
																				error_no = 11;
									    										error_line = i+1;
									    										errors_spec.push(i+1);
									    										details[error_line] = 'Product already exists';
									    										

																			}

																		}
																		else{

																		console.log('Sub category Not found');
																		error_no = 10;
									    								error_line = i+1;
									    								errors_spec.push(i+1);
									    								details[error_line] = 'Sub category not found';

																		}


																	}
																	else{

																		console.log('Category Not found');

																		error_no = 9;
									    								error_line = i+1;
									    								errors_spec.push(i+1);
									    								details[error_line] = 'Category not found';
																	}
																	
																
																

														}
														else{

															alert('Paypal Email Not valid');
															error_no = 8;
									    					error_line = i+1;
									    					errors_spec.push(i+1);
									    					details[error_line] = 'Paypal Email not valid';

														}

				    								}
				    								else{

					    								console.log('Date closed value should be in format mm/dd/yyyy HH:mm:ss');
										    			error_no = 8;
										    			error_line = i+1;
										    			errors_spec.push(i+1);
										    			details[error_line] = 'date_closed value should be in format mm/dd/yyyy HH:mm:ss';

				    								}
				    							}

				    							else{

				    								console.log('Date Added value should be in format mm/dd/yyyy HH:mm:ss');
									    			error_no = 7;
									    			error_line = i+1;
									    			errors_spec.push(i+1);
									    			details[error_line] = 'date_added value should be in format mm/dd/yyyy HH:mm:ss';

				    							}


				    						}
				    						else{

				    							console.log('rprice/mprice value should be greater than or equal to sprice/bprice');
				    							console.log(data[i].bprice+'bn'+data[i].mprice);
			    								console.log(data[i].rprice+'ap'+data[i].sprice);
									    		error_no = 6;
									    		error_line = i+1;
									    		errors_spec.push(i+1);
									    		details[error_line] = 'rprice/mprice value should be greater than or equal to sprice/bprice';

				    						}

				    					}

				    					else{

											console.log('bprice/rprice value should be number');
									    	error_no = 5;
									    	error_line = i+1;
									    	errors_spec.push(i+1);
									    	details[error_line] = 'bprice/rprice value should be number';

										}

			    					}
			    					else{

										console.log('sprice/mprice value should be number');
								    	error_no = 4;
								    	error_line = i+1;
								    	errors_spec.push(i+1);
								    	details[error_line] = 'sprice/mprice value should be number';

									}


							    }
							    else{

							    	console.log('qty value should be integer'+ remainder);
						    		error_no = 3;
						    		error_line = i+1;
						    		errors_spec.push(i+1);
						    		details[error_line] = 'qty value should be an integer';

							    }
							}

							else{

								console.log('qty value should be number');
						    	error_no = 3;
						    	error_line = i+1;
						    	errors_spec.push(i+1);
						    	details[error_line] = 'qty value should be 0 or 1';

							}	

			    		}
			    		else{

				    		console.log('buynow value should be 0 or 1');
				    		error_no = 2;
				    		error_line = i+1;
				    		errors_spec.push(i+1);
				    		details[error_line] = 'buynow value should be 0 or 1';
			    		}

			    	}
			    	else{


			    		console.log('auction value should be 0 or 1');
			    		error_no = 1;
			    		error_line = i+1;
			    		errors_spec.push(i+1);
			    		details[error_line] = 'Auction Value should be 0 or 1';
			    	}
		    	}
		    	else{

		    		console.log('Product should be either Auction or Buynow');
		    		error_no = 12;
		    		error_line = i+1;
		    		errors_spec.push(i+1);
		    		details[error_line] = 'Product should be either Auction or Buynow';

		    	}

		     

		    }

	    }
	    else{
	    error_line = 0;
		errors_spec.push(0);
		details[error_line] = 'Some of the fields are missing. Please download the Sample CSV and check.';
		console.log('Some of the fields are missing. Please download the Sample CSV and check.');
		}

	}
	else{
		error_line = 0;
		errors_spec.push(0);
		details[error_line] = 'Document is not well formatted.Please download the Sample CSV and check.';
		console.log('Document is not well formatted.');
	}

    
	console.log(errors_spec);



 $arr['errors'] = errors_spec;
 $arr['details'] = details;

console.log(details);
common.tplFile('bulkupload.tpl');
common.headerSet(1);
common.loadTemplateHeader(req, res, $arr);
return false;

	
 
})
rs.pipe(parser);

 	



}).fail(function (error){
        console.log("Error : "+error.stack);
        throw error;
    }).done();


});

app.post('/addship_to_sess',function(req, res){
    
    
    req.session.sf_name = req.body.fnames;
    req.session.sl_name = req.body.lnames;
    req.session.semails = req.body.emails;
    req.session.sphoneno = req.body.phoneno;
    req.session.scountries = req.body.countries;
    req.session.sstates = req.body.states;
    req.session.scities = req.body.cities;
    req.session.saddresses = req.body.addresses;
    req.session.szips = req.body.zips;

    res.send(req.body.zips);
   

});

app.post('/checkout/vogue', function (req, response) {  
    
   
    var https = require('https');
    var url = 'https://voguepay.com/?v_transaction_id='+req.body.transaction_id+'&type=json&demo=true';
    console.log(url);
    https.get(url, function(res){
    var body = '';

        res.on('data', function(chunk){
            body += chunk;

        });

        res.on('end', function(){
            var vpres = JSON.parse(body);
            console.log("Got a response: ", vpres.status);
            if(vpres.status == 'Approved'){
               
                console.log(req.session.sf_name);
                console.log(req.session.semails);
                console.log(req.session.sstates);


                /****Function*****************************/

                req.body.trans_id = vpres.transaction_id;
                cart = require('../module/cart');
                
                req.body.f_name = req.session.sf_name;
                req.body.l_name = req.session.sl_name;

                req.body.email = req.session.semails;
                req.body.phone = req.session.sphoneno;

                req.body.country = req.session.scountries;
                req.body.state = req.session.sstates;

                req.body.city = req.session.scities;

                req.body.address = req.session.saddresses;
                req.body.zipcode = req.session.szips;
               
                price = vpres.total;

                q.all([cart.insertCartDetails(req, config.mysql, q, req.body.trans_id, price)]).then(function(results) {


                    var fg = (req.session.pid instanceof Array) ? req.session.pid.join(',') : req.session.pid;
                    refund = 0.00;
                    cart_id = results[0][0].insertId;
                    q.all([cart.selectCartItems(req, config.mysql, q, fg)]).then(function(resu) {
                        var prd = resu[0][0];
                        for (i in prd) {
                            var m_add = req.session.pid.indexOf(prd[i].id);
                            if (prd[i].market_status != 'open') {
                                prefund = (req.session.products[m_add]['qty_add'] * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price']))).toFixed(2);
                                available = 0;
                                req.session.products[m_add]['saled'] = 0;
                            } else {
                                var available = prd[i].qty - prd[i].sold;


                                var prefund = 0.00;
                                if (available <= 0) {
                                    prefund = (req.session.products[m_add]['qty_add'] * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price'])).toFixed(2)).toFixed(2);
                                    req.session.products[m_add]['saled'] = 0;
                                } else if (available < req.session.products[m_add]['qty_add']) {
                                    var ref_prd = req.session.products[m_add]['qty_add'] - available;
                                    prefund = ref_prd * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price']));
                                    req.session.products[m_add]['saled'] = available;
                                } else {
                                    req.session.products[m_add]['saled'] = req.session.products[m_add]['qty_add'];
                                }
                            }
                            /*if(prd[i].shipping_description == 'Local pick up only'){
                                req.body.local_pick = 1;
                            }else{
                                req.body.local_pick = 0;
                            }*/
                            req.session.products[m_add]['refund'] = prefund;
                            cart.insertBuynow(req, config.mysql, q, m_add, cart_id, config.general.escrow);
                            refund += prefund;
                            if (req.session.products[m_add]['saled'] > 0) {
                                message = require('../module/message');
                                var dat = require('date-util');
                                req.body.toid = req.session.userid;
                                req.body.first_name = req.session.first_name;
                                req.body.last_name = req.session.last_name;
                                req.body.r_id = Date.parse(new Date()) / 1000;
                                req.body.toemail = req.session.email;
                                req.body.tophone = req.session.phone;
                                req.body.fromid = req.session.products[m_add].user_id;
                                req.body.pid = req.session.products[m_add].id;
                                req.body.subject = 'Regards Buying ' + req.session.products[m_add]['saled'] + ' qty of ' + req.session.products[m_add]['title'];
                                req.body.message = 'Thank You for buying the item with us.Any Queries Please email us.';
                                req.body.phmessage = 'Thank You for buying the item with us.Any Queries Please email us.';
                                message.addmessages(req, config.mysql, q);
                                cart.updateSold(req, config.mysql, q, prd[i]['id'], req.session.products[m_add]['saled']);
                                req.body.trans_gateway = 'VoguePay';
                                cart.insertBuyItemInvoices(req, config.mysql, q, m_add, cart_id,req.body.trans_id);

                            }
                            if ((available - req.session.products[m_add]['saled']) <= 0 && prd[i]['market_status'] == 'open') {
                                cart.closeProduct(req, config.mysql, q, prd[i]['id']);
                            }

                            cart.cartPaidPrdt(req, config.mysql, q, prd[i]['id'], req.session.temp_cart_id, req.session.products[m_add]['qty_add']);

                            if (i == prd.length - 1) {
                                delete req.session.pid;
                                delete req.session.products;
                                if (typeof(req.session.pid) !== 'undefined') {

                                    req.session.pid = req.session.pid.filter(function(n) {
                                        return n != undefined
                                    });
                                    req.session.products = req.session.products.filter(function(n) {
                                        return n != undefined
                                    });
                                    if (req.session.pid.length == 0) {
                                        delete req.session.temp_cart_id;
                                        delete req.session.temp_time_id;
                                        delete req.session.pid;
                                        delete req.session.products;
                                        delete req.session.timer;

                                        delete req.session.sf_name;
                                        delete req.session.sl_name;
                                        delete req.session.semails;
                                        delete req.session.sphoneno;
                                        delete req.session.scountries;
                                        delete req.session.scities;
                                        delete req.session.sstates;
                                        delete req.session.saddresses;
                                        delete req.session.szips;
                                    }
                                } else {
                                    delete req.session.temp_cart_id;
                                    delete req.session.temp_time_id;
                                    delete req.session.timer;
                                }
                                

                                req.body.id = cart_id;
                                q.all([cart.getBuynowCartDetails(req, config.mysql, q)]).then(function(resq) {
                                    for (i in resq[0][0]) {
                                        cart.updateInvoiceBuy(req, config.mysql, q, resq[0][0][i].id, cart_id, resq[0][0][i].project_id);
                                        if (i == resq[0][0].length - 1) {
                                            response.writeHead(302, {
                                                'Location': '/product/checkout/paid/?id=' + cart_id
                                            });
                                            response.end();
                                            return false;
                                        }
                                    }
                                }).fail(function(err) {
                                    console.log(err.stack);
                                    throw err;
                                }).done();
                               
                            }
                        }
                    });
                }).fail(function(error) {
                    console.log(error.stack);
                    throw error;
                }).done();



               
            }
            else{

            
                  
                    response.writeHead(302, {
                       'Location': '/product/checkout/confirm/'+$arr['error']
                    });
                    response.end();
                    return false;
            
            }


        });
    }).on('error', function(e){
      console.log("Got an error: ", e);
    });



});

app.post('/checkout/stripe', function (req, response) {  

	common = require('../module/common');
	console.log(req.body.stripe_token);
	var stripe = require('stripe-api')(global.stripe.secretkey);
	$arr.pkey = global.stripe.publishkey;

    stripe.charges.create({
        amount: common.currencyConverter(req.body.total).replace('.', ''),
        currency: "usd",
        source: req.body.stripe_token, // obtained with Stripe.js ("sk_test_HXMXPWInUGgIRf0zFWq9jNni")
        description: 'Payment from AuctionSoftware'
    }, function (err, charge) {
        if (typeof(err) === 'undefined' || err === null) {
            console.log(charge.id);
            req.body.trans_id = charge.id;
                cart = require('../module/cart');
                
                req.body.f_name = req.session.sf_name;
                req.body.l_name = req.session.sl_name;

                req.body.email = req.session.semails;
                req.body.phone = req.session.sphoneno;

                req.body.country = req.session.scountries;
                req.body.state = req.session.sstates;

                req.body.city = req.session.scities;

                req.body.address = req.session.saddresses;
                req.body.zipcode = req.session.szips;
               
                price = req.body.total;

                q.all([cart.insertCartDetails(req, config.mysql, q, req.body.trans_id, price)]).then(function(results) {


                    var fg = (req.session.pid instanceof Array) ? req.session.pid.join(',') : req.session.pid;
                    refund = 0.00;
                    cart_id = results[0][0].insertId;
                    q.all([cart.selectCartItems(req, config.mysql, q, fg)]).then(function(resu) {
                        var prd = resu[0][0];
                        for (i in prd) {
                            var m_add = req.session.pid.indexOf(prd[i].id);
                            if (prd[i].market_status != 'open') {
                                prefund = (req.session.products[m_add]['qty_add'] * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price']))).toFixed(2);
                                available = 0;
                                req.session.products[m_add]['saled'] = 0;
                            } else {
                                var available = prd[i].qty - prd[i].sold;


                                var prefund = 0.00;
                                if (available <= 0) {
                                    prefund = (req.session.products[m_add]['qty_add'] * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price'])).toFixed(2)).toFixed(2);
                                    req.session.products[m_add]['saled'] = 0;
                                } else if (available < req.session.products[m_add]['qty_add']) {
                                    var ref_prd = req.session.products[m_add]['qty_add'] - available;
                                    prefund = ref_prd * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price']));
                                    req.session.products[m_add]['saled'] = available;
                                } else {
                                    req.session.products[m_add]['saled'] = req.session.products[m_add]['qty_add'];
                                }
                            }
                            /*if(prd[i].shipping_description == 'Local pick up only'){
                                req.body.local_pick = 1;
                            }else{
                                req.body.local_pick = 0;
                            }*/
                            req.session.products[m_add]['refund'] = prefund;
                            cart.insertBuynow(req, config.mysql, q, m_add, cart_id, config.general.escrow);
                            refund += prefund;
                            if (req.session.products[m_add]['saled'] > 0) {
                                message = require('../module/message');
                                var dat = require('date-util');
                                req.body.toid = req.session.userid;
                                req.body.first_name = req.session.first_name;
                                req.body.last_name = req.session.last_name;
                                req.body.r_id = Date.parse(new Date()) / 1000;
                                req.body.toemail = req.session.email;
                                req.body.tophone = req.session.phone;
                                req.body.fromid = req.session.products[m_add].user_id;
                                req.body.pid = req.session.products[m_add].id;
                                req.body.subject = 'Regards Buying ' + req.session.products[m_add]['saled'] + ' qty of ' + req.session.products[m_add]['title'];
                                req.body.message = 'Thank You for buying the item with us.Any Queries Please email us.';
                                req.body.phmessage = 'Thank You for buying the item with us.Any Queries Please email us.';
                                message.addmessages(req, config.mysql, q);
                                cart.updateSold(req, config.mysql, q, prd[i]['id'], req.session.products[m_add]['saled']);
                                req.body.trans_gateway = 'Stripe';
                                cart.insertBuyItemInvoices(req, config.mysql, q, m_add, cart_id,req.body.trans_id);

                            }
                            if ((available - req.session.products[m_add]['saled']) <= 0 && prd[i]['market_status'] == 'open') {
                                cart.closeProduct(req, config.mysql, q, prd[i]['id']);
                            }

                            cart.cartPaidPrdt(req, config.mysql, q, prd[i]['id'], req.session.temp_cart_id, req.session.products[m_add]['qty_add']);

                            if (i == prd.length - 1) {
                                delete req.session.pid;
                                delete req.session.products;
                                if (typeof(req.session.pid) !== 'undefined') {

                                    req.session.pid = req.session.pid.filter(function(n) {
                                        return n != undefined
                                    });
                                    req.session.products = req.session.products.filter(function(n) {
                                        return n != undefined
                                    });
                                    if (req.session.pid.length == 0) {
                                        delete req.session.temp_cart_id;
                                        delete req.session.temp_time_id;
                                        delete req.session.pid;
                                        delete req.session.products;
                                        delete req.session.timer;

                                        delete req.session.sf_name;
                                        delete req.session.sl_name;
                                        delete req.session.semails;
                                        delete req.session.sphoneno;
                                        delete req.session.scountries;
                                        delete req.session.scities;
                                        delete req.session.sstates;
                                        delete req.session.saddresses;
                                        delete req.session.szips;
                                    }
                                } else {
                                    delete req.session.temp_cart_id;
                                    delete req.session.temp_time_id;
                                    delete req.session.timer;
                                }
                                

                                req.body.id = cart_id;
                                q.all([cart.getBuynowCartDetails(req, config.mysql, q)]).then(function(resq) {
                                    for (i in resq[0][0]) {
                                        cart.updateInvoiceBuy(req, config.mysql, q, resq[0][0][i].id, cart_id, resq[0][0][i].project_id);
                                        if (i == resq[0][0].length - 1) {
                                            response.writeHead(302, {
                                                'Location': '/product/checkout/paid/?id=' + cart_id
                                            });
                                            response.end();
                                            return false;
                                        }
                                    }
                                }).fail(function(err) {
                                    console.log(err.stack);
                                    throw err;
                                }).done();
                               
                            }
                        }
                    });
                }).fail(function(error) {
                    console.log(error.stack);
                    throw error;
                }).done();


            
        }
        else {
           console.log(err.error.message);
            response.writeHead(302, {
                       'Location': '/product/checkout/confirm/'+err.error.message
                    });
                    response.end();
                    return false;
        }
    });

});

app.post(['/checkout/voguebid/:id', '/checkout/voguebid/:error'], function(req, response) {


            var https = require('https');
            var url = 'https://voguepay.com/?v_transaction_id=' + req.body.transaction_id + '&type=json&demo=true';
            console.log(url);
            https.get(url, function(res) {
                        var body = '';

                        res.on('data', function(chunk) {
                            body += chunk;

                        });

                        res.on('end', function() {
                            var vpres = JSON.parse(body);
                            console.log("Got a response: ", vpres.status);


                            req.body.trans_id = vpres.transaction_id;
                            cart = require('../module/cart');

                            req.body.f_name = req.session.sf_name;
                            req.body.l_name = req.session.sl_name;

                            req.body.email = req.session.semails;
                            req.body.phone = req.session.sphoneno;

                            req.body.country = req.session.scountries;
                            req.body.state = req.session.sstates;

                            req.body.city = req.session.scities;

                            req.body.address = req.session.saddresses;
                            req.body.zipcode = req.session.szips;

                            

                            var dashboard = require('../module/dashboard');
                            var product = require('../module/products');
                            req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
                            $arr['error'] = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
                            console.log("Working");
                            q.all([dashboard.getBuynowRecord(req, config.mysql, q)]).then(function(results) {
                                bid = results[0][0];
                                q.all([product.productDetailId(req, config.mysql, q, bid[0].project_id)]).then(function(data2) {
                                    pid = data2[0][0][0];
                                   
                                        
                                        price = bid[0].amount;
                                        $arr.pro_price = price;
                                        console.log('asddddddddddd');
                                         console.log(price);
                                        req.body.commission = config.general.commission_fee;



                                        if (vpres.status == 'Approved') {
                                            cart = require('../module/cart');
                                            // cart.insertCartDetails : Insert Into Checkout Table
                                            q.all([cart.insertCartDetails(req, config.mysql, q, vpres.transaction_id, price)]).then(function(results) {
                                                cart_id = results[0][0].insertId;
                                                req.body.trans_gateway = 'VoguePay';
                                                cart.paidBuynow(req, config.mysql, q, cart_id, config.general.escrow); //update Paid status as paid in buynow
                                                cart.paidBid(req, config.mysql, q, pid['id'], vpres.transaction_id); // Update paid status as paid in Invoice


                                                delete customerio;
                                                localm = require('../module/localmail');


                                                if (global.emailcio.status == 'yes') {

                                                    customerio = require('../module/customerio');
                                                    customerio.uid = pid['user_id'];

                                                    customerio.inits();
                                                    customerio.createCustomer({
                                                        email: pid['email'],
                                                        user: {
                                                            firstName: pid['first_name'],
                                                            lastName: pid['last_name']
                                                        }
                                                    });
                                                    customerio.sendEmail({
                                                        event: 'item_sold',
                                                        content: {
                                                            siteurl: config.url,
                                                            user: pid['first_name'] + ' ' + pid['last_name'],
                                                            bname: req.param('f_name'),
                                                            bphone: req.param('phone'),
                                                            bemail: req.param('email'),
                                                            qty: 1,
                                                            price: 1 * (pid['bprice'] + pid['shipping_price']),
                                                            title: pid['title'],
                                                            url: global.url + '/product/view/' + pid['id'],
                                                            unsub_url: global.unsub_url + '/' + pid['user_id']
                                                        }
                                                    });


                                                } else if (global.emaillocal.status == 'yes') {


                                                    q.all([localm.mailtemps(req, config.mysql, q, 'item_sold')]).then(function(results2) {

                                                        if (results2) {

                                                            var template = results2[0][0][0].template;
                                                            var subject = results2[0][0][0].subject;

                                                            template = template.replace('{{event.user}}', pid['first_name'] + ' ' + pid['last_name']);
                                                            template = template.replace('{{event.bname}}', req.param('f_name'));
                                                            template = template.replace('{{event.bphone}}', req.param('phone'));
                                                            template = template.replace('{{event.bemail}}', req.param('email'));
                                                            template = template.replace('{{event.qty}}', 1);
                                                            template = template.replace('{{event.price}}', 1 * (pid['bprice'] + pid['shipping_price']));
                                                            template = template.replace('{{event.title}}', pid['title']);
                                                            template = template.replace('{{event.url}}', global.url + '/product/view/' + pid['id']);
                                                            //console.log(template);
                                                            localm.sendmail(template, subject, pid['email']);

                                                        } else {

                                                            console.log("No template named item_sold");
                                                        }


                                                    });

                                                } else {
                                                    console.log('No Mail Delivery method is selected');
                                                }

                                                console.log('*************************************************');
                                                if (global.smstwo.status == 'yes') {

                                                    twillio = require('../module/twillio');

                                                    q.all([twillio.smstemps(req, config.mysql, q, 'item_sold')]).then(function(results3) {

                                                        if (results3) {

                                                            var template = results3[0][0][0].template;

                                                            template = template.replace('{{event.user}}', pid['first_name'] + ' ' + pid['last_name']);
                                                            template = template.replace('{{event.bname}}', req.param('f_name'));
                                                            template = template.replace('{{event.bphone}}', req.param('phone'));
                                                            template = template.replace('{{event.bemail}}', req.param('email'));
                                                            template = template.replace('{{event.qty}}', 1);
                                                            template = template.replace('{{event.price}}', 1 * (pid['bprice'] + pid['shipping_price']));
                                                            template = template.replace('{{event.title}}', pid['title']);
                                                            template = template.replace('{{event.url}}', global.url + '/product/view/' + pid['id']);
                                                            //console.log(template);
                                                            twillio.sendsms(template, pid['phone']);

                                                        } else {

                                                            console.log('No template name item_sold')
                                                        }


                                                    });



                                                }

                                                response.writeHead(302, {
                                                    'Location': '/dashboard/mywon'
                                                });
                                                response.end();
                                                return false;
                                            });
                                        } else {

                                            response.writeHead(302, {
                                                'Location': '/product/bidpayment/' + req.body.id + '/' + $arr['error']
                                            });
                                            response.end();
                                            return false;

                                        }


                                   




                                });
							});
                        }).on('error', function(e) {
                            console.log("Got an error: ", e);
                        });

   				});

			});


app.post(['/checkout/stripebid/:id', '/checkout/stripebid/:error'], function(req, response) {


	var stripe = require('stripe-api')(global.stripe.secretkey);
	

	stripe.charges.create({
        amount: common.currencyConverter(req.body.total).replace('.', ''),
        currency: "usd",
        source: req.body.stripe_token, // obtained with Stripe.js
        description: 'Payment from AuctionSoftware'
    }, function (err, charge) {
    	if (typeof(err) === 'undefined' || err === null) {


			req.body.trans_id = charge.id;
		    cart = require('../module/cart');

		    req.body.f_name = req.session.sf_name;
		    req.body.l_name = req.session.sl_name;

		    req.body.email = req.session.semails;
		    req.body.phone = req.session.sphoneno;

		    req.body.country = req.session.scountries;
		    req.body.state = req.session.sstates;

		    req.body.city = req.session.scities;

		    req.body.address = req.session.saddresses;
		    req.body.zipcode = req.session.szips;

		    

		    var dashboard = require('../module/dashboard');
		    var product = require('../module/products');
		    req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
		    $arr['error'] = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
		    console.log("Working");
		    q.all([dashboard.getBuynowRecord(req, config.mysql, q)]).then(function(results) {
		        bid = results[0][0];
		        q.all([product.productDetailId(req, config.mysql, q, bid[0].project_id)]).then(function(data2) {
		            pid = data2[0][0][0];
		           
		                
		                price = bid[0].amount;
		                $arr.pro_price = price;
		                console.log('asddddddddddd');
		                req.body.commission = config.general.commission_fee;


		                    cart = require('../module/cart');
		                    // cart.insertCartDetails : Insert Into Checkout Table
		                    q.all([cart.insertCartDetails(req, config.mysql, q, req.body.trans_id, price)]).then(function(results) {
		                        cart_id = results[0][0].insertId;
		                        req.body.trans_gateway = 'Stripe';
		                        cart.paidBuynow(req, config.mysql, q, cart_id, config.general.escrow); //update Paid status as paid in buynow
		                        cart.paidBid(req, config.mysql, q, pid['id'], req.body.trans_id); // Update paid status as paid in Invoice


		                        delete customerio;
		                        localm = require('../module/localmail');


		                        if (global.emailcio.status == 'yes') {

		                            customerio = require('../module/customerio');
		                            customerio.uid = pid['user_id'];

		                            customerio.inits();
		                            customerio.createCustomer({
		                                email: pid['email'],
		                                user: {
		                                    firstName: pid['first_name'],
		                                    lastName: pid['last_name']
		                                }
		                            });
		                            customerio.sendEmail({
		                                event: 'item_sold',
		                                content: {
		                                    siteurl: config.url,
		                                    user: pid['first_name'] + ' ' + pid['last_name'],
		                                    bname: req.param('f_name'),
		                                    bphone: req.param('phone'),
		                                    bemail: req.param('email'),
		                                    qty: 1,
		                                    price: price,
		                                    title: pid['title'],
		                                    url: global.url + '/product/view/' + pid['id'],
		                                    unsub_url: global.unsub_url + '/' + pid['user_id']
		                                }
		                            });


		                        } else if (global.emaillocal.status == 'yes') {


		                            q.all([localm.mailtemps(req, config.mysql, q, 'item_sold')]).then(function(results2) {

		                                if (results2) {

		                                    var template = results2[0][0][0].template;
		                                    var subject = results2[0][0][0].subject;

		                                    template = template.replace('{{event.user}}', pid['first_name'] + ' ' + pid['last_name']);
		                                    template = template.replace('{{event.bname}}', req.param('f_name'));
		                                    template = template.replace('{{event.bphone}}', req.param('phone'));
		                                    template = template.replace('{{event.bemail}}', req.param('email'));
		                                    template = template.replace('{{event.qty}}', 1);
		                                    template = template.replace('{{event.price}}', price);
		                                    template = template.replace('{{event.title}}', pid['title']);
		                                    template = template.replace('{{event.url}}', global.url + '/product/view/' + pid['id']);
		                                    console.log(template);
		                                    localm.sendmail(template, subject, pid['email']);

		                                } else {

		                                    console.log("No template named item_sold");
		                                }


		                            });

		                        } else {
		                            console.log('No Mail Delivery method is selected');
		                        }

		                        console.log('*************************************************');
		                        if (global.smstwo.status == 'yes') {

		                            twillio = require('../module/twillio');

		                            q.all([twillio.smstemps(req, config.mysql, q, 'item_sold')]).then(function(results3) {

		                                if (results3) {

		                                    var template = results3[0][0][0].template;

		                                    template = template.replace('{{event.user}}', pid['first_name'] + ' ' + pid['last_name']);
		                                    template = template.replace('{{event.bname}}', req.param('f_name'));
		                                    template = template.replace('{{event.bphone}}', req.param('phone'));
		                                    template = template.replace('{{event.bemail}}', req.param('email'));
		                                    template = template.replace('{{event.qty}}', 1);
		                                    template = template.replace('{{event.price}}', price);
		                                    template = template.replace('{{event.title}}', pid['title']);
		                                    template = template.replace('{{event.url}}', global.url + '/product/view/' + pid['id']);
		                                    //console.log(template);
		                                    twillio.sendsms(template, pid['phone']);

		                                } else {

		                                    console.log('No template name item_sold')
		                                }


		                            });



		                        }

		                        response.writeHead(302, {
		                            'Location': '/dashboard/mywon'
		                        });
		                        response.end();
		                        return false;
		                    });
		                
		        });
			});

		}
        else {
           console.log(err.error.message);
            response.writeHead(302, {
                       'Location': '/product/checkout/confirm/'+err.error.message
            });
            response.end();
            return false;
        }
    });


});

app.post('/checkout/authorize', function (req, res) {  
	common = require('../module/common');
	authorize = require('../module/authorize');
	var AuthorizeTypes = require('auth-net-types')
    , _AuthorizeCIM = require('auth-net-cim')
    , AuthorizeCIM = new _AuthorizeCIM({
        api: global.authorizenet.api ,
        key: global.authorizenet.key,
        sandbox: (global.authorizenet.sandbox == 'yes') // false
    });

    authorize = require('../module/auth_fun');
    AuthorizeCIM.createCustomerProfile({customerProfile: {
        merchantCustomerId: req.session.userid+'mid',
        description: 'A customer with a lot of cash.',
        email: req.session.email,
        customerProfileId: req.session.userid
      }},function (err, response)  {
       if (typeof(err) === 'undefined' || err === null) {
            
            console.log(response);
            createPaymentProfile(req,response.customerProfileId,config.mysql);

        }
        else{
            
            console.log(err);
            if(err.code == 'E00039'){ //Another Record Exist

            	q.all([authorize.getdetails(req, config.mysql, q, req.body.number),authorize.getproid(req, config.mysql, q)]).then(function(results) {
            		

            		if(results[0][0].length > 0){
            			console.log('Old Payment');
            			doPayment(req,config,res,results[0][0][0].pro_id,results[0][0][0].pay_id);
            		}
            		else{

            			 console.log('New Payment');
            			 createPaymentProfile(req,results[1][0][0].pro_id,config.mysql);
            		}
            		
            		/*if(results[0][0][0]){

            		}
            		else{
            			createPayment();
            		}*/


            	});
            }
        }

      });

	    var createPaymentProfile = function (req,profile_id,mysql) {
	    	authorize = require('../module/auth_fun');
	        var options = {
	            customerType: 'individual',
	            payment: {
	                creditCard: new AuthorizeTypes.CreditCard({
	                    cardNumber: req.body.number,
	                    expirationDate: req.body.expiration_year+'-'+req.body.expiration_month
	                })
	            }
	        };

	    console.log(profile_id);
        AuthorizeCIM.createCustomerPaymentProfile({
            customerProfileId: profile_id,
            paymentProfile: options
        }, function (err, response) {
            if (typeof(err) === 'undefined' || err === null) { // Created payment profile. Make a transaction
               // customerPaymentProfileId = response.customerPaymentProfileId;
               console.log(response);
               authorize.insertdetails(req,response,mysql);
                q.all(authorize.getdetails(req, config.mysql, q, req.body.number)).then(function(results) {
                
                	doPayment(req,config,res,results[0][0].pro_id,results[0][0].pay_id);

                	// doPayment()	
                });
              

               
            } else { // Payment profile already exists. Make transaction with existing data. This loop won't execute, since the case is handled at the beginning
            console.log( err );
                if (err.code = "E00039") {
                    console.log("Nothing to worry. Return to caller function");
                }
            }
        });
    };

    var doPayment = function (req,config,response,profile_id,payment_id) {

     	var transaction = {
	        
	        amount: req.body.total,
	        tax: {
	            amount: 0,
	            name: '',
	            description: ''
	        },
	        shipping: {
	            amount: 0,
	            name: '',
	            description: ''
	        },
	        duty: {
	            amount: 0,
	            name: '',
	            description: ''
	        },
	        lineItems: {
	            itemId: 1,
	            name: 'Shopping From AuctionSoftware',
	            description: 'Shopping From AuctionSoftware',
	            quantity: 1,
	            unitPrice: req.body.total,
	            taxable: false
	        },
	        customerProfileId: profile_id,
	        customerPaymentProfileId: payment_id

    	};

    	AuthorizeCIM.createCustomerProfileTransaction('AuthCapture', transaction, function (err, resp) {
        
	        if (typeof(err) === 'undefined' || err === null) {

	            var presp  = resp && resp.directResponse||'';
	            var findTid = presp && presp !='' && presp.split('Y,')||'';
	            findTid = findTid && findTid[1] && findTid[1].split(',');
	            console.log(findTid[0]);

	            req.body.trans_id = findTid[0];
                cart = require('../module/cart');
                
                req.body.f_name = req.session.sf_name;
                req.body.l_name = req.session.sl_name;

                req.body.email = req.session.semails;
                req.body.phone = req.session.sphoneno;

                req.body.country = req.session.scountries;
                req.body.state = req.session.sstates;

                req.body.city = req.session.scities;

                req.body.address = req.session.saddresses;
                req.body.zipcode = req.session.szips;
               
                price = req.body.total;

                q.all([cart.insertCartDetails(req, config.mysql, q, req.body.trans_id, price)]).then(function(results) {


                    var fg = (req.session.pid instanceof Array) ? req.session.pid.join(',') : req.session.pid;
                    refund = 0.00;
                    cart_id = results[0][0].insertId;
                    q.all([cart.selectCartItems(req, config.mysql, q, fg)]).then(function(resu) {
                        var prd = resu[0][0];
                        for (i in prd) {
                            var m_add = req.session.pid.indexOf(prd[i].id);
                            if (prd[i].market_status != 'open') {
                                prefund = (req.session.products[m_add]['qty_add'] * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price']))).toFixed(2);
                                available = 0;
                                req.session.products[m_add]['saled'] = 0;
                            } else {
                                var available = prd[i].qty - prd[i].sold;


                                var prefund = 0.00;
                                if (available <= 0) {
                                    prefund = (req.session.products[m_add]['qty_add'] * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price'])).toFixed(2)).toFixed(2);
                                    req.session.products[m_add]['saled'] = 0;
                                } else if (available < req.session.products[m_add]['qty_add']) {
                                    var ref_prd = req.session.products[m_add]['qty_add'] - available;
                                    prefund = ref_prd * (parseFloat(req.session.products[m_add]['bprice']) + parseFloat(req.session.products[m_add]['shipping_price']));
                                    req.session.products[m_add]['saled'] = available;
                                } else {
                                    req.session.products[m_add]['saled'] = req.session.products[m_add]['qty_add'];
                                }
                            }
                            /*if(prd[i].shipping_description == 'Local pick up only'){
                                req.body.local_pick = 1;
                            }else{
                                req.body.local_pick = 0;
                            }*/
                            req.session.products[m_add]['refund'] = prefund;
                            cart.insertBuynow(req, config.mysql, q, m_add, cart_id, config.general.escrow);
                            refund += prefund;
                            if (req.session.products[m_add]['saled'] > 0) {
                                message = require('../module/message');
                                var dat = require('date-util');
                                req.body.toid = req.session.userid;
                                req.body.first_name = req.session.first_name;
                                req.body.last_name = req.session.last_name;
                                req.body.r_id = Date.parse(new Date()) / 1000;
                                req.body.toemail = req.session.email;
                                req.body.tophone = req.session.phone;
                                req.body.fromid = req.session.products[m_add].user_id;
                                req.body.pid = req.session.products[m_add].id;
                                req.body.subject = 'Regards Buying ' + req.session.products[m_add]['saled'] + ' qty of ' + req.session.products[m_add]['title'];
                                req.body.message = 'Thank You for buying the item with us.Any Queries Please email us.';
                                req.body.phmessage = 'Thank You for buying the item with us.Any Queries Please email us.';
                                message.addmessages(req, config.mysql, q);
                                cart.updateSold(req, config.mysql, q, prd[i]['id'], req.session.products[m_add]['saled']);
                                req.body.trans_gateway = 'Authorize';
                                cart.insertBuyItemInvoices(req, config.mysql, q, m_add, cart_id,req.body.trans_id);

                            }
                            if ((available - req.session.products[m_add]['saled']) <= 0 && prd[i]['market_status'] == 'open') {
                                cart.closeProduct(req, config.mysql, q, prd[i]['id']);
                            }

                            cart.cartPaidPrdt(req, config.mysql, q, prd[i]['id'], req.session.temp_cart_id, req.session.products[m_add]['qty_add']);

                            if (i == prd.length - 1) {
                                delete req.session.pid;
                                delete req.session.products;
                                if (typeof(req.session.pid) !== 'undefined') {

                                    req.session.pid = req.session.pid.filter(function(n) {
                                        return n != undefined
                                    });
                                    req.session.products = req.session.products.filter(function(n) {
                                        return n != undefined
                                    });
                                    if (req.session.pid.length == 0) {
                                        delete req.session.temp_cart_id;
                                        delete req.session.temp_time_id;
                                        delete req.session.pid;
                                        delete req.session.products;
                                        delete req.session.timer;

                                        delete req.session.sf_name;
                                        delete req.session.sl_name;
                                        delete req.session.semails;
                                        delete req.session.sphoneno;
                                        delete req.session.scountries;
                                        delete req.session.scities;
                                        delete req.session.sstates;
                                        delete req.session.saddresses;
                                        delete req.session.szips;
                                    }
                                } else {
                                    delete req.session.temp_cart_id;
                                    delete req.session.temp_time_id;
                                    delete req.session.timer;
                                }
                                

                                req.body.id = cart_id;
                                q.all([cart.getBuynowCartDetails(req,config.mysql, q)]).then(function(resq) {
                                    for (i in resq[0][0]) {
                                        cart.updateInvoiceBuy(req, config.mysql, q, resq[0][0][i].id, cart_id, resq[0][0][i].project_id);
                                        if (i == resq[0][0].length - 1) {
                                        	console.log('haihaihai');
                                            response.writeHead(302, {
                                                'Location': '/product/checkout/paid/?id=' + cart_id
                                            });
                                            response.end();
                                            return false;

                                            
                                        }
                                    }
                                }).fail(function(err) {
                                    console.log(err.stack);
                                   
                                    throw err;
                                }).done();
                               
                            }
                        }
                    });
                }).fail(function(error) {
                    console.log(error.stack);
                  
                    throw error;
                }).done();
	            
	            

	        }
	        else {
	           console.log(err.message);
	            response.writeHead(302, {
	                       'Location': '/product/checkout/confirm/'+err.message
	            });
	            response.end();
	            return false;
            
        	}

    	});


    };


   

});

app.post(['/checkout/authorizebid/:id', '/checkout/authorizebid/:error'], function (req, res) {  
	common = require('../module/common');
	authorize = require('../module/authorize');
	var AuthorizeTypes = require('auth-net-types')
    , _AuthorizeCIM = require('auth-net-cim')
    , AuthorizeCIM = new _AuthorizeCIM({
        api: global.authorizenet.api ,
        key: global.authorizenet.key,
        sandbox: (global.authorizenet.sandbox == 'yes') // false
    });

    authorize = require('../module/auth_fun');
    AuthorizeCIM.createCustomerProfile({customerProfile: {
        merchantCustomerId: req.session.userid+'mid',
        description: 'A customer with a lot of cash.',
        email: req.session.email,
        customerProfileId: req.session.userid
      }},function (err, response)  {
       if (typeof(err) === 'undefined' || err === null) {
            
            console.log(response);
            createPaymentProfile(req,response.customerProfileId,config.mysql);

        }
        else{
            
            console.log(err);
            if(err.code == 'E00039'){ //Another Record Exist

            	q.all([authorize.getdetails(req, config.mysql, q, req.body.number),authorize.getproid(req, config.mysql, q)]).then(function(results) {
            		

            		if(results[0][0].length > 0){
            			console.log('Old Payment');
            			doPayment(req,config,res,results[0][0][0].pro_id,results[0][0][0].pay_id);
            		}
            		else{

            			 console.log('New Payment');
            			 createPaymentProfile(req,results[1][0][0].pro_id,config.mysql);
            		}
            		
            		/*if(results[0][0][0]){

            		}
            		else{
            			createPayment();
            		}*/


            	});
            }
        }

      });

	    var createPaymentProfile = function (req,profile_id,mysql) {
	    	authorize = require('../module/auth_fun');
	        var options = {
	            customerType: 'individual',
	            payment: {
	                creditCard: new AuthorizeTypes.CreditCard({
	                    cardNumber: req.body.number,
	                    expirationDate: req.body.expiration_year+'-'+req.body.expiration_month
	                })
	            }
	        };

	    console.log(profile_id);
        AuthorizeCIM.createCustomerPaymentProfile({
            customerProfileId: profile_id,
            paymentProfile: options
        }, function (err, response) {
            if (typeof(err) === 'undefined' || err === null) { // Created payment profile. Make a transaction
               // customerPaymentProfileId = response.customerPaymentProfileId;
               console.log(response);
               authorize.insertdetails(req,response,mysql);
                q.all(authorize.getdetails(req, config.mysql, q, req.body.number)).then(function(results) {
                
                	doPayment(req,config,res,results[0][0].pro_id,results[0][0].pay_id);

                	// doPayment()	
                });
              

               
            } else { // Payment profile already exists. Make transaction with existing data. This loop won't execute, since the case is handled at the beginning
            console.log( err );
                if (err.code = "E00039") {
                    console.log("Nothing to worry. Return to caller function");
                }
            }
        });
    };

    var doPayment = function (req,config,response,profile_id,payment_id) {

     	var transaction = {
	        
	        amount: req.body.total,
	        tax: {
	            amount: 0,
	            name: '',
	            description: ''
	        },
	        shipping: {
	            amount: 0,
	            name: '',
	            description: ''
	        },
	        duty: {
	            amount: 0,
	            name: '',
	            description: ''
	        },
	        lineItems: {
	            itemId: 1,
	            name: 'Shopping From AuctionSoftware',
	            description: 'Shopping From AuctionSoftware',
	            quantity: 1,
	            unitPrice: req.body.total,
	            taxable: false
	        },
	        customerProfileId: profile_id,
	        customerPaymentProfileId: payment_id

    	};

    	AuthorizeCIM.createCustomerProfileTransaction('AuthCapture', transaction, function (err, resp) {
        
	        if (typeof(err) === 'undefined' || err === null) {

	            var presp  = resp && resp.directResponse||'';
	            var findTid = presp && presp !='' && presp.split('Y,')||'';
	            findTid = findTid && findTid[1] && findTid[1].split(',');
	            console.log(findTid[0]);

	            req.body.trans_id = findTid[0];
                
			    cart = require('../module/cart');

			    req.body.f_name = req.session.sf_name;
			    req.body.l_name = req.session.sl_name;

			    req.body.email = req.session.semails;
			    req.body.phone = req.session.sphoneno;

			    req.body.country = req.session.scountries;
			    req.body.state = req.session.sstates;

			    req.body.city = req.session.scities;

			    req.body.address = req.session.saddresses;
			    req.body.zipcode = req.session.szips;

		    

			    var dashboard = require('../module/dashboard');
			    var product = require('../module/products');
			    req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
			    $arr['error'] = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
			    console.log("Working");
			    q.all([dashboard.getBuynowRecord(req, config.mysql, q)]).then(function(results) {
			        bid = results[0][0];
			        q.all([product.productDetailId(req, config.mysql, q, bid[0].project_id)]).then(function(data2) {
			            pid = data2[0][0][0];
			           
			                
			                price = bid[0].amount;
			                $arr.pro_price = price;
			                console.log('asddddddddddd');
			                req.body.commission = config.general.commission_fee;


			                    cart = require('../module/cart');
			                    // cart.insertCartDetails : Insert Into Checkout Table
			                    q.all([cart.insertCartDetails(req, config.mysql, q, req.body.trans_id, price)]).then(function(results) {
			                        cart_id = results[0][0].insertId;
			                        req.body.trans_gateway = 'Authorize';
			                        cart.paidBuynow(req, config.mysql, q, cart_id, config.general.escrow); //update Paid status as paid in buynow
			                        cart.paidBid(req, config.mysql, q, pid['id'], req.body.trans_id); // Update paid status as paid in Invoice


			                        delete customerio;
			                        localm = require('../module/localmail');


			                        if (global.emailcio.status == 'yes') {

			                            customerio = require('../module/customerio');
			                            customerio.uid = pid['user_id'];

			                            customerio.inits();
			                            customerio.createCustomer({
			                                email: pid['email'],
			                                user: {
			                                    firstName: pid['first_name'],
			                                    lastName: pid['last_name']
			                                }
			                            });
			                            customerio.sendEmail({
			                                event: 'item_sold',
			                                content: {
			                                    siteurl: config.url,
			                                    user: pid['first_name'] + ' ' + pid['last_name'],
			                                    bname: req.param('f_name'),
			                                    bphone: req.param('phone'),
			                                    bemail: req.param('email'),
			                                    qty: 1,
			                                    price: price,
			                                    title: pid['title'],
			                                    url: global.url + '/product/view/' + pid['id'],
			                                    unsub_url: global.unsub_url + '/' + pid['user_id']
			                                }
			                            });


			                        } else if (global.emaillocal.status == 'yes') {


			                            q.all([localm.mailtemps(req, config.mysql, q, 'item_sold')]).then(function(results2) {

			                                if (results2) {

			                                    var template = results2[0][0][0].template;
			                                    var subject = results2[0][0][0].subject;

			                                    template = template.replace('{{event.user}}', pid['first_name'] + ' ' + pid['last_name']);
			                                    template = template.replace('{{event.bname}}', req.param('f_name'));
			                                    template = template.replace('{{event.bphone}}', req.param('phone'));
			                                    template = template.replace('{{event.bemail}}', req.param('email'));
			                                    template = template.replace('{{event.qty}}', 1);
			                                    template = template.replace('{{event.price}}', price);
			                                    template = template.replace('{{event.title}}', pid['title']);
			                                    template = template.replace('{{event.url}}', global.url + '/product/view/' + pid['id']);
			                                    //console.log(template);
			                                    localm.sendmail(template, subject, pid['email']);

			                                } else {

			                                    console.log("No template named item_sold");
			                                }


			                            });

			                        } else {
			                            console.log('No Mail Delivery method is selected');
			                        }

			                        console.log('*************************************************');
			                        if (global.smstwo.status == 'yes') {

			                            twillio = require('../module/twillio');

			                            q.all([twillio.smstemps(req, config.mysql, q, 'item_sold')]).then(function(results3) {

			                                if (results3) {

			                                    var template = results3[0][0][0].template;

			                                    template = template.replace('{{event.user}}', pid['first_name'] + ' ' + pid['last_name']);
			                                    template = template.replace('{{event.bname}}', req.param('f_name'));
			                                    template = template.replace('{{event.bphone}}', req.param('phone'));
			                                    template = template.replace('{{event.bemail}}', req.param('email'));
			                                    template = template.replace('{{event.qty}}', 1);
			                                    template = template.replace('{{event.price}}', price);
			                                    template = template.replace('{{event.title}}', pid['title']);
			                                    template = template.replace('{{event.url}}', global.url + '/product/view/' + pid['id']);
			                                    //console.log(template);
			                                    twillio.sendsms(template, pid['phone']);

			                                } else {

			                                    console.log('No template name item_sold')
			                                }


			                            });



			                        }

			                        response.writeHead(302, {
			                            'Location': '/dashboard/mywon'
			                        });
			                        response.end();
			                        return false;
			                    });
			                
			        });
				});
	            
	            

	        }
	        else {
	           console.log(err.message);
	            response.writeHead(302, {
	                       'Location': '/product/checkout/confirm/'+err.message
	            });
	            response.end();
	            
            
        	}

    	});


    };


   

});





module.exports = app;