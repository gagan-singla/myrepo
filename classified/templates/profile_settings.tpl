{include file="/common/header-1.tpl" nocache}
<style type="text/css">
.dvPreview img{
  margin:10px;
}
.category ul{
  display:none;
}
</style>
<link rel="stylesheet" type="text/css" href="{$config['externalcss']}ds-forms.css" />
<div class="row shipwrap">
<div class="daashbrd_cngpswd"><a href="/dashboard/my">Dashboard</a> &gt;&gt; Profile</div>

<div class="col-md-3 txtfun3 padlef0 mobile_view">
{include file="left-profile-nav.tpl" nocache}
</div>
<div class="col-md-9 mobile_view" style="margin-bottom: 10px;">
  <form action="/profile_settings/update/" method="post" accept-charset="utf-8" enctype="multipart/form-data"  data-parsley-validate id="profile_form">
      {if $save}
      <div class="row smsg_row">
        <div class="bg bg-success padding-20"> <i class="fa fa-warning"></i> Your profile successfully updated. </div>
      </div>
      {/if}
<div class="panel panel-default">
              <div class="panel-heading ct_headt">Personal Profile</div>
              <div class="panel-body" style="padding-bottom: 0;">
        <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <div id="dvPreview"><img id="imageupload" src="{if $users.avatar == ''} {$config['imgpath']}no_img.png {else if $users.avatar != ''}{$config['url']}/uploads/profile/{$users.avatar}{/if}" title="No Photo" alt="no_img" width="97" height="75"><br /></div>

                  <input name="profile_image" class="input file-upload" type="file" style="opacity:0">
          <button type="button" class="btn save_btn" onclick="triggerfile()">Upload</button>
                </div>
                <div class="col-md-8"><span class="preview_name"></span></div>
              </div>
              <div class="row frm">
                <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
                  <input class="form-control" placeholder="First Name*" name="firstname" value="{$users.first_name}" data-parsley-required>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6" >
                  <input class="form-control" placeholder="Last Name*"  name="lastname" value="{$users.last_name}" data-parsley-required>
                </div>
              </div>
              <div class="row frmbx">
                <div class="col-xs-12 col-sm-12 col-md-12">
                  <textarea class="form-control bder" rows="8" placeholder="Description*" name="aboutme" cols="28" rows="5" title="About Me" data-parsley-maxlength="1000" maxlength="1000" required>{$users.aboutme}</textarea>
                </div>
              </div>
              <div class="row frm">
                <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
                  <input class="form-control" placeholder="E-mail*" name="email" value="{$users.email}"  data-parsley-required>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input type="email" class="form-control" placeholder="Paypal E-mail*" name="paypal_address" value="{$users.paypal_address}"  data-parsley-required>
                </div>
              </div>
              <div class="row frm">
                <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
                  <input class="form-control numberonly" data-parsley-minlength="10" data-parsley-error-message="please enter valid phone number" placeholder="Cellphone Number" value="{$users.phone}" name="phone" maxlength="12" >
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input type="url" class="form-control" placeholder="Enter Url" name="url" value="{$users.profile_url}">
                </div>

              </div>
              <div class="row frm">
                <div class="col-xs-12 col-sm-6 col-md-6" style="margin-bottom:2%;">
                  <input class="form-control" placeholder="Address*" name="address1" value="{$users.address1}"  data-parsley-required>
                </div>
               <div class="col-xs-12 col-sm-6 col-md-3">
                  <input class="form-control" placeholder="Zip Code*" id="zipcode" name="zip" value="{$users.zip}" title="Zipcode" maxlength="10"  data-parsley-required onkeypress="$('.addresscity').html('');" onblur="checkStateCity('profile_form',0)">
                </div>
              </div>
              <div class="row frm">
                  <div class="col-xs-12 col-sm-12 col-md-12 addresscity">{if $users.zip != ''} {$users.city},{$users.state},{$users.country} {/if}</div>
                  <input type="hidden" name="state" id="state" value="{$val.state}" />
                 <input type="hidden" name="country" id="country" value="{$val.country}" />
                 <input type="hidden" name="city" id="city" value="{$val.city}" />

              </div>
              <div class="row">
                <div class="select">Select Categories</div>
               </div>
               <div class="row category">

            <!--{foreach $category as $key => $val}
            <div class="ds col-xs-12 col-sm-12 col-md-12">
        <label class="option srch_olbl" id="cat{$val.id}">
          <input type="checkbox"  name="categories[]" pid="{$val.parent_id}" value="{$val.id}" />
           <span class="checkbox"></span>{$val.name}
               </label>
              </div>
            {/foreach}-->

                   {foreach $maincategory as $key => $val}
                   <label class="option srch_olbl" id="cat{$val.id}">

                       <div class="ds col-xs-12 col-sm-12 col-md-12">
                           <label class="option srch_olbl" id="cat{$val.id}">
                               <input type="checkbox"  name="categories[]" pid="{$val.parent_id}" value="{$val.id}" />
                               <span class="checkbox"></span>{$val.name}
                               </label>
                           </div>
                   {foreach $subcategory as $key_sub => $val_sub}

                   {if $val.id == $val_sub.parent_id}
                       <div class="ds col-xs-12 col-sm-12 col-md-12">
                               <label class="option srch_olbl" id="cat{$val.id}">

                                   {for $foo=1 to {$val_sub.depth}} -- {/for} <input class="forward_v2" type="checkbox" name="categories[]" pid="{$val_sub.parent_id}"  value="{$val_sub.id}"  >
                                   <span class="checkbox"></span>{$val_sub.name}

                               </label>
                       </div>
                   {/if}

                   {/foreach}


                   {/foreach}

               </div>
              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-2">
                  <div class="btn btn-danger btgn" value="Save" onclick="checkStateCity('profile_form',1)" style="margin-bottom: 15px;" >Save</div>
                </div>
              </div>
            </div>
</div>

    </form>
</div>
</div>
{$disable_zip_popup = 1}
{include file="/common/footer-1.tpl" nocache}
<script>
var initValues = {};
{if {$mcats} != ''}
var initValues = '{$mcats}'.split(',');
{/if}
console.log(initValues);
$(':checkbox[name^="categories"]').each(function () {
  //console.log($(this).val());
    //console.log($.inArray($(this).val(), initValues));
    $(this).prop("checked", ($.inArray($(this).val(), initValues) != -1));
});

$(function()
{
  $('input[name="categories[]"]').each(function(){
    $(this).on('click',function(){
       var pid = $(this).attr('pid');
       var vid = $(this).attr('value');
       if(pid > 0)
       {
         if(!$(this).is(':checked'))
            {
             $('input[name="categories[]"][value="'+pid+'"]').attr('checked',false);
            }



       }
       else
       {
        if($(this).is(':checked'))
         {
          $('input[name="categories[]"][pid="'+vid+'"]').each(function()
          {
             $(this).attr('checked',false);
             $(this).click();
          });


         }
         else
         {
           $('input[name="categories[]"][pid="'+vid+'"]').each(function()
          {

             $(this).attr('checked',false);
           });
         }
       }
    });
  });
  var ctry = '{$users.country}';
  console.log(ctry);
  if(ctry !='')
  {

    $('#country').val(ctry);
    if($('#country option[value="{$users.country}"]').length > 0)
    {
    loadLocation('country',$('#country option[value="{$users.country}"]').attr('attr'),'{$users.state}','{$users.city}');
    }
    //loadLocation('state',$('#states option[value="{$users.state}"]').val(),'{$users.city}');
  }

  loadProfilePage();

  $('input[type=text]').each(function()
  {
    if($(this).val() == 'null')
    $(this).val('');

  });
});

    function triggerfile()
    {
    $("input[type='file']").trigger('click');
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imageupload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
       }
    jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();
    $("input[type='file']").change(function(){
        //$("#dvPreview").html("");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test($(this).val().toLowerCase())) {
            if ($.browser.msie && parseFloat(jQuery.browser.version) <= 9.0) {
                //$("#dvPreview").show();
                $("#dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = $(this).val();
                 $("#dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = 'scale';
                $("#dvPreview img").hide();
            }
            else {
                if (typeof (FileReader) != "undefined") {
                    //$("#dvPreview").append("<img />");
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("#dvPreview img").attr("src", e.target.result);
                    }
                    reader.readAsDataURL($(this)[0].files[0]);
                } else {

                }
            }
            var filename = $(this).val();
             var k = /C:\\fakepath\\/g;
   var s = filename.split("/").pop().replace(k,'');
            $('.preview_name').html(s);
        } else {
            alert("Please upload a valid image file.");
        }
    });


</script>
<style type="text/css">
#dvPreview
{
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);
    width:97px;
    max-width:97px;
    height:75px;
    max-height:75px;
    overflow:hidden;

  }
</style>