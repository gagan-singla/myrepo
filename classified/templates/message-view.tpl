{include file="common/header-1.tpl" nocache}
<div class="main_container">
  <div class="row dashboard">
    <div class="dash_brd" style="padding-left: 5px;color: #000;"><a href="{$config.url}/dashboard/messages" style="color: #000;">My Messages </a>&gt;&gt;</div>
    <div class="check_wrapper panel panel-default">
      <div class="panel-heading">{$messages[0].subject}</div>
      <div class="row total_shipin">
        
        <div class="pull-right">
          {if ($messages[0].from_id == $loged.userid and $messages[0].from_status == 'archive')}<a href="{$config.url}/dashboard/messages/unarchive/{$r_id}" class="mblue_txt">UnArchive</a>

        {elseif ($messages[0].to_id == $loged.userid and $messages[0].to_status == 'archive')}<a href="{$config.url}/dashboard/messages/unarchive/{$r_id}" class="mblue_txt">UnArchive</a>

        {else}
         <a href="{$config.url}/dashboard/messages/archive/{$r_id}" class="mblue_txt">Move to Archive</a> | 
        {/if}

          {if $messages[0].from_id == $loged.userid and $messages[0].from_status == 'delete'} 
          <a href="{$config.url}/dashboard/messages/undelete/{$r_id}" class="mblue_txt">Undelete</a>
          
          {elseif $messages[0].to_id == $loged.userid and $messages[0].to_status == 'delete'}
           <a href="{$config.url}/dashboard/messages/undelete/{$r_id}" class="mblue_txt">Undelete</a>
         
          {else}
           <a  onclick="confirmaction('{$r_id}')" class="mblue_txt" style=" cursor:pointer">Delete</a>
          {/if}
        </div>
      </div>
      <div class="row total_shipin">
        <div class="col-md-12">
          <div class="mwb_lbl padd20"> {foreach $messages as $key => $val}
            <div class="row"> {$val.fname}{if $val.read == 0 and $val.to_id == $loged.userid} <span class="orange text text-danger">(New)</span>{/if} <b>{if $val.to_id != $loged.userid} Sent on {/if}{if $val.to_id == $loged.userid} Received on {/if} {$val.date_add}</b> <br /><br />
              {$val.message}
              </div>
             <hr /> 
            {/foreach}
            <form action="{$config.url}/dashboard/messages/save"  method="POST" enctype="multipart/form-data" class="admin_form" data-parsley-validate>
              <input type="hidden" value="{$r_id}" name="r_id">
              <div class="row">
                <div class="col-md-12">
                  <textarea name="message" id="product_info" data-parsley-group="block1" required class="form-control" data-parsley-maxlength="500" data-parsley-length="[50, 500]" value="" onkeyup="limitlengths(this, 500,'product_info_label')"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3  m-top-10 padding-20">
                  <input type="submit" name="submit" value="Send" class="btn btn-primary">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{include file="common/footer-1.tpl" nocache} 
<script>
function confirmaction(id) {
    if (confirm("Are you sure you want to delete it?") == true) {
        window.location.href = '/dashboard/messages/delete/'+id
    }
}
</script>