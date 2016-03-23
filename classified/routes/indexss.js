var express = require('express');
var reload = require('reload');
var sprintf = require('sprintf').sprintf;
var common = require('../module/common');
var app = express.Router();
var q = require('q');



//required js
var configure = require('../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
}


app.get('/servertime',function(req,res)
{
  var dateFormat = require('dateformat');
  datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
  res.send(datenow);
  res.end();
  return false;

});
app.post('/paypal/pay/',function(req,res)
{
  if(typeof(req.body.secretkey) !== 'undefined' && req.body.secretkey == 'YTMNSRXYZ#$%%RMNOP')
  {   //var action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'common' : req.param('action');
      req.body.success = true;
      var admin = require('../module/admin');
      var m = JSON.parse(req.body.payer);
      var k = [];
      for(i in m)
      {
        k.push(m[i]['id']);
        admin.updatePaid(res,config.mysql,q,m[i]['id']);
      }  
      var ks = k.join(',')
      //admin.updatePaid(res,config.mysql,q,ks);
      //res.send(JSON.stringify(k));
      res.end();return false; 
  }
  else
  {
   
      res.end();return false;
  }  
});
app.post('/paypal/pkey/',function(req,res)
{
  if(typeof(req.body.secretkey) !== 'undefined' && req.body.secretkey == 'YTMNSRXYZ#$%%RMNOP')
  {   //var action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'common' : req.param('action');
   var fs = require('fs')
   , ini = require('ini');
  
   var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
   configed['section']['paypal']['preapproval_key'] = req.body.key;
   //console.log(req.body[action]);
   fs.writeFileSync('./config.ini', ini.stringify(configed));
   var configure = require('../../configure');

    //default setters
    var config = configure.app();

    $arr = {
      config : config
    }
  } 
});
app.get('/location/:type/:val',function(req,res)
{
 if(req.param('type') == 'country')
 {
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
 console.log(req.cookies);
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
console.log($arr.register_error+'as');
var module = require('../module');
 $arr.pagetitle = 'home';
 $arr.ptitle = 'index';
  function processIndex(row)
  {
    common.processIndex(row,req,res,$arr);

  }
   $arr.projects = module.projects(config.mysql,processIndex);
  
});
app.get('/customer',function(req,res)
{
     customerio = require('../module/customerio');
     req.body.email = 'kkr@gmail.com';
     req.body.first_name ='as';
     req.body.last_name = 'bs';
     console.log(12);
     customerio.uid = '12';
     customerio.inits();
     console.log(customerio.uid);
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
//
app.get(['/activate/:id'], function(req, res){
  var index = require('../module');
  index.activateAccount(req,config.mysql,q);
  res.writeHead(302, {
               'Location':  '/login/?error=4'
              });
        res.end();return false;
});
app.get(['/','/reg/:error','/log/:lerror','/reg/','/log/'], function(req, res){
	/*if(typeof(req.session.userid) !== 'undefined')
   {
	  if(!req.session.permission)
	  {
		  console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr");
			/*res.writeHead(302,{'Location':'/membership/setup'});
			res.end();return false;*/
	  }  
   }*/

 $arr.register_error = '';
 $arr.register_fail = 0;
 $arr.login_error = '';
 $arr.login_fail = 0;
 $arr['registerdata'] = req.cookies;
 console.log(req.cookies);
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
console.log($arr.register_error+'as');
var module = require('../module');
 $arr.pagetitle = 'home';
 $arr.ptitle = 'index';
  var products = require('../module/products');
 q.all([products.dealsProducts(req,$arr.config.mysql,q),products.bestSellersProducts(req,$arr.config.mysql,q),products.productCategoryItems(req,$arr.config.mysql,q,1),products.productCategoryItems(req,$arr.config.mysql,q,3)]).then(function(results)
 {  
     $arr.deals = results[0][0];
     $arr.sellers = results[1][0];
     $arr.cat1 = results[2][0];
     $arr.cat2 = results[3][0];
     common.tplFile('home.tpl');
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
   //processIndex($arr.projects);
  
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
   //processIndex($arr.projects);
  
});
app.get('/db',function(req,res)
{
  config.mysql.query("CREATE TABLE IF NOT EXISTS `reviews` ( `id` int(100) NOT NULL AUTO_INCREMENT, `user_id` int(100) NOT NULL, `subject` varchar(100) NOT NULL, `message` varchar(100) NOT NULL, `date_added` datetime NOT NULL, `rating` int(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1",function(){res.end('Hi')});
});
app.get('/privacy',function(req,res)
{
     common.tplFile('privacy.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
});

app.get('/termcondition',function(req,res)
{
     common.tplFile('termcondition.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
});

app.get('/search', function(req, res){
  //var qs = require('qs');
  //req.body = qs.parse(req.body);
  $arr['externalcss'] = ['ds-forms'];
  var dateFormat = require('dateformat');
    //$arr.datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
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
	console.log(data);
    q.all([products.searchProducts(config.mysql,q,data,1),products.searchProducts(config.mysql,q,data,0)]).then(function(results){
    //console.log(results[0][0]);
    console.log(1);
     $arr['projects'] = [];
     var pagination = require('pagination');
     var paginator = new pagination.SearchPaginator({prelink:'javascript:paginationSearch', current:  data.spage, rowsPerPage: req.body.limit, totalResult: results[1][0].length,ajax : true});
   // console.log(results[0][0]);
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
app.post('/search', function(req, res){
  //var qs = require('qs');
  //req.body = qs.parse(req.body);
  $arr['externalcss'] = ['ds-forms'];
  var dateFormat = require('dateformat');
    //$arr.datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
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
	console.log(data);
    var products = require('../module/products');
    q.all([products.searchProducts(config.mysql,q,data,1),products.searchProducts(config.mysql,q,data,0)]).then(function(results){
    //console.log(results[0][0]);
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
  //var qs = require('qs');
  //req.body = qs.parse(req.body); 
  
  var module = require('../module');
  $arr['externalcss'] = ['penny'];
  function processIndex(row)
  { 
      console.log(row);
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
  console.log(req.body);
  var admin = require('../module/admin');
  var pagination = require('pagination');
  $arr['externalcss'] =  ['star-rating',];
  $arr['externaljs'] = ['star-rating'];
  $arr['reviewaction'] = false; 
  q.all([admin.allreviews(req,config.mysql,q,0),admin.allreviews(req,config.mysql,q,1)]).then(function(result)
  { 
    //console.log(result[0][0]);
     $arr['review'] = result[0][0];
     $arr['reviews']   = result[1][0].length;
     var paginator = new pagination.SearchPaginator({prelink:'/reviews/', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['reviews']});

     $arr['pagination_html'] = paginator.render();
     common.tplFile('reviews.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   });  
});
app.get(['/how_it'],function(req,res)
{
  
   
     common.tplFile('how_it.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   
});
app.post(['/dispute'],function(req,res)
{
  
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
    $arr['action_sent'] = (typeof(req.param('action')) === 'undefined') ? false : true;
  
     $arr['externalcss'] =  ['star-rating',];
     $arr['externaljs'] = ['star-rating'];
     common.tplFile('dispute.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   
});
app.get(['/terms'],function(req,res)
{
  
   
     common.tplFile('dispute.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   
});
app.get(['/about'],function(req,res)
{
  
     $arr.externalcss = ['home_1'];
     common.tplFile('about.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   
});
app.get(['/about/buyers'],function(req,res)
{
  
     $arr.externalcss = ['home_1'];
     common.tplFile('buyers.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   
});
app.post(['/contact'],function(req,res)
{
  message = require('../module/message');
  q = require('q');
   q.all([common.admincpId(req,config.mysql,q)]).then(function(result)
    {
      req.body.toid = result[0][0][0]['id'];
      var dat = require('date-util');
      req.body.toemail = result[0][0][0]['email'];
      req.body.fromid = 0;
      req.body.pid = 0;
      req.body.r_id = Date.parse(new Date())/1000;
      message.addmessages(req,config.mysql,q);
      $arr.message = 'Your message has been submit to admin!';
      $arr.externalcss = ['home_1'];
      common.tplFile('contactus.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
    });
   
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
  
     $arr.externalcss = ['home_1'];
     common.tplFile('sellers.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   
});
app.get(['/blog/','/blog/:id'], function(req, res){
  $arr.ptitle = 'Blogs';
  req.body.id = (typeof(req.param('id')) !== 'undefined') ?  req.param('id') : 0;
  $arr.pagetitle = 'Site Blogs';
  var module = require('../module');
  var common = require('../module/common');
  function processIndex(row)
  {

   
    console.log(row);
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
	   console.log(req.session.themeno);
   }
   else {
	   req.session.themeno =  req.body.themeno;
	   console.log(req.session.themeno);
   }
   console.log(req.session.themeno+"Theme No");
   res.writeHead(302, {
               'Location':  req.body.gopage
   });
   res.end();
   return false;
});


app.get(['/ajaxquestions/:cid/:pid','/ajaxquestions/:cid'],function(req,res)
{
  var q = require('q');
  console.log("lilly");
  req.body.pid = (typeof(req.param('pid')) === 'undefined') ? 0 : req.param('pid');
  q.all([common.categoriesAllQuestion(req,config.mysql,q),common.productQuestion(req,config.mysql,q)]).then(function(results){

           $arr.questions = results[0][0];
           $arr.answers = results[1][0];
           for(i in $arr.questions)
           {
            $arr.questions[i]['multiple'] = $arr.questions[i]['value'].split('|');
            $arr.questions[i]['values'] = [$arr.questions[i]['default']];
            console.log($arr.questions[i]['multiple']);
             for(i in $arr.answers)
             {
              if($arr.questions[i]['id'] == $arr.answers[i]['question_id'] )
              {
                $arr.questions[i]['values'] = $arr.answers[i]['value'].split(',');
              }
              
             }
             //console.log($arr.questions[i]['multiple']);
           }
           
           common.tplFile('aquestions.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
  });  
     
});

module.exports = app;