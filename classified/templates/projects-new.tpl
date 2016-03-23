<div class="row products_row">
  {foreach $proj as $key => $val}
    <div class="col-md-4 col-sm-6" >
      <div class="thumbnail" onclick="window.location = '{$config['url']}/product/view/{$val.id}'" style="height:355px;">
        {if $val.feature}<div class="hfeatured">FEATURED</div>{/if}
        <div class="pro_img"><img class="img-responsive" src="{if $val.avatar == ''}{$config['imgpath']}no_img.png    {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" alt="{$val.title}">
                    </div>
		<div class="pro_name" >{$val.ptitle}</div>			
        
        <div class="caption"><input type="hidden" id="tim{$val.id}" value="{$val.closed}" /><input type="hidden" class="pages_titletimer" name="getallproids[]" value="{$val.id}" />
	<div class="row pt_btn">
		 <div class="col-md-8 col-sm-8 col-xs-8">
			{if $val.auction == 0}
			<div class="bid_amount"><span class="prl_lbl">Buynow Price:</span><br /> US $ <span class="format">{$val.bprice}</span></div> 
			{else if $val.auction == 1}
			<div class="bid_amount"><span class="prl_lbl">Start Price:</span><br /> US $ <span id="price{$val.id}" class="format">{$val.wprice}</span></div>
			{/if}
			</div>
			<div  class="col-md-4 col-sm-4 col-xs-4">
			 {if $val.auction == 1}
                <div class="bid_amount"><span class="prl_lbl">Bids:</span><br /> {$val.bids} Bids</div> 
               {else if $val.auction == 0}
			   <div class="offer pro_offer" style="font-size:10px;">
                 {currencyConverter(100*{$val.mprice - $val.bprice}/$val.mprice)} % off
				</div>
             {/if}  
		</div>
	</div>
        <div class="row pt_btn">
		 <div class="col-md-8 col-sm-8 col-xs-8">
			
            <div class="font-10 timer" id="my{$val.id}">{$val.day}</div>
			 {if $val.auction == 0}
                  <div class="bid_amount"><span class="prl_lbl">Available:</span>{$val.qty-$val.sold} Qty</div>
               {/if}   
          </div>
		  <div  class="col-md-4 col-sm-4 col-xs-4">
		  {if $val.auction == 1}
                 <button class="btn btn-black">BID NOW</button>
               {else if $val.auction == 0}
                 <button class="btn btn-danger">BUY NOW</button>
             {/if}   
           </div>
         </div>
          <!--<div class="current_bidder">Current Highest Bidder:xyz</div> -->
        
        </div>
       
      </div>
      
    </div>
    {include file="time-loader.tpl" nocache}


    {/foreach}
  </div>

