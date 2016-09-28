//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var allShapes = [];
var gravity = 0.07;
var shapeNbr = 200;
var radius = 10;
var centerX = window.innerWidth/2;
var centerY = window.innerHeight;

function setup(){
  draw();
}

function addShape(){
  if(allShapes.length<shapeNbr){
    var myShape = new Shape(ctx,centerX,centerY);
    allShapes.push(myShape);
  }
}

function drawAllShapesAvailableOnStage(){
  for(var i = 0;i<allShapes.length;i++){
    ctx.fillStyle = "red";
    ctx.beginPath();
    allShapes[i].speedY = allShapes[i].speedY + gravity;
    allShapes[i].x = allShapes[i].x + allShapes[i].speedX;
    allShapes[i].y = allShapes[i].y + allShapes[i].speedY;
    allShapes[i].drawCircle(radius);
    ctx.fill();
    ctx.closePath();

    if(allShapes[i].y> window.innerHeight){
      allShapes[i].x = centerX;
      allShapes[i].y = centerY-5;
      allShapes[i].speedY = -Math.random()*7 - 1;
        // allShapes[i].y = allShapes[i].y-5;
        // allShapes[i].speedY = 0;
        // allShapes[i].speedX = 0;
    }

  }
}

function draw(){
  addShape();
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  drawAllShapesAvailableOnStage();
  requestAnimationFrame(draw);
}
setup();
