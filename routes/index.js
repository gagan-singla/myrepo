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
var reload = require('reload');
var sprintf = require('sprintf').sprintf;
var common = require('../module/common');
var register = require('../module/register');
var request = require('request')
var app = express.Router();
var q = require('q');
var CronJob = require('cron').CronJob;
new CronJob('00 00 00 * * *', function() {
    //console.log('You will see this message every second');

    request({
        rejectUnauthorized: false,
        url:global.url+'/remainder'
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('Successfull daily cron');
            // console.log(body) // Show the HTML for the Google homepage.
        }
        else{

            console.log('Failed daily cron');
            console.log(error);
        }
    })
}, null, true, "America/Los_Angeles");

new CronJob('00 00 * * * *', function() {
    //This is to run in every hour to check if bid remaining time exceeds;

    request({
        rejectUnauthorized: false,
        url:global.url+'/checkbidtime'
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('Successfull hourly cron');
            // console.log(body) // Show the HTML for the Google homepage.
        }
        else{
            console.log('Failed hourly cron');
            console.log(error);
        }
    })
}, null, true, "America/Los_Angeles");

//required js

app.get('/imager',function(req,res)
{
	var fs = require('fs');  
	var im = require('imagemagick');
	//console.log(fs.readFileSync($arr.config.paths.path+'public/uploads/product/1d96ff2a3aa239fc80f928570bdd9a30.jpeg', 'binary'));
			im.resize({
			  srcData: fs.readFileSync($arr.config.paths.path+'public/uploads/product/c82b3b26727bef8a0acbb7575d28e620.jpg', 'binary'),
			  width:   100
			}, function(err, stdout, stderr){
			  if (err) console.log(err);
			  //console.log(2);
			  //console.log(stdout);
			  fs.writeFileSync($arr.config.paths.path+'public/uploads/product/test3.jpg', stdout, 'binary');
			  console.log('resized kittens.jpg to fit within 256x256px')
			});
});
app.post('/srini', function (req, res) {
    users = require('../module/userdata');
    q.all([users.userdeals(req, $arr.config.mysql, q)]).then(function (results) {

        $arr.deals = results[0][0];
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
        res.writeHead(302, {
            'Location': '/srini'
        });
        res.end();
        return false;

    });
});


app.get('/srini', function (req, res) {
    users = require('../module/userdata');
    common.tplFile('userdata.tpl');
    q.all([users.getdata(req, $arr.config.mysql, q)]).then(function (results) {

        $arr.getrecord = results[0][0];
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
        common.tplFile('userdata.tpl');
    });
});
app.get('/config_s', function (req, res) {
     var fs = require('fs')
     , ini = require('ini');  
    var configed = fs.readFileSync('./config.ini', 'utf-8');
    /*res.send(configed);
    res.end();
    return false;*/
});
app.get('/phonecheckup', function (req, res) {
    $arr.phonecheckup = 1;
    if (req.session.keysuccess) {
        $arr.phonecheckup = 0;
    }
    $arr.register_error = '';
    $arr.register_fail = 0;
    $arr.login_error = '';
    $arr.login_fail = 0;
    $arr['registerdata'] = req.cookies;
    if (typeof(req.session.keyadded) !== 'undefined') {
        var dateFormat = require('dateformat');
        datge = new Date();
        var dateFormat = require('dateformat');
        dump = new Date(req.session.keyadded);
        var difference = dump.getTime() - datge.getTime();
        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= daysDifference * 1000 * 60 * 60 * 24
        var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60
        var minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60;
        if (difference > 1) {
            delete req.session.keyadded;
        }
    }
    if (req.cookies.cookieemail) {
        $arr['cookieemail'] = req.cookies.cookieemail;
        $arr['cookiepassword'] = req.cookies.cookiepassword;
    }
    res.clearCookie('email');
    res.clearCookie('first_name');
    res.clearCookie('last_name');
    res.clearCookie('password');
    if (typeof(req.param('error')) !== 'undefined') {
        $arr.register_error = req.param('error');
        $arr.register_fail = 1;
    }
    if (typeof(req.param('lerror')) !== 'undefined') {
        $arr.login_error = req.param('lerror');
        $arr.login_fail = 1;
    }
    var module = require('../module');

    $arr.pagetitle = 'home';
    $arr.ptitle = 'index';
    var products = require('../module/products');
    q.all([products.dealsProducts(req, $arr.config.mysql, q), products.bestSellersProducts(req, $arr.config.mysql, q), products.productCategoryItems(req, $arr.config.mysql, q, 1), products.productCategoryItems(req, $arr.config.mysql, q, 3)]).then(function (results) {

        var fs = require('fs')
            , ini = require('ini');

        var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
        var mode = configed['section']['mode']['Maintenance_mode'];
        var msg = configed['section']['mode']['message'];
        $arr.deals = results[0][0];
        $arr.sellers = results[1][0];
        $arr.cat1 = results[2][0];
        $arr.cat2 = results[3][0];
        $arr.mode = mode;
        $arr.msg = msg;
        if (mode == 'yes') {
            common.tplFile('maintenance.tpl');
        }
        else {
            common.tplFile('home.tpl');
        }
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.post('/phone_setup_code', function (req, res) {

    if (req.session.key == req.param('key')) {
        req.session.keysuccess = true;
        var dateFormat = require('dateformat');
        datge = new Date();
        req.session.keyadded = datge;
        res.send(JSON.stringify({'error': false}));
    }
    else {
        res.send(JSON.stringify({'error': true}));
    }
    res.end();
    return false;
});

app.post('/phone_setup', function (req, res) {
    var accountSid = 'ACa12477e734ee8b6fc2d4ef4104003420';
    var authToken = '4f8794f8562dd3dc07b82066c4af926a';

    //require the Twilio module and create a REST client

    var client = require('twilio')(accountSid, authToken);
    common.demoFormSubmit(req, config.mysql, q);
    var key = req.session.key = Math.floor(Math.random() * 90000) + 10000;

    client.calls.create({
        to: req.param('address'),
        from: "+12144777038",
        url: "http://auctionsoftwaremarketplace.com:2001/product/digitalcode?key=" + key,
        method: "GET",
        fallbackMethod: "GET",
        statusCallbackMethod: "GET",
        record: "false"
    }, function (err, call) {
        if (err === null) {
            res.send(JSON.stringify({'error': false}));
            res.end();
            return false;
        }
        else {
            res.send(JSON.stringify({'error': true, 'message': err.message}));
            res.end();
            return false;
        }
    });
});

app.get('/servertime', function (req, res) {
    var dateFormat = require('dateformat');
    datenow = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    res.send(datenow);
    res.end();
    return false;

});

app.post('/paypal/pay/', function (req, res) {
    if (typeof(req.body.secretkey) !== 'undefined' && req.body.secretkey == 'YTMNSRXYZ#$%%RMNOP') {
        req.body.success = true;
        var admin = require('../module/admin');
        var m = JSON.parse(req.body.payer);
        var k = [];
        for (i in m) {
            k.push(m[i]['id']);
            admin.updatePaid(res, config.mysql, q, m[i]['id']);
        }
        var ks = k.join(',');
        res.end();
        return false;
    }
    else {
        res.end();
        return false;
    }
});

app.post('/paypal/pkey/', function (req, res) {
    if (typeof(req.body.secretkey) !== 'undefined' && req.body.secretkey == 'YTMNSRXYZ#$%%RMNOP') {
        var fs = require('fs')
            , ini = require('ini');

        var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
        configed['section']['paypal']['preapproval_key'] = req.body.key;
        fs.writeFileSync('./config.ini', ini.stringify(configed));
        /*configure = require('../../configure');
         config = configure.app();
         $arr = {
         config : config
         }*/
    }
});

app.get('/location/:type/:val', function (req, res) {
    if (req.param('type') == 'country') {
        q.all([common.fetchStates(config.mysql, req.param('val'))]).then(function (results) {
            var states = results[0][0];
            res.send(JSON.stringify(states));
            res.end();
        });
    }
    if (req.param('type') == 'state') {
        q.all([common.fetchStates(config.mysql, req.param('val'))]).then(function (results) {
            var cities = results[0][0];
            res.send(JSON.stringify(cities));
            res.end();
        });
    }
});

app.get('/home', function (req, res) {
    $arr.register_error = '';
    $arr.register_fail = 0;
    $arr.login_error = '';
    $arr.login_fail = 0;
    $arr['registerdata'] = req.cookies;
    if (req.cookies.cookieemail) {
        $arr['cookieemail'] = req.cookies.cookieemail;
        $arr['cookiepassword'] = req.cookies.cookiepassword;
    }
    res.clearCookie('email');
    res.clearCookie('first_name');
    res.clearCookie('last_name');
    res.clearCookie('password');
    if (typeof(req.param('error')) !== 'undefined') {
        $arr.register_error = req.param('error');
        $arr.register_fail = 1;
    }
    if (typeof(req.param('lerror')) !== 'undefined') {
        $arr.login_error = req.param('lerror');
        $arr.login_fail = 1;
    }
    var module = require('../module');
    $arr.pagetitle = 'home';
    $arr.ptitle = 'index';
    function processIndex(row) {
        common.processIndex(row, req, res, $arr);
    }

    $arr.projects = module.projects(config.mysql, processIndex);
});

app.get('/customer', function (req, res) {
    customerio = require('../module/customerio');
    req.body.email = 'kkr@gmail.com';
    req.body.first_name = 'as';
    req.body.last_name = 'bs';
    customerio.uid = '12';
    customerio.inits();
    customerio.createCustomer({
        email: req.body.email,
        user: {firstName: req.body.first_name, lastName: req.body.last_name}
    });
    customerio.sendEmail({event: 'Signed Up', content: {user: req.body.first_name + ' ' + req.body.last_name}});
});

app.get(['/bidhistory/:id'], function (req, res) {
    bids = require('../module/bid');
    q.all([bids.bidHistory(req, config.mysql, q, 0)]).then(function (results) {
        $arr.bids = results[0][0];
        common.tplFile('bidhistory.tpl');
        common.headerSet(0);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get(['/activate/:id'], function (req, res) {
    var index = require('../module');
    index.activateAccount(req, config.mysql, q);
    res.writeHead(302, {
        'Location': '/login/?error=4'
    });
    res.end();
    return false;
});

app.get(['/', '/reg/:error', '/log/:lerror', '/reg/', '/log/'], function (req, res) {
    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;
    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;
	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;
    }


    $arr.register_error = '';
    $arr.register_fail = 0;
    $arr.login_error = '';
    $arr.login_fail = 0;
    Recaptcha = require('recaptcha').Recaptcha;

    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;

    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';

    console.log(PUBLIC_KEY + '&&' + PRIVATE_KEY);
    var recaptcha = '';
    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    //console.log($arr.captchahtml);

    $arr['registerdata'] = req.cookies;
    if (req.cookies.cookieemail) {
        $arr['cookieemail'] = req.cookies.cookieemail;
        $arr['cookiepassword'] = req.cookies.cookiepassword;
    }
    res.clearCookie('email');
    res.clearCookie('first_name');
    res.clearCookie('last_name');
    res.clearCookie('password');
    if (typeof(req.param('error')) !== 'undefined') {
        $arr.register_error = req.param('error');
        $arr.register_fail = 1;
    }
    if (typeof(req.param('lerror')) !== 'undefined') {
        $arr.login_error = req.param('lerror');
        $arr.login_fail = 1;
    }

    var module = require('../module');
    $arr.pagetitle = 'home';
    $arr.ptitle = 'index';

    var banner = require('../module/banner');
    var products = require('../module/products');
    q.all([products.dealsProducts(req, $arr.config.mysql, q), products.bestSellersProducts(req, $arr.config.mysql, q), products.productCategoryItems(req, $arr.config.mysql, q, 1), products.productCategoryItems(req, $arr.config.mysql, q, 3),products.homePageListingProducts(req, $arr.config.mysql, q),banner.listMyBanner(req,config.mysql,q,0)]).then(function (results) {
        var fs = require('fs')
            , ini = require('ini');

        //   console.log('checking products end');

        var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

        //  console.log('checking products end1');

        var mode = configed['section']['mode']['Maintenance_mode'];
        var msg = configed['section']['mode']['message'];
        //     console.log('checking products end1');

        //   console.log('checking products end');


        $arr.deals = results[0][0];
        $arr.sellers = results[1][0];
        $arr.cat1 = results[2][0];
        $arr.cat2 = results[3][0];
        $arr.home_page_listing = results[4][0];
        $arr.banner = results[5][0];
        
        $arr.mode = mode;
        $arr.msg = msg;
        if (mode == 'yes') {
            common.tplFile('maintenance.tpl');
        }
        else {
            common.tplFile('home.tpl');
        }
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }).fail(function (error){
        console.log("Error : "+error.stack);
        throw error;
    }).done();
});

app.get('/language', function (req, res) {
    var module = require('../module');
    $arr.ptitle = 'index';
    $arr.pagetitle = 'Live Auctions';
    function processIndex(row) {
        common.processIndex(row, req, res, $arr);
    }

    $arr.projects = module.live(config.mysql, processIndex);
});

app.get('/live', function (req, res) {
    var module = require('../module');
    $arr.ptitle = 'index';
    $arr.pagetitle = 'Live Auctions';
    function processIndex(row) {
        common.processIndex(row, req, res, $arr);
    }

    $arr.projects = module.live(config.mysql, processIndex);
});

app.get('/db', function (req, res) {
    config.mysql.query("CREATE TABLE IF NOT EXISTS `reviews` ( `id` int(100) NOT NULL AUTO_INCREMENT, `user_id` int(100) NOT NULL, `subject` varchar(100) NOT NULL, `message` varchar(100) NOT NULL, `date_added` datetime NOT NULL, `rating` int(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1", function () {
        res.end('Hi')
    });
});

app.get('/privacy', function (req, res) {

    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;
	    ;
    }
    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    admin = require('../module/admin');
    req.body.id = 5;
    q.all([admin.showstaticContent(req, res, config.mysql, q)]).then(function (results) {
        $arr.externalcss = ['home_1'];
        $arr['content'] = results[0][0][0];
        common.tplFile('static_pages.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get('/termcondition', function (req, res) {
    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    common.tplFile('termcondition.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req, res, $arr);
});

app.get('/search', function (req, res) {
    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }

    $arr['externalcss'] = ['ds-forms'];
    var dateFormat = require('dateformat');
    $arr.ajaxurl = (typeof(req.param('ajaxurl')) !== 'undefined') ? req.param('ajaxurl') : '';
    Recaptcha = require('recaptcha').Recaptcha;

    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;

    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();


    var module = require('../module');
    $arr.pagetitle = 'Search Projects';
    $arr.ptitle = 'search';
    $arr.cid_search = (typeof(req.param('cid')) !== 'undefined') ? req.param('cid') : 0;
    $arr.search_search = (typeof(req.param('search')) !== 'undefined') ? req.param('search') : '';
    $arr.pid_search = (typeof(req.param('projectid')) !== 'undefined') ? req.param('projectid') : 0;
    $arr.images_search = (typeof(req.param('images')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.freeshipping = (typeof(req.param('freeshipping')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.titlesonly = (typeof(req.param('titlesonly')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.uid = (typeof(req.param('uid')) !== 'undefined') ? req.param('uid') : 0;
    req.body.limit = 12;

    var data = module.searcherViaUrl(req, config.mysql, q);

    data.perlimit = req.body.limit;
    var products = require('../module/products');


    q.all([products.searchProducts(config.mysql, q, data, 1), products.searchProducts(config.mysql, q, data, 0)]).then(function (results) {

        $arr['projects'] = [];

        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({
            prelink: 'javascript:paginationSearch',
            current: data.spage,
            rowsPerPage: req.body.limit,
            totalResult: results[1][0].length,
            ajax: true
        });

        $arr.isbuynowsearch = $arr.isfeaturedsearch = $arr.isauctionsearch = '';
        if (req.param('type') == '1') {
            $arr.isauctionsearch = 'checked';
        }
        if (req.param('type') == '2') {
            $arr.isbuynowsearch = 'checked';
        }
        if (req.param('type') == '3') {
            $arr.isfeaturedsearch = 'checked';
        }

        $arr['pagination_html'] = paginator.render();
        $arr['projects']['project'] = products.shortDescribe(results[0][0]);

        common.tplFile('search.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);

    }).fail(function(error){
        console.log(error.stack);
        throw error;

    }).done();

});

app.post('/savesearch', function (req, res) {
    data = req.param;

    var uid = (typeof(req.session.userid) !== 'undefined') ? req.session.userid : 0;

    if (uid === 0) {
        res.json(0);
        return false;
    }
    else {
        var products = require('../module/products');
        req.body.title = req.param('title');
        q.all([products.savesearch(req, config.mysql, q)]).then(function (results) {
            res.json(1);
            return false;
        });
    }
});


app.post('/search', function (req, res) {

    $arr['externalcss'] = ['ds-forms'];
    var dateFormat = require('dateformat');
    var module = require('../module');

    $arr.pagetitle = 'Search Projects';
    $arr.ptitle = 'search';
    $arr.cid_search = (typeof(req.param('cid')) !== 'undefined') ? req.param('cid') : '';
    $arr.search_search = (typeof(req.param('search')) !== 'undefined') ? req.param('search') : '';
    $arr.pid_search = (typeof(req.param('projectid')) !== 'undefined') ? req.param('projectid') : 0;
    $arr.images_search = (typeof(req.param('images')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.freeshipping = (typeof(req.param('freeshipping')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.titlesonly = (typeof(req.param('titlesonly')) !== 'undefined') ? 'checked="checked"' : '';
    $arr.uid = (typeof(req.param('uid')) !== 'undefined') ? req.param('uid') : 0;
    $arr.local_pickup = (typeof(req.param('local_pickup')) !== 'undefined') ? 'checked="checked"' : '';
    req.body.limit = 12;
    var data = module.searcherViaUrl(req, config.mysql, q);
    data.perlimit = req.body.limit;
    var products = require('../module/products');
    q.all([products.searchProducts(config.mysql, q, data, 1), products.searchProducts(config.mysql, q, data, 0)]).then(function (results) {
        $arr['projects'] = [];
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({
            prelink: 'javascript:paginationSearch',
            current: data.spage,
            rowsPerPage: req.body.limit,
            totalResult: results[1][0].length,
            ajax: true
        });

        $arr['pagination_html'] = paginator.render();
        $arr['projects']['project'] = products.shortDescribe(results[0][0]);
        if (typeof(req.param('ajax')) === 'undefined') {
            common.tplFile('search.tpl');
            common.headerSet(1);
        }
        else {
            common.tplFile('search-ajax.tpl');
            common.headerSet(0);
        }
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get('/winner', function (req, res) {
    var module = require('../module');
    $arr['externalcss'] = ['penny'];
    function processIndex(row) {
        $arr['projects'] = row['projects'];
        common.tplFile('winner.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    }

    $arr.projects = module.winnerProducts(req, config.mysql, processIndex);
});

app.post('/search', function (req, res) {

    var module = require('../module');

    function processIndex(row) {
        common.processIndexajax(row, req, res, $arr);
    }

    $arr.projects = module.searcher(req, config.mysql, processIndex);

});

app.get('/future', function (req, res) {
    $arr.pagetitle = 'Future Auctions';
    $arr.ptitle = 'future';
    var module = require('../module');

    function processIndex(row) {
        common.processIndex(row, req, res, $arr);
    }

    $arr.projects = module.future(config.mysql, processIndex);
});

app.get('/closed', function (req, res) {
    $arr.pagetitle = 'Closed Auctions';
    $arr.ptitle = 'closed';
    var module = require('../module');

    function processIndex(row) {
        common.processIndex(row, req, res, $arr);
    }

    $arr.projects = module.closed(config.mysql, processIndex);
});

app.get('/shop', function (req, res) {
    $arr.ptitle = 'shop';
    $arr.pagetitle = 'Buy Now Auctions';
    $arr['buy_this'] = true;
    var module = require('../module');

    function processIndex(row) {
        common.processIndex(row, req, res, $arr);
    }

    $arr.projects = module.shop(config.mysql, processIndex);
});

app.get(['/reviews'], function (req, res) {

    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    var q = require('q');
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    var admin = require('../module/admin');
    var pagination = require('pagination');
    $arr['externalcss'] = ['star-rating',];
    $arr['externaljs'] = ['star-rating'];
    $arr['reviewaction'] = false;

    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    q.all([admin.allreviews(req, config.mysql, q, 0), admin.allreviews(req, config.mysql, q, 1)]).then(function (result) {
        $arr['review'] = result[0][0];
        $arr['reviews'] = result[1][0].length;
        var paginator = new pagination.SearchPaginator({
            prelink: '/reviews/',
            current: req.body.page,
            rowsPerPage: 10,
            totalResult: $arr['reviews']
        });

        $arr['pagination_html'] = paginator.render();
        common.tplFile('reviews.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get(['/how_it'], function (req, res) {

   if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    admin = require('../module/admin');
    req.body.id = 6;
    q.all([admin.showstaticContent(req, res, config.mysql, q)]).then(function (results) {
        $arr.externalcss = ['home_1'];
        $arr['content'] = results[0][0][0];
        common.tplFile('static_pages.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.post(['/dispute'], function (req, res) {

    common.checkLogin(req, res, 0);
    var dispute = require('../module/dispute');
    var q = require('q');

    q.all([dispute.addDispute(req, config.mysql, q)]).then(function (results) {
        res.writeHead(302, {
            'Location': '/dispute/submitted'
        });
        res.end();
        return false;
    });
});

app.get(['/dispute', '/dispute/:action'], function (req, res) {
    var q = require('q');
    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    var admin = require('../module/admin');
    var pagination = require('pagination');
    $arr['action_sent'] = (typeof(req.param('action')) === 'undefined') ? false : true;
    $arr['externalcss'] = ['star-rating',];
    $arr['externaljs'] = ['star-rating'];
    $arr['reviewaction'] = false;

    q.all([admin.reviews_dispute(req, config.mysql, q, 0), admin.reviews_dispute(req, config.mysql, q, 1)]).then(function (result) {
        $arr['review'] = result[0][0];
        $arr['reviews'] = result[1][0].length;
        common.tplFile('dispute.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);

    });

});

app.get(['/terms'], function (req, res) {

    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();
    admin = require('../module/admin');
    req.body.id = 4;
    q.all([admin.showstaticContent(req, res, config.mysql, q)]).then(function (results) {
        $arr.externalcss = ['home_1'];
        $arr['content'] = results[0][0][0];
        common.tplFile('static_pages.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });


});

app.get(['/about'], function (req, res) {

    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    admin = require('../module/admin');
    req.body.id = 1;
    q.all([admin.showstaticContent(req, res, config.mysql, q)]).then(function (results) {
        $arr.externalcss = ['home_1'];
        $arr['content'] = results[0][0][0];
        common.tplFile('static_pages.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get(['/about/buyers'], function (req, res) {
    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    admin = require('../module/admin');
    req.body.id = 3;
    q.all([admin.showstaticContent(req, res, config.mysql, q)]).then(function (results) {
        $arr.externalcss = ['home_1'];
        $arr['content'] = results[0][0][0];
        common.tplFile('static_pages.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});
app.get('/sublevelcategory/:id',function(req,res) { 
 var products = require('../module/products');	
 q.all([products.getCategory(req,$arr.config.mysql,q)]).then(function(results)
 {	
   q.all([products.subLevelCategory(req,$arr.config.mysql,q,results[0][0][0]['lft'],results[0][0][0]['rgt'])]).then(function(results)
   {
         res.send(JSON.stringify(results[0][0]));
         res.end();
         return false;
   });
});   
});
app.get('/subcategory/:id',function(req,res) {
   var products = require('../module/products');
   q.all([products.subCategory(req,$arr.config.mysql,q)]).then(function(results)
   {

   	    if(results[0][0].length > 0)
   	    {
   	      $arr.level = results[0][0][0]['depth'];
   	      $arr.categories = results[0][0]; 	
          common.tplFile('category-box.tpl');
          common.headerSet(1);
		  common.loadTemplateHeader(req,res,$arr);        
   	    }	
   	    else
   	    {
   	    	res.send('-');
   	    	res.end();
   	    	return false;
   	    }	
   });    
});
app.post(['/contact'], function (req, res) {

    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    var fs = require('fs')
        , ini = require('ini');

    var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
    var contact_email = configed['section']['general']['contactus'];

    message = require('../module/message');
    q = require('q');


    var dat = require('date-util');
    //req.body.toemail = result[0][0][0]['email'];
    req.body.toemail = contact_email;

    // req.body.pid = 1;


    req.body.r_id = Date.parse(new Date()) / 1000;
    message.addmessages(req, config.mysql, q);
    $arr.message = 'Your message has been submitted to the admin!';

    $arr.externalcss = ['home_1'];
    common.tplFile('contactus.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req, res, $arr);


});

app.get(['/about/contacts', '/contact'], function (req, res) {
    if (req.session.ref && req.session.media) {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    else {
	    var referals = (typeof(req.param('ref')) !== 'undefined') ? req.param('ref') : 0;
	    var media = (typeof(req.param('med')) !== 'undefined') ? req.param('med') : '';
	    req.session.ref = referals;
	    req.session.media = media;

	    $arr.refers = req.session.ref;
        $arr.med = req.session.media;

    }
    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    $arr.externalcss = ['home_1'];
    common.tplFile('contactus.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req, res, $arr);
});

app.get(['/sellers'], function (req, res) {
    if (req.session.ref != 0 && req.session.media != '') {
        $arr.refers = req.session.ref;
        $arr.med = req.session.media;
    }
    else {
        $arr.refers = 0;
        $arr.med = '';
    }
    Recaptcha = require('recaptcha').Recaptcha;
    //  var PUBLIC_KEY  = config.captachapublickey,
    //  PRIVATE_KEY = config.captachaprivatekey;
    var PUBLIC_KEY = '6LdlXQkTAAAAAG2mci850KabQNdp5VhAUieHe243',
        PRIVATE_KEY = '6LdlXQkTAAAAADruTtG_-n41HUhApv8jkWslTvuV';


    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
    $arr.captchahtml = recaptcha.toHTML();

    admin = require('../module/admin');
    req.body.id = 2;
    q.all([admin.showstaticContent(req, res, config.mysql, q)]).then(function (results) {
        $arr.externalcss = ['home_1'];
        $arr['content'] = results[0][0][0];
        common.tplFile('static_pages.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });
});

app.get(['/blog/', '/blog/:id'], function (req, res) {
    $arr.ptitle = 'Blogs';
    req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;

    req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
    $arr.pagetitle = 'Site Blogs';
    var module = require('../module');
    var common = require('../module/common');
    var pagination = require('pagination');

    req.body.limit = 10;

    function processIndex(row) {
        if (req.body.id > 0) {
            $arr.blog = row[0][0];
            $arr.rblog = row[1];
            common.tplFile('showblog.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req, res, $arr);
        }
        else {
            try {
                $arr.blog = row[0];
                $arr.rblog = row[1];

                $arr['pagination'] = row[2].length;

                var paginator = new pagination.SearchPaginator({
                    prelink: '/blog',
                    current: req.body.page,
                    rowsPerPage: 10,
                    totalResult: $arr['pagination']
                });
                $arr['pagination_html'] = paginator.render();
                common.tplFile('bloglist.tpl');
                common.headerSet(1);
                common.loadTemplateHeader(req, res, $arr);
            } catch (e) {
                console.log("Error in blog " + e.stack);
            }
        }
    }

    if (req.body.id > 0) {
        module.showblog(req, config.mysql, processIndex);
    }
    else {
        module.blog(req, config.mysql, processIndex);
    }
});


app.post('/changetheme', function (req, res) {
    if (typeof(req.session.themeno) !== 'undefined') {
        delete req.session.themeno;
        req.session.themeno = req.body.themeno;
    }
    else {
        req.session.themeno = req.body.themeno;
    }
    res.writeHead(302, {
        'Location': req.body.gopage
    });
    res.end();
    return false;
});


app.get('/checkbidtime',function(req, res){
  
    req.body.cnt=0;
    req.body.cnt2=0;
    unpaid = require('../module/unpaid');
    message = require('../module/message');


    /*Unlist Memebers */

    q.all([unpaid.unlistmembers(req,config.mysql,q,0)]).then(function(resultsx){
        for(var j = 0;j< resultsx[0][0].length; j++ ){
            notpaid = resultsx[0][0][j];
            
            //console.log(notpaid);
            
            req.body.projectid = resultsx[0][0][j].project_id;
            req.body.userid = resultsx[0][0][j].user_id;
            req.body.bidid = resultsx[0][0][j].id;
            unpaid.extendtime(req,config.mysql,q);
            unpaid.declinebid(req,config.mysql,q);
            unpaid.debuynow(req,config.mysql,q);
            unpaid.deinvoice(req,config.mysql,q);
            unpaid.deproxy(req,mysql,q);
            //console.log(req.body.projectid+'-'+resultsx[0][0][j].user_id+'-'+resultsx[0][0][j].id);

        }   

    });

    q.all([unpaid.unlistmembers(req,config.mysql,q,1)]).then(function(resultsx){

        for(var k = 0;k< resultsx[0][0].length; k++ ){
            
            outdated = resultsx[0][0][k];
            req.body.projectid = resultsx[0][0][k].project_id;
            req.body.userid = resultsx[0][0][k].user_id;
            unpaid.declinebid(req,config.mysql,q);
            unpaid.debuynow(req,config.mysql,q);
            unpaid.deinvoice(req,config.mysql,q);
            unpaid.deproxy(req,mysql,q);

        }


    });

    res.end();
   return false;


});


app.get('/remainder',function(req, res){
  
    req.body.cnt=0;
    req.body.cnt2=0;
    unpaid = require('../module/unpaid');
    message = require('../module/message');


    /*Unlist Memebers */

    q.all([unpaid.unlistmembers(req,config.mysql,q,0)]).then(function(resultsx){
        for(var j = 0;j< resultsx[0][0].length; j++ ){
            notpaid = resultsx[0][0][j];
            
            //console.log(notpaid);
            
            req.body.projectid = resultsx[0][0][j].project_id;
            req.body.userid = resultsx[0][0][j].user_id;
            req.body.bidid = resultsx[0][0][j].id;
            unpaid.extendtime(req,config.mysql,q);
            unpaid.declinebid(req,config.mysql,q);
            unpaid.debuynow(req,config.mysql,q);
            unpaid.deinvoice(req,config.mysql,q);
            unpaid.deproxy(req,config.mysql,q);
            //console.log(req.body.projectid+'-'+resultsx[0][0][j].user_id+'-'+resultsx[0][0][j].id);

        }   

    });

    q.all([unpaid.unlistmembers(req,config.mysql,q,1)]).then(function(resultsx){

        for(var k = 0;k< resultsx[0][0].length; k++ ){
            
            outdated = resultsx[0][0][k];
            
            req.body.projectid = resultsx[0][0][k].project_id;
            req.body.userid = resultsx[0][0][k].user_id;
            unpaid.declinebid(req,config.mysql,q);
            unpaid.debuynow(req,config.mysql,q);
            unpaid.deinvoice(req,config.mysql,q);
            unpaid.deproxy(req,config.mysql,q);


        }


    });

    q.all([unpaid.listmembers(req,config.mysql,q)]).then(function(results){
    products = require('../module/products');
    if(results[0][0].length > 0){
      for(var i = 0; i <= results[0][0].length; i++) {
       
        details = results[0][0][i];
        req.body.details = details;
        req.body.first_name = details.first_name;
        
        delete customerio;
        localm  = require('../module/localmail');
        twillio = require('../module/twillio');

        console.log(details.first_name);

        q.all([products.usermailnotify(req,config.mysql,q,details.user_id,6),products.usersmsnotify(req,config.mysql,q,details.user_id,6),unpaid.listmembersbyid(req,config.mysql,q,details.user_id,details.project_id),localm.mailtemps(req,config.mysql,q,'winner_remainder'),twillio.smstemps(req,config.mysql,q,'winner_remainder')]).then(function(checking){   

            //console.log(checking[2][0][0]);
            details2 = checking[2][0][0];  
            if(checking[0][0].length > 0){

                if(global.emailcio.status == 'yes'){


                 
                console.log(details2);
                customerio = require('../module/customerio');
                customerio.uid = details2.user_id;
                customerio.inits();           
                customerio.createCustomer({email:details2.email,user:{firstName:details2.first_name,lastName:details2.last_name}});        
                customerio.sendEmail({event:'winner_remainder',content:{siteurl:config.url,user:details2.first_name+' '+details2.last_name,title:details2.title,price: 1*(details2.proposed_amount+details2.shipping_price),url:global.url+'/product/payment/'+details2.project_id}});

         

                    
                }

                else if(global.emaillocal.status == 'yes'){
                 

                    
                         
                        
                    if(checking[3][0][0]){
                        
                        
                        
                        var template = checking[3][0][0].template;
                        var subject = checking[3][0][0].subject;
                        console.log('details2.title');
                        console.log(details2.title);
                        
                        template = template.replace('{{event.title}}' , details2.title);
                        template = template.replace('{{event.siteurl}}' , config.url);
                        template = template.replace('{{event.user}}' , details2.first_name+' '+details2.last_name);
                        template = template.replace('{{event.price}}' ,1*(details2.proposed_amount+details2.shipping_price));
                        template = template.replace('{{event.url}}' , global.url+'/product/payment/'+details2.project_id);
                        template = template.replace('{{event.title}}' , details2.title);

                        localm.sendmail(template,subject,details2.email);

                    }

                    else{

                        console.log("No template named winner_remainder");
                    }

                        
                    

                }
            
                else{ console.log('No Mail Delivery method is selected'); }
            }
            else{

                console.log('Email method is not selected for Bid Remainder'+details2.email);
            }

            if(checking[1][0].length > 0){

              console.log('*************************************************');
                if(global.smstwo.status == 'yes'){

                    

                    

                    if(checking[4][0].length > 0){

                        
                        var template = checking[4][0][0].template;
                        console.log(template);              
                        template = template.replace('{{event.siteurl}}' , config.url);
                        template = template.replace('{{event.user}}' , details2.first_name+' '+details2.last_name);
                        template = template.replace('{{event.title}}' , details2.title);
                        template = template.replace('{{event.price}}' ,1*(details2.proposed_amount+details2.shipping_price));
                        template = template.replace('{{event.title}}' , details2.title);

                        twillio.sendsms(template,details2.phone);

                    }

                    else{

                        console.log('No template name winner_remainder')
                    }


                    



                }
            }
            else{

                console.log('SMS template not selected for winner_remainder'+details2.email)
            }



            
        });

      }
    }




  });
   
   res.end();
   return false;

});


app.get(['/ajaxquestions/:cid/:pid', '/ajaxquestions/:cid'], function (req, res) {
    var q = require('q');
    req.body.pid = (typeof(req.param('pid')) === 'undefined') ? 0 : req.param('pid');

    q.all([common.categoriesAllQuestion(req, config.mysql, q), common.productQuestion(req, config.mysql, q)]).then(function (results) {

        $arr.questions = results[0][0];
        $arr.answers = results[1][0];

        for (i in $arr.questions) {
            $arr.questions[i]['multiple'] = $arr.questions[i]['value'].split('|');
            $arr.questions[i]['values'] = [$arr.questions[i]['default']];

			if($arr.answers.length > 0)
			{
				for (j in $arr.answers) {
					if ($arr.questions[i]['id'] == $arr.answers[j]['question_id']) {
						$arr.questions[i]['values'] = $arr.answers[j]['value'].split(',');
					}
				}
			}

        }

        common.tplFile('aquestions.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req, res, $arr);
    });

});

app.get('/verifyno',function(req,res){
     var dashboard = require('../module/dashboard');
     var accountSid = global.smstwo.sid;
     var authToken = global.smstwo.token;
     
     //require the Twilio module and create a REST client
     var client = require('twilio')(accountSid, authToken);
         req.body.phno = (typeof(req.param('p')) === 'undefined') ? 0 : req.param('p');
         client.outgoingCallerIds.create({
         friendlyName: req.session.first_name,
         phoneNumber: req.body.phno,
         statusCallback: global.url+"/events?id="+req.session.userid,
     
    }, function(err, callerId) {

        if(err){

            if(err.code == 21450){
                req.body.Called = req.body.phno;
                req.body.uid = req.session.userid;
                dashboard.verified_phone(req,config.mysql,q);
                console.log(err);
                res.send(err.message);
            }
            else{
                console.log(err);
                res.send(err.message);
            }
            return false;
        }
        else{

            console.log(callerId);
            res.send(callerId.validation_code);
             return false;

        }
     

    });


    console.log('message sent')
    
});
 
app.post('/events',function(req,res){
    var dashboard = require('../module/dashboard');
    
    console.log('*********************'+req.body.VerificationStatus+req.param('id')+req.body.FriendlyName);
    if(req.body.VerificationStatus == 'success'){
        req.body.phno = req.body.Called;
        req.body.uid = req.param('id');
        dashboard.verified_phone(req,config.mysql,q);
        res.writeHead(302, {
            'Location': '/dashboard/notification_manager'
        });
        
    }
    else{

        res.writeHead(302, {
            'Location': '/dashboard/notification_manager'
        });
        
    }
    res.end();
    return false;

});

app.get('/load_state/:country_id', function (req, res) {
    var q = require('q');
    req.body.cid = (typeof(req.param('country_id')) === 'undefined') ? 0 : req.param('country_id');

    q.all(common.getState(req, config.mysql, q)).then(function (results) {
        $arrState = results[0];
        var str = '';
        //console.log($arrState);
        str = '<select class="form-control" name="state" id="state" data-parsley-required-message="Please select state">';
        str += '<option value="" selected>Select State </option>'
        try {
            for (i in $arrState) {
                //console.log("Res is " + JSON.stringify($arrState[i]['state']));
                str += '<option value="' + $arrState[i]['state'] + '">' + $arrState[i]['state'] + '</option>';
            }
            str += '</option>'
            res.send(str);
        } catch (e) {
            console.log("Error in getting state" + e);
        }
    });

});


module.exports = app;
