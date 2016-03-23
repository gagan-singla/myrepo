<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="{$config.url}/css/bootstrap.css" />
<link rel="stylesheet" href="{$config.url}/css/style.css" />
<link rel="stylesheet" href="{$config.url}/css/parsley.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="{$config['externaljs']}ckeditor/ckeditor.js"></script>
<title>Community</title>
</head>

<body>
</div>
<style>
.main_wrapper {
    margin:0 !important;
}
.dropdown-menu {
  width: 100% !important; 
}
.axxxs{
	display:none;
}
.axxxs1{
	display:block;
	    float: right;
		margin-bottom:10px;
		    background-color: #000 !important;
    background-image: none !important;
}
</style>

<script>
$(function(){
  $('#search_ques').keydown(function(){
    var query = $('#search_ques').val();
    if(query != ''){
      $.ajax({
          type : 'POST',
          url  : '{$config.url}/forum/search_questions',
          data : { queries : query },
          success  : function(data)
          {
          
            if( data ){
              $(".av_query").html('');
              $(".av_query").append(data);
              $(".av_query").append("<li class='divider'></li><li><a href='{$config.url}/forum/questions'>Add a new question</a></li>");
              $('div.dropdown').addClass('open');
             
            }
            else{
             
              $('div.dropdown').removeClass('open');
              //alert('data is not there');
              //window.location.href = '{$config.url}/login';
            }
        }

      });
    }
    else{
       $('div.dropdown').removeClass('open');
       $('#btnApprovepo').removeClass('axxxs1');
    }
    
  });
  $('#btnApprovepo').click(function(){
    var query = $('#search_ques').val();
      window.location.href = '{$config.url}/forum/questions/?qst='+query
    
  });


  
}); 

</script>
<div class="container-fluid mjuszb4">

<div class="container">

<div class="col-md-12">
<div class="col-md-12 mjusd8">
<!-- <ul class="list-inline mjusd7">
    <li><a href="#">Community</a></li>
    <li><a href="#">Answer Center</a></li>
    <li><a href="#">Discussion Boards</a></li>
    <li><a href="#">Groups</a></li>
    <li><a href="#">Announcements</a></li>
    <li><a href="#">Seller Center</a></li>
    <li><a href="#"> Policies</a></li>
    <li><a href="#">Archives</a></li>
</ul> -->
</div>


<!-- <div class="col-md-12 mjuszb1">
<div class="col-md-6 padle">

<div class="col-md-8 mjusza7">
<div class="mjuszb2"><a href="#" class="mjusza8">Welcome! {$loged.first_name}</a></div>
  {if $loged.userid > 0}
  <a href="{$config.url}/login/logout" class="mjusza9">Sign Out</a>
  {else}
  <a href="{$config.url}/login" class="mjusza9">Sign In</a>
{/if}
<div>



</div>

</div>
</div>

<div class="col-md-6 text-right">
<a href="#"><img src="{$config.url}/images/forum/ico-facebook.png" /></a>
<a href="#"><img src="{$config.url}/images/forum/ico-google-plus.png" /></a>
<a href="#"><img src="{$config.url}/images/forum/ico-instagram.png" /></a>
<a href="#"><img src="{$config.url}/images/forum/ico-pinterest.png" /></a>
<a href="#"><img src="{$config.url}/images/forum/ico-twitter.png" /></a></div>
</div> -->


 <div class="col-md-12">

<div class="col-md-4 padle mjusza7">
<a href="{$config.url}/forum">
<img src="{$config.url}/images/forum/forma1.png" /> Discussion Board
</a>

</div>

<div class="col-md-8 mjusza7">
<div class="col-md-6 mjusza6">ASK A QUESTION, START A DISCUSSION</div>

<div class="col-md-6 mjusza7">

<div class="dropdown">
  <input type="text" id="search_ques" class="form-control mjusza5  dropdown-toggle" onkeypress="myFunction()" placeholder="Begin here to engage other community members" />
  <ul class="dropdown-menu av_query">
      <!-- <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a></li>
      <li><a href="#">JavaScript</a></li> -->
    </ul>
</div>
</div>
</div>


</div> 
<div class="col-md-12 text-right">
<a href="javascript:void(0);" class="btn btn-danger axxxs" id='btnApprovepo'>Continue</a>
</div>


<script>
function myFunction() {
	
   $("#btnApprovepo").addClass("axxxs1");
   
}
</script>
