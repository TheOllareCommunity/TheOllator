
/*const player = new Tone.Player({
	url: "https://tonejs.github.io/audio/loop/FWDL.mp3",
	loop: true,
	autostart: true,
})*/

/*let minV=0, maxV=360;
let x = 100; 
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

//connect in parallel
//player.connect(gainNode);
//player.connect(distortion);
//player.connect(compression);
//player.connect(eq);
//player.connect(bit);
//player.connect(trem);
//player.connect(chorus);
//player.connect(cheby);
//player.connect(ps);

//connect in series
player.chain(gainNode,distortion,Tone.Destination);
player.chain(gainNode,compression,Tone.Destination);
player.chain(gainNode,eq,Tone.Destination);
player.chain(gainNode,distortion,eq,compression,Tone.Destination); //PUMP
player.chain(gainNode,bit,Tone.Destination);
player.chain(gainNode,trem,Tone.Destination);
player.chain(gainNode,chorus,Tone.Destination);
//player.chain(gainNode,cheby,Tone.Destination);
player.chain(gainNode,ps,Tone.Destination);



//PAD
let mouseX=20, mouseY=80;

//reverbs
const freeverb = new Tone.Freeverb((mouseX-minV)/(maxV-minV), (mouseY-minV)/(maxV-minV)*(20000-20)+20);//.toDestination();*/
const reverb = new Tone.Reverb(6).toDestination();
/*const jcrReverb = new Tone.JCReverb((mouseY-minV)/(maxV-minV));//.toDestination();
//player.connect(freeverb);
player.chain(gainNode,freeverb,Tone.Destination);
//player.chain(gainNode,reverb,Tone.Destination);
//player.chain(gainNode,jcrReverb,Tone.Destination); 

//delays
const feedbackDelay = new Tone.FeedbackDelay((mouseX-minV)/(maxV-minV)*(3-0.1)+0.1, (mouseY-minV)/(maxV-minV));//.toDestination();
const pingPong = new Tone.PingPongDelay((mouseX-minV)/(maxV-minV)*(3-0.1)+0.1, (mouseY-minV)/(maxV-minV));
const delay = new Tone.Delay((mouseX-minV)/(maxV-minV)*4);//.toDestination();
//player.connect(feedbackDelay);
player.chain(gainNode,feedbackDelay,Tone.Destination); 
player.chain(gainNode,pingPong,Tone.Destination);
//player.chain(gainNode,delay,Tone.Destination);

player.chain(gainNode,delay,jcrReverb,Tone.Destination); 
player.chain(gainNode,delay,reverb,Tone.Destination);*/


const melodyReverbNode = new Tone.Gain(0.8);

function connectReverb(instrument){
	instrument.connect(melodyReverbNode);
	melodyReverbNode.connect(reverb);
	instrument.toDestination();
}


function setEffect(knobID, value){
	value = (value + maxRot) / (maxRot - minRot);
	switch(knobID){

		case "knob_d1" : 
			a = 2+2
			b = a+3
		break;
		case "knob_d2" : 
		
		break;
		case "knob_d3" : 
		
		break
		case "knob_d4" : 
		
		break
		case "knob_dv" : 
		
		break
		case "knob_b1" : 
		
		break
		case "knob_b2" : 
		
		break
		case "knob_b3" : 
		
		break
		case "knob_b4" : 
		
		break
		case "knob_bv" : 
		
		break
		case "knob_h1" : 
		
		break
		case "knob_h2" : 
		
		break
		case "knob_h3" : 
		
		break
		case "knob_h4" : 
		
		break
		case "knob_hv" : 
		
		break
		case "knob_m1" : 
		
		break
		case "knob_m2" : 
			melodyReverbNode
		break
		case "knob_m3" : 
		
		break
		case "knob_m4" : 
		
		break
		case "knob_mv" : 
		
		break
	}
}


function setPadEffect(x, y, pad){
	if(pad == "melody_pad")
		console.log("blla");
	console.log("io")
}