#pragma strict

import UnityEngine;
import UnityEngine.UI;
import UnityEngine.Networking;

var model : GameObject;
var facilityMonitor : FacilityMonitor;
var cam : Camera;
var measures : Measure[];
var boxViewActivated;
var selectedBox : String;

var oldMaterial : Material;
var highlightMaterial: Material;
var selectedSpace: FacilitySpace;

function Start () {
	Debug.Log("[INFO] Starting the facility Monitoring system...");
	facilityMonitor = new FacilityMonitor(model);
  boxViewActivated = false;
  selectedSpace = null;
  getOverallConsumption();
}

function Update () {
  if ( boxViewActivated && Input.GetMouseButtonDown(0)){
    var hit : RaycastHit;
    var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
    if (Physics.Raycast (ray, hit, 500.0)){
      selectedBox = hit.collider.transform.gameObject.name;
      overallViewSelectedSpace();
    }
    else{
      selectedBox = null;
    }
  }
}

public function getOverallConsumption() {
  var url = "http://127.0.0.1:3000/overall-consumption";
  var www : WWW = new WWW (url);
  yield www;

  if(www.error) {
    print("There was an error: " + www.error);
  }else{

    var aux : String[] = www.text.Split("["[0]);
    aux = aux[1].Split("]"[0]);
    aux = aux[0].Split("}"[0]);

    measures = new Measure[6];
    var measure : String = aux[0];
    var object : GameObject;

    for(var i = 0; i < 6; i++){
      if(i > 0)
        measure = aux[i].Substring(1);

      measures[i] = Measure.CreateFromJSON(measure + "}");

      object = model.transform.Find("Boxes").transform.GetChild(i).gameObject;

      if(measures[i].value >= 50)
        object.GetComponent.<Renderer>().material.color  = Color.red;
      else if(measures[i].value >= 30)
        object.GetComponent.<Renderer>().material.color  = Color.yellow;
        else
          object.GetComponent.<Renderer>().material.color  = Color.green;
    }
  }
}

function clearSelectedRoom () {
  if(selectedSpace != null)
    selectedSpace.getSpace().GetComponent.<Renderer>().material = oldMaterial;

  selectedSpace = null;
}

function overallViewSelectedSpace() {
  if(selectedBox != null)
	 Application.ExternalCall("overallViewSelectedSpace", selectedBox);
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
  if(selectedSpace != null){
    selectedSpace.getSpace().GetComponent.<Renderer>().material = oldMaterial;
  }

	var result : FacilitySpace = facilityMonitor.searchRoom(space);
	var aux = new Vector3(0,3,0);
	if(result != null){
		cam.transform.LookAt(result.getSpace().transform);
    result.getSpace().GetComponent.<Renderer>().material = highlightMaterial;
    selectedSpace = result;
		return true;
	}
	else{
		print("Room not found");
		return false;
	}
}

function toggleLevel(levelName : String){
	var children = model.transform.childCount;
  for (var i = 0; i < children; ++i){
    if(model.transform.GetChild(i).name.Equals(levelName)){
   		model.transform.GetChild(i).gameObject.SetActive(!model.transform.GetChild(i).gameObject.activeSelf);
   		break;
    }
  };
}

function toggleBoxesView() {
  var children = model.transform.childCount;
  var value  = model.transform.GetChild(1).gameObject.activeSelf;

  boxViewActivated = !boxViewActivated;
  //if(boxViewActivated) //when real-time
    //getOverallConsumption();

  for (var i = 0; i < children; ++i){
    if(model.transform.GetChild(i).gameObject.name.Equals("Boxes")){
      model.transform.GetChild(i).gameObject.SetActive(!value);
    } else {
      model.transform.GetChild(i).gameObject.SetActive(value);
    }
  }
}

function highlightObjects() {
  facilityMonitor.highlightObjects();
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
