var q = require('q');
var Paypal = require('paypal-adaptive');

var paypalSdk = new Paypal({
    appId:    config.paypal.paypal_api,
    userId:    config.paypal.paypal_username,
    password:  config.paypal.paypal_password,
    signature: config.paypal.paypal_signature,
    sandbox:   (config.paypal.sandbox == 'yes') ? true : false
});
//console.log(paypalSdk);
//console.log(config.paypal);
exports.bulkpaymentPaypal = function(req,paypaladdress,cart_id,callback)
{
    console.log('Bhaurao');
    var payload = {
        requestEnvelope: {
            errorLanguage:  'en_US'
        },
        actionType:     'PAY',
        currencyCode:   'USD',
        feesPayer:      'EACHRECEIVER',
        memo:           'Chained payment example',
        cancelUrl:      config.url+'/paypal/cancelbulkurl',
        returnUrl:      config.url+'/paypal/successbulkurl',
        ipnNotificationUrl: config.url+'/paypal/successcart/'+ cart_id,
        receiverList: {
            receiver: paypaladdress
        }
    };


    paypalSdk.pay(payload, function (err, response) {
        if (err) {
            console.log('********** In Pay Error**********************');
            //console.log(err);
            console.log(response);
            //console.log(response);
            //console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
            callback(err,response);
        } else {
            // Response will have the original Paypal API response
            console.log('********** In Sucesss With res **********************');
            console.log(response);
            callback(err,response);
            // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily
            //console.log('Redirect to %s', response.paymentApprovalUrl);
            //console.log('Redirect to %s', response.payKey);
        }
    });
}
exports.paymentPaypal = function(req,price,buynowid,paypaladdress,callback)
{
    console.log('Biraj');
    var payload = {
        requestEnvelope: {
            errorLanguage:  'en_US'
        },
        actionType:     'PAY',
        currencyCode:   'USD',
        feesPayer:      'EACHRECEIVER',
        memo:           'Chained payment example',
        cancelUrl:      config.url+'/paypal/cancelurl',
        returnUrl:      config.url+'/paypal/cancelurl',
        ipnNotificationUrl: config.url+'/paypal/success/'+ buynowid,
        receiverList: {
            receiver: paypaladdress
        }
    };
    console.log(payload);
    paypalSdk.pay(payload, function (err, response) {
        if (err) {
            console.log('********** In Pay errr**********************');
            console.log(response);
            //console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
            callback(err,response);
        } else {
            // Response will have the original Paypal API response
            console.log('********** In Pay Success**********************');
            console.log(response);
            callback(err,response);
            // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily
            //console.log('Redirect to %s', response.paymentApprovalUrl);
            //console.log('Redirect to %s', response.payKey);
        }
    });
}
exports.validpaypalemail = function(req,paypaladdress,callback)
{
    var payload = {
        requestEnvelope: {
            errorLanguage:  'en_US'
        },
        actionType:     'PAY',
        currencyCode:   'USD',
        feesPayer:      'EACHRECEIVER',
        memo:           'Chained payment example',
        cancelUrl:      config.url+'/paypal/cancelurl',
        returnUrl:      config.url+'/paypal/cancelurl',
        ipnNotificationUrl: config.url+'/paypal/success/1',
        receiverList: {
            receiver: [
                {
                    email:  paypaladdress,
                    amount: '1'
                }
            ]
        }
    };
    paypalSdk.pay(payload, function (err, response) {
        if (err) {
            console.log('jjjjjjjjjjjjjjjjjjjjjjj');
            console.log(err);
            console.log(response);
            console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
            callback(err,response);
        } else {
            // Response will have the original Paypal API response
           console.log(err);
            console.log(response);
            callback(err,response);
            // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily
            console.log('Redirect to %s', response.paymentApprovalUrl);
            console.log('Redirect to %s', response.payKey);
        }
    });
}
