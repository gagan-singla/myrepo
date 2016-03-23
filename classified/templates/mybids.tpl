{include file="common/header-1.tpl" nocache}
{include file="time-common-loader.tpl" nocache}

<style type="text/css">
.pdbut .btn
{
  margin:10px;
}
</style>
<div class="row sellp1">
    <div class="col-md-10 padlef0 pull-left">
    {include file="selling-menu.tpl" nocache}
    {if $mybids|count <=  0}
          <div class="row mblue_box1 tno_bids"> No Bids Found </div>
    {else}
      {foreach $mybids as $key => $val}
       <div class="row sellp border-btm">
            <div class="col-md-3 padlef0 photo_pbox">
            <img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" class="wd100" />
            </div>
            <div class="col-md-9">
             <div class="Listft16"><a href="{$config['url']}/product/view/{$val.id}"  title="{$val.ptitle}">{$val.title}</a></div>
             <p class="Lis14 text-justify height_58">{$val.description}</p>
             <div class="clearfix price">
              <div class="timer_box" {if $val.status == 'draft' || $val.buynow == 1}style="display:none"{/if}>{if $val.status == 'open' or $val.status == 'draft'}<span id="my{$val.id}">{$val.day}</span> {else if $val.status != 'open'}Closed {/if}
              </div>
             <div class="gray_bbox">
             Quantity : {if $val.qty == ''} 1 {else if $val.qty != ''} {$val.qty} {/if}
             </div>
             <div class="gray_bbox">
             Price:US $ <span id="price{$val.proposed_amount - $val.refund_amount}" class="format">{$val.proposed_amount - $val.refund_amount}</span> {if $val.awarded}|  Won Date: {$val.adate} {/if}
             </div>
             </div>        
            <div class="clearfix">
                    {if $val.buynow == 1}
                    <button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="window.location='{$config.url}/dashboard/invoice/{$val.b_id}'">View Invoice</button>
                    {if $val.release == 0}<button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="doAction('release_buy',{$val.b_id})">Release Fund</button>{/if}
                    {if $val.release == 0}<button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="doAction('cancel_buy',{$val.b_id})">Cancel Fund</button>{/if}
                    {if $val.release == 2}<button type="button" class="btn btn-danger bttns" style="margin-top:5px;">Fund Cancelled</button>{/if}
                    {if $val.release == 1}<button type="button" class="btn btn-danger bttns" style="margin-top:5px;">Fund Released</button>{/if}                
                    {if $val.shipping_info != ''}<button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="viewShippingTracking({$val.cart_id},{$val.b_id})">View Shipping Tracking</button>{/if} 
                    {if $val.feedback == 0 and $val.release > 0}<button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="doAction('feedback_buy',{$val.b_id})">Leave a feedback</button>{/if}       
                    {if $val.feedback == 1 and $val.release > 0}<button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="feedbackReview({$val.b_id})">Feedback Detail</button>{/if}         
                    {/if}
                </div>
             </div> 
             </div>
           {include file="time-loader.tpl" nocache}
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
    </div>