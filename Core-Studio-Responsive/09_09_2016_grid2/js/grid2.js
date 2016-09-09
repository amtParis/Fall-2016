//DRAWING
var canvas  = document.getElementById("canvas");
var image_b = document.getElementById("brown");
var image_g = document.getElementById("grey");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.strokeStyle = 'blueviolet';
var side = 75;

function draw(){
  canvas.width = window.innerWidth;
  canvas.height= window.innerHeight;
  ctx.strokeStyle = 'blueviolet';
  //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

  var widthNbr = Math.ceil(window.innerWidth / side)+1;
  var heightNbr = Math.ceil(window.innerHeight / side);
  var counter = 0;
  for(var j = 0;j<heightNbr;j++){
    for(var i = 0;i<widthNbr;i++){
      ctx.beginPath();
      // RANDOM COLOR
      //var myRandomValue = Math.round(Math.random()*255);
      //ctx.fillStyle = "rgba("+myRandomValue+",0,255,1)";

      //CHESS STRUCTURE
      if(counter % 2 == 0){
        ctx.fillStyle = 'skyblue';
      }else{
        ctx.fillStyle = 'white';
      }
      var x = side * i;// + side/2;
      var y = side * j;// + side/2;

      //ctx.rect(x,y,side,side);
      ctx.arc(x,y,side/2 - Math.random()*10,0,Math.PI*2);
      // ctx.drawImage(image_b,x,y);
      // ctx.drawImage(image_g,x-side/2,y-side/2);

      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      counter++;
    }
  }

  requestAnimationFrame(draw);

}//end of draw

draw();

// function onResize(e){
//   draw();
// }

//window.addEventListener('resize',onResize);
