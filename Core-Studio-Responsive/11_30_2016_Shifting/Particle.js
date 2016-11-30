var Particle = function(ctx,x,y) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.radius = 5;
}


Particle.prototype = {
    display:function(radius){
     this.ctx.beginPath();
     this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
     this.ctx.fillStyle = "red";
     this.ctx.fill();
     this.ctx.closePath();
    }
}
