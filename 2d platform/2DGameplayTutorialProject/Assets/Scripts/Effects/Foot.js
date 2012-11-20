var baseFootAudioVolume = 1.0;
var soundEffectPitchRandomness = 0.05;

function OnTriggerEnter (other : Collider) {
	var collisionParticleEffect : CollisionParticleEffect = other.GetComponent(CollisionParticleEffect);
	
	if (collisionParticleEffect) {
		Instantiate(collisionParticleEffect.effect, transform.position, transform.rotation);
	}
	
	var collisionSoundEffect : CollisionSoundEffect = other.GetComponent(CollisionSoundEffect);

	if (collisionSoundEffect) {
		audio.clip = collisionSoundEffect.audioClip;
		audio.volume = collisionSoundEffect.volumeModifier * baseFootAudioVolume;
		audio.pitch = Random.Range(1.0 - soundEffectPitchRandomness, 1.0 + soundEffectPitchRandomness);
		audio.Play();		
	}
}

function Reset() {
	rigidbody.isKinematic = true;
	collider.isTrigger = true;
}

@script RequireComponent(AudioSource, SphereCollider, Rigidbody)
