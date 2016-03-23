<div class="row">
 	<div class="col-md-12">
	  <div class="col-md-6">	
		<div class="form-group">
		      <label>Shipping User Info:</label>
		      {$cart.first_name} {$cart.first_name} {$cart.email}
		</div>
		<div class="form-group">      
		      <label>Phone:</label>
		      {$cart.phone}
		</div>	
	  </div>
	  <div class="col-md-6">	
		<div class="form-group">
		      <label>Shipping Address</label>
		      {$cart.state},<br/>		
		      {$cart.city},<br/>
		      {$cart.country},<br/>
		      {$cart.zipcode}<br/>
		</div>
	  </div>	
	</div>	
	<div class="col-md-12">
     <div class="col-md-6">	 
     <div class="form-group">
		<label>Tracking Number:</label>
        {$cart.shipping_id} 
        </div>	
        </div>	
	</div>	
	<div class="col-md-12"> 
    <div class="col-md-6">	 
    <div class="form-group">
		<label>Tracking Service:</label>
        {$cart.shipping_service} 
        </div>	
        </div>	
	</div>
	<div class="col-md-12"> 
    <div class="col-md-6">	
    <div class="form-group"> 
		<label>Tracking Info:</label>
        {$cart.shipping_info}
        </div>	 
        </div>	
	</div>
	<div class="col-md-12">
		<input type="submit" class="btn btn-danger" value="Close" onclick="$('.modal').modal('hide');">
	</div>
</div>      