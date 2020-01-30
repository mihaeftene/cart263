"use strict";

/*****************

Raving Redactionist
Pippin Barr

You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/

// The chance a span will be revealed per update
const REVEAL_POSSIBILITY = 0.1;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;

// A place to store the jQuery selection of all spans
let $spans;
//add the secretsFound variable
let $secretsFound = 0;
//add the secretsTotal variable
let $secretsTotal;

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Save the selection of all spans (since we do stuff to them multiple times)
  $spans = $('span');
  //calculating the total number of secrets using "length"
  $secretsTotal = $('.secret').length;
  //after calculating, plase display the total number
  $("#theSecretsTotal").text($secretsTotal);
  console.log($secretsTotal);
  // mouseover for all secrets to be discovered
  $('.secret').on("mouseover", hoverSecret);
  // Set a click handler on the spans (so we know when they're clicked)
  $spans.on('click', spanClicked);
  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(update, UPDATE_FREQUENCY);
};

// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $('.redacted').each(updateSpan);
}

// updateSpan()
//
// With random chance it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  let r = Math.random();
  if (r < REVEAL_POSSIBILITY) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}

//hoverSecret()
//function that relates to the mouseover
function hoverSecret(){
//when mouseover apply the css style to the secrets that are found so they can be highlighted
$(this).addClass("found");
//removes the mouseover using off
$(this).off("mouseover");
//increasing the counter variable by one ($ means variable)
$secretsFound++;
//span that will contain the number of secrets found and will set the text to be the value of the counter variable.
$("#found").text($secretsFound);
}

// A version using anonymous functions if you're interested:

// $(document).ready(function () {
//   $spans = $('span');
//
//   $spans.on('click',function () {
//     $(this).removeClass('revealed');
//     $(this).addClass('redacted');
//   });
//
//   setInterval(function () {
//     $spans.each(function () {
//       let r = Math.random();
//       if (r < REVEAL_POSSIBILITY) {
//         $(this).removeClass('redacted');
//         $(this).addClass('revealed');
//       }
//     });
//   },UPDATE_FREQUENCY);
// });
