{include file="common/header-1.tpl" nocache}
{include file="store/css-store.tpl" nocache}
<style>
.carousel-control.right{
	background-image:none;
	top: 165px;
        right: -100px;
}
.carousel-control.left{
	background-image:none;
	top: 165px;
       left: -95px;;
}
</style>
<div class="container-fluid userprofile2">
  <div class="container  ">
    <div class="col-md-12">
      <div class="col-md-12 userprofile1">
      <div  style="height:180px;overflow:hidden;position:relative;">
        {if $store.banner != ''}<img src="{$config.url}/uploads/store/{$store.banner}" class="img-responsive" style="position:absolute;top:0px;left:0px; width:100%; height:100%;">{/if} 
        <div class="col-md-12 seller7">
         <div class="col-sm-2" style="position: absolute;top: 10px;left: 0px;">{if $store.logo != ''}<img src="{$config.url}/uploads/store/{$store.logo}" class="img-responsive"  width="100%" height="100%">{else}
           <img src="{$config.url}/images/no_imf.png" class="img-responsive">
            {/if}                      </div>
          
          <div class="clear"></div>
        </div></div>
        <div class="col-sm-12">
            <div class="col-sm-6">
              <div class="userprofile3 col-md-12 stor3">{$store.name}</div>              
              
            </div>
            <div class="col-sm-6 userprofile7 stor4">
              {if $loged.userid > 0}
              <div class="col-md-5 text-right" onclick="sendMessage();"><img src="{$config.url}/images/msg2x.png"><a href="#" class="micclr1"> Send a Message</a></div>
              {/if}
              <div class="col-md-4" id="fb-share"><div class="fb-share-button" data-href="{$config.url}/stores/view/{$store.id}" data-layout="button_count"></div></div>
              <div class="col-md-3"><a href="https://twitter.com/share" class="twitter-share-button b2-widget micclr1">Tweet</a>
</div>
<div class="clear"></div>
<div class="m-top-20">
           {if $store.user_id == $loged.userid}
              <button type="button" class="btn  btn-danger cart1"  onclick="window.location='{$config.url}/stores/edit/{$store.id}'"><i class="fa fa-add" style="padding-right:5px; "></i> Edit Store</button> <button type="button" class="btn  btn-danger cart1"  onclick="addProducts();"><i class="fa fa-add" style="padding-right:5px; "></i> Add Products</button>{/if}</div>
            </div>
            <div class="clear"></div>
            <div class="userprofile6 col-md-12">
              <div class="col-md-12">{$store.description}</div>
            </div>
          </div>
        <div class="col-md-12" style="padding-bottom:2%;">
          <div class="col-md-12 userprofile8 padee5" style="color:#666;">FEATURED ITEMS</div>
          
          <!--slider3!-->
          
          <div class="col-md-12 ">
            <div class="well-none">
              <div class="panel-body" id="owl-demo1"> 
                
                <!-- Carousel items -->
                 {include file="store/storefproducts.tpl" nocache} 
                  <!--/item--> 
                  
                <!--/carousel-inner--> 
                 </div>
              <!--/myCarousel--> 
            </div>
            <!--/well--> 
            
          </div>
        </div>
        <div class="clear"></div>
        <div class="col-md-12 foudiv firdiv">
          <div class="col-md-3 col-sm-3 col-xs-12">
            <form role="search" method="get" class="searchform" action="javascript:void(0);">
              <div class="searchboxwrapper">
                <input class="searchbox" type="text" value="" name="search" placeholder="Search for">
                <input type="hidden" name="cid" value="0" id="cid" />
                <input type="hidden" name="page" value="1" id="page" />
                <input class="searchsubmit" type="submit" id="searchsubmit" value="" onclick="searchStoreProduct();">
              </div>
            </form>
            <div class="stor6">BROWSE</div>
            <div class="col-md-12 padlef storecategory">
              {include file="store/storecategory.tpl" nocache}
            </div>
          </div>
          <div class="col-md-9 col-sm-9 col-xs-12 dfgh ">
            <div class="col-md-12 dfgh" style="padding-bottom:2%;">
              <div class="col-md-12 firdiv">
                <div class="col-md-12 stor5">Collections</div>
              </div>
              <div class="col-md-12 dfgh storeProducts"> {include file="store/storeproducts.tpl" nocache} </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        
        <div class="row">  </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</div>
<!--/ header -->

</div>
<div class="clear"></div>
{include file="common/footer-1.tpl" nocache} 
<script src="{$config.url}/js/mtree.js"></script> 
<script type="text/javascript" src="{$config.url}/js/owl.carousel.js"></script>
<script>
$(document).ready(function() {
	
      $("#owl-demo1").owlCarousel({
        autoPlay: 3000,
        items : 3,
     navigation:true,
    navigationText: [
      "<img src='{$config.url}/images/b_arrow.png' class='img-responsive'/>",
      "<img src='{$config.url}/images/f_arrow.png' class='img-responsive'/>"
      ],
      });
    
});

</script>
<script language="javascript" type="text/javascript">
   function paginationStore(page)
   {
    $('#page').val(page);
     searchStoreProduct();
    }
	 function restrictCategory(cid)
	 {
		 console.log(cid);
		$('#cid').val(cid); 
		searchStoreProduct();
	 }
	 function searchStoreProduct()
	 {
     
		 var params = $('.searchform').serialize();
		 $.ajax({
			type : 'GET',
			url : ASBASE + '/stores/view/ajax/{$store.id}',
			data: params,
			success : function(data) {
				console.log(data);
				$('.storeProducts').html(data);
				//changeSubCategory
				
			}
		}); 
		 
	 }
	 function addProducts()
	 {
		 
		 $.ajax({
			type : 'GET',
			url : ASBASE + '/stores/add/{$store.id}',
      dataType : 'JSON',
			success : function(data) {	
        console.log(data);			
				$('.viewaddproducts').html(data.html);
				$('#storeModal').modal('show');
				addFProducts();
				//changeSubCategory
				
				
				
			}
		}); 
	 }
	  function addFProducts()
	 {
		 
		 $.ajax({
			type : 'GET',
			url : ASBASE + '/stores/feature/{$store.id}',
			success : function(data) {		
			  $('.carousel_content').html(data);
			 }
		}); 
	 } 
	 function addStore(id,sid)
	 {
		 $.ajax({
			type : 'GET',
			url : ASBASE + '/stores/addproduct/'+id+'/'+sid,
			success : function(data) {
				$('.product_add_'+id).remove();
				showCategory();
				
			}
		}); 
		 
	 }
	  function showCategory()
	 {
		 $.ajax({
			type : 'GET',
			url : ASBASE + '/stores/category/{$store.id}',
			success : function(data) {
				console.log(data);
				$('.storecategory').html(data);
				searchStoreProduct();
				mtree();
			}
		}); 
		 
	 }
	 $(function()
	 {
		mtree(); 
		console.log(5);
		$('#myCarousel').carousel({
	interval: 3000
	});
    
	 });
	 </script>
    <div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div class="modal fade" id="storeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="downPopUpArrow">&nbsp;</div>
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><b>Add Products to Store </b></h4>
         <button type="button" onclick="window.location='{$config.url}/product/post/{$store.id}'" class="btn btn-default" style="font-size: 12px;">Add New Products</button>
      </div>
      <div class="modal-body">
        <div class="col-md-12 viewaddproducts" style="height:600px;overflow-y:scroll;"> </div>
      </div>
      <div class="modal-footer" style="clear:both;">
        
      </div>
    </div>
  </div>
</div>
{if $loged.userid > 0}
<div class="modal fade sendMessage">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Send Message</h4>
      </div>
      <div class="modal-body">
        <p><form id="send-store-message" method="post" data-parsley-validate>
          <input type="hidden" name="id" value="{$store.id}" />
          <textarea name="message" rows="10" required class="form-control" data-parsley-required="true"></textarea>
         </form>
        </p>
      </div>
      <div class="modal-footer">
        <button type="button"  class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="sendThis();">Send</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
{/if}
<script type="text/javascript">
function sendMessage()
{
  $('.sendMessage').modal('show');
}
function sendThis()
   {
    var rm = $('.sendMessage textarea').val();
    if(rm == '')
    {
         alert('Please enter a message!');
         return true;
    }  
     var params = $('#send-store-message').serialize();
     $.ajax({
      type : 'POST',
      url : ASBASE + '/stores/message/',
      data: params,
      dataType:'json',
      success : function(data) {

        //changeSubCategory
     
        //data = JSON.parse(data);
        
        if(!data.success)
        {
          window.location.href = ASBASE+'/login';
        }  
        else
        {
          if(data.warning != '')
            alert(data.warning);
          else  
          {
            alert('Message has been sent!.');
            $('.sendMessage textarea').val('');
            $('.sendMessage').modal('hide');
          }  
            
        }
      }
    }); 
   }
</script>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
