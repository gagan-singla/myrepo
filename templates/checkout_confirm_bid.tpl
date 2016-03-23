{include file="/common/header-1.tpl" nocache}
<link rel="stylesheet" type="text/css" href="{$config['externalcss']}ds-forms.css"/>
<script src="https://js.braintreegateway.com/v2/braintree.js"></script>
<script type="text/javascript">
  braintree.setup("{$clientTokens}", "custom", {
                id: "checkoutcc",
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
                onPaymentMethodReceived: launchValidation
            });
  function launchValidation(obj){
   
    if(obj.nonce){
      if(true === $('#paypal-form').parsley().validate())
        {
            $('#nounce').val( obj.nonce );
            $('#checkoutcc').submit();
        }
        else{
          alert('Something Went wrong ! Please try agin later');
        }

    }
    else{
       alert('Something Went wrong ! Please try agin later');
    }
  }
</script>
<style>
    .main_wrapper {
        margin: 20px auto 0px;
        min-height: 540px;
    }

    .ship_overlay1 {
        height: auto;
    }
</style>
<div class="row block1" style="  clear: both;  padding-bottom: 40px;">

    <!--<form id="localpick-form" method="post" action="{$config.url}/product/bidpaymentnoshiping/{$id}/" data-parsley-validate>
        <div class="col-md-12">
            <input type="hidden" name="total_amount" value='{$pro_price}' />

            <div id="noshipingsss" style="display:none;">
                <div class=" col-xs-12 col-sm-6 col-md-6">
                    <label class="option srch_olbl">

                        <span class="checkbox"></span> <span class="span_lbl">Please provide Buyer Details</span>
                    </label>
                    <div class="ship_overlay1">
                        <div class=" {if $shipping.first_name == ''} hide{/if}" style="background-color: transparent;"></div>
                        <div class="row">
                            <div class="col-md-6 mtop_20">
                                <div class="form-group">

                                    <input type="text" class="form-control" name="f_name" placeholder="First Name*" value="{$shipping.first_name}" def="{$shipping.first_name}" data-parsley-required tabindex="1" >
                                </div>
                            </div>
                            <div class="col-md-6 mtop_20">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="l_name" placeholder="Last Name*" value="{$shipping.last_name}" def="{$shipping.last_name}" data-parsley-required tabindex="2">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mtop_20">
                                <div class="form-group">
                                    <input type="email" class="form-control" name="email" placeholder="E-Mail*" value="{$shipping.email}" data-parsley-required def="{$shipping.email}" tabindex="3">
                                </div>
                            </div>
                            <div class="col-md-6 mtop_20">
                                <div class="form-group">
                                    <input type="text" class="form-control numberonly" name="phone" placeholder="Cell Phone*" value="{$shipping.phone}" data-parsley-minlength="10" data-parsley-required data-parsley-error-message="please enter valid phone number"  maxlength="12" def="{$shipping.phone}" tabindex="4">
                                </div></div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mtop_20">
                                <div class="form-group">
                                    <select class="form-control" name="country" id="country1" data-parsley-required-message="Please select country"  >
                                        <option value="">Please select country</option>

                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mtop_20">
                                <div class="form-group">
                                    <div id="divstate1">
                                        <select class="form-control" name="state" id="state1" data-parsley-required-message="Please select state">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <input type="hidden" name="hidden_country" id="hidden_country1" value="{$shipping_address.country}">
                        <input type="hidden" name="hidden_state" id="hidden_state1" value="{$shipping_address.state}">

                        <div class="row">

                            <div class="col-md-6 mtop_20">
                                <div class="form-group">
                                    <input class="form-control" placeholder="city" name="city" value="{$shipping.city}" def="{$shipping.city}"  data-parsley-required>
                                </div>
                            </div>

                            <div class="col-md-6 mtop_20">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="address" placeholder="Address*" value="{$shipping.address}" data-parsley-required def="{$shipping.address}" tabindex="5">
                                </div>
                            </div>


                        </div>
                        <div class="row">
                            <div class="col-md-6 mtop_20">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="zipcode" id="zipcode" placeholder="Zip Code*" value="{$shipping.zipcode}" data-parsley-required  data-parsley-error-message="please enter valid zipcode" onblur="checkStateCity('localpick-form',0)"  maxlength="8" def="{$shipping.zipcode}" tabindex="6">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-7 mtop_20">
                                &lt;!&ndash;<div>
                                    <input type="hidden" name="state" id="state" value="{$shipping.state}" />
                                    <input type="hidden" name="country" id="country" value="{$shipping.country}" />
                                    <input type="hidden" name="city" id="city" value="{$shipping.city}" />
                                </div>&ndash;&gt;

                                <div class="form-group addresscity">

                                </div>
                                &lt;!&ndash;<div class="project_title tmtpd" id="withoutshiping" style="display:block;">Total Amount to Be Paid -<span>US $ {$price}</span><span></span><span class="rtri"></span></div>&ndash;&gt;

                                <input type="hidden" name="price"  value='{$pro_detail.amount}' />

                            </div><div class="col-md-5 mtop_20">
                            <input type="submit" value="Update Information" class="btn btn-success form-control" style="margin-top: 17px;">
                        </div></div>
                    </div>
                </div>
            </div>
        </div>
    </form>-->

    <form name="" action="{$config.url}/product/bidpayment/{$buynowid}/" method="post" id="paypal-form" data-parsley-validate>
        <input type="hidden" name="buynowid" value="{$buynowid}" />
        <input type="hidden" name="pay_amount" id="pay_amount" value="{$price}">
        <div class="ds col-md-12">
            <div class="dash_brd" style="padding-left: 0;"><a href="/dashboard/mybids" style="color:#000">Dashboard</a> &gt;&gt; Buynow</div>

            <div class="checkt_wrapper">
                <div class="nship_chead1 delvt">Delivery Address</div>
                <!--<div class="text-danger">{$error}</div>-->
                <!--div class="featured_list">Total Amount to Be Paid - <span>US ${$price}</span></div-->
                <div></div>
                <div class="row chbor">
                    <div class="col-sm-4 ds">
                        {if $shipping.first_name != ''}
                        <label class="option srch_olbl">
                            <input type="checkbox"  name="delivery_address_shipping" checked onclick="shipping_add(1)" />
                            <span class="checkbox"></span> <span class="span_lbl">Saved Shipping Address  </span>
                        </label>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-12 delivery_add">
                                        <div class="buyer_name bynn">{$shipping.first_name} {$shipping.last_name}</div>
                                        <div>{$shipping.phone}</div>
                                        <address>
                                            {$shipping.address},{$shipping.city}<br>
                                            {$shipping.state}, {$shipping.country}, {$shipping.zipcode} <br/>
                                            <div><strong>Email :</strong> {$shipping.email}</div>
                                        </address>

                                    </div>

                                </div>
                            </div>

                        </div>
                        {else}
                        <div class="text-center" style="margin-top: 13px;"> No shipping address added </div>
                        {/if}
                        
                    </div>
                    <div class="col-sm-2  or_line">
                        <div class="orad">OR</div>
                    </div>
                    <div class="ds col-sm-6">
                        <label class="option srch_olbl">
                            <input type="checkbox"  name="delivery_address" onclick="shipping_add(0);" {if $shipping.first_name == ''} checked {/if}  />
                            <span class="checkbox"></span> <span class="span_lbl">Add New Shipping Address</span>
                        </label>
                        <div class="ship_overlay1">
                            <div class="ship_overlay {if $shipping.first_name == ''} hide{/if}" style="background-color: transparent;"></div>
                            <div class="row">
                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <input type="hidden" name="paymentMethodNonceInputField" id='paymentMethodNonceInputField' />
                                        <input type="text" class="form-control" id="f_name" name="f_name" placeholder="First Name*" value="{$shipping.first_name}" def="{$shipping.first_name}" data-parsley-required tabindex="1" >
                                    </div>
                                </div>
                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="l_name" name="l_name" placeholder="Last Name*" value="{$shipping.last_name}" def="{$shipping.last_name}" data-parsley-required tabindex="2">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <input type="email" class="form-control" id="email" name="email" placeholder="E-Mail*" value="{$shipping.email}" data-parsley-required def="{$shipping.email}" tabindex="3">
                                    </div>
                                </div>
                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <input type="text" class="form-control numberonly" id="phone" name="phone" placeholder="Cell Phone*" value="{$shipping.phone}" data-parsley-minlength="10" data-parsley-required data-parsley-error-message="please enter valid phone number"  maxlength="12" def="{$shipping.phone}" tabindex="4">
                                    </div></div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <select class="form-control" name="country"  id="country" data-parsley-required-message="Please select country"  required>
                                            <option value="">Please select country</option>
                                            <!-- {foreach $country as $key => $val}
                                             <option value="{$val.location_eng}" {if $val.location_eng == $shipping.country selected} {/if}>{$val.location_eng}</option>
                                             {/foreach}-->
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <div id="divstate">
                                            <select class="form-control" name="state" id="state" data-parsley-required-message="Please select state"  >


                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <input class="form-control" placeholder="city"  id="city" name="city" value="{$shipping.city}" def="{$shipping.city}"  data-parsley-required>
                                    </div>
                                </div>
                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <input type="text" class="form-control"  id="address" name="address" placeholder="Address*" value="{$shipping.address}" data-parsley-required def="{$shipping.address}" tabindex="5">
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" name="hidden_country" id="hidden_country" value="{$shipping.country}">
                            <input type="hidden" name="hidden_state" id="hidden_state" value="{$shipping.state}">

                            <div class="row">

                                <div class="col-md-6 mtop_20">
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="zipcode" id="zipcode" placeholder="Zip Code*" value="{$shipping.zipcode}" data-parsley-required  data-parsley-error-message="please enter valid zipcode"   maxlength="8" def="{$shipping.zipcode}" tabindex="6">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mtop_20">
                                    <!-- <div>
                                     <input type="hidden" name="state" id="state" value="{$user.state}" />
                                                <input type="hidden" name="country" id="country" value="{$user.country}" />
                                                <input type="hidden" name="city" id="city" value="{$user.city}" />
                                     </div>  -->
                                    <div class="form-group addresscity">

                                    </div>

                                </div></div>
                        </div>
                    </div>
                </div></div></div>

        <div class="text-danger">{$error}</div>
        <div class="row cmargin-row ">
            <div class="col-md-6 pull-left">
                <div class="project_title tmtpd">Total Amount to Be Paid - <span>US ${($price)}</span><span></span><span class="rtri"></span></div>
                
            </div>
            <div class="col-md-6">
                {if $failedpament == '0'}<div style="margin: 20px; color:#F00;">Error Occured with Payment. Please Contact Admin </div>{/if}
                {if $failedpament == '1'}
                    {if $pp eq 1}
                    <div style="margin: 20px;"><button type="button" class="btn btn-danger" onclick="paywithpaypal()">Pay with PayPal</button></div>
                    {/if}    
                {/if}
                {if $paywcard eq 1}
                    {if $bt eq 1}
                    <div style="margin: 20px;"><button type="button" class="btn btn-danger" onclick="paywithcard()">Pay with Braintree</button></div>
                     {/if}   
                 {/if}
                 {if $at eq 1}
                 <div style="margin: 20px;"><button type="button" class="btn btn-danger" onclick="paywithauth()">Pay with Authorize</button></div>
                {/if}
                 {if $st eq 1}
                  <div style="margin: 20px;"><button type="button" class="btn btn-danger" onclick="paywithstripe()">Pay with Stripe</button></div>
                  {/if}

            </div>

        </div>

   

       <!-- <div class="col-md-12">
            <div class="col-md-6"><b>Select Payment Method</b></div>
            <div class="col-md-6">
                <select name="paymentmethod" id="paymentmethod" required>
                    <option value="">Please Select</option>
                    {foreach $creditCards as $key=>$val}
                    <option value="{$val.id}">{$val.card_type} {$val.encrypt_card}</option>
                    {/foreach}
                    <option value="paypal">Add New Paypal</option>
                    <option value="cc">Add New Creditcard</option>
                </select>

            </div>
        </div>
        <div class="col-md-12 hide saved-drp chpad">
            <div type="submit" class="btn btn-success" value="Submit" id="cardprocessone"  onclick="cardSubmit()">Pay </div>
        </div>
        <div class="col-md-12  hide credit-drp">
            <div class="col-sm-3 padding-20">
                Card Holder Name
            </div>
            <div class="col-sm-6 padding-20">
                <input type="text" name="cardholder_name" data-braintree-name="cardholder_name" class="form-control col-md-4" value="" placeholder="Card holder name" data-parsley-required="true" data-parsley-error-message="Enter card holder name"/>
            </div>
            <div class="clear"></div>
            <div class="col-sm-3  padding-20">
                Credit Card Number
            </div>
            <div class="col-sm-6 padding-20">
                <input type="text" name="number" data-braintree-name="number" class="form-control" value="" placeholder="Credit card number" data-parsley-required="true" data-parsley-error-message="Enter credit card number"/>
            </div>
            <div class="clear"></div>
            <div class="col-sm-3  padding-20">
                Expiry Date
            </div>
            <div class="col-sm-2 padding-20">
                <input type="text" name="expiration_month" data-braintree-name="expiration_month" class="form-control col-md-3" value="" placeholder="mm" data-parsley-required="true" data-parsley-error-message="Enter month"/>
            </div>
            <div class="col-sm-2 padding-20">
                <input type="text" name="expiration_year" data-braintree-name="expiration_year" class="form-control col-md-3 " value="" placeholder="yyyy" data-parsley-required="true" data-parsley-error-message="Enter year"/>
            </div>
            <div class="clear"></div>
            <div class="col-sm-3  padding-20">
                CVV
            </div>
            <div class="col-sm-2 padding-20">
                <input type="text" name="cvv" data-braintree-name="cvv" class="form-control col-md-3" value="" placeholder="3 or 4 digit number" data-parsley-required="true" data-parsley-error-message="Enter CVV no"/>

            </div>
            <div class="clear"></div>
            <div class="col-md-6 padding-20">
                <button type="button" class="btn btn-success" value="Submit"  id="cardprocesstwo"  onclick="cardSubmit()">Pay via Card  </button>
                <span style="margin-left:10px;"><input type="checkbox" id="future" name="savecard" value="1"> Save for future payment</span>
                <input type="submit" class="submit-card hide" />
            </div>
        </div>
        <div class="col-md-12 hide paypal-drp">
            <div class="col-xs-12 col-sm-6 col-md-6">
                <div id="paypal-buttons" class="paypal-buttons hide"><img src="{$config.url}/images/paypal.png" alt="Pay with PayPal" style="display:inline-table !important;cursor:pointer;"></div>
                <div id="paypal-button" class="paypal-button"></div>
                <span><input type="checkbox" id="futurepal" name="savepaypal" value="1"> Save for future payment</span>
            </div>
        </div>-->

</div>
</div>
<!--<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#boxx" data-whatever="@mdo">Pay with PayPal</button>-->
</form>



<form id="vpcheckout" method='POST' action='https://voguepay.com/pay/'>

      <input type='hidden' name='v_merchant_id' value="{$vp_id}" />
      <input type='hidden' name='merchant_ref' value='234-567-890' />
      <input type='hidden' name='memo' value='Order from AuctionSoftware.com' />

        <input type='hidden' name='notify_url' value='http://www.mydomain.com/notification.php' />
        <input type='hidden' name='success_url' value='{$config.url}/product/checkout/voguebid/{$buynowid}' />
        <input type='hidden' name='fail_url' value='{$config.url}/product/payment/{$buynowid}' />

      <input type='hidden' name='developer_code' value='pq7778ehh9YbZ' />
      <input type='hidden' name='store_id' value='25' />

      
      <input type='hidden' name='cur' value='USD' />

      <input type='hidden' name='total' value="{$pro_price}" />
      {if $vp eq 1}
      <div class="col-md-6 pull-right" style="padding-left:50px;">

      <input type='image' src='http://voguepay.com/images/buttons/buynow_blue.png' alt='Submit' 
      onclick="submitwithvp(event)"/>
        </div>
     {/if}

    </form>

    <form method="post" id="authorize_form" action="{$config.url}/product/checkout/authorizebid/{$buynowid}">
    <div class="container" style="padding-left: 0;">
        <div class="col-md-12 hide auth-drp" style="padding-left: 0;">
        
          <div class="col-sm-3 padding-20" style="padding-left: 0;">
            Card Holder Name
          </div>
          <div class="col-sm-6 padding-20">
            <input type="text" name="cardholder_name" class="form-control col-md-4" value="" placeholder="Card holder name" data-parsley-required="true" data-parsley-error-message="Enter card holder name" required/>
          </div>
          <div class="clear"></div>
          <div class="col-sm-3  padding-20" style="padding-left: 0;">
            Credit Card Number
          </div>
          <div class="col-sm-6 padding-20">
            <input type="text" name="number" id="card_numbers" class="form-control" value="" placeholder="Credit card number" data-parsley-required="true" data-parsley-error-message="Enter credit card number" required/>
          </div>
          <div class="clear"></div>
          <div class="col-sm-3  padding-20" style="padding-left: 0;">
            Expiry Date
          </div>
          <div class="col-sm-2 padding-20">
            <input type="text" id="expiry_months" name="expiration_month" class="form-control col-md-3" value="" placeholder="mm" data-parsley-required="true" data-parsley-error-message="Enter month" required/>
          </div>
          <div class="col-sm-2 padding-20">
            <input type="text" id="expiry_years" name="expiration_year" class="form-control col-md-3 " value="" placeholder="yyyy" data-parsley-required="true" data-parsley-error-message="Enter year" required/>
          </div>
          <div class="clear"></div>
          <div class="col-sm-3  padding-20" style="padding-left: 0;">
            CVV
          </div>
          <div class="col-sm-2 padding-20">
            <input type="text" id="cvvs" name="cvv" class="form-control col-md-3" value="" placeholder="3 or 4 digit number" data-parsley-required="true" data-parsley-error-message="Enter CVV no" required/>
           
            <input type='hidden' name='total' value="{$pro_price}" />

          </div>
          <div class="clear"></div>
           <div class="col-md-6 padding-20">
            <input type="submit" class="btn btn-success" id="authorize_button" value="Pay via Authorize" />
            <!-- <span style="margin-left:10px;"><input type="checkbox" id="future" name="savecard" value="1"> Save for future payment</span> -->
           <!--  <input type="submit" class="submit-card hide" /> -->
          </div>
        </div></div>
      </form>


      <form method="post" id="stripe_form" action="{$config.url}/product/checkout/stripebid/{$buynowid}">
      <div class="container" style="padding-left: 0;">
        <div class="col-md-12 hide stripe-drp" style="padding-left: 0;">
        
          <div class="col-sm-3 padding-20"  style="padding-left: 0;">
            Card Holder Name
          </div>
          <div class="col-sm-6 padding-20">
            <input type="text" name="cardholder_name" class="form-control col-md-4" value="" placeholder="Card holder name" data-parsley-required="true" data-parsley-error-message="Enter card holder name" required/>
          </div>
          <div class="clear"></div>
          <div class="col-sm-3  padding-20"  style="padding-left: 0;">
            Credit Card Number
          </div>
          <div class="col-sm-6 padding-20">
            <input type="text" name="number" id="card_number" class="form-control" value="" placeholder="Credit card number" data-parsley-required="true" data-parsley-error-message="Enter credit card number" required/>
          </div>
          <div class="clear"></div>
          <div class="col-sm-3  padding-20"  style="padding-left: 0;">
            Expiry Date
          </div>
          <div class="col-sm-2 padding-20">
            <input type="text" id="expiry_month" name="expiration_month" class="form-control col-md-3" value="" placeholder="mm" data-parsley-required="true" data-parsley-error-message="Enter month" required/>
          </div>
          <div class="col-sm-2 padding-20">
            <input type="text" id="expiry_year" name="expiration_year" class="form-control col-md-3 " value="" placeholder="yyyy" data-parsley-required="true" data-parsley-error-message="Enter year" required/>
          </div>
          <div class="clear"></div>
          <div class="col-sm-3  padding-20"  style="padding-left: 0;">
            CVV
          </div>
          <div class="col-sm-2 padding-20">
            <input type="text" id="cvv" name="cvv" class="form-control col-md-3" value="" placeholder="3 or 4 digit number" data-parsley-required="true" data-parsley-error-message="Enter CVV no" required/>
            <input type="hidden" id="stripe_token" name="stripe_token" />
            <input type='hidden' name='total' value="{$pro_price}" />

          </div>
          <div class="clear"></div>
           <div class="col-md-6 padding-20">
                <input type="submit" class="btn btn-success" id="stripe_button" value="Pay via Stripe" />
            <!-- <span style="margin-left:10px;"><input type="checkbox" id="future" name="savecard" value="1"> Save for future payment</span> -->
           <!--  <input type="submit" class="submit-card hide" /> -->
          </div>
        </div></div>
      </form>

</div>
</div>
 
<div class="container">
<div class="col-md-12 hide credit-drp">
        <form id="checkoutcc" action="{$config.url}/product/bidpayment/{$buynowid}" method="post">
           
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
            <input type="hidden" name="paymentmethod" value="cc"> 
            <input id="fname" name="f_name" type="hidden"/>
              <input id="lname" name="l_name" type="hidden"/>
              <input id="emails" name="email" type="hidden"/>
              <input id="phoneno" name="phone" type="hidden"/>
              
              <input id="countries" name="country" type="hidden"/>
              <input id="states" name="state" type="hidden"/>
              
              <input id="cities" name="city" type="hidden"/>
              <input id="addresses" name="address" type="hidden"/>
              <input id="zips" name="zipcode" type="hidden"/>
              
              <input id="hidden_countries" name="hidden_countries" type="hidden"/>
              <input id="hidden_states" name="hidden_states" type="hidden"/>
              <input type='hidden' name='payment_method_nonce' id="nounce"/>
             <!--  <span><input type="checkbox" id="futurepal" name="savepaypal" value="1"> Save for future payment</span> -->
           <div class="col-md-6 padding-20">
           <input type="submit" class="btn btn-success" id="cardprocesstwo" value="Pay with Braintree">
           </div>

        </form>
      </div></div>

<form action="{$paypalurltopay}" target="PPDGFrame" class="standard">
    <input type="submit" id="submitBtn" value="Pay with PayPal" style="display:none;" >
    <input id="type" type="hidden" name="expType" value="light">
    <input id="paykey" type="hidden" name="paykey" value="{$clientToken}">
</form>

<script src="https://www.paypalobjects.com/js/external/dg.js"  type="text/javascript" language="javascript">
</script><script  type="text/javascript" language="javascript">
    $(function()
    {
        var dgFlow = new PAYPAL.apps.DGFlow({ trigger: submitBtn});
    });
</script>
{include file="/common/footer-1.tpl" nocache}

<script>
    function paywithpaypal()
    {

        if(true === $('#paypal-form').parsley().validate())
        {

            var params = $('#paypal-form').serialize();
            $.ajax({
                type:'POST',
                url:'/product/updateshippinginfobid?'+params,
                data:params,
                dataType:'json',
                success: function (data)
                {
                    $('#submitBtn').trigger('click');
                }
            });


        }
    }
    /*function submitwithcard(event){
      
      if(true === $('#paypal-form').parsley().validate())
        {
            $('#checkoutcc').submit();
        }
        else{
          event.preventDefault();
        }

    }*/

    function paywithcard(){
      
        if( $('.credit-drp').hasClass('hide') ){

          $('.credit-drp').removeClass('hide');
           if( $('.stripe-drp').hasClass('hide') || !$('.stripe-drp').hasClass('hide') ){
             $('.stripe-drp').addClass('hide');
          }
          if( $('.auth-drp').hasClass('hide') || !$('.auth-drp').hasClass('hide') ){
             $('.auth-drp').addClass('hide');
          }
        

          }
        else{ $('.credit-drp').addClass('hide'); }

    }

    function paywithstripe(){
      
        if( $('.stripe-drp').hasClass('hide') ){

          $('.stripe-drp').removeClass('hide');
          if( $('.auth-drp').hasClass('hide') || !$('.auth-drp').hasClass('hide') ){
             $('.auth-drp').addClass('hide');
          }
          if( $('.credit-drp').hasClass('hide') || !$('.credit-drp').hasClass('hide')  ){

            $('.credit-drp').addClass('hide');
        

          }

        

        }
        else{ $('.stripe-drp').addClass('hide'); }

    }

    function paywithauth(){

      if( $('.auth-drp').hasClass('hide') ){

          $('.auth-drp').removeClass('hide');
          if( $('.stripe-drp').hasClass('hide') || !$('.stripe-drp').hasClass('hide') ){
             $('.stripe-drp').addClass('hide');
          }
           if( $('.credit-drp').hasClass('hide') || !$('.credit-drp').hasClass('hide')  ){

            $('.credit-drp').addClass('hide');
        

          }
        

        }
        else{ $('.auth-drp').addClass('hide'); }

      
    }

   
    function submitwithvp(event){
     event.preventDefault();
       if(true === $('#paypal-form').parsley().validate())
       {
          $.ajax({
             type:'POST',
             url:'{$config.url}/product/addship_to_sess',
             data : { fnames : $('#fname').val(),
                      lnames : $('#lname').val(),
                      emails : $('#emails').val(),
                      phoneno : $('#phoneno').val(),
                      countries : $('#countries').val(),
                      states : $('#states').val(),
                      cities : $('#cities').val(),
                      addresses : $('#addresses').val(),
                      zips : $('#zips').val(),                      

                        },
             success: function (data)
             {
               
               $('#vpcheckout').submit();
             }
             
          });
         // $('#vpcheckout').submit();
       }
       else{

        event.preventDefault();

       }


    }
 
  /*  function cardSubmit() {
        intializeForm('');
        if (true === $('#paypal-form').parsley().validate()) {
            $('#cardprocesstwo,#cardprocessone').html('processing...');
            /!*intializeForm(function () {
             $('.submit-card').click();
             });*!/
            $('.submit-card').click();
            /!* setTimeout(function () {
             checkStateCity('paypal-form', 2);
             }, 3000);*!/
        }else{

            return false;
        }
    }
    braintree.setup("{$clientToken}", "custom", {
        id: "paypal-form"
    });
    $(function () {
        $('#paymentmethod').on('change', function () {

            if ($(this).val() == 'paypal') {
                $('.paypal-drp').removeClass('hide');
                $('.credit-drp').addClass('hide');
                $('.saved-drp').addClass('hide');
                $('#future').attr('checked', false);
            }
            else if ($(this).val() == 'cc') {
                $('.credit-drp').removeClass('hide');
                $('.paypal-drp').addClass('hide');
                $('.saved-drp').addClass('hide');
                $('#futurepal').attr('checked', false);
            }
            else {
                $('.paypal-drp').addClass('hide');
                $('.credit-drp').addClass('hide');
                $('.saved-drp').removeClass('hide');
                $('#future').attr('checked', false);
                $('#futurepal').attr('checked', false);
            }
        });

        braintree.setup('{$clientToken}', "paypal", {
            container: "paypal-button",
            paymentMethodNonceInputField: "paymentMethodNonceInputField",
            onSuccess: function () {

                $('#overlay').fadeIn(800);
                $('.cart').addClass('waitfewsec');
                if (true === $('#paypal-form').parsley().validate()) {
                    setTimeout(function () {
                       /!* checkStateCity('paypal-form', 1);*!/
                        $('#paypal-form').submit();
                    }, 3000);
                    $('#paypal-buttons').removeClass('hide');
                    $('#paypal-button').addClass('hide');
                }
                else {
                    $('#paypal-buttons').on('click', function () {
                        $('#paypal-form').submit()
                    });
                    $('#paypal-buttons').removeClass('hide');
                    $('#paypal-button').addClass('hide');
                }
            },
            onCancelled: function () {
                $('#paypal-buttons').addClass('hide');
            },
            singleUse: false
        });


    });*/
    function clicked(ob) {
        ob.on('click', function () {
            console.log(52);
        });
    }

    function shipping_add(id) {
        if (id == 1) {
            if ($('input[name="delivery_address_shipping"]').is(":checked")) {
                $('input[name="delivery_address"]').prop('checked', false);
                /*$('input').each(function () {
                 $(this).val($(this).attr('def'));
                 });*/
                $('#country').val('{$shipping.country}');
                loadState();
                /* $('#country').val($('#country').attr('def'));
                 loadLocation('country', $('#country option[value="{$shipping.country}"]').attr('attr'), '{$shipping.state}', '{$shipping.city}');*/

                $('.ship_overlay').removeClass('hide');
            }
            else {
                $('input[name="delivery_address"]').prop('checked', true);
                $('.ship_overlay').addClass('hide');
            }
        }
        if (id == 0) {
            if ($('input[name="delivery_address"]').is(":checked")) {
                $('input[name="delivery_address_shipping"]').prop('checked', false);
                $('.ship_overlay').addClass('hide');
            }
            else {
                $('input[name="delivery_address_shipping"]').prop('checked', true);
                $('input').each(function () {
                    $(this).val($(this).attr('def'));
                });
                /*$('#country').val($('#country').attr('def'));*/
                /*loadLocation('country', $('#country option[value="{$shipping.country}"]').attr('attr'), '{$shipping.state}', '{$shipping.city}');*/
                $('.ship_overlay').removeClass('hide');
            }
        }

    }
    //braintree.setup("CLIENT-TOKEN-FROM-SERVER", "<integration>", options);

</script>
<script type="text/javascript">
    $(function () {

        var ctry = '{$shipping.country}';
        var s = '{$shipping.state}';
        if(ctry !='')
        {
            $('#country').val(ctry);

            loadState();

        }else{
            populateCountries("country", "state");
            populateCountries("country1", "state1");
        }
        /*if({$pro_detail.local_pick} == 0){
            $('#paypal-form').show();
            $('#noshipingsss').hide();

        }else{
            $('#paypal-form').hide();
            $('#noshipingsss').show();
            populateCountries("country1", "state1");
            $('#country1').val(ctry);
            loadState();
        }*/
        //loadLocation('state',$('#states option[value="{$users.state}"]').val(),'{$users.city}');

    });</script>

    <script>
    $(document).ready(function(){
      
    $('#fname').val($('#f_name').val());
    $('#lname').val($('#l_name').val());
    $('#emails').val($('#email').val());
    $('#phoneno').val($('#phone').val());
    $('#countries').val($('#country').val());
    $('#states').val($('#state').val());
    $('#cities').val($('#city').val());   
    $('#addresses').val($('#address').val());   
    $('#zips').val($('#zipcode').val());
    
    $('#hidden_countries').val($('#hidden_country').val());
    $('#hidden_states').val($('#hidden_state').val());
    
    
    
   $('#f_name').change(function() {
      $('#fname').val($(this).val());
  });
    $('#l_name').change(function() {
      $('#lname').val($(this).val());
  });
     $('#email').change(function() {
      $('#emails').val($(this).val());
  });
    $('#phone').change(function() {
      $('#phoneno').val($(this).val());
  });
    $('#country').change(function() {
      $('#countries').val($(this).val());
  });
    $('#state').change(function() {
      $('#states').val($(this).val());
  });
    $('#city').change(function() {
      $('#cities').val($(this).val());
  });
    $('#address').change(function() {
      $('#three').val($(this).val());
  });
    
    $('#zipcode').change(function() {
      $('#zips').val($(this).val());
  });



    
});


  </script>
<script type="text/javascript" src="https://js.stripe.com/v2/"></script>

<script>
  $(document).ready(function(){


    $('#stripe_button').click(function(e){

      e.preventDefault();

      if(true === $('#paypal-form').parsley().validate())
       {
          $.ajax({
             type:'POST',
             url:'{$config.url}/product/addship_to_sess',
             data : { fnames : $('#fname').val(),
                      lnames : $('#lname').val(),
                      emails : $('#emails').val(),
                      phoneno : $('#phoneno').val(),
                      countries : $('#countries').val(),
                      states : $('#states').val(),
                      cities : $('#cities').val(),
                      addresses : $('#addresses').val(),
                      zips : $('#zips').val(),                      

                        },
             success: function (data)
             {
                
               Stripe.setPublishableKey('pk_test_AZYZaOI2NSsPyA9VukQ6M2HP');

                Stripe.card.createToken({
                  number: $('#card_number').val(),
                  cvc: $('#cvv').val(),
                  exp_month: $('#expiry_month').val(),
                  exp_year: $('#expiry_year').val()
                }, stripeResponseHandler);
             }
             
          });
         // $('#vpcheckout').submit();
       }

       else{
          console.log('Somehing Went Wrong');
          
          return false;
       }

      
      

      
      function stripeResponseHandler(status,response) {
      
        
         if (response.error) {
          alert( response.error.message )
          e.preventDefault();
         }
         else {
         
            $('#stripe_token').val( response.id );
            $('#stripe_form').submit();
         }

      }

    });

    $('#authorize_button').click(function(e){ 

      e.preventDefault();

      if(true === $('#paypal-form').parsley().validate())
       {
          $.ajax({
             type:'POST',
             url:'{$config.url}/product/addship_to_sess',
             data : { fnames : $('#fname').val(),
                      lnames : $('#lname').val(),
                      emails : $('#emails').val(),
                      phoneno : $('#phoneno').val(),
                      countries : $('#countries').val(),
                      states : $('#states').val(),
                      cities : $('#cities').val(),
                      addresses : $('#addresses').val(),
                      zips : $('#zips').val(),                      

                        },
             success: function (data)
             {
                $('#authorize_form').submit();
             }
          });
        }
        else{

           console.log('Somehing Went Wrong');
          
          return false;

        }
    });




  });


  
  </script>