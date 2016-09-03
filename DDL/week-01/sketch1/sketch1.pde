// Lines started with "//" are used to comment code

/*
You can also comment 
several lines like this
*/

// Change the size of the canvas (display window) to 300 pixels width and 200 pixels height
// size is a function
// 300 and 200 are the parameters aka arguments of the function, set in parenthesis
// they are separated by a coma
// lines of code end with a semi-column
size(300, 200);

// Setting the background color of the canvas
// Color values range from 0 to 255
//background(255); // White 
//background(127); // Values from 1 (super dark gray) to 254 (super light gray)
//background(0); // Black
background(107, 211, 132); // Color defined using RGB values ranging each from 0 to 255

// Draw a rectangle
// 10 is the x position in pixels, starting from the left of the canvas 
// 10 is the y position in pixels, starting from the top of the canvas
// 100 is the rectangle width
// 20 is the rectangel height
rect(10, 10, 100, 20);

// Draw another rectangle (you can comment / uncomment the lines below to see the difference)
// To uncomment a line, just remove the //
fill(127); // Fill the rectangle in gray
// fill(127, 200); // Fill the rectangle in gray with an opacity of 200 (0 = transparent, 255 = solid color) 
// fill(0, 255, 0); // Fill the rectangle in green
// fill(255, 100, 200); // Fill the rectangle with an RGB color
// fill(255, 100, 200, 100); // Fill the rectangle with an RGB color and some opacity
stroke(255); // Draw a white line around the rectangle
// sroke(127, 200); // Draw a gray line  with some opacity around the rectangle 
// stroke(255, 0, 0); // Draw a RGB line around the rectangle (R = 255 = full red)
// stroke(10, 200, 50, 100); // Draw a RGB colored line with some opacity around the rectangle 
rect(10, 40, 100, 20); // Draw another rectangle


// Once set, the fill and stroke values will affect the next drawings, unless fill or stroke
// are called with other values

// A temporary style can be set, by insterting it between pushStyle and popStyle
pushStyle(); // Temporary fill / stroke values that won't affect the rect of the program
noFill(); // Don't fill the rectangle with a color
strokeWeight(3); // Change for a larger stroke (3 pixels) 
rect(10, 70, 100, 20);
popStyle();

noStroke(); // Don't draw a line around the next rectangle
fill(200, 100, 200);
rect(10, 100, 100, 20);

// Draw an ellipse
noFill();
stroke(30, 100, 255);
ellipse(200, 100, 50, 100);

// The parameters of the rect or ellipse functions can be interpreted in different ways
// It may be convenient under certain circonstances to change mode depending if you intend
// to left/right align a drawing or center it.

// See https://processing.org/reference/rectMode_.html
//rectMode(CENTER);
//rectMode(CORNER);
//rectMode(CORNERS);

// See https://processing.org/reference/ellipseMode_.html
//ellipseMode(CENTER);
//ellipseMode(CORNER);
//ellipseMode(CORNERS);