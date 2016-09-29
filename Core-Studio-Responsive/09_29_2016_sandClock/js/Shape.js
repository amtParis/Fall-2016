
var Shape = function(ctx,x,y){
  this.context = ctx;
  this.x = this.goalX = x;
  this.y = this.goalY = y;
  this.speedX = Math.random()*20-10;
  // WE ADDED ANTIGRAVITY TO CREATE A PERSONALIZED SPEED TO GO UP
  this.antigravity = -(Math.random()*5+10);
  this.speedY = -1;
  this.radius = 2;
  //THIS IS THE RANDOM COLOR FOR EACH SHAPE.
  this.color = 'rgba('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+',1)';
}

Shape.prototype = {

  drawSpecialCircle:function(){
    this.context.lineWidth = 1;
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
    this.context.fill();
    this.context.closePath();

    //outline
    this.context.beginPath();
    this.context.strokeStyle = "white";
    this.context.arc(this.x,this.y,this.radius+4,0,2*Math.PI,false);
    this.context.stroke();
    this.context.closePath();

  },

  drawTriangle: function(){
    this.context.moveTo(this.x,this.y);
    this.context.lineTo(this.x+this.sideX,this.y);
    this.context.lineTo(this.x+this.sideX/2,this.y-this.sideY);
    this.context.lineTo(this.x,this.y);
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
  },

  drawBorder:function(width,gridSize){
      this.context.strokeStyle = "lightblue";
      this.context.lineWidth = 10;
      this.context.beginPath();
      this.context.lineTo(this.x-gridSize,this.y-width);
      this.context.lineTo(this.x-gridSize,this.y+gridSize);
      this.context.lineTo(this.x+width,this.y+gridSize);
      this.context.lineTo(this.x+width,this.y-width);
      this.context.stroke();
  }
}
