{include file="common/header-1.tpl" nocache}
<div class="p_pwrap" style="min-height:250px;">
	{if $textStatus != ''}
      <div class="clearfix dash_heads">
            <div class="" id="messagedisplay">
              <ul id="message" class="alert alert-success">
                <li>
                  <p>{$textStatus}</p>
                </li>
              </ul>
            </div>
      </div>
      {/if}
      
      
      
      
      {if $step1}
      <form action="/login/forgot_password" method="post" accept-charset="utf-8" data-parsley-validate required>
        <div class="panel panel-default">
              <div class="panel-heading ct_headt">
		Forgot Password
        </div>
        <div class="panel-body">
        <div class="form-group">              
            <div class="col-md-12 pad_bot_10">
            <label>Your Email <span class="red">*</span>:</label>
            </div>
            <div class="col-md-6 pad_bot_10">
             <input type="email" id="email" name="email" placeholder="Enter your email" value="" data-parsley-required-message="Email Address Required" maxlength="55" class="form-control" required/>
            </div>
            <div class="col-md-12 pad_bot_10">
             <input type="submit" name="submit_forgot_password" value="Send" title="Send" class="btn btn-danger"/>
            </div>
        </div>
          
        </div>
      </form>
	  </div>
      {/if}
      
      {if $step2}
      <form action="/login/changepassword" method="post" id="change_password" name="change_password" accept-charset="utf-8" data-parsley-validate>
        <input type="hidden" name="id" value="{$id}" />
        <div class="panel panel-default">
              <div class="panel-heading ct_headt">Enter New Password</div>
		<div class="panel-body">
            <div class="form-group col-md-6 col-sm-12 col-xs-12">
                <label>New Password <span class="red">*</span>:</label>
                <input type="password" id="new_password" name="new_password" data-parsley-minlength="6" data-parsley-minlength-message ="Please enter a minimum of 6 characters" data-parsley-length-message ="Please enter a minimum of 6 characters" data-parsley-type-message="Password should be alphanumeric"  data-parsley-type="alphanum" title="New Password" data-parsley-required-message="Enter new password" maxlength="20" class="form-control"  required >
            
            <span class="red"> </span> </div>
            <div class="clearfix"></div>
           <div class="form-group col-md-6 col-sm-12 col-xs-12">
                <label>Confirm Password <span class="red">*</span>:</label>
                <input type="password" id="new_password" name="confirm_password" title="Confirm Password" data-parsley-required-message="Confirm new password" class="form-control"  maxlength="20" required data-parsley-equalto="#new_password" data-parsley-error-message="Password entered don't match">
                <span class="red"> </span> </div>
                <div class="clearfix"></div>
         <div class="form-group col-md-6 col-sm-12 col-xs-12">
                <input type="submit" name="submit_change_pass" value="SAVE"  class="btn btn-primary" >
            </div>
          </div>
      </form></div>
      {/if} 
    <div class="user" style="display:none;" ></div>
  </div>
{include file="common/footer-1.tpl" nocache}