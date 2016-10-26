var Insect = function(ctx,x,y) {
    this.x = x;
    this.y = y;
    //this.ctx = ctx;
    this.context = ctx; // if you are using this.context instead of this.ctx make sure you use it everywhere down below
    this.i = 0;
    this.frameSpeed = 0;
    this.stop = false;
    this.speedX = 1-Math.random() * 2;
    this.speedY = 1-Math.random() * 2;
    this.cropH;
    this.radius = 10;
    this.dead = false;
    this.color = "blue";
    
    this.target = null; // target will be the food position to reach. it is set to null in the begining
    this.sensitivDistance = 100; // the distance to the food that will be checked to change the insect's orientation
    
    this.velocity = 0.1;
}


Insect.prototype = {    
    move: function() {
        if(!this.stop) {
            
            //if a target is set, the insect should change it's direction a go straight to it
            if(this.target!=null){
            	
                var diffX = this.target.x-this.x;
                var diffY = this.target.y-this.y;
                this.x += diffX * this.velocity;
                this.y += diffY * this.velocity;
                
            }else{
            	//otherwise it keeps its original orientation
            
                this.y += this.speedY;
                this.x += this.speedX;
                
            }
            
            //if you want to make them move on the x axis you need to modify the this.x position accordingly
           // if(this.y < -this.cropH) { // this.cropH doesn't exist without the animation part. you replace it with the radius
            
            // this is checking if you re out of the screen at the top / right
            // if you want to make them move in every directions, you need to check the bottom / right too
            if(this.y<-this.radius){
           	 	this.y = window.innerHeight+this.radius;
                
            }
            if(this.x<-this.radius){
                this.x = window.innerWidth+this.radius;
            }
            
            //bottom check
            if(this.y>window.innerHeight+this.radius){
                this.y = -this.radius;
            }
            //right
            if(this.x>window.innerWidth + this.radius){
                this.x = -this.radius;
            }
            
           
            

        }
    },

    display:function(){
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        this.context.fill();
        this.context.closePath();
    },

    //DISTANCE FUNCTION
    getDistance: function(x1,y1,x2,y2) {
        return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
    },
    
    //
    checkDistanceWithFood:function(allFoodOnStage){
        for(var i = 0;i<allFoodOnStage.length;i++){
            if(allFoodOnStage[i].isEaten){
                this.target = null;
            }else{
                var distance = this.getDistance(this.x,this.y,allFoodOnStage[i].x,allFoodOnStage[i].y);
                if(distance<=this.sensitivDistance){
                    this.target = {"x":allFoodOnStage[i].x,"y":allFoodOnStage[i].y,"ID":allFoodOnStage[i].ID};
                    return;
                }
            }
        }
    },
    
	changeColor:function(color){
        this.color = color;
    }

//    checkTouch:function(fingers) {
//        for(var i = 0; i < fingers.length; i++) {
//            var distance = this.getDistance(this.x, this.y, fingers[i].pageX, fingers[i].pageY);
//            if (distance <= this.radius) {
//                this.stop = true;
//                this.dead = true;
//            }
//        }
//    }
}
