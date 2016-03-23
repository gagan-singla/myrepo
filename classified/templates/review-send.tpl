{include file="common/header-1.tpl" nocache}
<style type="text/css">
.pdbut .btn
{
  margin:10px;
}
</style>
<div class="container">
<div class="row fbck-container">
<div class="col-md-12">
  <div class="selft26">Leave Feedback</div>
</div>
</div>
<div class="row fbck-container">
  <form action="{$config.url}/dashboard/feedback/add" method="post" data-parsley-validate>
   <input type="hidden" value="{$projects.buynow_id}" name="bid" /> 
      <div class="col-md-2">
        <img src="{if $projects.avatar == ''} {$config['imgpath']}no_img.png {else if $projects.avatar != ''}{$config['imgpath']}product/{$projects.avatar}{/if}" class="img-responsive">
      </div>
      <div class="col-md-9">
        <div class="fb_item_title">{$projects.title} {$projects.id}</div>
        <div class="seller_ftlbl">Seller:{$projects.name}</div>
        <div class="seller_ftlbl1">Leave feedback for Seller</div>
        <div class="seller_ftlbl">Please enter your overall response for this experience.Positive,Neutral or Negative</div>
        <div class="ds fbck row">
          <div class="col-md-2">
            <label class="option srch_olbl"> 
              <input type="radio" type="radio"  value="Positive" name="stype" data-parsley-required>
              <span class="radio"></span>Positive
            </label>
          </div>
          <div class="col-md-2">
            <label class="option srch_olbl"> 
              <input type="radio" type="radio" value="Neutral" name="stype" data-parsley-required>
              <span class="radio"></span>Neutral
            </label>
          </div>
          <div class="col-md-2">
            <label class="option srch_olbl"> 
              <input type="radio" type="radio" value="Negative" name="stype" data-parsley-required>
              <span class="radio"></span>Negative
            </label>
          </div>
        </div>
        <div class="seller_ftlbl">Please Explain</div>
        <div>
          <textarea class="form-control" rows="4" name="content" data-parsley-required></textarea>
        </div>
        <div class="seller_ftlbl">
          Please select the closest rating specifics using the chart below
        </div>
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-3 seller_ftlbl">
            Quality
          </div>
          {$stype = 1}
          {include file="rate-star.tpl" nocache}
        </div>
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-3 seller_ftlbl">
            Delivery
          </div>
          {$stype = 2}
          {include file="rate-star.tpl" nocache}
        </div>
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-3 seller_ftlbl">
            Price
          </div>
          {$stype = 3}
          {include file="rate-star.tpl" nocache}
        </div>
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-3 seller_ftlbl">
            Communication
          </div>
          {$stype = 4}
          {include file="rate-star.tpl" nocache}
        </div>
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-3 seller_ftlbl">
            Shipping Time
          </div>
          {$stype = 5}
          {include file="rate-star.tpl" nocache}
        </div>
        <div class="row lbfdbck">
          <div class="col-xs-6 col-sm-6 col-md-4">
            <input type="submit" class="btn btn-danger" value="LEAVE FEEDBACK" style="color:#fff;"/>
              
          </div>
          <div class="col-md-2">
                      </div>
        </div>
      </div>
     </form> 
</div>
</div>

{include file="common/footer-1.tpl" nocache} 
<div class="modal fade" id="shippinginfo" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
     <div class="modal-header"></div>
     <div class="modal-body info-data"></div>    
    </div>
  </form>
  </div>

    </div>
  </div>
<script language="javascript" type="text/javascript">
          $(function() { $('.myp').addClass('act_class'); } );
     </script> 
<script type="text/javascript">
$(function()
{
  projectLoad();
});</script>

