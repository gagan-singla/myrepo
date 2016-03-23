{include file="common/header-1.tpl" nocache}
<div class="main_container">
<style>
.cust {
    font-size: 22px;
    color: #555555;
    padding: 3px 21px;
    font-weight: bold;
}
.amt_paid {
    font-size: 20px;
    color: #555555;
    margin: 0px auto;
    padding: 14px 32px;
    font-weight: bold;
}
.trans_dtls {
    font-size: 22px;
    padding: 10px;
    color: #555555;
    font-weight: bold;
}
.order {
    margin: 11px 28px;
    font-size: 22px;
    color: #555555;
    font-weight: bold;
}
</style>
<div class="dash_acct" style="color: black;"><span onClick="window.location='{$config['url']}/dashboard/my'">Dashboard</span>  &gt;&gt;  <span onClick="window.history.back();">Accounting</span>  &gt;&gt;   Transaction <a id="print_invoice" href="#" style="cursor:pointer"><span style="float:right"><input type="button" class="btn btn-danger" value="Print"></span></a>
</div>
<div class="row amt_invoice1">
<div class="amt_paid">Amount: US ${currencyConverter($invoice.amt - $invoice.refundamt)}</div>
<div class="invoice">This invoice has been paid in date of {$invoice.pay_date}</div>
</div>
  <div class="row">
  
  <div class="col-md-6">
  <div class="tgray_box">
    <div class=" cust">Customer Billing Information</div>
    <div class="cacell">{$invoice.first_name} {$invoice.last_name}<br />
               {$invoice.email}
               </div>
    <div class="cacell">{$invoice.address}, {$invoice.city}, {$invoice.state}, {$invoice.country}</div>
    <div class="cacell">{$invoice.phone}</div>
  </div>
  </div>

    <div class="col-md-6">
    <div class="tgray_box">
    <div class=" cust">Transaction Trading Partner</div>
    <!--<div class="cacell">{$invoice.name}
               </div>
    <div class="cacell">{if $invoice.uaddress != NULL}{$invoice.uaddress}{/if}</div>-->
        <div class="cacell">{$invoice.name}<br />
            {$invoice.email}
        </div>
        <div class="cacell">{if $invoice.seller_address} {$invoice.seller_address} ,{/if} {if $invoice.seller_city} {$invoice.seller_city},{/if} {$invoice.seller_state}, {$invoice.seller_country}</div>
        <div class="cacell">{if $invoice.seller_phone} {$invoice.seller_phone} {/if}</div>
</div>
</div>
</div>
<div class="row tranc_details">
<h5 class="trans_dtls">Transaction Details</h5>
<div class="col-md-3 padright">
<h6 class="trans">Transaction ID</h6>
<h6 class="value easp1">{$invoice.trans_id}</h6>
<h6 class="value">Created: {$invoice.create_date}</h6>
</div>
<div class="col-md-2">
<h6 class="trans">Transaction Type</h6>
<h6 class="value easp1">Debit</h6>
<h6 class="value">Invoice status: {if $invoice.paid == 1}Paid{/if}{if $invoice.paid == 0}UnPaid{/if}</h6>
</div>
<div class="col-md-4">
<h6 class="trans">Generated by </h6>
<h6 class="value easp1">Billing and Payments</h6>
<h6 class="value">Created date: {$invoice.create_date}</h6>
</div>
<div class="col-md-3 padle" style="padding-right: 1px;">
<h6 class="trans">To</h6>
<h6 class="value easp1">{$invoice.name}</h6>
<h6 class="value">Paid date: {$invoice.pay_date}</h6>
</div>
</div>
<div class="row order_details">
<div class="order">Order Details</div>
<div class="paid">Product Title - {$invoice.title}</div>
<div class="prices">Total: US ${currencyConverter($invoice.amt - $invoice.refundamt)}</div>
</div>
</div>
{literal}
<script>
$(function(){
$("#print_invoice").click(function(){
createPopup($('header').html()+$('.main_container').html()+$('footer').html());
})
});
</script>
{/literal}
{include file="common/footer-1.tpl" nocache} 