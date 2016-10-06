//DRAWING
var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");
var sentence;
var seconds_sandClock;
var minutes_sandClock;
var hours_sandClock;

function setup(){
  var totalSandClockWidth = (10 * 20 + 2*20);
  seconds_sandClock = new Sandclock(ctx,59, window.innerWidth/2 + totalSandClockWidth/2, window.innerHeight/2);
  minutes_sandClock = new Sandclock(ctx,59, window.innerWidth/2 - totalSandClockWidth/2, window.innerHeight/2);
  hours_sandClock   = new Sandclock(ctx,23, window.innerWidth/2 - totalSandClockWidth*1.5, window.innerHeight/2);
  draw();
}

function draw(){
  sentence = updateTime();
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

  seconds_sandClock.update(sentence[2]);
  seconds_sandClock.draw();

  minutes_sandClock.update(sentence[1]);
  minutes_sandClock.draw();

  hours_sandClock.update(sentence[0]);
  hours_sandClock.draw();

  requestAnimationFrame(draw);
}

function updateTime(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var mseconds = date.getMilliseconds();

  var sentence = [hours,minutes,seconds];
  return sentence;
}

setup();
