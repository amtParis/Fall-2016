var map;
var mapReady;
var watchId;
var userLatLng;

//------------------------------ App Init ------------------------- //
function onDeviceReady() {
    
    console.log("Device Ready");
    
    // Initialize gps tracking of user with callback functions for success or failure
    //   enableHighAccuracy: if true we want the best results, if false uses less power and is faster
    //   timeout: maximum amount of time to wait for a position
    //   maximumAge: maximum amount of time (milliseconds) a cached position can be used (allowing cached readings usually helps save battery power)
    
    if (navigator && navigator.geolocation) {
        
        console.log("Watch User Position");

        watchId = navigator.geolocation.watchPosition(onGPSSuccess, onGPSError,
                                  {enableHighAccuracy:true,timeout:60000,maximumAge:3000} );
    }else{

        // what to do if we cannot get gps?

    } 
}

//------------------------------ GPS Callbacks ------------------------- //
    
function onGPSSuccess(position){
    
    console.log("GPS Success ");

    // the position returned has information on the latitude, longitude, speed, altitude and accuracy of reading
    // for example: position.coords.speed will return the user's speed in meters per second
    
    // check if the map has been created, and if not, create it with user position as center
    if( map == undefined ){
        
        initMap( position.coords.latitude, position.coords.longitude );
    
    }else if(mapReady == true){

      // here we can make any changes to the already created map
      // update / recenter map based on user position for example

    }
}
 

function onGPSError(error){
    
    console.log("GPS Error");

    // if tracking fails and no map has been created, make it with default center coordinates
    if( map == undefined ){

        initMap(48.860355, 2.344460);
    
    }

}

//------------------------------ Map Methods ------------------------- //
    
function initMap(lat,lng){
    
    userLatLng = new google.maps.LatLng(lat,lng);
	
	var map_options = {
            zoom: 15,
            center: userLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
        }
        
    var map_container = document.getElementById('main');
        
    // creates the map and adds to page
    map = new google.maps.Map(map_container, map_options);

    // add a marker
    var marker = new google.maps.Marker({
        position: userLatLng,
        map: map
    });
}


//------------------------------ Utils  ------------------------- //
