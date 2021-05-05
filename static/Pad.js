class Pad{ //pad class that handles a canvas

  constructor(div){
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

        p5.background('#dad')
        if (p5.mouseIsPressed == true && mouseDown == false) {
          var mx = p5.mouseX;
          var my = p5.mouseY;
          if (!(mx > w || mx < 0 || my > h || my < 0)){ //area condition to avoid pad crosstalking
            xValue = mx
            yValue = my
          }
        }

        p5.ellipse(xValue, yValue, 8, 8);

        //p5.text("X: "+ xValue, 0, p5.height/4);
        //p5.text("Y: "+ yValue, 0, p5.height/2);
      }
    }, div);
  }


}

new Pad('drums_pad')
new Pad('bass_pad')
new Pad('harmony_pad')
new Pad('melody_pad')
