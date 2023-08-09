var Categories = {
    collectionCategoriesId: '#customize-collection-tags',
    initCollection: function(id) {
        var parentId = this.collectionCategoriesId;
        var categories = this.getCategories();
        if (categories && categories != "") {
			// has tags selected
            var catArray = categories.split(",");

            var selectAll = true;
			$(parentId).find('a').each(function(key,val){
                var elemTagId = val.getAttribute("data-tagid");

                if (elemTagId && val.id != "collection-all") {
                    if (catArray.indexOf(elemTagId) > -1) {
						$(this).addClass("active");
                    } else {
                        // not all are active
						selectAll = false;
                    }
                }
            });

            // if select all,
            if (selectAll) {
				$('#collection-all').addClass("active");
            }
        }

        // bind .click function
        $(parentId).find('a').click(this.click);
	},
    click: function() {
        var parentId = Categories.collectionCategoriesId;
		// check for click on "all"
        if (this.id == "collection-all") {
			// click all
            if ($(this).hasClass("active")) {
				$(parentId).find('a').removeClass("active");
            } else {
				$(parentId).find('a').addClass("active");
            }
        } else {
            // other categories
            if ($(this).hasClass("active")) {
				$(this).removeClass("active");
            } else {
				$(this).addClass("active");
            }

            // check for all
            var allChecked = true;
            $(parentId).find('a').each(function(key,val){
                if (val.id != "collection-all") {
                    if (!$(val).hasClass("active")) {
						allChecked = false;
                    }
                }
            });

            if (allChecked) {
				$('#collection-all').addClass("active");
            } else {
				$('#collection-all').removeClass("active");
            }
        }
    },
    // triggered when "update view" is clicked
	update: function(elem) {
		// grab categories
        var newCategories = new Array();
        var parentId = Categories.collectionCategoriesId;
        $(parentId).find('a').each(function(key,val){
            if ($(val).hasClass("active")) {
				var tagId = val.getAttribute("data-tagid");
                if (tagId) {
					newCategories.push(tagId);
                }
            }
        });

		// trigger analytics
        Categories.profileSaveTrigger(newCategories);

		// set the cookie
        Common.setCookie(Constants.categoryCookieName, newCategories.join(), 365);

        this.refreshClientContext();

        // close the overlay
        var spd = 200;
        var animationString = "fadeInDown fadeInLeft fadeOutLeft fadeOutRight fadeInLeft fadeInRight";

        $(elem).parents('.popup').removeClass(animationString).addClass('fadeOutUp').parents('.popupHolder').delay(500).fadeOut(spd, function(){
            $('.popup').removeClass('fadeOutUp').css('opacity',0);
            $('.popupHolder').removeClass(animationString).hide();

            $('body').unbind('mousedown keydown mousemove');
            util.widget.takeOver();
        });

        //update the new interest into the db
		Profiler.updateProfile();
        NewsListing.reloadListing();
    },
    reset: function() {
        var parentId = this.collectionCategoriesId;
		this.clear();
        $(parentId).find('a').unbind('click');
        this.initCollection();
    },
    clear: function() {
		var parentId = this.collectionCategoriesId;
        $(parentId).find('a').removeClass("active");
    },
    getCategories: function() {
		var categoryCookie = Common.getCookie(Constants.categoryCookieName);
        if (categoryCookie) {
            return categoryCookie;
        }
        return "";
    },
    refreshClientContext: function() {
		// update client context store
        Constants.clientContextStore.fireEvent("update");

    },
    // analytics triggers
    componentResourcePath: '',
    profileSaveEvent: '',
    profileSaveTrigger: function(categoriesArr) {
        var CQ_data = new Object();
        CQ_data['profileTags'] = categoriesArr.join(';');
        try {
            var email = Common.getCookie(Constants.profilerCookieName).split(',')[0];
            if (email) {
                CQ_data['email'] = email;
            }
        } catch (e){}
		CQ_Analytics.record({event:this.profileSaveEvent, values:CQ_data,componentPath:this.componentResourcePath});
	},
    initProfileSaveTrigger: function(event, resourcePath) {
		this.profileSaveEvent = event;
        this.componentResourcePath = resourcePath;
    }

}