/*============================================================================*\
 || ########################################################################## ||
 || # Auction Software Marketplace[*]version[*] Build [*]build[*]
 || # ---------------------------------------------------------------------- # ||
 || # Customer License # [*]license[*]
 || # ---------------------------------------------------------------------- # ||
 || # Copyright ©2014–[*]year[*] Develop Scripts LLC. All Rights Reserved    # ||
 || # This file may not be redistributed in whole or significant part.       # ||
 || # ------------- AUCTION SOFTWARE IS NOT FREE SOFTWARE ------------------ # ||
 || # http://www.auctionsoftwaremarketplace.com|support@auctionsoftware.com  # ||
 || # ---------------------------------------------------------------------- # ||
 || ########################################################################## ||
 \*============================================================================*/

// #### load required Modules ##################################################

var express = require('express');
var common = require('../module/common');
var user = require('../module/user');
var app = express.Router();
var q = require('q');
var mysqli = require('../module/mysqli');
var dashboard = require('../module/dashboard');
var cryptos = require('../module/crypto.js');

var moment = require('moment');


var membership = require('../module/membership');
app.post('/package', function (req, res) {
    var dateFormat = require('dateformat');

    q.all([membership.selectPlan(req, config.mysql, q), membership.getUserRole(req, config.mysql, q)]).then(function (result) {
        correct_plan = false;
        var data = [];
        var plan = result[0][0];
        var urole = result[1][0];


        for (i in plan) {
            if (plan[i]['id'] == req.body.plan && plan[i]['membership_id'] == req.body.membership) {
                correct_plan = true;
                data = plan[i];
            }
        }
        if (!correct_plan) {
            res.writeHead(302, {'Location': '/membership/setup'});
            res.end();
            return false;
        }
        else {

            d = data.date_added = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            var now = new Date();
            //console.log('eeeeeeeeeeeeeeeeeeeeeeee')
            // console.log( plan[0]['length']);
            var date_formats = plan[0]['format'];

            if (date_formats == 'M') {
                var rdate = moment(now).add(plan[0]['length'], 'M')
                //var rdate = now.setMonth(now.getMonth() +  plan[0]['length']);

            }
            else if (date_formats == 'D') {
                var rdate = moment(now).add(plan[0]['length'], 'd')

            }
            else if (date_formats == 'Y') {
                var rdate = moment(now).add(plan[0]['length'], 'y')

            }
            else {
                var rdate = now;

            }
            var renival_date = dateFormat(rdate, "yyyy-mm-dd HH:MM:ss");
            data.renewal_period = renival_date;
            data.recurring = 0;
            data.subscribe = '';
            data.status = 'unpaid';
            data.paid_date = '0000-00-00 00:00:00';
            data.paid = 0;

            if (data.amount == 0) {
                data.status = 'active';
                data.paid_date = data.date_added;
                data.paid = 0;
            }

            if (urole.length > 0) {

                data.recurring = urole[0].recurring;
                data.subscribe = urole[0].tran_id;
                membership.updateUserRole(req, config.mysql, q, data, 1);
            }
            else {

                membership.updateUserRole(req, config.mysql, q, data, 0);
            }
            if (data.status == 'active') {
                q.all([membership.getUserMembership(req, config.mysql, q, req.session.userid), membership.getUserRolelogin(req, config.mysql, q, req.session.userid), user.getTotalProduct(res, config.mysql, q, req.session.userid), user.getTotalBid(res, config.mysql, q, req.session.userid),user.getTotalBuyNowProduct(res,config.mysql,q,req.session.userid)]).then(function (result2) {

                    req.session.permission = false;
                    var permissions = result2[0][0];
                    if (permissions.length > 0) {
                        req.session.permission = true;
                    }
                    for (i in permissions) {
                        req.session[permissions[i]['varname']] = permissions[i]['value'];
                    }

                    req.session.productcountyear = (result2[2][0][0]['ycnt'] > 0) ? result2[2][0][0]['ycnt'] : 0;
                    req.session.productcountmonth = (result2[2][0][0]['mcnt'] > 0) ? result2[2][0][0]['mcnt'] : 0;

                    req.session.bidcountyear = (result2[3][0][0]['ycnt'] > 0) ? result2[3][0][0]['ycnt'] : 0;
                    req.session.bidcountmonth = (result2[3][0][0]['mcnt'] > 0) ? result2[3][0][0]['mcnt'] : 0;

                    req.session.buynowcountyear = (result2[4][0][0]['ycnt'] > 0) ? result2[4][0][0]['ycnt'] : 0;
                    req.session.buynowcountmonth = (result2[4][0][0]['mcnt'] > 0) ? result2[4][0][0]['mcnt'] : 0;

                    req.session.used_attach_space = (result2[2][0][0]['used_image_space'] > 0) ? result2[1][0][0]['used_image_space'] : 0;

                    if (result2[1][0].length > 0) {
                        req.session.membershipstatus = result2[1][0][0]['status'];

                    }
                    else {
                        req.session.membershipstatus = '';
                    }
                    res.writeHead(302, {'Location': '/'});
                    res.end();
                    return false;
                }).fail(function (error) {
                    console.log("error is " + error.stack);
                    throw error.stack;
                }).done();
            }
            else {
                res.writeHead(302, {'Location': '/membership/setup'});
                res.end();
                return false;
            }
        }
    });
});

app.get('/pay', function (req, res) {
    q.all([user.userInfo(req, config.mysql, q, req.session.userid, ['balance', 'reserve_amount']), membership.selectPlan(req, config.mysql, q), membership.getUserRole(req, config.mysql, q)]).then(function (results) {
        var plan = result[1][0];
        var urole = result[2][0];
        for (i in plan) {
            if (plan[i]['id'] == urole[0]['plan_id']) {
                data = plan[i];
            }
        }
        if (results[1][0][0]['balance'] - results[1][0][0]['reserve_amount'] <= data['amount']) {
            req.session.page = config.url + '/membership/pay/';
            res.writeHead(302, {
                'Location': '/package'
            });
            res.end();
            return false;
        }
    });
});

app.post('/pay', function (req, res) {
    if (typeof(req.body.paymentMethodNonceInputField) === 'undefined' || req.body.paymentMethodNonceInputField == '') {

        req.body.paymentMethodNonceInputField = req.body.payment_method_nonce;

    }

    if (typeof(req.body.payment_method_nonce) === 'undefined' || req.body.payment_method_nonce == '') {

        req.body.payment_method_nonce = req.body.paymentMethodNonceInputField;

    }


    if (req.param('savecard') == 1 || req.param('savepaypal') == 1) {

        var braintrees = require('../module/braintrees');

        global.bgateway.mysql = $arr.config.mysql;

        braintrees.saveCreditCard(global.bgateway, req, res, payProcess);

    }

    else if (req.param('paymentmethod') == 'cc' || req.param('paymentmethod') == 'paypal') {

        payProcess(1, '');

    }

    else {

        creditcard = require('../module/creditcard');

        q.all([creditcard.PickPayments(req, $arr.config.mysql, q, req.param('paymentmethod'))]).then(function (resu) {


            if (resu[0][0][0].user_id == req.session.userid) {

                req.body.token = resu[0][0][0].token_id;

                payProcess(1, '');

            }

            else {

                res.writeHead(302, {

                    'Location': '/membership/setup/Invalid Card'

                });

                res.end();
                return false;

            }


        });

    }


    function payProcess(err, resp) {

        if (err == 0) {

            res.writeHead(302, {

                'Location': '/membership/setup/' + resp

            });

            res.end();

            return false;

        }
        q.all([membership.getUserPlan(req, $arr.config.mysql, q)]).then(function (member) {
            var price = member[0][0][0].amount;
            console.log( member[0][0] );
            if (req.param('savecard') == 1) {

                var pay = {

                    amount: price,

                    paymentMethodToken: resp.creditCard.token,

                    options: {

                        submitForSettlement: true

                    }
                };

                if(req.body.recur_card == 1 || req.body.repeat_paypal == 1){

                    var payment = {

                    paymentMethodToken: resp.creditCard.token,
                    planId: data.id,
                    
                       
                    };

                }
                console.log('D1111111111111111111111111');
                console.log(payment);

            }

            else if (req.param('savepaypal') == 1 || req.body.repeat_paypal == 1) {

                var pay = {

                    amount: price,

                    paymentMethodToken: resp.paypalAccount.token,

                    options: {

                        submitForSettlement: true

                    }
                };

                if(req.body.recur_card == 1 || req.body.repeat_paypal == 1){

                    var payment = {

                    paymentMethodToken: resp.paypalAccount.token,
                    planId: data.id,
                    
                       
                    };

                }
                console.log('C1111111111111111111111111');
                console.log(payment);

            }

            else if (typeof(req.body.token) !== 'undefined') {

                var pay = {

                    amount: price,

                    paymentMethodToken: req.body.token,

                    options: {

                        submitForSettlement: true

                    }
                };
                if(req.body.recur_card == 1 || req.body.repeat_paypal == 1){

                    var payment = {

                    paymentMethodToken: req.body.token,
                    planId: data.id
                    
                       
                    };

                }
                console.log('B1111111111111111111111111');
                console.log(payment);


            }

            else {

                var pay = {

                    amount: price,

                    paymentMethodNonce: req.param('paymentMethodNonceInputField'),

                    options: {


                        submitForSettlement: true

                    }
                };
                
                if(req.body.recur_card == 1 || req.body.repeat_paypal == 1){

                    var payment = {

                    paymentMethodNonce: req.param('paymentMethodNonceInputField'),
                    planId: data.id,
                    
                   
                    };

                }
                console.log('A1111111111111111111111111');
                console.log(payment);

            }
            if(req.body.recur_card == 1 || req.body.repeat_paypal == 1){
                 console.log("Entered"+member[0][0][0].recurring +member[0][0][0].tran_id );
                if(member[0][0][0].recurring == 1 && member[0][0][0].tran_id != ''){
                        console.log("Entered"+member[0][0][0].recurring +member[0][0][0].tran_id );
                        var ml = global.bgateway.subscription.update(member[0][0][0].tran_id, payment, function (err, result) {


                   

                        if (result.success) {
                            console.log("Updated");
                            if (result.subscription.status) {

                                var data = [];
                                data.id = member[0][0][0].id;
                                data.name = member[0][0][0].name;
                                data.length = member[0][0][0].length;
                                data.format = member[0][0][0].format;

                                var dateFormat = require('dateformat');

                                d = data.date_added = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

                                var today = new Date(data.date_added);

                                if (data.format == 'D') {
                                    //today.setDate(today.getDate()+data.length);
                                    var renewal_date = moment(today).add(data.length, 'd')
                                }

                                if (data.format == 'M') {
                                    //today.setMonth(today.getMonth()+1+data.length);
                                    var renewal_date = moment(today).add(data.length, 'M')
                                }

                                if (data.format == 'Y') {
                                    //today.setYear(today.getYear()+data.length);
                                    var renewal_date = moment(today).add(data.length, 'y')
                                }

                                data.status = 'active';
                                data.paid_date = data.date_added;
                                data.paid = 1;
                                data.recurring = 1;
                                data.subscribe = result.subscription.id;
                                data.renewal_period = dateFormat(new Date(renewal_date), "yyyy-mm-dd HH:MM:ss");


                                membership.updateUserRole(req, config.mysql, q, data, 1);
                                payments = require('../module/payment');
                                payments.transactionid = result.subscription.id;
                                payments.gateway = 'braintree';
                                payments.sessionsdata = [];
                                payments.sessionsdata.title = data.name + ' Membership';
                                payments.sessionsdata.email = req.session.email;
                                payments.sessionsdata.phone = req.session.phone;
                                payments.sessionsdata.url = '';
                                payments.sessionsdata.userid = req.session.userid;
                                payments.sessionsdata.first_name = req.session.first_name;
                                payments.sessionsdata.last_name = req.session.last_name;
                                payments.payid = data.id;
                                payments.type = 'Membership Fee';
                                payments.name = data.name + ' Membership';
                                payments.amount = price;
                                //console.log(payments);
                                //user.reduceBalance(req,config.mysql,q,payments.sessionsdata.userid,payments.amount);
                                payments.insertInvoice();

                                delete req.session.permission;
                                delete req.session.membershipstatus;

                                q.all([membership.getUserMembership(req, config.mysql, q, req.session.userid), membership.getUserRolelogin(req, config.mysql, q, req.session.userid), user.getTotalProduct(res, config.mysql, q, req.session.userid), user.getTotalBid(res, config.mysql, q, req.session.userid),user.getTotalBuyNowProduct(res,config.mysql,q,req.session.userid)]).then(function (result2) {

                                    //console.log(result2[0][0]);
                                    req.session.permission = false;
                                    var permissions = result2[0][0];
                                    if (permissions.length > 0) {
                                        req.session.permission = true;
                                    }
                                    for (i in permissions) {
                                        //permission[i] = [];
                                        req.session[permissions[i]['varname']] = permissions[i]['value'];

                                    }

                                    if (result2[1][0].length > 0) {
                                        req.session.membershipstatus = result2[1][0][0]['status']
                                    }
                                    else {
                                        req.session.membershipstatus = '';
                                    }
                                    req.session.productcountyear = (result2[2][0][0]['ycnt'] > 0) ? result2[2][0][0]['ycnt'] : 0;
                                    req.session.productcountmonth = (result2[2][0][0]['mcnt'] > 0) ? result2[2][0][0]['mcnt'] : 0;

                                    req.session.bidcountyear = (result2[3][0][0]['ycnt'] > 0) ? result2[3][0][0]['ycnt'] : 0;
                                    req.session.bidcountmonth = (result2[3][0][0]['mcnt'] > 0) ? result2[3][0][0]['mcnt'] : 0;

                                    req.session.buynowcountyear = (result2[4][0][0]['ycnt'] > 0) ? result2[4][0][0]['ycnt'] : 0;
                                    req.session.buynowcountmonth = (result2[4][0][0]['mcnt'] > 0) ? result2[4][0][0]['mcnt'] : 0;
                                    
                                    req.session.used_attach_space = (result2[2][0][0]['used_image_space'] > 0) ? result2[2][0][0]['used_image_space'] : 0;
                                    res.writeHead(302, {

                                        'Location': '/'

                                    });

                                    res.end();
                                    return false;


                                });


                            }

                            else {

                                $arr['error'] = result.subscription.processorResponseText;

                                res.writeHead(302, {

                                    'Location': '/membership/setup/' + $arr['error']

                                });

                                res.end();
                                return false;

                            }

                        }

                        else {

                            $arr['error'] = '';


                            $arr['error'] += result.message;


                            res.writeHead(302, {

                                'Location': '/membership/setup/' + $arr['error']

                            });

                            res.end();

                            return false;

                        }

                    });


                   

                }
                else{

                    var ml = global.bgateway.subscription.create(payment, function (err, result) {


                    console.log(result.success);

                    if (result.success) {

                        if (result.subscription.status) {

                            var data = [];
                            data.id = member[0][0][0].id;
                            data.name = member[0][0][0].name;
                            data.length = member[0][0][0].length;
                            data.format = member[0][0][0].format;

                            var dateFormat = require('dateformat');

                            d = data.date_added = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

                            var today = new Date(data.date_added);

                            if (data.format == 'D') {
                                //today.setDate(today.getDate()+data.length);
                                var renewal_date = moment(today).add(data.length, 'd')
                            }

                            if (data.format == 'M') {
                                //today.setMonth(today.getMonth()+1+data.length);
                                var renewal_date = moment(today).add(data.length, 'M')
                            }

                            if (data.format == 'Y') {
                                //today.setYear(today.getYear()+data.length);
                                var renewal_date = moment(today).add(data.length, 'y')
                            }

                            data.status = 'active';
                            data.paid_date = data.date_added;
                            data.paid = 1;
                            data.recurring = 1;
                            data.subscribe = result.subscription.id;
                            data.renewal_period = dateFormat(new Date(renewal_date), "yyyy-mm-dd HH:MM:ss");


                            membership.updateUserRole(req, config.mysql, q, data, 1);
                            payments = require('../module/payment');
                            payments.transactionid = result.subscription.id;
                            payments.gateway = 'braintree';
                            payments.sessionsdata = [];
                            payments.sessionsdata.title = data.name + ' Membership';
                            payments.sessionsdata.email = req.session.email;
                            payments.sessionsdata.phone = req.session.phone;
                            payments.sessionsdata.url = '';
                            payments.sessionsdata.userid = req.session.userid;
                            payments.sessionsdata.first_name = req.session.first_name;
                            payments.sessionsdata.last_name = req.session.last_name;
                            payments.payid = data.id;
                            payments.type = 'Membership Fee';
                            payments.name = data.name + ' Membership';
                            payments.amount = price;
                            //console.log(payments);
                            //user.reduceBalance(req,config.mysql,q,payments.sessionsdata.userid,payments.amount);
                            payments.insertInvoice();

                            delete req.session.permission;
                            delete req.session.membershipstatus;

                            q.all([membership.getUserMembership(req, config.mysql, q, req.session.userid), membership.getUserRolelogin(req, config.mysql, q, req.session.userid), user.getTotalProduct(res, config.mysql, q, req.session.userid), user.getTotalBid(res, config.mysql, q, req.session.userid),user.getTotalBuyNowProduct(res,config.mysql,q,req.session.userid)]).then(function (result2) {

                                //console.log(result2[0][0]);
                                req.session.permission = false;
                                var permissions = result2[0][0];
                                if (permissions.length > 0) {
                                    req.session.permission = true;
                                }
                                for (i in permissions) {
                                    //permission[i] = [];
                                    req.session[permissions[i]['varname']] = permissions[i]['value'];

                                }

                                if (result2[1][0].length > 0) {
                                    req.session.membershipstatus = result2[1][0][0]['status']
                                }
                                else {
                                    req.session.membershipstatus = '';
                                }
                                req.session.productcountyear = (result2[2][0][0]['ycnt'] > 0) ? result2[2][0][0]['ycnt'] : 0;
                                req.session.productcountmonth = (result2[2][0][0]['mcnt'] > 0) ? result2[2][0][0]['mcnt'] : 0;

                                req.session.bidcountyear = (result2[3][0][0]['ycnt'] > 0) ? result2[3][0][0]['ycnt'] : 0;
                                req.session.bidcountmonth = (result2[3][0][0]['mcnt'] > 0) ? result2[3][0][0]['mcnt'] : 0;

                                req.session.buynowcountyear = (result2[4][0][0]['ycnt'] > 0) ? result2[4][0][0]['ycnt'] : 0;
                                req.session.buynowcountmonth = (result2[4][0][0]['mcnt'] > 0) ? result2[4][0][0]['mcnt'] : 0;
                                
                                req.session.used_attach_space = (result2[2][0][0]['used_image_space'] > 0) ? result2[2][0][0]['used_image_space'] : 0;
                                res.writeHead(302, {

                                    'Location': '/'

                                });

                                res.end();
                                return false;


                            });


                        }

                        else {

                            $arr['error'] = result.subscription.processorResponseText;

                            res.writeHead(302, {

                                'Location': '/membership/setup/' + $arr['error']

                            });

                            res.end();
                            return false;

                        }

                    }

                    else {

                        $arr['error'] = '';


                        $arr['error'] += result.message;


                        res.writeHead(302, {

                            'Location': '/membership/setup/' + $arr['error']

                        });

                        res.end();

                        return false;

                    }

                });
                }
            }
           

            else{
            var ml = global.bgateway.transaction.sale(pay, function (err, result) {

                //console.log(result);

                if (result.success) {

                    if (result.transaction.status) {

                        var data = [];
                        data.id = member[0][0][0].id;
                        data.name = member[0][0][0].name;
                        data.length = member[0][0][0].length;
                        data.format = member[0][0][0].format;

                        var dateFormat = require('dateformat');

                        d = data.date_added = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

                        var today = new Date(data.date_added);

                        if (data.format == 'D') {
                            //today.setDate(today.getDate()+data.length);
                            var renewal_date = moment(today).add(data.length, 'd')
                        }

                        if (data.format == 'M') {
                            //today.setMonth(today.getMonth()+1+data.length);
                            var renewal_date = moment(today).add(data.length, 'M')
                        }

                        if (data.format == 'Y') {
                            //today.setYear(today.getYear()+data.length);
                            var renewal_date = moment(today).add(data.length, 'y')
                        }

                        data.status = 'active';
                        data.paid_date = data.date_added;
                        data.paid = 1;
                        data.recurring = 0;
                        data.subscribe = result.transaction.id;
                        data.renewal_period = dateFormat(new Date(renewal_date), "yyyy-mm-dd HH:MM:ss");


                        membership.updateUserRole(req, config.mysql, q, data, 1);
                        payments = require('../module/payment');
                        payments.transactionid = result.transaction.id;
                        payments.gateway = 'braintree';
                        payments.sessionsdata = [];
                        payments.sessionsdata.title = data.name + ' Membership';
                        payments.sessionsdata.email = req.session.email;
                        payments.sessionsdata.phone = req.session.phone;
                        payments.sessionsdata.url = '';
                        payments.sessionsdata.userid = req.session.userid;
                        payments.sessionsdata.first_name = req.session.first_name;
                        payments.sessionsdata.last_name = req.session.last_name;
                        payments.payid = data.id;
                        payments.type = 'Membership Fee';
                        payments.name = data.name + ' Membership';
                        payments.amount = price;
                        console.log(payments);
                        //user.reduceBalance(req,config.mysql,q,payments.sessionsdata.userid,payments.amount);
                        payments.insertInvoice();

                        delete req.session.permission;
                        delete req.session.membershipstatus;

                        q.all([membership.getUserMembership(req, config.mysql, q, req.session.userid), membership.getUserRolelogin(req, config.mysql, q, req.session.userid), user.getTotalProduct(res, config.mysql, q, req.session.userid), user.getTotalBid(res, config.mysql, q, req.session.userid),user.getTotalBuyNowProduct(res,config.mysql,q,req.session.userid)]).then(function (result2) {

                            //console.log(result2[0][0]);
                            req.session.permission = false;
                            var permissions = result2[0][0];
                            if (permissions.length > 0) {
                                req.session.permission = true;
                            }
                            for (i in permissions) {
                                //permission[i] = [];
                                req.session[permissions[i]['varname']] = permissions[i]['value'];

                            }

                            if (result2[1][0].length > 0) {
                                req.session.membershipstatus = result2[1][0][0]['status']
                            }
                            else {
                                req.session.membershipstatus = '';
                            }
                            req.session.productcountyear = (result2[2][0][0]['ycnt'] > 0) ? result2[2][0][0]['ycnt'] : 0;
                            req.session.productcountmonth = (result2[2][0][0]['mcnt'] > 0) ? result2[2][0][0]['mcnt'] : 0;

                            req.session.bidcountyear = (result2[3][0][0]['ycnt'] > 0) ? result2[3][0][0]['ycnt'] : 0;
                            req.session.bidcountmonth = (result2[3][0][0]['mcnt'] > 0) ? result2[3][0][0]['mcnt'] : 0;

                            req.session.buynowcountyear = (result2[4][0][0]['ycnt'] > 0) ? result2[4][0][0]['ycnt'] : 0;
                            req.session.buynowcountmonth = (result2[4][0][0]['mcnt'] > 0) ? result2[4][0][0]['mcnt'] : 0;
                            
                            req.session.used_attach_space = (result2[2][0][0]['used_image_space'] > 0) ? result2[2][0][0]['used_image_space'] : 0;
                            res.writeHead(302, {

                                'Location': '/'

                            });

                            res.end();
                            return false;


                        });


                    }

                    else {

                        $arr['error'] = result.transaction.processorResponseText;

                        res.writeHead(302, {

                            'Location': '/membership/setup/' + $arr['error']

                        });

                        res.end();
                        return false;

                    }

                }

                else {

                    $arr['error'] = '';


                    $arr['error'] += result.message;


                    res.writeHead(302, {

                        'Location': '/membership/setup/' + $arr['error']

                    });

                    res.end();

                    return false;

                }

            });
            }

        });


    }


});

/*app.get('/setup', function(req, res) {
 q.all([membership.getUserRole(req,config.mysql,q),membership.selectRoles(req,config.mysql,q),membership.selectPlan(req,config.mysql,q)]).then(function(result) {
 if(result[0][0].length > 0 && result[0][0][0]['status'] == 'unpaid')
 {
 plan =  result[2][0];
 data = [];
 for(i in plan) {
 if(plan[i]['id'] == result[0][0][0]['plan_id']){
 data = plan[i];
 }
 }
 $arr['data'] = data;
 common.tplFile('membership-payment.tpl');
 common.headerSet(1);
 common.loadTemplateHeader(req,res,$arr);
 }
 else if(result[0][0].length == 0 || result[0][0][0]['status'] != 'active')
 {
 $arr['membership'] = result[1][0];
 $arr['plans'] = result[2][0];
 common.tplFile('membership-select.tpl');
 common.headerSet(1);
 common.loadTemplateHeader(req,res,$arr);
 }
 });

 }); */

app.get(['/setup', '/setup/:error'], function (req, res) {

    $arr.membership_permission = req.session.permission;
    $arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
    var adwords = require('../module/adwords');
    q.all([membership.getUserRole(req, config.mysql, q), membership.selectRoles(req, config.mysql, q), membership.selectPlan(req, config.mysql, q), membership.selectPackageDetail(req, config.mysql, q),adwords.show_ads(req,config.mysql,q,'Membership')]).then(function (result) {

        $arr.page_name = 'Membership';
        $arr.package_detail = result[3][0];
        $arr['adwords'] = result[4][0]
        if (result[0][0].length > 0 && result[0][0][0]['status'] == 'unpaid' && result[0][0][0]['plan_id'] > 0 && typeof(req.param('update')) === 'undefined') {
            plan = result[2][0];

            data = [];
            for (i in plan) {
                if (plan[i]['id'] == result[0][0][0]['plan_id']) {

                    data = plan[i];
                }
            }
            var braintrees = require('../module/braintrees');

            braintrees.generateToken(global.bgateway, templateCallback, req);

            function templateCallback(err, response) {

                creditcard = require('../module/creditcard');

                q.all([creditcard.AllMyPayments(req, $arr.config.mysql, q)]).then(function (results) {


                    $arr.creditCards = results[0][0];

                    //console.log('response callback');

                    $arr.clientToken = response.clientToken;
                    $arr['data'] = data;
                    common.tplFile('membership-payment.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);

                });
            }
        }
        else if (result[0][0].length == 0 || result[0][0][0]['status'] != 'active') {

            $arr['membership'] = result[1][0];
            $arr['plans'] = result[2][0];

            //console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
            common.tplFile('membership-select.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req, res, $arr);
        }
        else {
            $arr['membership'] = result[1][0];
            $arr['plans'] = result[2][0];
            common.tplFile('membership-select.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req, res, $arr);
        }


    }).fail(function(err){
        console.log(err.stack);
        throw err;
    }).done();

});

app.get(['/membership_details'], function (req, res) {

    q.all([membership.getuserdetails(req, config.mysql, q, req.session.userid), user.getTotalProduct(res, config.mysql, q, req.session.userid), user.getTotalBid(res, config.mysql, q, req.session.userid), user.getTotalBuyNowProduct(res,config.mysql,q,req.session.userid)]).then(function (result2) {


        $arr.plandetails = result2[0][0][0];

        $arr.productcountyear = (result2[1][0][0]['ycnt'] > 0) ? result2[1][0][0]['ycnt'] : 0;
        $arr.productcountmonth = (result2[1][0][0]['mcnt'] > 0) ? result2[1][0][0]['mcnt'] : 0;

        $arr.attach_limit = (result2[1][0][0]['used_image_space'] > 0) ? result2[1][0][0]['used_image_space'] : 0;

        $arr.bidcountyear = (result2[2][0][0]['ycnt'] > 0) ? result2[2][0][0]['ycnt'] : 0;
        $arr.bidcountmonth = (result2[2][0][0]['mcnt'] > 0) ? result2[2][0][0]['mcnt'] : 0;

        $arr.buynowcountyear = (result2[3][0][0]['ycnt'] > 0) ? result2[3][0][0]['ycnt'] : 0;
        $arr.buynowcountmonth = (result2[3][0][0]['mcnt'] > 0) ? result2[3][0][0]['mcnt'] : 0;

        $arr.used_attach_space = result2[1][0][0].used_image_space;

        console.log("Att "+$arr.used_attach_space);
        $arr.loged = req.session;

        if (req.session.monthly_project_limit == -1) {
            $arr.project_limit = 'Unlimited';
            $arr.bid_limit = 'Unlimited';
            $arr.monthly_project_limit = 'Unlimited';
            $arr.monthly_bid_limit = 'Unlimited';
            $arr.attachment_limit = 'Unlimited';
            $arr.allowed_attach_limit = 'Unlimited';
            $arr.monthly_buynow_limit = 'Unlimited';
            $arr.buynow_limit = 'Unlimited';

            $arr.available_attach_space = 'Unlimited';

        } else {

            $arr.project_limit = $arr.loged.project_limit;
            $arr.bid_limit = $arr.loged.bid_limit;
            $arr.monthly_project_limit = $arr.loged.monthly_project_limit;
            $arr.monthly_bid_limit = $arr.loged.monthly_bid_limit;

            $arr.monthly_buynow_limit = $arr.loged.monthly_buynow_limit;
            $arr.buynow_limit = $arr.loged.buynow_limit;

            $arr.allowed_attach_limit = $arr.loged.allowed_attach_limit;

            /*$arr.allowed_attach_limit = ($arr.loged.allowed_attach_limit > 0) ? 0 : $arr.loged.allowed_attach_limit ;*/

        }

        common.tplFile('membership_details.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);

    }).fail(function (error) {
        console.log(error.stack);
        throw error;
    }).done();


});

module.exports = app;