{include file="common/header-1.tpl" nocache}
<style>
.navigation22 ul li.active > ul {
  visibility: visible !important;
}

@media screen and (max-width:990px) {
	
	.navigation22 ul li.active  > ul { 
	visibility:hidden !important;
	}
}
</style>
<section class="banner_section"> 
    <div class="row">
       <div class="col-md-3 col-sm-12 col-xs-12"></div>
       <div class="col-md-9 col-sm-12 col-xs-12  pull-left">
        <div class="slideshow">
           <div id="featurestory" class="featurestory featurestory-loading-enabled enabled featurestory-initialized">
            <div class="featurestory-tablist-root" role="presentation" aria-hidden="true">
               <div class="featurestory-tablist-wrapper" role="presentation" aria-hidden="true">
                <ul class="featurestory-tablist" role="presentation" aria-hidden="true" >
                   <li class="featurestory-tab featurestory-tab-bg-change" role="presentation" aria-hidden="true"> <a href="http://emagine.com.au/index.php?route=common/home" role="presentation" aria-hidden="true" tabindex="-1"> <span class="featurestory-text" role="presentation" aria-hidden="true">MICROMAX SMART TVs <br/>
                    <span class="small_innertext">Starting US $399</span></span> </a> </li>
                   <li class="featurestory-tab" role="presentation" aria-hidden="true"> <a href="http://emagine.com.au/index.php?route=product/category&amp;path=171" role="presentation" aria-hidden="true" tabindex="-1"> <span class="featurestory-text" role="presentation" aria-hidden="true">Minimum 50% OFF <br/>
                    <span class="small_innertext">Men's Clothing</span></span> </a> </li>
                   <li class="featurestory-tab" role="presentation" aria-hidden="true"> <a href="http://emagine.com.au/index.php?route=product/category&amp;path=120" role="presentation" aria-hidden="true" tabindex="-1"> <span class="featurestory-text" role="presentation" aria-hidden="true">EXCLUSIVE OFFERS<br/>
                    <span class="small_innertext">Mobiles & Accessories</span></span> </a> </li>
                   <li class="featurestory-tab" role="presentation" aria-hidden="true"> <a href="http://emagine.com.au/index.php?route=product/category&amp;path=119" role="presentation" aria-hidden="true" tabindex="-1"> <span class="featurestory-text" role="presentation" aria-hidden="true">HOME DECORS <br/>
                    <span class="small_innertext">Bed Sheets & Linen</span></span> </a> </li>
                   <li class="featurestory-tab" role="presentation" aria-hidden="true"> <a href="http://emagine.com.au/index.php?route=information/information&amp;information_id=4" role="presentation" aria-hidden="true" tabindex="-1"> <span class="featurestory-text" role="presentation" aria-hidden="true">Health & Beauty <br/>
                    <span class="small_innertext">Special Offers</span></span> </a> </li>
                 </ul>
              </div>
             </div>
            <div class="featurestory-tabpanels-wrapper">
               <ul class="featurestory-tabpanels">
                <li class="featurestory-tabpanel" style="opacity: 1; z-index: 1;"><a href="{$config.url}/search/?cid=3"> <img class="img-responsive" src="{$config.url}/images/slider/slide1.png" alt="Home "></a></li>
                <li class="featurestory-tabpanel" style="opacity: 1;"><a href="{$config.url}/search/?cid=12"> <img  class="img-responsive" src="{$config.url}/images/slider/slide2.png" alt="IT Products "></a></li>
                <li class="featurestory-tabpanel" style="opacity: 1;"><a href="{$config.url}/search/?cid=1"> <img  class="img-responsive" src="{$config.url}/images/slider/slide3.png" alt="Services"></a></li>
                <li class="featurestory-tabpanel" style="opacity: 1;"><a href="{$config.url}/search/?cid=11"> <img  class="img-responsive" src="{$config.url}/images/slider/slide4.png" alt="Communication"></a></li>
                <li class="featurestory-tabpanel" style="opacity: 1;"><a href="{$config.url}/search/?cid=15"> <img  class="img-responsive" src="{$config.url}/images/slider/slide5.png" alt="About Us"></a></li>
              </ul>
             </div>
          </div>
         </div>
      </div>
     </div> 
 </section>
<section>
   
    <div class="row" >
       <div class="col-md-12" >
        <div class="panel panel-default">
           <div class="panel-heading featured_heading"  style="font-weight: bold;">Deals of the day</div>
           
           <div class="panel-body" id="owl-demo">
                
                {$projects = $deals}
                {include file="home-projects.tpl" nocache}
                
                
                
            </div>
         </div>
      </div>    
      
      
      <div class="col-md-12 bestseller_block">
        <div class="panel panel-default">
           <div class="panel-heading featured_heading"  style="font-weight: bold;">Best Sellers</div>
           
           <div class="panel-body" id="owl-demo1">
                {$projects = $sellers}
                {include file="home-projects.tpl" nocache}
                
                
              </div>
         </div>
      </div>
      
      {if $cat1|count > 4}
      <div class="col-md-12 bestseller_block">
        <div class="panel panel-default">
           <div class="panel-heading featured_heading"  style="font-weight: bold;">Mobiles & Tablets </div>
            <div class="panel-body" id="owl-demo2">
                {$projects = $cat1}
                {include file="home-projects.tpl" nocache}
                
                
            </div>
         </div>
      </div>
      {/if} 
      
       {if $cat2|count > 4}
      <div class="col-md-12 bestseller_block">
        <div class="panel panel-default">
           <div class="panel-heading featured_heading" style="font-weight: bold;">TVs, Appliances & Cameras</div>
           
           <div class="panel-body" id="owl-demo3">
                {$projects = $cat2}
                {include file="home-projects.tpl" nocache}
                
                
            </div>
         </div>
      </div> 
      {/if} 
 </section>
<script type="text/javascript">
$(document).ready(function(){
	$(".featurestory-tab").click(function() {
		$(".featurestory-tab").removeClass('featurestory-tab-bg-change');
		$(this).addClass('featurestory-tab-bg-change');		
	});
});
</script> 
<script type="text/javascript" src="js/sd.js"></script>
<script>
    $(document).ready(function() {
      $("#owl-demo").owlCarousel({
        autoPlay: 3000,
        items : 5,
		 navigation:true,
    navigationText: [
      "<img src='{$config.url}/images/b_arrow.png' class='img-responsive'/>",
      "<img src='{$config.url}/images/f_arrow.png' class='img-responsive'/>"
      ],
      });


      $("#owl-demo1").owlCarousel({
        autoPlay: 3000,
        items : 5,
		 navigation:true,
    navigationText: [
      "<img src='{$config.url}/images/b_arrow.png' class='img-responsive'/>",
      "<img src='{$config.url}/images/f_arrow.png' class='img-responsive'/>"
      ],
      });
	  
	    $("#owl-demo2").owlCarousel({
        autoPlay: 3000,
        items : 5,
		 navigation:true,
    navigationText: [
      "<img src='{$config.url}/images/b_arrow.png' class='img-responsive'/>",
      "<img src='{$config.url}/images/f_arrow.png' class='img-responsive'/>"
      ],
      });
	  
	  
	    $("#owl-demo3").owlCarousel({
        autoPlay: 3000,
        items : 5,
		 navigation:true,
     navigationText: [
      "<img src='{$config.url}/images/b_arrow.png' class='img-responsive'/>",
      "<img src='{$config.url}/images/f_arrow.png' class='img-responsive'/>"
      ],
      });

    });
    </script>
     {include file="common/footer-1.tpl" nocache}

