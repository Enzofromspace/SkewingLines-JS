const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  let x, y, w, h;

  //render function
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.5;
    h = height * 0.1;

    context.save();
    context.translate(x, y);

    context.strokeStyle = `blue`;
    context.strokeRect(x * -0.5, y * -0.5, w, h);

    contect.restore();
  };
};

canvasSketch(sketch, settings);
