// MODIFY: initital zoom level of map
var zoom = 17; // can be from 0 to 20, 20 being closest zoom


// MODIFY: add your GPS coordinates here
var locations = [
    {"latitude": 48.870711, "longitude": 2.332256 },
    {"latitude": 48.866491, "longitude": 2.332929 },
    {"latitude":48.867829, "longitude": 2.334533 }
];


var map = null;
var watchId = null;
var markers = [];

//------------  initializes the app, creating the geolocation callback to get current position over time
function init(){
  
  if (navigator && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(onSuccess, onError,
                                      {enableHighAccuracy:true,timeout:60000,maximumAge:250});
  }

}

//------------ gps callbacks

// when gps coordinates are successfully received this function is called
function onSuccess(position) {
  
  // get the latitude and longitude object from the call back 
  //var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var myLatLng = new google.maps.LatLng(48.868685, 2.333158);
  
  // only create the map if not yet created
  if(map == undefined) {
        
        // sets the map options (zoom, center position, type)
        var map_options = {
            zoom: zoom,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
        }
        var map_container = document.getElementById('map');
        
        // creates the map and adds to page
        map = new google.maps.Map(map_container, map_options);

        // add each of the markers in markers array
        for( var i = 0; i < locations.length; i++){
        (function () {
            var gPos = new google.maps.LatLng(locations[i].latitude,locations[i].longitude);

            markers[i] = new google.maps.Marker({
              position: gPos,
              map: map
            });

            var val = i;
            markers[i].addListener("click", function() { showSection(val); });

          }());
        }


    }else{
        
        // if the map is already created, pan to the new position
        // map.panTo(myLatLng);        
    }
    
}

// onError Callback receives a PositionError object
function onError(error) {
    
    console.log("Error getting gps position.");
    /*alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');*/
}


//------------ hide and show sections of page

function showSection(i){
  $(".section").css({"opacity":0,"z-index": -1});
  var show =  "#section"+ i;
  $(show).css({"display":"block","opacity":1,"z-index": 100});
}

function hideSections(){
  $(".section").css({"opacity":0,"z-index": -1});
}

$('.cornerArrow').click(function(){
  hideSections();
});



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


