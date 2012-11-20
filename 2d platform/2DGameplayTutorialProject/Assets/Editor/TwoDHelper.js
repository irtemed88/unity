
// Make a menu item that move stuff on to the 2D plane
@MenuItem ("2D/Move Onto 2D Plane ^2")
static function MoveOnto2DPlane () {
	// Go over all transforms in Unity Editor's selection
	for (var transform in Selection.transforms) {
		transform.position.z = 0;
	}
}

// This function is called to determine if the function can be executed.
@MenuItem ("2D/Move Onto 2D Plane ^2", true)
static function ValidateMoveOnto2DPlane () {
	// we only return true if we have a transform in the selection.
	return (Selection.activeTransform != null);
}

@MenuItem ("2D/Make Selection 2D Rigidbody")
static function MakeSelection2DRigidbody () {
	// Start by moving all game objects onto the playing field plane
	MoveOnto2DPlane ();
	
	// Go over all transforms in selection.
	for (var transform in Selection.transforms) {
		// Make sure that the transform has a rigidbody.
		var rigidbody : Rigidbody = transform.GetComponent (Rigidbody);
		if (!rigidbody)
			transform.gameObject.AddComponent (Rigidbody);
		
		// Make sure that here is also a ConfigurableJoint
		var configurableJoint : ConfigurableJoint = transform.GetComponent (ConfigurableJoint);	
		if (!configurableJoint)
			configurableJoint = transform.gameObject.AddComponent (ConfigurableJoint);
		
		// Make the joint force the object to only move in the XY plane and only rotate around Z
		configurableJoint.xMotion = ConfigurableJointMotion.Free;
		configurableJoint.yMotion = ConfigurableJointMotion.Free;
		configurableJoint.zMotion = ConfigurableJointMotion.Locked;
		configurableJoint.angularXMotion = ConfigurableJointMotion.Locked;
		configurableJoint.angularYMotion = ConfigurableJointMotion.Locked;
		configurableJoint.angularZMotion = ConfigurableJointMotion.Free;
	}	
}

// We can only execute the above menu command if there is a transform in the selection
@MenuItem ("2D/Make Selection 2D Rigidbody", true)
static function ValidateMakeSelection2DRigidbody () {
	return (Selection.activeTransform != null);
}
