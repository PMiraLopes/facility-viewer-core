#pragma strict

public class FacilitySpace{

	private var name : String;
	private var space : GameObject;

	public function FacilitySpace(name : String, space : GameObject){
		this.name = name;
		this.space = space;
	}
	
	public function getName(){
		return name;
	}
	
	public function getSpace(){
		return space;
	}
}