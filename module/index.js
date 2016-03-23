var  util    = require('util');
     
var q = require('q');
var products = require('./products');
var common = require('./common');
var url = require('url');
exports.activateAccount = function(req,mysql,q)
{
   $mysqli = {};
   var mysql2 = require('./mysqli');
  strQuery = mysql2.mysqli($mysqli,269); 
    //console.log(strQuery);
    var defered = q.defer();
  var escape_data = [req.param('id')];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.blog = function(req,mysql,callback)
{
  
 blog = require('./blog');
  q.all([blog.blog(req,mysql,q,0),blog.recentblog(req,mysql,q),blog.blog(req,mysql,q,1)]).then(function(results){
    
     odata = [];
     odata[0] = results[0][0];
     odata[1] = results[1][0];
     odata[2] = results[2][0];

    // console.log(odata);
     callback(odata);
  });
}
exports.showblog = function(req,mysql,callback)
{
  
 blog = require('./blog');
  q.all([blog.showblog(req,mysql,q),blog.recentblog(req,mysql,q)]).then(function(results){
     odata = [];
     odata[0] = results[0][0];
     odata[1] = results[1][0];
     //console.log(odata);
     callback(odata);
  });
}
exports.winnerProducts = function(req,mysql,callback)
{
  
  data = odata = [];
  console.log(req.body.cid);
  data['search'] = req.body.search; 
  data['page'] = req.body.page; 
  data['cid'] = req.body.cid; 
  console.log(data);
  q.all([products.winnerPrd(mysql,q,data)]).then(function(results){
    
     odata['projects'] = products.shortDescribe(results[0][0]);
     callback(odata);
  });
}
exports.searcher = function(req,mysql,callback)
{
  
  data = odata = [];
  console.log(req.body.cid);
  data['search'] = req.body.search; 
  data['page'] = req.body.page; 
  data['cid'] = req.body.cid; 
  data['images'] = (typeof(req.body.images) !== 'undefined') ? req.body.images : '';
  data['freeshipping'] = (typeof(req.body.freeshipping) !== 'undefined') ? req.body.freeshipping : '';
  data['titlesonly'] = (typeof(req.body.titlesonly) !== 'undefined') ? req.body.titlesonly : '';
  data['projectid'] = (typeof(req.body.projectid) !== 'undefined') ? req.body.projectid : '';
  data['uid'] = (typeof(req.body.uid) !== 'undefined') ? req.body.uid : 0;
  console.log('ajax response ****** ');
  console.log(req.body);
  q.all([products.searchProducts(mysql,q,data)]).then(function(results){
    //console.log(results[0][0]);
    odata['projects'] = products.shortDescribe(results[0][0]);
     callback(odata);
  });
}

exports.searcherViaUrl = function(req,mysql,callback)
{
  delete data;
  data = odata = [];
  
  data = url.parse(req.url,true).query;
  data.where = '';
  console.log(2);
  data.spage = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
  if(typeof(req.body.ajax) !== 'undefined')
  {
    var implode    = require('implode');
    console.log('ajax response ****** ');
    //console.log(req.body);
    data.order = '';
    data.where = '';
    data['cid'] = (typeof(req.body['cid[]']) !== 'undefined') ? ((req.body['cid[]'] instanceof  Array) ? req.body['cid[]'].join(',') : req.body['cid[]']) : 0;
    // data['cid'] = req.body['cid[]'].join(',');
    console.log(data.where+'sadsad');
    if(typeof(req.body['type[]']) !== 'undefined')
     {
              if(!req.body['type[]'] instanceof  Array)
               {
                    if(req.body['type[]'] == '1')
                     {
                      data.where = ' and auction = 1';
                     }
                     if(req.body['type[]'] == '2')
                     {
                      data.where = ' and buynow = 1';
                     }
                     if(req.body['type[]'] == '3')
                     {
                      data.where = ' and feature = 1';
                     } 
               } 
               else
               {
                  data.where = ' and (';
                  var mwhere = '';
                  if(req.body['type[]'].indexOf('1') >= 0)
                   {
                      mwhere += (mwhere == '') ? 'auction = 1' : ' OR auction = 1'
                   } 
                  if(req.body['type[]'].indexOf('2') >= 0)
                   {
                      mwhere += (mwhere == '') ? 'buynow = 1' : ' OR buynow = 1'
                   }
                   if(req.body['type[]'].indexOf('3') >= 0)
                   {
                      mwhere += (mwhere == '') ? 'feature = 1' : ' OR feature = 1'
                   }
                   data.where += mwhere;   
                   data.where += ' )'; 

               } 
               
               
     } 

     console.log(data.where+'sadsad2');

     if(typeof(req.body['pic_type[]']) !== 'undefined')
     {
              if(!req.body['pic_type[]'] instanceof  Array)
              {
                    if(req.body['pic_type[]'] == '1')
                     {
                      data.where += ' and p.image != "" OR p.image = ""';
                     }
                     if(req.body['pic_type[]'] == '2')
                     {
                      data.where += ' and p.image != ""';
                     }
                     if(req.body['pic_type[]'] == '3')
                     {
                      data.where += ' and p.image = ""';
                     } 
              } 
               else
               {
                  data.where += ' and (';
                  var mwhere = '';
                  if(req.body['pic_type[]'].indexOf('1') >= 0)
                   {
                      mwhere += (mwhere == '') ? 'p.image != "" OR p.image = ""' : 'OR p.image != "" OR p.image = ""'
                   } 
                  if(req.body['pic_type[]'].indexOf('2') >= 0)
                   {
                      mwhere += (mwhere == '') ? 'p.image != ""' : ' OR p.image != ""'
                   }
                   if(req.body['pic_type[]'].indexOf('3') >= 0)
                   {
                      mwhere += (mwhere == '') ? 'p.image = ""' : ' OR p.image = ""'
                   }
                   data.where += mwhere;   
                   data.where += ' )'; 

               } 
               
               
     }
     console.log(data.where+'sadsad4');

     data['images'] = (typeof(req.param('images')) !== 'undefined') ? req.param('images') : '';
     data['freeshipping'] = (typeof(req.param('freeshipping')) !== 'undefined') ? req.param('freeshipping') : '';
     data['titlesonly'] = (typeof(req.param('titlesonly')) !== 'undefined') ? req.param('titlesonly') : '';
     data['projectid'] = (typeof(req.param('projectid')) !== 'undefined') ? req.param('projectid') : '';
     data['search'] = (typeof(req.param('search')) !== 'undefined') ? req.param('search') : '';
     data['order'] = (typeof(req.param('orderby')) !== 'undefined') ? req.param('orderby') : 1;
     data['uid'] = (typeof(req.param('uid')) !== 'undefined') ? req.param('uid') : 0;
     data['toprice'] = (typeof(req.param('toprice')) !== 'undefined') ? req.param('toprice') : 0;
     data['fromprice'] = (typeof(req.param('fromprice')) !== 'undefined') ? req.param('fromprice') : 0;
      data['shipping_desc'] = (typeof(req.param('local_pickup')) !== 'undefined') ? req.param('local_pickup') : '';
      
     //data['cid'] = (typeof(req.param('cid')) !== 'undefined') ? req.param('cid') : '';
  } 
  else
  {
    data['images'] = (typeof(req.param('images')) !== 'undefined') ? req.param('images') : '';
    data['freeshipping'] = (typeof(req.param('freeshipping')) !== 'undefined') ? req.param('freeshipping') : '';
    data['titlesonly'] = (typeof(req.param('titlesonly')) !== 'undefined') ? req.param('titlesonly') : '';
    data['projectid'] = (typeof(req.param('projectid')) !== 'undefined') ? req.param('projectid') : '';
    data['search'] = (typeof(req.param('search')) !== 'undefined') ? req.param('search') : '';
    data['cid'] = (typeof(req.param('cid')) !== 'undefined') ? req.param('cid') : '';
    data['order'] = (typeof(req.param('orderby')) !== 'undefined') ? req.param('orderby') : 1;
    data['uid'] = (typeof(req.param('uid')) !== 'undefined') ? req.param('uid') : 0;
    data['toprice'] = (typeof(req.param('toprice')) !== 'undefined') ? req.param('toprice') : 0;
     data['fromprice'] = (typeof(req.param('fromprice')) !== 'undefined') ? req.param('fromprice') : 0;
      data['cmprice'] = (typeof(req.param('cmprice')) !== 'undefined') ? req.param('cmprice') : 0;


      data['mens_discount'] = (typeof(req.param('mens_dis')) !== 'undefined') ? req.param('mens_dis') : 0;
      data['mobile_dis'] = (typeof(req.param('mobile_dis')) !== 'undefined') ? req.param('mobile_dis') : 0;
      data['health_dis'] = (typeof(req.param('health_dis')) !== 'undefined') ? req.param('health_dis') : 0;
      data['shipping_desc'] = (typeof(req.param('local_pickup')) !== 'undefined') ? req.param('local_pickup') : '';
    if(typeof(req.param('type')) !== 'undefined')
     {
              
                    if(req.param('type') == '1')
                     {
                      data.where = ' and auction = 1';
                     }
                     if(req.param('type') == '2')
                     {
                      data.where = ' and buynow = 1';
                     }
                     if(req.param('type') == '3')
                     {
                      data.where = ' and feature = 1';
                     } 
               
      }

  } 
  
  //data['page'] = '';
  //console.log(data);
  return data;
}
exports.index = function(req,res,arr)
{
  common.tplFile('index.tpl');
  common.headerSet(1);
  common.loadTemplateHeader(req,res,arr);
};     

exports.other = function(req,res,arr)
{
  //console.log(arr);
  if(arr.pagetitle == 'home')
  common.tplFile('home.tpl');
  else
  common.tplFile('search.tpl');
  common.headerSet(1);
  common.loadTemplateHeader(req,res,arr);
}; 

exports.otherAjax = function(req,res,arr)
{
  common.tplFile('projects.tpl');
  common.headerSet(0);
  common.loadTemplateHeader(req,res,arr,0);
}; 

exports.projects = function(mysql,callback)
{
  //q.fcall(products.homeProducts(mysql)).then(products.homeProducts(mysql)).then(console.log(1));
  q.all([products.homeProducts(mysql,q,1),products.futureProducts(mysql,q,2)]).then(function(results){
  	     data1 = results[0][0];
  	     data2 = results[1][0];

         req_data1 = products.shortDescribe(data1);
         req_data2 = products.shortDescribe(data2);
         odata = [];
	       odata['open_project'] = req_data1;
	       odata['feature_project'] = req_data2;
	     //console.log(odata);
         callback(odata);
        // Hint : your third query would go here
    });  
};    


exports.live = function(mysql,callback)
{
  //q.fcall(products.homeProducts(mysql)).then(products.homeProducts(mysql)).then(console.log(1));
  q.all([products.homeProducts(mysql,q,16)]).then(function(results){
         data1 = results[0][0];
         
         req_data1 = products.shortDescribe(data1);
         
         odata = [];
         odata['project'] = req_data1;
       
       //console.log(odata);
         callback(odata);
        // Hint : your third query would go here
    });  
}; 

exports.future = function(mysql,callback)
{
  //q.fcall(products.homeProducts(mysql)).then(products.homeProducts(mysql)).then(console.log(1));
  q.all([products.futureProducts(mysql,q,17)]).then(function(results){
         data1 = results[0][0];
         
         req_data1 = products.shortDescribe(data1);
         
         odata = [];
         odata['project'] = req_data1;
       
       //console.log(odata);
         callback(odata);
        // Hint : your third query would go here
    });  
}; 

exports.closed = function(mysql,callback)
{
  //q.fcall(products.homeProducts(mysql)).then(products.homeProducts(mysql)).then(console.log(1));
  q.all([products.closeProducts(mysql,q)]).then(function(results){
         //console.log(results[0][0]);
         data1 = results[0][0];
         
         req_data1 = products.shortDescribe(data1);
         
         odata = [];
         odata['project'] = req_data1;
       
       //console.log(odata);
         callback(odata);
        // Hint : your third query would go here
    });  
}; 
exports.shop = function(mysql,callback)
{
  //q.fcall(products.homeProducts(mysql)).then(products.homeProducts(mysql)).then(console.log(1));
  q.all([products.shopProducts(mysql,q)]).then(function(results){
         data1 = results[0][0];
         
         req_data1 = products.shortDescribe(data1);
         
         odata = [];
         odata['project'] = req_data1;
       
       //console.log(odata);
         callback(odata);
        // Hint : your third query would go here
    });  
}; 