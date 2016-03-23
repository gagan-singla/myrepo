{include file="/common/header-1.tpl" nocache}


<style type="text/css">

.modal-open{
	position:unset;
}
.revcus {
	font-size:18px;
	font-weight:bold;
	padding-bottom:8px;
	border-bottom:1px solid #ccc;
	margin-bottom:8px;
}
</style>


<div class="row">

            <div class="col-md-8">
                <h3 class="rev_head revcus">Reviews</h3>

                    {foreach $review as $key => $val}
                     <div class="m-top-20">
                    <div class="clearfix">
                        <div class="pull-left rhead">{$val.subject}</div>
                        <div class="pull-right rating">
                         {if $val.rating == .5}
                            <img src="{$config.">url}/images/wstar.png" alt=""><img src="{$config.url}/images/gwstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><br /><span>"Very Bad"</span>
                           {elseif $val.rating == 1}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><br /><span>"Bad"</span>
                            {elseif $val.rating == 1.5}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gwstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><br /><span>"Bad"</span>
                           {elseif $val.rating == 2}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><br /><span>"Bad"</span>
                            {elseif $val.rating == '2.5'}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gwstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><br /><span>"Normal"</span>
                           {elseif $val.rating == 3}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><br /><span>"Average"</span>
                            {elseif $val.rating == '3.5'}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gwstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><br /><span>"Average"</span>
                           {elseif $val.rating == 4}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/wstar.png" alt=""><br /><span>"Excellent"</span>
                            {elseif $val.rating == '4.5'}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gwstar.png" alt=""><br /><span>"Excellent"</span>
                           {elseif $val.rating == 5}
                            <img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><img src="{$config.url}/images/gstar.png" alt=""><br /><span>"Good"</span>
                           {/if}
                        </div>
                    </div>
                    <p class="rev_txt">
                        {$val.message}.
                    </p>
                    <div class="customer_name">
                        - {$val.first_name} {$val.last_name}
                    </div></div>
                    {/foreach}
                    {$pagination_html}
            </div>

            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Write a Review
                    </div>
                    <div class="panel-body">
                        <div>
                            Dear User or Visitor,
                        </div>
                        <div>
                            We encourage all of our customers to share their thoughts, so if you'd like to be featured in one of our customer review posts and tell us what's on your mind!
                        </div>
                        {if $loged.userid > 0}
                            <button class="btn btn-primary" data-toggle="modal" data-target="#review_form">Click here to Review</button>
                        {else}
                        <button class="btn btn-primary" onclick='location.href="/login"'>Click here to Review</button>
                        {/if}
                    </div>
                </div>
                    <div class="panel panel-default">
                    <div class="panel-heading">Contact Support</div>
                    <div class="panel-body">
                        Got a question? We've got answers. For simple solutions, check out our easy-to-access Help section. For stickier situations, please email us at
                        <a href="">support@auctionsoftware.com </a>
                    </div>
                    </div>
                </div>

            </div>
    <div class="ds modal fade fcorn-register reg" id="review_form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header csgray_box">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="close_buttons_register">x</button>
    <h4 class="modal-title blue_txt">Write Your Review</h4>
  </div>
  <form method="post" data-validate="parsley" enctype="multipart/form-data" id="review-form" action="{$config.url}/dashboard/review/">
    <div class="form-wrapper">
      <div class="row">
        <div class="col-md-12">Review Headline (if you could say it in one sentence, what would you say?)</div>

        <div class="col-md-12">
          <input name="subject"  data-parsley-group="block1" required id="subject" maxlength="99" value="" onkeyup="return limitlength(this,99,'info_label')" type="text" class="col-md-12 form-control">
        </div>

        <div class="col-md-12">Write Your Review (minimum 120 characters)</div>

        <div class="col-md-12">
          <textarea name="message" id="message" class="col-md-12 form-control" required></textarea>
        </div>


        <div class="col-md-12">Rate our service</div>
        <div class="ratings col-md-12">
          <input id="input-27" class="rating col-md-12 form-control"  name="rating">
        </div>

        <div class="col-md-12">
          <input type="submit" class="btn btn-primary" value="Submit">
        </div>

    </div>
    </div>
  </form>
  <div style="clear:both"></div>
</div>
{include file="/common/footer-1.tpl" nocache}

<script type="text/javascript">
$(function(){
    $('.main_container').addClass('review');
})

</script>
<script type="text/javascript">
$(function()
{
  $("#input-27").on("rating.change", function(event, value, caption) {
            $("#input-27").rating("refresh", {disabled:true, showClear:false});
            $("#input-27").val(value);
        });
});</script>