{include file="common/header-1.tpl" nocache}
<style type="text/css">
.pdbut .btn
{
  margin:10px;
}
</style>
<div class="row sellp1">
<div class="col-md-10 padlef0 pull-left">
{include file="seller-menu.tpl" nocache}
{if $projects|count <=  0}
   <div class="row mblue_box1 tno_bids"> No Products Found </div> 
{else}      
{foreach $projects as $key => $val}
<div class="row sellp border-btm">
<div class="col-md-3 padlef0 photo_pbox">
<img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" class="wd100"></div>
<div class="col-md-9 msold_right">
<div class="Listft16"><a href="{$config['url']}/product/view/{$val.project_id}" title="{$val.ptitle}"> {$val.title}</a></div>
<p class="Lis14 text-justify height_58">{$val.description}</p>
<div class="clearfix price">
 <div class="gray_bbox"> Paid Amount : US $ {$val.amount-$val.refund} </div>
 {if $val.paid}<div class="gray_bbox"> Paid Date : {$val.paid_date}</div>{/if}
<div class="gray_bbox"> Quantity:{$val.qty}</div>
</div>
<div class="clearfix">
{if $val.paid}
  <button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="viewShippingInfo({$val.cart_id})">View Shipping Details</button>

  <button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="window.location='{$config.url}/dashboard/invoice/{$val.id}'">View Invoice</button>
{/if}
{if $val.tracking_number == '' and $val.paid}
  <button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="addShippingInfo({$val.cart_id},{$val.id},this)">Add Shipping Tracker Info</button>
{/if}
{if $val.paid and $val.release == 1}
  <button type="button" class="btn btn-danger bttns" style="margin-top:5px;" >Payment Released</button>
{/if}
{if $val.paid and $val.release == 2}
  <button type="button" class="btn btn-danger bttns" style="margin-top:5px;" >Payment Cancelled</button>
{/if}
{if $val.feedback == 1 and $val.release > 0}<button type="button" class="btn btn-danger bttns" style="margin-top:5px;" onclick="feedbackReview({$val.b_id})">Feedback Detail</button>{/if}
{if $val.paid and $val.release == 0}
  <button type="button" class="btn btn-danger bttns" style="margin-top:5px;">Paid</button>
{/if}
{if !$val.paid and $val.release == 0}
  <button type="button" class="btn btn-danger bttns" style="margin-top:5px;" >Unpaid</button>
{/if}
</div>
</div>
</div>
{/foreach}
{$pagination_html}
{/if}
</div>
<div class="col-md-2 col-xs-12 pull-right">
	<div class="r_btns"><a class="btn btn-danger" href="{$config.url}/product/post">Sell An Item</a></div>
	<div class="r_btns"><a class="btn btn-default" href="{$config.url}/dashboard/messages">Messages</a></div>
	<div class="r_btns"><a class="btn btn-default" href="{$config.url}/profile_settings">Profile</a></div>
	<div class="r_btns"><a class="btn btn-default" href="{$config.url}/dashboard/payments">Payments</a></div>
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
<script language="javascript" type="text/javascript">
          $(function() { $('.myp').addClass('act_class'); } );
     </script> 
<script type="text/javascript">
$(function()
{
  projectLoad();
});</script>

</div>
