"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
// Constants
const NUM_PIXELS = 1000;
//delay the pixel apperance
const PIXEL_REVERT_DELAY = 1000;
//set the pixel default color to black
const DEFAULT_COLOR = 'black';
//paint colour in white
const PAINT_COLOR = 'white';

window.onload = setup;

function setup(){
  //for loop 1000
  for (let i = 0; i < NUM_PIXELS; i++) {
  let pixel = document.createElement('div');
  //gives it a class
  pixel.setAttribute('class', 'pixel');
  // Add a mouseover handler to the new element
  pixel.addEventListener('mouseover', paint);
  // Add the element to the body of the page
  document.body.appendChild(pixel);
}
}

function paint(e) {
  //store the target of e in pixel variable
  let pixel = e.target;
  // Change the background color of the element to white
  pixel.style.backgroundColor = PAINT_COLOR;
  //set the time out once the pixel was resetted
  setTimeout(resetPixel, PIXEL_REVERT_DELAY, pixel);
}
//reset to the default colour
function resetPixel(pixel){
  pixel.style.backgroundColor= DEFAULT_COLOR;
}
