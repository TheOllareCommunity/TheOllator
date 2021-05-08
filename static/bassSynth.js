/*var env = new Tone.ScaledEnvelope({
		"attack": 0.7,
		"attackCurve": "linear",
		"decay": 0.3,
		"decayCurve": "exponential",
		"release": 0.3,
		"releaseCurve": "exponential",
		"sustain": 1,
		"min": 0,
 	    "max" : 500
 });*/
const vol = new Tone.Volume(-10);


const bass = new Tone.MonoSynth({
    "detune":0,
    "volume":-100,
	oscillator: {
		type: "square16",
		"detune":0
	},
	envelope: {
		"attack": 0,
		"attackCurve": "linear",
		"decay": 0.3,
		"decayCurve": "exponential",
		"release": 0.8,
		"releaseCurve": "exponential",
		"sustain": 0.5
	},
	filter: {
		"Q": 5,
		"detune": 0,
		"frequency": 350,
		"gain": 0,
		"rolloff": -12,
		"type": "lowpass"
	},
});

bass.connect(vol);
connectBass(vol);

//env.connect(bass.detune);


/*bass.set({
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
*/
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
        			note.velocity
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