// Helper script to toggle the emit property of many particle systems.
// It's attached to the root Game Object of a hierarcy. Then calling SetSpecialEffectActive will
// enable or disable all particle systems in transform children.


// helper variable to track if the particles are already on.
private var effectActive : boolean;

function SetSpecialEffectActive (on : boolean) {

	// Only do something if we're actually changing the effects being on or off
	if (on != effectActive) {
		
		// Find a list of all ParticleEmitters that are in this object's transform children
		var childEmitters = GetComponentsInChildren(ParticleEmitter);
		
		// Go over all them
		for (var emitter in childEmitters) {
			// turn them on or off
			emitter.emit = on;
		}
		
		var childSystems = GetComponentsInChildren(ParticleSystem);
		for (var emitter in childSystems) {
			emitter.emit = true;
		}
		
		effectActive = on;
	}
}
