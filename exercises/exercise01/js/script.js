"use strict";

/********************************************************************

Pixel painter
Mihaela Eftene

Are you up to the challenge to clean the dirty blue screen? Well! make sure to use the pixels (magic cleaner) and clean all of the dirt (black pixels).

*********************************************************************/

// Constants
const NUM_PIXELS = 1000;
const PIXEL_REVERT_DELAY = 1000;
const DEFAULT_COLOR = 'blue'; //changed the default colour to blue to create another function. The user now can clean the black screen.
const PAINT_COLOR = 'white';

//declare the "global variable"
let rotation = 0;
// Set up our starting function for when the page loads
window.onload = setup;

// setup
//
// Adds DIVs to the page along with event listeners that will allow
// then to change color on mouseover.
function setup() {
  // A loop that runs once per pixel we need
  for (let i = 0; i < NUM_PIXELS; i++) {
    // Create a DIV and store it in a variable
    let pixel = document.createElement('div');
    // Add the 'pixel' class to the new element
    pixel.setAttribute('class', 'pixel');
    // Add a mouseover handler to the new element
    pixel.addEventListener('mouseover', paint);
    // Add the element to the body of the page
    document.body.appendChild(pixel);
  }
}

// paint
//
// Called by the mouseover event handler on each pixel. Changes
// the pixel's color and sets a timer for it to revert
function paint(e) {
  // e.target contains the specific element moused over so let's
  // save that into a variable for clarity.
  let pixel = e.target;
  // Change the background color of the element to rgb random colours (using math.random that randomize the colours of the pixels)
  let red = (Math.floor(Math.random() * 255));
  let green = (Math.floor(Math.random() * 255));
  let blue = (Math.floor(Math.random() * 255));
  //make those values into one variable
  let valueRGB = `rgb(${red},${green},${blue})`;
  //changed the pixel style to the variable that contains the rgb colours
  pixel.style.backgroundColor = valueRGB;
  // Set a timeout to call the reset function after a delay
  // When we pass additional parameters (like 'pixel' below) they
  // are passed to the callback function (resetPixel)
  setTimeout(resetPixel, PIXEL_REVERT_DELAY, pixel);
}
document.addEventListener('keydown', rotate);
// the rotate function will be called everytime when the key is pressed

//rotate
function rotate(e) {
  // all of the pixels will be affected (everything that has the class name "pixel")
  let pixels = document.getElementsByClassName('pixel');
  //if the right arrow key is pressed, then rotate clockwise direction
  if (e.keyCode === 39) { //keycode found online
    rotation = rotation + 1; // clockwise direction
  }
  //else, if theleft arrow is clicked the rotate counter clockwise
  else if (e.keyCode === 37) { //keycode found online
    rotation = rotation - 1; //counter clockwise direction
  }
  //making a for loop array so that all pixels are affected once its being rotated.
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].style.transform = `rotate(${rotation}deg)`;
  }
}

// resetPixel
//
// Takes the provided pixel element and sets its color back to default
function resetPixel(pixel) {
  pixel.style.backgroundColor = DEFAULT_COLOR;
}
