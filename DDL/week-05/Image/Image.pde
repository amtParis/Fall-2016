PImage img;

void setup() {
  size(800, 600);
  img = loadImage("dog.jpg");
}

void draw() {
  image(img, 0, 0, 100, 100);
}