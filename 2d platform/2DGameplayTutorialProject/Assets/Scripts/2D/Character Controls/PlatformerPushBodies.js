// Script added to a player for it to be able to push rigidbodies around.

// How hard the player can push
var pushPower = 0.5;

// Which layers the player can push
// This is useful to make unpushable rigidbodies
var pushLayers : LayerMask = -1;

// pointer to the player so we can get values from it quickly
private var controller : PlatformerController;

function Start () {
	controller = GetComponent (PlatformerController);
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	var body : Rigidbody = hit.collider.attachedRigidbody;
	// no rigidbody
	if (body == null || body.isKinematic)
		return;

	// Only push rigidbodies in the right layers
	var bodyLayerMask = 1 << body.gameObject.layer;
	if ((bodyLayerMask & pushLayers.value) == 0)
		return;
		
	// We dont want to push objects below us
	if (hit.moveDirection.y < -0.3) 
		return;
	
	// Calculate push direction from move direction, we only push objects to the sides
	// never up and down
	var pushDir = Vector3 (hit.moveDirection.x, 0, hit.moveDirection.z);
	
	// push with move speed but never more than walkspeed
	body.velocity = pushDir * pushPower * Mathf.Min (controller.GetSpeed (), controller.movement.walkSpeed);
}
