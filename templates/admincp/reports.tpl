{include file="/admincp/header.tpl" nocache}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="{$config['externalcss']}/jquery.datetimepicker.css" />

<script>
$( document ).ready(function(e) {
  $('#reportslist').hide();
  $('#reports').on('change',function(){
    $('.tables').hide();
    var selected = $(':selected', this);
    var group = selected.closest('optgroup').attr('class');
    if(selected.val() == ''){
     
      $('.all_fields').hide();
      $('.defaults').show();
    }
    if(group == 'invoices'){
      $('.defaults').hide();
      $('.all_fields').hide();
      $('.ifields').show();
    }

    if(group == 'sold'){

      $('.defaults').hide();
      $('.all_fields').hide();
      $('.pfields').show();

      if(selected.val() == 'ssold'){
      $('#paid_field').html('<label><input type="checkbox" name="paid_date" id="paid_date" value="1" checked="checked"> Paid Date </label>');

      }
      else{

        $('#paid_field').html('');

      }

    }

    if(group == 'buy'){

      $('.defaults').hide();
      $('.all_fields').hide();
      $('.bfields').show();

    }

    if(group == 'commission'){

       $('.defaults').hide();
      $('.all_fields').hide();
      $('.cfields').show();

    }

   


  });

  $('#print').click(function(){

    $('form').hide();
    $('#reportslist').show();
    window.scrollTo(0, 0);

  });

  $('#within').click(function(){
    if($('#within').is(':checked')){
      $('#from_date').val('');
      $('#to_date').val('');
    }

  });

  $("#reports_form").submit(function(e){
    if($('#range').is(':checked')){ 
      if($('#from_date').val() != '' && $('#to_date').val() != '' ){

      }
      else{
         alert('Please select a Date Range');
         e.preventDefault();
      }

    }

    if($('#reports').val() === ''){
        e.preventDefault();
         alert('Please select a report') ;
    }


  });

 $('#rangepast').change(function(){

    $('#within').prop('checked', true);
    $('#range').prop('checked', false);
    

 });
  $('.days').change(function(){

    $('#range').prop('checked', true);
    $('#within').prop('checked', false);

 });

 
});

</script>

<style>
.all_fields{
  display:none;
}
</style>

<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row controls">
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
   <form action="{$config.url}/admincp/reports_create" data-parsley-validate method="post" id="reports_form" class="form-horizontal">    
    <div class="col-md-10">
      <input type="hidden" name="id" value="" /> 
      <div class="form-group">
        <label class="col-sm-2 control-label">Action</label>
        <div class="col-sm-6">
         <select class="form-control" name="type">
         <!--  <option value="list">Show Report Listings in Table Format</option> -->
          <option value="csv">Download Report as a CSV File</option>
          <option value="dsp">Display Report</option>
        </select>  
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">Report</label>
        <div class="col-sm-6">
         <select class="form-control" name="reports" id="reports">
          <option value="">Select report to generate:</option>
            <optgroup label="Sold" class="sold">
                            
                <option value="sopened">Opened items</option>
                <option value="sclosed">Closed item</option>
                <option value="ssold">Sold items</option>
                <option value="sending">Ending soon items</option>
                                                
                
            </optgroup>

            <optgroup label="Buy" class="buy">
                            
                <option value="buyout">Products sold out in buy now</option>
                <option value="bidout">Products sold out in bidding</option>
                
            </optgroup>

            <optgroup label="Commission" class="commission">
               <option value="earned">Commission earned by Admin</option>
            </optgroup>

            <optgroup label="Invoices" class="invoices">
                            
                <option value="ipaid">Invoice Paid Status </option>
                <option value="iunpaid">Invoice Unpaid Status </option>
                
            </optgroup>

                    
        </select>  
        </div>
      </div>
      
      
      <div class="col-md-12 reports2">Customize your report by viewing only desired transaction columns</div>


  <div class="defaults">Please Select a Report</div>
 <!---Fields for sellers-->
  <div class="pfields all_fields">
      
    <div class="form-group">
        <label class="col-sm-2 control-label">Fields</label>
        <div class="col-sm-8">
      <div class="col-md-4 col-sm-4">
        <div class="checkbox">
          <label>
          <input type="checkbox" name="pid" id="pid" value="1" checked="checked">
          Product ID
          </label>
        </div>
        <div class="checkbox">
          <label>
          <input type="checkbox" name="pname" id="pname" value="1" checked="checked">
          Product Name
          </label>
        </div>
        <div class="checkbox">
          <label>
          <input type="checkbox" name="qty" id="qty" value="1" checked="checked">
          Quantity
          </label>
        </div>
          <div class="checkbox">
        <label>
        <input type="checkbox" name="pdate_added" id="pdate_added" value="1" checked="checked">
        Create Date
        </label>
      </div>
        </div>
           <div class="col-md-4 col-sm-4">
           <div class="checkbox">
        <label>
        <input type="checkbox" name="sid" id="sid" value="1" checked="checked">
        Seller Id
        </label>
      </div>
          <div class="checkbox">
        <label>
        <input type="checkbox"  name="p_amount" id="p_amount" value="1" checked="checked">
        Total Amount 
        </label>
      </div>
          <div class="checkbox">
        <label>
        <input type="checkbox" name="s_amount" id="s_amount" value="1" checked="checked">
        Shipping amount
        </label>
      </div>
       <div class="checkbox">
        <label>
        <input type="checkbox" name="sold_item" id="sold_item"  value="1" checked="checked">
        Sold
        </label>
      </div>
       </div>
           <div class="col-md-4 col-sm-4">
          
        <div class="checkbox">
        <label>
        <input type="checkbox" name="ptype" id="ptype"  value="1" checked="checked">
        Product Type
        </label>
      </div>
        <div class="checkbox">
        <label>
        <input type="checkbox" name="dclosed" id="dclosed" value="1" checked="checked">
        Date closed
        </label>
        </div>
        <div id="paid_field" class="checkbox">
        
        </div>
           </div>
          </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">Tools</label>
        <div class="col-sm-10">
          <div class="checkbox">
            <label>
            <input type="checkbox" name="sell_name" id="sell_name" value="1" >
            If you would like to convert the Seller_Id field into the actual username please tick this checkbox.
            </label>
          </div>
        </div>
      </div>
  </div>
   <!---Fields for sellers Ends-->
  <!---Fields for buyers-->
  <div class="bfields all_fields">
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Fields</label>
        <div class="col-sm-8">
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
      <label>
      <input type="checkbox" name="p_id" id="p_id" value="1" checked="checked">
      Product ID
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="p_name" id="p_name" value="1" checked="checked">
      Product Name
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="amt" id="amt" value="1" checked="checked">
      Amount
      </label>
    </div>
     <div class="checkbox">
        <label>
        <input type="checkbox" name="r_date" id="r_date" value="1" checked="checked">
        Release Date
        </label>
      </div>
       
      </div>
         <div class="col-md-4 col-sm-4">
           
         <div class="checkbox">
      <label>
      <input type="checkbox" name="bid" id="bid" value="1" checked="checked">
      Buyer Id
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="slid" id="slid"  value="1" checked="checked">
      Seller Id
      </label>
    </div>
      <div class="checkbox">
      <label>
      <input type="checkbox" name="p_type" id="p_type" value="1" checked="checked">
      Product Type
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
            <input type="checkbox" name="seller" id="seller" value="1" >
            If you would like to add the Seller Username field please tick this checkbox.
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" name="buyer" id="buyer" value="1" >
             If you would like to add the Buyer username field please tick this checkbox.
            </label>
          </div>
        </div>
      </div>

  </div>
  <!---Fields for buyers ends-->
   <!---Fields for commsiion-->
  <div class="cfields all_fields">
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Fields</label>
        <div class="col-sm-8">
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
      <label>
      <input type="checkbox" name="pc_id" id="p_id" value="1" checked="checked">
      Product ID
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="pc_name" id="pc_name" value="1" checked="checked">
      Product Name
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="pc_amt" id="pc_amt" value="1" checked="checked">
      Amount
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="rc_date" id="rc_date" value="1" checked="checked">
      Release Date
      </label>
    </div>
      </div>
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
      <label>
      <input type="checkbox" name="secid" id="secid" value="1" checked="checked">
      Seller Id
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="byid" id="byid"  value="1" checked="checked">
      Buyer Id
      </label>
    </div>
     <div class="checkbox">
      <label>
      <input type="checkbox" name="comm_amt" id="comm_amt" value="1" checked="checked">
        Commission
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
            <input type="checkbox" name="c_seller" id="c_seller" value="1" >
            If you would like to add the Seller Username field please tick this checkbox.
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" name="c_buyer" id="c_buyer" value="1" >
              If you would like to add the Buyer username field please tick this checkbox.
            </label>
          </div>
        </div>
      </div>

  </div>
  <!---Fields for commisiion ends-->

  <!---Fields for invoices ends-->
  <div class="ifields all_fields">
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Fields</label>
        <div class="col-sm-8">
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
      <label>
      <input type="checkbox" name="invoiceid" id="invoiceid" value="1" checked="checked">
      Invoice ID
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="invoiceamt" id="invoiceamt" value="1" checked="checked">
      Invoice Amount
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="proid" id="proid" value="1" checked="checked">
      Product ID
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="date_added" id="date_added" value="1" checked="checked">
      Create Date
      </label>
    </div>
     
         </div>
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
      <label>
      <input type="checkbox" name="uid" id="uid" value="1" checked="checked">
      User ID
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox"  name="t_amount" id="t_amount" value="1" checked="checked">
      Total Amount 
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" name="istatus" id="istatus" value="1" checked="checked">
      Invoice Status
      </label>
    </div>
     
        <div class="checkbox">
      <label>
      <input type="checkbox" name="transid" id="transid" value="1">
      Transaction ID
      </label>
    </div>
         </div>
         <div class="col-md-4 col-sm-4">
         <div class="checkbox">
      <label>
      <input type="checkbox" name="desc" id="desc" value="1" checked="checked">
      Description
      </label>
    </div>
     
        <div class="checkbox">
      <label>
      <input type="checkbox" name="itype" id="itype"  value="1" checked="checked">
      Invoice Type
      </label>
    </div>
   
      <div class="checkbox">
      <label>
      <input type="checkbox" name="amtpaid" id="amtpaid" value="1" checked="checked">
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
      <input type="checkbox" id="username" name="username" value="1" >
      If you would like to add the user_id field into the actual username please tick this checkbox
      </label>
    </div>
        <div class="checkbox">
      <label>
      <input type="checkbox" id="productname" name="productname" value="" >
       If you would like to add the product_id field into the actual listing title please tick this checkbox
      </label>
    </div>
        </div>
        </div>

   </div>
      
        
          <div class="col-md-12 reports2">Customize your report using a wide variety of date range options</div>
          
           <div class="form-group">
        <label class="col-sm-2 control-label">Within</label>
        <div class="col-sm-10">
         <div class="radio">
      <label>
      <input type="radio" id="within" name="optionsRadios" value="fixed">
      <select name="rangepast" id="rangepast" class="form-control" style="margin-left:23px;">
        <option value="day">The Past Day</option>
        <option value="week">The Past Week</option>
        <option value="month">The Past Month</option>
        <option value="year">The Past Year</option>
        </select>
      </label>
    </div>
        </div>
        </div>
        
        <div class="form-group">
        <label class="col-sm-2 control-label">From Range</label>
        <div class="col-sm-10">
        <div class="col-sm-1 reports4" style="padding-left:0;">
          <input type="radio" id="range" name="optionsRadios" checked>
         </div>
       
         <div class="col-sm-2 reports3">
         <input type="text" id="from_date" name="fromdate" class="form-control days date-picker" placeholder="2015-01-01" style="background-color: #fff !important;" readonly='true'>
         </div>
         
         
         <div class="col-sm-1 reports4">
         <span>To</span>
         </div>
         <div class="col-sm-2 reports3">
         <input type="text" id="to_date" name="todate" class="form-control days date-picker" style="background-color: #fff !important;" placeholder="2015-01-01" readonly='true'>
         </div>
         
        </div>
        </div>
        
        <div class="col-md-12 reports2">Order your results based on ascending or descending below</div>
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Order Results</label>
        <div class="col-sm-10">
        <label class="radio-inline">
  <input type="radio" name="orderradio" id="inlineRadio1" value="asc" checked="checked"> Ascending
</label>
<label class="radio-inline">
  <input type="radio" name="orderradio" id="inlineRadio2" value="desc"> Descending
</label>
        </div>
        </div>
        
        <div class="form-group">
        <label class="col-sm-2 control-label">Limit Results</label>
        <div class="col-sm-2">
        <input type="text" name="limit_results" id="limit_results" placeholder="100" class="form-control" />
        </div>
        </div>
      
      
      <div class="col-md-12 form-group">
       <button name="submit" class="btn btn-success">Create Report</button>
      
      </div>  
    </div>
   </form>  
  </div> 

   
</div> 


{include file="/admincp/footer.tpl" nocache} 
<script language="javascript" type="text/javascript">

$(function()
{
   Date.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    Date.format = 'yyyy-mm-dd';
    $("#from_date").datePicker({ clickInput: false, 
        createButton: false, 
        showYearNavigation: false, 
        showHeader:2
    }).bind(
        'focus click keydown',
        function()
        {
          $("#from_date").dpRerenderCalendar();
          $("#from_date").dpSetStartDate('2012-02-01');
            //$(obj).dpSetStartDate($("#funddater_"+curid).val());
            $("#from_date").dpDisplay();
      }
   );
   
    $("#to_date").datePicker({ clickInput: false, 
        createButton: false, 
        showYearNavigation: false, 
        showHeader:2
    }).bind(
        'focus click keydown',
        function()
        {
          $("#to_date").dpRerenderCalendar();
          $("#to_date").dpSetStartDate($("#from_date").val());
            //$(obj).dpSetStartDate($("#funddater_"+curid).val());
            $("#to_date").dpDisplay();
      }
   );
   
});

</script>