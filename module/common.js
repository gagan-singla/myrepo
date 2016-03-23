var nsmarty = require('nsmarty');
var util = require('util');
var scriptfile = '';
var headered = 1;
var q = require('q');
var dateformatServer = require('dateformat');
var mysqli = require('./mysqli');
var module = require('../module');
var fs = require('fs');
Date.prototype.addDays = function(days) {
var secsDay = 86400000; // there are 86400000 secs in 1 day
var time = this.getTime(); // number of milliseconds since midnight of January 1, 1970.
var newdate = new Date(time + (days * secsDay));
this.setDate(newdate.getDate());
    return newdate;
}
exports.sendJSONOutput = function(req,res,data)
{
  res.send(JSON.stringify(data));
  res.end();return false;
}
exports.checkLoginJSON = function(req,res)
{
   var data = {};
   data.success = true; 
   if(typeof(req.session) === 'undefined')
   {
     data.success = false;
   }
   else if(typeof(req.session.userid) === 'undefined')
   {
      data.success = false;
   }
   if(!data.success)
   {
      this.sendJSONOutput(req,res,data);
   } 
   else
   {
    return data;
   } 
}

exports.getLocations = function(req,mysql,q)
{
    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli,'country_list');

    var defered = q.defer();

    query =  mysql.query(strQuery,defered.makeNodeResolver());

    return defered.promise;
}

exports.getState = function(req,mysql,q)
{
    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli,'state_list');

    var defered = q.defer();
    var escape = [req.body.cid];

    query =  mysql.query(strQuery,escape,defered.makeNodeResolver());

    query.on('error',function(err){
        throw err;
    })
    return defered.promise;
}
exports.demoFormSubmit = function(req,mysql,q)
{
    $mysqli =  {};
    var dateFormat = require('dateformat');
    datge = new Date();
    var escape_data =  [req.body.first_name,req.body.last_name,req.body.email,req.body.address,req.body.country_code,datge];

    strQuery = mysqli.mysqli($mysqli,297);      
    var defered = q.defer();
      
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}
exports.productQuestion= function(req,mysql,q)
{
    $mysqli =  {};
    var escape_data =  [req.body.pid];

    strQuery = mysqli.mysqli($mysqli,259);      
    var defered = q.defer();
      
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;
}
exports.categoriesAllQuestion = function(req,mysql,q)
{
   
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,257); 

  var defered = q.defer();
  var escape_data = [req.param('cid'),req.param('cid')];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.checkPermission = function(action,req)
{
    if(req.session[action] == 1 && req.session.permission == true)
    {
        return true;
    }else
    {
        return false;
    }

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

    if(action == 'monthly_buynow_limit')
    {
        var l = req.session.buynowcountmonth - 1;
    }

    if(action == 'buynow_limit')
    {
        var l = req.session.buynowcountyear;
    }

    if(l == -1){
        l = 1;
    }
   if(l === 'null')
   {
    l = 0;
   }


   if(req.session[action] > l)
   {
    return true;
   }else if(req.session[action] == -1){
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

  var defered = q.defer();
  var escape_data = [];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.admincpId = function(req,mysql,q)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,166); 

  var defered = q.defer();
  var escape_data = [['id','email']];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}

exports.randomNumber = function(howMany, chars)
{
    var crypto = require('crypto');


    chars = chars
        || "1234567890";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');

}

exports.urlparameter = function(query,leave)
{
   var s = '';

   for(var i in query)
     {

      if (i != '') {
                s += i+'='+query[i]+'&';   
      } 

     }
     for(var k in leave)
     {

      if (k != '') {
                s = s.replace(new RegExp(k+'='+query[i]+'&', 'g'), '');   
      } 
       
      
     }

     return s;
}

exports.fetchCountries = function(mysql)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,267); 

  var defered = q.defer();
  var escape_data = [0];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.fetchStates = function(mysql,id)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,268); 

  var defered = q.defer();
  var escape_data = [id];

  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.fetchCities = function(mysql,id)
{
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,268); 

  var defered = q.defer();
  var escape_data = [id];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}

exports.processIndex = function(row,req,res,$arr)
{
	
	$arr.projects = row;

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

    
    
}

exports.checkLogin = function(req,res,id)
{  

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

    var defered = q.defer();

	query =  mysql.query(strQuery,defered.makeNodeResolver());

	return defered.promise;
}

exports.locations = function(req,mysql,q)
{     
  $mysqli = {};
  strQuery = mysqli.mysqli($mysqli,702); 

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
 arr.commonfunction = this;
 arr.sumFloat = this.sumFloat;
 arr.subFloat = this.subFloat;
 arr.parseFloat = this.parseFloat;
 arr.loged.phonevalid = (typeof(req.session.phonevalid) === 'undefined') ? '' : req.session.phonevalid;
 arr.last_urls = req.protocol + '://' + req.get('host') + req.originalUrl;
  if(typeof(req.session.themeno) !== 'undefined') {

	 arr.themeno = req.session.themeno;
 }	
 else {

	 req.session.themeno = 0;
	 arr.themeno = req.session.themeno;
 }
 
  if(typeof(req.session.autologin) !== 'undefined') {

	 arr.autologin = req.session.autologin;
 }	
 else {

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
    arr.convertKbToMb = this.convertKbToMb;
     arr.shorten = this.shorten;
    arr.convertBytesToKb = this.convertBytesToKb;
 q.all([this.productCategories(arr.config.mysql,q),user.userInfo(req,arr.config.mysql,q,uid,['balance','reserve_amount']),user.notify_msg_counter(req, arr.config.mysql, q)]).then(function(results){

    var fs = require('fs')
    , ini = require('ini');
    
    var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
    var mode = configed['section']['mode']['Maintenance_mode'];
  var originalurl = req.originalUrl;

  arr.pageofjs = req.originalUrl;
  var n = originalurl.search("admin"); 

  if(n<1  )
  {
if(mode=='yes' && originalurl !='/')
    {
          res.writeHead(302,{'Location':'/'});
                            res.end();return false;return false;
    }
}
  if(originalurl.indexOf("/dashboard") > -1 || originalurl == '/profile_settings')
  arr.pageofjs = '/dashboard/';

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

     var dateFormat = require('dateformat');
     arr.dateFormat = dateFormat;
  arr['msgcount'] = results[2][0][0].msgs;
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

  nsmarty.clearCache(arr.file);

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

  	stream = nsmarty.assign(arr.file,arr);

  stream.pipe(res);

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
  if(data == ''  || data == null)
  {
	return data;  
  }
  var length = data.length;
  var s = require('string');
  if(length > num)
  {
    return s(data).stripTags().s.substring(0,num)+'...';
  }
  return s(data).stripTags().s; 
}

exports.parseFloat = function(data)
{
    data = parseFloat(data).toFixed(2);
    return parseFloat(data);
}
exports.sumFloat = function(data,data2)
{
    data = parseFloat(data)+parseFloat(data2);
    return parseFloat(data);
}

exports.subFloat = function(data,data2)
{
    data = parseFloat(data) - parseFloat(data2);
    return parseFloat(data);
}

exports.convertBytesToKb= function(val){
    kbvalue = (parseFloat(val)/1024).toFixed(2);
    return kbvalue;
}


exports.convertKbToMb= function(val){
    kbvalue = (parseFloat(val)/1024).toFixed(2);
    return kbvalue;
}

exports.convertMbToKb = function(val){
    mbvalue = (parseFloat(val) * 1000).toFixed(2);
    return mbvalue;
}

/*exports.convertbytesToMb= function(val){
    mbvalue = (parseFloat(val)/1048576).toFixed(2);
    return mbvalue;
}*/

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

    var defered = q.defer();
    var escape_data = [0];

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

    var defered = q.defer();
    var escape_data = [catid];
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err)
        {
            throw err;
        });
    return defered.promise;

}

exports.firstLetterCapital= function(str){
    return str.replace(/\b./g, function(m){ return m.toUpperCase(); });
};
exports.last_url = function(req){

  return req.headers['referer'];
}
