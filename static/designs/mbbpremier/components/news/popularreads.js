var PopularReads = {

    loadReads:function(){
		var popularreadsinfo = JSON.parse($('#articlepopularreads').text());
        var resultsurl = popularreadsinfo.resultsurl;
		resultsurl = resultsurl+'.popularreadcontent.'+'html';

        var catArray = Categories.getCategories().split(",");
        var postJson = {}; 
        if(!Common.checkEmptySplitArray(catArray)){
        	postJson.category = catArray;
        }
		$('#PopArticlesContainer').load(resultsurl, postJson , function() {

        });
    }


}