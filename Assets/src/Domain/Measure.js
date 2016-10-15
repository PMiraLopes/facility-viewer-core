#pragma strict

public class Measure{
	public var id : String;
	public var type : String;
	public var value : float;

  public static function CreateFromJSON(jsonString: String) {
    return JsonUtility.FromJson.<Measure>(jsonString);
  }

  public function getId(){
    return this.id;
  }

  public function getType(){
    return this.type;
  }

  public function getValue(){
    return this.value;
  }
}
