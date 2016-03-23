var  util    = require('util');
var customerio = require('./customerio');
var localm	= require('./localmail');     
var q = require('q');
var products = require('./products');
var dateFormat = require('dateformat');
var common = require('./common');
var url = require('url');
var mysqli = require('./mysqli');

exports.addWithoutmessages = function(req,mysql,q)
{

            datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");

		    strQuery = mysqli.mysqli($mysqli,156);
			
		    req.body.fromid = (typeof(req.body.fromid) === 'undefined') ? req.session.userid : req.body.fromid;
		   
		    
		    var escape_data =  [req.body.fromid,req.body.toid,req.body.subject,req.body.message,datge,req.body.r_id,'open','open',req.body.pid];	
			console.log(escape_data);
	        var defered = q.defer();
	    
	    
	        
		    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		    return defered.promise;

}
exports.usersmessages = function(req,mysql,q)
{

    $mysqli = {};

    strQuery = mysqli.mysqli($mysqli,159);
	     
		 var escape_data =  [];	
		
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;

}
exports.addmessages = function(req,mysql,q)
{

    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");

    strQuery = mysqli.mysqli($mysqli,156);
				
	delete customerio;


		console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ In addmessages ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
		
	    console.log(req.body);
	    req.body.fromid = (typeof(req.body.fromid) === 'undefined') ? req.session.userid : req.body.fromid;
	    req.body.pid = (typeof(req.body.pid) === 'undefined') ? 0 : req.body.pid;
  	
	    var toid = req.body.toid;
	  	var toemail = req.body.toemail;
	  	var tophone = req.body.tophone;
	  	var fname = req.body.first_name;
	  	var lname = req.body.last_name;
	  	var messages =  req.body.message;
	  	var subjects = req.body.subject;
	  	var fromid = req.body.fromid;
	  	var pid = req.body.pid;
	  	var rid = req.body.r_id;

	  	

  	 	var escape_data =  [fromid,toid,subjects,messages,datge,rid,'open','open',pid];	
		    
			//console.log(escape_data);
			
	        var defered = q.defer();
	                
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		
		if(req.body.nid > 0){
			
			q.all([products.usermailnotify(req,config.mysql,q,req.body.toid,req.body.nid),products.usersmsnotify(req,config.mysql,q,req.body.toid,req.body.nid)]).then(function(results5){
				
				customerio.uid = req.body.toid;
				customerio.inits();

				
				if(results5[0][0].length > 0){



				   	if(global.emailcio.status == 'yes'){
						console.log("*********** Send outbidder email1111 ****************");
				   		customerio.createCustomer({email:toemail,user:{firstName:fname,lastName:lname}});
					    customerio.sendEmail({event:'message',content:{siteurl:config.url,subject:req.body.subject,fname:fname,tname:lname,message:req.body.message,unsub_url:global.unsub_url+'/'+toid}});
				    	
					}

				   	else if(global.emaillocal.status == 'yes'){
				            
				            
							q.all([localm.mailtemps(req,config.mysql,q,'message_sent')]).then(function(results2){
								
								if(results2){

									var template = results2[0][0][0].template;
									var subject_message = results2[0][0][0].subject;
									
									template = template.replace('{{event.subject}}' , req.body.subject);
									template = template.replace('{{event.fname}}' , fname);
									template = template.replace('{{event.tname}}' , lname);
									template = template.replace('{{event.message}}' , req.body.message);
									//console.log('workinggggg'+toemail);

									localm.sendmail(template,req.body.subject,toemail);

								}

								else{

									console.log("No Tempales")
								}

								
							}).fail(function(err){
								console.log(err.stack);
							}).done();

					}

					else{ console.log('No Mail Delivery method is selected'); }
				
				
				}
				else{

					console.log('Email not activated');
				}

				if(results5[1][0].length > 0){

					//console.log('adasdasdasd'+req.body.toid)

					if(global.smstwo.status == 'yes'){

						twillio	= require('./twillio');

						q.all([twillio.smstemps(req,config.mysql,q,'message_sent')]).then(function(results3){

						if(results3){

							var template = results3[0][0][0].template;
												
							template = template.replace('{{event.subject}}' , req.body.subject);
							template = template.replace('{{event.fname}}' , fname);
							template = template.replace('{{event.tname}}' , lname);
							template = template.replace('{{event.message}}' , req.body.phmessage);

							//console.log();
							
							twillio.sendsms(template,tophone);

						}

						else{

							console.log('No template name bid_submitted')
						}


						});

					}

					else{ console.log('No SMS Delivery method is selected'); }
				}
				else{

					console.log('SMS not activated');

				}



			});

		}
	
		else{

			customerio.uid = req.body.toid;
			customerio.inits();

			if(global.emailcio.status == 'yes'){
				console.log("*********** Send outbidder email ****************");
		        customerio.createCustomer({email:req.body.toemail,user:{firstName:req.body.first_name,lastName:req.body.last_name}});
			    customerio.sendEmail({event:'message',content:{siteurl:config.url,subject:req.body.subject,fname:req.body.first_name,tname:req.body.last_name,message:req.body.message,unsub_url:global.unsub_url+'/'+toid}});
	    	
			}

	   		else if(global.emaillocal.status == 'yes'){
	            
	            
				q.all([localm.mailtemps(req,config.mysql,q,'message_sent')]).then(function(results2){
					
					if(results2){

						var template = results2[0][0][0].template;
						var subject_message = results2[0][0][0].subject;
						
						template = template.replace('{{event.subject}}' , req.body.subject);
						template = template.replace('{{event.fname}}' , fname);
						template = template.replace('{{event.tname}}' , lname);
						template = template.replace('{{event.message}}' , req.body.message);
						//console.log('workinggggg'+toemail);

						localm.sendmail(template,req.body.subject,toemail);

					}

					else{

						console.log("No Tempales")
					}

					
				}).fail(function(err){
					console.log(err.stack);
				}).done();

			}

			else{ console.log('No Mail Delivery method is selected'); }
		

			if(global.smstwo.status == 'yes'){

				twillio	= require('./twillio');
				q.all([twillio.smstemps(req,config.mysql,q,'message_sent')]).then(function(results3){

					if(results3){

						var template = results3[0][0][0].template;
											
						template = template.replace('{{event.subject}}' , req.body.subject);
						template = template.replace('{{event.fname}}' , fname);
						template = template.replace('{{event.tname}}' , lname);
						template = template.replace('{{event.message}}' , req.body.phmessage);

						//console.log(template);
						
						twillio.sendsms(template,tophone);

					}

					else{

						console.log('No template name bid_submitted')
					}


				});

			}
			else{ console.log('No SMS Delivery method is selected'); }



		}
	

		    /*var escape_data =  [fromid,toid,subjects,messages,datge,rid,'open','open',pid];	
		  
			console.log(escape_data);
		
	        var defered = q.defer();
	                
		    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
			query.on('error',function(err){
				throw err;
				console.log('This is error');
			})*/
		return defered.promise;

}
exports.readmessages = function(req,mysql,q)
{

     datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");

    strQuery = mysqli.mysqli($mysqli,155);
	     
		 var escape_data =  [datge,req.body.r_id,req.session.userid];	
		console.log(escape_data);
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;

}
exports.movemessages = function(req,mysql,q)
{

     //datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
   status = 'open';
   if(req.body.action == 'archive')
   	status = 'archive'
   else if(req.body.action == 'delete')
   	status = 'delete'
    strQuery = mysqli.mysqli($mysqli,157);
	     
		 var escape_data =  [status,req.body.r_id,req.session.userid];	
		console.log(escape_data);
	    var defered = q.defer();
	
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		strQuery = mysqli.mysqli($mysqli,158);
	     
		 var escape_data =  [status,req.body.r_id,req.session.userid];	
		console.log(escape_data);
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;

}
exports.showmessages = function(req,mysql,q,count)
{
	try {
		req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    $mysqli =  {where:'and p.r_id = "'+req.body.r_id+'"'};
    if(count == 1){
    	strQuery = mysqli.mysqli($mysqli,154);
    	page = (req.body.page-1)*5;

    	var escape_data =  [req.session.userid,req.session.userid,page];	
	}else{
		strQuery = mysqli.mysqli($mysqli,'view_msg_by_id');
	     
	     var escape_data =  [req.session.userid,req.session.userid];	
	}

	    var defered = q.defer();

		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err){
			throw err;
		})
		return defered.promise;
	}catch(e){
		console.log("Error in getting message details "+ e.stack);
	}

}
exports.mymessages = function(req,mysql,q,count)
{
	   $mysqli =  {where:'',where1 : ''};
	
       if(req.body.action == 'inbox' || req.body.action == '')
       {
           $mysqli =  {where:' and p.to_status != "delete" AND p.to_status !="archive"  and p.to_id = "'+req.session.userid+'"'};
           $mysqli['where1'] = 'and m.to_status != "delete" and m.to_id = "'+req.session.userid+'"';
       }	
       else if(req.body.action == 'sent')
       {
           $mysqli =  {where:' and p.from_status != "delete" AND p.from_status !="archive" and p.from_id = "'+req.session.userid+'"'};
           $mysqli['where1'] = ' and m.from_status != "delete" and m.from_id = "'+req.session.userid+'"';
       }
       else if(req.body.action == 'archive')
       {
           $mysqli =  {where:' and ((p.from_status = "archive" and p.from_id = "'+req.session.userid+'") or (p.to_status = "archive" and p.to_id = "'+req.session.userid+'"))'};
           $mysqli['where1'] = 'and ((m.from_status = "archive" and m.from_id = "'+req.session.userid+'") or (m.to_status = "archive" and m.to_id = "'+req.session.userid+'"))';
       }
        else if(req.body.action == 'delete')
       {
           $mysqli =  {where:' and ((p.from_status = "delete" and p.from_id = "'+req.session.userid+'") or (p.to_status = "delete" and p.to_id = "'+req.session.userid+'"))'};
           $mysqli['where1'] = 'and ((m.from_status = "delete" and m.from_id = "'+req.session.userid+'") or (m.to_status = "delete" and m.to_id = "'+req.session.userid+'"))';
       }	
         
        if(count == 2)
	    {
		   $mysqli =  {where:' and p.to_status != "delete" and p.to_id = "'+req.session.userid+'"'};
           $mysqli['where1'] = 'and m.to_status != "delete" and m.to_id = "'+req.session.userid+'"';	
		}
	   
	    if(count == 1)
	    {	
		 strQuery = mysqli.mysqli($mysqli,153);
		 var escape_data =  [req.session.userid,req.session.userid];	
	    }
		else if(count == 2)
	    {	
		 strQuery = mysqli.mysqli($mysqli,'msgunread');
		 var escape_data =  [req.session.userid,req.session.userid];	
	    }
	    else
	    {
	     strQuery = mysqli.mysqli($mysqli,152);
	     page = (req.body.page-1)*5;
			
		 var escape_data =  [req.session.userid,req.session.userid,page];	
		 
		 //var escape_data =  [];	
	    }	
	    var defered = q.defer();
	    
	    
	        
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	query.on('error',function(err){
		throw err;
		//console.log(err);

	})
		return defered.promise;

}

exports.deleteMessages = function(req,mysql,q)
{
	try {
		var defered = q.defer();
		
		//var arr = req.body['del[]'].join(',');
		
		var del_id = (typeof(req.body['del[]']) !== 'undefined') ? ((req.body['del[]'] instanceof  Array) ? req.body['del[]'].join(',') : req.body['del[]']) : 0;
		$mysqli = {del_id :del_id};

		if(req.body.action == 'sent'){
			strQuery = mysqli.mysqli($mysqli, 'sentboxDelete');
		}else if(req.body.action == 'inbox' || req.body.action == 'archive'){
			strQuery = mysqli.mysqli($mysqli, 'inboxDelete');
		}

		var escape_data = ['delete'];


		query = mysql.query(strQuery,escape_data,defered.makeNodeResolver());

		query.on('error', function (err) {
			throw err;
		});
		return defered.promise;
	}catch(e){
		console.log("Error in deleting messages "+e);
	}

}

exports.unDeleteMessages = function(req,mysql,q)
{
	try {
		var defered = q.defer();
		
		//var arr = req.body['del[]'].join(',');
		
		var del_id = (typeof(req.body['del[]']) !== 'undefined') ? ((req.body['del[]'] instanceof  Array) ? req.body['del[]'].join(',') : req.body['del[]']) : 0;

		$mysqli = {del_id :del_id};
		strQuery = mysqli.mysqli($mysqli, 'inboxDelete');
		
		var escape_data = ['open'];

		query = mysql.query(strQuery,escape_data,defered.makeNodeResolver());

		query.on('error', function (err) {
			throw err;
		});
		strSentQuery = mysqli.mysqli($mysqli, 'sentboxDelete');
		inquery = mysql.query(strSentQuery,escape_data,defered.makeNodeResolver());

		inquery.on('error', function (err) {
			throw err;
		});
		return defered.promise;
	}catch(e){
		console.log("Error in undeleting messages "+e);
	}

}
exports.updateviewed = function(req,mysql,q)
{
  
  $mysqli =  {};
  strQuery = mysqli.mysqli($mysqli,'notified_msgs');
  var escape_data = [req.session.userid];
  var defered = q.defer();
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;

}

