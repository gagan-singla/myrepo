var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
var q = require('q');
exports.show = function(mysql,callback)
{
   var row = [];	
   callback(row);
}
exports.getCsvPayments = function(req,mysql,q)
{
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx252');  	  
    var defered = q.defer();
    
    var escape_data =  [req.session.userid,req.session.userid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.getPayments = function(req,mysql,q)
{
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx245');  	  
    var defered = q.defer();
    page = (req.body.page - 1) * 10;
    var escape_data =  [req.session.userid,req.session.userid,page];   

	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.getAllPayments = function(req,mysql,q)
{
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx244');  	  
    var defered = q.defer();
    page = (req.body.page - 1) * 10;
    var escape_data =  [req.session.userid,req.session.userid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}

exports.listfeedback = function(req,mysql,q,count)
{
    $mysqli = {};
  	var page = req.body.page;
	var perlimit = req.body.perlimit;
		  
    var defered = q.defer();
    page = (page > 0) ? (page-1)*perlimit : 0;
    if(count == 1){
    	var limit = 'limit '+page+','+ perlimit;
	}
	else{

		limit = "";
	}  
	
    $mysqli =  {limit: limit};
    var escape_data =  [req.session.userid];   
    console.log(escape_data);
    strQuery = mysqli.mysqli($mysqli,'298');             
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.setAverageFeedBack = function(req,mysql,q,avg,m)
{
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx236');  	  
    var defered = q.defer();
    var escape_data =  [avg,m];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.submitFeedbackCart = function(req,mysql,q)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx235');  	  
    var defered = q.defer();
    var escape_data =  [req.body.bid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.addFeedBackPoint = function(req,mysql,q,m,point,id)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx234');  	  
    var defered = q.defer();
    var escape_data =  [m,point,id];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.addFeedBack = function(req,mysql,q)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx233');  	
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");   
    var defered = q.defer();
    var escape_data =  [req.body.title,req.body.content,datge,req.body.bid]   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.getFeedBack = function(req,mysql,q)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx232');     
    var defered = q.defer();
    var escape_data =  [req.body.id]   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.addInvoice = function(req,mysql,q)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx239');     
    var defered = q.defer();
    var escape_data =  [req.body.id]   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.getFeedBackData = function(req,mysql,q)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx238');     
    var defered = q.defer();
    var escape_data =  [req.body.id]   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.updateShippTrackInfo = function(req,mysql,q)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx231');     
    var defered = q.defer();
    var escape_data =  [req.body.shipping_info,req.body.shipping_id,req.body.shipping_service,req.body.id]   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.addUserReview = function(req,mysql,q,avg,m)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx237');     
    var defered = q.defer();
    var escape_data =  [avg,m]   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.deleteBuynowRecord = function(req,mysql,q)
{
	id = req.body.id;
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'delete_buybow');
	var defered = q.defer();
	var escape_data =  [req.body.id]
	console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	query.on('error',function(err){
		throw err.stack;
	})
	return defered.promise;
}

exports.getBuynowRecord = function(req,mysql,q)
{
	id = req.body.id;
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx220');     
    var defered = q.defer();
    var escape_data =  [req.body.id]   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}

exports.getcartnowRecord = function(req,mysql,q)
{
	id = req.body.id;
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'yab5');
	var defered = q.defer();
	var escape_data =  [req.body.id]
	console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}

exports.getBidsRecord = function(req,mysql,q)
{
	id = req.body.id;
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'cnx221');     
    var defered = q.defer();
    var escape_data =  [req.body.id]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.paymentBuyNowRelease = function(req,mysql,q,id)
{
	
	$mysqli = {};
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	strQuery = mysqli.mysqli($mysqli,'cnx222');     
    var defered = q.defer();
    var escape_data = [datge,id,req.session.userid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.paymentBuyNowCancel = function(req,mysql,q,id)
{
	
	$mysqli = {};
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	strQuery = mysqli.mysqli($mysqli,'cnx223');     
    var defered = q.defer();
    var escape_data = [datge,id,req.session.userid]; 

	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.paymentBidRelease = function(req,mysql,q,id)
{
	
	$mysqli = {};
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	strQuery = mysqli.mysqli($mysqli,'cnx224');     
    var defered = q.defer();
    var escape_data = [datge,id,req.session.user_id];               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.paymentBidCancel = function(req,mysql,q,id)
{
	
	$mysqli = {};
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	strQuery = mysqli.mysqli($mysqli,'cnx225');     
    var defered = q.defer();
    var escape_data = [datge,id,req.session.user_id];               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.saveaddress = function(req,mysql,q,doauction)
{
    $mysqli =  {};
	if(doauction == 'save')
	strQuery = mysqli.mysqli($mysqli,101); 
	if(doauction == 'update')
	strQuery = mysqli.mysqli($mysqli,103);    
    var defered = q.defer();
    var escape_data =  [req.body.name,
                       req.body.address1,
		    	       req.body.address2,
		    	       req.body.country,
		    	       req.body.state,
		    	       req.body.city,
		    	       req.body.zipcode,            
		    	       req.body.phone,
					   (typeof(req.session) !== 'undefined')  ? req.session.userid : 0,
					   req.body.type]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}

exports.getAddresses = function(req,mysql,q,Addtype)
{
    $mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,102);     
    var defered = q.defer();
    var escape_data =  [(typeof(req.session) !== 'undefined')  ? req.session.userid : 0,Addtype]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}


exports.getReferral = function(req,mysql,q,isadmin,count)
{
    $mysqli =  {};
	if(isadmin == 1)
	{
	if(count == 1)
	{
	strQuery = mysqli.mysqli($mysqli,120); 
	var escape_data =  [];	
	}
	else
	{
	strQuery = mysqli.mysqli($mysqli,118); 
	page = (req.body.page - 1) * 10;
	var escape_data =  [page];	
	}
	}
	else
	{
	strQuery = mysqli.mysqli($mysqli,105);  
	var escape_data =  [(typeof(req.session) !== 'undefined')  ? req.session.userid : 0]     
	}
    var defered = q.defer();
   // var escape_data =  [(typeof(req.session) !== 'undefined')  ? req.session.userid : 0]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}

exports.getOpenProjects = function(req,mysql,q)
{
    datge = dateFormat(new Date(),"yyyy-mm-dd");
    $mysqli = {datge:datge};
	strQuery = mysqli.mysqli($mysqli,106);     
    var defered = q.defer();
    var escape_data =  [(typeof(req.session) !== 'undefined')  ? req.session.userid : 0]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}


exports.saveAutobid = function(req,mysql,q)
{
    $mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,107);    
    var defered = q.defer();
    var escape_data =  [(typeof(req.session) !== 'undefined')  ? req.session.userid : 0,
                       req.body.project_id,
		    	       req.body.start_amount,
		    	       req.body.amount,
		    	       req.body.amount,
		    	       dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss")]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}


exports.checkAutobid = function(req,mysql,q)
{
    $mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,109);    
    var defered = q.defer();
    var escape_data =  [(typeof(req.session) !== 'undefined')  ? req.session.userid : 0,
                       req.body.project_id
		    	       ]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}

exports.fetchAutobidlist = function(req,mysql,q)
{
    $mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,110);    
    var defered = q.defer();
    var escape_data =  [(typeof(req.session) !== 'undefined')  ? req.session.userid : 0]          
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}

exports.mybuynow = function(req,mysql,q,count)
{
    var page = req.body.page;
	var perlimit = req.body.perlimit;
	console.log('page'+req.session.userid);
	page = (page > 0) ? (page-1)*perlimit : 0;  
	if(count == 1){
    	var limit = 'limit '+page+','+ perlimit;
	}
	else{

		limit = "";
	}  
	console.log('page'+limit);
    $mysqli =  {limit: limit};
    cnt = 'cnx227';
    var escape_data =  [req.session.userid];
    
    //console.log(escape_data);
	strQuery = mysqli.mysqli($mysqli,cnt);    
    var defered = q.defer();
             
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}

exports.updateReferralStatus = function(req,mysql,q,rid)
{
    $mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,119);     
    var defered = q.defer();
    var escape_data =  [rid]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}


exports.removeAddresses = function(req,mysql,q,Addtype)
{
    $mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,121);     
    var defered = q.defer();
    var escape_data =  [(typeof(req.session) !== 'undefined')  ? req.session.userid : 0,Addtype]               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.getFeedFields = function(req,mysql,q){

	$mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,802);     
    var defered = q.defer();
    var escape_data = [];               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.listfeedbackrating = function(req,mysql,q)
{
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'810');  	  
    var defered = q.defer();
    var escape_data =  [req.session.userid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.emailshipdetails = function(req,mysql,q){

	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'816');  	  
    var defered = q.defer();
    var escape_data =  [req.body.id];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.allreferrals = function(req,mysql,q,count){
	
	$mysqli = {};
	var id = req.session.userid;
	if(count == 1)
	{
		strQuery = mysqli.mysqli($mysqli,850); 
		var escape_data =  [id];	
	}
	
	else
	{
		strQuery = mysqli.mysqli($mysqli,849); 
		page = (req.body.page - 1) * 10;
		var escape_data =  [id,page];	
	}
	 	  
    var defered = q.defer();
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.totalpoints = function(req,mysql,q){

	$mysqli = {};
	var id = req.session.userid;
	strQuery = mysqli.mysqli($mysqli,848);  	  
    var defered = q.defer();
    var escape_data =  [id];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.buyer_title = function(req,mysql,q){

	$mysqli = {};
	var id = req.session.userid;
	strQuery = mysqli.mysqli($mysqli,651);  	  
    var defered = q.defer();
    var escape_data =  [id];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.seller_title = function(req,mysql,q){

	$mysqli = {};
	var id = req.session.userid;
	strQuery = mysqli.mysqli($mysqli,652);  	  
    var defered = q.defer();
    var escape_data =  [id];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.save_usernotify = function(req,mysql,q){

	$mysqli = {};
	
	if(req.body.notify_id == 0){
		
		strQuery = mysqli.mysqli($mysqli,653);  	  
	    var escape_data =  [req.session.userid,req.body.email_settings,req.body.sms_settings]; 

	}
	else{

		
		strQuery = mysqli.mysqli($mysqli,655);  	  
	    var escape_data =  [req.session.userid,req.body.email_settings,req.body.sms_settings,req.body.notify_id]; 

	}
    console.log(escape_data); 
    var defered = q.defer();           
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.get_settings = function(req,mysql,q){

	$mysqli = {};
	var id = req.session.userid;
	strQuery = mysqli.mysqli($mysqli,654);  	  
    var defered = q.defer();
    var escape_data =  [req.session.userid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.verified_phone = function(req,mysql,q){

	$mysqli = {};
	var id = req.session.userid;
	strQuery = mysqli.mysqli($mysqli,656);  	  
    var defered = q.defer();
    req.body.Called  = req.body.Called.replace('+','');
    var escape_data =  ['+'+req.body.Called,req.body.uid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.phoneverified = function(req,mysql,q){

	$mysqli = {};
	var id = req.session.userid;
	strQuery = mysqli.mysqli($mysqli,657);  	  
    var defered = q.defer();
    var escape_data =  [req.session.userid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.blocked_users = function(req,mysql,q,count)
{

	$mysqli = {};
	var id = req.session.userid;
	
    var defered = q.defer();
    if(count == 1)
	{
		strQuery = mysqli.mysqli($mysqli,500); 
		var escape_data =  [id];	
	}
	
	else
	{
		strQuery = mysqli.mysqli($mysqli,503); 
		page = (req.body.page - 1) * 15;
		var escape_data =  [id,page];	
	}  
      
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.block_user = function(req,mysql,q)
{
	$mysqli = {};
	var sid = req.session.userid;
	var email = req.body.block_mail;
	strQuery = mysqli.mysqli($mysqli,501);  	  
    var defered = q.defer();
    var escape_data =  [email,sid,dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss")];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.unblock_user = function(req,mysql,q,id)
{
	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,502);  	  
    var defered = q.defer();
    var escape_data =  [id];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.check_uid = function(req,mysql,q,mail)
{
	$mysqli = {};
	var sid = req.session.userid;
	var uid = mail;
	strQuery = mysqli.mysqli($mysqli,504);  	  
    var defered = q.defer();
    var escape_data =  [uid,sid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.check_if_exist = function(req,mysql,q,mail)
{

	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,505);  	  
    var defered = q.defer();
    var escape_data =  [mail];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.block_bids_of_user = function(req,mysql,q)
{

	$mysqli = {};
	var sid = req.session.userid;
	var email = req.body.block_mail;
	strQuery = mysqli.mysqli($mysqli,507);  	  
    var defered = q.defer();
    var escape_data =  [email,sid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.block_buys_of_user = function(req,mysql,q)
{
	$mysqli = {};
	var sid = req.session.userid;
	var email = req.body.block_mail;
	strQuery = mysqli.mysqli($mysqli,508);  	  
    var defered = q.defer();
    var escape_data =  [email,sid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.transfer_product = function(req,mysql,q)
{

	$mysqli = {};
	var sid = req.body.product_id;
	var email = req.body.transfer_mail;
	strQuery = mysqli.mysqli($mysqli,550);  	  
    var defered = q.defer();
    var escape_data =  [email,sid];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.getuser_details= function(req,mysql,q,email){

	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,551);  	  
    var defered = q.defer();
    var escape_data =  [email];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.product_details = function(req,mysql,q,id){

	$mysqli = {};
	strQuery = mysqli.mysqli($mysqli,552);  	  
    var defered = q.defer();
    var escape_data =  [id];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}

exports.get_mail_ids = function(req,mysql,q,id){

	
	
	var sim = id;
	$mysqli =  {search: sim};
	strQuery = mysqli.mysqli($mysqli,510);  	  
    var defered = q.defer();
    var escape_data =  [];   
    console.log(escape_data);            
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	console.log(query.sql);
	return defered.promise;

}

