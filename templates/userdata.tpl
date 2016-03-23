{include file="common/header-1.tpl" nocache} 
		
	
<form action="{$config.url}/srini" data-parsley-validate method="post">	
		
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


    <table width="200" border="1">
      <tr>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Subject</td>
        <td>Message</td>
      </tr>
      
          {foreach $getrecord as $key => $val}
          
       <tr>
        <td>{$val.fname}</td>
        <td>{$val.lname}</td>
        <td>{$val.sub}</td>
        <td>{$val.msg}</td>
      </tr>
      
         {/foreach}  
         

 
    </table>
