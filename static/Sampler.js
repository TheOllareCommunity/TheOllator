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



		function parseFile(file) {
			//read the file
			const reader = new FileReader();
			reader.onload = function (e) {
				const midi = new Midi(e.target.result);
				currentMidi = midi;
			};

            const blob = new Blob([// JSON --- FROM SERVER    , {type : 'application/json'});
			//file= new File([],"C:\Users\daveg\OneDrive\Documenti\GitHub\TheOllator\Beats\BeatJ_drums.mid");
			//console.log(reader.readAsArrayBuffer(file));
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

//export { play_test_sampler as play_test_sampler};