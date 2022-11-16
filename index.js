const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  let x, y, w, h;
  let angle, rx, ry;

  //render function
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.6;
    h = height * 0.1;

    context.save();
    context.translate(x, y);
   // context.translate(w * -0.5, h * -0.5);

   angle = math.degToRad(45); 
   rx = Math.cos(angle) * w;
   ry = Math.sin(angle) * w; 
   
   context.strokeStyle = `blue`;

   context.translate(rx * -0.5, (ry + h ) * -0.5);
    
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(rx,ry);
    context.lineTo(rx, ry + h);
    context.lineTo(0,h);
    context.closePath();
    context.stroke();  


    context.restore();
  };
};

canvasSketch(sketch, settings);
