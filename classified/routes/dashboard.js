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
var common = require('../module/common');
var app = express.Router();
var q = require('q');
var mysqli = require('../module/mysqli');
var dashboard = require('../module/dashboard');
var cryptos =  require('../module/crypto.js');

//required js
var configure = require('../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
}

app.use(function(req,res,next)
{
  common.checkLogin(req,res,0);
  products = require('../module/products');    
  next();
});

app.post('/cc',function(req,res,callback){

  var braintrees = require('../module/braintrees');
  global.bgateway.mysql = $arr.config.mysql;        
  braintrees.saveCreditCard(global.bgateway,req,res,refreshCallback);
  function refreshCallback(err,resp)
  {
    if(err == 0)
    {
      res.writeHead(302,{'Location':'/dashboard/payment/cc/'+resp});
      res.end();return false;return false;          
    }
    else
    {
      res.writeHead(302,{'Location':'/dashboard/payment/cc/Card details has been updated successfully'});
      res.end();return false;return false;
    }  
  }         
});

app.get(['/payment/saved'],function(req,res) {
   creditcard = require('../module/creditcard');
   q.all([creditcard.AllMyPayments(req,$arr.config.mysql,q)]).then(function(results)
   {
         $arr.creditCards = results[0][0];
         common.tplFile('savedpayments.tpl');
         common.headerSet(1);
         common.loadTemplateHeader(req,res,$arr);
   });
});

app.get(['/feedback'],function(req,res) {
  var bids = require('../module/bid');
  var data = bids.SearchPageNo(req,config.mysql,q);

  req.body.page = data.dspage;
  req.body.perlimit = 5;
  q.all([dashboard.listfeedback(req,$arr.config.mysql,q,1),dashboard.listfeedback(req,$arr.config.mysql,q,0),dashboard.listfeedbackrating(req,$arr.config.mysql,q)]).then(function(results)
    {
      $arr.feedbacks=results[0][0];
      $arr.ratings = results[2][0];
      $arr['pagination'] = results[1][0].length;
       console.log('pagiation:'+$arr['pagination']);
      var pagination = require('pagination');
     
      var paginator = new pagination.SearchPaginator({prelink:'/dashboard/feedback', current: req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
      $arr['pagination_html'] = paginator.render(); 

      common.tplFile('feedback_1.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);

    });
});
	app.get(['/deletesearch/:id'],function(req,res)
{
      req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
          q.all([products.deleteSearch(req,config.mysql,q,1)]).then(function(results){
            res.writeHead(302, {
              'Location': '/dashboard/searchitems'
            });
            res.end();
            return false;
          }); 

});
app.get(['/searchitems/','/searchitems/:page'],function(req,res)
{
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    var products = require('../module/products');
    q.all([products.savedsearch(req,config.mysql,q,1),products.savedsearch(req,config.mysql,q,0)]).then(function(results){
     
		$arr['pagination'] = results[0][0].length;
		$arr['searchlist'] = results[1][0];
    var pagination = require('pagination');
     fquery = '';
     if(typeof(req.param('cmd')) !== 'undefined')
     {
         fquery = '?cmd='+req.param('cmd');
     } 
		var paginator = new pagination.SearchPaginator({prelink:'/dashboard/searchitems/'+fquery, current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});
	
		$arr['pagination_html'] = paginator.render(); 
	
		common.tplFile('searchitems.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
	});
});


app.get(['/notification_manager'],function(req,res)
{

   //q.all([dashboard.notification_types(req,$arr.config.mysql,q)]).then(function(notifi)
  // {
    // $arr.notifications=notifi[0][0];
      common.tplFile('notification_manager.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);

  // });



});

	
app.get(['/referrals'],function(req,res)
{
	  common.tplFile('referrals.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
});
	
app.get(['/payment/cc','/payment/cc/:error'],function(req,res){
	  var braintrees = require('../module/braintrees');
	  braintrees.generateToken(global.bgateway,templateCallback,req);
	  function templateCallback(err,response)
	  {
			 $arr.clientToken = response.clientToken;
			 $arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
			 common.tplFile('creditcard.tpl');
			 common.headerSet(1);
			 common.loadTemplateHeader(req,res,$arr);
	  }     
});

app.get(['/payment/paypal','/payment/paypal/:error'],function(req,res){
	 var braintrees = require('../module/braintrees');
	  braintrees.generateToken(global.bgateway,templateCallback,req);
	  function templateCallback(err,response)
	  {
			 $arr.clientToken = response.clientToken;
			 $arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
			 common.tplFile('paypal.tpl');
			 common.headerSet(1);
			 common.loadTemplateHeader(req,res,$arr);
	  }     
});


app.post('/feature/', function(req, res){
  
  projects = require('../module/products');
  var price = global.general.feature_listing_fee;
  var brain_cust_id = global.bcustomer_prefix+req.session.userid;
  
  q.all([projects.productDetail(req,config.mysql,q)]).then(function(result)
  {
     pid = result[0][0][0];
     
     var ml = global.bgateway.transaction.sale({
                amount: price,
                paymentMethodNonce: req.param('paymentMethodNonceInputField'),
                options: {
                      submitForSettlement: true
                }
              }, function (err, result) {
                     if(result.success)
                     {
                        if(result.transaction.status)
                        {
                            projects.updateFeatureData(req,config.mysql,q,req.body.id);
                            payments = require('../module/payment');                           
                            payments.transactionid = 0;
                            payments.gateway = 'account';
                            payments.sessionsdata = [];
                            payments.sessionsdata.title = pid.title;
                            payments.sessionsdata.email = req.session.email;
                            payments.sessionsdata.url = config.url+'/product/view/'+pid.id;
                            payments.sessionsdata.userid = req.session.userid;
                            payments.sessionsdata.first_name = req.session.first_name;
                            payments.sessionsdata.last_name = req.session.last_name;
                            payments.payid = pid.id;
                            payments.type = 'feature fee';
                            payments.name = pid.title;
                            payments.amount = price;
                            payments.insertInvoice();
                            if(pid.market_status != 'draft')
                            {
                                res.writeHead(302,{'Location':'/dashboard/my'});
                                res.end();return false;return false;
                            }
                            else
                            {
                                res.writeHead(302,{'Location':'/dashboard/my?cmd=draft'});
                                res.end();return false;return false;
                            }
                          }
                          else
                          {
                                $arr['error'] = result.transaction.processorResponseText;
                               res.writeHead(302, {
                                   'Location': '/dashboard/feature/'+req.param('id')+'/'+$arr['error']
                               });
                               res.end();return false;
                          }  
                     }
                     else
                     {
                        $arr['error'] = '';
                        
                        $arr['error'] += result.message;
                        
                        res.writeHead(302, {
                               'Location': '/dashboard/feature/'+req.param('id')+'/'+$arr['error']
                        });
                        res.end();
                        return false;
                     } 
              });
        
      });           

});

app.get(['/feature/:id','/feature/:id/:error'],function(req, res){  
		projects = require('../module/products');
		var brain_cust_id = global.bcustomer_prefix+req.session.userid;
		var s = global.bgateway.customer.find(brain_cust_id, function(err, customer) {});
		$arr.error = (typeof(req.body.error) === 'undefined') ? '' : req.body.error;
		q.all([projects.productDetail(req,config.mysql,q)]).then(function(result)
		{
		var braintrees = require('../module/braintrees');
		 braintrees.generateToken(global.bgateway,generateToken,req);               
		   function generateToken(err,response)
		   {
			   $arr.projects = result[0][0][0]; 
			   $arr.id = req.param('id');
			   $arr.amount = global.general.feature_listing_fee;
			   $arr.clientToken = response.clientToken;
			   $arr.externalcss = ['buyer2'];
			   common.tplFile('feature.tpl');
			   common.headerSet(1);
			   common.loadTemplateHeader(req,res,$arr);
		   }
		}); 
});


app.post('/product/save', function(req, res) { 
   var attach = require('../module/attach');
   var admin = require('../module/admin');
   projects = require('../module/products');
   req.body.id = (typeof(req.body.id) === 'undefined') ? 0 : req.body.id;
   if(req.body.id > 0)
   {
    admin.deleteAttachment(config.mysql,q,req);
    q.all([projects.productDetail(req,config.mysql,q)]).then(function(result)
     {
		  projects.saveProduct(req,config.mysql,q,result[0][0][0]);
		  if(typeof(req.files.product_image) !== 'undefined')
		  {
			var m =req.files.product_image;

			if(typeof(m[0]) !== 'undefined')
			{  
			  for(var im = 0;im < m.length;im++){
				admin.addAttachment(m[im],config.mysql,q,req.body.id);      
			  }
			}
			else
			{
			  admin.addAttachment(m,config.mysql,q,req.body.id);
			}  
		   }
		   if(req.body.featured == 1 && result[0][0][0].feature == 0)
		   {
			 res.writeHead(302,{'Location':'/dashboard/feature/'+req.body.id});

			 res.end();return false;return false;
		   }
		   if(typeof(req.body.save) !== 'undefined')
			{
				res.writeHead(302,{'Location':'/dashboard/my'});
				res.end();return false;return false;
			}
			else
			{
				res.writeHead(302,{'Location':'/dashboard/my?cmd=draft'});
				res.end();return false;return false;
			}
      }
    );
    
   }  
   else
   {      
       attach.save('product',req,res);
       q.all(projects.save(req,res,config.mysql,q)).then(function(l)
       {
        req.body.p_id=l[0].insertId;
          if(typeof(req.files.product_image) !== 'undefined')
          {
            var m =req.files.product_image;
            if(typeof(m[0]) !== 'undefined')
            {  
              for(var im = 0;im < m.length;im++)      {
                 admin.addAttachment(m[im],config.mysql,q,l[0].insertId);      
              }
            }
            else
            {
              admin.addAttachment(m,config.mysql,q,l[0].insertId);
            }  
          }  

 		  var cat_name= '';

          q.all([products.getcategory(req,config.mysql,q)]).then(function(cat) {
            
			 req.body.cat_name = cat[0][0][0].name;
             var cat_name= cat[0][0][0].name;
             q.all([products.categoryusr(req,config.mysql,q)]).then(function(catusr)
             {   
                catusrs=catusr[0][0];
                email = require('../module/email');
                for(i in catusrs) { 
                   var activeurl = 'test mail';
                   req.body.first_name=catusrs[i]['first_name'];
                   req.body.last_name=catusrs[i]['last_name'];
                   req.body.email=catusrs[i]['email'];

                   var plink = '<br />To view product details .Please <a href="'+$arr.config.spath+'product/view/'+req.body.p_id+'">click here</a>';
               
				   email.sendEmail('item_added',req.body,{user:req.body.first_name+' '+req.body.last_name,activeurl:activeurl,product_name:req.body.title,cat:req.body.cat_name,link:plink, });
        		}
             });
          });
		  
          if(req.body.featured == 1) {
			 res.writeHead(302,{'Location':'/dashboard/feature/'+l[0].insertId});
			 res.end();return false;return false;
		  }          
          if(typeof(req.body.save) !== 'undefined') {
            res.writeHead(302,{'Location':'/dashboard/my'});
            res.end();return false;return false;
          }
          else {
             res.writeHead(302,{'Location':'/dashboard/my?cmd=draft'});
             res.end();return false;return false;
          }
      
       });
   } 
});

app.get('/feedback/submit',function(req,res)
{   
    $arr.externalcss = ['buyer2'];
    common.tplFile('review-confirm.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);
});

app.get('/invoice/:id',function(req,res)
{   
	$arr.externalcss = ['buyer2'];
	req.body.id = req.param('id');
	q.all([dashboard.addInvoice(req,config.mysql,q)]).then(function(results)
	{
	$arr.invoice = results[0][0][0];  
	common.tplFile('invoice.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
	}); 
});
app.post('/feedback/add',function(req,res)
{
     req.body.id = req.body.bid;
     q.all([dashboard.addFeedBack(req,config.mysql,q),dashboard.getBuynowRecord(req,config.mysql,q),dashboard.getFeedFields(req,config.mysql,q)]).then(function(results)
     {
        var m = results[0][0].insertId;
        var avg = 0;
       // var avg = parseFloat((parseInt(req.param('rating[1]'))+parseInt(req.param('rating[2]'))+parseInt(req.param('rating[4]'))+parseInt(req.param('rating[5]')))/5,2);
       var fields_count = results[2][0].length;
       var review_fields = results[2][0];
       for(var i = 0 ;i< fields_count;i++){
          console.log(fields_count);
          dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating['+results[2][0][i].id+']'),results[2][0][i].id);
          avg = avg + parseInt(req.param('rating['+results[2][0][i].id+']'));
        }
        avg = parseFloat(avg/fields_count);

        dashboard.setAverageFeedBack(req,config.mysql,q,avg,m);
         
        // dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating[2]'),2);
        // //dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating[3]'),3);
        // dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating[4]'),4);
        // dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating[5]'),5);
        dashboard.submitFeedbackCart(req,config.mysql,q); 

        projects = require('../module/products');
        req.body.id = results[1][0][0].project_id;
        q.all([projects.productDetail(req,config.mysql,q)]).then(function(resu){
           dashboard.addUserReview(req,config.mysql,q,avg,resu[0][0][0].user_id);
           res.writeHead(302,{'Location':'/dashboard/feedback/submit'});
           res.end();return false;return false;
        });
     });
});

app.get(['/payment/:action/:type/:id'], function(req, res){
   req.body.action = req.param('action');
   req.body.type = req.param('type');
   req.body.id = req.param('id');
   $arr.externalcss = ['buyer2'];
   if(req.body.action == 'feedback') {
     if(req.body.type == 'buy') {
		  q.all([dashboard.getFeedBack(req,config.mysql,q),dashboard.getFeedFields(req,config.mysql,q)]).then(function(results) {
				  $arr['projects'] = results[0][0][0];
          $arr['fields'] = results[1][0];
          $arr['fieds_count'] = results[1][0].length;

				  common.tplFile('add_bfeedback.tpl');
				  common.headerSet(1);
				  common.loadTemplateHeader(req,res,$arr);
		  }); 
      } 

   }
   if(req.body.action == 'release' || req.body.action == 'cancel')
   {
	 if(req.body.type == 'buy') {
		 q.all([dashboard.getBuynowRecord(req,config.mysql,q)]).then(function(results) {
		   if(results[0][0].length == 0)
		   {
			 res.writeHead(302,{'Location':'/dashboard/my'});
			 res.end();return false;
		   } 
		   var k = results[0][0][0];
		   if(k.user_id != req.session.userid)
		   {
			 res.writeHead(302,{'Location':'/dashboard/my'});
			 res.end();return false;
		   }
		   if(k.release == 0 && req.body.action == 'release')
		   {
			  dashboard.paymentBuyNowRelease(req,config.mysql,q,id);
			  common.tplFile('payment_released.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req,res,$arr);
		   }
		   else if(k.release == 0 && req.body.action == 'cancel')
		   {
			  dashboard.paymentBuyNowCancel(req,config.mysql,q,id);
			  common.tplFile('payment_cancelled.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req,res,$arr);
		   }
		   else if(k.release == 1)
		   {
			  common.tplFile('payment_released.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req,res,$arr);
		   }
		   else if(k.release == 2)
		   {
			  common.tplFile('payment_cancelled.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req,res,$arr);
		   } 
		 });
	 } 
     if(req.body.type == 'bid')
	 {
		 q.all([dashboard.getBidsRecord(req,config.mysql,q)]).then(function(results)
		 {
		   if(results[0][0].length == 0)
		   {
			 res.writeHead(302,{'Location':'/dashboard/my'});
			 res.end();return false;
		   } 
		   var k = results[0][0][0];
		   if(k.user_id != req.session.userid)
		   {
			 res.writeHead(302,{'Location':'/dashboard/my'});
			 res.end();return false;
		   }
		   if(k.release == 0 && req.body.action == 'release')
		   {
			  dashboard.paymentBidRelease(req,config.mysql,q,id);
			  common.tplFile('payment_released.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req,res,$arr);
		   }
		   else if(k.release == 0 && req.body.action == 'cancel')
		   {
			  dashboard.paymentBidCancel(req,config.mysql,q,id);
			  common.tplFile('payment_cancelled.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req,res,$arr);
		   }
		   else if(k.release == 1)
		   {
			  common.tplFile('payment_released.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req,res,$arr);
		   }
		   else if(k.release == 2)
		   {
			  common.tplFile('payment_cancelled.tpl');
			  common.headerSet(1);
			  common.loadTemplateHeader(req,res,$arr);
		   } 
		 });
	 } 
   } 
});

app.get(['/my/','/my/:page'], function(req, res){  
  $arr.error = '';
  var products = require('../module/products');
  var bids = require('../module/bid');
  var data = bids.SearchPageNo(req,config.mysql,q);

   req.body.page = data.dspage;
   req.body.perlimit = 5;

  //req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
  var dateFormat = require('dateformat');
  q.all([products.myproducts(req,config.mysql,q,0),products.myproducts(req,config.mysql,q,1)]).then(function(results){     
     $arr['projects'] = products.shortDescribe(results[0][0]);
     $arr['pagination'] = results[1][0].length;
     var pagination = require('pagination');
     fquery = '';
     if(typeof(req.param('cmd')) !== 'undefined')
     {
         fquery = '?cmd='+req.param('cmd');
     } 
     var paginator = new pagination.SearchPaginator({prelink:'/dashboard/my'+fquery, current:  req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
     $arr['dateFormat'] = dateFormat;
     $arr['pagination_html'] = paginator.render();
     common.tplFile('myprojects.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
    });
});

app.get(['/mysold/','/mysold/:page'], function(req, res) {  
	  $arr.error = '';  
    var bids = require('../module/bid');
	  var products = require('../module/products');
    var data = bids.SearchPageNo(req,config.mysql,q);
    // req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;

    req.body.page = data.dspage;
    req.body.perlimit = 5;

	  var dateFormat = require('dateformat');
	  q.all([products.mysoldproducts(req,config.mysql,q,0),products.mysoldproducts(req,config.mysql,q,1)]).then(function(results){ 
		 $arr['projects'] = products.shortDescribe(results[0][0]);
		 $arr['pagination'] = results[1][0].length;
		 var pagination = require('pagination');
		 fquery = '';
		 if(typeof(req.param('cmd')) !== 'undefined')
		 {
			 fquery = '?cmd='+req.param('cmd');
		 } 
		 var paginator = new pagination.SearchPaginator({prelink:'/dashboard/mysold'+fquery, current:  req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
		 $arr['dateFormat'] = dateFormat;
		 $arr['pagination_html'] = paginator.render();
		 common.tplFile('mysold.tpl');
		 common.headerSet(1);
		 common.loadTemplateHeader(req,res,$arr);	
	});
});

app.get('/product/edit/:id',function(req,res) {
	
          var products = require('../module/products');
          var dateFormat = require('dateformat');
          $arr.datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
          req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
          $arr.externalcss = ['datePicker'];
          $arr.externaljs = ['jquery.datePicker'];
          $arr['fee'] = global.general.feature_listing_fee;
          var user = require('../module/user');
          q.all([products.productDetail(req,config.mysql,q),products.productImage(req,config.mysql,q),user.userInfo(req,config.mysql,q,req.session.userid,['paypal_address','zip'])]).then(function(result)
          {
           $arr['projects'] = products.shortDescribe(result[0][0]);
           $arr.user = result[2][0][0];
           $arr['projects'] = $arr['projects'][0];
           if(new Date($arr['projects']['date_added']) < new Date($arr.datenow))
           {
            $arr.datenow =  dateFormat(new Date($arr['projects']['date_added']),"yyyy-mm-dd HH:MM:ss");
           }
            $arr['projects']['date_add']   = dateFormat(new Date($arr['projects']['date_added']),"yyyy/mm/dd HH:MM"); 
            $arr['projects']['date_close'] = dateFormat(new Date($arr['projects']['date_closed']),"yyyy/mm/dd HH:MM"); 
            $arr['image'] = result[1][0];
			if($arr['projects'].bids!=0 || $arr['projects'].sold!=0)
		    {
			  res.writeHead(302, {
				'Location': '/dashboard/my'
			  });
			  res.end();return false;
		    }
		    else
		    {
			  common.tplFile('post.tpl');
		    }
          
            common.headerSet(1);
            common.loadTemplateHeader(req,res,$arr);
          });
     
});

app.post('/withdrawal', function(req, res){
  
  user = require('../module/user');
  withdraw = require('../module/withdraw');
  if(typeof(req.body.amount) === 'undefined' || typeof(req.body.paymethod) === 'undefined' || typeof(req.body.paydetails) === 'undefined')
  {
       res.writeHead(302, {
           'Location': '/dashboard/withdrawal/error/Invalid datas'
       });
       res.end();return false;
  }  
  if(parseFloat(req.body.amount) <= 0)
   {
         res.writeHead(302, {
           'Location': '/dashboard/withdrawal/error/Amount Invalid'
          });
       res.end();return false;
   } 
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
  q.all([user.userInfo(req,config.mysql,q,req.session.userid,['balance','reserve_amount'])]).then(function(results){
         $arr['users'] = results[0][0][0];  
         $arr['users']['reserve_amount'] =  parseFloat(results[0][0][0]['balance']-results[0][0][0]['reserve_amount']);
         if($arr['users']['reserve_amount'] >= req.body.amount)
         {
                bid = require('../module/bid');
                bid.reduceBalance(req,config.mysql,q,req.body.amount);
                withdraw.addWithdraw(req,config.mysql,q);
                res.writeHead(302, {
                           'Location': '/dashboard/withdrawal/success/Withdraw Request Sent'
                });
                res.end();return false;
         } 
         else
         {
            res.writeHead(302, {
                           'Location': '/dashboard/withdrawal/error/Withdraw Amount must not be greater than available amount'
            });
            res.end();return false;
         }    
  });
  
});

app.get(['/withdrawal','/withdrawal/:action/:message'], function(req, res){
  
  withdraw = require('../module/withdraw');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
  $arr['action'] = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
  $arr['message'] = (typeof(req.param('message')) !== 'undefined') ? req.param('message') : '';
  q.all([withdraw.mywithdraw(req,config.mysql,q)]).then(function(results)
  {     $arr['withdraw'] = results[0][0];
        common.tplFile('withdrawal.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  });
  
});

app.get(['/mybids','/mybids:page'], function(req, res){
  var module = require('../module');
  var bids = require('../module/bid');
  var data = bids.SearchPageNo(req,config.mysql,q);
  
  req.body.page = data.dspage;
  req.body.perlimit = 5;
  q.all([bids.mybids(req,config.mysql,q,1),bids.mybids(req,config.mysql,q,0)]).then(function(results)
  {     $arr['pagination'] = results[1][0].length;
        $arr['mybids'] = products.shortDescribe(results[0][0]);
        var pagination = require('pagination');
        fquery = '';
        
         if(typeof(req.param('cmd')) !== 'undefined')
         {
             fquery = '?cmd='+req.param('cmd');
         } 
        var paginator = new pagination.SearchPaginator({prelink:'/dashboard/mybids'+fquery, current: data.dspage, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination'] });

        $arr['pagination_html'] = paginator.render(); 
        common.tplFile('mybids.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  });
  
});

app.get(['/mywon','/mywon:page'], function(req, res){
  
  var bids = require('../module/bid'); 
  var dateFormat = require('dateformat');
  var data = bids.SearchPageNo(req,config.mysql,q);
  req.body.page = data.dspage;
  req.body.perlimit = 5;

  q.all([bids.mywon(req,config.mysql,q,1),bids.mywon(req,config.mysql,q,0)]).then(function(results)
  {     $arr['pagination'] = results[1][0].length;
        $arr['mybids'] = products.shortDescribe(results[0][0]);
        var pagination = require('pagination');
        fquery = '';
         if(typeof(req.param('cmd')) !== 'undefined')
         {
             fquery = '?cmd='+req.param('cmd');
         } 
        var paginator = new pagination.SearchPaginator({prelink:'/dashboard/mywon'+fquery, current: data.dspage, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});

        $arr['pagination_html'] = paginator.render(); 
        common.tplFile('mywon.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  });
  
});

app.get('/watchlist/:id', function(req, res){
  
  products = require('../module/products');
  products.deleteWatchlist(req,config.mysql,q);
  req.session.watchlistdelete = true;
  res.writeHead(302, {
           'Location': '/dashboard/watchlist'
       });
       res.end();return false;
  
});

app.post(['/messages/save'], function(req, res){
  
  messages = require('../module/message'); 
  user = require('../module/user');
  
  req.body.r_id = parseInt(req.body.r_id);
  req.body.pid = 0;
  if(req.body.r_id <= 0)
  {
    q.all([common.admincpId(req,config.mysql,q)]).then(function(result)
    {
        req.body.toid = result[0][0][0]['id'];
        var dat = require('date-util'); 
        req.body.r_id = Date.parse(new Date());
        q.all([user.userInfo(req,config.mysql,q,req.body.toid,['email','first_name','last_name'])]).then(function(results)
        { 
			req.body.toemail = results[0][0][0]['email'];
			req.body.first_name = results[0][0][0]['first_name'];
			req.body.last_name = results[0][0][0]['last_name'];
			messages.addmessages(req,config.mysql,q); 
			res.writeHead(302, {
				 'Location': '/dashboard/messages/sent/'
			});
			res.end();
			return false;
        }); 
      });
  }  
  else
  {  
    q.all([messages.showmessages(req,config.mysql,q),common.admincpId(req,config.mysql,q)]).then(function(results)
    {
        $arr['messages'] = results[0][0];
        if($arr['messages'].length == 0)
        {
          res.writeHead(302, {
               'Location': '/dashboard/messages'
          });
          res.end();return false;    
        }
        if($arr['messages'][0]['from_id'] != req.session.userid && $arr['messages'][0]['to_id'] != req.session.userid)
        {
          res.writeHead(302, {
               'Location': '/dashboard/messages'
          });
          res.end();return false;
        } 
        req.body.toid = ($arr['messages'][0]['from_id'] == req.session.userid) ? $arr['messages'][0]['to_id'] :$arr['messages'][0]['from_id'];
        req.body.subject = $arr['messages'][0]['subject'];
        req.body.pid = $arr['messages'][0]['project_id'];
		
        q.all([user.userInfo(req,config.mysql,q,req.body.toid,['email','first_name','last_name'])]).then(function(results)
        { 
          req.body.toemail = results[0][0][0]['email'];
          req.body.first_name = results[0][0][0]['first_name'];
          req.body.last_name = results[0][0][0]['last_name'];  
          messages.addmessages(req,config.mysql,q);  
          res.writeHead(302, {
               'Location': '/dashboard/messages/view/'+req.body.r_id
         });
         res.end();return false;
       });
     });
    }   
});
  
app.get(['/messages/:action/:r_id'], function(req, res){
	
  $arr.externalcss = ['buyer2'];
  messages = require('../module/message');  
  req.body.r_id = (typeof(req.param('r_id')) !== 'undefined') ? req.param('r_id') : 0;
  $arr['r_id'] = req.body.r_id;
  req.body.r_id = parseInt(req.body.r_id);
  if(req.body.r_id <= 0)
  {
        res.writeHead(302, {
             'Location': '/dashboard/messages'
       });
       res.end();return false;
  }  
  req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
   $arr['action'] = req.body.action;
  if(req.body.action != 'view')
  {
     messages.movemessages(req,config.mysql,q);
     res.writeHead(302, {
             'Location': '/dashboard/messages/view/'+req.body.r_id
       });
       res.end();return false;
  }
  q.all([messages.showmessages(req,config.mysql,q)]).then(function(results)
  {

      $arr['messages'] = results[0][0];
      if($arr['messages'].length == 0)
      {
        res.writeHead(302, {
             'Location': '/dashboard/messages'
       });
       res.end();return false;
  
      }
      if($arr['messages'][0]['from_id'] != req.session.userid && $arr['messages'][0]['to_id'] != req.session.userid)
      {
        res.writeHead(302, {
             'Location': '/dashboard/messages'
       });
       res.end();return false;
      } 
      if($arr['messages'].length > 0)
      {
          req.body.r_id =$arr['messages'][0]['r_id'];
          messages.readmessages(req,config.mysql,q);
      } 
      common.tplFile('message-view.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
  });
});

app.get(['/messages','/messages/:action'], function(req, res){
  
  messages = require('../module/message');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
  req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
  $arr['action'] = req.body.action;
  if(req.body.action == 'compose')
  {
     common.tplFile('compose.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
  } 
  else
  {
    q.all([messages.mymessages(req,config.mysql,q,0),messages.mymessages(req,config.mysql,q,1),messages.mymessages(req,config.mysql,q,2)]).then(function(results)
    {
        $arr['pagination'] = results[1][0].length;
        $arr['messages']   = results[0][0];
		$arr['unreadmessage'] = results[2][0].length;

        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({prelink:'/dashboard/messages/'+req.body.action, current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});

        $arr['pagination_html'] = paginator.render(); 
        common.tplFile('messages.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
    });
  }  
});

app.get('/watchlist', function(req, res){
  
  products = require('../module/products');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
  if(typeof(req.session.watchlistdelete) !== 'undefined') {
    delete req.session.watchlistdelete;
    $arr['save'] = true;
  }  
  q.all([products.mywatchlist(req,config.mysql,q),products.totalmywatchlist(req,config.mysql,q)]).then(function(results)
  {     
  		$arr['pagination'] = results[1][0].length;
        $arr['mywatchlist'] = results[0][0];
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({prelink:'/dashboard/watchlist', current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});

        $arr['pagination_html'] = paginator.render(); 
        common.tplFile('mywatchlist.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  });
  
});

app.get('/buynow', function(req, res){
  var bids = require('../module/bid');
  var  dashboard = require('../module/dashboard');
  var data = bids.SearchPageNo(req,config.mysql,q);
  req.body.page = data.dspage;
  req.body.perlimit = 5;
  q.all([dashboard.mybuynow(req,config.mysql,q,1),dashboard.mybuynow(req,config.mysql,q,0)]).then(function(results)
  {     $arr['pagination'] = results[1][0].length;
        $arr['mybids'] = results[0][0];
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({prelink:'/dashboard/buynow', current: data.dspage, rowsPerPage: req.body.perlimit , totalResult:  $arr['pagination'] });

        $arr['pagination_html'] = paginator.render(); 
        common.tplFile('mybids.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  });
  
});

app.get('/wonauctions', function(req, res){
  
  bids = require('../module/bid');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
  q.all([bids.mywonauctions(req,config.mysql,q),bids.totalmywonauctions(req,config.mysql,q)]).then(function(results)
  {     $arr['pagination'] = results[1][0].length;
        $arr['mybids'] = results[0][0];
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({prelink:'/dashboard/wonauctions', current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});

        $arr['pagination_html'] = paginator.render(); 
        common.tplFile('wonauctions.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  });
  
});

app.get('/review', function(req, res){

	req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
	$arr['externalcss'] =  ['bootstrap','font-awesome','star-rating',];
	$arr['externaljs'] = ['bootstrap','star-rating'];
	$arr['reviewaction'] = false;    
        
	common.tplFile('review.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);

  
});

app.post('/review', function(req, res){
  
  review = require('../module/review');
  q.all([review.reviewAdd(req,config.mysql,q)]).then(function(results)
  {
       $arr['reviewaction'] = true;    
         res.writeHead(302, {
             'Location': '/reviews'
       });
       res.end();return false;
  });
  
});

app.get('/transactions', function(req, res){
  
  invoices = require('../module/invoices');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
  q.all([invoices.mytransactions(req,config.mysql,q),invoices.totalmytransactions(req,config.mysql,q)]).then(function(results)
  {    
        $arr['pagination'] = results[1][0].length;
        $arr['transaction'] = results[0][0];
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({prelink:'/dashboard/transactions', current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});

        $arr['pagination_html'] = paginator.render(); 
        common.tplFile('transactions.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  });
  
});

app.get('/invoices/:id', function(req, res){
  
  invoices = require('../module/invoices');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
  q.all([invoices.viewTransactions(req,config.mysql,q)]).then(function(results)
  {            
        $arr['transaction'] = results[0];
        common.tplFile('invoices.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  });
  
});


app.get('/password', function(req, res){
        
        common.tplFile('passwordchange.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
  
});

app.post('/changepassword', function(req, res){
	$arr['save'] = true;
	mysql = config.mysql;
	var md5 = require('MD5');
	var password_salt = '12345'
	var password = md5(md5(req.body.new_password)+password_salt);
	strQuery = mysqli.mysqli($mysqli,57);      
    
    if(typeof(req.body.isajax) !='undefined' && req.body.isajax == 1)
    {
		
      $mysqli = {username:req.session.email};
      strQuery = mysqli.mysqli($mysqli,0);  
    
      query =  mysql.query(strQuery, function (error, results, fields)
      {
        if(results.length > 0)
        {
          result = results[0]; 
          result.password = md5(md5(req.param('password'))+result['password_salt']);
          if(result.password == result.password_hash)
          { 
			res.json(1);
			return false;  
          }
          else
          {
			res.json(0);
			return false; 
          }
        }
      });        
    }
    else
    {      
		$mysqli = {};
		var defered = q.defer();
		escape_data = [password,password_salt,req.session.email];
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		res.writeHead(302, {
		 	'Location': '/dashboard/password'
		});
		res.end();
		return false;
	}
  
});

app.get('/Myaddress', function(req, res){  
	q.all([dashboard.getAddresses(req,config.mysql,q,'shipping'),dashboard.getAddresses(req,config.mysql,q,'billing')]).then(function(results)
	{ 
		$arr['shipping'] = results[0][0][0];
		$arr['billing'] = results[1][0][0];
		common.tplFile('Addresses.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);     
	});
});

app.get('/payments', function(req, res){
  
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    $arr.externalcss = ['buyer2','change_psd'];        
    q.all([dashboard.getPayments(req,config.mysql,q),dashboard.getAllPayments(req,config.mysql,q)]).then(function(results)
    { 
		 $arr['payments'] = results[0][0];
		 
		 $arr['cnt'] = results[1][0].length;
		 var pagination = require('pagination');
		 
		 var paginator = new pagination.SearchPaginator({prelink:'/dashboard/payments', current:  req.body.page, rowsPerPage: 15, totalResult: $arr['cnt']});
		 $arr.pagination_html = paginator.render();;
		 common.tplFile('payments.tpl');
		 common.headerSet(1);
		 common.loadTemplateHeader(req,res,$arr);     
    });
});

app.get('/paymentexport', function(req, res){
  
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    $arr.externalcss = ['buyer2','change_psd'];        
    q.all([dashboard.getCsvPayments(req,config.mysql,q)]).then(function(result)
    { 
         var k = result[0][0].length;
         resultk = result[0][0];
         var j = 0;  
         arr = [];
         data2 = ['InvoiceId','Project Title','Type','Status','Amount','Date Added','Paid Date'];
         arr.push(data2) ;
         for (i in resultk)
         {
              j++;
              data2 = [resultk[i]['id'],resultk[i]['description'],resultk[i]['type'],resultk[i]['istatus'],resultk[i]['amount'],resultk[i]['date_add'],resultk[i]['date_paid']];
              arr.push(data2) ;
         }
         res.setHeader('Content-disposition', 'attachment; filename=report.csv');
         res.csv(arr); 
    });
       
  
});

app.post('/Myaddress', function(req, res){
  
  q.all([dashboard.getAddresses(req,config.mysql,q,req.body.type)]).then(function(results){ 
     if(results[0][0].length > 0)
     var doauction = 'update';
     else
     var doauction = 'save'; 
      q.all(dashboard.saveaddress(req,config.mysql,q,doauction)).then(function(results)
      {          
         res.writeHead(302, {
           'Location': '/dashboard/Myaddress'
         });
         res.end();return false;
      });
    });
  
});

app.get('/Address/:type', function(req, res){
    $arr['shipping'] = '';
    req.body.type = (typeof(req.param('type')) !== 'undefined') ? req.param('type') : 'shipping'; 
    q.all([dashboard.getAddresses(req,config.mysql,q,req.body.type)]).then(function(results)
    { 
     if(results[0][0].length > 0)
     $arr['shipping'] = results[0][0][0];
     
     $arr['type'] = req.body.type ;
     common.tplFile('Myaddress.tpl');
	 common.headerSet(1);
	 common.loadTemplateHeader(req,res,$arr);     
    });
});


app.get('/referral', function(req, res){
  
    $arr['referral'] = $arr['referrallink'] =  '';    
    q.all(dashboard.getReferral(req,config.mysql,q,0)).then(function(results)
    {
		$arr['referrallink'] = cryptos.encrypt(req.session.userid.toString()); 
		$arr['referral'] = results[0];
		common.tplFile('referral.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);     
    });
      
});

app.get('/autobid', function(req, res) {
    $arr['referral'] = $arr['referrallink'] = $arr['Autobids'] = $arr['project'] =    '';   
    q.all([dashboard.getOpenProjects(req,config.mysql,q),dashboard.fetchAutobidlist(req,config.mysql,q)]).then(function(results)
    {     
		$arr['project'] = results[0][0];
		$arr['Autobids'] = results[1][0];
		common.tplFile('autobid.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);     
    });      
});

app.get('/', function(req, res){  
  res.writeHead(302, {
           'Location': '/'
         });
  res.end();return false;       
});

app.post('/autobid', function(req, res){
    q.all(dashboard.checkAutobid(req,config.mysql,q)).then(function(results){  
    if(results[0].length == 0)
    {
    q.all(dashboard.saveAutobid(req,config.mysql,q));
    }   
     res.writeHead(302, {
	   'Location': '/dashboard/autobid'
	 });
	 res.end();return false;    
    }); 
});

app.get('/RemoveAddress/:type', function(req, res){
    $arr['shipping'] = '';
    req.body.type = (typeof(req.param('type')) !== 'undefined') ? req.param('type') : 'shipping'; 
    q.all([dashboard.removeAddresses(req,config.mysql,q,req.body.type)]).then(function(results)
    {     
		res.writeHead(302, {
			'Location': '/dashboard/Myaddress'
		});
		res.end();return false;    
	});
});

module.exports = app;