// Global variable (can be seen and used by all the functions below)
color currentColor;

// This function is called once when your sketch starts
// This is where you can initialize default values, set the size of your sketch, ...
void setup() {
  size(800, 600);
  background(255);

  // Set a default value for the currentColor variable
  currentColor = color(255, 0, 0);
}

// This function is continiously called when your sketch runs
// In this sketch, it does nothing since the drawing part is made
// upon key or mouse events
void draw() {
}

// This function is called when Processing detects a key event (key pressed)
// Also see keyReleased and keyTyped
void keyPressed() {
  // If the space key was pressed
  if (key == ' ') {
    background(255); // Clear the screen
  }
  // If the s key was pressed
  if (key == 's') {
    saveFrame("screenshot-######.png"); // Save a screenshot
  }
  // If the f key was pressed
  if (key == 'f') { // Draw a flower at the mouse position
    flower(mouseX, mouseY);
  }
  // If the g key was pressed
  if (key == 'g') { // Draw grass at the mouse position
    grass(mouseX, mouseY);
  }
  // If the h key was pressed
  if (key == 'h') { // Draw grass and a flower at the mouse position
    grass(mouseX, mouseY);
    flower(mouseX, mouseY);
  }
  // If the r key was pressed
  if (key == 'r') { // Change the 
    float red = random(255);
    float green = random(255);
    float blue = random(255);
    currentColor = color(red, green, blue);
  }
  if (key == 'x') { // Call the function xxx
    xxx(mouseX, mouseY);
  }
}


// Mouse events

// This function is called when Processing detects a mouse click (press and release)
void mouseClicked() {
  if (mouseButton == LEFT) {
    flower(mouseX, mouseY);
  }
  if (mouseButton == RIGHT) {
    grass(mouseX, mouseY);
  }
}

// This function is called when Processing detects a mouse move
void mouseMoved() {
  println("mouseMoved");
}

// This function is called when Processing detects a mouse drag (press a key and move)
void mouseDragged() {
  if (mouseButton == LEFT) {
    grass(mouseX, mouseY);
  }
  if (mouseButton == RIGHT) {
    circle(mouseX, mouseY);
  }
}

// Drawing functions below

void circle(int x, int y) {
  pushStyle();
  noStroke();
  fill(currentColor, 100);
  ellipse(x, y, 10, 10);
  popStyle();
}

void grass(int x, int y) {
  // 
  pushMatrix();// Isolate the coordinates reference changes so the rest of the code is not impacted by translations and rotations
  pushStyle();// Isolate style modification so the rest of the code is not impacted
  
  translate(x, y); // Translate to the given x, y position (mouse position)
  
  // St the style
  stroke(92, 170, 24, 100); 
  
  // Set a random shift to be added to the rotation
  float shift = random(PI);
  // Draw 10 lines
  for (int i=0; i<10; i++) {
    pushMatrix();
    rotate(TWO_PI * i / 10 + shift);
    line(10, 0, 20, 0);
    popMatrix();
  }
  popStyle();
  popMatrix();
}

void flower(int x, int y) {
  pushMatrix(); // Isolate the coordinates reference changes so the rest of the code is not impacted by translations and rotations
  pushStyle(); // Isolate style modification so the rest of the code is not impacted
  
  translate(x, y); // Translate to the given x, y position (mouse position)
  // Set the style
  noStroke();
  fill(255, 0, 0, 100);
  // Draw the petals
  for (int i=0; i<6; i++) {
    pushMatrix();
    rotate(TWO_PI * i / 6);
    ellipse(0, 10, 10, 10);
    popMatrix();
  }
  // Center of the flower 
  fill(255, 0, 0, 200);
  ellipse(0, 0, 10, 10);

  popStyle(); // End of temporary style 
  popMatrix(); // End of temporary coordinates reference modification
}

// You can add new functions to draw different things
void xxx(int x, int y) {
}