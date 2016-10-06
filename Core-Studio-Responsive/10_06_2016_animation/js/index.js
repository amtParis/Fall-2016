var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var assets  = ["data/animation.png","data/animation.json"];
var request = new XMLHttpRequest();
var spriteSheetInfos;
var texture;
var myAnimation;

function loadAssets(){
  console.log("load assets");
  request.onreadystatechange = function(){
      console.log(request);
      console.log(request.DONE);
      if(request.readyState == request.DONE && request.status == 0){
          spriteSheetInfos = JSON.parse(request.responseText);
          texture = new Image();
          texture.src = assets[0];
          texture.load = setup();
      }
  }

  request.open('GET',assets[1]);
  request.send();
}

function setup(){
  myAnimation = new Animation(ctx,100,100,spriteSheetInfos,texture);

  draw();
}

function draw(){
  ctx.fillStyle = "#cccccc";
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

  myAnimation.update();
  myAnimation.draw();


  requestAnimationFrame(draw);
}

loadAssets();
