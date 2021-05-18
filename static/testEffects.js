const limiter = new Tone.Compressor(-1,20);
limiter.attack=0.01;
limiter.release=0.1;

const masterGain = new Tone.Gain(0, "decibels").toDestination();


function sendActivation(sourceNode, sendNode, outputNode, ...args){
	sourceNode.connect(sendNode);
	sendNode.fan(...args)
	if(outputNode == null){
	    sourceNode.toDestination();
	}else{
	    sourceNode.connect(outputNode)
	}

}



//----------------CONNECT MELODY---------------
let melodyDecayTime = 0.001;
let melodyDecayTimeMultiplier = 10;
const melodySendReverbNode = new Tone.Gain(0);
//const melodySendChorusNode = new Tone.Gain(0);
const melodyReverb = new Tone.Reverb(melodyDecayTime);
melodyReverb.connect(limiter);
const melodyFeedbackDelay = new Tone.FeedbackDelay("8n", melodyDecayTime);
melodyFeedbackDelay.connect(limiter);
const melodyChorus = new Tone.Chorus(1, 4, 0);
const melodyPitchShifter = new Tone.PitchShift(0);
melodyPitchShifter.wet.value = 1

const melEq = new Tone.EQ3(0, 0, -30)
const melComp = new Tone.Compressor(-3, 2)
const melDist = new Tone.Distortion(0);
const melGain =  new Tone.Gain(1);


function connectMelody(instrument){
    instrument.connect(melodyPitchShifter);
    melodyPitchShifter.connect(melodyCrusher);
    melodyCrusher.connect(melComp)
    melComp.connect(melDist)
    melDist.connect(melEq)
    melEq.connect(melGain)
    melGain.connect(melodyChorus);
    melodyChorus.start();
    sendActivation(melodyChorus, melodySendReverbNode, limiter, melodyReverb, melodyFeedbackDelay)
    //sendActivation(melodyCrusher, melodySendChorusNode, melodyVol, melodyChorus)

}



//----------------CONNECT HARMONY---------------

let harmonyDecayTime = 0.001;
let harmonyDecayTimeMultiplier = 10;
const harmonySendReverbNode = new Tone.Gain(0);
const harmonySendPhaserNode = new Tone.Gain(0);

const harmFilter = new Tone.Filter(2000, "lowpass");
const harmEq = new Tone.EQ3(0, 0, -30)
const harmonyPhaser = new Tone.Phaser({
	"frequency" : 15,
	"octaves" : 5,
	"baseFrequency" : 1000
});
const harmComp = new Tone.Compressor(-3, 2)
const harmDist = new Tone.Distortion(0);
const harmGain =  new Tone.Gain(1);
const harmonyLFO = new Tone.LFO(4, 400, 4000);
harmonyLFO.amplitude = 0;


//------effects
const harmonyReverb = new Tone.Reverb(harmonyDecayTime);
harmonyReverb.connect(limiter)
harmonyLFO.connect(harmFilter.frequency);
harmonyLFO.start();

function connectHarmony(instrument){
    instrument.connect(harmonyPhaser)
    harmonyPhaser.connect(harmonyCrusher)
    harmonyCrusher.connect(harmComp)
    harmComp.connect(harmDist)
    harmDist.connect(harmEq)
    harmEq.connect(harmGain)
    harmGain.connect(harmFilter)
    sendActivation(harmFilter, harmonySendReverbNode, limiter, harmonyReverb)

}


//----------------CONNECT BASS---------------
const bassFilter = new Tone.Filter(10000, "lowpass");
const bassSendNode = new Tone.Gain(0);
const bassPitchControl = new Tone.Gain(0);

const bassEq = new Tone.EQ3(0, 0, -30)
const bassComp = new Tone.Compressor(-3, 2)
const bassDist = new Tone.Distortion(0);
const bassGain =  new Tone.Gain(1);
const bassChorus = new Tone.Chorus(4, 20, 0);
const bassHighFilter = new Tone.Filter(300, "highpass");


//------effects

function connectBass(instrument, freqEnvelope){
    freqEnvelope.connect(bassPitchControl)
    bassPitchControl.connect(instrument.oscillator.frequency)

	instrument.connect(bassCrusher);
	bassCrusher.connect(bassComp)
    bassComp.connect(bassDist)
    bassDist.connect(bassEq)
    bassEq.connect(bassGain)
    bassGain.connect(bassFilter)
    bassFilter.connect(bassHighFilter)
    bassHighFilter.connect(bassChorus)
    bassChorus.connect(limiter)
}


//----------------CONNECT DRUMS---------------
const drumsFilter = new Tone.Filter(10000, "lowpass");
const drumsSendNode = new Tone.Gain(0);

//------effects


const drumsSendReverbNode = new Tone.Gain(0);
const drumsReverb = new Tone.Reverb(melodyDecayTime);
drumsReverb.connect(limiter);
drumsReverb.wet.value = 1
const revHighPass = new Tone.Filter(200, "highpass");
const revLowPass = new Tone.Filter(5000, "lowpass");
revHighPass.connect(revLowPass)
revLowPass.connect(drumsReverb)


const drumsEq = new Tone.EQ3(0, 0, -30)
const drumsComp = new Tone.Compressor(-3, 2)
const drumsDist = new Tone.Distortion(0);
const drumsGain =  new Tone.Gain(1);

function connectDrums(instrument){
    //Tone.Destination.chain(instrument, drumsCrusher, drumsEq, drumsComp, drumsDist, drumsFilter);
    instrument.connect(drumsCrusher)
    drumsCrusher.connect(drumsComp)
    drumsComp.connect(drumsDist)
    drumsDist.connect(drumsEq)
    drumsEq.connect(drumsGain)
    drumsGain.connect(drumsFilter)
    sendActivation(drumsFilter, drumsSendReverbNode, limiter, revHighPass)
}





function setEffect(knobID, value){

	value = mapValues(value, minRot , maxRot, 0, 1);
	switch(knobID){

		case "knob_d1" :
            setBitCrusher(value, drumsCrusher)
		break;
		case "knob_d2" : 
		    roomVerb(value, drumsReverb)
		break;
		case "knob_d3" : 
		    setPump(value, drumsEq, drumsComp, drumsDist, drumsGain)
		break;
		case "knob_d4" : 
		    drumsSendReverbNode.gain.value = value
		break;
		case "knob_dv" :
		    setVolume(value, sampler)
		break;
		case "knob_b1" : 
		    setBitCrusher(value, bassCrusher)
		break;
		case "knob_b2" : 
		    setBassChorus(value, bassChorus, bassFilter)
		break;
		case "knob_b3" : 
		    setPump(value, bassEq, bassComp, bassDist, bassGain)
		break;
		case "knob_b4" : 
		    bassPitchControl.gain.value = value
		break;
		case "knob_bv" :
		if(Tone.Transport.state === "started"){
		    setVolume(value, bassSynth)
		}
		break;
		case "knob_h1" : 
		    setBitCrusher(value, harmonyCrusher)
		break;
		case "knob_h2" : 
		    setLFO(value, harmonyLFO)
		break;
		case "knob_h3" : 
		    setPump(value, harmEq, harmComp, harmDist, harmGain)
		break;
		case "knob_h4" :
		     setPhaser(value, harmonyPhaser)
		break;
		case "knob_hv" :
		if(Tone.Transport.state === "started"){
		    setVolume(value, poly)
		}
		break;
		case "knob_m1" : 
		    setBitCrusher(value, melodyCrusher)
		break;
		case "knob_m2" :
			setPitchShift(value, melodyPitchShifter)
		break;
		case "knob_m3" : 
		    setPump(value, melEq, melComp, melDist, melGain)
		break;
		case "knob_m4" : 
		    setChorus(value, melodyChorus)
		break;
		case "knob_mv" :
		if(Tone.Transport.state === "started"){
		    setVolume(value, fmSynth)
		}
		break;
	}
}


function setPadEffect(x, y, pad){
	y = 1 - y;
	switch(pad){
	    case "melody_pad":
	    	melodySendReverbNode.gain.value = x
	    	melodyFeedbackDelay.feedback.value = y * 0.5
	    	if(y >= 0.0001)
	    		melodyReverb.decay = y * melodyDecayTimeMultiplier/2
	    break;

	    case "harmony_pad":
	    	harmonySendReverbNode.gain.value = x
	    	if(y >= 0.0001)
	    		harmonyReverb.decay = y * harmonyDecayTimeMultiplier / 2
	    break;

	    case "bass_pad":
	    	bassFilter.frequency.value = lin2log(x, 0, 1, 1000)
	    	bassFilter.Q.value = y * 10
	    break;

	    case "drums_pad":
	    	drumsFilter.frequency.value = lin2log(x, 0, 1, 10000)
	    	drumsFilter.Q.value = y * 10
	    break;
	}
}



function setBitCrusher(value, bitcrusher){
    value =  Math.ceil(mapValues(value, 0 , 1, 4, 2));
    if (value == 4){
        bitcrusher.wet.value = 0;
    }else{
        bitcrusher.wet.value = 1;
        bitcrusher.bits.value = 2 ** value;
    }
}


function setChorus(value, chorus) {
    chorus.depth=value;
    freq=mapValues(value, 0, 1, 1, 6)
    chorus.frequency.value=freq;
}

function setPhaser(value, phaser) {
    phaser.wet.value=value;
    phaser.Q.value=value*0.3;
}

function setPitchShift(value, pitchshifter){
    pitch =  Math.ceil(mapValues(value, 0 , 1, -12, 12));
    pitchshifter.pitch = pitch;
}


function roomVerb(value, room){
    room.decay =  value * melodyDecayTimeMultiplier + melodyDecayTime;
}


function setPump(value, eq, comp, dist, gain){
    eq.low = lin2log(value, 0, 1, 3)
    eq.mid= lin2log(value, 0, 1, -4)
    eq.high = -40

    comp.threshold = mapValues(value, 0, 1, 0, - 18)
    comp.ration = mapValues(value, 0, 1, 0, 8)

    dist.distortion = value * 0.2

    gain.gain.value =  (1 - value * 0.4)

}

function setLFO(value, LFO){
    LFO.frequency.value=value * 10
    LFO.amplitude=value;
}

const meter = new Tone.Meter();
Tone.getDestination().connect(meter)


function setVolume(value, instrument){
    let vol = mapValues(value, 0, 1, -32, 0)
    let mute = vol < -26

    if (instrument.volume.mute != mute){
        instrument.volume.mute = mute
        if(mute)
            instrument.volume.rampTo(-128, 0.1)
    }


    if(!mute)
        instrument.volume.rampTo(vol, 0.1)
}

function setBassChorus(value, chorus, filter) {
    chorus.depth=value;
    Cfreq=mapValues(value, 0, 1, 1, 6)
    chorus.frequency.value=Cfreq;
    filter.Q.value= value*10;
    let freq = mapValues(value, 0, 1, 300, 1000)
    filter.frequency.value = freq
}