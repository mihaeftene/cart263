"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

//Declare our array of questions*/
let essayQuestionsArray = ['An Analysis of the True Hero of A Lesson Before Dying, a Novel by Ernest J. Gaine', 'Contrast between two novels', 'What is technology these days', 'A Summary of the Book, Death of a Salesman by Arthur Miller'];
//declare my red paint variable*/
let $dropRedPaint;
//declare the paper*/
let $paper;
//declare the liquidPaper variable
let $liquidPaper;

//global variable
let deletingLetters;

// Sound effects for the experience
let trollSFX = new Audio("assets/sounds/trollSong.mp3");
let deleteAllSFX = new Audio("assets/sounds/deleteAll.wav");
let typingDeleteSFX = new Audio("assets/sounds/typingDelete.wav");

/*what will show when the page is loaded*/
$(document).ready(setup);

function setup() {
  //set the timer for the questions when to change. In this case it will change every 10 seconds. Better work that brain! Good luck! :)
  setInterval(showNewEssayQuestion, 10000);
  //console.log(document.getElementById("text"));

  //for the text area where the user will write its essay, After a certain number of characters written (50), the characters will be slowly deleted by 1.
  $("#text").on("change keyup paste", function() {

    //setting up the jquery character object that is being grabbed from html
    let $theCharacterString = $(this)
    //if the number of characters is equal 50, then delete 1 character slowly.
    if ($theCharacterString.val().length === 50) {
      console.log("Oh no");
      if (deletingLetters === undefined) {
        deletingLetters = setInterval(function() {
            let letterString = $theCharacterString.val().substring(0, $theCharacterString.val().length - 1);
            $theCharacterString.val(letterString); //letters string
            typingDeleteSFX.play();
            console.log("delete");
            //if statement. Once the number of characters is 0 clear the interval.
            if ($theCharacterString.val().length === 0) {
              clearInterval(deletingLetters);
            }
            //delete the characters every 300 mil
          }, 300)
    }
  }
  });

  //lets do the paint!
  // Get the paper element from the page
  $paper = $('#text');
  // Make it droppable
  $paper.droppable({
    // The drop option specifies a function to call when a drop is completed
    drop: onDrop
  });
  //make the liquid paper draggable and play the delete song
  $("#dropLiquidPaper").draggable({
    start: function() {
      deleteAllSFX.play();
    },
    stop: function() {
      trollSFX.pause();
    }
  });
  //make the red paint draggable and play the troll song
  $("#dropRedPaint").draggable({
    start: function() {
      trollSFX.play();
    },
    stop: function() {}
  });
}


// onDrop(event,ui)
//
// Called when a draggable element is dragged over the droppable element (the animal)
// In this instance it can only be the red Paint (it's the only draggable element).
// The arguments 'event' and 'ui' are automatically passed by jQuery UI and contain
// helpful information about the event.
function onDrop(event, ui) {
  console.log("You drop it");
  // ui contains a reference to the draggable element that was just dropped in ui.draggable
  // .remove() removes the select element from the page
  //check which id we are using. It allows to change between the liquid paper or the red paper.
  let id = ui.draggable.attr('id');
  //if the paper is clean and we are using the red paint, remove the clean paper and add the red paper
  if (id === "dropRedPaint") {
    $("#text").removeClass("cleanPaper");
    $("#text").addClass("redPaper");
  }
  //else, if we use the liquidPaper, remove the red paper and replace it with clean paper.
  else if (id === "dropLiquidPaper") {
    $("#text").removeClass("redPaper");
    $("#text").addClass("cleanPaper");
  }

  ui.draggable.remove(); //.remove() would work here too
}

//showNewEssayQuestion()-->Meant for triggering a question once the button has been clicked.
function showNewEssayQuestion() {
  let randomQuestion = Math.floor(Math.random() * (essayQuestionsArray.length));
  document.getElementById('essayQuestions').innerHTML = essayQuestionsArray[randomQuestion];
}
