var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");

var angle = 0;
var center = {"x":window.innerWidth/2,"y":window.innerHeight/2}
var radius = 10;

var allPoints = [];
var curvex = 0;
var curvey = center.y;
var mouseX=0;
var mouseY = 0;
var automaticAngle = 0;


function setup(){
    document.addEventListener("touchmove",changeTouchValues);
    draw();
}

function changeTouchValues(e){
    mouseX = e.touches[0].pageX;
    mouseY = e.touches[0].pageY;
}

function draw(){
    ctx.fillStyle = "rgba(0,0,0,0.05)";
	ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
   // console.log("draw");
//    ctx.beginPath();
//    ctx.fillStyle = "lightblue";
//    ctx.arc(center.x,center.y,5,0,Math.PI*2,false);
//    ctx.fill();
//    //
////    angle= 60;
////    radius = 10;
//    //for(var i=0;i<360;i++){
//    ctx.beginPath();
//    ctx.fillStyle = "red";
//        
//    var x =center.x + Math.cos(angle  * Math.PI/180)*radius;
//    var y =center.y + Math.sin(angle  * Math.PI/180)*radius;
//        angle+=0.5;
//        radius+=0.1;
//    ctx.arc(x,y,5,0,Math.PI*2,false);
//    ctx.fill();
//   // }
//    
//    
//    //draw the sin curve
//    curvex+=0.1;
//    curvey = center.y + Math.sin(angle  * Math.PI/180)*radius;
//    allPoints.push({"x":curvex,"y":curvey});
//    ctx.beginPath();
//    ctx.strokeStyle = "red";
//    
//    ctx.moveTo(allPoints[0].x,allPoints[0].y);
//    for(var i = 1;i<allPoints.length;i++){
//        ctx.lineTo(allPoints[i].x,allPoints[i].y);
//    }
//    ctx.stroke();
    
    mouseX = window.innerWidth/2 + window.innerWidth/2 * Math.cos(automaticAngle * Math.PI/180);
    mouseY = 50;
    automaticAngle+=0.05;
    
    angle = 0;
    radius = 10;
    for(var i=0;i<700;i++){
    
        var x =center.x + Math.cos(angle  * Math.PI/180)*radius;
        var y =center.y + Math.sin(angle  * Math.PI/180)*radius;
        
        ctx.fillStyle = "rgba("+(i/2)+","+(i/2)+",203,.3)";
        ctx.strokeStyle = "lightblue";
        ctx.beginPath();
        ctx.arc(x,y,i/20,0,Math.PI*2,false);
        ctx.fill();
        //ctx.stroke();
        ctx.closePath();
        
        angle+=mouseX/mouseY;
        radius+=1;
    }
    
    requestAnimationFrame(draw);
}

setup();