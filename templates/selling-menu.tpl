<style>
@media(min-width:993px) { 
html {
	position:relative;
}
footer {
	margin-top:160px;
	position: inherit;
}
</style>
<div class="selft26">Buyer Dashboard</div>
<div class="col-md-12 dashbrd12" id="dash-menu">
	<div class="pull-left btn-group rmgn">
		<a class="btn btn-danger" href="javascript:void(0);">Buyer</a>
		<a class="btn btn-default" href="{$config.url}/dashboard/my">Seller</a>
	</div>
	<button type="button" class="navbar-toggle brht_menu pull-right  collapsed" data-toggle="collapse" data-target="#bsb-collapse">
							<i class="fa fa-bars"></i> 
	</button>
    <div id="bsb-collapse" class="navbar-collapse  white_nbb pull-right collapse" role="navigation">
	<div class="sidbrd2"><a href="{$config.url}/dashboard/mybids">Active</a></div>
	<div class="sidbrd2"><a href="{$config.url}/dashboard/mywon">Bids Won</a></div>
	<div class="sidbrd2"><a href="{$config.url}/dashboard/buynow">Buy Now</a></div>
	<div class="sidbrd2"><a href="{$config.url}/dashboard/mybids?cmd=lost">Bids Lost</a></div>
	</div>
</div>
<div class="clearfix"></div>
<script type="text/javascript" charset="utf-8">
	//<![CDATA[

	var path = window.location.href; // Just grabbing a handy reference to it

	if(path.indexOf('?page') > -1 ){
		urls = path.split('?page')
		path = urls[0];
	}
	if(path.indexOf('&page') > -1 ){
		urls = path.split('&page')
		path = urls[0];
	}
	
	$('#dash-menu  a').each(function() {
		if (this.href === path) {
			$(this).addClass('active');
		}
	});
	//]]>
</script>