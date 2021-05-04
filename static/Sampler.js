let timeMultiplier=1;


const sampler = new Tone.Sampler({
			urls: {
				C2: "kick.mp3",
				D2: "snare.mp3",
				E2: "hihat.mp3",
			},
			release: 1,
			baseUrl: "https://tonejs.github.io/audio/drum-samples/CR78/"

		}).toDestination();



        async function play_MIDI(currentMidi) {

				    if (currentMidi) {

					    const now = Tone.now();
					    currentMidi.tracks.forEach((track) => {

					    	//schedule all of the events
					    	track.notes.forEach((note) => {
                                if (note.time*timeMultiplier
					    		sampler.triggerAttackRelease(
					    			note.name,
					    			note.duration * timeMultiplier,
					    			note.time * timeMultiplier + now,
					    			note.velocity
					    		);
					    	});
					    });
				    }

		}

function setMultiplier(mult){
    timeMultiplier=mult;
    sampler.dispose();
    sampler.play_MIDI();
}



export { play_MIDI as play_test_sampler,setMultiplier as set_sampler_multiplier };
