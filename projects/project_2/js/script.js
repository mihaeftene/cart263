"use strict";

/********************************************************************

Name of the Project
Mihaela Eftene

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

// videos that will appear according to the number of the card that will be flipped
let videoArray = [{
    name: 'one',
    url: 'https://www.youtube.com/embed/BDRQdMufFL0',
    emotion: "bad"
  },
  {
    name: 'two',
    url: 'https://www.youtube.com/embed/TdEk2mdSTG4',
    emotion: "bad"
  },
  {
    name: 'three',
    url: 'https://www.youtube.com/embed/5ZCgbGgA-_8',
    emotion: "good"
  },
  {
    name: 'four',
    url: 'https://www.youtube.com/embed/BHcFQ9gaMF4',
    emotion: "bad"
  },
  {
    name: 'five',
    url: 'https://www.youtube.com/embed/DxNWbBXoKrg',
    emotion: "good"
  },
  {
    name: '6',
    url: 'https://www.youtube.com/embed/pe0RxB3X6To',
    emotion: "bad"
  },
  {
    name: '7',
    url: 'https://www.youtube.com/embed/pTYVXOcDAjA',
    emotion: "bad"
  },
  {
    name: '8',
    url: 'https://www.youtube.com/embed/RKdxvKRqeN8',
    emotion: "bad"
  },
  {
    name: '9',
    url: 'https://www.youtube.com/embed/wJwS1mfj6j4',
    emotion: "good"
  },
  {
    name: '10',
    url: 'https://www.youtube.com/embed/zJjgXxO0z-Q',
    emotion: "bad"
  },
  {
    name: '11',
    url: 'https://www.youtube.com/embed/JC2dQaqRuBY',
    emotion: "bad"
  },
  {
    name: '12',
    url: 'https://www.youtube.com/embed/B4ciM0nCLvA',
    emotion: "bad"
  }
];

//declare good videos
let goodCards;
// declare bad videos
let badCards;
//declare score
let score = 0;

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
    allVoiceCommands();
    scoreDisplay();
}

//scoreDisplay()
// Created a tag to display the score
function scoreDisplay() {
  $("#score").text('Profit That Youtube And Google Made of off children:' + score);
  let $setTheScore = $("#score");
  console.log($setTheScore)
}

// Setting Annyang. The user can use his voice to flip a card by saying the number
//allVoiceCommands()
//Annyang voice commands and actions
function allVoiceCommands() {
  if (annyang) {
    //Let the user guess Command
    let guessCard = {
      //number of the card
      'Go with *number': function(cardNum) {
        for(let i=0; i<videoArray.length;i++){
          if(videoArray[i].name === cardNum){
          if (videoArray[i].emotion === "bad") {
            score++;
            scoreDisplay(); //
          } else {
            score = 0;
            scoreDisplay();
        }
        }
      }
    }
  };
  // All annyang Commands
  annyang.addCommands(guessCard);
  annyang.start();
  annyang.debug(true);
}
} // end of voice commands
