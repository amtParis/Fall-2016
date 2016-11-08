//
//	  UnityOSC - Example of usage for OSC receiver
//
//	  Copyright (c) 2012 Jorge Garcia Martin
//
// 	  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
// 	  documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// 	  the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
// 	  and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// 	  The above copyright notice and this permission notice shall be included in all copies or substantial portions 
// 	  of the Software.
//
// 	  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
// 	  TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
// 	  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
// 	  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// 	  IN THE SOFTWARE.
//

using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityOSC;

public class oscControl : MonoBehaviour {
	
	private Dictionary<string, ServerLog> servers;
	public MovingObject cube;
	long lastTimeStamp = 0;
	
	
	Vector3 prevPitchRoll = new Vector3(0f,0f,0f);


	// Script initialization
	void Start() {	
		OSCHandler.Instance.Init("PhoneControl",8338); //init OSC
		servers = new Dictionary<string, ServerLog>();

		GameObject go = GameObject.Find("Dodeca");
		cube = (MovingObject) go.GetComponent(typeof(MovingObject));
	}

	// NOTE: The received messages at each server are updated here
    // Hence, this update depends on your application architecture
    // How many frames per second or Update() calls per frame?
	void Update() {
		
		
		OSCHandler.Instance.UpdateLogs();
		servers = OSCHandler.Instance.Servers;
		
	    foreach( KeyValuePair<string, ServerLog> item in servers )
		{
			// If we have received at least one packet,
			// show the last received from the log in the Debug console
			if(item.Value.log.Count > 0) 
			{
				int lastPacketIndex = item.Value.packets.Count - 1;
				long packetTimestamp = item.Value.packets[lastPacketIndex].TimeStamp;

				if(lastTimeStamp < packetTimestamp){
					
					lastTimeStamp = packetTimestamp;
					
					UnityEngine.Debug.Log(String.Format("SERVER: {0} ADDRESS: {1} VALUE X: {2} VALUE Y: {3} VALUE Z: {4}", 
				                                    item.Key, // Server name
				                                    item.Value.packets[lastPacketIndex].Address, // OSC address
				                                    item.Value.packets[lastPacketIndex].Data[0].ToString(),
				                                    item.Value.packets[lastPacketIndex].Data[1].ToString(),
				                                    item.Value.packets[lastPacketIndex].Data[2].ToString())); //First data value
					

					if(item.Value.packets[lastPacketIndex].Address == "/accelerometer"){
						
						float valX = float.Parse( item.Value.packets[lastPacketIndex].Data[0].ToString() );
						float valY = float.Parse( item.Value.packets[lastPacketIndex].Data[1].ToString() );
						float valZ = float.Parse( item.Value.packets[lastPacketIndex].Data[2].ToString() );
						
						float roll  = (Mathf.Atan2(-valY, valZ)*180.0f)/Mathf.PI;
    					float pitch = (Mathf.Atan2(valX, Mathf.Sqrt(valY*valY + valZ*valZ))*180.0f)/Mathf.PI;
    					
    					cube.AddForce( new Vector3(
    						Mathf.Abs(prevPitchRoll.x-roll),0.0f,
    						Mathf.Abs(prevPitchRoll.z-pitch) ));
    					
    					
    					prevPitchRoll = new Vector3(roll,0,pitch);

					}
				}
			}

	    }

	    /*foreach(KeyValuePair<string,ServerLog> pair in servers)
		{
			pair.Value.packets.Clear();
			pair.Value.log.Clear();
		}*/

	}
}