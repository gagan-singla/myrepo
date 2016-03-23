{include file="/common/header-1.tpl" nocache}
<script src="https://js.braintreegateway.com/v2/braintree.js"></script> 
<script type="text/javascript">

   braintree.setup('{$clientToken}', "paypal", {
    container: "paypal-button",
    paymentMethodNonceInputField : "paymentMethodNonceInputField",
    onSuccess : function(){
      
      $('#overlay').fadeIn(800); 
        
      $('#checkout').submit();
          
     },
     onCancelled: function(){
      $('#paypal-buttons').addClass('hide');
     },
     singleUse : false

  });
  




</script> 

<div class="container">
<div class="row">
<div class="col-md-3 txtfun3 padlef0 mobile_view">
    {include file="payments-menu.tpl"}
  </div>
 <div class="ds npayment col-md-9 mobile_view">
    <form action="{$config.url}/dashboard/cc" method="post" id="checkout">
    	  <input type="hidden" name="payment_method_nonce" id='paymentMethodNonceInputField' />
        <div id="paypal-button" class="paypal-button"></div>
    </form>	
  </div> 	
</div></div>
{include file="/common/footer-1.tpl" nocache}
