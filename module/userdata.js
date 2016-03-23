var  util    = require('util');
     
var q = require('q');
var mysqli = require('./mysqli');
var common = require('./common');
var url = require('url');
exports.userdeals = function(req,mysql,q,id,field)
{
  
  $mysqli =  {};
  strQuery = mysqli.mysqli($mysqli,300); 
  var escape_data = [req.body.first_name,req.body.last_name,req.body.subject,req.body.message];

  var defered = q.defer();
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
  
}

exports.getdata = function(req,mysql,q,id,field)
{
   
  $mysqli =  {};
  strQuery = mysqli.mysqli($mysqli,301); 
  
 // var escape_data = [req.body.first_name,req.body.last_name,req.body.subject,req.body.message];
 var escape_data ='';
  var defered = q.defer();
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
  
}

