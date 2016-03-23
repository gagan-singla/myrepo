{include file="/common/header-1.tpl" nocache}
{if $error}
<div class="alert alert-success">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
     {$error}
</div>
{/if}
    <div class="col-md-12">
        <div class="daashbrd_cngpswd"><a href="/dashboard/my">Dashboard</a> &gt;&gt; Adwords</div>
        <div class="col-md-3 txtfun3 padlef0 mobile_view"> {include file="left-profile-nav.tpl" nocache} </div>
        <div class="col-md-9">

            <div class="col-md-8">
                <div class="iome3" style="padding-top: 0px;">Advertisements</div>
            </div>
            <div class="col-md-12">
                <div class="pull-left">Available Funds: US$ {$deposit_amount}[<span>Deposit Funds</span>] <a href="{$config.url}/adwords/add_deposit">Add Deposit</a> {if $deposit_amount <= 0}<br><br>Please  deposit funds to your account {/if}</div>
                <div class="pull-right">
                    <button class="btn btn-warning" onclick="location.href='/adwords/add_adwords'" {if $deposit_amount <= 0} disabled {/if}> New Campaign </button>
                </div>
            </div>

            <div class="col-md-12 table-responsive iome6">
                <table class="table">
                    <thead>
                    <tr class="iome2 ">
                        <th class="iome9">Campaign Name</th>
                        <th class="text-center iome9">Status</th>
                        <th class="text-center iome9">Updated</th>
                        <th class="text-center iome9">Budget/day</th>
                        <th class="text-center iome9">Click</th>
                       <!-- <th class="text-center iome9">Impressions</th>-->
                    </tr>
                    </thead>
                    <tbody>
                    {foreach $adwords_details as $key => $val}
                    <tr>
                        <td class="iome7 iome8">
                            <div class="iome5"><a href="{$config.url}/adwords/edit/{$val.id}" class="iome5" > {$val.ad_title} </a></div>
                            <div>
                                <a class="iome5" href="{$config.url}/adwords/edit_adwords/{$val.status}/{$val.id}" > {if $val.status == 'active'} Pause {else $val.status == 'pause'} Resume {/if}</a>
                                | <a href="{$config.url}/adwords/edit_adwords/remove/{$val.id}" onclick="return confirmation()" class="iome5">Remove</a>
                            </div>
                        </td>
                        <td class="iome7" align="center">{if $val.status == 'active'} Active {else $val.status == 'psuse'} Pause {/if}  </td>
                        <td class="iome7" align="center">{dateFormat($val.created_at, 'dd mmmm yyyy')}</td>
                        <td class="iome7" align="center">{$val.budget_per_click}</td>
                        <td class="iome7" align="center">{$val.no_of_clicks}/{$val.budget_per_day}</td>
                       <!-- <td class="iome7" align="center">2683</td>-->
                    </tr>
                   {/foreach}
                    </tbody>
                </table>
                {$pagination_html}
            </div>


        </div>

    </div>
<script>
    function confirmation() {
        var confirmed =  confirm("Are you sure, you want to delete ?");
        return confirmed;
    }
</script>
{include file="/common/footer-1.tpl" nocache}