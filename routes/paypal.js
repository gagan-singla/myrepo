var express = require('express');
var reload = require('reload');
var sprintf = require('sprintf').sprintf;
var common = require('../module/common');
/*var session = require('express-session');*/
var app = express.Router();
var cryptos =  require('../module/crypto.js');
var mysqli = require('../module/mysqli');
 var cookieParser = require('cookie-parser');

var q = require('q');


/*//required js
var configure = require('../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
}*/

app.get('/cancelurl', function(req, res){
    console.log("************** Cancel URl oissssssss");
	    common.tplFile('dummy.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
});
app.get('/cancelbulkurl', function(req, res){
    console.log("************* Cancel urlllllll ********************");
    common.tplFile('dummynew.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);
});
app.get('/successbulkurl', function(req, res){
    console.log("************* Sucessssssssssssss successbulkurl ********************");

    cart = require('../module/cart');

    var fg = (req.session.pid instanceof  Array) ? req.session.pid.join(',') : req.session.pid;

    q.all([cart.selectCartItems(req,config.mysql,q,fg)]).then(function(resu) {
        var prd = resu[0][0];
        for (i in prd) {
            var m_add = req.session.pid.indexOf(prd[i].id);

            cart.cartPaidPrdt(req, config.mysql, q, prd[i]['id'], req.session.temp_cart_id, req.session.products[m_add]['qty_add']);

            if(i == prd.length - 1) {
                delete req.session.pid;
                delete req.session.products;
                if (typeof(req.session.pid) !== 'undefined') {

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
                        common.tplFile('dummynewbuynow.tpl');
                        common.headerSet(1);
                        common.loadTemplateHeader(req, res, $arr);
                    }
                }
                else {
                    delete req.session.temp_cart_id;
                    delete req.session.temp_time_id;
                    delete req.session.timer;
                    common.tplFile('dummynewbuynow.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }


            }
        }
    }).fail(function(err){
        console.log(err.stack);
        throw err;
    }).done();
});



//send forgot password email
app.post('/cancel/:id', function(req, res)
{
    res.send(200);
});


// Using Post
app.post('/successcart/:id', function(req, res){
    console.log("************** Successcart In Postttttttttttttttttttt");
    /*var sendemail = require('../module/emailmandrill');*/

   console.log(req.body);
    cart_id = req.param('id');

    var async = require('async');
    var ipn = require('paypal-ipn');
    ipn.verify(req.body, function callback(err, msg) {


            var dashboard = require('../module/dashboard');
            var product = require('../module/products');
            cart = require('../module/cart');


            q.all([cart.getCartDetailscart(req,config.mysql,q,cart_id)]).then(function(results) {
                var t_id = 0;
                cart_temp_detail = results[0][0][0].cart_temp_details;
                buyerid = results[0][0][0].user_id;
                var eachproduct = cart_temp_detail.split('***');
                async.mapSeries(eachproduct, function(id, callback) {
                    if(id) {

                        console.log('checkrquestbody');
                        console.log("************* Transaction id is "+req.body["transaction["+t_id+"].id"])

                        var getitemdetails = id.split('-');

                        proid = getitemdetails[0];
                        quantity = getitemdetails[1];
                        onlinepayment = getitemdetails[2];
                        q.all([cart.getprouserdetails(req, config.mysql, q, proid), cart.getbuyerdetails(req, config.mysql, q, buyerid)]).then(function (resultsec) {
                            prouserdetails = resultsec[0][0][0];
                            buyuserdetails = resultsec[1][0][0];

                            cart.insertBuynowpaypal(req, config.mysql, q, cart_id, quantity, onlinepayment, prouserdetails.shipping_price, prouserdetails.bprice, prouserdetails.id, buyuserdetails.id);
                            message = require('../module/message');
                            var dat = require('date-util');

                            req.body.toid = buyerid;
                            req.body.first_name = buyuserdetails.first_name;
                            req.body.last_name = buyuserdetails.last_name;
                            req.body.r_id = Date.parse(new Date()) / 1000;
                            req.body.toemail = buyuserdetails.email;
                            req.body.fromid = prouserdetails.user_id;
                            req.body.pid = prouserdetails.id

                            req.body.subject = 'Regards Buying ' + quantity + ' qty of ' + prouserdetails.title;
                            req.body.message = 'Thank You for buying the item with us.Any Queries Please email us.';
                            req.body.phmessage = 'Thank You for buying the item with us.Any Queries Please email us.';
                            message.addmessages(req,config.mysql,q);
                            cart.updateSold(req, config.mysql, q, proid, quantity);
                            cart.updateCartDetails(req, config.mysql, q,cart_id,req.body["transaction["+t_id+"].id"]);
                            cart.cartinsertBuyItemInvoices(req, config.mysql, q, cart_id, prouserdetails, buyuserdetails, quantity,req.body["transaction["+t_id+"].id"]);

                            callback(null);
                        }).fail(function(err){
                            console.log(err.stack);
                            throw err;
                        })
                    }
                    else{
                        //console.log('secondcallback')
                        callback(null);
                    }
                }, function(err, results) {
                    // results is an array of names
                    console.log('*************88 updateinvoicebuynowid *****************88');
                    q.all([cart.getBuynowCartDetails(req,config.mysql,q),cart.getprouserdetails(req,config.mysql,q,proid)]).then(function(resq) {
                        var status = 'sold';

                        var available_qty = parseInt(resq[1][0][0].qty) - parseInt(resq[1][0][0].sold) - parseInt(resq[1][0][0].booked);
                        console.log('*************Qty isss '+resq[1][0][0].qty +' *****************' +'booked is '+resq[1][0][0].booked +"Available qy is "+available_qty  +"Sold qy is "+resq[1][0][0].sold);
                        if(available_qty <= 0){
                            console.log('*************Made product status as sold *****************88');
                            product.closeProjects(req,config.mysql,q,status,proid);
                        }
                        for(i in resq[0][0])
                        {
                            cart.updateInvoiceBuy(req,config.mysql,q,resq[0][0][i].id,cart_id,resq[0][0][i].project_id);

                        }
                    }).fail(function(err){
                        console.log(err.stack);
                        throw err;
                    }).done();
                });

            }).fail(function(err){
                console.log(err.stack);
                throw err;
            }).done();


        if (err) {
            console.error(err);
        } else {
            // Do stuff with original params here

            if (req.body.status == 'Completed') {


                //console.log("*********** Body is "+req.body +"**********");
            }
        }
        /////////////// cart update jayanht //////////
        res.sendStatus(200);


    });

    console.log("failipnnnn");

});
// Post is
app.post('/success/:id', function(req, res){
	 
 /*var sendemail = require('../module/emailmandrill');*/

   /* var fs = require('fs');
    fs.writeFile("jayanth.log", "Hey there!", function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });*/
 console.log("Win bid Adoptive payment In Postttttttt");
	 console.log("Buynow id is "+req.param('id'));
	 buynowid = req.param('id');
var ipn = require('paypal-ipn');
    console.log(req.body);
ipn.verify(req.body, function callback(err, msg) {


            // Payment has been confirmed as completed
            /// add code for update payment details  ////////////
    ///////// code start here //////////////////
        var dashboard = require('../module/dashboard');
        var product = require('../module/products');
        req.body.id = buynowid;
        q.all([dashboard.getBuynowRecord(req,config.mysql,q),dashboard.getcartnowRecord(req,config.mysql,q)]).then(function(results){
            console.log("In getBuynowRecord");
            bid = results[0][0];
            proid = bid[0].project_id;
            cart_id = results[1][0][0].id;
            buyerphone = results[1][0][0].phone;
            buyeremail = results[1][0][0].email;
            buyername = results[1][0][0].first_name;

            q.all([product.productDetailId(req,config.mysql,q,bid[0].project_id)]).then(function(data2){

                pid = data2[0][0][0];
                price = bid[0].amount;
                cart = require('../module/cart');//cart.insertCartDetails(req,config.mysql,q,result.transaction.id,price
                q.all([cart.updateCartDetails(req,config.mysql,q,cart_id,req.body["transaction[0].id_for_sender_txn"])]).then(function(results) {
                    //cart_id = results[0][0].insertId;

                    cart.paidBuynow(req,config.mysql,q,cart_id,1);
                    cart.releaseBuynow(req,config.mysql,q,buynowid,1);
                    //cart.updateInvoiceBid(req,config.mysql,q,buynowid,cart_id,proid);

                    cart.paidBid(req,config.mysql,q,proid,req.body["transaction[0].id_for_sender_txn"]);// Update paid status as paid in Invoice


                    delete customerio;
                    localm	= require('../module/localmail');


                    if(global.emailcio.status == 'yes'){

                        customerio = require('../module/customerio');
                        customerio.uid = pid['user_id'];

                        customerio.inits();
                        customerio.createCustomer({email:pid['email'],user:{firstName:pid['first_name'],lastName:pid['last_name']}});
                        customerio.sendEmail({event:'item_sold',content:{siteurl:config.url,user:pid['first_name']+' '+pid['last_name'],bname:buyername,bphone:buyerphone,bemail:buyeremail,qty:1,price: 1*(pid['bprice']+pid['shipping_price']),title: pid['title'],url:global.url+'/product/view/'+pid['id'],unsub_url:global.unsub_url+'/'+pid['user_id']}});


                    }

                    else if(global.emaillocal.status == 'yes'){


                        q.all([localm.mailtemps(req,config.mysql,q,'item_sold')]).then(function(results2){

                            if(results2){

                                var template = results2[0][0][0].template;
                                var subject = results2[0][0][0].subject;

                                template = template.replace('{{event.user}}' , pid['first_name']+' '+pid['last_name']);
                                template = template.replace('{{event.bname}}' , buyername);
                                template = template.replace('{{event.bphone}}' ,  buyerphone);
                                template = template.replace('{{event.bemail}}' , buyeremail);
                                template = template.replace('{{event.qty}}' , 1);
                                template = template.replace('{{event.price}}' , 1*(pid['bprice']+pid['shipping_price']));
                                template = template.replace('{{event.title}}' , pid['title']);
                                template = template.replace('{{event.url}}' , global.url+'/product/view/'+pid['id']);
                                //console.log(template);
                                localm.sendmail(template,subject,pid['email']);

                            }

                            else{

                                console.log("No template named item_sold");
                            }


                        });

                    }

                    else{ console.log('No Mail Delivery method is selected'); }

                    console.log('*************************************************');
                    if(global.smstwo.status == 'yes'){

                        twillio	= require('../module/twillio');

                        q.all([twillio.smstemps(req,config.mysql,q,'item_sold')]).then(function(results3){

                            if(results3){

                                var template = results3[0][0][0].template;

                                template = template.replace('{{event.user}}' , pid['first_name']+' '+pid['last_name']);
                                template = template.replace('{{event.bname}}' , buyername);
                                template = template.replace('{{event.bphone}}' , buyerphone);
                                template = template.replace('{{event.bemail}}' , buyeremail);
                                template = template.replace('{{event.qty}}' , 1);
                                template = template.replace('{{event.price}}' , 1*(pid['bprice']+pid['shipping_price']));
                                template = template.replace('{{event.title}}' , pid['title']);
                                template = template.replace('{{event.url}}' , global.url+'/product/view/'+pid['id']);
                                //console.log(template);
                                twillio.sendsms(template,pid['phone']);

                            }

                            else{

                                console.log('No template name item_sold')
                            }


                        });


                    }

                }).fail(function(err){
                    console.log(err.stack);
                    throw err;
                }).done();
            }).fail(function(err){
                console.log(err.stack);
                throw err;
            }).done();
        }).fail(function(err){
            console.log(err.stack);
            throw err;
        }).done();


    if (err) {
        console.error(err);
    } else {
        // Do stuff with original params here
        if (req.body.status == 'Completed') {
        }
    }


    //////code end here////////////
    /*console.log("paypalnotification");
	console.log(req.body.ipn_notification_url);
	var products = require('../module/products');
	products.updatepayment(req,config.mysql,buynowid);
	console.log("paypalnotification");
    q.all([products.buynowprodetails(req,config.mysql,q)]).then(function(results){

        sendemail.mailsend(results[0][0][0].email,'Payment Successful for listing '+ results[0][0][0].title +' on yabee.','Hi '+results[0][0][0].first_name+',<br><br> Payment Successful for listing '+ results[0][0][0].title +' on yabee. <br><br>please check the details in <a href="http://'+req.headers.host+'/dashboard/mywon?cmd=won">Seller dashboard</a> page.<br><br> check you paypal account for payment information  and process your shipping.<br><img src="http://'+req.headers.host+'/images/logo.png" />');
    });
	sendemail.mailsend("jayanth@auctionsoftware.com","Reg  Yabee","Hi "+buynowid+" ,<br>"+buynowid+".");*/
    res.sendStatus(200);


});
 
});

module.exports = app;
