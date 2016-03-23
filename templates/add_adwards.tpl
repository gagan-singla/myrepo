{include file="/common/header-1.tpl" nocache}
<link rel="stylesheet" type="text/css" href="{$config['externalcss']}/jquery.datetimepicker.css" />
<style>
    .padding_200 {
        padding: 7px 2px;
    }
</style>
<div class="col-md-12 mjusd1" style="color:#242525;">Adwords</div>
{if $error} <div class="alert alert-danger">{$error}</div>{/if}
<div class="col-md-12">
    <div class="col-md-1"></div>
    <form action="/adwords/save" id="paypal-form" method="post" data-parsley-validate enctype="multipart/form-data">
        <input type="hidden" name="paymentMethodNonceInputField" id='paymentMethodNonceInputField' />
        <input type="hidden" name="id" id="id" value="{$adwords_details.id}"  />

        <input type="hidden" name="pre_image" id="pre_image" value="{$adwords_details.banner}"  />
        <div class="col-md-10 mjusd4">
            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Ad Name*</div>
                <div class="col-md-7"><input type="text" class="form-control" name="ad_name" value="{$adwords_details.ad_name}" required/></div>
            </div>
            <div class="col-md-12  mjusd2">
                <div class="col-md-3">Ad title</div>
                <div class="col-md-7"><input type="text" class="form-control" name="ad_title" value="{$adwords_details.ad_title}" required /></div>
            </div>
            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Ad content</div>
                <div class="col-md-7"><input type="text" class="form-control" value="{$adwords_details.ad_content}" name="ad_content" required/></div>
            </div>
            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Ad URL*</div>
                <div class="col-md-7"><input type="url" class="form-control" value="{$adwords_details.ad_url}"  name="ad_url" required/></div>
            </div>

            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Banner*</div>
                <div class="col-md-7">
                    <input type="file"  name="ad_image" {if $adwords_details.banner == ''} required {/if}/>
                </div>
            </div>

            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Show Campaign <br/>Duration</div>
                <div class="col-md-7">
                    <div class="radio">
                        <label>
                            <input type="radio" name="show_campaign" id="optionsRadios1" value="0"  checked >
                            Continuously (you can pause or remove your campaign any time)
                        </label>
                    </div>

                    <div class="radio">
                        <label>
                            <input type="radio" name="show_campaign" id="optionsRadios2" value="1" >
                            Specific date
                        </label>
                    </div>

                    <input data-date-format="MM d, yyyy" name="end_date" id="date_addeddd" placeholder="mm/dd/yyyy"  autocomplete="off"  class="date-picker form-control hide" value="{$adwords_details.end_date}" data-parsley-group="block1" data-parsley-required-message="Please add start date" required maxlength="20"  type="text">

                </div>
            </div>


            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Days of the Week*</div>
                <div class="col-md-7">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Sunday" name="days">
                            Sunday
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Monday" name="days">
                            Monday
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Tuesday" name="days">
                            Tuesday
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Wednesday" name="days">
                            Wednesday
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Thursday" name="days">
                            Thursday
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Friday" name="days">
                            Friday
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Saturday" name="days">
                            Saturday
                        </label>
                    </div>

                    <div class="col-md-12 mjusd3">
                        Note:if none is selected, ad will get displayed in all sections.
                    </div>

                </div>
            </div>


            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Targeting Sections*</div>
                <div class="col-md-7">

                    <!--<div class="checkbox">
                        <label>
                            <input type="checkbox" value="">
                            Buyer Signup
                        </label>
                    </div>-->
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Messages" name="target_section">
                            Messages
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Sell an Item" name="target_section">
                            Sell an Item
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Seller DashBoard" name="target_section">
                            Seller DashBoard
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Buyer Dashboard" name="target_section">
                            Buyer Dashboard
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Product Page" name="target_section">
                            Product Page
                        </label>
                    </div>

                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="Membership" name="target_section">
                            Membership Page
                        </label>
                    </div>


                    <div class="col-md-12 mjusd3">
                        Note:if none is selected, ad will get displayed in all sections.
                    </div>

                </div>
            </div>

            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Keywords</div>
                <div class="col-md-7"><input type="text" class="form-control" name="keywords" value="{$adwords_details.keywords}"></div>
            </div>

            <div class="col-md-12 mjusd2">
                <div class="col-md-3">Campaign Budget</div>
                <div class="col-md-7">
                    <div class="col-md-12 padlef0">
                        <div class="col-md-12 padlef0">Your bid (the maximum you are willing to pay per click)</div>
                        <div class="col-md-12 padlef0 padee5">
                            <div class="col-md-1 padlef0 mjusd5">$</div>
                            <div class="col-md-4 padlef0"><input type="text" class="form-control" data-parsley-min="2" name="per_click_amount" value="{$adwords_details.budget_per_click}" required/></div>
                        </div>
                        <div class="col-md-12 padlef0 padee5">Minimum bid : US$2.00 Per Click</div>

                        <div class="col-md-12 padlef0 padee5"> What is the most you're willing to spend per day </div>
                        <div class="col-md-12 padlef0 padee5">
                            <div class="col-md-1 padlef0 mjusd5">$</div>
                            <div class="col-md-5 padlef0"><input type="text" class="form-control" name="per_day_amount" data-parsley-min="5"  value="{$adwords_details.budget_per_day}"required/></div>
                        </div>

                        <div class="col-md-12 padlef0 padee5">Minimum budget : US$5.00 Per day </div>

                    </div>
                </div>
            </div>


            <div class="col-md-12 text-center" style="margin-bottom: 13px;">
                <button type="submit" class="btn btn-danger">{if $adwords_details > 0} Update {else} Create {/if} Campaign</button>
            </div>



        </div>
    </form>

</div>
{include file="/common/footer-1.tpl" nocache}
<script type="text/javascript" src="{$config.url}/js/jquery.datetimepicker.js"></script>
<script>

    $(function() {

        $('input[name="days"]').each(function () {

            var k = ('({$adwords_details.days_week})').indexOf($(this).val());

            if (k > 0) {
                $(this).prop('checked', true);
            }
        });

        $('input[name="target_section"]').each(function () {
            console.log($(this).val());

            var k = ('({$adwords_details.target_sec_id})').indexOf($(this).val());

            if (k > 0) {
                $(this).prop('checked', true);
            }
        });

        $('input[name="show_campaign"]').click('click',function()
        {
            if($(this).val() == 1){
                $('#date_addeddd').removeClass('hide');
            }else{
                $('#date_addeddd').addClass('hide');
            }

        });
        var aid = '{$adwords_details.id}';
        if(aid > 0)
            {
            if ('{$adwords_details.show_continue}' == 1){
            $('#optionsRadios2').prop('checked',true);
            $('#date_addeddd').removeClass('hide');

        }else{
            $('#optionsRadios1').prop('checked',true);
        }
        }

    });


</script>

<script language="javascript" type="text/javascript">
    $(function()
    {

        var serverdate = '{$serverdate}';
//alert(serverdate);
        d = servdate =  new Date(serverdate);

        jQuery('#date_addeddd').datetimepicker({
            // value: s,

            format:'m/d/Y',
            step:1,
            dateOnly : true,
            timepicker:false,
            futureOnly : true,
            // mask:'9999/19/39 29:59',
            // value: new Date(s),
            //defaultSelect:true,

            minDate:  new Date(serverdate),//new Date()
        });



    });
</script>





