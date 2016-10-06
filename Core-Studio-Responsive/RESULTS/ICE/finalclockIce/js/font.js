//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var image = document.getElementById ("image");
var XSquareNbr;
var YSquareNbr;
var edgeSize;
var sentence;
var offsetX;
var offsetY;
var shape;// new tool box
var decoder; // new tool to decode dot matrix structure
var memory = [];
var soundIsPlaying = false;
var shouldExplode = true;
var minuteForAlert     = "59";
var secondForAlert     = "50";
var minuteForExplosion = "00";
var countdown = new Audio('countdown.mp3');
var myAudio = new Audio('space.mp3');
    myAudio.loop = true;
    myAudio.play();
var explosion = new Audio ('explosion.mp3');




function setup(){
  var tempoVar = 1;
  edgeSize = 7;
  var datas = updateTime();
  sentence = datas[0];
  offsetY = window.innerHeight/2 - (14*edgeSize)/2;
  offsetX = window.innerWidth/2 - (sentence.length*15*edgeSize)/2;
  //shape = new Shape(ctx);
  decoder = new Decoder();

  initAllParticles();
  draw();
}

function initAllParticles(){

  for(var k=0;k<sentence.length;k++){
    var offset = k * 15* edgeSize;
    for(var j=0;j<14;j+=1){
        for(var i=0;i<12;i+=1){
          var particle = new Particle(ctx,Math.round(offsetX+i*edgeSize + offset),offsetY+j*edgeSize);
          memory.push(particle);
        }
    }
  }
  console.log(memory.length);
}

function launchSound(){
  console.log("sound should start to play");
  countdown.play();
  soundIsPlaying = true;

}


function draw(){
  var datas = updateTime();
  sentence = datas[0];

  if(!soundIsPlaying && datas[1]== minuteForAlert && datas[2]== secondForAlert){
      launchSound();
      countdown.play();



    shouldExplode =true;
  }

  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for(var k=0;k<sentence.length;k++){

  //  var offset = k * 12* edgeSize;
    for(var j=0;j<14;j+=1){
        for(var i=0;i<12;i+=1){
            var myletterBlocks = decoder.getBlocks(sentence[k]);
            if(myletterBlocks[j][i]==1){
              if(datas[1]==minuteForExplosion && shouldExplode){
                memory[0].update();
              explosion.play();



            }
                   memory[0].draw();
                 }

            var shift = memory.shift();
            memory.push(shift);


            // ctx.closePath();

        }
    }
  }

   if(datas[1]==minuteForExplosion){
     shouldExplode = false;
      soundIsPlaying = true;
    }

  requestAnimationFrame(draw);
}

function updateTime(){

  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

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
  var sentence = hours +":"+minutes+":"+seconds;//+":"+mseconds;
   return[sentence,minutes,seconds];
  //return sentence;
}


setup();
