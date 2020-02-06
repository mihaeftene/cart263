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
    //if the number of characters is bigger than 50, then delete 1 character slowly.
    if ($theCharacterString.val().length > 50) {
      let deletingLetters = setInterval(function() {
        let letterString = $theCharacterString.val().substring(0, $theCharacterString.val().length - 1);
        $theCharacterString.val(letterString); //letters string
        //if statement. Once the number of characters is 0 clear the interval.
        if ($theCharacterString.val().length === 0) {
          clearInterval(deletingLetters);
        }
        //delete the characters every 1 second
      }, 1000)
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
  //make the liquid paper draggable
  $("#dropLiquidPaper").draggable({
    start: function() {},
    stop: function() {}
  });
  //make the red paint draggable
  $("#dropRedPaint").draggable({
    start: function() {},
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
  let id =ui.draggable.attr('id');
  console.log(id);
  if (id === "dropRedPaint"){
    $("#text").removeClass("cleanPaper");
    $("#text").addClass("redPaper");
  }
  else if (id === "dropLiquidPaper"){
    $("#text").removeClass("redPaper");
    $("#text").addClass("cleanPaper");
    console.log(id);
  }

  ui.draggable.remove(); //.remove() would work here too
  // Get the redPaint element from the page
  //once you drop it, the clean paper will be gone and the red paper will appear
}

//showNewEssayQuestion()-->Meant for triggering a question once the button has been clicked.
function showNewEssayQuestion() {
  let randomQuestion = Math.floor(Math.random() * (essayQuestionsArray.length));
  document.getElementById('essayQuestions').innerHTML = essayQuestionsArray[randomQuestion];
}
