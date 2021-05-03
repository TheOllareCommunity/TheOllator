var instr=null;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player=new WebAudioFontPlayer();
let timeMultiplier=1;
function setBassMultiplier(mult){
    timeMultiplier=mult;
}

function changeInstrument(path,name){
	player.loader.startLoad(audioContext, path, name);
	player.loader.waitLoad(function () {
		instr=window[name];
	});
}
changeInstrument('https://surikov.github.io/webaudiofontdata/sound/0040_Aspirin_sf2_file.js','_tone_0040_Aspirin_sf2_file');


function playBass(midi){

    console.log("repeat bass"+ new Date());

    var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContextFunc();
    var player=new WebAudioFontPlayer();
     // load a midi file in the browser
     //const midi = await Midi.fromUrl("path/to/midi.mid");
     //the file name decoded from the first track
     const name = midi.name

     //get the tracks
     midi.tracks.forEach(track => {

       //notes are an array
       const notes = track.notes
       notes.forEach(note => {
         player.queueWaveTable(audioContext, audioContext.destination, instr, (note.time+0.1)*timeMultiplier, note.midi, note.duration*timeMultiplier, note.velocity/8);
         //console.log(note.midi, note.time, note.duration, note.name);
         //console.log("MIDI repeat");
       })
    }
)}


export { playBass as playBass, setBassMultiplier as setBassMultiplier};