var Trail = function(ctx, texture, json, sounds){
  this.ctx = ctx;
  this.texture = texture;
  this.json = json;
  this.sounds = sounds;
  //this.sounds[0][0] --> first sound for 1 finger
  //this.sounds[0][1] --> second sound for 1 finger
  //this.sounds[0][2] --> third sound for 1 finger
  //this.sounds[0][1] --> first sound for 2 fingers
  // ...
  this.path = [];
  this.isDrawing = false;
  this.color = "red";
}

Trail.prototype = {

  playSound:function(){
    //depending on how many fingers were down, I play a specific sound
    var fingers = this.path[0][2];
    this.sounds[fingers-1][0].play(); // here I play the first sound for 1 finger.
  },

  display:function(){
      //console.log("draw");
    if(this.path.length>0){
        this.randomCoordinate = Math.floor(Math.random()*this.json.frames.length);
        var frameX = this.json.frames[this.randomCoordinate].frame.x;
        var frameY = this.json.frames[this.randomCoordinate].frame.y;
        var frameW = this.json.frames[this.randomCoordinate].frame.w;
        var frameH = this.json.frames[this.randomCoordinate].frame.h;

      this.ctx.beginPath();
      this.ctx.fillStyle = "red";
      //this.ctx.arc(this.path[0][0],this.path[0][1],5,0,Math.PI*2,false);
      this.ctx.drawImage(this.texture,frameX,frameY,frameW,frameH,this.path[0][0]-frameW/2,this.path[0][1]-frameH/2, frameW,frameH);
      this.ctx.fill();
      this.ctx.closePath();
      this.path.shift();
    }
  }

}
