Pen pen1;
Pen pen2;
boolean freeze;

void setup() {
  size(600, 400);
  background(255);
  // Set color and create pen 1
  color c1 = color(127, 10, 37, 100);
  pen1 = new Pen(c1);
  // Set color and create pen 2
  color c2 = color(27, 100, 37, 100);
  pen2 = new Pen(c2);
}

void draw() {
  // Update pens
  pen1.update();
  pen2.update();

  // Draw pens
  pen1.draw();
  pen2.draw();

}

void keyPressed() {
  // Toggle freeze value
  freeze = !freeze;
  
  // Update freeze value for pens
  pen1.freeze(freeze);
  pen2.freeze(freeze);
}

void mouseMoved() {
  // Set the targets based on mouse position
  pen1.setTarget(mouseX, mouseY);
  pen2.setTarget(mouseX, mouseY);
}