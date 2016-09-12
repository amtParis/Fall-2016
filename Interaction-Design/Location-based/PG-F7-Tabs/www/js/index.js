var map;
var mymap;
var mapReady;
var watchId;
var userLatLng;
var userMarker;
var shipPos = {lat:48.860355, lng: 2.344460};
//------------------------- Init App ---------------------------//

function onDeviceReady(){
    
    console.log("Device Ready");    

	if (navigator && navigator.geolocation) {
        
        console.log("Watch User Position");

        watchId = navigator.geolocation.watchPosition(onGPSSuccess, onGPSError,
                                  {enableHighAccuracy:true,timeout:60000,maximumAge:3000} );
    }


    // Initialize your app
	var myApp = new Framework7({
	    animateNavBackIcon:true
	});

	// Export selectors engine
	var $$ = Dom7;


	

	// Add main View
	// var mainView = myApp.addView('.view-main', {
	//     // Enable dynamic Navbar
	//     dynamicNavbar: true,
	//     // Enable Dom Cache so we can use all inline pages
	//     domCache: true
	// }); 

	$$('#tab2').on('show', function () {
	    console.log("Show tab 2");
	});


	// kind of a hack to repeat the animation with a long delay

	
	setInterval( function(){
		//$("#logo").addClass("shake");
		var logo = $('#logo').clone().removeClass("shake");
    	$('#logo').remove();
    	$('#about').append(logo);
    	$('#logo').addClass('shake');
	},10*1000);




}




function onGPSSuccess(position){
    
    console.log("GPS Success ");

    userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
//48.866578, 2.333033
    var distance = 1000*getDistanceFromLatLonInKm(userLatLng.lat,userLatLng.lng,48.860355, 2.344460);
    $("#distance-to-ship").text(distance.toFixed(2) + " meters");
    // the position returned has information on the latitude, longitude, speed, altitude and accuracy of reading
    // for example: position.coords.speed will return the user's speed in meters per second
    	    // check if the map has been created, and if not, create it with user position as center
    
    // check if tag is active
    var tabActive = $("#tab2").hasClass("active");

    if( tabActive && mymap == undefined ){
        
        initMap( userLatLng.lat, userLatLng.lng );
    
    }else if(tabActive && mapReady == true){

        console.log("Move user and recenter.");
        // var pos = new mapboxgl.LngLat(position.coords.longitude,position.coords.latitude);
        // userMarker.setLngLat(pos);
        // map.panTo(pos);

        // here we can make any changes to the already created map
        // update / recenter map based on user position for example
        userMarker.setLatLng( userLatLng );
        mymap.panTo( userLatLng );

    }
    
}
 

function onGPSError(error){
    
    console.log("GPS Error");

    // if tracking fails and no map has been created, make it with default center coordinates
    if( mymap == undefined ){

        initMap(48.860355, 2.344460);
    
    }

}

//------------------------------ Map Methods ------------------------- //
    
function initMap(lat,lng){
    
    console.log("make map");
    L.mapbox.accessToken = 'pk.eyJ1IjoiY3N1Z3J1ZSIsImEiOiJjaWc4ZjBiancwNGdwdnhtN3N4cXM5ejQ5In0.nE4hXDLBV-oRJd-SeZOqDA';
    mymap = L.mapbox.map('map', 'mapbox.4iecw76a',
        {
        zoomControl: false,
        attributionControl: false,
        }
    ).setView([lat,lng], 18);


    // alternative to add a marker with an image as the icon
    // var myIcon = L.icon({
    //     iconUrl: 'images/alien.png'
    // });

    // makes marker using html/css
    var myIcon = L.divIcon({
        className:'',
        html:'<div class="marker"><img src="images/alien.png"/></div>',
        iconSize: [40, 40]
    });

    userMarker = L.marker([lat,lng],{   
        icon: myIcon
    }).addTo(mymap);

    userMarker.bindPopup('Alien Life!');


    var myShipIcon = L.divIcon({
        className:'',
        html:'<div class="marker"><img src="images/shipsm.png"/></div>',
        iconSize: [50, 50]
    });

    var ship = L.marker([shipPos.lat,shipPos.lng],{   
        icon: myShipIcon
    }).addTo(mymap);

    // save that map is ready 
    mapReady = true;



}



//-------------------- utils

// geo function to get distance between points
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}