var Sandclock = function(ctx,max,x,y){
  this.x = x;
  this.y = y;
  // ARRAY FOR ALL SHAPES NEEDED FOR EACH MODULE
  this.allShapes = [];
  // GRID SIZE (SPACE BETWEEN EACH SHAPE)
  this.gridSize = 20;
  this.ctx = ctx;
  this.gravity = 0.7;
  // MAXIMUM ELEMENT FOR A LINE
  // BY DEFAUT 10 FOR READABILITY BUT IT CAN BE SET TO ANY NUMBER
  this.maxPerLine = 10;
  // WE START BY CREATING ALL SHAPES FOR THE MODULE
  // WE WANT TO BUILD THE GRID AS IT WILL BE IN ITS FINAL STATE
  // THE MAX PARAMETER IS THE AMOUNT OF SHAPE TO BE DRAW FOR THIS MODULE
  // WE RECEIVE THE MAX PARAMETER WHEN WE INITIATE THE SANDCLOCK OBJECT (LINE 18 IN FONT_TOTAL.JS)
  this.initAllShapes(max);
}

Sandclock.prototype = {

  update:function(val){

      // THIS FUNCTION CALCULATE THE POSITION OF EACH INDIVIDUAL SHAPE WITHIN THE MODULE
      // WE LOOP THROUGH ALL SHAPES STORED IN THE GLOBAL MEMORY
      for(var i = 0;i<this.allShapes.length;i++){
        // IF THE INDEX IS SMALLER THAN THE REFERENCE VAL, WE WANT TO MAKE IT FALLING DOWN
        // BUT WE DON'T WANT TO MAKE IT FALL IF THE VALUE IS 0 (AT THE TIME 0, WE WANT ALL SHAPE TO GO BACK OUT OF THE SCREEN TO START AGAIN)
        if(i<val && val!=0){
          // WE CHECK THAT THE SHAPE POSITION DIDN'T REACH THE FINAL POSITION
          if(this.allShapes[i].y!=this.allShapes[i].goalY){
            //WE APPLY GRAVITY AND MOVE THE SHAPE POSITION
            this.allShapes[i].speedY+=this.gravity;
            this.allShapes[i].y +=this.allShapes[i].speedY;
          }
          //IF THE INDEX IS BIGGER THAT THE GIVEN NUMBER, WE HIDE THE SHAPE OUT OF THE SCREEN
        }else if(val!=0){
          this.allShapes[i].y = -this.allShapes[i].radius*4;
        }else{
          // IF THE GIVEN NUMBER IS 0, SO WE INVERSE GRAVITY AND MAKE THEM ALL MOVE UP.
          this.allShapes[i].speedY=this.allShapes[i].antigravity;
          this.allShapes[i].y +=this.allShapes[i].speedY;
        }
        // IF THE SHAPE POSITION, AFTER MOVING IS BIGGER OR EQUAL TO THE GOAL (THE FINAL POSITION)
        // WE STOP THERE AND RESET THE SPEED.
        if(this.allShapes[i].y>=this.allShapes[i].goalY){
          this.allShapes[i].y = this.allShapes[i].goalY;
          this.allShapes[i].speedY = -1;
        }
      }
  },

  draw:function(){
    // WE LOOP THROUGH ALL SHAPES AND DRAW A SHAPE ON THE CANVAS.
    for(var i = 0;i<this.allShapes.length;i++){
      this.allShapes[i].drawSpecialCircle();
    }
    // THAT FUNCTION DRAWS THE OUTLINE AROUND THE SMALL CIRCLE.
    this.drawBorder();
  },

  initAllShapes:function(max){
    // HERE WE BUILD A GRID STARTING AT THE BOTTOM LEFT CORNER GOING TO THE RIGHT AND TO THE TOP
    // WE ORDER IT LIKE THIS BECAUSE WE WANT THE FIRST ELEMENT BE PLACED UNDER THE OTHER
    var val = 0;
    // WE ARE LOOPING TILL THE MAXIMUM LIMIT
    for(var i = 0 ; i<max; i++){
      // THIS LINE IS USED TO CHECK IF WE ARE REACHING THE END OF A LINE
      // WE INCREMENT THE PARAM VAL, SO WE KNOW ON WHICH LINE WE ARE FOR EACH SHAPE.
      // KNOWING WHICH LINE, WE CAN CALCULATE THE X AND Y POSITION.
      if(i%this.maxPerLine == 0 && i!=0){
        val++;
      }
      // WE CALCULATE THE X AND Y POSITION BASE ON:
      // THIS.X (THAT REPRESENTS THE MODULE X POSITION)
      // THIS.Y (THAT REPRESENTS THE MODULE Y POSITION)
      // EACH SHAPE HAS TO BE POSITIONED RELATIVELY TO THESE COORDINATES
      // WE CALCULATE EACH SHAPE OFFSET BASED ON WHICH LINE THEY ARE, AND PROPORTIONNALY TO THE GRIDSIZE
      var posx = this.x + (i*this.gridSize - val*this.maxPerLine*this.gridSize);
      var posy = this.y - val*this.gridSize;
      // CREATE THE SHAPE AT A PRECISE LOCATION
      var shape = new Shape(this.ctx,posx, posy);
      // SET A SPECIFIC RADIUS
      shape.radius = 3;
      // STORE THE SHAPE IN THE GLOBAL MEMORY
      this.allShapes.push(shape);
    }
  },

  drawBorder:function(){
    //WE ARE USING SHAPE, BUT WE ARE CALLING A NEW FUNCTION THAT WILL DRAW ONLY THE OUTLINED STRUCTURE
    var shape = new Shape(this.ctx, this.x, this.y);
    // THE PARAMETERS FOR THAT ARE:
    // THE MAX SIZE OF THE MODULE BASED ON THE GRID SIZE AND THE MAX ELEMENTS BY LINE
    // AND THE SECOND PARAMETER IS THE GRID SIZE
    shape.drawBorder(this.maxPerLine * this.gridSize,this.gridSize);
  }

}
