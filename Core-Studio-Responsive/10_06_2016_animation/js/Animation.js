var Animation = function(ctx,x,y,json,texture){
  this.x        = x;
  this.y        = y;
  this.ctx      = ctx;
  this.json     = json;
  this.texture  = texture;
  this.frameSpeed = 0;
  this.frame    = 0;
}

Animation.prototype = {

  update:function(){
    if(this.frame>= this.json.frames.length-1){
        this.frame = 0;
        this.frameSpeed = 0;
    }else{
        this.frameSpeed += 0.2;
        this.frame = Math.round(this.frameSpeed);
    }
    
  },

  draw:function(){
    var frameX = this.json.frames[this.frame].frame.x;
    var frameY = this.json.frames[this.frame].frame.y;
    var frameW = this.json.frames[this.frame].frame.w;
    var frameH = this.json.frames[this.frame].frame.h;

    this.ctx.drawImage(this.texture,frameX,frameY,frameW,frameH,this.x,this.y, frameW,frameH);
  }

}
