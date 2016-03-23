{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-user"></i> Login </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
    <div class="col-lg-12"> {if $error == 'saved'}
      <div class="alert alert-success"> <strong>Saved!</strong> {$users.first_name} profile was successfully changed. </div>
      {elseif $error != ''}
      <div class="alert alert-danger"> <strong>{$error}</strong> </div>
      {/if} </div>
    <div class="col-lg-6">
    <form action="{$config['url']}/admin/login/save" onsubmit="return encrLogin()" method="post"  enctype="multipart/form-data"  >
      <div class="form-label">
        <label>User Name </label>
        <input type="text" id="username" name="username" placeholder="Enter username" value="admin@auctionsoftware.com"  class="form-control">
      </div>
      <div class="form-label">
        <label>Password </label>
        <input type="password" id="password" name="password" value="chennai"  class="form-control">
      </div>
      <br/>
     <div class=""  style="margin-bottom:2%;">    
                             <input type="submit" value="Login" name="id" class="btn-success btn" />
                       
                           </div>
    </form>
     </div>
  </div>
  
  <!-- /.row --> 
</div>
<!--Encrypt Password  From Front End-->
<script src="{$config['externaljs']}md5-min.js"  type="text/javascript"></script>

<script type="text/javascript">

  /* function encrLogin(){

    var pwd =  $('#password').val();
    var hex = hex_md5(pwd)+'12345';
    var hmac = hex_md5(hex);
    
    $('#password').val(hmac);
    return true;
  } */
</script>
<!--Encrypt Password  From Front End-->
{include file="/admincp/footer.tpl" nocache} 