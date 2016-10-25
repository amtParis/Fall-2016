var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");

var angle = 0;
var allFireflies = [];

function setup(){
    
    //create the fireflies
    for(var i = 0;i<90;i++){
        var fly = new Fireflies(ctx,Math.random()*window.innerWidth,Math.random()*window.innerHeight);
        allFireflies.push(fly);
    }

    draw();
}

function draw(){
    ctx.fillStyle = "rgb(0,0,40)";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    
     for(var i = 0;i<allFireflies.length;i++){
         allFireflies[i].update(angle+(i*10));
         allFireflies[i].move();
         allFireflies[i].draw();
     }
    
    angle++;
	
    requestAnimationFrame(draw);
}

setup()