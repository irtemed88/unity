// Small helper script to turn off a particle emitter after a given delay

var delay = 0.1;	// The pause to take. 

// We start out by waiting for a little while
yield WaitForSeconds(delay);

// Then we turn of the particle emitter
particleEmitter.emit = false;
