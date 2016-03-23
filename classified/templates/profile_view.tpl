{include file="/common/header-1.tpl" nocache}
<style type="text/css">
.dvPreview img{
  margin:10px;
}
.category ul{
  display:none;
}
</style>
<div class="row shipwrap">
  <div class="daashbrd_cngpswd"><a href="/dashboard/my">Dashboard</a> &gt;&gt; Profile</div>
      <div class="col-md-3">
        <div class=""><img id="imageupload" src="{if $users.avatar == ''} {$config['imgpath']}no_img.png {else if $users.avatar != ''}{$config['url']}/uploads/profile/{$users.avatar}{/if}" title="No Photo" alt="no_img" width="97" height="75"></div>
      </div>
      <div class="col-md-9">
        <div class="panel panel-default">
              <div class="panel-heading pplbl" >Personal Profile</div>

          <div class="panel-body"> {$users.firstname}  {$users.last_name}, <br />
            {$users.address1},{$users.state}, {$users.country}<br />
  <!--          {$users.city} - {$users.zip}--> </div>
        </div>
         <div class="panel panel-default">
              <div class="panel-heading pplbl" > About me : </div>
			  <div class="panel-body">
					<div> {$users.aboutme} </div>
			  </div>
	  </div>
        <div class="panel panel-default">
			<div class="panel-heading pplbl" > Intrested in: </div>
			<div class="panel-body">
		   {foreach $category as $key => $val}
			
			  <div>{$val.name}</div>
		   
			{/foreach} 
			</div>
		</div>
        <div class="row frmbx packging persnl-profl">
			<button type="button" class="btn btn-danger bttns" onclick="window.location='{$config.url}/search/?uid={$users.id}'">VIEW SELLER ITEMS</button>
		</div>
         </div>
        
    </div>
  </div>
</div>
  </div>
</div>
{include file="/common/footer-1.tpl" nocache} 