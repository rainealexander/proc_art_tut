// ==================================
// |  Procedural Art in Javascript  |
// ==================================

// ------ Global Parameters ------ [ope]

var shadowColor = '#010101';
var shadowOffsetX = 10;
var shadowOffsetY = 8;
var lineWidth = 8;

var numberOfShapes = 50;

// GET THE CANVAS ELEMENT FROM THE DOM
// AND CREATE A 'CONTEXT' TO RENDER TO
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// set max size of shapes to half of canvas dimensions
var minSize = 4;
var maxWidth = canvasWidth / 2;
var maxHeight = canvasHeight / 2;


// ==================================
// |     The Drawing Functions!     |
// ==================================

var drawingFunctions = [drawLine, drawCircle, drawRectangle, drawTriangle, drawNoodle];

// --- the main drawing method
function drawStuff() {

  var point, height, width, color;
  var drawn = 0;

  var drawFunc = function (stop) {
    var shadowFlag = false;
    if (!stop) {
      point = randomCoordsInCanvas();
      height = randomInRange(minSize, maxHeight);
      width = randomInRange(minSize, maxWidth);
      color = getRGBHex();
      console.log('color: ', color);
      // call random drawing function from array
      var index;
      drawingFunctions[Math.floor(Math.random() * drawingFunctions.length)](point, height, width, color);
      drawn++;
    }
  }
  setInterval(function() {
    drawFunc();
  }, 250);
}

// start drawing on page load
window.onload = function() {
  drawStuff();
};

// --- end of main drawing function

// implementation of drawing functions follow
// all functions built to accept the same parameters
function drawLine(point, height, width, color, shadow = false) {
  if (shadow) {
    setShadow();
  }

  // draw stuff here
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x + width, point.y + height);
  ctx.stroke();

  if (shadow) {
    resetShadow();
  }
}

function drawCircle(point, radius1, radius2, color, shadow = false, fill = true) {
  if (shadow) {
    setShadow();
  }

  // draw stuff here
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius1 / 2, 0, 2 * Math.PI);
  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  if (shadow) {
    resetShadow();
  }
}

function drawRectangle(point, height, width, color, shadow = false, fill = true) {
  if (shadow) {
    setShadow();
  }

  // draw stuff here
  if (fill) {
    ctx.fillStyle = color;
    ctx.fillRect(point.x, point.y, width, height);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(point.x, point.y, width, height);
  }

  if (shadow) {
    resetShadow();
  }
}

function drawTriangle(point1, height, width, color, shadow = false, fill = true) {
  if (shadow) {
    setShadow();
  }

  // draw stuff here

  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point1.x + width, point1.y + height);
  var point3 = randomCoordsInCanvas();
  ctx.lineTo(point3.x, point3.y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  if (shadow) {
    resetShadow();
  }
}

function drawNoodle(point, height, width, color, shadow = false, fill = false) {
  if (shadow) {
    setShadow();
  }
  // all the points
  var startPoint = point;
  var endPoint = {x: point.x + width, y: point.y + height};
  var midpoint = getMidpoint(startPoint, endPoint);
  var quarterPoint = getMidpoint(startPoint, midpoint);
  var quarterPoint2 = getMidpoint(midpoint, endPoint);

  var quarterDistance = getDistance(startPoint, quarterPoint);
  var controlDistance = Math.floor(Math.sqrt(Math.pow(quarterDistance, 2) / 2));
  var controlPoint1 = findNewPoint(startPoint, controlDistance, 45);
  var controlPoint2 = findNewPoint(quarterPoint, controlDistance, 315);
  var controlPoint3 = findNewPoint(midpoint, controlDistance, -315);
  var controlPoint4 = findNewPoint(quarterPoint2, controlDistance, -45);
  var curveData = {startPoint, quarterPoint, midpoint, controlPoint1, controlPoint2, controlDistance};
  console.log('Curvedata', curveData);


  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  // first half

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, midpoint.x, midpoint.y);
  //ctx.stroke();
  // second half
  //ctx.beginPath();
  ctx.moveTo(midpoint.x, midpoint.y);
  ctx.bezierCurveTo(controlPoint3.x, controlPoint3.y, controlPoint4.x, controlPoint4.y, endPoint.x, endPoint.y);
  ctx.stroke();

  // if (fill) {
  //   ctx.fillStyle = color;
  //   ctx.fill();
  // } else {
  //   ctx.strokeStyle = color;
  //   ctx.stroke();
  // }

  if (shadow) {
    resetShadow();
  }
}

function setShadow() {
  ctx.shadowColor = window.shadowColor;
  ctx.shadowOffsetX = window.shadowOffsetX;
  ctx.shadowOffsetY = window.shadowOffsetY;
}

function resetShadow() {
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

// ==================================
// |    Helper Functions Abound     |
// ==================================

// returns a number in range 0-255
function randomRGBVal() {

  return Math.floor(randomInRange(0, 255));
}

// returns an array with three random RGB values
function getRGBTriplet() {

  return [randomRGBVal(),
    randomRGBVal(),
    randomRGBVal()];
}

function getRGBHex(colorArray) {
  if (colorArray === undefined) {
    colorArray = getRGBTriplet();
  }
  return '#' + valToHex(colorArray[0]) + valToHex(colorArray[1]) + valToHex(colorArray[2]);
}

function valToHex(num) {
  var hex = num.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

// returns an alpha channel value between 0 and 1 with 2 decimal places
function randomAlphaVal() {
  return Math.random().toFixed(2);
}

// returns an array with random RGB and Alpha values
function getRGBA() {
  // TODO: implement
}

// returns an object with x,y coordinates within the canvas
function randomCoordsInCanvas() {
  var x = Math.floor(randomInRange(0, canvasWidth));
  var y = Math.floor(randomInRange(0, canvasHeight));
  return {x, y};
}

// takes an array, returns rounded average of all values
function avgInt(array) {
  var result = 0;
  for (var i = 0; i < array.length; i++) {
    result += array[i];
  }
  return Math.round(result / array.length);
}

// returns the distance between two points
function getDistance(point1, point2) {
  var dist = Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
  return Math.floor(dist);
}

// returns the midpoint between two points
function getMidpoint(point1, point2) {
  return { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2};
}

// get new point from angle and distance
function findNewPoint(point, dist, angle) {
  var rads = angle * Math.PI / 180;
  var newX = point.x + (dist * Math.cos(rads));
  var newY = point.y + (dist * Math.sin(rads));
  return {x: newX, y: newY};
}

// return random number in provided range
function randomInRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}
