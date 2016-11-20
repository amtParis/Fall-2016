var Point = function(x,y,id){
  this.originX = x;
  this.originY = y;
  this.x = x;
  this.y = y;
  this.ID = id;
  this.angle = Math.random()*360;
  this.radius = Math.random()*10+1;
  this.speedRadius = Math.random()*2;
  this.speedX = 2-Math.random()*4;
  this.speedY = 2-Math.random()*4;
  this.isDragging = false;
  this.fingerID;
}

Point.prototype = {
  move:function(){
    //rotation motion
    this.x = this.originX + Math.cos(this.angle*Math.PI/180) * this.radius;
    this.y = this.originY + Math.sin(this.angle*Math.PI/180) * this.radius;
    this.angle+=this.speedRadius;
    //----------
    //linear motion
    // this.x += this.speedX;
    // this.y += this.speedY;
    // if(this.x<0 || this.x>window.innerWidth){ this.speedX*=-1;}
    // if(this.y<0 || this.y>window.innerHeight){ this.speedY*=-1;}
  },

  checkMotion:function(fingers){
    if(this.isDragging){
      for(var i = 0;i<fingers.length;i++){
        if(fingers[i][2] == this.fingerID){
          this.x = fingers[i][0];
          this.y = fingers[i][1];
        }
      }
    }
  },

  checkDown:function(fingers){
      for(var i = 0;i<fingers.length;i++){
        var distance = this.getDistance(fingers[i][0],fingers[i][1]);
        if(distance<20){
          this.isDragging = true;
          this.fingerID = fingers[i][2];
        }
      }
  },

  checkUp:function(fingers){
      for(var i = 0;i<fingers.length;i++){
        if(fingers[i][2] == this.fingerID){
          this.isDragging = false;
        }
      }
  },

  getDistance:function(x,y){
    return Math.sqrt(Math.pow(this.x-x,2) + Math.pow(this.y-y,2));
  }
}
