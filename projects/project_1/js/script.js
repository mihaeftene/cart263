"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

/*Declare our array of questions*/
let essayQuestionsArray = ['An Analysis of the True Hero of A Lesson Before Dying, a Novel by Ernest J. Gaine','Contrast between two novels', 'What is technology these days', 'A Summary of the Book, Death of a Salesman by Arthur Miller'];

/*what will show when the page is loaded*/
$(document).ready(setup);
function setup(){
  //set the timer for the questions when to change. In this case it will change every 10 seconds. Better work that brain! Good luck! :)
setInterval(showNewEssayQuestion,1000);
//console.log(document.getElementById("text"));

//for the text area where the user will write its essay, After a certain number of characters written (20), the characters will be slowly deleted by 4.
$("#text").on("change keyup paste", function() {
  console.log( $(this).val());
  //if the number of characters is bigger than 20, then delete 4 characters.
  if($(this).val().length>20){
  let characterString = $(this).val().substring(0,$(this).val().length-4);
  $(this).val(characterString);
}
});
}

//showNewEssayQuestion()-->Meant for triggering a question once the button has been clicked.
function showNewEssayQuestion(){
let randomQuestion= Math.floor(Math.random()*(essayQuestionsArray.length));
document.getElementById('essayQuestions').innerHTML = essayQuestionsArray[randomQuestion];
}
