{include file="/common/header-1.tpl" nocache}
<style type="text/css">
.dvPreview img{
  margin:10px;
}
.category ul{
  display:none;
}
.search_tbar {
	margin:0;
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
.pagination { 
margin:8px 0;
}
</style>
<div class="row shipwrap ">
<div class="daashbrd_cngpswd"><a href="/dashboard/my">Dashboard</a> &gt;&gt; Saved Searches</div>
<div class="col-md-3 txtfun3 padlef0 mobile_view">
{include file="left-profile-nav.tpl" nocache}
</div>
<div class="col-md-9 ship_tinf mobile_view">
 <div class="panel panel-default">
<div class="col-md-12 search_tbar">
  <div class="col-md-7 sbar_lbl">
    Saved Searches
      </div>
    </div>
  
  
  <div class="col-md-12 table-responsive">
  <table class="table stab">
  <tr>
  <th>Title</th>
  <th>Criteria</th>
  <th>Type</th>
  <th>Action</th>
  </tr>
  {foreach $searchlist as $key => $val}
  <tr>
  <td>
  <div class="stab2"> {$val.title}</div>
  <div class="stab3">Added {$val.added}</div>
  </td>
  <td>
  
  <div class="stab3"><a href="/search?{$val.url}&search={$val.searchtext}&tt=1">Go to this search result</a></div>
  </td>
  <td>
  
  <div class="stab2">Product</div>
  </td>
  <td><a href="javascript:void(0);"onclick="PopupBox('{$config.url}/dashboard/deletesearch/{$val.id}','Are you sure you want to delete this search?')">Delete</a></td>
  </tr>
  {/foreach}
  
  </table>
  {$pagination_html}

  
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