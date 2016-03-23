{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  <style type="text/css">
  .table>thead>tr>th {
    background:#999;
    color:#fff;
    
  }
  .form-horizontal .control-label {
    text-align:left !important;
  }
  </style>
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Payment Modules Management</li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  
  <div class="col-md-12">
  
  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
         
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-down"></span>  Authorize.Net Gateway Configuration</div>
        </a>
      
      </h4>
      <div class="clear"></div>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
    
      
      <form class="form-horizontal" method="post" action="{$config.url}/admincp/editpaymods/authorize">
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enable</label>
    <div class="col-sm-6">
      <label class="radio-inline">
          <input type="radio" name="auth_enable" value="yes" {if $auth_status == 'yes'}checked{/if} > Yes
                    </label>
                    <label class="radio-inline">
                      <input type="radio" value="no" name="auth_enable" {if $auth_status == 'no'}checked{/if}> No
                    </label>
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Your Authorize.Net ID</label>
    <div class="col-sm-6">
      <input type="text" class="form-control" name="auth_id" placeholder="" value="{$auth_api}">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Your Authorize.Net Key</label>
    <div class="col-sm-6">
      <input type="text" class="form-control" name="auth_key" placeholder="" value="{$auth_key}">
    </div>
  </div>
    <button name="submit" class="btn btn-success">Submit</button> 
                        </form>
    
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
         
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-right"></span> PayPal Gateway Configuration</div>
        </a>
       
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
       
           
    <form class="form-horizontal" method="post" action="{$config.url}/admincp/editpaymods/paypal">
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enable Paypal</label>
    <div class="col-sm-6">
      <label class="radio-inline">
                      <input type="radio" checked="checked" {if $paypal_status == 'yes'}checked{/if} name="pay_status" value="yes"> Yes
                    </label>
                    <label class="radio-inline">
                      <input type="radio" {if $paypal_status == 'no'}checked{/if} name="pay_status" value="no"> No
                    </label>
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Your Paypal Address</label>
    <div class="col-sm-6">
      <input type="text" class="form-control" name="pay_address" value="{$paypal_address}" placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Preapproval Key</label>
    <div class="col-sm-6">
      <input type="text" name="pay_key" value="{$paypal_key}" class="form-control"  placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Api Id</label>
    <div class="col-sm-6">
      <input type="text" name="pay_api" value="{$paypal_api}" class="form-control" placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Api Password</label>
    <div class="col-sm-6">
      <input type="text" name="pay_password" value="{$paypal_password}" class="form-control"  placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Paypal Api Signature</label>
    <div class="col-sm-6">
      <input type="text" name="pay_signature" value="{$paypal_signature}" class="form-control" placeholder="">
    </div>
  </div>
   <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Username</label>
    <div class="col-sm-6">
      <input type="text" name="pay_username" value="{$paypal_username}"  class="form-control" placeholder="">
    </div>
  </div>
      
      
                                        
                                        <div class="col-md-12 form-group"> 
      
                        <button name="submit" class="btn btn-success">Submit</button> 
                        </form>
                        </div>
       
       
      </div>
    </div>
  </div>
  
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-right"></span>Stripe Payments Gateway</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
       
             
                                        
  <form class="form-horizontal" method="post" action="{$config.url}/admincp/editpaymods/stripe">
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enable Stripe</label>
   <div class="col-sm-6">
      <label class="radio-inline">
                      <input type="radio" checked="checked" {if $stripe_status == 'yes'}checked{/if} name="stripe_status" value="yes"> Yes
                    </label>
                    <label class="radio-inline">
                      <input type="radio" {if $stripe_status == 'no'}checked{/if} name="stripe_status" value="no"> No
                    </label>
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Your stripe secret key</label>
    <div class="col-sm-6">
      <input type="text" name="stripe_secretkey" value="{$stripe_secretkey}" class="form-control"  placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Your stripe publish key</label>
    <div class="col-sm-6">
      <input type="text" name="stripe_publishkey" value="{$stripe_publishkey}" class="form-control"  placeholder="">
    </div>
  </div>
  <div class="col-md-12 form-group"> 
                        <button name="submit" class="btn btn-success">Submit</button> 
                        </form>
                        </div>
    
       
      </div>
    </div>
  </div>

<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFour">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-right"></span> BrainTree Payment Gateway Configuration</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body">
        
        
  <form class="form-horizontal" method="post" action="{$config.url}/admincp/editpaymods/braintree">
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enable</label>
    <div class="col-sm-6">
      <label class="radio-inline">
                      <input type="radio" checked="checked" {if $braintree_status == 'yes'}checked{/if} name="braintree_status" value="yes"> Yes
                    </label>
                    <label class="radio-inline">
                      <input type="radio" {if $braintree_status == 'no'}checked{/if} name="braintree_status" value="no"> No
                    </label>
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Your BrainTree Payment Address</label>
    <div class="col-sm-6">
      <input type="text" name="braintree_id" value="{$mid}" class="form-control" placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Public Key</label>
    <div class="col-sm-6">
      <input type="text" name="braintree_publickey" value="{$publickey}" class="form-control"  placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter private key</label>
    <div class="col-sm-6">
      <input type="text" name="braintree_privatekey" value="{$privatekey}" class="form-control" placeholder="">
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter customer prefix</label>
    <div class="col-sm-6">
      <textarea name="braintree_customerprefix" class="form-control"  placeholder="">{$customerprefix}</textarea>
    </div>
  </div>
                      <div class="col-md-12 form-group"> 
      
                        <button name="submit" class="btn btn-success">Submit</button> 
                        </form>
                        </div>
        
      </div>
    </div>
  </div> 
  
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFive">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
         
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-right"></span> VoguePay Payment Gateway Configuration</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
      <div class="panel-body">
       
       
                            <form class="form-horizontal"  method="post" action="{$config.url}/admincp/editpaymods/voguepay">
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enable Sandbox</label>
    <div class="col-sm-6">
     <label class="radio-inline">
                      <input type="radio" checked="checked" {if $vp_enabled == 'yes'}checked{/if} name="vp_status" value="yes"> Yes
                    </label>
                    <label class="radio-inline">
                      <input type="radio" {if $vp_enabled == 'no'}checked{/if} name="vp_status" value="no"> No
                    </label>
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-3 control-label">Enter Your VoguePay Payment  Merchantid</label>
    <div class="col-sm-6">
      <input type="text" class="form-control" name="vp_merchantid" value="{$vp_merchantid}" placeholder="">
    </div>
  </div>
  
  
  
 
   
      
      
                                        
                                        <div class="col-md-12 form-group"> 
      
                        <button name="submit" class="btn btn-success">Submit</button> 
                        </form>
                        </div>
       
      </div>
    </div>
  </div>  
  
  
  
  </div> 
  
  </div>   
  
</div> 



{include file="/admincp/footer.tpl" nocache} 


<script>

$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-right").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
});

</script>
