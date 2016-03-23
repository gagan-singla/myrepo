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
  <!--<div class="dash_brd" style="padding:10px 0;"><a href="/dashboard/mybids">Dashboard</a> &gt;&gt; Buynow</div>
  <div class="check_wrapper" style="margin:0; margin-bottom:4%;">
  <div class="prdt  gray_box">Your Product</div>

  <div class="clearfix search_list md_hide" style="color: black;font-weight: bold;">
    <div class="pricelist">Item</div>
    <div class="pricelist text-center">Price(USD $)</div>
    <div class="pricelist text-center">Quantity</div>
    <div class="pricelist text-center">Shipping Cost(USD $)</div>
    <div class="pricelist">Total price(USD $)</div>
  </div>
  {$total=1}
  <form action="{$config.url}/product/checkout/update" method="post" id="form_cart" data-parsley-validate>
  {foreach $loged.products as $key => $val}
  <span class="text-danger">{$val.error}</span>
  <div class="search_list div{$val.id}">
  <div class="pricelist1 kopa" style="margin-bottom: 18px;">
       <div data-label="Item Title" class="account_p_lbl item_ct"><b> {$val.title}</b></div>
      <div data-label="Item Image" class="account_p_lbl">
        <img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" class="cartimage_100">
      </div>
  </div>
  <div data-label="Price" class="account_p_lbl pricelist11 p60 kopa text-center">US ${$val.bprice}</div>
   <div data-label="Quantity" class="account_p_lbl pricelist11 kopa text-center"><input type="text" class="cart_quantity" data-parsley-group="block1" name="pid[{$val.id}]" value="{$val.qty_add}" data-parsley-min="1" data-parsley-max={$val.qty-$val.sold-$val.booked+$val.qty_add} required /></div>
  <div data-label="Shipping Cost(USD $)"class="account_p_lbl pricelist11 p60 kopa text-center">US ${$val.shipping_price}</div>
  {$t = $val.qty_add*sumFloat($val.bprice,$val.shipping_price)}
  <div data-label="Total price(USD $)" class="account_p_lbl pricelist11 p60 kopa">US ${(currencyConverter($t} &nbsp;&nbsp;&nbsp;
    <a class="btn btn-dangernew check_rbtn"  onclick="removecartitemjay('{$val.id}');"  style="cursor:pointer;margin-left: 80px;">X</a></div>
  </div>
  {$total=$total+$val.qty_add*sumFloat($val.bprice,$val.shipping_price)}
  {/foreach}
  <input type="submit" class="btn btn-danger btns" value="Update Cart" />

  <div class="row">
  <button type="button" class="btn btn-danger btns ">Grand Total:$<span class="total_amt" style="color:#fff">{currencyConverter($total-1)} </span></button>
  </div>
  <div class="row border_top">
    <button type="button" class="btn btn-danger btns" id="checkout"  data-toggle="modal" data-target="#box">Proceed to Checkout</button>
    <button type="button" class="btn btn-danger btns " onclick="window.location = '{$config.url}'">Continue Shopping</button>
  </div>
  </form>
  </div>-->


    <div class="col-md-12">
        <div class="dash_brd" style="padding:10px 0;"><a href="/dashboard/mybids">Dashboard</a> &gt;&gt; Buynow</div>
        <form action="{$config.url}/product/checkout/update" method="post" id="form_cart" data-parsley-validate>
            {$total = 0}
            <div class="col-md-8 vcz3p">

                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr class="text-center" style="font-weight: bold;">
                                <th >&nbsp;</th>
                                <th>&nbsp;</th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th class="text-center" style="width:141px">Qty</th>
                                <th>Shipping Cost(USD $)</th>
                                <th>Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>

                                {foreach $loged.products as $key => $val}
                                    <span class="text-danger">{$val.error}</span>
                                    <!--<div class="search_list div{$val.id}">-->
                                    <tr class="vcz3q div{$val.id}">
                                        {$t = $val.qty_add*sumFloat($val.bprice,$val.shipping_price)}
                                        {$t = parseFloat($t)}
                                        <td class="vcz3r"><a href="#" class="vcz2f" onclick="removecartitemjay('{$val.id}',{$t});"><b>X</b></a></td>
                                        <td><img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" width="62px" height="82px" onError="this.src='{$config['imgpath']}no_img.png';" /></td>
                                        <td class="vcz2f vcz3r"><a href="{$config.url}/product/view/{$val.id}/{$val.ptitleurl}"> {$val.title} </a></td>
                                        <td class="vcz3r">{$val.bprice}</td>
                                        <td class="vcz3r">
                                            <button type="button" value="{$val.id}" style="height: 33px; width: 30px;" class="sub"> - </button>
                                               <!-- <input type="text" style="width: 20%; height:33px; text-align:center">-->
                                                <input type="text" style="width: 30%; height:33px; text-align:center" class="cart_quantity add_qty{$val.id}" data-parsley-group="block1" name="pid[{$val.id}]" value="{$val.qty_add}" data-parsley-min="1" data-parsley-max={$val.qty-$val.sold-$val.booked+$val.qty_add} required />

                                            <button type="button" value="{$val.id}" style="height: 33px; width: 30px;" class="add"> + </button>
                                            <!--<a href="#"> <img src="{$config.url}/images/edit45.png"/></a>-->
                                        </td>
                                        <td class="vcz2f vcz3r">US ${$val.shipping_price}</td>

                                        <td class="vcz2f vcz3r">US ${currencyConverter($t)}</td>
                                    </tr >
                                    {$total=sumFloat($total,$val.qty_add)*sumFloat($val.bprice,$val.shipping_price)}

                                {/foreach}

                            </tbody>
                        </table>

                    </div>

                <div class="col-md-12 vcz3n padal">
                    <div class="col-md-4 padlf">
                        <button type="button" class="btn btn-default" onclick="window.location = '{$config.url}'">Continue Shopping</button>
                    </div>

                    <div class="col-md-8 text-right padrt">
                        <button type="button" class="btn btn-default" onclick="removeAllItems()">Clear Shopping Cart</button>
                        <input type="submit" class="btn btn-default" value="Update Shopping Cart">

                    </div>
                </div>
            </div>
        </form>
        <div class="col-md-4">

            <div class="col-md-12 vcz3s">
                <div class="col-md-12 vcz3u"><b>CART TOTAL </b></div>
                <div class="col-md-12">
                    <div class="col-md-12 vcz3v">
                        <div class="col-md-6 vcz3x">Subtotal</div>
                        <div class="col-md-6 text-right"> <span class="total_amt">${currencyConverter($total)} </span></div>
                    </div>

                </div>
                <div class="col-md-12">
                    <div class="col-md-12 vcz3w">
                        <div class="col-md-6 vcz3x">
                            Grand Total
                        </div>
                        <div class="col-md-6 text-right"><b><span class="total_amt">${currencyConverter($total)} </span></b></div>

                    </div>
                </div>

                <div class="col-md-12 vcz3z">
                    <button type="button" class="btn btn-danger btns" id="checkout" >Proceed to Checkout</button>
                </div>

            </div>
        </div>


    </div>

  </div>




</div>

{include file="/common/footer-1.tpl" nocache}
<script type="text/javascript">


    $('input[type=text]').on('change',function(){
        $('#form_cart').submit();
    });

    $( "#checkout" ).click(function() {
        if(false === $('#form_cart').parsley().validate('block1'))
        {
            return false;
        }
        else {
            window.location = '{$config.url}/product/checkout/confirm/';
        }

    });
  {literal}

    $('.add').click(function(){
        var current_val = $('.add_qty'+$(this).val()).val();
        var add_val = parseFloat(current_val) + 1;
            console.log("Value isssss "+$(this).val());
        $('.add_qty'+$(this).val()).val(add_val);
    });

    $('.sub').click(function(){
        var current_val = $('.add_qty'+$(this).val()).val();
        var sub_val = parseFloat(current_val) - 1;
        if(sub_val > 0) {
            $('.add_qty'+$(this).val()).val(sub_val);
        }
    })
/*function removecartitemjay(id)
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
}*/
{/literal}
</script>