var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
var mysql = [];
var callback = '';
var lft = 0;
var rgt = 0;
var cnt = 0;
exports.getAllCategory = function(req,mysql,q,id,limit)
{
	
	    $mysqli =  {};
        var escape_data =  [];
        
        	
		strQuery = mysqli.mysqli($mysqli,274);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.updatePageContent = function(req,res,mysql,q)
{
	    $mysqli =  {};
        var escape_data =  [req.param('editor1'),req.param('id')];
        console.log(escape_data);
		strQuery = mysqli.mysqli($mysqli,'static3');	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.showstaticContent =function(req,res,mysql,q)
{
	    $mysqli =  {};
        var escape_data =  [req.param('id')];
		strQuery = mysqli.mysqli($mysqli,'static2');	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.showstaticPages =function(req,res,mysql,q)
{
	    $mysqli =  {};
        var escape_data =  [];
		strQuery = mysqli.mysqli($mysqli,'static1');	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}

exports.approveProduct =function(req,mysql,q)
{
       $mysqli =  {};
        var escape_data =  [req.param('id')];
        
        console.log(escape_data);	
		strQuery = mysqli.mysqli($mysqli,'271');	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.updatePaid =function(req,mysql,q,id)
{
       $mysqli =  {};
        var escape_data =  [id];
        
        console.log(escape_data);	
		strQuery = mysqli.mysqli($mysqli,'cnx253');	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.updateLftRgtCategories = function(req,mysql,q,lft,rgt,id)
{
       $mysqli =  {};
        var escape_data =  [lft,rgt,id];
        
        console.log(escape_data);	
		strQuery = mysqli.mysqli($mysqli,264);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.deleteCategories = function(req,mysql,q)
{
	$mysqli =  {};
	
    var escape_data =  [req.param('id'),req.param('id')];
    
    console.log(escape_data);	
	strQuery = mysqli.mysqli($mysqli,265);	    
    var defered = q.defer();
    
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	$mysqli =  {};
    var escape_data =  [req.param('id')];
    
    console.log(escape_data);	
	strQuery = mysqli.mysqli($mysqli,266);	    
    var defered = q.defer();
    
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
}
exports.categoryupdate = function(req,mysql,q)
{
	$mysqli =  {};
	datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [req.body.categories,req.body.title,req.body.description,datenow,req.body.id];
    
    console.log(escape_data);	
	strQuery = mysqli.mysqli($mysqli,261);	    
    var defered = q.defer();
    
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	if(req.body.opid != req.body.categories)
    {
		$mysqli =  {};
	    var escape_data =  [req.body.categories,req.body.id];
	    
	    console.log(escape_data);	
		strQuery = mysqli.mysqli($mysqli,262);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    }
}
exports.addProductionAnswer = function(req,mysql,q,id)
{
	$mysqli =  {};
    var escape_data =  [id];
    
    console.log(escape_data);	
	strQuery = mysqli.mysqli($mysqli,260);	    
    var defered = q.defer();
    
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
   if(typeof(req.param('questions')) !== 'undefined')
   {
   	for(i in req.param('questions'))
   	{
   		$mysqli =  {};
   		var ans  = (req.param('questions')[i] instanceof Array) ? req.param('questions')[i].join(',') : req.param('questions')[i];
        var escape_data =  [id,req.param('questions_id')[i],ans];
        
        console.log(escape_data);	
		strQuery = mysqli.mysqli($mysqli,258);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		//return defered.promise;
   	}
   
   }	
	
}
exports.categoriesQuestionDetail = function(req,mysql,q)
{
	    $mysqli =  {};
        var escape_data =  [req.param('id')];
        
        console.log(escape_data);	
		strQuery = mysqli.mysqli($mysqli,255);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.createQuestion = function(req,mysql,q)
{
	    $mysqli =  {};
	    if(!req.body.value)
	    {
	    	req.body.value = '';
	    }
	    if(!req.body.default)
	    {
	    	req.body.default = '';
	    }
	    if(!req.body.required)
	    {
	    	req.body.required = 0;
	    }
        var escape_data =  [req.body.cid,req.body.name,req.body.value,req.body.type,req.body.default,req.body.required];
        
        console.log(escape_data);	
		strQuery = mysqli.mysqli($mysqli,254);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.updateQuestion = function(req,mysql,q)
{
	    $mysqli =  {};
	    if(!req.body.value)
	    {
	    	req.body.value = '';
	    }
	    if(!req.body.default)
	    {
	    	req.body.default = '';
	    }
	    if(!req.body.required)
	    {
	    	req.body.required = 0;
	    }
        var escape_data =  [req.body.name,req.body.value,req.body.type,req.body.default,req.body.required,req.body.id];
        
        console.log(escape_data);	
		strQuery = mysqli.mysqli($mysqli,256);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.categoriesDetail = function(req,mysql,q)
{
	    $mysqli =  {};
        var escape_data =  [req.param('cid')];
        
        	
		strQuery = mysqli.mysqli($mysqli,253);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.categoriesQuestion = function(req,mysql,q)
{
	    $mysqli =  {};
        var escape_data =  [req.param('cid')];
        
        	
		strQuery = mysqli.mysqli($mysqli,252);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.getChildCategory = function(req,mysql,q,id)
{
	    $mysqli =  {};
        var escape_data =  [id];
        
        console.log(escape_data); 	
		strQuery = mysqli.mysqli($mysqli,263);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.getCategoryList= function() {
 var admin = require('./admin');
  
  //console.log('category id is :'+cat_id);
  admin.mysql.query("SELECT * FROM `categories` order by parent_id asc", function(error, results, fields) { 
  //var self = this; 
  	 
    async.each(results, admin.getSubCategoryList, function(err, subcategories) { 	
    	console.log(admin.cnt);   
    });
  });
}
exports.getSubCategoryList= function(id,cb) {
	var admin = require('./admin');
  var cat_id =  id['id'];
  
  console.log('category id is :'+cat_id);
  admin.mysql.query("SELECT * FROM `categories` WHERE `parent_id` = " + cat_id, function(error, results, fields) { 
  //var self = this;
  console.log(results);
  if(results.length == 0)
  {
  	
  	cb(null);
  } 	 
    async.each(results, admin.getSubCategoryList, function(err, subcategories) { 
        admin.cnt += 1;
    });
  });
}
exports.changeEscrowPayment = function(req,mysql,q,m)
{
        $mysqli =  {};
        
        
		    strQuery = mysqli.mysqli($mysqli,'cnx243');	
		    var escape_data =  [m,req.body.id];
			    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.getBuyNowRecord = function(req,mysql,q)
{
        $mysqli =  {};
        
        
		    strQuery = mysqli.mysqli($mysqli,'cnx242');	
		    var escape_data =  [req.body.id];
			    console.log(escape_data);
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.escrowPayments = function(req,mysql,q,cnt)
{
        $mysqli =  {};
        
        if(cnt == 0)
        {
        	strQuery = mysqli.mysqli($mysqli,'cnx240');
        	var escape_data =  [(req.body.page-1)*10];
        }		 
		else
		{
		    strQuery = mysqli.mysqli($mysqli,'cnx241');	
		    var escape_data =  [];
		}	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.allWithdraw = function(req,mysql,q,cnt)
{
        $mysqli =  {};
        var escape_data =  [(req.body.page-1)*10];
        msq = 172;
        if(cnt == 1)
        {
        	var escape_data =  [];
        	msq = 174;
        }	
		strQuery = mysqli.mysqli($mysqli,msq);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.selectMaxrgt = function(req,mysql,q)
{
	   $mysqli =  {};

	   if(req.body.categories == 0)
	   {
	   	var escape_data =  [];
		strQuery = mysqli.mysqli($mysqli,176);
	   }	
	   else
	   {
	   	var escape_data =  [req.body.categories];
		strQuery = mysqli.mysqli($mysqli,179);
	   }	
        	    
	    var defered = q.defer();
	    //datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    

		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.updateLeft = function(req,mysql,q)
{
	   $mysqli =  {};
       
		strQuery = mysqli.mysqli($mysqli,178);	    
	    var defered = q.defer();
	    //datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    var escape_data =  [req.body.mrgt];
        console.log(escape_data);
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.updateRight = function(req,mysql,q)
{
	   $mysqli =  {};
       
		strQuery = mysqli.mysqli($mysqli,177);	    
	    var defered = q.defer();
	    //datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    var escape_data =  [req.body.mrgt];

		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.getWithdraw = function(req,mysql,q,id)
{
        $mysqli =  {};
       
		strQuery = mysqli.mysqli($mysqli,664);	    
	    var defered = q.defer();
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    var escape_data =  [id];

		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.userBalanceUpdate  = function(req,mysql,q,amount,userid)
{
        $mysqli =  {};
       
		strQuery = mysqli.mysqli($mysqli,663);	    
	    var defered = q.defer();
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    var escape_data =  [amount,userid];

		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.paidWithdraw = function(req,mysql,q)
{
        $mysqli =  {};
       
		strQuery = mysqli.mysqli($mysqli,173);	    
	    var defered = q.defer();
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    var escape_data =  [datge,req.param('id')];

		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.addDigitalAttachment =  function(val,mysql,q,pid)
{
	$mysqli =  {};

	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		strQuery = mysqli.mysqli($mysqli,341);	    
	    var defered = q.defer();
	    var escape_data =  [val.name,val.originalname,datge,pid];
	    console.log(escape_data);    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	query.on('error',function(err){
		console.log(err.stack);
		throw err;
	})
		return defered.promise;
}
exports.addAttachment =  function(val,mysql,q,pid)
{
	$mysqli =  {};
		
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		strQuery = mysqli.mysqli($mysqli,163);	    
	    var defered = q.defer();
	    console.log('******************************');
	    console.log(val);
	    console.log('******************************');
	    var escape_data =  [val.name,val.originalName,datge,pid];
	    console.log(escape_data);    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		var fs = require('fs')
     	var gm = require('gm').subClass({imageMagick: true});
        var watermark = global.paths.path+'public/uploads/product/xpng.png';
        var pathTo = global.paths.path+'public/uploads/product/'+val.name
        var pathFrom = pathTo;

        gm(pathFrom).
        gravity('SouthEast').
        draw(['image Over 0,0 0,0 "'+watermark+'"']).
        noProfile().
        write(pathTo, function (err) {
            console.log(err);
        });
	query.on('error',function(err){
		console.log(err.stack);
		throw err;
	})
		return defered.promise;
}
exports.deleteAttachment =  function(mysql,q,req)
{
	
	if(typeof(req.body.image) !== 'undefined')
	{
		if(req.body.image.length > 0)
	    {	
       	    var del = req.body.image_id.join().replace(/("|')/g, "");
	       
	    } 
	    else
	    {
	    	req.body.avatar = '';
	    	req.body.image = '';
	    	var del = 0;
	    } 
	}	
	else
    {
    	req.body.avatar = '';
    	req.body.image = '';
    	var del = 0;
    } 
	 $mysqli =  {'delete':del};
			strQuery = mysqli.mysqli($mysqli,165);	    
		    var defered = q.defer();
		    
		    var escape_data =  [req.body.id];
		    console.log(escape_data);    
			query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
			return defered.promise;
		
}
exports.exportProjectDashboard = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		strQuery = mysqli.mysqli($mysqli,59);	    
	    var defered = q.defer();
	    
	    var escape_data =  [datge,datge,datge,datge,datge,datge];
	    console.log(escape_data);    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.saveBlog = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		    
	    var defered = q.defer();
	    if(req.body.id <= 0)
	    {
	    	strQuery = mysqli.mysqli($mysqli,96);	
	        var escape_data =  [req.param('title'),	                       
                            req.param('description'),datge,req.session.userid,'open'];
	    }	
	    else
	    {
	    	strQuery = mysqli.mysqli($mysqli,98);	
	        var escape_data =  [req.param('title'),	                        
                            req.param('description'),req.body.id];
	    }	
	    
	    console.log(escape_data);    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.selblog = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    id = req.param('id');
		strQuery = mysqli.mysqli($mysqli,97);	    
	    var defered = q.defer();
	    
	    var escape_data =  [id];
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.publishBlog = function(req,mysql,q)
{
        id = req.param('id');
        if(id > 0)
        {

        	strQuery = mysqli.mysqli($mysqli,100);	    
	        var defered = q.defer();
	        status = 'open';
	        if(req.body.action == 'unpublish')
	        {
	        	status = 'unpublish';
	        }	
	         var escape_data =  [status,id];
	        console.log(escape_data);                    
		        
			query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
			return defered.promise;
        }
		
}
exports.blogupload = function(req,mysql,q)
{

	if(typeof(req.files.blog_image) !== 'undefined')
    {
    	 
	   $mysqli =  {};
       	   
	    id = req.body.id;

		strQuery = mysqli.mysqli($mysqli,99);	    
	    var defered = q.defer();
	    
	    var escape_data =  [ (typeof(req.files.blog_image) !== 'undefined') ? req.files.blog_image.originalname : '',
                            (typeof(req.files.blog_image) !== 'undefined') ? req.files.blog_image.name : '',id];
        console.log(escape_data);                    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
	}
}
exports.exportUserDashboard = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		strQuery = mysqli.mysqli($mysqli,60);	    
	    var defered = q.defer();
	    
	    var escape_data =  [datge,datge,datge,datge,datge,datge];
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}

exports.allreviews = function(req,mysql,q,count)
{
	   $mysqli =  {};
       	   
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    if(count == 1)
	    {	
		 strQuery = mysqli.mysqli($mysqli,93);
		 var escape_data =  [];	
	    }
	    else
	    {
	     strQuery = mysqli.mysqli($mysqli,92);
	     var page = (req.body.page-1)*10;
		 var escape_data =  [page];	
		 console.log(escape_data)    
		 //var escape_data =  [];	
	    }	
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}

exports.reviews_dispute = function(req,mysql,q,count)
{
	   $mysqli =  {};
       	var uid = req.session.userid;   
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    if(count == 1)
	    {	
		 strQuery = mysqli.mysqli($mysqli,808);
		 var escape_data =  [uid];	
	    }
	    else
	    {
	     strQuery = mysqli.mysqli($mysqli,808);
	     var page = (req.body.page-1)*10;
		 var escape_data =  [uid,page];	
		 console.log(escape_data)    
		 //var escape_data =  [];	
	    }	
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}


exports.deletereviews = function(req,mysql,q){

	$mysqli = {};
	var tempid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,838);
	var defered =q.defer();
	escape_data = [tempid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}


exports.feedbacks = function(req,mysql,q,count)
{
	   require('date-util');
	   $mysqli =  {};
       	   
	   var datge = new Date().strtotime("1 day ago").format("yyyy-mm-dd HH:MM:ss");
	   console.log('.........'+datge+'..........');
	    if(count == 1)
	    {	
		 strQuery = mysqli.mysqli($mysqli,799);
		 var escape_data =  [datge];	
	    }
	    else
	    {
	    var page = req.body.page;
	    var perlimit = req.body.perlimit;
	     strQuery = mysqli.mysqli($mysqli,800);
	     page = (page > 0) ? (page-1)*perlimit : 0;
		 var escape_data =  [page,perlimit];	
		 console.log(escape_data)    
		 //var escape_data =  [];	
	    }	
	    var defered = q.defer();
	    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.alldispute= function(req,mysql,q,count)
{
	   $mysqli =  {};
       	   
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    if(count == 1)
	    {	
		 strQuery = mysqli.mysqli($mysqli,169);
		 var escape_data =  [];	
	    }
	    else
	    {
	     strQuery = mysqli.mysqli($mysqli,168);
	     var page = (req.body.page-1)*10;
		 var escape_data =  [page];	
		 console.log(escape_data)    
		 //var escape_data =  [];	
	    }	
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.allblog = function(req,mysql,q,count)
{
	   $mysqli =  {};
       	   
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    if(count == 1)
	    {	
		 strQuery = mysqli.mysqli($mysqli,95);
		 var escape_data =  [];	
	    }
	    else
	    {
	     strQuery = mysqli.mysqli($mysqli,94);
	     page = (req.body.page - 1) * 10;
		 var escape_data =  [page];	
		 console.log(escape_data)    
		 //var escape_data =  [];	
	    }	
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.exportTransactionDashboard = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		strQuery = mysqli.mysqli($mysqli,340);	    
	    var defered = q.defer();
	    
	    var escape_data =  [datge,datge,datge,datge,datge,datge];
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.transactionSearch = function(req,mysql,q,count)
{
	    var dateFormat = require('dateformat');
	  
       	console.log(req.param('status'));   
	    
	    mysq = 80;
	    where = '';
	    where += (typeof(req.param('userid')) !== 'undefined' && req.param('userid') != '') ? ' and i.user_id = "'+req.param('userid')+'"' : where;
	    //where += (typeof(req.param('projectid')) !== 'undefined' && req.param('projectid') != '') ? ' and p.project_id = '+req.param('projectid') : where;
	    where += (typeof(req.param('projectid')) !== 'undefined' && req.param('projectid') != '') ? 'and ((i.type in ("sold","winner") and i.primary_id = "'+req.param('projectid')+'") OR (i.type in ("bid") and i.primary_id IN (select b.id from bids as b where b.project_id = "'+req.param('projectid')+'")))' : '';
	    where += (typeof(req.param('trans_id')) !== 'undefined' && req.param('trans_id') != '') ? ' and i.transactionid = "'+req.param('trans_id')+'"' : where;
	    where += (typeof(req.param('status')) !== 'undefined' && req.param('status') != '' && req.param('status') == 'sold') ? 'and (i.type in ("sold","winner") ) and i.status="paid"': where;
	     where += (typeof(req.param('status')) !== 'undefined' && req.param('status') != '' && req.param('status') == 'buynow') ? 'and (i.type in ("sold") )': where;
	      where += (typeof(req.param('status')) !== 'undefined' && req.param('status') != '' && req.param('status') == 'bid') ? 'and (i.type in ("winner") )': where;
	      where += (typeof(req.param('status')) !== 'undefined' && req.param('status') != '' && req.param('status') == 'winner') ? 'and (i.type in ("winner") and i.status="paid" )': where;
	    if(typeof(req.param('from_date')) !== 'undefined' && req.param('from_date') != '') 
	    {
         date1 = dateFormat(new Date(req.param('from_date')),'yyyy-mm-dd');
         where += ' and i.date_added >= "'+date1+' 00:00:00"';
	    } 
	    if(typeof(req.param('to_date')) !== 'undefined' && req.param('to_date') != '') 
	    {
         date2= dateFormat(new Date(req.param('to_date')),'yyyy-mm-dd');
         where += ' and i.date_added <= "'+date2+' 23:59:59"';
	    } 
	   
	    
	    $mysqli =  {where : where};
        console.log($mysqli);
	    var escape_data =  [(req.body.page - 1) * 10];

	    if(count == 0)
	    {
             mysq = 81;
             escape_data =  [];
	    }	
	    else if(count == 2)
	    {
             mysq = 82;
             escape_data =  [];
	    }

		strQuery = mysqli.mysqli($mysqli,mysq);	    
	    var defered = q.defer();

	console.log("qry iss "+strQuery);
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.userProductSearch = function(req,mysql,q,count)
{
	    var dateFormat = require('dateformat');
       	   
	    
	    mysq = 74;
	    where = '';
	    where += (typeof(req.param('title')) !== 'undefined' && req.param('title') != '') ? ' and p.title like "%'+req.param('title')+'%"' : where;
	    where += (typeof(req.param('id')) !== 'undefined' && req.param('id') != '') ? ' and p.id = '+req.param('id') : where;
	    status = (typeof(req.param('status')) !== 'undefined' && req.param('status') != '') ? req.param('status') : '';
	    date1 = dateFormat(new Date(),'yyyy-mm-dd HH:MM:ss');
	    if(status == 'open')
	    {
           where += ' and p.date_added <= "'+date1+'" and p.date_closed >= "'+date1+'" and p.market_status = "open"'; 
	    }	
        if(status == 'closed')
	    {
           where += ' and p.date_closed < "'+date1+' " and p.market_status = "closed"'; 
	    }
	    if(status == 'future')
	    {
           where += ' and p.date_added > "'+date1+'" and  p.date_closed > "'+date1+'"'; 
	    }
	    if(status == 'sold')
	    {
           where += ' and p.market_status = "sold"'; 
	    }
	    if(status == 'delete')
	    {
           where += ' and p.market_status = "removed"'; 
	    }
	    $mysqli =  {where : where};

	    var escape_data =  [];
	    if(count == 0)
	    {
             mysq = 73;
             escape_data =  [(req.body.page - 1) * 10];
	    }	

		strQuery = mysqli.mysqli($mysqli,mysq);	    
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}

exports.updateUser = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    
		strQuery = mysqli.mysqli($mysqli,54);	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.body.email,req.body.first_name,req.body.last_name,req.body.aboutme,req.body.avatar,req.body.image,req.body.address1,req.body.address2,req.body.country,req.body.state,req.body.city,req.body.zip,req.body.phone,req.body.profile_url,req.body.paypal_address,req.body.status,req.body.id];
	    console.log(escape_data);    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	query.on('error',function(err){
		throw err;
	})
		return defered.promise;
}
exports.updateUserStatus = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    
		strQuery = mysqli.mysqli($mysqli,69);	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.body.status,req.body.id];
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.updateUserPassword = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    
		strQuery = mysqli.mysqli($mysqli,57);	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.body.password,req.body.salt,req.body.id];
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.listUserCategories = function(req,mysql,q)
{
	 $mysqli = {};
	 var defered = q.defer();
     strQuery = mysqli.mysqli($mysqli,117); 
     escape_fields = [req.body.id] 
	 query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
	 return defered.promise;
}

exports.userdelete = function(req,mysql,q){

	$mysqli = {};
	var uid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,701);
	var defered =q.defer();
	escape_data = [uid];
	console.log(strQuery );
	console.log('delete');
	console.log( uid );


	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	//console.log(feedid);

}
exports.managecategories = function(req,mysql,q,mcat)
{
    $mysqli = {};
	var defered = q.defer();

		q.all(this.checkProfilecategory(req,mysql,q,mcat)).then(function(results){ 
		if(results[0].length == 0)
		{			
			 strQuery = mysqli.mysqli($mysqli,116); 
		     escape_fields = [req.body.id,mcat] 
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
    escape_fields = [req.body.id,userCid] 
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
	 //	 console.log(33333333333);
	 $mysqli = {};
	 var defered = q.defer();
     strQuery = mysqli.mysqli($mysqli,115); 
     escape_fields = [req.body.id,implodeats] 
	 query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
	 return defered.promise;
}
exports.editUser = function(req,mysql,q)
{
	   $mysqli =  {};
       	   
	    
		strQuery = mysqli.mysqli($mysqli,25);	    
	    var defered = q.defer();
	    
	    var escape_data =  [['email','first_name','last_name','balance','id','avatar','aboutme','password_hash','password_salt','status','image','address1','address2','country','state','city','zip','phone','profile_url','paypal_address'],req.body.id];
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}

exports.userList = function(req,mysql,q,count)
{
	    $mysqli =  {};
       	
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	    page = (req.body.page - 1) * 10;
	    if(req.body.action == 'all' && count == 1)
	    {
            strQuery = mysqli.mysqli($mysqli,64);
	        var escape_data =  [page];
	    }
	    else if(req.body.action == 'cancel' && count == 1)
	    {
	    	strQuery = mysqli.mysqli($mysqli,63);
	        var escape_data =  ['unsubscribe','deactivate',page];
	    }	
	    else if(count == 1)
	    {
	    	 strQuery = mysqli.mysqli($mysqli,62);
	        var escape_data =  [req.body.action,page];
	    }	
		
	    if(req.body.action == 'all' && count == 0)
	    {
            strQuery = mysqli.mysqli($mysqli,67);
	        var escape_data =  [];
	    }
	    else if(req.body.action == 'cancel' && count == 0)
	    {
	    	strQuery = mysqli.mysqli($mysqli,66);
	        var escape_data =  ['unsubscribe','deactivate'];
	    }	
	    else if(count == 0)
	    {
	    	 strQuery = mysqli.mysqli($mysqli,65);
	        var escape_data =  [req.body.action];
	    }		    
	    var defered = q.defer();
	    
	    console.log(escape_data);
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.saveProduct = function(req,mysql,q)
{
	
    $mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,72); 
    
    var defered = q.defer();
    newfilename = {};
    newfilename.name = '';
    newfilename.originalname = '';
    if(typeof(req.files.product_image) !== 'undefined')
    {     
    	 if(typeof(req.files.product_image[0]) === 'undefined')
    	 {

    	 	newfilename.name = req.files.product_image.name;
    	 	newfilename.originalname = req.files.product_image.originalname;
    	 }	
    	 else
	    {
	    	newfilename.name = req.files.product_image[0].name;
    	 	newfilename.originalname = req.files.product_image[0].originalname;
	    }
    }	
    
    var escape_data =  [req.body.title,
                       req.param('description'),
                       (typeof(req.files.product_image) !== 'undefined') ?  newfilename.name : ((typeof(req.body.avatar) !== 'undefined') ? req.body.avatar[0] : ''),
                       (typeof(req.files.product_image) !== 'undefined') ? newfilename.originalname : ((typeof(req.body.avatar) !== 'undefined') ? req.body.image[0] : ''),
		    	       req.param('cid'),
		    	       req.param('tags'),		    	      
		    	       common.currencyConverter(req.param('shipping_fee')),
		    	       req.param('shipping_description'),         
		    	      
		               (typeof(req.param('buynow')) === 'undefined') ? 0 :  req.param('buynow'),
		               (typeof(req.param('feature')) === 'undefined') ? 0 :  req.param('feature'),
		               //dateFormat(new Date(req.body.date_added),"yyyy-mm-dd HH:MM:ss"),
		               //dateFormat(new Date(req.body.date_closed),"yyyy-mm-dd")+' 23:59:59',
		               common.currencyConverter(req.body.sprice),
		               common.currencyConverter(req.body.rprice),
		               common.currencyConverter(req.body.bprice),
		               common.currencyConverter(req.body.mprice),
		               (typeof(req.param('auction')) === 'undefined') ? 0 :  req.param('auction'),
		               (typeof(req.param('is_location')) === 'undefined') ? 0 :  req.param('is_location'),
		               (typeof(req.param('document')) === 'undefined') ? 0 :  req.param('document'),
		               (typeof(req.param('work_loc')) === 'undefined') ? 0 :  req.param('work_loc'),
		               (typeof(req.param('auction')) === 'undefined' || req.param('auction') == 0) ? req.param('qty') : 1,
		               (typeof(req.param('paypal_email')) === 'undefined') ? req.param('paypal_email') : '',
		               (typeof(req.param('save')) === 'undefined') ? 'draft' : 'open',
		               req.body.id]       
		               console.log(req.body);   
		               console.log(escape_data);	     
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.userListSearch = function(req,mysql,q,count)
{
	    //$mysqli =  {};
	    
	    $mysqli =  {email:req.body.email,last_name:req.body.last_name,status:req.body.status,first_name:req.body.first_name}
	    page = (req.body.page - 1) * 10;
	    escape_data = [];
       	if(count == 0)
	    {
	    	 strQuery = mysqli.mysqli($mysqli,71);	       
	    }	
	    else
	    {
	    	strQuery = mysqli.mysqli($mysqli,70);
	    	escape_data = [page];
	    }   
	    var defered = q.defer();
	    
	    console.log(escape_data);
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.addUser = function(req,mysql,q,count)
{
	    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	     var md5 = require('MD5');
	     var password_salt = '12345'
	     var password = md5(md5(req.body.password)+password_salt);
	console.log(req.body);
    $mysqli = {
    	       email:req.body.email,
    	       role:1,    	       
    	       created_at:datge,
    	       password_hash:password,
    	       password_salt:password_salt,
    	      };
    
	strQuery = mysqli.mysqli($mysqli,11); 
    
    

  var defered = q.defer();
  escape_data = [req.body.first_name,req.body.last_name];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.categoriesList =  function(req,mysql,q,count)
{
	    $mysqli =  {};
	    
	    escape_data = [];
       	if(count == 1)
	    {
	    	 escape_data = [(req.body.page - 1) * 10];
	    	 strQuery = mysqli.mysqli($mysqli,75);	       
	    }	
	    else
	    {
	    	strQuery = mysqli.mysqli($mysqli,76);
	    	escape_data = [];
	    }   
	    var defered = q.defer();
	    
	    console.log(escape_data);
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.selectCategories = function(req,mysql,q)
{
	    $mysqli =  {};
	    
	    escape_data = [req.body.id];

        strQuery = mysqli.mysqli($mysqli,77);	  
       
	    var defered = q.defer();
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.categorySave = function(req,mysql,q)
{
    $mysqli =  {};
   id = req.body.id;
   datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
   title = req.body.title;
   description = req.body.description;
   if(id == 0)
   {
      escape_data = [title,description,datge,datge,req.body.mrgt+1,req.body.mrgt+2,req.body.categories];
      query = 78;
   }
   else
   {
      escape_data = [title,description,datge,id];
      query = 79;
   }	
   console.log(escape_data);
   strQuery = mysqli.mysqli($mysqli,query);	  
       
	    var defered = q.defer();
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
   
}


exports.addbalance = function(req,mysql,q,from_ref)
{
    $mysqli = {}; 
	strQuery = mysqli.mysqli($mysqli,28); 
    var defered = q.defer();
    escape_data = [global.general.referral_bonus,from_ref];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}

exports.deleteFeedback = function(req,mysql,q){

	$mysqli = {};
	var feedid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,801);
	var defered =q.defer();
	escape_data = [feedid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	//console.log(feedid);

}

exports.FeedbackFields = function(req,mysql,q){
	$mysqli = {}; 
	strQuery = mysqli.mysqli($mysqli,802); 
    var defered = q.defer();
    escape_data = [];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}

exports.addFeedbackfield = function(req,mysql,q){

	$mysqli = {};
	var feed_label = req.body.feedlabel;
	var feed_order = req.body.feedorder;
	strQuery = mysqli.mysqli($mysqli,803);
	var defered =q.defer();
	escape_data = [feed_label,feed_order];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.updateFeedbackfield = function(req,mysql,q){

	$mysqli = {};
	var feed_id = req.body.id;
	var feed_label = req.body.title;
	var feed_order = req.body.feed_order;
	strQuery = mysqli.mysqli($mysqli,806);
	var defered =q.defer();
	escape_data = [feed_label,feed_order,feed_id];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.deleteFeedbackfield = function(req,mysql,q){

	$mysqli = {};
	var feedid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,804);
	var defered =q.defer();
	escape_data = [feedid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	//console.log(feedid);

}

exports.feedbackdetailsbyId = function(req,mysql,q){

	$mysqli = {};
	var feedid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,805);
	var defered =q.defer();
	escape_data = [feedid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	//console.log(feedid);

}

exports.FeedbackDatelist = function(req,res,mysql,q){
	require('date-util');
	var datge = req.param('days');
	$mysqli = {};
	
	strQuery = mysqli.mysqli($mysqli,807);
	var defered =q.defer();
	escape_data = [datge];
	
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	

}


exports.addetemplates= function(req,mysql,q,$arr){
	require('date-util');
	$mysqli = {};
	var date_added = $arr.datenow;
	var email_label = req.body.email_name;
	var email_sub = req.body.email_suject;
	var email_type = req.body.email_type;
	
	if(req.body.buyer){var buyer = 1;}else {var buyer =0};
	if(req.body.seller){var seller = 1;}else {var seller =0};
	if(req.body.admin){var admin = 1;}else {var admin =0};
	if(req.body.general){var general = 1;}else {var general =0};

	var method = 'email';
	var email_text = req.body.editor1;
	var status = 1;

	strQuery = mysqli.mysqli($mysqli,820);
	var defered =q.defer();
	escape_data = [email_label,email_sub,email_type,method,email_text,date_added,buyer,seller,admin,general,status];
	console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	console.log('adddddddddd'+defered.promise.insertId);
	return defered.promise;


}

exports.alltemps= function(req,mysql,q,count,type){

	$mysqli = {};
  	var page = req.body.page;
	var perlimit = req.body.perlimit;
	var defered = q.defer();
    page = (page > 0) ? (page-1)*perlimit : 0;
    if(count == 0){
    	var limit = 'limit '+page+','+ perlimit;
	}
	else{

		limit = "";
	}  
	
    $mysqli =  {limit: limit};
    var escape_data =  [type];   
    console.log(escape_data);
    strQuery = mysqli.mysqli($mysqli,'821');             
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	
}

exports.etempsbyId = function(req,mysql,q){

	$mysqli = {};
	var tempid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,822);
	var defered =q.defer();
	escape_data = [tempid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	//console.log(feedid);

}

exports.updateetemplates = function(req,mysql,q){

	$mysqli = {};
	var etemp_id = req.body.id;
	var email_label = req.body.email_name;
	var email_sub = req.body.email_suject;
	var email_type = req.body.email_type;
	var email_text = req.body.editor1;

	if(req.body.buyer){var buyer = 1;}else {var buyer =0};
	if(req.body.seller){var seller = 1;}else {var seller =0};
	if(req.body.admin){var admin = 1;}else {var admin =0};
	if(req.body.general){var general = 1;}else {var general =0};
	

	strQuery = mysqli.mysqli($mysqli,823);
	var defered =q.defer();
	escape_data = [email_label,email_sub,email_type,email_text,buyer,seller,admin,general,etemp_id];
	console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.deletetemp = function(req,mysql,q){

	$mysqli = {};
	var tempid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,824);
	var defered =q.defer();
	escape_data = [tempid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	//console.log(feedid);

}
exports.searchtemplates = function(req,mysql,q,count,type){

	$mysqli = {};
	var where = '';
	if($arr['users'] == 'buyer'){ where += ' and buyer = 1'; }
	else if($arr['users'] == 'seller'){ where += ' and seller = 1';}
	else if($arr['users'] == 'admin'){ where += ' and admin = 1';}
	else if($arr['users'] == 'general'){ where += ' and general = 1';}

	where += (typeof($arr['subjects']) !== 'undefined' && $arr['subjects'] != '') ? ' and subject like "%'+$arr['subjects']+'%"' : where;
	where += (typeof($arr['types']) !== 'undefined' && $arr['types'] != '') ? ' and type = "'+$arr['types']+'"' : where;

  	var page = req.body.page;
	var perlimit = req.body.perlimit;
		  
    var defered = q.defer();
    page = (page > 0) ? (page-1)*perlimit : 0;
    if(count == 0){
    	var limit = 'limit '+page+','+ perlimit;
	}
	else{

		limit = "";
	}  
	
    $mysqli =  {where:where,limit: limit};
    var escape_data =  [type];   
    console.log('wjere'+$arr['users']);
    strQuery = mysqli.mysqli($mysqli,'825');             
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.addstemplates= function(req,mysql,q,$arr){
	require('date-util');
	$mysqli = {};
	var date_added = $arr.datenow;
	var sms_label = req.body.sms_name;
	var sms_sub = req.body.sms_suject;
	var sms_type = req.body.sms_type;
	
	if(req.body.buyer){var buyer = 1;}else {var buyer =0};
	if(req.body.seller){var seller = 1;}else {var seller =0};
	if(req.body.admin){var admin = 1;}else {var admin =0};
	if(req.body.general){var general = 1;}else {var general =0};

	var method = 'sms';
	var sms_text = req.body.editor1;
	var status = 1;

	strQuery = mysqli.mysqli($mysqli,828);
	var defered =q.defer();
	escape_data = [sms_label,sms_sub,sms_type,method,sms_text,date_added,buyer,seller,admin,general,status];
	console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.updatestemplates = function(req,mysql,q){

      $mysqli = {};
      var etemp_id = req.body.id;
      var sms_label = req.body.sms_name;
      var sms_sub = req.body.sms_suject;
      var sms_type = req.body.sms_type;
      var sms_text = req.body.editor1;

      if(req.body.buyer){var buyer = 1;}else {var buyer =0};
      if(req.body.seller){var seller = 1;}else {var seller =0};
      if(req.body.admin){var admin = 1;}else {var admin =0};
      if(req.body.general){var general = 1;}else {var general =0};
      

      strQuery = mysqli.mysqli($mysqli,829);
      var defered =q.defer();
      escape_data = [sms_label,sms_sub,sms_type,sms_text,buyer,seller,admin,general,etemp_id];
      console.log(escape_data);
      query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
      return defered.promise;

}



exports.csvcheckBytitle = function(req,mysql,q,title){
		$mysqli = {};
		var tempid = req.body.id;
		strQuery = mysqli.mysqli($mysqli,826);
		var defered =q.defer();
		escape_data = [tempid];
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}

	exports.addtempbyCSV = function(req,mysql,q,arr){
		$mysqli = {};
		var title = arr['title'];
		var subject = arr['subject'];
		var type =  arr['type'];
		var method = arr['method'];
		var template = arr['template'];
		var date_added = arr['date_added'];
		var buyer = arr['buyer'];
		var seller = arr['seller'];
		var admin = arr['admin'];
		var general = arr['general'];
		var status = arr['status'];

		strQuery = mysqli.mysqli($mysqli,827);
		var defered =q.defer();
		escape_data = [ title, subject, type, method, template, date_added, buyer, seller, admin, general, status ];
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;


	}

	exports.exportfull= function(req,mysql,q,count,type){

	$mysqli = {};
    var defered = q.defer();
    $mysqli =  {};
    var escape_data =  [];   
    console.log(escape_data);
    strQuery = mysqli.mysqli($mysqli,'819');             
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	
}

exports.addmailer = function(req,mysql,q,$arr){
	
	$mysqli = {};
	
	var opt_name = req.body.opt_name;
	var apiuser = req.body.apiuser;
	var apikey = req.body.apikey;
	var type = req.body.type;
	var status = 0;

	strQuery = mysqli.mysqli($mysqli,830);
	var defered =q.defer();
	escape_data = [opt_name,apiuser,apikey,type,status];
	console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	console.log(query);
	return defered.promise;

}

exports.allmailers = function(req,mysql,q,count,type){

	$mysqli = {};
  	var page = req.body.page;
	var perlimit = req.body.perlimit;
	var defered = q.defer();
    page = (page > 0) ? (page-1)*perlimit : 0;
    if(count == 0){
    	var limit = 'limit '+page+','+ perlimit;
	}
	else{

		limit = "";
	}  
	
    $mysqli =  {limit: limit};
    var escape_data =  [];   
    console.log(escape_data);
    strQuery = mysqli.mysqli($mysqli,832);             
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	
}

exports.mailersbyid = function(req,mysql,q){

	$mysqli = {};
	var tempid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,833);
	var defered =q.defer();
	escape_data = [tempid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	//console.log(feedid);

}

exports.updatemailer = function(req,mysql,q){
	
	$mysqli = {};
	var id = req.body.id;
	var opt_name = req.body.opt_name;
	var apiuser = req.body.apiuser;
	var apikey = req.body.apikey;
	var type = req.body.type;
	var status = 0;

	strQuery = mysqli.mysqli($mysqli,831);
	var defered =q.defer();
	escape_data = [opt_name,apiuser,apikey,type,id];
	console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.deletemailer = function(req,mysql,q){

	$mysqli = {};
	var tempid = req.body.id;
	strQuery = mysqli.mysqli($mysqli,834);
	var defered =q.defer();
	escape_data = [tempid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
	//console.log(feedid);

}
exports.deactivatemailer = function(req,mysql,q,id){
	
	$mysqli = {};
	var tempid = id;
	strQuery = mysqli.mysqli($mysqli,835);
	var defered =q.defer();
	escape_data = [tempid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.checkactivated = function(req,mysql,q,type){
	
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,836);
	var defered =q.defer();
	escape_data = [type];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	console.log(query);
	return defered.promise;

}
exports.activatemailer = function(req,mysql,q,id){
	
	$mysqli = {};
	var tempid = id;
	strQuery = mysqli.mysqli($mysqli,837);
	var defered =q.defer();
	escape_data = [tempid];
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}




exports.shippers= function(req,mysql,q,count){

	$mysqli = {};
  	var page = req.body.page;
	var perlimit = req.body.perlimit;
	var defered = q.defer();
    page = (page > 0) ? (page-1)*perlimit : 0;
    if(count == 0){
    	var limit = 'limit '+page+','+ perlimit;
	}
	else{

		limit = "";
	}  
	
    $mysqli =  {limit: limit};
    var escape_data =  [];   
    console.log(escape_data);
    strQuery = mysqli.mysqli($mysqli,'712');   
            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
	
}

exports.shippersnew= function(req,mysql,q){

	$mysqli = {};
  	
	var defered = q.defer();
  req.body.domestic= req.body.domestic==1? 1 : 0;
    req.body.international=req.body.international==1? 1 : 0;
    req.body.sort=(typeof(req.body.sort) == 'undefined') ? 10 : req.body.sort;
	
    $mysqli =  {};
    var escape_data =  [req.body.title,req.body.shipcode,req.body.domestic,req.body.international,req.body.carrier,req.body.trackurl,req.body.sort];   
    console.log(escape_data);
    strQuery = mysqli.mysqli($mysqli,'713');   
            console.log( strQuery);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
	
}



exports.shippersdel= function(req,mysql,q){

	$mysqli = {};
  	
	var defered = q.defer();

	
    $mysqli =  {};
    var escape_data =  [req.body.id];   
    console.log(escape_data);
    strQuery = mysqli.mysqli($mysqli,'714');   
            console.log( strQuery);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
	
}

exports.reorderfeedfields= function(req,mysql,q,newp,oldp,count){

	$mysqli = {};
	var defered = q.defer();
	$mysqli =  {};
    var escape_data =  [newp,oldp];   
    console.log(escape_data);
    console.log(newp+'FADASDASDASDASDA'+oldp);
    if(count == 0) { strQuery = mysqli.mysqli($mysqli,'811');  }
	else{	strQuery = mysqli.mysqli($mysqli,'812'); }
   	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.rearrangefields = function(req,mysql,q,position,count){
	$mysqli = {};
	var defered = q.defer();
	$mysqli =  {};
    var escape_data = [position];
    if(count == 0){   strQuery = mysqli.mysqli($mysqli,'813'); }
    else{	strQuery = mysqli.mysqli($mysqli,'814'); }
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;


}

/* This Section is reports */

exports.csvInvoicesRep = function(req,mysql,q,status){

	$mysqli = {};
	var defered = q.defer();
	$mysqli =  {};
	console.log(checks);

	var limit = '';
	if(req.body.limit_results != ''){
		limit += 'limit 0,'+req.body.limit_results;
	}
	else{
		limit += '';
	} 
	var order = "order by i.id "+req.body.orderradio;

	
	$mysqli =  {limit: limit,order:order};
	if(req.body.optionsRadios == 'fixed'){
		
		var checks = req.body.rangepast;
		console.log(checks);
	    if (checks == 'day'){
	    	strQuery = mysqli.mysqli($mysqli,'600'); 
	    }

	    else if(checks == 'week'){
	    	strQuery = mysqli.mysqli($mysqli,'601'); 
	    }

	    else if(checks == 'month'){
	    	strQuery = mysqli.mysqli($mysqli,'602'); 
	    }

	    else{
	    	strQuery = mysqli.mysqli($mysqli,'603'); 
	    }

	    var escape_data = [status];
	}

	else{

		var from_date = req.body.fromdate;
		var to_date = req.body.todate;
		var escape_data = [status,from_date,to_date];
		strQuery = mysqli.mysqli($mysqli,'604'); 


	}
	    console.log(escape_data);
	   
	    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;

}


exports.csvSellerRep = function(req,mysql,q,status){

	$mysqli = {};
	var defered = q.defer();
	$mysqli =  {};
	
	var limit = '';
	if(req.body.limit_results != ''){
		limit += 'limit 0,'+req.body.limit_results;
	}
	else{

		limit += '';
	} 

	var order = "order by id "+req.body.orderradio;

	
	$mysqli =  {limit: limit,order:order};

	if(status == 1){

		if(req.body.optionsRadios == 'fixed'){
			
			var checks = req.body.rangepast;
			console.log(checks);
		    if (checks == 'day'){
		    	strQuery = mysqli.mysqli($mysqli,'605'); 
		    }

		    else if(checks == 'week'){
		    	strQuery = mysqli.mysqli($mysqli,'606'); 
		    }

		    else if(checks == 'month'){
		    	strQuery = mysqli.mysqli($mysqli,'607'); 
		    }

		    else{
		    	strQuery = mysqli.mysqli($mysqli,'608'); 
		    }

		    var escape_data = [];
		}

		else{

			var from_date = req.body.fromdate;
			var to_date = req.body.todate;
			var escape_data = [from_date,to_date];
			strQuery = mysqli.mysqli($mysqli,'609'); 


		}
	}
	else if(status == 2){
		

		if(req.body.optionsRadios == 'fixed'){
			
			var checks = req.body.rangepast;
			console.log(checks+limit+order);
		    if (checks == 'day'){
		    	strQuery = mysqli.mysqli($mysqli,'610'); 
		    }

		    else if(checks == 'week'){
		    	strQuery = mysqli.mysqli($mysqli,'611'); 
		    }

		    else if(checks == 'month'){
		    	strQuery = mysqli.mysqli($mysqli,'612'); 
		    }

		    else{
		    	strQuery = mysqli.mysqli($mysqli,'613'); 
		    }

		    var escape_data = [];
		}

		else{

			var from_date = req.body.fromdate;
			var to_date = req.body.todate;
			console.log(to_date);
			var escape_data = [from_date,to_date];
			strQuery = mysqli.mysqli($mysqli,'614'); 


		}
	
	}
	else if(status == 3){

		if(req.body.optionsRadios == 'fixed'){
			
			var checks = req.body.rangepast;
			console.log(checks);
		    if (checks == 'day'){
		    	strQuery = mysqli.mysqli($mysqli,'615'); 
		    }

		    else if(checks == 'week'){
		    	strQuery = mysqli.mysqli($mysqli,'616'); 
		    }

		    else if(checks == 'month'){
		    	strQuery = mysqli.mysqli($mysqli,'617'); 
		    }

		    else{
		    	strQuery = mysqli.mysqli($mysqli,'618'); 
		    }

		    var escape_data = [];
		}

		else{

			var from_date = req.body.fromdate;
			var to_date = req.body.todate;
			var escape_data = [from_date,to_date];
			strQuery = mysqli.mysqli($mysqli,'619'); 

		}


	}
	else if(status == 4){

		if(req.body.optionsRadios == 'fixed'){
			
			var checks = req.body.rangepast;
			console.log(checks);
		    if (checks == 'day'){
		    	strQuery = mysqli.mysqli($mysqli,'620'); 
		    }

		    else if(checks == 'week'){
		    	strQuery = mysqli.mysqli($mysqli,'621'); 
		    }

		    else if(checks == 'month'){
		    	strQuery = mysqli.mysqli($mysqli,'622'); 
		    }

		    else{
		    	strQuery = mysqli.mysqli($mysqli,'623'); 
		    }

		    var escape_data = [];
		}

		else{

			var from_date = req.body.fromdate;
			var to_date = req.body.todate;
			var escape_data = [from_date,to_date];
			strQuery = mysqli.mysqli($mysqli,'624');

		}



	}
	else{

	}

	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.csvBuyerRep = function(req,mysql,q,status){

	$mysqli = {};
	var defered = q.defer();
	$mysqli =  {};
	
	var limit = '';
	if(req.body.limit_results != ''){
		limit += 'limit 0,'+req.body.limit_results;
	}
	else{

		limit += '';
	} 
	var order = "order by id "+req.body.orderradio;

	
	$mysqli =  {limit: limit,order:order};

	if(status == 1){

		if(req.body.optionsRadios == 'fixed'){
			
			var checks = req.body.rangepast;
			console.log(checks);
		    if (checks == 'day'){
		    	strQuery = mysqli.mysqli($mysqli,'625'); 
		    }

		    else if(checks == 'week'){
		    	strQuery = mysqli.mysqli($mysqli,'626'); 
		    }

		    else if(checks == 'month'){
		    	strQuery = mysqli.mysqli($mysqli,'627'); 
		    }

		    else{
		    	strQuery = mysqli.mysqli($mysqli,'628'); 
		    }

		    var escape_data = [];
		}

		else{

			var from_date = req.body.fromdate;
			var to_date = req.body.todate;
			var escape_data = [from_date,to_date];
			strQuery = mysqli.mysqli($mysqli,'629'); 


		}
	}
	else if(status == 2){

		if(req.body.optionsRadios == 'fixed'){
			
			var checks = req.body.rangepast;
			console.log(checks);
		    if (checks == 'day'){
		    	strQuery = mysqli.mysqli($mysqli,'630'); 
		    }

		    else if(checks == 'week'){
		    	strQuery = mysqli.mysqli($mysqli,'631'); 
		    }

		    else if(checks == 'month'){
		    	strQuery = mysqli.mysqli($mysqli,'632'); 
		    }

		    else{
		    	strQuery = mysqli.mysqli($mysqli,'633'); 
		    }

		    var escape_data = [];
		}

		else{

			var from_date = req.body.fromdate;
			var to_date = req.body.todate;
			var escape_data = [from_date,to_date];
			strQuery = mysqli.mysqli($mysqli,'634'); 

		}



	}
	else{

	}

	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.csvCommissionRep = function(req,mysql,q){

	$mysqli = {};
	var defered = q.defer();
	$mysqli =  {};
	console.log(checks);

	var limit = '';
	if(req.body.limit_results != ''){
		limit += 'limit 0,'+req.body.limit_results;
	}
	else{
		limit += '';
	} 
	var order = "order by b.id "+req.body.orderradio;

	
	$mysqli =  {limit: limit,order:order};
	if(req.body.optionsRadios == 'fixed'){
		
		var checks = req.body.rangepast;
		console.log(checks);
	    if (checks == 'day'){
	    	strQuery = mysqli.mysqli($mysqli,'635'); 
	    }

	    else if(checks == 'week'){
	    	strQuery = mysqli.mysqli($mysqli,'636'); 
	    }

	    else if(checks == 'month'){
	    	strQuery = mysqli.mysqli($mysqli,'637'); 
	    }

	    else{
	    	strQuery = mysqli.mysqli($mysqli,'638'); 
	    }

	    var escape_data = [];
	}

	else{

		var from_date = req.body.fromdate;
		var to_date = req.body.todate;
		var escape_data = [from_date,to_date];
		strQuery = mysqli.mysqli($mysqli,'639'); 


	}
	    console.log(escape_data);
	   
	    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;

}



/* This Section is reports  **Ends Here**   */



/* Notifaication Starts Here  */

exports.notifications = function(req,mysql,q){

	$mysqli = {};
	var defered = q.defer();
	$mysqli =  {};
    var escape_data = [];
    strQuery = mysqli.mysqli($mysqli,'650');
    
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;


}



/* Notification Ends Here*/

exports.deletereferral  = function(req,mysql,q,id){
	$mysqli = {};
	var defered = q.defer();
	$mysqli =  {};
    var escape_data = [id];
    strQuery = mysqli.mysqli($mysqli,847);
    
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}