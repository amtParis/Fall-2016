
var Shape = function(ctx,x,y){
  this.context = ctx;
  this.x = x;
  this.y = y;
  this.speedX = Math.random()*20-10;
  this.speedY = -Math.random()*15 - 1;
  this.sideX = 25;
  this.sideY = 25;
  this.radius = 2;
  this.isMoving = false;
  this.color = 'red';
  this.ready = false;
  //console.log(document.getElementById("tree"));
  this.image = document.getElementById("tree");
  this.sx = Math.floor(Math.random()*5)*63;
  this.sy = Math.floor(Math.random()*5)*63;

}

Shape.prototype = {

  resetSpeed:function(){
    this.speedX = Math.random()*20-10;
    this.speedY = -Math.random()*15 - 1;
    this.isMoving = false;
    this.radius = 2;
    this.color = 'red';
  },

  drawCircle:function(){
    this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
  },

  drawTriangle: function(){
    this.context.moveTo(this.x,this.y);
    this.context.lineTo(this.x+this.sideX,this.y);
    this.context.lineTo(this.x+this.sideX/2,this.y-this.sideY);
    this.context.lineTo(this.x,this.y);
  },

  drawTree:function(){
    //if(this.ready){
      this.context.drawImage(this.image,this.sx,this.sy,63,63,this.x,this.y,63,63);
  //  }
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
