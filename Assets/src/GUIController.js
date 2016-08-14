#pragma strict

import UnityEngine;
import UnityEngine.UI;

var model : GameObject;
var facilityMonitor : FacilityMonitor;
var cam : Camera;
var input : InputField;
var pointer: GameObject;

function Start () {
	Debug.Log("[INFO] Starting the facility Monitoring system...");
	facilityMonitor = new FacilityMonitor(model);
}

function Update () {

}

function availableSpaces() {
	Application.ExternalCall("spacesList", facilityMonitor.spacesInformations());
}

function availableFloors(){
	var floors = new Array();
	var count = model.transform.childCount;
    for (var i = 0; i < count; ++i)
    	floors.Push(model.transform.GetChild(i).name);

	Application.ExternalCall("floorsList", floors);
}

function selectSpace(space: String){
	var result : FacilitySpace = facilityMonitor.searchRoom(space);
	var aux = new Vector3(0,3,0);
	if(result != null){
		cam.transform.LookAt(result.getSpace().transform);
		pointer.transform.position = result.getSpace().transform.position + aux;
		return true;
	}
	else{
		Debug.Log("Room not found");
		return false;
	}
}



/**
*
* Function to show one of the levels of the build and hide the others.
*
*@param name of the level
*@return 
**/
function toggleLevel(levelName : String){
	var children = model.transform.childCount;
    for (var i = 0; i < children; ++i){
    	if(model.transform.GetChild(i).name.Equals(levelName))
     		model.transform.GetChild(i).gameObject.SetActive(true);
     	else
     		model.transform.GetChild(i).gameObject.SetActive(false);
     }	
}

function unityFindRoom(){
		var room = input.text;
		findRoom(room);
}

/**
*
* Function search for a specific room.
*
*@param name of the room
*@return 
**/
function findRoom(roomName){
	var result : FacilitySpace = facilityMonitor.searchRoom(roomName);
	if(result != null){
		cam.transform.LookAt(result.getSpace().transform);
	}
	else
		Debug.Log("Room not found");
}

/**
*
* Function to retrieve the informations of the room
*
* @param name of the room
* @return list with room info
**/
function roomInformation(name : String){
	var result : FacilitySpace = facilityMonitor.searchRoom(name);
	var infos = ["10", "11", "12", "13"];
	if(result != null){
		Application.ExternalCall("updateRoomInformation", infos);
	}
	else
		Debug.Log("Room not found");
}

/**
*
* Function to retrieve the available rooms of the facility.
*
*@param
*@return an array with the names of the spaces of the facility 
**/
function getSpaces(){
	var spaces = new Array();
	for(var str in facilityMonitor.getSpaces().Keys)
		spaces.Push(str);

	Application.ExternalCall("updateSpaces", spaces);
}



function selectNavigationMode(mode : String){
	if(mode === "orbit"){
		Debug.Log("Navigation mode: " + mode);
		cam.gameObject.GetComponent(NavigationController).enabled = false;
		cam.gameObject.GetComponent(OrbitCamera).enabled = true;
		Debug.Log(cam.gameObject.GetComponent(OrbitCamera).enabled);
		return;
	}
	else{
		Debug.Log("Navigation mode: " + mode);
		cam.gameObject.GetComponent(NavigationController).enabled = true;
		cam.gameObject.GetComponent(OrbitCamera).enabled = false;
		return;
	}

}

function orbitMode(){
		cam.gameObject.GetComponent(NavigationController).enabled = false;
		cam.gameObject.GetComponent(OrbitCamera).enabled = true;
}

function normalMode(){
		cam.gameObject.GetComponent(NavigationController).enabled = true;
		cam.gameObject.GetComponent(OrbitCamera).enabled = false;
}

function roomInformations(name : String ) {
	Application.ExternalCall("retriveRoomInfo", facilityMonitor.roomInformations(name));
}


