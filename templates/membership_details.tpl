{include file="common/header-1.tpl" nocache}
<style>
    .title .title-name {
        font-size: 16px border : 1 px solid #000000;
        white-space: nowrap;
        overflow: hidden;
    }

    .pad0 {
        padding-right: 0px;
        padding-left: 0px;
    }
    .boldtxt
    {
        font-weight: bold;
    }
    .boldtxs
    {
              font-weight: bold;
                  font-size: 24px;
				      margin-bottom: 10px;
  
    }
	.jiva1w{
		border: 1px solid #ccc;
    border-radius: 10px;
    padding-left: 20px;
    padding-top: 20px;
    min-height: 295px;
    background-color: #EFEFEF;
	}
</style>
<link rel="stylesheet" type="text/css" href="{$config.url}/css/membershiptable.css"/>
<div class="main_container">
    <div class="row dashboard membership_select">

        <div class="col-lg-12">
            <div class="row">
                <div class="col-md-12" style="line-height:27px;">
                    <div class="row">
                        <div class="form-group col-md-6">
                        <div class="col-md-12 jiva1w">
                            <h1 class="boldtxs">CURRENT PLAN SUMMARY</h1>
                            <p><span class="boldtxt">Role Name : </span>{$plandetails.rolename}</P>
                            <p><span class="boldtxt">Plan Name : </span>{$plandetails.plan_name}</P> 
                           <p> <span class="boldtxt">Status : </span>{$plandetails.status}</P> 
                           <p>  <span class="boldtxt">Renewal Period: </span>{$plandetails.renewal_date}</P>
                           <p>  <span class="boldtxt">Total Product Allowed to Post : </span>{$project_limit}</P>
                           <p>  <span class="boldtxt">Total Product Allowed to Post Per Month : </span>{$monthly_project_limit}</P>
                           <p>  <span class="boldtxt">Total Bids Allowed to Place : </span>{$bid_limit}</P>
                           <p>  <span class="boldtxt">Total Bids Allowed to Place Per Month : </span>{$monthly_bid_limit}</P>

                            <p>  <span class="boldtxt">Total Buy Now Allowed to Place : </span>{$buynow_limit}</P>
                            <p>  <span class="boldtxt">Total Buy Now Allowed to Per Month : </span>{$monthly_buynow_limit}</P>


                            <p>  <span class="boldtxt">Total Attachment Limit : </span>{if $used_attach == 'Unlimited'} Unlimited {else} {$allowed_attach_limit} MB {/if}</P>
</div>
                        </div>
                        <div class="form-group col-md-6">
                         <div class="col-md-12 jiva1w">
                            <h1 class="boldtxs">CURRENT PLAN USAGE SUMMARY</h1>
                            <p><span class="boldtxt">Total Products Posted : </span>{$productcountyear}</P>
                            <p><span class="boldtxt">Total Products Posted This Month : </span>{$productcountmonth}</P> 
                            <span class="boldtxt">Total Bids Placed : </span>{$bidcountyear}</P> 
                            <span class="boldtxt">Total Bids Placed This Month : </span>{$bidcountmonth}</P>

                             <span class="boldtxt">Total Buy Now : </span>{$buynowcountyear}</P>
                             <span class="boldtxt">Total Buy Now This Month : </span>{$buynowcountmonth}</P>

                             <span class="boldtxt">Total Used space : </span>{if $monthly_bid_limit == 'Unlimited'} Unlimited {else}{convertKbToMb($used_attach_space)}  MB {/if}</P>
</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-6">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
{include file="common/footer-1.tpl" nocache}