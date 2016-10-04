//--- GLOBALS
var scene, camera, renderer, controls, container;
var particles = [];

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
    scene.fog = new THREE.FogExp2( 0x000000, 0.001 ); // optional fog

    // set up a camera with fov, aspect ratio, near, far clipping places
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.z = 500;
    camera.position.y= 300;
    scene.add(camera);            

    //--- controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; //  optional settings
    controls.dampingFactor = 0.5;
    controls.enableZoom = false;

    addFloor(-2,1000);
    addParticles(1000);
    addLights();

 
    // event listeners
    window.addEventListener( 'resize', onWindowResize, false );
    // container.onclick = function() { fullscreen(); }

}



//--- MAIN LOOP
function animate(){

    
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  
}


//---------- SCENE OBJECT METHODS
function addParticles(numParticles) {

    var material = new THREE.SpriteMaterial( {
        map: new THREE.CanvasTexture( generateSprite() ),
        blending: THREE.AdditiveBlending
    } );

    for ( var i = 0; i < numParticles; i++ ) {

        particles[i] = new THREE.Sprite( material );

        particles[i].position.set( Math.random() * 4000 - 2000, Math.random() * 4000 - 2000, Math.random() * 4000 - 2000 );
        particles[i].scale.x = particles[i].scale.y = Math.random() * 32 + 16;
        scene.add( particles[i] );
    }
}


function generateSprite(){
    var canvas = document.createElement( 'canvas' );
    canvas.width = 16;
    canvas.height = 16;

    var context = canvas.getContext( '2d' );
    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
    gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    return canvas;
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

    // var shadowLight = new THREE.DirectionalLight(0xffffff, .5);
    // shadowLight.position.set(10, 50, 10);
    // shadowLight.castShadow = true;
    // scene.add(shadowLight);
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
