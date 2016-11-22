#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	
    ofBackground(255,255,255);
	ofSetVerticalSync(true);

	ofDisableArbTex();
    
    fingerMovie.load("movies/fingers.mov");
	fingerMovie.setLoopState(OF_LOOP_NORMAL);
	fingerMovie.play();
    
    float width     = ofGetWidth() * .12;
    sphere.setRadius( width );
    ofSetSphereResolution(24);


}

//--------------------------------------------------------------
void ofApp::update(){
    fingerMovie.update();
}

//--------------------------------------------------------------
void ofApp::draw(){
    fingerMovie.draw(0,0);
    
    ofEnableDepthTest();
    cam.begin();
        fingerMovie.getTexture().bind();
        sphere.draw();
        fingerMovie.getTexture().unbind();
    cam.end();
    ofDisableDepthTest();
    
}

//--------------------------------------------------------------
void ofApp::keyPressed  (int key){
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
