import { dummy_play_test } from "./MIDI_player.js";

var ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.01,
  decay: 0.2,
  sustain: 0.1,
  release: 0.01
 }).toMaster();



var synth = new Tone.Synth();
synth.oscillator.type= "triangle";
synth.connect(ampEnv);
Tone.Transport.bpm.value = 60;



document.getElementById('playpause').addEventListener("click", () => {
    Tone.Transport.state === "started" ? Tone.Transport.pause() : Tone.Transport.start();

})


Tone.Transport.start("+1");

Tone.Transport.scheduleRepeat(repeat, "4n");

function repeat(){
    synth.triggerAttackRelease("B5", "64n");
    ampEnv.triggerAttackRelease("64n");
    //dummy_play();
    dummy_play_test();
}

function submitBPM() {
    var bpm = document.getElementById('bpm').value;
    Tone.Transport.bpm.value = bpm;
}

//window.submitBPM=submitBPM;

