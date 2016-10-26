var Shape = function(ctx,x,y){
  this.context = ctx;
  this.x = x;
  this.y = y;
  this.radius = 2;
  this.color = 'rgba('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+',1)';
}

Shape.prototype = {
  drawObstacle:function(){
  this.context.lineWidth = .5;
  this.context.fillStyle = 'rgba(40, 40, 40,1)';
  this.context.beginPath();
  this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
  this.context.fill();
  this.context.closePath();

  //outline
  this.context.beginPath();
  this.context.strokeStyle = this.color;
  this.context.arc(this.x,this.y,this.radius+5,0,2*Math.PI,false);
  this.context.stroke();
  this.context.closePath();
  }
}
