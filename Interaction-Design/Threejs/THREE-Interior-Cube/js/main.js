//--- GLOBALS
var scene, camera, renderer, controls, container;


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

    // set up a camera with fov, aspect ratio, near, far clipping places
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 75;
    scene.add(camera);            

    //--- controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true; //  optional settings
    controls.dampingFactor = 0.5;
    //controls.enableZoom = false;

    addRoom();
    addCube();
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
function addLights(){
    
    var amblight = new THREE.AmbientLight( 0xffffff, .25 ); // soft white light
    //scene.add( light );

    var dirLight = new THREE.DirectionalLight(0xffffff, .75);
    dirLight.position.set(20, 50, 10);
    //shadowLight.castShadow = true;
    //scene.add(dirLight);

    var pointLight = new THREE.PointLight(0x00ff00, 1, 100);
    pointLight.position.set( 60, -70, 0 );
    scene.add(pointLight);
    scene.add(new THREE.PointLightHelper(pointLight, 1));

    var spotLight = new THREE.SpotLight(0xffffff, 2, 150,90,1);//, 50, 50);
    spotLight.position.set( 0, 48, 0 );
    spotLight.castShadow = true;
    scene.add(spotLight);
    scene.add(new THREE.SpotLightHelper(spotLight, 1));

    var hemLight = new THREE.HemisphereLight(0xffe5bb, 0xFFBF00, .21);
    scene.add(hemLight);


}

function addRoom(){
    
    //var geometry = new THREE.BoxGeometry( 200, 100, 150 );
    //var material = new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.BackSide } );
    //var cube = new THREE.Mesh( geometry, materials );

    var materials = [
        new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.BackSide } ),
        new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.BackSide } ),
        new THREE.MeshPhongMaterial( { color: 0xffffcc, side: THREE.BackSide } ),
        new THREE.MeshPhongMaterial( { color: 0xff00ff, side: THREE.BackSide } ),
        new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.BackSide } ),
        new THREE.MeshPhongMaterial({
           map: THREE.ImageUtils.loadTexture('textures/checker.png'),
           side: THREE.BackSide 
       })
    ];

    var geometry = new THREE.CubeGeometry(150, 150, 150, 1, 1, 1);
    var room = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    room.receiveShadow = true;
    scene.add( room ); 
}


function addCube(){
    var geometry = new THREE.BoxGeometry( 15, 15, 15 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    var cube = new THREE.Mesh( geometry, material );
    cube.rotateX(.9);
    cube.rotateY(1);
    cube.castShadow = true;
    scene.add(cube);
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
