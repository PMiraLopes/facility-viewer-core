#pragma strict

public class FacilityObject extends System.Object {

	public var name : String;
	private var object : GameObject;
  public var status : boolean;
  public var consumption : int;

	public function FacilityObject(object : GameObject) {
		this.name = object.name;
    this.object = object;
    this.status = true;
    if(this.name.Contains("Luminaria")){
      this.consumption = 1;
    }else{
      this.consumption = 7;
    }
	}

	public function getObject() {
		return this.object;
	}


	public function toJson() {
		return JsonUtility.ToJson(this);
	}

  public function turnOffHighlight() {
    this.object.GetComponent.<Renderer>().material.color  = Color.grey;
  }

  public function highlightObject(){
    if(this.consumption >= 15)
      this.object.GetComponent.<Renderer>().material.color  = Color.red;
    else if(this.consumption >= 7)
      this.object.GetComponent.<Renderer>().material.color  = Color.yellow;
      else
        this.object.GetComponent.<Renderer>().material.color  = Color.green;
  }
}
