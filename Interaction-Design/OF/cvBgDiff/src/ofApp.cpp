#include "ofApp.h"

using namespace ofxCv;
using namespace cv;

//--------------------------------------------------------------
void ofApp::setup(){
    cam.setup(320, 240);
    
    // imitate() will set up previous and diff
    // so they have the same size and type as cam
    imitate(bg, cam);
    imitate(diff, cam);
    
    contourFinder.setMinAreaRadius(1);
    contourFinder.setMaxAreaRadius(100);
    
    
    gui.setup();
    gui.add(thresholdValue.set("Threshold Value", 10, 0, 255));
    contourFinder.setThreshold(15);
    
    
}

//--------------------------------------------------------------
void ofApp::update(){
    cam.update();
    
    if(cam.isFrameNew()){
        absdiff(cam, bg, diff);
        diff.update();
        contourFinder.findContours(diff);


    }
    contourFinder.setThreshold(thresholdValue);
   
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    cam.draw(0,0);
    contourFinder.draw();
    
    bg.draw(cam.getWidth(),0);
     gui.draw();
    
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    copy(cam, bg);
    bg.update();

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
