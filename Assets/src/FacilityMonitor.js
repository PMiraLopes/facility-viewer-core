#pragma strict
import System.Collections.Generic;

public class FacilityMonitor{
	var facilityModel : GameObject;
	var environment;
	var buildingName : String;
	var facility : Facility;
	var spaceObject : GameObject;

	public function FacilityMonitor () {
	}

	public function FacilityMonitor (model : GameObject) {
		facilityModel = model;
		init();
	}

	function init(){
		var floor : Transform;
		var room : Transform;
		facility = new Facility(0, facilityModel.name, facilityModel);

		for(var i = 0; i < facilityModel.transform.childCount; i++){
			floor = facilityModel.transform.GetChild(i);

			if(!floor.name.Equals("Roof") &&
					floor.childCount > 0 &&
					floor.Find("Rooms") != null
			){
				for(var j = 0; j < floor.Find("Rooms").childCount; j++){
					room = floor.Find("Rooms").transform.GetChild(j);
					facility.addSpace(new FacilitySpace(room.name, room.gameObject));
				}
			}
		}
	}

	function getModel(){
		return this.facilityModel;
	}

	function getSpaces(){
		return facility.getSpaces();
	}

	function searchRoom(name : String){
		return facility.findRoom(name);
	}

	function getSpacesNames(){
		return facility.getSpacesNames();
	}

  function highlightObjects(){
		facility.highlightObjects();
	}

	function roomInformations(name : String) {
		var room : FacilitySpace = facility.findRoom(name);
		var result  = room !== null ? room.toJson() : '{}';
		return result;
	}

	function spacesInformations() {
		var result = new Array();
		for(var space in facility.getSpaces().Values){
			result.Push(space.toJson());
		}
		return result;
	}

}
