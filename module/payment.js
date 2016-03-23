var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
var self = require('./payment');
var q = require('q');

var dateFormat = require('dateformat');
//var configure = require('../configure');
var sessionsdata = [];
//default setters
/*config = configure.app();*/
var customerid = 0;
var paymentprofileid = 0;
var transactionid = 0;
var gateway = 'authorize';
var amount = 0.00;
var payid = 0;
var name = '';
var point = 0;
var req ='';
var res = '';
var type = '';
exports.increaseBalance = function()
{
      q.all([self.updateBalance(self.req.session.userid),self.insertInvoice()]).then(function(results){ 
              
              self.res.writeHead(302, {
               'Location':  (typeof(self.req.session.page) === 'undefined') ?  '/product/my' : self.req.session.page
              });
              self.res.end();return false;
        });
}
exports.executeUserData = function(result,callback)
{
	q.all(this.setupPayment(result)).then(function(results){ 
        callback(result);
	});
}
exports.doPayment = function(result)
{  //console.log(self.gateway);
   
    
    if(self.gateway == 'authorize')
    {  
     authorize = require('./authorize');
     authorize.doAuthorizePayment(self,self.increaseBalance);
    }
    else
    {
     stripe = require('./stripe');
     stripe.doStripePayment(self,self.increaseBalance);
    } 

}
exports.insertInvoice = function()
{
  $mysqli =  {};
  mysql = config.mysql; 

  status = 'debit';
  ustatus = 'paid';

console.log('88888888888888888888888888888888888888888888888888888888888');
  console.log(status);
    console.log(self.type);
  console.log('88888888888888888888888888888888888888888888888888888888888');
  //console.log(self);
  if(self.type == 'sold')
  {
     status = 'credit';
  }  
  if(self.type == 'holded' || self.type == 'declined')
  {
     status = self.type;
  }
  if(self.type == 'winner' || self.type == 'bought')
  { 


    customerio = require('./customerio');
    
    ustatus = 'unpaid';
   
    localm = require('./localmail');



    if(global.emailcio.status == 'yes'){

      
      customerio.uid = self.sessionsdata.userid;
      customerio.inits();           
      customerio.createCustomer({email:self.sessionsdata.email,user:{firstName:self.sessionsdata.first_name,lastName:self.sessionsdata.last_name}});     
      customerio.sendEmail({event:'won_product',content:{siteurl:config.url,user:self.sessionsdata.first_name+' '+self.sessionsdata.last_name,price: self.amount,title: self.sessionsdata.title,url:self.sessionsdata.url}});

      
    }

      else if(global.emaillocal.status == 'yes'){
          

      q.all([localm.mailtemps(req,config.mysql,q,'won_product')]).then(function(results2){

        var template = results2[0][0][0].template;
        var subject = results2[0][0][0].subject;
        
        template = template.replace('{{event.user}}' , self.sessionsdata.first_name+' '+self.sessionsdata);
        template = template.replace('{{event.price}}' , self.amount);
        template = template.replace('{{event.title}}' , self.sessionsdata.title);
        template = template.replace('{{event.url}}' , self.sessionsdata.url);
       // console.log(template);
        localm.sendmail(template,subject,self.sessionsdata.email);

        
      });

  }

  else{ console.log('No Mail Delivery method is selected'); }

  if(global.smstwo.status == 'yes'){

    twillio = require('./twillio');

    q.all([twillio.smstemps(req,config.mysql,q,'won_product')]).then(function(results3){

    if(results3){

      var template = results3[0][0][0].template;
                
        template = template.replace('{{event.user}}' , self.sessionsdata.first_name+' '+self.sessionsdata);
        template = template.replace('{{event.price}}' , self.amount);
        template = template.replace('{{event.title}}' , self.sessionsdata.title);
        template = template.replace('{{event.url}}' , self.sessionsdata.url);

      //console.log(template);
      
      twillio.sendsms(template,self.sessionsdata.email);

    }

    else{

      console.log('No template name bid_submitted')
    }


    });

  }


  }

  if(self.type == 'sold')
  {
    
    delete customerio;
    customerio = require('./customerio');
    localm  = require('./localmail');

      
    if(global.emailcio.status == 'yes'){

      customerio = require('./customerio');
      customerio.uid = self.sessionsdata.userid;
         
      customerio.inits();           
      customerio.createCustomer({email:self.sessionsdata.email,user:{firstName:self.sessionsdata.first_name,lastName:self.sessionsdata.last_name}});     
      customerio.sendEmail({event:'item_sold',content:{siteurl:config.url,user:self.sessionsdata.first_name+' '+self.sessionsdata.last_name,price: self.amount,title: self.sessionsdata.title,url:self.sessionsdata.url}});

        
    }

    else if(global.emaillocal.status == 'yes'){
            

        q.all([localm.mailtemps(req,config.mysql,q,'item_sold')]).then(function(results2){

          var template = results2[0][0][0].template;
          var subject = results2[0][0][0].subject;
          
          template = template.replace('{{event.user}}' , self.sessionsdata.first_name+' '+self.sessionsdata);
          template = template.replace('{{event.price}}' , self.amount);
          template = template.replace('{{event.title}}' , self.sessionsdata.title);
          template = template.replace('{{event.url}}' , self.sessionsdata.url);
        //  console.log(template);
          localm.sendmail(template,subject,self.sessionsdata.email);

          
        });

    }

    else{ console.log('No Mail Delivery method is selected'); }

    if(global.smstwo.status == 'yes'){

    twillio = require('./twillio');

    q.all([twillio.smstemps(req,config.mysql,q,'item_sold')]).then(function(results3){

    if(results3){

      var template = results3[0][0][0].template;
                
          template = template.replace('{{event.user}}' , self.sessionsdata.first_name+' '+self.sessionsdata);
          template = template.replace('{{event.price}}' , self.amount);
          template = template.replace('{{event.title}}' , self.sessionsdata.title);
          template = template.replace('{{event.url}}' , self.sessionsdata.url);

     // console.log(template);
      
      twillio.sendsms(template,self.sessionsdata.email);

    }

    else{

      console.log('No template name bid_submitted')
    }


    });

  }


  }

  if(self.type == 'package')
  {

   delete customerio;
  
    localm  = require('./localmail');
    customerio = require('./customerio');
      
      if(global.emailcio.status == 'yes'){

          
          customerio.uid = self.sessionsdata.userid;
         
          customerio.inits();    
          customerio.createCustomer({email:self.sessionsdata.email,user:{firstName:self.sessionsdata.first_name,lastName:self.sessionsdata.last_name}});
          customerio.sendEmail({event:'package_bought',content:{siteurl:config.url,user:self.sessionsdata.first_name+' '+self.sessionsdata.last_name,pack_name:self.name,price: self.amount}});       
            
        
    }

      else if(global.emaillocal.status == 'yes'){
            

        q.all([localm.mailtemps(req,config.mysql,q,'package_bought')]).then(function(results2){

          var template = results2[0][0][0].template;
          var subject = results2[0][0][0].subject;
          
          template = template.replace('{{event.user}}' , self.sessionsdata.first_name+' '+self.sessionsdata);
           template = template.replace('{{event.pack_name}}' , self.name);
          template = template.replace('{{event.price}}' , self.amount);
        //  console.log(template);
          localm.sendmail(template,subject,req.session.email);

          
        });

    }

  else{ console.log('No Mail Delivery method is selected'); }

    if(global.smstwo.status == 'yes'){

    twillio = require('./twillio');

    q.all([twillio.smstemps(req,config.mysql,q,'package_bought')]).then(function(results3){

    if(results3){

      var template = results3[0][0][0].template;
                
           template = template.replace('{{event.user}}' , self.sessionsdata.first_name+' '+self.sessionsdata);
            template = template.replace('{{event.pack_name}}' , self.name);
          template = template.replace('{{event.price}}' , self.amount);

     // console.log(template);
      
      twillio.sendsms(template,self.sessionsdata.email);

    }

    else{

      console.log('No template name package_bought')
    }


    });

   }

  }
  
  if(self.type == 'membership'){
  delete customerio;
  
    localm  = require('./localmail');
    customerio = require('./customerio');
      
      if(global.emailcio.status == 'yes'){

          
          customerio.uid = self.sessionsdata.userid;
         
          customerio.inits();    
          customerio.createCustomer({email:self.sessionsdata.email,user:{firstName:self.sessionsdata.first_name,lastName:self.sessionsdata.last_name}});
          customerio.sendEmail({event:'package_bought',content:{siteurl:config.url,user:self.sessionsdata.first_name+' '+self.sessionsdata.last_name,pack_name:self.name,price: self.amount}});       
        
      }

      else if(global.emaillocal.status == 'yes'){
        q.all([localm.mailtemps(req,config.mysql,q,'package_bought')]).then(function(results2){

          var template = results2[0][0][0].template;
          var subject = results2[0][0][0].subject;
          template = template.replace('{{event.user}}' , self.sessionsdata.first_name+' '+self.sessionsdata);
          template = template.replace('{{event.pack_name}}' , self.name);
          template = template.replace('{{event.price}}' , self.amount);


          localm.sendmail(template,subject,self.sessionsdata.email);
          
        });

      }

  else{ console.log('No Mail Delivery method is selected'); }
  if(global.smstwo.status == 'yes'){

    twillio = require('./twillio');

    q.all([twillio.smstemps(req,config.mysql,q,'package_bought')]).then(function(results3){

    if(results3){

      var template = results3[0][0][0].template;
                
           template = template.replace('{{event.user}}' , self.sessionsdata.first_name+' '+self.sessionsdata);
           template = template.replace('{{event.pack_name}}' , self.name);
            template = template.replace('{{event.price}}' , self.amount);

     // console.log(template);
      
      twillio.sendsms(template,self.sessionsdata.phone);

    }

    else{

      console.log('No template name package_bought');
    }


    });

  }

}

    var defered = q.defer();
    strQuery = mysqli.mysqli($mysqli,31);
    var escape_data = [self.transactionid,self.gateway,dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),self.sessionsdata.userid,self.payid,self.type,self.name,self.amount,ustatus,status];
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    console.log("Insert invoice is "+query.sql);
    console.log("Escape is "+escape_data);
    query.on('error',function(err){
        throw err;
        console.log(err.stack);
    })

  return defered.promise;
}
exports.updateBalance= function(result)
{
	$mysqli =  {};
  mysql = config.mysql;	
  strQuery = mysqli.mysqli($mysqli,28); 
  var escape_data = [self.amount,result];
  ////console.log(escape_data);
  var defered = q.defer();
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.setupPayment= function(result)
{
	$mysqli =  {};
  mysql = config.mysql;	
  strQuery = mysqli.mysqli($mysqli,27); 
  ////console.log(result);
  var escape_data = [self.customerid,self.paymentid,self.gateway,result];
  //console.log(escape_data);
  var defered = q.defer();
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

  return defered.promise;
}
exports.payAuthorize = function(req,results)
{
	  self.sessionsdata = req.session;
    self.gateway =  req.body.payment;
    if(results.payAuthorize == self.gateway)
    {
      this.customerid = (results.customerid == '' || results.customerid == 0) ? results.id : results.customerid;
      this.paymentid = (results.paymentid == ''  || results.customerid == 0) ? 0 : results.paymentid;
    }
    else
    {
      this.customerid = results.id;
      this.paymentid = 0;
    }  
  	
   
    uid = this.customerid;
    if(self.gateway == 'authorize')
    {  
     authorize = require('./authorize');
     authorize.createCustomerPayment(results,req,uid,self);
    }
    else
    {
     stripe = require('./stripe');
     stripe.createCustomerPayment(results,req,uid,self);
    } 
  
 
}
exports.getInvoice = function(mysql,q,id)
{
  $mysqli =  {};
  mysql = config.mysql; 
  strQuery = mysqli.mysqli($mysqli,58); 
  var escape_data = [id];
  //console.log(escape_data);

  var defered = q.defer();
  query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
  //console.log(1);
  return defered.promise;
}
exports.errorTrigger = function(error,page)
{
  self.res.writeHead(302, {
	             'Location': '/package/buy/'+self.payid+'/'+encodeURIComponent(error)
	            });
	            self.res.end();return false;
}
