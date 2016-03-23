//console.log(3);
var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
var q = require('q');
var Customerio  = require('node-customer.io');
//console.log(5);
var cio = '';
var uid = 0;
exports.inits = function()
{
	//console.log(global.customerio);
	this.uid ='customer_'+this.uid;
	cio = new Customerio(global.emailcio.api,global.emailcio.key);
	//console.log('cusio2');
}

exports.createCustomer = function(data)
{
// create a user with some initial properties

cio.identify(this.uid, data.email, data.user,function(){});

}

// update an existing user with new properties

   // track an event for a user, using the unique id you created them with
exports.sendEmail = function(data)
{
	var fs = require('fs')
    , ini = require('ini');
    var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));


	data.content.sitename = configed['section']['common']['title'];
	if(typeof(data.content.activeurl) === 'undefined')
	{
	  data.content.activeurl = '';	
	}	
	data.content.siteurl = global.url;
	//data.content = defaults.concat(data.content);
	console.log("All data is "+JSON.stringify(data));

	cio.track(this.uid, data.event, data.content,function(err, res){
		if (err != null) {
			console.log('ERROR', err);
		}
		console.log('response headers', res.headers);

	});
}

