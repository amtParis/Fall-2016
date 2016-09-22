
var Shape = function(ctx){
  this.context = ctx;
}

Shape.prototype = {

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
