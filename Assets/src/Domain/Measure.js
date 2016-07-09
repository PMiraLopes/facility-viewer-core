#pragma strict

public class Measure{
	private var id : int;
	private var name : String;
	private var relatedFacility : Facility;
	private var measureValue : float;
	
	public function Measure(id : int, name : String, measureValue : float, relatedFacility : Facility){
		this.id = id;
		this.name = name;
		this.relatedFacility = relatedFacility;
		this.measureValue = measureValue;
	}
}