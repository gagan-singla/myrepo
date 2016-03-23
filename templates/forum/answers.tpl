{include file="common/header-1.tpl" nocache}
{include file="/forum/header.tpl" nocache}
<div class="col-md-12 mjusza1">
New Message
</div>

<div class="col-md-12 padle">
<div class="col-md-12 bordsel8">
<div class="col-md-12 bordsel9 mbtnm_10">Post Answer</div>

<form action="{$config.url}/forum/newanswer" id="fans" method="post" enctype="multipart/form-data" data-parsley-validate>
<div class="col-md-12">
<div class="col-md-12 mbtnm_10 padle">
<input type="hidden" name="qid" value="{$qid}">
<div class="mbtnm_10"><b>Title</b></div>
<input type="text" id="answer_title" data-parsley-group="block1" data-parsley-required="true" data-parsley-required-message="This field is required" required placeholder="enter the subject" class="form-control" name="answer_title" value="Re:{$questions.title}"/>
<div><div class="col-md-12 mbtnm_10 padle">
<div class="mbtnm_10"><b>Body</b></div>
<div class="form-group">
    <div class="table-responsive">
      <textarea name="detail_answer" id="answer_editor" data-parsley-group="block1" data-parsley-required="true" data-parsley-required-message="This field is required" rows="6" required></textarea>
    </div>
    </div>

</div></div>

</div></div></div>

<div class="col-md-12 bordsel8">
<div class="col-md-12">
<div class="mbtnm_10"><b>Attachment</b></div>
<div><input class="bordsel6" id="answer_upload" name="answer_upload" type="file"></div>
</div>

<div class="col-md-12 bordsel7 mbtnm_10">
<div class="pull-right">
<img class="img-responsive hide" id="q_loads" src="{$config.url}/images/ajax-loader.gif" >
</div><br/>
<button type="button" class="btn cancel btn-default">Cancel</button>
<button type="submit" id="fa_submit" class="btn btn-default">Post</button>
</form>
</div></div>
</div>

<!-- <div class="col-md-3 bordsel8">
<div class="mbtnm_10"><b>Subscriptions</b></div>
<div class="checkbox">
    <label>
      <input type="checkbox"><b>Email me when someone replies</b>
    </label>
  </div>

</div> -->


<div class="col-md-12">
<a href="#" data-toggle="modal" data-target=".bs-example-modal-lg">View discussion in a popup</a>
</div>

<div class="col-md-12 mjusza1">
Replying to:
</div>

<div class="col-md-12 bordsez3">
<div class="col-md-3"><!-- <a href="#" class="bordsez2">Report Inappropriate Content</a> -->
<div><a href="#" class="bordsez2">{$questions.first_name} {$questions.last_name}</a></div>
<div class="mbtnm_10">Community Member</div>
<img id="imageupload" src="{if $questions.avatar == ''} {$config['imgpath']}no_img.png {else if $questions.avatar != ''}{$config['url']}/uploads/profile/{$questions.avatar}{/if}" title="No Photo" class="img-responsive">
<!-- <div>( <a href="#">4</a> )</div>
<div><a href="#">View Listings</a></div> -->
</div>
<div class="col-md-9">
<div class=" "></div>

<div><b>{$questions.title}</b></div>
<div class="mbtnm_10">on ‎<span class="bordsez1">{$questions.date_added}</span></div>
<div class="bordsez1">Posts: 1</div>
<div class="bordsez1 mbtnm_10">Registered: ‎{$questions.created_at}</div>

<div class="mbtnm_10">{$questions.description}</div>

</div>

<div class="col-md-12 bordsez1"></div>


</div>

<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">New Question</h4>
      </div>
       <div class="modal-body">
      <div class="col-md-12 bordsel8">
<div class="col-md-12 bordsel9 mbtnm_10">Post Answer</div>
  
{if $answers}
{foreach $answers as $answer}
  <div class="col-md-12 bordsez3">
  <div class="col-md-12">Answered</div>
  <div class="col-md-1 hidden padle a_solved"><img id="imageupload" src="{$config.url}/images/forum/solution.png" title="Solved" class="img-responsive"></div>
  {if $answer.solution == 1}
  <div class="col-md-1 padle"><img id="imageupload" src="{$config.url}/images/forum/solution.png" title="Solved" class="img-responsive"></div>
  {/if}
   

  <div class="col-md-12">
  <div class="col-md-1 padle"><img src="{if $answer.avatar == ''} {$config['imgpath']}no_img.png {else if $answer.avatar != ''}{$config['url']}/uploads/profile/{$answer.avatar}{/if}" title="No Photo" class="img-responsive"></div>
  <div class="col-md-11 padle">
  <div class="easp1"><a href="#" class="bordsez2">{$answer.first_name} {$answer.last_name}</a><!--  ( <a href="#">4</a> ) <a href="#">View Listings</a></div> -->
  <div class="easp1 text-right"><!-- <a href="#">Report Inappropriate Content</a> --></div>
  <div class="easp1 bordsez1">Community Member | Post:{$answer.post_count} | Registered: {$answer.created_at}</div>
  <div class="easp1"><a href="#">in replay to</a> {$questions.first_name} {$questions.last_name} on <span class="bordsez1">{$answer.date_added}</span></div>
  <div class="bordsez5">

        
          {$answer.description}
          
        {if $answer.image}
        <img class="img-responsive" src="{$config['url']}/uploads/forum/{$answer.image}" style="width:150px;"/>
        {/if}
              
              
              
              
      </div></div>
  </div>


 
  </div>
  </div>
  {/foreach}
  {else}
   <div class="col-md-12 bordsez3"> No Answers </div>

{/if}

</div>

<div style="clear:both"></div>

    </div>
  </div>
</div>

<script language="javascript" type="text/javascript">

var editor = CKEDITOR.replace( 'answer_editor', {
    allowedContent: true,
    autoUpdateElement :true,
    required: true
});

editor.on( 'instanceReady', function() {
    console.log( editor.filter.allowedContent );
});
$(function(){
 $( "#fa_submit" ).click(function(e) {
    $('#q_loads').removeClass('hide');
    e.preventDefault();

      CKupdate();
      if($('#answer_editor').val() !=''){
          $('#fans').submit();
      }
      else{
        $('#q_loads').addClass('hide');
         $('#answer_editor').parsley().destroy();
        var specificField = $('#answer_editor').parsley();
        window.ParsleyUI.addError(specificField, "myCustomError", 'Please add some description');
      }
      if($('#answer_title').val() == ''){
        $('#q_loads').addClass('hide');
      }
  });
  $('.cancel').click(function(){
    $('input').val('');
    CKEDITOR.instances.answer_editor.setData('');
    $('#fans').reset();
  });

}); 

</script> 
{include file="/forum/footer.tpl" nocache} 
  {include file="common/footer-1.tpl" nocache}