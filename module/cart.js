var mysqli = require('./mysqli');
var products = require('./products');
var q = require('q');
var topHTMLtext = '';
//var configure = require('../configure');
//var config = configure.app();

/*$arr = {
  config : config
}*/

exports.updateDeleteBooked = function(req,mysql,q,pdt)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'timer3'); 
    var defered = q.defer();
    var escape_data =  [pdt['qty'],pdt['project_id']];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    strQuery = mysqli.mysqli($mysqli,'timer9'); 
    var defered = q.defer();
    var escape_data =  [pdt['id']];

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}
exports.cartPaidPrdt =  function(req,mysql,q,id,cart_id,qty_add)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'timer10'); 
    var defered = q.defer();
    var escape_data =  [id,cart_id];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    strQuery = mysqli.mysqli($mysqli,'timer3'); 
    var defered = q.defer();
    var escape_data =  [qty_add,id];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on("error",function(err){
        console.log(err.stack);
        throw err;

    })
    return defered.promise;

}
exports.minusReduceCart=  function(req,mysql,q)
{
    $mysqli =  {};     
    var defered = q.defer();    
    strQuery = mysqli.mysqli($mysqli,'timer11'); 
    query =  mysql.query(strQuery,defered.makeNodeResolver());
    return defered.promise;

}
exports.clearAllCart =  function(req,mysql,q,sec)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'timer7'); 
    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [datenow,sec];

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;

}

exports.paidBuynowlocal = function(req,mysql,q,id,escrow)
{
    $mysqli =  {};

    strQuery = mysqli.mysqli($mysqli,'update_local_pickup_cart');
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var defered = q.defer();
    var release = 1;
    var r_date = datenow;
    if(escrow == 0)
    {
        release = 0;
        r_date = '0000-00-00 00:00:00'
    }
    var escape_data =  [id,datenow,release,r_date,escrow,req.param('id')];
    //console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

        query.on('error',function(error){
            console.log(error.stack)
            throw error;
        })
    return defered.promise;

}
exports.paidBuynow = function(req,mysql,q,id,escrow)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx230'); 
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var defered = q.defer();
    var release = 1;
    var r_date = datenow;
    if(escrow == 0)
    {
        release = 0;
        r_date = '0000-00-00 00:00:00'
    }   
    var escape_data =  [id,datenow,release,r_date,escrow,req.param('id')];
   // console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err){
        console.log(err.stack);
        throw err;
    });
    return defered.promise;

}
exports.paidBid = function(req,mysql,q,id,trans_id)
{
    $mysqli =  {};     
      
  strQuery = mysqli.mysqli($mysqli,'208'); 
  var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var defered = q.defer();
    var release = 1;
    var r_date = datenow;
    
    var escape_data =  [r_date,trans_id,req.body.trans_gateway,id];

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
   // console.log('aaa'+query.sql);
    query.on('error',function(err){
        console.log(err.stack);
        throw err;
    });
  return defered.promise;

}

exports.releaseBuynow = function(req,mysql,q,buynowid,m)
{
    $mysqli =  {};
    strQuery = mysqli.mysqli($mysqli,'cnx243');
    var escape_data =  [m,buynowid];
    var defered = q.defer();
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}

exports.insertBidnow = function(req,mysql,q,pay)
{
    $mysqli =  {};
    req.body.local_pick = (typeof(req.body.local_pick) == 'undefined') ? 0 : req.body.local_pick;
    strQuery = mysqli.mysqli($mysqli,'cnx212'); 
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");

    var sold = 1;
    var amt = pay.amount;
    //var amt = req.session.products[d]['qty_add']*(req.session.products[d]['bprice']+req.session.products[d]['shipping_price']);
    commission = parseFloat((amt)*(req.body.commission/100)).toFixed(2)

   /* if(req.body.local_pick == 1){
        amt = 0;
        commission = 0;
    }*/
    var escape_data =  [pay.payid,pay.sessionsdata.userid,amt,datenow,1,0,1,0,1,0,'0000-00-00 00:00:00',0,'0000-00-00 00:00:00',0,commission,req.body.local_pick,0];
  
    console.log(escape_data)
    var defered = q.defer();
    //var escape_data =  [req.param('id')];       
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err){
        throw err;
    });
    return defered.promise;
}


exports.getCartDetailscart = function(req,mysql,q,cartid)
{
    $mysqli =  {};

    strQuery = mysqli.mysqli($mysqli,'cnx218');

    var defered = q.defer();
    var escape_data =  [cartid];
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    //console.log("Get cart details query is "+query.sql);
    query.on('error',function(err)
    {

        throw err;
    });

    return defered.promise;
}


exports.getCartDetails = function(req,mysql,q)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx218'); 
    
    var defered = q.defer();
    var escape_data =  [req.param('id')];       
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err){
        throw err;
    });
    return defered.promise;
}
exports.updateInvoiceBuy = function(req,mysql,q,id,cid,pid)
{

    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx251'); 
    
    var defered = q.defer();
    var escape_data =  [id,cid,pid];       
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    console.log("**************** Invoice update query is "+query.sql);
    query.on('error',function(err){
        console.log(err.stack);
        throw err;
    });
    return defered.promise;
}

exports.getBuynowCartDetails = function(req,mysql,q)
{

    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx219'); 
    
    var defered = q.defer();
    var escape_data =  [req.param('id')];       
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    console.log("Get buynow details "+query.sql);
    query.on("error",function(err){
        console.log(err.stack);
        throw err;
    })
    return defered.promise;
}

exports.getbuyerdetails = function(req,mysql,q,buyerid)
{
    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli,'yab20');
    //console.log(strQuery);
    var defered = q.defer();
    var escape_data = [buyerid];
    //console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;
}

exports.cartPaidPrdtsel =  function(req,mysql,q,id,cart_id,qty_add)
{
    $mysqli =  {};
    strQuery = mysqli.mysqli($mysqli,'yab21');
    var defered = q.defer();
    var escape_data =  [req.session.userid];
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}

exports.cartinsertBuyItemInvoices = function(req,mysql,q,c_id,prouserdetails,buyerdetails,quantity,trans_id)
{
    console.log("prouserdetails detils is "+JSON.stringify(prouserdetails));
    console.log("buyerdetails detils is "+JSON.stringify(buyerdetails));
   /* $mysqli =  {};
    customerio = require('./customerio');
    customerio.uid = prouserdetails.user_id;
    customerio.inits();
    //console.log(req.session.products[d]);
    customerio.createCustomer({email:prouserdetails.email,user:{firstName:prouserdetails.first_name,lastName:prouserdetails.last_name}});

    customerio.sendEmail({event:'item_sold',content:{user:prouserdetails.first_name+' '+prouserdetails.last_name,qty:quantity,price: quantity*(prouserdetails.bprice+prouserdetails.shipping_price),title: prouserdetails.title,url:global.url+'/product/view/'+prouserdetails.id}});

    strQuery = mysqli.mysqli($mysqli,'cnx216');

    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var amt = quantity*(prouserdetails.bprice+prouserdetails.shipping_price);

    var escape_data =  [0,'Paypal',datenow,buyerdetails.id,prouserdetails.id,'sold',prouserdetails.title,amt,'paid','debit',datenow,quantity,c_id];
    //console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;*/
    //trans_id ='111';
    $mysqli =  {};
    strQuery = mysqli.mysqli($mysqli,'cnx216');

    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var amt = (quantity * common.sumFloat(prouserdetails.bprice,prouserdetails.shipping_price)).toFixed(2);

   // var escape_data =  [trans_id,'braintree',datenow,req.session.userid,prouserdetails['id'],'sold',prouserdetails['title'],amt,'paid','debit',datenow,quantity,c_id];
    var escape_data =  [trans_id,'Paypal',datenow,buyerdetails.id,prouserdetails.id,'sold',prouserdetails.title,amt,'paid','debit',datenow,quantity,c_id];
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    console.log("Insert Invoice " +query.sql);
    query.on('error',function(err){
        console.log(err.stack);
        throw err;
    });
    var selleremail = prouserdetails['email'];
    var first_name = prouserdetails['first_name'];
    var last_name = prouserdetails['last_name'];
    var saled = prouserdetails['saled'];
    var title = prouserdetails['title'];
    var sellerphone = prouserdetails['phone']
    var url = global.url+'/product/view/'+prouserdetails['id'];

    delete customerio;


    customerio = require('./customerio');
    customerio.uid = prouserdetails['user_id'];

    localm  = require('./localmail');

    //var price  = parseFloat(parseInt()*(parseFloat(prouserdetails['bprice']) + parseFloat(prouserdetails['shipping_price']))).toFixed(2);
    var price = (quantity * common.sumFloat(prouserdetails.bprice,prouserdetails.shipping_price)).toFixed(2);;

    console.log('consoleconsoleconsoleconsoleconsoleconsole'+price);

    if(global.emailcio.status == 'yes'){
        console.log("********** If emailcio status yess With qty  "+quantity +"*************");
        customerio.inits();

        customerio.createCustomer({email:prouserdetails['email'],user:{firstName:prouserdetails['first_name'],lastName:prouserdetails['last_name']}});
        customerio.sendEmail({event:'item_sold',content:{user:prouserdetails['first_name']+' '+prouserdetails['last_name'],bname:buyerdetails['first_name'] +' '+buyerdetails['last_name'],bphone:buyerdetails['phone'],bemail:buyerdetails['email'], qty:quantity,price: price.toFixed(2) ,title: prouserdetails['title'],url:global.url+'/product/view/'+prouserdetails['id'],sitename:'AuctionSoftware.com'}});
    }

    else if(global.emaillocal.status == 'yes'){

        console.log("********** If emaillocal status yess *************");

        q.all([localm.mailtemps(req,config.mysql,q,'item_sold')]).then(function(results2){

            var price2  = parseFloat(parseInt(quantity)*(parseFloat(prouserdetails['bprice']) + parseFloat(prouserdetails['shipping_price'])));
            if(results2){

                var template = results2[0][0][0].template;
                var subject_message = results2[0][0][0].subject;


                template = template.replace('{{event.user}}' , prouserdetails['first_name']+' '+prouserdetails['last_name']);
                template = template.replace('{{event.qty}}' , quantity);
                template = template.replace('{{event.bname}}' , buyerdetails['first_name']);
                template = template.replace('{{event.bphone}}' , buyerdetails['phone']);
                template = template.replace('{{event.bemail}}' , buyerdetails['email']);
                template = template.replace('{{event.price}}' , price2.toFixed(2));
                template = template.replace('{{event.title}}' , title);
                template = template.replace('{{event.url}}' , url);
                template = template.replace('{{event.sitename}}' , 'AuctionSoftware.com');


                localm.sendmail(template,subject_message,selleremail);


            }
            else{

                console.log("No template named item_sold");
            }


        }).fail(function(err){
            console.log(err.stack);
            throw err;
        }).done();

    }

    else{ console.log('No Mail Delivery method is selected'); }

    console.log('***********************************');
    if(global.smstwo.status == 'yes'){
        console.log("********** If smstwo status yess *************");
        twillio = require('./twillio');

        q.all([twillio.smstemps(req,config.mysql,q,'item_sold')]).then(function(results3){

            if(results3){
                var price3  = parseFloat(parseInt(prouserdetails['saled'])*(parseFloat(prouserdetails['bprice']) + parseFloat(prouserdetails['shipping_price'])));
                var template = results3[0][0][0].template;

                template = template.replace('{{event.user}}' , prouserdetails['first_name']+' '+prouserdetails['last_name']);
                template = template.replace('{{event.qty}}' , quantity);
                template = template.replace('{{event.bname}}' , buyerdetails['first_name']);
                template = template.replace('{{event.bphone}}' ,  buyerdetails['phone']);
                template = template.replace('{{event.bemail}}' , buyerdetails['email']);
                template = template.replace('{{event.price}}' , price3.toFixed(2));
                template = template.replace('{{event.title}}' , title);
                template = template.replace('{{event.url}}' , url);
                template = template.replace('{{event.sitename}}' , 'AuctionSoftware.com');



                twillio.sendsms(template,sellerphone);

            }

            else{

                console.log('No template name bid_submitted')
            }


        }).fail(function(err){
            console.log(err.stack);
            throw err;
        }).done();

    }

    return defered.promise;
}



exports.insertBuyItemInvoices = function(req,mysql,q,d,c_id,trans_id)
{
    $mysqli =  {};
    strQuery = mysqli.mysqli($mysqli,'cnx216'); 

    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var amt = (req.session.products[d]['saled']* common.sumFloat(req.session.products[d]['bprice'],req.session.products[d]['shipping_price'])).toFixed(2);

    var escape_data =  [trans_id,req.body.trans_gateway,datenow,req.session.userid,req.session.products[d]['id'],'sold',req.session.products[d]['title'],amt,'paid','debit',datenow,req.session.products[d]['saled'],c_id];
console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err){
        console.log(err.stack);
        throw err;
    });
     var selleremail = req.session.products[d]['email'];
       var first_name = req.session.products[d]['first_name'];
        var last_name = req.session.products[d]['last_name'];
         var saled = req.session.products[d]['saled'];
          var title = req.session.products[d]['title'];
          var sellerphone = req.session.products[d]['phone']
            var url = global.url+'/product/view/'+req.session.products[d]['id'];

    delete customerio;
   
    


    customerio = require('./customerio');
    customerio.uid = req.session.products[d]['user_id'];

    localm  = require('./localmail');
    
    var price  = parseFloat(parseInt(req.session.products[d]['saled'])*(parseFloat(req.session.products[d]['bprice']) + parseFloat(req.session.products[d]['shipping_price'])));

   

    if(global.emailcio.status == 'yes'){
      
      customerio.inits();
      
      customerio.createCustomer({email:req.session.products[d]['email'],user:{firstName:req.session.products[d]['first_name'],lastName:req.session.products[d]['last_name']}});
      customerio.sendEmail({event:'item_sold',content:{user:req.session.products[d]['first_name']+' '+req.session.products[d]['last_name'],bname:req.param('f_name'),bphone:req.param('phone'),bemail:req.param('email'), qty:req.session.products[d]['saled'],price: price.toFixed(2) ,title: req.session.products[d]['title'],url:global.url+'/product/view/'+req.session.products[d]['id'],sitename:'AuctionSoftware.com'}});
    }
   
    else if(global.emaillocal.status == 'yes'){
            
       
     q.all([localm.mailtemps(req,config.mysql,q,'item_sold')]).then(function(results2){
        
        //var price2  = parseFloat(parseInt(req.session.products[d]['saled'])*(parseFloat(req.session.products[d]['bprice']) + parseFloat(req.session.products[d]['shipping_price'])));
        if(results2){
            
            var template = results2[0][0][0].template;
            var subject_message = results2[0][0][0].subject;
            
            
            template = template.replace('{{event.user}}' , first_name+' '+last_name);
            template = template.replace('{{event.qty}}' , saled);
            template = template.replace('{{event.bname}}' , req.param('f_name'));
            template = template.replace('{{event.bphone}}' ,  req.param('phone'));
            template = template.replace('{{event.bemail}}' , req.param('email'));
            template = template.replace('{{event.price}}' , price.toFixed(2));
            template = template.replace('{{event.title}}' , title);
            template = template.replace('{{event.url}}' , url);
            template = template.replace('{{event.sitename}}' , 'AuctionSoftware.com');
            
           
            localm.sendmail(template,subject_message,selleremail);
           

        }
        else{

            console.log("No template named item_sold");
        }

        
      });

    }

  else{ console.log('No Mail Delivery method is selected'); }

  console.log('***********************************');
    if(global.smstwo.status == 'yes'){

        
        twillio = require('./twillio');

        q.all([twillio.smstemps(req,config.mysql,q,'item_sold')]).then(function(results3){

        if(results3){
            
            var template = results3[0][0][0].template;
                    
            template = template.replace('{{event.user}}' , first_name+' '+last_name);
            template = template.replace('{{event.qty}}' , saled);
            template = template.replace('{{event.bname}}' , req.param('f_name'));
            template = template.replace('{{event.bphone}}' ,  req.param('phone'));
            template = template.replace('{{event.bemail}}' , req.param('email'));
            template = template.replace('{{event.price}}' , price.toFixed(2));
            template = template.replace('{{event.title}}' , title);
            template = template.replace('{{event.url}}' , url);
            template = template.replace('{{event.sitename}}' , 'AuctionSoftware.com');

          
          
          twillio.sendsms(template,sellerphone);

        }

        else{

          console.log('No template name bid_submitted')
        }


        });

    }
 
    return defered.promise;
}
exports.updateSold = function(req,mysql,q,id,sold)
{

    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx214'); 
    
    var defered = q.defer();
    
    var escape_data =  [sold,id];
           
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    console.log("UPDATE sold query "+query.sql);
    query.on('error',function(err){
        console.log(err.stack);
        throw err;
    })
    return defered.promise;
}
exports.closeProduct = function(req,mysql,q,id)
{

    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx215'); 
    
    var defered = q.defer();
    
    var escape_data =  [id];
           
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    query.on('error',function(err){
        throw err;
        console.log(err.stack);
    })
    return defered.promise;
}
exports.checkout = function(req,mysql,q,id)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx210'); 
    
    var defered = q.defer();
    
    var escape_data =  [id];
           
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}
exports.selectCartItems = function(req,mysql,q,fq)
{
 
           
    fq =  (req.session.pid instanceof  Array) ? req.session.pid.join(',') : req.session.pid;    
    $mysqli =  {where:fq};
    strQuery = mysqli.mysqli($mysqli,'cnx213'); 
    var defered = q.defer();
    var escape_data =  [];
           
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
 
}

exports.insertBuynowpaypal = function(req,mysql,q,cid,quantity,onlinepayment,shipprice,buynowprice,proid,buyerid)
{
    $mysqli =  {};
    strQuery = mysqli.mysqli($mysqli,'yab22');
    //console.log(req.session.products[d]);
    if(shipprice > 0)
    {
        local_pick = 1
        var amt = quantity*(buynowprice+shipprice);

        if(onlinepayment==1)
        {
            paids=1
        }
        else
        {
            paids =2
        }
    }
    else
    {
        var amt = quantity*(buynowprice+shipprice);
        local_pick = 0
        paids = 1
    }
    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    //console.log(datenow);
    var sold = quantity;
    var release = 1;
    var r_date = datenow;
    //commission = parseFloat((amt-req.session.products[d]['refund'])*(req.body.commission/100)).toFixed(2);
    commission = (parseFloat(config.general.commission_fee)/ 100 * amt).toFixed(2);


    var escape_data =  [proid,buyerid,amt,datenow,quantity,cid,sold,0,0,paids,datenow,release,r_date,1,commission,local_pick];
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    console.log("Insert INTO bounow table "+query.sql);

    query.on('error',function(err)
    {
        throw err;
    });
    return defered.promise;
}


exports.insertBuynow = function(req,mysql,q,d,cid,escrow)
{

    try {
        $mysqli = {};
        //req.body.local_pick = (typeof(req.body.local_pick) == 'undefined') ? 0 : req.body.local_pick;

        req.body.local_pick = 1;
        strQuery = mysqli.mysqli($mysqli, 'cnx212');
        //console.log(req.session.products[d]);
        var defered = q.defer();
        var dateFormat = require('dateformat');
        var datenow = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        //console.log(datenow);
        var sold = req.session.products[d]['saled'];
        var release = 1;
        var r_date = datenow;
        if (escrow == 0) {
            release = 0;
            r_date = '0000-00-00 00:00:00'
        }

        var amt = (req.session.products[d]['qty_add'] * parseFloat(req.session.products[d]['bprice']) + parseFloat(req.session.products[d]['shipping_price'])).toFixed(2);
        commission = parseFloat((amt - req.session.products[d]['refund']) * (req.body.commission / 100)).toFixed(2)

        var escape_data = [req.session.products[d]['id'], req.session.userid, amt, datenow, req.session.products[d]['qty_add'], cid, sold, req.session.products[d]['refund'], 0, 1, datenow, release, r_date, escrow, commission,req.body.local_pick,1];

        query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());

        query.on('error', function (err) {
            console.log(err.stack);
            throw err;
        })
        return defered.promise;
    }catch(e){
        console.log("Error in Inset by now "+e);
    }
 
}
exports.removeitem = function(id,req,res,mysql)
{
    req.body.id = id;
    var self = this;
    var cmn = require('./common');
    if(typeof(req.session.userid) === 'undefined')
    {
        var data = { success : false,error : '', redirect : true };
        cmn.renderJson(res,data);
    } 
    if(typeof(req.session.userid) === 'undefined')
    {
        var data = { success : false,error : '', redirect : true };
        cmn.renderJson(res,data);
    } 
    q.all([products.cartitemDetail(req,mysql,q)]).then(function(results){

      var prdt = results[0][0][0];
     // console.log(prdt);
      prdt['qty'] = parseInt(prdt['qty']);
      //console.log(prdt['qty'] );
     
      var cart = require('./cart');         
        
          if(typeof(req.session.products) !== 'undefined')
          {
            
            if(req.session.pid.indexOf(prdt.project_id) >= 0)
            {
               var mn_req_id = req.session.pid.indexOf(prdt.project_id);
               cart.removeTempItem(req,mysql,q,id,prdt.qty);
               delete req.session.pid[mn_req_id];
               delete req.session.products[mn_req_id];
                    
               req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
               req.session.products = req.session.products.filter(function(n){ return n != undefined });
               if(req.session.pid.length == 0)
               {
                 delete req.session.temp_cart_id;
                 delete req.session.temp_time_id;
                 delete req.session.pid;
                 delete req.session.products;
                 delete req.session.timer;
               } 
               var data = { success : true,error : '',add:0 };
               cmn.renderJson(res,data);
            }else {
                var data = {success: true, error: '', add: 0};
                cmn.renderJson(res, data);
            }
          }
           
    }).fail(function(err){
        console.log(err.stack);

    })
      
}
exports.addItem = function(id,req,res,mysql)
{
    membership_status = true;
    req.body.id = id;
    var self = this;
    var cmn = require('./common');

    if(typeof(req.session.userid) === 'undefined')
    {
        var data = { success : false,error : '', redirect : true };
        cmn.renderJson(res,data);
    } 
    if(typeof(req.session.userid) === 'undefined')
    {
        var data = { success : false,error : '', redirect : true };
        cmn.renderJson(res,data);
    }

    q.all([products.productDetail(req,mysql,q)]).then(function(results){
     try {
         var prdt = results[0][0][0];
         //console.log(prdt);
         //prdt.qty_add = 1;
         var dateFormat = require('dateformat');
         var date = require('date-utils');
         prdt['qty_add'] = (typeof(req.param('qty')) !== 'undefined') ? req.param('qty') : 1;
         prdt['qty'] = parseInt(prdt['qty']);
         prdt['booked'] = parseInt(prdt['booked']);
         prdt['sold'] = parseInt(prdt['sold']);
         prdt['qty_add'] = parseInt(prdt['qty_add']);

         prdt['shipping_price'] = common.currencyConverter(prdt['shipping_price']);
         prdt['bprice'] = common.currencyConverter(prdt['bprice']);

         var datenow = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
         var cart = require('./cart');
        // console.log(cart);
         var closeddate = dateFormat(new Date(prdt['date_closed']), "yyyy-mm-dd HH:MM:ss");
         var k_l = false;
         if (typeof(req.session.pid) !== 'undefined') {

             if (req.session.pid.indexOf(prdt.id) >= 0) {
                 var k_l = true;
             }
         }
         //prdt['m_qty_add'] = prdt['qty_add'];
         if (typeof(req.session.pid) !== 'undefined') {
             if (req.session.pid.indexOf(prdt.id) >= 0) {

                 prdt['booked'] = prdt['booked'] - parseInt(req.session.products[req.session.pid.indexOf(prdt.id)]['qty_add']);

             }
         }
         if ((Date.compare(closeddate, datenow) <= 0 ) && prdt['market_status'] == 'open' && !k_l) {
             var data = {success: false, error: 'Project Ended!'};
             cmn.renderJson(res, data);
         }
         else if (prdt['qty'] - prdt['sold'] - prdt['booked'] <= 0 && !k_l) {
             var data = {success: false, error: 'Project Sold!'};
             cmn.renderJson(res, data);
         }
         else if (prdt['qty'] - prdt['sold'] - prdt['booked'] - prdt['qty_add'] < 0 && !k_l) {
             var data = {
                 success: false,
                 error: parseInt(prdt['qty'] - prdt['sold'] - prdt['booked']) + ' Only Available !'
             };
             cmn.renderJson(res, data);
         }
         else if (prdt['market_status'] != 'open' && !k_l) {
             var data = {success: false, error: 'Project Sold!'};
             cmn.renderJson(res, data);
         }
         else {
             req.session.buynowcountyear = parseInt(req.session.buynowcountyear) + parseInt(prdt['qty_add']) ;
             req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) + parseInt(prdt['qty_add']) ;
             membership_status =  common.checkLimitReached('monthly_buynow_limit',req);
             if(membership_status) {
                 membership_status = common.checkLimitReached('buynow_limit', req);
             }
            if(membership_status) {
                if (typeof(req.session.pid) !== 'undefined') {

                    if (req.session.pid.indexOf(prdt.id) >= 0) {
                        var mn_req_id = req.session.pid.indexOf(prdt.id);
                        cart.removeTempItem(req, mysql, q, id, req.session.products[mn_req_id]['qty_add']);
                        delete req.session.pid[mn_req_id];
                        delete req.session.products[mn_req_id];

                        req.session.pid = req.session.pid.filter(function (n) {
                            return n != undefined
                        });
                        req.session.products = req.session.products.filter(function (n) {
                            return n != undefined
                        });

                        if (req.session.pid.length == 0) {
                            delete req.session.temp_cart_id;
                            delete req.session.temp_time_id;
                            delete req.session.pid;
                            delete req.session.products;
                            delete req.session.timer;
                            req.session.pid = [];
                            req.session.products = [];
                        }
                        cart.addTempItem(req, mysql, q, id, prdt['qty_add']);
                        req.session.pid.push(prdt.id);
                        req.session.products.push(prdt);


                        var data = {success: true, error: '', add: 1, membership_status: membership_status};
                        cmn.renderJson(res, data);
                    }
                    else {
                        cart.addTempItem(req, mysql, q, id, prdt['qty_add']);
                        req.session.pid.push(prdt.id);
                        req.session.products.push(prdt);


                    }

                }
                else {

                    req.session.temp_cart_id = Date.parse(new Date()) / 1000;
                    //console.log(req.session);
                    var dateFormat = require('dateformat');
                    req.session.temp_time_id = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
                    cart.addTempItem(req, mysql, q, id, prdt['qty_add']);
                    req.session.pid = [];
                    req.session.products = [];
                    req.session.pid.push(prdt.id);
                    req.session.products.push(prdt);


                }
            }else{
                req.session.buynowcountyear = parseInt(req.session.buynowcountyear) - parseInt(prdt['qty_add']) ;
                req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) - parseInt(prdt['qty_add']) ;
            }


             var data = {success: true, error: '', add: 1,membership_status : membership_status};
             cmn.renderJson(res, data);


         }
     }catch(e){
         console.log("Add or removing cart error "+ e.stack);
     }

    }).fail(function(error){
        console.log(error.stack);
        throw error;
    }).done();
      
}
exports.upDateItemBooked= function(req,mysql,q,id,qty,nqty)
{
    $mysqli =  {};     

    strQuery = mysqli.mysqli($mysqli,'timer6');

    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [nqty,req.session.temp_cart_id,id,req.session.userid];

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    $mysqli =  {};

    strQuery = mysqli.mysqli($mysqli,'timer3'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [qty,id];   
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    strQuery = mysqli.mysqli($mysqli,'timer2'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [nqty,id];  

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}
exports.removeTempItem = function(req,mysql,q,id,qty)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'timer4');
    req.session.buynowcountyear = parseInt(req.session.buynowcountyear) - parseFloat(qty);
    req.session.buynowcountmonth = parseInt(req.session.buynowcountmonth) - parseFloat(qty);


    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [req.session.temp_cart_id,id,req.session.userid];

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'timer3'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [qty,id];   
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}
exports.addTempItem = function(req,mysql,q,id,qty)
{
    $mysqli =  {};     

    strQuery = mysqli.mysqli($mysqli,'timer1'); 
    console.log(2);
    var defered = q.defer();
    //var date = require('date-utils');
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [id,datenow,req.session.temp_cart_id,qty,0,0,req.session.userid]; 

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'timer2'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [qty,id];
    console.log(escape_data);       
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    query.on('error',function(error){
        throw error;
    })
    return defered.promise;
}
exports.updateCartRefund = function(req,mysql,q,amt,id,cid)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx217'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [amt,id,cid];

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;

}   
exports.insertCartDetails = function(req,mysql,q,d,price)
{
    try {
        $mysqli = {};

        strQuery = mysqli.mysqli($mysqli, 'cnx211');

        var defered = q.defer();
        var dateFormat = require('dateformat');
        //var date = require('date-utils');
        var datenow = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        var escape_data = [datenow, req.param('f_name'), req.param('l_name'), req.param('email'), req.param('phone'), req.param('address'), req.param('country'), req.param('state'), req.param('city'), req.param('zipcode'), req.session.userid, datenow, 1, d, price];


        query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
        query.on('error', function (err) {
            console.log(error.stack);
            throw err;
        })
        return defered.promise;
    }catch(e){
        console.log("Error in insert cart details"+ e.stack);
    }

}

exports.insertCartDetailslocal = function(req,mysql,q,d,price)
{
    $mysqli =  {};

    strQuery = mysqli.mysqli($mysqli,'cnx211');

    var defered = q.defer();
    var dateFormat = require('dateformat');
    //var date = require('date-utils');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [datenow,req.param('f_name'),req.param('l_name'),req.param('email'),req.param('phone'),req.param('address'),req.param('country'),req.param('state'),req.param('city'),req.param('zipcode'),req.session.userid,datenow,2,d,price];
    console.log("******************************* "+escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;

}



exports.insertBuynowlocal = function(req,mysql,q,d,cid,escrow)
{

    $mysqli =  {};

    strQuery = mysqli.mysqli($mysqli,'cnx212');
    //console.log(req.session.products[d]);

    local_pick = 1;
    paids =2;
    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    //console.log(datenow);
    var sold = req.session.products[d]['saled'];
    var release = 1;
    var r_date = datenow;
    if(escrow == 0)
    {
        release = 0;
        r_date = '0000-00-00 00:00:00'
    }

    var amt = (req.session.products[d]['qty_add'] * parseFloat(req.session.products[d]['bprice']) + parseFloat(req.session.products[d]['shipping_price'])).toFixed(2);
    /*var amt = req.session.products[d]['qty_add']*(req.session.products[d]['bprice']+req.session.products[d]['shipping_price']);*/
    //commission = parseFloat((amt-req.session.products[d]['refund'])*(req.body.commission/100)).toFixed(2);
    commission = 0;
    var escape_data =  [req.session.products[d]['id'],req.session.userid,amt,datenow,req.session.products[d]['qty_add'],cid,sold,req.session.products[d]['refund'],0,paids,datenow,release,r_date,escrow,commission,local_pick];


    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    query.on('error',function(err){
        throw err;
        console.log(err.stack);
    })
    return defered.promise;

}




exports.productDetailItems = function(req,mysql,q)
{ 
    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli,'timer5'); 
    //console.log(strQuery);
    var defered = q.defer();
    //var escape_data = [req.body.sid];
    var escape_data = [req.session.pid];
  //  console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;
}
exports.updateItem = function(req,mysql,q)
{

    for (i in req.session.products)
    {

          req.session.products[i]['qty_add'] = req.body['pid['+req.session.products[i]['id']+']']; 
    }
}
exports.InsertItemInCart = function(req,mysql,q)
{
        $mysqli =  {};

        strQuery = mysqli.mysqli($mysqli,53); 
        
        var defered = q.defer();
        
        var escape_data =  [req.param('id'),req.session.userid];
               
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        return defered.promise;
}

exports.updateCartDetails = function(req,mysql,q,cart_id,trans_id)
{
    $mysqli =  {};

    strQuery = mysqli.mysqli($mysqli,'update_cart_details');
    //console.log(strQuery);

    var defered = q.defer();
    var dateFormat = require('dateformat');
    //var date = require('date-utils');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [datenow,trans_id,cart_id];
    //console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    console.log("Update checkout is "+query.sql);
    query.on('error',function(err)
    {

        throw err;
    });
    return defered.promise;

}

exports.insertbuynowCartDetails = function(req,mysql,q,d,price)
{
    $mysqli =  {};

    strQuery = mysqli.mysqli($mysqli,'cnx211');

    var defered = q.defer();
    var dateFormat = require('dateformat');
    //var date = require('date-utils');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [datenow,req.param('f_name'),req.param('l_name'),req.param('email'),req.param('phone'),req.param('address'),req.param('country'),req.param('state'),req.param('city'),req.param('zipcode'),req.session.userid,datenow,0,d,price];
    //console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    query.on('error',function(err)
    {

        throw err;
    });
    return defered.promise;

}


exports.cartproductdetails = function(req,mysql,q,id,details) {
    $mysqli = {};

    strQuery = mysqli.mysqli($mysqli, 'yab6');

    var defered = q.defer();

    var escape_data = [details, id];

    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
}

exports.getprouserdetails = function(req,mysql,q,proid)
{
    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli,'yab19');
    //console.log(strQuery);
    var defered = q.defer();
    var escape_data = [proid];
    //console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    console.log("getprouserdetails "+query.sql);
    return defered.promise;
}

exports.deleteshipbuynow = function(req,mysql,q)
{
    $mysqli =  {};
    strQuery = mysqli.mysqli($mysqli,'yab3');
    var defered = q.defer();
    var escape_data =  [req.param('buynowid')];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err){
       console.log(err.stack);
    });
    return defered.promise;

}

exports.insertshipbuynow = function(req,mysql,q)
{

    $mysqli =  {};

    strQuery = mysqli.mysqli($mysqli,'yab2');
    var defered = q.defer();
    var dateFormat = require('dateformat');
    //var date = require('date-utils');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [datenow,req.param('f_name'),req.param('l_name'),req.param('phone'),req.param('email'),req.param('address'),req.param('country'),req.param('state'),req.param('city'),req.param('zipcode'),req.session.userid,req.param('buynowid'),req.param('pay_amount')];
    
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    query.on('error',function(err)
    {
        throw err;
    });
    return defered.promise;

}