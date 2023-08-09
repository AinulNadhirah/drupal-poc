var NewsListing = {
    resultsurl : '',
    resultIndex : 0,
    layout:'grid',
    loadWeather:function(){
		var newslistinginfo = JSON.parse($('#newslistinginfo').text());
        if(newslistinginfo ) {
            var weatherurl = newslistinginfo.weatherurl;
            var timezoneurl = newslistinginfo.timezoneurl;
			var weathericonpath = newslistinginfo.weathericonpath;
            $.ajax({
                type: 'GET',
                url: weatherurl+'?a='+new Date().getTime(), // Which url should handle the ajax request.
                success: function(data){

                    if(data && data.data){
                        var cond = data.data.current_condition[0].weatherDesc[0].value;
                        var degrees = data.data.current_condition[0].temp_C +'°C';
                        var weatherCode = data.data.current_condition[0].weatherCode;
                        $('.weather #weathercondition').html(cond+', '+degrees);
                        $('.weather #weathericon').attr('src', weathericonpath+weatherCode+'.png');
                    }else{
						NewsListing.hideWeather();
                    }
                },
                error :function(data){
					NewsListing.hideWeather();
                },
                dataType: 'json'
            });
            
            $.ajax({
                type: 'GET',
                url: timezoneurl+'?a='+new Date().getTime(), // Which url should handle the ajax request.
                success: function(data){

                    if(data && data.data) {
                		var dateTime = data.data.time_zone[0].localtime; 

                        if(dateTime) {
                            var localDate = new Date(dateTime.slice(0,4), dateTime.slice(5,7)-1, dateTime.slice(8,10));
                            var weekday = new Array(7);
                            weekday[0]=  "Sunday";
                            weekday[1] = "Monday";
                            weekday[2] = "Tuesday";
                            weekday[3] = "Wednesday";
                            weekday[4] = "Thursday";
                            weekday[5] = "Friday";
                            weekday[6] = "Saturday";
    
                            var month = new Array();
                            month[0] = "January";
                            month[1] = "February";
                            month[2] = "March";
                            month[3] = "April";
                            month[4] = "May";
                            month[5] = "June";
                            month[6] = "July";
                            month[7] = "August";
                            month[8] = "September";
                            month[9] = "October";
                            month[10] = "November";
                            month[11] = "December";

                            var displayDate = weekday[localDate.getDay()];
                            displayDate += ', '+localDate.getDate()+' '+month[localDate.getMonth()];
    
                            $('#weatherdate').html(displayDate);
                        }else{
							NewsListing.hideWeather();
                        }

                    }else{
						NewsListing.hideWeather();
                    }
                },
                error :function(data){
					NewsListing.hideWeather();
                },
                dataType: 'json'
            });
        }
    },
    hideWeather:function(){
		$('.weather').hide();
    },
    doLazyLoad:function(){
		var newslistinginfo = JSON.parse($('#newslistinginfo').text());
        var layoutCookie = Common.getCookie(Constants.highlightLayout); 
        if(layoutCookie==null||layoutCookie!='sitetool'){
            if(newslistinginfo ) {
                NewsListing.resultsurl = newslistinginfo.resultsurl;
                NewsListing.resultsurl = NewsListing.resultsurl+'.newsresult'+newslistinginfo.slingquery+'.html';
                var catArray = Categories.getCategories().split(",");
                var postJson = {}; 
                if(!Common.checkEmptySplitArray(catArray)){
                    postJson.category = catArray;
                }
                postJson.resultIndex = this.resultIndex;
    
                this.loadGrids(postJson);

            }
        }
    },
    loadGrids:function(postJson){
		    if (ui.gPageHome.isLoading){
				var selectColumn=1;
				var delay = 100;
				ui.gPageHome.isLoading = false;

				$('body').append('<div id="homeData" style="display:none"></div>');
				$('#homeData').load(NewsListing.resultsurl, postJson , function() {

					$('.loadMore').hide();

					$('#homeData .tile').each(function(i){
						if (selectColumn>3) selectColumn=0;

						var selectedTile = $(this);
						if ($('.row-main').hasClass('gridView')){
							$('.gridView .columns').eq(selectColumn).append( selectedTile.clone() ).find('.tile').last().hide().delay(delay).fadeIn();
						}
						else{
							$('.listView .large-9').append( selectedTile.clone() ).find('.tile').last().hide().delay(delay).fadeIn();
						}
						selectedTile.remove();

						delay=delay+100;
						selectColumn++;
					})

                    //var randomNum = Math.floor((Math.random() * 4) );
                    /*
					var toolDiv = $('#gridtool'+NewsListing.resultIndex);
					if ($('.row-main').hasClass('gridView')){
						$('.gridView .columns').eq(NewsListing.resultIndex+1).append( toolDiv.clone() ).find('.tile').last().hide().delay(delay).fadeIn();
					}
					else{
						$('.listView .large-9').append( toolDiv.clone() ).find('.tile').last().hide().delay(delay).fadeIn();
					}
					toolDiv.remove();
					*/
                    if($('#firstcol').html().trim()==''){
						$('#firstcol').html('<h2 class="favError">There are no articles in this category at the moment.</h2>');
                    }

					$('#homeData').remove();


					NewsListing.resultIndex += 1;
				});
			}
    },
    reloadListing:function(layout){
        var newslistinginfo = JSON.parse($('#newslistinginfo').text());
        if(newslistinginfo ) {
            if(layout){
				NewsListing.layout = layout;
                Common.setCookie(Constants.highlightLayout, NewsListing.layout, 3);
            }
            var getURL = newslistinginfo.resultsurl +"."+NewsListing.layout+"layout"+newslistinginfo.slingquery+".html";
            $('#newscontainer').load(getURL,function(){
                if(layout!='sitetool'){
                    //reset the pagination 
                    NewsListing.resultIndex =0;
                    //rebind the onclicks 
                    ui.gPageHome.init();
                    ui.gPageHome.onScrollEndHandler();
                }
                NewsListing.loadWeather();

            });

        }
    },
    checkCookie:function(){
		var layoutCookie = Common.getCookie(Constants.highlightLayout); 
        if(layoutCookie){
			NewsListing.reloadListing(layoutCookie);
        }
    }
}