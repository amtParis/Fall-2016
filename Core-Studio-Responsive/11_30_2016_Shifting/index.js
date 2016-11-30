var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext('2d');
var w = window.innerWidth;
var h= window.innerHeight;

var m_Particle = [];
var d_Particle = [];

var nbrParticle = 200;



function setup(){
    
    //initiate the memory
    for(var i = 0;i<nbrParticle;i++){
        var p = new Particle(ctx,0,0);
        m_Particle.push(p);
    }

    //-----
    
    setTimeout(showParticle,3000);
    
    draw();
}

function showParticle(){
    console.log("new Particle showing");
    var posx = Math.random()*window.innerWidth;
    var posy = Math.random()*window.innerHeight;
    
    
    if(m_Particle.length>0){
        //shifting the memory
        var shifted = m_Particle.shift();
        shifted.x = posx;
        shifted.y = posy;
            
        
        //add the particle into the display array
        d_Particle.push(shifted);
    }else{
        var returning = d_Particle.shift();
        m_Particle.push(returning);
    }
    
    setTimeout(showParticle,10);
    
}


function draw(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    
    for(var i = 0;i<d_Particle.length;i++){
        d_Particle[i].display();
    }

    requestAnimationFrame(draw);
}

setup();
