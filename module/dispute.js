var  util    = require('util');
     
var q = require('q');
var dateFormat = require('dateformat');  
var products = require('./products');
var common = require('./common');
var mysqli = require('./mysqli');
var url = require('url');
exports.addDispute = function(req,mysql,q)
{
  
  
  $mysqli =  {};
  req.body.rating = 0;
  strQuery = mysqli.mysqli($mysqli,91); 
  var escape_data = [req.session.userid,dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),req.body.subject,req.body.message,req.body.rating,1];
  var defered = q.defer();
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
  
}

exports.saveDispute = function(req,mysql,q)
{

  $mysqli =  {};
  req.body.rating = 0;
  strQuery = mysqli.mysqli($mysqli,'add_dispute');
  var escape_data = [req.session.userid,dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),req.body.subject,req.param('message'),req.body.dispute_pid];
  var defered = q.defer();
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
  
  return defered.promise;

}

exports.showDisputes = function(req,mysql,q) {

  $mysqli = {};

  strQuery = mysqli.mysqli($mysqli, 'view_dispute');
  var defered = q.defer();
  query =  mysql.query(strQuery,defered.makeNodeResolver());
  return defered.promise;
}

exports.delDisputes = function(req,mysql,q) {

  $mysqli = {};

  strQuery = mysqli.mysqli($mysqli, 'delete_disputes');
  var defered = q.defer();
  var escape_data = [req.body.del_id];
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
  console.log("Query is "+ query.sql);
  return defered.promise;
}