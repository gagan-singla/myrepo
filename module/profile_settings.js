var common = require('./common');
var  util    = require('util');  
var session = require('express-session');  
var mysqli = require('./mysqli'); 
var q = require('q');
var fs = require('fs');
//var products = require('./products');
var common = require('./common');
var url = require('url');
//configure = require('../configure');
//default setters
/*config = configure.app();*/
exports.saveADetails = function(req,mysql,q)
{
	 $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,'cnx255'); 
    var escape_data =  [req.body.zipcode,req.body.state,req.body.city,req.body.country,req.body.address,req.body.address2,req.session.userid];
    
    console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.addShippingDetails= function(req,mysql,q)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,'cnx247'); 
    var escape_data =  [req.param('f_name'),req.param('l_name'),req.param('email'),req.param('phone'),req.param('address'),req.param('country'),req.param('state'),req.param('city'),req.param('zipcode'),req.session.userid];
    
    console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.updateShippingDetails= function(req,mysql,q)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,'cnx248'); 
    var escape_data =  [req.param('f_name'),req.param('l_name'),req.param('email'),req.param('phone'),req.param('address'),req.param('country'),req.param('state'),req.param('city'),req.param('zipcode'),req.session.userid];
    
    console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.profileDetails = function(req,mysql,q,fields)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,25);
    var uid = (typeof(req.param('viewuid')) === 'undefined') ?    req.session.userid : req.param('viewuid') 
    escape_fields = [fields,uid];

	
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.shippingDetails = function(req,mysql,q,id)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,'cnx246'); 
    escape_fields = [id]
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
	
	query.on('error',function(err){
		console.log(err.stack);
	})
	return defered.promise;
}
exports.saveDetails = function(req,mysql,q)
{
	$mysqli = {};
	var defered = q.defer();
	var userdet = req.body; 
	q.all(this.profileDetails(req,config.mysql,q,['image','avatar'])).then(function(results){ 
	userdet.image = (typeof(req.files.profile_image) !== 'undefined') ? req.files.profile_image.name : results[0][0]['avatar'];
	userdet.avatar =(typeof(req.files.profile_image) !== 'undefined') ? req.files.profile_image.originalname : results[0][0]['image'];
	if(typeof(req.files.profile_image) !== 'undefined') 
	{
		fs.unlink(config.path+"public/uploads/profile/"+results[0][0]['avatar'], function (err) {
		if (!err)
		console.log('successfully deleted '+results[0][0]['avatar']);
	});
	}
	if(req.session.phone == userdet.phone){
    	strQuery = mysqli.mysqli($mysqli,54); 
    }
    else{
    	strQuery = mysqli.mysqli($mysqli,'newphone'); 
    }
    escape_fields = [userdet.email,userdet.firstname,userdet.lastname,userdet.aboutme,userdet.image,userdet.avatar,userdet.address1,userdet.address2,userdet.country,userdet.state,userdet.city,userdet.zip,userdet.phone,userdet.url,userdet.paypal_address,req.session.userid]
 
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
	req.session.email =  req.body.email;
	req.session.phone =  req.body.phone;
	req.session.first_name =  req.body.firstname;
	req.session.last_name =  req.body.lastname;
	req.session.country = req.body.country;
	
});
	return defered.promise;
}

exports.managecategories = function(req,mysql,q,mcat)
{
    $mysqli = {};
	var defered = q.defer();

		q.all(this.checkProfilecategory(req,mysql,q,mcat)).then(function(results){ 
		if(results[0].length == 0)
		{			
			 strQuery = mysqli.mysqli($mysqli,116); 
		     escape_fields = [req.session.userid,mcat] 
			 query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
		}
		
		});
	
	return defered.promise;
}

exports.checkProfilecategory = function(req,mysql,q,userCid)
{
    $mysqli = {};
	var defered = q.defer();
    strQuery = mysqli.mysqli($mysqli,114); 
    var uid = (typeof(req.param('viewuid')) === 'undefined') ?    req.session.userid : req.param('viewuid'); 
    //escape_fields = [fields,uid]
    escape_fields = [uid,userCid]; 
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());	
	return defered.promise;
}

exports.removeCategories = function(req,mysql,q)
{
     var cateArray = '';
	 if(typeof(req.body.categories) =='undefined')
	 	implodeats = '0';
	 else
	 {
		 cateArray  = req.body.categories;
	     implodeats = cateArray.join(',');
	 }
	 
	 $mysqli = {};
	 var defered = q.defer();
     strQuery = mysqli.mysqli($mysqli,115); 
     escape_fields = [req.session.userid,implodeats] 
	 query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
	 return defered.promise;
}
exports.listUserCategories = function(req,mysql,q)
{
	 $mysqli = {};
	 var defered = q.defer();
     strQuery = mysqli.mysqli($mysqli,117); 
     escape_fields = [req.session.userid] 
	 query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
	 return defered.promise;
}