
let drumMidi = null;
let harmonyMidi=null;
let bassMidi=null;
let melodyMidi=null;

let currentBpm = 120

const actx  = Tone.context;

parseDrums();
parseHarmony();
parseMelody();
parseBass();

Tone.Transport.bpm.value = currentBpm;

//Tone.Transport.setLoopPoints("0:0:0", "64:0:0")
Tone.Transport.scheduleRepeat(repeat, "304m")


async function parseDrums() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    drumMidi = new Midi(e.target.result);
	};
    let url = 'http://127.0.0.1:8080//static/MIDI/' +  drumsPath + '/' + drumsPath + '_drum.mid';
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
}

async function parseInterpolation() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    drumMidi = new Midi(e.target.result);
	};
	let letters= ["A","B","C","D","E","F","G","H","I","J"];
	var randomLetter = letters[Math.floor(Math.random() * letters.length)];
    while (randomLetter == intPath) {
        randomLetter = letters[Math.floor(Math.random() * letters.length)];}
    let url = 'http://127.0.0.1:8080//static/Long_interpolations/' + 'LI_' +  intPath  + randomLetter + '.mid';
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
    console.log(url);
}

async function parseHarmony() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    harmonyMidi = new Midi(e.target.result);
	};
    let url = 'http://127.0.0.1:8080//static/MIDI/' +  harmonyPath + '/' + harmonyPath + '_harmony.mid';
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
}

async function parseMelody() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    melodyMidi = new Midi(e.target.result);
	};
    let url = 'http://127.0.0.1:8080//static/MIDI/' +  harmonyPath + '/' + harmonyPath + '_melody.mid';
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
}

async function parseBass() {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	    bassMidi = new Midi(e.target.result);
	};
    let url = 'http://127.0.0.1:8080//static/MIDI/' +  harmonyPath + '/' + harmonyPath + '_bass.mid';
    let blob = await fetch(url).then(response => response.blob());
    reader.readAsArrayBuffer(blob);
}

function repeat(){

    console.log("repeat1");
    poly.dispose();
    fmSynth.dispose();
    bassSynth.dispose();
    sampler.dispose();

    Tone.Transport.bpm.value = 120;
    poly=harmonyRecycle();
    fmSynth=melodyRecycle();
    bassSynth=bassRecycle();
    sampler=drumRecycle();
    setEffect("knob_hv",knobs["knob_hv"]);
    setEffect("knob_mv",knobs["knob_mv"]);
    setEffect("knob_bv",knobs["knob_bv"]);
    setEffect("knob_dv",knobs["knob_dv"]);


    const now = Tone.now();

    playMIDI(melodyMidi,fmSynth, now);
    playMIDI(drumMidi,sampler, now);
    playMIDI(bassMidi,bassSynth, now);
    playMIDI(harmonyMidi,poly, now);

    Tone.Transport.bpm.value = currentBpm;
    console.log("repeat2");
}

function submitBPM(bpm) {
    if (bpm > 0) {
        console.log(poly)
        currentBpm = bpm;
        Tone.Transport.bpm.value = bpm;
    }
    else {
        alert("BPM can't be <=0");
    }
}

//----------------- play pause controls

let pp_btn = document.getElementById('pp_btn')
let pp_img = document.getElementById('pp_img')

let load_btn = document.getElementById('load_btn')
let load_img = document.getElementById('load_img')

let playing = false;
let playControl = false;

pp_btn.addEventListener("click", () => {
    if(!playing){
        Tone.start()
        initRecorder(Tone.context);
        playing = true;
    }
    pp_img.classList.toggle("play");
    pp_img.classList.toggle("pause");
    load_img.classList.toggle("load");
    load_img.classList.toggle("load_dis");

    if(Tone.Transport.state === "started"){
        Tone.Transport.pause();
        mute(fmSynth);
        mute(bassSynth);
        mute(poly);
        mute(sampler);
        playControl = false;
    }
    else{
        Tone.Transport.start();
        setEffect("knob_mv", knobs["knob_mv"]);
        setEffect("knob_bv", knobs["knob_bv"]);
        setEffect("knob_hv", knobs["knob_hv"]);
        setEffect("knob_dv", knobs["knob_dv"]);
        playControl = true;
    }
})

//----------------- change interpolation button


load_btn.addEventListener("click", () => {
    if (!playControl){
         Tone.Transport.cancel(0);
         parseInterpolation();
         Tone.Transport.scheduleRepeat(repeat, "304m");
    }
})



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





