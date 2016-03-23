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
var stores  = require('../module/stores');
var session = require('express-session');
var app	    = express.Router();
var cryptos =  require('../module/crypto.js');
var mysqli  = require('../module/mysqli');
var cookieParser = require('cookie-parser');

var q = require('q');



app.use(function(req,res,next)
{
  //req.session.userid = 1;	
  if(!$arr.config.stores.enable)
  {
	  res.writeHead(302, {
	   'Location': '/'
	  });
	  res.end();return false;
  }
  next();
});
app.post(['/message'],function(req,res)
{
  var data = common.checkLoginJSON(req,res);	
  q.all([stores.storeDetail(req,$arr.config.mysql,q)]).then(function(results)
  {	
  	data.warning = 'Invalid Access!';
  	if(results[0][0].length == 0)
  	{
  		common.sendJSONOutput(req,res,data);
  	}	
  	data.warning = '';
  	var store = results[0][0][0];
	message = require('../module/message');
	req.body.fromid = req.session.userid;
	req.body.first_name = store.first_name;
	req.body.last_name = store.last_name;     
	req.body.r_id = Date.parse(new Date())/1000;     
	req.body.toemail = store.email;
	req.body.toid = store.user_id;
	req.body.pid = 0;
	req.body.subject = req.session.first_name+' Sent a Message from '+store.name+' store';
	message.addmessages(req,config.mysql,q);
	console.log(data);
    common.sendJSONOutput(req,res,data);
  });
});
app.get(['/create'],function(req,res)
{
	   q.all([stores.viewUserStores(req,$arr.config.mysql,q)]).then(function(results)
        {
        	if(results[0][0].length == 0)
        	{
                  common.checkLogin(req,res,0); 
	             common.tplFile('store/create.tpl');
		         common.headerSet(1);
		         common.loadTemplateHeader(req,res,$arr);
        	}	
        	else
        	{
                     res.writeHead(302, {
					   'Location': '/stores/view/'+results[0][0][0].id
					});
					res.end();return false;
        	}
	         
	    });     
});
app.post(['/create'],function(req,res)
{
	  common.checkLogin(req,res,0);
      q.all([stores.create(req,$arr.config.mysql,q)]).then(function(results)
      {
		 if(typeof(req.files.store_banner_image) !== 'undefined')
		{
			var fs = require('fs');
			//console.log($arr.config.paths.path+'public/uploads/stores/'+req.files.store_banner_image.name);
			//console.log(fs.readFileSync($arr.config.paths.path+'public/uploads/store/'+req.files.store_banner_image.name, 'binary'));
		
		var im = require('imagemagick');
			im.crop({
				  srcPath: $arr.config.paths.path+'public/uploads/store/'+req.files.store_banner_image.name,
				  dstPath: $arr.config.paths.path+'public/uploads/store/banner_'+req.files.store_banner_image.name,
				  width: 1078,
				  height: 192,
				  quality: 1,
				  gravity: "Center"
				}, function(err, stdout, stderr){
				  // foo 
				});
		}
          var m = results[0][0].insertId;
            res.writeHead(302, {
			   'Location': '/stores/view/'+m
			});
			res.end();return false;
      });
});
app.get(['/view/ajax/:id'],function(req,res)
{
	
	  q.all([stores.viewStoreProducts(req,$arr.config.mysql,q,1),stores.viewStoreProducts(req,$arr.config.mysql,q,0)]).then(function(results)
      {  
		  $arr.nulldata = null;
		  $arr.storeProducts = results[0][0];
		  $arr.paginations = results[1][0];
		  //$arr['pagination'] = products.shortDescribe(results[1][0]).length;
			var pagination = require('pagination');
	        var paginator = new pagination.SearchPaginator({
	            prelink: 'javascript:paginationStore',
	            current: req.body.page,
	            rowsPerPage: 15,
	            totalResult: $arr.paginations.length,
	            ajax: true
	        });
         $arr['pagination_html'] = paginator.render();
		  common.tplFile('store/storeproducts.tpl');
	      common.headerSet(1);
	      common.loadTemplateHeader(req,res,$arr);
      });
});
app.get(['/add/:id'],function(req,res)
{
	
	  q.all([stores.notStoreProducts(req,$arr.config.mysql,q)]).then(function(results)
      {  
	      $arr.id = req.param('id');
		  $arr.nulldata = null;
		  $arr.storeProducts = results[0][0];
		  $arr.file = 'store/addproducts.tpl';
		  common.tplFile($arr.file);
	      common.headerSet(0);
		  common.loadTemplateHeader(req,res,$arr);
          
		  
      });
});
app.get(['/feature/:id'],function(req,res)
{
	
	  q.all([stores.viewStoreFeaturedProducts(req,$arr.config.mysql,q)]).then(function(results)
      {  
	      $arr.id = req.param('id');
		  $arr.nulldata = null;
		  $arr.storeFProducts = results[0][0];	  
		  
		  $arr.file = 'store/storefproducts.tpl';
		  common.tplFile($arr.file);
	      common.headerSet(1);
		  common.loadTemplateHeader(req,res,$arr);
          
		  
      });
});
app.get(['/addproduct/:pid/:sid'],function(req,res)
{
	req.body.id = req.param('sid');
	q.all([stores.view(req,$arr.config.mysql,q)]).then(function(results)
    { 
	      req.body.id = req.param('pid');
	  if(results[0][0][0].user_id == req.session.userid)
	  {
		  stores.addStoreProducts(req,$arr.config.mysql,q);
		  res.send(JSON.stringify([]));
		  res.end();
		  return false;
		 }
	});
	  
});
app.get(['/remove/:pid/:sid'],function(req,res)
{
	req.body.id = req.param('sid');
	q.all([stores.view(req,$arr.config.mysql,q)]).then(function(results)
    { req.body.id = req.param('pid');
	  if(results[0][0][0].user_id == req.session.userid)
	  {
		  stores.removeProducts(req,$arr.config.mysql,q);
		 
	  }
	  res.writeHead(302, {
				   'Location': '/stores/view/'+req.param('sid')
				});
		res.end();return false;
	});
	  
});
app.get(['/category/:id'],function(req,res)
{
	   q.all([stores.viewStoreCategories(req,$arr.config.mysql,q)]).then(function(results)
      {  
	      $arr.id = req.param('id');
		  $arr.nulldata = null;
		  $arr.storeCategories = results[0][0];
		  console.log($arr.storeCategories);
		  common.tplFile('store/storecategory.tpl');
	      common.headerSet(1);
	      common.loadTemplateHeader(req,res,$arr);
      });
	  
});
app.post(['/update/'],function(req,res)
{
	common.checkLogin(req,res,0);
	req.body.id = req.param('sid');
	q.all([stores.view(req,$arr.config.mysql,q)]).then(function(results)
    { 
	    req.body.logo = results[0][0][0].logo;
	    req.body.banner = results[0][0][0].banner;
		if(typeof(req.files.store_banner_image) !== 'undefined')
		{
			var fs = require('fs');
			console.log($arr.config.paths.path+'public/uploads/stores/'+req.files.store_banner_image.name);
			console.log(fs.readFileSync($arr.config.paths.path+'public/uploads/store/'+req.files.store_banner_image.name, 'binary'));
		
		    var im = require('imagemagick');
			
			im.crop({
				  srcPath: $arr.config.paths.path+'public/uploads/store/'+req.files.store_banner_image.name,
				  dstPath: $arr.config.paths.path+'public/uploads/store/banner_'+req.files.store_banner_image.name,
				  width: 1078,
				  height: 192,
				  quality: 1,
				  gravity: "Center"
				}, function(err, stdout, stderr){
				  // foo 
				});
		}
		stores.updateStores(req,$arr.config.mysql,q);
		res.writeHead(302, {
				   'Location': '/stores/view/'+req.param('sid')
				});
		res.end();return false;
	});
});
app.get(['/edit/:id'],function(req,res)
{
	common.checkLogin(req,res,0);
	   q.all([stores.view(req,$arr.config.mysql,q)]).then(function(results)
      {  
	      $arr.id = req.param('id');
		  $arr.nulldata = null;
		  $arr.store = results[0][0][0];
		  console.log($arr.store);
		  console.log($arr.storeCategories);
		  common.tplFile('store/edit.tpl');
	      common.headerSet(1);
	      common.loadTemplateHeader(req,res,$arr);
      });
	  
});
app.get(['/view/:id'],function(req,res)
{

      q.all([stores.view(req,$arr.config.mysql,q),stores.viewStoreProducts(req,$arr.config.mysql,q,1),stores.viewStoreCategories(req,$arr.config.mysql,q),stores.viewStoreFeaturedProducts(req,$arr.config.mysql,q),stores.viewStoreProducts(req,$arr.config.mysql,q,0)]).then(function(results)
      {
      	console.log(3);
		  if(results[0][0].length == 0)
		  {
			  res.writeHead(302, {
			   'Location': '/'
			  });
			  res.end();return false;
		  }
		  $arr.nulldata = null;
		  $arr.store = results[0][0][0];
		  $arr.storeProducts = results[1][0];
		  $arr.storeCategories = results[2][0];
		  $arr.storeFProducts = results[3][0];
		  $arr.paginations = results[4][0];
		  //$arr['pagination'] = products.shortDescribe(results[1][0]).length;
			var pagination = require('pagination');
	        var paginator = new pagination.SearchPaginator({
	            prelink: 'javascript:paginationStore',
	            current: req.body.page,
	            rowsPerPage: 15,
	            totalResult: $arr.paginations.length,
	            ajax: true
	        });
         $arr['pagination_html'] = paginator.render();
		  common.tplFile('store/view.tpl');
	      common.headerSet(1);
	      common.loadTemplateHeader(req,res,$arr);
      });
});
module.exports = app;