//RETINA
var scale = window.devicePixelRatio;

// APPLICATION VARIABLES
var largeur = window.innerWidth;
var hauteur = window.innerHeight;
var canvas = document.getElementById('canvas');

canvas.width = largeur * scale;
canvas.height = hauteur * scale;

canvas.style.width = largeur;
canvas.style.height = hauteur;

//IMPORTANT
var ctx = canvas.getContext('2d');
ctx.scale(scale, scale);


//BALLS STOCK
var balls = [];
//FINGER STOCK
var virtualMouses = []

//BLITTING
var assets = [ {"jsn":'SoundToy/json/medusa.json',"texture":'SoundToy/texture/medusa2.png'} ];
var medusaIMG;
var loadedJSN;
var request = new XMLHttpRequest();
var medusaNbr = 10;


var audio = document.createElement('audio');
var audio_files = ['SoundToy/sounds/1.mp3','SoundToy/sounds/2.mp3','SoundToy/sounds/3.mp3','SoundToy/sounds/4.mp3','SoundToy/sounds/5.mp3'];
//var audio_files = [];

var random_file = audio_files[Math.floor(Math.random()*audio_files.length)];
var audiofile = new Audio(random_file);

var sound = document.createElement('audio');
var sound_file = ['SoundToy/sounds/jill_01.mp3'];
var soundfile = new Audio(sound_file);


//function loadAllAudios(){
//    for(var i=0;i<audio_files.length;i++){
//        var audio = document.createElement('audio');
//        audio.src = audio_files[i];
//        audio.preload = true;
//        audio.loop = false;
//        audio.load();
//        document.body.appendChild(audio);
//        audio_filesFiles.push(audio);
//    }
//    loadAssets();
//}

//LOAD JSON AND TEXTURE
function loadAssets(){

    request.onreadystatechange = function(){
      if( request.readyState == request.DONE && request.status == 200 ) {
        loadedJSN = JSON.parse(request.responseText);
        medusaIMG = new Image();
        medusaIMG.src = assets[0].texture;
        medusaIMG.onload = function(){
            setup();
        }
      }
    }

    request.open('GET', assets[0].jsn);
    request.send();
}



//INITIATE ELEMENTS ON SCENE
//INITIATE TOUCH EVENT
function setup(){
    console.log('setup');

    for(var i=0;i<medusaNbr;i++){
        var posx = Math.random()*largeur-60;
        var posy = Math.random()*hauteur-60;
        balls[i] = new Ball(medusaIMG,loadedJSN,ctx,posx,posy,40);
    }


    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    animate();
    soundfile.loop = true;
    soundfile.play();
    
}

//ERASE SCREEN WITH A BLACK RECT  (COULD HAVE BEEN CLEARED)
//DRAW ALL ELEMENT ON SCENE
function draw(){

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,largeur, hauteur);

    for(var i=0;i<medusaNbr;i++){
        balls[i].verifyDrag(virtualMouses);
        balls[i].display();
        if(balls[i].dragging){
            balls[i].calculSpeedValue(balls[i].x,balls[i].y);
        }
    }

}


//WHAT HAPPENS WHEN THE USER TOUCH THE SCREEN
//CREATION OF A VIRTUAL MOUSE THAT WILL STORE ALL FINGER POSITION AND ID
function onTouchStart(e){
    console.log("touch start");
    e.preventDefault();
    virtualMouses = [];
    for(var i=0;i<e.touches.length;i++){
        virtualMouses[i] = {"mouseX":e.touches[i].pageX,"mouseY":e.touches[i].pageY,"ID":e.touches[i].identifier};
    }

    for(var j=0;j<balls.length;j++){
        balls[j].checkTouch(virtualMouses);
    }

}
//WHAT HAPPENS WHEN THE USER MOVE HIS FINGER
//UPDATE THE VIRTUAL MOUSE FOR EACH FINGER
function onTouchMove(e){

    e.preventDefault();
    virtualMouses = [];
    for(var i=0;i<e.touches.length;i++){
        virtualMouses[i] = {"mouseX":e.touches[i].pageX,"mouseY":e.touches[i].pageY,"ID":e.touches[i].identifier};
    }
    audiofile.play();
}
//WHAT HAPPENS WHEN THE USER ENDS TOUCH
//CHECK IF A BALL WAS DRAGGED AND STOP IT
function onTouchEnd(e){
    e.preventDefault();
    //CHECK BALLS STATE (DRAGGING, STATIC, MOVING)
    for(var q=0;q<e.changedTouches.length;q++){
        for(n=0;n<balls.length;n++){
            if(e.changedTouches[q].identifier == balls[n].ID){
                balls[n].stopDragging();
            }
        }
    }

}
//DRAWING LOOP
function animate() {


    draw();
    requestAnimationFrame( animate );
}

loadAssets();
