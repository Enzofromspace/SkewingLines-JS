const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');
const risoColors = require('riso-colors');

const settings = {
  dimensions: [1080, 1080],
};
//declare params from array inside sketch function
const sketch = ({ context, width, height }) => {
  let x, y, w, h, fill, stroke, blend;
  //set number of rectangles and angle 
  const num = 33;
  const degrees = -25;

 // creat array to store random output
  const rects = [];

//scale back random color selection to just 3 options
const rectColors = [
  random.pick(risoColors),
  random.pick(risoColors),
  //random.pick(risoColors),
];

const bgColor = random.pick(risoColors).hex;

// for loop set that runs according to the value of const num  
  for (let i = 0; i < num; i++) {
      x = random.range(0, width);
      y = random.range(0, height);
      w = random.range(600,width);
      h = random.range(40,200);

      fill = random.pick(rectColors).hex;
      stroke = random.pick(rectColors).hex;

      blend = (random.value() > 0.5) ? 'overlay' : 'source-over';
//push into array
      rects.push({ x, y, w, h, fill, stroke, blend });
  }

  //render function
  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

//set function of the array with for each
    rects.forEach(rect =>{

// destructure   
      const {x, y, w, h, fill, stroke, blend} = rect;
      let shadowColor;

      context.save();
      context.translate(x, y);
      context.strokeStyle = stroke;
      context.fillStyle = fill;
      context.lineWidth = 15;

      context.globalCommpositeOperation = blend;
    
      drawSkewedRect({context, w, h, degrees});
      
      shadowColor = Color.offsetHSL(fill, 0, 0,-20);
      shadowColor.rgba[3] = 0.5;

      context.shadowColor = Color.style(shadowColor.rgba);
      context.shadowOffsetX = -10;
      context.shadowOffsetY = 20;
      
      context.fill();

      context.shadowColor = null;
      context.stroke();

      context.globalCommpositeOperation = 'source-over';

      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();

      context.restore();
  
    });
    
    console.log(drawSkewedRect);
  };
};

//created a function to draw rectangles
const drawSkewedRect = ({context, w = 600, h = 200, degrees = -45}) => {
  const angle = math.degToRad(degrees); 
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w; 

  context.save();
  context.translate(rx * -0.5, (ry + h ) * -0.5);
   
   context.beginPath();
   context.moveTo(0,0);
   context.lineTo(rx,ry);
   context.lineTo(rx, ry + h);
   context.lineTo(0,h);
   context.closePath();
   context.stroke();

   context.restore();
}

canvasSketch(sketch, settings);
