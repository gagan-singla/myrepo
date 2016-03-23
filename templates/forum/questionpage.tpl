{include file="common/header-1.tpl" nocache}
{include file="/forum/header.tpl" nocache}
<script>
$(function(){
  $('.like_question').click(function(){
   
    var qid = $(this).data('qid');
     $(this).addClass('hidden');  
      $.ajax({
        type : 'POST',
        url  : '{$config.url}/forum/kudos_to_question',
        data : { quests : qid },
        success  : function(data)
        {
        
          if( data != 'failed' ){
           
           
            $('.liked_question').removeClass('hidden');
            var count  = parseInt($('span.kudo_count').html());
            count++;
            $('span.kudo_count').html('')
            $('span.kudo_count').html(count);

           
          }
          else{
            
            window.location.href = '{$config.url}/login';
          }
      }

    });
  
  });
  $('.liked_question').click(function(){
   
    var qid = $(this).data('qid');
     $(this).addClass('hidden');  
      $.ajax({
        type : 'POST',
        url  : '{$config.url}/forum/no_kudos_question',
        data : { quests : qid },
        success  : function(data)
        {
        
          if( data != 'failed' ){
           
           
            window.location.href = '{$config.url}/forum/questionpage/'+qid

           
          }
          else{
            
            window.location.href = '{$config.url}/login';
          }
      }

    });
  
  });
  $('.like_answer').click(function(){
   
    var qid = $(this).data('qid');
    var aid = $(this).data('aid');
     $(this).addClass('hidden');  
      $.ajax({
        type : 'POST',
        url  : '{$config.url}/forum/kudos_to_answer',
        data : { quests : qid,ansid : aid },
        success  : function(data)
        {
        
          if( data != 'failed' ){
           
           
            $('.liked_answer'+aid).removeClass('hidden');
            var count  = parseInt($('span.kudoans'+aid).html());
            count++;
            $('span.kudoans'+aid).html('')
            $('span.kudoans'+aid).html(count);

           
          }
          else{
            
            window.location.href = '{$config.url}/login';
          }
      }

    });
  
  });

  $('.liked_answer').click(function(){
   
    var qid = $(this).data('qid');
    var aid = $(this).data('aid');
     
      $.ajax({
        type : 'POST',
        url  : '{$config.url}/forum/no_kudos_answer',
        data : { quests : qid,ansid : aid },
        success  : function(data)
        {
        
          if( data != 'failed' ){
           
           
            window.location.href = '{$config.url}/forum/questionpage/'+qid

           
          }
          else{
            
            window.location.href = '{$config.url}/login';
          }
      }

    });
  
  });

  $('a.accept_ans').click(function(){
   
    var qid = $(this).data('qid');
    var aid = $(this).data('aid');
     
      $.ajax({
        type : 'POST',
        url  : '{$config.url}/forum/accept_solution',
        data : { quests : qid,ansid : aid },
        success  : function(data)
        {
        
          if( data != 'failed' ){
           
            $('.q_solved').removeClass('hidden');
            $('.a_solved').removeClass('hidden');

            window.location.href = '{$config.url}/forum/questionpage/'+qid
           
          }
          else{
            
            window.location.href = '{$config.url}/login';
          }
      }

    });
  
  });
  $('a.reject_ans').click(function(){
   
    var qid = $(this).data('qid');
    var aid = $(this).data('aid');
     
      $.ajax({
        type : 'POST',
        url  : '{$config.url}/forum/reject_solution',
        data : { quests : qid,ansid : aid },
        success  : function(data)
        {
        
          if( data != 'failed' ){
           
            window.location.href = '{$config.url}/forum/questionpage/'+qid
           
          }
          else{
            
            window.location.href = '{$config.url}/login';
          }
      }

    });
  
  });


});
</script>
<div class="col-md-12 mjusza1">
<img src="{$config.url}/images/forum/icon-question-inquiry.png" /> <a href="#" class="bordse8">{$questions.catname}</a>
</div>

<div class="col-md-12">
<div class="col-md-12 bordsez7">
<div class="col-md-10">

<!-- <select class="bordsez6">
<option>Options</option>
<option>as</option>
<option>as</option>
<option>as</option>
</select>
 -->
</div>
<div class="col-md-2"><a href="{$config.url}/forum/questions"><button type="button" class="btn btn-primary" >New Question</button></a></div>
</div>

<div class="col-md-12 bordsez3">
<div class="col-md-1 hidden padle q_solved"><img id="imageupload" src="{$config.url}/images/forum/solved.png" title="Solved" class="img-responsive"> </div>
  {if $questions.solution == 1}
  <div class="col-md-1 padle"><img id="imageupload" src="{$config.url}/images/forum/solved.png" title="Solved" class="img-responsive"></div>
  {/if}
<div class="col-md-12"><strong>{$questions.title}</strong></div>
<!-- <div class="col-md-12 mbtnm_10">[New]</div>
 -->
<div class="col-md-12">
<div class="col-md-1 padle"><img id="imageupload" src="{if $questions.avatar == ''} {$config['imgpath']}no_img.png {else if $questions.avatar != ''}{$config['url']}/uploads/profile/{$questions.avatar}{/if}" title="No Photo" class="img-responsive"></div>
<div class="col-md-11">
<div class="easp1 text-right"><!-- <a href="#">Report Inappropriate Content</a> --></div>
<div class="easp1"><a href="#" class="bordsez2">{$questions.first_name} {$questions.last_name}</a> <!-- ( <a href="#">4</a> ) --> <!-- <a href="#">View Listings</a> --></div>

<div class="easp1 bordsez1">Community Member | Post:{$questions.post_count} | Registered: {$questions.created_at}</div>
<div class="easp1">on <span class="bordsez1">{$questions.date_added}</span></div>
<div class="mbtnm_10">
  {$questions.description}
  {if $questions.image}
    <img class="img-responsive" src="{$config['url']}/uploads/forum/{$questions.image}" style="width:150px;"/>
  {/if}
</div></div></div>


<div class="col-md-12">
<!-- <div class="col-md-2"><a href="#" style="color:#666"><img src="{$config.url}/images/forum/kodaos3.png" /> Options</a></div>
 -->
 {if $questions.uid == $uid}
 <div class="col-md-2"><a href="{$config.url}/forum/equestions/{$qid}">Edit</a></div>
 {/if}
 {if $questions.uid != $uid}
  <div class="col-md-2">&nbsp;</div>
 {/if}

 <div class="col-md-6">&nbsp;</div>
<!-- <div class="col-md-1 padall">51 Views</div>
<div class="col-md-2"><a href="#">Comments (0)</a></div> -->
<div class="col-md-1 padle"><a href="#">
  <span class="kudo_count">{if $kudo_count > 0} 
    {$kudo_count} {else} 0 {/if}
  </span> kudos</a></div>
{$reviewcount = 0}

  {foreach $allkudos as $key => $val}   
    {$reviewcount = 1}
    {if $val.uid == $uid}

      <div class="col-md-1 padle liked_question" data-qid="{$qid}"><a href="javascript:void(0);"><img src="{$config.url}/images/forum/kodoed.png" class="img-responsive" /></a></div>
    {/if}
  {/foreach}
  {if $reviewcount ==0 or !$uid}
      <div class="col-md-1 padle like_question" data-qid="{$qid}" ><a href="javascript:void(0);"><img src="{$config.url}/images/forum/kodaos1.png" class="img-responsive" /></a></div>
      <div class="col-md-1 padle hidden liked_question" data-qid="{$qid}"><a href="javascript:void(0);"><img src="{$config.url}/images/forum/kodoed.png" class="img-responsive" /></a></div>
  {/if}


<div class="col-md-1 padle "><a href="{$config.url}/forum/answers/{$qid}"><img src="{$config.url}/images/forum/kodaos2.png" class="img-responsive" /></a></div>
</div>

</div>

<div class="col-md-12 bordsez4">
Answers
</div>

<div class="col-md-12 bordsez7">
<!-- Sort by: <select class="bordsez6">
<option>Most Kudos</option>
<option>as</option>
<option>as</option>
<option>as</option>
</select>
</div> -->

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
  <div class="easp1"><a href="#">in reply to</a> {$questions.first_name} {$questions.last_name} on <span class="bordsez1">{$answer.date_added}</span></div>
  <div class="bordsez5">

  			
  				{$answer.description}
  				
  			{if $answer.image}
        <img class="img-responsive" src="{$config['url']}/uploads/forum/{$answer.image}" style="width:150px;"/>
        {/if}
              
              
              
              
  		</div></div>
  </div>


  <div class="col-md-12">
  <!-- <div class="col-md-2"><a href="#" style="color:#666"><img src="{$config.url}/images/forum/kodaos3.png" /> Options</a></div>
  <div class="col-md-4 padall">51 Views</div> -->
  
  <!-- <div class="col-md-1 padle"><a href="#">Permalink</a></div> -->
  <div class="col-md-6 padle"><a href="#">&nbsp;</a></div>
  {if $questions.solution == 0 && $questions.uid == $uid}
    <div class="col-md-2"><a href="javascript:void(0);" class="accept_ans" data-qid="{$qid}" data-aid="{$answer.id}" >Accept Answer</a></div>
  {/if} 
  {if $questions.uid == $uid && $answer.solution == 1}
    <div class="col-md-2"><a href="javascript:void(0);" class="reject_ans" data-qid="{$qid}" data-aid="{$answer.id}" >Reject Answer</a></div>
  {/if}
  {if $questions.uid != $uid || $answer.solution != 1 || $questions.solution == 0} 
     <div class="col-md-2">&nbsp;</div>
  {/if}




  <div class="col-md-2 padle"> <span class="kudo_anscount kudoans{$answer.id}">{$answer.kudos}</span> Kudos</div>
  {$reviewcount2 = 0}

  {foreach $ans_kudo as $keys => $vals}
  
  {if $vals.ansid == $answer.id && $vals.uid == $uid}
  
  {$reviewcount2 = 1}
      <div class="col-md-1 padle liked_answer{$answer.id} liked_answer" data-qid="{$qid}" data-aid="{$answer.id}"><a href="javascript:void(0);"><img src="{$config.url}/images/forum/kodoed.png" class="img-responsive" /></a></div>
  {/if}
  {/foreach}
  {if $reviewcount2 ==0 or !$uid}

     <div class="col-md-1 padle like_answer" data-qid="{$qid}" data-aid="{$answer.id}" ><a href="javascript:void(0);"><img src="{$config.url}/images/forum/kodaos1.png" class="img-responsive" /></a></div>
        <div class="col-md-1 padle hidden liked_answer{$answer.id} liked_answer" data-qid="{$qid}" data-aid="{$answer.id}"><a href="javascript:void(0);"><img src="{$config.url}/images/forum/kodoed.png" class="img-responsive" /></a></div>
  {/if}

  </div>
  </div>
  </div>
  {/foreach}
      <div class="pull-right">
        {$pagination_html}
      </div>
  {else}
   <div class="col-md-12 bordsez3"> No Answers </div>

{/if}



</div>
</div>
</div></div>



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

<div class="col-md-12 mbtnm_10">
<div class="mbtnm_10"><b>Subject</b></div>
<div><input type="text" class="form-control" placeholder="enter the subject"></div>
</div>
<div class="col-md-12">
<div class="col-md-12 mbtnm_10 padle">
<div class="mbtnm_10"><b>Body</b></div>
<div><img src="{$config.url}/images/forum/textediter.png" class="img-responsive"></div>

</div></div></div>

<div class="col-md-12 bordsel8">
<div class="col-md-12">
<div class="mbtnm_10"><b>Attachments</b></div>
<div><input class="bordsel6" accept="*" multiple="multiple" id="multipleUpload" name="multipleUpload" type="file"></div>
</div>

</div>
<div class="col-md-12 bordsel7 mbtnm_10">
<button type="button" class="btn btn-default">Cancel</button>
<button type="button" class="btn btn-default">Post</button>
</div>
</div>

<div style="clear:both"></div>

    </div>
  </div>
</div>
{include file="/forum/footer.tpl" nocache} 
  {include file="common/footer-1.tpl" nocache}