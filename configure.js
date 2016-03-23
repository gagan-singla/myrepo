var mysql = require('mysql');

var data = [];
var fs = require('fs')
  , ini = require('ini');


//saving array

exports.app = function()
{  
	var config_app = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
	config = config_app['section'];
	delete global;
	global = [];
	global.database = config['database'];
	global.dbconfig = {
		  host : global.database.host,
		  user : global.database.user,
		  password: global.database.password,
		};
	function handleDisconnect()
	{	
		global.connect = mysql.createConnection(global.dbconfig); 
		//console.log(config);
		global.connect.connect();
		global.connect.query('use '+global.database.database);
		global.connect.on('close', function (err) {
		  handleDisconnect();
		});
		global.connect.on('end', function (err) {
		  handleDisconnect();
		});
		global.connect.on('error', function(err) {
	      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
	          handleDisconnect();                        
		    } 
		    else {
			  console.log(err);
			  //throw err;
			}
		});
		global.mysql = global.connect;
    }
	//console.log(global);
	handleDisconnect();
	
	global.paths =    config['common'];
	global.seo  =    config['seo'];
	global.common =   config['common'];
	global.general = config['general'];
	global.paypal =   config['paypal'];
	global.captcha =  config['captcha'];
	global.language =  config['language'];
	global.customerio =  config['customerio'];
	global.card =  config['card'];
	global.facebook = config['facebook'];
	global.linkedin = config['linkedin'];
    global.braintree = config['braintree'];
    global.voguepay = config['voguepay'];
	global.homepage = config['homepage'];
	global.webservice = config['webservice'];
	global.stores = config['stores'];
	global.unsub_url = global.url+'/unsubscribe_email';
	global.deals_of_the_day = global.homepage.deals_of_the_day;

	global.emaillocal  = config['localmail'];
	global.emailcio  = config['customeriomail'];
	global.smstwo  = config['twilliosms'];
	global.stripe = config['stripe'];
	global.authorizenet = config['authorizenet'];


	global.surl = global.paths.url;
	global.port = global.paths.port;
	global.url  = global.surl+':'+global.port;
	global.title = global.common.title;
	global.path = global.paths.path;
	global.spath = global.url+'/';
	//data['surl'] += '/node/node1/penny/trunk/';
	global.dpath = global.spath;
	global.externalcss = global.spath+'css/';
	global.externaljs = global.spath+'js/';
	global.imgpath = global.url+'/uploads/';
	
	global.captachapublickey = global.captcha['publickey'];
	global.captachaprivatekey = global.captcha['privatekey'];
	global.referral_bonus = 20;
	global.language_identifier = JSON.parse(fs.readFileSync('./'+global.language['language']+'_language.json', 'utf-8'));
	var braintree = require('braintree');
	global.bcustomer_prefix = global.braintree.customerprefix;
	global.bgateway = braintree.connect({
                          environment: (global.braintree.sandbox == 'yes') ? braintree.Environment.Sandbox : braintree.Environment.Production,
                          merchantId: global.braintree.merchantId,
                          publicKey: global.braintree.publicKey,
                          privateKey: global.braintree.privateKey
                        });
	//console.log(global.countries);
	global.seourl = '';
	var mysqlis = require('./module/mysqli');
	global.seourl = mysqlis.seoURL(global.seo.enable);
	console.log('seoenable');
	console.log(global.seo.enable);
	//console.log(global.seourl);
	if(typeof(global.countries) === 'undefined')
	{
		common = require('./module/common');
		q = require('q');

	    q.all([common.fetchCountries(global.mysql)]).then(function(results)
	    {
	        global.countries = results[0][0];
	    });
	}	
	
	/*common = require('./module/common');
		q = require('q');
	    q.all([common.categoryDropdown(global.mysql)]).then(function(results)
	    {
	        global.category = results[0][0];

	        if(results[0][0].length >0)
			{
			 var async = require('async');
			 async.each(results[0][0], common.productSubCategories, function(err) {
	           		   global.subcategory = results1[0][0];
	           		   for(ii in global.subcategory)
			           {
			           		console.log("sub category:"+global.subcategory[ii]['name']);
			           }
	        
			 });


	         for(i in global.category)
	           {
	           		q.all([common.productSubCategories(global.mysql,global.category[i]['id'])]).then(function(results1){
	           		   global.subcategory = results1[0][0];
	           		   for(ii in global.subcategory)
			           {
			           		console.log("sub category:"+global.subcategory[ii]['name']);
			           }
	           		});
	           		console.log("Parent category:"+global.category[i]['name']);
	           }
			
	    });*/


   return global;

}
