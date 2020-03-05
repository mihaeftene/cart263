"use strict";

/********************************************************************

Name of the Project
Mihaela Eftene

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

// videos that will appear according to the number of the card that will be flipped
let videoArray = [{
    name: '1',
    url: 'https://www.youtube.com/embed/BDRQdMufFL0'
  },
  {
    name: '2',
    url: 'https://www.youtube.com/embed/TdEk2mdSTG4'
  },
  {
    name: '3',
    url: 'orange.jpg'
  },
  {
    name: '4',
    url: 'orange.jpg'
  },
  {
    name: '5',
    url: 'orange.jpg'
  },
  {
    name: '6',
    url: 'orange.jpg'
  },
  {
    name: '7',
    url: 'orange.jpg'
  },
  {
    name: '8',
    url: 'https://www.youtube.com/watch?v=BHcFQ9gaMF4'
  },
  {
    name: '9',
    url: 'orange.jpg'
  },
  {
    name: '10',
    url: 'orange.jpg'
  },
  {
    name: '11',
    url: 'https://www.youtube.com/watch?v=C3c8fzbsfOE'
  },
  {
    name: '12',
    url: 'orange.jpg'
  }
];

$(document).ready(setup);

function setup() {
  // handles the flipping of the video
  $('.card').on('click', clickHandler);

  function clickHandler() {
    //select attribute based on the id of the card
    let cardNum = $(this).attr("id");
    console.log(videoArray[cardNum]);
    //show the video based on the url shown in the array
    let videoContainer = $('<iframe width="560" height="315" src="' + videoArray[cardNum].url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $(this).append(videoContainer);
  }
}
