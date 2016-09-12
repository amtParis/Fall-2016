
// change this if you want a different color than white on splash background
color splashColor = color(255,255,255,255);


PImage baseImage;

int [] ios_sizes = {40,80,50,100,60,120,180,72,144,76,152,29,58,87,57,114};
String [] ios_names = {"40","40@2x","50","50@2x","60","60@2x","60@3x","72","72@2x","76","76@2x","small","small@2x","small@3x","","@2x"};
String ios_prefix = "icon-";

int [] android_sizes = {72,36,48,96,144,192};
String [] android_names = {"hdpi-icon","ldpi-icon","mdpi-icon","xhdpi-icon","xxhdpi-icon","xxxhdpi-icon"};
String android_prefix = "drawable-";

int iosMade = 0;
int androidMade = 0;
boolean startIcons = false;

int [][] ios_splash_sizes = {{640,1136},{750,1334},{1242,2208},{2208,1242},{2048,1536},{1024,768},{1536,2048},{768,1024},{640,980},{320,480}};
String [] ios_splash_names = {"-568h@2x~iphone","-667h","-736h","-Landscape-736h","-Landscape@2x~ipad","-Landscape~ipad","-Portrait@2x~ipad","-Portrait~ipad","@2x~iphone","~iphone"};
String ios_splash_prefix = "Default";
int iosSplashMade = 0;

int [][] android_splash_sizes = {{800,480},{320,420},{480,320},{1280,720},{1600,960},{1920,1280},{480,800},{240,320},{320,480},{720,1280},{960,1600},{1280,1920}};
String [] android_splash_names = {"land-hdpi-screen","land-ldpi-screen","land-mdpi-screen","land-xhdpi-screen","land-xxhdpi-screen","land-xxxhdpi-screen","port-hdpi-screen","port-ldpi-screen","port-mdpi-screen","port-xhdpi-screen","port-xxhdpi-screen","port-xxxhdpi-screen"};
String android_splash_prefix = "drawable-";
int androidSplashMade = 0;
boolean startSplash = false;

String folder;


// gui
PFont font;
int fontSize = 16;
int [] selectButton = new int[4];
int selectFillAlpha = 0;
int [] startButton = new int[4];
int totalDone = 0;
float totalNeeded = ios_sizes.length+android_sizes.length+ios_splash_sizes.length+android_splash_sizes.length;



void setup() {
  size(400,440);
  
  font = createFont("SourceCodePro-Regular.ttf", fontSize);

  selectButton[0] = 40;
  selectButton[1] = 40;
  selectButton[2] = width-80;
  selectButton[3] = 40;
  
  startButton[0] = 40;
  startButton[1] = 360;
  startButton[2] = width-80;
  startButton[3] = 40;
  
  folder = "pg_"+millis()+"/";
}

void draw(){
  
  background(39,161,197);
  
  float pctDone = (iosMade + androidMade + iosSplashMade + androidSplashMade) / totalNeeded;
  totalDone = int(startButton[2]*pctDone);
    
  fill(255,selectFillAlpha);
  stroke(255);
  drawButton(selectButton,"CHOOSE A PNG");
 
  noFill();
  drawButton(startButton,"START");
  
  int [] fillButton = {startButton[0],startButton[1],totalDone,startButton[3]};
  fill(255);
  drawButton(fillButton,"");

  if(baseImage != null){
    image(baseImage,100,120,200,200);
  }else{
    noStroke();
    fill(0,90);
    rect(100,120,200,200);
  }
  
  
  
  if(startIcons && iosMade < ios_sizes.length){
    String filePath = folder+"res/icon/ios/" + ios_prefix + ios_names[iosMade] + ".png";
    makeIcon(ios_sizes[iosMade],filePath);
    println("Saved: " + filePath);
    iosMade++;
  }else if(startIcons && androidMade < android_sizes.length){
    String filePath = folder+"res/icon/android/" + android_prefix + android_names[androidMade] + ".png";
    makeIcon(android_sizes[androidMade],filePath);
    println("Saved: " + filePath);
    androidMade++;
  }else if(startIcons){
    // start splash
    startIcons = false;
    startSplash = true;
  }
  
 // if splash
 if(startSplash && iosSplashMade < ios_splash_sizes.length){
    String filePath = folder+"res/screen/ios/" + ios_splash_prefix + ios_splash_names[iosSplashMade] + ".png";
    makeSplash(ios_splash_sizes[iosSplashMade][0],ios_splash_sizes[iosSplashMade][1],filePath);
    println("Saved: " + filePath);
    iosSplashMade++;
  }else if(startSplash && androidSplashMade < android_splash_sizes.length){
    String filePath = folder+"res/screen/android/" + android_splash_prefix + android_splash_names[androidSplashMade] + ".png";
    makeSplash(android_splash_sizes[androidSplashMade][0],android_splash_sizes[androidSplashMade][1],filePath);
    println("Saved: " + filePath);
    androidSplashMade++;
  }else if(startSplash){
    startSplash = false;
  }
}

void fileSelected(File selection) {
  if (selection == null) {
    println("Window was closed or the user hit cancel.");
  } else {
    println("User selected " + selection.getAbsolutePath());
    baseImage = loadImage(selection.getAbsolutePath());
  }
}

void makeIcon(int sz,String filePath){
  PImage image = baseImage.copy();
  image.resize(sz,sz);
  createOutput(filePath);
  image.save(filePath);
}

void makeSplash(int w, int h, String filePath){
  PImage splashImage = createImage(w,h,RGB);
  PImage image = baseImage.copy();
  
  
  
  // background pixels set to white
  for(int i = 0; i < splashImage.pixels.length; i++) {
    splashImage.pixels[i] = splashColor;// color(255,255,255); 
  }
  
  if(baseImage.width > w || baseImage.height > h){
     float scale = 1;
    if(baseImage.width > w && w < h) scale = float(w)/baseImage.width;
    else scale = float(h)/baseImage.height;
    
    int nw = int(baseImage.width*scale);
    int nh = int(baseImage.height*scale);
    image.resize(nw,nh);
  }
  
  // set transparent pixels to white
   for(int i = 0; i < image.pixels.length; i++) {
    color mycolor = image.pixels[i];
    if(alpha(mycolor)==0){
      image.pixels[i] = splashColor;//color(255,255,255); 
    }
    
  }
  println(image.height);
   
  // copy to center
  int centerX = (splashImage.width - image.width) / 2;
  int centerY = (splashImage.height - image.height) / 2;
  
  splashImage.copy(image,0,0,image.width,image.height,centerX,centerY,image.width,image.height);
  createOutput(filePath);
  splashImage.save(filePath);
  
}

void mousePressed(){

  if(!startSplash && !startIcons &&  hitTest(selectButton) ){
      selectInput("Select a PNG image:", "fileSelected");
      selectFillAlpha = 127;
  }
  
  else if(!startSplash && !startIcons && baseImage != null && hitTest(startButton) ){
      makeIcon(128,folder+"icon.png");
      startIcons = true;
  }
  
}

void mouseReleased(){
  selectFillAlpha = 0;
}

void drawButton( int [] button, String title ){
  
  rect(button[0],button[1],button[2],button[3]);
  
  fill(255);
  textFont(font);
  text(title, button[0] + ( button[2]-textWidth(title) )/2, button[1]+button[3]-(button[3]-fontSize)/2-2);

}

boolean hitTest(int [] button){
  if(mouseX > button[0] && mouseX < button[0]+button[2] 
  && mouseY > button[1] && mouseY < button[1]+button[3]) return true;
  return false;
}