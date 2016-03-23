{foreach $storeProducts as $key => $val}    
<div class="products_row">
    
							<div class="col-md-4 col-sm-6 col-xs-12 part1  {if $val.market_status != 'open'} disabled {/if} ">

                            {if $store.user_id == $loged.userid}
    <div class="left text-danger" ><a href="{$config.url}/dashboard/product/edit/{$val.id}/{$store.id}"><i class="fa fa-edit"></i></a></div>
    <div class="right text-danger"><a href="javascript:PopupBox('{$config.url}/stores/remove/{$val.id}/{$store.id}','Are you sure you want to remove this?')"><i class="fa fa-remove"></i></a></div>
  
    {/if}
    <div  onclick="window.location='{$config.url}/product/view/{$val.id}/{$val.ptitleurl}'">
                            <div class="hom3 homem3 thumbnail ione2">
                             
                            <a href="javascript:void(0);" class="pro_img imgh"><img src="{$config.url}/uploads/product/{$val.img1}" alt="Image" class="img-responsive"></a>
                            
                            <div>
                            
                            </div>
                            
                            <div class="pro_name ione3">{$commonfunction.shorten($val.title,15)}</div>
                            <div class=" col-md-12 slid3 row micclr2" style="overflow:hidden">{$commonfunction.shorten($val.description,100)}</div>
                           
                            <div class=" slid5 fftn16 ">
                            <div class="col-md-7 col-sm-6 col-xs-6 text-left dfgh">{$val.qty-$val.sold-$val.booked} Items</div>
                             <div class="col-md-5 col-sm-6 col-xs-6 text-right dfgh padlef0">${$val.bprice}</div>
                            </div>
                           
                            </div></div>
                            </div></div>
                            {/foreach}

                            <div class="row"><div class="col-md-12"><div class="pagination">{$pagination_html}</div></div>