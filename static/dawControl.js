

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
  "knob_dv" : minRot,

  "knob_b1" : minRot,
  "knob_b2" : minRot,
  "knob_b3" : minRot,
  "knob_b4" : minRot,
  "knob_bv" : minRot,

  "knob_h1" : minRot,
  "knob_h2" : minRot,
  "knob_h3" : minRot,
  "knob_h4" : minRot,
  "knob_hv" : minRot,

  "knob_m1" : minRot,
  "knob_m2" : minRot,
  "knob_m3" : minRot,
  "knob_m4" : minRot,
  "knob_mv" : minRot

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
      element.style.webkitTransform = rPre + rotation + rSuf;
        yStart = e.clientY;
    }
}

// on mouse release
window.onmouseup =  () => {
  mouseDown = false;
  element = null;
}



//----------------- play pause controls



