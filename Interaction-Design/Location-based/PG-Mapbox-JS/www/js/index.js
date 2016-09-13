var map;
var mapReady;
var watchId;
var userLatLng;
var userMarker;

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

        console.log("Move user and recenter.");
        // var pos = new mapboxgl.LngLat(position.coords.longitude,position.coords.latitude);
        // userMarker.setLngLat(pos);
        // map.panTo(pos);

        // here we can make any changes to the already created map
        // update / recenter map based on user position for example
        userMarker.setLatLng( L.latLng(position.coords.latitude, position.coords.longitude) );
        map.panTo( [ position.coords.latitude, position.coords.longitude ] );

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
    
    L.mapbox.accessToken = 'pk.eyJ1IjoiY3N1Z3J1ZSIsImEiOiJjaWc4ZjBiancwNGdwdnhtN3N4cXM5ejQ5In0.nE4hXDLBV-oRJd-SeZOqDA';
    map = L.mapbox.map('main', 'mapbox.4iecw76a',
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
    }).addTo(map);

    userMarker.bindPopup('Alien Life!');


    // save that map is ready 
    mapReady = true;



}


//------------------------------ Utils  ------------------------- //
