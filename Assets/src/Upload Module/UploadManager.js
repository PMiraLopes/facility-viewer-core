#pragma strict

var activefacility : GameObject;

function Start () {
	Debug.Log("Importing the facility");
	activefacility = Instantiate(Resources.Load("Models/Facilities/home/building"));
}

function Update () {

}