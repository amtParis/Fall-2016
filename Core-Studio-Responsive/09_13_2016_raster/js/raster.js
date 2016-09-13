//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var image = document.getElementById("andy");

function setup(){
  setTimeout(draw,1000);
}

function draw(){
  ctx.drawImage(image,0,0);
  var data = ctx.getImageData(0,0,image.width,image.height).data;
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

  for(var j = 0;j<image.height;j+=6){
    for(var i = 0;i<image.width;i+=6){
      var index = 4 * (j*image.width + i);
      var r = data[index];
      var g = data[index+1];
      var b = data[index+2];
      var a = data[index+3];
      var grey = Math.round(r*0.3 + g*0.59 + b*0.11);
      if(grey>50){
        var radius = Math.round((grey/255)*12) + Math.random();
        ctx.fillStyle = "rgba("+r+","+g+","+b+",0.5)";
        //ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.beginPath();
        //ctx.rect(i,j,2,2);
        ctx.arc(i*2,j*2,radius,0,Math.PI*2,false);
        ctx.fill();
        ctx.closePath();
      }

    }
  }
  requestAnimationFrame(draw);
}


setup();
