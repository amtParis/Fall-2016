// VARIABLES
var words  = "blabla";
var number = 1;
console.log(number);
number = 2;
console.log(number);
number = number + 10;
console.log(number);


//functions
function addition(a,b){
    var c = a + b;
    return c;
}
  
var result = addition(number,words);
console.log(result);
console.log("-------------");


//loop
for(var i = 0;i<=100;i++){
  //console.log(i);
  var newResult = addition(i,i);
  console.log(newResult);
}


//DRAWING
var canvas = document.getElementById("gael");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var side = 20;
ctx.strokeStyle = 'black';

for(var j = 0;j<70;j++){
  for(var i = 0;i<70;i++){
    ctx.rect(side*i,side*j,side,side);
  }
}

ctx.stroke();
