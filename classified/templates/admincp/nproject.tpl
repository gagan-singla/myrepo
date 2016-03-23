{include file="/admincp/header.tpl" nocache}
<link rel="stylesheet" type="text/css" href="{$config['externalcss']}/jquery.datetimepicker.css" />
<style type="text/css">
#wrapper {
	overflow-x: hidden;
    overflow-y: visible;
}
.bg774 {
  color: #acacac;
  padding-bottom: 20px;
}
.labwd20 {
  width: 21%;
  padding-bottom: 20px;
}
.pribtm15 {
  padding-bottom: 15px;
  color: #acacac;
  font-size: 16px;
}
.mbtnm_10 {
  margin-bottom: 10px;
}
a.dp-choose-date {
   color: #333;
    display: block;
    height: 35px;
    margin-top: -33px;
    padding-right: 5px;
    padding-top: 7px;
    text-align: right;
    width: 100%;
}
</style>
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-laptop"></i> Products <i class="fa fa-hand-o-right"></i> <i class="fa fa-edit"></i> {if $projects.id == 0 or $projects.id == ''} Add {else} Edit {/if}<i class="fa fa-hand-o-right"></i> {$projects.title} </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
    <div class="col-lg-12"> {if $error == 'saved'}
      <div class="alert alert-success"> <strong>Saved!</strong> {$users.first_name} profile was successfully changed. </div>
      {elseif $error != ''}
      <div class="alert alert-danger"> <strong>{$error}</strong> </div>
      {/if}</div>
      <form method="POST" enctype="multipart/form-data" class="admin_form" data-parsley-validate name="add-product" id="add-product" action="/admincp/products/save">   
   <div class="col-md-12">
  <input type="hidden" value="{$projects.id}" name="id" />
  <div class="selft26 newadmclr" style="padding-bottom:10px;">Selling an Item</div>
  <div class="row mbtnm_10">
  <div class="col-md-4">
    {foreach $category as $key => $val}
           {if $val.parent_id > 0 and $projects.category_id == $val.id}           
             {assign var="scid" value=$val.parent_id}
           {/if}
         {/foreach}  
     
    <select class="form-control clracac" name="mcid" id="product_category" required>
      <option value="">Please Select Category</option>
      

    {foreach $category as $key => $val}
      {if $val.parent_id == 0}
        
        
      <option value="{$val.id}" {if $scid == $val.id} selected {/if} {if $projects.category_id == $val.id}selected{/if}>{$val.name}</option>
      
        
       {/if} 
    {/foreach}                   

      
      
    </select>
	</div>
  </div>
<div class="row">
  <div class="col-md-4 mbtnm_10">
    <select class="form-control clracac"  name="cid" required>
      
        <option value="">Please Select Sub Category</option>
        {foreach $category as $key => $val}
         {if $val.parent_id > 0}
          
        
      <option value="{$val.id}" {if $projects.cid == $val.id} selected {/if} {if $projects.category_id == $val.id}selected{/if} style="display:none" pid="{$val.parent_id}">{$val.name}</option>
      
        
         {/if} 
        {/foreach}
      
      
    </select>
   </div>
   <div class="col-md-12 mbtnm_10">
      <label> Category Questions</label>
      <div class="category_questions newadmclr">Select Main Category</div>
  </div>
  </div>
  <div class="checkbox chk12 newadmclr">
    <label class="newadmclr">
      <input type="checkbox" value="1" name="auction" data-parsley-multiple="mymultiplelink" class="auction" required data-parsley-mincheck="1" {if $projects.auction} checked {/if}>
      Auction </label>
  </div>
  <div class="container pribtm15 auction-area">
    <div class="col-md-2 lineht30 newadmclr">Start Price</div>
    <div class="col-md-4">
      <div class="form-inline">
        <div class="form-group">
          <label for="exampleInputName2">$</label>
          <input type="text" class="form-control floatpoint" id="exampleInputName2" value="{$projects.sprice}" placeholder="{$bids.id}" data-parsley-minlength = 1  name="sprice" onblur="$('#rprice').attr('data-parsley-min',$(this).val())">
        </div>
      </div>
    </div>
  </div>
  <div class="container pribtm15 auction-area">
    <div class="col-md-2 lineht30 newadmclr">Reserve Price</div>
    <div class="col-md-4">
      <div class="form-inline">
        <div class="form-group">
          <label for="exampleInputName2">$</label>
          <input type="text" class="form-control floatpoint"   value="{$projects.rprice}" placeholder="" name="rprice" id="rprice" {if $projects.auction} data-parsley-min="{if $projects.sprice > 0} {$projects.sprice} {else} 1 {/if} " {/if}>
        </div>
      </div>
    </div>
  </div>
  <div class="checkbox chk12 newadmclr">
    <label class="newadmclr">
      <input type="checkbox" id="ckh1"  value="1" {if $projects.buynow} checked {/if} name="buynow" data-parsley-multiple="mymultiplelink" class="buynow" required>
      Buy Now </label>
  </div>
  <div class="container pribtm15 buynow-area">
    <div class="col-md-2 lineht30 newadmclr">Retail Price</div>
    <div class="col-md-4">
      <div class="form-inline">
        <div class="form-group">
          <label for="exampleInputName2">$</label>
          <input type="text" class="form-control floatpoint" id="exampleInputName2" placeholder="" value="{$projects.mprice}" name="mprice" {if $projects.buynow} data-parsley-required {/if} onblur="$('#bprice').attr('data-parsley-max',$(this).val())">
        </div>
      </div>
    </div>
  </div>
  <div class="container pribtm15 buynow-area">
    <div class="col-md-2 lineht30 newadmclr">Quantity</div>
    <div class="col-md-4">
      <div class="form-inline">
        <div class="form-group mrglf10">
          <label for="exampleInputName2">&nbsp;</label>
          <input type="text" class="form-control numberonly" {if $projects.buynow} data-parsley-required {/if}   id="exampleInputName2" placeholder="" value="{$projects.qty-$projects.sold}" name="qty">
        </div>
      </div>
    </div>
  </div>
  <div class="container pribtm15 buynow-area">
    <div class="col-md-2 lineht30 newadmclr">Buy Now Price</div>
    <div class="col-md-4">
      <div class="form-inline">
        <div class="form-group">
          <label for="exampleInputName2">$</label>
          <input type="text" class="form-control floatpoint" placeholder="" value="{$projects.bprice}" name="bprice" id="bprice" {if $projects.buynow} data-parsley-required {/if} {if $projects.buynow} data-parsley-max="{if $projects.mprice > 0} {$projects.mprice} {else} 0 {/if}"  {/if}>
        </div>
      </div>
    </div>
  </div>
  
  <div class="bg774 fnt newadmclr">Is this item at a different Location ? 
  
  &nbsp;&nbsp;<span>
    <label class="radio-inline" style="font-size:16px; font-weight:bold;">
    <input type="radio" name="selladm" val="1" class="mrg5 location {if $projects.is_same_location} disabled {/if}"/>&nbsp; Yes</label>
    </span>&nbsp;&nbsp; &nbsp;
    <span>
   <label class="radio-inline" style="font-size:16px; font-weight:bold;">
    <input type="radio" name="selladm" val="0" class=" ashclr location {if !$projects.is_same_location} disabled {/if}" checked="checked"/>&nbsp; No</label>
    </span>
  
    <!--span><div type="button " val="1" class="btn btn-danger mrg5 location {if $projects.is_same_location} disabled {/if}" >Yes</div></span>
    <span><div type="button" val="0" class="btn btn-default ashclr location {if !$projects.is_same_location} disabled {/if}">No</div></span-->
    <input type="hidden" name="is_location" value="{$projects.is_same_location}" />
    </div>
    <div class="row pribtm15 list-area">
    <div class="col-md-2 lineht30 newadmclr">Product Location</div>
    <div class="col-md-4">
      <div class="form-inline">
        <div class="form-group mrglf10">
          <label for="exampleInputName2"></label>
          <input type="text" class="form-control" id="zipcode" default="{$user.zip}" placeholder=""  required onblur="checkStateCity('add-product',0)"  {if $projects.id > 0} value="{$projects.work_loc}" {else} value="{$user.zip}" {/if}  name="work_loc" >
          {if $projects.id > 0}<input type="hidden" name="state" id="state" value="{$projects.state}" />
                 <input type="hidden" name="country" id="country" value="{$projects.country}" />
                 <input type="hidden" name="city" id="city" value="{$projects.city}" />
                 {else}
                    <input type="hidden" name="state" id="state" value="{$user.state}" />
                 <input type="hidden" name="country" id="country" value="{$user.country}" />
                 <input type="hidden" name="city" id="city" value="{$user.city}" />
                 {/if}
          <div class="form-group addresscity font-14 newadmclr">
               {if $projects.id > 0}{$projects.city},{$projects.state},{$projects.country}{else}{$user.city},{$user.state},{$user.country}{/if}
          </div>  
        </div>
      </div>
    </div>
  </div>
    <div class="form-group fnt">
      <label for="exampleInputEmail1" class="nclracac">Title </label>
      <input type="text" class="form-control wd60" id="exampleInputEmail1" name="title" value="{$projects.title}" required maxlength="25">
    </div>
    <div>
      <div class="nclracac newadmclr">Description</div>
      <textarea class="form-control wd60" rows="3" name="description" required>{$projects.description}</textarea>
    </div>
    <div class="form-group fnt">
      <label for="exampleInputEmail1" class="nclracac">Keywords </label>
      <input type="text" class="form-control wd60" id="exampleInputEmail1" name="tags" value="{$projects.tags}" required>
    </div>

  <div class="labwd20">
    <div class="nclracac newadmclr">Payment Method</div>
    <select class="form-control clracac" name="payment" required>
      <option>Paypal</option>
    </select>
  </div>
  <div class="row pribtm15">
    <div class="col-md-2 lineht30 newadmclr">PayPal E-Mail</div>
    <div class="col-md-4">
      <div class="form-inline">
        <div class="form-group">
          <input type="email" class="form-control" id="exampleInputName2" placeholder="" {if $projects.id > 0} value="{$projects.paypal_address}" {else} value="{$user.paypal_address}" {/if} name="paypal_email" required >
        </div>
      </div>
    </div>
  </div>
  
<div class="form-group">
        <label>Start Date</label>
        <input data-date-format="MM d, yyyy" name="date_added" id="date_addedd"  class="date-picker form-control" data-parsley-group="block1" required maxlength="20" value="{$projects.date_add}" type="text">        
</div>

<div class="form-group">
    <label>Ending Date</label>
    <input data-date-format="MM d, yyyy" name="date_closed" id="date_closedd"  class="date-picker form-control" data-parsley-group="block1" required maxlength="20" value="{$projects.date_close}" type="text">
</div>

<!-- {if $projects.id == '' || $projects.id == 0 || $projects.market_status == 'moderate' || $projects.market_status == 'draft'}
  <div class="nclracac">Listing Duration</div>
  <label class="radio-inline dyclr">
    <input type="radio" name="duration[]" value="30" id="Radio0" required {if $projects.duration == '30'} checked {/if}>
    30 Days &nbsp;&nbsp;</label>
  <label class="radio-inline dyclr">
    <input type="radio" name="duration[]" value="10" id="Radio1" required {if $projects.duration == '10'} checked {/if}>
    10 Days &nbsp;&nbsp;</label>
  <label class="radio-inline dyclr">
    <input type="radio" name="duration[]" value="7" id="Radio2" required {if $projects.duration == '7'} checked {/if}>
    7 Days &nbsp;&nbsp;</label>
  <label class="radio-inline dyclr">
    <input type="radio" name="duration[]" value="3" id="Radio3" required {if $projects.duration == '3'} checked {/if}>
    3 Days </label>
</div>
<div class="col-md-12">
  <div>
    <label class="radio-inline dyclr">
      <input type="radio" id="Radio1" name="future" value="1" {if $projects.future == '1'} checked {/if}>
      Want this posted at a later date and time </label>
  </div>
  <div class="col-md-2">
    <div class="form-group">
      <div class="input-group date" id="datetimepicker1">
        <input type="text" class="form-control datepicker" id="date_added" name="date_added" value="{$projects.date_add}">
        <span class="input-group-addon"><span class="fa fa-calendar"></span> </span> </div>
    </div>
  </div>
  <div class="col-md-2">
    <div class="form-group">
      <select class="form-control clracac" name="time" >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
    </div>
  </div>
  <div class="col-md-2 ">
      <select class="form-control clracac" name="timelevel">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
  </div>
</div>
</div>
{/if}-->
<div class="labwd20">
  <div class="nclracac newadmclr">Shipping</div>
  <select class="form-control clracac" name="shipping_description">
    <option value="fedex" {if $projects.shipping_description == 'fedex'}selected {/if}>Fedex</option>

    <option value="ups" {if $projects.shipping_description == 'ups'}selected {/if}>UPS</option>

    <option value="usps" {if $projects.shipping_description == 'usps'}selected {/if}>USPS</option>
  </select>
</div>
<div class="bg774 newadmclr">Is this item free shipping ?  &nbsp;&nbsp;

&nbsp;&nbsp;
    <span>
    <label class="radio-inline" style="font-size:16px; font-weight:bold;">
    <input type="radio" name="selladm1" val="1" class="mrg5 shipping {if $projects.shipping_price == 0} disabled {/if}"/>&nbsp; Yes</label>
    </span>&nbsp;&nbsp; &nbsp;
    <span>
    <label class="radio-inline" style="font-size:16px; font-weight:bold;">
    <input type="radio" name="selladm1" val="0" class="ashclr shipping {if $projects.shipping_price > 0} disabled {/if}" checked="checked"/>&nbsp; No</label>
    </span>

    <!--span><div type="button " val="1" class="btn btn-danger mrg5 shipping {if $projects.shipping_price == 0} disabled {/if}" >Yes</div></span>
    <span><div type="button" val="0" class="btn btn-default ashclr shipping {if $projects.shipping_price > 0} disabled {/if}">No</div></span-->
    
</div>
<div class="row pribtm15 free-shipping-area" {if $projects.shipping_price == 0} style="display:none;" {/if}>
    <div class="col-md-2 lineht30 newadmclr">Shipping Price</div>
    <div class="col-md-4">
      <div class="form-inline">
        <div class="form-group mrglf10">
          <label for="exampleInputName2"></label>
          <input type="text" class="form-control floatpoint" id="exampleInputName2" placeholder="" value="{$projects.shipping_price}" name="shipping_fee">
        </div>
      </div>
    </div>
  </div>
 
<div class="ptm60"> <span class="nclracac newadmclr">Upload Picture</span>
  <div class="fileUpload btn btn-primary redbg5"> <span>Browse</span>
    <input id="uploadBtn" type="file" class="upload"   name="product_image"  {if $image.length == 0 or $image.length == ''} required {/if} data-parsley-group="block1" multiple />
  </div>
  {if $image.length > 0}
  {foreach $image as $key2 => $val2}
      <div class="pro_image pro_image_{$val2.id}">
         <img src="{if $val2.avatar == '' or $val2.avatar == null} {$config['imgpath']}no_img.png {else if $val2.avatar != ''}{$config['imgpath']}product/{$val2.avatar}{/if}" width="82" title="{$projects.title}" height="83" alt="{$val2.title}">
         <input type="hidden" name="image_id[]" value="{$val2.id}" />
         <input type="hidden" name="image[]" value="{$val2.image}" />
         <input type="hidden" name="avatar[]" value="{$val2.avatar}" />
         <a href="javascript:void(0);" onclick="$('.pro_image_{$val2.id}').remove(); if($('.pro_image img').length == 0) { $('#uploadBtn').attr('required',''); }"> Delete </a>
       </div>
  {/foreach}
  {/if}    
  <div class="dvPreview" id="dvPreview"></div>
</div>
<div class="form-group fnt">
  <label for="exampleInputEmail1" class="nclracac">Video URL </label>
  <input type="text" class="form-control wd60" id="exampleInputEmail1" value="{$projects.document}" placeholder="Example: http://www.Youtube.com//watch?xyzwer" name="document">
</div>

<div>
  
</div>
<div class="container ptm60" style="margin-bottom:2%;">
  <div class="col-md-3"></div>
  <input type="submit" class="btn btn-danger mrg5" name="save" value="Finish"/>
   {if $projects.id == '' || $projects.id == 0 || $projects.market_status == 'moderate' || $projects.market_status == 'draft'}
  <!--<input type="submit" class="btn btn-danger" name="finish" value="Save &amp; Post Later"/>-->
  {/if}
</div>
</div>
    </form>
  </div>
 </div> 

{include file="/admincp/footer.tpl" nocache} 

<script type="text/javascript" src="{$config.url}/js/jquery.datetimepicker.js"></script>
<script language="javascript" type="text/javascript">

$(function()
{

    /*Date.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    Date.format = 'mm/dd/yyyy';

    $("#date_addeddd").datetimepicker({

		formatDate:'mm/dd/yyyy',

		minDate:'-1970/01/02'

	});   

    $("#date_closeddd").datetimepicker({

		formatDate:'mm/dd/yyyy',

		minDate:'-1970/01/02'

	});*/
	
	
	var serverdate = '{$serverdate}';
//alert(serverdate);
d = servdate =  new Date(serverdate);
//alert(d);
var logic = function( currentDateTime ){
  // 'this' is jquery object datetimepicker
  
 // alert(d.getDate());
  if( currentDateTime.getDate()==servdate.getDate() ){
    this.setOptions({
      minTime:addZero(servdate.getHours())+':'+addZero(servdate.getMinutes())
    });
  }else
    this.setOptions({
      minTime:'00:00'
    });
};

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
var s = '{$projects.date_add}';
var pid = '{$projects.id}';
if(pid > 0)
d  = new Date(s);
/*else
s = d;*/

//alert(d.getHours());
jQuery('#date_addedd').datetimepicker({
	// value: s,
  onChangeDateTime:logic,
  onShow:logic,
  format:'m/d/Y H:i:s',
  step:1,
 // mask:'9999/19/39 29:59',
 // value: new Date(s),
  //defaultSelect:true,
  defaultTime: addZero(d.getHours())+':'+addZero(d.getMinutes()),
  minTime:addZero(d.getHours())+':'+addZero(d.getMinutes()),
   minDate:  new Date(serverdate),//new Date()
});

var e = '{$projects.date_close}';

if(pid > 0)
d  = new Date(e);
/*else
s = d;*/

jQuery('#date_closedd').datetimepicker({
	// value: e,
  onChangeDateTime:logic,
  onShow:logic,
  format:'m/d/Y H:i:s',
  step:1,
 // mask:'9999/19/39 29:59',
 // value: new Date(e),
  defaultTime: addZero(d.getHours())+':'+addZero(d.getMinutes()),
  minTime:addZero(d.getHours())+':'+addZero(d.getMinutes()),
   minDate:  new Date(serverdate),//new Date()
});

});
</script>
<script language="javascript" type="text/javascript">

$(function(){
  {if !$projects.buynow} 
   $('.buynow-area').hide();
  {/if} 
  {if $projects.time != ''} 
   $('select[name="time"]').val('{$projects.time}').change();;
  {/if}
  {if $projects.time_level != ''} 
   $('select[name="timelevel"]').val('{$projects.time_level}').change();;
  {/if}
  {if !$projects.auction} 
   $('.auction-area').hide();
  {/if} 
  {if $projects.shipping_price == 0} 
   $('.free-shipping-area').hide();
  {/if} 
   $('.shipping').on('click',function()
   {
      $('.shipping.disabled').removeClass('disabled');
      var att = $(this).attr('val');
      if(att == 1)
      {
        $('.free-shipping-area').hide();

        $('.free-shipping-area input').val(0.00);
      }  
      else
      {
        $('.free-shipping-area').show();
        $('.free-shipping-area input').val('');
      }  
      $(this).addClass('disabled');
   });
   $('.location').on('click',function()
   {
      $('.location.disabled').removeClass('disabled');
      var m_loc =$(this).attr('val');
      if(m_loc == 1)
      {
        $('input[name="work_loc"]').val('');
      }  
      else
      {
        $('input[name="work_loc"]').val($('input[name="work_loc"]').attr('default'));
      }  
      $('input[name="is_location"]').val($(this).attr('val'));
      $(this).addClass('disabled');
   });
   $('.buynow').on('click',function()
   {
     if($(this).is(':checked'))
     {
           $('.buynow-area').show();
           $('.buynow-area input').attr('required',true);
           $('#bprice').attr('data-parsley-max',$('.buynow-area input[name="mprice"]').val());
     } 
     else
     {
           $('.buynow-area').hide();
           $('.buynow-area input').removeAttr('required');
           $('#bprice').removeAttr('data-parsley-max');
     } 
   });
   $('.auction').on('click',function()
   {
     if($(this).is(':checked'))
     {
           $('.auction-area').show();
           $('.auction-area input').attr('required',true);
           $('.buynow-area input[name="qty"]').val(1).attr('readonly',true);
           $('#rprice').attr('data-parsley-min',$('.auction-area input[name="sprice"]').val());
     } 
     else
     {
           $('.auction-area').hide();
           $('.auction-area input').removeAttr('required');
           $('.buynow-area input[name="qty"]').attr('readonly',false);
           $('#rprice').removeAttr('data-parsley-min');
     } 
   });
   $('select[name="mcid"]').on('change',function()
   {
      $('select[name="cid"] option').hide();
      $('select[name="cid"] option:first').show();
      $('select[name="cid"] option[selected]').removeAttr('selected');
      $('select[name="cid"] option[pid="'+$(this).val()+'"]').show();
      console.log($(this).val());
      $('select[name="cid"] option[pid="'+$(this).val()+'"]:first').attr('selected',true);
   })
   Date.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    Date.format = 'mm/dd/yyyy';
   {if $projects.id == '' || $projects.id == 0 || $projects.market_status == 'moderate' || $projects.market_status == 'draft'}  
    $("#date_added").datePicker({ clickInput: false, 
        createButton: false, 
        showYearNavigation: false, 
        showHeader:2
    }).bind(
        'focus click keydown',
        function()
        {
          $("#date_added").dpRerenderCalendar();
          $("#date_added").dpSetStartDate(new Date('{$datenow}'));
            //$(obj).dpSetStartDate($("#funddater_"+curid).val());
            $("#date_added").dpDisplay();
      }
   );
   
    {/if}
   $(function () {
            $("#uploadBtn").change(function () {
                $('#add-product').parsley().destroy();
                $('#disabled-select').removeAttr('required');
                $('#add-product').parsley();
                if (typeof (FileReader) != "undefined") {
                    var dvPreview = $("#dvPreview");
                    dvPreview.html("");
                    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
                    $($(this)[0].files).each(function () {
                        var file = $(this);
                        if (regex.test(file[0].name.toLowerCase())) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var img = $("<img />");
                                img.attr("style", "height:100px;width: 100px");
                                img.attr("src", e.target.result);
                                dvPreview.append(img);
                            }
                            reader.readAsDataURL(file[0]);
                        } else {
                            alert(file[0].name + " is not a valid image file.");
                            dvPreview.html("");
                            return false;
                        }
                    });
                } else {
                    alert("This browser does not support HTML5 FileReader.");
                }
            });
        });
   
});

$('#product_category').on('change',function()
{
  questionList();
});

function questionList()
{
  console.log($('#pid').val());
   $.ajax({
  type: "GET",
  url: "/ajaxquestions/"+$('#product_category').val()+'/'+$('#pid').val(),
  success: function(data){
    console.log(data);
    $('.category_questions').html(data);
  }
  });
}

$(function()
{
    {if $projects.id > 0}
        questionList();
     {/if}
});
</script>