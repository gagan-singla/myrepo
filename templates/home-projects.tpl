{$i = 0} 
{foreach $projects as $key => $val}
{$i = 1}
<div class="col-md-12 text-center item ">
  <div class="pro_item pointer_cur" onclick="window.location = '{$config['url']}/product/view/{$val.id}/{$val.ptitleurl}'">
        <div class="pro_head">{$val.title} </div>
        {if $val.auction == 0}<div class="col-md-6 pull-left buy_btn btn_common">Buy Now</div>{else if $val.auction == 1}<div class="col-md-6 pull-left deal_btn btn_common">Bid Now</div>{/if}
        {if $val.auction == 0}<div class="col-md-6 block1_circle pull-right">Flat <span class="dis_perc">{currencyConverter(100*{$val.mprice - $val.bprice}/$val.mprice)} %</span> Off</div>{/if}
        <div class="block1_img"> 
          <img src="{if $val.avatar == ''}{$config['imgpath']}no_img.png    {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" alt="{$val.title}" class="img-responsive"/> 
        </div>
       <!-- <div class="pro_head pro_head_cat">{$val.ctittle}</div>-->
        <div class="pro_price">US ${if $val.auction == 0}<span class="format">{$val.bprice}</span>{else if $val.auction == 1}<span class="format">{$val.wprice}</span>{/if}</div>
        
  </div>
</div>
{/foreach}

{if $i == 0} <div class="col-md-12 text-center item ">No Products</div> {/if}
