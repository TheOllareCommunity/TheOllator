const sampler = new Tone.Sampler({
			urls: {
				A0: "Cymatics - 808 Mob Kick 5 - B.wav",
				C1: "Cymatics - 808 Mob Kick 5 - B.wav",
				"D#1": "Cymatics - 808 Mob Kick 5 - B.wav",
				"F#1": "Cymatics - 808 Mob Kick 5 - B.wav",
				A1: "Cymatics - 808 Mob Kick 5 - B.wav",
				C2: "Cymatics - 808 Mob Kick 5 - B.wav",
				"D#2": "Cymatics - 808 Mob Kick 5 - B.wav",
				"F#2": "Cymatics - 808 Mob Kick 5 - B.wav",
				A2: "Cymatics - 808 Mob Kick 5 - B.wav",
				C3: "Cymatics - 808 Mob Kick 5 - B.wav",
				"D#3": "Cymatics - 808 Mob Kick 5 - B.wav",
				"F#3": "Cymatics - 808 Mob Kick 5 - B.wav",
				A3: "Cymatics - 808 Mob Kick 5 - B.wav",
				C4: "Cymatics - 808 Mob Kick 5 - B.wav",
				"D#4": "Cymatics - 808 Mob Kick 5 - B.wav",
				"F#4": "Cymatics - 808 Mob Kick 5 - B.wav",
				A4: "Cymatics - 808 Mob Kick 5 - B.wav",
				C5: "Cymatics - 808 Mob Kick 5 - B.wav",
				"D#5": "Cymatics - 808 Mob Kick 5 - B.wav",
				"F#5": "Cymatics - 808 Mob Kick 5 - B.wav",
				A5: "Cymatics - 808 Mob Kick 5 - B.wav",
				C6: "Cymatics - 808 Mob Kick 5 - B.wav",
				"D#6": "Cymatics - 808 Mob Kick 5 - B.wav",
				"F#6": "Cymatics - 808 Mob Kick 5 - B.wav",
				A6: "Cymatics - 808 Mob Kick 5 - B.wav",
				C7: "Cymatics - 808 Mob Kick 5 - B.wav",
				"D#7": "Cymatics - 808 Mob Kick 5 - B.wav",
				"F#7": "Cymatics - 808 Mob Kick 5 - B.wav",
				A7: "Cymatics - 808 Mob Kick 5 - B.wav",
				C8: "Cymatics - 808 Mob Kick 5 - B.wav"
			},
			release: 1,
			baseUrl: "https://raw.github.com/TheOllareCommunity/TheOllator/samplershit/Samples/"
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

export { play_test_sampler as play_test_sampler};