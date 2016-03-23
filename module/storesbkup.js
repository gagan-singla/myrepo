var  util    = require('util');
     
var q = require('q');
var products = require('./products');
var common = require('./common');
var url = require('url');
var dateFormat = require('dateformat');
exports.storeDetail = function(req,mysql,q)
{
     $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_14');
     var defered = q.defer();
     var escape_data = [req.body.id];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.viewUserStores  = function(req,mysql,q)
{
     $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_13');
     var defered = q.defer();
     var escape_data = [req.session.userid];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.create = function(req,mysql,q)
{
     $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_1');
    var defered = q.defer();
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	var filename = '';;
	if(typeof(req.files.store_image) !== 'undefined')
	{
		filename = req.files.store_image.name;
	}
     var bannername = '';;
     if(typeof(req.files.store_banner_image) !== 'undefined')
     {
          bannername = req.files.store_banner_image.name;
     }
	req.body.date_started = req.body.date_started.replace(new RegExp('/','g'),'-').concat(':00');
    var escape_data = [req.param('name'),req.param('location'),req.param('description'),req.param('website'),req.session.userid,datge,'active',filename,req.param('date_started'),bannername];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;
}
exports.deleteStore = function(req,mysql,q)
{
     $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_12');
     var defered = q.defer();
     var escape_data = [req.param('id')];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.view = function(req,mysql,q)
{
     $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_2');
     var defered = q.defer();
     datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
     var escape_data = [req.param('id')];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.viewAllStores= function(req,mysql,q)
{
	 var where = '';
	 if(typeof(req.param('title')) !== 'undefined' && req.param('title') != '')
	 {
		 where = ' AND s.name = "'+req.param('title')+'"';
	 }
	  if(typeof(req.param('location')) !== 'undefined' && req.param('location') != '')
	 {
		 where = ' AND s.location = "'+req.param('location')+'"';
	 }
	  if(typeof(req.param('status')) !== 'undefined' && req.param('status') != '')
	 {
		 where = ' AND s.status = "'+req.param('status')+'"';
	 }
	 $mysqli = {where:where};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_10');
     var defered = q.defer();
     var escape_data = [];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.addStoreProducts = function(req,mysql,q)
{
	 $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_8');
     var defered = q.defer();
     var escape_data = [req.param('id'),req.param('sid'),datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss")];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.removeProducts = function(req,mysql,q)
{
	 $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_15');
     var defered = q.defer();
     var escape_data = [req.param('id'),req.param('sid')];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.updateStoresAdmin = function(req,mysql,q)
{
	 $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_11');
     var defered = q.defer();
	 var filename = '';
	 if(typeof(req.files.store_image) !== 'undefined')
	 {
		filename = req.files.store_image.name;
	 }
     var escape_data = [req.param('name'),req.param('location'),req.param('description'),req.param('website'),filename,req.param('date_started'),req.param('sid')];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.updateStores = function(req,mysql,q)
{
	 $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_9');
     var defered = q.defer();
	 var filename = req.body.logo;
	 if(typeof(req.files.store_image) !== 'undefined')
	 {
		filename = req.files.store_image.name;
	 }
      var bannername = req.body.banner;;
     if(typeof(req.files.store_banner_image) !== 'undefined')
     {
          bannername = req.files.store_banner_image.name;
     }
	 req.body.date_started = req.body.date_started.replace(new RegExp('/','g'),'-').concat(':00');
     var escape_data = [req.param('name'),req.param('location'),req.param('description'),req.param('website'),filename,req.param('date_started'),bannername,req.param('sid'),req.session.userid];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.notStoreProducts = function(req,mysql,q)
{
	 $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_6');
     var defered = q.defer();
     var escape_data = [req.param('id'),req.session.userid];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.viewStoreProducts = function(req,mysql,q,id)
{
	 var where = '';
	 if(typeof(req.param('cid')) !== 'undefined'  && req.param('cid') != ''  && req.param('cid') > 0)
	 {
		 where += ' and  p2.category_id IN (SELECT cc.id FROM categories AS cc INNER JOIN categories AS pc WHERE cc.lft BETWEEN pc.lft AND pc.rgt AND pc.id = '+req.param('cid')+' GROUP BY cc.id )';
	 }
	 if(typeof(req.param('search')) !== 'undefined' && req.param('search') != '')
	 {
		  where += ' and  (p2.title like "%'+req.param('search')+'%" or p2.description like "%'+req.param('search')+'%")';
	 }
      
      if(id == 1)
      {
           req.body.page = (typeof(req.param('page')) === 'undefined') ? 1 : req.param('page');
           limit = 15;
           where += ' limit '+(req.body.page-1)*limit+','+limit;
      }    
     $mysqli = {where:where};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_3');
     var defered = q.defer();
     datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
     var escape_data = [req.param('id')];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.viewStoreFeaturedProducts = function(req,mysql,q)
{
     $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_5');
     var defered = q.defer();
     datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
     var escape_data = [req.param('id')];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}
exports.viewStoreCategories = function(req,mysql,q)
{
	 $mysqli = {};
     var mysql2 = require('./mysqli');
     strQuery = mysql2.mysqli($mysqli,'stores_4');
     var defered = q.defer();
     datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
     var escape_data = [req.param('id')];
     console.log(escape_data);
     query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

     return defered.promise;
}