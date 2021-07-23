// ==================================
// |  Procedural Art in Javascript  |
// ==================================

// ------ Global Parameters ------

// GET THE CANVAS ELEMENT FROM THE DOM
// AND CREATE A 'CONTEXT' TO RENDER TO
var canvas = document.getElementByID('myCanvas');
var context = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;


// ==================================
// |     The Drawing Functions!     |
// ==================================

// the main drawing method
function drawStuff() {

}

function drawCircle(point, radius, color, fill = true) {

}

function drawRectangle(point, height, width, color, fill = true) {

}

function drawTriangle(point1, point2, point3, color, fill = true) {

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
