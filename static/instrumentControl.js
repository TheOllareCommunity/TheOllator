

function playMIDI(currentMidi, instrument, now) {
	if (currentMidi) {

        currentMidi.tracks.forEach((track) => {
        	//schedule all of the events
        	track.notes.forEach((note) => {
        	    if(instrument.name === "MonoSynth"){
        		    Tone.Transport.scheduleOnce(() => {bassFreqEnv.baseFrequency = note.name}, note.time + now)
        		    bassFreqEnv.triggerAttackRelease(
        			    note.duration,
        			    note.time + now,
        			    note.velocity
        		    );

        		}
				if(instrument.name === "sampler"){
					instrument.triggerAttackRelease(
						note.name,
						note.duration,
						note.time + now,
						note.velocity
					);
				}
        		else{
					note.midi = setMode(currentMode, "C", note.midi);
					instrument.triggerAttackRelease(
						note.name,
						note.duration,
						note.time + now,
						note.velocity
					);
				}
        	});
        });
	}
}

function mute(instrument){
    instrument.volume.value = -128;
}

function unmute(instrument){
    instrument.volume.value = 0;
}