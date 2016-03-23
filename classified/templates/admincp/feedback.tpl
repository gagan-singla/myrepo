{include file="/admincp/header.tpl" nocache}
<script type="text/javascript">

</script>
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Feedback <i class="fa fa-hand-o-right"></i> <i class="fa fa-list"></i> Manager </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
  <div class="col-lg-12 fdtitle">Feedback Criteria Rating Specifics <br /></div>
  <div class="col-lg-12 fd7">Can manage existing feedback rating criteria sellers will be rated from buyers with. If you're live you shouldn't change or remove criteria as it will affect sellers ratings.<br /><br /></div>
    <div class="col-lg-12"> <div class="col-lg-3" style="padding-left:0;">
     <form action="{$config.url}/admincp/feedback/reviews-create" data-parsley-validate method="post">    
    <input type="text" name="feedlabel" class="form-control fdinp1" required maxlength="25" placeholder="Title"/> </div> <div class="col-lg-1"><select name="feedorder" class="form-control fdinp1">
    {for $val = 1 to $order_count+1}
      <option>{$val}</option>
    {/for}
</select> </div> <div class="col-lg-3">
 <button name="rewfld_submit" class="btn btn-success">Add New Feedback Criteria</button> </div> <br /><br /></div>
  </div>
  </form>
  <div class="row">
    <div class="col-lg-8">
      <div class="table-responsive">
        <table class="table table-bordered table-hover fd2">
          <thead>
            <tr>
              <th>Title</th>
              <th align="center">Display order</th>
              <th align="center">Action</th>
            </tr>
          </thead>
          <tbody>

            {$fieldcount = 0}
            {foreach $fields as $key => $val}   
            {$fieldcount = 1}
          
          <tr>
            <td>{$val.field_name}</td>
            <td align="center">{$val.position}</td>
            <td class="fd1" align="center">  <a href="{$config.url}/admincp/feedback/edit/{$val.id}"> Edit</a> |  <a href="javascript:void(0);" onclick='PopupBox2("{$config.url}/admincp/feedback/delete/{$val.id}");'>Delete</a></td>
          </tr>
                   
            {/foreach}
            {if $fieldcount ==0}
             <tr>
                 <td colspan="5">
                   No reviews found !!!
                 </td>
             </tr>
         {/if}
        </tbody>
          
        </table>
         </div>
    </div>
    <div class="col-lg-11">
     <div class="col-lg-12 fd5">
     <div class="col-lg-9 fd6">Viewing Feedback  <span>(An overview of feedback ratings submitted from users buying and selling within the marketplace)</span></div>
     <div class="col-lg-3">
<!-- <select id="filter_feeddays" class="form-control fdinp1">
  <option value="1">The Past day</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select> -->
 <input class="form-control" name="feed_date" placeholder="Filter By Date" id="feed_date" class="date_picker">
</div>
     </div>
     </div>
    <div class="col-lg-11">
      <div class="table-responsive">
        <table id="feedbacklist" class="table table-bordered table-hover fd4">
          <thead>
            <tr>
              <th>From</th>
             <th>To</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Auction</th>
            </tr>
          </thead>
          <tbody>
            {$reviewcount = 0}
            {foreach $manage_feedbacks as $key => $val}   
            {$reviewcount = 1}
            <tr>
                <td>{$val.first_name} {$val.last_name}</td>
                <td>{$val.sfirst} {$val.slast}</td>
                <td>{$val.average}</td>
                <td>{$val.date_added}</td>
                <td class="fd3" > <a href="{$config.url}/product/view/{$val.id}">View</a> |  <a href="javascript:void(0);" onclick="PopupBox2('{$config.url}/admincp/feedbacknew/delete/{$val.id}');">Delete</a></td>
            </tr>
         {/foreach}
         {if $reviewcount ==0}
             <tr>
                 <td colspan="5">
                   No reviews found !!!
                 </td>
             </tr>
         {/if}
        </tbody>
      </table>
   <div class="pull-right">
    {$pagination_html}
  </div>
      </div>
    </div>
    
  </div>
  
  <!-- /.row --> 
</div>
{include file="/admincp/footer.tpl" nocache} 
<script language="javascript" type="text/javascript">

$(function()
{
   Date.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    Date.format = 'yyyy-mm-dd';
    $("#feed_date").datePicker({ clickInput: false, 
        createButton: false, 
        showYearNavigation: false, 
        showHeader:2
    }).bind(
        'focus click keydown',
        function()
        {
          $("#feed_date").dpRerenderCalendar();
          $("#feed_date").dpSetStartDate('01-02-2012');
            //$(obj).dpSetStartDate($("#funddater_"+curid).val());
            $("#feed_date").dpDisplay();
      }
   );
   
       
});
     </script>