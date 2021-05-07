class Pad{ //pad class that handles a canvas

  constructor(div, color){
    let canvas
    let htmlElement
    let w
    let h
    let xValue = 0
    let yValue = 0

    htmlElement = document.getElementById(div)
    w = htmlElement.clientWidth
    h = htmlElement.clientHeight

    new p5(function(p5){
      p5.setup = function()
      {
        canvas = p5.createCanvas(w,h)
      }

      p5.draw = function ()
      {

        w = htmlElement.clientWidth
        h = htmlElement.clientHeight
        if (p5.width != w || p5.height != h){
          canvas.resize(w,h)
        }

        // p5.background(color)
        setGradient(0, 0, w, h, p5.color(color), p5.color('#f300ef'), "X_AXIS");
        if (p5.mouseIsPressed == true && mouseDown == false) {
          var mx = p5.mouseX;
          var my = p5.mouseY;
          if (!(mx > w || mx < 0 || my > h || my < 0)){ //area condition to avoid pad crosstalking
            xValue = mx
            yValue = my
          }
        }
        
        p5.fill(p5.color("#fff"));
        p5.noStroke();
        p5.ellipse(xValue, yValue, 8, 8);

        //p5.text("X: "+ xValue, 0, p5.height/4);
        //p5.text("Y: "+ yValue, 0, p5.height/2);
      }

      function setGradient(x, y, w, h, c1, c2, axis) {
        p5.noFill();
      
        if (axis === "Y_AXIS") {
          // Top to bottom gradient
          for (let i = y; i <= y + h; i++) {
            let inter = p5.map(i, y, y + h, 0, 1);
            let c = p5.lerpColor(c1, c2, inter);
            p5.stroke(c);
            p5.line(x, i, x + w, i);
          }
        } else if (axis === "X_AXIS") {
          // Left to right gradient
          for (let i = x; i <= x + w; i++) {
            let inter = p5.map(i, x, x + w, 0, 1);
            let c = p5.lerpColor(c1, c2, inter);
            p5.stroke(c);
            p5.line(i, y, i, y + h);
          }
        }
      }
    }, div);
  }


}

// drumColor= '#71fcc5';
// bassColor= '#ffd1f8';
// harmonyColor= '#16fef1';
// melodyColor= '#f9fc4d';

drumColor= '#f9fc4d';
bassColor= '#16fef1';
harmonyColor= '#71fcc5';
melodyColor= '#ffd1f8';

new Pad('drums_pad', drumColor)
new Pad('bass_pad', bassColor)
new Pad('harmony_pad', harmonyColor)
new Pad('melody_pad', melodyColor)
