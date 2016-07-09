#pragma strict
import System.Collections.Generic;

public class FacilityMonitor{
	var facilityModel : GameObject; 
	var environment;
	var buildingName : String;
	var activeFacility : Facility;
	var spaceObject : GameObject;

	public function FacilityMonitor () {
	}

	public function FacilityMonitor (model : GameObject) {
		facilityModel = model;
		init();
		//spaceObject = GameObject.Find("Spaces");

		//activeFacility = new Facility(0, facilityModel.name, facilityModel, null);

		//for(var i = 0; i < spaceObject.transform.childCount; i++){
		//	activeFacility.addSpace(new FacilitySpace(spaceObject.transform.GetChild(i).name, spaceObject.transform.GetChild(i).gameObject));
		//}
	}

	function init(){
		var child : Transform;
		activeFacility = new Facility(0, facilityModel.name, facilityModel);
		for(var i = 0; i < facilityModel.transform.childCount; i++){
			child = facilityModel.transform.GetChild(i);
			if(!child.name.Equals("Roof")){
				for(var k = 0; k < child.transform.childCount; k++){
					if(child.GetChild(k).name.Contains("Room"))
						activeFacility.addSpace(new FacilitySpace(child.GetChild(k).name, child.GetChild(k).gameObject));
				}
			}
		}
	}

	function Update () {

	}

	function getModel(){
		return this.facilityModel;
	}

	function getSpaces(){
		return activeFacility.getSpaces();
	}

	function searchRoom(name : String){
		return activeFacility.findRoom(name);
	}

	function getSpacesNames(){
		return activeFacility.getSpacesNames();
	}

}
