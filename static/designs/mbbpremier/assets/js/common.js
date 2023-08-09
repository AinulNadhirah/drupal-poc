$(document).ready(function(){

	var pages = [
		[ '#pHome', 	gPageHome ],
		// [ '#pProfiler', gPageProfiler ],
		[ '#pLiving', 	gPageLiving ],
		[ '#pConcierge',gPageConcierge ],
		[ '#pWealth', 	gPageWealth ],
		[ '#pContact', 	gPageContact ],
		[ '#pArticle', 	gPageArticle]
	];
	for (var i = 0; i < pages.length; i++){
		if ($(pages[i][0]).length === 1)
		pages[i][1]();
	}

	gPageProfiler();

});

var settings = {

	firstTimeUser: true

};

var util = {
	object: {
		exists: function(obj) {
			return $(obj) != undefined && $(obj) != null;
		}
	},

	common:{
		commonInit: function(){
			// Fix placeholer HTML5
			// $('input[placeholder], textarea[placeholder]').placeholder();
		},
		setupCurrentYear: function(objId){
			// Get current year
			if (util.object.exists(objId)) {
				now = new Date;
				theYear = now.getYear();
				if (theYear < 1900)	theYear = theYear+1900;
				$(objId).text(theYear);
			}
		},
		linkPageFadeout: function(objClass){
			$(objClass).click(function(){
				var href = $(this).attr('href');
				var target = $(this).attr('target');
				setTimeout('goToURL()', 1500);
				goToURL = function(){
					if (target == '_blank'){
						window.open(href, target);
						window.parent.location.reload();
					}
					else {
						window.location.reload();
						window.location = href;
					}
				}
				return false;
			});
		},
		measureText: function(pText, pFontSize, pStyle) {
			var lDiv = document.createElement('lDiv');

			document.body.appendChild(lDiv);

			if (pStyle != null) {
				lDiv.style = pStyle;
			}
			lDiv.style.fontSize = "" + pFontSize + "px";
			lDiv.style.position = "absolute";
			lDiv.style.left = -1000;
			lDiv.style.top = -1000;

			lDiv.innerHTML = pText;

			var lResult = {
				width: lDiv.clientWidth,
				height: lDiv.clientHeight
			};

			document.body.removeChild(lDiv);
			lDiv = null;

			return lResult;
		},

		globalInit: function(){

			var spd = 200,
				animationString = "fadeInDown fadeInLeft fadeOutLeft fadeOutRight fadeInLeft fadeInRight";


			// Mobile toggle
			var $offCanvasWrap = $('.off-canvas-wrap');
			var $offCanvasWrapOthers = $('.maybank-header-row-cls'); //off-canvas-wrap-others');
			$('.right-off-canvas-toggle').bind('click', function(){
				if($offCanvasWrapOthers.hasClass('move-left-4-nav')) {
					hideMobileMenu();
				} else {
					showMobileMenu();
				}
				
			})
			$('.exit-off-canvas').bind('click', function(){
				hideMobileMenu();
			})
			
			function showMobileMenu() {
				//$offCanvasWrap.addClass('move-left');
				$offCanvasWrapOthers.addClass('move-left-4-nav');
				$('.maybank-header-area-cls .right-off-canvas-menu').css({'display': 'block', 'overflow-y' : 'visible'});
				if ($.browser.msie) {
					$('.right-off-canvas-menu').animate({ right: 0 });
				}
			}
			
			function hideMobileMenu() {
				//$offCanvasWrap.removeClass('move-left');
				$offCanvasWrapOthers.removeClass('move-left-4-nav');
				$('.maybank-header-area-cls .right-off-canvas-menu').css({'display': ''});
				if ($.browser.msie) {
					$('.right-off-canvas-menu').animate({ right: '-100%' });
				}
			}


			// Init popup contact
			$('.iconPhone').bind('click', function(){
				console.log("++++++++++++++++ iconPhone +++++++++++++++++++");
				$('#popup-contact').fadeIn(spd, function(){
					console.log("~~~~~~~~~~~~~~~~ popup-contact ~~~~~~~~~~~~~~~");
					$(this).find('.popup-contact').show().addClass('animated fadeInDown');
					console.log($(this));
				});
			});

			$('.btnClose, .btnCloseIn').bind('click', function(e){
				e.preventDefault();
				$(this).parents('.popup').removeClass(animationString).addClass('fadeOutUp').parents('.popupHolder').delay(500).fadeOut(spd, function(){
					// $(this).find('.popup').removeClass('fadeOutUp').css('opacity',0);
					// $('.popup-contact').removeClass(animationString).hide();
					// $('.popup-arrange').removeClass(animationString).hide();
					$('.popup').removeClass('fadeOutUp').hide().css('opacity','1');
					$('.popupHolder').removeClass(animationString).hide();

					$('body').unbind('mousedown keydown mousemove');
					//util.widget.takeOver();
				});

			});

            $('.iconSearch').bind('click', function(){
				$('#popup-search').fadeIn(spd, function(){
					$(this).find('.popup-search').show().addClass('animated fadeInDown');
				});
			});


            $('#page-search-btn').bind('click', function(){
				var pageform = document.getElementById("pagesearchform");
                pageform.submit();
            });
			$('#overlay-search-btn').bind('click', function(){
				var overlayform = document.getElementById("overlaysearchform");
                overlayform.submit();
            });


			$('.btnLater').live('click', function(e){
				e.preventDefault();
				$(this).parents('.popup').removeClass(animationString).addClass('fadeOutUp').parents('.popupHolder').delay(500).fadeOut(spd, function(){
					$('.popup').removeClass('fadeOutUp').hide().css('opacity','1');
					$('.popupHolder').removeClass(animationString).hide();

					$('body').unbind('mousedown keydown mousemove');
					util.widget.takeOver();
				});

			});


			// Popup contact > Arrange a call back
			$('.link-arrangeCallBack').bind('click', function(){
                CallBackForm.formLoadTrigger();
				if ($('#popup-contact').css('display')=='none'){
					$('#popup-contact').show();
					$('.popup-arrange').css('opacity','1').show().addClass('animated fadeInRight');
				}
				else{
					$('.popup-contact').show().addClass('animated fadeOutLeft').animate({top:'0'}, 500, function(){
						$(this).hide().removeClass('fadeOutLeft');
						$('.popup-arrange').css('opacity','1').show().addClass('animated fadeInRight');
					});
				}
			});

			$('.popup-arrange .btnBack').bind('click', function(){
				$('.popup-arrange').show().removeClass('fadeInRight').addClass('fadeOutRight').animate({top:'0'}, 500, function(){
					$(this).hide().removeClass('fadeOutRight');
					$('.popup-contact').removeClass('fadeOutLeft').css('opacity','1').show().addClass('animated fadeInLeft');
					$("#popupcallbackform").trigger( "reset" );

				});
			});

			$('.popup-arrange .btnClose').bind('click', function(){
				$('.popup-arrange').show().removeClass('fadeInRight').addClass('fadeOutRight').animate({top:'0'}, 500, function(){
					$(this).hide().removeClass('fadeOutRight');
					$('.popup-contact').removeClass('fadeOutLeft').css('opacity','1').show().addClass('animated fadeInLeft');
					$("#popupcallbackform").trigger( "reset" );

				});
			});

			$('.popup-nearestCenter .btnBack').bind('click', function(){
				$('.popup-nearestCenter').show().removeClass('fadeInRight').addClass('fadeOutRight').animate({top:'0'}, 500, function(){
					$(this).hide().removeClass('fadeOutRight');
					$('.popup-contact').removeClass('fadeOutLeft').css('opacity','1').show().addClass('animated fadeInLeft');
				});
			});


				$('#pop-btn-arrange_submit').live('click', function(e){
					e.preventDefault()
					if (validateError('.arrange_form')){

						return;

					}
					else{
                        CallBackForm.popupformSubmit();

					}
				})


			// Popup contact > Find nearst centre
			$('.link-nearestCenter').bind('click', function(){
                CallBackForm.mapLoadTrigger();
				mapfirstinitialize();
				if ($('#popup-contact').css('display')=='none'){
					$('#popup-contact').show();					
					$('.popup-nearestCenter').css('opacity','1').show().addClass('animated fadeInRight');					
				}
				else{
					$('.popup-contact').show().addClass('animated fadeOutLeft').animate({top:'0'}, 500, function(){
						$(this).hide().removeClass('fadeOutLeft');
						$('.popup-nearestCenter').css('opacity','1').show().addClass('animated fadeInRight');
					});
				}

				setTimeout(function() {					
					google.maps.event.trigger(g_map, 'resize'); 
                    lc_firstLoad();
				}, 1000);
			});

			$('.popup-nearestCenter .btnBack').bind('click', function(){
				$('.popup-nearestCenter').show().removeClass('fadeInRight').addClass('fadeOutRight').animate({top:'0'}, 500, function(){
					$(this).hide().removeClass('fadeOutRight');
					$('.popup-contact').css('opacity','0').show().removeClass('fadeOutLeft').addClass('fadeInLeft');
				});
			});

            //show calculator

            //$(document).ready(function() {
                $('.showCal').toggle(
                    function() {
                        $('.tableChild').slideDown();
                        $('.txtShowCal').addClass('imgswap');
                        $('.showArrow').hide();
                    },
                    function() {
                        $('.tableChild').slideUp();
                        $('.txtShowCal').removeClass('imgswap');
                        $('.showArrow').show();
                    }
                );
           // });


			// Select dropdown handler
			$('.selectDropdown').bind('click', function(e){
				$(this).find('> p').toggleClass('active').next().stop(true,true).slideToggle(200);
			})

			$('.labelRadio').bind('click', function(e){
				e.preventDefault();
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
                var radioId = $(this).attr('for');
				$('#'+radioId).attr('checked', 'checked');
                $('#'+radioId).click();
			})


			// Go to top link
		$(document).ready(function(){

			//Check to see if the window is top if not then display button
			$(window).scroll(function(){
				if($(this).scrollTop() > 100){
					$('.go2top').fadeIn();
				} else {
					$('.go2top').fadeOut();
				}

			});

			$('.go2top').bind('click', function(){
				$('body').animate({ scrollTop: 0}, 1000);
			})

		});


			// Button fav trigger
			$('.btn-fav').live('click', function(e){
				e.preventDefault();
				if (!$(this).hasClass('active')) {
					$(this).addClass('active animated bounceIn');
					Favourites.addToFav(this);
				}
				else{
					$(this).removeClass('active bounceIn');
                    Favourites.removeFromFav(this);
				}
			});
			$('.btn-fav').live('mouseover', function(e){
				e.preventDefault();
				if (!$(this).hasClass('active')) {
					$(this).parents('.tile').append('<div class="layerFav"><div class="layerCover"><div class="layerText">Add to<br>Favourites</div></div></div>');
				}
				else{
					$(this).parents('.tile').append('<div class="layerFav"><div class="layerCover"><div class="layerText">Remove from<br>Favourites</div></div></div>')
				}
			})
			$('.btn-fav').live('mouseout', function(e){
				e.preventDefault();
				$(this).parents('.tile').find('.layerFav').remove();
			})


			$('.callbackSuccess .button').bind('click', function(e){
				e.preventDefault();
				//$(this).parent().slideUp().prev().slideDown().find("input[type=text], textarea").val("");
                $('#pContact .arrange #callbacksuccessdiv').slideUp();
                $('#pContact .arrange #callbackerrordiv').slideUp();
                $('#pContact .arrange #callbackform').slideDown();
                $('#pContact .arrange #callbackform').find("input[type=text], textarea").val("");

			});


			// Share functions handler
			var $socialShare = $('.social-function'),
				currentUrl = $(location).attr('href');

			$('.fb-icon').attr({ href:'https://www.facebook.com/sharer/sharer.php?u='+currentUrl, target:'_blank'});
			$('.twitter-icon').attr({ href:' https://twitter.com/home?status='+currentUrl, target:'_blank'});
			$('.gplus-icon').attr({ href:' https://plus.google.com/share?url='+currentUrl, target:'_blank'});
			$('.gmail-icon').attr({ href:'mailto:'});
		}
	},

	widget: {
		setupScroll: function(objClass) {
			// Init scrollbar
			if (util.object.exists(objClass)) {
				var ginScroll = $(objClass);
					ginScroll.tinyscrollbar();
					ginScroll.tinyscrollbar_update();
			}
		},

		initDot: function() {
			[].slice.call( document.querySelectorAll( '.dotstyle > ul' ) ).forEach( function( nav ) {
				new DotNav( nav, {
					callback : function( idx ) {
						//console.log( idx )
					}
				} );
			} );
		},

		initNav: function(){
			
			var $nav = $('#nav'),
				spd = 500,
				easing = 'easeOutBack',
				extraSpacing = 64,
				defaultNavActiveOffset;

			if ($nav.find('.active').html() != null){

				var itemW = $nav.find('.active').width();
				defaultNavActiveOffset = $nav.find('.active').position().left + itemW;
				var sW = getDocumentSize(0);
				
				$('.nav-active').css({ left: defaultNavActiveOffset });
				if (sW<640){
					$('.nav-active').addClass('nav-active_mobile');
				}
				initNav();

				$(window).resize(function(){
					sW = getDocumentSize(0);
					if ((sW<1008)&&(sW>640)){
						extraSpacing = 24;
					}
					else{
						extraSpacing = 84;
					}

					if (sW<640){
						$('.nav-active').addClass('nav-active_mobile');
						$nav.find('li').unbind('mouseover');
						$nav.find('li').unbind('mouseout');
						$nav.find('li').unbind('click');
					}
					else{
						var itemW = $nav.find('.active').width();
						defaultNavActiveOffset = $nav.find('.active').position().left + itemW;
						$('.nav-active').css({ left: defaultNavActiveOffset }).removeClass('nav-active_mobile');
						initNav();
					}
				});
			}
			else{
				$('.nav-active').css({ left: '118px' });
			}

			function initNav(){
				$nav.find('li').bind('mouseover', function(){
					var itemW = $(this).width();
					var offsetLeft = $(this).position().left + itemW;
					// var offsetLeft = $(this).offset().left - 120;
					$('.nav-active').stop().animate({
						left: offsetLeft
					}, spd, easing)
				})
				$nav.find('li').bind('mouseout', function(){
					var offsetLeft = $(this).parent().find('.active').position().left + itemW;
					$('.nav-active').stop().animate({
						left: offsetLeft
					}, spd, easing)
				})
				$nav.find('li').bind('click', function(){
					$nav.find('.active').removeClass('active');
					$(this).addClass('active');
				})
			}
		},

		eli: function(){
			var $popupEli = $('.popup-eligibility'),
				spd = 400;

			$('.living-social-block h3').bind('click', function(){
				$(this).toggleClass('active');
				$popupEli.stop(true,false).slideToggle(spd);

			})
			$popupEli.find('.btnClose').bind('click', function(){
				$('.living-social-block h3').removeClass('active');
				$popupEli.slideUp(spd);
			})

		},

		inputErrorFocusOut: function(){
			$('input.error').live('focusout', function() {
				var value = $(this).val();
				if (value) {
					var holderText = $(this).attr('data-placeholder');
					$(this).attr('placeholder', holderText);
					$(this).removeClass('error');
				}
			});

            $('select.error').live('focusout', function() {
				var value = $(this).val();
				if (value) {
					var holderText = $(this).attr('data-placeholder');
					$(this).attr('placeholder', holderText);
					$(this).removeClass('error');
				}
			});

			$('textarea.error').live('focusout', function() {
				var value = $(this).val();
				if (value) {
					var holderText = $(this).attr('data-placeholder');
					$(this).attr('placeholder', holderText);
					$(this).removeClass('error');
				}
			});
		},

		takeOver: function(){
			//console.log('take Over')
			var isUserActive = true,
				timeoutTime = 30000,
				timeoutTimer = setTimeout(showTakeoverPopup, timeoutTime),
				spd = 500,
				animationString = "fadeInDown fadeInLeft fadeOutLeft fadeOutRight fadeInLeft fadeInRight";

			// console.log(settings.firstTimeUser)
			$(document).ready(function() {
			    $('body').bind('keydown mousemove', function(event) {
			        clearTimeout(timeoutTimer);
			        timeoutTimer = setTimeout(showTakeoverPopup, timeoutTime);
			    });
			});

			function showTakeoverPopup(){ 
				if(!Common.getCookie(Constants.dontShowTakeOverCookieName)){
                    if(!Common.getCookie(Constants.eventSignupCookie)){
                        $('#popup-takeOver').fadeIn(spd, function(){
                            $(this).find('.popup-takeOver').show().addClass('animated fadeInDown');
                            TakeOver.formLoadTrigger();
                             $('body').unbind('mousedown keydown mousemove');
                        });
                        $('body').animate({ scrollTop: '0'}, 500);
                    }
                }
			}

			$('.thank-you a').bind('live', function(e){
				e.preventDefault();
				$(this).parents('.popup').removeClass(animationString).addClass('fadeOutUp').parents('.popupHolder').delay(500).fadeOut(spd, function(){
					$(this).find('.popup').removeClass('fadeOutUp').css('opacity',0);
				});
			});
		},

		firstTimeUser: function(){
			var spd = 200;

			checkCookie();

			function setCookie(cname,cvalue,exdays){
				var d = new Date();
				d.setTime(d.getTime()+(exdays*24*60*60*1000));
				var expires = "expires="+d.toGMTString();
				document.cookie = cname + "=" + cvalue + "; " + expires;
			}

			function getCookie(cname){
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for(var i=0; i<ca.length; i++) {
					var c = $.trim(ca[i]);
					if (c.indexOf(name)==0) return c.substring(name.length,c.length);
				}
				return "";
			}

			function checkCookie(){
				var user=getCookie(Constants.profilerCookieName);
                var dontshow=getCookie(Constants.dontShowProfilerCookieName);
				if (user!=""){
				
					//util.widget.takeOver();
                    Common.setBannerPersonalization();

					// Uncomment the line below to view the popup
					/*$('#popup-takeOver').fadeIn(spd, function(){
						$(this).find('.popup-firstTime').show().addClass('animated fadeInDown');
					});*/
					return;
				}
				else{
                        if(dontshow==""){
                     
                            settings.firstTimeUser = false;
                            $('#popup-takeOver').fadeIn(spd, function(){
                                Profiler.formLoadTrigger();
                                $(this).find('.popup-firstTime').show().addClass('animated fadeInDown');

                            });
                        }

				}
			}
		},

		initNavSwipe: function(){
			var $heroBanner = $('.heroBanner'),
				targetUrl;

			$heroBanner.on('swiperight', function(evt) {
				targetUrl = $heroBanner.find('.prevPage').attr('href');
				window.location.href = targetUrl;
			});

			$heroBanner.on('swipeleft', function(evt) {
				targetUrl = $heroBanner.find('.nextPage').attr('href');
				window.location.href = targetUrl;
			});
		},

		detectBrowser: function(){
			var userAgent = navigator.userAgent.toLowerCase(),
			    browser   = '',
			    version   = 0,
			    isNotSupport = false;

			$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

			if ($.browser.msie) {
			  userAgent = $.browser.version;
			  userAgent = userAgent.substring(0,userAgent.indexOf('.'));
			  version = userAgent;
			  browser = "Internet Explorer";
			  if (version<8){
			  	isNotSupport=true;
			  }
			}

			if ($.browser.chrome) {
			  userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7);
			  userAgent = userAgent.substring(0,userAgent.indexOf('.'));
			  version = userAgent;
			  $.browser.safari = false;
			  browser = "Chrome";
			  if (version<30){
			  	isNotSupport=true;
			  }
			}

			if ($.browser.safari) {
			  userAgent = userAgent.substring(userAgent.indexOf('safari/') + 7);
			  userAgent = userAgent.substring(0,userAgent.indexOf('.'));
			  version = userAgent;
			  browser = "Safari";
			  if (version<6){
			  	isNotSupport=true;
			  }
			}

			if ($.browser.mozilla) {
				if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
					userAgent = userAgent.substring(userAgent.indexOf('firefox/') + 8);
					userAgent = userAgent.substring(0,userAgent.indexOf('.'));
					version = userAgent;
					browser = "Firefox"
					if (version<25){
					  isNotSupport=true;
					}
				}
				else {
				  browser = "Mozilla (not Firefox)"
				}
			}

			// if ($.browser.opera) {
			// 	userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
			// 	userAgent = userAgent.substring(0,userAgent.indexOf('.'));
			// 	version = userAgent;
			// 	browser = "Opera";
			// }

			if (isNotSupport) 
                window.location.href = "http://www.maybankpremierwealth.com/my/en/incompatible-browser.html";

		}  
	}
};

var ui = {
	gPageHome:{

		isLoading: false,
		fakeLoad: false,

		init: function() {
			var spd = 200;
			$('.home-customize').bind('click', function(e){
				// e.preventDefault();
				$('#popup-customise').fadeIn(spd, function(){
					$(this).find('.popup-customise').show().addClass('animated fadeInDown');
				});

			});
		},

		onScrollHandler: function(){
			$(window).scroll(function() {
				// console.log($(window).scrollTop() + $(window).height() +' / '+ $(document).height())
				if($(window).scrollTop() + $(window).height() > $(document).height()-100) {
					ui.gPageHome.onScrollEndHandler();
				}
			});
		},
		onScrollEndHandler: function() {
			$('.loadMore').fadeIn();
			ui.gPageHome.isLoading=true;
			clearTimeout(ui.gPageHome.fakeLoad);

			if (ui.gPageHome.isLoading){
				ui.gPageHome.fakeLoad = setTimeout("ui.gPageHome.onSrollLoaded();",3000);
			}
		},
		onSrollLoaded: function(){
			NewsListing.doLazyLoad(); 
		}
	},

	gPageProfiler: {
		init: function() {

			if ($('#pConcierge').hasClass('page')){}
			else{

				var itemPos = 0,
					itemWidth = 271,
					itemHeight = 200,
					marginTop = 50,
					screenWidth = getDocumentSize(2);
				if (screenWidth <= 600) {
					itemWidth = 135;
					itemHeight = 100;
					marginTop = 30;
				}
				var totalWidth = $('.profiler-item').length * itemWidth;
				$('.profiler-item').each(function(index) {
					itemPos = index * itemWidth;
					$(this).css({
						width: itemWidth + 1,
						height: itemHeight,
						left: itemPos
					});
				});
				$('.profiler-item > img').css({
					height: itemHeight
				});
				$('.profiler-content').css({
					width: totalWidth,
					left: (screenWidth - totalWidth) / 2
				});
				
				$('.popup-firstTime .prevPage').bind('click', function() {		
					moveSlideBack();
				});
				$('.popup-firstTime .nextPage').bind('click', function() {
					moveSlideForward();
				});

				$('.profiler-item').bind('mouseover', function(evt) {
					$(this).stop(true, false).animate({
						height: itemHeight + itemHeight / 10 * 2,
						top: -(itemHeight / 10)
					}, 500, 'easeOutQuint');
					$(this).find(' > img').stop(true, false).animate({
						height: itemHeight + itemHeight / 10 * 2,
						'margin-left': -27
					}, 500, 'easeOutQuint');

					var imgCheckEle = $(this).find('img.checked');
					if (!$(imgCheckEle).length) {
						$(this).find('.profiler-ovl').stop(true, false).animate({
							opacity: 1
						}, 500, 'easeOutQuint');
						$(this).find('.profiler-ovl p').stop(true, false).animate({
							'margin-top': marginTop + itemHeight / 10
						}, 500, 'easeOutQuint');
					}
				});

				$('.profiler-item').bind('mouseout', function(evt) {
					$(this).stop(true, false).animate({
						height: itemHeight,
						top: 0
					}, 500, 'easeOutQuint');
					$(this).find(' > img').stop(true, false).animate({
						height: itemHeight,
						'margin-left': 0
					}, 500, 'easeOutQuint');

					$(this).find('.profiler-ovl').stop(true, false).animate({
						opacity: 0
					}, 500, 'easeOutQuint');
					$(this).find('.profiler-ovl p').stop(true, false).animate({
						'margin-top': marginTop
					}, 500, 'easeOutQuint');
				});

				$('.profiler-item').bind('click', function(evt) {
					var checkEle = $(this).find('.checked');
					if ($(checkEle).length) {
						$(checkEle).remove();
						if ($(this).height() > itemHeight) {
							$(this).find('.profiler-ovl').stop(true, false).animate({
								opacity: 1
							});
						}
					} else {
						$(this).append('<a class="checked" href="#" title=""><img src="/etc/designs/mbbprivate/assets/images/checked.png" alt="" /></a>');
						$(this).find('.profiler-ovl').stop(true, false).css({
							opacity: 0
						});
					}
				});

				if (totalWidth > screenWidth) {
					var dragWidth = screenWidth - totalWidth - 1;
					$('.profiler-content').draggable({containment: [dragWidth, 0, 0, 0], axis: 'x', delay: 100});
				}

				$('.btn-next').bind('click', function(evt) {
					evt.preventDefault();

					$('.profiler-wrapper').stop(true, false).animate({
						opacity: 0
					}, 300, 'easeOutQuad', function() {
						$('.profiler-wrapper').css({
							display: 'none'
						});
					});

					$('.feeds-wrapper').css({
						display: 'block'
					});

					var feedEle = $('.feeds-wrapper').children();
					for (i = 0; i < feedEle.length; i++) {
						$(feedEle[i]).css({
							opacity: 0,
							position: 'relative',
							top: 50
						});

						$(feedEle[i]).stop(true, false).delay(i * 80 + 300).animate({
							opacity: 1,
							top: 0
						}, 500, 'easeOutQuad');
					}
				});

                // screen 3 start here

				$('.restoreCookiesBtn').bind('click', function(evt) {
					evt.preventDefault();

					$('.profiler-wrapper').stop(true, false).animate({
						opacity: 0
					}, 300, 'easeOutQuad', function() {
						$('.profiler-wrapper').css({
							display: 'none'
						});
					});

					$('.restore-cookies-wrapper').css({
						display: 'block'
					});

					var feedEle = $('.restore-cookies-wrapper').children();
					for (i = 0; i < feedEle.length; i++) {
						$(feedEle[i]).css({
							opacity: 0,
							position: 'relative',
							top: 50
						});

						$(feedEle[i]).stop(true, false).delay(i * 80 + 300).animate({
							opacity: 1,
							top: 0
						}, 500, 'easeOutQuad');
					}
				});


				// screen 3 end here

				$('#pProfiler .btn-skip').bind('click', function(evt) {
					evt.preventDefault();
                    	Common.setCookie(Constants.dontShowProfilerCookieName, 'noshow', 7);
					$('#pProfiler .popup-firstTime .btnClose').click();
				});


				$('.btn-done').bind('click', function(evt) {
					var animationString = "fadeInDown fadeInLeft fadeOutLeft fadeOutRight fadeInLeft fadeInRight",
						spd = 200;
					if (validateError('.feeds-wrapper')) {
						return;
					}
					else{
                        Profiler.submitForm();
						/*$('.popup-firstTime').removeClass(animationString).addClass('fadeOutUp').parents('.popupHolder').delay(500).fadeOut(spd, function(){
							$(this).find('.popup').removeClass('fadeOutUp').css('opacity',0);
							util.widget.takeOver();
						});*/
					}
				});

                $('#restoreCook').off().bind('click', function(evt) {
					if (validateError('.restore-cookies-wrapper')) {
						return;
					}
					else{
                        Profiler.retrieveProfile();
						/*$('.popup-firstTime').removeClass(animationString).addClass('fadeOutUp').parents('.popupHolder').delay(500).fadeOut(spd, function(){
							$(this).find('.popup').removeClass('fadeOutUp').css('opacity',0);
							util.widget.takeOver();
						});*/
					}
				});
			}

			$(window).resize(function(evt) {
				itemPos = 0;
				itemWidth = 271;
				itemHeight = 200;
				marginTop = 50;
				screenWidth = getDocumentSize(2);

				if (screenWidth <= 600) {
					itemWidth = 135;
					itemHeight = 100;
					marginTop = 30;
				}
				var totalWidth = $('.profiler-item').length * itemWidth;
				$('.profiler-item').each(function(index) {
					itemPos = index * itemWidth;
					$(this).stop(true, true).css({
						width: itemWidth + 1,
						height: itemHeight,
						left: itemPos
					});
				});
				$('.profiler-item > img').stop(true, true).css({
					height: itemHeight
				});
				$('.profiler-content').css({
					width: totalWidth,
					left: (screenWidth - totalWidth) / 2
				});
				if (totalWidth > screenWidth) {
					var dragWidth = screenWidth - totalWidth - 1;
					$('.profiler-content').draggable({containment: [dragWidth, 0, 0, 0], axis: 'x', delay: 100});
				}
			});

			/*
			$('.sign-up-for .input_email').next().bind('click', function(evt){
				$('.sign-up-for .callbackSuccess').hide().prev().show().find('input[type=text]').val("").parents('.popup').find('.btnClose').click();
			});

			$('.btn-signup-email').bind('click', function(evt) {
				evt.preventDefault();

				if (validateError('.sign-up-for .input_email')) {
					$('.sign-up-for .input_email').addClass('error');
					return;
				}
				else{
					$('.sign-up-for .input_email').hide().next().show();
                    TakeOver.submitForm();
					return;
				}

				$('.sign-up-for').stop(true, false).animate({
					opacity: 0
				}, 300, function() {
					$('.sign-up-for').addClass('h');
					$('.thank-you').removeClass('h');
					$('.thank-you').css({
						opacity: 0
					});
					$('.thank-you').stop(true, false).delay(300).animate({
						opacity: 1
					}, 500);
				});
			});

			$('.sign-up-for .input_email input.error').live('focusout', function() {
				var value = $(this).val();
				if (value) {
					var holderText = $(this).attr('data-placeholder');
					$(this).attr('placeholder', holderText);
					$('.sign-up-for .input_email').removeClass('error');
				}
			});*/
		}
	},
	gPageLiving: {
		init: function() {
		}
	},
	gPageConcierge: {
		init: function() {

			var isAnimating = true,
				itemPos = 0,
				itemWidth = 271,
				itemHeight = 200,
				marginTop = 50,
				screenWidth = getDocumentSize(2);
			if (screenWidth <= 600) {
				itemWidth = 135;
				itemHeight = 100;
				marginTop = 30;
			}
			var totalWidth = $('.profiler-item').length * itemWidth;
			$('.profiler-item').each(function(index) {
				itemPos = index * itemWidth;
				$(this).css({
					width: itemWidth + 1,
					height: itemHeight,
					left: itemPos
				});
			});
			$('.profiler-item > img').css({
				height: itemHeight
			});
			$('.profiler-content').css({
				width: totalWidth,
				left: (screenWidth - totalWidth) / 2
			});

			$('.profiler-item').bind('mouseover', function(evt) {
				if (!isAnimating) {
					$(this).stop(true, false).animate({
						height: itemHeight + itemHeight / 10 * 2,
						top: -(itemHeight / 10)
					}, 500, 'easeOutQuint');
					$(this).find(' > img').stop(true, false).animate({
						height: itemHeight + itemHeight / 10 * 2,
						'margin-left': -27
					}, 500, 'easeOutQuint');

					var imgCheckEle = $(this).find('img.checked');
					if (!$(imgCheckEle).length) {
						$(this).find('.profiler-ovl').stop(true, false).animate({
							opacity: 1
						}, 500, 'easeOutQuint');
						$(this).find('.profiler-ovl p').stop(true, false).animate({
							'margin-top': marginTop + itemHeight / 10
						}, 500, 'easeOutQuint');
					}
				}
			});

			$('.profiler-item').bind('mouseout', function(evt) {
				if (!isAnimating) {
					$(this).stop(true, false).animate({
						height: itemHeight,
						top: 0
					}, 500, 'easeOutQuint');
					$(this).find(' > img').stop(true, false).animate({
						height: itemHeight,
						'margin-left': 0
					}, 500, 'easeOutQuint');

					$(this).find('.profiler-ovl').stop(true, false).animate({
						opacity: 0
					}, 500, 'easeOutQuint');
					$(this).find('.profiler-ovl p').stop(true, false).animate({
						'margin-top': marginTop
					}, 500, 'easeOutQuint');
				}
			});

			$('.profiler-item').bind('click', function(evt) {
				var checkEle = $(this).find('.checked');
				if ($(checkEle).length) {
					$(checkEle).remove();
					if ($(this).height() > itemHeight) {
						$(this).find('.profiler-ovl').stop(true, false).animate({
							opacity: 1
						});
					}
				} else {
					$(this).append('<a class="checked" href="#" title=""><img src="/etc/designs/mbbprivate/assets/images/checked.png" alt="" /></a>');
					$(this).find('.profiler-ovl').stop(true, false).css({
						opacity: 0
					});
				}
			});

			if (totalWidth > screenWidth) {
				var dragWidth = screenWidth - totalWidth - 1;
				$('.profiler-content').draggable({containment: [dragWidth, 0, 0, 0], axis: 'x', delay: 100});
			}

			$(window).resize(function(evt) {
				itemPos = 0;
				itemWidth = 271;
				itemHeight = 200;
				marginTop = 50;
				screenWidth = getDocumentSize(2);

				if (screenWidth <= 600) {
					itemWidth = 135;
					itemHeight = 100;
					marginTop = 30;
				}
				var totalWidth = $('.profiler-item').length * itemWidth;
				$('.profiler-item').each(function(index) {
					itemPos = index * itemWidth;
					$(this).stop(true, true).css({
						width: itemWidth + 1,
						height: itemHeight,
						left: itemPos
					});
				});
				$('.profiler-item > img').stop(true, true).css({
					height: itemHeight
				});
				$('.profiler-content').css({
					width: totalWidth,
					left: (screenWidth - totalWidth) / 2
				});
				if (totalWidth > screenWidth) {
					var dragWidth = screenWidth - totalWidth - 1;
					$('.profiler-content').draggable({containment: [dragWidth, 0, 0, 0], axis: 'x', delay: 100});
				}

				if (screenWidth <= 660) {
					$('.form-slider').show();
				} else {
					if (curStep == 1) {
						$('.form-slider').hide();
					}
				}
			});

			$('.profiler-slider').on('swipeleft', function(evt) {
				var dragWidth = screenWidth - totalWidth - 1,
					curLeft = $('.profiler-content').position().left;
				curLeft -= 300;
				if (curLeft < dragWidth) {
					curLeft = dragWidth;
				}
				$('.profiler-content').stop(true, false).animate({
					left: curLeft
				}, 500);
			});

			$('.profiler-slider').on('swiperight', function(evt) {
				var dragWidth = screenWidth - totalWidth - 1,
					curLeft = $('.profiler-content').position().left;
				curLeft += 300;
				if (curLeft > 0) {
					curLeft = 0;
				}
				$('.profiler-content').stop(true, false).animate({
					left: curLeft
				}, 500);
			});

			// FORM
			$('.orbit li:eq(1)').show();
			rUtils.initComboBox();
			$('.orbit li:eq(1)').hide();
			$('.calendar input').datepicker({
				showOn: 'button',
				buttonImage: 'images/calendar_icon.png'
			});

			$('.learn-more-link').bind('click', function() {
				$('.btn-x').css({
					opacity: 0
				});

				$('.learn-more-layer').css({
					display: 'block'
				});
				$('.learn-more-wrapper').css({
					height: 0
				});

				if (screenWidth <= 660) {
					$('#pConcierge').css({
						height: 800
					});
				}

				$('.learn-more-content img').css({
					opacity: 0
				});
				$('.learn-more-content img, .learn-more-content h3, .learn-more-content h4').css({
					opacity: 0,
					position: 'relative',
					top: -10
				});

				$('.learn-more-item').css({
					opacity: 0,
					'margin-top': 15
				});

				$('.learn-more-wrapper').stop(true, false).animate({
					height: '100%'
				}, 500);
				$('.learn-more-content img').stop(true, false).delay(500).animate({
					opacity: 1,
					top: 0
				}, 500);
				$('.learn-more-content h4').stop(true, false).delay(650).animate({
					opacity: 1,
					top: 0
				}, 500);
				$('.learn-more-content h3').stop(true, false).delay(800).animate({
					opacity: 1,
					top: 0
				}, 500);

				$('.learn-more-item').each(function(index) {
					$(this).stop(true, false).delay(1000 + index * 80).animate({
						opacity: 1,
						'margin-top': 0
					}, 700, 'easeOutBack');
				});

				$('.btn-x').stop(true, false).delay(1000).animate({
					opacity: 1
				});
			});

			$('.btn-x').bind('click', function() {
				$('#pConcierge').attr('style', '');
				$('.btn-x').stop(true, false).animate({
					opacity: 0
				});
				$('.learn-more-wrapper, .learn-more-content').stop(true, false).delay(300).animate({
					height: 0
				}, 500, function() {
					$('.learn-more-layer').css({
						display: 'none'
					});
					$('.learn-more-content').attr('style', '');
				});
			});

			var curStep = 0;
			$('.nextPage').bind('click', function(evt) {
				evt.preventDefault();

				if (curStep == 0) {
					$('.btn-exp').click();
				} else if (curStep == 1) {
					//$('.btn-next').click();
					moveSlideForward();
				} else if (curStep == 2) {
					$('.btn-done').click();
				} else if (curStep == 3) {
					selectActionHandler();
				} else if (curStep == 4) {
					$('.orbit-form .btn-submit').click();
				}
			});

			$('.prevPage').bind('click', function(evt) {
				evt.preventDefault();

				if (curStep == 1) {
					moveSlideBack();
				
					/*$('.profiler-wrapper').stop(true, false).animate({
						opacity: 0
					}, 300, function() {
						$('.profiler-wrapper').css({
							display: 'none'
						});

						$('.orbit li:eq(0) .orbit-caption').stop(true, false).animate({
							opacity: 1,
							bottom: 0
						}, 500, 'easeOutQuad');
					});

					curStep = 0;
					isAnimating = true;*/
				} else if (curStep == 2) {
					$('.feeds-wrapper').stop(true, false).animate({
						opacity: 0
					}, 300, function() {
						$('.feeds-wrapper').css({
							display: 'none'
						});

						$('.profiler-wrapper').css({
							display: 'block',
							opacity: 0
						});
						$('.profiler-item').css({
							opacity: 0,
							top: -50
						});
						$('.btn-list a').css({
							opacity: 0,
							'margin-top': 20
						});
						$('.profiler-wrapper').stop(true, false).delay(500).animate({
							opacity: 1
						}, 300);
						$('.profiler-item').each(function(index) {
							$(this).delay(80 * index + 700).animate({
								opacity: 1,
								top: 0
							}, 500);
						});
						$('.btn-list a').delay(1200).animate({
							opacity: 1,
							'margin-top': 0
						}, function() {
							isAnimating = false;
						});
						if (screenWidth > 660) {
							$('.form-slider').hide();
						}
					});

					curStep = 1;
				} else if (curStep == 3) {
					$('.orbit li:eq(1)').stop(true, false).animate({
						opacity: 0
					}, 300, 'easeOutQuad', function() {
						$('.orbit li:eq(1)').css({
							display: 'none'
						});

						$('.orbit li:eq(0)').css({
							display: 'block',
							opacity: 0
						});
						$('.feeds-wrapper').css({
							display: 'block',
							opacity: 1
						});

						$('.orbit li:eq(0)').stop(true, false).animate({
							opacity: 1
						}, 300);
					});

					curStep = 2;
				}
			});

			$('.btn-exp').bind('click', function(evt) {
				evt.preventDefault();

				$('.orbit li:eq(0) .orbit-caption').stop(true, false).animate({
					opacity: 0,
					bottom: -100
				}, 500, 'easeOutQuad');
				$('.profiler-wrapper').css({
					display: 'block',
					opacity: 0
				});
				$('.profiler-item').css({
					opacity: 0,
					top: -50
				});
				$('.btn-list a').css({
					opacity: 0,
					'margin-top': 20
				});
				$('.profiler-wrapper').stop(true, false).delay(500).animate({
					opacity: 1
				}, 300);
				$('.profiler-item').each(function(index) {
					$(this).delay(80 * index + 700).animate({
						opacity: 1,
						top: 0
					}, 500);
				});
				$('.btn-list a').delay(1200).animate({
					opacity: 1,
					'margin-top': 0
				}, function() {
					isAnimating = false;
				});
				if (screenWidth > 660) {
					$('.form-slider').hide();
				}

				curStep = 1;
			});

			$('.btn-next').bind('click', function(evt) {
				evt.preventDefault();

				$('.profiler-wrapper').stop(true, false).animate({
					opacity: 0
				}, 300, 'easeOutQuad', function() {
					$('.profiler-wrapper').css({
						display: 'none'
					});
				});

				$('.feeds-wrapper').css({
					display: 'block',
					opacity: 1
				});

				var delayTime = 0,
					feedEle = $('.feeds-wrapper').children();
				for (i = 0; i < feedEle.length; i++) {
					$(feedEle[i]).css({
						opacity: 0,
						position: 'relative',
						top: 50
					});

					delayTime = i * 80 + 300;
					$(feedEle[i]).stop(true, false).delay(delayTime).animate({
						opacity: 1,
						top: 0
					}, 500, 'easeOutQuad');
				}

				curStep = 2;
				isAnimating = true;
			});

			$('input.error').live('focusout', function() {
				var value = $(this).val();
				if (value) {
					var holderText = $(this).attr('data-placeholder');
					$(this).attr('placeholder', holderText);
					$(this).removeClass('error');
				}
			});

			$('textarea.error').live('focusout', function() {
				var value = $(this).val();
				if (value) {
					var holderText = $(this).attr('data-placeholder');
					$(this).attr('placeholder', holderText);
					$(this).removeClass('error');
				}
			});

			$('.btn-done').bind('click', function(evt) {
				if (validateError('.feeds-wrapper')) {
					return;
				}

				$('.orbit li:eq(0)').stop(true, false).animate({
					opacity: 0
				}, 300, 'easeOutQuad');
				$('.feeds-wrapper').stop(true, false).animate({
					opacity: 0
				}, 300, 'easeOutQuad', function() {
					$('.orbit li:eq(0), .feeds-wrapper').css({
						display: 'none'
					});

					$('.orbit li:eq(1)').css({
						display: 'block',
						opacity: 0
					});
				});

				$('.orbit-content').css({
					opacity: 0
				});
				$('.welcome-block, .request-block').css({
					opacity: 0
				});
				$('.orbit li:eq(1)').stop(true, false).delay(300).animate({
					opacity: 1
				}, 200);
				$('.orbit-content').stop(true, false).delay(500).animate({
					opacity: 1
				}, 300);
				$('.welcome-block').stop(true, false).delay(800).animate({
					opacity: 1
				});
				$('.request-block').stop(true, false).delay(1000).animate({
					opacity: 1
				});
				$('.form-slider').show();

				curStep = 3;
			});

			$('.btn-skip').bind('click', function(evt) {
				evt.preventDefault();

				$('.orbit li:eq(0)').stop(true, false).animate({
					opacity: 0
				}, 300, 'easeOutQuad');
				$('.profiler-wrapper').stop(true, false).animate({
					opacity: 0
				}, 300, 'easeOutQuad', function() {
					$('.orbit li:eq(0), .profiler-wrapper').css({
						display: 'none'
					});

					$('.orbit li:eq(1)').css({
						display: 'block',
						opacity: 0
					});
				});

				$('.orbit-content').css({
					opacity: 0
				});
				$('.welcome-block, .request-block').css({
					opacity: 0,
					'margin-top': 20
				});
				$('.orbit li:eq(1)').stop(true, false).delay(300).animate({
					opacity: 1
				}, 200);
				$('.orbit-content').stop(true, false).delay(500).animate({
					opacity: 1
				}, 300);
				$('.welcome-block').stop(true, false).delay(800).animate({
					opacity: 1,
					'margin-top': 50
				});
				$('.request-block').stop(true, false).delay(1000).animate({
					opacity: 1,
					'margin-top': 50
				});
				$('.form-slider').show();

				curStep = 3;
			});

			$('.orbit-form .btn-submit').bind('click', function(evt) {
				evt.preventDefault();

				if (validateError('.orbit-form')) {
					return;
				}

				$('.received-form').css({
					display: 'block',
					width: 0
				});

				$('.orbit-form').stop(true, false).animate({
					'margin-top': 80,
					opacity: 0
				}, 500, 'easeOutQuint', function() {
					$('.orbit-form').css({
						display: 'none',
						opacity: 1,
						'margin-top': 0
					});

					var receivedFormWidth = 552;
					if (screenWidth <= 660) {
						receivedFormWidth = 260;
					}
					$('.received-form').stop(true, false).animate({
						width: receivedFormWidth
					}, 500, function() {
						$('.received-form').attr('style', '');
						$('.received-form').css('display', 'block');
					});
				});

				curStep = 5;
			});

			$('.pw-form .btnClose').bind('click', function(evt) {
				evt.preventDefault();

				var isMobile = false;
				if (screenWidth <= 660) {
					isMobile = true;
				}
				ui.gPageConcierge.hidePWSliderForm(isMobile);
				$('.form-slider > a').removeClass('expand');
			});

			$('.pw-form .btn-submit').bind('click', function(evt) {
				evt.preventDefault();

				if (validateError('.pw-form')) {
					return;
                }else{
					CallBackForm.conciergeformSubmit();
                }
			});

			$('.email-form .btn-submit').bind('click', function(evt) {
				evt.preventDefault();

				if (validateError('.email-form')) {
					return;
                }else{
					FeedbackForm.formSubmit();
                }
			});

			$('.email-form .btnClose').bind('click', function(evt) {
				evt.preventDefault();

				var isMobile = false;
				if (screenWidth <= 660) {
					isMobile = true;
				}
				ui.gPageConcierge.hideEmailSliderForm(isMobile);
				$('.form-slider > a').removeClass('expand');
			});

			$('.form-slider > a').bind('click', function(evt) {
				evt.preventDefault();
				var isEmail = $(this).hasClass('email-slider'),
					isBotPos = $(this).hasClass('bot-pos'),
					isExpanding = $(this).hasClass('expand'),
					isMobile = false;
				if (screenWidth <= 660) {
					isMobile = true;
				}

				if (isExpanding) {
					if (isBotPos) {
						$(this).removeClass('bot-pos');
						$('.top-pos').removeClass('top-pos').addClass('bot-pos');
						$(this).addClass('top-pos');
						if (isEmail) {
							if (!isMobile) {
								$('.email-form').css({
									right: -415,
									'z-index': 3
								});
								$('.pw-form').css({
									'z-index': 2
								});
							}
							ui.gPageConcierge.showEmailSliderForm(isMobile);
						} else {
							if (!isMobile) {
								$('.pw-form').css({
									right: -415,
									'z-index': 3
								});
								$('.email-form').css({
									'z-index': 2
								});
							}
							ui.gPageConcierge.showPWSliderForm(isMobile);
						}
					} else {
						$('.form-slider > a').removeClass('expand');
						//$(this).removeClass('expand');
						ui.gPageConcierge.hideEmailSliderForm(isMobile);
						ui.gPageConcierge.hidePWSliderForm(isMobile);
					}
				} else {
					if (isBotPos) {
						$(this).removeClass('bot-pos');
						$('.top-pos').removeClass('top-pos').addClass('bot-pos');
						$(this).addClass('top-pos');
						setTimeout(function() {
							$('.form-slider > a').addClass('expand');
							if (isEmail) {
								ui.gPageConcierge.showEmailSliderForm(isMobile);
							} else {
								ui.gPageConcierge.showPWSliderForm(isMobile);
							}
						}, 500);
					} else {
						$('.form-slider > a').addClass('expand');
						//$(this).addClass('expand');
						if (isEmail) {
							ui.gPageConcierge.showEmailSliderForm(isMobile);
						} else {
							ui.gPageConcierge.showPWSliderForm(isMobile);
						}
					}
				}
			});
		},
		showEmailSliderForm: function(isMobile) {
			if (isMobile) {
				$('#pConcierge').css({
					height: 700
				});
				$('.email-form').show();
			} else {
				$('.email-form').stop(true, false).animate({
					right: 0
				}, 500, 'easeOutQuad');
			}
		},
		hideEmailSliderForm: function(isMobile) {
			if (isMobile) {
				$('#pConcierge').attr('style', '');
				$('.email-form').hide();
			} else {
				$('.email-form').stop(true, false).animate({
					right: -415
				}, 500, 'easeOutQuad');
			}
		},
		showPWSliderForm: function(isMobile) {
			if (isMobile) {
				$('#pConcierge').css({
					height: 700
				});
				$('.pw-form').show();
			} else {
				$('.pw-form').stop(true, false).animate({
					right: 0
				}, 500, 'easeOutQuad');
			}
		},
		hidePWSliderForm: function(isMobile) {
			if (isMobile) {
				$('#pConcierge').attr('style', '');
				$('.pw-form').hide();
			} else {
				$('.pw-form').stop(true, false).animate({
					right: -415
				}, 500, 'easeOutQuad');
			}
		}
	},

	gPageWealth: {
		init: function(){
			var isMobile = false;

			var sW = getDocumentSize(0);
			if (sW<461){
				isMobile=true;
				//$('.dynamicCopy > div').hide();
				$('.dynamicCopy h2').removeClass('active').first().addClass('active').next().show();
				$('.dynamicCopy h3').removeClass('active');
			}
			else{
				isMobile=false;
				$('.dynamicCopy > div').show();
				$('.dynamicCopy h2').removeClass('active');
			}
			$(window).resize(function(){
				var sW = getDocumentSize(0);
				if (sW<461){
					isMobile=true;
					//$('.dynamicCopy > div').hide();
					$('.dynamicCopy h2').removeClass('active').first().addClass('active').next().show();
					$('.dynamicCopy h3').removeClass('active');
				}
				else{
					isMobile=false;
					$('.dynamicCopy > div').show();
					$('.dynamicCopy h2').removeClass('active');
				}
			});
			$('.pWealth h2').bind('click', function(){
				if (isMobile) $(this).toggleClass('active').next().stop(true,true).slideToggle();
			});
			$('.pWealth h3').bind('click', function(){
				$(this).toggleClass('active').next().stop(true,true).slideToggle();
			});
		}
	},

	gPageContact: {
		init: function(){
			var $contactForm = $('#pContact .arrange .form');
			$contactForm.find('.button').bind('click', function(e){
                e.preventDefault();
				if (validateError('#pContact .arrange')) {
					return;
				}
				else{

                    CallBackForm.formSubmit();
				}
			})
		}
	},

	gPageArticle: {
		init: function(){
			var $newsLetter = $('.sidebox-newsLetter');
			$newsLetter.find('.button').bind('click', function(e){
				e.preventDefault();
				if (validateError('.sidebox-newsLetter')) {
					return;
				}
				else{
					NewsletterForm.formSubmit();
				}
			})

			/*
			$('.attendSlider').bind('inview', function(event, visible){
        		if (visible == true){
        			setTimeout("$('.attendSlider').show().addClass('animated slideInRight');", 5000);
		        }
		    });*/



		    if ($('#imgHolder').hasClass('isGallery')){
			    $('#imgHolder').camera({
					height: '400px',
					loader: 'none',
					pagination: false,
					thumbnails: true,
					rows: 4,
					cols: 4,
					slicedRows: 4,
					slicedCols: 4,
					fx: 'scrollLeft',
					loaderOpacity: 1
				});
			}
		}
	}
}

$(function() {
    util.widget.detectBrowser();
	util.common.commonInit();
	util.common.setupCurrentYear("#currentYear");
	util.common.globalInit();
	util.widget.initNav();
	util.widget.initNavSwipe();
	util.widget.firstTimeUser();

	//console.log(settings.firstTimeUser);
	util.widget.takeOver(); 
});

function gPageHome() {
	ui.gPageHome.init();
	util.widget.eli();
	ui.gPageHome.onScrollHandler();
	// initform();
}

function gPageProfiler() {
	ui.gPageProfiler.init();
}

function gPageLiving() {
	ui.gPageLiving.init();
	util.widget.eli();
}

function gPageConcierge() {
	ui.gPageConcierge.init();
}

function gPageWealth() {
	ui.gPageWealth.init();
	util.widget.eli();
}

function gPageContact() {
	ui.gPageContact.init();
	util.widget.inputErrorFocusOut();
	util.widget.eli();
}

function gPageArticle() {
	ui.gPageArticle.init();
	util.widget.inputErrorFocusOut();
}

function selectActionHandler() {
	curStep = 4;

	$('.prevPage').hide();
	$('.nextPage').hide();

	setTimeout(showVacationForm, 300);
}

function showVacationForm() {
	$('.orbit li:eq(1)').stop(true, false).animate({
		opacity: 0
	}, 300, 'easeOutQuad', function() {
		$('.orbit li:eq(1)').css({
			display: 'none'
		});

		$('.vacation-form').css({
			opacity: 0,
			display: 'block'
		});

		$('.orbit-form > p, .orbit-form > div').css({
			position: 'relative',
			opacity: 0,
			left: 70
		});
	});

	$('.vacation-form').stop(true, false).delay(300).animate({
		opacity: 1
	}, 300, 'easeOutQuad');
	$('.orbit-form > p').stop(true, false).delay(600).animate({
		opacity: 1,
		left: 0
	}, 500, 'easeOutExpo');
	$('.orbit-form > div:eq(0)').stop(true, false).delay(750).animate({
		opacity: 1,
		left: 0
	}, 500, 'easeOutExpo');
	$('.orbit-form > div:eq(1)').stop(true, false).delay(900).animate({
		opacity: 1,
		left: 0
	}, 500, 'easeOutExpo');
	$('.orbit-form > div:eq(2)').stop(true, false).delay(1050).animate({
		opacity: 1,
		left: 0
	}, 500, 'easeOutExpo');
}


// Contact > Arrage a call back > Successful
function contactArrageSuccess(){
	$('.contact_form').hide();
	$('.contact_success').hide();
}

function validateError(selector) {
	var isError = false;
	var isIEOld = false;
	if ($('html').hasClass('ie-old')) {
		isIEOld = true;
	}

	var strError = '';
	
	$(selector).find('input.required').each(function(index) {
		var value = $(this).val();

		if (!value) {
			$(this).addClass('error');
			$(this).attr('placeholder', $(this).attr('data-error'));
			strError += $(this).attr('data-error') + '<br />';
			isError = true;
		}
	});

    $(selector).find('select.required').each(function(index) {
		var value = $(this).val();

		if (!value||value=="") {
            if($(this).attr('disabled')!='disabled'){
                $(this).addClass('error');
                $(this).attr('placeholder', $(this).attr('data-error'));
                strError += $(this).attr('data-error') + '<br />';
                isError = true;
            }
		}
	});

	$(selector).find('textarea.required').each(function(index) {
		var value = $(this).val();

		if (!value) {
			$(this).addClass('error');
			$(this).attr('placeholder', $(this).attr('data-error'));
			strError += $(this).attr('data-error') + '<br />';
			isError = true;
		}
	});

	var checkPos = $(selector).find('span.checkbox').css('background-position');
	if (checkPos != '0px -40px') {
		$(selector).find('span.checkbox').css('background-position', '0px -80px');
	}

	var checkLen = $(selector).find('input[type="checkbox"]').length;
	var checkPosIE = $(selector).find('input[type="checkbox"]').attr('checked')
	if ((!checkPosIE) && (checkLen>0)){
		strError += "Please agree to Maybank's Terms of Use and Privacy Policy.<br />";
		isError = true;
	}

	if (isIEOld && isError) {
		strError = strError.replace(/here/gi, "");
		jAlert(strError);
	}

	return isError;
}

function updateInterchangeImg(selector, smallImg, mediumImg, largeImg) {
	var uuid = $(selector).attr('uuid'),
		imgData = '[' + smallImg + ', (small)], [' + mediumImg + ', (medium)], [' + largeImg + ', (large)]';
	$(selector).attr('data-interchange', imgData);
	$(document).foundation('interchange', 'reflow');
}

function moveSlideForward() {
	var sw = getDocumentSize(2),
		itemWidth = $('.profiler-item').width(),
		numItem = $('.profiler-item').length,
		maxWidth = -(numItem * itemWidth + 12) + sw,
		moveStep = 3 * itemWidth,
		curPos = $('.profiler-content').position().left,
		nextPos = curPos - moveStep;
		$('.profiler-slider .prevPage').removeClass('endSlide');

	if (nextPos < maxWidth) {
		nextPos = maxWidth;
		$('.profiler-slider .nextPage').addClass('endSlide');
	}

	if (nextPos != curPos) {
		$('.profiler-content').stop(true, false).animate({
			left: nextPos
		}, 700, 'easeOutQuad');
	}
}

function moveSlideBack() {
	var itemWidth = $('.profiler-item').width(),
		numItem = $('.profiler-item').length,
		minWidth = 0,
		moveStep = 3 * itemWidth,
		curPos = $('.profiler-content').position().left,
		nextPos = curPos + moveStep;
		$('.profiler-slider .nextPage').removeClass('endSlide');
	if (nextPos > minWidth) {
		nextPos = minWidth;
		$('.profiler-slider .prevPage').addClass('endSlide');
	}

	if (nextPos != curPos) {
		$('.profiler-content').stop(true, false).animate({
			left: nextPos
		}, 700, 'easeOutQuad');
	}
}