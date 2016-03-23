var temp = '';
function paginationSearch(page) {
	$('input[name="page"]').val(page);
	$(document).scrollTop(100);
	searchForm();
}
function checkLevelSubCategory(id,level)
{
	
    $.ajax({
		type : 'GET',
		url : ASBASE + '/sublevelcategory/'+id,
		success : function(data) {
			var d = JSON.parse(data);

            $('.level_'+level+' select').val(d[0]['id']);
            changeSumCategory(d[0]['id'],d,0);
            //changeSubCategory
            
		}
	});
}
function changeSumCategory(id,d,s)
{

	$.ajax({
		type : 'GET',
		url : ASBASE + '/subcategory/'+id,
		success : function(data) {

			if(data == '-')
			{
				qlist();
				return false;
			}
			else
			{
				s = s+1;

				$('.sub_level_category').append(data);
				$('.level_'+s+' select').val(d[s]['id']);
				changeSumCategory(d[s]['id'],d,s)
			}	

            
		}
	});
}
function changeSubCategory(obj)
{
    var level  = parseInt($(obj).attr('level'));

    var m = $('.sub_level_category select').length;
    $('.category_questions').html('');
	

    while (level < m) {
    	level++;

        $('.level_'+level).remove();
		
		
    }	
	var m = $('.sub_level_category select').length;
	var one = '';
	for(var i = 0;i < m;i++)
	{
	  
		if(i == 0)
		{
			 one = $('.level_'+i+' select option:selected').text();		
		}
		else
		{	
			 one += " >> "+$('.level_'+i+' select option:selected').text();
		}	
	}
	//alert(one);
	
	$('#catdynval').html(one);

	
    $('#cid').val('');
    $.ajax({
		type : 'GET',
		url : ASBASE + '/subcategory/'+$(obj).val(),
		success : function(data) {
			$('#cid').val($(obj).val());

			if(data == '-')
			{
				qlist();				
				return false;
			}
			else
			{
				
				$('.sub_level_category').append(data);
				qlist();
						
			}	
			//alert(data);
            
		}
	});

}
function loadProfilePage() {

	$('#country').on(
			'change',
			function() {
				var m = $('#country option[value="' + $(this).val() + '"]')
						.attr('attr');

				//$('#state').html('');
				loadLocation('country', m, '', '');
				$('#states').parent().find('ul li.parsley-required').hide();
				$('#cities').parent().find('ul li.parsley-required').hide();

			});
	$('#states').on(
			'change',
			function() {
				var m = $('#states option[value="' + $(this).val() + '"]')
						.attr('attr');

				//$('#state').html('');
				loadLocation('state', m, '', '');
				$('#cities').parent().find('ul li.parsley-required').hide();

			});
}
function loadCity(url) {
	$.ajax({
		type : 'GET',
		url : url + '/ajax/load_user_zipcode',
		dataType : 'json',
		success : function(data) {

		}
	});
}
var append_option = '<option value="--name--" attr="--id--">--name--</option>';
function loadLocation(parent, val, defaults, df) {
	if (parent == 'country') {
		$('#states').html('');
		$('#states').attr('disabled', true);
	} else {
		$('#cities').html('');
		$('#cities').attr('disabled', true);
	}

	if (typeof (val) === 'undefined' || val === 'undefined'
			|| val === undefined) {
		return false;
	}
	$.ajax({
		type : "GET",
		url : "/location/" + parent + "/" + val,
		data : '',
		dataType : 'json',
		success : function(data) {

			for (i in data) {
				append_options = append_option.replace(/--name--/gi,
						data[i]['name']);
				append_options = append_options.replace(/--id--/gi,
						data[i]['location_id']);
				if (parent == 'country') {
					$('#states').append(append_options);
					$('#states').attr('disabled', false);

					if (data.length - 1 == i) {

						if (defaults != '') {
							$('#states option[value="' + defaults + '"]').attr(
									'selected', true);
						}

						var m = $(
								'#states option[value="' + $('#states').val()
										+ '"]').attr('attr');

						loadLocation('state', m, '', df);
					}

				} else {
					$('#cities').append(append_options);
					$('#cities').attr('disabled', false);
					if (data.length - 1 == i) {
						if (df != '') {
							$('#cities').val(df);
						}
					}
				}

			}

		}
	});

}
function PopupBox(link, content) {
	var r = confirm(content);
	if (r) {
		window.location.href = link;
	} else {
		return false;
	}
}
function PopupBox2(link) {
	var r =confirm('Are you Sure?');
	if(r){
		window.location.href = link;
	}
	else{
		return false;
	}
}
function runTimer() {

	var n = parseInt($('.cart').html());

	if (n > 0) {
		var r = parseInt($('.timer_cnt .cnter').html());
		if (r > 0) {
			r = r - 1;
			$('.timer_cnt').show();

			$('.timer_cnt .cnter').html(r);
			setTimeout(function() {
				runTimer();
			}, 1000);
		} else if (r == 0 && !$('.cart').hasClass('waitfewsec')) {
			$('.timer_cnt').hide();
			removeAllItems();
		} else {
			$('.timer_cnt').hide();
		}
		if(r == 120){alert('You have only two minutes to pay..');}
		
		
	} else {
		$('.timer_cnt').hide();
	}
}
function removeAllItems() {

	$.ajax({
		type : "GET",
		url : "/product/cart/remove/ajax",
		data : '',
		dataType : 'json',
		success : function(data) {

			$('.cart').html(0);
			$('.addcart span').html('Add To Cart');
			$('.timer_cnt').hide();
			if ($('.checkout_session').length > 0) {
				window.location.reload();
			}
		}
	});
}
function searchProject() {
	params = 'dummy=1&' + $('#user_search').serialize() + '&cid='
			+ $('.mdropdown').val();
	if ($('.subslice2').length == 0) {
		lreload('/search?' + params);
	}

	$.ajax({
		type : "POST",
		url : "/search",
		data : params,
		dataType : 'json',
		success : function(data) {

			$('.subslice2').html(data.html);
		}
	});
}
$(function() {
	clearCart();
	$('.floatpoint').each(
			function() {

				$(this).keypress(
						function(event) {
							var charCode = (event.which) ? event.which
									: event.keyCode;

							if (charCode > 31 && charCode != 37
									&& charCode != 39 && charCode != 46
									&& (charCode < 48 || charCode > 57))
								return false;
							if ($(this).val().indexOf('.') > 0
									&& charCode == 46) {
								return false;
							}
							return true;
						});
				$(this).blur(function(event) {
					if ($(this).val() > 0 && parseFloat($(this).val()) !== NaN)
						$(this).val(parseFloat($(this).val()).toFixed(2));
				});
				//$(this).val(parseFloat($(this).val()).toFixed(2));
			});
	$('.numberonly').each(
			function() {

				$(this).keypress(
						function(event) {
							var charCode = (event.which) ? event.which
									: event.keyCode;

							if (charCode > 31 && charCode != 37
									&& charCode != 39 && charCode != 46
									&& (charCode < 48 || charCode > 57))
								return false;
							return true;
						});
				$(this).blur(function(event) {
					if ($(this).val() > 0 && parseInt($(this).val()) !== NaN)
						$(this).val(parseInt($(this).val()));
				});
			});

	$('.count_numbers')
			.each(
					function() {
						$(this)
								.parent()
								.find('label')
								.css('width', '100%')
								.append(
										'<span style="float:right;width:50%;text-align:right;font-weight:normal;"> <font class="cnter"> '
												+ $(this).val().length
												+ '</font> of '
												+ $(this)
														.attr(
																'data-parsley-maxlength')
												+ ' characters</span>');
						$(this).on(
								'keypress',
								function() {
									$(this).parent().find('.cnter').html(
											$(this).val().length);
									if ($(this).val().length > parseInt($(this)
											.attr('data-parsley-maxlength'))) {
										// $(this).parent().find('.cnter').html($(this).attr('data-parsley-maxlength'));
										return false;
									}
								});
						$(this).on(
								'change',
								function() {
									$(this).parent().find('.cnter').html(
											$(this).val().length);
									if ($(this).val().length > parseInt($(this)
											.attr('data-parsley-maxlength'))) {
										//$(this).parent().find('.cnter').html($(this).attr('data-parsley-maxlength'));
										return false;
									}

								});
					});
	$('#feed_date').on('change',function() {
		var days = $(this).val();
		var params = {
				'days' : days
			}
			
		    $.ajax({
				type : 'GET',
				url : '/admincp/feedback/getdata',
				data : params,

				success : function(data) {
					$('table#feedbacklist>tbody').html('');
						$('table#feedbacklist>tbody').html(data);
				}
			});
	});
});
function clearCart() {

	$.ajax({
		type : 'GET',
		url : '/product/cart/clear',
		data : '',
		success : function(data) {

		}
	});
}
//feedbcak info
function feedbackReview(bid) {
	var params = {
		'id' : bid
	}
	$.ajax({
		type : 'POST',
		url : '/product/feedbackinfo',
		data : params,
		dataType : 'json',
		success : function(data) {
			$('#feedbackinfo .info-data').html(data.html);
			$('#feedbackinfo').modal();
		}
	});
}
//shipping info
function viewShippingInfo(cartid) {
	var params = {
		'id' : cartid
	}
	$.ajax({
		type : 'POST',
		url : '/product/shippinginfo',
		data : params,
		dataType : 'json',
		success : function(data) {
			$('#shippinginfo .info-data').html(data.html);
			$('#shippinginfo').modal();
		}
	});
}
function viewShippingTracking(cartid, buynowid) {
	var params = {
		'id' : cartid,
		'bid' : buynowid
	}
	$.ajax({
		type : 'POST',
		url : '/product/viewshippingtrackinfo',
		data : params,
		dataType : 'json',
		success : function(data) {
			$('#shippinginfo .info-data').html(data.html);
			$('#shippinginfo').modal();
		}
	});
}
function saveShippingInfo() {
	var params = $('#shipping-track-info').serialize();

	$.ajax({
		type : 'POST',
		url : '/product/updateshippinginfo?' + params,
		data : params,
		dataType : 'json',
		success : function(data) {
			$('.modal').modal('hide');
			$(temp).remove();
			if (data.error) {
				window.location = '{$config.url}';
			} else {
				setTimeout(function() {
					alert('Shipment Tracking Info Updated');
				}, 1000);
			}
		}
	});
}

function addShippingInfo(cartid, buynowid, obj) {
	var params = {
		'id' : cartid,
		'bid' : buynowid
	}
	temp = obj;
	$.ajax({
		type : 'POST',
		url : '/product/addshippinginfo',
		data : params,
		dataType : 'json',
		success : function(data) {
			$('#shippinginfo .info-data').html(data.html);
			$('#shippinginfo').modal();
		}
	});
}

function addtowatchlist(id) {
	params = {
		id : id
	};

	$.ajax({
		type : "POST",
		url : "/product/watchlist",
		data : params,
		dataType : 'json',
		success : function(data) {

			if (!data.access) {
				lreload('/login')
			} else if (data.isadded) {
				alert('Its already in watchlist');
			} else {
				alert('Added in your watchlist!');
				$("#addwatchlist").html('Added to Watchlist');

			}
		}
	});
}
function lreload(obj) {
	window.location = obj;
}

function projectLoad() {
	$(".file-upload").on(
			"change",
			function() {
				var id = $(this).attr('id');

				var files = !!this.files ? this.files : [];
				if (!files.length || !window.FileReader)
					return; // no file selected, or no FileReader support

				if (/^image/.test(files[0].type)) { // only image file
					var reader = new FileReader(); // instance of the FileReader
					reader.readAsDataURL(files[0]); // read the local file
					reader.onloadend = function() { // set image data as back
						$('.pro_image').css("background-image",
								"url(" + this.result + ")");
					}
				}
			});
}

function loginauto(tis) {
	// alert(1);
	var logintype = $(tis).val();
	//alert (logintype);
	if (logintype == 'buyer') {
		$('#autologinuserid').val('buyerauctionf@gmail.com');
		$('#autologin').submit();
	}
	if (logintype == 'seller') {
		$('#autologinuserid').val('sellerauctionf@gmail.com');
		$('#autologin').submit();
	} else if (logintype == 'admin') {
		$('#autologinuserid').val('admin@auctionsoftware.com');
		$('#autologin').attr('action', ILBASE + "/admin/login/save").submit();
	}

	//  $('#autologin').submit();
}

function createPopup(data) {
	var commonCss = ILBASE + '/css/common.css';
	var commonCss2 = ILBASE + '/css/common_responsive1.css';
	var bootstrapCss = ILBASE + '/css/bootstrap.css';
	var buyerCss = ILBASE + '/css/buyer2.css';
	var invoiceCss = ILBASE + '/css/invoice_pdf.css';
	var fwdHome = ILBASE + '/css/forward_home.css';
	var font_aw = 'http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css';
	var themeCSS = ILBASE + '/css/theme0.css';
	
	var content = data.replace(/<\/?a[^>]*>/g, "");
	
	var mywindow = window.open("", "new div", "height=1000,width=1500");
	mywindow.document
			.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""http://www.w3.org/TR/html4/strict.dtd">');
	mywindow.document.write("<html><head><title></title>");
	mywindow.document.write("<link rel=\"stylesheet\" href=" + commonCss
			+ " type=\"text/css\"/>");
	mywindow.document.write("<link rel=\"stylesheet\" href=" + commonCss2
			+ " type=\"text/css\"/>");
	mywindow.document.write("<link rel=\"stylesheet\" href=" + bootstrapCss
			+ " type=\"text/css\"/>");
	mywindow.document.write("<link rel=\"stylesheet\" href=" + buyerCss
			+ " type=\"text/css\"/>");
	mywindow.document.write("<link rel=\"stylesheet\" href=" + invoiceCss
			+ " type=\"text/css\"/>");
	mywindow.document.write("<link rel=\"stylesheet\" href=" + fwdHome
			+ " type=\"text/css\"/>");
	mywindow.document.write("<link rel=\"stylesheet\" href=" + font_aw
			+ " type=\"text/css\"/>");
	mywindow.document.write("<link rel=\"stylesheet\" href=" + themeCSS
			+ " type=\"text/css\"/>");
	mywindow.document.write("</head><body>");
	mywindow.document.write(content);
	mywindow.document.write("</body></html>");
	setTimeout(function() {
		mywindow.print();
	}, 4000)

	//mywindow.close();
	//return true;
}



function numberformat()
{   
	$('.format').each(function()
	{		
		// alert(parseFloat($(this).html()));
	    $(this).html(format(parseFloat($(this).html()),''));
	});
}

function format(n, currency) {
   return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}
numberformat();

function activate(id,type) {
	
	var r = confirm("You are activating new email method");
		
	if(r == true){
		$.ajax({
			type : "POST",
			url : "/admincp/mailers/active",
			data : {id:id,method:type},
			success : function(data) {

				location.reload();
			}
			
		});

	}
}

function deactivate(id,type) {
	
	var r = confirm("You are deactivating current method");

	if(r == true){
		$.ajax({
			type : "POST",
			url : "/admincp/mailers/deactive",
			data : {id: id,method:type},
			success : function(data) {

				location.reload();
			}
		});
	}
}

function loadState(){

	if($('#country').val() == $('#hidden_country').val()){
		populateStates("country", "state");
		$('#state').val($('#hidden_state').val());


	}
	if($('#country1').val() == $('#hidden_country').val()) {
		populateStates("country1", "state1");
		$('#state1').val($('#hidden_state1').val());
	}
	/*$.ajax({
		type: "GET",
		url: "/load_state/"+$('#country').val() ,
		success: function (data) {

			$('#divstate').html(data);
			if($('#country').val() == $('#hidden_country').val()){
				$('#state').val($('#hidden_state').val());
			}
		}
	});*/
}

$('.splchar_restrict').bind('keypress', function (event) {
	var regex = new RegExp("^[a-zA-Z0-9_ ,]+$");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
		event.preventDefault();
		return false;
	}
});

function redirect_ads(userid,id,url,budget_per_click){
	$.ajax({
		type: 'GET',
		url: '/adwords/update_user_click/' + id +'/'+userid+'/'+budget_per_click,
		data: {},
		dataType: 'json',
		success: function (data) {
			if(data.success) {
				location.reload();
				window.open(url,'_blank');
			}
		}
	});
}

function removecartitemjay(id,amount)
{
	if (confirm("Are you sure you want to remove it?") == true) {
		//console.log(parseInt($('#qty_add').val()));
		//console.log($('addcart').find('span').html().indexOf("Add"));
		if(parseInt(id) <= 0 || id == '')
		{
			alert('Invalid Listing');
			return false;
		}
		$.ajax({
			type : 'GET',
			url  : '/product/removecart/'+id,
			data : {},
			dataType : 'json',
			success  : function(data)
			{
				//console.log(data);

				if(data.success)
				{
					$('.div'+id).remove();
					var count = $('.cartyynew').html();
					$('.cartyynew').html(parseInt(count) - 1);
					var current_total = $('.total_amt').html();
					
					var f_amount = (parseFloat(current_total) - parseFloat(amount)).toFixed(2);
					$('.total_amt').html(f_amount);
					if(parseInt($('.cartyynew').html()) == 0){
						location.reload();
					}
					//window.location = '/product/checkout/cart/'
				}
				else
				{
					window.location = '/login';
				}
			}
		});
	}
}

function setIntreval(id,market_status)
{
	//console.log(timeProject[id]);
	clearvar[id] =  setInterval(function(){


		timeProject[id] = new Date();

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