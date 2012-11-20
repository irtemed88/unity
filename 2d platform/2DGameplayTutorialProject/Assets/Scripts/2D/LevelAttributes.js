// Size of the level
var bounds : Rect;
var fallOutBuffer = 5.0;
var colliderThickness = 10.0;

// Sea Green For the Win!
private var sceneViewDisplayColor = Color (0.20, 0.74, 0.27, 0.50);

static private var instance : LevelAttributes;

static function GetInstance() {
	if (!instance) {
		instance = FindObjectOfType(LevelAttributes);
		if (!instance)
			Debug.LogError("There needs to be one active LevelAttributes script on a GameObject in your scene.");
	}
	return instance;
}

function OnDisable () {
	instance = null;
}

function OnDrawGizmos () {
	Gizmos.color = sceneViewDisplayColor;
	var lowerLeft = Vector3 (bounds.xMin, bounds.yMax, 0);
	var upperLeft = Vector3 (bounds.xMin, bounds.yMin, 0);
	var lowerRight = Vector3 (bounds.xMax, bounds.yMax, 0);
	var upperRight = Vector3 (bounds.xMax, bounds.yMin, 0);
	
	Gizmos.DrawLine (lowerLeft, upperLeft);
	Gizmos.DrawLine (upperLeft, upperRight);
	Gizmos.DrawLine (upperRight, lowerRight);
	Gizmos.DrawLine (lowerRight, lowerLeft);
}

function Start () {
	createdBoundaries = new GameObject ("Created Boundaries");
	createdBoundaries.transform.parent = transform;
	
	leftBoundary = new GameObject ("Left Boundary");
	leftBoundary.transform.parent = createdBoundaries.transform;
	boxCollider = leftBoundary.AddComponent (BoxCollider);
	boxCollider.size = Vector3 (colliderThickness, bounds.height + colliderThickness * 2.0 + fallOutBuffer, colliderThickness);
	boxCollider.center = Vector3 (bounds.xMin - colliderThickness * 0.5, bounds.y + bounds.height * 0.5 - fallOutBuffer * 0.5, 0.0);
	
	rightBoundary = new GameObject ("Right Boundary");
	rightBoundary.transform.parent = createdBoundaries.transform;
	boxCollider = rightBoundary.AddComponent (BoxCollider);
	boxCollider.size = Vector3 (colliderThickness, bounds.height + colliderThickness * 2.0 + fallOutBuffer, colliderThickness);
	boxCollider.center = Vector3 (bounds.xMax + colliderThickness * 0.5, bounds.y + bounds.height * 0.5 - fallOutBuffer * 0.5, 0.0);
	
	topBoundary = new GameObject ("Top Boundary");
	topBoundary.transform.parent = createdBoundaries.transform;
	boxCollider = topBoundary.AddComponent (BoxCollider);
	boxCollider.size = Vector3 (bounds.width + colliderThickness * 2.0, colliderThickness, colliderThickness);
	boxCollider.center = Vector3 (bounds.x + bounds.width * 0.5, bounds.yMax + colliderThickness * 0.5, 0.0);
	
	bottomBoundary = new GameObject ("Bottom Boundary (Including Fallout Buffer)");
	bottomBoundary.transform.parent = createdBoundaries.transform;
	boxCollider = bottomBoundary.AddComponent (BoxCollider);
	boxCollider.size = Vector3 (bounds.width + colliderThickness * 2.0, colliderThickness, colliderThickness);
	boxCollider.center = Vector3 (bounds.x + bounds.width * 0.5, bounds.yMin - colliderThickness * 0.5 - fallOutBuffer, 0.0);
}
