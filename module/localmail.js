var nodemailer = require('nodemailer');
var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
var q = require('q');
	

exports.sendmail = function(data,subject,toemail){ 
	var transporter = nodemailer.createTransport({
    
    service: global.emaillocal.service,
	    auth: {
	        user: global.emaillocal.user,
	        pass: global.emaillocal.pwd,
	        secure: 'true'
	    }
	});
	
	var mailOptions = {
	    from: 'Auction Software <support@auctionsoftware.com>', // sender address 
	    to: toemail, // list of receivers 
	    subject: subject, // Subject line 
	    html: data // html body 
	};
	console.log('detaisl'+subject+toemail );
	transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
 
	});

}

exports.mailtemps = function(req,mysql,q,event){ 

	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'840');  	  
    var defered = q.defer();
    var escape_data =  [event];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	query.on("error",function(err){
		throw err;
	})
	return defered.promise;
	

}

exports.mailmethods = function(req,mysql,q){ 

	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'841');  	  
    var defered = q.defer();
    var escape_data =  [];   
    console.log('escape_data'+escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}