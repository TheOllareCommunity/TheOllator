const vol = new Tone.Volume(-30).toDestination();

const fmSynth = new Tone.Synth();

fmSynth.set({
    "harmonicity": 3.01,
    "modulationIndex": 14,
    "oscillator": {
        "type": "fatsine4"
    },
    "envelope": {
        "attack": 0.002,
        "decay": 0.3,
        "sustain": 0.1,
        "release": 1.2
    },
    "modulation" : {
        "type": "square"
    },
    "modulationEnvelope" : {
        "attack": 0.01,
        "decay": 0.5,
        "sustain": 0.2,
        "release": 0.1
    }
})
fmSynth.connect(vol);

connectMelody(fmSynth);

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
        			note.velocity/2
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