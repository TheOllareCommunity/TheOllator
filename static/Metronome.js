import { dummy_play_test } from "./MIDI_player.js";
//import { play_test_sampler } from "./sampler.js";

let drumMidi = null;
let harmonyMidi=null;

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

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

function repeat(){
    //dummy_play();
    dummy_play_test();
    play_test_sampler();
}

function submitBPM() {
    var bpm = document.getElementById('bpm').value;
    Tone.Transport.bpm.value = bpm;
}

Tone.Transport.bpm.value = 60;

document.getElementById('playpause').addEventListener("click", () => {
    Tone.Transport.state === "started" ? Tone.Transport.pause() : Tone.Transport.start();

})


Tone.Transport.start("+1");

Tone.Transport.scheduleRepeat(repeat, "4n");

parseDrums();
parseHarmony();


//window.submitBPM=submitBPM;

