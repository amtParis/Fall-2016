#include "ofApp.h"


using namespace ofxCv;
using namespace cv;

//--------------------------------------------------------------
void ofApp::setup(){
    
    // set up osc sender
    host = "localhost";
    port = 8338;
    sender.setup(host, port);
    
    
    // setup webcam input
    cam.setup(320, 240);
    
    // imitate() will set up previous and diff
    // so they have the same size and type as cam
    imitate(previous, cam);
    imitate(diff, cam);
    
    ofSetBackgroundColor(0);
    
}

//--------------------------------------------------------------
void ofApp::update(){
    
    cam.update();
    
    if(cam.isFrameNew()) {
        
        // take the absolute difference of prev and cam and save it inside diff
        absdiff(cam, previous, diff);
        diff.update();
        
        // copy the cam image into previous so we have it for next update call
        copy(cam, previous);
        
        // this calculate the average
        diffMean = mean( toCv(diff) );
        
        // the image has three channels RGB so there are 3 values
        float diffRed = diffMean[0];
        float diffGreen = diffMean[1];
        float diffBlue = diffMean[2];
        
        // get the average of the three
        float avg = (diffRed+diffBlue+diffGreen) / 3.0;
        
        // map the value to a useable range
        float mappedVal = ofMap(avg,3,30,0,1);
        
        // blend value to smooth it
        averageMotion = .9*averageMotion + .1*mappedVal;
        
        // log to console
        ofLog() << averageMotion;
        
        // send osc data
        ofxOscMessage m;
        m.setAddress("/motion");
        m.addFloatArg( averageMotion );
        sender.sendMessage(m, false); // must have false param -- Unity can't receive as bundle
        
    }
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    // draw difference image
    diff.draw(0,0);
    
    // draw average motion bar
    ofSetColor(255);
    ofDrawRectangle(0,diff.getHeight(),averageMotion*320,20);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

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
