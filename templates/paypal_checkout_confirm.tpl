{include file="/common/header-1.tpl" nocache}
{if $failedpament == '0'}<div style="margin: 20px; color:#F00;">Error Occured with Payment. Please Contact Admin </div>
<script  type="text/javascript" language="javascript">
    $(function()
    {
        setTimeout(function(){window.location.href = "/";}, 1000);
    });
</script>
{/if}
{if $failedpament == '1'}
<div >Processing.....</div>
<div style="font-size: 18px; color:#ff0; "></div>
<form action="{$paypalurltopay}" target="PPDGFrame" class="standard">
    <input type="submit" id="submitBtn" value="Pay with PayPal" style="display:none;" >
    <input id="type" type="hidden" name="expType" value="light">
    <input id="paykey" type="hidden" name="paykey" value="{$clientToken}">
</form>
{literal}
<script src="https://www.paypalobjects.com/js/external/dg.js"  type="text/javascript" language="javascript">
</script>
<script  type="text/javascript" language="javascript">
    $(function()
    {
        setTimeout(function(){$('#submitBtn').trigger('click');}, 1000);

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {     // If Internet Explorer, return version number
            submitBtn = $('#submitBtn');
            // If another browser, return 0
        }
        var dgFlow = new PAYPAL.apps.DGFlow({ trigger: submitBtn});

    });
</script>
{/literal}
{/if}
{include file="/common/footer-1.tpl" nocache}
