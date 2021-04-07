import { dummy_play_test } from "./MIDI_player.js";
Tone.Transport.bpm.value = 60;

Tone.Buffer.onload = function() {

    //this will start the player on every quarter note
    Tone.Transport.setInterval(function(time){
        dummy_play_test();
    }, "4n");
    //start the Transport for the events to start
    Tone.Transport.start();
};

function start() {
    Tone.Transport.start();
}

function stop() {
    Tone.Transport.stop();
}

function submitBPM() {
    var bpm = document.getElementById('bpm').value;
    Tone.Transport.bpm.value = bpm;
}

