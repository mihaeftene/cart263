"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

/*Declare our array of questions*/
let essayQuestionsArray = ['An Analysis of the True Hero of A Lesson Before Dying, a Novel by Ernest J. Gaine', 'Contrast between two novels', 'What is technology these days', 'A Summary of the Book, Death of a Salesman by Arthur Miller'];

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
}

//showNewEssayQuestion()-->Meant for triggering a question once the button has been clicked.
function showNewEssayQuestion() {
  let randomQuestion = Math.floor(Math.random() * (essayQuestionsArray.length));
  document.getElementById('essayQuestions').innerHTML = essayQuestionsArray[randomQuestion];
}
