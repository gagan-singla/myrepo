{include file="/common/header-1.tpl" nocache}
<style type="text/css">
.dvPreview img{
  margin:10px;
}
.category ul{
  display:none;
}
</style>
<div class="row">
<div class="daashbrd_cngpswd"><a href="/dashboard/my">Dashboard</a> &gt;&gt; Profile</div>

<div class="col-md-3 txtfun3 padlef0">
{include file="left-profile-nav.tpl" nocache}
</div>
<div class="col-md-9">
  <form action="/profile_settings/update/" method="post" accept-charset="utf-8" enctype="multipart/form-data"  data-parsley-validate>
      {if $save}
      <div class="row">
        <div class="bg bg-success padding-20"> <i class="fa fa-warning"></i> Profile Changed Successfully!</div>
      </div>
      {/if}

              <div class="persnl-profl">Personal Profile</div>
              <div class="row">
                <div class="col-md-4">
                  <div class=""><img src="{$config.url}/images/person.png"></div>
                  <div class="">Add Profile Photo</div>
                </div>
              </div>
              <div class="row frm">
                <div class="col-md-6">
                  <input class="form-control" placeholder="First Name*" name="firstname" value="{$users.firstname}">
                </div>
                <div class="col-md-6">
                  <input class="form-control" placeholder="Last Name*"  name="lastname" value="{$users.last_name}">
                </div>
              </div>
              <div class="row frmbx">
                <div class="col-md-12">
                  <textarea class="form-control bder" rows="8" name="aboutme" cols="28" rows="5" title="About Me"  data-parsley-rangelength="[100,200]" data-parsley-minlength="100" data-parsley-maxlength="1000" maxlength="1000" required>{$users.aboutme}</textarea>
                </div>
              </div>
              <div class="row frm">
                <div class="col-md-6">
                  <input class="form-control" placeholder="E-mail" name="email" value="{$users.email}">
                </div>
                <div class="col-md-6">
                  <input class="form-control" placeholder="Paypal E-mail" name="paypal_address" value="{$users.paypal_address}">
                </div>
              </div>
              <div class="row frm">
                <div class="col-md-6">
                  <input class="form-control" placeholder="Cellphone Number" value="{$users.phone}" name="phone"> 
                </div>
               
              </div>
              <div class="row frm">
                <div class="col-md-6">
                  <input class="form-control" placeholder="Address*" name="address1" value="{$users.address1}">
                </div>
                <div class="col-md-6">
                  <select name="country" id="country" class="form-control" required>
                       <option value="">Select Country</option>
                      {foreach $config.countries as $key => $val}
                       <option value="{$val.name}" attr="{$val.location_id}" {if $shipping.country == $val.name} selected="selected" {/if}>{$val.name}</option>
                      {/foreach}
                    </select>
                </div>
              </div>
              <div class="row frm">
                <div class="col-md-6">
                  <input type="text" id="state" name="state" placeholder="Enter state" class="form-control" value="{$users.state}" title="State" maxlength="20" required>
                </div>
                <div class="col-md-3">
                  <input class="form-control" placeholder="City*" name="city" class="form-control" value="{$users.city}" title="city" maxlength="20" required>
                </div>
                <div class="col-md-3">
                  <input class="form-control" placeholder="Zip Code" id="zipcode" name="zip"  class="form-control" value="{$users.zip}" title="Zipcode" maxlength="10" required>
                </div>
              </div>
              <div class="row">
                <div class="select">Select Categories</div>
               </div> 
               <div class="row category">
             
            {foreach $category as $key => $val} 
            <div class="col-md-10">   
             <div class="col-md-1 chkbx">
                  <input type="checkbox"  name="categories[]" value="{$val.id}"  class="m-left-6" />
             </div>
             <div class="col-md-4">
                    <div class="packging">{$val.name}</div>
              </div>
              </div>
            {/foreach}
              
              </div>
              <div class="row">
                <div class="col-md-2">
                  <input type="submit" class="btn btn-danger btgn" value="Save" />
                </div>
              </div>
            </div>

    </form>        
</div>

{include file="/common/footer-1.tpl" nocache} 
