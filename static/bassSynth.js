const bass = new Tone.Synth().toDestination();
bass.oscillator.type = "sawtooth"
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

export { play_MIDI as play_test_bass };