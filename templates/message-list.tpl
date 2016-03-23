<style>



@-moz-document url-prefix() { 

  .del_chk{
   transform: scale(1.6) !important;
}

}
.del_chk{
    border: 1px solid #b5c1c7 !important;
    height: 20px !important;
    width: 20px !important;
    top: 5px;
	
}

.panel-default > .panel-heading {
   
    background-image: linear-gradient(to top, #CB1F25, #CB1F25) !important;    
	    padding-top: 13px !important;
    padding-bottom: 0px !important;
}
.botbor {
    border-bottom: 1px solid #ccc;
    background: #f5f5f5; 
}
.acremb1{
	padding-right: 8px;
    color: #ccc !important;
}
.mail5 {
    background: transparent;
    padding-bottom: 8px;
    padding-top: 8px;
    color: #000;
}
.acrrrwa1{
    color: #CB1F25 !important;
}

</style>

<div class="col-md-3 txtfun3 padlef0 mobile_view pull-left  pull-right">
    <div class="col-md-12">&nbsp;</div>
    <div class="col-md-12">&nbsp;</div>
    <div class="col-md-12">&nbsp;</div>
    <div class="clear">
        <ul id="mesmenu">
            <li><a href="{$config.url}/dashboard/messages/inbox" class="acrrrwa1"><span class="glyphicon glyphicon-download-alt"
                                                                       aria-hidden="true"></span> <span>Inbox
                ({$unreadmessage}) </span></a></li>
            <li><a href="{$config.url}/dashboard/messages/sent"><span class="glyphicon glyphicon-inbox"
                                                                      aria-hidden="true"></span> Sent</a></li>
            <li><a href="{$config.url}/dashboard/messages/archive"><span class="glyphicon glyphicon-folder-open"
                                                                         aria-hidden="true"></span> Archive</a></li>                                                           
            <li><a href="{$config.url}/dashboard/messages/delete"><span class="glyphicon glyphicon-trash"
                                                                        aria-hidden="true"></span> Delete Messages</a>
            </li>

        </ul>

    </div>

    {include file="adwords.tpl" nocache}

</div>



<div class="col-md-9 mobile_view">
    <div class="success_mdg bg bg-success" style="display:none"><i class="fa fa-warning"></i>Record has been deleted
        sucessfully
    </div>
    <div class="selft26"><a href="/dashboard/mybids" style="color: #1688ad;">Dashboard &gt;&gt; </a> <a
            href="{$config.url}/dashboard/messages" style="color: #a2a2a2;">Messages</a></div>
    <!--div class="red2b1" style="color: #000;">Message</div-->
    <form action="{$config.url}/dashboard/messages" method="post" id="messageList" onsubmit="return validateMsg();">
        <input type="hidden" value="{if $action != ''}{$action} {else}inbox{/if}" name="action" id="action">

        <div class="mail5">
            <div class="pull-left mail6" style="text-transform: capitalize">{if $action != ''}{$action} {else} inbox {/if}  </div>
            <div class="pull-right">

                <a class="btn btn-default mail4" onclick="validateMsg();" href="#" role="button">

                 {if ($action == 'delete')}
                    <span class="fa fa-undo" aria-hidden="true"></span> UnDelete</a>
                    <input type='hidden' name='del_action' id="del_action" value='undelete'>
             {else}  
                 <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</a>
                 <input type='hidden' name='del_action'  id="del_action" value='delete'>
                 {/if}

                <!--a class="btn btn-default mail4" href="#" role="button"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> Archive</a-->
            </div>
            <div class="clear"></div>
        </div>

        <div role="tabpanel" class="tab-pane active" id="home" style="border-radius:0px;">


            <div class="panel panel-default msg_trwrap">
                <div class=" panel-heading  md_hide">
                    <div class="row">
                    <div class="col-md-1 " data-label="Select"><label class="option srch_olbl">
                            <input type="checkbox" id="selectall" name="selectall" class="del_chk"> <span class="checkbox"></span></label></div>
                        <div class="col-md-4">From</div>
                        <div class="col-md-7">Subject</div>
                        
                    </div>
                </div>
                <input type="hidden" name="action" class="del_chk" value="{if $action == 'delete'}undelete{else}delete{/if}"/>

                <div class=" panel-heading md_show">
                    <div data-label="Select All" class="col-md-2 ds active account_p_lbl">

                        <label class="option srch_olbl">
                            <input type="checkbox" name="msg_sel"/>
                            <span class="checkbox" onclick="msg_selct()"></span>
                        </label>
                    </div>
                </div>
                <div class="botbor" style="height:0;"></div>
                {if $messages|count <= 0}
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-12" style="text-align:center;"> No Messages Found</div>
                    </div>
                </div>
                {else}

                <div class="panel-body">
                    {foreach $messages as $key => $val}
                    <div class="row msg_rowc">
                    
                    <div data-label="Select" class="col-md-1 ds account_p_lbl " style="padding-top:10px;">
                            <label class="option srch_olbl">
                                <!--<input type="checkbox"  name="del[]" id="del" value="{$val.r_id}" data-parsley-multiple="del"
                      {if $key == 0}data-parsley-mincheck="1"{/if} data-parsley-required data-parsley-message="please select one" />-->
                        
                            {if ($val.from_id == $loged.userid and $val.from_status == 'delete') || ($val.to_id ==
                            $loged.userid and $val.to_status == 'delete')}
                            <label class="option srch_olbl">
                                <input type="checkbox" name="del[]" id="del" value="{$val.id}"
                                       data-parsley-multiple="del"
                                       {if $key== 0}data-parsley-mincheck="1" {/if} data-parsley-required
                                data-parsley-message="please select one" />
                                <span class="checkbox"></span>
                            </label>
                            {else if ($val.from_id == $loged.userid and $val.from_status != 'delete') or ($val.to_id ==
                            $loged.userid and $val.to_status != 'delete')}

                                <label class="option srch_olbl">
                                <input type="checkbox" name="del[]" id="del" value="{$val.id}"
                                       data-parsley-multiple="del"
                                       {if $key== 0}data-parsley-mincheck="1" {/if} data-parsley-required
                                data-parsley-message="please select one" />
                                <span class="checkbox"></span>
                            </label>
                            {/if}
                        </div>
                    

                        <div data-label="From" class="col-md-4 account_p_lbl">

                            {if $loged.userid == $val.from_id}

                            <img class="mail2"
                                 src="{if $val.tavatar == ''} {$config['imgpath']}no_img.png {else if $val.tavatar != ''}{$config['url']}/uploads/profile/{$val.tavatar}{/if}"
                                 title="No Photo" alt="no_img"/>
                            {$val.tname}
                            {else if $loged.userid != $val.from_id}
                            <img class="mail2"
                                 src="{if $val.favatar == ''} {$config['imgpath']}no_img.png {else if $val.favatar != ''}{$config['url']}/uploads/profile/{$val.favatar}{/if}"
                                 title="No Photo" alt="no_img"/>
                            {$val.fname}{/if}
                        </div>

                        <div data-label="Subject" class="col-md-7 account_p_lbl" style="padding-top:10px;"><a
                                href="{$config.url}/dashboard/messages/view/{$val.r_id}">{$val.subject}</a></div>

                        
                    </div>
                    <div class="row botbor"></div>
                    {/foreach}
                </div>
                {/if}
            </div>
            <div class="row">
                <div class="col-md-6">
                    <!--input type="submit" class="btn btn-danger" value="{if $action == 'delete'}Undelete{else}Delete{/if}"-->
                </div>
                <div class="col-md-6 text-right">{$pagination_html}</div>
            </div>


        </div>
    </form>
</div>

<script>
    function conformation() {
        var conformation = confirm("Are you sure, you want to delete this message?");
        return conformation;
    }
</script>
<style type="text/css">
.txtfun3 ul li:hover a {
    background: transparent !important;
}
    .pagination {
        margin: 0;
    }

    .panel-default > .panel-heading {
        color: #fff;
       
    }

    .panel {
        border-radius: 0px;
    }

    .panel-body {
        padding-top: 0;
        padding-bottom: 0;
    }

    /*.panel-body .row:nth-child(odd){
      background-color: #F9F3ED !important;
    }*/
    .msg_rowc {
        font-size: 14px;
        border-bottom: 1px solid #ccc;

    }

    .msg_rowc a {
        font-size: 14px;
        color: #000;
    }

    .msg_rowc a:hover {
        text-decoration: underline;
    }

    .botbor {
        border-bottom: 1px solid #ccc;
        background: #f5f5f5;
        height: 4px;
    }

    .panel-default {
        border-color: #ccc;
    }

</style>