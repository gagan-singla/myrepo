{include file="/common/header-1.tpl" nocache}
<div class="main_container">
<div class="row sellp1">
  <form name="" action="{$config.url}/dashboard/feature/" method="post" id="paypal-form">
    <input type="hidden" name="id" value="{$id}" />
    <div class="dash_brd">{$title}</div>
    <div class="panel panel-default">
      <div class="prdt panel-heading">Your Product - {$projects.title}</div>
      <div class="panel-body">
	  <div class="row">
        <div class="col-md-5">
          <div class="featured_list">Total amount to be paid - <span>US ${$amount}</span></div>
		</div>
		<div class="col-md-3"><div id="paypal-button" class="paypal-button"></div></div>
      </div>
      <div class="text-danger">{$error}</div>
      <div class="row shipping_container">
       

         <div class="row">
         
        <div class="col-md-5">
          <div class="form-group">
            <input type="hidden" name="paymentMethodNonceInputField" id='paymentMethodNonceInputField' />
            
          </div>
          
        </div>
      </div>

      </div>
        </div>
    </div>
    
    <!--<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#boxx" data-whatever="@mdo">Pay with PayPal</button>-->
  </form>
</div>

  </div>
{include file="/common/footer-1.tpl" nocache} 
<script src="https://js.braintreegateway.com/v2/braintree.js"></script> 
<script>
  //braintree.setup("CLIENT-TOKEN-FROM-SERVER", "<integration>", options);
  braintree.setup('{$clientToken}', "paypal", {
    container: "paypal-button",
    paymentMethodNonceInputField : "paymentMethodNonceInputField",
    onSuccess : function(){
      $('#overlay').fadeIn(800);      
      setTimeout(function(){ $('#paypal-form').submit(); }, 3000);
     },
     singleUse : false
  });
</script> 
