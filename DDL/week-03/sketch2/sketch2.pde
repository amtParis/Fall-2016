// Array list example
// Resizable array

ArrayList<PVector> points = new ArrayList<PVector>();

void setup() {
  size(600, 400);
}

void draw() {
  background(255);
  for (int i=0; i<points.size(); i++) {
    ellipse(points.get(i).x, points.get(i).y, 10, 10);
  }
}

void keyPressed() {
  if (key == ' ') { 
    points.add(new PVector(random(width), random(height))); 
  }
  if (key == 'r') {
    if (points.size() > 0) {
      points.remove(points.size()-1);
    }
  }
  if (key == 'x') {
    points.clear();
  }
}