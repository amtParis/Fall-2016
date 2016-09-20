// Arrays used to store PVectors and associated colors (resizable arrays)
ArrayList<PVector> list = new ArrayList<PVector>();
ArrayList<Integer> colors = new ArrayList<Integer>();

void setup() {
  size(600, 400);
  background(255);
}

//PVector pt
//  float x // accessed using pt.x
//  float y // accessed using pt.y
//  float z // accessed using pt.z

void draw() {
  for (int i=0; i<list.size(); i++) {
    PVector pt = list.get(i); // Give me the point at position i
    stroke(colors.get(i), 100);
    noFill();
    ellipse(pt.x, pt.y, 10, 10); // draw an ellipse at the point's position
    // Those 2 lines are the same as
    // ellipse(list.get(i).x, list.get(i).y, 10, 10); // draw an ellipse at the point's position
  }

  if (frameCount % 10 == 0) { // Every 10 frames, add a new point. % is called modulo
    // ie: if framecout = 100 => divided by 25 gives 4 and leaves nothing => OK
    // ie: if framecout = 101 => divided by 25 gives 4 and leaves 1 => not OK
    addRandomPoint();
  }

  for (int i=0; i<list.size(); i++) {
    //PVector pt = list.get(i); // Get the point at position i
    //pt.x += random(-5, 5); // Shift it a little
    //pt.y += random(-5, 5);
    //list.get(i).x = pt.x; // Set it back
    //list.get(i).y = pt.y; // Set it back
    // Same as
    list.get(i).x += random(-5, 5); // Add a random value between -5 and 5 to itself
    list.get(i).y += random(-5, 5); 
  }
}

// Function used to add a new point
void addRandomPoint() {
  // Create a random point in the screen
  float x = random(width);
  float y = random(height);
  PVector pt = new PVector(x, y);
  //PVector pt = new PVector(x, y, 0); same thing
  // Add it to the array
  list.add(pt);
  colors.add(randomColor()); // Add a new color in the meantime
}

void keyPressed() {
  if (key == 'p') {
    addRandomPoint(); // Call the add point function
  }
  if (key == 'x') {
    if (list.size() > 0) { // If there is at least one element
      //  list.remove(0); // Remove ithe first one
      list.remove(list.size() - 1); // Remove the last point
      colors.remove(colors.size() - 1); // Remove the last color
    }
  }
  if (key == 'c') {
    list.clear(); // remove all the elements of the arraylist
    colors.clear();
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