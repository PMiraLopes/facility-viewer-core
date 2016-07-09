#pragma strict

//Value for speed when camera moves in the axis
var turnSpeed = 6.0f;
//Value for speed when the camera is panning
var panSpeed = 2.0f;
//Value for speed when the camera is zooming
var zoomSpeed = 2.0f;

var mouseOrigin : Vector3;

var isPanning;

var isRotating;

var isZooming;

var cam : Camera;

var canPan = true;

var pos : Vector3;

var move : Vector3;

function isAbleToPan(){
	return canPan;
}

function setPan(state){
	canPan = state;
}

function Update(){
	if (Input.GetMouseButtonDown (0)) {
		// Get mouse origin
		mouseOrigin = Input.mousePosition;
		isRotating = true;
	}
	
	// Get the right mouse button
	if (Input.GetMouseButtonDown (1) && canPan) {
		// Get mouse origin
		mouseOrigin = Input.mousePosition;
		isPanning = true;
	}
	
	// Get the middle mouse button
	if (Input.GetMouseButtonDown (2)) {
		// Get mouse origin
		mouseOrigin = Input.mousePosition;
		isZooming = true;
	}
	
		// Disable movements on button release
	if (!Input.GetMouseButton (0))
		isRotating = false;
	if (!Input.GetMouseButton (1))
		isPanning = false;
	if (!Input.GetMouseButton (2))
		isZooming = false;
		
		// Rotate camera along X and Y axis   -> ALTERADO ROTATE ROTATEAROUND
	if (isRotating == true) {
		pos = cam.ScreenToViewportPoint (Input.mousePosition - mouseOrigin);
		transform.RotateAround (transform.position, transform.right, -pos.y * turnSpeed);
		transform.RotateAround (transform.position, Vector3.up, pos.x * turnSpeed);
	} 
	// Move the camera on it's XY plane
	if (isPanning == true) {
		pos = cam.ScreenToViewportPoint (Input.mousePosition - mouseOrigin);
		move = new Vector3 (pos.x * panSpeed, pos.y * panSpeed, 0);
		transform.Translate (move, Space.Self);
	} 

	// Move the camera linearly along Z axis
	if (isZooming == true) {
		pos = cam.ScreenToViewportPoint (Input.mousePosition - mouseOrigin);
		move = pos.y * zoomSpeed * transform.forward; 
		transform.Translate (move, Space.World);
	}

	//to move the camera whith the wheel or the W A S D buttons
	transform.position += transform.forward * (zoomSpeed * 5) * Input.GetAxis ("Vertical") * Time.deltaTime;
	transform.position += transform.right * (panSpeed * 5) * Input.GetAxis ("Horizontal") * Time.deltaTime;

	transform.Translate (Vector3.forward * Input.GetAxis ("Mouse ScrollWheel") * zoomSpeed * 100 * Time.deltaTime);

}