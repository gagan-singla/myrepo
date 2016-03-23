<div class="row">
  <form action="javascript:saveShippingInfo();" id="shipping-track-info" method="post" data-parsley-validate>	
	<div class="col-md-12" style="padding-left: 0;">
	  <div class="col-md-6">	
		<div class="form-group">
		      <label>Shipping User Info:</label>
		      {$cart.first_name} {$cart.last_name} {$cart.email}
		</div>
		<div class="form-group">      
		      <label>Phone:</label>
		      {$cart.phone}
		</div>	
	  </div>
	  <div class="col-md-6">	
		<div class="form-group">
		      <label>Shipping Address: </label>
		      {$cart.state}, {$cart.city}, {$cart.country}, {$cart.zipcode}
		</div>
	  </div>	
	</div>
	<div class="col-md-12"> 
		<label>Tracking Service</label>
        <select class="form-control" name="shipping_service" data-parsley-required required>
        	 <option value="fedex" {if $cart.shipping_service == 'fedex'}selected{/if}>Fedex</option>
        	 <option value="ups" {if $cart.shipping_service == 'ups'}selected{/if}>UPS</option>
        	 <option value="usps" {if $cart.shipping_service == 'usps'}selected{/if}>USPS</option>
        </select>  
	</div>
	<div class="col-md-12"> 
		<label>Tracking Number</label>
        <input type="text" class="form-control" name="shipping_id" data-parsley-required required value="{$cart.shipping_id}" />
	</div>		
	<div class="col-md-12" style="padding-top: 10px;"> 
		<label>Please provide shipment tracking info for buyer:</label>
        <textarea class="form-control" name="shipping_info" data-parsley-required required>{$cart.shipping_info}</textarea>  
	</div>	
	<div class="col-md-12"> 
	    <input type="hidden" name="id" value="{$bid}" />      
		<input type="submit" class="btn btn-danger" value="Save" style="margin-top:10px;">
	</div>
   </form>	
</div>      