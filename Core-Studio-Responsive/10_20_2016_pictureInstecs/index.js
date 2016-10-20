//alt-command-shift 5 || 6 for indent !
var canvas = document.getElementById('canvas');
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var data,_w,_h;
var allInsects = [];
var hasPicture = false;

function setup(){
  setupListeners();
}

function draw(){
  ctx.fillStyle = "rgba(50,50,50,1)";
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    for(var i=0;i<allInsects.length;i++){
        allInsects[i].move();
        allInsects[i].draw();
    }
  requestAnimationFrame(draw);
}

function setupListeners(){
  document.addEventListener('touchend', touchAction, false);
}

function touchAction(ev){
    if(ev.touches.length>1){hasPicture = false;
        return;}
    if(!hasPicture){

  var imagePicker = new Ejecta.ImagePicker();

   // all options are optional
   var options = {
       sourceType     : 'Camera',              // 'PhotoLibrary' or 'SavedPhotosAlbum' (or experimental 'Camera')
       popupX         : ev.changedTouches[0].pageX,  // Popup position, relevant only on iPad when sourceType is not Camera,
       popupY         : ev.changedTouches[0].pageY,  // best value is the tap coordinates or the center of the tapped element
       maxWidth       : w,                           // Max image size (resolution), by default it's GL ES max texture size
       maxHeight      : h                            // ..
   };

   imagePicker.getPicture(function (error, image) {
        if (error) {
            return console.log('Loading failed: ' + error);
        }
      _w = w;
      _h = _w * image.height/image.width;
      var _d =  h/2 - _h/2;
      ctx.drawImage(image,0,h/2 - _h/2,_w,_h);
      data = ctx.getImageData(0,h/2 - _h/2,_w,_h).data;
      allInsects = [];
      for(var j = 0;j<_h;j+=8){
          for(var i = 0;i<_w;i+=8){
              var index = 4 * (j*_w + i);
              var r = data[index];
              var g = data[index+1];
              var b = data[index+2];
              var a = data[index+3];
              var grey = Math.round(r*0.3 + g*0.59 + b*0.11);
              if(grey>150){
                  var radius = Math.round((grey/255)*2) + Math.random();
                  var insect = new Insect(ctx,i,_d+j,radius,"rgba("+r+","+g+","+b+",1)",i,_d+j);
                  allInsects.push(insect);
            }
          }
      }
      hasPicture = true;
      setTimeout(draw,2000);
    }, options);

    }else{
    	//let's organized them
        for(var i=0;i<allInsects.length;i++){
            allInsects[i].organized = !allInsects[i].organized;
        }
    }

}

setup();
