//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "darken";

function draw(){
  var side = 75;
  var widthNbr = Math.ceil(window.innerWidth / side)*2 + 1;
  var heightNbr = Math.ceil(window.innerHeight / side)*2;

  var counter = 0;
  for(var j = 0;j<heightNbr;j++){
    var alpha = 1;
    for(var i = 0;i<widthNbr;i++){
      ctx.beginPath();
      //CHESS STRUCTURE
      if(counter % 2 != 0){
        ctx.fillStyle = 'rgba(43,162,104,'+alpha+')';
      }else{
        ctx.fillStyle = 'rgba(204,60,60,'+alpha+')';
      }
      var x = (side - side/3.4) * i + side/2;
      var y = (side- side/3.4) * j + side/2;
      ctx.arc(x,y,side/2 ,0,Math.PI*2);
      ctx.fill();
      ctx.closePath();
      counter++;
      alpha -= 0.03;
    }
  }
}//end of draw
draw();
