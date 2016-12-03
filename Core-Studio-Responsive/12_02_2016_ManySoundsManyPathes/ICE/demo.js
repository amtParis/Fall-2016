var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");

// ALL SOUNDS, SEPARATE BY FINGER GROUP
// DUPLICATE THAT IF YOU WANT DIFFERENT SOUND FOR EACH AREA
var sound1fingers = ["ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3"];
var sound2fingers = ["ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3"];
var sound3fingers = ["ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3"];
var sound4fingers = ["ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3","ICE/data/sound.mp3"];

var request = new XMLHttpRequest();
var assets = [ ["ICE/data/ice.png", "ICE/data/ice.json", [sound1fingers,sound2fingers,sound3fingers,sound4fingers] ], ["ICE/data/spider.png", "ICE/data/spider.json", [sound1fingers,sound2fingers,sound3fingers,sound4fingers] ],["ICE/data/ice.png", "ICE/data/ice.json", [sound1fingers,sound2fingers,sound3fingers,sound4fingers] ], ["ICE/data/spider.png", "ICE/data/spider.json", [sound1fingers,sound2fingers,sound3fingers,sound4fingers] ] ];
var ressources = [];
var pathes = {};

// AREA CALCULATION
var areaWidth = window.innerWidth/2;
var areaHeight = window.innerHeight/2;

function loadAssets(){
    request.onreadystatechange = function(){
        if(request.readyState == request.DONE && request.status == 200) {
            structure = JSON.parse(request.response); //JSON.parse ==> transforming strings into objects
            texture = new Image();
            texture.src = assets[0][0];
            texture.onload = function(){
                // console.log("test")
                // _drawing = new Drawing(ctx,0,0,structure,texture);
                // allActiveDrawings.push(_drawing);
                var sounds = loadAllSounds(assets[0][2]);
                var trail = new Trail(ctx,texture,structure,sounds);
                ressources.push(trail);


                // IN ressources, you need to store 4 TRAIL object that correspond to each 4 area in the screen. You need to have them all listed in assets
                // EACH trail object has 1 texture, 1 JSON and an array of sounds. Each texture will have different image to display.
                // Depending on how many fingers are touching the screen, we will be able to play different sound

                // ressources[0]              ==> trail for area 1
                // ressources[2]              ==> trail for area 2
                // ...

                // EXAMPLES :
                // ressources[0].texture      ==> texture used for area 1 (if you want to have different visuals depending on finger's number, add them to the texture)
                // ressources[0].json         ==> structure used for area 1
                // ressources[0].sounds[0][0] ==> first sound, for 1 finger in area 1;
                // ressources[0].sounds[1][0] ==> first sound, for 2 finger in area 1;
                // ressources[1].sounds[2][3] ==> fourth sound, for 3 fingers in area 2;
                // ...


                assets.shift();
                if(assets.length>0){
                    loadAssets();
                }else{
                    setup();
                }
            }
        }
    }

    request.open('GET', assets[0][1]); //asking any sever for the answer we want to get
    request.send();
}

function loadAllSounds(array){
  var soundArray = [];
  for(var i=0;i<array.length;i++){
    var allSounds = [];
    for(var j=0;j<array[i].length;j++){
        var audio = document.createElement('audio');
        audio.src = array[i][j];
        audio.preload = true;
        audio.loop = false;
        audio.load();
        document.body.appendChild(audio);
        allSounds.push(audio);
    }
    soundArray.push(allSounds);
  }
    return soundArray;
}

function setup(){

  document.addEventListener("touchstart", onTouchStart);
  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);

  draw();
}

function draw(){
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

  for(var i = 0;i<ressources.length;i++){
    ressources[i].display();
  }

  requestAnimationFrame(draw);
}

function onTouchStart(e) {
    for(var i = 0;i<e.touches.length;i++){
       var path = [];
       path.push([e.touches[i].pageX, e.touches[i].pageY, e.touches.length]);
       pathes[e.touches[i].identifier] = path;
    }
}

function onTouchMove(e) {
  //console.log("move",e.touches[0]);
  for(var i = 0;i<e.touches.length;i++){
      pathes[e.touches[i].identifier].push([e.touches[i].pageX, e.touches[i].pageY,e.touches.length]);
  }
}

function onTouchEnd(e) {
    for(var i = 0;i<e.changedTouches.length;i++){
        //choose a trail to draw
        var index = Math.floor(pathes[e.changedTouches[i].identifier][0][0]/areaWidth) + Math.floor(pathes[e.changedTouches[i].identifier][0][1]/areaHeight)*2 ;
        ressources[index].path = pathes[e.changedTouches[i].identifier];
        ressources[index].isDrawing = true;
        ressources[index].playSound();
    }
}

loadAssets();
