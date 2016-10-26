
var Food = function(ctx,x,y) {
    this.context = ctx;
    this.x = x;
    this.y = y;
    this.color = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
    this.touch = false;
    this.isEaten = false; // each food needs to know if an insect picked it or not
}


Food.prototype = {
    
display:function(){
    // we draw the food only if it's not eaten
    if(!this.isEaten){
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.rect(this.x,this.y,10,10);
        this.context.fill();
        this.context.closePath();
    }
}
    
}
