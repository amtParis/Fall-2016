//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var XSquareNbr;
var YSquareNbr;
var edgeSize;
var myNumber;
var offsetX;
var offsetY;

ctx.strokeStyle = 'black';

function setup(){
  // XSquareNbr = 5;
  // YSquareNbr = 7;
  edgeSize = 20;
  myNumber = "12345";
  offsetX = window.innerWidth/2 - (5*6*edgeSize)/2;
  offsetY = window.innerHeight/2 - (7*edgeSize)/2;
  //setInterval(draw,500);
  draw();
}

function draw(){
  ctx.fillStyle = 'black';
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  for(var k=0;k<myNumber.length;k++){
    var binary = numbers[myNumber[k]];
    for(var j=0;j<binary.length;j+=1){
        var activeLine = binary[j];
        for(var i=0;i<activeLine.length;i+=1){
          //var edgeSize = side + Math.random()
          var activeCell = activeLine[i];
          if(activeCell == 1){
            ctx.beginPath();
            var rnd = Math.round(Math.random());
            if(rnd ==0){
                ctx.arc(offsetX+i*edgeSize + k*(edgeSize*activeLine.length + edgeSize) + edgeSize/2,offsetY+j*edgeSize + edgeSize/2,edgeSize/2,0,Math.PI*2,false);
                ctx.fillStyle = 'red';
            }else{
              ctx.rect(offsetX+i*edgeSize + k*(edgeSize*activeLine.length + edgeSize),offsetY+j*edgeSize,edgeSize,edgeSize);
              ctx.fillStyle = 'white';
            }
            //ctx.fillStyle = "rgba("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.random()+")";//'#'+Math.floor(Math.random()*0xffffff).toString(16);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
          }
        }
    }
  }

  requestAnimationFrame(draw);
}

setup();
