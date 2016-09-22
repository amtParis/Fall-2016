/*
	this code will draw a clock with a lego esthetics
	the concept is to have the real numbers displayed on a "board" and the number of brick composing the number is equal to the number itself
	I've added some letters to add a "title" AMT CLOCK
	The purpose of this example is the understand the link between a simple concept and it's visual application.
*/

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext('2d');

var edgeSizeX,edgeSizeY;
var myNumber;
var decoder;
var speed;
var counter;
var d;
var lego;
var img;
var _top,_left;

var message1,message2;


function setup(){
	edgeSizeX = 23;
	edgeSizeY = 15;
	myNumber = "1234567890";
	message1 = "amt";
	message2 = "clock";
	decoder = new Decoder();
	speed = 0;
	counter = 0;
	ctx.strokeStyle = 'black';
	ctx.fillStyle = 'black';

	// static position ---> bad solution, but quick one
	_top = 396; //window.innerHeight/2;
	_left = 137; //window.innerWidth/2 - (((8*5)+6)*edgeSizeX)/2;

	// call to the lego prototype
	// the 2d context and the picture url are given as parameter
	lego = new Lego(ctx,"data/legoPiece.png");
	
	draw();
}

function draw(){
	
	d = new Date();
	myNumber = ((d.getHours()<10)?'0'+d.getHours():d.getHours()) +":"+ ((d.getMinutes()<10)?'0'+d.getMinutes():d.getMinutes()) +":"+((d.getSeconds()<10)?'0'+d.getSeconds():d.getSeconds());

	ctx.clearRect(0,0,canvas.width,canvas.height);

	looper(message1,104,194);
	looper(message2,628,677);
	looper(myNumber,_top,_left);

	requestAnimationFrame(draw);
	console.log("I'm drawing");
	counter++;
}

// I've created a function that will draw the pieces on screen
// So I can call it several times with different parameters, like the text to be draw and the position in the screen

function looper(myNumber,t,l){

	var splittedNumber = myNumber.split("");

	for(var k=0;k<splittedNumber.length;k++){
		var number = splittedNumber[k];
		var myBinary = decoder.getBinary(number);
		for(var j=0;j<myBinary.length;j+=1){
			var myLine = myBinary[j];
			for(var i=0;i<myLine.length;i+=1){
				var myBinaryValue = myLine[i];
				var gap = (myLine.length+1)*edgeSizeX;
				if(myBinaryValue==1){
					
					lego.draw( (i*edgeSizeX/2) + (-j*edgeSizeX/2) + (k*gap) + (counter*speed)+ edgeSizeX/4 + l, (j*edgeSizeY) + (i*edgeSizeY/2) - (j*edgeSizeY/2) + edgeSizeY/2 + t , number);
					
					/* I keep preivous variation for demo purpose  */

					//lego.draw( (i*edgeSizeX)  + (k*gap) + (counter*speed)+ edgeSizeX/4 + l, (j*(edgeSizeY*2))  + edgeSizeY/2 + t , number);
					//lego.draw( (i*edgeSizeX)  + (k*gap) + (counter*speed)+ edgeSizeX/4 + l, (j*(edgeSizeY))  + edgeSizeY/2 + t , number);
				}
			}
		}
	}	
}


setup();