var watchId;

//------------------------- Init App ---------------------------//

function onDeviceReady(){
    console.log("Device Ready");  

    if (navigator && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(onSuccess, onError,
                                      {enableHighAccuracy:true,timeout:60000,maximumAge:250});
  	} else{
    
  	}    
}

function onSuccess(position) {
	
	console.log("Position tracked.");

	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var speed = position.coords.speed;
	var accuracy = position.coords.accuracy;
	var altitude = position.coords.altitude;
	var heading = position.coords.heading;

	var elem = document.getElementById("main");
	elem.innerHTML = "Lat: " + lat + "<br/>" + 
					 "Lon: " + lng + "<br/>" +
					 "Speed: " + speed + "<br/>" + 
					 "Alt: " + altitude + "<br/>";
}

function onError(error) {
	console.log("Error tracking position.");

	switch(error.code) {
        case error.PERMISSION_DENIED: console.log("Permission denied."); break;
        case error.POSITION_UNAVAILABLE: console.log("Position unavailable."); break;
        case error.TIMEOUT: console.log("Timeout."); break;
        case error.UNKNOWN_ERROR: console.log("Unknown error."); break;
    }

    var elem = document.getElementById("main");
	elem.innerHTML = "Error";
	
}


//-------- utils -----------

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