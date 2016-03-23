<div class="row">
	<div class="col-md-12">
	  <div class="col-md-6">	
		<div class="form-group">
		      <label>First Name:</label>
		      {$cart.first_name}
		</div>
		<div class="form-group">
		      <label>Last Name:</label>
		      {$cart.last_name}
		</div>
		<div class="form-group">
		      <label>Email:</label>
		      {$cart.email}
		</div>
		<div class="form-group">
		      <label>Phone:</label>
		      {$cart.phone}
		</div>
		<div class="form-group">
		      <label>Address:</label>
		      {$cart.address}
		</div>
	  </div>
	  <div class="col-md-6">	
		<div class="form-group">
		      <label>State:</label>
		      {$cart.state}
		</div>
		<div class="form-group">
		      <label>City:</label>
		      {$cart.city}
		</div>
		<div class="form-group">
		      <label>Country:</label>
		      {$cart.country}
		</div>
		<div class="form-group">
		      <label>Zipcode:</label>
		      {$cart.zipcode}
		</div>
	  </div>	
	</div>	
	<div class="col-md-12 text-center">      
		<input type="submit" class="btn btn-danger" value="Close" onclick="$('.modal').modal('hide');">
	</div>
</div>      