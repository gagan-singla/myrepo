{include file="/common/header-1.tpl" nocache}
<style type="text/css">
.dvPreview img{
  margin:10px;
}
.category ul{
  display:none;
}
</style>
<div class="row shipwrap ">
<div class="daashbrd_cngpswd"><a href="/dashboard/my">Dashboard</a> &gt;&gt; Profile</div>
<div class="col-md-3 txtfun3 padlef0 mobile_view shippad ">
{include file="left-profile-nav.tpl" nocache}
</div>
<div class="col-md-9 ship_tinf mobile_view shippad">
 <div class="panel panel-default">
 {if $shipping.first_name != ''}  

  <div class="panel-heading"><h5>Saved Shipping Address</h5></div>
  <div class="panel-body">
  <div class="ship_ltxt">Select from Shipping addresses below or enter a new shipping address for your order</div>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12">
     
      <div class="buyer_name">{$shipping.first_name} {$shipping.last_name}</div>
      <div>{$shipping.phone}</div>
      <address>
        {$shipping.address},{$shipping.city}<br>
        {$shipping.state}, {$shipping.country} <br>
        {$shipping.zipcode}
      </address>
      <div>Email:{$shipping.email}</div>
    </div>
    </div>
    </div>
  {/if}
  <div class="panel-heading">
  <h5> {if $shipping.first_name != ''} Edit Shipping Address {else} Add New Shipping Address {/if}</h5>
  </div>
  <div class="panel-body">
  <form name="" action="{$config.url}/profile_settings/shipping" data-parsley-validate method="post" id="paypal-form">
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
      <input type="text" class="form-control" name="f_name" placeholder="First Name*" value="{$shipping.first_name}" data-parsley-required>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-6">
      <input type="text" class="form-control" name="l_name" placeholder="Last Name*" value="{$shipping.last_name}" data-parsley-required> 
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
    <input type="email" class="form-control" name="email" placeholder="Email*" value="{$shipping.email}" data-parsley-required> 
    </div>
   <div class="col-xs-12 col-sm-6 col-md-6">
      <input type="text" class="form-control numberonly" name="phone" placeholder="Cell Phone*" value="{$shipping.phone}" data-parsley-required data-parsley-minlength="10" data-parsley-error-message="please enter valid phone number"  maxlength="12" > 
    </div>
  </div>

  <div class="row">


      <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
          <select class="form-control" name="country" id="country" data-parsley-required-message="Please select country"  required>
              <option value="">Please select country </option>
             <!-- {foreach $country as $key => $val}
              <option value="{$val.location_eng}" {if $val.location_eng == $shipping.country selected} {/if}>{$val.location_eng}</option>
              {/foreach}-->
          </select>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6">

          <div id="divstate">
              <select class="form-control" name="state" id="state" required data-parsley-required-message="Please select state"  >
                  <option value=""></option>
              </select>
          </div>
      </div>
  </div>

  <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
          <input class="form-control" placeholder="city" name="city" value="{$shipping.city}"  data-parsley-required>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
          <input type="text" class="form-control" name="address" data-parsley-required placeholder="Address*" value="{$shipping.address}">
      </div>
  </div>

  <div class="row">
    

    <div class="col-xs-12 col-sm-6 col-md-6">

      <input type="text" class="form-control" name="zipcode" data-parsley-required placeholder="Zip Code*" value="{$shipping.zipcode}" data-parsley-minlength="5" data-parsley-error-message="please enter valid zipcode" id="zipcode"  maxlength="8">
    </div>
    </div>
  <div class="row">
 <!-- <div class="col-xs-12 col-sm-6 col-md-6">

     
      <input type="hidden" name="state" id="state" value="{$shipping.state}" />
                 <div>
         <input type="hidden" name="country" id="country" value="{$shipping.country}" />
                 <input type="hidden" name="city" id="city" value="{$shipping.city}" />
                </div>
                 <div class="form-group addresscity" >
                  {if $shipping.first_name != ''} {$shipping.city},{$shipping.state},{$shipping.country} {/if}
                 </div> 
    </div>-->
    <div class="col-xs-12 col-sm-6 col-md-4">
      <!--<div class="btn btn-danger ship_save" onclick="checkStateCity('paypal-form',1)">-->
        <input type="submit" class="btn btn-danger ship_save" value="Save Shipping Address" >

      </div>
    </div>
      <input type="hidden" name="hidden_country" id="hidden_country" value="{$shipping.country}">
      <input type="hidden" name="hidden_state" id="hidden_state" value="{$shipping.state}">
    </form>
  </div>
</div>
</div>
</div>
</div>
{$disable_zip_popup = 1}
{include file="/common/footer-1.tpl" nocache} 
<script type="text/javascript">
$(function()
{
    $('#country').on('change',function()
    {
        loadState();
    });

    var ctry = '{$shipping.country}';

    if(ctry !='')
    {
        $('#country').val(ctry);

        loadState();

    }
    //loadLocation('state',$('#states option[value="{$users.state}"]').val(),'{$users.city}');
  
  });</script>