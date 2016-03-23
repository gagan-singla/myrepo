var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
var q = require('q');
exports.save = function(escape_string,mysql)
{ 
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,270); 
    //console.log(strQuery);
    var defered = q.defer();
	query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());
	return defered.promise;
}
exports.AllMyPayments= function(req,mysql,q)
{ 
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,294); 
    //console.log(strQuery);
    var defered = q.defer();
    var escape_string = [req.session.userid];
	query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());
	return defered.promise;
}
exports.PickPayments= function(req,mysql,q,id)
{ 
    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli,295); 
    //console.log(strQuery);
    var defered = q.defer();
    var escape_string = [id];
    query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());
    return defered.promise;
}
