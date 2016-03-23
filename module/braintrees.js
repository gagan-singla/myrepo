var token_id = '';
var error = '';
var dateFormat = require('dateformat');
exports.connect = function(global,braintree)
{
	console.log(braintree.Environment.Sandbox); 
	braintrees = braintree.connect({
	  environment: braintree.Environment.Sandbox,
	  merchantId: "pxrbmjz7cpfz3q8n",
      publicKey: "j87jyndhqrfnqm54",
      privateKey: "f2d4b02cc202d895271b8203fc3d650a"
	});
	return braintrees;
}
exports.saveCreditCard = function(bgateway,req,res,callback)
{
   
   
	var brain_cust_id = global.bcustomer_prefix+req.session.userid;
                            console.log(req.param('payment_method_nonce'));
                         	bgateway.paymentMethod.create({
					          customerId: brain_cust_id,
					          paymentMethodNonce: req.param('payment_method_nonce')
					        }, function (err, result) { 
					        	 if(!result.success)
					        	 {
					        	 	  callback(0,result.message);
                                      //return false;

					        	 }
					        	 else
					        	 { 
					        	 	     if(typeof(result.creditCard) === 'undefined')
					        	 	     {
					        	 	     	var escape_string = [result.paypalAccount.email,
													        	 'Paypal',
													        	 brain_cust_id,
													        	 result.paypalAccount.token,
													        	 result.paypalAccount.email,
													        	 dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),
													        	 'active',
													        	 'braintree',
													        	 '',
													        	 '',
													        	 req.session.userid];
					        	 	     }	
						        	 	 else
						        	 	 {
						        	 	 	var escape_string = [result.creditCard.cardholderName,
													        	 result.creditCard.cardType,
													        	 brain_cust_id,
													        	 result.creditCard.token,
													        	 result.creditCard.maskedNumber,
													        	 dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"),
													        	 'active',
													        	 'braintree',
													        	 result.creditCard.expirationMonth,
													        	 result.creditCard.expirationYear,
													        	 req.session.userid];
						        	 	 }	
							        	 console.log(result);
							        	 var creditcard = require('./creditcard');

							        	 creditcard.save(escape_string,bgateway.mysql);
							        	 callback(1,result);

					        	 }	
					        	 
					        	 


					        });
                                 
    
	

             
}
exports.generateToken = function(bgateways,callback,req)
{
	//console.log(bgateways.clientToken); 
	var brain_cust_id = global.bcustomer_prefix+req.session.userid;
	//var brain_cust_id = 'sdasd';
	var s = bgateways.customer.find(brain_cust_id, function(err, customer) { 
          //console.log(customer);
          if(customer === null)
          {
               bgateways.customer.create({id: brain_cust_id,
                          firstName: req.session.first_name,
                          lastName:req.session.last_name
                          
                         }, function (err, result) {
                         	
							bgateways.clientToken.generate({}, function (err, response) { 
						         
						         callback(err,response); 

							});
				});
           }
           else
           {
           	                bgateways.clientToken.generate({}, function (err, response) { 
						         
						         callback(err,response); 
						         console.log(err);
						    });     
           }	
	 });
  
  
	



}