{include file="common/header-1.tpl" nocache}
{include file="time-common-loader.tpl" nocache}
<script src="{$config.url}/js/responsiveslides.min.js"></script>
<script src="{$config.url}/js/lightbox.js"></script> 

<link rel="stylesheet" type="text/css" href="{$config['externalcss']}responsiveslides.css" />
<link rel="stylesheet" type="text/css" href="{$config['externalcss']}lightbox.css" />
<link rel="stylesheet" type="text/css" href="{$config.url}/css/common_responsive1.css" />

<script>

var  placedbid = '{$placedbid}';
var  market_status = '{$projects.market_status}';
var placecontract ='{$placecontract}';

if(placedbid == 1)
{
 $(function()
 {
     $('#cnx').modal('show');
 });
}
if(placecontract == 1)
{
 $(function()
 {
  //alert(2);
     $('#sellerinfoconfirm').modal('show');
 });
}


function setIntrevalMain(id,market_status)
{
  console.log(id);
   clearvar[id] =  setInterval(function(){
                                          timeProject[id] = new Date(timeProject[id].getTime() + 1000*1);
                                          
                                          if(targetDate[id] >= new Date(timeProject[id]))
                                          {
                                             clock[id].innerHTML = countdown(targetDate[id]).toString();
                                          }
                                          else
                                          {
                                            
                                              if(market_status == 'open')  
                                              {
                                               window.location = '{$config.url}/product/close/'+id;
                                               clock[id].innerHTML = 'Closed';
                                              }
                                          }
                                          
                                      }, 1000);
}
function setIntreval(id,market_status)
{
  console.log(id);
  console.log(targetDate[id]);
   clearvar[id] =  setInterval(function(){
                                          timeProject[id] = new Date(timeProject[id].getTime() + 1000*1);
                                          
                                          if(targetDate[id] >= new Date(timeProject[id]))
                                          {
                                             clock[id].innerHTML = countdown(targetDate[id]).toString();
                                          }
                                          else
                                          {
                                            
                                              
                                              
                                               clock[id].innerHTML = 'Closed';
                                             
                                          }
                                          
                                      }, 1000);
}
function meee(id,dateee,price)
  {  
 // id = '126';
 // alert(dateee);
    clearInterval(clearvar[id]);
    clock[id] = document.getElementById('my'+id)
    , targetDate[id] = new Date(dateee); // Jan 1, 2050;
 
    clock[id].innerHTML = countdown(targetDate[id]).toString();
     setIntreval(id,'');
    
  }
  
    


  </script> 
<script>

function closediv()
{

  $("#sellerinfo").hide();

}
function check()
{
 
  var lastbid=$("#lstbid").val();
  var checkwsprice=$("#checkwsprice").val();
  var num=parseFloat(checkwsprice);
  var nums=(num).toFixed(2);
   
  // var num=checkwsprice.toFixed(2);
   //alert(num);
if(parseFloat(lastbid)<parseFloat(nums))
{
$('#submitbid').submit();
}
else
{
alert("Your bid amount must be greater than the minimum bid amount to place. Please retry by entering a higher amount.");
}
}
</script>
<style>
#gallery_01 img{border:2px solid white;}
.active img{border:2px solid #333 !important;} 
.modal {
	background: rgba(44, 41, 41, 0.66);
}
.products_row {
	padding: 15px 0;
  margin: 0;
  max-width: 100%;
}
.txt_center
{
  text-align: center;
}


@media screen and (max-width: 980px)  {
	html {
	overflow-x:hidden;
}
   .products_row {
	 margin: 25px auto;
	 max-width: 100%;
   padding: 0px;
   }
   
   .videop .btn {
	   padding: 4px 4px;
	   font-size: 12px;
   }
}
</style>
<script>  var clock = [];  var targetDate = [];  var clearvar = []; </script>

<div class="row products_row">
<div>{if $inwatchlist}<a class="addwatchlist" onclick="javascript:void(0);">Added To Watchlist</a> {else}<a class="addwatchlist" id="addwatchlist" onclick="addtowatchlist({$projects.id})" href="javascript:void(0);" title="+ Add to Watchlist" rel="727" class="addwatchlist" name="#">Add to Watchlist</a> {/if}</div>
<div class="project_title">{$projects.title}</div>
<div class="clearfix">
  <div class="col-md-4">
    <div class="col-md-10">
      <ul class="rslides" id="slider4">
        {foreach $images as $key => $val}
        <li><a href="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" data-lightbox="{$projects.title}" data-title=""> <img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" class="img-responsive" alt="1" id="zoom_{$key}"></a> </li>
       
        {/foreach}
      </ul>
    </div>    

    {if $projects.document != ''}
	<div class="videop">
		<a id="youtube" class="btn btn-default" target="_Blank" href="{$projects.document}" ><img src="{$config.url}/images/product_video.png" alt="" /> click here to see the video</a>
	</div>
    {/if}
	<!--<div class="map_lbl">
	 Location shown on the map is in the general vicinity of the actual location.
   </div>
   <div class="map_pbox">
   </div>-->
  </div>
  <div class="col-md-8">
    <div class="row">
      <div class="col-md-8 ctg">
        <div class="ctgrychm">
          <div class="plbl">Category:</div>
          <div class="pright_lbl">{$projects.name}</div>
        </div>
        <div class="ctgrychm div">
          <div class="plbl">Time Left :</div>
          <div class="pright_lbl">{if $projects.market_status == 'open' or $projects.market_status == 'draft'}
            <h3 class="countdown" id="my{$projects.id}"style="text-align:left;">{$projects.day}</h3>
            {else} Auction Closed{/if}</div>
        </div>
        {if $projects.buynow}
        <div class="ctgrychm div">
          <div class="plbl">Buy Now Price:</div>
          <div class="pright_lbl"> US $<span class="format">{$projects.bprice}</span></div>
        </div>
		<div class="ctgrychm div">
          <div class="plbl">Retail Price:</div>
          <div class="pright_lbl">US $<span class="format">{$projects.mprice}</span></div>
        </div>
        <div class="ctgrychm div">
          <div class="plbl">Quantity Available:</div>
          <div class="pright_lbl">{if $projects.qty - $projects.sold > 0} {$projects.qty - $projects.sold -$projects.booked} {else} 0 {/if}</div>
        </div>
        
        <div class="ctgrychm div">
          <div class="plbl ysave">You Save:</div>
          <div class="pright_lbl"><span class="pp_ldata">US $ {$projects.mprice - $projects.bprice}</span> <span class="pro_offer">{currencyConverter(100*{$projects.mprice - $projects.bprice}/$projects.mprice)} % off</span></div>
        </div>
        {/if} 
        {if $projects.auction}
        <div class="ctgrychm div">
          <div class="plbl">Bidding Price:</div>
          <div class="pright_lbl"> US $<span class="pric_l format">{$projects.wprice}</span></div>
        </div>
        {/if}
		<!--<div class="ctgrychm div">
          <div class="pull-left">Start Date:</div>
          <div class="img">{$projects.stime}</div>
        </div>
		<div class="ctgrychm div">
          <div class="pull-left">End Date:</div>
          <div class="img">{$projects.ctime}</div>
        </div>-->
         {if $projects.auction}
 {if $user_location != $projects.sell_location && $projects.sell_location != ''}  <div style= 'width:100%;color:red;clear:both; font-weight:bold; text-align:center'>Seller not ship product to your location  </div>{/if} 
        
		 <form id="submitbid"  action="{$config.url}/product/confirm/" method="post" enctype="multipart/form-data" class="form-inline">
        <input type="hidden" name="id" value="{$projects.id}" />
        <div class="ctgrychm div">
          <div class="plbl">Place Your Bid:</div>
         <div class="pright_lbl">
		 <div class="pull-left">
			<div><input type="text" class="form-control pbid_amount floatpoint" name="wsprice" id="checkwsprice" placeholder="$ 0.00" required></div>
          <div class="bid" style="display:none" >Last Bid:<span class="pric_l">{$projects.wprice}</span></div>
          <input type="hidden" id="lstbid" value="{$projects.wprice}" />
		  </div>

		  <div class="pull-left"><p> <a style="display:none" href="javascript:void(0);" class="bid"  data-toggle="modal" data-target="#bidhistory">[{$bcnt} bids]</a></p><button type="button" onClick="check()"class="btn btn-danger" {if $projects.user_id == $loged.userid} disabled {/if}  {if $user_location != $projects.sell_location && $projects.sell_location != ''} disabled {/if}  > Submit Bid</button></div>
<!--
		  <div class="pull-left" style="margin-top: -22px;"><p> <a href="javascript:void(0);" class="bid"  data-toggle="modal" data-target="#bidhistory">[{$bcnt} bids]</a></p><button type="button" onClick="check()"class="btn btn-danger" {if $projects.user_id == $loged.userid} disabled {/if} {if $user_location != $projects.sell_location && $projects.sell_location != ''} disabled {/if} > Submit Bid</button></div>
-->
        </div>
       
    
		</div>

      </form>
       
       {/if}
       {if $projects.buynow==1}
        {if $user_location != $projects.sell_location && $projects.sell_location != ''}  <div style= 'width:100%;color:red;clear:both; font-weight:bold; text-align:center'>Seller not ship product to your location  </div>{/if} 
       {if $projects.qty - $projects.sold > 0} 
       <div class="ctgrychm div form-inline">
          <div class="plbl">Buy Now Quantity:</div>
         <div class="pright_lbl">
     <div class="pull-left">
      <div><input type="text" id="qty_add" class="form-control pbid_amount numberonly" name="qty"  placeholder="" required></div> <div class="bid"><span class=""></span></div>
      </div>
      <div class="pull-left">
        {if $loged.userid > 0}
        {assign var="cnt" value=$loged.pid.indexOf($projects.id)}
        <button type="button" class="btn btn-danger  addcart {if $projects.user_id == $loged.userid} disabled {/if}" onClick="addToCart('{$projects.id}');"  {if $user_location != $projects.sell_location && $projects.sell_location != ''} disabled {/if} ><span>{if $cnt >= 0} Remove Cart {else if $projects.id > 0} Add To Cart {/if}</span></button>
        {else}
        <button type="button"  class="btn btn-danger addcrt" onclick="window.location='{$config.url}/login'"><i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;&nbspAdd To Cart</button>
        {/if}
        {/if}<br /> </div></div></div>
        {/if}
     
        <div class="ctgrychm div">
          <div class="plbl">Payment Method:</div>
          <div class="ppimg"><img src="{$config.url}/images/productview.png" class="img-responsive"></div>
        </div>
      <!--  {if $projects.auction}
        <button type="button" class="btn btn-danger {if $projects.user_id == $loged.userid} disabled {/if}" data-toggle="modal" data-target="#confirmbid">Bid Now</button>
        {/if} </div>-->
		</div>
      <div class="col-md-4 con_seller">
	   <div class="prv_gbox">
        <div class="seller_info">SELLER INFO</div>
        <div class="clearfix con_sp">
          <div class="">
		   <div> {if $projects.uimage == ''}<img src="{$config.url}/images/blankimg.png">{else}<img src="{$config.url}/uploads/profile/{$projects.uimage}" width="150">{/if}</div>
		   <div class="seller_name1 clearfix"> <a href="{$config.url}/profile/view/{$projects.user_id}">{$users.first_name} {$users.last_name|truncate:1:""} </a></div>
		  </div>
		  <div>
          {if $projects.review > 4.5}
          <div class="ratings_pv">
          	<i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
           </div>
          {elseif $projects.review > 4}
          <div class="ratings_pv">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-half-empty"></i>
          </div>
          {elseif $projects.review > 3.5}
          <div class="ratings_pv">
          	<i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star-o"></i>
           </div>
          {elseif $projects.review > 3}
          <div class="ratings_pv">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-half-empty"></i>
              <i class="fa fa-star-o"></i>
          </div>
          {elseif $projects.review > 2.5}
          <div class="ratings_pv">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star-o"></i>
          </div>
          {elseif $projects.review > 2}
          <div class="ratings_pv">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-half-empty"></i>
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star-o"></i>
           </div>
          {elseif $projects.review > 1.5}
          <div class="ratings_pv">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star-o"></i>
          </div>
          {elseif $projects.review > 1}
          <div class="ratings_pv">
          	<i class="fa fa-star"></i>
            <i class="fa fa-star-half-empty"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            </div>
          {elseif $projects.review > .5}
          <div class="ratings_pv">
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
            </div>
          {elseif $projects.review > 0}
          <div class="ratings_pv">
          	<i class="fa fa-star-half-empty"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
           <i class="fa fa-star-o"></i>
           </div>
          {else}
          <div class="ratings_pv">
          <i class="fa fa-star-o"></i>
          <i class="fa fa-star-o"></i>
          <i class="fa fa-star-o"></i>
          <i class="fa fa-star-o"></i>
          <i class="fa fa-star-o"></i></div>
          {/if} </div>
          
        <div class="cont_sller">
         {if $loged.userid > 0 and $loged.userid != $projects.user_id}
          <button type="button" class="btn btn-danger bttns" data-toggle="modal" data-target="#sellerinfo"><i class="fa fa-envelope-o"></i>&nbsp;&nbsp;&nbsp;Contact Seller</button>       
         
         {/if} 
        </div>
		</div>
		<!--<div class="" {if $projects.buynow==0}style="display:none;"{/if}> {if $projects.qty - $projects.sold > 0}  
        {if $loged.userid > 0}
        {assign var="cnt" value=$loged.pid.indexOf($projects.id)}
        <button type="button" class="btn btn-default btns2 addcart {if $projects.user_id == $loged.userid} disabled {/if}" onClick="addToCart('{$projects.id}');"><i class="fa fa-shopping-cart" lattr="Processing"></i>&nbsp;&nbsp;&nbsp;<span>{if $cnt >= 0} Remove Cart {else if $projects.id > 0} Add To Cart {/if}</span></button>
        {else} <a href="{$config.url}/login">
        <button type="button"  class="btn btn-default btns2"><i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;&nbsp;Add To Cart</button>
        </a> {/if}
        {/if} </div>-->
      </div>
      
    </div>
	 <div class="loriem col-md-12">
      <div class="ct_headt">Seller location: {$projects.sell_location}</div>
    <div class="ct_headt">SHIPPING DETAILS</div>
	 <div class="ctgrychm div">
          <div class="plbl">Shipping Fee:</div>
          <div class="pright_lbl pred_tlbl">$ {$projects.shipping_price}</div>
        </div>
		 <div class="ctgrychm div">
          <div class="plbl">Shipping information:</div>
          <div class="pright_lbl">{$projects.shipping_description}</div>
        </div>
  </div>
  <div class="loriem col-md-12">
    <div class="ct_headt">Product Description</div>
    <p> {$projects.description} </p>
  </div>
  </div>
  
</div>
</div>

 <div class="simpro_lbl">Similar Products for Other Sellers</div>

   {$proj=$oproject}
   {include file="projects-new.tpl" nocache} 

</div>
<div class="modal fade" id="confirmbid" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm" id="messagebox">
    <div class="modal-content">  <div class="modal-header">
			<img src="{$config.url}/images/logoc.png" class="img-responsives"/>
			 </div>
		  <div class="modal-body">
      <form id="submitbid2"  action="{$config.url}/product/confirm/" method="post" enctype="multipart/form-data" class="form-inline">
        <input type="hidden" name="id" value="{$projects.id}" />
        <div class="form-group">
          <label for="email">Place Your Bid:</label>
          <input type="text" class="form-control floatpoint" style="padding:6px 0px;"name="wsprice" id="checkwsprice" placeholder="$ 0.00" required>
          <div class="bid" style="display:none">Last Bid:<span class="pric_l">{$projects.wprice}</span></div>
          <input type="hidden" id="lstbid" value="{$projects.wprice}" />
        </div>
        <button type="button" onClick="check()"class="btn btn-danger"> Submit Bid</button>
      </form>
	  </div>
    </div>
  </div>
</div>
{if $placedbid}
<div class="modal fade" id="cnx" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
   <div class="modal-content">
	  <div class="modal-header">
				<img src="{$config.url}/images/logoc.png" class="img-responsives"/>
				 </div>
			  <div class="modal-body">
		  <div class="cong">Congratulation<img src ="{$config.url}/images/thumb.png"></div>
		  <div class="bid_succes">Bidded Successfully!....</div>
		  <button type="button" class="btn btn-danger butns" data-dismiss="modal">OK</button>
		</div>
	</div>
  </div>
</div>
{/if}



<div class="modal fade" id="bidhistory" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
      <img src="{$config.url}/images/logoc.png" class="img-responsives"/>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><img src="{$config.url}/images/close.png" style="position: absolute;right: -10px;top: -15px;" width="27px" height="27px" /></button>
      </div>
      <div class="modal-body bid_history">
      <h5 class="bid_hlbl">Bid History</h5>
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="row">
            <div class="col-md-5">
              User Name
            </div>
            <div class="col-md-4">
              Date & Time
            </div>
            <div class="col-md-3">
            Amount
            </div>
          </div>
        </div>
        <div class="panel-body">
         {if $bids|count <=  0}
      <div class="row"> 
    <div class="col-md-12 txt_center">No Bids Found </div>
    </div>
      {else}
      {foreach $bids as $key => $val}
        <div class="row">  
          <div data-label="User Name" class="col-md-5">{$val.name}</div>
          <div data-label="Bid Amount" class="col-md-4">{$val.date_add}</div>
           <div data-label="Bid Time" class="col-md-3" >US $ <span id="price{$val.proposed_amount}" class="format">{$val.proposed_amount}</span></div>
           <!--<script>
          var num = {$val.proposed_amount};
          var result = num.toFixed(2);
          $('#c{$val.bidids}').text('Us $'+result);
             </script>
                <script>-->

        </div>
       {/foreach}
      {/if}
        </div>
      </div>
    </div>
    </div>
  </div>
</div>



<div class="modal fade" id="sellerinfo" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
		  <div class="modal-header">
			<img src="{$config.url}/images/logoc.png" class="img-responsives"/>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><img src="{$config.url}/images/close.png" style="position: absolute;right: -10px;top: -15px;" width="27px" height="27px" /></button>
		  </div>
		  <div class="modal-body">
			 <form action="{$config.url}/product/contact/" method="post" data-parsley-validate enctype="multipart/form-data" class="form-inline">
				<input type="hidden" name="id" value="{$projects.id}" />
				<div class="row">
				  <div class="col-md-12">
					<h2 style="font-weight: bold;">Message</h2>
					<textarea class="form-control" name="message" data-parsley-required  style="width:100%;background: #EBEBEB;height:150px;/*margin-left:25px;*/" placeholder="Contact Seller..."> </textarea>
				  </div>
				  <div class="col-md-5">
					<input type="submit" type="button" style="margin: 11px 0px 11px 97px;" class="btn btn-danger" value="Submit">
				  </div>
				</div>
			  </form>
	  </div>
    </div>
  </div>
</div>
{if $placecontract}
<div class="modal fade" id="sellerinfoconfirm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
	 <div class="modal-header">
			<img src="{$config.url}/images/logoc.png" class="img-responsives"/>
	</div>
	 <div class="modal-body">
	
      <div class="cong">Thank You<img src ="{$config.url}/images/thumb.png"></div>
      <div class="bid_succes">Message Sent Successfully!....</div>
      <button type="button" class="btn btn-danger butns" data-dismiss="modal">OK</button>
    </div>
	</div>
  </div>
</div>
{/if}


{include file="common/footer-1.tpl" nocache} 

<script language="javascript" type="text/javascript">
if(typeof(clearvar) === 'undefined')
{
  var clock = [];  var targetDate = [];  var clearvar = []; var timeProject = [];
}
timeProject['{$projects.id}'] = new Date('{$datenow}'); 
clearvar['{$projects.id}'] = setInterval(function(){});
setIntrevalMain('{$projects.id}','{$projects.market_status}');
clock['{$projects.id}'] = document.getElementById('my{$projects.id}');
targetDate['{$projects.id}'] = new Date('{$projects.closed}'); 
 
  clock['{$projects.id}'].innerHTML = countdown(targetDate['{$projects.id}']).toString();
          $(function() { $('.myp').addClass('act_class'); } );
      var pid = '{$projects.id}';

      var dt = '{$projects.closed}';
      console.log(dt);
       var resultss = {
            id: pid,
            date: dt,
            price:'{$projects.wprice}',
      pric_l : $('.pric_l').html(),
      bid_history :  $('.bid_history').html()    
        }
    console.log(resultss);
    socket.on('bidAddtime', function(msg){    
    // meee(msg.id,msg.date);

    $('.pric_l').html(msg.pric_l);
    $('.bid_history').html(msg.bid_history);
    $('.sbid').html($('.lcntbid').html());
    
    meee(msg.id,msg.date,msg.price);
    });

    socket.emit('bidAddtime', resultss);  
     </script> 
<script type="text/javascript">

$(function()
{

  projectLoad();
   var sync1 = $(".main-preview");
        
       
        sync1.owlCarousel({
          singleItem : true,
          slideSpeed : 500,
          navigation: true,
          navigationText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
          pagination:false,          
          responsiveRefreshRate : 200,
        });
       
        
       
        
});
function addToCart(id)
{
  //console.log(parseInt($('#qty_add').val()));
  //console.log($('.addcart').find('span').html().indexOf("Add"));
  if((parseInt($('#qty_add').val()) <= 0 || $('#qty_add').val() == '') &&  $('.addcart').find('span').html().indexOf("Add") >= 0)
  {
        alert('Please select atleast one quantity');
        return false;
  }  
  $.ajax({
    type : 'GET',
      url  : '/product/cart/'+id+'?qty='+$('#qty_add').val(),
      data : {},
      dataType : 'json',
      success  : function(data)
      {
        console.log(data);

             if(data.success)
             {
               if(data.add)
               {
                 $('.addcart').find('span').html(' Remove Cart');
                 var k = parseInt($('.cart').html());
                 k = k + 1;
                 if(k < 0)
                 {
                  k = 0;
                 } 
                 $('.cart').html(k);
                 if(k > 0)
                 {
                  window.location = '{$config.url}/product/checkout/cart/'
                 } 
               } 
               else
               {
                $('.addcart').find('span').html(' Add to Cart');
                var k = parseInt($('.cart').html());
                 k = k - 1;
                 if(k < 0)
                 {
                  k = 0;
                 } 
                 $('.cart').html(k);
                 
               } 
                if(k == 1 && data.add)
                {
                  $('.timer_cnt .cnter').html({$config.general.cart_timer}-1);
                  runTimer();
                }  
                
             } 
             else
             {
                 if(data.error == '')
                 {
                  window.location = '{$config.url}/login';
                 } 
                 else
                 {
                  alert(data.error);
                 } 
             } 
      }

  });
}
</script> 
{if $bidshow} 
<script type="text/javascript">
$(function()
{
  $('#confirmbid').modal();
});</script> 
{/if}
{if $buyshow} 
<script type="text/javascript">
$(function()
{
  $('#buybid').modal();
});</script> 
{/if} 
<script>
$(document).ready(function() {

   $("#slider4").responsiveSlides({
	auto: false,
	pager: false,
	nav: true,
	speed: 500,
	namespace: "callbacks",
	before: function () {
	  $('.events').append("<li>before event fired.</li>");
	},
	after: function () {
	  $('.events').append("<li>after event fired.</li>");
	}
  });
 
});
</script>