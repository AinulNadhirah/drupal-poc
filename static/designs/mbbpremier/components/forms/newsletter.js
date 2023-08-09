var NewsletterForm = {
    postJson : {},
    articledetailinfo:{},
    init:function(){
		//check for cookies, if there is cookie newssub with the categories do not show the newsletter section
        NewsletterForm.articledetailinfo = JSON.parse($('#articledetailinfo').text());
		var retrievedCookie = Common.getCookie(Constants.newsletterCookieName);
        if(retrievedCookie){
			$("#newslettercontainer").hide();
        }else{
			//show the newsletter sub form 
            NewsletterForm.formLoadTrigger();
			$("#newslettercontainer").show();
        }	

        var profileCookie = Common.getCookie(Constants.profilerCookieName);
        if(profileCookie){
			$('#newsletter_email').val(profileCookie.split(',')[0]);
        }

    },
	formSubmit:function(){
        var form = $('#newsletterform');

        if(this.articledetailinfo){
        	NewsletterForm.postJson.newsletter_interest = NewsletterForm.articledetailinfo.ArticleTags;
        }
		NewsletterForm.postJson.newsletter_email = $('#newsletter_email').val();
        NewsletterForm.postJson.newsletter_country = $('#newsletter_country').val();
        NewsletterForm.postJson.formtype= 'newsletter';

        var target = form.attr('action');
        $.ajax({
        type: 'POST',
        url: target, // Which url should handle the ajax request.
        success: function(data){
            NewsletterForm.formSubmitTrigger();
            NewsletterForm.showThankYou(data);
        },
        error: NewsletterForm.showError,
        dataType: 'json',
        data: NewsletterForm.postJson //Pass key/value pairs
        });

    },
    showThankYou:function(data){
        if(data){
            if (data.status == 'SUCCESS'){
                	var $newsLetter = $('.sidebox-newsLetter');
                	$newsLetter.find('h2').text($('#newslettercontainer #newslettersuccess').text()).next().remove();
					$newsLetter.find('.button').unbind('click').text('Close').bind('click',function(e){
						e.preventDefault();
						$(this).parent().slideUp();
					});
				Common.setCookie(Constants.newsletterCookieName, NewsletterForm.postJson.newsletter_interest.toString() ,999);
            }else{
                //do failure here 
                NewsletterForm.showError();
            }
        }else{
			NewsletterForm.showError();
        }
    },    
    showError:function(){
    	var $newsLetter = $('.sidebox-newsLetter');
        $newsLetter.find('h2').text($('#newslettercontainer #newslettererror').text()).next().remove();
		$newsLetter.find('.button').unbind('click').text('Close').bind('click',function(e){
			e.preventDefault();
			$(this).parent().slideUp();
		});
    },
    // analytics triggers
    componentResourcePath: '',
    formLoadEvent: '',
    formSubmitEvent: '',
    formName: '',
	initFormLoadTrigger: function(event, resourcePath) {
		NewsletterForm.formLoadEvent = event;
        NewsletterForm.componentResourcePath = resourcePath;
    },
    initFormSubmitTrigger: function(event, formName) {
        NewsletterForm.formSubmitEvent = event;
		NewsletterForm.formName = formName;
    },
    formLoadTrigger: function() {
        CQ_data = new Object();
		CQ_data["formName"] = NewsletterForm.formName;
		//CQ_Analytics.record({event:NewsletterForm.formLoadEvent, values:CQ_data,componentPath:NewsletterForm.componentResourcePath});
        $('#analytics').append("<span data-tracking=\"{event:'"+NewsletterForm.formLoadEvent+"',values:{'formName':'"+NewsletterForm.formName+"'},componentPath:'"+NewsletterForm.componentResourcePath+"'}\"></span>");
	},
    formSubmitTrigger: function() {
        CQ_data = new Object();
		CQ_data["formName"] = NewsletterForm.formName;
        CQ_data["email"] = $('#newsletter_email').val();
        CQ_data["visitorId"] = "D=s_vi";
		CQ_Analytics.record({event: NewsletterForm.formSubmitEvent,values: CQ_data, componentPath: NewsletterForm.componentResourcePath});
    }


}