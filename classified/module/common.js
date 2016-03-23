var nsmarty = require('nsmarty');
var util = require('util');
var scriptfile = '';
var headered = 1;
var q = require('q');
var dateformatServer = require('dateformat');
var mysqli = require('./mysqli');
var module = require('../module');
Date.prototype.addDays = function(days) {
var secsDay = 86400000; // there are 86400000 secs in 1 day
var time = this.getTime(); // number of milliseconds since midnight of January 1, 1970.
var newdate = new Date(time + (days * secsDay));
this.setDate(newdate.getDate());
    return newdate;
}
exports.demoFormSubmit = function(req,mysql,q)
{
        $mysqli =  {};
        var dateFormat = require('dateformat');
     datge = new Date();
        var escape_data =  [req.body.first_name,req.body.last_name,req.body.email,req.body.address,req.body.country_code,datge];
        
        console.log(escape_data); 
    strQuery = mysqli.mysqli($mysqli,297);      
      var defered = q.defer();
      
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}
exports.productQuestion= function(req,mysql,q)
{
        $mysqli =  {};
        var escape_data =  [req.body.pid];
        
        console.log(escape_data); 
    strQuery = mysqli.mysqli($mysqli,259);      
      var defered = q.defer();
      
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}
exports.categoriesAllQuestion = function(req,mysql,q)
{
   
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,257); 
    //console.log(strQuery);
  var defered = q.defer();
  var escape_data = [req.param('cid'),req.param('cid')];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.checkPermission = function(action,req)
{
    console.log("checking permission");
    console.log(req.session[action]);
    console.log("checking permission end");

  /*  if(req.session[action] == 1)

    {

        return true;

    }

    else

    {

        return false;

    }*/

    console.log("checking membershipstatus");
    console.log(req.session.membershipstatus);
    console.log("checking membershipstatus end");

    if(req.session.membershipstatus == 'active')
    {

        if(req.session[action] == 1)

        {

            return true;

        }

        else

        {

            return false;

        }

    }
    else
    {

        return false;

    }

    /* var membership = require('../module/membership');

     q.all([membership.getUserRole(req,config.mysql,q)]).then(function(result) {


     if(result[0][0].length > 0 && result[0][0][0]['status'] == 'active' )
     {
     if(req.session[action] == 1)

     {

     return true;

     }

     else

     {

     return false;

     }

     }
     else
     {
     return false;
     }



     });  */



}
exports.checkLimitReached = function(action,req)
{
   if(action == 'monthly_bid_limit')
   {
     var l = req.session.bidcountmonth; 
   } 
   if(action == 'bid_limit')
   {
     var l = req.session.bidcountyear; 
   }
   if(action == 'monthly_project_limit')
   {
     var l = req.session.productcountmonth; 
   } 
   if(action == 'project_limit')
   {
     var l = req.session.productcountyear; 
   }
   if(l === 'null')
   {
    l = 0;
   } 
   console.log(l+'limit checker run'+req.session[action]);
   if(req.session[action] > l)
   {
    return true;
   } 
   else
   {
    return false;
   } 
}
exports.allCategoriesList = function(req,mysql,q)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,175); 
    //console.log(strQuery);
  var defered = q.defer();
  var escape_data = [];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.admincpId = function(req,mysql,q)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,166); 
    //console.log(strQuery);
  var defered = q.defer();
  var escape_data = [['id','email']];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}


exports.urlparameter = function(query,leave)
{
   var s = '';
   console.log(query);
   for(var i in query)
     {
      console.log(i);
      if (i != '') {
                s += i+'='+query[i]+'&';   
      } 

      
     }
     for(var k in leave)
     {
      console.log(k);
      console.log(k+'='+query[i]+'&');
      if (k != '') {
                s = s.replace(new RegExp(k+'='+query[i]+'&', 'g'), '');   
      } 
       
      
     }
     console.log(s);
     return s;
}

exports.fetchCountries = function(mysql)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,267); 
    //console.log(strQuery);
  var defered = q.defer();
  var escape_data = [0];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.fetchStates = function(mysql,id)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,268); 
    //console.log(strQuery);
  var defered = q.defer();
  var escape_data = [id];
  console.log(escape_data);
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.fetchCities = function(mysql,id)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,268); 
    //console.log(strQuery);
  var defered = q.defer();
  var escape_data = [id];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}

exports.processIndex = function(row,req,res,$arr)
{
	
	$arr.projects = row;
  //console.log($arr.projects);

    $arr.loged = req.session;

    if($arr['pagetitle'] == '')
    {
      module.index(req,res,$arr);
    }
    else
    {
      module.other(req,res,$arr);
    }	
    
}

exports.processIndexajax = function(row,req,res,$arr)
{
	  
	  $arr.proj = row.projects;
      module.otherAjax(req,res,$arr);
      //console.log($arr.proj);
    
    
}

exports.checkLogin = function(req,res,id)
{  
  //console.log(req.session.userid+'as');
   if(typeof(req.session) === 'undefined' && id == 0)
   {
     res.writeHead(302, {
     'Location': '/login'
      //add other headers here...
    });
    res.end();return false;
   }
   else if(typeof(req.session.userid) === 'undefined' && id == 0)
   {
     res.writeHead(302, {
     'Location': '/login'
      //add other headers here...
    });
    res.end();return false;
   }
   else
   { 
     if(req.session.userid > 0 && id == 1)
     {
       res.writeHead(302, {
       'Location': '/'
        //add other headers here...
      });
      res.end();return false;
     }
   }
   
}
exports.admincheckLogin = function(req,res,id)
{  
  console.log(req.session);
   if(typeof(req.session) === 'undefined' && id == 0)
   {
     res.writeHead(302, {
     'Location': '/admin/login'
      //add other headers here...
    });
    res.end();return false;
   }
   else if(typeof(req.session.userid) === 'undefined' && id == 0)
   {
     res.writeHead(302, {
     'Location': '/admin/login'
      //add other headers here...
    });
    res.end();return false;
   }
   else
   { 
     if(req.session.userid > 0 && id == 1 && req.session.admin == 1)
     {
       
     }
     else
     {
      res.writeHead(302, {
       'Location': '/admin/login/'
        //add other headers here...
      });
      res.end();return false;
    } 
   }

  
}
exports.checkLoginajax = function(req,res,id)
{  
  //console.log(req.session.userid+'as');
  // return false;
   if(typeof(req.session) === 'undefined' && id == 0)
   {
     return false;
   }
   else if(typeof(req.session.userid) === 'undefined' && id == 0)
   {
     return false;
   }
   else
   { 
     return true;
   }
   
}
exports.productCategories = function(mysql,q)
{   	
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,5); 
    //console.log(strQuery);
    var defered = q.defer();

	query =  mysql.query(strQuery,defered.makeNodeResolver());

	return defered.promise;
}

exports.locations = function(req,mysql,q)
{     
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,702); 
    //console.log(strQuery);
    var defered = q.defer();

  query =  mysql.query(strQuery,defered.makeNodeResolver());

  return defered.promise;
}
exports.tplFile = function(file)
{
	this.scriptfile = file;
}

exports.headerSet = function(data)
{

	this.headered = data;
}
exports.ajaxjson= function(res,data)
{
 res.setHeader('Content-Type', 'application/json');  
 res.end(JSON.stringify(data));
}
exports.loadTemplateHeader = function(req,res,arr)
{
 arr.file = this.scriptfile;
 arr.headered = this.headered;	
 arr.loged = req.session;
 arr.loged.phonevalid = (typeof(req.session.phonevalid) === 'undefined') ? '' : req.session.phonevalid; 
  if(typeof(req.session.themeno) !== 'undefined') {
	 console.log("session theme set");
	 arr.themeno = req.session.themeno;
 }	
 else {
	 console.log("session theme not set");
	 req.session.themeno = 0;
	 arr.themeno = req.session.themeno;
 }
 
  if(typeof(req.session.autologin) !== 'undefined') {
	// console.log("session theme set");
	 arr.autologin = req.session.autologin;
 }	
 else {
	 //console.log("session theme not set");
	 req.session.autologin = 0;
	 arr.autologin = req.session.autologin;
 }
 
 arr._phrase = global.language_identifier.language.phrases;
 arr.nuller = null;
 if(typeof(arr.datenow) === 'undefined')
 {
     var dateFormat = require('dateformat');
     arr.datenow = new Date();
 } 
 arr.serverdate = dateformatServer(new Date(),"yyyy/mm/dd HH:MM:ss") ;

 console.log(arr._);
 uid = 0;
 user = require('./user'); 
 if(typeof(req.session) !== 'undefined')
 { 
   if(typeof(req.session.userid) !== 'undefined')
   {
     uid = req.session.userid;
   } 
 }
   arr.currencyConverter = this.currencyConverter;
 q.all([this.productCategories(arr.config.mysql,q),user.userInfo(req,arr.config.mysql,q,uid,['balance','reserve_amount'])]).then(function(results){
  
  //var query = require('url').parse(req.url,true).query;
  //console.log(req.url);
  var originalurl = req.originalUrl;
  arr.pageofjs = req.originalUrl;

  if(originalurl.indexOf("/dashboard") > -1 || originalurl == '/profile_settings')
  arr.pageofjs = '/dashboard/';
  console.log(arr.pageofjs);
  arr.category = results[0][0];
  cats =  results[0][0];
  var maincategory = [];
  var subcategory = []
  cats.forEach(function(item) {
      if(item.parent_id == 0){
        maincategory.push(item);
      }
  });

  cats.forEach(function(item) {
     if(item.parent_id > 0){
        subcategory.push(item);
      }
  });

  arr.maincategory = maincategory;
  arr.subcategory = subcategory;
  
  arr.userbalance = [];
  if(results[1][0].length > 0)
  {
    arr.userbalance = results[1][0][0];
  }  
  
  if(uid > 0)
  {
    arr.userbalance.ledger =  parseFloat(results[1][0][0]['balance'] - results[1][0][0]['reserve_amount']).toFixed(2);
    arr.userbalance.balance = results[1][0][0]['balance'];
  }	
  else
  {
    arr.userbalance = [];
    //arr.userbalance.ledger = arr.userbalance.balance = 0;
  }  
  nsmarty.tpl_path = arr.config.path + '/templates/'; 
  console.log(2);
  nsmarty.clearCache(arr.file);
  //console.log(this.scriptfile);
  if(!arr.headered)
  {
    function ajaxjsonrun(data)
    {
      
     res.setHeader('Content-Type', 'application/json');  
     res.end(JSON.stringify({ html: data }));
    }
  	stream = nsmarty.assigndata(arr.file,arr,ajaxjsonrun);
    
  }
  else
  {
    function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
    delete defaultcss;
    defaultcss = ['parsley'];
    
     if(typeof(arr['externalcss']) !== 'undefined')
     {
        
        arr['external2css'] = arr['externalcss'].concat(defaultcss).filter(onlyUnique);
        delete arr['externalcss'];
     }
     else
     {     
           
           arr['external2css'] = defaultcss;
     } 
     delete defaultjs;
     defaultjs = ['parsley'];
    
     if(typeof(arr['externaljs']) !== 'undefined')     
     {        
        
        arr['external2js'] = arr['externaljs'].concat(defaultjs).filter(onlyUnique);;
        delete arr['externaljs'];
     }
     else
     {
          
           arr['external2js'] = defaultjs;
     } 
     arr['timer'] = 0;
    if(typeof(req.session.pid) !== 'undefined')
    {
      var moment = require('moment')
      var dateFormat = require('dateformat');
      var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
      var startDate = moment(req.session.temp_time_id, 'YYYY-M-DD HH:mm:ss')
      var endDate = moment(datenow, 'YYYY-M-DD HH:mm:ss');
      var secondsDiff = req.session.timer - endDate.diff(startDate, 'seconds');
      arr['timer'] = secondsDiff;
    }  
    
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');   
    console.log(3);
  	stream = nsmarty.assign(arr.file,arr);

  //	util.pump(stream,res);
  

  
  stream.pipe(res);

    console.log('asdasd');

      

  }	
 });
}
exports.renderJson = function(res,data)
{
  res.setHeader('Content-Type', 'application/json');  
  res.end(JSON.stringify(data));
}
exports.currencyConverter = function(data)
{
  return parseFloat(data).toFixed(2); 
}
exports.shorten = function(data,num)
{
  var length = data.length;
  if(length > num)
  {
    return data.substring(0,num)+'...';
  }
  return data; 
}
//var Splitter = require('split_er');
exports.dateMeasure = function(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    m = (m < 10) ? '0'+m : m;
    h = (h < 10) ? '0'+h : h;
    s = (s < 10) ? '0'+s : s;
    d = (d < 10) ? '0'+d : d;
    return d+'d:'+h+'h:'+m+'m:'+s+'s';
}

exports.categoryDropdown = function(mysql) {

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli,'cat1'); 
     console.log(strQuery);
    var defered = q.defer();
    var escape_data = [0];
    console.log("44444444443333333333");
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err)
        {
                
               throw err; 
        });
    return defered.promise;

}

exports.productSubCategories = function(mysql,catid) {

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli,'cat2'); 
     console.log(strQuery);
    var defered = q.defer();
    var escape_data = [catid];
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err)
        {
                
               throw err; 
        });
    return defered.promise;

}
