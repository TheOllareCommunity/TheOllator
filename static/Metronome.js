//import { playHarmony, setHarmonyMultiplier } from "./MIDI_Harmony.js";
//import { playMelody, setMelodyMultiplier } from "./MIDI_Melody.js";
//import { playBass, setBassMultiplier } from "./MIDI_Bass.js";
import { play_test_sampler } from "./sampler.js";
import { play_test_poly, mute_polysynth, unmute_polysynth } from "./polySynth.js";

let drumMidi = null;
let harmonyMidi=null;
let bassMidi=null;
let melodyMidi=null;


async function parseDrums() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    drumMidi = new Midi(e.target.result);
	    console.log(drumMidi)
	};
	console.log(drumsPath);
    let url = 'http://127.0.0.1:8080//static/MIDI/' +  drumsPath + '/' + drumsPath + '_drum.mid';
    console.log(url);
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
}

async function parseHarmony() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    harmonyMidi = new Midi(e.target.result);
	    console.log(harmonyMidi)
	};
	console.log(harmonyPath);
    let url = 'http://127.0.0.1:8080//static/MIDI/' +  harmonyPath + '/' + harmonyPath + '_harmony.mid';
    console.log(url);
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
}

async function parseMelody() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    melodyMidi = new Midi(e.target.result);
	    console.log(melodyMidi)
	};
	console.log(harmonyPath);
    let url = 'http://127.0.0.1:8080//static/MIDI/' +  harmonyPath + '/' + harmonyPath + '_melody.mid';
    console.log(url);
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
}

async function parseBass() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    bassMidi = new Midi(e.target.result);
	    console.log(bassMidi)
	};
	console.log(harmonyPath);
    let url = 'http://127.0.0.1:8080//static/MIDI/' +  harmonyPath + '/' + harmonyPath + '_bass.mid';
    console.log(url);
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
}

function repeat(){
    //dummy_play();
    //dummy_play_test();
    //playHarmony(harmonyMidi);
    //playMelody(melodyMidi);
    //playBass(bassMidi);
    play_test_sampler(drumMidi);
    play_test_poly(harmonyMidi);

    console.log("repeat");
}

function submitBPM() {
    var bpm = document.getElementById('bpm').value;
    console.log("triggered");
    if (bpm > 0) {
        Tone.Transport.bpm.value = bpm;
        setHarmonyMultiplier(120/bpm);
        setMelodyMultiplier(120/bpm);
        setBassMultiplier(120/bpm);
    }
    else {
    alert("BPM can't be <=0");
    }
}

Tone.Transport.bpm.value = 120;

document.getElementById('playpause').addEventListener("click", () => {
        if(Tone.Transport.state === "started"){
            Tone.Transport.pause();
            mute_polysynth();
        }
        else{
            unmute_polysynth();
            Tone.Transport.start();
        }
    }
)

/*document.getElementById('play').addEventListener("click", () => {
    Tone.Transport.start();
})

document.getElementById('pause').addEventListener("click", () => {
    Tone.Transport.pause() ;
})
*/
document.getElementById('bpm').addEventListener("change", () => {
    submitBPM();
})


Tone.Transport.start("+1");

Tone.Transport.scheduleRepeat(repeat, "32m");

parseDrums();
parseHarmony();
parseMelody();
parseBass();

export{}
//window.submitBPM=submitBPM;

