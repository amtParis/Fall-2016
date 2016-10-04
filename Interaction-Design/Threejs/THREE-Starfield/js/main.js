//--- GLOBALS
var scene, camera, renderer, controls, container;
var starFields = [];
var numTiles = 3;
//--- START APP
init();
animate();

//--- SETUP
function init(){

    // create the rendereer and set its size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.setClearColor( 0x000000 );

    container = document.getElementById( 'world' );
    container.appendChild( renderer.domElement );

    // create and set up the scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x666666, 0.007 ); // optional fog

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

    //addFloor(-2,10);
    //addCube();
    addStars(3);
    //addLights();

 
    // event listeners
    window.addEventListener( 'resize', onWindowResize, false );
    // container.onclick = function() { fullscreen(); }

}



//--- MAIN LOOP
function animate(){

    for( var i  = 0; i < starFields.length; i++){
        starFields[i].position.z -= 1;
        if(starFields[i].position.z<-1000) {
              starFields[i].position.z += numTiles * 1000;
        }
    }
    
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  
}


//---------- SCENE OBJECT METHODS
function addStars(numTiles) {


    var geometry = new THREE.Geometry();

    for ( var i = 0; i < 20000; i ++ ) {

        var vertex = new THREE.Vector3();
        vertex.x = (Math.random()-0.5) * 2000;
        vertex.y = (Math.random()-0.5) * 2000;
        vertex.z = (Math.random()-0.5) * 2000;

        geometry.vertices.push( vertex );
    }

    var material = new THREE.PointsMaterial( {
      size : 5,
      color: 0xffffff
    });

    for ( var i = 0; i < numTiles; i ++ ) {

      starFields[i] = new THREE.Points( geometry, material );
      starFields[i].position.z = i * 1000;

      scene.add( starFields[i] );
    }
}


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
    var cube = new THREE.Mesh( geometry, material );
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
