var Fireflies = function (ctx,x,y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.gradient;
    this.orientation = [-1,1];
    this.speedX = 0.09*this.orientation[Math.floor(Math.random()*this.orientation.length)];
    this.speedY = 0.09*this.orientation[Math.floor(Math.random()*this.orientation.length)];
    this.originalRadius = 12;
    this.angleSpeed = Math.random()*3;
    
    //small particle around
    this.particles = [];
    var nbr =Math.floor(Math.random()*6);
    for(var i = 0;i<nbr;i++){
        this.particles.push({"x":this.x,"y":this.y,"radius":Math.random()*50,"speed":Math.random()*5});
    }
    this.particleAngleh = 0;
    this.particleAngleV = 0;
   }

Fireflies.prototype = {
    
    update:function(angle){
        var a = Math.cos((angle*this.angleSpeed)*Math.PI/180);
        
        this.radius =this.originalRadius + a*Math.random()*5;
        
        this.alpha = (a<=0)?0:(a<=0.1)?0:a;
        
        this.gradient = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius/2);
        this.gradient.addColorStop(0,"rgba(255,255,255,"+this.alpha+");");
        this.gradient.addColorStop(1,"rgba(255,255,255,0);");
        this.ctx.fillStyle = this.gradient;
        
        this.particleAngleh+=1.7;
        this.particleAngleV++;
        for(var i = 0;i<this.particles.length;i++){
            this.particles[i].x = this.x + this.particles[i].radius * Math.sin(this.particleAngleh* this.particles[i].speed * Math.PI/180);
            this.particles[i].y = this.y + this.particles[i].radius * Math.sin(this.particleAngleV* this.particles[i].speed * Math.PI/180);
        }
    },
    
	draw:function(){
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        this.ctx.fill();
        this.ctx.closePath();
        //particles
        for(var i = 0;i<this.particles.length;i++){
            this.ctx.beginPath();
            this.ctx.fillStyle ="rgba(255,255,255,"+(this.alpha+0.1)+")";
            this.ctx.fillRect(this.particles[i].x,this.particles[i].y,1,1);
            this.ctx.closePath();
        }
    },
    
    move:function(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x<-this.radius){this.x = window.innerWidth+this.radius}
        if(this.y<-this.radius){this.y = window.innerHeight+this.radius}
        if(this.x>window.innerWidth+this.radius){this.x = -this.radius}
        if(this.y>window.innerHeight+this.radius){this.y = -this.radius}
    }
}