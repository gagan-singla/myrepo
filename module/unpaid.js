var  util    = require('util'),
nsmarty = require('nsmarty');
var md5 = require('MD5');
var mysqli = require('./mysqli');
var common = require('./common');
var express=require('express');
var mysqli = require('./mysqli');


exports.listmembers = function(req,mysql,q){
	
	$mysqli =  {};
	var days = global.general.remainder;
	var escape_data =  [days];
	strQuery = mysqli.mysqli($mysqli,900); 
	var defered = q.defer();
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.listmembersbyid = function(req,mysql,q,id,pid){
	
	$mysqli =  {};
	var days = global.general.remainder;
	var escape_data =  [days,id,pid];
	console.log(escape_data);
	strQuery = mysqli.mysqli($mysqli,899); 
	var defered = q.defer();
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.unlistmembers = function(req,mysql,q,count){
	
	$mysqli =  {};
	var days = global.general.remainder;
	console.log(days);
	var maxdays  = (+days) + (+days);
	
	if(count == 1){
		
		console.log('Days1:'+days );
		var escape_data =  [maxdays];
		strQuery = mysqli.mysqli($mysqli,901); 
		
	}
	else{
		console.log(maxdays+':Days:'+days );
		var escape_data =  [days,maxdays];
		strQuery = mysqli.mysqli($mysqli,902); 
	}
	var defered = q.defer();
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.extendtime= function(req,mysql,q){

	var dge = require('date-util');
	$mysqli =  {};
	var pid = req.body.projectid;
	console.log('extendtime of '+pid);
	var days = global.general.remainder;
	console.log('Days:'+days );
	var datge = new Date().strtotime("+"+days+" Days").format("yyyy-mm-dd HH:MM:ss");
	var escape_data =  [datge,pid];
	strQuery = mysqli.mysqli($mysqli,903); 
	var defered = q.defer();
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.declinebid= function(req,mysql,q){

	$mysqli =  {};
	var bid = req.body.bidid;
	var pid = req.body.projectid;
	console.log('declinebid of '+pid);
	var escape_data =  [pid];
	strQuery = mysqli.mysqli($mysqli,904); 
	var defered = q.defer();
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;


}
exports.debuynow= function(req,mysql,q){

	$mysqli =  {};
	var uid = req.body.userid;
	var pid = req.body.projectid;
	console.log('debuynow of'+pid);
	var escape_data =  [uid,pid];
	strQuery = mysqli.mysqli($mysqli,905); 
	var defered = q.defer();
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;


}
exports.deinvoice= function(req,mysql,q){

	$mysqli =  {};
	var uid = req.body.userid;
	var pid = req.body.projectid;
	console.log('deinvoice of'+pid);
	var escape_data =  [uid,pid];
	strQuery = mysqli.mysqli($mysqli,906); 
	var defered = q.defer();
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;


}
exports.deproxy= function(req,mysql,q){

	$mysqli =  {};
	var uid = req.body.userid;
	var pid = req.body.projectid;
	console.log('deproxy of'+pid);
	var escape_data =  [pid];
	strQuery = mysqli.mysqli($mysqli,907); 
	var defered = q.defer();
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;


}


