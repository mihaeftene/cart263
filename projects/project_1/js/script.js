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

}

//showNewEssayQuestion()-->Meant for triggering a question once the button has been clicked.
function showNewEssayQuestion(){
let randomQuestion= Math.floor(Math.random()*(essayQuestionsArray.length));
document.getElementById('essayQuestions').innerHTML = essayQuestionsArray[randomQuestion];
}
