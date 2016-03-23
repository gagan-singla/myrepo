{include file="common/header-1.tpl" nocache}
{include file="store/css-store.tpl" nocache}
<link rel="stylesheet" href="{$config.url}/css/jquery.datetimepicker.css" type="text/css" />
<div class="container spc fonfm1 menu_pad">
  <div class="col-md-12 store_mwrap menu_pad">
    <!--side panel-->
  <!--center notification-->
   <form action="{$config.url}/stores/create" method="post" enctype="multipart/form-data"> 
    {include file="store/stored.tpl" nocache}

  </form>
    </div> 
</div>
{include file="common/footer-1.tpl" nocache}
{include file="store/store-js.tpl" nocache}
