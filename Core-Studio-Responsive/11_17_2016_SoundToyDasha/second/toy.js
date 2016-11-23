var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;
var ctx = canvas.getContext("2d");

var dimensions  = {"width":300,"height":300};
var allLines    = [];

function setup(){
    buildArea();
    document.addEventListener('touchstart', ontouchstart);
    draw();
}

function ontouchstart(e){
    // Get 2 line randomly
    // But we need to make sure that we don't pick the same line twice
    var lines = get2RandomIndex();
    // Get 1 randomPoints on each Line
    var p0 = allLines[lines[0]].getRandomPoint();
    var p1 = allLines[lines[1]].getRandomPoint();
    // Add the new line
    allLines.push(new Line(ctx,p0.concat(p1)));
}


function draw(){
    ctx.clearRect(0,0,w,h);
    //draw all Lines
    for(var i = 0;i<allLines.length;i++){
        allLines[i].draw();
    }
    requestAnimationFrame(draw);
}

function buildArea(){
    var t1 = [window.innerWidth/2 - dimensions.width/2, window.innerHeight/2 - dimensions.height/2];
    var t2 = [t1[0]+ dimensions.width, t1[1]];
    var t3 = [t2[0], t2[1]+ dimensions.height];
    var t4 = [t1[0], t3[1]];
    allLines.push(new Line(ctx,t1.concat(t2)),new Line(ctx,t2.concat(t3)),new Line(ctx,t3.concat(t4)),new Line(ctx,t4.concat(t1)));
}

function get2RandomIndex(){
    var indexes = [];
    for(var i = 0;i<allLines.length;i++){
        indexes.push(i);
    }
    return sample_range(indexes,2);
}

function sample_range(range, n) {
    var sample = [];
    for(var i=0; i<n; i++) {
        var h = range.splice(Math.random()*range.length,1);
        sample.push(h);
    }
    return sample;
}

setup();
