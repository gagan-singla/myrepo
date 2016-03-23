var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
var url = require('url');


exports.insertdetails =function (req,response,mysql) {

	// body...
	console.log('asd');
	console.log(response);

	$mysqli =  {};    
	strQuery = mysqli.mysqli($mysqli,'auth_insert');	    
    var defered = q.defer();
    var escape_data =  [req.session.userid,response.customerProfileId,response.customerPaymentProfileId,req.body.number];

	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.getdetails =function (req,mysql,q,number) {

	console.log('asd2');
	

	$mysqli =  {};    
	strQuery = mysqli.mysqli($mysqli,'auth_details');	    
    var defered = q.defer();
    var escape_data =  [number,req.session.userid];
    console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.getproid =function (req,mysql,q) {

	$mysqli =  {};    
	strQuery = mysqli.mysqli($mysqli,'auth_proid');	    
    var defered = q.defer();
    var escape_data =  [req.session.userid];
    console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;


}



