{include file="common/header-1.tpl" nocache}
<div class="main_container">
  <div class="row dashboard membership_select">
    <div class="col-md-3">  </div>
    <div class="col-md-9">
      <h4 class="ds_brd">Setup Your Membership</h4>
      <form name="setautobid" action="/membership/package" method="post" data-parsley-validate required>
      <div class="col-md-12  m-top-20 font-12">Select Your Role : 
      <select name="membership">

         <option value="">Please select role</option>
        {foreach $membership as $key => $val}
          <option value="{$val.id}">{$val.name}</option> 
        {/foreach}
      </select>  
      </div>
      <div class="col-md-12  m-top-20 font-12">Select Your Package : </div>
        <div class="col-md-12  m-top-20 font-12">

        <div class="col-md-3 roles_0 roles hide">
          Package Name:<br />
          {foreach $package_detail as $key => $val}
          {if $key == 0}
             {$package = $val.plan_id}
          {/if}    
          {if $package == $val.plan_id}
           {$val.name}<br/>
          {/if} 

         {/foreach}Total Package Amount
        </div>

            {assign var="count" value="1"}

         {foreach $plans as $key => $val}


          <div value="{$val.id}" class="roles_{$val.membership_id} roles col-md-3 hide" amount="{if $val.amount > 0} $ {$val.amount}{else if $val.amount <= 0} Free {/if}">{$val.name}<br />

              {if $count  == 4 || $count  == 7 || $count  == 10}

         <!--     <div class="col-md-3 roles_0 roles hide">
                  Package Name:<br />
                  {foreach $package_detail as $key1 => $val1}
                  {if $key1 == 0}
                  {$package = $val1.plan_id}
                  {/if}
                  {if $package == $val1.plan_id}
                  {$val1.name}<br/>
                  {/if}

                  {/foreach}Total Package Amount
              </div> -->


              {/if}

          {foreach $package_detail as $key2 => $val2}
          
          {if $val.permission_id == $val2.plan_id}
           {if $val2.type == 'radio' and $val2.value == 1} Yes {elseif $val2.type == 'radio' and $val2.value == 0} No {elseif $val2.value >= 0} {$val2.value} {/if}<br/>
          {/if}

         {/foreach}US $ {$val.amount}
         <div>
             <input type="radio" name="plan" value="{$val.id}"  required amount="{if $val.amount > 0} $ {$val.amount}{else if $val.amount <= 0} Free {/if}">Select
         </div>
         </div>

            {assign var="count" value="`$count+1`"}

        {/foreach}
        
        
      </div>

       <div class="col-md-12  m-top-20 font-12">Amount : <span class="amnted">Please select package</span>
       <div class="col-md-12 m-top-20"><button type="submit" value="Pay" class="btn btn-success">Pay</button></div>
      </form>
      </div>

      
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
     $("input[name='plan']").on('click',function()
     {

         $(".membership_select .amnted").html($(this).attr('amount'));
         
     });
});
</script>