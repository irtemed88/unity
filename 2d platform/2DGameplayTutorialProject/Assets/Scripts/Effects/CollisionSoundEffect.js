// Small script to hold a reference to an audioclip to play when the player hits me.

// This script is attached to game object making up your level. 
// The "Foot" script (which is attached to the player) looks for this script on whatever it touches.
// If it finds it, then it will play the sound when the foot comes in contact

var audioClip : AudioClip;
var volumeModifier = 1.0;
