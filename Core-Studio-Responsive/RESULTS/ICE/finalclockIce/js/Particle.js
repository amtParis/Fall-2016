var Particle = function(ctx,x,y){
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.allParticles = [];
  this.explode = false;
  this.color = 'blue';
  this.previousValue = null;
  this.gravity = 0.7;

  this.initParticles();
}

Particle.prototype = {

  initParticles:function(){
    for(var i = 0;i<10;i++){
      var shape = new Shape(this.ctx,this.x,this.y);
      this.allParticles.push(shape);
    }
  },

  launchParticles:function(){
      for(var i = 0;i<this.allParticles.length;i++){
        this.allParticles[i].isMoving = true;
      }
  },
  update:function(){
    //if(value != ":" && value != this.previousValue){
      this.launchParticles();
      //this.previousValue = value;
  //  }
  },

  draw:function(){

      for(var i = 0;i<this.allParticles.length;i++){
        this.ctx.beginPath();
        if(this.allParticles[i].isMoving){
          this.allParticles[i].speedY+=this.gravity;
          this.allParticles[i].x+=this.allParticles[i].speedX;
          this.allParticles[i].y+=this.allParticles[i].speedY;
        }
        this.allParticles[i].drawSuperCoolImage();
        this.ctx.fill();
        this.ctx.closePath();
        if(this.allParticles[i].y>window.innerHeight){
          this.allParticles[i].x = this.x;
          this.allParticles[i].y = this.y;
          this.allParticles[i].resetSpeed();
        }
      }
  }

}
