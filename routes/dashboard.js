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
var app = express.Router();
var q = require('q');
var mysqli = require('../module/mysqli');
var dashboard = require('../module/dashboard');
var cryptos = require('../module/crypto.js');
var adwords = require('../module/adwords');
//required js


app.use(function (req, res, next) {
    common.checkLogin(req, res, 0);
    products = require('../module/products');
    next();
});

app.post('/cc', function (req, res, callback) {

    var braintrees = require('../module/braintrees');
    global.bgateway.mysql = $arr.config.mysql;
    braintrees.saveCreditCard(global.bgateway, req, res, refreshCallback);
    function refreshCallback(err, resp) {
        if (typeof(resp.creditCard) === 'undefined') {
            page = 'paypal';
            msg = 'paypal account details updated successfully';
        } else {
            page = 'cc';
            msg = 'Card details has been updated successfully';
        }

        if (err == 0) {
            console.log(err);
            res.writeHead(302, {'Location': '/dashboard/payment/cc/Invalid card details'});
            res.end();
            return false;
            return false;
        }
        else {
            res.writeHead(302, {'Location': '/dashboard/payment/' + page + '/' + msg});
            res.end();
            return false;
            return false;
        }
    }
});

app.get(['/payment/saved', '/payment/saved/:error'], function (req, res) {
    creditcard = require('../module/creditcard');
    $arr.error = (typeof(req.param('error')) == 'undefined') ? '' : req.param('error');
    q.all([creditcard.AllMyPayments(req, $arr.config.mysql, q)]).then(function (results) {
        $arr.creditCards = results[0][0];
        common.tplFile('savedpayments.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get(['/feedback'], function (req, res) {
    var bids = require('../module/bid');
    var data = bids.SearchPageNo(req, config.mysql, q);

    req.body.page = data.dspage;
    req.body.perlimit = 5;
    q.all([dashboard.listfeedback(req, $arr.config.mysql, q, 1), dashboard.listfeedback(req, $arr.config.mysql, q, 0), dashboard.listfeedbackrating(req, $arr.config.mysql, q)]).then(function (results) {
        $arr.feedbacks = results[0][0];
        $arr.ratings = results[2][0];
        $arr['pagination'] = results[1][0].length;

        var pagination = require('pagination');

        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/feedback',
            current: req.body.page,
            rowsPerPage: req.body.perlimit,
            totalResult: $arr['pagination']
        });
        $arr['pagination_html'] = paginator.render();

        common.tplFile('feedback_1.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);

    });
});
app.get(['/deletesearch/:id'], function (req, res) {
    req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
    q.all([products.deleteSearch(req, config.mysql, q, 1)]).then(function (results) {
        res.writeHead(302, {
            'Location': '/dashboard/searchitems'
        });
        res.end();
        return false;
    });

});
app.get(['/searchitems/', '/searchitems/:page'], function (req, res) {
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    var products = require('../module/products');
    q.all([products.savedsearch(req, config.mysql, q, 1), products.savedsearch(req, config.mysql, q, 0)]).then(function (results) {

        $arr['pagination'] = results[0][0].length;
        $arr['searchlist'] = results[1][0];
        var pagination = require('pagination');
        fquery = '';
        if (typeof(req.param('cmd')) !== 'undefined') {
            fquery = '?cmd=' + req.param('cmd');
        }
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/searchitems/' + fquery,
            current: req.body.page,
            rowsPerPage: 10,
            totalResult: $arr['pagination']
        });

        $arr['pagination_html'] = paginator.render();

        common.tplFile('searchitems.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});


app.get(['/notification_manager'], function (req, res) {

    q.all([dashboard.buyer_title(req,$arr.config.mysql,q),dashboard.seller_title(req,$arr.config.mysql,q),dashboard.get_settings(req,$arr.config.mysql,q),dashboard.phoneverified(req,$arr.config.mysql,q)]).then(function(notify)
    {
        var email_array = [];
        var sms_array = [];
        $arr['buyer_titles'] = notify[0][0];
        $arr['seller_titles'] = notify[1][0];
        $arr['user_phones'] = (typeof(req.session.phone) == 'undefined' || req.session.phone == 'null') ? '' : req.session.phone;

        if(notify[2][0].length > 0 ){
            
            $arr['get_details'] = notify[2][0];
            
            email_array = notify[2][0][0]['email'].split(',');
            sms_array = notify[2][0][0]['sms'].split(',');

            $arr['email_items'] =  email_array.map(Number);
            $arr['sms_items'] =  sms_array.map(Number);

            $arr['notify_id'] = notify[2][0][0]['id'];
            

        }
        else{
            $arr['notify_id'] = 0;
        }
       
        $arr['user_phones'] = (typeof(notify[3][0][0]['phone']) == 'undefined' || notify[3][0][0]['phone'] == 'null' || notify[3][0][0]['phone'] == '') ? '' : notify[3][0][0]['phone'];
        $arr['verified'] = notify[3][0][0]['verifyphone'];
        
        common.tplFile('notification_manager.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);

    });


});


app.get(['/referrals'], function (req, res) {
common.checkLogin(req, res, 0);
    var pagination = require('pagination');
    
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;   
    q.all([dashboard.allreferrals(req, config.mysql, q,0),dashboard.allreferrals(req, config.mysql, q,1),dashboard.totalpoints(req,config.mysql,q)]).then(function (results) {


        $arr['refers'] = results[0][0];
        $totalrefers = results[1][0].length;
        if(results[2][0][0].points){ $arr['bonus'] = results[2][0][0].points; }
        else{ $arr['bonus'] = 0;}
        $arr.title = global.common.title;

        var paginator = new pagination.SearchPaginator({prelink:'/dashboard/referrals', current:  req.body.page, rowsPerPage: 10, totalResult: $totalrefers });
        $arr['pagination_html'] = paginator.render();

        common.tplFile('referrals.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });


});

app.get(['/payment/cc', '/payment/cc/:error'], function (req, res) {
    var braintrees = require('../module/braintrees');
    braintrees.generateToken(global.bgateway, templateCallback, req);
    function templateCallback(err, response) {
        $arr.clientToken = response.clientToken;
        $arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
        common.tplFile('creditcard.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }
});

app.get('/payment/delete/:id/:type', function (req, res) {
    $arr.type = (typeof(req.param('type')) == 'undefined') ? '' : req.param('type');
    if ($arr.type != 'Paypal') {

        var braintrees = require('../module/braintrees');
        global.bgateway.paymentMethod.delete('dh37r6');
    }
    var creditcard = require('../module/creditcard');

    creditcard.delete(req, config.mysql, q);

    res.writeHead(302, {'Location': '/dashboard/payment/saved/Payment detail has been deleted successfully'});
    res.end();
    return false;
    return false;

});

app.get(['/payment/paypal', '/payment/paypal/:error'], function (req, res) {
    var braintrees = require('../module/braintrees');
    braintrees.generateToken(global.bgateway, templateCallback, req);
    function templateCallback(err, response) {
        $arr.clientToken = response.clientToken;
        $arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
        common.tplFile('paypal.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }
});


app.post('/feature/', function (req, res) {

    projects = require('../module/products');
    var price = req.session.featured_home_listing;
    var brain_cust_id = global.bcustomer_prefix + req.session.userid;

    q.all([projects.productDetail(req, config.mysql, q)]).then(function (result) {
        pid = result[0][0][0];

        var ml = global.bgateway.transaction.sale({
            amount: price,
            paymentMethodNonce: req.param('paymentMethodNonceInputField'),
            options: {
                submitForSettlement: true
            }
        }, function (err, result) {
            if (result.success) {
                if (result.transaction.status) {

                    projects.updateFeatureData(req, config.mysql, q, req.body.id);
                    if (req.session.featured_add){
                        $arr.type = 'Feature Listing Fee';
                    }
                    if(req.session.home_listing_add){
                        if (req.session.featured_add){
                            $arr.type = 'Feature & Home Page Listing Fee';
                        }else{
                            $arr.type = 'Home Page Listing Fee';
                        }
                    }
                    payments = require('../module/payment');
                    payments.transactionid = result.transaction.id;
                    payments.gateway = 'account';
                    payments.sessionsdata = [];
                    payments.sessionsdata.title = pid.title;
                    payments.sessionsdata.email = req.session.email;
                    payments.sessionsdata.url = config.url + '/product/view/' + pid.id;
                    payments.sessionsdata.userid = req.session.userid;
                    payments.sessionsdata.first_name = req.session.first_name;
                    payments.sessionsdata.last_name = req.session.last_name;
                    payments.payid = pid.id;
                    payments.type = $arr.type;
                    payments.name = pid.title;
                    payments.amount = price;
                    payments.insertInvoice();
                    if (pid.market_status != 'draft') {
                        res.writeHead(302, {'Location': '/dashboard/my'});
                        res.end();
                        return false;
                        return false;
                    }
                    else {
                        res.writeHead(302, {'Location': '/dashboard/my?cmd=draft'});
                        res.end();
                        return false;
                        return false;
                    }
                }
                else {
                    $arr['error'] = result.transaction.processorResponseText;
                    res.writeHead(302, {
                        'Location': '/dashboard/feature/' + req.param('id') + '/' + $arr['error']
                    });
                    res.end();
                    return false;
                }
            }
            else {
                $arr['error'] = '';

                $arr['error'] += result.message;

                res.writeHead(302, {
                    'Location': '/dashboard/feature/' + req.param('id') + '/' + $arr['error']
                });
                res.end();
                return false;
            }
        });

    });

});

app.get(['/feature/:id', '/feature/:id/:error'], function (req, res) {
    projects = require('../module/products');
    if (req.session.featured_add){
        $arr.title = 'Feature Listing Fee';
    }
    if(req.session.home_listing_add){
        if (req.session.featured_add){
            $arr.title = 'Feature & Home Page Listing Fee';
        }else{
            $arr.title = 'Home Page Listing Fee';
        }
    }
    var brain_cust_id = global.bcustomer_prefix + req.session.userid;
    var s = global.bgateway.customer.find(brain_cust_id, function (err, customer) {
    });
    $arr.error = (typeof(req.body.error) === 'undefined') ? '' : req.body.error;
    q.all([projects.productDetail(req, config.mysql, q)]).then(function (result) {

        var braintrees = require('../module/braintrees');
        braintrees.generateToken(global.bgateway, generateToken, req);
        function generateToken(err, response) {


            if(response.success) {
                $arr.amount = 0;
                $arr.projects = result[0][0][0];
                $arr.id = req.param('id');
                $arr.amount = req.session.featured_home_listing;
                $arr.clientToken = response.clientToken;
                $arr.externalcss = ['buyer2'];
                common.tplFile('feature.tpl');
                common.headerSet(1);
                common.loadTemplateHeader(req, res, $arr);
            }else{
                $arr['error'] += err;
                res.writeHead(302, {
                    'Location': '/dashboard/feature/' + req.param('id') + '/' + $arr['error']
                });
                res.end();
                return false;
            }
        }
    });
});


app.post('/product/save', function (req, res) {

    var attach = require('../module/attach');
    var admin = require('../module/admin');
    projects = require('../module/products');
    delete  req.session.featured_home_listing;
    delete req.session.featured_add;
    delete req.session.home_listing_add;
    req.body.id = (typeof(req.body.id) === 'undefined') ? 0 : req.body.id;

    req.body.cid = (typeof(req.body.cid) == 'undefined') ? req.body.mcid : req.body.cid;

    if (req.body.id > 0) {
       // admin.deleteAttachment(config.mysql, q, req);

        var total_size = 0;
        q.all([projects.productDetail(req, config.mysql, q)]).then(function (result) {

            if(typeof(req.session.aid) !== 'undefined') {

                if (typeof(req.session.aid[req.body.random_id]) !== 'undefined') {

                    for (i in req.session.aid[req.body.random_id]) {

                        if (req.session.aid[req.body.random_id][i] != null) {

                            req.body.product_image = req.session.aid[req.body.random_id][i].originalName;
                            req.body.avatar = req.session.aid[req.body.random_id][i].name;
                            admin.addAttachment(req.session.aid[req.body.random_id][i], config.mysql, q, req.body.id);

                            sizeInKb = common.parseFloat(req.session.aid[req.body.random_id][i].size);

                            total_size = total_size + sizeInKb;
                        }
                    }
                }
            }else{
                req.body.product_image = result[0][0][0].image;
                req.body.avatar = result[0][0][0].avatar;
            }
            q.all([products.productImage(req, config.mysql, q)]).then(function (imgArray) {

                var imgArrayCount = imgArray[0][0].length;

                if(imgArrayCount > 0){
                    req.body.product_image = imgArray[0][0][0].image;
                    req.body.avatar = imgArray[0][0][0].avatar;
                }
                projects.saveProduct(req, config.mysql, q, result[0][0][0]);
                admin.addProductionAnswer(req, config.mysql, q, req.body.id);


                size = common.convertBytesToKb(total_size)
                req.session.used_attach_space = common.sumFloat(req.session.used_attach_space,size);
                projects.updateAttachmentLimit(req,config.mysql,q,size);

                req.session.featured_home_listing = 0;
                if (req.body.featured == 1 && result[0][0][0].feature == 0) {
                    req.session.featured_home_listing = global.general.feature_listing_fee;
                    req.session.featured_add = 1;

                }
                if (req.body.home_page_listing_fee == 1 && result[0][0][0].home_page_listing_fee == 0) {
                    req.session.featured_home_listing = common.sumFloat(req.session.featured_home_listing,global.general.home_page_listing_fee);
                    req.session.home_listing_add = true;

                }
                if (req.body.featured == 1 && result[0][0][0].feature == 0 || req.body.home_page_listing_fee == 1 && result[0][0][0].home_page_listing_fee == 0) {
                    res.writeHead(302, {'Location': '/dashboard/feature/' + req.body.id});

                    res.end();
                    return false;
                    return false;
                }
                if (req.body.sid > 0) {
                    res.writeHead(302, {'Location': '/stores/view/' + req.body.sid});

                    res.end();
                    return false;
                    return false;
                }
                if (typeof(req.body.save) !== 'undefined') {
                    res.writeHead(302, {'Location': '/dashboard/my'});
                    res.end();
                    return false;
                    return false;
                }
                else {
                    res.writeHead(302, {'Location': '/dashboard/my?cmd=draft'});
                    res.end();
                    return false;
                    return false;
                }
            }).fail(function(err){
                console.log(err.stack);
                throw err;
            }).done();
        }).fail(function(err){
        console.log(err.stack);
        throw err;
        }).done();

    }
    else {
       // attach.save('product', req, res);

        if(typeof(req.session.aid) !== 'undefined') {

            if (typeof(req.session.aid[req.body.random_id]) !== 'undefined') {

                for (i in req.session.aid[req.body.random_id]) {

                    if (req.session.aid[req.body.random_id][i] != null) {

                        req.body.product_image = req.session.aid[req.body.random_id][i].originalName;
                        req.body.avatar = req.session.aid[req.body.random_id][i].name;
                        break;

                    }
                }
            }
        }
        q.all([projects.save(req, res, config.mysql, q),projects.checkmailnotify(req,config.mysql,q,2),projects.checksmsnotify(req,config.mysql,q,2)]).then(function (l) {

            req.body.p_id = l[0][0].insertId;
            req.body.id = l[0][0].insertId;
         
            admin.addProductionAnswer(req, config.mysql, q, req.body.p_id);
            var total_size = 0;
            if (typeof(req.body.sid) !== 'undefined') {
                req.body.id = req.body.p_id;
                var stores = require('../module/stores');
                stores.addStoreProducts(req, config.mysql, q);

            }

            if(typeof(req.session.aid) !== 'undefined') {

                if (typeof(req.session.aid[req.body.random_id]) !== 'undefined') {

                    for (i in req.session.aid[req.body.random_id]) {

                        if (req.session.aid[req.body.random_id][i] != null) {

                            req.body.product_image = req.session.aid[req.body.random_id][i].originalName;
                            req.body.avatar = req.session.aid[req.body.random_id][i].name;
                            admin.addAttachment(req.session.aid[req.body.random_id][i], config.mysql, q, req.body.id);

                            sizeInKb = common.parseFloat(req.session.aid[req.body.random_id][i].size);

                            total_size = total_size + sizeInKb;
                        }
                    }
                }
            }

            size = common.convertBytesToKb(total_size)
            req.session.used_attach_space = common.sumFloat(req.session.used_attach_space,size);
            projects.updateAttachmentLimit(req,config.mysql,q,size);

            var cat_name = '';

            q.all([products.getcategory(req, config.mysql, q)]).then(function (cat) {
                req.body.fromid = (typeof(req.body.fromid) === 'undefined') ? req.session.userid : req.body.fromid;
                req.body.cat_name = cat[0][0][0].name;
                var cat_name = cat[0][0][0].name;
                q.all([products.categoryusr(req, config.mysql, q)]).then(function (catusr) {
                    catusrs = catusr[0][0];
                    email = require('../module/email');
                    message = require('../module/message');
                    var dat = require('date-util');
                    for (i in catusrs) {
                        var activeurl = 'test mail';
                        req.body.nid = 8;
                        req.body.first_name = catusrs[i]['first_name'];
                        req.body.last_name = catusrs[i]['last_name'];
                        req.body.toemail = req.body.email = catusrs[i]['email'];
                        req.body.tophone = catusrs[i]['phone'];
                        req.body.toid = catusrs[i]['id'];
                        req.body.pid = req.body.p_id;
                        req.body.r_id = Date.parse(new Date()) / 1000;
                        req.body.subject = 'New product (' + req.body.title + ') has been added';
                        req.body.message = req.body.title + ' has been added on ' + cat_name + '. To view product details .Please <a href="' + $arr.config.spath + 'product/view/' + req.body.p_id + '">click here</a>';
                        req.body.phmessage = req.body.title + ' has been added on ' + cat_name + '.';
                        message.addmessages(req, config.mysql, q);


                        //email.sendEmail('item_added',req.body,{user:req.body.first_name+' '+req.body.last_name,activeurl:activeurl,product_name:req.body.title,cat:req.body.cat_name,link:plink, });
                    }
                });
            }).fail(function(err){
                console.log(err.stack);
                throw err;
            }).done();

            localm = require('../module/localmail');
            
            console.log(req.body);
            if(l[1][0].length > 0){

                if (global.emailcio.status == 'yes') {

                    customerio = require('../module/customerio');
                    customerio.uid = req.session.userid;
                    customerio.inits();
                    customerio.createCustomer({
                        email: req.session.email,
                        user: {firstName: req.session.first_name, lastName: req.session.last_name}
                    });
                    customerio.sendEmail({
                        event: 'project_posted',
                        content: {
                            user: req.session.first_name + ' ' + req.session.last_name,
                            name: req.body.title,
                            url: config.url + '/product/view/' + req.body.p_id,
                            unsub_url: global.unsub_url+'/'+req.session.userid

                        }
                    });


                }

                else if (global.emaillocal.status == 'yes') {


                    q.all([localm.mailtemps(req, config.mysql, q, 'project_posted')]).then(function (results2) {

                        if (results2) {

                            var template = results2[0][0][0].template;
                            var subject = results2[0][0][0].subject;

                            template = template.replace('{{event.sitename}}', "Auction Software.com");
                            template = template.replace('{{event.user}}', req.session.first_name + ' ' + req.session.last_name);
                            template = template.replace('{{event.name}}', req.body.title);
                            template = template.replace('{{event.url}}', config.url + '/product/view/' + req.body.p_id);
                            console.log(template);
                            localm.sendmail(template, subject, req.session.email);
                        }

                        else {

                            console.log('No template named project_posted');
                        }


                    });

                }

                else {
                    console.log('No Mail Delivery method is selected');
                }

            }
        
            else{ console.log('Email method is not Selected for product posting'); }

            if(l[2][0].length > 0){
                
                if (global.smstwo.status == 'yes') {

                    twillio = require('../module/twillio');

                    q.all([twillio.smstemps(req, config.mysql, q, 'project_posted')]).then(function (results3) {
                        
                        if (results3) {

                            var template = results3[0][0][0].template;

                            template = template.replace('{{event.sitename}}', "Auction Software.com");
                            template = template.replace('{{event.user}}', req.session.first_name + ' ' + req.session.last_name);
                            template = template.replace('{{event.name}}', req.body.title);
                            template = template.replace('{{event.url}}', config.url + '/product/view/' + req.body.p_id);
                            console.log('[][][][][][][][][][][]][][][][][][]'+req.session.phone);
                            console.log(template);
                            twillio.sendsms(template, req.session.phone);

                        }
                        else {

                            console.log('No template name project_posted');
                        }

                    });

                }
            }

            else{ console.log('SMS method is not Selected for product posting'); }


            req.session.productcountyear = parseInt(req.session.productcountyear) + 1;

            req.session.productcountmonth = parseInt(req.session.productcountmonth) + 1;

            req.session.featured_home_listing = 0;
            if (req.body.featured == 1) {
                req.session.featured_home_listing = global.general.feature_listing_fee;
                req.session.featured_add = true;
            }
            if (req.body.home_page_listing_fee == 1) {
                req.session.featured_home_listing = common.sumFloat(req.session.featured_home_listing, global.general.home_page_listing_fee);
                req.session.home_listing_add = true;
            }
            if (req.body.featured == 1 || req.body.home_page_listing_fee) {

                res.writeHead(302, {'Location': '/dashboard/feature/' + l[0][0].insertId});

                res.end();
                return false;
                return false;
            }
            if (req.body.sid > 0) {
                    res.writeHead(302, {'Location': '/stores/view/' + req.body.sid});

                    res.end();
                    return false;
                    return false;
                }
            if (typeof(req.body.save) !== 'undefined') {
                res.writeHead(302, {'Location': '/dashboard/my'});
                res.end();
                return false;
                return false;
            }
            else {
                res.writeHead(302, {'Location': '/dashboard/my?cmd=draft'});
                res.end();
                return false;
                return false;
            }

        }).fail(function (error) {
            console.log(error.stack);
            throw error;

        }).done();
    }
});

app.get('/feedback/submit', function (req, res) {
    $arr.externalcss = ['buyer2'];
    common.tplFile('review-confirm.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req, res, $arr);
});

app.get('/invoice/:id', function (req, res) {
    $arr.externalcss = ['buyer2'];
    req.body.id = req.param('id');
    q.all([dashboard.addInvoice(req, config.mysql, q)]).then(function (results) {
        $arr.invoice = results[0][0][0];
        common.tplFile('invoice.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});
app.post('/feedback/add', function (req, res) {
    req.body.id = req.body.bid;
    q.all([dashboard.addFeedBack(req, config.mysql, q), dashboard.getBuynowRecord(req, config.mysql, q), dashboard.getFeedFields(req, config.mysql, q)]).then(function (results) {
        var m = results[0][0].insertId;
        var avg = 0;
        // var avg = parseFloat((parseInt(req.param('rating[1]'))+parseInt(req.param('rating[2]'))+parseInt(req.param('rating[4]'))+parseInt(req.param('rating[5]')))/5,2);
        var fields_count = results[2][0].length;
        var review_fields = results[2][0];
        for (var i = 0; i < fields_count; i++) {

            dashboard.addFeedBackPoint(req, config.mysql, q, m, req.param('rating[' + results[2][0][i].id + ']'), results[2][0][i].id);
            avg = avg + parseInt(req.param('rating[' + results[2][0][i].id + ']'));
        }
        avg = parseFloat(avg / fields_count);

        dashboard.setAverageFeedBack(req, config.mysql, q, avg, m);

        // dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating[2]'),2);
        // //dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating[3]'),3);
        // dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating[4]'),4);
        // dashboard.addFeedBackPoint(req,config.mysql,q,m,req.param('rating[5]'),5);
        dashboard.submitFeedbackCart(req, config.mysql, q);

        projects = require('../module/products');
        req.body.id = results[1][0][0].project_id;
        q.all([projects.productDetail(req, config.mysql, q)]).then(function (resu) {
            dashboard.addUserReview(req, config.mysql, q, avg, resu[0][0][0].user_id);
            res.writeHead(302, {'Location': '/dashboard/feedback/submit'});
            res.end();
            return false;
            return false;
        });
    });
});

app.get(['/payment/:action/:type/:id'], function (req, res) {
    req.body.action = req.param('action');
    req.body.type = req.param('type');
    req.body.id = req.param('id');
    $arr.externalcss = ['buyer2'];
    if (req.body.action == 'feedback') {
        if (req.body.type == 'buy') {
            q.all([dashboard.getFeedBack(req, config.mysql, q), dashboard.getFeedFields(req, config.mysql, q)]).then(function (results) {
                $arr['projects'] = results[0][0][0];
                $arr['fields'] = results[1][0];
                $arr['fieds_count'] = results[1][0].length;

                common.tplFile('add_bfeedback.tpl');
                common.headerSet(1);
                common.loadTemplateHeader(req, res, $arr);
            });
        }

    }
    if (req.body.action == 'release' || req.body.action == 'cancel') {
        if (req.body.type == 'buy') {
            q.all([dashboard.getBuynowRecord(req, config.mysql, q)]).then(function (results) {
                if (results[0][0].length == 0) {
                    res.writeHead(302, {'Location': '/dashboard/my'});
                    res.end();
                    return false;
                }
                var k = results[0][0][0];
                if (k.user_id != req.session.userid) {
                    res.writeHead(302, {'Location': '/dashboard/my'});
                    res.end();
                    return false;
                }
                if (k.release == 0 && req.body.action == 'release') {
                    dashboard.paymentBuyNowRelease(req, config.mysql, q, id);
                    common.tplFile('payment_released.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }
                else if (k.release == 0 && req.body.action == 'cancel') {
                    dashboard.paymentBuyNowCancel(req, config.mysql, q, id);
                    common.tplFile('payment_cancelled.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }
                else if (k.release == 1) {
                    common.tplFile('payment_released.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }
                else if (k.release == 2) {
                    common.tplFile('payment_cancelled.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }
            });
        }
        if (req.body.type == 'bid') {
            q.all([dashboard.getBidsRecord(req, config.mysql, q)]).then(function (results) {
                if (results[0][0].length == 0) {
                    res.writeHead(302, {'Location': '/dashboard/my'});
                    res.end();
                    return false;
                }
                var k = results[0][0][0];
                if (k.user_id != req.session.userid) {
                    res.writeHead(302, {'Location': '/dashboard/my'});
                    res.end();
                    return false;
                }
                if (k.release == 0 && req.body.action == 'release') {
                    dashboard.paymentBidRelease(req, config.mysql, q, id);
                    common.tplFile('payment_released.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }
                else if (k.release == 0 && req.body.action == 'cancel') {
                    dashboard.paymentBidCancel(req, config.mysql, q, id);
                    common.tplFile('payment_cancelled.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }
                else if (k.release == 1) {
                    common.tplFile('payment_released.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }
                else if (k.release == 2) {
                    common.tplFile('payment_cancelled.tpl');
                    common.headerSet(1);
                    common.loadTemplateHeader(req, res, $arr);
                }
            });
        }
    }
});

app.get(['/my/', '/my/:page'], function (req, res) {
    var adwords = require('../module/adwords');
    $arr.error = '';
    var products = require('../module/products');
    var bids = require('../module/bid');
    var data = bids.SearchPageNo(req, config.mysql, q);

    req.body.page = data.dspage;
    req.body.perlimit = 5;

    //req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
    var dateFormat = require('dateformat');
    q.all([products.myproducts(req, config.mysql, q, 0), products.myproducts(req, config.mysql, q, 1),adwords.show_ads(req,config.mysql,q,'Seller Dashboard')]).then(function (results) {
        $arr['projects'] = products.shortDescribe(results[0][0]);
        $arr['pagination'] = results[1][0].length;
        $arr['adwords'] = results[2][0];
        $arr.page_name = 'Seller Dashboard';
        var pagination = require('pagination');
        fquery = '';
        if (typeof(req.param('cmd')) !== 'undefined') {
            fquery = '?cmd=' + req.param('cmd');
            $arr['cmd'] = req.param('cmd');

        }
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/my' + fquery,
            current: req.body.page,
            rowsPerPage: req.body.perlimit,
            totalResult: $arr['pagination']
        });
        $arr['dateFormat'] = dateFormat;
        $arr['pagination_html'] = paginator.render();
        common.tplFile('myprojects.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }).fail(function (error) {
        console.log("Error : " + error.stack);
        throw error;
    }).done();
});

app.get(['/mysold/', '/mysold/:page'], function (req, res) {
    $arr.error = '';
    var bids = require('../module/bid');
    var products = require('../module/products');
    var data = bids.SearchPageNo(req, config.mysql, q);
    // req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;

    req.body.page = data.dspage;
    req.body.perlimit = 5;
    var adwords = require('../module/adwords');
    $arr.page_name = 'Seller Dashboard';
    var dateFormat = require('dateformat');
    q.all([products.mysoldproducts(req, config.mysql, q, 0), products.mysoldproducts(req, config.mysql, q, 1),adwords.show_ads(req,config.mysql,q,'Seller Dashboard')]).then(function (results) {
        $arr['projects'] = products.shortDescribe(results[0][0]);
        $arr['pagination'] = results[1][0].length;
        $arr['adwords'] = results[2][0];
        var pagination = require('pagination');
        fquery = '';
        if (typeof(req.param('cmd')) !== 'undefined') {
            fquery = '?cmd=' + req.param('cmd');
        }
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/mysold' + fquery,
            current: req.body.page,
            rowsPerPage: req.body.perlimit,
            totalResult: $arr['pagination']
        });
        $arr['dateFormat'] = dateFormat;
        $arr['pagination_html'] = paginator.render();
        common.tplFile('mysold.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get(['/product/edit/:id','/product/edit/:id/:sid'], function (req, res) {


    var products = require('../module/products');
    var dateFormat = require('dateformat');
    $arr.datenow = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
    $arr.sid = req.body.sid = (typeof(req.param('sid')) === 'undefined') ? 0 : req.param('sid');
    $arr.externalcss = ['datePicker'];
    $arr.externaljs = ['jquery.datePicker'];
    $arr['fee'] = global.general.feature_listing_fee;
    var user = require('../module/user');
    q.all([products.productDetail(req, config.mysql, q), products.productImage(req, config.mysql, q), user.userInfo(req, config.mysql, q, req.session.userid, ['paypal_address', 'zip']), common.locations(req, config.mysql, q),adwords.show_ads(req,config.mysql,q,'Sell an Item')]).then(function (result) {
        try {
            $arr['projects'] = products.shortDescribe(result[0][0]);
            $arr.user = result[2][0][0];
            $arr.locations = result[3][0];
            $arr['projects'] = $arr['projects'][0];
           // $arr['projects']['sell_location'] = (typeof($arr['projects']['sell_location']) == 'undefined') ? '' : common.firstLetterCapital($arr['projects']['sell_location']);
            $arr['projects']['sell_location'] = (typeof($arr['projects']['sell_location']) == 'undefined') ? '' :$arr['projects']['sell_location'];
            $arr['adwords'] = result[4][0];
            if (new Date($arr['projects']['date_added']) < new Date($arr.datenow)) {
                $arr.datenow = dateFormat(new Date($arr['projects']['date_added']), "yyyy-mm-dd HH:MM:ss");
            }
            $arr['home_page_fee'] = global.general.home_page_listing_fee;
            $arr['projects']['date_add'] = dateFormat(new Date($arr['projects']['date_added']), "yyyy/mm/dd HH:MM");
            $arr['projects']['date_close'] = dateFormat(new Date($arr['projects']['date_closed']), "yyyy/mm/dd HH:MM");
            $arr['image'] = result[1][0];
            $arr['pid'] = common.randomNumber(5);
            if ($arr['projects'].bids != 0 || $arr['projects'].sold != 0) {
                res.writeHead(302, {
                    'Location': '/dashboard/my'
                });
                res.end();
                return false;
            }
            else {
                common.tplFile('post.tpl');
            }

            common.headerSet(1);
            common.loadTemplateHeader(req, res, $arr);
        } catch (e) {
            console.log("Error in edit info " + e.stack);
        }
    });

});

app.post('/withdrawal', function (req, res) {

    user = require('../module/user');
    withdraw = require('../module/withdraw');
    if (typeof(req.body.amount) === 'undefined' || typeof(req.body.paymethod) === 'undefined' || typeof(req.body.paydetails) === 'undefined') {
        res.writeHead(302, {
            'Location': '/dashboard/withdrawal/error/Invalid datas'
        });
        res.end();
        return false;
    }
    if (parseFloat(req.body.amount) <= 0) {
        res.writeHead(302, {
            'Location': '/dashboard/withdrawal/error/Amount Invalid'
        });
        res.end();
        return false;
    }
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
    q.all([user.userInfo(req, config.mysql, q, req.session.userid, ['balance', 'reserve_amount'])]).then(function (results) {
        $arr['users'] = results[0][0][0];
        $arr['users']['reserve_amount'] = parseFloat(results[0][0][0]['balance'] - results[0][0][0]['reserve_amount']);
        if ($arr['users']['reserve_amount'] >= req.body.amount) {
            bid = require('../module/bid');
            bid.reduceBalance(req, config.mysql, q, req.body.amount);
            withdraw.addWithdraw(req, config.mysql, q);
            res.writeHead(302, {
                'Location': '/dashboard/withdrawal/success/Withdraw Request Sent'
            });
            res.end();
            return false;
        }
        else {
            res.writeHead(302, {
                'Location': '/dashboard/withdrawal/error/Withdraw Amount must not be greater than available amount'
            });
            res.end();
            return false;
        }
    });

});

app.get(['/withdrawal', '/withdrawal/:action/:message'], function (req, res) {

    withdraw = require('../module/withdraw');
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
    $arr['action'] = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
    $arr['message'] = (typeof(req.param('message')) !== 'undefined') ? req.param('message') : '';
    q.all([withdraw.mywithdraw(req, config.mysql, q)]).then(function (results) {
        $arr['withdraw'] = results[0][0];
        common.tplFile('withdrawal.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });

});

app.get(['/mybids', '/mybids:page'], function (req, res) {
    var module = require('../module');
    var bids = require('../module/bid');
    var adwords = require('../module/adwords');
    var data = bids.SearchPageNo(req, config.mysql, q);

    req.body.page = data.dspage;
    req.body.perlimit = 5;
    q.all([bids.mybids(req, config.mysql, q, 1), bids.mybids(req, config.mysql, q, 0),adwords.show_ads(req,config.mysql,q,'Buyer Dashboard')]).then(function (results) {
        $arr['pagination'] = results[1][0].length;
        $arr['mybids'] = products.shortDescribe(results[0][0]);
        $arr['adwords'] = results[2][0];
        $arr.page_name = 'Buyer Dashboard';
        var pagination = require('pagination');
        fquery = '';

        if (typeof(req.param('cmd')) !== 'undefined') {
            fquery = '?cmd=' + req.param('cmd');
        }
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/mybids' + fquery,
            current: data.dspage,
            rowsPerPage: req.body.perlimit,
            totalResult: $arr['pagination']
        });

        $arr['pagination_html'] = paginator.render();
        common.tplFile('mybids.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }).fail(function(err){
        console.log(err.stack);
        throw err;
    }).done();

});

app.get(['/mywon', '/mywon:page'], function (req, res) {
    var adwords = require('../module/adwords');
    var bids = require('../module/bid');
    var dateFormat = require('dateformat');
    var data = bids.SearchPageNo(req, config.mysql, q);
    req.body.page = data.dspage;
    req.body.perlimit = 5;

    q.all([bids.mywon(req, config.mysql, q, 1), bids.mywon(req, config.mysql, q, 0),adwords.show_ads(req,config.mysql,q,'Buyer Dashboard')]).then(function (results) {
        $arr['pagination'] = results[1][0].length;
        $arr['mybids'] = products.shortDescribe(results[0][0]);
        $arr['adwords'] = results[2][0];
        $arr.page_name = 'Buyer Dashboard';
        var pagination = require('pagination');
        fquery = '';
        if (typeof(req.param('cmd')) !== 'undefined') {
            fquery = '?cmd=' + req.param('cmd');
        }

        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/mywon' + fquery,
            current: data.dspage,
            rowsPerPage: req.body.perlimit,
            totalResult: $arr['pagination']
        });

        $arr['pagination_html'] = paginator.render();
        common.tplFile('mywon.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }).fail(function(err){
        console.log(err.stack);
        throw err;
    }).done();

});

app.get('/watchlist/:id', function (req, res) {

    products = require('../module/products');
    products.deleteWatchlist(req, config.mysql, q);
    req.session.watchlistdelete = true;
    res.writeHead(302, {
        'Location': '/dashboard/watchlist'
    });
    res.end();
    return false;

});

app.post(['/messages/save'], function (req, res) {

    messages = require('../module/message');
    user = require('../module/user');

    req.body.r_id = parseInt(req.body.r_id);
    req.body.pid = 0;
    if (req.body.r_id <= 0) {
        q.all([common.admincpId(req, config.mysql, q)]).then(function (result) {
            req.body.toid = result[0][0][0]['id'];
            var dat = require('date-util');
            req.body.r_id = Date.parse(new Date());
            q.all([user.userInfo(req, config.mysql, q, req.body.toid, ['email', 'first_name', 'last_name'])]).then(function (results) {
                req.body.toemail = results[0][0][0]['email'];
                req.body.first_name = results[0][0][0]['first_name'];
                req.body.last_name = results[0][0][0]['last_name'];
                messages.addmessages(req, config.mysql, q);
                res.writeHead(302, {
                    'Location': '/dashboard/messages/sent/'
                });
                res.end();
                return false;
            });
        });
    }
    else {
        q.all([messages.showmessages(req, config.mysql, q, 1), common.admincpId(req, config.mysql, q)]).then(function (results) {
            $arr['messages'] = results[0][0];
            if ($arr['messages'].length == 0) {
                res.writeHead(302, {
                    'Location': '/dashboard/messages'
                });
                res.end();
                return false;
            }
            if ($arr['messages'][0]['from_id'] != req.session.userid && $arr['messages'][0]['to_id'] != req.session.userid) {
                res.writeHead(302, {
                    'Location': '/dashboard/messages'
                });
                res.end();
                return false;
            }
            req.body.toid = ($arr['messages'][0]['from_id'] == req.session.userid) ? $arr['messages'][0]['to_id'] : $arr['messages'][0]['from_id'];
            req.body.subject = $arr['messages'][0]['subject'];
            req.body.pid = $arr['messages'][0]['project_id'];

            q.all([user.userInfo(req, config.mysql, q, req.body.toid, ['email', 'first_name', 'last_name'])]).then(function (results) {
                req.body.toemail = results[0][0][0]['email'];
                req.body.first_name = results[0][0][0]['first_name'];
                req.body.last_name = results[0][0][0]['last_name'];
                messages.addmessages(req, config.mysql, q);
                res.writeHead(302, {
                    'Location': '/dashboard/messages/view/' + req.body.r_id
                });
                res.end();
                return false;
            });
        });
    }
});

app.get(['/messages/:action/:r_id'], function (req, res) {

    $arr.externalcss = ['buyer2'];
    messages = require('../module/message');
    req.body.r_id = (typeof(req.param('r_id')) !== 'undefined') ? req.param('r_id') : 0;
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    $arr['r_id'] = req.body.r_id;
    req.body.r_id = parseInt(req.body.r_id);
    if (req.body.r_id <= 0) {
        res.writeHead(302, {
            'Location': '/dashboard/messages'
        });
        res.end();
        return false;
    }
    req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
    $arr['action'] = req.body.action;
    if (req.body.action != 'view') {
        messages.movemessages(req, config.mysql, q);
        res.writeHead(302, {
            'Location': '/dashboard/messages/view/' + req.body.r_id
        });
        res.end();
        return false;
    }
    q.all([messages.showmessages(req, config.mysql, q, 1), messages.showmessages(req, config.mysql, q, 0)]).then(function (results) {
        try {
            $arr['messages'] = results[0][0];
            if ($arr['messages'].length == 0) {
                res.writeHead(302, {
                    'Location': '/dashboard/messages'
                });
                res.end();
                return false;

            }
            if ($arr['messages'][0]['from_id'] != req.session.userid && $arr['messages'][0]['to_id'] != req.session.userid) {
                res.writeHead(302, {
                    'Location': '/dashboard/messages'
                });
                res.end();
                return false;
            }
            if ($arr['messages'].length > 0) {

                var pagination = require('pagination');

                $arr['pagination'] = results[1][0].length;

                var paginator = new pagination.SearchPaginator({
                    prelink: '/dashboard/messages/' + req.body.action + '/' + req.body.r_id,
                    current: req.body.page,
                    rowsPerPage: 5,
                    totalResult: $arr['pagination']
                });
                $arr['pagination_html'] = paginator.render();
                req.body.r_id = $arr['messages'][0]['r_id'];
                messages.readmessages(req, config.mysql, q);
            }
        } catch (e) {
            console.log("error in show messages " + e.stack);
        }
        common.tplFile('message-view.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get(['/messages', '/messages/:action'], function (req, res) {

    messages = require('../module/message');
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
    $arr['action'] = req.body.action;
    messages.updateviewed(req, config.mysql, q);
    if (req.body.action == 'compose') {
        common.tplFile('compose.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }
    else {
        q.all([messages.mymessages(req, config.mysql, q, 0), messages.mymessages(req, config.mysql, q, 1), messages.mymessages(req, config.mysql, q, 2),adwords.show_ads(req,config.mysql,q,'Messages')]).then(function (results) {
            $arr['pagination'] = results[1][0].length;
            $arr['messages'] = results[0][0];
            $arr['unreadmessage'] = results[2][0].length;
            $arr['adwords'] = results[3][0]
            $arr.page_name = 'Messages';
            var pagination = require('pagination');
            var paginator = new pagination.SearchPaginator({
                prelink: '/dashboard/messages/' + req.body.action,
                current: req.body.page,
                rowsPerPage: 5,
                totalResult: $arr['pagination']
            });

            $arr['pagination_html'] = paginator.render();
            common.tplFile('messages.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req, res, $arr);
        });
    }
});

app.post('/messages/:del_action/:action', function (req, res) {
    messages = require('../module/message');
    req.body.action = typeof((req.param('action')) !== 'undefined') ? req.param('action') : '';
    if (req.body.del_action == 'delete') {
        q.all(messages.deleteMessages(req, config.mysql, q)).then(function (results) {

            res.send(JSON.stringify({'success': true}));

        });
    }
    else if (req.body.del_action == 'undelete') {
        q.all(messages.unDeleteMessages(req, config.mysql, q)).then(function (results) {

            res.send(JSON.stringify({'success': true}));

        });
    }

});

app.get('/watchlist', function (req, res) {

    products = require('../module/products');
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
    if (typeof(req.session.watchlistdelete) !== 'undefined') {
        delete req.session.watchlistdelete;
        $arr['save'] = true;
    }
    q.all([products.mywatchlist(req, config.mysql, q), products.totalmywatchlist(req, config.mysql, q)]).then(function (results) {
        $arr['pagination'] = results[1][0].length;
        $arr['mywatchlist'] = results[0][0];
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/watchlist',
            current: req.body.page,
            rowsPerPage: 10,
            totalResult: $arr['pagination']
        });

        $arr['pagination_html'] = paginator.render();
        common.tplFile('mywatchlist.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });

});

app.get('/buynow', function (req, res) {
    var bids = require('../module/bid');
    var dashboard = require('../module/dashboard');
    var data = bids.SearchPageNo(req, config.mysql, q);
    req.body.page = data.dspage;
    req.body.perlimit = 5;
    q.all([dashboard.mybuynow(req, config.mysql, q, 1), dashboard.mybuynow(req, config.mysql, q, 0),adwords.show_ads(req,config.mysql,q,'Buyer Dashboard')]).then(function (results) {
        $arr['pagination'] = results[1][0].length;
        $arr['mybids'] = results[0][0];
        $arr['adwords'] = results[2][0];
        $arr.page_name = 'Buyer Dashboard';
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/buynow',
            current: data.dspage,
            rowsPerPage: req.body.perlimit,
            totalResult: $arr['pagination']
        });

        $arr['pagination_html'] = paginator.render();
        common.tplFile('mybids.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });

});

app.get('/wonauctions', function (req, res) {

    bids = require('../module/bid');
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
    q.all([bids.mywonauctions(req, config.mysql, q), bids.totalmywonauctions(req, config.mysql, q)]).then(function (results) {
        $arr['pagination'] = results[1][0].length;
        $arr['mybids'] = results[0][0];
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/wonauctions',
            current: req.body.page,
            rowsPerPage: 10,
            totalResult: $arr['pagination']
        });

        $arr['pagination_html'] = paginator.render();
        common.tplFile('wonauctions.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });

});

app.get('/review', function (req, res) {

    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
    $arr['externalcss'] = ['bootstrap', 'font-awesome', 'star-rating',];
    $arr['externaljs'] = ['bootstrap', 'star-rating'];
    $arr['reviewaction'] = false;

    common.tplFile('review.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req, res, $arr);


});

app.post('/review', function (req, res) {

    review = require('../module/review');
    q.all([review.reviewAdd(req, config.mysql, q)]).then(function (results) {
        $arr['reviewaction'] = true;
        res.writeHead(302, {
            'Location': '/reviews'
        });
        res.end();
        return false;
    });

});

app.get('/transactions', function (req, res) {

    invoices = require('../module/invoices');
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
    q.all([invoices.mytransactions(req, config.mysql, q), invoices.totalmytransactions(req, config.mysql, q)]).then(function (results) {
        $arr['pagination'] = results[1][0].length;
        $arr['transaction'] = results[0][0];
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/transactions',
            current: req.body.page,
            rowsPerPage: 10,
            totalResult: $arr['pagination']
        });

        $arr['pagination_html'] = paginator.render();
        common.tplFile('transactions.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });

});

app.get('/invoices/:id', function (req, res) {

    invoices = require('../module/invoices');
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 0;
    q.all([invoices.viewTransactions(req, config.mysql, q)]).then(function (results) {
        $arr['transaction'] = results[0];
        common.tplFile('invoices.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });

});


app.get('/password', function (req, res) {

    common.tplFile('passwordchange.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req, res, $arr);

});

app.post('/changepassword', function (req, res) {
    $arr['save'] = true;
    mysql = config.mysql;
    var md5 = require('MD5');
    var password_salt = '12345'
    var password = md5(md5(req.body.new_password) + password_salt);
    strQuery = mysqli.mysqli($mysqli, 57);

    if (typeof(req.body.isajax) != 'undefined' && req.body.isajax == 1) {

        $mysqli = {username: req.session.email};
        strQuery = mysqli.mysqli($mysqli, 0);

        query = mysql.query(strQuery, function (error, results, fields) {
            if (results.length > 0) {
                result = results[0];
                result.password = md5(md5(req.param('password')) + result['password_salt']);
                if (result.password == result.password_hash) {
                    res.json(1);
                    return false;
                }
                else {
                    res.json(0);
                    return false;
                }
            }
        });
    }
    else {
        $mysqli = {};
        var defered = q.defer();
        escape_data = [password, password_salt, req.session.email];
        query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
        res.writeHead(302, {
            'Location': '/dashboard/password'
        });
        res.end();
        return false;
    }

});

app.get('/Myaddress', function (req, res) {
    q.all([dashboard.getAddresses(req, config.mysql, q, 'shipping'), dashboard.getAddresses(req, config.mysql, q, 'billing')]).then(function (results) {
        $arr['shipping'] = results[0][0][0];
        $arr['billing'] = results[1][0][0];
        common.tplFile('Addresses.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get('/payments', function (req, res) {

    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    $arr.externalcss = ['buyer2', 'change_psd'];
    q.all([dashboard.getPayments(req, config.mysql, q), dashboard.getAllPayments(req, config.mysql, q)]).then(function (results) {
        $arr['payments'] = results[0][0];

        $arr['cnt'] = results[1][0].length;
        var pagination = require('pagination');

        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/payments',
            current: req.body.page,
            rowsPerPage: 15,
            totalResult: $arr['cnt']
        });
        $arr.pagination_html = paginator.render();
        ;
        common.tplFile('payments.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get('/paymentexport', function (req, res) {

    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    $arr.externalcss = ['buyer2', 'change_psd'];
    q.all([dashboard.getCsvPayments(req, config.mysql, q)]).then(function (result) {
        var k = result[0][0].length;
        resultk = result[0][0];
        var j = 0;
        arr = [];
        data2 = ['InvoiceId', 'Project Title', 'Type', 'Status', 'Amount', 'Date Added', 'Paid Date'];
        arr.push(data2);
        for (i in resultk) {
            j++;
            data2 = [resultk[i]['id'], resultk[i]['description'], resultk[i]['type'], resultk[i]['istatus'], resultk[i]['amount'], resultk[i]['date_add'], resultk[i]['date_paid']];
            arr.push(data2);
        }
        res.setHeader('Content-disposition', 'attachment; filename=report.csv');
        res.csv(arr);
    });


});

app.post('/Myaddress', function (req, res) {

    q.all([dashboard.getAddresses(req, config.mysql, q, req.body.type)]).then(function (results) {
        if (results[0][0].length > 0)
            var doauction = 'update';
        else
            var doauction = 'save';
        q.all(dashboard.saveaddress(req, config.mysql, q, doauction)).then(function (results) {
            res.writeHead(302, {
                'Location': '/dashboard/Myaddress'
            });
            res.end();
            return false;
        });
    });

});

app.get('/Address/:type', function (req, res) {
    $arr['shipping'] = '';
    req.body.type = (typeof(req.param('type')) !== 'undefined') ? req.param('type') : 'shipping';
    q.all([dashboard.getAddresses(req, config.mysql, q, req.body.type)]).then(function (results) {
        if (results[0][0].length > 0)
            $arr['shipping'] = results[0][0][0];

        $arr['type'] = req.body.type;
        common.tplFile('Myaddress.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});


app.get('/referral', function (req, res) {

    $arr['referral'] = $arr['referrallink'] = '';
    q.all(dashboard.getReferral(req, config.mysql, q, 0)).then(function (results) {
        $arr['referrallink'] = cryptos.encrypt(req.session.userid.toString());
        $arr['referral'] = results[0];
        common.tplFile('referral.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });

});

app.get('/autobid', function (req, res) {
    $arr['referral'] = $arr['referrallink'] = $arr['Autobids'] = $arr['project'] = '';
    q.all([dashboard.getOpenProjects(req, config.mysql, q), dashboard.fetchAutobidlist(req, config.mysql, q)]).then(function (results) {
        $arr['project'] = results[0][0];
        $arr['Autobids'] = results[1][0];
        common.tplFile('autobid.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get('/', function (req, res) {
    res.writeHead(302, {
        'Location': '/'
    });
    res.end();
    return false;
});

app.post('/autobid', function (req, res) {
    q.all(dashboard.checkAutobid(req, config.mysql, q)).then(function (results) {
        if (results[0].length == 0) {
            q.all(dashboard.saveAutobid(req, config.mysql, q));
        }
        res.writeHead(302, {
            'Location': '/dashboard/autobid'
        });
        res.end();
        return false;
    });
});

app.get('/RemoveAddress/:type', function (req, res) {
    $arr['shipping'] = '';
    req.body.type = (typeof(req.param('type')) !== 'undefined') ? req.param('type') : 'shipping';
    q.all([dashboard.removeAddresses(req, config.mysql, q, req.body.type)]).then(function (results) {
        res.writeHead(302, {
            'Location': '/dashboard/Myaddress'
        });
        res.end();
        return false;
    });
});


app.post('/save_notification', function (req, res) {

    dashboard.save_usernotify(req, config.mysql, q);

    console.log(req.body.buyermail_settings+'::'+req.body.sellersms_settings )  
    res.writeHead(302, {
            'Location': '/dashboard/notification_manager'
        });
    res.end();
    return false;
   

});

app.get('/blockusers', function (req, res) {
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    
    q.all([dashboard.blocked_users(req, config.mysql, q,0),dashboard.blocked_users(req, config.mysql, q,1)]).then(function (results) {
        $arr['blocked'] = results[0][0];
        $arr['your_mailid'] = req.session.email;
        $arr['cnt'] = results[1][0].length;
        console.log($arr['blocked']);
        var pagination = require('pagination');
        $arr['uid'] = req.session.id;
        var paginator = new pagination.SearchPaginator({
            prelink: '/dashboard/blockusers',
            current: req.body.page,
            rowsPerPage: 15,
            totalResult: $arr['cnt']
        });
        $arr.pagination_html = paginator.render();
        common.tplFile('block_users.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});
app.post('/blockids', function (req, res) {

    dashboard.block_user(req, config.mysql, q);
    dashboard.block_bids_of_user(req, config.mysql, q);
    dashboard.block_buys_of_user(req, config.mysql, q);

    res.writeHead(302, {
            'Location': '/dashboard/blockusers'
        });
    res.end();
    return false;
   

});

app.get('/unblock/:id', function (req, res) {
    
    req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
    q.all([dashboard.unblock_user(req, config.mysql, q, req.body.id)]).then(function (results) {
        res.writeHead(302, {
            'Location': '/dashboard/blockusers'
        });
        res.end();
        return false;
    });
});

app.post('/checkid', function (req, res) {

    q.all([dashboard.check_uid(req, config.mysql, q, req.body.bid)]).then(function (results) {
            if(results[0][0].length > 0){
                res.send("blocked");
            }
            else{
                res.send("notblocked");   
            }
    });
   

});
app.post('/check_if_exist', function (req, res) {

    q.all([dashboard.check_if_exist(req, config.mysql, q, req.body.bid)]).then(function (results) {
            if(results[0][0].length > 0){
                res.send("exist");
            }
            else{
                res.send("notexist");   
            }
    });
   

});

app.post('/getmailids', function (req, res) {
    var lists = '';
    q.all([dashboard.get_mail_ids(req, config.mysql, q, req.body.bid)]).then(function (results) {
            if(results[0][0].length > 0){
               for(var i = 0; i < results[0][0].length; i++){ 
                     lists += '<li><a role="menuitem" tabindex="-1" href="javascript:void(0);">'+results[0][0][i].email+'</a></li>'
                }
            }
            else{
                lists += '<li>No mail Ids</li>'; 
            }
        res.send( lists );    
    });


});

app.post('/transfer_ownership', function (req, res) {

    message = require('../module/message');
    
    q.all([dashboard.getuser_details(req, config.mysql, q, req.body.transfer_mail),dashboard.product_details(req, config.mysql, q, req.body.product_id),dashboard.transfer_product(req, config.mysql, q)]).then(function (results) {
        console.log(results[0][0]);
        req.body.toid = results[0][0][0].id;
        req.body.first_name = results[0][0][0].first_name;
        req.body.last_name = results[0][0][0].last_name;
        req.body.r_id = Date.parse(new Date())/1000;
        req.body.toemail = req.body.transfer_mail;
        req.body.fromid = req.session.user_id;
        req.body.pid = req.body.product_id;
        req.body.subject = 'You are the new owner';
        req.body.message = 'You are the new owner of '+results[1][0][0].title+' .Happy Selling !.';
        message.addmessages(req,config.mysql,q);

        res.writeHead(302, {
                'Location': '/dashboard/my'
        });
        res.end();
        return false;

    });
   

});

module.exports = app;