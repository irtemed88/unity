// This script must be attached to a game object to tell Unity where the Moving Platforms should move to.

// We'll draw a gizmo in the scene view, so it can be found....
function OnDrawGizmos() {
	Gizmos.DrawIcon(transform.position, "platformIcon.tif");
}
