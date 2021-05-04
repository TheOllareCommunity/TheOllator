const poly = new Tone.PolySynth().toDestination();
poly.sync();


function play_MIDI(currentMidi) {
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

export { play_MIDI as play_test_poly };