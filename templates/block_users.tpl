{include file="/common/header-1.tpl" nocache}
<style>
.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td{
      border-top: none;
}
.table-responsive {
  overflow-x:visible;
    padding-bottom: 20px;
  padding-top: 20px;
  
}
.stab {
  border:1px solid #ccc;
  line-height:26px;
}
.stab th {
  background: #e9e9e8;
}
.stab2 {
  color:#000;
  line-height:24px;
}
.stab3 {
  color:#999;
  font-size:12px;
  line-height:24px;
}
.stab3 a {
}
.stab2 th {
  background: #f3f3f3;
  padding-left:25px !important;
}
.stab2 td {
  border-top:none !important;
  padding-left:25px !important;
}
.dropdown-menu{
  width:100% !important;
}

</style>

<script type="text/javascript">

$(document).ready(function(){
  var yourmail = '{$your_mailid}';
  
  {literal}

  $( "#block_mail" ).keydown(function() {
      var mailid =  $('#block_mail').val();
      $('.dropdown').removeClass('open');
       $.ajax({
             type:'POST',
             url:'/dashboard/getmailids',
             data : { bid : mailid },
             success: function (data)
             {

                  $('.dropdown').addClass('open');
                  $('.dropdown-menus').html('');
                  $('.dropdown-menus').html( data );

              }

        });


  });

  $(".dropdown-menus").on('click',"li a",function(e){
      $('#block_mail').val( $(this).html() );
      $('.dropdown').removeClass('open');
  });
    
    
  $("#submit_id").click(function(e){
    e.preventDefault();
   var mailid =  $('#block_mail').val(); 
    if(mailid == yourmail){
      e.preventDefault();
      alert("Sorry, You cant block yourself");
      $('#block_mail').val('');
      return false;
    }
    else{
    $.ajax({
             type:'POST',
             url:'/dashboard/checkid',
             data : { bid : mailid },
             success: function (data)
             {
               
                if( data == "blocked" ){
                  alert("User is already blocked");
                }
                else{

                  $.ajax({
                     type:'POST',
                     url:'/dashboard/check_if_exist',
                     data : { bid : mailid },
                     success: function ( response )
                     {

                        if( response == "exist" ){
                          
                          $('#block_users').submit();
                        }
                        else{
                          alert("User id does not exist");
                        }
                     }

                  });
                  
                }
                
               //$('#vpcheckout').submit();
             }
             
          });

      }
    
  });
  $('#notified').click(function(){
    alert("Your Settings Are Saved");
    return true;

  });
{/literal}  
});
</script>


<div class="container">

<div class="col-md-12">
<div class="col-sm-3 col-xs-12 txtfun3 padlef0 mobile_view">
<div class="daashbrd_cngpswd" style="padding-top:10px;"><a href="/dashboard/my" class="clrr">Dashboard</a> &gt;&gt; Notification</div>

 {include file="left-profile-nav.tpl" nocache} </div>

<div class="col-md-9 ionoti3">

<div class="col-md-12 ionoti2">The Seller can block users from contacting him or buy/bid his product. For that he has to add the user's email here.</div>

<div class="col-md-12 ionoti1">
<div class="col-md-3 ionoti7">Block Users</div>
<form action="{$config['url']}/dashboard/blockids" method="post" id="block_users" data-parsley-validate>
<div class="col-md-5">
<div class="dropdown">
<input type="email" class="form-control" name="block_mail" id="block_mail" placeholder="Block Users" required autocomplete="off">
  <ul class="dropdown-menu dropdown-menus col-md-12" role="menu" aria-labelledby="menu1">
      
  </ul>
</div>
</div>
<div class="col-md-2"><button type="submit" class="btn btn-default" id="submit_id">Block</button></div>
</form>
</div>




<!-- <div class="col-md-12 ionoti2">
  <div>Show specific user type</div>
  <div>
  <label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked="checked"> All Type
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> Buyer
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> Seller
</label>
</div>
  </div> -->

<div class="col-md-12 table-responsive">

<div class=" table-responsive">
  <table class="table stab stab2">
  <tr style="font-weight: bold;">
    <th>User id</th>
    <th>Name</th>
    <th>Email</th>
    <th>Unblock</th>
  
  </tr>
  
  {$reviewcount = 0}
  {foreach $blocked as $key => $val}   
  {$reviewcount = 1}
  <tr>
    
    <td>{$val.userid}</td>
    <td>{$val.first_name} {$val.last_name}</td>
    <td>{$val.email}</td>
    <td><a href="javascript:void(0);" class="unblock" onclick='PopupBox2("{$config.url}/dashboard/unblock/{$val.blockid}");'>Unblock</a></td>
  </tr>
{/foreach}
{if $reviewcount ==0}
   <tr>
       <td colspan="5">
         No users are blocked !!
       </td>
   </tr>
{/if}
  
  </table>
    <div class="pull-right">
      {$pagination_html}
    </div>
</div>

</div>
</div>

</div>
{$disable_zip_popup = 1}
{include file="/common/footer-1.tpl" nocache} 

