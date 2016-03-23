{include file="common/header-1.tpl" nocache}
<link rel="stylesheet" type="text/css" href="{$config['externalcss']}ds-forms.css" />
<style>
.selft26 {
  font-size: 20px;
    padding-bottom: 20px;
	 padding-top: 10px;
}
.txtfun3 ul li {
  background: #616161;
}
.txtfun3 ul li a {
  color: #fff;
}
.txtfun3 ul li a:hover, .txtfun3 ul li:hover, .txtfun3 ul li:hover a{
	 background: #3bc8dd;
}
.mestest {
	background: #3bc8dd !important;
}
 
</style>
<div class=" ">
<div class="row sellp1">


{include file="message-list.tpl" nocache}
</div>
</div>
{include file="common/footer-1.tpl" nocache} 
<script language="javascript" type="text/javascript">
$(function(){
	$('input[name="msg_sel"]').on('change',function(){
		console.log($(this).is(":checked"));
		if($(this).is(":checked"))
		  {
		  	$('input[name="del[]"]').prop('checked',true);
		  }	
		  else
		  {
		  	$('input[name="del[]"]').prop('checked',false);
		  }	
	});
	$('input[name="del[]"]').on('change',function(){
		console.log($(this).is(":checked"));
		if(!$(this).is(":checked"))
		  {
		  	$('input[name="msg_sel"]').prop('checked',false);
		  }	
	})
})
function msg_selct()
{
 
}
function validateMsg()
{
 var i = 1;	
 $('#messageList input[type="checkbox"]').each(function(){

    if($(this).is(':checked'))
    {
    	$i++;
    }	

 });
 if(i == 1)
 {
 	alert('Please select atleast one message');
 	return false;
 }	
}
</script>


<!--<script>

 $(function () {

            $("#mesmenu li:first-child").addClass("mestest");
            $('#mesmenu li').click(function () {
                $('#mesmenu li').removeClass('mestest');
                $(this).addClass('mestest');
            });
			 
        });
		
		</script>-->