const bass = new Tone.PolySynth(Tone.Synth, {
			oscillator: {
				partials: [0, 2, 3, 4],
			}
		}).toDestination();
bass.set({
	"volume": 0,
	"detune": 0,
	"portamento": 0,
	"envelope": {
		"attack": 0.005,
		"attackCurve": "linear",
		"decay": 0.1,
		"decayCurve": "exponential",
		"release": 1,
		"releaseCurve": "exponential",
		"sustain": 0.3
	},
	"oscillator": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "triangle"
	}
});
bass.sync();


function play_MIDI(currentMidi) {
	if (currentMidi) {
        const now = Tone.now();
        currentMidi.tracks.forEach((track) => {
        	//schedule all of the events
        	track.notes.forEach((note) => {
        		bass.triggerAttackRelease(
        			note.name,
        			note.duration,
        			note.time + now,
        			note.velocity,
        			console.log(note.name)
        		);
        	});
        });
	}
}

function mute(){
    bass.volume.value = -128;
}

function unmute(){
    bass.volume.value = 0;
}

export { play_MIDI as play_test_bass, mute as mute_bass, unmute as unmute_bass };