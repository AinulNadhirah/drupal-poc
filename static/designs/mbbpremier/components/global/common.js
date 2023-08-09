var Constants = {
	// site specific values - start
    categoryCookieName: 'premiercategories', // specific for site
    clientContextStore: CQ_Analytics.PremierCategoriesStore,
    profilerCookieName : 'premierprofiler',
    dontShowProfilerCookieName :'premierprofilernoshow',
    dontShowTakeOverCookieName :'premiertakeovernoshow', 
    favouriteCookieName:'premierfavourites',
    newsletterCookieName : 'premierNewsletterSub',
    eventSignupCookie : 'premiereventsignup',
    highlightLayout :'premierlayout'
    // site specific values - end
}

var Common = {
    checkEmptySplitArray:function(array){
        if(array.length==1){
			if(array[0]=="")
                return true;
        }
        return false;
    },
	getCookie: function(name) {
		var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    setCookie: function(c_name, value, days) {
        if(!this.is_int(days)) {
            days = 365;
        }
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + days);
        var c_value = value + "; expires=" + exdate.toUTCString() + "; path=/";
        document.cookie = c_name + "=" + c_value;
    },
    is_int: function(value) {
		if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
            return true;
        } else { 
            return false;
        }
    },
    getUrlVarsFromUrl:function(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
        return vars;
	},
    unbindTakeover: function() {

		$('body').delay(3000).unbind('mousedown keydown mousemove');
        TakeOver.dontShowTakeOverToday();
    },
    escapeJSON:function(str) {
    if (str == undefined) {
        return '';
    }
    return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
	},
    setBannerPersonalization:function(){
        var profile = Common.getCookie(Constants.profilerCookieName); 
        if(profile){
            var name = profile.split(',')[1];
            $('#pHome .herobanner .orbit-caption h5 span').html(name+"'s");
        }
    },

    removeFromCookie:function(attribute, cookieName, length){
		var currentCookie = Common.getCookie(cookieName);
        if(currentCookie){
			var cookArray = currentCookie.split(",");
            var index = cookArray.indexOf(attribute);
            cookArray.splice(index, 1); 
			Common.setCookie(cookieName, cookArray.join(), length);
        }
    },
    AddToCookie:function(attribute, cookieName, length){
		var currentCookie = Common.getCookie(cookieName);
        if(currentCookie){
			var cookArray = currentCookie.split(",");
            cookArray.push(attribute);
			Common.setCookie(cookieName, cookArray.join(), length);
        }else{
			Common.setCookie(cookieName, attribute, length);
        }
    },
    outputFieldEncoding:function(s) {
	// List of HTML entities for escaping.
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;',
	  '/': '&#x2F;',
	  '\\': '&#92;'      
	};

	// Regex containing the keys listed immediately above.
	var htmlEscaper = /[&<>"'\/\\]/g;
	s = ('' + s).replace(htmlEscaper, function(match) {
	    return htmlEscapes[match];
	  });
	return s;
	}

}

