var canvas  = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");


function setup() {
    var myShakeEvent = new Shake({
                                 threshold: 15, // optional shake strength threshold
                                 timeout: 500 // optional, determines the frequency of event generation
                                 });
    myShakeEvent.start();
    window.addEventListener('shake', shakeEventDidOccur, false);
    draw();
}

function shakeEventDidOccur () {
    console.log("SHAKE!");
}


function draw() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    requestAnimationFrame(draw);
}


setup();
