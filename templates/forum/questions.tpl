{include file="common/header-1.tpl" nocache}
{include file="/forum/header.tpl" nocache}

<div class="col-md-10 padle">
<form action="{$config.url}/forum/newquestion" id="fqs" method="post" enctype="multipart/form-data" data-parsley-validate>
<div class="col-md-12 bordsel8">
<div class="col-md-12 bordsel9 mbtnm_10">Post Question</div>
<div class="col-md-12 mbtnm_10">

<div class="mbtnm_10"><b>Subject</b></div>
<div><input type="text" id="ques_title"  data-parsley-group="block1" data-parsley-required="true" data-parsley-required-message="This field is required" required class="form-control" placeholder="enter the subject" class="form-control" name="title" value="{$passed}"/></div>
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
      <option value="{$val.id}">{$val.catname}</option>

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
      <textarea name="detail_question" id="editor1" data-parsley-group="block1" data-parsley-required="true" data-parsley-required-message="This field is required" required></textarea>
    </div>
    </div>

</div></div></div>

<div class="col-md-12 bordsel8">
<div class="col-md-12">
<div class="mbtnm_10"><b>Attachment</b></div>
<div><input class="bordsel6" id="multipleUpload" name="forum_images" type="file"></div>
</div>

<div class="col-md-12 bordsel7 mbtnm_10">
<div class="pull-right">
<img class="img-responsive hide" id="q_loads" src="{$config.url}/images/ajax-loader.gif" >
</div><br/>
<button type="button" class="btn cancel btn-default">Cancel</button>
<button type="submit" id="fq_submit" class="btn btn-default">Post</button>
</div></div>

</form>

</div>
<script language="javascript" type="text/javascript">

var editor = CKEDITOR.replace( 'editor1', {
    allowedContent: true,
    autoUpdateElement :true,
    required: true
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

  $( "#fq_submit" ).click(function(e) {
    $('#q_loads').removeClass('hide');
    e.preventDefault();
    var validate = 0;
      CKupdate();

      if($('#ques_title').val() != ''){
        var title = $('#ques_title').val();

        $.ajax({
             type:'POST',
             url:'{$config.url}/forum/checkquestion',
             data : { quest : title },
             success: function (data)
             {
               
                if(data == "success"){ 
                  $('#ques_title').parsley().destroy();
                  validate = 1;
                    if($('#editor1').val() !=''){
         
                      $('#fqs').submit();
                    }
                   
                    else{
                      $('#q_loads').addClass('hide'); 
                      $('#editor1').parsley().destroy();
                      var specificField = $('#editor1').parsley();
                      window.ParsleyUI.addError(specificField, "myCustomError", 'Please add some description');
                    }

               }
               else{ 
                $('#q_loads').addClass('hide'); 
                 $('#ques_title').parsley().destroy();
                var specificField1 = $('#ques_title').parsley();
                window.ParsleyUI.addError(specificField1, "myCustomError", 'Question with same title exist');


               }
               
               /* $('#board_options').html('');
                $('#board_options').html( data );*/
                
               //$('#vpcheckout').submit();
             }
             
        });

      }
      else{
        $('#q_loads').addClass('hide'); 
        $('#ques_title').parsley().destroy();
        var specificField1 = $('#ques_title').parsley();
        window.ParsleyUI.addError(specificField1, "myCustomError", 'This field is required');

      }
       



  }); 

  $('.cancel').click(function(){
    $('input').val('');
    CKEDITOR.instances.editor1.setData('');
    $('#fqs').reset();
  });
     
  
});

</script>

{include file="/forum/footer.tpl" nocache} 
  {include file="common/footer-1.tpl" nocache}