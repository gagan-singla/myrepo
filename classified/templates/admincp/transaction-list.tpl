<div class="table-responsive">
<table class="table table-bordered table-hover">
    <thead>
        <tr>
            <th>Invoiceid</th>                                        
            <th>User</th>
            <th>Product Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Gateway</th>
            <th>Description</th>
            <th>Date Added</th>
        </tr>
    </thead>
    <tbody>
    {$transactioncount = 0}
     {foreach $trans as $key => $val}	
     {$transactioncount = 1}
        <tr>
            <td>{$val.id}</td>                                       
            <td>{$val.email}</td>
            <td>{$val.title} ({$val.pid})</td>
            <td>{$val.type}</td>
            <td>{$val.istatus}</td>
            <td>${$val.amount}</td>
            <td>{$val.gateway}</td>
            <td>{$val.description}</td>
            <td>{$val.date_add}</td>
        </tr>
     {/foreach}
     {if $transactioncount == 0}
         <tr>
             <td colspan="9">
                 No transactions found !!!
             </td>
         </tr>
      {/if}
    </tbody>
</table>
{$pagination_html}
</div>