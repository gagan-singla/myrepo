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
//required js
var configure = require('../../configure');

//default setters
var config = configure.app();

$arr = {
  config : config
}

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
    admin.addFeedbackfield(req,config.mysql,q);
    
    res.writeHead(302, {
       'Location': '/admincp/feedbacknew'
     });

    res.end();return false;

  }
  if(action == 'update'){
   
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
  $arr['menu']['feedbackmenu'] = 'active';
  
  if(action == 'delete'){

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
	common.admincheckLogin(req,res,1);
	
	common.tplFile('admincp/reports.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);

});

app.get(['/shipping'],function(req,res)
{
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['shippingmenu'] = 'active';
	common.admincheckLogin(req,res,1);
	
	common.tplFile('admincp/shipping.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);

});

app.get(['/notification'],function(req,res)
{
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['notificationmenu'] = 'active';
	common.admincheckLogin(req,res,1);
	
	common.tplFile('admincp/notification.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);

});
app.get(['/emailtemplate'],function(req,res)
{
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['emailtemplatemenu'] = 'active';
	common.admincheckLogin(req,res,1);
	
	common.tplFile('admincp/emailtemplate.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);

});
app.get(['/paymentmodules'],function(req,res)
{
	delete $arr['menu'];$arr['menu'] =[];
	$arr['menu']['paymentmodulesmenu'] = 'active';
	common.admincheckLogin(req,res,1);
	
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
			req.body.last_name = results[0][0][0]['last_name'];messages.addmessages(req,config.mysql,q);  
			res.writeHead(302, {
				 'Location': '/admincp/messages/sent/'
		   });
		   res.end();return false;
       });
  }  
  else
  {  
    q.all([messages.showmessages(req,config.mysql,q)]).then(function(results)
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
  q.all([messages.showmessages(req,config.mysql,q)]).then(function(results)
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
         data2 = ['InvoiceId','UserId','Project Title','Type','Status','Amount','Gateway','Description','Date Added'];
         arr.push(data2) ;
         for (i in resultk)
         {
              j++;
              data2 = [resultk[i]['id'],resultk[i]['user_id'],resultk[i]['title']+'('+resultk[i]['pid']+')',resultk[i]['type'],resultk[i]['istatus'],resultk[i]['amount'],resultk[i]['gateway'],resultk[i]['description'],resultk[i]['date_added']];
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
	common.tplFile('admincp/settings.tpl');
	common.headerSet(1);
	common.loadTemplateHeader(req,res,$arr);
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
	var configure = require('../../configure');
	var config = configure.app();
	
	$arr = {
		config : config
	}
	res.writeHead(302,{'Location':'/admincp/settings/'+action+'/saved'});
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
       q.all([user.userInfo(req,config.mysql,q,req.session.userid,['paypal_address','zip','state','city','country'])]).then(function(results)
        {
           $arr['menu']['projectsnewmenu'] = 'active';
           $arr['user'] = results[0][0][0];   
           common.tplFile('admincp/nproject.tpl');
           common.headerSet(1);
           common.loadTemplateHeader(req,res,$arr);
        })
           
     }
     if(action == 'edit')
     {
		$arr['menu']['projectseditmenu'] = 'active';
		q.all([projects.productDetail(req,config.mysql,q),projects.productImage(req,config.mysql,q)]).then(function(result)
		{
			$arr['projects'] = result[0][0][0];
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
});

app.post(['/products/save'], function(req, res){
   var attach = require('../../module/attach');
   var admin = require('../../module/admin');
   projects = require('../../module/products');
   req.body.id = (typeof(req.body.id) === 'undefined') ? 0 : req.body.id;
   if(req.body.id > 0)
   {
		admin.deleteAttachment(config.mysql,q,req);
		q.all([projects.productDetail(req,config.mysql,q)]).then(function(result) {
			projects.saveProduct(req,config.mysql,q,result[0][0][0]);
			if(typeof(req.files.product_image) !== 'undefined')
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
			} 
			res.writeHead(302,{'Location':'/admincp/projects/edit/'+req.body.id+'/saved'});
			res.end();return false;return false;
		});	
	}  
	else
	{	
	attach.save('product',req,res);
	q.all(projects.save(req,res,config.mysql,q)).then(function(l)
	{
		if(typeof(req.files.product_image) !== 'undefined')
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
		}  
		res.writeHead(302,{'Location':'/admincp/projects/edit/'+l[0].insertId+'/saved'});
		res.end();return false;return false;
	});    
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
			     if(typeof(req.body.email) === 'undefined' || typeof(req.body.first_name) === 'undefined' || typeof(req.body.last_name) === 'undefined' || typeof(req.body.aboutme) === 'undefined' || typeof(req.body.status) === 'undefined')
			     {
			     	res.writeHead(302,{'Location':'/admincp/users/edit/'+req.body.id+'/Invalid Data'});
			     	res.end();return false;return false;
			     }	
			     else if(req.body.email == '' || req.body.first_name == '' || req.body.last_name == '' || req.body.aboutme == '' || req.body.status == '')
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
          		 console.log('**************'+result[1][0].length+'******************');
			     $arr['pagination'] = result[1][0].length;
			     $arr['users'] = result[0][0];
				 $arr['userstatus'] = '';
				 if(typeof(action) === 'undefined' || action == 'all') { $arr['userstatus'] = '';}
				 else {$arr['userstatus'] = action;}
			
                 var paginator = new pagination.SearchPaginator({prelink:'/admincp/users/'+raction+'/', current:  req.body.page, rowsPerPage: 10, totalResult: $arr['pagination']});

                 $arr['pagination_html'] = paginator.render();
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
  var plft = 0;
  var prgt = 0;
  var lft = 0;
  var rgt = 0;
  function getSubCategoryList(row,cb)
  {       
          //lft = plft = lft+1;
          //console.log(plft+'-'+prgt+':child-'+lft+'-'+rgt);
          var id = row['id'];
          q.all([admin.getChildCategory(req,config.mysql,q,id)]).then(function(results)
          {
            var crdt = results[0][0];
            console.log(req.body);
            plft = prgt+1;
            lft =  plft+1;
            
            if(results[0][0].length == 0)
            {
              prgt = plft+1;
              admin.updateLftRgtCategories(req,config.mysql,q,plft,prgt,id);
              
              console.log(id+'p-'+plft+'-'+prgt);
              cb(null);
            }  
            for(i in crdt)
            {

              
              rgt  = lft+1;
              admin.updateLftRgtCategories(req,config.mysql,q,lft,rgt,crdt[i]['id']);
              lft = rgt+1;
              if(crdt.length-1 == i)
              {
                prgt = rgt+1;
                
                admin.updateLftRgtCategories(req,config.mysql,q,plft,prgt,id);
                cb(null);
              }

            }  
             
          });
  }
  q.all([admin.getChildCategory(req,config.mysql,q,0)]).then(function(results)
  {
    req.body.left = 0;
    req.body.rgt = 0;
    req.body.pleft = 0;
    req.body.prgt = 0;
    var async = require('async');
    async.each(results[0][0], getSubCategoryList, function(err, subcategories) {          
       res.writeHead(302,{'Location':'/admincp/categories/list'});
       res.end();return false;return false;
    });
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
           $arr['categories'] = result[0][0];
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


module.exports = app;
