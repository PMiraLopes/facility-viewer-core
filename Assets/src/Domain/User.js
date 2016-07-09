#pragma strict

public class User{

	private var id : int;
	private var firstName : String;
	private var lastName : String;
	private var email : String;
	private var facilities = new Array();
	
	public function User(id : int, firstName : String, lastName : String, email : String){
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
	
	public function getId(){
		return id;
	}
	
	public function getFirstName(){
		return firstName;
	}
	
	public function getLastName(){
		return lastName;
	}
	
	public function getEmail(){
		return email;
	}
	
	public function addfacility(facility : Facility){
		facilities.Push(facility);
	}
	
	public function removeFacility(id: int){
		for(var i = 0; i < facilities.length; i++){
			var fac : Facility = facilities[i];
			if(fac.getId() == id){
				facilities.RemoveAt(i);
				return;
			}
		}
	}
	
	public function setFirstName(name : String){
		this.firstName = name;
	}
	
	public function setLastName(name : String){
		this.lastName = name;
	}
}