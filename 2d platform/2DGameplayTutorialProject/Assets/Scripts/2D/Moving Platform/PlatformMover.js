//Edited 10/27/2015 by Brent Dalling of 404ERRORTEAM
//In Edit I introduced a system so that the platform moves only when collided with. This means that the platform will stay in positions until Player is in contact with the platform.
//This project file will also need a way for the platform to "reset" after the player is not in contact for x seconds.

var targetA : GameObject;
var targetB : GameObject;
var platform : GameObject;
var speed : float = 0.1;

function OnCollisionEnter (Collision : platform ) {
	var weight = Mathf.Cos(Time.time * speed * 2 * Mathf.PI) * 0.5 + 0.5;
	transform.position = targetA.transform.position * weight
						+ targetB.transform.position * (1-weight);
}
