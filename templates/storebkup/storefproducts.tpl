{foreach $storeFProducts as $key => $val}

<style>
.kjb1z {
    height: 75px;
    overflow: hidden;
    margin-bottom: 10px;
    text-align: justify;
}
</style>

                      <div class="col-md-12 col-sm-6 col-xs-12 secdiv" "window.location='{$config.url}/product/view/{$val.id}/{$val.ptitleurl}'">
                        <div class="hom3 imgh">  <a href="javascript:void(0);" class="pro_img imgh"><img src="{if $val.img1 == ''}{$config['imgpath']}no_img.png    {else if $val.img1 != ''}{$config.url}/uploads/product/{$val.img1}{/if}" alt="Image" class="img-responsive"></a>
                            
                          <div class="text-center fontsize1">{$commonfunction.shorten($val.title,15)}</div>
                          <div class="text-center slid1 kjb1z">{$commonfunction.shorten($val.description,100)}</div>
                          <div class="text-center slid2 micclr3">${$val.bprice}</div>
                          <div class="text-center secdiv">
                            
                          </div>
                        </div>
                      </div>
                      {/foreach}