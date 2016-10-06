var Particle = function(ctx,x,y){
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.allParticles = [];
  //this.explode = false;
  this.color = 'red';
  this.previousValue = null;
  this.gravity = 0.7;

  this.initParticles();
}

Particle.prototype = {

  initParticles:function(){
    for(var i = 0;i<5;i++){
      var shape = new Shape(this.ctx,this.x,this.y);
      this.allParticles.push(shape);
    }
  },

  launchParticles:function(){
      for(var i = 0;i<this.allParticles.length;i++){
        this.allParticles[i].isMoving = true;
      }
  },
  update:function(value){
    if(value != ":" && value != this.previousValue){
      this.launchParticles();
      this.previousValue = value;
    }
  },

  draw:function(){
      //this.ctx.fillStyle = this.color;
      for(var i = 0;i<this.allParticles.length;i++){
        this.ctx.beginPath();
        if(this.allParticles[i].isMoving){
          this.allParticles[i].color = (i%3==0)?'white':'red';
          this.allParticles[i].speedY+=this.gravity;
          this.allParticles[i].x+=this.allParticles[i].speedX;
          this.allParticles[i].y+=this.allParticles[i].speedY;
        }
        this.allParticles[i].drawCircle();
        //this.allParticles[i].drawTriangle();
        //this.allParticles[i].drawTree();
        this.ctx.fillStyle = this.allParticles[i].color;
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
