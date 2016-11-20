var Triangle = function(ctx,dict,ids){
  this.ctx = ctx;
  this.dict = dict;
  this.ids = ids;
  //this.points = [dict[ids[0]],dict[ids[1]],dict[ids[2]]];
  this.ctx.strokeStyle = "black";
  this.ctx.fillStyle = "white";
}

Triangle.prototype = {

  update:function(){
      this.points = [this.dict[this.ids[0]],this.dict[this.ids[1]],this.dict[this.ids[2]]];
  },

  draw:function(){
    //draw a closed triangle
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x,this.points[0].y);
    this.ctx.lineTo(this.points[1].x,this.points[1].y);
    this.ctx.lineTo(this.points[2].x,this.points[2].y);
    this.ctx.lineTo(this.points[0].x,this.points[0].y);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  },

  checkTouch:function(point){
    var A = [this.points[0].x,this.points[0].y];
    var B = [this.points[1].x,this.points[1].y];
    var C = [this.points[2].x,this.points[2].y];
    // change the color if TOUCHED
    // or trigger some sound ....
    if(this.pointInTriange(point,A,B,C) && !this.checkTransformation()){
      this.ctx.fillStyle = "red";
    }else{
      this.ctx.fillStyle = "white";
    }
  },

  checkTransformation:function(){
    if(this.points[0].isDragging ||this.points[1].isDragging || this.points[2].isDragging){
      return true;
    }
    return false;
  },

  // retrieve the id of each 2 connected points.
  getOppositePoints:function(id){
    if(id == this.ids[0]) return (this.dict[this.ids[1]].ID<this.dict[this.ids[2]].ID)?[this.dict[this.ids[1]].ID, this.dict[this.ids[2]].ID]:[this.dict[this.ids[2]].ID, this.dict[this.ids[1]].ID];
    if(id == this.ids[1]) return (this.dict[this.ids[0]].ID<this.dict[this.ids[2]].ID)?[this.dict[this.ids[0]].ID, this.dict[this.ids[2]].ID]:[this.dict[this.ids[2]].ID, this.dict[this.ids[0]].ID];
    if(id == this.ids[2]) return (this.dict[this.ids[0]].ID<this.dict[this.ids[1]].ID)?[this.dict[this.ids[0]].ID, this.dict[this.ids[1]].ID]:[this.dict[this.ids[1]].ID, this.dict[this.ids[0]].ID];
  },

  // Returns true if point P inside the triangle with vertices at A, B and C
  // representing 2D vectors and points as [x,y]. Based on
  // http://www.blackpawn.com/texts/pointinpoly/default.html
  pointInTriange:function (P, A, B, C) {
    // Compute vectors
    function vec(from, to) {  return [to[0] - from[0], to[1] - from[1]];  }
    var v0 = vec(A, C);
    var v1 = vec(A, B);
    var v2 = vec(A, P);
    // Compute dot products
    function dot(u, v) {  return u[0] * v[0] + u[1] * v[1];  }
    var dot00 = dot(v0, v0);
    var dot01 = dot(v0, v1);
    var dot02 = dot(v0, v2);
    var dot11 = dot(v1, v1);
    var dot12 = dot(v1, v2);
    // Compute barycentric coordinates
    var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
  }


}
