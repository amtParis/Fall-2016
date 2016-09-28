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
var memory = [];



function setup(){
  var tempoVar = 1;
  edgeSize = 10;
  sentence = updateTime();
  offsetY = window.innerHeight/2 - (7*edgeSize)/2;
  offsetX = window.innerWidth/2 - (sentence.length*6*edgeSize)/2;
  //shape = new Shape(ctx);
  decoder = new Decoder();
  //setInterval(draw,500);

  initAllParticles();

  draw();
}

//create the global memory
function initAllParticles(){

  for(var k=0;k<sentence.length;k++){
    var offset = k * 6* edgeSize;
    for(var j=0;j<7;j+=1){
        for(var i=0;i<5;i+=1){
          var particle = new Particle(ctx,Math.round(offsetX+i*edgeSize + offset),offsetY+j*edgeSize);
          memory.push(particle);
        }
    }
  }
  console.log(memory.length);
}

function draw(){
  sentence = updateTime();

  ctx.fillStyle = 'black';
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  for(var k=0;k<sentence.length;k++){

    //var offset = k * 6* edgeSize;
    for(var j=0;j<7;j+=1){
        for(var i=0;i<5;i+=1){
            var myletterBlocks = decoder.getBlocks(sentence[k]);
            if(myletterBlocks[j][i]==1){
              memory[0].update(sentence[k]);
              memory[0].draw();
            }
            var shift = memory.shift();
            memory.push(shift);
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
  var sentence = hours +":"+minutes+":"+seconds;//+":"+mseconds;
  return sentence;
}

setup();
