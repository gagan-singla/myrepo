{include file="common/header-1.tpl" nocache} 
		
	{if $message != ''}<div class="alert alert-success m-top-10">{$message}</div>{/if}
	<form action="{$config.url}/index/contact" data-parsley-validate method="post">	
		<div class="col-md-12 top_hlbl" style="padding:2% 0 2% 2%;">Contact Us</div>
		<div class="col-md-12" style="margin-top:2%;">
			<div class="col-md-2">First Name</div>
			<div class="col-md-6"><input class="form-control" name="first_name" data-parsley-required></div>
		</div>
		<div class="col-md-12" style="margin-top:2%;">
			<div class="col-md-2">Last Name</div>
			<div class="col-md-6"><input class="form-control"  name="last_name" data-parsley-required></div>
		</div>
		<div class="col-md-12" style="margin-top:2%;">
			<div class="col-md-2">Subject</div>
			<div class="col-md-6"><input class="form-control" name="subject" data-parsley-required></div>
		</div>
		<div class="col-md-12" style="margin-top:2%;">
			<div class="col-md-2">Message</div>
			<div class="col-md-6"><textarea class="form-control" rows="6" name="message" data-parsley-required></textarea></div>
		</div>
		<div class="col-md-12" style="margin-top:2%; margin-bottom:2%;">
			<div class="col-md-2"></div>
			<div class="col-md-6"><input class="btn btn-danger" value="Send" type="submit" /></div>
		</div>
	
</form>		


	{include file="common/footer-1.tpl" nocache}
	<!--script type="text/javascript">
    $(function()
    {
     $('.container').addClass('contact_us');
    });
	</script-->