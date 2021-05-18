const harmonyCrusher = new Tone.BitCrusher(16)
harmonyCrusher.wet.value = 0



function harmonyRecycle(){
    let newSynth= new Tone.PolySynth(
    {
        oscillator : {
            "type" : "fatsawtooth",
            "count" : 7,
            "spread" : 60
        },
        envelope: {
            "attack": 0.01,
            "decay": 0.1,
            "sustain": 0.5,
            "release": 0.4,
            "attackCurve" : "exponential"
        }
    })

    newSynth.maxPolyphony=4;
    connectHarmony(newSynth);
    newSynth.sync();

    return newSynth;
}


let poly = harmonyRecycle();
setEffect("knob_h1", knobs["knob_h1"])
setEffect("knob_h2", knobs["knob_h2"])
setEffect("knob_h3", knobs["knob_h3"])
setEffect("knob_h4", knobs["knob_h4"])
setEffect("knob_hv", knobs["knob_hv"])