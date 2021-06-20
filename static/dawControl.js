let dropupElements = document.getElementsByClassName("dropup-element")
let dueArray = Array.from(dropupElements) 
let dropUp = document.getElementsByClassName("dropup")[0]
let dropup_content = document.getElementsByClassName("dropup-content")[0]
let dropUp_btn = document.getElementsByClassName("dropbtn")[0]
let currentMode = 0

let element = null;
let mouseDown = false;
let yStart = 0;

let maxPx = 150;
let maxRot = 160;
let minRot = -160;

let rPre = "rotate("
let rSuf = "deg)"




var knobs = {

  "knob_d1" : minRot,
  "knob_d2" : minRot,
  "knob_d3" : minRot,
  "knob_d4" : minRot,
  "knob_dv" : 0,

  "knob_b1" : minRot,
  "knob_b2" : minRot,
  "knob_b3" : minRot,
  "knob_b4" : minRot,
  "knob_bv" : 0,

  "knob_h1" : minRot,
  "knob_h2" : minRot,
  "knob_h3" : minRot,
  "knob_h4" : minRot,
  "knob_hv" : 0,

  "knob_m1" : minRot,
  "knob_m2" : 0,
  "knob_m3" : minRot,
  "knob_m4" : minRot,
  "knob_mv" : 0
};

for(var key in knobs) { // set knobs functions
  let el = document.getElementById(key)

  el.onmousedown = (e) => {
    mouseDown = true;
    element = e.target;
    yStart = e.clientY;
  }

  el.ondragstart = () =>{
    return false;
  }
  el.style.webkitTransform = rPre + knobs[key] + rSuf;

}



// on mouse move
window.onmousemove = (e) =>{

  if (mouseDown){
    let rotation = knobs[element.id]

    offset = (yStart - e.clientY) * 2

    if (rotation + offset >maxRot){
      rotation = maxRot;
    }else if(rotation + offset <minRot){
        rotation = minRot;
      }else{
        rotation += offset;
      }

      knobs[element.id] = rotation
      setEffect(element.id, rotation);
      element.style.webkitTransform = rPre + rotation + rSuf;
        yStart = e.clientY;
    }
}

// on mouse release
window.onmouseup =  () => {
  mouseDown = false;
  element = null;
}


var bpmBar = document.getElementById("bpm_bar");
bpmBar.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});

let main_container = document.getElementsByClassName("main_container")[0];
let overlay_container = document.getElementsByClassName("overlayContainer")[0];

overlay_container.onclick = function(){
    console.log("entrato")
    overlay_container.style.display = "none";
    //document.getElementsByTagName("BODY")[0].style.filter = "brightness(100%)";
}

popupPanel.onclick = function(e){
    e.stopPropagation();
}

for(var i = 0; i < dropupElements.length; i++){
  dropupElements.item(i).onclick = (e)=>{
    if(Tone.Transport.state != "started"){
        dropUp_btn.innerHTML = e.target.innerHTML
        console.log(e.target.innerHTML)
        currentMode = dueArray.indexOf(e.target)
        fmSynth.dispose();
        poly.dispose();
        bassSynth.dispose();
        sampler.dispose();

        fmSynth = melodyRecycle()
        poly = harmonyRecycle()
        bassSynth = bassRecycle()
        sampler = drumsRecycle()
        repeat()
    }
  }
}


dropUp.addEventListener("mouseover", () => {
    if( Tone.Transport.state != "started")
        dropup_content.style.display = "block";
})

dropUp.addEventListener("mouseout", () => {
    if( Tone.Transport.state != "started")
        dropup_content.style.display = "none";
})