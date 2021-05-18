const melodyVol = new Tone.Volume(-10).toDestination();

const melodyCrusher = new Tone.BitCrusher(16);
melodyCrusher.wet.value = 0




const fmSynth = new Tone.Synth();
fmSynth.set({
    "harmonicity": 3.01,
    "modulationIndex": 14,
    "oscillator": {
        "type": "fatsine4"
    },
    "envelope": {
        "attack": 0.002,
        "decay": 0.3,
        "sustain": 0.1,
        "release": 1.2
    },
    "modulation" : {
        "type": "square"
    },
    "modulationEnvelope" : {
        "attack": 0.01,
        "decay": 0.5,
        "sustain": 0.2,
        "release": 0.1
    }
})


connectMelody(fmSynth);

setEffect("knob_m1", knobs["knob_m1"])
setEffect("knob_m2", knobs["knob_m2"])
setEffect("knob_m3", knobs["knob_m3"])
setEffect("knob_m4", knobs["knob_m4"])
setEffect("knob_mv", knobs["knob_mv"])

fmSynth.sync();

