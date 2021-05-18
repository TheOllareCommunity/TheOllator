const bassVol = new Tone.Volume(1);
const bassCrusher = new Tone.BitCrusher(16);
bassCrusher.wet.value = 0
const bassFreqEnv = new Tone.FrequencyEnvelope({
	attack: 0.01,
	decay: 0.5,
	sustain: 0,
	release:0,
	baseFrequency: "C2",
	octaves: 2
})

const bassSynth = new Tone.MonoSynth();
bassSynth.set({
    "detune":0,
    "volume":-100,
	oscillator: {
		type: "square16",
		"detune":0
	},
	envelope: {
		"attack": 0,
		"attackCurve": "linear",
		"decay": 0.3,
		"decayCurve": "exponential",
		"release": 0.8,
		"releaseCurve": "exponential",
		"sustain": 0.5
	},
	filter: {
		"Q": 5,
		"detune": 0,
		"frequency": 350,
		"gain": 0,
		"rolloff": -12,
		"type": "lowpass"
	},
})

connectBass(bassSynth, bassFreqEnv)

setEffect("knob_b1", knobs["knob_b1"])
setEffect("knob_b2", knobs["knob_b2"])
setEffect("knob_b3", knobs["knob_b3"])
setEffect("knob_b4", knobs["knob_b4"])
setEffect("knob_bv", knobs["knob_bv"])
bassSynth.sync();