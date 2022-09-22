(function($) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.loader-wrap').length){
			$('.loader-wrap').delay(1000).fadeOut(500);
		}
		TweenMax.to($(".loader-wrap .overlay"), 1.2, {
            force3D: true,
            left: "100%",
            ease: Expo.easeInOut,
        });
	}

	var menuBtns = document.getElementsByClassName('js-anim-menu-btn');
	if( menuBtns.length > 0 ) {
		for(var i = 0; i < menuBtns.length; i++) {(function(i){
			initMenuBtn(menuBtns[i]);
		})(i);}

		function initMenuBtn(btn) {
			btn.addEventListener('click', function(event){	
				event.preventDefault();
				var status = !Util.hasClass(btn, 'anim-menu-btn--state-b');
				Util.toggleClass(btn, 'anim-menu-btn--state-b', status);
				// emit custom event
				var event = new CustomEvent('anim-menu-btn-clicked', {detail: status});
				btn.dispatchEvent(event);
			});
		};
	};
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var sticky_header = $('.fixed-header .sticky-header, .header-style-two');
			if (windowpos > 250) {
				siteHeader.addClass('fixed-header');
				sticky_header.addClass("animated slideInDown");
			} else {
				siteHeader.removeClass('fixed-header');
				sticky_header.removeClass("animated slideInDown");
			}
		}
	}
	
	headerStyle();

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
	}

	//Menu Show / Hide
	if($('.anim-menu-btn').length){
		var animButton = $(".anim-menu-btn"),
	        navInner = $(".nav-inner");
		function showMenu() {
	        TweenMax.to(navInner, 0.6, {
	            force3D: false,
	            opacity: "1",
	            ease: Expo.easeInOut
	        });
	        navInner.removeClass("close-menu");
	    }

	    function hideMenu() {
	        TweenMax.to(navInner, 0.6, {
	            force3D: false,
	            opacity: "0",
	            ease: Expo.easeInOut
	        });
	        navInner.addClass("close-menu");
	    }
	    animButton.on("click", function() {
	        if (navInner.hasClass("close-menu")) showMenu();
	        else hideMenu();
	    });
	}

	//Search Form Show / Hide
	if($('.search-box .search-icon').length){
		$('.search-box .search-icon').on('click', function() {
			$('.main-header .main-search-form').fadeToggle(300);
		});
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu .navigation').html();
		$('.mobile-menu .navigation').append(mobileMenuContent);
		$('.sticky-header .navigation').append(mobileMenuContent);
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});

		var animButton = $(".anim-menu-btn"),
	        mobileMneu = $(".mobile-menu");

	    function showMenu() {
	        TweenMax.to(mobileMneu, 0.6, {
	            force3D: false,
	            left: "0",
	            ease: Expo.easeInOut
	        });
	        mobileMneu.removeClass("close-menu");
	    }

	    function hideMenu() {
	        TweenMax.to(mobileMneu, 0.6, {
	            force3D: false,
	            left: "-500px",
	            ease: Expo.easeInOut
	        });
	        mobileMneu.addClass("close-menu");
	    }
	    animButton.on("click", function() {
	        if (mobileMneu.hasClass("close-menu")) showMenu();
	        else hideMenu();
	    });
	}
	
	function fullHeight(){
		$('.full-height').css("height", $(window).height());
	}
	fullHeight();
	

	// Single Item Carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: true,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},		
				1200:{
					items:1
				}
			}
		});
	}

	// Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:20,
			nav:true,
			smartSpeed: 500,
			autoplay: true,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				767:{
					items:3
				},		
				1024:{
					items:4
				}
			}
		});
	}

	// Banner Background Slide
	if ($('.banner-background-slide').length) {
		$('.banner-background-slide').owlCarousel({
			loop:true,
			items:1,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: true
		});
	}

	if ($('.banner-section-four').length) {
		$('.banner-section-four').vegas({
			overlay: false,
			transition: 'fade', 
			transitionDuration: 4000,
			delay: 10000,
			animation: 'random',
			animationDuration: 20000,
			slides: [
				{ src: 'images/background/3.jpg' },
				{ src: 'images/background/2.jpg' },
				{ src:'images/background/4.jpg'}

			]
		});
	}

	//Sortable Masonary with Filters
	function sortableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				packery: {
  gutter: 100
},
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.on('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
				$container.isotope()
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});          
		}
	}
	
	sortableMasonry();

	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}

	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}

	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}

	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}


	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}

	function bannerSlider() {
	    if ($(".banner-slider").length > 0) {

		    // Banner Slider
			var bannerSlider = new Swiper('.banner-slider', {
				spaceBetween: 0,
				slidesPerView: 1,
				mousewheel: true,
				height: 500,
				grabCursor: true,
				loop: true,
				speed: 1400,
				autoplay: {
				    delay: 5000,
				},
				pagination: {
	                el: '.banner-slider-pagination',
	                clickable: true,
	            },
	            navigation: {
	                nextEl: '.banner-slider-button-next',
	                prevEl: '.banner-slider-button-prev',
	            },
			});
			bannerSlider.on('slideChange', function() {
	            var csli = bannerSlider.realIndex + 1,
	                curnum = $('#current');
	            TweenMax.to(curnum, 0.2, {
	                force3D: true,
	                y: -10,
	                opacity: 0,
	                ease: Power2.easeOut,
	                onComplete: function() {
	                    TweenMax.to(curnum, 0.1, {
	                        force3D: true,
	                        y: 10
	                    });
	                    curnum.html('0' + csli);
	                }
	            });
	            TweenMax.to(curnum, 0.2, {
	                force3D: true,
	                y: 0,
	                delay: 0.3,
	                opacity: 1,
	                ease: Power2.easeOut
	            });
	        });
	        
	        var totalSlides = bannerSlider.slides.length - 2;
	        $('#total').html('0' + totalSlides);
		}
		if ($(".three-item-carousel ").length > 0) {
            var totalSlides2 = $(".three-item-carousel .swiper-slide").length;
            var gridCarusel = new Swiper(".three-item-carousel", {
                preloadImages: false,
                loop: true,
                freeMode:false,
                slidesPerView: 3,
                spaceBetween: 0,
                grabCursor: true,
                mousewheel: true,
                speed: 1400,
                effect: "slide",
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },              
                pagination: {
	                el: '.banner-slider-pagination',
	                clickable: true,
	            },
                breakpoints: {
                    991: {
                      slidesPerView: 2,
                    },
                    640: {
                      slidesPerView: 1,
                    }, 
                }               
            }); 
            gridCarusel.on('slideChange', function() {
	            var csli = gridCarusel.realIndex + 1,
	                curnum = $('#current');
	            TweenMax.to(curnum, 0.2, {
	                force3D: true,
	                y: -10,
	                opacity: 0,
	                ease: Power2.easeOut,
	                onComplete: function() {
	                    TweenMax.to(curnum, 0.1, {
	                        force3D: true,
	                        y: 10
	                    });
	                    curnum.html('0' + csli);
	                }
	            });
	            TweenMax.to(curnum, 0.2, {
	                force3D: true,
	                y: 0,
	                delay: 0.3,
	                opacity: 1,
	                ease: Power2.easeOut
	            });
	        });
	        
	        var totalSlides = gridCarusel.slides.length - 6;
	        $('#total').html('0' + totalSlides);       
        }

	}

	// Video background
	if ($('.my-background-video').length) {
		$('.my-background-video').bgVideo({
			showPausePlay: false,
			pauseAfter: 1200
		});
	}

	if ($('.testimonial-carousel').length) {
		// Testimonial 
		var galleryThumbs = new Swiper('.testimonial-thumbs', {
			loop: true,
			spaceBetween: 10,
			slidesPerView: 3,
			initialSlide: 1,
			freeMode: true,
			speed: 1400,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			centeredSlides: true,
			autoplay: {
			    delay: 5000,
			},
		});
		var totalSlides = $(".swiper-container").length;
		var galleryTop = new Swiper('.testimonial-content', {
			spaceBetween: 10,
			slidesPerView: 1,
			mousewheel: true,
			autoplay: {
			    delay: 5000,
			},
			loop: true,
			speed: 1400,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			thumbs: {
				swiper: galleryThumbs
			}
		});
	}
		
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}

	if ($('.js-tilt').length) {
		$('.js-tilt img').tilt({
		    max: 35,
	        perspective: 1500,
	        mobile: false,
		})
	}

	function windwLoad() {
		sortableMasonry();
		fullHeight();
		bannerSlider();
		setTimeout(function() {
	        $(".animInBottom").each(function(a) {
	            var b = $(this);
	            setTimeout(function() {
	                TweenMax.to(b, 1.2, {
	                    force3D: true,
	                    bottom: "0",
	                    ease: Expo.easeInOut
	                });
	            }, 230 * a);
	        });

	    }, 400);

	    setTimeout(function() {
	        $(".animInTop").each(function(a) {
	            var b = $(this);
	            setTimeout(function() {
	                TweenMax.to(b, 1.2, {
	                    force3D: true,
	                    top: "0",
	                    ease: Expo.easeInOut
	                });
	            }, 230 * a);
	        });

	    }, 800);
	}	

	// Titanic icon
	var titanic = new Titanic({
	    hover: false,
	    click: true
	})




/* ==========================================================================
	When document is resize, do
   ========================================================================== */
   $(window).on('resize', function() {
		fullHeight();
		sortableMasonry();	
	});

/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		windwLoad();
	});
		

})(window.jQuery);

