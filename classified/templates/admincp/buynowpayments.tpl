{include file="/admincp/header.tpl" nocache}
<div class="container-fluid">

                <!-- Page Heading -->
                
                <div class="row">
                    <div class="col-lg-12" style="margin-top:2%;">
                        
                        <ol class="breadcrumb">
                            <li class="active">
                                <i class="fa fa-laptop"></i> Escrow <i class="fa fa-hand-o-right"></i> <i class="fa fa-search"></i> List
                            </li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->

                <div class="row">
                   
                 
                </div>    
                
{if $success}
<div class="alert alert-success"> <strong>{$error}!</strong> </div>
{/if}
{if $failure}
<div class="alert alert-danger"> <strong>{$error}!</strong> </div>
{/if}
<form action="" method="post" id="pay_chk">
<div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Product Title</th>
                                        <th>Image</th>
                                        <th>Seller</th>
                                        <th>Buyer</th>
                                        <th>Qty</th>
                                        <th>Amount</th> 
                                        <th>Status</th> 
                                        <th>Commission</th> 
                                        <th>Shipping Info</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {$paymentscount =0}
                                 {foreach $payments as $key => $val} 
                                  {$paymentscount =1} 
                                    <tr>
                                        <td><a href="{$config.url}/product/view/{$val.project_id}">{$val.title}</a></td>
                                        
                                        <td><a href="#" title="{$val.title}"> <img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" width="50" height="50" alt="1"></a></td>
                                        <td>{$val.name}</td>
                                        <td>{$val.uname}</td>
                                        <td>{$val.qty}</td>
                                        <td>${$val.amt}</td>
                                        <td>{if $val.paid == 1} {if $val.release == 1} Released <br />date:{$val.r_date} <br />
                                          {/if} {if $val.release == 0} Paid <br />{$val.pay_date}{/if} {/if}{if $val.paid == 0} Unpaid {/if}</td>
                                          <td>${$val.commission}</td>
                                        <td>{$val.first_name} {$val.last_name},<br />
                                          {$val.address}<br />{$val.city}<br />{$val.state}</td>
                                        <td>
                                           {if $val.paypal_address==''}
                                              {$val.paypal_address='kprasadbe@gmail.com'}
                                           {/if}
                                            {if $val.paid == 1}
                                            Payable Amount:${$val.amt-$val.commission} <br />
                                          {if $val.admin == 0}<a href="{$config.url}/admincp/escrow/release/{$val.buynow_id}">Mark as paid</a> (paypal:{$val.paypal_address})<br /> <a href="{$config.url}/admincp/escrow/cancel/{$val.buynow_id}">Cancel</a>
                                          <br /> 
                                          <input type="checkbox" name="payer[{$val.buynow_id}][id]" value="{$val.buynow_id}" />
                                          <input type="hidden" name="payer[{$val.buynow_id}][paypal_address]" value="{$val.paypal_address}" />
                                          <input type="hidden" name="payer[{$val.buynow_id}][amount]" value="{$val.amt-$val.commission}" /> Select To Pay

                                          {/if}
                                          {if $val.admin == 1}Released{/if}
                                          {if $val.admin == 2}Refunded{/if}{/if}
                                            </td>
                                    </tr>
                                 {/foreach}
                                 {if $paymentscount == 0}
                                 <tr>
                                     <td colspan="10">
                                         No records found !!!
                                     </td>
                                 </tr>
                                 {/if}
                                </tbody>
                            </table>
                           

                            {$pagination_html}
                        </div>
                        </form> 
                        <input type="submit" class="btn btn-success" value="Do select Payment" onclick="doSelectedPayment(this)"  style="margin-bottom:2%; margin-top:2%;"/>

               
                <!-- /.row -->
</div>

 <p style="padding-bottom:2%;">To Create New Preapproval Key.<a href="#" onclick="doApprovalProcess(this)">click here</a></p>


{include file="/admincp/footer.tpl" nocache}
<script type="text/javascript">

function doApprovalProcess(obj)
{
  
 if($(obj).html() != 'please wait....')
 { 
   var params = { ADMIN_PAYPAL_EMAIL: '{$config.paypal.address}',ADAPTIVE_MODE: {if $config.paypal.sandbox == 'yes'}  'sandbox' {else} 'production' {/if},
               ADAPTIVE_USERNAME:'{$config.paypal.paypal_username}',ADAPTIVE_PASSWORD: '{$config.paypal.paypal_password}',ADAPTIVE_SIGNATURE: '{$config.paypal.paypal_signature}',ADAPTIVE_APP_ID: '{$config.paypal.paypal_api}',site: '{$config.common.url}',page: '/paypal/paypal_process.php?action=_key_response',rsite: '{$config.url}/admincp/escrow/',action : '_get_approval_key',vsite:'{$config.url}/paypal/pkey/',url:'{$config.common.url}',page: '/paypal/paypal_process.php' };
  //var params = [];
 // params['ADMIN_PAYPAL_EMAIL'] = 'prasad@ilancecustomization.com';     
 console.log(params);        
  $.ajax({
    type: "GET",
    dataType: 'json',
    url: "{$config.common.url}/paypal/paypal_process.php",
    data: params,
    success: function(data){
        console.log(data);
        $(obj).html('click here.');     
        if(data.success)
        {
            {if $config.paypal.sandbox == 'yes'}
            window.location = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-preapproval&preapprovalkey='+data.key;
            {else}
            window.location = 'https://www.paypal.com/cgi-bin/webscr?cmd=_ap-preapproval&preapprovalkey='+data.key;
            {/if}
            console.log(data.key);
        }
        else
        {
           alert(data.message);
        }    
     }
    });
  }   
}
 
function doSelectedPayment(obj)
{

 if($(obj).val() != 'please wait....')
 {
   var params = { ADMIN_PAYPAL_EMAIL: '{$config.paypal.address}',ADAPTIVE_MODE: {if $config.paypal.sandbox == 'yes'}  'sandbox' {else} 'production' {/if},
               ADAPTIVE_USERNAME:'{$config.paypal.paypal_username}',ADAPTIVE_PASSWORD: '{$config.paypal.paypal_password}',ADAPTIVE_SIGNATURE: '{$config.paypal.paypal_signature}',ADAPTIVE_APP_ID: '{$config.paypal.paypal_api}',site: '{$config.common.url}',page: '/paypal/paypal_process.php?action=_key_response',rsite: '{$config.url}/admincp/escrow/',action : '_do_payment',vsite:'{$config.url}/paypal/pay/',url:'{$config.common.url}',page: '/paypal/paypal_process.php',p_key:'{$config.paypal.preapproval_key}' };
  //var params = [];
 // params['ADMIN_PAYPAL_EMAIL'] = 'prasad@ilancecustomization.com';     
 var datas =      $('#pay_chk').serialize()+'&'+$.param(params)
 console.log(datas);
  $.ajax({
    type: "GET",
    dataType: 'json',
    url: "{$config.common.url}/paypal/paypal_process.php",
    data:datas,
    success: function(data){
        $(obj).val('Do select Payment');
        console.log(data);
        console.log('https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-preapproval&preapprovalkey='+data.key);
        //return false;
        if(data.success)
        {
             window.location.reload();
            console.log(data.key);
        }
        else
        {
            alert(data.message);
        }    
     }
    }); 
  }
}
</script>
