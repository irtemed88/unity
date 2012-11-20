// We will turn on our special effects when the platform is raising, but if it is moving side
// to side, how fast does it have to be moving to cause our special effects to turn on?
var horizontalSpeedToEnableEmitters = 1.0;

// A true/false (boolean) variable to keep track of whether or not our special effects are
// currently turned on.
private var areEmittersOn : boolean;

//  We are going to use these later to calculate the current velocity.
private var oldPosition : Vector3;
private var currentVelocity : Vector3;

function Start() {
	// Grabs the initial position of the platform.
	oldPosition = transform.position;
}

function Update() {
 	// Remember if our emitters were on, then we'll see if they are currently on.
	wereEmittersOn = areEmittersOn;
	
	// The emitters are on if the vertical (y) velocity is greater than 0 (positive), or if the
	// horizontal velocity in either direction (positive or negative speed) is greater than
	// our horizontalSpeedToEnableEmitters threshold.
	areEmittersOn = (currentVelocity.y > 0) || (Mathf.Abs(currentVelocity.x) > horizontalSpeedToEnableEmitters);
	
	// We only have to update the particle emitters if the state of them has changed.
	// This saves needless computation.
	if (wereEmittersOn != areEmittersOn) {
		// Get every child ParticleEmitter in the moving platform.
		for (var emitter in GetComponentsInChildren(ParticleEmitter)) {
			//Simply set them to emit or not emit depending on the value of areEmittersOn
			emitter.emit = areEmittersOn;
		}
	}
}


function LateUpdate () {
	currentVelocity = transform.position - oldPosition;
	oldPosition = transform.position;
}


// This line tells Unity to nicely place this script in a submenu of the Component menu.
@script AddComponentMenu("2D Platformer/Moving Platform/Moving Platform Effects")
