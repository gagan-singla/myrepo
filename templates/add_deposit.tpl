{include file="/common/header-1.tpl" nocache}
<style>
    .padding_200 {
        padding: 7px 2px;
    }
</style>
<div class="col-md-12 mjusd1" style="color:#000;">Deposit</div>
{if $error}
<div class="alert alert-danger">{$error}</div>{/if}
<div class="col-md-12">
    <div class="col-md-1"></div>
    <form action="/adwords/pay" id="paypal-form" name="paypal-form" method="post" data-parsley-validate enctype="multipart/form-data">
        <div class="col-offset-6 centered">
        <input type="hidden" name="paymentMethodNonceInputField" id='paymentMethodNonceInputField' />

            <div class="col-md-12" style="margin-top:20px">
            <div class="col-md-2"></div>
                <div class="col-md-2 padle" style="padding-right:0;margin-top: 7px;">
                    <span class="padee5">Amount </span></div>
                <div class="col-md-4 padle">
                    <input type="text" class="form-control" name="amount" required>
                    </div>

            </div>



        <div class="col-md-12" style="margin-top:20px">
        <div class="col-md-2"></div>
            <div class="col-md-2 padle" style="padding-right:0;margin-top: 7px;">
                <span class="padee5">Select Payment Method  </span></div>
            <div class="col-md-4 padle">
                <select name="paymentmethod" id="paymentmethod"  class="form-control" required>
                    <option value="">Please Select</option>

                    {foreach $creditCards as $key=>$val}

                    <option value="{$val.id}">{$val.card_type} {$val.encrypt_card}</option>

                    {/foreach}

                    <option value="paypal">Add New Paypal</option>
                    <option value="cc">Add New Creditcard</option>
                </select></div>

        </div>
        <div class="col-md-offset-3 col-md-6  hide credit-drp">
        <div class="card_details">  
            <div class="col-sm-3 padding-20"> Card Name </div>
            <div class="col-sm-6 padding-20">
              <input type="text" data-braintree-name="cardholder_name" class="form-control col-md-4" value="" placeholder="Card holder name" data-parsley-required="true" data-parsley-error-message="Enter card holder name"/>
            </div>
            <div class="clear"></div>
            <div class="col-sm-3 padding-20"> Card Number </div>
            <div class="col-sm-6 padding-20">
              <div id="card-number" class="form-control col-md-3"></div>
            </div>
             <div class="clear"></div>
             <div class="col-sm-3 padding-20"> CVV </div>
            <div class="col-sm-6 padding-20">
              <div id="security-code-field" class="form-control col-md-3"></div>
            </div>
             <div class="clear"></div>
             <div class="col-sm-3 padding-20"> Expiry Date </div>
            <div class="col-sm-6 padding-20">
              <div id="expiration-date" class="form-control col-md-3"></div>
            </div>
            <input type='hidden' name='payment_method_nonce' id="nounce"/>
              <span>
              <div class="clear"></div>
              <div class="col-sm-12 padding-20">
              <span><input type="checkbox" id="futurepal" name="savecard" value="1"> Save for future payment</span>
              </div>
             
        </div>
            <!--<div class="col-md-12 padding_200">
                <input type="checkbox" id="future" name="savecard" value="1">
                <label for="future">Save for future payment</label>
            </div>-->
            <!--<div class="col-md-12 padding_200">
                <div type="submit" class="btn btn-success" value="Submit" id="cardprocessone" onclick="cardSubmit()">Pay via Card </div>
                <input type="submit" class="submit-card hide" />
            </div>-->
        </div>

        <div class="col-md-12 hide paypal-drp">
            <div class="col-xs-12 col-sm-6 col-md-6 pull-right">
                <div id="paypal-button" class="paypal-button pull-left"></div>
                <div id="paypal-buttons" class="paypal-buttons hide" onclick="cardSubmit();"><img src="{$config.url}/images/paypal.png" alt="Pay with PayPal" style="display:inline-table !important;cursor:pointer;"> </div>

            </div>

        </div>


        <div class="col-md-12 text-center" style="margin-top: 13px;">
            <button type="submit" class="btn btn-danger">Pay</button>
        </div>
    </div>
    </form>

</div>

{include file="/common/footer-1.tpl" nocache}

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
            if(true === $('form[name="paypal-form"]').parsley().validate())
            {

                $('.submit-card').click();

            }
        }


    }
   /* braintree.setup("{$clientToken}", "custom", {
        id: "paypal-form"
    });*/
        braintree.setup('{$clientToken}', "paypal", {
            container: "paypal-button",
            paymentMethodNonceInputField : "paymentMethodNonceInputField",
            onSuccess : function(){

                $('.credit-drp').remove();
                $('form[name="paypal-form"]').submit();

            },
            onCancelled: function(){
                $('#paypal-buttons').addClass('hide');
            },
            singleUse : false
        });
    braintree.setup("{$clientToken}", "custom", {
                id: "paypal-form",
                hostedFields: {
                  number: {
                    selector: "#card-number",
                    placeholder: 'Card Number'
                  },
                  cvv: {
                   selector: "#security-code-field",
                   placeholder: 'CVV'
                  },
                  expirationDate: {
                    selector: "#expiration-date",
                    placeholder: 'MM/YYYY'
                  }
                },
                onPaymentMethodReceived: launchValidation,
                onError: list_error
            });
  function launchValidation(obj){
   
    if(obj.nonce){
      if(true === $('#paypal-form').parsley().validate())
        {
            $('#nounce').val( obj.nonce );
            $('#paypal-form').submit();
        }
        else{
          alert('Something Went wrong ! Please try agin later');
        }

    }
    else{
       alert('Something Went wrong ! Please try agin later');
    }
  }
  function list_error(obj){
    alert(obj.message);
  }
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

     

    });

</script>