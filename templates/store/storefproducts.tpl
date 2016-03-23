{foreach $storeFProducts as $key => $val}

<style>
.kjb1z {
    height: 75px;
    overflow: hidden;
    margin-bottom: 10px;
    text-align: justify;
}
</style>

                      <div class="col-md-12 col-sm-6 col-xs-12 secdiv" onclick="window.location='{$config.url}/product/view/{$val.id}/{$val.ptitleurl}'">
                        <div class="hom3 imgh homem3 thumbnail" style="padding-bottom:15px;">
                         <div class="text-center fontsize1 delvt1 " style="margin-bottom:5px;"><b>{$commonfunction.shorten($val.title,15)}</b></div>
                        
                          <a href="javascript:void(0);" class="pro_img imgh"><img src="{if $val.img1 == ''}{$config['imgpath']}no_img.png    {else if $val.img1 != ''}{$config.url}/uploads/product/{$val.img1}{/if}" alt="Image" class="img-responsive"></a>
                            
                         
                          <!--<div class="text-center slid1 kjb1z">{$commonfunction.shorten($val.description,100)}</div>-->
                          <div class="text-center slid2 micclr3 ionoti1 ">${$val.bprice}</div>
                          <div class="text-center secdiv">
                            
                          </div>
                        </div>
                      </div>
                      {/foreach}