{include file="common/header-1.tpl" nocache}
<link rel="stylesheet" type="text/css" href="{$config['externalcss']}ds-forms.css" />
<style>
.selft26 {
  font-size: 20px;
    padding-bottom: 20px;
	 padding-top: 10px;
}
.txtfun3 ul li {
    background-image: linear-gradient(to top, #BFBFBF, #E6E5E5);
    border-radius: 5px;
}

@media screen and (-webkit-min-device-pixel-ratio:0) { 
    
    ::i-block-chrome,.txtfun3 ul li {
background-image:none;
background-color:#acacac;
}
}




.txtfun3 ul li a {
    color: #6E6E6E;
    font-size: 16px;
}
.txtfun3 ul li:hover a {
   background-image: linear-gradient(to top, #BFBFBF, #E6E5E5);
    border-radius: 5px;
}
.txtfun3 ul li a:hover, .txtfun3 ul li:hover, .txtfun3 ul li:hover a{
	background-image: linear-gradient(to top, #BFBFBF, #E6E5E5);
    border-radius: 5px;
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
	$("#messageList").trigger('reset'); 
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


	var delchk = $('input[name="del[]"]');
	$('#selectall').click(function(event) {
		if(this.checked) {
			$(delchk).each(function() {
				this.checked = true;
			});
		}else{
			$(delchk).each(function() {
				this.checked = false;
			});
		}
	});

	$(delchk).click(function(event) {
		if (this.checked) {
			$('#selectall').prop('checked', false);
		} else {
			$('#selectall').prop('checked', false)

		}
	});


});
function msg_selct()
{
 
}
function validateMsg()
{
 var i = 1;	
 $('#messageList input[type="checkbox"]').each(function(){

    if($(this).is(':checked'))
    {
    	i++;
    }	

 });
 if(i == 1)
 {
 	alert('Please select atleast one message');
 	return false;
 }else if (confirm("Are you sure, you want to delete?") == true) {
 		var del_action = $('#del_action').val();
	 	var action = $('#action').val();
		 $.ajax({
			 type: 'POST',
			 url: '/dashboard/messages/'+del_action+'/'+action,
			 data: $('#messageList').serialize() + '&ajax=1',
			 dataType: 'json',
			 success: function (data) {
				console.log(data);
				if(del_action == 'delete'){
				 alert("Messages has been deleted successfully");
				}else{
					alert("Messages has been undeleted successfully");
				}
				 location.reload();
			 }
		 });
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