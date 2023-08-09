var FeedbackForm = {
    formSubmit:function(){
    	var form = $('#feedbackform');

        var target = form.attr('action');
        $.ajax({
        type: 'POST',
        url: target, // Which url should handle the ajax request.
        success: function(data){
           FeedbackForm.showThankYou(data);
        },
        error: FeedbackForm.showError,
        dataType: 'json',
        data: form.serialize() //Pass key/value pairs
        });
    },
    init:function(){
    },  
    disableSubmit:function(){

    },
    enableSubmit:function(){

    },
    showThankYou:function(data){
        if(data){
            if (data.status == 'SUCCESS'){

            }else{
                //do failure here 
                FeedbackForm.showError();
            }
        }else{
			FeedbackForm.showError();
        }
    },
    resetForm:function(){

    },
    showError:function(){
       alert('error');
    }


}