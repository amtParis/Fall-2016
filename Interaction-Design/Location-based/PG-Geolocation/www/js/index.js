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
