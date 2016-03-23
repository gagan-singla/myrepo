<script type="text/javascript">
function triggerfile()
    {
    $(".ah1 input[type='file']").trigger('click'); 
    }
	function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.ah1 #imageupload2').attr('src', e.target.result);
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
    $(".ah1 input[type='file']").change(function(){
        //$("#dvPreview").html("");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test($(this).val().toLowerCase())) {
            if ($.browser.msie && parseFloat(jQuery.browser.version) <= 9.0) {
                //$("#dvPreview").show();
                $(".ah1 #dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = $(this).val();
                 $(".ah1 #dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = 'scale';
                $(".ah1 #dvPreview img").hide();
            }
            else {
                if (typeof (FileReader) != "undefined") {
                    //$("#dvPreview").append("<img />");
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $(".ah1 #dvPreview img").attr("src", e.target.result);
                    }
                    reader.readAsDataURL($(this)[0].files[0]);
                } else {
                   
                }
            }
            var filename = $(this).val();
             var k = /C:\\fakepath\\/g;
   var s = filename.split("/").pop().replace(k,'');
            $('.ah1 .preview_name').html(s);
        } else {
            alert("Please upload a valid image file.");
        }
    });

    $(".ah3 input[type='file']").change(function(){
        //$("#dvPreview").html("");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test($(this).val().toLowerCase())) {
            if ($.browser.msie && parseFloat(jQuery.browser.version) <= 9.0) {
                //$("#dvPreview").show();
                $(".ah3 #dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = $(this).val();
                 $(".ah3 #dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = 'scale';
                $(".ah3 #dvPreview img").hide();
            }
            else {
                if (typeof (FileReader) != "undefined") {
                    //$("#dvPreview").append("<img />");
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $(".ah3 #dvPreview img").attr("src", e.target.result);
                    }
                    reader.readAsDataURL($(this)[0].files[0]);
                } else {
                   
                }
            }
            var filename = $(this).val();
             var k = /C:\\fakepath\\/g;
   var s = filename.split("/").pop().replace(k,'');
            $('.ah3 .preview_name').html(s);
        } else {
            alert("Please upload a valid image file.");
        }
    });
    function triggerfile2()
    {
    $(".ah3 input[type='file']").trigger('click'); 
    }
    function readURL2(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.ah3 #imageupload').attr('src', e.target.result);
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
    
	$(function()
	{
		Date.format = 'mm/dd/yyyy';
		$("#date_started").datetimepicker({
		 formatDate:'mm/dd/yyyy'
	    });   		
	});
</script>

 <script src="{$config.url}/js/jquery.datePicker.js"  type="text/javascript"></script>
  <script src="{$config.url}/js/jquery.datetimepicker.js"  type="text/javascript"></script>