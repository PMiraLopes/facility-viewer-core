#pragma strict
import System.Collections.Generic;
public class Facility {

	public var facilityName : String;
	private var model : GameObject;
	public var id : int;
	private var measures = new Array();
	private var spaces = new Dictionary.<String, FacilitySpace>();

	public function Facility(id: int, facilityName : String, model : GameObject) {
		this.id = id;
		this.facilityName = facilityName;
		this.model = model;
	}

	public function getfacilityName() {
		return this.facilityName;
	}

	public function getModel() {
		return this.model;
	}

	public function getId() {
		return this.id;
	}

	public function getSpaces() {
		return this.spaces;
	}

	public function addMeasure(m : Measure) {
		measures.Push(m);
	}

	public function addSpace(s : FacilitySpace) {
		spaces.Add(s.spaceName,s);
	}

	public function findRoom(name : String) {
		for(var spaceName in spaces.Keys) {
			if(spaceName.ToUpper().Equals(name.ToUpper()))
				return spaces[name];
		}
		return null;
	}

  public function highlightObjects() {
		for(var spaceName in spaces.Keys) {
				spaces[spaceName].highlightObjects();
		}
	}

	public function getSpacesNames() {
		return this.spaces.Keys;
	}

	public function toJson() {
		return JsonUtility.ToJson(this);
	}
}
