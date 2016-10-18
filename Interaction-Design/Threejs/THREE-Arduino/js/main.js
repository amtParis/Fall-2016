//--- GLOBALS
var scene, camera, renderer, controls, container, cube;
var connection = new WebSocket('ws://localhost:4000');
var targetRotation = 0;

connection.onopen = function(){
    console.log("open connection");
}

connection.onmessage = function(message){
  try {
       var json = JSON.parse(message.data);
   } catch (e){
      alert("BAD JSON");
      return;
   }
   var data = json.message.replace(/(\r\n|\n|\r)/gm,"");
   

   var newRot = (2*Math.PI) * (parseInt(data) / 1023.0);
   targetRotation = newRot;//.9 * targetRotation + .1 * newRot;
      console.log(targetRotation);

}

connection.onerror = function(error){
  alert("PROBLEM WITH SERVER");
}


//--- START APP
init();
animate();


//--- SETUP
function init(){

    // create the rendereer and set its size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.setClearColor( 0xffffff );

    container = document.getElementById( 'world' );
    container.appendChild( renderer.domElement );

    // create and set up the scene
    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2( 0x0ffffff, 0.1 ); // optional fog

    // set up a camera with fov, aspect ratio, near, far clipping places
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    camera.position.y= 1;
    scene.add(camera);            

    //--- controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; //  optional settings
    controls.dampingFactor = 0.5;
    //controls.enableZoom = false;

    addFloor(-2,10);
    addCube();
    addLights();

 
    // event listeners
    window.addEventListener( 'resize', onWindowResize, false );
    // container.onclick = function() { fullscreen(); }

}



//--- MAIN LOOP
function animate(){

  cube.rotation.y = .9 * cube.rotation.y + .1 * targetRotation;
  //        cube.rotation.y += .01;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  
}



//---------- SCENE OBJECT METHODS

function addFloor(yOffset,size){
    var geometry = new THREE.PlaneGeometry(size,size);
    var material = new THREE.MeshLambertMaterial( { color: 0x68c3c0, side: THREE.DoubleSide } ); 
    var plane = new THREE.Mesh(geometry,material);
    plane.rotation.x = -Math.PI/2.0;
    plane.position.y = yOffset;
    plane.receiveShadow = true; 
    scene.add( plane);
}

function addLights(){
    
    var light = new THREE.AmbientLight( 0x808080 ); // soft white light
    scene.add( light );

    var shadowLight = new THREE.DirectionalLight(0xffffff, .5);
    shadowLight.position.set(10, 50, 10);
    shadowLight.castShadow = true;
    scene.add(shadowLight);
}

function addCube(){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x68c3c0 } );
    
    // make a mesch with geometry and material and add it to the scene
    cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    scene.add( cube ); 
}



//--------- WINDOW
function onWindowResize() {
    
    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}


function fullscreen() {
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
}   
