var Favourites = {
    addToFav:function(art){
        var favPath = $(art).attr('path');
        Common.AddToCookie(favPath, Constants.favouriteCookieName, 365)
    },

    removeFromFav:function(art){
        var favPath = $(art).attr('path');
		Common.removeFromCookie(favPath, Constants.favouriteCookieName, 365)
    },
    favClick:function(elem){
        if($(elem).hasClass('active')){
			$(location).attr('href',$(elem).attr('orgpath'));
        }else{
			$(location).attr('href',$(elem).attr('favpath'));
        }
	}	
}