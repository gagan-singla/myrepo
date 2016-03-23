{include file="/common/header-1.tpl" nocache}
<style>
.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td{
      border-top: none;
}

</style>
{literal}

<script type="text/javascript">

$(document).ready(function(){
    
    var addemids = $("input.bemail:checked").map(function(){
        return this.value;
    }).toArray();

    var addsmids = $("input.bsms:checked").map(function(){
        return this.value;
    }).toArray();
    $('#email_settings').val(addemids);
    $('#sms_settings').val(addsmids);

  $(".settings").click(function(){
    
    var addemids = $("input.bemail:checked").map(function(){
        return this.value;
    }).toArray();
    
    $('#email_settings').val(addemids);

    var addsmids = $("input.bsms:checked").map(function(){
        return this.value;
    }).toArray();
    
     $('#sms_settings').val(addsmids);

                       
  })
  $("#verifybtn").click(function(){
   
    var ph_no = $('#phno').val();
    ph_no = ph_no.replace('+','');
    var request = $.ajax({
      url: "/verifyno?p="+ph_no,
      type: "GET",
    });
    request.done(function(msg) {
      $(".verification").html(msg);
      if(msg == 'Phone number is already verified.'){ $(".textdesc").html(''); }
      $("#verifyinfo").modal('show');

    });
    
  });
  $('#notified').click(function(){
    alert("Your Settings Are Saved");
    return true;

  });
  
});
</script>
{/literal}

<div class="container">

<div class="col-md-12">
<div class="col-sm-3 col-xs-12 txtfun3 padlef0 mobile_view">
<div class="daashbrd_cngpswd" style="padding-top:10px;"><a href="/dashboard/my" class="clrr">Dashboard</a> &gt;&gt; Notification</div>

 {include file="left-profile-nav.tpl" nocache} </div>

<div class="col-md-9 ionoti3">

{if $verified neq 1}
<div class="col-md-12 ionoti1">
<div class="col-md-3 ionoti7">SMS Notification</div>
<div class="col-md-5"><input type="text" class="form-control" id="phno" {if $user_phones} value="{$user_phones}" {/if}  placeholder="Phone no"></div>
<div class="col-md-2"><button id="verifybtn" type="button" class="btn btn-default">Verify</button></div>
</div>
{/if}

<div class="col-md-12 ionoti2">The marketplace sends email based on a wide variety of events that may occur as seen below. Some notifications such as Payment information will be sent regardless of your email preference setting.</div>

<!-- <div class="col-md-12 ionoti2">
  <div>Show specific user type</div>
  <div>
  <label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked="checked"> All Type
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> Buyer
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> Seller
</label>
</div>
  </div> -->

<div class="col-md-12 table-responsive iome6 ionoti5 buyer">

<table class="table stab">
    <thead>
      <tr class="ionoti4" >
        <th class="iome9 ionoti9">Notification to Buyer:</th>
        <th class="text-center iome9 ionoti0">email</th>
        <th  class="text-center iome9 ionoti0">SMS</th>
        <th  class="text-center iome9">&nbsp;</th>
        <th  class="text-center iome9">&nbsp;</th>
        <th  class="text-center iome9">&nbsp;</th>
       
      </tr>
    </thead>
    <tbody>
    {$fieldcount = 0}
    {foreach $buyer_titles as $key => $val}   
    {$fieldcount = 1}
      <tr>
        
        <td class="iome7 ionoti9"> {$val.notifications}   </td>
        <td class="iome7 ionoti0" align="center">
          <input class="bemail settings"  value="{$val.id}" type="checkbox" 
          <input class="bsms settings" value="{$val.id}" type="checkbox"
            {foreach $email_items as $keys => $valids}
              {if $val.id == $valids}
                checked=true
              {/if}
            {/foreach} >
        </td>
        <td class="iome7 ionoti0" value="{$val.id}" align="center">
          <input class="bsms settings" value="{$val.id}" type="checkbox"
            {foreach $sms_items as $keys => $valids}
              {if $val.id == $valids}
                checked=true
              {/if}
              {if $verified neq 1}
              disabled
              {/if}
            {/foreach} >
        </td>
        <td class="iome7" align="center">&nbsp;</td>
        <td class="iome7" align="center">&nbsp;</td>
        <td class="iome7" align="center">&nbsp;</td>
        
      </tr>
      {/foreach}
            {if $fieldcount ==0}
      <tr>
           <td colspan="5">
             No Notification Titles !!!
           </td>
      </tr>
      {/if}
        
    </tbody>
  </table></div>
  
  
  <div class="col-md-12 table-responsive iome6 ionoti5">
<table class="table stab">
    <thead>
      <tr class="ionoti4" >
        <th class="iome9 ionoti9" >Notification to Seller:</th>
        <th class="text-center iome9 ionoti0">email</th>
        <th  class="text-center iome9 ionoti0">SMS</th>
        <th  class="text-center iome9">&nbsp;</th>
        <th  class="text-center iome9">&nbsp;</th>
        <th  class="text-center iome9">&nbsp;</th>
       
      </tr>
    </thead>
    <tbody>
    {$fieldcount = 0}
    {foreach $seller_titles as $key => $val} 
    {$fieldcount = 1}
      <tr>
      
        <td class="iome7 ionoti9"> {$val.notifications}   </td>
        <td class="iome7 ionoti0" align="center">
          <input class="bemail settings"  value="{$val.id}" type="checkbox"  
          {foreach $email_items as $keys => $valids}
            {if $val.id == $valids}
              checked=true
            {/if}
          {/foreach} >
        </td>
        <td class="iome7 ionoti0" align="center">
          <input class="bsms settings"  value="{$val.id}" type="checkbox" 
            {foreach $sms_items as $keys => $valids}
            {if $val.id == $valids}
              checked=true
            {/if}
             {if $verified neq 1}
              disabled
              {/if}
          {/foreach} >
        </td>
        <td class="iome7" align="center">&nbsp;</td>
        <td class="iome7" align="center">&nbsp;</td>
        <td class="iome7" align="center">&nbsp;</td>
        
      </tr>
      {/foreach}
            {if $fieldcount ==0}
      <tr>
           <td colspan="5">
             No Notification Titles !!!
           </td>
      </tr>
      {/if}
        
    </tbody>
  </table></div>
  
  <div class="col-md-12 ionoti6">
  <form action="{$config.url}/dashboard/save_notification" method="post">
    <input type="hidden" name="notify_id" id="notify_id" value="{$notify_id}">

    <input type="hidden" name="email_settings" id="email_settings">
    <input type="hidden" name="sms_settings" id="sms_settings">

    <button type="submit" id="notified" class="btn btn-danger">Save</button>
    <button type="button" class="btn btn-default">Cancel</button>
</form>
  
  
  
  </div>
  
  

</div>

</div>


</div>
{$disable_zip_popup = 1}
{include file="/common/footer-1.tpl" nocache} 

