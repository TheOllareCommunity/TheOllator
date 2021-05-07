const poly = new Tone.PolySynth();
connectHarmony(poly);
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

function mute(){
    poly.volume.value = -128;
}

function unmute(){
    poly.volume.value = 0;
}

export { play_MIDI as play_test_poly, mute as mute_polysynth, unmute as unmute_polysynth };