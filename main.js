// ==================================
// |  Procedural Art in Javascript  |
// ==================================

// ------ Global Parameters ------ [ope]

var shadowColor = 'black';
var shadowOffsetX = 10;
var shadowOffsetY = 8;
var lineWidth = 2;

// GET THE CANVAS ELEMENT FROM THE DOM
// AND CREATE A 'CONTEXT' TO RENDER TO
var canvas = document.getElementByID('myCanvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// set max size of shapes to half of canvas dimensions
var maxWidth = canvasWidth / 2;
var maxHeight = canvasHeight / 2;


// ==================================
// |     The Drawing Functions!     |
// ==================================

var drawingFunctions = [drawLine, drawCircle, drawRectangle, drawTriangle, drawNoodle];

// the main drawing method
function drawStuff() {

}

function drawLine(point, height, width, color, shadow = false) {
  if (shadow) {
    setShadow();
  }
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

  if (shadow) {
    resetShadow();
  }
}

function drawRectangle(point, height, width, color, shadow = false, fill = true) {
  if (shadow) {
    setShadow();
  }

  // draw stuff here

  if (shadow) {
    resetShadow();
  }
}

function drawTriangle(point1, height, width, color, fill = true) {
  if (shadow) {
    setShadow();
  }

  // draw stuff here
  var triangle = new Path2D();
  triangle.beginPath();
  triangle.moveTo(point1.x, point1.y);
  triangle.lineTo(point1.x + width, point1.y + height);
  var point3 = randomCoordsInCanvas();
  triangle.lineTo(point3.x, point3.y);
  triangle.closePath();
  if (fill) {
    ctx.fillStyle = color;
    ctx.fill(triangle);
  } else {
    ctx.strokeStyle = color;
    ctx.stroke(triangle);
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

  // first half
  ctx.beginPath
  ctx.moveTo(startPoint.x, startPoint.y);
  // TODO: set control points for curve
  ctx.bezierCurveTo()

  if (fill) {
    ctx.fillStyle = color;
    ctx.fill(triangle);
  } else {
    ctx.strokeStyle = color;
    ctx.stroke(triangle);
  }

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
  // TODO: implement
}

// returns an array with three random RGB values
function getRGBTriplet() {
  // TODO: implement
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
  var x;
  var y;
  // TODO: implement
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
  return Math.sqrt((Math.abs(point1.x - point2.x) ^ 2) + (Math.abs(point1.y - point2.y) ^ 2));
}

// returns the midpoint between two points
function getMidpoint(point1, point2) {
  return { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2};
}
