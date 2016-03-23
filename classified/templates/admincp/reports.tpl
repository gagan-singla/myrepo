{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Report Management </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
   <div class="col-lg-12 reports1">  
    
     Report management gives you direct access of accounting overview based on the reporting you wish to formulate
  
   </div> 
   <form action="" data-parsley-validate method="post" class="form-horizontal">    
    <div class="col-md-10">
      <input type="hidden" name="id" value="" /> 
      <div class="form-group">
        <label class="col-sm-2 control-label">Action</label>
        <div class="col-sm-6">
         <select class="form-control" name="type">
          <option value="list">Show Report Listings in Table Format</option>
          <option value="csv">Download Comma Delimited File</option>
          <option value="tsv">Download Tab Delimited File</option>
        </select>  
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">Report</label>
        <div class="col-sm-6">
         <select class="form-control" name="type">
          <option value="">Select report to generate:</option>
						<optgroup label="Revenue">
                        		
								<option value="storesubscription">Stores membership fees revenue</option>
								<option value="storecommission">Stores final value fees revenue</option>
                                <option value="adrevenue">Advertising Fees Revenue</option>
								<option value="subscription">Membership Fees Revenue</option>
								<option value="credential">Credential Verification Fees Revenue</option>
								<option value="portfolio">Featured Portfolio Fees Revenue</option>
								<option value="enhancements">Listing Enhancement Fees Revenue</option>
								<option value="fvf">Final Value Fees Revenue</option>
								<option value="insfee">Insertion Fees Revenue</option>
								<option value="escrow">Escrow Commission Fees Revenue</option>
								<option value="withdraw">Withdraw Fees Revenue</option>
								<option value="p2b">Provider to Buyer Generated Invoice Fees Revenue</option>
                                
								
                        </optgroup>
						<optgroup label="Expenses">
                        		
								<option value="tax">Tax Expenses</option>
								<option value="registerbonus">Registration Bonus Expenses</option>
								
                        </optgroup>
						<optgroup label="Loses">
                        		
								<option value="refund">Refunded Transactions</option>
								<option value="cancelled">Cancelled Transactions</option>
								
                        </optgroup>
						<optgroup label="Disputed">
                        		        
								<option value="disputed">Disputed Transactions</option>
								      
                        </optgroup>
        </select>  
        </div>
      </div>
      
      
      <div class="col-md-12 reports2">Customize your report by viewing only desired transaction columns</div>
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Fields</label>
        <div class="col-sm-8">
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Invoice ID
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Invoice Amount
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Project ID
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Create Date
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="">
    	Custom Message
  		</label>
		</div>
         </div>
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	User ID
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Total Amount 
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Invoice Status
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Due Date
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="">
    	Transaction ID
  		</label>
		</div>
         </div>
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Description
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Tax Amount
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Invoice Type
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Paid Date
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" checked="checked">
    	Amount Paid
  		</label>
		</div>
         </div>
        </div>
      </div>
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Tools</label>
        <div class="col-sm-10">
         <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" >
    	If you would like to convert the user_id field into the actual username please tick this checkbox
  		</label>
		</div>
        <div class="checkbox">
  		<label>
    	<input type="checkbox" value="" >
    	 If you would like to convert the project_id field into the actual listing title please tick this checkbox
  		</label>
		</div>
        </div>
        </div>
        
          <div class="col-md-12 reports2">Customize your report using a wide variety of date range options</div>
          
           <div class="form-group">
        <label class="col-sm-2 control-label">Within</label>
        <div class="col-sm-10">
         <div class="radio">
  		<label>
    	<input type="radio" name="optionsRadios" >
    	<select name="rangepast" class="form-control" style="margin-left:23px;">
        <option value="-1 day">The Past Day</option>
        <option value="-1 week">The Past Week</option>
        <option value="-1 month">The Past Month</option>
        <option value="-1 year">The Past Year</option>
        </select>
  		</label>
		</div>
        </div>
        </div>
        
        <div class="form-group">
        <label class="col-sm-2 control-label">From Range</label>
        <div class="col-sm-10">
        <div class="col-sm-1 reports4" style="padding-left:0;">
          <input type="radio" name="optionsRadios" checked="checked">
         </div>
       
         <div class="col-sm-2 reports3">
         <input type="text" class="form-control" placeholder="01">
         </div>
         <div class="col-sm-1 reports4">
         /
         </div>
         <div class="col-sm-2 reports3">
         <input type="text" class="form-control" placeholder="01">
         </div>
         <div class="col-sm-1 reports4">
         /
         </div>
         <div class="col-sm-2 reports3">
         <input type="text" class="form-control" placeholder="2015">
         </div>
         <div class="col-sm-1 reports4">
         <span>To</span>
         </div>
         <div class="col-sm-2 reports3">
         <input type="text" class="form-control" placeholder="05">
         </div>
         <div class="col-sm-1 reports4">
         /
         </div>
         <div class="col-sm-2 reports3">
         <input type="text" class="form-control" placeholder="12">
         </div>
         <div class="col-sm-1 reports4">
         /
         </div>
         <div class="col-sm-2 reports3">
         <input type="text" class="form-control" placeholder="2015">
         </div>
         
        </div>
        </div>
        
        <div class="col-md-12 reports2">Order your results based on ascending or descending below</div>
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Order Results</label>
        <div class="col-sm-10">
        <label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked="checked"> Ascending
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> Descending
</label>
        </div>
        </div>
        
        <div class="form-group">
        <label class="col-sm-2 control-label">Limit Results</label>
        <div class="col-sm-2">
        <input type="text" placeholder="100" class="form-control" />
        </div>
        </div>
      
      
      <div class="col-md-12 form-group">
       <button name="submit" class="btn btn-success">Create Report</button> 
      </div>  
    </div>
   </form>  
  </div> 
   
   
 </div> 
</div> 

{include file="/admincp/footer.tpl" nocache} 
