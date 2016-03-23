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
var cryptos =  require('../module/crypto.js');

//required js
var configure = require('../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
}

var membership = require('../module/membership');
app.post('/package', function(req, res) {
	
    q.all([membership.selectPlan(req,config.mysql,q),membership.getUserRole(req,config.mysql,q)]).then(function(result) {
        correct_plan = false;
        var data = []; 
        var plan = result[0][0];
        var urole = result[1][0];
        for(i in plan)
        {           	
           if(plan[i]['id'] == req.body.plan && plan[i]['membership_id'] == req.body.membership)
           {
                correct_plan = true;
                data = plan[i];
           }
        }	
        if(!correct_plan)
        {
        	res.writeHead(302,{'Location':'/membership/setup'});
            res.end();return false;
        }	
        else
        {
        	var dateFormat = require('dateformat');
        	d = data.date_added = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"); 
            data.renewal_period = data.date_added;        	

        	data.status = 'unpaid';
            data.paid_date = '0000-00-00 00:00:00';
            data.paid = 0;
  
        	if(data.amount == 0)
        	{
        		data.status = 'active';
        		data.paid_date = data.date_added;
                data.paid = 0;
        	}	
 
        	if(urole.length > 0)
        	{
        		membership.updateUserRole(req,config.mysql,q,data,1);        		
        	}
        	else
        	{
        		membership.updateUserRole(req,config.mysql,q,data,0);
        	}
        	if(data.status == 'active')
        	{
        		q.all([membership.getUserMembership(req,config.mysql,q,req.session.userid)]).then(function(result2) {
                    console.log(result2[0][0]);
		            req.session.permission = false;
		            var permissions = result2[0][0];           
		            if(permissions.length > 0)
		            {
		              req.session.permission = true;
		            }  
		            for(i in permissions)
		            {
		               req.session[permissions[i]['varname']] = permissions[i]['value'];
		            }	
		            res.writeHead(302,{'Location':'/'});
                    res.end();return false;
		       });
        	}
        	else
        	{
        		res.writeHead(302,{'Location':'/membership/setup'});
                res.end();return false;
        	}
        }	           
    });
});

app.get('/pay', function(req, res) {
	q.all([user.userInfo(req,config.mysql,q,req.session.userid,['balance','reserve_amount']),membership.selectPlan(req,config.mysql,q),membership.getUserRole(req,config.mysql,q)]).then(function(results){      
		var plan = result[1][0];
		var urole = result[2][0];
		for(i in plan) {           	
			if(plan[i]['id'] == urole[0]['plan_id']) {	
				data = plan[i];
			}
		}		
		if(results[1][0][0]['balance'] - results[1][0][0]['reserve_amount'] <= data['amount']) {
			req.session.page = config.url+'/membership/pay/';
			res.writeHead(302, {
				'Location': '/package'
			});
			res.end();return false;
		}  
	});
});

app.post('/pay', function(req, res) {
	if(typeof(req.body.paymentMethodNonceInputField) === 'undefined' || req.body.paymentMethodNonceInputField == '')

	{

		req.body.paymentMethodNonceInputField = req.body.payment_method_nonce;

	}

	if(typeof(req.body.payment_method_nonce) === 'undefined' || req.body.payment_method_nonce == '')

	{

		req.body.payment_method_nonce = req.body.paymentMethodNonceInputField;

	}
	console.log(req.body);

	if(req.param('savecard') == 1 || req.param('savepaypal') == 1)

	{

		var braintrees = require('../module/braintrees');

		global.bgateway.mysql = $arr.config.mysql;

		braintrees.saveCreditCard(global.bgateway,req,res,payProcess);

	}

	else if(req.param('paymentmethod') == 'cc' || req.param('paymentmethod') == 'paypal')
	{

		payProcess(1,'');

	}

	else
	{

		creditcard = require('../module/creditcard');

		q.all([creditcard.PickPayments(req,$arr.config.mysql,q,req.param('paymentmethod'))]).then(function(resu)

		{


			if(resu[0][0][0].user_id == req.session.userid)

			{

				req.body.token = resu[0][0][0].token_id;

				payProcess(1,'');

			}

			else

			{

				res.writeHead(302, {

					'Location': '/membership/setup/Invalid Card'

				});

				res.end();return false;

			}



		});

	}



	function payProcess(err,resp)

	{

		if(err == 0)

		{

			res.writeHead(302, {

				'Location': '/membership/setup/'+resp

			});

			res.end();

			return false;

		}
		q.all([membership.getUserPlan(req,$arr.config.mysql,q)]).then(function(member)
		{
			var price = member[0][0][0].amount;

			if(req.param('savecard') == 1)

			{

				var pay = {

					amount: price,

					paymentMethodToken: resp.creditCard.token,

					options: {

						submitForSettlement: true

					}};

			}

			else if(req.param('savepaypal') == 1)

			{

				var pay = {

					amount: price,

					paymentMethodToken: resp.paypalAccount.token,

					options: {

						submitForSettlement: true

					}};

			}

			else if(typeof(req.body.token) !== 'undefined')

			{

				var pay = {

					amount: price,

					paymentMethodToken: req.body.token,

					options: {

						submitForSettlement: true

					}};

			}

			else

			{

				var pay = {

					amount: price,

					paymentMethodNonce: req.param('paymentMethodNonceInputField'),

					options: {



						submitForSettlement: true

					}};
				console.log(pay);

			}



			var ml = global.bgateway.transaction.sale(pay, function (err, result) {

				console.log(result);

				if(result.success)

				{

					if(result.transaction.status)

					{

						var data = [];
						data.id = member[0][0][0].id;
						data.name = member[0][0][0].name;

						var dateFormat = require('dateformat');

						d = data.date_added = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
						console.log(data.date_added);
						var today = new Date(data.date_added);
						console.log(today);
						if(data.format == 'D')
						{
							today.setDate(today.getDate()+data.length);
						}

						if(data.format == 'M')
						{
							today.setMonth(today.getMonth()+1+data.length);
						}

						if(data.format == 'Y')
						{
							today.setYear(today.getYear()+data.length);
						}


						console.log(today);
						data.status = 'active';
						data.paid_date = data.date_added;
						data.paid = 1;
						data.renewal_period = dateFormat(new Date(today),"yyyy-mm-dd HH:MM:ss");
						membership.updateUserRole(req,config.mysql,q,data,1);
						payments = require('../module/payment');
						payments.transactionid = 0;
						payments.gateway = 'braintree';
						payments.sessionsdata = [];
						payments.sessionsdata.title = data.name+' Membership';
						payments.sessionsdata.email = req.session.email;
						payments.sessionsdata.url = '';
						payments.sessionsdata.userid = req.session.userid;
						payments.sessionsdata.first_name = req.session.first_name;
						payments.sessionsdata.last_name = req.session.last_name;
						payments.payid = data.id;
						payments.type = 'membership';
						payments.name = data.name+' Membership';
						payments.amount = data.amount;
						console.log(payments);
						//user.reduceBalance(req,config.mysql,q,payments.sessionsdata.userid,payments.amount);
						payments.insertInvoice();

						delete req.session.permission;
						delete req.session.membershipstatus;

						q.all([membership.getUserMembership(req,config.mysql,q,req.session.userid),membership.getUserRolelogin(req,config.mysql,q,req.session.userid)]).then(function(result2) {

							console.log(result2[0][0]);
							req.session.permission = false;
							var permissions = result2[0][0];
							if(permissions.length > 0)
							{
								req.session.permission = true;
							}
							for(i in permissions)
							{
								//permission[i] = [];
								req.session[permissions[i]['varname']] = permissions[i]['value'];

							}

							if(result2[1][0].length > 0)
							{
								req.session.membershipstatus = result2[1][0][0]['status']
							}
							else
							{
								req.session.membershipstatus = '';
							}



						});


						res.writeHead(302, {

							'Location': '/'

						});

						res.end();return false;


					}

					else

					{

						$arr['error'] = result.transaction.processorResponseText;

						res.writeHead(302, {

							'Location': '/membership/setup/'+$arr['error']

						});

						res.end();return false;

					}

				}

				else

				{

					$arr['error'] = '';



					$arr['error'] += result.message;



					res.writeHead(302, {

						'Location': '/membership/setup/'+$arr['error']

					});

					res.end();

					return false;

				}

			});

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

app.get(['/setup','/setup/:error'], function(req, res) {


	$arr.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
	q.all([membership.getUserRole(req,config.mysql,q),membership.selectRoles(req,config.mysql,q),membership.selectPlan(req,config.mysql,q),membership.selectPackageDetail(req,config.mysql,q)]).then(function(result) {
		//console.log(result[0][0]);
		console.log('jjjjjjjjjjjjjjjjjjjj');

		console.log(result[0][0]);
		$arr.package_detail = result[3][0];
		console.log(result[2][0]);
		console.log(result[0][0].length);
		if(result[0][0].length > 0 && result[0][0][0]['status'] == 'unpaid' && result[0][0][0]['plan_id'] > 0 && typeof(req.param('update')) === 'undefined')
		{
			plan =  result[2][0];
			console.log(plan);
			data = [];
			for(i in plan)
			{
				if(plan[i]['id'] == result[0][0][0]['plan_id'])
				{

					data = plan[i];
				}
			}
			var braintrees = require('../module/braintrees');

			braintrees.generateToken(global.bgateway,templateCallback,req);

			function templateCallback(err,response)

			{

				creditcard = require('../module/creditcard');

				q.all([creditcard.AllMyPayments(req,$arr.config.mysql,q)]).then(function(results)
				{



					$arr.creditCards =  results[0][0];

					console.log('response callback');

					$arr.clientToken = response.clientToken;
					$arr['data'] = data;
					common.tplFile('membership-payment.tpl');
					common.headerSet(1);
					common.loadTemplateHeader(req,res,$arr);

				});
			}
		}
		else if(result[0][0].length == 0 || result[0][0][0]['status'] != 'active')
		{
			$arr['membership'] = result[1][0];
			$arr['plans'] = result[2][0];
			common.tplFile('membership-select.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
		}
		else
		{
			$arr['membership'] = result[1][0];
			$arr['plans'] = result[2][0];
			common.tplFile('membership-select.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
		}



	});

});

module.exports = app;