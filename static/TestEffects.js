
const player = new Tone.Player({
	url: "https://tonejs.github.io/audio/loop/FWDL.mp3",
	loop: true,
	autostart: true,
})

let minV=-160, maxV=160;
let x = 10; 
//const gainNode = new Tone.Gain(0.1);
const gainNode = new Tone.Gain((maxV-minV)/(x-minV)*0.1);  //divisione per 0??
//PUMP
const distortion = new Tone.Distortion((x-minV)/(maxV-minV));//.toDestination(); //distortion range 0-1
const compression = new Tone.Compressor(-30, ((x-minV)/(maxV-minV)*(20-1)+1));//.toDestination(); //compression range 1-20
const eq = new Tone.EQ3((x-minV)/(maxV-minV)*20, (x-minV)/(maxV-minV)*(-15), (x-minV)/(maxV-minV)*10 );//.toDestination();
//BITCRUSHER
const bit = new Tone.BitCrusher((x-minV)/(maxV-minV)*(8-1)+1);//.toDestination();  //bitcrusher range 1-8
//TREMOLO
const trem = new Tone.Tremolo(10, (x-minV)/(maxV-minV)).toMaster().start();  //depth range 0-1
//CHORUS
const chorus = new Tone.Chorus(4, (x-minV)/(maxV-minV)*(100-1)+1, (x-minV)/(maxV-minV));//.toDestination(); //time delay range 1-100 ms, depth 0-1
const cheby = new Tone.Chebyshev((x-minV)/(maxV-minV)*(100-1)+1);//.toDestination(); //range 1-100

//connect in parallel
//player.connect(gainNode);

//player.connect(distortion);
//player.connect(compression);
//player.connect(eq);
//player.connect(bit);
//player.connect(trem);
//player.connect(chorus);
//player.connect(cheby);
//connect in series
player.chain(gainNode,distortion,compression,eq,Tone.Destination);
player.chain(gainNode,bit,Tone.Destination);
player.chain(gainNode,trem,Tone.Destination);
player.chain(gainNode,chorus,cheby,Tone.Destination);



//PAD
let mouseX=10, mouseY=50;  //range 0-100 posizione del mouse sul pad in x e y 
//1
const reverb = new Tone.Reverb(mouseX).toDestination();
const delay = new Tone.Delay(mouseY).toDestination();
//player.connect(reverb);
//player.connect(delay);
player.chain(gainNode,reverb,delay,Tone.Destination);
//2
const freeverb = new Tone.Freeverb((mouseX-minV)/(maxV-minV), (mouseY-minV)/(maxV-minV)*(5000-20)+20);//.toDestination();
//player.connect(freeverb);
player.chain(gainNode,freeverb,Tone.Destination);
//3
const jcrReverb = new Tone.JCReverb((mouseX-minV)/(maxV-minV));//.toDestination();
const feedbackDelay = new Tone.FeedbackDelay(50, (mouseY-minV)/(maxV-minV));//.toDestination();
//player.connect(jcrReverb);
//player.connect(feedbackDelay);
player.chain(gainNode,feedbackDelay,jcrReverb,Tone.Destination); 