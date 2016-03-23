

<div class="col-md-3 txtfun3 padlef0 mobile_view">
<div class="col-md-12">&nbsp;</div>
<div class="col-md-12">&nbsp;</div>
<div class="col-md-12">&nbsp;</div>
<div class="clear">
<ul id="mesmenu">
<li><a href="{$config.url}/dashboard/messages/inbox" ><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Inbox ({$unreadmessage})</a></li>
<li><a href="{$config.url}/dashboard/messages/sent" >Sent</a></li>
<li><a href="{$config.url}/dashboard/messages/archive" >Archive</a></li>
<li><a href="{$config.url}/dashboard/messages/delete" >Delete Messages</a></li> 
</ul>
</div>
</div>


<div class="col-md-9 mobile_view" >
<div class="selft26"><a href="/dashboard/mybids" style="color: #1688ad;">Dashboard</a> &gt;&gt; <a href="{$config.url}/dashboard/messages" style="color: #a2a2a2;">Messages</a></div>
<!--div class="red2b1" style="color: #000;">Message</div--> 
  <div role="tabpanel" class="tab-pane active" id="home" style="margin-top: 3px;"> 
  
  
  <form action="{$config.url}/dashboard/messages" method="post" id="messageList" onsubmit="return validateMsg();">
    <div class="panel panel-default msg_trwrap">
    <div class=" panel-heading  md_hide">
		<div class="row">
            
            <div class="col-md-6">Subject</div>
            <div class="col-md-4">From</div>
            <div class="col-md-2 ">Delete	</div>
        </div>
	</div>
           <input type="hidden" name="action" value="{if $action == 'delete'}undelete{else}delete{/if}" />
		   <div class=" panel-heading md_show">
           <div  data-label="Select All" class="col-md-2 ds active account_p_lbl">
            
			<label class="option srch_olbl">
					<input type="checkbox"  name="msg_sel"  />
				   <span class="checkbox" onclick="msg_selct()"></span>       
               </label>
			</div>
			</div>
			
			 {if  $messages|count <=  0}
		 <div class="panel-body">
         <div class="row">
          <div class="col-md-12" style="text-align:center;"> No Messages Found </div>
        </div>
		</div>
        {else}
			
			<div class="panel-body">
           {foreach $messages as $key => $val}
		    <div class="row msg_rowc">
			   
		  
			<div  data-label="Subject" class="col-md-6 account_p_lbl"><a href="{$config.url}/dashboard/messages/view/{$val.r_id}">{$val.subject}</a></div>
            <div data-label="From"class="col-md-4 account_p_lbl">{if $loged.userid == $val.from_id} {$val.tname} {else if $loged.userid != $val.from_id} {$val.fname}{/if}</div>
            <div data-label="Select" class="col-md-2 ds account_p_lbl ">
			   <label class="option srch_olbl">
						<input type="checkbox"  name="del[]" id="del" value="{$val.r_id}" data-parsley-multiple="del" 
			  {if $key == 0}data-parsley-mincheck="1"{/if} data-parsley-required data-parsley-message="please select one" />
					   <span class="checkbox"></span>       
				</label>
				 {if ($val.from_id == $loged.userid and $val.from_status == 'delete') or ($val.to_id == $loged.userid and $val.to_status == 'delete')}
		   <div data-label="Action" class="account_p_lbl">
		   <a href="{$config.url}/dashboard/messages/undelete/{$val.r_id}"><i class="fa fa-undo"></i></a> </div>{else if ($val.from_id == $loged.userid and $val.from_status != 'delete') or ($val.to_id == $loged.userid and $val.to_status != 'delete')} 
		  
		   {/if}
			</div>
          </div>
 {/foreach}
 </div>
 {/if}
 </div>
	<div class="row">
		<div class="col-md-6">
			<input type="submit" class="btn btn-danger" value="{if $action == 'delete'}Undelete{else}Delete{/if}">
		</div>
		<div class="col-md-6 text-right">{$pagination_html}</div>
	</div>
</form>
  
  
  
  
   </div>
</div> 





     <style type="text/css">
	 .pagination {
		 margin:0;
	 }
	 .panel-default > .panel-heading {
  color: #fff;
  background-color: #666;
  border-color: #ddd;
}
.panel-body  {
	padding-top:0;
	padding-bottom:0;
}
.panel-body .row:nth-child(odd){
  background-color: #F9F3ED !important;
}
.msg_rowc {
	font-size:14px;
	
}
.msg_rowc a {
	font-size:14px;
	color:#000;
}
.msg_rowc a:hover {
	text-decoration:underline;
}
	 </style>