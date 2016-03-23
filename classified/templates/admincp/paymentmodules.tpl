{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
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
    
     <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                        <tr>
                                        <td>Enter the name of this payment module</td>
                                        <td><input type="text"  class="form-control" value="Authorize.Net"></td>
                                        <td><input type="text"  class="form-control sortb1" value="10"></td>
                                        </tr>
                                        <tr>
                                        <td>Authorize.Net username</td>
                                        <td><input type="text"  class="form-control" value="testing"></td>
                                        <td><input type="text"  class="form-control sortb1" value="20"></td>
                                        </tr>
                                        <tr>
                                        <td>Authorize.Net password</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="30"></td>
                                        </tr>
                                        <tr>
                                        <td>Authorize.Net transaction key</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="40"></td>
                                        </tr>
                                        <tr>
                                        <td>Authorize.Net transaction usage fee 1 [value in percentage; i.e: 0.029]</td>
                                        <td><input type="text"  class="form-control" value="Authorize.Net"></td>
                                        <td><input type="text"  class="form-control sortb1" value="0.029"></td>
                                        </tr>
                                        <tr>
                                        <td>Authorize.Net transaction usage fee 2 [value in fixed format; i.e: 0.30]</td>
                                        <td><input type="text"  class="form-control" value="testing"></td>
                                        <td><input type="text"  class="form-control sortb1" value="0.30"></td>
                                        </tr>
                                        <tr>
                                        <td>Authorize.Net credit card authentication process capture mode [auth|charge|capture]?</td>
                                        <td><input type="text"  class="form-control" value="charge"></td>
                                        <td><input type="text"  class="form-control sortb1" value="70"></td>
                                        </tr>
                                        <tr>
                                        <td>Authorize.Net credit card authentication process refund mode [process|void|credit]?</td>
                                        <td><input type="text"  class="form-control" value="credit"></td>
                                        <td><input type="text"  class="form-control sortb1" value="80"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow members to deposit funds using this gateway?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable Authorize.Net Recurring Subscriptions? (used in subscription menu)</td>
                                        <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="100"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable Authorize.Net gateway module?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="110"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable Test Mode</td>
                                         <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="120"></td>
                                        </tr>
                                        </table>
                                       
                                        </div> 
                                        
                                        <div class="col-md-12 form-group"> 
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
      									</form>
     								  	</div>
    
    
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
         
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-up"></span> PayPal Gateway Configuration</div>
        </a>
       
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
       
          <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                        <tr>
                                        <td>Enter the name of this payment module</td>
                                        <td><input type="text"  class="form-control" value="Paypal"></td>
                                        <td><input type="text"  class="form-control sortb1" value="10"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your PayPal email address</td>
                                        <td><input type="text"  class="form-control" value="payments@yourdomain.com"></td>
                                        <td><input type="text"  class="form-control sortb1" value="20"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your PayPal API Username</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="30"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your PayPal API Password</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="40"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your PayPal API Signature</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="50"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter the currency used in PayPal transactions</td>
                                        <td><input type="text"  class="form-control" value="USD"></td>
                                        <td><input type="text"  class="form-control sortb1" value="60"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable withdraw payment usage fees?</td>
                                        <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="70"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter the withdraw usage fee amount</td>
                                        <td><input type="text"  class="form-control" value="5"></td>
                                        <td><input type="text"  class="form-control sortb1" value="80"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter deposit transaction fee 1 [value in percentage; i.e: 0.029]</td>
                                          <td><input type="text"  class="form-control" value="0.029"></td>
                                          <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter deposit transaction fee 2 [value in fixed format; i.e: 0.30]</td>
                                        <td><input type="text"  class="form-control" value="0.3"></td>
                                        <td><input type="text"  class="form-control sortb1" value="80"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable e-check deposit support [will show e-check support in payment pulldown]?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter deposit via e-check usage fee amount [value is fixed dollar]</td>
                                        <td><input type="text"  class="form-control" value="5"></td>
                                        <td><input type="text"  class="form-control sortb1" value="80"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow members to request withdrawals using this gateway?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow members to deposit funds using this gateway?</td>
                                       <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                       
                                        <td><input type="text"  class="form-control sortb1" value="80"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable PayPal Recurring Subscriptions? (used in subscription menu)</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow members to directly pay other members through this gateway?</td>
                                        <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="100"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter available currency in PayPal transactions</td>
                                          <td><textarea class="control-form" rows="3" style="width:100%;"></textarea></td>
                                        <td><input type="text"  class="form-control sortb1" value="110"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable PayPal Sandbox testing environment?</td>
                                         <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="120"></td>
                                        </tr>
                                        </table>
                                        
                                        </div> 
                                        
                                        <div class="col-md-12 form-group"> 
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
     									</form>
     								  	</div>
    
       
       
      </div>
    </div>
  </div>
  
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-up"></span> PayPal Payments Pro Gateway Configuration</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
       
            <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                        <tr>
                                        <td>Enter the name of this payment module</td>
                                        <td><input type="text"  class="form-control" value="PayPal Payments Pro"></td>
                                        <td><input type="text"  class="form-control sortb1" value="10"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your PayPal Payments Pro username</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="20"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your PayPal Payments Pro password</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="30"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your PayPal Payments Pro signature</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="40"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter the currency used in PayPal Payments Pro transactions</td>
                                        <td><input type="text"  class="form-control" value="USD"></td>
                                        <td><input type="text"  class="form-control sortb1" value="50"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter transaction fee 1 [value in percentage; i.e: 0.029]</td>
                                        <td><input type="text"  class="form-control" value="0.029"></td>
                                        <td><input type="text"  class="form-control sortb1" value="60"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter transaction fee 2 [value in fixed format; i.e: 0.30]</td>
                                        <td><input type="text"  class="form-control" value="0.30"></td>
                                        <td><input type="text"  class="form-control sortb1" value="70"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter available currency in PayPal Payments Pro transactions</td>
                                        <td><textarea class="form-control" rows="3" style="width:100%"></textarea></td>
                                        <td><input type="text"  class="form-control sortb1" value="80"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow buyers to directly pay the seller (admins only) through this gateway?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable PayPal Payments Pro Sandbox testing environment?</td>
                                        <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="100"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow members to deposit funds using this gateway?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="110"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable PayPal Payments Pro Recurring Subscriptions? (used in subscription menu)</td>
                                         <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="120"></td>
                                        </tr>
                                        </table>
                                        
                                        </div> 
                                        
                                        <div class="col-md-12 form-group"> 
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
     									</form>
     								  	</div>
       
      </div>
    </div>
  </div>

<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFour">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-up"></span> BrainTree Payment Gateway Configuration</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body">
        
        
            <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                        <tr>
                                        <td>Enter the name of this payment module</td>
                                        <td><input type="text"  class="form-control" value="BrainTree"></td>
                                        <td><input type="text"  class="form-control sortb1" value="10"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your BrainTree Payments  username</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="20"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your BrainTree Payments  password</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="30"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your BrainTree Payments  signature</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="40"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter the currency used in BrainTree Payments  transactions</td>
                                        <td><input type="text"  class="form-control" value="USD"></td>
                                        <td><input type="text"  class="form-control sortb1" value="50"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter transaction fee 1 [value in percentage; i.e: 0.029]</td>
                                        <td><input type="text"  class="form-control" value="0.029"></td>
                                        <td><input type="text"  class="form-control sortb1" value="60"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter transaction fee 2 [value in fixed format; i.e: 0.30]</td>
                                        <td><input type="text"  class="form-control" value="0.30"></td>
                                        <td><input type="text"  class="form-control sortb1" value="70"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter available currency in BrainTree Payments  transactions</td>
                                        <td><textarea class="form-control" rows="3" style="width:100%"></textarea></td>
                                        <td><input type="text"  class="form-control sortb1" value="80"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow buyers to directly pay the seller (admins only) through this gateway?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable BrainTree Payments  Sandbox testing environment?</td>
                                        <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="100"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow members to deposit funds using this gateway?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="110"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable BrainTree Payments  Recurring Subscriptions? (used in subscription menu)</td>
                                         <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="120"></td>
                                        </tr>
                                        </table>
                                        
                                        </div> 
                                        
                                        <div class="col-md-12 form-group"> 
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
     									</form>
     								  	</div>
        
      </div>
    </div>
  </div> 
  
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFive">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
         
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-up"></span> VoguePay Payment Gateway Configuration</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
      <div class="panel-body">
       
       
           <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                        <tr>
                                        <td>Enter the name of this payment module</td>
                                        <td><input type="text"  class="form-control" value="BrainTree"></td>
                                        <td><input type="text"  class="form-control sortb1" value="10"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your VoguePay Payments  username</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="20"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your VoguePay Payments  password</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="30"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter your VoguePay Payments  signature</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="40"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter the currency used in VoguePay Payments transactions</td>
                                        <td><input type="text"  class="form-control" value="USD"></td>
                                        <td><input type="text"  class="form-control sortb1" value="50"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter transaction fee 1 [value in percentage; i.e: 0.029]</td>
                                        <td><input type="text"  class="form-control" value="0.029"></td>
                                        <td><input type="text"  class="form-control sortb1" value="60"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter transaction fee 2 [value in fixed format; i.e: 0.30]</td>
                                        <td><input type="text"  class="form-control" value="0.30"></td>
                                        <td><input type="text"  class="form-control sortb1" value="70"></td>
                                        </tr>
                                        <tr>
                                        <td>Enter available currency in VoguePay Payments  transactions</td>
                                        <td><textarea class="form-control" rows="3" style="width:100%"></textarea></td>
                                        <td><input type="text"  class="form-control sortb1" value="80"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow buyers to directly pay the seller (admins only) through this gateway?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable VoguePay Payments  Sandbox testing environment?</td>
                                        <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="100"></td>
                                        </tr>
                                        <tr>
                                        <td>Allow members to deposit funds using this gateway?</td>
                                          <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="110"></td>
                                        </tr>
                                        <tr>
                                        <td>Enable VoguePay Payments  Recurring Subscriptions? (used in subscription menu)</td>
                                         <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="120"></td>
                                        </tr>
                                        </table>
                                        
                                        </div>   
                                        
                                        <div class="col-md-12 form-group">  
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
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
$(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});

</script>
