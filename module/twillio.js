var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
var q = require('q');

exports.sendsms = function(data,tosms){

	var accountSid = global.smstwo.sid; 
	var authToken = global.smstwo.token; 
	var fromNo = global.smstwo.from;
	 
	//require the Twilio module and create a REST client 
	var client = require('twilio')(accountSid, authToken); 
	 
	client.messages.create({  

		body: data,
	    to: tosms,
	    from: fromNo
	}, function(err, message) { 
		console.log(message);
	});

	console.log('message sent');
}

exports.smstemps = function(req,mysql,q,event){ 

	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'843');  	  
    var defered = q.defer();
    var escape_data =  [event];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}