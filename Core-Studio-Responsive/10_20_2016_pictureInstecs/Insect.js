var Insect = function(ctx,x,y,radius,color,_x,_y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.finalX = _x; //+ (2-Math.random()*4);
    this.finalY = _y; //+ (2-Math.random()*4);
    this.speedX = 2-Math.random()*4;
    this.speedY = 2-Math.random()*4;
    this.organized = false;
    this.damp = 0.01 * Math.random() + 0.01;
}

Insect.prototype = {

    update:function(){
        
    },
        
    draw:function(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctx.fill();
        ctx.closePath();
    },
    
    move:function(){
        if(!this.organized){
        	this.x += this.speedX;
        	this.y += this.speedY;
        }else{
            var diffX = this.finalX-this.x;
            var diffY = this.finalY-this.y;
            this.x += diffX * this.damp;
            this.y += diffY * this.damp;
        }
        
        if(this.x>window.innerWidth || this.x<0){
            this.speedX*=-1;
        }
        if(this.y>window.innerHeight || this.y<0){
            this.speedY*=-1;
        }
//        
//        if(this.x>window.innerWidth+this.radius){
//            this.x =-this.radius;
//        }
//        if(this.x<-this.radius){
//            this.x =window.innerWidth+this.radius
//        }
//        if(this.y>window.innerHeight+this.radius){
//            this.y =-this.radius;
//        }
//        if(this.y<-this.radius){
//            this.y =window.innerHeight+this.radius
//        }
        
    }
    

}