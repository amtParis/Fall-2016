//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var XSquareNbr;
var YSquareNbr;
var edgeSize;
var sentence;
var offsetX;
var offsetY;
var shape;// new tool box
var decoder; // new tool to decode dot matrix structure



function setup(){
  var tempoVar = 1;
  edgeSize = 20;

  offsetY = window.innerHeight/2 - (7*edgeSize)/2;
  shape = new Shape(ctx);
  decoder = new Decoder();
  //setInterval(draw,500);
  draw();
}

function draw(){
  sentence = updateTime();
  offsetX = window.innerWidth/2 - (sentence.length*6*edgeSize)/2;
  ctx.fillStyle = 'white';
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  for(var k=0;k<sentence.length;k++){

    var offset = k * 6* edgeSize;
    for(var j=0;j<7;j+=1){
        for(var i=0;i<5;i+=1){
            var myletterBlocks = decoder.getBlocks(sentence[k]);
            if(myletterBlocks[j][i]==0){
                ctx.fillStyle = 'rgba(0,0,0,0)';
                ctx.strokeStyle = 'rgba(0,0,0,0)';
            }else{
                ctx.fillStyle = 'rgba(255,0,0,1)';
                ctx.strokeStyle = 'rgba(0,0,0,1)';
            }
            ctx.beginPath();
            shape.drawCrazyTriangle(Math.round(offsetX+i*edgeSize + offset),offsetY+j*edgeSize,edgeSize,edgeSize,sentence[k]);
            //ctx.fill();
            ctx.stroke();
            ctx.closePath();

        }
    }
  }

  requestAnimationFrame(draw);
}

function updateTime(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var mseconds = date.getMilliseconds();
  //leading zero
  if(hours<10){
    hours = "0"+hours;
  }
  if(minutes<10){
    minutes = "0"+minutes;
  }
  if(seconds<10){
    seconds = "0"+seconds;
  }
  if(mseconds<10){
    mseconds = "00"+mseconds;
  }else if(mseconds<100){
    mseconds = "0"+mseconds;
  }

  //final sentence
  var sentence = hours +":"+minutes+":"+seconds+":"+mseconds;
  return sentence;
}

setup();
