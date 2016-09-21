PVector pos;
PVector target;
float speed = 0.1;

void setup() {
  size(600, 200);
  background(255);
  
  // Set the position and the target's initial coordinates
  pos = new PVector(20, height/2);
  target = new PVector(pos.x, pos.y);
}

void draw() {
  
  // Interpolate position to the target position
  pos = pos.lerp(target, speed);
  // Set the size based on the distance between current position and target
  float size = 10 + pos.dist(target); 
  // Draw en ellipse
  ellipse(pos.x, pos.y, size, size);
  
}

// Set the target to the mouse positon when moved
void mouseMoved() {
  target.x = mouseX;
  target.y = mouseY;
}