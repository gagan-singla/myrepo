{include file="common/header-1.tpl" nocache}
{include file="/forum/header.tpl" nocache}

<!-- <div class="col-md-12 mjusza1">
<img src="{$config.url}/images/forum/forma1.png" /> Discussion Boards
</div> -->

<div class="col-md-10 mjusza4">Community</div>
<div class="col-md-2"><a href="{$config.url}/forum/questions"><button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">New Question</button></a></div>
</div>
<div class="col-md-12 mjusza2">
<div class="col-md-12 mjusza3">Discussion Boards </div>
{$cats = 0}
{foreach $categories as $key => $val}
{$cats = 1}
<div class="col-md-12 mjusza3"><a href="{$config.url}/forum/category/{$val.id}" >{$val.catname} <span class="mjuszb3"> ({$val.total_post} Items)</span> </a></div>
{/foreach}
</div>
 {if $cats == 0}
 <div class="col-md-12 mjusza3">No categories</span></div>
 {/if}

{include file="/forum/footer.tpl" nocache}
{include file="common/footer-1.tpl" nocache}
