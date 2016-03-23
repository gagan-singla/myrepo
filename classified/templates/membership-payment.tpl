{include file="common/header-1.tpl" nocache}
<style type="text/css">
.padding_200
{
  padding:20px 20px;
}
</style>
<form name="membership_pay" action="/membership/pay" method="post" data-parsley-validate required id="paypal-form">
  <input type="hidden" name="paymentMethodNonceInputField" id='paymentMethodNonceInputField' />
<div class="main_container">
  <div class="row dashboard">
    <div class="alert alert-danger">{$error}</div>
    <div class="col-md-12">
      <h4 class="ds_brd">Pay for Your Membership </h4>
      <h6>To change Plan.Please <a href="{$config.url}/membership/setup?update=1"> go here </a></h6>
      <div class="col-md-12  m-top-20 font-12">Membership Payment : {$data.name} </div>
      <div class="col-md-12  m-top-20 font-12">Membership Amount : {$data.amount} </div>       
       <div class="col-md-12">
        Select Payment Method</b>:
          <select name="paymentmethod" id="paymentmethod"  class="form-control" required>
            <option value="">Please Select</option>
            
               {foreach $creditCards as $key=>$val}
                 
            <option value="{$val.id}">{$val.card_type} {$val.encrypt_card}</option>
                 
               {/foreach}
               
            <option value="paypal">Add New Paypal</option>
            <option value="cc">Add New Creditcard</option>
          </select>
        
      </div>
      <div class="col-md-12 hide saved-drp">
        <div type="submit" class="btn btn-success" value="Submit" id="cardprocesstwo"  onclick="cardSubmit()">Pay </div>
      </div>
      
      
       
      
      </div>

  <div class="col-md-12  hide credit-drp">
        <div class="col-md-6 padding_200"> Card Holder Name </div>
        <div class="col-md-6 padding_200">
          <input type="text" name="cardholder_name" data-braintree-name="cardholder_name" class="form-control col-md-4 creditclass" value="" required data-parsley-required />
        </div>
        <div class="col-md-6 padding_200"> Credit Card Number </div>
        <div class="col-md-6 padding_200">
          <input type="text" name="number" data-braintree-name="number" class="form-control creditclass" value="" required data-parsley-required />
        </div>
        <div class="col-md-6 padding_200"> Expiry Date </div>
        <div class="col-md-2 padding_200">
          <input type="text" name="expiration_month" data-braintree-name="expiration_month creditclass" required data-parsley-required class="form-control col-md-3" value="" />
        </div>
        <div class="col-md-2 padding_200">
          <input type="text" name="expiration_year" data-braintree-name="expiration_year creditclass" required data-parsley-required class="form-control col-md-3 " value="" />
        </div>
        <div class="col-md-6 padding_200"> CVV </div>
        <div class="col-md-2 padding_200">
          <input type="text" required data-parsley-required name="cvv" data-braintree-name="cvv" class="form-control col-md-3 creditclass" value=""/>
        </div>
         <div class="col-md-12 padding_200">
            <input type="checkbox" id="future" name="savecard" value="1">
            <label for="future">Save for future payment</label>
        </div>
        <div class="col-md-12 padding_200">
          <div type="submit" class="btn btn-success" value="Submit" id="cardprocessone" onclick="cardSubmit()">Pay via Card </div>          
          <input type="submit" class="submit-card hide" />
        </div>
      </div>
      <div class="col-md-12 hide paypal-drp">
        <div class="col-xs-12 col-sm-6 col-md-6 pull-right">
          <div id="paypal-button" class="paypal-button pull-left"></div>
          <div id="paypal-buttons" class="paypal-buttons hide" onclick="cardSubmit();"><img src="{$config.url}/images/paypal.png" alt="Pay with PayPal" style="display:inline-table !important;cursor:pointer;"> </div>
          
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6" style="padding-top: 15px;">
          <label for="futurepal">Save for future payment</label>
          <input type="checkbox" id="futurepal" name="savepaypal" value="1">
        </div>    
  </div>

</div><input type="submit" class="submit-card hide" />
</form>
{include file="common/footer-1.tpl" nocache} 
<script src="https://js.braintreegateway.com/v2/braintree.js"></script> 

<script>
function cardSubmit()
{



    var payment = $("#paymentmethod").val();


    if(payment != "paypal" && payment != "cc")
    {

       // $('.submit-card').click();

      //  $(".creditclass").prop('required',false);

        $('.credit-drp').remove();

        $('.submit-card').click();

        /* $(".creditclass").prop('required',false);

        if(true === $('form[name="membership_pay"]').parsley().validate())
        {

            $('.submit-card').click();

        } */
    }
    else
    {
        if(true === $('form[name="membership_pay"]').parsley().validate())
        {

            $('.submit-card').click();

        }
    }
 

}
braintree.setup("{$clientToken}", "custom", {
  id: "paypal-form"
  });
$(function(){

  $('#paymentmethod').on('change',function(){

    if($(this).val() == 'paypal')
    {

      $('.paypal-drp').removeClass('hide');
      $('.credit-drp').addClass('hide');
      $('.saved-drp').addClass('hide');
      $('#future').attr('checked',false);
    } 
    else if($(this).val() == 'cc')
    {
      $('.credit-drp').removeClass('hide');
      $('.paypal-drp').addClass('hide');
      $('.saved-drp').addClass('hide');
      $('#futurepal').attr('checked',false);
    } 
    else
    {
      $('.paypal-drp').addClass('hide');
      $('.credit-drp').addClass('hide');
      $('.saved-drp').removeClass('hide');
       $('#future').attr('checked',false);
       $('#futurepal').attr('checked',false);
    }  
  });
  
  braintree.setup('{$clientToken}', "paypal", {
    container: "paypal-button",
    paymentMethodNonceInputField : "paymentMethodNonceInputField",
    onSuccess : function(){

       $('.credit-drp').remove();
       $('form[name="membership_pay"]').submit();
        
     },
     onCancelled: function(){
      $('#paypal-buttons').addClass('hide');
     },
     singleUse : false
  });
  

});
$(function() {
     $("select[name='plan']").attr('disabled',true);
     $("select[name='membership']").change(function()
     {
        $("select[name='plan'] option").hide();
        $("select[name='plan'] .roles_"+$(this).val()).show();
        $("select[name='plan'] .roles_"+$(this).val()+":first").attr('selected',true);
        $(".amnt").html($('select[name="plan"] option[selected="selected"]').attr('amount'));
        $("select[name='plan']").attr('disabled',false);

     });
     $("select[name='plan']").change(function()
     {
         $(".amnt").html($('select[name="plan"] option[selected="selected"]').attr('amount'));
     });
});
</script>