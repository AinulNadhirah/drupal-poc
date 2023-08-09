var Profiler = {
    interest : [], 
    postjson :{},
	init:function(){

    },
    retrieveProfile:function(){
		var form = $('.restore-cookies-wrapper');
        var target = form.attr('action');
        var email = $('#restore_interest_email').val();
        var postJson={};
        postJson.formtype= 'managesub';
        postJson.interest_email = email;
        $.ajax({
         	type: 'POST',
            url: target, // Which url should handle the ajax request.
            dataType: 'json',
            success:function(data){
            	if(data){
                	if(data.status=='SUCCESS'){
                        Profiler.retrieveProfileSuccess(data);
                     }else{
						$('#restoreerror').show();
                     }
                }else{

                }
            },
            error:function(data){
				$('#restoreerror').show();
            },
            data: postJson //Pass key/value pairs
    	});



    },

    retrieveProfileSuccess:function(data){
		var subEmail = data.email;
        var subInterest = data.interest;
        var subName = data.name;
		var active = data.active;

        if(subInterest){
        	Common.setCookie(Constants.categoryCookieName, subInterest.join(), 365);
        }

        var profiledetails = new Array();
        profiledetails.push(subEmail); 
        profiledetails.push(subName);
        Common.setCookie(Constants.profilerCookieName, profiledetails, 365);
		location.reload();

	},
    submitForm:function(){
        if($('#interest_terms').is(":checked")){
            var form = $('.feeds-wrapper');
            var target = form.attr('action');
            var postjson={};
            postjson.interest_interest = Profiler.interest;
            postjson.interest_email = $('#interest_email').val();
            postjson.interest_name = $('#interest_name').val();
            postjson.interest_country = $('#interest_country').val();
            postjson.formtype = 'interest';

            Profiler.postjson = postjson;
            $.ajax({
                type: 'POST',
                url: target, // Which url should handle the ajax request.
                success: function(data){
                    Profiler.submitSuccess(data);
                },
                error: function(data){
					Profiler.submitError(data);
                },
                dataType: 'json',
                data: postjson //Pass key/value pairs
            });
            //Profiler.submitSuccess(); 
        }
    },
    submitSuccess:function(data){

         if (data&&data.status == 'SUCCESS'){

            Common.setCookie(Constants.categoryCookieName, Profiler.interest.join(), 365);

            var profiledetails = new Array();
            profiledetails.push(Profiler.postjson.interest_email); 
            profiledetails.push(Profiler.postjson.interest_name);
            Common.setCookie(Constants.profilerCookieName, profiledetails, 365);

            Categories.refreshClientContext();
            Categories.reset();

            var animationString = "fadeInDown fadeInLeft fadeOutLeft fadeOutRight fadeInLeft fadeInRight";
            var spd = 200;
            $('.popup-firstTime').removeClass(animationString).addClass('fadeOutUp').parents('.popupHolder').delay(500).fadeOut(spd, function(){
                $(this).find('.popup').removeClass('fadeOutUp').css('opacity',0);
                //util.widget.takeOver();
            });

            Common.setBannerPersonalization();
			Profiler.formSubmitTrigger();
         }else{
             Profiler.submitError(data);
         }
    },
    submitError:function(data){
        if(data){
			var errCode = data.errors[0].code;
            if(errCode=='E002'){
				$('.feeds-wrapper #showprofilererror').text($('.feeds-wrapper #profilerinvaliderror').text());
            }else if(errCode=='E003'){
				$('.feeds-wrapper #showprofilererror').html($('.feeds-wrapper #profilerexistserror').html());
            }else{
				$('.feeds-wrapper #showprofilererror').text($('.feeds-wrapper #profilererror').text());
            }
        }else{
		$('.feeds-wrapper #showprofilererror').text($('.feeds-wrapper #profilererror').text());
        //$('.feeds-wrapper #profilererror').show();
        }
    },
    updateProfile:function(){
		var profile = Common.getCookie(Constants.profilerCookieName); 
        var interest = Common.getCookie(Constants.categoryCookieName); 
		var form = $('.feeds-wrapper');
        var target = form.attr('action');
        if(profile&&interest){
            var postjson={};

            postjson.interest_interest = Categories.getCategories().split(",");
            postjson.interest_email = profile.split(",")[0];
            postjson.interest_name = profile.split(",")[1];
            postjson.formtype = 'interestup';
            $.ajax({
                type: 'POST',
                url: target, // Which url should handle the ajax request.
                dataType: 'json',
                data: postjson //Pass key/value pairs
            });

        }

    },

    interestClicked:function(elemObj){

        if($(elemObj).find('.checked').length){
		//element is already selected, user clicks to deselect;removeinterest
            var interestElements = $(elemObj).find('.interestid');
			for(var e =0;e<interestElements.length;e++){
                for(var f =0;f<Profiler.interest.length;f++){
                    if($(interestElements[e]).attr('categories') == Profiler.interest[f]){
						Profiler.interest.splice(f, 1);
                    }
                }
            }

        }else{
		//element is not selected yet, user clicks to select;addinterest
            var interestElements = $(elemObj).find('.interestid');
            for(var e =0;e<interestElements.length;e++){
				Profiler.interest.push($(interestElements[e]).attr('categories'));
            }

        }
    },
    // analytics triggers
    componentResourcePath: '',
    formLoadEvent: '',
    formSubmitEvent: '',
    formName: '',
    initFormLoadTrigger: function(event, resourcePath) {
		this.formLoadEvent = event;
        this.componentResourcePath = resourcePath;
    },
    initFormSubmitTrigger: function(event, formName) {
        this.formSubmitEvent = event;
		this.formName = formName;
    },
    formLoadTrigger: function() {
        CQ_data = new Object();
		CQ_data["formName"] = Profiler.formName;
		//CQ_Analytics.record({event:Profiler.formLoadEvent, values:CQ_data,componentPath:Profiler.componentResourcePath});
        $('#analytics').append("<span data-tracking=\"{event:'"+Profiler.formLoadEvent+"',values:{'formName':'"+Profiler.formName+"'},componentPath:'"+Profiler.componentResourcePath+"'}\"></span>");
	},
    formSubmitTrigger: function() {
		CQ_data = new Object();
		CQ_data["formName"] = Profiler.formName;
        CQ_data["email"] = $('#interest_email').val();
        CQ_data["name"] = $('#interest_name').val();
        CQ_data["visitorId"] = "D=s_vi";
        CQ_data["profileTags"] = Profiler.interest.join(';');
		CQ_Analytics.record({event: Profiler.formSubmitEvent,values: CQ_data, componentPath: Profiler.componentResourcePath });
    }
}