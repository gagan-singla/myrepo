{include file="common/header-1.tpl" nocache}
{include file="/forum/header.tpl" nocache}

<div class="col-md-10 padle">
<form action="{$config.url}/forum/update_question" method="post" enctype="multipart/form-data" >
<div class="col-md-12 bordsel8">
<div class="col-md-12 bordsel9 mbtnm_10">Edit Question</div>
<div class="col-md-12 mbtnm_10">

<div class="mbtnm_10"><b>Subject</b></div>
<input type="hidden" data-parsley-group="block1" required class="form-control" placeholder="enter the subject" class="form-control" name="qid" value="{$qid}"/>
<div><input type="text" data-parsley-group="block1" required class="form-control" placeholder="enter the subject" class="form-control" name="title" value="{$questions.title}"/></div>
</div>

<div class="col-md-12">
<div class="mbtnm_10"><b>Select Board</b></div>
<div class="col-md-12 mbtnm_10 padle">
<!-- <div class="col-md-3 padle">
<!-- <div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios1" value="1" checked>
    Ask a question
  </label>
</div> -->
<!-- <div class="col-md-7 text-center"><img src="{$config.url}/images/forum/icon-question-inquiry.png" /></div>
</div>
<div class="col-md-3 padle"> -->
<!-- <div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios2" value="2" >
    Start a discussion
  </label>
</div> -->
<!-- <div class="col-md-8 text-center"><img src="{$config.url}/images/forum/icon-discussion-inquiry.png" /></div> 
</div>-->
 
<div class="col-md-4" style="padding-left: 0;">
<select class="form-control" name="board_options" id="board_options" required="required">
 {$reviewcount = 0}
       {foreach $categories as $key => $val}   
      {$reviewcount = 1}
      {if $questions.catid == $val.id}
      <option value="{$val.id}" selected>{$val.catname}</option>
      {/if}
      {if $questions.catid != $val.id}
      <option value="{$val.id}">{$val.catname}</option>
      {/if}
      {/foreach}
      {if $reviewcount == 0}
       <option value="">No Categories available</option>
      {/if}       
  
</select>
</div>
</div>
<div class="col-md-12 mbtnm_10 padle">
<div class="mbtnm_10"><b>Body</b></div>
<div class="form-group">
    <div class="table-responsive">
      <textarea name="detail_question" id="editor1" required="required">{$questions.description}</textarea>
    </div>
    </div>

</div></div></div>

<div class="col-md-12 bordsel8">
<div class="col-md-12">
<div class="mbtnm_10"><b>Attachment</b></div>
<div><input class="bordsel6" id="multipleUpload" name="forum_images" type="file" ></div>
{if $questions.image}
<div class="mbtnm_10"><b>Uploaded Image</b></div>
<img class="img-responsive" src="{$config['url']}/uploads/forum/{$questions.image}" style="width:80px;height:80px">
{/if}
</div>

<div class="col-md-12 bordsel7 mbtnm_10">
<button type="button" class="btn btn-default">Cancel</button>
<button type="submit" class="btn btn-default">Post</button>
</div></div>

</form>

</div>
<script language="javascript" type="text/javascript">

var editor = CKEDITOR.replace( 'editor1', {
    allowedContent: true,
    required: true
});

editor.on( 'instanceReady', function() {
    console.log( editor.filter.allowedContent );
});

</script> 
{include file="/forum/footer.tpl" nocache} 
<script>
$(function(){

  var option = $("input[name='optionsRadios']").val();
  populateOpts( option );
  
  $("input[name='optionsRadios']").click(function(){
    var options = $(this).val();
    populateOpts( options );
    

  });

  function populateOpts(options){

   
    $.ajax({
             type:'POST',
             url:'{$config.url}/forum/getcategories',
             data : { quest_type : options },
             success: function (data)
             {
               
                $('#board_options').html('');
                $('#board_options').html( data );
                
               //$('#vpcheckout').submit();
             }
             
          });
         // $('#vpcheckout').submit();
       }  
  
});
</script>

{include file="/forum/footer.tpl" nocache} 
  {include file="common/footer-1.tpl" nocache}