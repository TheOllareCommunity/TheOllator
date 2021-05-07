const vol = new Tone.Volume(-10).toDestination();

const fmSynth = new Tone.Synth();

fmSynth.set({
 "oscillator" : {
        "type" : "pwm",
        "modulationFrequency" : 1
    },
    "filter" : {
        "Q" : 2,
        "rolloff" : -24
    },
    "envelope" : {
        "attack" : 0.025,
        "decay" : 0.3,
        "sustain" : 0.9,
        "release" : 2
    },
    "filterEnvelope" : {
        "attack" : 0.245,
        "decay" : 0.131,
        "sustain" : 0.5,
        "release" : 2,
        "baseFrequency" : 20,
        "octaves" : 7.2,
        "exponent" : 2
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