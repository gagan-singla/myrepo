<div class="form-group col-sm-3 col-md-3 level_{$level}">
<select multiple class="form-control clracac" style="height:160px;" name="mcid" id="product_category"  onchange="changeSubCategory(this)" level="{$level}" class="" data-parsley-mincheck="1" data-parsley-required="true"   data-parsley-required-message="Please select category" data-parsley-errors-container="#pcat">

{foreach $categories as $key => $val}
      {if $val.parent_id == 0 or $level > 0}       
        
      <option value="{$val.id}" {if $scid == $val.id} selected {/if} >{$val.name}</option>
      
        
       {/if} 
    {/foreach}                   
      
 
</select>

</div>