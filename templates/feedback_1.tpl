{include file="/common/header-1.tpl" nocache}
<style>
.r_btns:first-child{

	margin-top: 5px;
}
.bord {
	border: 1px solid #ccc;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
}

</style>
<div class="row shipwrap ">

<div class="col-sm-3 col-xs-12 txtfun3 padlef0 mobile_view">
<div class="daashbrd_cngpswd" style="padding-top:10px;"><a href="/dashboard/my" class="clrr">Dashboard</a> &gt;&gt; Feedback</div>

 {include file="left-profile-nav.tpl" nocache} </div>
<div class="col-sm-9 col-xs-12">
<form  action="{$config.url}/dashboard/feedback/add" method="post" style=" height: auto;margin-bottom: 50px;overflow: hidden;"  data-parsley-validate>
  <input type="hidden" value="{$projects.buynow_id}" name="bid" />
  <div class="col-md-12 fedbc2z" >Product Reviews submitted by you </div>
  {if $feedbacks|count <=  0}
  <div class="row mblue_box1 tno_bids" style="padding-top: 29px;"> No feedbacks found </div>
  {else}

  {foreach $feedbacks as $key => $val}


  <div class="col-md-12 buyer7 buyer3 bord">
    <div class="col-md-3 buyer1">
      <div class="col-md-12 buyer3"><img src="{$config.url}/uploads/product/{$val.avatar}" class="img-responsive"></div>
    </div>
    <div class="col-md-9 buyer2">
      <div class="col-md-12 fedbc2z">Review Headline </div>
      <div class="col-md-10">{$val.title}</div>
      <div class="col-md-12 fedbc2z" >Product Review </div>
      <div class="col-md-10">{$val.content}</div>
      <div class="col-md-12 fdb3 fedbc2z" style="line-height:20px;">Your Ratings </div>
      <div class="col-md-12 fedbc1z">
        <div class="col-md-9">


          {foreach $ratings as $stars}
          {if $stars.id == $val.id}
            <div class="row buyer3 r_btns padlef0 ra2">
            <div class="col-md-4 ra2">{$stars.field_name}</div>
            {for $foo=1 to $stars.point} <i class="fa fa-star ra1"></i> {/for}
            </div>
          {/if}
  
          {/foreach}


        </div>

      </div>
      <div class="clear"></div>

    </div>
  </div>



  {/foreach}


  {/if}


  <div class="pull-right">
    {$pagination_html}
  </div>


    </div>
</form>
<div class="modal fade" id="shippinginfo" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header"></div>
      <div class="modal-body info-data"></div>
    </div>
  </div>
</div>
</div>
{include file="/common/footer-1.tpl" nocache}
<script language="javascript" type="text/javascript">
          $(function() { $('.myp').addClass('act_class'); } );
     </script>
<script type="text/javascript">
$(function()
{
  projectLoad();
});</script>