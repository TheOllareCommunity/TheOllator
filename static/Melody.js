const fmSynth = new Tone.FMSynth().toDestination();

fmSynth.set({
	"volume": 0,
	"envelope": {
		"attack": 0.002,
		"attackCurve": "exponential",
		"decay": 0.1,
		"decayCurve": "linear",
		"release": 0.005,
		"releaseCurve": "exponential",
		"sustain": 0.1,
	},
	"oscillator": {
		"type": "sine4"
	}
});

fmSynth.sync();


function play_MIDI(currentMidi) {
	if (currentMidi) {
        const now = Tone.now();
        currentMidi.tracks.forEach((track) => {
        	//schedule all of the events
        	track.notes.forEach((note) => {
        		fmSynth.triggerAttackRelease(
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
    fmSynth.volume.value = -128;
}

function unmute(){
    fmSynth.volume.value = 0;
}


export { play_MIDI as play_test_melody, mute as mute_melody, unmute as unmute_melody };