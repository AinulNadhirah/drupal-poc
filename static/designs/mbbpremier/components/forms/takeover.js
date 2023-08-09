var TakeOver = {
     init:function(){
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
			});
         Custom.init();
    },
    submitForm:function(){
        if($('#acceptTerm_takeover').is(":checked")){
            var takeoverdetailinfo = JSON.parse($('#takeoverinfo').text());
                if(takeoverdetailinfo){
                    var postJson = {}; 
                    postJson.event_interest = takeoverdetailinfo.TakeoverTags;
                    postJson.event_email = $('#takeoveremail').val();
                    postJson.event_country = $('#event_country').val();
                    postJson.formtype= 'event';

                    $.ajax({
                    type: 'POST',
                    url: takeoverdetailinfo.formservlet, // Which url should handle the ajax request.
                    dataType: 'json',
                    success:function(data){
                        if(data){
                            if(data.status=='SUCCESS'){
                                Common.setCookie(Constants.eventSignupCookie, postJson.event_interest.join(), 3);

                                TakeOver.showSuccess();
                            }else{
                                TakeOver.showError();
                            }
                        }else{
                            TakeOver.showError();
                        }
                    },
                    error:function(data){
                        TakeOver.showError();
                    },
                    data: postJson //Pass key/value pairs
                    });
                }
        }
    },
    showError:function(){
		$('#popup-takeOver .sign-up-for').hide();
		$('#popup-takeOver #takeovererror').show();
    },
    showSuccess:function(){
		TakeOver.formSubmitTrigger();
		$('#popup-takeOver .sign-up-for').hide();
		$('#popup-takeOver #takeoverthankyou').show();
    },
    closePopup:function(){
				var animationString = "fadeInDown fadeInLeft fadeOutLeft fadeOutRight fadeInLeft fadeInRight";
        		var spd = 500;
				$('.taste-wrapper').parents('.popup').removeClass(animationString).addClass('fadeOutUp').parents('.popupHolder').delay(500).fadeOut(spd, function(){
					// $(this).find('.popup').removeClass('fadeOutUp').css('opacity',0);
					// $('.popup-contact').removeClass(animationString).hide();
					// $('.popup-arrange').removeClass(animationString).hide();
					$('.popup').removeClass('fadeOutUp').hide().css('opacity',0);
					$('.popupHolder').removeClass(animationString).hide();

					$('body').unbind('mousedown keydown mousemove');
					//util.widget.takeOver();
				});
    },
    dontShowTakeOverToday:function(){
		Common.setCookie(Constants.dontShowTakeOverCookieName, 'none', 3);
	},
    // analytics triggers
    componentResourcePath: '',
    formLoadEvent: '',
    formSubmitEvent: '',
    formName: '',
    formLoadTrigger: function() {
        CQ_data = new Object();
		CQ_data["formName"] = "Takeover Lead Form";
		CQ_Analytics.record({event:this.formLoadEvent, values:CQ_data,componentPath:this.componentResourcePath});
	},
    initFormLoadTrigger: function(event, resourcePath) {
		this.formLoadEvent = event;
        this.componentResourcePath = resourcePath;
    },
    initFormSubmitTrigger: function(event, formName) {
        TakeOver.formSubmitEvent = event;
		TakeOver.formName = formName;
    },
    formSubmitTrigger: function() {
        CQ_data = new Object();
		CQ_data["formName"] = TakeOver.formName;
        CQ_data["email"] = $('#takeoveremail').val();
        CQ_data["visitorId"] = "D=s_vi";
		CQ_Analytics.record({event: TakeOver.formSubmitEvent,values: CQ_data, componentPath: TakeOver.componentResourcePath});
    }
}