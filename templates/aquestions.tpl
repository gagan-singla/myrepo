{foreach $questions as $key => $val}

<div class="col-md-12">
  <input type="hidden" name="questions_id[{$val.id}]" value="{$val.id}" />
  <div class="form-group">
   <label>{$val.name}</label>
   {if $val.type == 'int' || $val.type== 'float' || $val.type== 'text'}
       <input type="text" name="questions[{$val.id}]"  {if  $val.values == ''}value="{$val.default}"
       {else if $val.values != ''}value="{$val.values}"{/if} {if $val.required == 1} required {/if} class="form-control {if $val.type == 'int'} numberonly{/if} {if $val.type == 'float'} floatpoint{/if}" />
   {/if}
   
   {if $val.type == 'radio'}
     {foreach $val.multiple as $key2 => $default}
       <input type="radio" name="questions[{$val.id}]" {if $val.required == 1} required {/if} value="{$default}" {if ($default == $val.default && $val.values == '') || ($val.values == $default)} checked {/if}  />
	   <label>{$default}</label>
      {/foreach} 
   {/if}
   {if $val.type == 'dropdown'}
     <select name="questions[{$val.id}]" {if $val.required == 1} required {/if} class="form-control wd60">
      {foreach $val.multiple as $key2 => $default}
        <option value="{$default}"{if ($default == $val.default && $val.values == '') || ($val.values == $default)}  selected{/if}> {$default} </option>
      {/foreach} 
     </select> 
   {/if}

   {if $val.type == 'checkbox'}

     {foreach $val.multiple as $key2 => $default}
     {$df2 = $val.values.indexOf($default)}
       <input type="checkbox" name="questions[{$val.id}]" class="cqs_check" {if $val.required == 1}  required data-parsley-mincheck="1"  {/if} value="{$default}" {if ($default == $val.default && $val.values == '') || ($val.values != '' && $df2 != '-1') || ($val.values == $default)} checked {/if} />
	   <label>{$default}</label>
      {/foreach} 
   {/if}
  </div>
</div>
{/foreach}

<script>

    $(function() {

        $('.cqs_check').each(function () {

            var k = ('({$val.values})').indexOf($(this).val());

            if (k > 0) {
                $(this).prop('checked', true);
            }
        });
    });
    </script>