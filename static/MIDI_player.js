var instr=null;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player=new WebAudioFontPlayer();
function changeInstrument(path,name){
	player.loader.startLoad(audioContext, path, name);
	player.loader.waitLoad(function () {
		instr=window[name];
	});
}
changeInstrument('https://surikov.github.io/webaudiofontdata/sound/0290_Aspirin_sf2_file.js','_tone_0290_Aspirin_sf2_file');


function play_MIDI(midi){
     // load a midi file in the browser
     //const midi = await Midi.fromUrl("path/to/midi.mid");
     //the file name decoded from the first track
     const name = midi.name
     //get the tracks
     midi.tracks.forEach(track => {
       //tracks have notes and controlChanges
     
       //notes are an array
       const notes = track.notes
       notes.forEach(note => {
         player.queueWaveTable(audioContext, audioContext.destination, instr, note.time, note.midi, note.duration, note.velocity);
         //note.midi, note.time, note.duration, note.name
       })
    }
)}

function dummy_play(){

    player.loader.decodeAfterLoading(audioContext, 'https://tonejs.github.io/audio/berklee/gong_1.mp3');
    player.queueWaveTable(audioContext, audioContext.destination
    	, _tone_0250_SoundBlasterOld_sf2, 0, 12*4+7, 2);
    return false;

    getAudioContext().resume();
}

export { dummy_play as dummy_play_test};