{include file="/admincp/header.tpl" nocache}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script>

function paginationReports(page)
{
  
  $('input[name="page"]').val(page);
  //alert(page);
  $('#reportvform').submit();
}

</script>


  
    
    <div class="panel panel-default">
  
     
     
      <form action="{$config.url}/admincp/reports_create" data-parsley-validate method="post" id="reportvform">

        <input type="hidden" name="reports" value="{$requests.reports}">
        <input type="hidden" name="limit_results" value="{$requests.limit_results}">
        <input type="hidden" name="orderradio" value="{$requests.orderradio}">
        <input type="hidden" name="optionsRadios" value="{$requests.optionsRadios}">
        <input type="hidden" name="rangepast" value="{$requests.rangepast}">
        <input type="hidden" name="fromdate" value="{$requests.fromdate}">
        <input type="hidden" name="todate" value="{$requests.todate}">
        <input type="hidden" name="type" value="{$requests.type}">


         <input type="hidden" name="page" id="pageid" value="{$page}">

         <!--Invoices   Items -->

        
        {if $requests.reports eq 'ipaid' || $requests.type eq 'iunpaid'}
          {if $requests.invoiceid}<input type="hidden" name="invoiceid" value="{$requests.invoiceid}">{/if}
          {if $requests.proid}<input type="hidden" name="proid" value="{$requests.proid}">{/if}
          {if $requests.productname}<input type="hidden" name="productname" value="{$requests.productname}">{/if}
          {if $requests.date_added}<input type="hidden" name="date_added" value="{$requests.date_added}">{/if}
          {if $requests.uid}<input type="hidden" name="uid" value="{$requests.uid}">{/if}
          {if $requests.username}<input type="hidden" name="username" value="{$requests.username}">{/if}
          {if $requests.t_amount}<input type="hidden" name="t_amount" value="{$requests.t_amount}">{/if}
          {if $requests.istatus}<input type="hidden" name="istatus" value="{$requests.istatus}">{/if}
          {if $requests.itype}<input type="hidden" name="itype" value="{$requests.itype}">{/if}
        {/if}

         <!--Sold   Items -->
        {if $requests.reports eq 'sopened' || $requests.reports eq 'sclosed' || $requests.reports eq 'ssold' || $requests.reports eq 'sending'}
          {if $requests.pid}<input type="hidden" name="pid" value="{$requests.pid}">{/if}
          {if $requests.pname}<input type="hidden" name="pname" value="{$requests.pname}">{/if}
          {if $requests.qty}<input type="hidden" name="qty" value="{$requests.qty}">{/if}
          {if $requests.pdate_added}<input type="hidden" name="pdate_added" value="{$requests.pdate_added}">{/if}
          {if $requests.sid}<input type="hidden" name="sid" value="{$requests.sid}">{/if}
          {if $requests.sell_name}<input type="hidden" name="sell_name" value="{$requests.sell_name}">{/if}
          {if $requests.p_amount}<input type="hidden" name="p_amount" value="{$requests.p_amount}">{/if}
          {if $requests.s_amount}<input type="hidden" name="s_amount" value="{$requests.s_amount}">{/if}
          {if $requests.sold_item}<input type="hidden" name="sold_item" value="{$requests.sold_item}">{/if}
          {if $requests.ptype}<input type="hidden" name="ptype" value="{$requests.ptype}">{/if}
          {if $requests.dclosed}<input type="hidden" name="dclosed" value="{$requests.dclosed}">{/if}
          {if $requests.paid_date}<input type="hidden" name="paid_date" value="{$requests.paid_date}">{/if}
        {/if}
         <!--Sold   Items -->


         <!--Products  Items -->
        {if $requests.reports eq 'buyout' || $requests.type eq 'bidout'} 
          {if $requests.p_id}<input type="hidden" name="p_id" value="{$requests.p_id}">{/if}
          {if $requests.p_name}<input type="hidden" name="p_name" value="{$requests.p_name}">{/if}
          {if $requests.amt}<input type="hidden" name="amt" value="{$requests.amt}">{/if}
          {if $requests.r_date}<input type="hidden" name="r_date" value="{$requests.r_date}">{/if}
          {if $requests.bid}<input type="hidden" name="bid" value="{$requests.bid}">{/if}
          {if $requests.buyer}<input type="hidden" name="buyer" value="{$requests.buyer}">{/if}
          {if $requests.slid}<input type="hidden" name="slid" value="{$requests.slid}">{/if}
          {if $requests.seller}<input type="hidden" name="seller" value="{$requests.seller}">{/if}
          {if $requests.p_type}<input type="hidden" name="p_type" value="{$requests.p_type}">{/if}
        {/if}

          <!--Commission  Items -->

        {if $requests.reports eq 'earned'}
          {if $requests.pc_id}<input type="hidden" name="pc_id" value="{$requests.pc_id}">{/if}
          {if $requests.pc_name}<input type="hidden" name="pc_name" value="{$requests.pc_name}">{/if}
          {if $requests.pc_amt}<input type="hidden" name="pc_amt" value="{$requests.pc_amt}">{/if}
          {if $requests.rc_date}<input type="hidden" name="rc_date" value="{$requests.rc_date}">{/if}
          {if $requests.secid}<input type="hidden" name="secid" value="{$requests.secid}">{/if}
          {if $requests.c_seller}<input type="hidden" name="c_seller" value="{$requests.c_seller}">{/if}
          {if $requests.byid}<input type="hidden" name="byid" value="{$requests.byid}">{/if}
          {if $requests.c_buyer}<input type="hidden" name="c_buyer" value="{$requests.c_buyer}">{/if}
          {if $requests.comm_amt}<input type="hidden" name="comm_amt" value="{$requests.comm_amt}">{/if}
        {/if}



      </form>

       

         <div class="row tables">
    <div class="col-lg-11">
      <div class="table-responsive">
        <table id="reportslist" class="table table-bordered table-hover fd4">
          <thead>
            <tr>
            {foreach $headings as $key => $val}
              <th>{$val}</th>
            {/foreach}
            </tr>
          </thead>
          <tbody>
            {$fieldcount = 0}
            {foreach $all_details as $index => $details}
              {$fieldcount = 1}
              <tr>
                {foreach $details as $keys => $vals}
                <td>{$vals}</td>
                {/foreach}
              </tr>
            {/foreach}
            {if $fieldcount ==0}
            <tr>
               <td colspan="15">
                 No Records !!
               </td>
            </tr>
            {/if}
          </tbody>
          </table>
           {$pagination_html}

   </div>
</div>

   
   
 </div> 

        </div>
   
    
    <!--<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#boxx" data-whatever="@mdo">Pay with PayPal</button>-->
 

{include file="/admincp/footer.tpl" nocache}

