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
    <div class="panel panel-default msg_trwrap">
    <div class=" panel-heading  md_hide">
		<div class="row">
		  <div class="col-md-2" style="font-weight: bold;">S.No</div>
		  <div class="col-md-2" style="font-weight: bold;">Name</div>
		  <div class="col-md-3" style="font-weight: bold;">Number/Email</div>
		  <div class="col-md-3" style="font-weight: bold;">Exp Month/Year</div>
		  <div class="col-md-2" style="font-weight: bold;">Type</div>
	  </div>
      </div>
	   {if $creditCards|count <=  0}
		 <div class="panel-body">
         <div class="row">
          <div class="col-md-12" style="text-align:center;"> No Credit Cards  Found </div>
        </div>
		</div>
        {else}
	  <div class="panel-body">
      {foreach $creditCards as $key => $val}
      <div class="row">
	  <div data-label="S.No" class="account_p_lbl col-md-2">{$key+1}</div>
      <div data-label="Name" class="account_p_lbl col-md-2">{$val.card_name}</div>
      <div data-label="Number/Email" class="account_p_lbl col-md-3">{$val.encrypt_card}</div>
      <div data-label="Exp Month/Year" class="account_p_lbl col-md-3">{if $val.expiration_month > 0}{$val.expiration_month}/{$val.expiration_year}{/if}</div>
      <div data-label="Type" class="account_p_lbl col-md-2">{$val.card_type}</div>
	  </div>
	  {/foreach} 
	  
	</div>
	 {/if} 
    </div>	
  </div> 	
</div></div>
<div style="height:170px;"></div>
{include file="/common/footer-1.tpl" nocache}
