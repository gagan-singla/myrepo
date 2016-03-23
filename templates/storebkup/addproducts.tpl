{foreach $storeProducts as $key => $val}
<div class="col-md-4 col-sm-6 col-xs-12 part1 ione8 {if $val.market_status != 'open'} disabled {/if} product_add_{$val.id}">
  <div class="hom3 homem3 "> <a href="#x" class="thumbnail imgh"><img src="{if $val.img1 == ''}{$config['imgpath']}no_img.png    {else if $val.img1 != ''}{$config.url}/uploads/product/{$val.img1}{/if}" alt="Image" class="img-responsive ione4"></a>
    <div>
      <!--<div class="col-md-6 col-sm-6 col-xs-6 padlef"><a href="#"> {if $val.img2 != $nulldata}<img src="{$config.url}/uploads/product/{$val.img2}" alt="Image" class="img-responsive thumbnail imgh ione4">{/if}</a></div>
      <div class="col-md-6 col-sm-6 col-xs-6 padrig"><a href="#">{if $val.img3 != $nulldata}<img src="{$config.url}/uploads/product/{$val.img3}" alt="Image" class="img-responsive thumbnail imgh ione4">{/if}</a></div>-->
    </div>
    <div class="slid4 ione6 ione7" style="clear: both;min-height: 65px;"><b>{$commonfunction.shorten($val.title,15)}</b></div>
    <div class=" slid3 ione5 ione9">{$commonfunction.shorten($val.description,100)}</div>
    <div class=" slid5 ione9" style="font-size:12px;">
      <div class="col-md-6 col-sm-6 col-xs-6 text-left dfgh padlef0" style="padding-right: 0;">{$val.qty-$val.sold-$val.booked} Quantity</div>
      <div class="col-md-6 col-sm-6 col-xs-6 text-right dfgh padlef0">${$val.bprice}</div>
    </div>
  </div>
  <button type="button" onclick="addStore('{$val.id}','{$id}')" class="btn btn-danger  ione9" style="font-size: 12px;">Add to Store</button>
</div>
{/foreach}