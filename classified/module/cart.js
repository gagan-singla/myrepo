var mysqli = require('./mysqli');
var products = require('./products');
var q = require('q');
var topHTMLtext = '';
exports.updateDeleteBooked = function(req,mysql,q,pdt)
{
	$mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'timer3'); 
    var defered = q.defer();
    var escape_data =  [pdt['qty'],pdt['project_id']];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    strQuery = mysqli.mysqli($mysqli,'timer9'); 
    var defered = q.defer();
    var escape_data =  [pdt['id']];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.cartPaidPrdt =  function(req,mysql,q,id,cart_id,qty_add)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'timer10'); 
    var defered = q.defer();
    var escape_data =  [id,cart_id];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    strQuery = mysqli.mysqli($mysqli,'timer3'); 
    var defered = q.defer();
    var escape_data =  [qty_add,id];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.minusReduceCart=  function(req,mysql,q)
{
    $mysqli =  {};     
    var defered = q.defer();    
    strQuery = mysqli.mysqli($mysqli,'timer11'); 
    query =  mysql.query(strQuery,defered.makeNodeResolver());
    return defered.promise;

}
exports.clearAllCart =  function(req,mysql,q,sec)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'timer7'); 
    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [datenow,sec];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.paidBuynow = function(req,mysql,q,id,escrow)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx230'); 
	var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var defered = q.defer();
    var release = 1;
    var r_date = datenow;
    if(escrow == 0)
    {
    	release = 0;
    	r_date = '0000-00-00 00:00:00'
    }	
    var escape_data =  [id,datenow,release,r_date,escrow,req.param('id')];
    console.log(escape_data);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.insertBidnow = function(req,mysql,q,pay)
{
    $mysqli =  {};     
        
    strQuery = mysqli.mysqli($mysqli,'cnx212'); 
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    console.log(datenow);
    var sold = 1;
    var amt = pay.amount;
    //var amt = req.session.products[d]['qty_add']*(req.session.products[d]['bprice']+req.session.products[d]['shipping_price']);
    commission = parseFloat((amt)*(req.body.commission/100)).toFixed(2)
    
    var escape_data =  [pay.payid,pay.sessionsdata.userid,amt,datenow,1,0,1,0,1,0,'0000-00-00 00:00:00',0,'0000-00-00 00:00:00',0,commission];
  
    
    var defered = q.defer();
    //var escape_data =  [req.param('id')];       
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}
exports.getCartDetails = function(req,mysql,q)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx218'); 
    
    var defered = q.defer();
    var escape_data =  [req.param('id')];       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.updateInvoiceBuy = function(req,mysql,q,id,cid,pid)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx251'); 
    
    var defered = q.defer();
    var escape_data =  [id,cid,pid];       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}

exports.getBuynowCartDetails = function(req,mysql,q)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx219'); 
    
    var defered = q.defer();
    var escape_data =  [req.param('id')];       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.insertBuyItemInvoices = function(req,mysql,q,d,c_id)
{
    $mysqli =  {};	   
	customerio = require('./customerio');
  
    customerio.uid = req.session.products[d]['user_id'];
    customerio.inits();
    console.log(req.session.products[d]);
    customerio.createCustomer({email:req.session.products[d]['email'],user:{firstName:req.session.products[d]['first_name'],lastName:req.session.products[d]['last_name']}});
    
    customerio.sendEmail({event:'item_sold',content:{user:req.session.products[d]['first_name']+' '+req.session.products[d]['last_name'],qty:req.session.products[d]['saled'],price: req.session.products[d]['saled']*(req.session.products[d]['bprice']+req.session.products[d]['shipping_price']),title: req.session.products[d]['title'],url:global.url+'/product/view/'+req.session.products[d]['id']}});
 
	strQuery = mysqli.mysqli($mysqli,'cnx216'); 
    
    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var amt = req.session.products[d]['saled']*(req.session.products[d]['bprice']+req.session.products[d]['shipping_price']);
   
    var escape_data =  [0,'braintree',datenow,req.session.userid,req.session.products[d]['id'],'sold',req.session.products[d]['title'],amt,'paid','debit',datenow,req.session.products[d]['saled'],c_id];
    console.log(escape_data);       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.updateSold = function(req,mysql,q,id,sold)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx214'); 
    
    var defered = q.defer();
    
    var escape_data =  [sold,id];
           
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.closeProduct = function(req,mysql,q,id)
{
	$mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx215'); 
    
    var defered = q.defer();
    
    var escape_data =  [id];
           
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.checkout = function(req,mysql,q,id)
{
	$mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx210'); 
    
    var defered = q.defer();
    
    var escape_data =  [id];
           
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.selectCartItems = function(req,mysql,q,fq)
{
 
    	   
	fq =  (req.session.pid instanceof  Array) ? req.session.pid.join(',') : req.session.pid;    
	$mysqli =  {where:fq};
	strQuery = mysqli.mysqli($mysqli,'cnx213'); 
    var defered = q.defer();
    var escape_data =  [];
           
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
 
}
exports.insertBuynow = function(req,mysql,q,d,cid,escrow)
{
 
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx212'); 
    //console.log(req.session.products[d]);
    var defered = q.defer();
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    //console.log(datenow);
    var sold = req.session.products[d]['saled'];
    var release = 1;
    var r_date = datenow;
    if(escrow == 0)
    {
    	release = 0;
    	r_date = '0000-00-00 00:00:00'
    }	
    var amt = req.session.products[d]['qty_add']*(req.session.products[d]['bprice']+req.session.products[d]['shipping_price']);
    commission = parseFloat((amt-req.session.products[d]['refund'])*(req.body.commission/100)).toFixed(2)
    var escape_data =  [req.session.products[d]['id'],req.session.userid,amt,datenow,req.session.products[d]['qty_add'],cid,sold,req.session.products[d]['refund'],0,1,datenow,release,r_date,escrow,commission];
    console.log(escape_data);       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
 
}
exports.removeitem = function(id,req,res,mysql)
{
    req.body.id = id;
    var self = this;
    var cmn = require('./common');
    if(typeof(req.session.userid) === 'undefined')
    {
        var data = { success : false,error : '', redirect : true };
        cmn.renderJson(res,data);
    } 
    if(typeof(req.session.userid) === 'undefined')
    {
        var data = { success : false,error : '', redirect : true };
        cmn.renderJson(res,data);
    } 
    q.all([products.cartitemDetail(req,mysql,q)]).then(function(results){

      var prdt = results[0][0][0];
      console.log(prdt);
      prdt['qty'] = parseInt(prdt['qty']);
      console.log(prdt['qty'] );
     
      var cart = require('./cart');         
        
          if(typeof(req.session.products) !== 'undefined')
          {
            
            if(req.session.pid.indexOf(prdt.project_id) >= 0)
            {
               var mn_req_id = req.session.pid.indexOf(prdt.project_id);
               cart.removeTempItem(req,mysql,q,id,prdt.qty);
               delete req.session.pid[mn_req_id];
               delete req.session.products[mn_req_id];
                    
               req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
               req.session.products = req.session.products.filter(function(n){ return n != undefined });
               if(req.session.pid.length == 0)
               {
                 delete req.session.temp_cart_id;
                 delete req.session.temp_time_id;
                 delete req.session.pid;
                 delete req.session.products;
                 delete req.session.timer;
               } 
               var data = { success : true,error : '',add:0 };
               cmn.renderJson(res,data);
            }
           var data = { success : true,error : '',add:0 };
               cmn.renderJson(res,data);
           }
           
    });
      
}
exports.addItem = function(id,req,res,mysql)
{
    req.body.id = id;
    var self = this;
    var cmn = require('./common');
    if(typeof(req.session.userid) === 'undefined')
    {
    	var data = { success : false,error : '', redirect : true };
        cmn.renderJson(res,data);
    } 
    if(typeof(req.session.userid) === 'undefined')
    {
    	var data = { success : false,error : '', redirect : true };
        cmn.renderJson(res,data);
    } 
	q.all([products.productDetail(req,mysql,q)]).then(function(results){

      var prdt = results[0][0][0];
      //console.log(prdt);
      //prdt.qty_add = 1;
      var dateFormat = require('dateformat');
      var date = require('date-utils');
      prdt['qty_add'] = (typeof(req.param('qty')) !== 'undefined') ? req.param('qty') : 1;
      prdt['qty'] = parseInt(prdt['qty']);
      prdt['booked'] = parseInt(prdt['booked']);
      prdt['sold'] = parseInt(prdt['sold']);
      prdt['qty_add'] = parseInt(prdt['qty_add']);
     
      var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
      var cart = require('./cart');
      console.log(cart);
      var closeddate = dateFormat(new Date(prdt['date_closed']),"yyyy-mm-dd HH:MM:ss");
      var k_l = false;
         if(typeof(req.session.products) !== 'undefined')
	      {
	      	
	      	if(req.session.pid.indexOf(prdt.id) >= 0)
	      	{
	      		var k_l = true;
	      	}
	      }		
         //prdt['m_qty_add'] = prdt['qty_add']; 
          if(typeof(req.session.products) !== 'undefined')
          {
            if(req.session.pid.indexOf(prdt.id) >= 0)
            {

              prdt['booked'] = prdt['booked'] - parseInt(req.session.products[req.session.pid.indexOf(prdt.id)]['qty_add']);
              
            }  
         }
		if((Date.compare(closeddate,datenow) <= 0 ) && prdt['market_status'] == 'open' && !k_l)
        {
           var data = { success : false,error : 'Project Ended!' };
           cmn.renderJson(res,data);
        }
        else if(prdt['qty'] - prdt['sold'] - prdt['booked'] <= 0 && !k_l)
	    {
	       var data = { success : false,error : 'Project Sold!' };
	       cmn.renderJson(res,data);
	    }
        else if(prdt['qty'] - prdt['sold'] - prdt['booked'] - prdt['qty_add'] < 0 && !k_l)
        {
           var data = { success : false,error : parseInt(prdt['qty'] - prdt['sold'] - prdt['booked'])+' Only Available !' };
           cmn.renderJson(res,data);
        }
       else if(prdt['market_status'] != 'open' && !k_l)
	    {
	       var data = { success : false,error : 'Project Sold!' };
	       cmn.renderJson(res,data);
	    }
	    else
	    {
	      
	      if(typeof(req.session.products) !== 'undefined')
	      {
	      	
	      	if(req.session.pid.indexOf(prdt.id) >= 0)
	      	{
	      	   var mn_req_id = req.session.pid.indexOf(prdt.id);
  	   	  	   cart.removeTempItem(req,mysql,q,id,req.session.products[mn_req_id]['qty_add']);
  	   	  	   delete req.session.pid[mn_req_id];
  	   	  	   delete req.session.products[mn_req_id];
	      	   	  	
	      	   req.session.pid = req.session.pid.filter(function(n){ return n != undefined }); 
	      	   req.session.products = req.session.products.filter(function(n){ return n != undefined });
	      	   if(req.session.pid.length == 0)
	      	   {
	      	   	 delete req.session.temp_cart_id;
	      	   	 delete req.session.temp_time_id;
	      	   	 delete req.session.pid;
	      	   	 delete req.session.products;
	      	   	 delete req.session.timer;
	      	   } 
               var data = { success : true,error : '',add:0 };
               cmn.renderJson(res,data);
	      	}	
	      	else
	      	{
                cart.addTempItem(req,mysql,q,id,prdt['qty_add']);
	      		req.session.pid.push(prdt.id);
	      	    req.session.products.push(prdt);
	      	}	
	      	
	      }		      
	      else
	      {

	      	req.session.temp_cart_id = Date.parse(new Date()) / 1000;
	      	console.log(req.session);
	      	var dateFormat = require('dateformat');
            req.session.temp_time_id = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	      	cart.addTempItem(req,mysql,q,id,prdt['qty_add']);
	      	req.session.pid = [prdt.id];
	      	req.session.products = [prdt];
	      }	
           
           var data = { success : true,error : '',add : 1 };
           cmn.renderJson(res,data);
           
	    } 

	});
      
}
exports.upDateItemBooked= function(req,mysql,q,id,qty,nqty)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'timer6'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [nqty,req.session.temp_cart_id,id,req.session.userid];
    console.log(escape_data);       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	$mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'timer3'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [qty,id];   
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	strQuery = mysqli.mysqli($mysqli,'timer2'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [nqty,id];  
    console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.removeTempItem = function(req,mysql,q,id,qty)
{
    $mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'timer4'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [req.session.temp_cart_id,id,req.session.userid];
    console.log(escape_data);       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	$mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'timer3'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [qty,id];   
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.addTempItem = function(req,mysql,q,id,qty)
{
    $mysqli =  {};	   
	 console.log(1);   
	strQuery = mysqli.mysqli($mysqli,'timer1'); 
    console.log(2);
    var defered = q.defer();
    //var date = require('date-utils');
    var dateFormat = require('dateformat');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [id,datenow,req.session.temp_cart_id,qty,0,0,req.session.userid]; 
    console.log(escape_data);    
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	$mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'timer2'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [qty,id];
    console.log(escape_data);       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.updateCartRefund = function(req,mysql,q,amt,id,cid)
{
	$mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx217'); 
    
    var defered = q.defer();
    //var date = require('date-utils');
    var escape_data =  [amt,id,cid];
    console.log(escape_data);       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

} 	
exports.insertCartDetails = function(req,mysql,q,d,price)
{
	$mysqli =  {};	   
	    
	strQuery = mysqli.mysqli($mysqli,'cnx211'); 
    
    var defered = q.defer();
    var dateFormat = require('dateformat');
    //var date = require('date-utils');
    var datenow = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var escape_data =  [datenow,req.param('f_name'),req.param('l_name'),req.param('email'),req.param('phone'),req.param('address'),req.param('country'),req.param('state'),req.param('city'),req.param('zipcode'),req.session.userid,datenow,1,d,price];
    console.log(escape_data);       
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

} 	

exports.productDetailItems = function(req,mysql,q)
{ 
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,'timer5'); 
    //console.log(strQuery);
    var defered = q.defer();
    var escape_data = [req.body.sid];
    console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.updateItem = function(req,mysql,q)
{

	for (i in req.session.products)
	{

          req.session.products[i]['qty_add'] = req.body['pid['+req.session.products[i]['id']+']']; 
	}
}
exports.InsertItemInCart = function(req,mysql,q)
{
        $mysqli =  {};
        
        
		   
	    
		strQuery = mysqli.mysqli($mysqli,53); 
	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.param('id'),req.session.userid];
	           
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}