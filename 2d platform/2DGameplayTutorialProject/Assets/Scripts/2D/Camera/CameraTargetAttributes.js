// This script goes on any GameObject in your scene that you will track with the camera.
// It'll help customize the camera tracking to your specific object to polish your game.

// See the GetGoalPosition () function in CameraScrolling.js for an explanation of these variables.
var heightOffset = 0.0;
var distanceModifier = 1.0;
var velocityLookAhead = 0.15;
var maxLookAhead = Vector2 (3.0, 3.0);
