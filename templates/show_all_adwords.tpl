{include file="/common/header-1.tpl" nocache}

<div class="col-md-12">
    <!--<div class="daashbrd_cngpswd"><a href="/dashboard/my">Dashboard</a> &gt;&gt; Adwords</div>
    <div class="col-md-3 txtfun3 padlef0 mobile_view"> {include file="left-profile-nav.tpl" nocache} </div>-->

    <div class="container">

        <div class="col-md-12 ionota9">
            <div class="col-md-12 ionotx9">
                Advertisements
            </div>
        </div>



        {foreach $adwords_details as $key => $val}
            <div class="col-md-3 col-sm-3 col-xs-6">
                <div class="col-md-12 ionota2">
                    <div class="col-md-12 ionota3">
                        <img src="{$config.url}/uploads/ad_image/{$val.banner}" class="img-responsive ionota4"/></div>
                    <div class="col-md-12">
                        <div class="col-md-12 ionota6"><a href="#" onclick="redirect_ads({$val.user_id},{$val.id},'{$val.ad_url}',{$val.budget_per_click})" class="ionota7">{$val.ad_title}</a></div>
                    </div>
                    <div class="col-md-12 ionota5">
                        <div class="col-md-12 ionotx2">
                            {$val.ad_content}
                        </div>
                        <div class="col-md-12 ionota8">
                            {dateFormat($val.created_at, 'dd mmmm yyyy')}
                        </div>
                    </div>
                </div>
            </div>

        {/foreach}


        <div class="col-md-12 text-right">
            {$pagination_html}
           <!-- <ul class="pagination">
                <li><a href="#">PREV</a></li>
                <li><a href="#">1</a></li>
                <li class="active"><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">NEXT</a></li>
            </ul>-->
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