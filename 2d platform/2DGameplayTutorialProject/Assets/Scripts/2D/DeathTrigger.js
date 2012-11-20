
// Whoever enters the DeathTrigger gets an OnDeath message sent to them.
// They don't have to react to it.
function OnTriggerEnter (other : Collider) {
	other.gameObject.SendMessage ("OnDeath", SendMessageOptions.DontRequireReceiver);
}

// Helper function: Draw an icon in the sceneview so this object gets easier to pick
function OnDrawGizmos () {
	Gizmos.DrawIcon (transform.position, "Skull And Crossbones Icon.tif");
}
