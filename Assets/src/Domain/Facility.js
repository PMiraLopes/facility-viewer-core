#pragma strict
import System.Collections.Generic;

public class Facility{

	private var name : String;
	private var model : GameObject;
	private var id : int;
	private var measures = new Array();
	private var spaces = new Dictionary.<String, FacilitySpace>();
	
	public function Facility(id: int, name : String, model : GameObject){
		this.id = id;
		this.name = name;
		this.model = model;
	}
	
	public function getName(){
		return name;
	}
	
	public function getModel(){
		return model;
	}
	
	public function getId(){
		return id;
	}
	
	public function setName(name : String){
		this.name = name;
	}
	
	public function addMeasure(m : Measure){
		measures.Push(m);
	}
	
	public function addSpace(s : FacilitySpace){
		spaces.Add(s.getName(),s);
	}
	
	public function getSpaces(){
		return spaces;
	}

	public function findRoom(name : String){
		for(var spaceName in spaces.Keys){
			if(spaceName.ToUpper().Equals(name.ToUpper()))
				return spaces[name];
		}
		return null;
	}

	public function getSpacesNames(){
		return spaces.Keys;
	}
}