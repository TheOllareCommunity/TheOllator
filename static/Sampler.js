const sampler = new Tone.Sampler({
			urls: {
				C2: "kick.mp3",
				D2: "snare.mp3",
				E2: "hihat.mp3",
			},
			release: 1,
			baseUrl: "https://tonejs.github.io/audio/drum-samples/CR78/"

		}).toDestination();


		let currentMidi = null;



		async function parseFile(file) {
			//read the file
			const reader = new FileReader();
			reader.onload = function (e) {
				const midi = new Midi(e.target.result);
				currentMidi = midi;
			};
           url = 'http://127.0.0.1:8080//static/midi.mid'
           let blob = await fetch(url).then(response => response.blob())
           reader.readAsArrayBuffer(blob);
		}

        function play_MIDI() {

				    if (currentMidi) {
					    const now = Tone.now() + 0.5;
					    currentMidi.tracks.forEach((track) => {


					    	//schedule all of the events
					    	track.notes.forEach((note) => {
					    		sampler.triggerAttackRelease(
					    			note.name,
					    			note.duration,
					    			note.time + now,
					    			note.velocity
					    		);
					    	});
					    });
				    }

		}

		function play_test_sampler(midi) {
		    parseFile(midi);
		    play_MIDI();
		}

export { play_test_sampler as play_test_sampler};