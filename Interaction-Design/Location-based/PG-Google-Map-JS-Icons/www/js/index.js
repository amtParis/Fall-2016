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

        // here we can make any changes to the already created map
        // update / recenter map based on user position for example
        userMarker.setPosition( new google.maps.LatLng( position.coords.latitude, position.coords.longitude ) );
        map.panTo( new google.maps.LatLng( position.coords.latitude, position.coords.longitude ) );

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
            zoom: 18,
            center: userLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            styles: getJsonStyles()

        }
        
    var map_container = document.getElementById('main');
        
    // creates the map and adds to page
    map = new google.maps.Map(map_container, map_options);


    // add a marker with an image as the icon
    var image = 'images/alien.png';

    userMarker = new google.maps.Marker({
        position: userLatLng,
        map: map,
        icon: image,
        optimized: false
    });

    var infowindow = new google.maps.InfoWindow({
          content: "ALIEN Life!"
    });

    // listen for click events on that icon
    userMarker.addListener('click', function() {
        // if i click on my user marker, what happens? put it here
        infowindow.open(map, userMarker);
    });
    
    


    // save that map is ready 
    mapReady = true;

}


//------------------------------ Utils  ------------------------- //
function getJsonStyles(){
    // https://snazzymaps.com/style/37/lunar-landscape
    var styles = 
    [
    {
        "stylers": [
            {
                "hue": "#ff1a00"
            },
            {
                "invert_lightness": true
            },
            {
                "saturation": -100
            },
            {
                "lightness": 33
            },
            {
                "gamma": 0.5
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2D333C"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [ { "visibility": "off" } ]
    }
    ];

    return styles;

}