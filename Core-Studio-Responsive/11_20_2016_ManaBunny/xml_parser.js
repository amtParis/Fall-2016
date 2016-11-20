var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext('2d');
var w = window.innerWidth;
var h= window.innerHeight;
var url = '';
var xml;
var dict = {};
var allTriangles = [];
var angle = 0;
var fingers = [];

function loadXML(){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
     if( request.readyState == request.DONE && request.status == 200 ) {
       xml = request.responseXML;
       buildDictionary();
     }
  }
  request.open("GET", "test.svg", false);
  request.send();
}

function buildDictionary(){
  // a dictionnary is necessary to create only 1 node shared with many triangle, instead of having the same point duplicate
  // for each connected triangle.
  // to do that, we record the point in a object itentified with it's coordinate.
  // so each time we will need that point, we will refer to the same point.
  for(var i = 0;i<xml.getElementsByTagName("polygon").length;i++){
    var points = xml.getElementsByTagName("polygon")[i].getAttribute('points').split(" ");
    // we create a new triangle, with the dictionnary and its actual 3 points.
    var t = new Triangle(ctx,dict,points);
    allTriangles.push(t);
    for(var j = 0;j<3;j++){
      //for each point of each triangle, we store a new point only if it's not already stored
      if(dict[points[j]] == undefined){
        var coord = points[j].split(",");
        dict[points[j]] = new Point(parseFloat(coord[0]),parseFloat(coord[1]));
      }
    }
  }
  setup();
}

function setup(){
  //set the interaction
  document.addEventListener('mousedown',onMouseDown,false);
  document.addEventListener('mousemove',onMouseMove,false);
  document.addEventListener('mouseup',onMouseUp,false);
  //initiate allTriangles with the full Dictionnary
  for(var i=0;i<allTriangles.length;i++){
    allTriangles[i].update();
  }
  draw()
}

function onMouseDown(e){
  fingers = [];
  fingers.push([e.pageX,e.pageY,0]);
  for(var i in dict){
    dict[i].checkDown(fingers);
  }
}

function onMouseUp(e){
  fingers = [];
  fingers.push([e.pageX,e.pageY,0]);
  for(var i in dict){
    dict[i].checkUp(fingers);
  }
}

function onMouseMove(e){
  fingers = [];
  fingers.push([e.pageX,e.pageY,0]);
  for(var i in dict){
    dict[i].checkMotion(fingers);
  }

}

function movePoints(){
  for(var i in dict){
    dict[i].move();
  }
}

function draw(){
  ctx.clearRect(0,0,w,h);
  //movePoints();
  for(var i=0;i<allTriangles.length;i++){
    //check if we touch any triangle
    for(var j = 0;j< fingers.length;j++){
      allTriangles[i].checkTouch(fingers[j]);
    }
    //draw the triangle
    allTriangles[i].draw();
  }
  requestAnimationFrame(draw);
}

loadXML();
