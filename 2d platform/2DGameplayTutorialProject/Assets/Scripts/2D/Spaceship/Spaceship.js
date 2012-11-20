//What is our forward direction?  Our spaceship moves in the positive y direction.
var forwardDirection : Vector3 = Vector3 (0.0, 1.0, 0.0);

// Below we create two helper classes, MovementSettings and SpecialEffects
// Although the helper classes are not necessary, it makes for nice clean code and usage.

class MovementSettings {
	// What is the maximum speed of this movement?
	var maxSpeed : float;
	
	// What's the acceleration in the positive and negative directions associated with this movement?
	var positiveAcceleration : float;
	var negativeAcceleration : float;
	
	// How much drag should we apply when there isn't input for this movement?
	var dragWhileCoasting : float;
	
	// How much drag should we apply to slow down the movement for speeds above maxSpeed?
	var dragWhileBeyondMaxSpeed : float;
	
	// When neither of the above drag factors are in play, how much drag should there normally be?  (Usually very small.)
	var dragWhileAcceleratingNormally : float;
	
	// This function determines which drag variable to use and returns one.
	function ComputeDrag (input : float, velocity : Vector3) {
		//Is the input not zero (the 0.01 allows for some error since we're working with floats and they aren't completely precise)
		if (Mathf.Abs (input) > 0.01) {
			// Are we greater or less than our max speed? Then return the appropriate drag.
			if (velocity.magnitude > maxSpeed)
				return dragWhileBeyondMaxSpeed;
			else
				return dragWhileAcceleratingNormally;
		} else
			//If the input is zero, use dragWhileCoasting
			return dragWhileCoasting;
	}
}


class SpecialEffects {
	// There are four possible special effects that can be assigned.
	var positiveThrustEffect : GameObject;
	var negativeThrustEffect : GameObject;
	var positiveTurnEffect : GameObject;
	var negativeTurnEffect : GameObject;
	
	// How loud should collision sounds be? This is used in the OnCollisionEnter () function.
	var collisionVolume = 0.01;
}

// We create two instances using our MovementSettings helper class.
// One will be for translational (position) movement, the other for rotational.
var positionalMovement : MovementSettings;
var rotationalMovement : MovementSettings;

// We create an instance using our SpecialEffects helper class.
var specialEffects : SpecialEffects;

// Can the user control the spaceship currently?  This will be toggled by another script that also toggles what the camera should track.
var canControl = true;

//FixedUpdate () is advantageous over Update () for working with rigidbody physics.
function FixedUpdate () {
	// Retrieve input.  Note the use of GetAxisRaw (), which in this case helps responsiveness of the controls.
	// GetAxisRaw () bypasses Unity's builtin control smoothing.
	thrust = Input.GetAxisRaw ("Vertical");
	turn = Input.GetAxisRaw ("Horizontal");
	
	if (!canControl) {
		thrust = 0.0;
		turn = 0.0;
	}
	
	//Use the MovementSettings class to determine which drag constant should be used for the positional movement.
	//Remember the MovementSettings class is a helper class we defined ourselves. See the top of this script.
	rigidbody.drag = positionalMovement.ComputeDrag (thrust, rigidbody.velocity);

	//Then determine which drag constant should be used for the angular movement.
	rigidbody.angularDrag = rotationalMovement.ComputeDrag (turn, rigidbody.angularVelocity);
	
	//Determines which direction the positional and rotational motion is occurring, and then modifies thrust/turn with the given accelerations. 
	//If you are not familiar with the ?: conditional, it is basically shorthand for an "if..else" statement pair.  See http://www.javascriptkit.com/jsref/conditionals.shtml
	thrust *= (thrust > 0.0) ? positionalMovement.positiveAcceleration : positionalMovement.negativeAcceleration;
	turn *= (turn > 0.0) ? rotationalMovement.positiveAcceleration : rotationalMovement.negativeAcceleration;
	
	// Add torque and force to the rigidbody.  Torque will rotate the body and force will move it.
	// Always modify your forces by Time.deltaTime in FixedUpdate (), so if you ever need to change your Time.fixedTime setting,
	// your setup won't break.
 	rigidbody.AddRelativeTorque (Vector3 (0.0, 0.0, -1.0) * turn * Time.deltaTime, ForceMode.VelocityChange);
	rigidbody.AddRelativeForce (forwardDirection * thrust * Time.deltaTime, ForceMode.VelocityChange);
}

// This function allows us to SendMessage to an object to set whether or not the player can control it
function SetControllable (controllable : boolean) {
	canControl = controllable;
}

// The Update () function only serves to provide special effects in this case.
function Update () {
	//Collecting appropriate input.
	thrust = Input.GetAxisRaw ("Vertical");
	turn = Input.GetAxisRaw ("Horizontal");
	
	if (!canControl) {
		thrust = 0.0;
		turn = 0.0;
	}
	
	// If the thrust effect slots aren't null in the inspector, send a message.
	// The message will be received by the component SpecialEffectHandler
	// If the boolean statement is true, (e.g. (thrust > 0.01)) then the special effects will be enabled.
	if (specialEffects.positiveThrustEffect)
		specialEffects.positiveThrustEffect.SendMessage ("SetSpecialEffectActive", (thrust > 0.01));

	if (specialEffects.negativeThrustEffect)
		specialEffects.negativeThrustEffect.SendMessage ("SetSpecialEffectActive", (thrust < -0.01));

	if (specialEffects.positiveTurnEffect)
		specialEffects.positiveTurnEffect.SendMessage ("SetSpecialEffectActive", (turn > 0.01));

	if (specialEffects.negativeTurnEffect)
		specialEffects.negativeTurnEffect.SendMessage ("SetSpecialEffectActive", (turn < -0.01));	
}

// The OnCollisionEnter () function only serves to provide special effects in this case.
function OnCollisionEnter (collision : Collision) {
	// Get the component "CollisionSoundEffect" of the object we collided with.
	// The platforms in this tutorial have a CollisionSoundEffect component.
	var collisionSoundEffect : CollisionSoundEffect = collision.gameObject.GetComponent (CollisionSoundEffect);

	// If collisionSoundEffect isn't null, get the audio clip, set the volume, and play.
	if (collisionSoundEffect) {
		audio.clip = collisionSoundEffect.audioClip;
		// By multiplying by collision.relativeVelocity.sqrMagnitude, the sound will be louder for faster impacts.
		audio.volume = collisionSoundEffect.volumeModifier * collision.relativeVelocity.sqrMagnitude * specialEffects.collisionVolume;
		audio.Play ();		
	}
}

// The Reset () function is called by Unity when you first add a script, and when you choose Reset on the
// gear popup menu for the script.
function Reset () {
	// Set some nice default values for our MovementSettings.
	// Of course, it is always best to tweak these for your specific game.
	positionalMovement.maxSpeed = 3.0;
	positionalMovement.dragWhileCoasting = 3.0;
	positionalMovement.dragWhileBeyondMaxSpeed = 4.0;
	positionalMovement.dragWhileAcceleratingNormally = 0.01;
	positionalMovement.positiveAcceleration = 50.0;
	
	// By default, we don't have reverse thrusters.
	positionalMovement.negativeAcceleration = 0.0;
	
	rotationalMovement.maxSpeed = 2.0;
	rotationalMovement.dragWhileCoasting = 32.0;
	rotationalMovement.dragWhileBeyondMaxSpeed = 16.0;
	rotationalMovement.dragWhileAcceleratingNormally = 0.1;

	// For rotation, acceleration is usually the same in both directions.
	// It could make for interesting unique gameplay if it were significantly
	// different, however!
	rotationalMovement.positiveAcceleration = 50.0;
	rotationalMovement.negativeAcceleration = 50.0;
}

// In order for this script to work, the object its applied to must have a Rigidbody and AudioSource component.
// This tells Unity to always have the components when this script is attached.
@script RequireComponent (Rigidbody, AudioSource)
