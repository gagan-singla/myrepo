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
var reload = require('reload');
var sprintf = require('sprintf').sprintf;
var common = require('../module/common');
var register = require('../module/register'); 
var app = express.Router();
var q = require('q');


//required js
var configure = require('../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
}




app.post('/srini', function(req, res){
   users = require('../module/userdata');
	q.all([users.userdeals(req,$arr.config.mysql,q)]).then(function(results)
	{ 
		
		  $arr.deals = results[0][0];
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
		  res.writeHead(302, {
               'Location':  '/srini'
              });
        res.end();return false;
		
	});
});


app.get('/srini', function(req, res){
   users = require('../module/userdata');
   common.tplFile('userdata.tpl');
	q.all([users.getdata(req,$arr.config.mysql,q)]).then(function(results)
	{ 
		
		  $arr.getrecord = results[0][0];
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
		 common.tplFile('userdata.tpl');
	});
});

app.get('/phonecheckup',function(req,res)
{
	$arr.phonecheckup = 1;
	if(req.session.keysuccess) {
		$arr.phonecheckup = 0;
	}  
	$arr.register_error = '';
	$arr.register_fail = 0;
	$arr.login_error = '';
	$arr.login_fail = 0;
	$arr['registerdata'] = req.cookies;
	if(typeof(req.session.keyadded) !== 'undefined') {
		var dateFormat = require('dateformat');
		datge = new Date();
		var dateFormat = require('dateformat');
		dump = new Date(req.session.keyadded);
		var difference = dump.getTime() - datge.getTime();
		var daysDifference = Math.floor(difference/1000/60/60/24);
		difference -= daysDifference*1000*60*60*24
		var hoursDifference = Math.floor(difference/1000/60/60);
		difference -= hoursDifference*1000*60*60
		var minutesDifference = Math.floor(difference/1000/60);
		difference -= minutesDifference*1000*60;
		if(difference > 1)
		{
			delete req.session.keyadded;
		}  
	} 
	if(req.cookies.cookieemail)
	{
		$arr['cookieemail'] = req.cookies.cookieemail ;
		$arr['cookiepassword'] = req.cookies.cookiepassword ;
	}
	res.clearCookie('email');
	res.clearCookie('first_name');
	res.clearCookie('last_name');
	res.clearCookie('password');
	if(typeof(req.param('error')) !== 'undefined')
	{
		$arr.register_error = req.param('error');
		$arr.register_fail  = 1;
	}
	if(typeof(req.param('lerror')) !== 'undefined')
	{
		$arr.login_error = req.param('lerror');
		$arr.login_fail  = 1;
	}
	var module = require('../module');
	
	$arr.pagetitle = 'home';
	$arr.ptitle = 'index';
	var products = require('../module/products');
	q.all([products.dealsProducts(req,$arr.config.mysql,q),products.bestSellersProducts(req,$arr.config.mysql,q),products.productCategoryItems(req,$arr.config.mysql,q,1),products.productCategoryItems(req,$arr.config.mysql,q,3)]).then(function(results)
	{  
	
		var fs = require('fs')
		, ini = require('ini');
		
		var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
		var mode = configed['section']['mode']['Maintenance_mode'];
		
		$arr.deals = results[0][0];
		$arr.sellers = results[1][0];
		$arr.cat1 = results[2][0];
		$arr.cat2 = results[3][0];
		$arr.mode=mode;
		if(mode =='yes'){
			common.tplFile('maintenance.tpl');
		}
		else{
		 	common.tplFile('home.tpl');
		}
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
	});
});

app.post('/phone_setup_code',function(req,res) {

  if(req.session.key == req.param('key'))
  {
    req.session.keysuccess = true;
    var dateFormat = require('dateformat');
    datge = new Date();
    req.session.keyadded = datge;
    res.send(JSON.stringify({'error':false}));
  }  
  else
  {
    res.send(JSON.stringify({'error':true}));
  }  
   res.end();
   return false;
});

app.post('/phone_setup',function(req,res)
{
	var accountSid = 'ACa12477e734ee8b6fc2d4ef4104003420'; 
	var authToken = '4f8794f8562dd3dc07b82066c4af926a';  
 
	//require the Twilio module and create a REST client 

	var client = require('twilio')(accountSid, authToken); 	
	common.demoFormSubmit(req,config.mysql,q);
	var key = req.session.key = Math.floor(Math.random() * 90000) + 10000;
	
	client.calls.create({  
		to: req.param('address'),
		from: "+12144777038", 
		url: "http://auctionsoftwaremarketplace.com:2001/product/digitalcode?key="+key,  
		method: "GET",  
		fallbackMethod: "GET",  
		statusCallbackMethod: "GET",    
		record: "false" 
	}, function(err, call) { 
		  if(err === null) {
			res.send(JSON.stringify({'error':false}));
			res.end();
			return false;
		  } 
		  else  {
			res.send(JSON.stringify({'error':true,'message':err.message}));
			res.end();
			return false;
		  } 
	 });
});

app.get('/servertime',function(req,res)
{
  var dateFormat = require('dateformat');
  datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
  res.send(datenow);
  res.end();
  return false;

});

app.post('/paypal/pay/',function(req,res) {
  if(typeof(req.body.secretkey) !== 'undefined' && req.body.secretkey == 'YTMNSRXYZ#$%%RMNOP') {   
      req.body.success = true;
      var admin = require('../module/admin');
      var m = JSON.parse(req.body.payer);
      var k = [];
      for(i in m)
      {
        k.push(m[i]['id']);
        admin.updatePaid(res,config.mysql,q,m[i]['id']);
      }  
      var ks = k.join(',');
      res.end();return false; 
  }
  else
  {
      res.end();return false;
  }  
});

app.post('/paypal/pkey/',function(req,res)
{
  if(typeof(req.body.secretkey) !== 'undefined' && req.body.secretkey == 'YTMNSRXYZ#$%%RMNOP') {   
    var fs = require('fs')
    , ini = require('ini');
  
	var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
	configed['section']['paypal']['preapproval_key'] = req.body.key;
	fs.writeFileSync('./config.ini', ini.stringify(configed));
	var configure = require('../../configure');
	var config = configure.app();
    $arr = {
      config : config
    }
  } 
});

app.get('/location/:type/:val',function(req,res)
{
 if(req.param('type') == 'country') {
      q.all([common.fetchStates(config.mysql,req.param('val'))]).then(function(results)
      {
          var states = results[0][0];
          res.send(JSON.stringify(states));
          res.end();
      });      
 }
 if(req.param('type') == 'state')
 {
      q.all([common.fetchStates(config.mysql,req.param('val'))]).then(function(results)
      {
          var cities = results[0][0];
          res.send(JSON.stringify(cities));
          res.end();
      });
 } 
});

app.get('/home',function(req,res)
{
	$arr.register_error = '';
	$arr.register_fail = 0;
	$arr.login_error = '';
	$arr.login_fail = 0;
	$arr['registerdata'] = req.cookies;
    if(req.cookies.cookieemail)
     {
       $arr['cookieemail'] = req.cookies.cookieemail ;
       $arr['cookiepassword'] = req.cookies.cookiepassword ;
     }
	res.clearCookie('email');
	res.clearCookie('first_name');
	res.clearCookie('last_name');
	res.clearCookie('password');
	if(typeof(req.param('error')) !== 'undefined')
	{
		$arr.register_error = req.param('error');
		$arr.register_fail = 1;
	}
	if(typeof(req.param('lerror')) !== 'undefined')
	{
		$arr.login_error = req.param('lerror');
		$arr.login_fail = 1;
	}
	var module = require('../module');
	$arr.pagetitle = 'home';
	$arr.ptitle = 'index';
	function processIndex(row)
	{
		common.processIndex(row,req,res,$arr);
	}
    $arr.projects = module.projects(config.mysql,processIndex);
});

app.get('/customer',function(req,res) {
     customerio = require('../module/customerio');
     req.body.email = 'kkr@gmail.com';
     req.body.first_name ='as';
     req.body.last_name = 'bs';
     customerio.uid = '12';
     customerio.inits();
     customerio.createCustomer({email:req.body.email,user:{firstName:req.body.first_name,lastName:req.body.last_name}});
     customerio.sendEmail({event:'Signed Up',content:{user:req.body.first_name+' '+req.body.last_name}});
});

app.get(['/bidhistory/:id'], function(req, res){
   bids = require('../module/bid');
   q.all([bids.bidHistory(req,config.mysql,q,0)]).then(function(results){
           $arr.bids = results[0][0]; 
           common.tplFile('bidhistory.tpl');
           common.headerSet(0);
           common.loadTemplateHeader(req,res,$arr);
   });
});

app.get(['/activate/:id'], function(req, res){
  var index = require('../module');
  index.activateAccount(req,config.mysql,q);
  res.writeHead(302, {
               'Location':  '/login/?error=4'
              });
        res.end();return false;
});
app.get('/classified', function(req, res){
  common.tplFile('classified.tpl');
  
  common.headerSet(1);
  common.loadTemplateHeader(req,res,$arr);
});

app.get(['/','/reg/:error','/log/:lerror','/reg/','/log/'], function(req, res){
    
    console.log(2222);
    
	$arr.register_error = '';
	$arr.register_fail = 0;
	$arr.login_error = '';
	$arr.login_fail = 0;
        Recaptcha = require('recaptcha').Recaptcha; 
        
        //  var PUBLIC_KEY  = config.captachapublickey,
       //  PRIVATE_KEY = config.captachaprivatekey;
         
          var PUBLIC_KEY  = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
         PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';
         
         console.log(PUBLIC_KEY+'&&'+PRIVATE_KEY);
	 var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
	 $arr.captchahtml = recaptcha.toHTML();
         
       console.log($arr.captchahtml);
        
	$arr['registerdata'] = req.cookies;
	if(req.cookies.cookieemail)
	{
		$arr['cookieemail'] = req.cookies.cookieemail ;
		$arr['cookiepassword'] = req.cookies.cookiepassword ;
	}
	res.clearCookie('email');
	res.clearCookie('first_name');
	res.clearCookie('last_name');
	res.clearCookie('password');
	if(typeof(req.param('error')) !== 'undefined')
	{
		$arr.register_error = req.param('error');
		$arr.register_fail  = 1;
	}
	if(typeof(req.param('lerror')) !== 'undefined')
	{
		$arr.login_error = req.param('lerror');
		$arr.login_fail  = 1;
	}

	var module = require('../module');
	$arr.pagetitle = 'home';
	$arr.ptitle = 'index';


	var products = require('../module/products');
	q.all([products.dealsProducts(req,$arr.config.mysql,q),products.bestSellersProducts(req,$arr.config.mysql,q),products.productCategoryItems(req,$arr.config.mysql,q,1),products.productCategoryItems(req,$arr.config.mysql,q,3)]).then(function(results)
	{  
		console.log(3);
	var fs = require('fs')
	, ini = require('ini');
	
        //   console.log('checking products end');
        
	var configed = ini.parse(fs.readFileSync('./classified/config.ini', 'utf-8'));
        
      //  console.log('checking products end1');
        
	var mode = configed['section']['mode']['Maintenance_mode'];
	console.log(mode);
      //     console.log('checking products end1');
        
	 //   console.log('checking products end');

	$arr.deals = results[0][0];
	$arr.sellers = results[1][0];
	$arr.cat1 = results[2][0];
	$arr.cat2 = results[3][0];
	console.log(7);
	$arr.mode=mode;
	if(mode =='yes')
	{
		common.tplFile('maintenance.tpl');
	}
	else{
		common.tplFile('home.tpl');
	}
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
	});
});

app.get('/language', function(req, res){
var module = require('../module');
$arr.ptitle = 'index';
$arr.pagetitle = 'Live Auctions';
  function processIndex(row)
  {
    common.processIndex(row,req,res,$arr);
  }
   $arr.projects = module.live(config.mysql,processIndex);  
});

app.get('/live', function(req, res){
	var module = require('../module');
	$arr.ptitle = 'index';
	$arr.pagetitle = 'Live Auctions';
	function processIndex(row)
	{
		common.processIndex(row,req,res,$arr);
	}
	$arr.projects = module.live(config.mysql,processIndex);  
});

app.get('/db',function(req,res)
{
  config.mysql.query("CREATE TABLE IF NOT EXISTS `reviews` ( `id` int(100) NOT NULL AUTO_INCREMENT, `user_id` int(100) NOT NULL, `subject` varchar(100) NOT NULL, `message` varchar(100) NOT NULL, `date_added` datetime NOT NULL, `rating` int(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1",function(){res.end('Hi')});
});

app.get('/privacy',function(req,res)
{
     admin = require('../module/admin');
     req.body.id = 5;
     q.all([admin.showstaticContent(req,res,config.mysql,q)]).then(function(results){
     $arr.externalcss = ['home_1'];
     $arr['content'] = results[0][0][0];
     common.tplFile('static_pages.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   });
});

app.get('/termcondition',function(req,res)
{
     common.tplFile('termcondition.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
});

app.get('/search', function(req, res){
  $arr['externalcss'] = ['ds-forms'];
  var dateFormat = require('dateformat');
      $arr.ajaxurl = (typeof(req.param('ajaxurl')) !== 'undefined') ? req.param('ajaxurl') : '';


  var module = require('../module');
    $arr.pagetitle = 'Search Projects';
    $arr.ptitle = 'search';
    $arr.cid_search = (typeof(req.param('cid')) !== 'undefined') ? req.param('cid') : 0;
    $arr.search_search = (typeof(req.param('search')) !== 'undefined') ? req.param('search') : '';
    $arr.pid_search = (typeof(req.param('projectid')) !== 'undefined') ? req.param('projectid') : 0;
    $arr.images_search = (typeof(req.param('images')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.freeshipping = (typeof(req.param('freeshipping')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.titlesonly = (typeof(req.param('titlesonly')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.uid = (typeof(req.param('uid')) !== 'undefined') ? req.param('uid') : 0;
    req.body.limit = 12;

    var data = module.searcherViaUrl(req,config.mysql,q);
   
    data.perlimit = req.body.limit;
    var products = require('../module/products');
    

    q.all([products.searchProducts(config.mysql,q,data,1),products.searchProducts(config.mysql,q,data,0)]).then(function(results){

		$arr['projects'] = [];
		
		var pagination = require('pagination');
		var paginator = new pagination.SearchPaginator({prelink:'javascript:paginationSearch', current:  data.spage, rowsPerPage: req.body.limit, totalResult: results[1][0].length,ajax : true});
		
		$arr.isbuynowsearch  = $arr.isfeaturedsearch = $arr.isauctionsearch = '';
		if(req.param('type') == '1')
		{
			$arr.isauctionsearch = 'checked';
		}
		if(req.param('type') == '2')
		{
			$arr.isbuynowsearch = 'checked';
		}
		if(req.param('type') == '3')
		{
			$arr.isfeaturedsearch = 'checked';
		} 

     $arr['pagination_html'] = paginator.render();
     $arr['projects']['project'] = products.shortDescribe(results[0][0]);

     common.tplFile('search.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
    
   });
  
});

app.post('/savesearch', function(req, res){
  data = req.param;
  console.log(req.session.userid)  
      var uid = (typeof(req.session.userid) !== 'undefined') ? req.session.userid : 0;

  if(uid===0)
  {
     res.json(0);
     return false;
  }
  else
  {
    var products = require('../module/products');
    req.body.title = req.param('title');
    q.all([products.savesearch(req,config.mysql,q)]).then(function(results){
      res.json(1);
      return false;
    });
  }
});


app.post('/search', function(req, res){

  $arr['externalcss'] = ['ds-forms'];
  var dateFormat = require('dateformat');
  var module = require('../module');

    $arr.pagetitle = 'Search Projects';
    $arr.ptitle = 'search';
    $arr.cid_search = (typeof(req.param('cid')) !== 'undefined') ? req.param('cid') : '';
    $arr.search_search = (typeof(req.param('search')) !== 'undefined') ? req.param('search') : '';
    $arr.pid_search = (typeof(req.param('projectid')) !== 'undefined') ? req.param('projectid') : 0;
    $arr.images_search = (typeof(req.param('images')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.freeshipping = (typeof(req.param('freeshipping')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.titlesonly = (typeof(req.param('titlesonly')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.uid = (typeof(req.param('uid')) !== 'undefined') ? req.param('uid') : 0;
    req.body.limit = 12;
    var data = module.searcherViaUrl(req,config.mysql,q);
    data.perlimit = req.body.limit;
    var products = require('../module/products');
    q.all([products.searchProducts(config.mysql,q,data,1),products.searchProducts(config.mysql,q,data,0)]).then(function(results){
		 $arr['projects'] = [];
		 var pagination = require('pagination');
		 var paginator = new pagination.SearchPaginator({prelink:'javascript:paginationSearch', current:  data.spage, rowsPerPage: req.body.limit, totalResult: results[1][0].length,ajax : true});
		
		 $arr['pagination_html'] = paginator.render();
		 $arr['projects']['project'] = products.shortDescribe(results[0][0]);
		 if(typeof(req.param('ajax')) === 'undefined')
		 {
			common.tplFile('search.tpl');
			common.headerSet(1);
		 }     
		 else{
			common.tplFile('search-ajax.tpl');
			common.headerSet(0);
		 }		 
		 common.loadTemplateHeader(req,res,$arr);    
   });  
});

app.get('/winner', function(req, res){  
  var module = require('../module');
  $arr['externalcss'] = ['penny'];
  function processIndex(row)
  { 
     $arr['projects'] = row['projects'];
     common.tplFile('winner.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
  }
   $arr.projects = module.winnerProducts(req,config.mysql,processIndex);  
});

app.post('/search', function(req, res){
  
  var module = require('../module');
  function processIndex(row)
  { 
    common.processIndexajax(row,req,res,$arr);
  }
   $arr.projects = module.searcher(req,config.mysql,processIndex);
  
});

app.get('/future', function(req, res){
	$arr.pagetitle = 'Future Auctions';
	$arr.ptitle = 'future';
	var module = require('../module');
	function processIndex(row)
	{
		common.processIndex(row,req,res,$arr);
	}
	$arr.projects = module.future(config.mysql,processIndex);  
});

app.get('/closed', function(req, res){
  $arr.pagetitle = 'Closed Auctions';
  $arr.ptitle = 'closed';
  var module = require('../module');
  function processIndex(row)
  {    
    common.processIndex(row,req,res,$arr);
  }
   $arr.projects = module.closed(config.mysql,processIndex);  
});

app.get('/shop', function(req, res){
  $arr.ptitle = 'shop';
  $arr.pagetitle = 'Buy Now Auctions';
  $arr['buy_this'] = true;
  var module = require('../module');
  function processIndex(row)
  {
    common.processIndex(row,req,res,$arr);
  }
  $arr.projects = module.shop(config.mysql,processIndex);
});

app.get(['/reviews'],function(req,res)
{
  var q = require('q');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page'): 1;
  var admin = require('../module/admin');
  var pagination = require('pagination');
  $arr['externalcss'] =  ['star-rating',];
  $arr['externaljs'] = ['star-rating'];
  $arr['reviewaction'] = false; 

  q.all([admin.allreviews(req,config.mysql,q,0),admin.allreviews(req,config.mysql,q,1)]).then(function(result)
  { 
     $arr['review'] = result[0][0];
     $arr['reviews'] = result[1][0].length;
     var paginator = new pagination.SearchPaginator({prelink:'/reviews/', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['reviews']});

     $arr['pagination_html'] = paginator.render();
     common.tplFile('reviews.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   });  
});

app.get(['/how_it'],function(req,res)
{
     admin = require('../module/admin');
     req.body.id = 6;
     q.all([admin.showstaticContent(req,res,config.mysql,q)]).then(function(results){
		 $arr.externalcss = ['home_1'];
		 $arr['content'] = results[0][0][0];
		 common.tplFile('static_pages.tpl');
		 common.headerSet(1);
		 common.loadTemplateHeader(req,res,$arr);
     });   
});

app.post(['/dispute'],function(req,res){
  
  common.checkLogin(req,res,0);
  var dispute = require('../module/dispute');
  var q = require('q');

  q.all([dispute.addDispute(req,config.mysql,q)]).then(function(results)
  {
        res.writeHead(302, {
               'Location':  '/dispute/submitted'
              });
        res.end();return false;
   });
});

app.get(['/dispute','/dispute/:action'],function(req,res)
{
	var q = require('q');
	req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page'): 1;
    var admin = require('../module/admin');
  	var pagination = require('pagination');
     $arr['action_sent'] = (typeof(req.param('action')) === 'undefined') ? false : true;  
     $arr['externalcss'] =  ['star-rating',];
     $arr['externaljs'] = ['star-rating'];
     $arr['reviewaction'] = false; 
     console.log('///'+req.session.userid+'///');
     q.all([admin.reviews_dispute(req,config.mysql,q,0),admin.reviews_dispute(req,config.mysql,q,1)]).then(function(result)
  	{ 
  		$arr['review'] = result[0][0];
     	$arr['reviews'] = result[1][0].length;
    	common.tplFile('dispute.tpl');
    	common.headerSet(1);
     	common.loadTemplateHeader(req,res,$arr);

    });
   
});

app.get(['/terms'],function(req,res)
{
    admin = require('../module/admin');
    req.body.id = 4;
    q.all([admin.showstaticContent(req,res,config.mysql,q)]).then(function(results){
		$arr.externalcss = ['home_1'];
		$arr['content'] = results[0][0][0];
		common.tplFile('static_pages.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
    });

   
});

app.get(['/about'],function(req,res)
{
   admin = require('../module/admin');
   req.body.id = 1;
   q.all([admin.showstaticContent(req,res,config.mysql,q)]).then(function(results){
     $arr.externalcss = ['home_1'];
     $arr['content'] = results[0][0][0];
     common.tplFile('static_pages.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   });
});

app.get(['/about/buyers'],function(req,res)
{
     admin = require('../module/admin');
     req.body.id = 3;
     q.all([admin.showstaticContent(req,res,config.mysql,q)]).then(function(results){
		 $arr.externalcss = ['home_1'];
		 $arr['content'] = results[0][0][0];
		 common.tplFile('static_pages.tpl');
		 common.headerSet(1);
		 common.loadTemplateHeader(req,res,$arr);
     });
});

app.post(['/contact'],function(req,res) {

	var fs = require('fs')
	, ini = require('ini');
	    
	var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
    var contact_email = configed['section']['general']['contactus'];
	
   message = require('../module/message');
   q = require('q');
  
     
      var dat = require('date-util');
      //req.body.toemail = result[0][0][0]['email'];
      req.body.toemail = contact_email;
     
      // req.body.pid = 1;
      

      req.body.r_id = Date.parse(new Date())/1000;
      message.addmessages(req,config.mysql,q);
      $arr.message = 'Your message has been submitted to the admin!';
      console.log( $arr.message );
      $arr.externalcss = ['home_1'];
      common.tplFile('contactus.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
    
   
});

app.get(['/about/contacts','/contact'],function(req,res)
{
     $arr.externalcss = ['home_1'];
     common.tplFile('contactus.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);   
});

app.get(['/sellers'],function(req,res)
{  
     admin = require('../module/admin');
     req.body.id = 2;
     q.all([admin.showstaticContent(req,res,config.mysql,q)]).then(function(results){
		 $arr.externalcss = ['home_1'];
		 $arr['content'] = results[0][0][0];
		 common.tplFile('static_pages.tpl');
		 common.headerSet(1);
		 common.loadTemplateHeader(req,res,$arr);
     });   
});

app.get(['/blog/','/blog/:id'], function(req, res){
  $arr.ptitle = 'Blogs';
  req.body.id = (typeof(req.param('id')) !== 'undefined') ?  req.param('id') : 0;
  $arr.pagetitle = 'Site Blogs';
  var module = require('../module');
  var common = require('../module/common');
  function processIndex(row)
  {
    if(req.body.id > 0)
    {   
        $arr.blog = row[0][0];
        $arr.rblog = row[1];
        common.tplFile('showblog.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
    }
    else
    {
       $arr.blog = row[0];
       $arr.rblog = row[1];
        common.tplFile('bloglist.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
    }  
  }
  
  if(req.body.id > 0)
  { 
    module.showblog(req,config.mysql,processIndex);
  }
  else
  {
     module.blog(req,config.mysql,processIndex);
  }  
});


app.post('/changetheme', function(req,res)
{
   if(typeof(req.session.themeno) !== 'undefined') {
	   delete req.session.themeno;
   	   req.session.themeno =  req.body.themeno;
   }
   else {
	   req.session.themeno =  req.body.themeno;
   }
   res.writeHead(302, {
               'Location':  req.body.gopage
   });
   res.end();
   return false;
});

app.get('/remainder',function(req, res){
  var emails;
    unpaid = require('../module/unpaid');
    message = require('../module/message');
    q.all([unpaid.listmembers(req,config.mysql,q)]).then(function(results){
    console.log('List Members '+ results[0][0].length);
    if(results[0][0].length > 0){
      for(var i = 0; i <= results[0][0].length; i++) {
        details = results[0][0][i];
       
        var dat = require('date-util');
        req.body.toid = details.id;
        req.body.first_name = details.first_name;
        req.body.last_name = details.last_name;
        req.body.r_id = Date.parse(new Date())/1000;
        req.body.toemail = details.email;
        req.body.fromid = details.user_id;
        req.body.pid = details.project_id;
        req.body.subject = 'Regards Bidding  of '+details.description;
        req.body.message = 'Congratultion You won the Bid. Thank You for buying the item with us.Please make the payment of US$'+details.amount;
        message.addmessages(req,config.mysql,q);
              
        // email = require('./email');
        // email.sendEmail({event:'winner_buyer',content:{subject:subject_text,fname:firstname,tname:lastname,message:message_text,title:details.description,price:details.amount}});
        console.log(details.email);

      }
    }

  });
});


app.get(['/ajaxquestions/:cid/:pid','/ajaxquestions/:cid'],function(req,res)
{
  var q = require('q');
  req.body.pid = (typeof(req.param('pid')) === 'undefined') ? 0 : req.param('pid');
  q.all([common.categoriesAllQuestion(req,config.mysql,q),common.productQuestion(req,config.mysql,q)]).then(function(results){

           $arr.questions = results[0][0];
           $arr.answers = results[1][0];
           for(i in $arr.questions)
           {
            $arr.questions[i]['multiple'] = $arr.questions[i]['value'].split('|');
            $arr.questions[i]['values'] = [$arr.questions[i]['default']];
             for(i in $arr.answers)
             {
              if($arr.questions[i]['id'] == $arr.answers[i]['question_id'] )
              {
                $arr.questions[i]['values'] = $arr.answers[i]['value'].split(',');
              }              
             }
           }           
           common.tplFile('aquestions.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
  });  
     
});


module.exports = app;