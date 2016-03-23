{include file="/common/header-1.tpl" nocache}
<div class="col-md-12">
  <div class="dash_brd" style="padding:10px 0;"><a href="/dashboard/mybids">Dashboard</a> &gt;&gt; Buynow</div>
  <div class="check_wrapper"  style="margin:0; margin-bottom:4%;">
  <div class="prdt  gray_box">Your Product</div>
  
  

  
  
  <div class="clearfix search_list md_hide">
    <div class="pricelist">Item</div>
    <div class="pricelist">Qty Ordered</div>
    <div class="pricelist">Qty Added</div>
    <div class="pricelist">Total price(USD $)</div>
    <div class="pricelist">Refund price(USD $)</div>
  </div>
  {foreach $buynow as $key => $val}
  <div class="search_list">
   <div class="pricelist1">
       <div data-label="Item Title" class="account_p_lbl item_ct"> {$val.title}</div>
      <div data-label="Item Image" class="account_p_lbl">
        <img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" class="wd100new">
      </div>
  </div>
  <div data-label="Qty Ordered" class="account_p_lbl pricelist11 p60">{$val.ordered}</div>
   <div data-label="Qty Added" class="account_p_lbl pricelist11">{$val.qty}</div> 
  <div data-label="Total price(USD $)" class="account_p_lbl pricelist11 p60">US ${$val.amount}</div>
  <div data-label="Refund price(USD $)"class="account_p_lbl pricelist11 p60">US ${$val.refund}</div>
  </div>
  
  {/foreach}

  <div class="row">
  <button type="button" class="btn btn-danger btns">Paid Amount:${$cart.amount}</button>
  <button type="button" class="btn btn-danger btns">Refund Total:${$cart.refund}</button>
  </div>
  
  </div>
  
  
  </div>
{include file="/common/footer-1.tpl" nocache} 
