var customerio =  require('./customerio');

exports.sendEmail = function(event_id,user_data,content){
      customerio.inits();     
      customerio.createCustomer({email:user_data['email'],user:{firstName:user_data['first_name'],lastName:user_data['last_name']}});
      customerio.sendEmail({event:event_id,content:content});
      console.log('email sent@!');

}