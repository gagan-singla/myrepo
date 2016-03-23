{include file="common/header-1.tpl" nocache}
{include file="store/css-store.tpl" nocache}
<link rel="stylesheet" href="{$config.url}/css/jquery.datetimepicker.css" type="text/css" />
<div class="row spc fonfm1 menu_pad">
  <div class="col-md-12 store_mwrap menu_pad">
  <div class="text-center iome1">Edit Store</div>
    <!--side panel-->
  <!--center notification-->
   <form action="{$config.url}/stores/update" method="post" enctype="multipart/form-data"> 
    <input type="hidden" name="sid" value="{$store.id}" />
    {include file="store/stored.tpl" nocache}

  </form>
    </div>
   
</div>
{include file="common/footer-1.tpl" nocache}
{include file="store/store-js.tpl" nocache}