const vol = new Tone.Volume(-10).toDestination();

const filter = new Tone.Filter(2000, "lowpass");
const poly = new Tone.PolySynth(
{
    oscillator : {
        "type" : "fatsawtooth",
        "count" : 7,
        "spread" : 60
    },
    envelope: {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.5,
        "release": 0.4,
        "attackCurve" : "exponential"
    }
}).connect(filter);

filter.connect(vol);

poly.sync();

function play_MIDI(currentMidi) {
    poly.toDestination();
	if (currentMidi) {
        const now = Tone.now();
        currentMidi.tracks.forEach((track) => {
        	//schedule all of the events
        	track.notes.forEach((note) => {
        		poly.triggerAttackRelease(
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
    poly.volume.value = -128;
}

function unmute(){
    poly.volume.value = 0;
}

export { play_MIDI as play_test_poly, mute as mute_polysynth, unmute as unmute_polysynth };