var Lego = function(ctx,image){
	this.ctx = ctx;
	this.img = new Image();
	this.img.onload = this.init();
	this.img.src = image;
}

Lego.prototype = {

	init:function(){
		//alert(this.img);
	},

	draw:function(x,y,quantity){
		//console.log(this.img);
		//this.ctx.drawImage(this.img,x,y);
		switch(quantity){
			case "a":
			case "m":
			case "t":
			case "c":
			case "l":
			case "o":
			case "k": 
			case ":": 
				quantity = 2;
			break;
			case "0":
				quantity = 1;
			break;
			default:
				quantity = quantity
		}
		
		for(var i=0;i<parseInt(quantity);i++){
			this.ctx.drawImage(this.img,x,y-(i*15));
		}
	}
}