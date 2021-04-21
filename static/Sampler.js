const sampler = new Tone.Sampler({
			urls: {
				A0: "gong_1.mp3",
				C1: "gong_1.mp3",
				"D#1": "gong_1.mp3",
				"F#1": "gong_1.mp3",
				A1: "gong_1.mp3",
				C2: "gong_1.mp3",
				"D#2": "gong_1.mp3",
				"F#2": "gong_1.mp3",
				A2: "gong_1.mp3",
				C3: "gong_1.mp3",
				"D#3": "gong_1.mp3",
				"F#3": "gong_1.mp3",
				A3: "gong_1.mp3",
				C4: "gong_1.mp3",
				"D#4": "gong_1.mp3",
				"F#4": "gong_1.mp3",
				A4: "gong_1.mp3",
				C5: "gong_1.mp3",
				"D#5": "gong_1.mp3",
				"F#5": "gong_1.mp3",
				A5: "gong_1.mp3",
				C6: "gong_1.mp3",
				"D#6": "gong_1.mp3",
				"F#6": "gong_1.mp3",
				A6: "gong_1.mp3",
				C7: "gong_1.mp3",
				"D#7": "gong_1.mp3",
				"F#7": "gong_1.mp3",
				A7: "gong_1.mp3",
				C8: "gong_1.mp3"
			},
			release: 1,
			baseUrl: "https://tonejs.github.io/audio/berklee/"
		}).toDestination();


		let currentMidi = null;

		function parseFile(file) {
			//read the file
			const reader = new FileReader();
			reader.onload = function (e) {
				const midi = new Midi(e.target.result);
				currentMidi = midi;
			};
			reader.readAsArrayBuffer(file);
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