/**
 * Created by Raj on 9/28/2015.
 */

/*============================================================================*\
 || ########################################################################## ||
 || # Auction Software Marketplace[*]version[*] Build [*]build[*]
 || # ---------------------------------------------------------------------- # ||
 || # Customer License # [*]license[*]
 || # ---------------------------------------------------------------------- # ||
 || # Copyright �2014�[*]year[*] Develop Scripts LLC. All Rights Reserved    # ||
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
var adwords = require('../module/adwords');

var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: '00 00 00 * * *',
    onTick: function() {
        q.all(adwords.resetAdwordsDaysClick($arr.config.mysql,q)).then(function(){

        });
    },
    start: false,
    timeZone: 'America/Chicago'
});

job.start();
app.get(['/show_adwords','/show_adwords/:error'],function(req,res){
    common.checkLogin(req, res, 0);
    req.body.page =(typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    $arr.error = (typeof(req.param('error')) != 'undefined') ? req.param('error') : 0;
    q.all([adwords.getAdvertiseDetails(req,$arr.config.mysql,q,0),adwords.getAdvertiseDetails(req,$arr.config.mysql,q,1),adwords.getDeposit(req,$arr.config.mysql,q)]).then(function(results){
        var pagination = require('pagination');
        $arr['pagination'] = results[1][0].length;
        $arr['adwords_details'] = results[0][0];
        $arr.deposit_amount = results[2][0][0].deposit_amount;

        var paginator = new pagination.SearchPaginator({prelink:'/adwords/show_adwords', current:  req.body.page, rowsPerPage: 5, totalResult: $arr['pagination'] });
        $arr['pagination_html'] = paginator.render();
        common.tplFile('adwords_manager.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }).fail(function(err){
        console.log(err.stack);
        throw err;
    }).done();

});

app.get(['/show_all_adwords/:type','/show_all_adwords'],function(req,res){
    common.checkLogin(req, res, 0);
    req.body.page =(typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    req.body.type =(typeof(req.param('type')) !== 'undefined') ? req.param('type') : 0;
    console.log("typeeeee is "+req.body.type);
    $arr.error = (typeof(req.param('error')) != 'undefined') ? req.param('error') : 0;
    q.all([adwords.getAllAdvertiseDetails(req,$arr.config.mysql,q,0),adwords.getAllAdvertiseDetails(req,$arr.config.mysql,q,1)]).then(function(results){
        var pagination = require('pagination');
        $arr['pagination'] = results[1][0].length;
        $arr['adwords_details'] = results[0][0];
        //$arr.deposit_amount = results[2][0][0].deposit_amount;

        var paginator = new pagination.SearchPaginator({prelink:'/adwords/show_all_adwords/'+req.body.type, current:  req.body.page, rowsPerPage: 12, totalResult: $arr['pagination'] });
        $arr['pagination_html'] = paginator.render();
        common.tplFile('show_all_adwords.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }).fail(function(err){
        console.log(err.stack);
        throw err;
    }).done();

});


app.get('/add_deposit', function (req, res) {
    common.checkLogin(req, res, 0);
    var braintree = require("braintree");
    var braintrees = require('../module/braintrees');
    var gateway = global.bgateway;
    $arr.pkey = global.stripe.publishkey;
    $arr.vp_id = global.voguepay.merchantid;

    braintrees.generateToken(global.bgateway, templateCallback, req);

    function templateCallback(err, response) {

        creditcard = require('../module/creditcard');

        q.all([creditcard.AllMyPayments(req, $arr.config.mysql, q)]).then(function (results) {
                $arr.creditCards = results[0][0];
            gateway.clientToken.generate({}, function (err, response) {
                    //console.log('response callback');

                    $arr.clientToken = response.clientToken;
                    console.log($arr.clientToken);
                    common.tplFile('add_deposit.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
            });

        }).fail(function (err) {
            console.log(err.stack);
            throw err;
        }).done();
    }

});

app.get('/update_user_click/:id/:userid/:budget_per_click', function (req, res) {
    common.checkLogin(req, res, 0);
    var cmn = require('../module/common');
    req.body.id =(typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
    req.body.userid =(typeof(req.param('userid')) !== 'userid') ? req.param('userid') : 0;
    req.body.budget_per_click =(typeof(req.param('userid')) !== 'budget_per_click') ? req.param('budget_per_click') : 0;
    q.all([adwords.update_deposit_onclick(req,$arr.config.mysql,q)]).then(function(result){

        var data = { success : true,error : '', redirect : true };
        cmn.renderJson(res,data);
    }).fail(function(err){
        console.log(err.stack);
        throw err;
    }).done();


});
app.get(['/edit_adwords/:type/:id'],function(req,res){
    common.checkLogin(req, res, 0);
    req.body.type =(typeof(req.param('type')) !== 'undefined') ? req.param('type') : 0;
    req.body.id =(typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
    q.all([adwords.adwords_op(req,$arr.config.mysql,q)]).then(function(result){
        //console.log(result);
        res.writeHead(302, {
            'Location': '/adwords/show_adwords'
        });
        res.end();
        return false;

    }).fail(function(err){
        console.log(err.stack);
        throw err;
    }).done();


});

app.get(['/add_adwords','/create_adwords/:error'],function(req,res){
    common.checkLogin(req, res, 0);
    $arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');

    common.tplFile('add_adwards.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req, res, $arr);

});

app.get(['/edit/:id'],function(req,res){
    common.checkLogin(req, res, 0);
    req.body.id =(typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
    var dateFormat = require('dateformat');
        q.all(adwords.getAdwordsById(req,config.mysql,q)).then(function (results) {

            $arr.adwords_details = results[0][0];
            console.log($arr.adwords_details);
           if($arr.adwords_details.end_date != '' && $arr.adwords_details.end_date != '0000-00-00') {
               $arr.adwords_details.end_date = dateFormat($arr.adwords_details.end_date, 'mm/dd/yyyy')
           }else{
               $arr.adwords_details.end_date = '';
           }

            common.tplFile('add_adwards.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req, res, $arr);

        }).fail(function(err){
            console.log(err.stack);
            throw err;
        }).done();


});
app.post('/save', function (req, res) {
    common.checkLogin(req, res, 0);
    console.log("Id is "+req.body.id);
    if(parseInt(req.body.id) > 0){
        q.all([adwords.updateAdwords(req, config.mysql, q)]).then(function (result) {
            res.writeHead(302, {
                'Location': '/adwords/show_adwords/Adwords details updated successfully'
            });

            res.end();
            return false;
        }).fail(function (err) {
            console.log(err.stack);
            throw err;
        }).done();
    }else {
        q.all([adwords.saveAdwords(req, config.mysql, q)]).then(function (result) {
            res.writeHead(302, {
                'Location': '/adwords/show_adwords/Adwords details added successfully'
            });

            res.end();
            return false;
        }).fail(function (err) {
            console.log(err.stack);
            throw err;
        }).done();
    }

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

            var price =req.body.amount;

            if (req.param('savecard') == 1) {

                var pay = {

                    amount: price,

                    paymentMethodToken: resp.creditCard.token,

                    options: {

                        submitForSettlement: true

                    }
                };

            }

            else if (req.param('savepaypal') == 1) {

                var pay = {

                    amount: price,

                    paymentMethodToken: resp.paypalAccount.token,

                    options: {

                        submitForSettlement: true

                    }
                };

            }

            else if (typeof(req.body.token) !== 'undefined') {

                var pay = {

                    amount: price,

                    paymentMethodToken: req.body.token,

                    options: {

                        submitForSettlement: true

                    }
                };

            }

            else {

                var pay = {

                    amount: price,

                    paymentMethodNonce: req.param('paymentMethodNonceInputField'),

                    options: {


                        submitForSettlement: true

                    }
                };

            }

        console.log("Pay is "+JSON.stringify(pay));

        var ml = global.bgateway.transaction.sale(pay, function (err, result) {

                if (result.success) {

                    if (result.transaction.status) {
                        payments = require('../module/payment');
                        var dateFormat = require('dateformat');
                        var data = [];
                        data.status = 'active';
                        data.paid_date = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
                        data.paid = 1;


                        payments.transactionid = result.transaction.id;
                        payments.gateway = 'braintree';
                        payments.sessionsdata = [];
                        payments.sessionsdata.title = data.name + ' Deposit';
                        payments.sessionsdata.email = req.session.email;
                        payments.sessionsdata.phone = req.session.phone;
                        payments.sessionsdata.url = '';
                        payments.sessionsdata.userid = req.session.userid;
                        payments.sessionsdata.first_name = req.session.first_name;
                        payments.sessionsdata.last_name = req.session.last_name;
                        payments.payid = 1;
                        payments.type = 'Deposit Fee';
                        payments.name = ' Deposit';
                        payments.amount = price;
                        //console.log(payments);
                        //user.reduceBalance(req,config.mysql,q,payments.sessionsdata.userid,payments.amount);
                        payments.insertInvoice();

                        req.body.transactionid = result.transaction.id;
                        q.all([adwords.update_deposit(req, config.mysql, q)]).then(function(result){
                            res.writeHead(302, {

                                'Location': '/adwords/add_adwords'

                            });

                            res.end();
                            return false;
                        }).fail(function(err){
                            console.log(err.stack);
                            throw err;
                        }).done();

                    }

                    else {

                        $arr['error'] = result.transaction.processorResponseText;
                        console.log( $arr['error']);
                        res.writeHead(302, {

                            'Location': '/adwords/add_adwords/' + $arr['error']

                        });

                        res.end();
                        return false;

                    }

                }

                else {

                    $arr['error'] = '';


                    $arr['error'] += result.message;
                    console.log( $arr['error']);

                    res.writeHead(302, {
                        'Location': '/adwords/add_adwords/' + $arr['error']
                    });

                    res.end();

                    return false;

                }

            });



    }


});
module.exports = app;
