{include file="/common/header-1.tpl" nocache}
<div class="row">
<style>
.gray_box{
border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding-left: 13px;
}
.check_wrapper{
	border-radius: 10px;
}
.kopa{
	padding-left:7px;
}
</style>
<div class="col-md-12 checkout_session">
  <div class="dash_brd" style="padding:10px 0;"><a href="/dashboard/mybids">Dashboard</a> &gt;&gt; Buynow</div>
  <div class="check_wrapper" style="margin:0; margin-bottom:4%;">
  <div class="prdt  gray_box">Your Product</div> 
  
  <div class="clearfix search_list md_hide" style="color: black;font-weight: bold;">
    <div class="pricelist">Item</div>
    <div class="pricelist">Price(USD $)</div>
    <div class="pricelist">Quantity</div>
    <div class="pricelist">Shipping Cost(USD $)</div>
    <div class="pricelist">Total price(USD $)</div>
  </div>
  {$total=1}
  <form action="{$config.url}/product/checkout/update" method="post" data-parsley-validate> 
  {foreach $loged.products as $key => $val}
  <span class="text-danger">{$val.error}</span>
  <div class="search_list">  
  <div class="pricelist1 kopa" style="margin-bottom: 10px;">
       <div data-label="Item Title" class="account_p_lbl item_ct"> {$val.title}</div>
      <div data-label="Item Image" class="account_p_lbl">
        <img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" class="cartimage_100">
      </div>
  </div>
  <div data-label="Price" class="account_p_lbl pricelist11 p60 kopa">US ${$val.bprice}</div>
   <div data-label="Quantity" class="account_p_lbl pricelist11 kopa"><input type="text" class="cart_quantity" name="pid[{$val.id}]" value="{$val.qty_add}" data-parsley-max={$val.qty-$val.sold-$val.booked+$val.qty_add} required /></div>
  <div data-label="Shipping Cost(USD $)"class="account_p_lbl pricelist11 p60 kopa">US ${$val.shipping_price}</div>
  <div data-label="Total price(USD $)" class="account_p_lbl pricelist11 p60 kopa">US ${$val.qty_add*($val.shipping_price+$val.bprice)} &nbsp;&nbsp;&nbsp;
    <a class="btn btn-dangernew check_rbtn"  onclick="removecartitemjay('{$val.id}');"  style="cursor:pointer;margin-left: 40px;">X</a></div>
  </div>
  {$total=$total+$val.qty_add*($val.bprice+$val.shipping_price)}
  {/foreach}
  <input type="submit" class="btn btn-danger btns" value="Update Cart" />
</form>
  <div class="row">
  <button type="button" class="btn btn-danger btns">Grand Total:${$total-1}</button>
  </div>
  <div class="row border_top">
    <button type="button" class="btn btn-danger btns" onclick="window.location = '{$config.url}/product/checkout/confirm/'" data-toggle="modal" data-target="#box">Proceed to Checkout</button>
    <button type="button" class="btn btn-danger btns " onclick="window.location = '{$config.url}'">Continue Shopping</button>
  </div>
  </div>
  
  
  </div>
</div>

{include file="/common/footer-1.tpl" nocache} 
<script type="text/javascript">
  {literal}
function removecartitemjay(id)
{
  if (confirm("Are you sure you want to remove it?") == true) {
	//console.log(parseInt($('#qty_add').val()));
  //console.log($('addcart').find('span').html().indexOf("Add"));
  if(parseInt(id) <= 0 || id == '')
  {
        alert('Invalid Listing');
        return false;
  }  
  $.ajax({
    type : 'GET',
      url  : '/product/removecart/'+id,
      data : {},
      dataType : 'json',
      success  : function(data)
      {
        //console.log(data);

             if(data.success)
             {
                 window.location = '/product/checkout/cart/'
             } 
             else
             {
                 window.location = '/login';
             } 
      }
  });
  }
}
{/literal}
</script> 