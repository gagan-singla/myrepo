/**
 * Created by Raj on 9/28/2015.
 */

var fs = require('fs');
var mysqli = require('./mysqli');
var dateFormat = require('dateformat');

exports.getAdvertiseDetails = function (req, mysql, q, count) {
    $mysqli = {}
    var defered = q.defer();
    var page = req.body.page;
    var perlimit = 5;
    page = (page > 0) ? (page - 1) * perlimit : 0;
    if (count == 0) {
        var limit = 'limit ' + page + ',' + perlimit;
    }
    else {

        limit = "";
    }
    $mysqli = {limit: limit};

    strQuery = mysqli.mysqli($mysqli, "get_adwords_details");
    var defered = q.defer();
    var escape_data = [req.session.userid];

    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());

    return defered.promise;

}

exports.saveAdwords = function(req,mysql,q)
{
    req.body.id = 0;
    $mysqli =  {};
    req.body.target_section = (typeof(req.body.target_section) != 'undefined') ? req.body.target_section.toString() : '';
    req.body.days = (typeof(req.body.days) != 'undefined') ? req.body.days.toString() : '';
    req.body.end_date = (typeof(req.body.end_date) != 'undefined') ? req.body.end_date : '';
    img = req.files.ad_image.name;
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");

    var defered = q.defer();
    cdate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    if(req.body.id <= 0)
    {
        strQuery = mysqli.mysqli($mysqli,"insert_adwords");
        var escape_data =  [req.body.ad_name,
            req.body.ad_title,
            req.body.ad_content,
            req.body.ad_url,
            img,
            req.body.show_campaign,
            req.body.days,
            req.body.target_section,
            req.body.keywords,
            req.body.per_click_amount,
            req.body.per_day_amount,
            req.session.userid,
            cdate,
        	req.body.end_date];

    }

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;
};

exports.updateAdwords = function(req,mysql,q)
{
    req.body.target_section = (typeof(req.body.target_section) != 'undefined') ? req.body.target_section.toString() : '';
    req.body.days = (typeof(req.body.days) != 'undefined') ? req.body.days.toString() : '';
    $mysqli =  {};
    if(typeof(req.files.ad_image) !== 'undefined')
    {

        fs.unlink(global.path+"/public/uploads/"+req.body.pre_image, function (err) {
            if (!err)
                console.log('successfully deleted '+req.body.pre_image);
        });
        img =  req.files.ad_image.name;

    }
    else{

        var img =  req.body.pre_image;
    }
    req.body.end_date = (req.body.show_campaign == 0 ? '' : dateFormat(req.body.end_date,'yyyy-mm-dd') )
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    //req.body.end_date = ;
    var defered = q.defer();
    cdate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    strQuery = mysqli.mysqli($mysqli,"update_adwords");
    var escape_data =  [req.body.ad_name,
        req.body.ad_title,
        req.body.ad_content,
        req.body.ad_url,
        img,
        req.body.show_campaign,
        req.body.days,
        req.body.target_section,
        req.body.keywords,
        req.body.per_click_amount,
        req.body.per_day_amount,
        req.session.userid,
        cdate,
        req.body.end_date,
        req.body.id];


    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;
}

// Reset No of clicks
exports.resetAdwordsDaysClick = function(mysql,q)
{
    $mysqli = {};

    var defered = q.defer();

    strQuery = mysqli.mysqli($mysqli,"reset_no_of_clicks");

    query =  mysql.query(strQuery,defered.makeNodeResolver());

    return defered.promise;

}
exports.adwords_op = function(req,mysql,q) {
    $mysqli = {}
    var defered = q.defer();

    strQuery = mysqli.mysqli($mysqli,"adwords_delete_pause");

    if(req.body.type == 'active'){
        var escape_data = ['pause',req.body.id,req.session.userid]
    }else if(req.body.type == 'pause'){
        var escape_data = ['active',req.body.id,req.session.userid]
    }else if(req.body.type == 'remove'){
        var escape_data = ['remove',req.body.id,req.session.userid]
    }

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;

}

exports.getAdwordsById = function(req,mysql,q) {
    $mysqli = {}
    var defered = q.defer();

    strQuery = mysqli.mysqli($mysqli,"get_adwords_by_id");

    var escape_data = [req.body.id]

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;

}

exports.update_deposit = function(req,mysql,q) {
    $mysqli = {}
    var defered = q.defer();

    strQuery = mysqli.mysqli($mysqli,"update_deposit");

    var escape_data = [req.body.amount,req.session.userid]

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;

}


exports.update_deposit_onclick = function(req,mysql,q) {
    $mysqli = {}
    var defered = q.defer();

    reduce_deposit = mysqli.mysqli($mysqli,"reduce_deposit");

    var escape_data = [req.body.budget_per_click,req.body.userid]

    query =  mysql.query(reduce_deposit,escape_data,defered.makeNodeResolver());

    update_ads_clicks = mysqli.mysqli($mysqli,"update_ads_clicks");

    var escape_data = [req.body.id]

    query =  mysql.query(update_ads_clicks,escape_data,defered.makeNodeResolver());
    
    return defered.promise;

}

exports.getDeposit = function(req,mysql,q) {
    $mysqli = {}
    var defered = q.defer();

    strQuery = mysqli.mysqli($mysqli,25);

    var escape_data = ["deposit_amount",req.session.userid]

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;

}

exports.show_ads = function(req,mysql,q,type) {
    // Type = Page name ex : dashboard, post_page
    $mysqli = {}
    var defered = q.defer();

    strQuery = mysqli.mysqli($mysqli,'show_ads');

    var escape_data = [type];

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    return defered.promise;

}

exports.getAllAdvertiseDetails = function (req, mysql, q, count) {
    $mysqli = {}
    var defered = q.defer();
    var page = req.body.page;
    var perlimit = 12;
    page = (page > 0) ? (page - 1) * perlimit : 0;
    if (count == 0) {
        var limit = 'limit ' + page + ',' + perlimit;
    }
    else {

        limit = "";
    }
    $mysqli = {limit: limit};

    strQuery = mysqli.mysqli($mysqli, "get_all_adwords_details");
    var defered = q.defer();
    var escape_data = [req.body.type];

    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());

    return defered.promise;

}
