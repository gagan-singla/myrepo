{include file="/common/header-1.tpl" nocache}
 <link rel="stylesheet" type="text/css" href="{$config['externalcss']}searchitems_new.css" />
<div class="row shipwrap ">
<div class="daashbrd_cngpswd"><a href="/dashboard/my">Dashboard</a> &gt;&gt; Saved Search</div>
<div class="col-md-3 txtfun3 padlef0 mobile_view">
{include file="left-profile-nav.tpl" nocache}
</div>
<div class="col-md-9 ship_tinf mobile_view">
 <div class="panel panel-default">
<div class="col-md-12 search_tbar">
  <div class="col-md-7 sbar_lbl">
    Saved Search
      </div>
    </div>
  
  
  <div class="col-md-12">
    {if $searchlist|count <=  0}
    <div class="row mblue_box1 tno_bids"> No saved search yet </div>
    {else}
  <table class="table stab">
  <tr class="md_hide">
  <th>Title</th>
  <th>Criteria</th>
  <th>Type</th>
  <th>Action</th>
  </tr>

  {foreach $searchlist as $key => $val}
  <tr>
  <td data-label="Title" class="account_p_lbl">
	  <div>
		  <div class="stab2"> {$val.title}</div>
		  <div class="stab3">Added {$val.added}</div>
	  </div>
  </td>
  <td data-label="Criteria" class="account_p_lbl">
  
  <div class="stab3"><a href="/search?{$val.url}&search={$val.searchtext}&tt=1">Go to this search result</a></div>
  </td>
  <td data-label="Type" class="account_p_lbl">
  
  <div class="stab2">Product</div>
  </td>
  <td data-label="Action" class="account_p_lbl"><a href="javascript:void(0);"onclick="PopupBox('{$config.url}/dashboard/deletesearch/{$val.id}','Are you sure you want to delete this search?')">Delete</a></td>
  </tr>
  {/foreach}

  </table>

  {$pagination_html}
    {/if}
  
  <div class="col-md-12">
  <div class="col-md-7 col-sm-7"></div>
  <div class="col-md-3  col-sm-3 text-right" style="padding-top:10px; padding-right:0;"></div>

  </div>
</div>


<div style="clear:both;"></div>
</div>
</div>
</div>
{$disable_zip_popup = 1}
{include file="/common/footer-1.tpl" nocache} 
<script type="text/javascript">
$(function()
{
  
    //loadLocation('state',$('#states option[value="{$users.state}"]').val(),'{$users.city}');
  
  });</script>