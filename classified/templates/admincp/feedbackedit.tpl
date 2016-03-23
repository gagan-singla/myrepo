{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Feedback Field Edit </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
    <div class="col-lg-12"> 
      <div class="alert alert-success"> <strong>Saved!</strong> was successfully changed. </div>
      
      <div class="alert alert-danger"> <strong></strong> </div>
      </div>
      <div class="col-lg-6">
   <form method="POST" enctype="multipart/form-data" class="admin_form" data-parsley-validate name="add-product" id="feed-product" action="/admincp/feedback/update">   
     <input type="hidden" value="{$feedfields.id}" name="id" />  
      <div class="form-group">
        <label>Feedback title</label>
        <input name="title" data-parsley-group="block1" required id="product_name" maxlength="99" value="{$feedfields.field_name}" onKeyUp="return limitlength(this,99,'info_label')" type="text" class="form-control">
      </div>
    
     <div class="form-group">
        <label>Feedback Order</label>

        <select name="feed_order" class="form-control">

          {for $val = 1 to $fields_count+1}
           <option value="{$val}"  {if $val == $feedfields.id}selected{/if}>{$val}</option>
          {/for}
        
        </select> 
      </div>
     
          
      <input name="submit_user_profile" class="btn btn-warning" value="Reset" title="Reset" class="fl" type="reset">
      <input name="admin_product_add" class="btn btn-success" value="Save" title="Add" class="fl" type="submit">
    </form>
    </div>
    
  </div>
 </div> 

{include file="/admincp/footer.tpl" nocache} 
<script language="javascript" type="text/javascript">

$(function()
{
   Date.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    Date.format = 'mm/dd/yyyy';
    $("#date_added").datePicker({ clickInput: false, 
        createButton: false, 
        showYearNavigation: false, 
        showHeader:2
    }).bind(
        'focus click keydown',
        function()
        {
          $("#date_added").dpRerenderCalendar();
          $("#date_added").dpSetStartDate($("#date_added").val());
            //$(obj).dpSetStartDate($("#funddater_"+curid).val());
            $("#date_added").dpDisplay();
      }
   );
   
    $("#date_closed").datePicker({ clickInput: false, 
        createButton: false, 
        showYearNavigation: false, 
        showHeader:2
    }).bind(
        'focus click keydown',
        function()
        {
          $("#date_closed").dpRerenderCalendar();
          $("#date_closed").dpSetStartDate($("#date_added").val());
            //$(obj).dpSetStartDate($("#funddater_"+curid).val());
            $("#date_closed").dpDisplay();
      }
   );
   
});
     </script>