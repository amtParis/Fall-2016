
var Shape = function(ctx,x,y){
  this.context = ctx;
  this.x = x;
  this.y = y;
  this.speedX = Math.random()*20-10;
  this.speedY = -Math.random()*15 - 1;
  this.radius = 2;
  this.isMoving = false;
}

Shape.prototype = {

  resetSpeed:function(){
    this.speedX = Math.random()*20-10;
    this.speedY = -Math.random()*15 - 1;
    this.isMoving = false;
    this.radius = 2;
  },

  drawSuperCoolImage: function(){
    this.context.drawImage(image, this.x, this.y);
 
 },

  drawCircle:function(){
    this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
  },

  drawTriangle: function(x,y,sideX,sideY){
    this.context.moveTo(x,y);
    this.context.lineTo(x+sideX,y);
    this.context.lineTo(x+sideX/2,y-sideY);
    this.context.lineTo(x,y);
  },

  drawCrazyTriangle: function(x,y,sideX,sideY,number){
    if(number != ":"){
      number = parseInt(number);
    }else{
      number = 2;
    }
    x+= Math.random()*number;
    y+= Math.random()*number;
    this.context.moveTo(x,y);
    this.context.lineTo(x+sideX,y);
    this.context.lineTo(x+sideX/2,y-sideY);
    this.context.lineTo(x,y);
  },

  drawRect:function(x,y,sideX,sideY){
    this.context.moveTo(x,y);
    this.context.lineTo(x,y+sideY);
    this.context.lineTo(x+sideX,y+sideY);
    this.context.lineTo(x+sideX,y);
    this.context.lineTo(x,y);
  },

  drawLines:function(x,y,sideX,sideY){
    this.context.moveTo(x,y);
    this.context.lineTo(x,y+sideY);
    this.context.moveTo(x+sideX,y+sideY);
    this.context.lineTo(x+sideX,y);
  }


}
