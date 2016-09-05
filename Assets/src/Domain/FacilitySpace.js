#pragma strict

public class FacilitySpace extends System.Object {

	public var spaceName : String;
	private var space : GameObject;
	public var objects : String[];

	public function FacilitySpace(spaceName : String, space : GameObject) {
		this.spaceName = spaceName;
		this.space = space;
		this.objects = new String[space.transform.childCount];

		for(var i = 0; i < space.transform.childCount; i++)
			this.objects[i] = space.transform.GetChild(i).name;
	}

	public function getSpace() {
		return this.space;
	}

	public function getObjects() {
		return this.objects;
	}

	public function toJson() {
		return JsonUtility.ToJson(this);
	}
}
