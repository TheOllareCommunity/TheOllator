const audio = document.querySelector('audio');
var recorder
var chunks = [];
let recording = false;


function initRecorder(actx){
    const dest  = actx.createMediaStreamDestination();
    limiter.fan(dest, masterGain);
    recorder = new MediaRecorder(dest.stream);

    const mic = new Tone.UserMedia().connect(dest);
        mic.open().then(() => {
	    // promise resolves when input is available
    }).catch(e => {
	    // promise is rejected when the user doesn't have or allow mic access
	    console.log("mic not open");
    });

    recorder.ondataavailable = evt => { chunks.push(evt.data); }
    recorder.onstop = evt => {
      let blob = new Blob(chunks, { type: 'audio/wav; codecs=wav' });
      chunks = [];
      audio.src = URL.createObjectURL(blob);
    };
}


function toggleRecording(){
    if(recording)
        recorder.stop()
    else
        recorder.start()
    recording = !recording
}

initRecorder(Tone.context)

//----------------- record controls

let record_btn = document.getElementById('record_btn')
record_btn.onclick = () => {
    if(!recording && Tone.Transport.state === "started")
        document.getElementById('rec_img').classList.add("active");
    else
    {
        document.getElementById('rec_img').classList.remove("active");
        //document.getElementsByTagName("BODY")[0].style.filter = "brightness(50%)";

        overlay_container.style.display = "block";
        if(Tone.Transport.state === "started")
            pp_btn.click();
    }
    toggleRecording()
}