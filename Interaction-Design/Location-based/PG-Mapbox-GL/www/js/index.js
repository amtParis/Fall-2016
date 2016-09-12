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
        var pos = new mapboxgl.LngLat(position.coords.longitude,position.coords.latitude);
        userMarker.setLngLat(pos);
        map.panTo(pos);

        // here we can make any changes to the already created map
        // update / recenter map based on user position for example
        //userMarker.setLatLng( L.latLng(position.coords.latitude, position.coords.longitude) );
       // map.panTo( [ position.coords.latitude, position.coords.longitude ] );

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
    
    var pos = new mapboxgl.LngLat(lng,lat);
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3N1Z3J1ZSIsImEiOiJjaWc4ZjBiancwNGdwdnhtN3N4cXM5ejQ5In0.nE4hXDLBV-oRJd-SeZOqDA';
    map = new mapboxgl.Map({
        container: 'main',
        center: pos,
        zoom: 17,
        style: {
            "version": 8,
        "sources": {
            "simple-tiles": {
                "type": "raster",
                // point to our third-party tiles. Note that some examples
                // show a "url" property. This only applies to tilesets with
                // corresponding TileJSON (such as mapbox tiles). 
                "tiles": [
                    "https://a.tiles.mapbox.com/v3/eleanor.ipncow29/{z}/{x}/{y}.png"],
                "tileSize": 256
            }
        },
        "layers": [{
            "id": "simple-tiles",
            "type": "raster",
            "source": "simple-tiles",
            "minzoom": 0,
            "maxzoom": 19
        }]
    },
     //style: 'mapbox://styles/mapbox/light-v9',
     pitch: 60
    });

    map.on('load', function () {
        var img = document.createElement("img");
        img.src = "images/alien.png";
        img.className = "marker";

        var el = document.createElement('div');
        el.className = 'user-marker';
        el.appendChild(img);
        el.style.width = '40px';
        el.style.height = '40px';
    
    userMarker = new mapboxgl.Marker(el, {offset: [-20, -20]})
        .setLngLat(pos)
        .addTo(map)
        .setPopup(  new mapboxgl.Popup().setHTML('Alien Life!') );

    mapReady = true;

    });



}


//------------------------------ Utils  ------------------------- //
