var Animation = function(ctx,x,y,allTextures){
  this.context = ctx;
  this.x = x;
  this.y = y;
  this.speedX = 1-Math.random()*2;
  this.speedY = 1-Math.random()*2;
  this.radius = 15;
  this.disappear = false;
  this.allTextures = allTextures;
  this.image;
}

Animation.prototype = {
    
    getTheRightColor:function(number){
        var index = number - 1;
        this.image = this.allTextures[index];
    },

  update:function(){

  },

  draw:function(){
      this.context.drawImage(this.image,this.x-this.image.width/2, this.y-this.image.height/2);
  },

  move:function(){
      this.x+=this.speedX;
      this.y+=this.speedY;
      
      if(this.x<-this.image.width/2){
          this.x = window.innerWidth+this.image.width/2;
      }
      if(this.x>window.innerWidth + this.image.width/2){
          this.x = -this.image.width/2;
      }
      
      if(this.y<-this.image.height/2){
          this.y = window.innerHeight+this.image.height/2;
      }
      if(this.y>window.innerHeight+this.image.height/2){
          this.y = -this.image.height/2;
      }
  },

  getDistance:function(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
  },

//this is for checking if the particle is hitting the obstacle or not
  checkDistance:function(fingers){
    for(var i=0;i<fingers.length;i++){
      var distance = this.getDistance(this.x,this.y,fingers[i].pageX,fingers[i].pageY);
      if (distance <= this.radius){
        this.disappear = true;
      }
    }
  }


}
