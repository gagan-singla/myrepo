{include file="common/header-1.tpl" nocache} 
{include file="time-common-loader.tpl" nocache}
<div class="row">
 <button type="button" class="sflter navbar-toggle" data-toggle="collapse" data-target="#search_fltr">
			Search Filters <span class="pull-right"><i class="fa fa-chevron-down"></i></span></span>
</button>
	<div id="search_fltr" class="ds search_left col-md-3 navbar-collapse collapse">
   <form action="{$config.url}/search" method="post" >
    <input type="hidden" name="ajax" value="1">

    <div class="search_category">
     <h3>CATEGORIES</h3>
     <input type="hidden" name="page" value="1">
     <input type="hidden" name="uid" value="{$uid}">
         <ul>
          {foreach $maincategory as $key => $val}
            

             <li>
              <label class="option srch_olbl"> 
               
              <input class="forward_v2" type="checkbox" name="cid[]" pid="{$val.parent_id}"  value="{$val.id}"  >
              <span class="checkbox"></span>{$val.name}           
              
              </label>
             </li>

             {foreach $subcategory as $key_sub => $val_sub}
              
              {if $val.id == $val_sub.parent_id}

             <li>
              <label class="option srch_olbl"> 
               
              {for $foo=1 to {$val_sub.depth}} -- {/for} <input class="forward_v2" type="checkbox" name="cid[]" pid="{$val_sub.parent_id}"  value="{$val_sub.id}"  >
              <span class="checkbox"></span>{$val_sub.name}           
              
              </label>
             </li>
              
              {/if}

              {/foreach} 

            
          {/foreach} 
         </ul>    
    </div>
    <div class="search_category">
     <h3>Auction </h3>
       <ul>
         <li>
          <label class="option srch_olbl"> 
          <input type="checkbox" name="type[]" value="1" {$isauctionsearch}>
          <span class="checkbox"></span>Bid Now
          </label>
         </li>
         <li>
          <label class="option srch_olbl"> 
          <input type="checkbox" name="type[]" value="2" {$isbuynowsearch}>
          <span class="checkbox"></span>
          Buy Now
          </label>
         </li>
         <li>
          <label class="option srch_olbl"> 
          <input type="checkbox" name="type[]" value="3" {$isfeaturedsearch}>
          <span class="checkbox"></span>
          Featured Items
          </label>
         </li>
      </ul>
    </div>
    
    <div class="search_category">
     <h3>Price Range </h3>
     <div class="row">
      <div class="col-md-2">$</div>
      <div class="col-md-4"><input class="form-control floatpoint" name="toprice" type="text"></div>
      <div class="col-md-2">to</div>
      <div class="col-md-4"><input class="form-control floatpoint" name="fromprice" type="text"></div>
     </div>
    </div>
    <!--<div class="search_category">
     <h3>User Rating </h3>
     <div class="row user_rating">
      <div class="col-md-6 search_ratings"><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i></div>
      <div class="col-md-6"><input class="form-control"></div>
     </div>
    </div>-->
    <div class="search_category">
     <h3>Options </h3>
       <ul>
         <li>
          <label class="option srch_olbl"> 
          <input type="checkbox" name="pic_type[]" value="1">
          <span class="checkbox"></span>Show All
          </label>
         </li>
         <li>
          <label class="option srch_olbl"> 
          <input type="checkbox" name="pic_type[]" value="2">
          <span class="checkbox"></span>
          Show only with pictures
          </label>
         </li>
         <li>
          <label class="option srch_olbl"> 
          <input type="checkbox" name="pic_type[]" value="3">
          <span class="checkbox"></span>
          Show only with no pictures
          </label>
         </li>
      </ul>
    </div>

  </form>
  </div>
  <div class="col-md-9  search_pro">
  <div class="row search_tbar">
  <div class="col-md-6 sbar_lbl">
    Search (<span class="numb"></span> results)
    {if $uid > 0}  <span style="text-transform:capitalize;">{$projects.project[0]['uname']}</span> seller projects {/if}
  </div>
  <div class="col-md-2 sbar_lbl">
  Auction Status
  </div>
  <div class="col-md-4">
    <select class="form-control" id="orderby">
      <option value="1">Time Ending Soon</option>
      <option value="2">Recent Products</option>
      <option value="3">Price Low - High</option>
      <option value="4">Price High - Low</option>
    </select>
  </div>
  </div>
  <div class="col-md-12 svsh"><a href="#" data-toggle="modal" data-target="#myModal">Save this Search</a></div>
  
  <!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title scon3" id="myModalLabel">Save Search</h4>
      </div>
      <div class="modal-body">
       <div class="col-md-12 scon1">You can now save this search into an organized folder letting you manage your results more easily.  Additionally, you can subscribe via email to receive daily email notifications when new listings meet your specific criteria.</div>
     
     <div class="col-md-12 scon2"><strong>Title of this saved search</strong></div>
     <div class="col-md-6"><input type="text" id="searchtitle" name="title" value="" class="form-control"></div><div class="col-md-6">&nbsp; <br /> &nbsp;</div>
     <div class="col-md-3 col-sm-3  text-left" style="padding-left:0; font-size:14px;"><button onclick="savesearch();"class="btn btn-black">Save</button></div><div class="col-md-9 col-sm-9"></div>
      </div>
    </div>
  </div>
</div>


  <script type="text/javascript">
  function savesearch()
{  
  search_title = $("#searchtitle").val(); 
   if(search_title=='')
  {
    alert("Please Enter The Search Title");
  }
  else
  {
    request={
      encrypt:$('.search_left form').serialize()+'&ajax=1&orderby='+$('#orderby').val(),
      title:$('#searchtitle').val(),
      searchtext:$('#search').val()
      

    }
     $.ajax({
            type : 'POST',
            url  : '/savesearch',
            data : request,
            dataType : 'json',
            success  : function(data)
            {            
              if(data==0)
              {                
                 window.location.href='/login';
              }
              else
              {
                 window.location.href='/dashboard/searchitems';

              }
            
           
            }
          });

  }

}
    function setIntreval(id,market_status)
{
   //console.log(timeProject[id]);
   clearvar[id] =  setInterval(function(){
         

      timeProject[id] = new Date(timeProject[id].getTime() + 1000*1);
      
      if(targetDate[id] >= timeProject[id])
      {
         clock[id].innerHTML = countdown(targetDate[id]).toString();
      }
      else
      {
        
          
          
           clock[id].innerHTML = 'Closed';
      }
      
  }, 1000);
}
</script>
  <div class="row products_row">
    
   {include file="search-ajax.tpl" nocache}
  </div>
</div>

</div>
</div>
{include file="common/footer-1.tpl" nocache}

<script type="text/javascript"> 



function meee(id,dateee,price)
  {  
 // id = '126';
 // alert(dateee);
    clearInterval(clearvar[id]);
    clock[id] = document.getElementById('my'+id)
    , targetDate[id] = new Date(dateee); // Jan 1, 2050;
 
    clock[id].innerHTML = countdown(targetDate[id]).toString();
     setIntreval(id);
    
  }
  
  function timermee(id,dateee)
  {  

   clearInterval(clearvar[id]);
    clock[id] = document.getElementById('my'+id)
    , targetDate[id] = new Date(dateee); // Jan 1, 2050;
 
  clock[id].innerHTML = countdown(targetDate[id],'hours').toString();
  clearvar[id] =  setInterval(function(){
  
  if(targetDate[id]>new Date())
    clock[id].innerHTML = countdown(targetDate[id],'hours').toString();
  else
  clock[id].innerHTML = 'Closed';  
    }, 1000);
    
  }
     
     socket.on('bidAddtime', function(msg){   
     meee(msg.id,msg.date,msg.price);

     });
$(function()
{
  $('input[name="cid[]"]').each(function(){
    $(this).on('click',function(){
       var pid = $(this).attr('pid');
       var vid = $(this).attr('value');
       if(pid > 0)
       {
         if(!$(this).is(':checked'))
            {
             $('input[name="cid[]"][value="'+pid+'"]').attr('checked',false);
            }
          
         
          
       }
       else
       {
        if($(this).is(':checked'))
         {
          $('input[name="cid[]"][pid="'+vid+'"]').each(function()
          {
             $(this).attr('checked',false);
             $(this).click();
          });
            

         }
         else
         {
           $('input[name="cid[]"][pid="'+vid+'"]').each(function()
          {
            
             $(this).attr('checked',false);
           });
         } 
       } 
    });
  });
  $('.numb').html($('.pagination').attr('total'));
    $('.search_left form input[type="checkbox"]').on('click',function()
    {
      $('input[name="page"]').val(1);
      searchForm();
       
    });
    $('.search_left form input[type="text"]').on('blur',function()
    {
      $('input[name="page"]').val(1);
      searchForm();
       
    });
    $('.search_left form select').on('change',function()
    {
      $('input[name="page"]').val(1);
      searchForm();
       
    });
    $('#orderby').on('change',function()
    {
      $('input[name="page"]').val(1);
      searchForm();
       
    });
});
function searchForm()
{      //  alert($('.search_left form').serialize()+'&ajax=1&orderby='+$('#orderby').val());
          $.ajax({
            type : 'POST',
            url  : '/search',
            data : $('.search_left form').serialize()+'&ajax=1&orderby='+$('#orderby').val(),
            dataType : 'json',
            success  : function(data)
            {
                   $('input[name="page"]').val(1);

                   $('.products_row').html(data.html);
                   $('.numb').html($('.pagination').attr('total'));
                   $('input.pages_titletimer').each(function() { timermee($(this).val(),$("#tim"+$(this).val()).val())
            });
			numberformat();
           
            }
          });
}

</script> 
<script> 
$( document ).ready(function() {
   $.urlParam = function(name){
   qs = window.location.href;
   var params = [];
   var tokens;
   var re = /[?&]?([^=]+)=([^&]*)/g;
   while (tokens = re.exec(qs))
   { 
       if ((tokens[1]) == name)
       params.push((tokens[2]));
   }
   return params;    
}
  if($.urlParam('tt')==1)
  {
    frompriceurl = $.urlParam('fromprice');
topriceurl = $.urlParam('toprice');
ordebyurl = $.urlParam('orderby');
cidarray =$.urlParam('cid%5B%5D');
typearray =$.urlParam('type%5B%5D');
searchtext =$.urlParam('search');

$.each(cidarray, function(i, val){

   $("input[value='" + val + "'][name='cid[]']").prop('checked', true);

});
$.each(typearray, function(i, val){

   $("input[value='" + val + "'][name='type[]']").prop('checked', true);

});

$('#orderby option[value="' + ordebyurl + '"]').attr('selected','selected');
$('input[name="toprice"]').val(topriceurl);
$('input[name="fromprice"]').val(frompriceurl);
$('#search').val(searchtext);


if(cidarray!=''||frompriceurl!=''||topriceurl!=''||typearray!='')
{

  searchForm();

}
}       

          
});



</script>

