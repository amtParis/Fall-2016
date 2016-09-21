class Pen {

  // Fields specific to a pen
  PVector[] followers = new PVector[10];
  PVector target;
  float speed = 0.1;
  color col;
  boolean freeze;

  // Class constructor (initialisation)
  Pen(color c) { // Set default values, initialize fields
    col = c;
    target = new PVector(width/2, height/2);
    for (int i=0; i<followers.length; i++) {
      followers[i] = new PVector(target.x, target.y);
    }
  }

  void update() {
    // Update
    // Chain reaction
    for (int i=0; i<followers.length; i++) {
      if (i == 0) { // First point follows the target (mouse)
        followers[i] = followers[i].lerp(target, speed);
        //followers[i] = PVector.lerp(followers[i], target, speed);
      } else { // Follwo the preceeding point (i-1)
        followers[i] = followers[i].lerp(followers[i-1], speed);
        //followers[i] = PVector.lerp(followers[i], followers[i-1], speed);
      }
    }
    // If we're close to the target, then change target position
    if (followers[0].dist(target) < 1) {
      target.x = random(width);
      target.y = random(height);
    }
  }

  void draw() {
    if (!freeze) {
      // Drawing
      for (int i=0; i<followers.length; i++) {
        if (i > 0) {
          stroke(col);
          ellipse(followers[i].x, followers[i].y, 10, 10);
        }
      }
    }
  }

  // Set the freeze value
  void freeze(boolean value) {
    freeze = value;
  }
  
  // Set the target manualy (upon mouse move for instance)
  void setTarget(float x, float y) {
    target.x = x;
    target.y = y;
  }
}