//import { playHarmony, setHarmonyMultiplier } from "./MIDI_Harmony.js";
import { play_test_melody, mute_melody, unmute_melody } from "./Melody.js";
//import { playBass, setBassMultiplier } from "./MIDI_Bass.js";
import { play_test_sampler } from "./sampler.js";
import { play_test_poly, mute_polysynth, unmute_polysynth } from "./polySynth.js";
import { play_test_bass, mute_bass, unmute_bass } from "./bassSynth.js";


let drumMidi = null;
let harmonyMidi=null;
let bassMidi=null;
let melodyMidi=null;


parseDrums();
parseHarmony();
parseMelody();
parseBass();


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
    //play_test_melody(melodyMidi);
    //play_test_sampler(drumMidi);
    //play_test_poly(harmonyMidi);
    play_test_bass(bassMidi);

    console.log("repeat");
}

function submitBPM(bpm) {
    if (bpm > 0) {
        Tone.Transport.bpm.value = bpm;
    }
    else {
    alert("BPM can't be <=0");
    }
}

Tone.Transport.bpm.value = 120;


//----------------- play pause controls

let pp_btn = document.getElementById('pp_btn')
let pp_img = document.getElementById('pp_img')
let playing = false;

pp_btn.addEventListener("click", () => {

  if(!playing){
    Tone.start()
    playing = true;
  }
  pp_img.classList.toggle("play");
  pp_img.classList.toggle("pause");

        if(Tone.Transport.state === "started"){
            Tone.Transport.pause();
            mute_melody();
            mute_polysynth();
            mute_bass();
        }
        else{
            unmute_melody();
            unmute_polysynth();
            unmute_bass();
            Tone.Transport.start();
        }
    }
)




//---------------- bpm + & - ------------------

let plus_btn = document.getElementById('plus_btn')
let minus_btn = document.getElementById('minus_btn')
let bpm_txt = document.getElementById('bpm_bar')


bpm_txt.addEventListener("change", () => {
    console.log("bpm change")
    submitBPM(bpm_txt.value);
})


plus_btn.onclick = () => {
  bpm_txt.value = parseInt(bpm_txt.value) + 1;
  submitBPM(bpm_txt.value);
}

minus_btn.onclick = () => {
  if(parseInt(bpm_txt.value) - 1 > 0){
    bpm_txt.value = parseInt(bpm_txt.value) - 1;
    submitBPM(bpm_txt.value);
    }
}

Tone.Transport.scheduleRepeat(repeat, "32m");


