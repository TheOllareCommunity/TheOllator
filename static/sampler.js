
const drumsCrusher = new Tone.BitCrusher(16);
drumsCrusher.wet.value = 0




function drumsRecycle(){

    let newSynth = new Tone.Sampler({
        urls: {
            C2: "kick.mp3",
            D2: "snare.mp3",
            E2: "hihat.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/drum-samples/CR78/"

    })

    connectDrums(newSynth);
    newSynth.sync();
    return newSynth;
}

let sampler=drumsRecycle()
setEffect("knob_d1", knobs["knob_d1"])
setEffect("knob_d2", knobs["knob_d2"])
setEffect("knob_d3", knobs["knob_d3"])
setEffect("knob_d4", knobs["knob_d4"])
setEffect("knob_dv", knobs["knob_dv"])


