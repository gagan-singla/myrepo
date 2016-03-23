{include file="common/header-1.tpl" nocache}
<style>
.title .title-name {
      font-size: 16px
  border: 1px solid #000000;
  white-space: nowrap;
  overflow: hidden;
}
.pad0
{
  padding-right: 0px;
  padding-left: 0px;
}
.main_wrapper {
    margin: 20px auto 00px;
    min-height: initial;
}
</style>
<link rel="stylesheet" type="text/css" href="{$config.url}/css/membershiptable.css" />
<div class="main_container">
  <div class="row dashboard membership_select">
   
    <div class="col-lg-12" style="padding-right: 0;padding-left: 0;">
    <div class="col-lg-9" style="padding-right: 0;padding-left: 0;">
      <!--<div class="row"><div class="col-md-12">Total Bid count for this month - {$loged.monthly_bid_limit}</br>
        Total Product allowed to post this month -{$loged.monthly_project_limit}</br>
        Total bids you placed this month -{$loged.bidcountmonth}</br>
        Ttaol product you posted this month - {$loged.productcountmonth}</br>
        Total number of bids for you in this package - {$loged.bid_limit}</br>
        Total number of product for you in this package - {$loged.project_limit}</br>
        Total number of product remains to post - {$loged.project_limit - $loged.productcountyear}</br>
        Total number of bids remains to post - {$loged.bid_limit - $loged.bidcountyear}</br>
        </div></div>-->
         {if $membership_permission}<a href="{$config.url}/membership/membership_details"> View Details </a>{/if}
      <h4 class="ds_brd" style="font-size: 24px;">Setup Your Membership</h4>
      <form name="setautobid" id="setautobid" action="/membership/package" method="post" data-parsley-validate required>
      <div class="col-md-4 padle  m-top-20 font-12" style="font-size: 18px;">Select Your Role : 
      <select name="membership" class="form-control" required data-parsley-required-message="Please select role">

         <option value="">Please select role</option>
        {foreach $membership as $key => $val}
          <option value="{$val.id}">{$val.name}</option> 
        {/foreach}
      </select>  
      </div>
      <div class="col-md-12  m-top-20 font-12 padle" style="font-size: 18px;"><b>Select Your Package : </b></div>
        <div class="col-md-12  m-top-20 font-12 padle" style="padding-right: 0;"> 
        <div class="col-md-12 roles_0 roles hide padle" style="padding-right: 0;">

<section id="pricePlans">
    <ul id="plans">
      <li class="plan">
        <ul class="planContainer"  >
          <li class="title"><h2 class="bestPlanTitle" style="font-size: 20px;">Package Name</h2></li>
           <li class="price"><p class="bestPlanPrice">Total Amount</p></li>
          <li>
            <ul class="options" >
              <li></li>             
              {foreach $package_detail as $key => $val}
              {if $key == 0}
             {$package = $val.plan_id}
          {/if}    
          {if $package == $val.plan_id}
           <li>{$val.name}</li>
          {/if}
              {/foreach}
              <li>Option</li>
            </ul>
          </li>
                  </ul>
      </li>   
      {foreach $plans as $key => $val}
      <li class="plan adc_{$val.id} roles_{$val.membership_id} roles col-md-3 hide pad0" amount="{if $val.amount > 0} $ {$val.amount}{else if $val.amount <= 0} Free {/if}">
        <ul class="planContainer">
          <li class="title"><h2 class="title-name bestPlanTitle" style="font-size:20px;" title="{$val.name}">{$val.name}</h2></li>
          <li class="price"><p >US $ {$val.amount}</p></li>
          <li>
            <ul class="options" style="min-height: 320px;">
              <li style="font-size: 13px;max-width: 150px;"></li>
             {foreach $package_detail as $key2 => $val2}
          
          {if $val.permission_id == $val2.plan_id}<li>
           {if $val2.type == 'radio' and $val2.value == 1} Yes {elseif $val2.type == 'radio' and $val2.value == 0} No {elseif $val2.value >= 0} {$val2.value}{/if}</li> 
          {/if} 
         {/foreach}
         <li></li>
        
            </ul>
          </li>
          <li class="button"></li>
        </ul>
        <div><button  type="button" class="btn padee1" name="plan" value="{$val.id}"  required amount="{if $val.amount > 0} $ {$val.amount}{else if $val.amount <= 0} Free {/if}"><!--<input type="radio" name="plan" value="{$val.id}"  required amount="{if $val.amount > 0} $ {$val.amount}{else if $val.amount <= 0} Free {/if}">-->Select</button></div>
      </li> 
      {/foreach}
    </ul> <!-- End ul#plans -->
  </section>

          <br />
          
           

        </div>
         
          <div value="{$val.id}" class="roles_{$val.membership_id} roles col-md-3 hide" ><br />
          
         
         </div> 

        
        
        
      </div>
 <input type="hidden" name="plan"  />
       <div class="col-md-12  m-top-20 font-12 padle" style="font-size: 24px;">Amount : <span class="amnted">Please select package</span></div>
       <div class="col-md-12 m-top-20 padle">
       <div class="col-md-2 padle">
       <button type="submit" value="Pay" id="btnsubmit" class="btn btn-success padee4" >Pay</button></div></div>
      </form>
      </div>
      <div class="col-lg-3">
       {include file="adwords.tpl" nocache}
      </div></div>

      
  </div>
</div>
{include file="common/footer-1.tpl" nocache} 

<script type="text/javascript">

$(function() {
     
     $("select[name='membership']").change(function()
     {
        $(".roles").addClass('hide');
        $(".roles_0").removeClass('hide');
        $(".roles_"+$(this).val()).removeClass('hide');
        $("select[name='plan']").val('');
        
        

     });
     $("button[name='plan']").on('click',function()
     {
if ($(".plan").hasClass("hoverselect")) {
 $(".plan").removeClass("hoverselect")
   }
   if($(".padee1").hasClass("hoverselbtn"))
   {
    $(".padee1").removeClass("hoverselbtn")
   }
        $(this).addClass("hoverselbtn");

          $(".adc_"+$(this).val()).addClass('hoverselect');      
         $(".membership_select .amnted").html($(this).attr('amount'));
                   $("input[name='plan']").val($(this).val());

         
     });
});

$('#btnsubmit').click(function() {
    if(true === $('#setautobid').parsley().validate()) {
        if( $(".membership_select .amnted").html() == 'Please select package'){
            alert("Please select package");
            return false;
        }
        else{
            return true;
        }
    }

});
</script>