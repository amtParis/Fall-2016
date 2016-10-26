var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var allParticles = [];
var allParticlesOnStage = [];
//var particles = 300;
var assets = ["Bella/data/Particle.png","Bella/data/Particle2.png","Bella/data/Particle3.png","Bella/data/Particle4.png"];
var allTextures = [];
var green = assets[0]
var blue = assets[1]
var purple = assets[2]
var pink = assets[3]
var x;
var y;

var polygon = new Polygon([]); // CALCULATION SYTEM TO GET THE CENTER OF MANY POINTS (AS FINGER). These are special scripts


//function needed to load the pictures....
function loadAssets(){
    var texture = new Image();
    texture.src = assets[0];
    texture.onload = function(){
        allTextures.push(texture);
        assets.shift();
        if(assets.length>0){
            loadAssets();
        }else{
            setup(); // as soon as all pictures are loaded, we launch the setup
        }
    }
}

function setup(){
    
    // your particles are base on the Animation prototype
    // the Animation prototype has been updated to receive the textures
    // we set all texture for each Animation, because we want to switch the texture depending on the finger's number
    for(var i=0;i<300;i++){
      var myParticle = new Animation(ctx,0,0,allTextures);
        allParticles.push(myParticle);
    }

    window.addEventListener("touchstart",ontouchstart);

  draw();
}

function draw(){
    // ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  ctx.fillStyle = "#e4ebf5";
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    
    //draw only allParticlesOnStage (not the full memory)
    for(var i = 0;i<allParticlesOnStage.length;i++){
   // allParticlesOnStage[i].update(); // do I need update for a non animated moving obj? ---> not really. you can get rid of that
    allParticlesOnStage[i].move(); // they're moving either randomly or based on where the screen is tilting - have to decided  --> for now its random
    allParticlesOnStage[i].draw(); // they need to be drawn based on ontouchstart... does this need to be a function? ---> absolutely
    //allParticlesOnStage[i].pop(); does this need to be a function aswell for when they hit the obstacles and disappear? ---> absolutely
    //allParticlesOnStage[i].checkDistance(); needs to be constantly checked? ---> yes but you have to give an array of obstacles
  }

  requestAnimationFrame(draw);
}

//to add the particles based on number of fingers
function ontouchstart(e){
  	var touches = e.touches;
    //    for(var i=0;i<allParticles.length;i++){
    //      } if (touches.length+=1) {
    //          allParticles[i].draw(green);
    //      } if (touches.length+=2) {
    //          allParticles[i].draw(blue);
    //      } if (touches.length+=3){
    //          allParticles[i].draw(purple);
    //      } if (touches.length+=4){
    //          allParticles[i].draw(pink);
    //      }
    
    
    if(allParticles.length>0){
        //get all fingers on the screen and store them in an array called points
        var points = [];
        for(var i = 0;i<touches.length;i++){
            points.push({"x":touches[i].pageX,"y":touches[i].pageY});
        }
        //we remove one particle from the global memory
   		var particle = allParticles.shift();
        //we switch the texture depending on how many fingers are touching the screen
        particle.getTheRightColor(touches.length);
        // calculate the center of all fingers on the screen with specific function (don't look at them ;-) )
        polygon.setNewPoints(points);
        var centroid = polygon.centroid();
        // set the coordinate for the particle
        particle.x = centroid.x;
        particle.y = centroid.y;
        // store the particle into the array that will store all particles visible on stage
        allParticlesOnStage.push(particle);
    }
}

function addObstacle(x,y){
//to make the obstacles appear randomly on the screen for each start up
}

function checkDistance(x,y){
//to check the distance between the particle and the obstacle
}


//setup();

loadAssets();
