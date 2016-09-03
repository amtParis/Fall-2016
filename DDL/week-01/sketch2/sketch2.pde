/*

This sketch draws 10 shapes (ellipse or rectangle)
aligned and centered vertically

*/

// Set the canvas size
size(600, 500);
// Set the background color to white
background(255);

// Don't draw shapes with a stroke
noStroke();

// shifts the reference system by 30 px on the x axis
// shifts the reference system by 250 px on the y axis (centered vertically)
// see https://processing.org/reference/translate_.html
translate(30, 250); 

// Use CENTER mode for the coordinates system of the rect and ellipse drwaing methods
rectMode(CENTER);
ellipseMode(CENTER);

// Iterate 10 times
// See https://processing.org/reference/for.html
for (int i=0; i<10; i++) {

  // Random color
  int red = (int) random(255); // Get a random value for the red
  int green = (int) random(255); // Get a random value for the grren
  int blue = (int) random(255); // Get a random value for the blue
  fill(red, green, blue); // Use these RGB values

  float dice = random(2); // Store a value between 0 and 2
  
  // If / else statement
  // https://processing.org/reference/if.html
  // https://processing.org/reference/else.html

  if (dice > 1) { // If value is > 1 , draw a rectangle
    rect(60 * i, 10, 50, random(100));
  }
  else { // Draw an ellipse
    ellipse(60 * i, 10, 50, random(100));
  }
}