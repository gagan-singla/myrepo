
{if $bids.length == 0}<div class="row text-center">No bids received yet {else}<div class="row">
	{foreach $bids as $key=> $val}
		<div class="col-md-5">
			{$key+1}.{$val.name}{if $val.state != $nuller}, {$val.state} {/if} 
		</div>
		<div class="col-md-4">
			{$val.date_add}
		</div>
		<div class="col-md-3">
		US $ <span id="price{$val.proposed_amount}" class="formats">{$val.proposed_amount}</span>
		</div>
    {/foreach}

</div>
{/if}

<script>
	$(function(){	
		$('.formats').each(function()
		{		
						
			$(this).html(format(parseFloat($(this).html()).toFixed(2),''));
		    
		});
	})
	

function format(n, currency) {
	
	var parts = n.toString().split(".");
    parts[0] = Number(parts[0]).toLocaleString('en');
 	return parts[0]+'.'+parts[1];
}

</script>