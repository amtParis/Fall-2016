//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var sentence;
// THIS VARIABLE WILL STORE ALL THE FUNCTIONALITIES FOR THE SECONDS MODULE
var seconds_sandClock;

// YOU NEED TO CREATE TWO MORE VARIABLE FOR THE HOURS AND THE MINUTES HERE


function setup(){
  // INITIATE THE SECONDS MODULE
  // IT INCLUDES ALL BEHAVIOUR LIKE MOVING AND DRAWING THE ELEMENT ON THE CANVAS
  // THE NEEDED PARAMETERS ARE :
  // -> THE context
  // -> THE MAXIMUM ELEMENT FOR THAT MODULE (EX: 59 IS THE MAX AMOUNT FOR THE SECONDS)
  // -> ITS POSITION IN X AND Y
  seconds_sandClock = new Sandclock(ctx,59, window.innerWidth/2, window.innerHeight/2);

  //YOU NEED TO INITIATE 2 MORE MODULES FOR HOURS AND MINUTES HERE


  draw();
}

function draw(){
  // WE ARE GETTING THE DATAS
  // WE KEPT "SENTENCE" AS VARIABLE NAME, BUT IT'S NOW AN ARRAY INSTEAD OF A STRING (HAVE A LOOK TO THE UPDATETIME FUNCTION)
  // ALL VALUES ARE GONNA BE UPDATED REGULARLY TO RENDER THE ACTUAL TIME
  sentence = updateTime();
  // SET A BLACK BACKGROUND
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  //UPDATE THE SECONDS MODULE WITH THE ACTUAL SECONDS VALUE (CHECK THE UPDATE FUNCTION IN SANDCLOCK.JS)
  // AS SENTENCE IS AN ARRAY, WE CAN ACCESS EACH VALUE BY CALLING A PRECISE INDEX.
  seconds_sandClock.update(sentence[2]);
  // CALL THE DRAW FUNCTION OF THE MODULE
  // THE DRAW FUNCTION WILL DRAW EVERY SHAPE + THE OUTLINE
  seconds_sandClock.draw();

  //YOU NEED TO UPDATE AND DRAW 2 MORE MODULES HERE


  requestAnimationFrame(draw);
}

function updateTime(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var mseconds = date.getMilliseconds();

  // RETURNING A SIMPLE ARRAY WITH 3 VALUES
  var sentence = [hours,minutes,seconds];
  return sentence;
}

setup();
