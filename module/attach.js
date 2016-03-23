var fs = require('fs');
//config = configure.app();
var mysqli = require('./mysqli');
var dateFormat = require('dateformat');
exports.save = function(obj,req,res)
{  
     

    /*var isupload = false;
       
	if(obj == 'product' && typeof(req.files.product_image) !== 'undefined')
	{	
	 
	 var file = req.files.product_image;	
	 var path = config.path+'/uploads/'+file.name;
	 var dest = config.path+'/uploads/product/'+file.name;
	 var isupload = true;     
    }
	file = '';
	if(typeof(req.files.product_image) !== 'undefined')
	{
	 var file = req.files.product_image;
	}
	if(typeof(req.files.profile_image) !== 'undefined')
	{
	 var file = req.files.profile_image;
	}	
	if(typeof(req.files.blog_image) !== 'undefined')
	{
	 var file = req.files.blog_image;
	}
	if(file != '')
	{	
		 var path = config.path+'/uploads/'+file.name;
		 var dest = config.path+'/public/uploads/'+obj+'/'+file.name;
		 var isupload = true; 
	    if(isupload)
	    {
	    	fs.rename(path,dest, function(err){
	   
		    });
	    }
	}*/
	 
    
	
}

exports.showProducts = function(req,mysql,q)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,164);
	//console.log(strQuery);
	var defered = q.defer();
	var escape_string = [req.param('id')];

	query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());

	return defered.promise;
}

exports.addProductAttachmentchange= function(m1,mysql,q,pro_id)
{
	$mysqli = {};
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	strQuery = mysqli.mysqli($mysqli,"insert_img");
//console.log(strQuery);
	var defered = q.defer();
	m = m1;

	var escape_string = [m.originalName,m.name,datge,pro_id];

	query = mysql.query(strQuery,escape_string,defered.makeNodeResolver());
	console.log("query addProductAttachmentchange"+query.sql);
	query.on('error',function(err){
		console.log(err.stack);
	})
	return defered.promise;
}

exports.updateproductimage= function(m1,mysql,q,id)
{
	$mysqli = {};
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	strQuery = mysqli.mysqli($mysqli,"update_projectid_in_imgtable");
	//console.log(strQuery);
	var defered = q.defer();
	//m = m1;
	//console.log(m);
	var escape_string = [id,m1];
	console.log(escape_string);
	query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());
	console.log("Query issssss "+query.sql);
	query.on('error',function(err){
		console.log(err.stack);
	})

	return defered.promise;
}

exports.deleteProductAttachment= function(m1,mysql,q)
{
	$mysqli = {};
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	strQuery = mysqli.mysqli($mysqli,'delete_images');
	//console.log(strQuery);
	var defered = q.defer();
	m = m1;
	console.log(m);
	var escape_string = [m];
	console.log(escape_string);
	query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());
	console.log("Query issssssssssss "+query.sql);
	query.on('error',function(err){
		console.log(err.stack);
		throw err;
	});
	return defered.promise;
}
