/*

This sketch draws 10 shapes (ellipse or rectangle)
at random positions, using random colors using 3 combinations of styles

*/

// Set the canvas size
size(600, 500);
// Set the background color to white
background(255);

// Iterate 10 times
// See https://processing.org/reference/for.html
for (int i=0; i<10; i++) {

  // Set a random color
  // We store values in float variables (named freely) and use the random function to return a random number 
  float red = random(255); // Get a random value for the red
  float green = random(255); // Get a random value for the grren
  float blue = random(255); // Get a random value for the blue
  float opacity = random(255); // Get a random value for the opacity
  
  // Set the coordinates
  float x = random(600);
  float y = random(500);
  
  // Set the width and height with a minimum of 50 and a maximum of 200
  float w = random(50, 200);
  float h = random(50, 200);
  
  // Pick a random value and use it to determine while drawing will be used
  float dice = random(3); // Store a value between 0 and 3
  
  // If / else statement
  // https://processing.org/reference/if.html
  // https://processing.org/reference/else.html
  
  if (dice > 2) { // If value is > 2 , draw a rectangle
    noStroke(); // No stroke
    fill(red, green, blue, opacity); // Use these RGB + alpha/opacity values
    rect(x, y, w, h);
  }
  else if (dice < 1) { // Draw an ellipse
    noStroke();
    fill(red, green, blue, opacity); // Use these RGB + alpha/opacity values
    ellipse(x, y, w, h);
  }
  else { // Draw an ellipse
    stroke(red, green, blue, opacity); // Use these RGB + alpha/opacity values
    strokeWeight(3);
    noFill();
    ellipse(x, y, w, h);
  }
}