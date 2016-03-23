{include file="/common/header-1.tpl" nocache}
<style>
.r_btns:first-child{
	
	margin-top: 5px;
}

</style>




{literal}
<script type="text/javascript">

function checkval()
{
   if($('#title').val()=='')
     {
      
      $('.errrbox').show();
         $('#err_title').show();
       $('#err_title').html('Please enter Review Headline');
     
       $('#title').focus();
       $('#title').css( "border","1px solid red" );
         return false;
     } 
     
     if($('#content').val()=='')
     {
         $('.errrbox1').show();
      $('#err_content').show();
     $('#err_content').html('Please enter Review ');
      
       $('#content').focus();
       $('#content').css( "border","1px solid red" );
         return false;
     } 
tt=$('#content').val().length;
     if( tt < 120)
     {
         $('.errrbox1').show();

       $('#err_content').show();
        $('#err_content').html('Please enter Review (minimum 120 characters) ');
       
       $('#content').focus();
       $('#content').css( "border","1px solid red" );
         return false;
     } 

     var count = 0;
      $('.testimonial').each(function(){
         
         lastid= $(this).data('field');
 
          if($('#rating-input-'+lastid+'-1').is(':checked') || $('#rating-input-'+lastid+'-2').is(':checked') || $('#rating-input-'+lastid+'-3').is(':checked') || $('#rating-input-'+lastid+'-4').is(':checked') || $('#rating-input-'+lastid+'-5').is(':checked'))
          {
            
            count = count;
           
          } 
          else{
            count = count + 1;
          }
      });

      if(count == 0){
      
      }
      else
          {
            $('#rate_err').show();
            $('#rate_err').html('Please rate all the fields');
            $('#rating-input-1-1').focus();
            return false;
          }



}
function clearval(ss)
{
 
 if($('#title').val()!='')
     {

         $('#err_title').hide();
       $('#err_title').html('');
     $('.errrbox').hide();
       $('#title').css( "border","1px solid #ccc" );
        
     } 
     tt=$('#content').val().length;
     {
      return false;
     }
     if($('#content').val()!='')
     {
  
     $('#err_content').html('');
     $('#err_content').hide();
      $('.errrbox1').hide();
    
     $('#content').css( "border","1px solid #ccc" );
      
     } 

}
{/literal}

</script>
 <form  action="{$config.url}/dashboard/feedback/add" method="post" style=" height: auto;margin-bottom: 50px;overflow: hidden;"  onsubmit="return checkval();"  data-parsley-validate>
   <input type="hidden" value="{$projects.buynow_id}" name="bid" /> 
<div class="row buyer7 buyer3">
<div class="col-md-3 buyer1">

<div class="buyer3"><img src="{if $projects.avatar == ''} {$config['imgpath']}no_img.png {else if $projects.avatar != ''}{$config['imgpath']}product/{$projects.avatar}{/if}" class="img-responsive"></div>

</div>

<div class="col-md-9 buyer2">
<div class="col-md-12 head2">&nbsp;</div>
<div class="col-md-12 padee8">{$projects.title} {$projects.id}</div>
<div class="col-md-12 fdb3 fedbc4z">Seller:{$projects.name}</div>
<div class="col-md-12 cancel1 fedbc3z">Leave feedback for Seller</div>
<div class="col-md-12 fedbc2z">Review Headline <span class="fedclr2">*</span> <span class="fedspan">( if you could say it in one sentence,what would you say? ) </span></div>
<div class="col-md-12 fedbc2z errrbox" style="display:none"> <span class="fedspan" id="err_title" style="display:none; color:red;"> </span></div>
<div class="col-md-10"><input type="text" onblur="clearval(this)"  onfocus="clearval(this)"  id="title" name="title" class="form-control" placeholder="Write review headline"></div>

<div class="col-md-12 fedbc2z">Write Your Review <span class="fedclr2">*</span> <span class="fedspan">(minimum 120 characters)</span></div>
<div class="col-md-12 fedbc2z errrbox1" style="display:none"> <span class="fedspan" id="err_content" style="display:none; color:red;"> </span></div>
<div class="col-md-10"><textarea class="form-control" id="content" onblur="clearval(this)"  onfocus="clearval(this)" name="content" rows="6" placeholder="Write your product review"></textarea></div>
<div class="col-md-12 fdb3 fedbc2z">Your Ratings <span class="fedclr2">*</span></div>
<div id='rate_err' class="col-md-12 " style="display:none; color:red;"></div>
<div class="col-md-12 fedbc1z padlef0">
<div class="col-md-9">

{$stype = 0}
{foreach $fields as $key => $val}
<div class="row  buyer3 r_btns1 padlef0">
<div class="col-xs-12 col-sm-6 col-md-4">{$val.field_name}</div>
{$stype = {$val.id}}
          {include file="rate-star.tpl" nocache}
<div class="col-xs-12 col-md-7 text-right">
<div class="fedclr1">(Click to rate on scale of 1-5)</div></div>
<span class="testimonial" data-field="{$stype}" data-title="{$val.field_name}"></span>
</div>
{/foreach}

</div>






</div>
<div class="col-md-12 head2">&nbsp;</div>
<div class="clear"></div>
<div class="row buyer3">
<div class="col-md-2"></div>
<div class="col-md-4 col-sm-4 col-xs-6"><input type="submit" class="btn btn-default btnyt2 sig8 fdb5" value="LEAVE FEEDBACK" style="color:#fff;"></div>
<div class="col-md-4"></div>
</div>

<div class="clear"></div>





</div>

</div>

 </form> 

















{include file="/common/footer-1.tpl" nocache} 

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