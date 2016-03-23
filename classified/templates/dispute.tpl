{include file="common/header-1.tpl" nocache}

<style type="text/css">

.modal-open{
	position:unset;
}
</style>
<div class="col-md-12" >
  <div class="col-md-8 how_works" style="padding:30px 0;">
  	 {if $action_sent}
        <div class="row">
          <div class="bg bg-success padding-20  m-top-40"> <i class="fa fa-warning"></i> Your dispute sent. </div>
        </div>
    {/if}
    <h3 class="hiw_heading" style="padding-bottom:2%;">Dispute</h3>
    <form method="post" data-validate="parsley" enctype="multipart/form-data" id="review-form" action="{$config.url}/dispute">
    <div class="control-group">
      <div class="col-md-12" style="padding-left:0;margin-bottom: 10px;">Subject</div>
      <div class="col-md-12" style="margin-bottom: 10px; padding-left:0;">
        <input name="subject"  data-parsley-group="block1" required id="subject" maxlength="99" value="" onkeyup="return limitlength(this,99,'info_label')" type="text" class="form-control">
      </div>
      </div>
      <div class="control-group">
      <div class="col-md-12" style="padding-left:0;margin-bottom: 10px;">Message*</div>
      <div class="col-md-12" style="margin-bottom: 10px;padding-left:0">
        <textarea class="form-control" rows="4"  name="message" id="message" required></textarea>
      </div>  
      </div>
      <div class="control-group">  
      <div class="col-md-12" style="padding-left:0">
          <button class="btn btn-primary">Submit</button>
      </div> 
      </div>
    </form>
  </div>
  <div class="col-md-3 pull-right how_works">
   <div class="panel panel-default">
      <div class="panel-heading"> Write a Review </div>
      <div class="panel-body">
        <div> Dear User or Visitor, </div>
        <div> We encourage all of our customers to share their thoughts, so if you'd like to be featured in one of our customer review posts and tell us what’s on your mind! </div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#review_form">Click here to Review</button>
      </div>
    </div>
    <div class="panel panel-default" style="margin-top:50px;">
      <div class="panel-heading">Contact Support</div>
      <div class="panel-body" style="line-height:24px;"> Got a question? We’ve got answers. For simple solutions, check out our easy-to-access Help section. For stickier situations, please email us at <a href="" style="line-height:40px;">support@auctionsoftware.com </a> </div>
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
{include file="common/footer-1.tpl" nocache} 
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