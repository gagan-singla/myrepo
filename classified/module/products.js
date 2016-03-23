var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');
exports.productDetailId = function(req,mysql,q,id)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,19); 
    escape_fields = [id]
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.dealsProducts = function(req,mysql,q)
{ 
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,291); 
    ////console.log(strQuery);
    var defered = q.defer();
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    escape_string = [datge,datge];
    //console.log(escape_string);
	query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());
	return defered.promise;
}
exports.bestSellersProducts = function(req,mysql,q)
{ 
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,292); 
    ////console.log(strQuery);
    var defered = q.defer();
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    escape_string = [datge,datge];
    //console.log(escape_string);
	query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());
	return defered.promise;
}
exports.productCategoryItems = function(req,mysql,q,id)
{ 
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,293); 
    ////console.log(strQuery);
    var defered = q.defer();
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    escape_string = [datge,datge,id];
    //console.log(escape_string);
	query =  mysql.query(strQuery,escape_string,defered.makeNodeResolver());
	return defered.promise;
}

exports.productDetailItems = function(req,mysql,q)
{ 
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,36); 
    ////console.log(strQuery);
    var defered = q.defer();
	query =  mysql.query(strQuery,defered.makeNodeResolver());
	return defered.promise;
}

exports.winnerPrd = function(mysql,q,data)
{ 
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,36); 
    ////console.log(strQuery);
    var defered = q.defer();

	query =  mysql.query(strQuery,defered.makeNodeResolver());

	return defered.promise;
}
exports.saveProduct = function(req,mysql,q,prdt)
{
	$mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,'cnx249'); 
    //console.log(2);
    var defered = q.defer();
    newfilename = {};
    newfilename.name = '';
    newfilename.originalname = '';
    var duration = (typeof(req.param('duration')) !== 'undefined') ? req.param('duration')[0] : prdt['duration'];
    var duration_level = 'D';
    var time = (typeof(req.param('time')) !== 'undefined') ? req.param('time') : prdt['time'];
    var future = (typeof(req.param('future')) !== 'undefined') ? req.param('future') : prdt['future'];
    var time_level = (typeof(req.param('timelevel')) !== 'undefined') ? req.param('timelevel') : prdt['time_level'];
    //console.log(req.body);
    if(typeof(req.files.product_image) !== 'undefined')
    {     
    	 if(typeof(req.files.product_image[0]) === 'undefined')
    	 {

    	 	newfilename.name = req.files.product_image.name;
    	 	newfilename.originalname = req.files.product_image.originalname;
    	 }	
    	 else
	    {
	    	newfilename.name = req.files.product_image[0].name;
    	 	newfilename.originalname = req.files.product_image[0].originalname;
	    }
    }	

    //console.log(prdt.market_status);
    if(prdt.market_status == 'moderate' || prdt.market_status == 'draft' || req.session.admin == 1)
    {
		 datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		 //console.log(req.body.date_added +':00');
		 req.body.date_added  = dateFormat(req.body.date_added +':00',"yyyy-mm-dd HH:MM:ss");
		 req.body.date_closed = dateFormat(req.body.date_closed +':00',"yyyy-mm-dd HH:MM:ss");
    }	
    else
    {
    	//console.log(req.body);
		req.body.date_added = prdt.date_added;
		req.body.date_closed = prdt.date_closed;
		//console.log(req.body);
    }
	if(prdt.market_status == 'draft')
    {
		if(req.session.admin == 1)
		{
			prdt.market_status = 'open';
		}
		else
		{
			prdt.market_status = 'moderate';
		}
	}
    //console.log(2);
    var escape_data =  [req.body.title,
                       req.param('description'),
                       (typeof(req.files.product_image) !== 'undefined') ?  newfilename.name : ((typeof(req.body.avatar) !== 'undefined') ? req.body.avatar[0] : ''),
                       (typeof(req.files.product_image) !== 'undefined') ? newfilename.originalname : ((typeof(req.body.avatar) !== 'undefined') ? req.body.image[0] : ''),
		    	       req.param('cid'),
		    	       req.param('tags'),		    	      
		    	       common.currencyConverter(req.param('shipping_fee')),
		    	       req.param('shipping_description'),         
		    	      
		               (typeof(req.param('buynow')) === 'undefined') ? 0 :  req.param('buynow'),
		               (typeof(req.param('featured')) === 'undefined') ? 0 :  req.param('featured'),
		               //dateFormat(new Date(req.body.date_added),"yyyy-mm-dd HH:MM:ss"),
		               //dateFormat(new Date(req.body.date_closed),"yyyy-mm-dd")+' 23:59:59',
		               common.currencyConverter(req.body.sprice),
		               common.currencyConverter(req.body.rprice),
		               common.currencyConverter(req.body.bprice),
		               common.currencyConverter(req.body.mprice),
		               (typeof(req.param('auction')) === 'undefined') ? 0 :  req.param('auction'),
		               (typeof(req.param('is_location')) === 'undefined') ? 0 :  req.param('is_location'),
		               (typeof(req.param('document')) === 'undefined') ? '' :  req.param('document'),
		               (typeof(req.param('work_loc')) === 'undefined') ? 0 :  req.param('work_loc'),
		               (typeof(req.param('auction')) === 'undefined' || req.param('auction') == 0) ? req.param('qty') : 1,
		               (typeof(req.param('paypal_email')) !== 'undefined') ? req.param('paypal_email') : '',
		               duration,
                       duration_level,
                       time,
                       time_level,
                       future,
                       req.body.date_added,
		               req.body.date_closed,
		               (typeof(req.param('save')) === 'undefined') ? 'draft' : prdt.market_status,
		               (typeof(req.param('country')) === 'undefined') ? '' : req.param('country'),
		               (typeof(req.param('state')) === 'undefined') ? '' : req.param('state'),
		               (typeof(req.param('city')) === 'undefined') ? '' : req.param('city'),
		               req.body.id]       
		               //console.log(escape_data); 
		               //console.log("____________________________________________________")  
		               //console.log(req.param('featured'));
		               //console.log("____________________________________________________")  	     
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;
}
exports.post = function(req,res,arr)
{
  common.tplFile('post.tpl');
  common.headerSet(1);
  common.loadTemplateHeader(req,res,arr);
};
exports.deleteWatchlist = function(req,mysql,q)
{
        $mysqli =  {};

		strQuery = mysqli.mysqli($mysqli,53); 
	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.param('id'),req.session.userid];
	           
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.mywatchlist = function(req,mysql,q)
{
        $mysqli =  {};
        var page = req.body.page;
        page = (page > 0) ? (page-1)*10 : 0;
		   
	    
		strQuery = mysqli.mysqli($mysqli,51); 
	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.session.userid,page];
	    //console.log(escape_data);               
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.totalmywatchlist = function(req,mysql,q)
{
        $mysqli =  {};
        page = req.body.page;
		strQuery = mysqli.mysqli($mysqli,52); 
	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.session.userid];
	    //console.log(escape_data);               
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		return defered.promise;
}
exports.deleteSearch = function(req,mysql,q)
{
        $mysqli =  {};
      
		strQuery = mysqli.mysqli($mysqli,"deletesearch"); 
	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.body.id,req.session.userid];
	                 
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
        {    throw err; 
        });
		return defered.promise;
}
exports.searchsavedsearch = function(req,mysql,q,id)
{
        $mysqli =  {};
      
		strQuery = mysqli.mysqli($mysqli,299); 
	    
	    var defered = q.defer();
	    
	    var escape_data =  [id];
	                 
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
        {    throw err; 
        });
		return defered.promise;
}
exports.savesearch = function(req,mysql,q,data)
{

        $mysqli =  {};
        datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
        page = req.body.page;
		strQuery = mysqli.mysqli($mysqli,"savesearch"); 
	    
	    var defered = q.defer();
	    
	    var escape_data =  [req.param('title'),req.param('encrypt'),req.session.userid,datge,req.param('searchtext')];
	    console.log(escape_data);               
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
        {    throw err; 
        });
		return defered.promise;
}

exports.savedsearch = function(req,mysql,q,count)
{
        $mysqli =  {};
       
        if(count==1)
	    {	
	    	console.log("GGGGGGGGGG");
		 strQuery = mysqli.mysqli($mysqli,"savedsearch1");
		 var escape_data =  [req.session.userid];	
	    }
	    else
	    {
	     strQuery = mysqli.mysqli($mysqli,"savedsearch");
	     var page = (req.body.page-1)*10;
		 var escape_data =  [req.session.userid,page];	
		}	
		
	    
	    var defered = q.defer();
	    
	               
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
        {    throw err; 
        });
		return defered.promise;
}
exports.searchProducts = function(mysql,q,data,count)
{   var row = '';
    var  limit = '';
    var  order = '';
    where = '';
    ////console.log(data);
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	  if(data['page'] == 'index')
	  {
           row = 7;
           where = ' and market_status = "open"';
           limit = ' limit 0 , 12'
	  }
	  else if(data['page'] == 'live')
	  {
           row = 7;
            where = ' and market_status = "open"';
	  }
	  else if(data['page'] == 'future' )
	  {
           row = 8;
	  }
	  else if(data['page'] == 'closed')
	  {
	      row = 9;
	  }
	  else if(data['page'] == 'shop')
	  {
	      row = 10;
	  }
      else 
	  {
	      row = 13;
	      where = ' and market_status = "open" and date_closed >= "'+datge+'" and date_added <= "'+datge+'" ';
	  }
	  
	  if(data.uid > 0)
	  {
	  	where += ' and p.user_id =  '+data.uid;
	  }	
	  if(data.toprice > 0)
	  {
	  	where += ' and case when p.auction = 0 then p.bprice >=  '+data.toprice+' else p.wprice >=  '+data.toprice+' end' ;
	  }
	  if(data.fromprice > 0)
	  {
	  	where += ' and case when p.auction = 0 then p.bprice <=  '+data.fromprice+' else p.wprice <=  '+data.fromprice+' end' ;
	  }
	 order = data.order;
	 ////console.log(order);
	 if(order == '' || typeof(data.order) === 'undefined')
	 {
	 	order = ' date_closed asc ';
	 }	
	 else if(order == 2)
	 {
       order = ' id desc ';
	 }	
	 else if(order == 3)
	 {
       order = ' sea_price asc ';
	 }	
	 else if(order == 4)
	 {
       order = ' sea_price desc ';
	 }	
	 else
	 {
	 	order = ' date_closed asc ';

	 }	
	 ////console.log(data);
	 if(data['page'] != 'index')
	 {
            //console.log(count);
            if(count == 1)
            {
              order += 'limit '+(data.spage-1)*data.perlimit+','+data.perlimit;
            }	
	 }
     $mysqli = {search:data['search'],cid:data['cid'],datge:datge,limit:limit,where:data['where']+where,pid:0,order:order};
    
     if(data['cid'] != '')
	  {
	  	$mysqli.cid = mysqli.mysqli($mysqli,'cid');
	  }
	  else
	  {
	  	$mysqli.cid = '';
	  }	
	  if(data['titlesonly'] > 0 && data['titlesonly'] != ''  && data['search'] != '')
	  {
	  	$mysqli.search = mysqli.mysqli($mysqli,'title');
	  }
	  else if(data['titlesonly'] == ''  && data['search'] != '')
	  {
         $mysqli.search = mysqli.mysqli($mysqli,'search');
	  }
	  else
	  {
	  	$mysqli.search = '';
	  }
      
	  if(data['images'] != '')
	  {

         $mysqli.where += mysqli.mysqli($mysqli,'avatar');
	  }
	  if(data['freeshipping'] != '')
	  {
	  
         $mysqli.where += mysqli.mysqli($mysqli,'noshipping');
	  }
	  if(data['projectid'] > 0 )
	  {
	  	 $mysqli.pid = parseInt(data['projectid']);
         $mysqli.where += mysqli.mysqli($mysqli,'pid');
	  }
	  ////console.log($mysqli);
	strQuery = mysqli.mysqli($mysqli,row); 
	////console.log(row);
    ////console.log(strQuery);
    var defered = q.defer();

	query =  mysql.query(strQuery,defered.makeNodeResolver());

	return defered.promise;
}

exports.homeProducts = function(mysql,q,all)
{   
	
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    $mysqli = {datge:datge};
	strQuery = mysqli.mysqli($mysqli,all); 
    ////console.log(strQuery);
    var defered = q.defer();

	query =  mysql.query(strQuery,defered.makeNodeResolver());

	return defered.promise;
}
exports.isinWatchlist= function(req,mysql,q)
{   
   
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,49); 
    ////console.log(strQuery);
    var defered = q.defer();

    escapeData = [req.session.userid,req.param('id')];

	query =  mysql.query(strQuery,escapeData,defered.makeNodeResolver());

	return defered.promise;
}
exports.addWatchlist= function(req,mysql,q)
{   
   
    $mysqli = {};
	strQuery = mysqli.mysqli($mysqli,50); 
    ////console.log(strQuery);
    var defered = q.defer();
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    escapeData = [req.param('id'),req.session.userid,datge];
    //console.log(escapeData);
	query =  mysql.query(strQuery,escapeData,defered.makeNodeResolver());

	return defered.promise;
}
exports.productImage = function(req,mysql,q)
{
	$mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,164); 
	var defered = q.defer();
	escape_data = [req.body.id];
	//console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.updateFeatureData = function(req,mysql,q,id)
{
	$mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,'cnx250'); 
	var defered = q.defer();
	escape_data = [id];
	//console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.updateUnFeatureData = function(req,mysql,q,id)
{
	$mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,296); 
	var defered = q.defer();
	escape_data = [id];
	//console.log(escape_data);
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

	return defered.promise;
}
exports.save = function(req,res,mysql,q)
{   
	//var qs = require('qs');
	//req.body = qs.parse(req.body);
	 newfilename = {};
    newfilename.name = '';
    newfilename.originalname = '';
    if(typeof(req.files.product_image) !== 'undefined')
    {     
    	 if(typeof(req.files.product_image[0]) === 'undefined')
    	 {

    	 	newfilename.name = req.files.product_image.name;
    	 	newfilename.originalname = req.files.product_image.originalname;
    	 }	
    	 else
	    {
	    	newfilename.name = req.files.product_image[0].name;
    	 	newfilename.originalname = req.files.product_image[0].originalname;
	    }
    }	
    
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    $mysqli =  {};
	strQuery = mysqli.mysqli($mysqli,14); 
	//req.body.date_added =   '2015-02-02';
	/*if(typeof(req.param('future')) !== 'undefined' && req.param('future') == 1 && typeof(req.param('date_added')) !== 'undefined')
	{
		var t = (typeof(req.param('time')) !== 'undefined') ? parseInt(req.param('time')) : 0;
        if(req.param('timelevel') == 'PM')
        {
            if(t > 11)
            {
            	t = 11;
            }	
            var t = t+12;
        } 
        if(t <= 9)
        {
        	t = '0'+t;
        }	
        req.body.date_added = dateFormat(req.body.date_added +' '+t+':00:00',"yyyy-mm-dd HH:MM:ss");;
	}	
	else
	{
		 req.body.date_added = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
	}	
	d = 10;
	if(req.param('duration') !== 'undefined' && req.param('duration') > 0)
	{
		d = req.param('duration')[0];
	} */

    req.body.date_added = req.body.date_added+':00';
    req.body.date_closed = req.body.date_closed+':00';
	//console.log(req.body.date_added);
	//console.log(req.body.date_closed);
	
    //console.log( dateFormat(new Date(req.body.date_added),"yyyy-mm-dd HH:MM:ss"));
    //console.log(new Date(req.body.date_added));
	//console.log(new Date(req.body.date_closed));

	 
    //req.body.date_added = req.body.date_added+' 00:00:00';
    //req.body.date_closed = new Date(req.body.date_added).addDays(d);
    
    var defered = q.defer();
    req.body.iprice = global.general.bidincrement;
    //req.body.sprice = 0.01;

  var prostatus = 'moderate';
  if(req.session.admin == 1)
    {
		var prostatus = 'open';
	}

    var duration = (typeof(req.param('duration')) !== 'undefined') ? req.param('duration')[0] : '';
    var duration_level = 'D';
    var time = (typeof(req.param('time')) !== 'undefined') ? req.param('time') : '';
    var future = (typeof(req.param('future')) !== 'undefined') ? req.param('future') : 0;
    var time_level = (typeof(req.param('timelevel')) !== 'undefined') ? req.param('timelevel') : '';
var location=(typeof(req.param('location')) === 'undefined') ? '' : req.param('location');
location=location.toLowerCase(); 
    var escape_data =  [req.body.title,
                       req.param('description'),
                       (typeof(req.files.product_image) !== 'undefined') ?  newfilename.name : ((typeof(req.body.avatar) !== 'undefined') ? req.body.avatar[0] : ''),
                       (typeof(req.files.product_image) !== 'undefined') ? newfilename.originalname : ((typeof(req.body.avatar) !== 'undefined') ? req.body.image[0] : ''),
		    	       req.param('cid'),
		    	       req.param('tags'),
		    	       (typeof(req.session) !== 'undefined')  ? req.session.userid : 0,
		    	       common.currencyConverter(req.param('shipping_fee')),
		    	       (typeof(req.param('shipping_description')) === 'undefined') ? '' :  req.param('shipping_description'),        
		    	       datge,   
		               (typeof(req.param('buynow')) === 'undefined') ? 0 :  req.param('buynow'),
		               0,
		               common.currencyConverter(req.body.sprice),
		               common.currencyConverter(req.body.rprice),
		               dateFormat(new Date(req.body.date_added),"yyyy-mm-dd HH:MM:ss"),
		               dateFormat(new Date(req.body.date_closed),"yyyy-mm-dd HH:MM:ss"),		               
		               1,
		               common.currencyConverter(req.body.bprice),
		               common.currencyConverter(req.body.mprice),
		               common.currencyConverter(req.body.iprice),
		               common.currencyConverter(req.body.sprice),
		               //common.currencyConverter(req.body.sprice),
		               (typeof(req.param('auction')) === 'undefined') ? 0 :  req.param('auction'),
		               (typeof(req.param('is_location')) === 'undefined') ? 0 :  req.param('is_location'),
		               (typeof(req.param('document')) === 'undefined') ? '' :  req.param('document'),
		               (typeof(req.param('work_loc')) === 'undefined') ? 0 :  req.param('work_loc'),
		               (typeof(req.param('auction')) === 'undefined' || req.param('auction') == 0) ? req.param('qty') : 1,
		               req.param('paypal_email'),
                       duration,
                       duration_level,
                       time,
                       time_level,
                       future, 
		               (typeof(req.param('save')) === 'undefined') ? 'draft' : prostatus,
		               (typeof(req.param('country')) === 'undefined') ? '' : req.param('country'),
		               (typeof(req.param('state')) === 'undefined') ? '' : req.param('state'),
		               (typeof(req.param('city')) === 'undefined') ? '' : req.param('city'),
		               location,
		               ]     ;
		               console.log(escape_data);
		               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	query.on('error',function(err)
        {    throw err; 
        });

	return defered.promise;
}
exports.futureProducts = function (mysql,q,all)
{
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    $mysqli = {datge:datge};
	strQuery = mysqli.mysqli($mysqli,all); 
 
   var defered = q.defer();

	query =  mysql.query(strQuery,defered.makeNodeResolver());

	return defered.promise;
}
exports.mysoldproducts = function(req,mysql,q,count)
{ 
	$mysqli = {}
	var defered = q.defer();
	var page = req.body.page;
	var perlimit = req.body.perlimit;
	page = (page > 0) ? (page-1)*perlimit : 0;
	if(count == 0){
	    	var limit = 'limit '+page+','+ perlimit;
		}
		else{

			limit = "";
		}  
        $mysqli =  {limit : limit}; 
    
    strQuery = mysqli.mysqli($mysqli,"cnx225"); 
    var defered = q.defer();
    var escape_data =  [req.session.userid,page];
    console.log('limit='+limit+'page'+page);               
	query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
	return defered.promise;

}
exports.myproducts = function(req,mysql,q,cnt)
{
    
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    var defered = q.defer();
    //status = 'open';
    where = ' and date_closed >= "'+ datge +'" and (market_status = "open" or market_status = "moderate")';
    mys = 15;
    mys = 18;
    if(req.param('cmd') == 'sold')
    {
       where = ' and (market_status = "sold" or sold > 0)';
    }
    if(req.param('cmd') == 'draft')
    {
       where = ' and market_status = "draft"';
    }
    if(req.param('cmd') == 'closed')
    {
       where = '  and market_status NOT IN ("draft","sold")   and ((market_status = "closed")  or date_closed < "'+ datge +'")';
    }	
    $mysqli = {where:where};

    var page = req.body.page;
	    var perlimit = req.body.perlimit;
    ////console.log($mysqli);
    if(cnt == 0)
    {
	strQuery = mysqli.mysqli($mysqli,15); 
    
    page = (page > 0) ? (page-1)*perlimit : 0;
    
    escape_fields = [req.session.userid,page,perlimit];
    
    }
    else
    {
    	$mysqli = {where:where};
    	strQuery = mysqli.mysqli($mysqli,18); 
    	escape_fields = [req.session.userid]
    }	
    ////console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
	
	query.on('error',function(err)
{

throw err; 
});

	return defered.promise;
}

exports.productDetail = function(req,mysql,q)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,19); 
    escape_fields = [req.param('id')]
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.cartitemDetail = function(req,mysql,q)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,'timer12'); 
    escape_fields = [req.param('id'),req.session.userid]
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.productDetails = function(req,mysql,q)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,162); 
    datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    escape_fields = [datge]
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.closeProject = function(req,mysql,q,status)
{
    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,34); 
    escape_fields = [status,req.param('id')]
    ////console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.closeProjects = function(req,mysql,q,status,pid)
{
    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,34); 
    escape_fields = [status,pid]
    ////console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.shopProducts = function (mysql,q)
{
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    $mysqli = {datge:datge};
	strQuery = mysqli.mysqli($mysqli,6); 
 
   var defered = q.defer();

	query =  mysql.query(strQuery,defered.makeNodeResolver());

	return defered.promise;
}
exports.bidWinner = function (req,mysql,q)
{
	$mysqli ={};
	strQuery = mysqli.mysqli($mysqli,160); 

   var defered = q.defer();
   //console.log(1);
    escape_fields = [req.session.userid,req.body.id];
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());
    
	return defered.promise;
}
exports.auctionSold = function (req,mysql,q)
{
	$mysqli ={};
	strQuery = mysqli.mysqli($mysqli,161); 

   var defered = q.defer();
    escape_fields = [req.session.userid,req.body.id];
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.otherItems= function (req,mysql,q,id,pid)
{
	//console.log(id);
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    $mysqli = {datge:datge};
	strQuery = mysqli.mysqli($mysqli,'cnx254'); 

    var defered = q.defer();
    escape_fields = [id,pid];
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}
exports.closeProducts = function (mysql,q)
{
	datge = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
    $mysqli = {datge:datge};
	strQuery = mysqli.mysqli($mysqli,4); 

   var defered = q.defer();

	query =  mysql.query(strQuery,defered.makeNodeResolver());

	return defered.promise;
}
exports.shortDescribe = function(results)
{
	req_data = [];
    //console.log(results);
	for(i in results)
         {
         	////console.log(results[i]['date_closed']);
         	if(results[i]['date_closed'] !== null || typeof(results[i]['date_closed']) !== 'undefined')
         	{
         	 ////console.log(1);	
         	 date1 = new Date(results[i]['date_closed']);
         	 date3 = new Date(results[i]['date_added']);
			 date2 = new Date();
			 diffDays =  date1.getTime() - date2.getTime();;
			////console.log(diffDays)​
			 results[i]['closed'] = date1;
			 results[i]['ptime']  = dateFormat(results[i]['date_closed'],'mmmm dS, yyyy');
			 results[i]['stime']  = dateFormat(results[i]['date_added'],'mmmm dS, yyyy');
			 results[i]['ctime']  = dateFormat(results[i]['date_closed'],'mmmm dS, yyyy');
			 if(results[i]['bids'] === null)
			 {
			 	results[i]['bids'] = 0;
			 }	
			 if(results[i]['bprice'] === 'NaN')
			 {
			 	results[i]['bprice']  = 0.00;
			 }
			 ////console.log('Reserve '+results[i]['rprice'])
			 if(results[i]['sprice'] === 'NaN')
			 {
			 	results[i]['sprice']  = 0.00;
			 }
			 if(results[i]['rprice'] === 'NaN')
			 {
			 	results[i]['rprice']  = 0.00;
			 }
			 if(results[i]['iprice'] === 'NaN')
			 {
			 	results[i]['iprice']  = 0.00;
			 }
			  if(results[i]['wprice'] === 'NaN')
			 {
			 	results[i]['wprice']  = 0.00;
			 }
			 if(diffDays > 0 || results[i]['market_status'] == 'sold')
			 {
                results[i]['status']    = 'open';
                if(results[i]['market_status'] == 'sold')
                {
                	results[i]['status']    = 'sold';
                }
                else if(results[i]['market_status'] == 'removed')
                {	results[i]['status']    = 'deleted';
                }
                else if(date3 > date2)
                {
                	results[i]['status']    = 'future';
                }	


			 }	
			 else
			 {
			 	if(results[i]['market_status'] == 'closed')
                {
			 	results[i]['status']    = 'closed';
			 	}
			 	else
			 	{
			 		results[i]['status']    = 'deleted';
			 	}
			 }	
			 results[i]['day']    = common.dateMeasure(diffDays);
		    }
			results[i]['avatar']  = (results[i]['avatar'] !== null && typeof(results[i]['avatar']) !== 'undefined') ? results[i]['avatar'] :  '';
			if(results[i]['sprice'] != null || typeof(results[i]['sprice']) !== 'undefined')
         	{
		  	 results[i]['sprice'] = common.currencyConverter(results[i]['sprice']); 
			 results[i]['rprice'] = common.currencyConverter(results[i]['rprice']); 
			 results[i]['wsprice'] = common.currencyConverter(results[i]['wprice']+results[i]['iprice']); 
			 results[i]['wprice'] = common.currencyConverter(results[i]['wprice']); 
			 results[i]['mprice'] = common.currencyConverter(results[i]['mprice']); 
			 results[i]['iprice'] = common.currencyConverter(results[i]['iprice']); 
			 results[i]['bprice'] = common.currencyConverter(results[i]['bprice']); 
			 results[i]['ptitle'] = common.shorten(results[i]['title'],28); 
			}
			
			req_data[i] = results[i];
			
		}
         
		return req_data;
}


exports.projectDetails = function(req,mysql,q,fields,id)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,55); 
    escape_fields = [fields,id]
    ////console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}

exports.removeProject = function(req,mysql,q,id)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,56); 
    escape_fields = [id]
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}


exports.getcategory = function(req,mysql,q)
{

    $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,253); 
    escape_fields = [req.param('cid')]
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
}


exports.categoryusr = function(req,mysql,q)
{

	

   $mysqli = {};
    var defered = q.defer();
        
    strQuery = mysqli.mysqli($mysqli,283); 
    escape_fields = [req.param('cid')]
    //console.log(escape_fields);
	query =  mysql.query(strQuery,escape_fields,defered.makeNodeResolver());

	return defered.promise;
	
}