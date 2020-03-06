"use strict";

/********************************************************************

DoomTube
Mihaela Eftene

DoomTube is a card game based on the hidden reality that Youtube does not show. The player has 12 identical red cards which represent innocence (Children think that everything looks okay, the same). Each card has a number on it. Once the user is ready to play, he will say “go with” and then the number that he wants. Because this game has an API called Annyang which will detect words, the card will flip depending on the number of the card that the user wants. For people that Annyang might not work, they can just click on the cards. Once the card has been flipped, he will see a video which could be considered either as good or bad. If it's bad, a certain voice that says “No Mercy” will activate to showcase that Youtube only cares for profit which is when that concept of innocence will disappear. Once activated, the score at the top will go up by 1 million every time that the user gets a bad card which shows the monstrous amount of profit that Youtube or Google makes of off children’s videos. However, if the user falls on a good video, the profit will drop to 0 because they are seen as legit videos (only a few).

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
    url: 'https://www.youtube.com/embed/IVy42rWmFLc',
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
    name: 'six',
    url: 'https://www.youtube.com/embed/pe0RxB3X6To',
    emotion: "bad"
  },
  {
    name: 'seven',
    url: 'https://www.youtube.com/embed/pTYVXOcDAjA',
    emotion: "bad"
  },
  {
    name: 'eight',
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

//declare score
let score = 0;

//declare the sound that will be used once the user gets a bad card
let flipSFX = new Audio("assets/sounds/noMercy.wav");

// what will show when the page is loaded
$(document).ready(setup);


//setup()
function setup() {
  // handles the flipping of the video
  $(".card").flip();
  $('.card').on('click', clickHandler);


  //clickHandler()
  //To make Annyang flip the card, there's a need for a click so once the user asks Annyang to flip a certain card it will. For those that Annyang does not work, they can just click on the cards
  function clickHandler() {
    //the card will flip
    $(this).flip();
    //select attribute based on the id of the card
    let cardNum = $(this).attr("id");
    //show the video based on the url shown in the array
    let videoContainer = $('<iframe class = "video"  src="' + videoArray[cardNum].url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    //append the children to the videoContrainer
    $(this).children(".back").append(videoContainer);
    //if the video that the user is considered as bad (Look through the array), it will add +1 (in millions) to the score. (YES THEY MAKE THAT MUCH PROFIT :)
    if (videoArray[cardNum].emotion === "bad") {
      score++;
      scoreDisplay();
      //play sound once a bad card has been activated
      flipSFX.play();
      //the amount of profit drops at 0
    } else {
      score = 0;
      scoreDisplay();
    }
  }
  allVoiceCommands();
  scoreDisplay();
}


//scoreDisplay()
// Created a tag to display the score
function scoreDisplay() {
  $("#score").text('Profit That Youtube And Google makes of off childrens videos (In millions):' + score);
  let $setTheScore = $("#score");
  console.log($setTheScore)
}


// Setting Annyang. The user can use his voice to flip a card by saying the number
//allVoiceCommands()
function allVoiceCommands() {
  if (annyang) {
    //Let the user guess Command
    let guessCard = {
      //number of the card
      'Go with *number': checkCard
    }
    // All annyang Commands
    annyang.addCommands(guessCard);
    annyang.start();
  };
}


//checkCard()
function checkCard(cardNum) {
  //go through all the array and look
  for (let i = 0; i < videoArray.length; i++) {
    //
    //look through the whole array and get the element by Id that correspond with the card.
    if (videoArray[i].name === cardNum) {
      document.getElementById(i).click();
    }
  }
}
