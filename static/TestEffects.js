
const player = new Tone.Player({
	url: "https://tonejs.github.io/audio/loop/FWDL.mp3",
	loop: true,
	autostart: true,
})

let x = 10; //ex. posizione knob da 0 a 100

//PUMP
const distortion = new Tone.Distortion((x-0)/(100-0)).toDestination(); //distortion range 0-1
const compression = new Tone.Compressor(-30, (x/100*(20-1)+1)).toDestination(); //compression range 1-20
const eq = new Tone.EQ3(x/100*20, x/100*(-15), x/100*10 ).toDestination();

//BITCRUSHER
const bit = new Tone.BitCrusher(x/100*(8-1)+1).toDestination();  //bitcrusher range 1-8
//TREMOLO
const trem = new Tone.Tremolo(10, x/100).toMaster().start();  //depth range 0-1
//CHORUS
const chorus = new Tone.Chorus(4, x/100*(100-1)+1, x/100).toDestination(); //time delay range 1-100 ms, depth 0-1
const cheby = new Tone.Chebyshev(x).toDestination(); //range 1-100

//connect a player in parallel
player.connect(distortion);
player.connect(compression);
player.connect(eq);
player.connect(bit);
player.connect(trem);
player.connect(chorus);
player.connect(cheby);
//player.chain(distortion,compression,eq,Tone.Destination);
//player.chain(chorus,cheby,Tone.Destination);



//PAD
let mouseX=10, mouseY=50;  //range 0-100 posizione del mouse sul pad
//1
const reverb = new Tone.Reverb(mouseX).toDestination();
const delay = new Tone.Delay(mouseY).toDestination();
player.connect(reverb);
player.connect(delay);
//player.chain(reverb,delay,Tone.Destination);
//2
const freeverb = new Tone.Freeverb(mouseX/100, mouseY/100*(5000-20)+20).toDestination();
player.connect(freeverb);
//3
const feedbackDelay = new Tone.FeedbackDelay(50, mouseY/100);//.toDestination();
const jcrReverb = new Tone.JCReverb(mouseX/100);//.toDestination();
//player.connect(jcrReverb);
//player.connect(feedbackDelay);
player.chain(feedbackDelay,jcrReverb,Tone.Destination); //in series