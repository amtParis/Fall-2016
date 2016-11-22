#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    catImg.load("cat.jpg");
    
    threshold = 0;
    
    catTex.allocate( catImg.getWidth(), catImg.getHeight(), GL_RGB );
}

//--------------------------------------------------------------
void ofApp::update(){
    
    
    threshold = ofMap(mouseX,0,ofGetWidth(),0,255);
    
    // get a copy of the image pixels so we can change without affecting
    // original image
    ofPixels catPixels = catImg.getPixels();
    
    for(int i = 0; i < catImg.getWidth()*catImg.getHeight(); i++){
        
        
        ofColor c = ofColor(catPixels[i*3],catPixels[i*3+1],catPixels[i*3+2]);
        
        // same thing:
        //ofColor c = catImg.getColor(i*3);
        
        // get brightness value
        float brightness = c.getBrightness();
        
        if( brightness < threshold){
           
            catPixels[i*3] = 255; // red
            catPixels[i*3 + 1] = 0; // green
            catPixels[i*3 + 2] = 0; // blue
            
            // same thing but not as fast
            //catPixels.setColor(i*3, ofColor(255,0,0) );
        }
    
    }
    
    // update texture with changed data so we can draw it
    catTex.loadData(catPixels,catImg.getWidth(),catImg.getHeight(),GL_RGB);
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    ofSetColor(255);
    catImg.draw(0,0);
    
    // draw our texture with the changed pixel data
    catTex.draw(catImg.getWidth(),0);
    
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
