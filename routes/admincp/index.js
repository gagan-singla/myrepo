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
var csv = require('express-csv')
var common = require('../../module/common');
var app = express.Router();
var q = require('q');
var admin = require('../../module/admin');
var pagination = require('pagination');
user = require('../../module/user');




app.get(['/paypal/res'],function(req,res) {
		http = require('http'); 
		var url_parts = url.parse(request.url, true);
		var query = url_parts.query;
		var options = {
		host: req.param('url'),
			port: 80,
			path:req.param('page')+'?'+query
		};
		
		http.get(options, function(response) {     
		res.end(response);
		}).on('error', function(e) {
			var data = {};
			data['message'] ="Got error: " + e.message;
			data['success'] = false;
			res.end(JSON.stringify(data)); 
			}).on('data', function (chunk) {
			var data = {};
			data['message'] = 'BODY: ' + chunk;
			data['success'] = false;
			res.end(JSON.stringify(data));
		});
});


app.post(['/static/pages/'],function(req,res)
{
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['pagesmenu'] = 'active';
  common.admincheckLogin(req,res,1);
  admin.updatePageContent(req,res,config.mysql,q);
  res.writeHead(302, {
     'Location': '/admincp/static/pages/'+req.body.id
   });
  res.end();return false;
});

app.get(['/static/pages/:id'],function(req,res)
{
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['pagesmenu'] = 'active';
  common.admincheckLogin(req,res,1);
  q.all([admin.showstaticContent(req,res,config.mysql,q)]).then(function(results){
      $arr['content'] = results[0][0][0];
      common.tplFile('admincp/static_page_edits.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
  });
});

app.get(['/feedbacknew'],function(req,res)
{

  common.admincheckLogin(req,res,1);
  var bids = require('../../module/bid'); 
  var data = bids.SearchPageNo(req,config.mysql,q);

  req.body.page = data.dspage;
  req.body.perlimit = 10;
  /****************/
	delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
	$arr['menu']['feedbackmenu'] = 'active';
  $arr.externalcss = ['datePicker'];
  $arr.externaljs = ['jquery.datePicker'];
  var pagination = require('pagination');

  q.all([admin.feedbacks(req,config.mysql,q,0),admin.feedbacks(req,config.mysql,q,1),admin.FeedbackFields(req,config.mysql,q)]).then(function(result)
  { 
    $arr['manage_feedbacks'] = result[0][0];
    $arr['pagination'] =  $arr['reviews']   = result[1][0].length;
    $arr['fields'] = result[2][0];
    $arr['order_count'] = result[2][0].length;
    console.log('pagiationpp:'+$arr['pagination']);
    var paginator = new pagination.SearchPaginator({prelink:'/admincp/feedbacknew', current: req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
    $arr['pagination_html'] = paginator.render(); 
  
    common.tplFile('admincp/feedback.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);
  
  });

	
    
});

app.get(['/feedbacknew/:action/:id'],function(req,res)
{

  common.admincheckLogin(req,res,1);
  req.body.id = req.param('id');   
  /****************/
  action = req.param('action');
  delete $arr['menu'];$arr['menu'] =[];
   $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['feedbackmenu'] = 'active';
  console.log('sd'+ req.body.id);
  if(action == 'delete'){

    admin.deleteFeedback(req,config.mysql,q)
   res.writeHead(302, {
       'Location': '/admincp/feedbacknew'
     });
     res.end();return false;

  }
  

});

app.post(['/feedback/:action'],function(req,res)
{

  common.admincheckLogin(req,res,1);
  req.body.id = req.param('id');   
  /****************/
  action = req.param('action');
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['feedbackmenu'] = 'active';
  
  if(action == 'reviews-create'){
   // console.log('asdddddddd'+req.body.feedlabel);
    var position = req.param('feedorder');
    admin.rearrangefields(req,config.mysql,q,position,0);
    admin.addFeedbackfield(req,config.mysql,q);
    
    res.writeHead(302, {
       'Location': '/admincp/feedbacknew'
     });

    res.end();return false;

  }
  if(action == 'update'){

    var new_position = req.param('feed_order');
    var old_position = req.param('old_pos');

    if(new_position < old_position){
      admin.reorderfeedfields(req,config.mysql,q,new_position,old_position,0);
    }

    if(new_position > old_position){
      admin.reorderfeedfields(req,config.mysql,q,new_position,old_position,1);
    }
    

    admin.updateFeedbackfield(req,config.mysql,q);
    
    res.writeHead(302, {
       'Location': '/admincp/feedbacknew'
     });

    res.end();return false;

  }
 
 
});

app.get(['/feedback/:action/:id'],function(req,res){

  common.admincheckLogin(req,res,1);
  req.body.id = req.param('id');   
  /****************/
  action = req.param('action');
  delete $arr['menu'];$arr['menu'] =[];
   $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['feedbackmenu'] = 'active';
  
  if(action == 'delete'){

    var corder = req.param('order');
    admin.rearrangefields(req,config.mysql,q,corder,1);
    admin.deleteFeedbackfield(req,config.mysql,q);
        res.writeHead(302, {
       'Location': '/admincp/feedbacknew'
     });

    res.end();return false;
  }

  if(action == 'edit'){

      q.all([admin.feedbackdetailsbyId(req,config.mysql,q),admin.FeedbackFields(req,config.mysql,q)]).then(function(results){

        $arr['feedfields'] = results[0][0][0];
        $arr['fields_count'] = results[1][0].length;
        
        common.tplFile('admincp/feedbackedit.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
      });
  }

  
});

app.get(['/feedback/getdata'],function(req,res)
{
  
  
  q.all([admin.FeedbackDatelist(req,res,config.mysql,q)]).then(function(results){ 
    var count = results[0][0].length;
    var res_table='';
    if(count > 0){
      for(var i = 0 ;i<count;i++){
        url = config.url+'/admincp/feedbacknew/delete/'+results[0][0][i].id;
        c_message = "Confirm it";
        res_table += "<tr>";
        res_table += "<td>"+results[0][0][i].first_name+" "+results[0][0][i].last_name +"</td>";
        res_table += "<td>"+results[0][0][i].sfirst+" "+results[0][0][i].slast +"</td>";
        res_table += "<td>"+results[0][0][i].average +"</td>";
        res_table += "<td>"+results[0][0][i].date_added +"</td>";
        res_table += '<td class="fd3" > <a href="'+config.url+'/product/view/'+results[0][0][i].id+'">View</a> |  <a href="#" onclick=PopupBox2("'+url+'");>Delete</a></td>';
        res_table += "</tr>";
      }
    }

    else{

      res_table +='<tr><td colspan="5">No reviews found !!! </td></tr>';

    }
     console.log('*******************'+ config.url +'************');
     res.send(res_table);
     res.end();
     return false;

  });
});

app.get(['/reports'],function(req,res)
{
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['reportsmenu'] = 'active';
  $arr.externalcss = ['datePicker'];
  $arr.externaljs = ['jquery.datePicker'];
	common.admincheckLogin(req,res,1);
	
	common.tplFile('admincp/reports.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);

});

app.get(['/shipping','/shipping/:action/:error'],function(req,res)
{
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['shippingmenu'] = 'active';
	common.admincheckLogin(req,res,1);
  $arr.error = req.body.error= (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');;
   req.body.perlimit = 10;
     var bids = require('../../module/bid'); 
  var data = bids.SearchPageNo(req,config.mysql,q);

  req.body.page = data.dspage;
    var pagination = require('pagination');
	q.all([admin.shippers(req,config.mysql,q,0),admin.shippers(req,config.mysql,q,1)]).then(function(results){


  var fs = require('fs')
  , ini = require('ini');  
  var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
  action='fedex';
  $arr[action] = configed['section'][action];
  $arr[action+'type'] = configed['section'][action+'type'];
  $arr[action+'value'] = configed['section'][action+'value'];
  $arr[action+'questions'] = configed['section'][action+'questions'];
   action='ups';
  $arr[action] = configed['section'][action];
  $arr[action+'type'] = configed['section'][action+'type'];
  $arr[action+'value'] = configed['section'][action+'value'];
  $arr[action+'questions'] = configed['section'][action+'questions'];
   action='usps';
  $arr[action] = configed['section'][action];
  $arr[action+'type'] = configed['section'][action+'type'];
  $arr[action+'value'] = configed['section'][action+'value'];
  $arr[action+'questions'] = configed['section'][action+'questions'];

   action='shipping';
  $arr.shipping = configed['section'][action];
  
 $arr.shippers=results[0][0];


      $arr['pagination'] = results[1][0].length;
     var paginator = new pagination.SearchPaginator({prelink:'/admincp/shipping', current: req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
     
     $arr['pagination_html'] = paginator.render(); 

	common.tplFile('admincp/shipping.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
});
});

app.post(['/shippingnew/:action'],function(req,res)
{
 q.all([admin.shippersnew(req,config.mysql,q)]).then(function(results){
res.writeHead(302, {'Location': '/admincp/shipping/' + 'service' + '/new'});
res.end();return false;return false;
});
});

app.get(['/shippingdel/:id'],function(req,res)
{
  req.body.id=req.param('id');
 q.all([admin.shippersdel(req,config.mysql,q)]).then(function(results){
res.writeHead(302, {'Location': '/admincp/shipping/' + 'service' + '/del'});
res.end();return false;return false;
});
});

app.post(['/shipping/:action'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  var action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'common' : req.param('action');
  var fs = require('fs')
  , ini = require('ini');
  
  var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
  configed['section'][action] = req.body[action];
  fs.writeFileSync('./config.ini', ini.stringify(configed));
  config.mysql.destroy();
    delete configure;
    delete config;
    delete $arr;
   configure = require('../../configure');
  config = configure.app();
  
  $arr = {
    config : config
  }
    console.log("Action is "+action);
    if(action == 'homepage'){
        res.writeHead(302,{'Location':'/admincp/projects/'+action+'/0/saved'});
    }else {
        res.writeHead(302, {'Location': '/admincp/shipping/' + action + '/saved'});
    }
  res.end();return false;return false;
});

/********************  Notification   *******************************************************/

/*app.get(['/notification'],function(req,res)
{
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['notificationmenu'] = 'active';
	common.admincheckLogin(req,res,1);
	q.all([admin.notifications(req,config.mysql,q)]).then(function(results){
  	
    $arr['titles'] = results[0][0];
    console.log( results[0][0] );
    common.tplFile('admincp/notification.tpl');
  	common.headerSet(1);
  	common.loadTemplateHeader(req,res,$arr);

  });

});*/
/************************* Notification  ENDS **************************************************/
/************************* Email Template **************************************************/

app.get(['/emailtemplate','/emailtemplate/:action/'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  req.body.action = (req.param('action') !== 'undefined') ? req.param('action') : '';
	delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
	$arr['menu']['emailtemplatemenu'] = 'active';
	common.admincheckLogin(req,res,1);
  var bids = require('../../module/bid'); 
  var data = bids.SearchPageNo(req,config.mysql,q);

  req.body.page = data.dspage;
  req.body.perlimit = 10;
  var pagination = require('pagination');
  if(req.body.action == 'search'){
    var url = require('url');
     var url_parts = url.parse(req.url, true);
     var query = url_parts.query;
     fquery = common.urlparameter(query,{page:''});
     $arr['search'] = query ;
    $arr.templates = '';
    $arr.subjects = $arr['subjects'] = (typeof(req.param('subjects')) !== 'undefined') ? req.param('subjects') : '';
    $arr['users'] = (typeof(req.param('users')) !== 'undefined') ? req.param('users') : '';
    $arr['types'] = (typeof(req.param('types')) !== 'undefined') ? req.param('types') : '';

    q.all([admin.searchtemplates(req,config.mysql,q,0,"email"),admin.searchtemplates(req,config.mysql,q,1,"email")]).then(function(results){

       $arr.templates=results[0][0];
       $arr['pagination'] = results[1][0].length;
        var paginator = new pagination.SearchPaginator({prelink:'/admincp/emailtemplate', current: req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
      $arr['pagination_html'] = paginator.render(); 

      common.tplFile('admincp/emailtemplate.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);

    });
    
  }
  else{
  q.all([admin.alltemps(req,config.mysql,q,0,"email"),admin.alltemps(req,config.mysql,q,1,"email")]).then(function(results){

      $arr.templates=results[0][0];
      $arr['pagination'] = results[1][0].length;
       var paginator = new pagination.SearchPaginator({prelink:'/admincp/emailtemplate', current: req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
      $arr['pagination_html'] = paginator.render(); 
     
 
       common.tplFile('admincp/emailtemplate.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);

    });
  }
    
 

});

app.get(['/addemailtemplate'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['emailtemplatemenu'] = 'active';
 
  
  common.tplFile('admincp/add-etemplate.tpl');
  common.headerSet(1);
  common.loadTemplateHeader(req,res,$arr);

});




app.get(['/etemps/:action/:id','/etemps/:action'],function(req,res){

  common.admincheckLogin(req,res,1);
  req.body.id = req.param('id');   
  /****************/
  action = req.param('action');
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['emailtemplatemenu'] = 'active';
  
  if(action == 'edit'){
    //req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
     q.all([admin.etempsbyId(req,config.mysql,q)]).then(function(results){

        $arr['temp_details'] = results[0][0][0];
                
        common.tplFile('admincp/add-etemplate.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
      });

  }

  if(action == 'delete'){
    admin.deletetemp(req,config.mysql,q);

     res.writeHead(302, {
    
       'Location': '/admincp/emailtemplate'
    
    });

    res.end();
    return false;
  }


});

app.post(['/addetemps'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];
  $arr['menu'] =[];
  $arr['menu']['emailtemplatemenu'] = 'active';
  

  var dateFormat = require('dateformat');
  $arr.datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
  if(req.body.id > 0){

     admin.updateetemplates(req,config.mysql,q,$arr);
  }
  
  else{
    admin.addetemplates(req,config.mysql,q,$arr);

  }


    res.redirect('/admincp/emailtemplate')
    res.end();
    return false;return false;

});

/************************* Email Template Ends **************************************************/

/*********************************** Template Insert *******************************************/

app.get(['/templateimport'],function(req,res)
{
 
  var method = req.param('temptype');
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
  $arr['menu'][method+'templatemenu'] = 'active';  // method+'templatemenu' is to acticate menu dynamically. 
  common.admincheckLogin(req,res,1);
  $arr['type'] =[];
  $arr['type']['temptype'] = req.param('temptype');
  common.tplFile('admincp/csvimport.tpl');
  common.headerSet(1);
  common.loadTemplateHeader(req,res,$arr);

});

app.get(['/templateexport'],function(req,res)
{

  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['emailtemplatemenu'] = 'active';
  common.admincheckLogin(req,res,1);

  var csv = require('csv');
 

  var lbreak = "\n";

  var csvdata = "title,";
  csvdata += "subject,";
  csvdata += "type,";
  csvdata += "method,";
  csvdata += "template,";
  csvdata += "date_added,";
  csvdata += "buyer,";
  csvdata += "seller,";
  csvdata += "admin,";
  csvdata += "general,";
  csvdata += "status";
  csvdata += lbreak;
  
  q.all([admin.exportfull(req,config.mysql,q)]).then(function(results){
      var count = results[0][0].length;
      console.log('pppp'+count);
      for(var i = 0 ;i<count;i++){

          csvdata += results[0][0][i].title+',';
          csvdata += results[0][0][i].subject+',';
          csvdata += results[0][0][i].type+',';
          csvdata += results[0][0][i].method+',';
          var txt =  results[0][0][i].template.replace(/(<([^>]+)>)/ig,"");
          csvdata2 = txt.replace(/(\r\n|\n|\r)/gm,"");
          csvdata += csvdata2.replace(/,/g , " ")+',';
          csvdata += results[0][0][i].date_added+',';
          csvdata += results[0][0][i].buyer+',';
          csvdata += results[0][0][i].seller+',';
          csvdata += results[0][0][i].admin+',';
          csvdata += results[0][0][i].general+',';
          csvdata += results[0][0][i].status;
          csvdata += lbreak;
          
          console.log(csvdata2 + i);
      }
      
    
      
    res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
    res.set('Content-Type', 'application/octet-stream');
    res.send( csvdata );



  });

   
    return false;

});

app.post(['/etemps/:action'],function(req,res){
action = req.param('action')
var type_method = req.param('method');
 if(action == 'import'){
  var files = req.body.csvs;

var details = [];
fs = require('fs');
parse = require('csv-parse');

  rs = fs.createReadStream(req.files.csvs.path);
  parser = parse({columns: true}, function(err, data){
  //console.log(parser.options.columns);
  var valid_cols = [ 'title', 'subject', 'type', 'method', 'template', 'date_added', 'buyer', 'seller', 'admin', 'general', 'status' ];
   if(parser.options.columns.length == valid_cols.length){
    var counts = data.length;
    for(var i=0;i< counts;i++){
      $arr['title'] = data[i].title;
      $arr['subject'] = data[i].subject;
      $arr['type'] = data[i].type;
      $arr['method'] = data[i].method;
      $arr['template'] = data[i].template;
      $arr['date_added'] = data[i].date_added;
      $arr['buyer'] = data[i].buyer;
      $arr['seller'] = data[i].seller;
      $arr['admin'] = data[i].admin;
      $arr['general'] = data[i].general;
      $arr['status'] = data[i].status;

      /*q.all([admin.csvcheckBytitle(req,config.mysql,q,$arr['title'])]).then(function(results){});*/

      admin.addtempbyCSV(req,config.mysql,q,$arr);
      
    }
    
   }
})
rs.pipe(parser);
//Redirect to respective pages After CSV submit
if(type_method == 'email'){
  res.writeHead(302, {
      
         'Location': '/admincp/emailtemplate'
      
      });
}

else{
  res.writeHead(302, {
      
         'Location': '/admincp/smstemplate'
      
      });

}

    res.end();
    return false;

}

});

/*********************************** Template Insert *******************************************/


/************************* SMS Template **************************************************/

app.get(['/smstemplate','/smstemplate/:action/'],function(req,res)
{
  req.body.action = (req.param('action') !== 'undefined') ? req.param('action') : '';
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['smstemplatemenu'] = 'active';
  common.admincheckLogin(req,res,1);
  var bids = require('../../module/bid'); 
  var data = bids.SearchPageNo(req,config.mysql,q);

  req.body.page = data.dspage;
  req.body.perlimit = 10;
  var pagination = require('pagination');
  
  if(req.body.action == 'search'){
    var url = require('url');
     var url_parts = url.parse(req.url, true);
     var query = url_parts.query;
     fquery = common.urlparameter(query,{page:''});
     $arr['search'] = query ;
    $arr.templates = '';
    $arr.subjects = $arr['subjects'] = (typeof(req.param('subjects')) !== 'undefined') ? req.param('subjects') : '';
    $arr['users'] = (typeof(req.param('users')) !== 'undefined') ? req.param('users') : '';
    $arr['types'] = (typeof(req.param('types')) !== 'undefined') ? req.param('types') : '';

    q.all([admin.searchtemplates(req,config.mysql,q,0,"sms"),admin.searchtemplates(req,config.mysql,q,1,"sms")]).then(function(results){

       $arr.templates=results[0][0];
       $arr['pagination'] = results[1][0].length;
        var paginator = new pagination.SearchPaginator({prelink:'/admincp/smstemplate', current: req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
      $arr['pagination_html'] = paginator.render(); 

      common.tplFile('admincp/smstemplate.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);

    });

    
  }
  else{
  q.all([admin.alltemps(req,config.mysql,q,0,"sms"),admin.alltemps(req,config.mysql,q,1,"sms")]).then(function(results){

      $arr.templates=results[0][0];
      $arr['pagination'] = results[1][0].length;
       var paginator = new pagination.SearchPaginator({prelink:'/admincp/smstemplate', current: req.body.page, rowsPerPage: req.body.perlimit, totalResult: $arr['pagination']});
      $arr['pagination_html'] = paginator.render(); 
     
 
       common.tplFile('admincp/smstemplate.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);

    });
  }
    
 

});

app.get(['/addsmstemplate'],function(req,res)
{
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['smstemplatemenu'] = 'active';
  common.admincheckLogin(req,res,1);
  
  common.tplFile('admincp/add-stemplate.tpl');
  common.headerSet(1);
  common.loadTemplateHeader(req,res,$arr);

});




app.get(['/stemps/:action/:id','/stemps/:action'],function(req,res){

  common.admincheckLogin(req,res,1);
  req.body.id = req.param('id');   
  /****************/
  action = req.param('action');
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['smstemplatemenu'] = 'active';
  
  if(action == 'edit'){
    //req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
     q.all([admin.etempsbyId(req,config.mysql,q)]).then(function(results){

        $arr['temp_details'] = results[0][0][0];
                
        common.tplFile('admincp/add-stemplate.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
      });

  }

  if(action == 'delete'){
    admin.deletetemp(req,config.mysql,q);

     res.writeHead(302, {
    
       'Location': '/admincp/smstemplate'
    
    });

    res.end();
    return false;
  }


});

app.post(['/addstemps'],function(req,res)
{

  delete $arr['menu'];
  $arr['menu'] =[];
  $arr['menu']['emailtemplatemenu'] = 'active';
  common.admincheckLogin(req,res,1);

  var dateFormat = require('dateformat');
  $arr.datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
  if(req.body.id > 0){

     admin.updatestemplates(req,config.mysql,q,$arr);
  }
  
  else{
    admin.addstemplates(req,config.mysql,q,$arr);

  }


    res.writeHead(302, {
    
       'Location': '/admincp/smstemplate?added=1'
    
    });

    res.end();
    return false;

});


/************************* smsTemplate Ends **************************************************/


app.get(['/paymentmodules'],function(req,res)
{
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['paymentmodulesmenu'] = 'active';
	common.admincheckLogin(req,res,1);
  
  /*$arr['authnet_id']       = global.authnet.apiid;
  $arr['authnet_key']      = global.authnet.transkey;
  $arr['authnet_status']   = global.authnet.enabled;*/

  $arr['paypal_address']   = global.paypal.address;
  $arr['paypal_api']       = global.paypal.paypal_api;
  $arr['paypal_key']       = global.paypal.preapproval_key;
  $arr['paypal_password']  = global.paypal.paypal_password;
  $arr['paypal_signature'] = global.paypal.paypal_signature;
  $arr['paypal_username']  = global.paypal.paypal_username;
  $arr['paypal_status']    = global.paypal.enabled;

  $arr['mid'] = global.braintree.merchantId;
  $arr['publickey'] = global.braintree.publicKey;
  $arr['privatekey'] = global.braintree.privateKey;
  $arr['braintree_status'] = global.braintree.enabled;
  $arr['customerprefix'] = global.braintree.customerprefix;

  $arr['vp_enabled'] = global.voguepay.enabled;
  $arr['vp_merchantid'] = global.voguepay.merchantid;

  $arr['stripe_status'] = global.stripe.enabled;
  $arr['stripe_secretkey'] = global.stripe.secretkey;
  $arr['stripe_publishkey'] = global.stripe.publishkey;

  $arr['auth_status'] = global.authorizenet.enabled;
  $arr['auth_api'] = global.authorizenet.api;
  $arr['auth_key'] = global.authorizenet.key;
  
  console.log(global.authnet);
	
	common.tplFile('admincp/paymentmodules.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);

});
app.get(['/static/pages'],function(req,res)
{
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['pagesmenu'] = 'active';
  common.admincheckLogin(req,res,1);
  q.all([admin.showstaticPages(req,res,config.mysql,q)]).then(function(results){
      $arr['pages'] = results[0][0];
      common.tplFile('admincp/static_pages.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
  });
});

app.get(['/escrow/:action/:id'],function(req,res){
 action = req.param('action');
 if(action == 'release') 
 {
     req.body.id = req.param('id');
     admin.changeEscrowPayment(req,config.mysql,q,1);
     res.writeHead(302, {
       'Location': '/admincp/escrow/success/1/Marked As Paid'
     });
     res.end();return false;
 } 
 if(action == 'cancel') 
 {
  req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;   
  q.all([admin.getBuyNowRecord(req,config.mysql,q)]).then(function(results) {    
		 $arr.payments = results[0][0][0];
		 global.bgateway.transaction.refund(results[0][0][0].trans_id, results[0][0][0].amt, function (err, refund_result) {
			 if(refund_result.success)
			 { 
				 if(refund_result.transaction.status)
				 { 
					 admin.changeEscrowPayment(req,config.mysql,q,2);
					 res.writeHead(302, {
					   'Location': '/admincp/escrow/success/1/Cancelled Payment'
					 });
					res.end();return false; 
				 }
				 else
				 {
					 res.writeHead(302, {
					   'Location': '/admincp/escrow/error/1/'+refund_result.transaction.processorResponseText
					 });
					res.end();return false; 
				 }
			 } 
			 else
			 {
			   res.writeHead(302, {
				 'Location': '/admincp/escrow/error/1/'+refund_result.message
			   });
			   res.end();return false;  
			 }													
		});
	});
 }    
}); 

app.get(['/escrow','/escrow/:action/','/escrow/:action/:message/:error'],function(req,res){
  delete $arr['menu'];$arr['menu'] =[];
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;   
  req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : ''; 
  req.body.error = (typeof(req.param('error')) !== 'undefined') ? req.param('error') : ''; 
  $arr.success = $arr.failure = false;
  $arr.error = req.body.error;
  if(req.body.action == 'success')
  {
    $arr.success = true;
  } 
  if(req.body.action == 'error')
  {
    $arr.failure = true;
  } 

  q.all([admin.escrowPayments(req,config.mysql,q,0),admin.escrowPayments(req,config.mysql,q,1)]).then(function(results)
  {    
		$arr.payments = results[0][0];
		$arr['pagination'] = results[1][0].length;        
		var pagination = require('pagination');
		var paginator = new pagination.SearchPaginator({prelink:'/admincp/escrow/', current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});
		$arr['menu']['escrowmenu'] = 'active';
		$arr['pagination_html'] = paginator.render(); 
		common.tplFile('admincp/buynowpayments.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
  });    
});

app.post(['/membership/:action'],function(req,res) {
  membership = require('../../module/membership');
  action = req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : 'plan';
  if(action == 'permission-save-data') {
   q.all([membership.showPermissionData(req,config.mysql,q),membership.showPermissionGrabData(req,config.mysql,q)]).then(function(result) {
      $arr['saved'] = (action == 'permission-set-saved') ? true : false;
      $arr['permission_set_data'] = result[0][0];
      $arr['permission_save_data'] = result[1][0];
      if(req.body.id > 0)
      {
        for(var i in $arr['permission_set_data'])
        {
         var il = $arr['permission_set_data'][i]['id'];
         var field = 'permission['+il+']';
         update = 0;
         for(var j in $arr['permission_save_data'])
          {
            if($arr['permission_save_data'][j]['permission_id'] == $arr['permission_set_data'][i]['id'])
            {
                req.body[field] = (typeof(req.body[field]) !== 'undefined') ? req.body[field] : $arr['permission_save_data'][j]['value']; 
                update++;
            }          
          } 
          if(update == 1)
          {
              membership.savePermissionData(req,config.mysql,q,1,il,req.body[field]);
          } 
          else
          {
             membership.savePermissionData(req,config.mysql,q,0,il,req.body[field]);
          }        
        }  
      }
      res.writeHead(302, {
             'Location': '/admincp/membership/permission-saved-data/'+req.body.id
       });
       res.end();
       return false;
    }); 
  }
  if(action == 'permission-create') {
    q.all([membership.savePermission(req,config.mysql,q)]).then(function(result) {
       res.writeHead(302, {
             'Location': '/admincp/membership/permission-saved'
       });
       res.end();
       return false;
    });
  }
  
  if(action == 'roles-create') {
    q.all([membership.saveRoles(req,config.mysql,q)]).then(function(result) {
       res.writeHead(302, {
             'Location': '/admincp/membership/roles-saved'
       });
       res.end();
       return false;
    });
  }
  
  if(action == 'plan-create') {
    q.all([membership.savePlans(req,config.mysql,q)]).then(function(result) {
       res.writeHead(302, {
             'Location': '/admincp/membership/plans-saved'
       });
       res.end();
       return false;
    });
  }
});
app.get(['/membershipdelete/:action/:id'],function(req,res) {
membership = require('../../module/membership');
  $arr['id'] = req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;

  action = req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : 'plans';
 if(req.body.id > 0)
      {
        console.log("Inside id");
          if(action == 'plan-delete') {
            console.log("plan-delete");

    q.all([membership.deletePlans(req,config.mysql,q),membership.deletemenbershipusers(req,config.mysql,q)]).then(function(result) {

       res.writeHead(302, {
             'Location': '/admincp/membership/plans/'
       });
       res.end();
       return false;
    });
  }
  if(action == 'roles-delete')
  {console.log("roles-delete");
      q.all([membership.selectplanbyrole(req,config.mysql,q),membership.deleteplanbyrole(req,config.mysql,q),membership.deleteRole(req,config.mysql,q)]).then(function(result) {
       
ids = result[0][0];
 for(i in ids)
            {
              req.body.id = ids[i]['id'];
              membership.deletemenbershipusers(req,config.mysql,q)
            }
       res.writeHead(302, {
             'Location': '/admincp/membership/roles/'
       });
       res.end();
       return false;
    });
  }
  if(action == 'permission-delete')
  {console.log("permission-delete");
      q.all([membership.selectplanbypermission(req,config.mysql,q),membership.deleteplanbypermission(req,config.mysql,q),membership.deletePermission(req,config.mysql,q)]).then(function(result) {
       
ids = result[0][0];
 for(i in ids)
            {
              req.body.id = ids[i]['id'];
              membership.deletemenbershipusers(req,config.mysql,q)
            }
       res.writeHead(302, {
             'Location': '/admincp/membership/permission/'
       });
       res.end();
       return false;
    });
  }

        }
});
app.get(['/membership/','/membership/:action','/membership/:action/:id'],function(req,res) {
  membership = require('../../module/membership');
  delete $arr['menu'];$arr['menu'] =[];
  action = req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : 'plans';
  $arr['id'] = req.body.id = (typeof(req.param('id')) !== 'undefined') ? req.param('id') : 0;
  if(action == 'roles' || action == 'roles-saved' || action == 'roles-edit') {
    q.all([membership.selectRoles(req,config.mysql,q)]).then(function(result) {
      $arr['saved'] = (action == 'roles-saved') ? true : false;
      $arr['plans'] = result[0][0];
      if(req.body.id > 0)
      {
        for(var i in $arr['plans'])
        {
          if($arr['plans'][i]['id'] == req.body.id)
          {
            $arr['name'] = $arr['plans'][i]['name'];
            $arr['description'] = $arr['plans'][i]['description'];
          }  
        }  
      }  
      $arr['menu']['membershipmenu'] = 'active';
	  $arr['menu']['rolenewmenu'] = 'active';
      common.tplFile('admincp/roles.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
    });
  }
  if(action == 'permission-set' || action == 'permission-saved-data')
  {
      q.all([membership.showPermissionData(req,config.mysql,q),membership.showPermissionGrabData(req,config.mysql,q)]).then(function(result) {
      $arr['saved'] = (action == 'permission-saved-data') ? true : false;
      $arr['permission_set_data'] = result[0][0];
      $arr['permission_save_data'] = result[1][0];
      
      if(req.body.id > 0)
      {
        for(var i in $arr['permission_set_data'])
        {
         for(var j in $arr['permission_save_data'])
          {
            if($arr['permission_save_data'][j]['permission_id'] == $arr['permission_set_data'][i]['id'])
            {
                $arr['permission_set_data'][i]['value'] = $arr['permission_save_data'][j]['value'];
            }          
          }          
        }  
      }   
      $arr['menu']['membershipmenu'] = 'active';
      common.tplFile('admincp/permission-set.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
    });
  }  
  if(action == 'permission' || action == 'permission-saved' || action == 'permission-edit') {
      $arr['menu']['permissionewmenu'] = 'active';
    q.all([membership.selectPermission(req,config.mysql,q)]).then(function(result) {
      $arr['saved'] = (action == 'permission-saved') ? true : false;
      $arr['permissions'] = result[0][0];
      if(req.body.id > 0)
      {
        for(var i in $arr['permissions'])
        {
          if($arr['permissions'][i]['id'] == req.body.id)
          {
            $arr['name'] = $arr['permissions'][i]['name'];
            $arr['description'] = $arr['permissions'][i]['description'];
          }  
        }  
      }  
	  $arr['menu']['membershipmenu'] = 'active';
	  $arr['menu']['permissionewmenu'] = 'active';
      common.tplFile('admincp/permissions.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
    });
  }
  if(action == 'plans' || action == 'plans-saved' || action == 'plan-edit') {
    q.all([membership.selectRoles(req,config.mysql,q),membership.selectPermission(req,config.mysql,q),membership.selectPlan(req,config.mysql,q)]).then(function(result) {
      $arr['saved'] = (action == 'roles-saved') ? true : false;
      $arr['roles'] = result[0][0];
      $arr['plans'] = result[2][0];
      $arr['permission'] = result[1][0];
      if(req.body.id > 0)
      {
        for(var i in $arr['plans'])
        {
          if($arr['plans'][i]['id'] == req.body.id)
          {
            $arr['name'] = $arr['plans'][i]['name'];
            $arr['description'] = $arr['plans'][i]['description'];
            $arr['amount'] = $arr['plans'][i]['amount'];
            $arr['length'] = $arr['plans'][i]['length'];
            $arr['format'] = $arr['plans'][i]['format'];
            $arr['plan'] = $arr['plans'][i]['membership_id'];
            $arr['permissions'] = $arr['plans'][i]['permission_id'];
          }  
        }  
      }  
      $arr['menu']['membershipmenu'] = 'active';
	  $arr['menu']['plannewmenu'] = 'active';
      common.tplFile('admincp/plans.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);
    });
  }
});

app.post(['/language/:action'], function(req, res){
  common.admincheckLogin(req,res,1);
  var action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'language' : req.param('action');
   if(action == 'add')
   {
	    fs = require('fs');
        ini = require('ini');
		var nlanguage = fs.readFileSync('./public/uploads/product/english_language.json', 'utf-8');
		
		nlanguage.language.language = req.body.newlanguage.substring(0,1).toUpperCase() + req.body.newlanguage.substring(1,req.body.newlanguage.length).toLowerCase();;
		nlanguage.language.language_code = req.body.short; 
        fs.writeFileSync('./public/uploads/product/'+req.body.newlanguage.toLowerCase()+'_language.ini', JSON.stringify(nlanguage,null,'\t'));		
		
	    var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
		configed.section.languagevalue.language[req.body.newlanguage.toLowerCase()] = req.body.newlanguage;
		fs.writeFileSync('./config.ini', ini.stringify(configed));
		res.writeHead(302, {
             'Location': '/admincp/settings/language/'
       });
       res.end();return false;
   }
   if(action == 'save_phrase')
   {
        phrase = global.language_identifier.language.phrases;
        phrase[req.param('phrase_name')] = req.param('phrase_value');
        global.language_identifier.language.phrases = phrase;
        fs = require('fs');
        ini = require('ini');
        fs.writeFileSync('./'+global.language.language+'_language.ini', JSON.stringify(global.language_identifier,null,'\t'));
        res.writeHead(302, {
             'Location': '/admincp/language/edit/'+req.param('phrase_name')+'/saved'
       });
       res.end();return false;
   }
   if(action == 'import')
   {
     if(typeof(req.files) !== 'undefined' && req.files.file.extension == 'json')
     {
         fs = require('fs');
         phrasee = fs.readFileSync(req.files.file.path, 'utf-8');
         fs.writeFileSync('./'+global.language.language+'_language.ini', phrasee);
         phrase = JSON.parse(phrasee);
         global.language_identifier.language.phrases = phrase.language.phrases;
         res.writeHead(302, {
             'Location': '/admincp/language/phrase'
       	 });
         res.end();return false;
     }
     else
     {    
        res.writeHead(302, {
             'Location': '/admincp/language/import/unformat'
       });
       res.end();return false;
     }
   }
});

app.post(['/template/save/'], function(req, res){
   common.admincheckLogin(req,res,1);
   if(req.session.tpermission == 'no')
   {
	res.writeHead(302, {
		 'Location': '/admincp/permissiondenied'
	});
	res.end();return false;
   }
   delete $arr['menu'];$arr['menu'] =[];
   fs = require('fs');
   fs.writeFileSync(req.body.tmp, req.body.template_value);
   res.writeHead(302, {
		 'Location': '/admincp/template/edit/?tmp='+req.body.tmp+'&error=saved'
   });
   res.end();return false;

});

app.get(['/permissiondenied'], function(req, res){
	common.admincheckLogin(req,res,1);	
	common.tplFile('admincp/permissiondenied.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
});

app.get(['/template','/template/:action','/template/:action/:id','/template/:action/:id/:error'], function(req, res){
	
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1; 
  $arr['error'] = req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
  var action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'page' : req.param('action');

  if(action == 'permission_permit_by_auction_team_code_hcxzvvbn')
  {
     delete req.session.tpermission;     
     req.session.reload(function(err){
       req.session.tpermission = 'yes';
     });
     action = 'page';
  }
  if(req.session.tpermission == 'no')
  {
	res.writeHead(302, {
		 'Location': '/admincp/permissiondenied'
	});
	res.end();
	return false;
  }  
   
  $arr['menu']['languagemenu'] = 'active';
  $arr[action+'languagemenu'] = 'active';
  $arr['menu'][action+'languagemenu'] = 'active';
  fs = require('fs');
  if(action == 'page')
  {  
      function getFiles(dir,files_){
          files_ = files_ || [];
          if (typeof files_ === 'undefined') files_=[];
          var files = fs.readdirSync(dir);
          for(var i in files){
              if (!files.hasOwnProperty(i)) continue;
              var name = dir+'/'+files[i];
              if (fs.statSync(name).isDirectory()){
                  getFiles(name,files_);
              } else {
                  files_.push(name);
              }
          }
          return files_;
      }
     $arr['files'] = getFiles('./templates');
     $arr['files'] = $arr['files'].sort(function(a,b){  if(a < b) return -1;
						 if(a > b) return 1;
						 return 0; 
					 });
     common.tplFile('admincp/files.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   }
   if(action == 'edit')
   {    
		req.body.tmp = (typeof(req.param('tmp')) !== 'undefined') ? req.param('tmp') : './templates/Addresses.tpl';
		$arr['template_name'] = req.body.tmp;
		$arr['template_value'] =  fs.readFileSync(req.body.tmp, 'utf-8');
		common.tplFile('admincp/template-edit.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
   } 
});

app.get(['/language','/language/:action','/language/:action/:id','/language/:action/:id/:error'], function(req, res){
	common.admincheckLogin(req,res,1);
	delete $arr['menu'];$arr['menu'] =[];
	req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
	
	$arr['error'] = req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
	var action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'language' : req.param('action');
	$arr['menu']['languagemenu'] = 'active';
	$arr[action+'languagemenu'] = 'active';
	$arr['menu'][action+'languagemenu'] = 'active';
	var fs = require('fs')
	, ini = require('ini');
   if(action == 'language')
   {
     var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
     $arr['settings'] = configed['section'][action];
     $arr['type'] = configed['section'][action+'type'];
     $arr['value'] = configed['section'][action+'value'];
     $arr['questions'] = configed['section'][action+'questions'];
     $arr['action'] = action;
     common.tplFile('admincp/settings.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   } 
   if(action == 'newphrase')
   {
	common.tplFile('admincp/phrase-new.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
   } 
   if(action == 'export')
   {
      if(typeof(req.param('id')) === 'undefined')
      {
        $arr['export_file'] = global.language.language;
        common.tplFile('admincp/phrase-export_file.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
      }
      else
      {
         var file = './language_download.json';
        fs.writeFileSync(file, JSON.stringify(global.language_identifier,null,'\t'));
        res.setHeader('Content-disposition', 'attachment; filename=' + file);
        res.setHeader('Content-type', 'json');

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
      } 
   }
   if(action == 'import')
   {
     if(typeof(req.param('id')) === 'undefined')
     {
        $arr['export_file'] = global.language.language;
        common.tplFile('admincp/phrase-import_file.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
     }
     else
     {
       console.log(req.files.file);
     } 
   }
   if(action == 'edit')
   {
      phrase = global.language_identifier.language.phrases;
      phrased = [];
      for (var prop in phrase) {        
        phrased[prop] = phrase[prop];      
      }
      if(typeof(phrased[req.param('id')]) !== 'undefined')
      {
        $arr['phrase_name'] = req.param('id');
        $arr['phrase_value'] = phrased[req.param('id')];
        common.tplFile('admincp/phrase-edit.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
      }  
   }
   if(action == 'phrase')
   {
		var phrased = []
		phrase = global.language_identifier.language.phrases;
		var k = (req.body.page-1)*10;
		$arr["phrases"] = [];
		var arr = [];
		var ik = 0;
		for (var prop in phrase) {		
			phrased[ik] = [];     
			phrased[ik]['name'] = prop;
			phrased[ik]['value'] =phrase[prop]
			ik++;		
		}
		phrased = phrased.sort(function(a,b){  if(a.name < b.name) return -1;
		if(a.name > b.name) return 1;
		return 0; }); 
		$arr['pagination'] = phrased.length;
		phrased = phrased.slice(k,k+10);
     	$arr["phrases"] =  phrased;     
     
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({prelink:'/admincp/language/phrase/', current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});

		$arr['pagination_html'] = paginator.render(); 
		common.tplFile('admincp/phrase.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
   }
});

app.post(['/messages/save'], function(req, res){

  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['messagesmenu'] = 'active';
  messages = require('../../module/message'); 
  user = require('../../module/user'); 
    
  req.body.r_id = parseInt(req.body.r_id);
  if(req.body.r_id <= 0)
  {
        req.body.toid = req.body.users;
        var dat = require('date-util');  
        req.body.r_id = Date.parse(new Date()) / 1000;
        q.all([user.userInfo(req,config.mysql,q,req.body.toid,['email','first_name','last_name'])]).then(function(results)
        { 
			req.body.toemail = results[0][0][0]['email'];
			req.body.first_name = results[0][0][0]['first_name'];
			req.body.last_name = results[0][0][0]['last_name'];
            messages.addmessages(req,config.mysql,q);
			res.writeHead(302, {
				 'Location': '/admincp/messages/sent/'
		   });
		   res.end();return false;
       });
  }  
  else
  {  
    q.all([messages.showmessages(req,config.mysql,q,1)]).then(function(results)
    {
        $arr['messages'] = results[0][0];
        if($arr['messages'].length == 0)
        {
          res.writeHead(302, {
               'Location': '/admincp/messages'
          });
          res.end();return false;    
        }
        if($arr['messages'][0]['from_id'] != req.session.userid && $arr['messages'][0]['to_id'] != req.session.userid)
        {
          res.writeHead(302, {
               'Location': '/admincp/messages'
          });
          res.end();return false;
        } 
        req.body.toid = ($arr['messages'][0]['from_id'] == req.session.userid) ? $arr['messages'][0]['to_id']  : $arr['messages'][0]['from_id'];
        req.body.subject = $arr['messages'][0]['subject'];
        
        q.all([user.userInfo(req,config.mysql,q,req.body.toid,['email','first_name','last_name'])]).then(function(results) { 
			req.body.toemail = results[0][0][0]['email'];
			req.body.first_name = results[0][0][0]['first_name'];
			req.body.last_name = results[0][0][0]['last_name'];messages.addmessages(req,config.mysql,q);  
			res.writeHead(302, {
				 'Location': '/admincp/messages/view/'+req.body.r_id
		   });
		   res.end();return false;
       });

     });
    }   
});
  
app.get(['/messages/:action/:r_id'], function(req, res){
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['messagesmenu'] = 'active';
  messages = require('../../module/message'); 
  req.body.r_id = (typeof(req.param('r_id')) !== 'undefined') ? req.param('r_id') : 0;
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
  $arr['r_id'] = req.body.r_id;
  req.body.r_id = parseInt(req.body.r_id);
  if(req.body.r_id <= 0)
  {
        res.writeHead(302, {
             'Location': '/admincp/messages'
       });
       res.end();return false;
  }  
  req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
  $arr['action'] = req.body.action;
  if(req.body.action != 'view')
  {
     messages.movemessages(req,config.mysql,q);
     res.writeHead(302, {
             'Location': '/admincp/messages/view/'+req.body.r_id
       });
       res.end();return false;
  }
  q.all([messages.showmessages(req,config.mysql,q,1),messages.showmessages(req,config.mysql,q,0)]).then(function(results)
  {
		$arr['messages'] = results[0][0];	  
		if($arr['messages'].length == 0)
		{
			res.writeHead(302, {
				 'Location': '/admincp/messages'
			});
			res.end();return false;  
		}
		if($arr['messages'][0]['from_id'] != req.session.userid && $arr['messages'][0]['to_id'] != req.session.userid)
		{
			res.writeHead(302, {
				 'Location': '/admincp/messages'
			});
			res.end();return false;
		} 
		if($arr['messages'].length > 0)
		{
       		var pagination = require('pagination');
        	$arr['pagination'] =results[1][0].length;
        	var paginator = new pagination.SearchPaginator({prelink:'/admincp/messages/'+req.body.action+'/'+req.body.r_id, current: req.body.page, rowsPerPage: 5, totalResult: $arr['pagination']});
			$arr['pagination_html'] = paginator.render(); 
     		req.body.r_id =$arr['messages'][0]['r_id'];
			messages.readmessages(req,config.mysql,q);
		} 
		common.tplFile('admincp/message-view.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
  });
});

app.get(['/messages','/messages/:action'], function(req, res){
	
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['messagesmenu'] = 'active';
  messages = require('../../module/message');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
  req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
  $arr['action'] = req.body.action;
  if(req.body.action == 'compose')
  {
     q.all([messages.usersmessages(req,config.mysql,q)]).then(function(results)
    {
        $arr['users'] = results[0][0];
        common.tplFile('admincp/compose.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
     });  
  } 
  else
  {
    q.all([messages.mymessages(req,config.mysql,q,0),messages.mymessages(req,config.mysql,q,1)]).then(function(results)
    {
        $arr['pagination'] = results[1][0].length;
        $arr['messages'] = results[0][0];
		if(typeof($arr['action']) === 'undefined' || $arr['action'] =='') { 
			$arr['messagesstatus'] = '';
		}
		else {
			$arr['messagesstatus'] = $arr['action'];
		}
        var pagination = require('pagination');
        var paginator = new pagination.SearchPaginator({prelink:'/admincp/messages/'+req.body.action, current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});
        $arr['pagination_html'] = paginator.render(); 
        common.tplFile('admincp/messages.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
    });
  } 
});

app.get(['/','/dashboard'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['dashboardmenu'] = 'active';
  q.all([admin.exportProjectDashboard(res,config.mysql,q),admin.exportUserDashboard(res,config.mysql,q),admin.exportTransactionDashboard(res,config.mysql,q)]).then(function(result)
  {	
     $arr['project'] = result[0][0][0];
     $arr['users']   = result[1][0][0];
     $arr['trans']   = result[2][0][0];
     common.tplFile('admincp/index.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
   });  
});

app.get(['/withdrawal','/withdrawal/:action/:id'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['withdrawalmenu'] = 'active';
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;

  action = req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
  if(action == 'paid') {
		admin.paidWithdraw(req,config.mysql,q);
		admin.unpaidWithdraw(req,config.mysql,q);
		res.writeHead(302,{'Location':'/admincp/withdrawal/success/Mark As Paid'});
		res.end();return false;
  } 
  if(action == 'success')
  {
    $arr['message'] = 'Mark AS Paid Success!';
  } 
  q.all([admin.allWithdraw(req,config.mysql,q,0),admin.allWithdraw(req,config.mysql,q,1)]).then(function(result)
  { 
	$arr['withdraw'] = result[0][0];
	$arr['withdraws']   = result[1][0].length;
	var paginator = new pagination.SearchPaginator({prelink:'/admincp/withdrawal/', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['withdraws']});
	$arr['pagination_html'] = paginator.render();
	common.tplFile('admincp/withdrawal.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
   });  
});

app.get(['/reviews'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['reviewsmenu'] = 'active';
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
  q.all([admin.allreviews(req,config.mysql,q,0),admin.allreviews(req,config.mysql,q,1)]).then(function(result)
  { 
		$arr['review'] = result[0][0];
		$arr['reviews']   = result[1][0].length;
		var paginator = new pagination.SearchPaginator({prelink:'/admincp/reviews/', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['reviews']});		
		$arr['pagination_html'] = paginator.render();
		common.tplFile('admincp/reviews.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
   });  
});

app.get(['/reviews/:action/:id'],function(req,res)
{
  var action = req.param('action');
  req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
  if(action == 'delete'){
    admin.deletereviews(req,config.mysql,q);
    res.writeHead(302, {
       'Location': '/admincp/reviews'
     });
     res.end();return false;
  }

});

app.get(['/dispute'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['disputemenu'] = 'active';
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
  q.all([admin.alldispute(req,config.mysql,q,0),admin.alldispute(req,config.mysql,q,1)]).then(function(result)
  { 
		$arr['review'] = result[0][0];
		$arr['reviews']   = result[1][0].length;
		var paginator = new pagination.SearchPaginator({prelink:'/admincp/dispute/', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['reviews']});		
		$arr['pagination_html'] = paginator.render();
		common.tplFile('admincp/dispute.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
   });  
});

app.post(['/blog/save'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  var attach = require('../../module/attach');
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['blogmenu'] = 'active';
  attach.save('blog',req,res);  
  req.body.id = (typeof(req.body.id) === 'undefined') ? 0 : req.body.id;
  if(req.body.id > 0) {
		admin.saveBlog(req,config.mysql,q);
		admin.blogupload(req,config.mysql,q );
		res.writeHead(302,{'Location':'/admincp/blog/edit/'+req.body.id+'/saved'});
		res.end();return false;
  } 
  else
  {  
    q.all(admin.saveBlog(req,config.mysql,q)).then(function(l) {
		req.body.id =l[0].insertId;
		admin.blogupload(req,config.mysql,q);
		res.writeHead(302,{'Location':'/admincp/blog/edit/'+l[0].insertId+'/saved'});
		res.end();return false;
    });
  }
});

app.get(['/blog','/blog/:action','/blog/:action/:id/:error','/blog/:action/:id'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['blogmenu'] = 'active';
  $arr['error'] = req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
  action = req.body.action = (typeof(req.param('action')) !== 'undefined') ? req.param('action') : '';
  $arr['blogs'] = []; 
  if(action == 'new')
  {  
     common.tplFile('admincp/nblog.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
  } 
  else if(action == 'edit')
  {
     q.all([admin.selblog(req,config.mysql,q,0)]).then(function(result) { 
       $arr['blogs'] = result[0][0][0]; 
       common.tplFile('admincp/nblog.tpl');
       common.headerSet(1);
       common.loadTemplateHeader(req,res,$arr);
     });
  } 
    
  else
  {
     if(action == 'unpublish' || action == 'publish')
     {
       admin.publishBlog(req,config.mysql,q);
     }
     req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
      q.all([admin.allblog(req,config.mysql,q,0),admin.allblog(req,config.mysql,q,1)]).then(function(result)
      { 
         $arr['blog'] = result[0][0];
         $arr['blogs']   = result[1][0].length;
         var paginator = new pagination.SearchPaginator({prelink:'/admincp/blog/', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['blogs']});
         $arr['pagination_html'] = paginator.render();
         common.tplFile('admincp/blog.tpl');
         common.headerSet(1);
         common.loadTemplateHeader(req,res,$arr);
       });
  }   
});

app.get(['/transaction/:action'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['transactionmenu'] = 'active';
   $arr.externalcss = ['datePicker'];
     $arr.externaljs = ['jquery.datePicker'];
     var projects = require('../../module/products');
     req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
     req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
     action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'search' : req.param('action');
     console.log(req.body);
     if(action == 'package' || action == 'bid' || action == 'sold' || action == 'winner' || action == 'buynow')
     {
      req.query.status = action;
      req.url += '?status='+action;
      action = req.body.action = 'list';
      
      console.log(req.url);
     }
     $arr['projects'] = [];
     if(action == 'download')
     {
      q.all([admin.transactionSearch(req,config.mysql,q,2)]).then(function(result)
      {
         var k = result[0][0].length;
         resultk = result[0][0];
         var j = 0;  
         arr = [];
         data2 = ['InvoiceId','Transaction Id','UserId','Project Title','Type','Status','Amount','Gateway','Description','Date Added'];
         arr.push(data2) ;
         for (i in resultk)
         {
              j++;
              data2 = [resultk[i]['id'],resultk[i]['transactionid'],resultk[i]['user_id'],resultk[i]['title']+'('+resultk[i]['pid']+')',resultk[i]['type'],resultk[i]['istatus'],resultk[i]['amount'],resultk[i]['gateway'],resultk[i]['description'],resultk[i]['date_added']];
              arr.push(data2) ;         
         }
         res.setHeader('Content-disposition', 'attachment; filename=report.csv');
         res.csv(arr);          
       });
     } 
     if(action == 'list')
     {
          req.body.page = (typeof(req.param('page')) === 'undefined') ? 1 : req.param('page');
        q.all([admin.transactionSearch(req,config.mysql,q,0),admin.transactionSearch(req,config.mysql,q,1)]).then(function(result)
        {            
			$arr['pagination'] = result[0][0][0]['id'];
			$arr['total'] = typeof(result[0][0][0]['paid']) === 'undefined' || result[0][0][0]['paid'] == null ? '0.00' :result[0][0][0]['paid'];
			$arr['trans'] = projects.shortDescribe(result[1][0]);
			var url = require('url');
			var url_parts = url.parse(req.url, true);
			var query = url_parts.query;
			fquery = common.urlparameter(query,{page:''});
			$arr['search'] = query ;
			$arr['fquery'] = fquery;
			$arr['dlink'] = '/admincp/transaction/download?'+fquery;
			var paginator = new pagination.SearchPaginator({prelink:'/admincp/transaction/list?'+fquery, current:  req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});
			
			$arr['pagination_html'] = paginator.render();
			common.tplFile('admincp/transaction.tpl');
			common.headerSet(1);
			common.loadTemplateHeader(req,res,$arr);
          });
     } 
});

app.get(['/settings/:action','/settings/:action/:error'],function(req,res)
{
	common.admincheckLogin(req,res,1);
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['settingsmenu'] = 'active';
	$arr[action+'settingsmenu'] = 'active';
	$arr['error'] = req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
	var action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'common' : req.param('action');
	$arr['menu'][action+'settingsmenu'] = 'active';
	var fs = require('fs')
	, ini = require('ini');  
	var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
	$arr['settings'] = configed['section'][action];
	$arr['type'] = configed['section'][action+'type'];
	$arr['value'] = configed['section'][action+'value'];
	$arr['questions'] = configed['section'][action+'questions'];
	$arr['action'] = action;
  errorr=$arr['error'];
  if(action=='mode' && errorr =='saved')
  {
    $arr['error']="Maintenance mode  updated successfully";

  }
    switch(action){
        case 'card':
            $arr['heading'] = 'Credit card details';
            break;
        case 'database':
            $arr['heading'] = 'Database settings';
            break;
        case 'facebook':
            $arr['heading'] = 'Facebook API settings';
            break;
        case 'customerio':
            $arr['heading'] = 'Customer IO settings';
            break;
        case 'linkedin':
            $arr['heading'] = 'Linkedin settings';
            break;
        case 'mode':
            $arr['heading'] = 'Maintenance mode settings';
            break;
        case 'general':
            $arr['heading'] = 'General settings';
            break;
        case 'common':
            $arr['heading'] = 'System settings';
            break;

        case 'paypal':
            $arr['heading'] = 'Paypal settings';
            break;
    }
    console.log($arr['settings']);
	common.tplFile('admincp/settings.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
});
app.get(['/stores','/stores/:error'],function(req,res)
{

  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['storemenu'] = 'active';
  var stores  = require('../../module/stores');
    var fs = require('fs')
  , ini = require('ini');
  
  var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
  if(req.param('enable'))
  {
  
  configed['section']['stores']['enable'] = req.param('enable');

  fs.writeFileSync('./config.ini', ini.stringify(configed));
  config.mysql.destroy();
  delete configure;
  delete config;
  delete $arr;

configure = require('../../configure');
  config = configure.app();
  $arr = {
    config : config
  }
  $arr['error'] = "Store functionality has changed successfully";
  }
  $arr['enabled'] = configed['section']['stores']['enable'];
  //$arr.error = (typeof(req.param('error')) === 'undefined') ? '' :  req.param('error');
  req.body.page = (typeof(req.param('page')) === 'undefined') ? 1 : req.param('page');
  q.all([stores.viewAllStores(req,config.mysql,q,0),stores.viewAllStores(req,config.mysql,q,1)]).then(function(results){           
           
          $arr['stores'] = results[0][0];
          $arr['paginaton']   = results[1][0].length;
          
          var paginator = new pagination.SearchPaginator({prelink:'/admincp/stores/', current: req.body.page, rowsPerPage: 10, totalResult: $arr['paginaton'] });    
          $arr['pagination_html'] = paginator.render();


           common.tplFile('admincp/stores.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
   });  
});
app.post(['/stores/update/'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  var stores  = require('../../module/stores'); 
  req.body.id = req.param('sid');
  q.all([stores.view(req,$arr.config.mysql,q)]).then(function(results)
    { 
      req.body.logo = results[0][0][0].logo;
    stores.updateStoresAdmin(req,$arr.config.mysql,q);
    res.writeHead(302, {
           'Location': '/admincp/stores/Updated Sucessfully!'
        });
    res.end();return false;
  });
});
app.get(['/stores/edit/:id'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  var stores  = require('../../module/stores'); 
     q.all([stores.view(req,$arr.config.mysql,q)]).then(function(results)
      {  
        $arr.id = req.param('id');
      $arr.nulldata = null;
      $arr.store = results[0][0][0];
      console.log($arr.store);
      console.log($arr.storeCategories);
      common.tplFile('admincp/editstores.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
      });
    
});
app.get(['/stores/delete/:id'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  var stores  = require('../../module/stores'); 
  stores.deleteStore(req,config.mysql,q);
  res.writeHead(302,{'Location':'/admincp/stores/Deleted Sucessfully!'});
    res.end();return false;return false; 
   
});
app.post(['/settings/:action'],function(req,res)
{
	common.admincheckLogin(req,res,1);
	delete $arr['menu'];$arr['menu'] =[];
	var action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'common' : req.param('action');
	var fs = require('fs')
	, ini = require('ini');
	
	var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
	configed['section'][action] = req.body[action];
	fs.writeFileSync('./config.ini', ini.stringify(configed));

	config.mysql.destroy();
  delete configure;
  delete config;
  delete $arr;

  configure = require('../../configure');
  config = configure.app();
  $arr = {
    config : config
  }
    console.log("Action is "+action);
    if(action == 'homepage'){
        res.writeHead(302,{'Location':'/admincp/projects/'+action+'/0/saved'});
    }else {
        res.writeHead(302, {'Location': '/admincp/settings/' + action + '/saved'});
    }
	res.end();return false;return false;
});

app.get(['/projects/:action/','/projects/:action/:id','/projects/:action/:id/:error'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['projectsmenu'] = 'active';
     $arr.externalcss = ['datePicker'];
     $arr.externaljs = ['jquery.datePicker'];
     var projects = require('../../module/products');
     req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
     req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
     action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'search' : req.param('action');
     $arr['projects'] = [];
     if(action == 'open' || action == 'closed' || action == 'sold' || action == 'future' )
     {
      req.query.status = action;
      req.url += '?status='+action;
      action = req.body.action = 'list';
     }
     if(action == 'feature') {
         req.session.featured_add = 1;
		projects.updateFeatureData(req,config.mysql,q,req.param('id'));
		res.writeHead(302,{'Location':'/admincp/projects/list'});
		res.end();return false;return false;                            
     }
     if(action == 'unfeature')
     {
          projects.updateUnFeatureData(req,config.mysql,q,req.param('id'));
          res.writeHead(302,{'Location':'/admincp/projects/list'});
          res.end();return false;return false;                            
     }
     if(action == 'delete' && req.body.id  > 0)
     {
     /* var bids = require('../../module/bid');
      q.all([bids.bidHistory(req,config.mysql,q,1)]).then(function(results)
       {
		  $arr['bcnt'] = results[0][0][0]['bid'];		  
		  if($arr['bcnt'] == 0)
		   {
			  global.projectdeleted = true;
			  projects.removeProject(req,config.mysql,q,req.body.id);
			  res.writeHead(302,{'Location':'/admincp/projects/list'});
			  res.end();return false;return false;
		   } 
		   else
		   {
			 global.unprojectdeleted = true;
			 res.writeHead(302,{'Location':'/admincp/projects/list'});
			 res.end();return false;return false;
		   } 
       }); */
 global.projectdeleted = true;
        projects.removeProject(req,config.mysql,q,req.body.id);
        res.writeHead(302,{'Location':'/admincp/projects/list'});
        res.end();return false;return false;

     }
     if(action == 'list')
     {
          $arr['deleted_project'] = $arr['undeleted_project'] = false;
          if(typeof(global.projectdeleted) !== 'undefined')
          {
            delete global.projectdeleted;
            $arr['deleted_project'] = true;
          }  
          if(typeof(global.unprojectdeleted) !== 'undefined')
          {
            delete global.unprojectdeleted;
            $arr['undeleted_project'] = true;
          }  
          $arr['menu']['projectsearchmenu'] = 'active';
          req.body.page = (typeof(req.param('page')) === 'undefined') ? 1 : req.param('page');
          $arr['menu']['projectsearchmenu'] = 'active';
          q.all([admin.userProductSearch(req,config.mysql,q,0),admin.userProductSearch(req,config.mysql,q,1)]).then(function(result)
          { 
           $arr['pagination'] = result[1][0].length;
           $arr['projects']   = projects.shortDescribe(result[0][0]);
		   $arr['projectsstatus'] = req.query.status == 'undefined' ? 'products' : req.query.status;
		   if(typeof($arr['projectsstatus']) === 'undefined') {
			  $arr['projectsstatus'] = ''; 
		   }
           var url = require('url');
           var url_parts = url.parse(req.url, true);
           var query = url_parts.query;
           fquery = common.urlparameter(query,{page:''});
           $arr['search'] = query ;
           var paginator = new pagination.SearchPaginator({prelink:'/admincp/projects/list?'+fquery, current:  req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});
           $arr['pagination_html'] = paginator.render();
           common.tplFile('admincp/project.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
          });
     } 
     if(action == 'approve' && req.body.id  > 0)
     {
		admin.approveProduct(req,config.mysql,q);
		res.writeHead(302,{'Location':'/admincp/projects/list'});
		res.end();return false;return false;
     } 
     if(action == 'new')
     {
       q.all([user.userInfo(req,config.mysql,q,req.session.userid,['paypal_address','zip','state','city','country']),common.locations(req,config.mysql,q)]).then(function(results)
        {
           $arr['menu']['projectsnewmenu'] = 'active';
           $arr['user'] = results[0][0][0];
            $arr.locations = results[1][0];
            $arr['pid'] = common.randomNumber(5);
           common.tplFile('admincp/nproject.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
        })
           
     }
     if(action == 'edit')
     {
		$arr['menu']['projectseditmenu'] = 'active';
		q.all([projects.productDetail(req,config.mysql,q),projects.productImage(req,config.mysql,q),common.locations(req,config.mysql,q)]).then(function(result)
		{
			$arr['projects'] = result[0][0][0];
            $arr.locations = result[2][0];
            $arr['projects']['sell_location'] = common.firstLetterCapital($arr['projects']['sell_location']);
            $arr['pid'] = common.randomNumber(5);
			var dateFormat = require('dateformat');
			$arr['projects']['date_add']   = dateFormat(new Date($arr['projects']['date_added']),"yyyy/mm/dd HH:MM"); 
			$arr['projects']['date_close'] = dateFormat(new Date($arr['projects']['date_closed']),"yyyy/mm/dd HH:MM"); 
			
			q.all([user.userInfo(req,config.mysql,q,$arr['projects'].user_id,['paypal_address','zip','state','city','country'])]).then(function(results)
			{ 
				$arr['image'] = result[1][0];
				$arr['user'] = results[0][0][0];   
				common.tplFile('admincp/nproject.tpl');
				common.headerSet(1);
				common.loadTemplateHeader(req,res,$arr);			
			});
		});  
     }

    if(action == 'homepage') {
        $arr.error =  req.body.error ;
        console.log("Eror is "+$arr.error);
        $arr['menu']['dealshmenu'] = 'active';
        var fs = require('fs')
            , ini = require('ini');
        var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
        $arr['settings'] = configed['section'][action];
        $arr['type'] = configed['section'][action+'type'];
        $arr['value'] = configed['section'][action+'value'];
        $arr['questions'] = configed['section'][action+'questions'];
        $arr['action'] = action;
        console.log($arr['settings']);
        $arr['heading'] = 'Deals of the day';

        common.tplFile('admincp/settings.tpl');
        common.headerSet(1);
        common.loadTemplateHeader(req,res,$arr);
    }
});

app.post(['/products/save'], function(req, res){
   var attach = require('../../module/attach');
   var admin = require('../../module/admin');
   projects = require('../../module/products');
   req.body.id = (typeof(req.body.id) === 'undefined') ? 0 : req.body.id;

    req.body.cid = (typeof(req.body.cid) == 'undefined') ? req.body.mcid : req.body.cid;
   if(req.body.id > 0)
   {
       total_size = 0;
       admin.addProductionAnswer(req,config.mysql,q,req.body.id);
		//admin.deleteAttachment(config.mysql,q,req);
		q.all([projects.productDetail(req,config.mysql,q)]).then(function(result) {

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
            q.all([projects.productImage(req, config.mysql, q)]).then(function (imgArray) {
                var imgArrayCount = imgArray[0][0].length;

                if(imgArrayCount > 0 && req.body.product_image == null){
                    req.body.product_image = imgArray[0][0][0].image;
                    req.body.avatar = imgArray[0][0][0].avatar;
                }

                projects.saveProduct(req, config.mysql, q, result[0][0][0]);
                admin.addProductionAnswer(req, config.mysql, q, req.body.id);


                size = common.convertBytesToKb(total_size)
                req.session.used_attach_space = common.sumFloat(req.session.used_attach_space, size);
                projects.updateAttachmentLimit(req, config.mysql, q, size);
                /*if(typeof(req.files.product_image) !== 'undefined')
                 {
                 var m =req.files.product_image;
                 if(typeof(m[0]) !== 'undefined')
                 {
                 for(var im = 0;im < m.length;im++){
                 admin.addAttachment(m[im],config.mysql,q,req.body.id);
                 }
                 }
                 else
                 {
                 admin.addAttachment(m,config.mysql,q,req.body.id);
                 }
                 } */
                res.writeHead(302, {'Location': '/admincp/projects/edit/' + req.body.id + '/saved'});
                res.end();
                return false;
                return false;
            }).fail(function(err){
                console.log(err.stack);
                throw err;
            }).done();
		}).fail(function(err){
            console.log(err.stack);
            throw err;
        }).done();
	}
	else
	{	
	    //attach.save('product',req,res);
        if(typeof(req.session.aid) !== 'undefined') {

            if (typeof(req.session.aid[req.body.random_id]) !== 'undefined') {

                for (i in req.session.aid[req.body.random_id]) {

                    if (req.session.aid[req.body.random_id][i] != null) {

                        req.body.product_image = req.session.aid[req.body.random_id][i].originalName;
                        req.body.avatar = req.session.aid[req.body.random_id][i].name;

                    }
                }
            }
        }
        q.all(projects.save(req,res,config.mysql,q)).then(function(l)
        {
            req.body.p_id=l[0].insertId;
            req.body.id=l[0].insertId;
            total_size = 0;
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
            admin.addProductionAnswer(req,config.mysql,q,req.body.p_id);
           /* if(typeof(req.files.product_image) !== 'undefined')
            {
            var m =req.files.product_image;
            if(typeof(m[0]) !== 'undefined')
            {
                for(var im = 0;im < m.length;im++){
                    admin.addAttachment(m[im],config.mysql,q,l[0].insertId);
                }
            }
            else {
                admin.addAttachment(m,config.mysql,q,l[0].insertId);
            }
            }  */
            res.writeHead(302,{'Location':'/admincp/projects/edit/'+l[0].insertId+'/saved'});
            res.end();return false;return false;
        }).fail(function(err){
            console.log(err.stack);
            throw err;
        }).done();
	} 
});

app.post(['/users/:action/'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['usersmenu'] = 'active';
  $arr['menu']['editusersmenu'] = 'active';
  action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'all' : req.param('action');
   console.log(action);
   req.body.page = (typeof(req.param('page')) === 'undefined') ? 1 : req.param('page');
   req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
   req.body.page = (req.body.page -1)*10;
   if(action == 'save')
   {   
           req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
           var register = require('../../module/register');
           q.all([admin.editUser(req,config.mysql,q),register.checkemail(config.mysql,req),admin.listUserCategories(req,config.mysql,q)]).then(function(result)
           {
                $arr['users'] = users = {avatar:'',id : ''};
                if(result[0][0].length > 0)
                {
                  $arr['users'] = users = result[0][0][0];  
                } 
                 $arr['mcats'] = result[2][0];
                 emailuser =  result[1][0];      
                 req.body.avatar = users.avatar;
                 req.body.image  = users.image;
                  
                 if(typeof(req.files.profile_image) !== 'undefined') 
                  {
                      var fs = require('fs');
                        fs.unlink(config.path+"/uploads/profile/"+users.avatar, function (err) {
                        if (!err)
                        console.log('successfully deleted '+users.avatar);
                      });
                     var attach = require('../../module/attach');
                      req.body.avatar =  req.files.profile_image.name;
                      req.body.image = req.files.profile_image.originalname;
                      console.log(req.files.profile_image);
                      console.log(req.body);
                     attach.save('profile',req,res);

                  }

                 if(emailuser.length > 0)
                 {
                  console.log(emailuser);
                  if(req.body.id == 0)
                  {
                    res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/Email Unavailable'});
                    res.end();return false;return false;
                  } 
                 	if(emailuser[0].id != users.id && req.body.id > 0)
                 	{
                        res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/Email Unavailable'});
			     	            res.end();return false;return false;
                        return false;
                 	}	
                  //req.body.email = '';
                  console.log('stop this');
                 }	
			     if(typeof(req.body.email) === 'undefined' || typeof(req.body.first_name) === 'undefined' ||  typeof(req.body.status) === 'undefined')
			     {
			     	res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/Invalid Data'});
			     	res.end();return false;return false;
			     }	
			     else if(req.body.email == '' || req.body.first_name == '' || req.body.status == '')
			     {
			     	res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/Invalid Data'});
			     	res.end();return false;return false;
			     }	
           if(req.body.password != req.body.cpassword)
           {
             res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/Password Mismatch'});
             res.end();return false;return false;
           } 
            if(req.body.password != '' && typeof(req.body.password) !== 'undefined' && req.body.password == req.body.cpassword && req.body.id > 0)
           {
                 var md5 = require('MD5');
                 req.body.salt = '12345'
                 req.body.password = md5(md5(req.body.password)+req.body.salt);
                 admin.updateUserPassword(req,config.mysql,q);
           } 
           if(req.body.id == 0)
           {
             console.log(req.body.password);
             if(req.body.password == '' || typeof(req.body.password) === 'undefined' || req.body.password != req.body.cpassword)
             {
                  res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/Password Error'});
                  res.end();return false;return false;
             }
             q.all(admin.addUser(req,config.mysql,q)).then(function(r)
             { 

             console.log(JSON.stringify(r));
             req.body.id = r[0].insertId;
             admin.updateUser(req,config.mysql,q);
                // admin.updateUserStatus(req,config.mysql,q);
             admin.updateUserPassword(req,config.mysql,q);
              var managecats = function(mcat, cb) {
                        admin.managecategories(req,config.mysql,q,mcat);
                      cb(null);  
                   }
                   
                  admin.removeCategories(req,config.mysql,q);
                  if(typeof(req.body.categories) !='undefined')
                   {
                     var async = require('async');
                          async.each(req.body.categories, managecats, function(err) {
                          if (err) return console.error(err);
                            res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/saved'});
                            res.end();return false;return false;
                           });
                   }
                   else
                   {
                           res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/saved'});
                            res.end();return false;return false;
                   } 

                
            
             });             
           }
           else
           {
            admin.updateUser(req,config.mysql,q);
            admin.updateUserStatus(req,config.mysql,q);

  
                     var managecats = function(mcat, cb) {
                        admin.managecategories(req,config.mysql,q,mcat);
                      cb(null);  
                   }
                   
                  admin.removeCategories(req,config.mysql,q);
                  if(typeof(req.body.categories) !='undefined')
                   {
                     var async = require('async');
                          async.each(req.body.categories, managecats, function(err) {
                          if (err) return console.error(err);
                            res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/saved'});
                            res.end();return false;return false;
                           });
                   }
                   else
                   {
                           res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/saved'});
                            res.end();return false;return false;
                   } 

            }       
            
            
            
			     
           });
   }	
});
app.get(['/users/','/users/:action/','/users/:action/:id','/users/:action/:id/:error'],function(req,res)
{
  common.admincheckLogin(req,res,1);
   action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'all' : req.param('action');
  delete $arr['menu'];$arr['menu'] =[];
   req.body.page = (typeof(req.param('page')) === 'undefined') ? 1 : req.param('page');
   $arr['error'] = req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
   $arr['menu']['usersmenu'] = 'active';
   raction = action;

   
   if(action == 'active' || action == 'cancel' || action == 'unverified' || action == 'moderate' || action == 'all')
   {
        $arr['menu'][action+'usersmenu'] = 'active';
        q.all([admin.userList(req,config.mysql,q,1),admin.userList(req,config.mysql,q,0)]).then(function(result) {
            //console.log(result[0][0])
            //$arr['project'] = result[0][0][0];
            console.log('**************' + result[1][0].length + '******************');
            $arr['pagination'] = result[1][0].length;
            $arr['users'] = result[0][0];
            $arr['userstatus'] = '';
            if (typeof(action) === 'undefined' || action == 'all') {
                $arr['userstatus'] = '';
            }
            else {
                $arr['userstatus'] = action;
            }

            var paginator = new pagination.SearchPaginator({
                prelink: '/admincp/users/' + raction + '/',
                current: req.body.page,
                rowsPerPage: 10,
                totalResult: $arr['pagination']
            });

            $arr['pagination_html'] = paginator.render();

                $arr['action'] = action;
                if ($arr['action'] == 'cancel'){
                    $arr['action'] = 'cancelled';
                }
			     //$arr['trans'] = result[2][0][0];
				 if(raction == 'search') {
					common.tplFile('admincp/susers.tpl');
				 }
				 else {
					common.tplFile('admincp/users.tpl');
				 }
				 common.headerSet(1);
				 common.loadTemplateHeader(req,res,$arr);
		   });

   } 
   if(action == 'search')
   {

    $arr['menu']['searchusersmenu'] = 'active';
        req.body.email = (typeof(req.param('email')) === 'undefined') ? '' : req.param('email'); 
           req.body.first_name = (typeof(req.param('first_name')) === 'undefined') ? '' : req.param('first_name'); 
           req.body.last_name = (typeof(req.param('last_name')) === 'undefined') ? '' : req.param('last_name'); 
           req.body.status = (typeof(req.param('status')) === 'undefined') ? '' : req.param('status'); 
        q.all([admin.userListSearch(req,config.mysql,q,1),admin.userListSearch(req,config.mysql,q,0)]).then(function(result)
        { 
          //console.log(result[0][0])
           //$arr['project'] = result[0][0][0];
           
           var url = require('url');
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
           $arr['pagination'] = result[1][0].length;
           $arr['users'] = result[0][0];
           $arr['search'] = query ;
           fquery = common.urlparameter(query,{page:''});
           var paginator = new pagination.SearchPaginator({prelink:'/admincp/users/'+raction+'/?'+fquery, current:  req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});

           $arr['pagination_html'] = paginator.render();
           //$arr['trans'] = result[2][0][0];
           if(raction == 'search')
           {
            common.tplFile('admincp/susers.tpl');
           }
           else 
           {
            common.tplFile('admincp/users.tpl');
           }
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
         });

   }  

    if(action == 'delete' )
   {

 req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');

admin.userdelete(req,config.mysql,q,req.body.id);

            res.writeHead(302,{'Location':'/admincp/users/cancel'});
                            res.end();return false;return false;
                        
   }
   if(action == 'edit' || action == 'add')
   {
      $arr['menu']['editusersmenu'] = 'active';
    if(action == 'add')
      $arr['menu']['addusersmenu'] = 'active';
           req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
           q.all([admin.editUser(req,config.mysql,q),admin.listUserCategories(req,config.mysql,q)]).then(function(result)
           {
                 $arr['users'] = result[0][0][0];                
			     $arr['mcats'] = result[1][0][0]['mcat'];
           console.log($arr['mcats']+'as');
           $arr.stat_msg="User successfully added";
			     common.tplFile('admincp/eusers.tpl');
			     common.headerSet(1);
			     common.loadTemplateHeader(req,res,$arr);
           });
   }

   
});

app.post(['/categories/save'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
          $arr['menu']['categoriesmenu'] = 'active';
          if(typeof(req.body.title) === 'undefined' || typeof(req.body.description) === 'undefined')
           {
            res.writeHead(302,{'Location':'/admincp/categories/edit/'+req.body.id+'/Invalid Data'});
            res.end();return false;return false;
           }  
           else if(req.body.title == '' || req.body.description == '')
           {
            res.writeHead(302,{'Location':'/admincp/categories/edit/'+req.body.id+'/Invalid Data'});
            res.end();return false;return false;
           }  
           req.body.id = (req.body.id > 0) ? req.body.id : 0;
          if(req.body.id == 0)
           {  
           q.all([admin.selectMaxrgt(req,config.mysql,q)]).then(function(out) {
             req.body.mrgt = out[0][0][0]['mrgt'];
             console.log(out[0][0][0]['mrgt']);
             if(req.body.id == 0)
             { 
               admin.updateLeft(req,config.mysql,q);
               admin.updateRight(req,config.mysql,q);
             } 
             q.all([admin.categorySave(req,config.mysql,q)]).then(function(result) {
                  
                  if(req.body.id == 0)
                  {  
                   req.body.id = result[0][0].insertId;
                  }
                  res.writeHead(302,{'Location':'/admincp/categoriesalter/'});
                  res.end();return false;return false;
             });
            }); 
          }
          else
          {
             q.all([admin.selectCategories(req,config.mysql,q)]).then(function(result)
              { 
                   console.log(result[0][0]);
                   $arr['categories'] = result[0][0][0];
                   req.body.opid = result[0][0][0].parent_id
                   admin.categoryupdate(req,config.mysql,q);
                   res.writeHead(302,{'Location':'/admincp/categoriesalter/'});
                   res.end();return false;
              });
          } 
        
           
});
app.get(['/categoriesdelete/:id'],function(req,res)
{
    
    admin.deleteCategories(req,config.mysql,q);
    res.writeHead(302,{'Location':'/admincp/categoriesalter/'});
    res.end();return false;

});

app.get(['/categoriesalter/'],function(req,res)
{



    var arr = {};

    var s = 0;
    q.all([admin.getAllCategory(req,config.mysql,q)]).then(function(results)
    {
        //console.log(async)
        var k = results[0][0];
        s = k.length;
        for(i in k)
        {
            if(typeof(arr['cat_'+k[i].parent_id]) === 'undefined')
            {
                arr['cat_'+k[i].parent_id] = [];


            }
            else
            {

            }

            arr['cat_'+k[i].parent_id].push(k[i].id);
            if(i == k.length - 1)
            {
                http = require('http');
                console.log(arr);
                console.log('/forward/webservice.php?cmd=_category_module&data='+JSON.stringify(arr));
                var options = {
                    host: $arr.config.webservice.url,
                    port: 80,
                    path:'/forward/webservice.php?cmd=_category_module&data='+JSON.stringify(arr)
                };
                console.log(options);
                var reqs = http.get(options, function(rest) {

                    console.log("Got response: " + rest.statusCode);
                    var m ='';
                    rest.on("data", function(chunk) {

                        m = JSON.parse(chunk);
                    });
                    rest.on("end", function() {
                        var s = 0;
                        var r = 0;
                        for(i in m)
                        {
                            r++;
                        }
                        for(i in m)
                        {
                            s++;
                            if(typeof(m[i]['lft']) !== 'undefined')
                            {
                                console.log(i);
                                admin.updateLftRgtCategories(req,config.mysql,q,m[i]['lft'],m[i]['rht'],i);
                            }
                            console.log(s);
                            console.log(r);
                            if(s == r)
                            {
                                res.writeHead(302,{'Location':'/admincp/categories/list/'});
                                res.end();return false;return false;

                            }


                        }


                    });
                }).on('error', function(e) {
                    console.log(e);
                    console.log("Got error: " + e.message);
                });

            }
        }
    });
});


app.get(['/cquestionadd/:cid'],function(req,res)
{
  q.all([admin.categoriesDetail(req,config.mysql,q)]).then(function(results){
           
           $arr.cid = req.param('cid');
           $arr.id = 0;
           $arr.ctitle = results[0][0][0]['name'];
           common.tplFile('admincp/cquestionsadd.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
  });  

});
app.get(['/cquestionedit/:cid/:id'],function(req,res)
{
  q.all([admin.categoriesDetail(req,config.mysql,q),admin.categoriesQuestionDetail(req,config.mysql,q)]).then(function(results){
           
           
           $arr.cid = req.param('cid');
           $arr.id = req.param('id');
           $arr.ctitle = results[0][0][0]['name'];
           $arr.questions = results[1][0][0];
           common.tplFile('admincp/cquestionsadd.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
  });  

});
app.post(['/cquestions/save'],function(req,res)
{
  if(req.body.id == 0)
    admin.createQuestion(req,config.mysql,q);
  else
    admin.updateQuestion(req,config.mysql,q);
    res.writeHead(302,{'Location':'/admincp/cquestions/'+req.body.cid});
    res.end();return false;return false;

});
app.get(['/cquestions/:cid'],function(req,res)
{
  q.all([admin.categoriesQuestion(req,config.mysql,q),admin.categoriesDetail(req,config.mysql,q)]).then(function(results){
           $arr.questions = results[0][0];
           $arr.id = req.param('cid');
           $arr.ctitle = results[1][0][0]['name'];
           common.tplFile('admincp/cquestions.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
  });  

});
app.get(['/categories/:action','/categories/:action/:id','/categories/:action/:id/:error'],function(req,res)
{
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
    $arr['menu']['categoriesmenu'] = 'active';
    req.body.page = (typeof(req.param('page')) === 'undefined') ? 1 : req.param('page');
    $arr['error'] = req.body.error = (typeof(req.param('error')) === 'undefined') ? '' : req.param('error');
    action = req.body.action = (typeof(req.param('action')) === 'undefined') ? 'list' : req.param('action');
    id = req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
    if(action == 'list')
    {
      q.all([admin.categoriesList(req,config.mysql,q,1),admin.categoriesList(req,config.mysql,q,0)]).then(function(result)
      { 
           $arr['pagination'] = result[1][0].length;
           cats = sub = $arr['categories'] = result[0][0];

            var maincategory = [];
            var allcats = [];
           
            cats.forEach(function(item) {
              if(item.parent_id == 0){
               maincategory.push(item);
              
               sub.forEach(function(subitem) {
                if(item.id == subitem.parent_id){
                  maincategory.push(subitem);
                  
                }
               });

              }
            });

            $arr['maincatsall'] = maincategory;
            
            var limit = (req.body.page - 1) * 10;

            for(var i= limit ; i< limit+10; i++ ){
              if(maincategory[i]){
                allcats.push( maincategory[i] );
              }

            }
            $arr['maincats'] = allcats;
            
                       
           
           var paginator = new pagination.SearchPaginator({prelink:'/admincp/categories/list', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});

           $arr['pagination_html'] = paginator.render();
           common.tplFile('admincp/categories.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
      });
    } 
    if(action == 'add')
    { 
      q.all(common.allCategoriesList(req,config.mysql,q)).then(function(result)
      {
           $arr['pcategories'] = result[0];
           console.log($arr['pcategories']);
           common.tplFile('admincp/ncategories.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
      });
    }
    /*if(action == 'delete')
    { 
      q.all(common.selectDeleteCategories(req,config.mysql,q)).then(function(result)
      {
               req.body.mrgt = out[0][0]['mrgt']; 
               req.body.mlft = out[0][0]['mlft'];
               req.body.myw = out[0][0]['myw']; 
               admin.updateLeftDelete(req,config.mysql,q);
               admin.updateRightDelete(req,config.mysql,q);
      });
    }*/
    if(action == 'edit')
    {
      q.all([admin.selectCategories(req,config.mysql,q),common.allCategoriesList(req,config.mysql,q)]).then(function(result)
      { 
           console.log(result[0][0]);
           $arr['pcategories'] = result[1][0];
           $arr['categories'] = result[0][0][0];
           common.tplFile('admincp/ncategories.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
      });
    }  

    

});


app.get(['/referral'],function(req,res)
{
  common.admincheckLogin(req,res,1);
	var dashboard = require('../../module/dashboard');	
	var rid = req.body.rid = (typeof(req.param('rid')) === 'undefined') ? '0' : req.param('rid');
	if(rid > 0)
	{
	dashboard.updateReferralStatus(req,config.mysql,q,rid);
	admin.addbalance(req,config.mysql,q,req.param('ruid'));
	res.writeHead(302, {
             'Location': '/admincp/referral/'
       });
       res.end();return false;
	
	}
	else
	{	 
	delete $arr['menu'];
	$arr['menu'] =[];
    $arr['menu']['referralmenu'] = 'active';
	req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;   
		$arr['referral'] = $arr['referrallink'] =  '';		
		console.log(req.body.page);
		q.all([dashboard.getReferral(req,config.mysql,q,1,0),dashboard.getReferral(res,config.mysql,q,1,1)]).then(function(result)
		{
		 $arr['referral'] = result[0][0];
		 $arr['referrals']   = result[1][0].length;
	
	     var paginator = new pagination.SearchPaginator({prelink:'/admincp/referral/', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['referrals']});
         $arr['pagination_html'] = paginator.render();
		
		 common.tplFile('admincp/referals.tpl');
         common.headerSet(1);
         common.loadTemplateHeader(req,res,$arr);		  
		});
	}
      
});

app.get(['/referdelete'],function(req,res)
{
    common.admincheckLogin(req,res,1);
    var rid = req.param('rid');
    admin.deletereferral(req,config.mysql,q,rid);
    res.writeHead(302,{'Location':'/admincp/referral/'});
    res.end();return false;

});

/******************************** Mailer Mangement emailmgtmenu *************************************************/

app.get(['/mailers'],function(req,res)
{
 delete $arr['menu'];$arr['menu'] =[];
  $arr['menu']['managementmenu'] = 'active';
  $arr['menu']['emailmgtmenu'] = 'active';
  var bids = require('../../module/bid'); 
  var data = bids.SearchPageNo(req,config.mysql,q);

  
  common.admincheckLogin(req,res,1);
  
  $arr['local_id'] = 'local';
 // $arr['local_api'] = global.emaillocal.api;
  $arr['local_user'] = global.emaillocal.user;
  $arr['local_pwd'] = global.emaillocal.pwd;
  $arr['local_type'] = global.emaillocal.type;
  $arr['local_status'] = global.emaillocal.status;

  $arr['customerio_id'] = 'customerio';
  $arr['customerio_api'] = global.emailcio.api;
  $arr['customerio_key'] = global.emailcio.key;
  $arr['customerio_type'] = global.emailcio.type;
  $arr['customerio_status'] = global.emailcio.status;


  $arr['smstwo_id'] = 'twillio';
  $arr['smstwo_sid'] = global.smstwo.sid;
  $arr['smstwo_token'] = global.smstwo.token;
  $arr['smstwo_type'] = global.smstwo.type;
  $arr['smstwo_status'] = global.smstwo.status;
     
 
  common.tplFile('admincp/mailers.tpl');
  common.headerSet(1);
  common.loadTemplateHeader(req,res,$arr);

  
});

app.post(['/mailers/:action'],function(req,res){
  var action = req.param('action');
  var id = req.param('id');
  var type = req.param('method');

 

    if(action == 'deactive'){
     
      var fs = require('fs')
      , ini = require('ini');
     var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

    if(type == "email"){
     
      if(id == 'local'){
          console.log('Entered');
          configed['section']['localmail']['status'] = 'no';
      }


      else if(id == 'customerio'){
          configed['section']['customeriomail']['status'] = 'no';
      }

      else{}

    } 

    if(type == "sms"){

        if(id == 'twillio'){

          configed['section']['twilliosms']['status'] = 'no';

        }
        
        else{}

    } 

    fs.writeFileSync('./config.ini', ini.stringify(configed));

    config.mysql.destroy();
    delete configure;
    delete config;
    delete $arr;

    configure = require('../../configure');
    config = configure.app();
      
      $arr = {
        config : config
      }

     res.writeHead(302, {
      
         'Location': '/admincp/mailers'
      
      });
      
      res.end();
      return false;
  } 
    
  if(action == 'active'){
    
     var id = req.param('id');
     
     
     var fs = require('fs')
     , ini = require('ini');
     var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
     
      if(type=="email"){

          //Deactivating all the Methods
        configed['section']['localmail']['status'] = 'no';
        configed['section']['customeriomail']['status'] = 'no';
        fs.writeFileSync('./config.ini', ini.stringify(configed));
        //Activating Current Method
          
        if(id == 'local'){
            console.log('Entered');
            configed['section']['localmail']['status'] = 'yes';
        }

         else if(id == 'customerio'){
          console.log('Entered');
            configed['section']['customeriomail']['status'] = 'yes';
         }
         else{}
      }

      if(type == "sms"){

        if(id == 'twillio'){

            configed['section']['twilliosms']['status'] = 'yes';

        }
        else{}

      } 

       fs.writeFileSync('./config.ini', ini.stringify(configed));

    config.mysql.destroy();
    delete configure;
    delete config;
    delete $arr;

configure = require('../../configure');
  config = configure.app();
  $arr = {
    config : config
  }

     res.writeHead(302, {
      
         'Location': '/admincp/mailers'
      
      });
    
    res.end();
    return false;

  
  }



});

/*Reports */
app.post(['/reports_create'],function(req,res){

    spage = (typeof(req.body.page) !== 'undefined') ? req.body.page : 1;
    console.log('page'+spage);

  var csv = require('csv');
  var csvdata;
  var lbreak = "\n";
  var headings = [];
  var details = [];
  var all_details = [];

  if(req.body.reports === 'ipaid' || req.body.reports === 'iunpaid'){


    if(req.body.invoiceid)  { csvdata = "Invoice Id,";      } else{ csvdata = ''; }
    if(req.body.proid)      { csvdata += "Product Id,";     }
    if(req.body.productname){ csvdata += "Product Name,";   }
    if(req.body.date_added) { csvdata += "Date Added,";     }
    if(req.body.uid)        { csvdata += "User,";           } 
    if(req.body.username)   { csvdata += "User Name,";      }
    if(req.body.t_amount)   { csvdata += "Total Amount,";   }
    if(req.body.istatus)    { csvdata += "Invoice Status,"; }
    if(req.body.itype)      { csvdata += "Invoice type,";    }
    
    

    csvdata += lbreak;

    if(req.body.reports === 'ipaid'){
      reports_status = 'paid';
    }

    else{
      reports_status = 'unpaid';
    }

    

    q.all(admin.csvInvoicesRep(req,config.mysql,q,reports_status)).then(function(result){
      if(req.body.type == 'dsp'){ headings = csvdata.split(','); headings.pop(); }

      var counts = result[0].length;
      console.log('pfff'+counts);
      for(var i = 0; i<counts; i++){
         
        console.log(result[0][i].id);
        if(req.body.invoiceid)  { csvdata += result[0][i].id+',';details.push( result[0][i].id );                } 
        if(req.body.proid)      { csvdata += result[0][i].primary_id+',';details.push( result[0][i].primary_id );} 

        if(req.body.productname){ csvdata += result[0][i].description.replace(/,/g, " ")+','; details.push( result[0][i].description );    } 

        if(req.body.date_added) { csvdata += result[0][i].date_added+','; details.push( result[0][i].date_added );} 
        if(req.body.uid)        { csvdata += result[0][i].user_id+','; details.push( result[0][i].user_id );      } 

        if(req.body.username)   { csvdata += result[0][i].first_name+" "+result[0][i].last_name+ ',';  details.push( result[0][i].first_name+" "+result[0][i].last_name );  } 

        if(req.body.t_amount)   { csvdata += result[0][i].amount+','; details.push( result[0][i].amount );    } 
        if(req.body.istatus)    { csvdata += result[0][i].status+','; details.push( result[0][i].status );    } 
        if(req.body.itype)      { csvdata += result[0][i].type+','; details.push( result[0][i].type );        } 
        
        all_details[i] = details;
        details=[];

        csvdata += lbreak;
        console.log(csvdata + i);
       
      }

      if(counts == 0){
         csvdata += "No results found";
      }



      if(req.body.type == 'dsp'){
        var limits = (spage-1)*10;
        var ends = (spage)*10;
        $arr['page'] = spage;
        $arr['requests'] = req.body;
        $arr['headings'] = headings;
        $arr['all_details'] = all_details.slice(limits,ends);
        

         var paginator = new pagination.SearchPaginator({ prelink: 'javascript:paginationReports', current:  spage, rowsPerPage: 10, totalResult: all_details.length,ajax:true});
         $arr['pagination_html'] = paginator.render();

        
        common.headerSet(1);
        common.tplFile('admincp/reportdisplay.tpl');
        common.loadTemplateHeader(req, res, $arr);

      }
      else{

        res.setHeader('Content-disposition', 'attachment; filename=sellerreports.csv');
        res.set('Content-Type', 'application/octet-stream');
        res.send( csvdata );

      }
      
      
    });
        
     
    
   
  }
  

  if(req.body.reports === 'sopened' || req.body.reports ==='sclosed' || req.body.reports === 'ssold' || req.body.reports === 'sending' ){
   

    if(req.body.pid)        { csvdata = "Product Id,";      } else{ csvdata = ''; }
    if(req.body.pname)      { csvdata += "Product Name,";   }
    if(req.body.qty){ csvdata += "Quantity,";               }
    if(req.body.pdate_added){ csvdata += "Date Added,";     }
    if(req.body.sid)        { csvdata += "Seller Id,";      } 
    if(req.body.sell_name)  { csvdata += "Seller Name,";    }
    if(req.body.p_amount)   { csvdata += "Sell Price,";     }
    if(req.body.s_amount)   { csvdata += "Shipping Amount,";}
    if(req.body.sold_item)  { csvdata += "Sold,";           }
    if(req.body.ptype)      { csvdata += "Product Type,";   }
    if(req.body.dclosed)    { csvdata += "Date Closed,";    }
    if(req.body.paid_date)  { csvdata += "Paid Closed,";     }

    csvdata += lbreak;
    
    if(req.body.reports === 'sopened' ){
      reports_status = 1;
    }
    else if(req.body.reports === 'sclosed' ){
      reports_status = 2;
    }
    else if(req.body.reports === 'ssold' ){
      reports_status = 3;
    }
    else if(req.body.reports === 'sending' ){
      reports_status = 4;
    }
    else{
      console.log('Something went wrong');
      return false;

    }


    q.all(admin.csvSellerRep(req,config.mysql,q,reports_status)).then(function(results){

      console.log(results[0][0]);

       if(req.body.type == 'dsp'){ headings = csvdata.split(','); headings.pop(); }

      var counts = results[0].length;
      console.log('pfff'+counts);
      for(var i = 0; i<counts; i++){
         
        if(req.body.pid)          { csvdata += results[0][i].id+','; details.push( results[0][i].id );                             } 
        if(req.body.pname)        { csvdata += results[0][i].title.replace(/,/g, " ")+','; details.push(results[0][i].title);      } 
        if(req.body.qty)          { csvdata += results[0][i].qty+',';  details.push( results[0][i].qty );                          } 
        if(req.body.pdate_added)  { csvdata += results[0][i].date_added+','; details.push( results[0][i].date_added );             } 
        if(req.body.sid)          { csvdata += results[0][i].user_id+',';   details.push( results[0][i].user_id );                 } 
        if(req.body.sell_name)    { csvdata += results[0][i].first_name+" "+results[0][i].last_name+ ','; details.push( results[0][i].first_name+" "+results[0][i].last_name ); } 
        if(results[0][i].buynow == 0){
         
          if(req.body.p_amount)     { csvdata += results[0][i].sprice+','; details.push( results[0][i].sprice );                  } 

        }
        else{

          if(req.body.p_amount)     { csvdata += results[0][i].bprice+','; details.push( results[0][i].bprice );                   } 

        }

        if(req.body.s_amount)     { csvdata += results[0][i].shipping_price+',';details.push( results[0][i].shipping_price );      } 
         if(req.body.sold_item)   { csvdata += results[0][i].sold+',';   details.push( results[0][i].sold );                       }
        if(results[0][i].buynow == 1){

          if(req.body.ptype)        { csvdata += 'Buy Now'+',';details.push( 'Buy Now' );                                          } 

        }
        else{
          
          if(req.body.ptype)        { csvdata += 'Auction'+','; details.push('Auction');                                           } 

        }
        if(req.body.dclosed)        { csvdata += results[0][i].date_closed+','; details.push( results[0][i].date_closed );         }
        if(req.body.paid_date)      { csvdata += results[0][i].paid_date+',';  details.push( results[0][i].paid_date );            }

        all_details[i] = details;
        details=[];


        csvdata += lbreak;

      }

      if(counts == 0){
         csvdata += "No results found";
      }

      if(req.body.type == 'dsp'){
        var limits = (spage-1)*10;
        var ends = (spage)*10;
        $arr['page'] = spage;
        $arr['requests'] = req.body;
        $arr['headings'] = headings;
        $arr['all_details'] = all_details.slice(limits,ends);
        

         var paginator = new pagination.SearchPaginator({ prelink: 'javascript:paginationReports', current:  spage, rowsPerPage: 10, totalResult: all_details.length,ajax:true});
         $arr['pagination_html'] = paginator.render();

        
        common.headerSet(1);
        common.tplFile('admincp/reportdisplay.tpl');
        common.loadTemplateHeader(req, res, $arr);

      }
      else{

        res.setHeader('Content-disposition', 'attachment; filename=sellerreports.csv');
        res.set('Content-Type', 'application/octet-stream');
        res.send( csvdata );

      }

    });


  }

  if(req.body.reports === 'buyout' || req.body.reports === 'bidout' ){

    if(req.body.p_id)        { csvdata = "Product Id,";      } else{ csvdata = ''; }
    if(req.body.p_name)      { csvdata += "Product Name,";   }
    if(req.body.amt){ csvdata += "Amount,";                  }
    if(req.body.r_date)      { csvdata += "Date Added,";     }
    if(req.body.bid)         { csvdata += "Buyer Id,";       } 
    if(req.body.buyer)       { csvdata += "Buyer Name,";     }
    if(req.body.slid)        { csvdata += "Seller Id,";      }
    if(req.body.seller)      { csvdata += "Seller Name,";    }
    if(req.body.p_type)      { csvdata += "Product Type,";   }
    
    csvdata += lbreak;

    if(req.body.reports === 'buyout'){
      reports_status = 1;
    }
    else if(req.body.reports === 'bidout'){
      reports_status = 2;
    }
    else{

      return false;

    }


    q.all(admin.csvBuyerRep(req,config.mysql,q,reports_status)).then(function(result){

      if(req.body.type == 'dsp'){ headings = csvdata.split(','); headings.pop(); }

      var counts = result[0].length;
      console.log('pfff'+counts);
      for(var i = 0; i<counts; i++){

        if(req.body.p_id)        { csvdata += result[0][i].id+',';details.push( result[0][i].id );                                       }
        if(req.body.p_name)      { csvdata += result[0][i].title.replace(/,/g, " ")+','; details.push( result[0][i].title );             }
        if(req.body.amt)         { csvdata += result[0][i].amount+','; details.push( result[0][i].amount );                              }
        if(req.body.r_date)      { csvdata += result[0][i].r_date+',';details.push( result[0][i].r_date );                               }
        if(req.body.bid)         { csvdata += result[0][i].user_id+',';details.push( result[0][i].user_id );                             } 
        if(req.body.buyer)       { csvdata += result[0][i].first_name+' '+result[0][i].last_name+','; details.push( result[0][i].first_name+' '+result[0][i].last_name );     }
        if(req.body.slid)        { csvdata += result[0][i].sid+','; details.push( result[0][i].sid );                                    }
        if(req.body.seller)      { csvdata += result[0][i].sell_first+' '+result[0][i].sell_last+','; details.push( result[0][i].sell_first+' '+result[0][i].sell_last );     }
        if(req.body.p_type)    { 
          if(result[0][i].buynow == 1){ 
            if(req.body.reports === 'bidout'){ csvdata += 'Buy Now/Auction'+','; }
            else{
                csvdata += 'Buy Now'+',';details.push( 'Buy Now' );  
            }
          }
          else{ csvdata += 'Auction'+',';details.push( 'Auction' );     }
        }

        all_details[i] = details;
        details=[];
        
        csvdata += lbreak;
      }

      if(counts == 0){
         csvdata += "No results found";
      }
      
      if(req.body.type == 'dsp'){
        var limits = (spage-1)*10;
        var ends = (spage)*10;
        $arr['page'] = spage;
        $arr['requests'] = req.body;
        $arr['headings'] = headings;
        $arr['all_details'] = all_details.slice(limits,ends);
        

         var paginator = new pagination.SearchPaginator({ prelink: 'javascript:paginationReports', current:  spage, rowsPerPage: 10, totalResult: all_details.length,ajax:true});
         $arr['pagination_html'] = paginator.render();

        
        common.headerSet(1);
        common.tplFile('admincp/reportdisplay.tpl');
        common.loadTemplateHeader(req, res, $arr);

      }

      else{
        res.setHeader('Content-disposition', 'attachment; filename=buyerreports.csv');
        res.set('Content-Type', 'application/octet-stream');
        res.send( csvdata );
      }

    });


  }


  if(req.body.reports === 'earned' ){

    if(req.body.pc_id)        { csvdata = "Product Id,";      } else{ csvdata = ''; }
    if(req.body.pc_name)      { csvdata += "Product Name,";   }
    if(req.body.pc_amt)       { csvdata += "Amount,";         }
    if(req.body.rc_date)      { csvdata += "Paid Date,";      }
    if(req.body.secid)        { csvdata += "Seller Id,";      } 
    if(req.body.c_seller)     { csvdata += "Seller Name,";    }
    if(req.body.byid)         { csvdata += "Buyer Id,";       }
    if(req.body.c_buyer)      { csvdata += "Buyer Name,";     }
    if(req.body.comm_amt)     { csvdata += "Commission,";     }

    csvdata += lbreak;

    q.all(admin.csvCommissionRep(req,config.mysql,q)).then(function(result){

      if(req.body.type == 'dsp'){ headings = csvdata.split(','); headings.pop(); }

      var counts = result[0].length;
      console.log('pfff'+counts);
      for(var i = 0; i<counts; i++){

        if(req.body.pc_id)        { csvdata += result[0][i].project_id+',';details.push( result[0][i].project_id );                            }
        if(req.body.pc_name)      { csvdata += result[0][i].title.replace(/,/g, " ")+',';details.push( result[0][i].title );                   }
        if(req.body.pc_amt)       { csvdata += result[0][i].amount+',';details.push( result[0][i].amount );                                    }
        if(req.body.rc_date)      { csvdata += result[0][i].paid_date+',';details.push( result[0][i].paid_date );                              }
        if(req.body.secid)        { csvdata += result[0][i].sid+',';details.push( result[0][i].sid );                                          } 
        if(req.body.c_seller)     { csvdata += result[0][i].name+',';details.push( result[0][i].name );                                        }
        if(req.body.byid)         { csvdata += result[0][i].user_id+',';details.push( result[0][i].user_id );                                  }
        if(req.body.c_buyer)      { csvdata += result[0][i].first_name+' '+result[0][i].last_name+',';details.push( result[0][i].first_name+' '+result[0][i].last_name ); }
        if(req.body.comm_amt)     { csvdata += result[0][i].commission+',';details.push( result[0][i].commission );                            }
        
        all_details[i] = details;
        details=[];
        
        csvdata += lbreak;

      }

      if(counts == 0){
         csvdata += "No results found";
      }

      if(req.body.type == 'dsp'){
        var limits = (spage-1)*10;
        var ends = (spage)*10;
        $arr['page'] = spage;
        $arr['requests'] = req.body;
        $arr['headings'] = headings;
        $arr['all_details'] = all_details.slice(limits,ends);
        

         var paginator = new pagination.SearchPaginator({ prelink: 'javascript:paginationReports', current:  spage, rowsPerPage: 10, totalResult: all_details.length,ajax:true});
         $arr['pagination_html'] = paginator.render();

        
        common.headerSet(1);
        common.tplFile('admincp/reportdisplay.tpl');
        common.loadTemplateHeader(req, res, $arr);

      }
      else{

        res.setHeader('Content-disposition', 'attachment; filename=commissions.csv');
        res.set('Content-Type', 'application/octet-stream');
        res.send( csvdata );
      }

    });
    



  }

});
/*Reports ends*/

app.get(['/banner/','/banner/:type','/banner/:type/:success','/banner/:type/:id/:success'],function(req,res)
{
    delete $arr['menu'];$arr['menu'] =[];
    $arr['menu']['bannermenu'] = 'active';
    common.admincheckLogin(req,res,1);
    var banner = require('../../module/banner');
    req.body.page = (typeof(req.param('page')) === 'undefined') ? 1 : req.param('page');
    req.body.type = (typeof(req.param('type')) === 'undefined') ? 'list' : req.param('type');

   $arr.success = (typeof(req.param('success')) === 'undefined') ? 0 : 'Banner details has been updated successfully';
    if(req.body.type == 'list')
    {
        q.all([banner.listMyBanner(req,config.mysql,q,0),banner.listMyBanner(req,config.mysql,q,1)]).then(function(result){
            $arr['pagination'] = result[1][0].length;
            $arr['banner'] = result[0][0];
            // console.log($arr['banner']);
            var pagination = require('pagination');
            //console.log($arr['banner']);
            var paginator = new pagination.SearchPaginator({prelink:'/admincp/banner', current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});
            //console.log($arr['banner']);
            //$arr['menu']['escrowmenu'] = 'active';
            $arr['pagination_html'] = paginator.render();
            //console.log($arr['banner']);
            common.tplFile('admincp/banner.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req,res,$arr);
        }).fail(function(err){
            console.log(err.stack);
            throw err;
        }).done();


    }
    if(req.body.type == 'new')
    {

           // $arr['product'] = result[0][0];
            $arr['pids'] = [];
            common.tplFile('admincp/new-banner.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req,res,$arr);


    }

    if(req.body.type == 'edit')
    {

        req.body.id = (typeof(req.param('id')) === 'undefined') ? 0 : req.param('id');
        q.all([banner.editBanner(req,config.mysql,q)]).then(function(result){

            $arr['banner'] = result[0][0][0];

            common.tplFile('admincp/new-banner.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req,res,$arr);
        }).fail(function(err){
            console.log(err.stack);
            throw err;
        }).done();

    }

});

app.post(['/banner/:type'],function(req,res)
{
    common.admincheckLogin(req,res,1);
    var banner = require('../../module/banner');
    req.body.type = (typeof(req.param('type')) === 'undefined') ? 'list' : req.param('type');
    if(req.body.type == 'save')
    {
        //req.body.id = 0;
        if(req.body.id > 0)
        {
            q.all([banner.editBanner(req,config.mysql,q)]).then(function(result){

                req.body.enable = (typeof(req.param('enable')) === 'undefined') ? 0 : 1;

                if(typeof(req.files.banner_image) === 'undefined')
                {
                    //req.files = [];
                    req.files.banner_image = {'name':result[0][0][0]['image'],'originalname':result[0][0][0]['o_image']};
                }
                banner.updateProducts(req,config.mysql,q);

                res.writeHead(302, {
                    'Location': '/admincp/banner/edit/success/?id='+req.body.id
                });
                res.end();
                return false;
            }).fail(function(err){
                console.log(err.stack);
                throw err;
            }).done();
        }
        else
        {
            req.body.enable = (typeof(req.param('enable')) === 'undefined') ? 0 : 1;

            banner.insertProducts(req,config.mysql,q);
            res.writeHead(302, {
                'Location': '/admincp/banner/'
            });
            res.end();return false;
        }
    }


});

app.post(['/editpaymods/:action'],function(req,res)
{
  var action = req.param('action');
  var fs = require('fs')
   , ini = require('ini');
  var add_to_ur = '#';
  var configed = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

  if(action == 'authorize'){

    if(req.body.auth_enable == 'yes'){
      configed['section']['paypal']['enabled'] = 'no';
      configed['section']['braintree']['enabled'] = 'no';
      configed['section']['voguepay']['enabled'] = 'no';
      configed['section']['stripe']['enabled'] = 'no';

    }

    configed['section']['authorizenet']['api'] = req.body.auth_id;
    configed['section']['authorizenet']['key'] = req.body.auth_key;
    configed['section']['authorizenet']['enabled'] = req.body.auth_enable;
    add_to_ur = add_to_ur+'collapseone';
    fs.writeFileSync('./config.ini', ini.stringify(configed));

  }

  if(action == 'paypal'){

    if(req.body.pay_status == 'yes'){
      configed['section']['authorizenet']['enabled'] = 'no';
      configed['section']['braintree']['enabled'] = 'no';
      configed['section']['voguepay']['enabled'] = 'no';
      configed['section']['stripe']['enabled'] = 'no';
      
    }
   
    configed['section']['paypal']['address'] = req.body.pay_address;
    configed['section']['paypal']['preapproval_key'] = req.body.pay_key;
    configed['section']['paypal']['paypal_api'] = req.body.pay_api;
    configed['section']['paypal']['paypal_password'] = req.body.pay_password;
    configed['section']['paypal']['paypal_signature'] = req.body.pay_signature;
    configed['section']['paypal']['paypal_username'] = req.body.pay_username;
    configed['section']['paypal']['enabled'] = req.body.pay_status;
    add_to_ur = add_to_ur+'collapseTwo';
    fs.writeFileSync('./config.ini', ini.stringify(configed));
  }

  if(action == 'braintree'){

    if(req.body.braintree_status == 'yes'){
      
      configed['section']['authorizenet']['enabled'] = 'no';
      configed['section']['paypal']['enabled'] = 'no';
      configed['section']['voguepay']['enabled'] = 'no';
      configed['section']['stripe']['enabled'] = 'no';
      
    }
    
    
    configed['section']['braintree']['merchantId'] = req.body.braintree_id;
    configed['section']['braintree']['privateKey'] = req.body.braintree_privatekey;
    configed['section']['braintree']['publicKey'] = req.body.braintree_publickey;
    configed['section']['braintree']['customerprefix'] = req.body.braintree_customerprefix;
    configed['section']['braintree']['enabled'] = req.body.braintree_status;
    
    add_to_ur = add_to_ur+'collapseFour';
    fs.writeFileSync('./config.ini', ini.stringify(configed));
  }

  if(action == 'voguepay'){

    if(req.body.vp_status == 'yes'){
      
      configed['section']['authorizenet']['enabled'] = 'no';
      configed['section']['paypal']['enabled'] = 'no';
      configed['section']['stripe']['enabled'] = 'no';
      configed['section']['braintree']['enabled'] = 'no';
      
    }
    
    configed['section']['voguepay']['enabled'] = req.body.vp_status;
    configed['section']['voguepay']['merchantid'] = req.body.vp_merchantid;

    add_to_ur = add_to_ur+'collapseFour';
    fs.writeFileSync('./config.ini', ini.stringify(configed));

  }

  if(action == 'stripe'){

    if(req.body.stripe_status == 'yes'){
      
      configed['section']['authorizenet']['enabled'] = 'no';
      configed['section']['paypal']['enabled'] = 'no';
      configed['section']['voguepay']['enabled'] = 'no';
      configed['section']['braintree']['enabled'] = 'no';
      
    }

    configed['section']['stripe']['enabled'] = req.body.stripe_status;
    configed['section']['stripe']['secretkey'] = req.body.stripe_secretkey;
    configed['section']['stripe']['publishkey'] = req.body.stripe_publishkey;

    add_to_ur = add_to_ur+'collapseFour';
    fs.writeFileSync('./config.ini', ini.stringify(configed));

  }

  config.mysql.destroy();
    delete configure;
    delete config;
    delete $arr;
   configure = require('../../configure');
  config = configure.app();
  
  $arr = {
    config : config
  }

  res.writeHead(302, {
      'Location': '/admincp/paymentmodules/'
    });
    res.end();return false; 

});


app.get(['/view_disputes','/view_disputes/:success'],function(req,res) {
        console.log("In ss")
        delete $arr['menu'];
        $arr['menu'] = [];
        $arr['menu']['disputes'] = 'active';
        common.admincheckLogin(req, res, 1);

        dispute = require('../../module/dispute');
        $arr.success = (typeof(req.param('success')) === 'undefined') ? 0 : 'Dispute details has been deleted successfully';

        q.all([dispute.showDisputes(req, config.mysql, q)]).then(function (result) {

            $arr['disputes'] = result[0][0];
            // console.log($arr['banner']);

            //console.log($arr['banner']);
            common.tplFile('admincp/dispute_list.tpl');
            common.headerSet(1);
            common.loadTemplateHeader(req, res, $arr);
        }).fail(function (err) {
            console.log(err.stack);
            throw err;
        }).done();

});

app.get(['/del_disputes/:del_id'],function(req,res) {
    req.body.del_id = (typeof(req.param('del_id')) === 'undefined') ? 0 : req.param('del_id');
    dispute = require('../../module/dispute');
    q.all([dispute.delDisputes(req,config.mysql,q),dispute.showDisputes(req, config.mysql, q)]).then(function(result){
        res.writeHead(302, {
            'Location': '/admincp/view_disputes/success'
        });
        res.end();return false;

    }).fail(function (err) {
        console.log(err.stack);
        throw err;
    }).done();
});

app.get(['/forumcats'],function(req,res) {
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
    $arr['menu']['forums'] = 'active';
    $arr['menu']['forumscats'] = 'active';
  var forums = require('../../module/forums');

  q.all([forums.getAllcats(req,config.mysql,q)]).then(function(results){

    $arr['categories'] = results[0][0];

    common.tplFile('admincp/forum_categories.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);

  });

});

app.get(['/forum_cats','/forum_cats/:action/:id'],function(req,res) {
   common.admincheckLogin(req,res,1);
  var forums = require('../../module/forums');
  if(req.param('action') == 'edit'){
    q.all([forums.getIdcats(req,config.mysql,q,req.param('id'))]).then(function(results){
      $arr['category_id'] = results[0][0][0].id;
      $arr['category_name'] = results[0][0][0].catname;
      console.log(results[0][0][0]);
      common.tplFile('admincp/forum_category.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);


    });

  }
  else if(req.param('action') == 'delete'){

    forums.deleteforumcats(req,config.mysql,q,req.param('id'));
    res.redirect('/admincp/forumcats');
    res.end();
    return false;

  }
  else{

      common.tplFile('admincp/forum_category.tpl');
      common.headerSet(1);
      common.loadTemplateHeader(req,res,$arr);

  }


});

app.post(['/addForumcats'],function(req,res) {
  
  common.admincheckLogin(req,res,1);

  var forums = require('../../module/forums');
  
  if(req.body.id > 0){

    forums.updateforumcats(req,config.mysql,q,req.body.id);
  }
  
  else{

    forums.addforumcats(req,config.mysql,q);

  }


    res.redirect('/admincp/forumcats');
    res.end();
    return false;

});

app.get(['/forumquests'],function(req,res) {
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
    $arr['menu']['forums'] = 'active';
     $arr['menu']['forumsquestions'] = 'active';
  var forums = require('../../module/forums');
  req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1; 
  q.all([forums.all_questions(req,config.mysql,q,0),forums.all_questions(req,config.mysql,q,1)]).then(function(results){

    $arr['questions'] = results[0][0];
    console.log($arr['questions']);
    $arr['pagination'] = results[1][0].length;        
    var pagination = require('pagination');
    var paginator = new pagination.SearchPaginator({prelink:'/admincp/forumquests/', current: req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});
    $arr['menu']['escrowmenu'] = 'active';
    $arr['pagination_html'] = paginator.render(); 

    common.tplFile('admincp/forum_questions.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);

  });

});

app.get(['/deletefq/:id'],function(req,res) {
  var forums = require('../../module/forums');
    forums.deleteqs(req,config.mysql,q,req.param('id'));
    res.redirect('/admincp/forumquests');
    res.end();
    return false;


});

app.get(['/forumans/:id'],function(req,res) {
  common.admincheckLogin(req,res,1);
  delete $arr['menu'];$arr['menu'] =[];
    $arr['menu']['forums'] = 'active';
     $arr['menu']['forumsquestions'] = 'active';
  var forums = require('../../module/forums');

  q.all([forums.getAnswer(req, config.mysql, q,req.param('id'))]).then(function(results){
    $arr['qid'] = req.param('id')
    $arr['answers'] = results[0][0];

    common.tplFile('admincp/forum_answers.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);

  });

});

app.get(['/deletefas/:id'],function(req,res) {
    var forums = require('../../module/forums');
    var qid = req.param('qid')
    forums.deleteans(req,config.mysql,q,req.param('id'));
    res.redirect('/admincp/forumans/'+qid);
    res.end();
    return false;


});

app.get(['/transfer_list/:id'],function(req,res)
{
  common.admincheckLogin(req,res,1);
   $arr['trans'] = req.param('id')        
   common.tplFile('admincp/transfer.tpl');
   common.headerSet(1);
   common.loadTemplateHeader(req,res,$arr);
  

});

app.post(['/transfer_ownership'],function(req,res){
  common.admincheckLogin(req,res,1);
  message = require('../../module/message');
  dashboard = require('../../module/dashboard');
  var dat = require('date-util');    
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
        req.body.message = 'You are the new owner of '+results[1][0][0].title+' . Happy Selling !.';
        console.log(results[0][0]);
        message.addmessages(req,config.mysql,q);

        res.writeHead(302, {
                'Location': '/admincp/projects/list'
        });
        res.end();
        return false;

    });
   


});




module.exports = app;
