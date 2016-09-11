#pragma strict

public class FacilitySpace extends System.Object {

	public var spaceName : String;
	private var space : GameObject;
  public var facilityObjects : FacilityObject[];
  public var highlighted : boolean;

	public function FacilitySpace(spaceName : String, space : GameObject) {
		this.spaceName = spaceName;
		this.space = space;
    this.facilityObjects = new FacilityObject[space.transform.childCount];
    this.highlighted = false;

		for(var i = 0; i < space.transform.childCount; i++){
      this.facilityObjects[i] = new FacilityObject(space.transform.GetChild(i).gameObject);
    }
	}

	public function getSpace() {
		return this.space;
	}

	public function getObjects() {
		return this.facilityObjects;
	}

	public function toJson() {
		return JsonUtility.ToJson(this);
	}

  public function highlightObjects(){
    var count = this.space.transform.childCount;
    for(var i = 0; i < count; i++){
      if(!this.highlighted){
        facilityObjects[i].highlightObject();
      }else{
        facilityObjects[i].turnOffHighlight();
      }
    }
    this.highlighted = !this.highlighted;
  }
}
