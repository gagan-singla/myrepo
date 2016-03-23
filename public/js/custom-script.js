(function($) {

	if($("#homepage_slider .slides li").length > 1){
		$('#homepage_slider .slides').bxSlider({
			pager: true,
			controls: false,
			auto: true,
			pause: 7000
		});
	}
	
	$('.featured_content .col .inner').equalHeights();
	
	var divs = $("div.featured_services > div.service_entry");
	for(var i = 0; i < divs.length; i+=3) {
	  divs.slice(i, i+3).wrapAll("<div class='clearfix'></div>");
	}

	if(true == $("#mobile-trigger").is(':visible')){
		
		if($("#left_sidebar").length > 0){
			$('#left_sidebar').appendTo('#main-content');
		}
		
		$('#primary-navigation').append('<span class="sub-menu-bg"></span>');
		$('#primary-navigation').appendTo('#page');

		$('#mobile-trigger').click(function(){
			
			$(this).toggleClass('collapse');
			$('#primary-navigation').toggleClass('slideLeft');
			
			if(true == $(this).hasClass('collapse')){
				$('.sub-menu-bg').removeClass('submenuBgSlide');
				$(".sub-menu").removeClass('submenuSlide');
				$(".menu-item-has-children").removeClass('collapse');
			}
		});

		$(".nav-menu li.menu-item-has-children").prepend('<span class="subtoggle"></span>');

		
		$(".nav-menu .menu-item-has-children").click(function(){
			
			$(this).toggleClass('collapse');
			
			if(true == $(this).hasClass('collapse')){
				
				$(this).siblings().removeClass('collapse');
				$(this).siblings().children(".sub-menu").removeClass('submenuSlide');
				$(this).children(".sub-menu").addClass('submenuSlide');
				$('.sub-menu-bg').addClass('submenuBgSlide');

			} else {
				
				$(this).children(".sub-menu").removeClass('submenuSlide');
				$('.sub-menu-bg').removeClass('submenuBgSlide');

			}


		});


	}

})( jQuery );