{include file="common/header-1.tpl" nocache}

<style type="text/css">
.pdbut .btn
{
  margin:10px;
}
</style>
<div class="row sellp1">
<div class="col-md-10 padlef0">
{include file="selling-menu.tpl" nocache}
      {if $mybids|count <=  0}
     <div class="row mblue_box1 tno_bids"> No Won Auction Found </div>
      {else}
      {foreach $mybids as $key => $val}
       <div class="row sellp border-btm">
        <div class="col-md-2 padlef0 photo_pbox">
        <img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" class="wd100" />
        </div>
        <div class="col-md-8">
         <div class="Listft16">{$val.title}</div>
         <p class="Lis14 text-justify height_58">{$val.description}</p>
         <div class="clearfix price">
			<div class="gray_bbox"> Quantity : {if $val.qty == ''} 1 {else if $val.qty != ''} {$val.qty} {/if}</div> 
			<div class="gray_bbox">price:US $ <span id="price{$val.amount}" class="format">{$val.amount}</span> </div>
			<div class="gray_bbox"> Won Date: {$val.date_add} </div>
		 </div>       
			<div class="clearfix">
          {if $val.paid == 0}
                   <button type="button" class="btn btn-danger bttns" onclick="window.location = '{$config.url}/product/payment/{$val.b_id}'" style="margin-top:5px;">Pay Now</button>
                {/if}
                {if $val.paid == 1}                
                <button type="button" class="btn btn-danger" onclick="window.location='{$config.url}/dashboard/invoice/{$val.b_id}'" style="margin-top:5px;">View Invoice</button>
                {if $val.release == 0}<button type="button" class="btn btn-danger" onclick="doAction('release_buy',{$val.b_id})" style="margin-top:5px;">Release Fund</button>{/if}
                {if $val.shipping_info != ''}<button type="button" class="btn btn-danger" onclick="viewShippingTracking({$val.cart_id},{$val.b_id})" style="margin-top:5px;">View Shipping Tracking</button>{/if}                
                {if $val.release == 0}<button type="button" class="btn btn-danger"  onclick="doAction('cancel_buy',{$val.b_id})" style="margin-top:5px;">Cancel Fund</button>{/if}
                {if $val.release == 2}<button type="button" class="btn btn-danger" style="margin-top:5px;">Fund Cancelled</button>{/if}
                {if $val.release == 1}<button type="button" class="btn btn-danger" style="margin-top:5px;">Fund Released</button>{/if}
                {if $val.feedback == 0 and $val.release > 0}<button type="button" class="btn btn-danger"  style="margin-top:5px;" onclick="doAction('feedback_buy',{$val.b_id})">Leave a feedback</button>{/if}
                {if $val.feedback == 1 and $val.release > 0}<button type="button" class="btn btn-danger"  style="margin-top:5px;" onclick="feedbackReview({$val.b_id})">Feedback Detail</button>{/if}
                
                {/if}
			</div>
         </div>   
        </div>
        
      {/foreach}  

{$pagination_html}
{/if}
</div>
<div class="col-md-2 col-xs-12 pull-right">
	<div class="r_btns"><a class="btn btn-danger" href="{$config.url}/dashboard/mybids">Buy An Item</a></div>
	<div class="r_btns"><a class="btn btn-default" href="{$config.url}/dashboard/messages">Messages</a></div>
	<div class="r_btns"><a class="btn btn-default" href="{$config.url}/profile_settings">Profile</a></div>
	<div class="r_btns"><a class="btn btn-default" href="{$config.url}/dashboard/payments">Payments</a></div>
</div>
<script type="text/javascript">
function doAction(cmd,id)
{
    if(cmd == 'release_buy')
    {
        var r = confirm("Are You sure yo want to release the fund?");
        if (r == true) {
            window.location = '{$config.url}/dashboard/payment/release/buy/'+id
        } else {
            return false;
        }
    } 
    if(cmd == 'cancel_buy')
    {
        var r = confirm("Are You sure yo want to cancel the fund?");
        if (r == true) {
            window.location = '{$config.url}/dashboard/payment/cancel/buy/'+id
        } else {
            return false;
        }
    } 
    if(cmd == 'release')
    {
        var r = confirm("Are You sure yo want to release the fund?");
        if (r == true) {
            window.location = '{$config.url}/dashboard/payment/release/bid/'+id
        } else {
            return false;
        }
    } 
    if(cmd == 'cancel')
    {
        var r = confirm("Are You sure yo want to cancel the fund?");
        if (r == true) {
            window.location = '{$config.url}/dashboard/payment/release/bid/'+id
        } else {
            return false;
        }
    } 
    if(cmd == 'feedback_buy')
    {
       
            window.location = '{$config.url}/dashboard/payment/feedback/buy/'+id
    } 
    if(cmd == 'feedback')
    {
       
            window.location = '{$config.url}/dashboard/payment/feedback/bid/'+id
        
    }  

}
</script>








</div>
</div>
{include file="common/footer-1.tpl" nocache} 
<div class="modal fade" id="shippinginfo" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
     <div class="modal-header"></div>
     <div class="modal-body info-data"></div>    
    </div>
  </div>

    </div>
  </div>
  <div class="modal fade" id="feedbackinfo" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
     <div class="modal-header"></div>
     <div class="modal-body info-data"></div>    
    </div>
  
  </div>

    </div>
  </div>