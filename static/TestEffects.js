/*
const gainNode = new Tone.Gain(0.5);
//DISTORTION
const distortion = new Tone.Distortion((x-minV)/(maxV-minV));//.toDestination(); //distortion range 0-1
//COMPRESSOR
const compression = new Tone.Compressor(-30, ((x-minV)/(maxV-minV)*(20-1)+1));//.toDestination(); //compression range 1-20
//EQUALIZER
const eq = new Tone.EQ3((x-minV)/(maxV-minV)*20, (x-minV)/(maxV-minV)*(-15), (x-minV)/(maxV-minV)*10 );//.toDestination();
//BITCRUSHER
const bit = new Tone.BitCrusher((x-minV)/(maxV-minV)*(8-1)+1);//.toDestination();  //bitcrusher range 1-8
//TREMOLO
const trem = new Tone.Tremolo(10, (x-minV)/(maxV-minV)).toMaster().start();  //depth range 0-1
//CHORUS
const chorus = new Tone.Chorus(4, (x-minV)/(maxV-minV)*(100-1)+1, (x-minV)/(maxV-minV));//.toDestination(); //time delay range 1-100 ms, depth 0-1
//CHEBYSHEV
//const cheby = new Tone.Chebyshev((x-minV)/(maxV-minV)*(100-1)+1);//.toDestination(); //range 1-100
//PITCH SHIFT
const ps = new Tone.PitchShift((x-minV)/(maxV-minV)*(48+48)-48); //range +48/-48 semitones (8 ottave)

//reverbs
const freeverb = new Tone.Freeverb((mouseX-minV)/(maxV-minV), (mouseY-minV)/(maxV-minV)*(20000-20)+20);//.toDestination();*/
/*const jcrReverb = new Tone.JCReverb((mouseY-minV)/(maxV-minV));//.toDestination();
//player.connect(freeverb);
player.chain(gainNode,freeverb,Tone.Destination);
//player.chain(gainNode,reverb,Tone.Destination);
//player.chain(gainNode,jcrReverb,Tone.Destination); 

//delays
const pingPong = new Tone.PingPongDelay((mouseX-minV)/(maxV-minV)*(3-0.1)+0.1, (mouseY-minV)/(maxV-minV));
//player.connect(feedbackDelay);
player.chain(gainNode,feedbackDelay,Tone.Destination); 
player.chain(gainNode,pingPong,Tone.Destination);
//player.chain(gainNode,delay,Tone.Destination);

player.chain(gainNode,delay,jcrReverb,Tone.Destination); 
player.chain(gainNode,delay,reverb,Tone.Destination);*/

let melodyDecayTime = 0.001;
let melodyDecayTimeMultiplier = 10;
const melodyReverbNode = new Tone.Gain(0);
const melodyReverb = new Tone.Reverb(melodyDecayTime).toDestination();
const melodyFeedbackDelay = new Tone.FeedbackDelay("8n", melodyDecayTime).toDestination();
function connectMelody(instrument){
	instrument.connect(melodyReverbNode);
	melodyReverbNode.fan(melodyReverb, melodyFeedbackDelay);
	instrument.toDestination();
}

let harmonyDecayTime = 0.001;
let harmonyDecayTimeMultiplier = 10;
const harmonyReverbNode = new Tone.Gain(0);
const harmonyReverb = new Tone.Reverb(harmonyDecayTime).toDestination();
const harmonyFeedbackDelay = new Tone.FeedbackDelay("8n", harmonyDecayTime).toDestination();
function connectHarmony(instrument){
	instrument.connect(harmonyReverbNode);
	harmonyReverbNode.fan(harmonyReverb, harmonyFeedbackDelay);
	instrument.toDestination();
}


let bassFrequency = 200;
const bassAutoFilter = new Tone.AutoFilter();
bassAutoFilter.set({
	frequency: "8n",
	bassFrequency: bassFrequency,
	octaves: 3
});
function connectBass(instrument){
	instrument.connect(bassAutoFilter);
	bassAutoFilter.toDestination();
}

/*let drumFrequency = 10000;
const drumAutoFilter = new Tone.AutoFilter(1, drumFrequency, 1).toDestination();
function connectDrum(instrument){
	instrument.connect(drumAutoFilter).toDestination();
}*/


function setEffect(knobID, value){
	value = (value + maxRot) / (maxRot - minRot);
	switch(knobID){

		case "knob_d1" : 
			
		break;
		case "knob_d2" : 
		
		break;
		case "knob_d3" : 
		
		break;
		case "knob_d4" : 
		
		break;
		case "knob_dv" : 
		
		break;
		case "knob_b1" : 
			
		break;
		case "knob_b2" : 
		
		break;
		case "knob_b3" : 
		
		break;
		case "knob_b4" : 
		
		break;
		case "knob_bv" : 
		
		break;
		case "knob_h1" : 
		
		break;
		case "knob_h2" : 
		
		break;
		case "knob_h3" : 
		
		break;
		case "knob_h4" : 
		
		break;
		case "knob_hv" : 
		
		break;
		case "knob_m1" : 
		
		break;
		case "knob_m2" : 
			
		break;
		case "knob_m3" : 
		
		break;
		case "knob_m4" : 
		
		break;
		case "knob_mv" : 
		
		
	}
}


function setPadEffect(x, y, pad){
	y = 1 - y;
	if(pad == "melody_pad"){
		melodyReverbNode.gain.value = x
		melodyFeedbackDelay.feedback.value = y
		if(y >= 0.0001)
			melodyReverb.decay = y * melodyDecayTimeMultiplier
	}
	else if(pad == "harmony_pad"){
		harmonyReverbNode.gain.value = x
		harmonyFeedbackDelay.feedback.value = y
		if(y >= 0.0001)
			harmonyReverb.decay = y * harmonyDecayTimeMultiplier
	}
	else if(pad == "bass_pad"){
		bassAutoFilter.set({
			//frequency: y*10,
			bassFrequency: x*5000,
			octaves: 1
		});
		
	}
	else if(pad == "drums_pad"){
		//drumAutoFilter.lowPassFreq = x*20000
		//drumAutoFilter.frequency = y*20
	}
}