var CallBackForm = {
     conciergeformSubmit:function(){
          var form = $('#callbackform');

          var target = form.attr('action');
          $.ajax({
          type: 'POST',
          url: target, // Which url should handle the ajax request.
          success: function(data){
			CallBackForm.showThankYou(data);
          },
          error: CallBackForm.showError,
          dataType: 'json',
          data: form.serialize() //Pass key/value pairs
        })
    },
     popupformSubmit:function(){
         if($('#popupcallback_terms').is(":checked")){
              var form = $('#popupcallbackform');

              CallBackForm.disableSubmit();
              var target = form.attr('action');
              $.ajax({
              type: 'POST',
              url: target, // Which url should handle the ajax request.
              success: function(data){
                CallBackForm.popUpShowThankYou(data);
                  CallBackForm.formSubmitTrigger();
              },
              error: CallBackForm.popUpShowError,
              dataType: 'json',
              data: form.serialize() //Pass key/value pairs
            })
        }
    },
    formSubmit:function(){
        if($('#callback_terms').is(":checked")){
              var form = $('#callbackform');

              CallBackForm.disableSubmit();
              var target = form.attr('action');
              $.ajax({
              type: 'POST',
              url: target, // Which url should handle the ajax request.
              success: function(data){
              	CallBackForm.showThankYou(data);
                  CallBackForm.formSubmitTrigger('Contact Us Form');

              },
              error: CallBackForm.showError,
              dataType: 'json',
              data: form.serialize() //Pass key/value pairs
            })
        }
    },
    init:function(){
       $(".numInput").keypress(function (e) {
            var Key;
            if(navigator.appName == "Netscape")
                Key = e.charCode; //For firefox
            else
                Key = e.keyCode;

            if(Key === 0) return true;
            else if (String.fromCharCode(Key).match(/[^0-9]/g)) return false;
            /*this.value = this.value.replace(/[^0-9\.]/g,'');*/
        });
       // $("#branch_type").on('change', CallBackForm.onChangeBranchType());
    }, 
    disableSubmit:function(){

		//$('input[type="submit"]').attr('disabled','disabled');
    },
    enableSubmit:function(){
		//$('input[type="submit"]').removeAttr('disabled');
    },
    popUpShowThankYou:function(data){
        if (data.status == 'SUCCESS'){
			$('.arrange_form').hide();
			$('.popup-arrange .arrange #popupcallbacksuccessdiv').fadeIn();

            if($('#callback_country').val()=='sg'){
                var ebRand = Math.random()+'';
                ebRand = ebRand * 1000000;
                var mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=551187&amp;rnd=" + ebRand;
                var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
            }
        }else{
			//do failure here 
            CallBackForm.popUpShowError();
        }

    },
    popUpShowError:function(){
		$('.arrange_form').hide();
		$('.popup-arrange  .arrange #popupcallbackerrordiv').fadeIn();
    },
     showThankYou:function(data){
        if (data.status == 'SUCCESS'){
			$('#pContact .arrange #callbackform').slideUp();
            $('#pContact .arrange #callbacksuccessdiv').slideDown();

            var ebRand = Math.random()+'';
            ebRand = ebRand * 1000000;

            if($('#callback_country').val()=='my'){
            	var onceperdayfired = Common.getCookie('premiercontacttqonceperday'); 
                if(!onceperdayfired){
                    Common.setCookie('premiercontacttqonceperday', '1', 1);
                    var mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=528455&amp;rnd=" + ebRand;
                    //document.body.appendChild(mt);
                    var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
                }
            	var mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=528457&amp;rnd=" + ebRand;
            	//document.body.appendChild(mt);
           		var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
            }



            if($('#callback_country').val()=='sg'){
                var mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=551184&amp;rnd=" + ebRand;
                //document.body.appendChild(mt);
                var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
            }

        }else{
			//do failure here 
			CallBackForm.showError();
        }

    },
    resetForm:function(){

    },
    showError:function(){
		$('#pContact .arrange #callbackform').slideUp();
		$('#pContact .arrange #callbackerrordiv').slideDown();
    },
    // analytics triggers
    componentResourcePath: '',
    formLoadEvent: '',
    formSubmitEvent: '',
    formName: '',
    initFormLoadTrigger: function(event, resourcePath) {
		CallBackForm.formLoadEvent = event;
        CallBackForm.componentResourcePath = resourcePath;
    },
    initFormSubmitTrigger: function(event, formName) {
        CallBackForm.formSubmitEvent = event;
		CallBackForm.formName = formName;
    },
    mapLoadTrigger: function(){
		if($('#callback_country').val()=='sg'){
		    var ebRand = Math.random()+'';
            ebRand = ebRand * 1000000;
            var mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=555823&amp;rnd=" + ebRand;
            var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
            mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=551179&amp;rnd=" + ebRand;
            fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr);  
            mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=568369&amp;rnd=" + ebRand;
            fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
        }
    },
    formLoadTrigger: function() {
		if($('#callback_country').val()=='sg'){
		    var ebRand = Math.random()+'';
            ebRand = ebRand * 1000000;
            var mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=555822&amp;rnd=" + ebRand;
            var fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
            mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=551178&amp;rnd=" + ebRand;
            fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
            mt = document.createElement('script'); mt.type = 'text/javascript'; mt.async = true; mt.src="HTTP://bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&amp;ActivityID=568368&amp;rnd=" + ebRand;
            fscr = document.getElementsByTagName('script')[0]; fscr.parentNode.insertBefore(mt, fscr); 
        }
        CQ_data = new Object();
		CQ_data["formName"] = CallBackForm.formName;
		CQ_Analytics.record({event:CallBackForm.formLoadEvent, values:CQ_data,componentPath:CallBackForm.componentResourcePath});
	},
    formSubmitTrigger: function(formName) {
		CQ_data = new Object();
        if (formName) {
			CQ_data["formName"] = formName;
        } else {
			CQ_data["formName"] = CallBackForm.formName;
        }
        CQ_data["visitorId"] = "D=s_vi";
        CQ_data["name"] = $('#callback_first_name').val() + " " + $('#callback_last_name').val();
		CQ_Analytics.record({event: CallBackForm.formSubmitEvent,values: CQ_data, componentPath: CallBackForm.componentResourcePath });
    },
    hideBranchList:function(){
		$('.branchrow').hide();
        $('.branchtyperow').hide();
        $('.callback_branch').attr('disabled', 'disabled');
        $('.branch_type').val('');
		$('.branch_type').attr('disabled', 'disabled')


    },
    showBranchList:function(){
        //$('.branchrow').show();
        $('.branchtyperow').show();
        //$('.callback_branch').removeAttr('disabled', 'disabled');
        $('.branch_type').removeAttr('disabled', 'disabled');

    },
    onChangeBranchType:function(sel){
        if(sel.value){
            $('.branchrow').show();
            $('.callback_branch').removeAttr('disabled', 'disabled');
    
            var branchlist = JSON.parse($('#myBranchJson').text());
            if(branchlist){
                $('.callback_branch').find('option').remove();
                $('.callback_branch').find('optgroup').remove();

                for(var i=0;i<branchlist.locations.length;i++){
                    if(branchlist.locations[i].name == sel.value){
                        for(var x=0;x<branchlist.locations[i].centres.length;x++){
                            var state = branchlist.locations[i].centres[x]; 
    
                            $('.callback_branch').append($('<optgroup>', {
                                value: state.name,
                                label: state.title,
                                text: state.title
                            }));

                            for(var z=0;z<state.branches.length;z++){
                                var branch = state.branches[z];
                                $('.callback_branch').append($('<option>', {
                                    value: branch.name,
                                    text: branch.title
                                }));
                            }
                        }
                    }
                }
            }
        }

    }




}