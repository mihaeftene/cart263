"use strict";

/********************************************************************

Name of the Project
Mihaela Eftene

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);


function setup() {
clickHandler();
}

// handles the flipping of the video
function clickHandler() {
  $('.card').on('click', function() {
    $('.card').text('1');
    $(this).text("up");
  });
}
