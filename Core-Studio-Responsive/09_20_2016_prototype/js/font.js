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
  // XSquareNbr = 5;
  // YSquareNbr = 7;
  edgeSize = 20;
  sentence = "abba";
  offsetX = window.innerWidth/2 - (5*6*edgeSize)/2;
  offsetY = window.innerHeight/2 - (7*edgeSize)/2;
  shape = new Shape(ctx);
  decoder = new Decoder();
  //setInterval(draw,500);
  draw();
}

function draw(){
  ctx.fillStyle = 'black';
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  for(var k=0;k<sentence.length;k++){
  //  var binary = numbers[myNumber[k]];
    var offset = k * 6* edgeSize;
    for(var j=0;j<7;j+=1){
        //var activeLine = binary[j];
        for(var i=0;i<5;i+=1){
          //var edgeSize = side + Math.random()
          //var activeCell = activeLine[i];
        //  if(activeCell == 1){
            var myletterBlocks = decoder.getBlocks(sentence[k]);
            if(myletterBlocks[j][i]==0){
                ctx.fillStyle = 'rgba(0,0,0,0)';
                ctx.strokeStyle = 'rgba(0,0,0,0)';
            }else{
                ctx.fillStyle = 'rgba(255,0,0,1)';
                ctx.strokeStyle = 'rgba(255,0,255,1)';
            }
            ctx.beginPath();
          //  var rnd = Math.round(Math.random());
            //if(rnd ==0){

                //ctx.arc(offsetX+i*edgeSize + k*(edgeSize*5+ edgeSize) + edgeSize/2,offsetY+j*edgeSize + edgeSize/2,edgeSize/2,0,Math.PI*2,false);
                shape.drawLines(Math.round(offsetX+i*edgeSize + offset),offsetY+j*edgeSize,edgeSize,edgeSize);

            // }else{
            //   ctx.rect(offsetX+i*edgeSize + k*(edgeSize*activeLine.length + edgeSize),offsetY+j*edgeSize,edgeSize,edgeSize);
            //   ctx.fillStyle = 'white';
            // }*
            //ctx.fillStyle = "rgba("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.random()+")";//'#'+Math.floor(Math.random()*0xffffff).toString(16);
            //ctx.fill();
            ctx.stroke();
            ctx.closePath();
        //  }
        }
    }
  }

  //requestAnimationFrame(draw);
}

setup();
