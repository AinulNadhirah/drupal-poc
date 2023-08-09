function lc_selectCentre(selectedVar,  doNotChangeLabel) {
     if (selectedVar !== "") {
        if(!doNotChangeLabel){
			$('._selectedCentre').text(_option0[selectedVar]);
		}
        //$('._selectedCentre').text(_option0[selectedVar]);
        $('._selectCtryDiv li').remove();
        $('._selectOffDiv li').remove();
        var chosenCtry = '';

        if(_mapJsonArray){
            for(var i=0 ;i<_mapJsonArray.length;i++){
                var centreObj = _mapJsonArray[i]; 
                if(selectedVar==centreObj.name){
                    for(var x=0;x<centreObj.countries.length;x++){
                        var countryObj = centreObj.countries[x];
                        $('._selectCtryDiv ul').append(
                            $('<li>').append(
                                $('<a>').attr('href','javascript:lc_selectCountry(\''+countryObj.name+'\',0);').attr('data',countryObj.name).append(
                                    $('<span>').append(countryObj.title)
                        )));

                        if(x==0){
                            chosenCtry= countryObj.name;
                        }
                    }
                }
                lc_selectCountry(chosenCtry, doNotChangeLabel);
            }
        }
     }
}


function lc_selectCountry(selectedVar, doNotChangeLabel) {
    if (selectedVar !== "") {
        if(!doNotChangeLabel){
        	$('._selectedCtry').text(_option1[selectedVar]);
        }
        $('._selectOffDiv li').remove();
        var chosenLoc = '';
        if(_mapJsonArray){
            for(var i=0 ;i<_mapJsonArray.length;i++){
                var centreObj = _mapJsonArray[i]; 
                for(var x=0;x<centreObj.countries.length;x++){
                    var countryObj = centreObj.countries[x];
                    if(countryObj.name==selectedVar){
                        for(var z=0;z<countryObj.locations.length;z++){
                            var locObj = countryObj.locations[z];
                            $('._selectOffDiv ul').append(
                                $('<li>').append(
                                    $('<a>').attr('href','javascript:lc_selectOffice(\''+locObj.name+'\',0);').attr('data',locObj.name).append(
                                        $('<span>').append(locObj.title)
                                 )));
                            if(z==0){
                                chosenLoc= locObj.name;
                            }
                        }
                        break;

                    }
                }
            }
    
        }
    

        lc_selectOffice(chosenLoc, doNotChangeLabel);
    }
}

function lc_selectOffice(selectedVar, doNotChangeLabel) {
    if (selectedVar !== "") {
        if(!doNotChangeLabel){
			$('._selectedOff').text(_option2[selectedVar]);
        }
        // Multiple Markers
        var g_markers = new Array();

        $('div[id^=_locmap_'+selectedVar+']').each(function(){

			var locmap = JSON.parse($(this).text());
            if (locmap) {
                var marker = [locmap.mapTitle, locmap.mapLat, locmap.mapLong, selectedVar, locmap.id ];
                g_markers.push(marker);

            }
        });

        //$('._selectedOff').text(_option2[selectedVar]);
        //$('._officeInfo').hide();
        //$('#_'+selectedVar+"_"+selectedIdx).show();
		_map_initialize(g_markers);
    }
}


function _map_initialize(g_markers_array) {

    //var g_myLatlng = new google.maps.LatLng(g_lat,g_long);
	var g_bounds = new google.maps.LatLngBounds();
		var g_mapOptions = {
			mapTypeId: 'roadmap',
			zoom: 8
		};

    g_map = new google.maps.Map(document.getElementById("map-canvas"), g_mapOptions);
	var g_marker;
		// Loop through our array of markers & place each one on the map  
    for(var i = 0; i < g_markers_array.length; i++ ) {
        if(g_markers_array[i]){
            var g_position = new google.maps.LatLng(g_markers_array[i][1], g_markers_array[i][2]);
            g_bounds.extend(g_position);
            g_marker = new google.maps.Marker({
                position: g_position,
                map: g_map,
                title: g_markers_array[i][0]
            });

            // Allow each marker to have an info window    

            if(i==0){
                //$('.ct div ._officeInfo').hide();
				//$('#_'+g_markers_array[i][3]+"_"+g_markers_array[i][4]).show();
                showMapOverlayInfo(g_markers_array[i][3]+"_"+g_markers_array[i][4]);
            }

            google.maps.event.addListener(g_marker, 'click', (function(g_marker, i) {
                return function() {
                    // show the office info
                    g_map.setCenter(g_marker.getPosition());
                    //$('.ct div ._officeInfo').hide();
                    //$('.boxCt').show();
					//$('#_'+g_markers_array[i][3]+"_"+g_markers_array[i][4]).show();
                    showMapOverlayInfo(g_markers_array[i][3]+"_"+g_markers_array[i][4]);
                }
                })(g_marker, i));

            // Automatically center the map fitting all markers on the screen
            g_map.fitBounds(g_bounds);
        }
    }
    if(g_markers_array.length==1){
        g_map.setZoom(14);
    }
    // Loop through our array of markers & place each one on the map  


    		// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    /*if(g_markers_array.length>1){
		var boundsListener = google.maps.event.addListener((g_map), 'bounds_changed', function(event) {
			this.setZoom(14);
			google.maps.event.removeListener(boundsListener);
		});
    }*/

}

function showMapOverlayInfo(jqid){

	var thismap = $('#_locmap_'+jqid).html();
    var address = $('#_locmapaddress_'+jqid).html();
    var thisjson = JSON.parse(thismap);
    if(thisjson){
        $('#mapoverlaytitle').text(thisjson.mapTitle);
        $('#mapoverlayaddress').html(address);
        $('#mapcontactnum').html(thisjson.contactnum);
        $('#mapfaxNum').html(thisjson.faxnum);
        $('#mapcontactnumlbl').html(thisjson.contactnumlbl);
        $('#mapemail').html(thisjson.email); 
    }

}

function mapfirstinitialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(3.150579, 101.710825)
  };
  g_map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}