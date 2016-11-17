/*
 CLASS BALL
*/

var Ball = function(image,json,context,positionx,positiony,rayon){
    this.x = positionx;
    this.y = positiony;
    this.rayon = rayon;
    this.ctx = context;
    
    this.offsetX;
    this.offsetY;
    this.dragging = false;
    this.ID;
    
    //INERTIA
    this.oldX = 0;
    this.oldY = 0;
    this.newX = 0;
    this.newY = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.98;
    
    //COLOR
    this.color = Math.random()*0xffffff;
    
    //BLITTING
    this.image = image;
    this.json = json;
    this.counter = 0;
}

Ball.prototype = {
    
    display:function(){
// VISUAL DEBUG
//        this.ctx.fillStyle = this.color;
//        this.ctx.beginPath();
//        this.ctx.arc(this.x,this.y,this.rayon /*+ this.scale*/,0,Math.PI*2,true);
//        this.ctx.closePath();
//        this.ctx.fill();
        
        var px = this.json.frames[this.counter].frame.x;
        var py = this.json.frames[this.counter].frame.y;
        var w = this.json.frames[this.counter].frame.w;
        var h = this.json.frames[this.counter].frame.h;
        
        
        this.ctx.drawImage(this.image,px,py,w,h,this.x-w/2,this.y-h/2,w,h);
        
        
        if(this.counter>=this.json.frames.length-1){
            this.counter = 0
        }else{
            this.counter++;
        }
    },
    
    checkTouch:function(virtualMouses){
        for(var i=0;i<virtualMouses.length;i++){
            this.offsetX = this.x-virtualMouses[i].mouseX;
            this.offsetY = this.y-virtualMouses[i].mouseY;
            if(Math.sqrt(Math.pow(this.offsetX,2) + Math.pow(this.offsetY,2))< this.rayon){
                this.dragging = true;
                this.ID = virtualMouses[i].ID
                console.log("touched");
                break;
            }else{
                this.dragging = false;
            }
        }

    },
    
    verifyDrag:function(virtualMouses){
    
        if(this.dragging){
        
       	 	for(var i=0;i<virtualMouses.length;i++){
                if(this.dragging && virtualMouses[i].ID == this.ID){
                	this.x = virtualMouses[i].mouseX+this.offsetX;
               	 this.y = virtualMouses[i].mouseY+this.offsetY;
            	}
        	}
            
        }else{
            // MOVE
            this.x+= this.xspeed;
            this.y+= this.yspeed;
            
            //SLOW DOWN
            this.xspeed*= this.friction;
            this.yspeed*= this.friction;
            
            //BORDER CHECK
            //LEFT
            if(this.x<-this.rayon){this.x = window.innerWidth+this.rayon;}
            //RIGHT
            if(this.x>window.innerWidth+this.rayon){this.x = - this.rayon;}
            
            //TOP
            if(this.y<-this.rayon){this.y = window.innerHeight+this.rayon;}
            //BOTTOM
            if(this.y >window.innerHeight+this.rayon){this.y = - this.rayon;}
		   
        }
        
        
    },
    
    stopDragging:function(){
        this.dragging = false;
        this.ID = 0;
    },
    
    calculSpeedValue:function(posx,posy){
        this.newX = posx;
        this.newY = posy;
        
        this.xspeed = this.newX - this.oldX;
        this.yspeed = this.newY - this.oldY;
        
        this.oldX = this.newX;
        this.oldY = this.newY;
    }

}