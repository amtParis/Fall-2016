// Declare a new array to store 10 colors
color[] colorList = new color[10];

// Other ways to create arrays
int[] integerList = new int[8]; // array of integers
float[] floatList = {5.5, 6.234, 235}; // array of float initalised with defaul variables

// Flag used to store if blink mode is on
boolean blink;

void setup() {
  size(600, 400);
  // Initialize the array with random colors
  for (int i=0; i<colorList.length; i++) {
    colorList[i] = randomColor();
  }
}

void draw() {
  for (int i=0; i<colorList.length; i++) {
    if (blink) {
      fill(randomColor()); // Set the color to a random one
    } else { // if not blinking, use the color from the array
      fill(colorList[i]); // Set the color to the current color of the array (i th position)
    }
    // Draw a rectangle filled with the color
    float x = width/colorList.length * i;
    float y = 0;
    rect(x, y, width/colorList.length, width/colorList.length);
  }
}

void keyPressed() {
  if (key == 'b') { // Set blink to true
    blink = true;
  }
  if (key == 'n') { // Set blink to false
    blink = false;
  }
  if (key == ' ') {
    //if (blink == true) { // Same as else if (blink) {
    //   blink = false; 
    //}
    //else if (blink == false) { // Same as else if (!blink) {
    //  blink = true;
    //}
    blink = !blink; // Invert the value of blink (! means "not") and assign it to itself
  }
}

// Function returning a random color
color randomColor() {
  float red = random(255);  
  float green = random(255);
  float blue = random(255);
  color c = color(red, green, blue);
  return c;
}