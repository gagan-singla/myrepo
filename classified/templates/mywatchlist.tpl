{include file="common/header-1.tpl" nocache}

  <!--<div class="col-md-3"> {include file="left-nav-dashboard.tpl" nocache} </div>--> 
  
  {if $save}
  <div style="margin-top:1%;">
    <div class="bg bg-success padding-20"> <i class="fa fa-warning"></i> Watchlist Successfully Deleted!. </div>
  </div>
  {/if}
  <div class="col-md-12" style="min-height: 370px;">
    <div class="mywatch2">My Watchlist</div> 
    <div class="panel panel-default msg_trwrap">
    <div class=" panel-heading  md_hide">
		<div class="row">
          <div class="col-md-2">Image</div>
          <div class="col-md-4">Title</div>
          <div class="col-md-4">End Time </div>
          <div class="col-md-2">Delete</div>
        </div>
	</div>
	
         {if $mywatchlist|count <=  0}
		 <div class="panel-body">
         <div class="row">
          <div class="col-md-12" style="text-align:center;"> No Watchlist Items Found </div>
        </div>
		</div>
        {else}
		 <div class="panel-body">
            {foreach $mywatchlist as $key => $val}
           <div class="row" style="margin-bottom: 10px;">
          <div  data-label="Image" class="col-md-2 account_p_lbl"><a href="{$config['url']}/product/view/{$val.id}"><img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" title="{$val.title}" width="65" height="65"></a></div>
          <div  data-label="Title" class="col-md-4 account_p_lbl"><a href="{$config['url']}/product/view/{$val.id}" title="{$val.ptitle}"> {$val.title}</a></div>
          <div  data-label="End Date" class="col-md-4 account_p_lbl">{$val.date_closed} </div>
         <div  data-label="Delete" class="col-md-2 account_p_lbl text-center" style="width: 6%;"><a href="{$config.url}/dashboard/watchlist/{$val.id}" class="confirmation" title="Delete"><i class="fa fa-trash"></i></a></div>
          </div>
        {/foreach}
		</div>
        {/if} 
      </div>
          {if $pagination_html != ''}
              <div class="paginator"></div>          
              <div class="col-md-12 mblue_box1">
                <div class="col-md-12"> {$pagination_html} </div>
              </div>
          {/if}
      
      
     </div> 

</div>

{include file="common/footer-1.tpl" nocache} 

{literal} 
<script language="javascript" type="text/javascript">
          $(function() { 
 $('.confirmation').on('click', function () {
        return confirm('Are you sure want to delete item from watchlist?');
    });
$('.myp').addClass('act_class'); 
} );
</script> 
{/literal} 