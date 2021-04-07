import { dummy_play_test } from "./MIDI_player.js";
var player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toMaster();
Tone.Transport.bpm.value = 60;

Tone.Buffer.onload = function() {

    //this will start the player on every quarter note
    Tone.Transport.setInterval(function(time){
        player.start(time);
    }, "4n");
    //start the Transport for the events to start
    Tone.Transport.start();
};

function start() {
    Tone.Transport.start();
    dummy_play_test();
    console.log('bella');

}
window.start = start;

function stop() {
    Tone.Transport.stop();
}

function submitBPM() {
    var bpm = document.getElementById('bpm').value;
    Tone.Transport.bpm.value = bpm;
}
window.submitBPM=submitBPM;

