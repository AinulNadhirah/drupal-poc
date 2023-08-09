var EventSignup = {
    init:function(){
		//check if profile cookie exists and eventsignup cookie does not exist, 
        if(Common.getCookie(Constants.profilerCookieName)&&!Common.getCookie(Constants.eventSignupCookie)){
            EventSignup.formLoadTrigger();
			$('.attendSlider').show().addClass('animated slideInRight');
    	}

        $('.attendSlider #signupyes').on('click', function(){
            //do db submit

            var articledetailinfo = JSON.parse($('#articledetailinfo').text());
            if(articledetailinfo){
                var postJson = {}; 
                postJson.event_interest = articledetailinfo.ArticleTags;
                postJson.event_email = Common.getCookie(Constants.profilerCookieName).split(',')[0];
                postJson.event_country = $('#event_country').text();
                postJson.formtype= 'event';

				EventSignup.formSubmitTrigger(postJson.event_email);

                $.ajax({
                type: 'POST',
                url: articledetailinfo.formservlet, // Which url should handle the ajax request.
                dataType: 'json',
                data: postJson //Pass key/value pairs
                });
            }



            Common.setCookie(Constants.eventSignupCookie, 'none', 3);
			$('.attendSlider').hide();
        });

		$('.attendSlider #signupno').on('click', function(){
            Common.setCookie(Constants.eventSignupCookie, 'none', 1);
			$('.attendSlider').hide();
        });

    },
    signup:function(){

    },
    // analytics triggers
    componentResourcePath: '',
    formLoadEvent: '',
    formSubmitEvent: '',
    formName: '',
	initFormLoadTrigger: function(event, resourcePath) {
		EventSignup.formLoadEvent = event;
        EventSignup.componentResourcePath = resourcePath;
    },
    initFormSubmitTrigger: function(event, formName) {
        EventSignup.formSubmitEvent = event;
		EventSignup.formName = formName;
    },
    formLoadTrigger: function() {
        CQ_data = new Object();
		CQ_data["formName"] = EventSignup.formName;
		//CQ_Analytics.record({event:EventSignup.formLoadEvent, values:CQ_data,componentPath:EventSignup.componentResourcePath});
        $('#analytics').append("<span data-tracking=\"{event:'"+EventSignup.formLoadEvent+"',values:{'formName':'"+EventSignup.formName+"'},componentPath:'"+EventSignup.componentResourcePath+"'}\"></span>");
	},
    formSubmitTrigger: function(email) {
        CQ_data = new Object();
		CQ_data["formName"] = EventSignup.formName;
        CQ_data["email"] = email;
        CQ_data["visitorId"] = "D=s_vi";
		CQ_Analytics.record({event: EventSignup.formSubmitEvent,values: CQ_data, componentPath: EventSignup.componentResourcePath});
    }

}