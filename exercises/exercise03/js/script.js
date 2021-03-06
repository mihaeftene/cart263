"use strict";

/*****************

Slamina
Aleahim Enetfe - Mihaela Eftene

A simple guessing game based on voice synthesis. The computer reads out an
animal name, but it reads it backwards. The user selects the animal they
think it is and either gets it right or wrong. If right, a new level is generated.
If wrong, the voice reads it out again.

Uses:

ResponsiveVoice
https://responsivevoice.org/

Animal names from:
https://github.com/dariusk/corpora/blob/master/data/animals/common.json

******************/

// An array of animal names that we use to create our guessing game
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

// We need to track the correct button for each round
let correctAnimal;
//Answers array
let arrayAnswers = [];
// We also track the set of buttons
let buttons = [];
//set the score
let score = 0;
const NUM_OPTIONS = 7;

// Get setup!
$(document).ready(setup);


// setup()
//
// We just start a new round right away!
function setup() {
  allVoiceCommands();
  newRound();
  scoreDisplay();
}


// newRound()
//
// Generates a set of possible giveAnswers randomly from the set of animals
// and adds buttons for each one. Then chooses the correct button randomly.
function newRound() {
  $('.guess').remove();
  arrayAnswers = []; // empty giveAnswers array

  // for loop that will go through all of the animals options
  for (let i = 0; i < NUM_OPTIONS; i++) {
    //choose one giveAnswer out of 7
    let giveAnswer = animals[Math.floor(Math.random() * animals.length)];
    //add the giveAnswer button
    addButton(giveAnswer);
    arrayAnswers.push(giveAnswer);
  }
  correctAnimal = arrayAnswers[Math.floor(Math.random() * arrayAnswers.length)];
  //say the correct animal backwards
  sayBackwards(correctAnimal);
}


// sayBackwards(text)
//
// Uses ResponsiveVoice to say the specified text backwards!
function sayBackwards(text) {
  // We create a reverse version of the name by:
  // 1. using .split('') to split the string into an array with each character
  // as a separate element.
  // e.g. "bat" -> ['b','a','t']
  // 2. using .reverse() on the resulting array to create a reverse version
  // e.g. ['b','a','t'] -> ['t','a','b']
  // 3. using .join('') on the resulting array to create a string version of the array
  // with each element forming the string (joined together with nothing in between)
  // e.g. ['t','a','b'] -> "tab"
  // (We do this all in one line using "chaining" because .split() returns an array for
  // for .reverse() to work on, and .reverse() returns an array for .join() to work on.)
  let backwardsText = text.split('').reverse().join('');
  // Set some random numbers for the voice's pitch and rate parameters for a bit of fun
  let options = {
    pitch: Math.random(),
    rate: Math.random()
  };
  // Use ResponsiveVoice to speak the string we generated, with UK English Male voice
  // and the options we just specified.
  responsiveVoice.speak(backwardsText, 'UK English Male', options);
}


// addButton(label)
//
// Creates a button using jQuery UI on a div with the label specified
// and adds it to the page, returning the button as well
function addButton(label) {
  // Create a div with jQuery using HTML
  let $button = $('<div></div>');
  // Give it the guess class
  $button.addClass("guess");
  // Set the text in the div to our label
  $button.text(label);
  // Turn the div into a button using jQuery UI's .button() method
  $button.button();
  // Listen for a click on the button which means the user has guessed
  $button.on('click', handleGuess);
  // Finally, add the button to the page so we can see it
  $('.guessWho').append($button);
  // Return the button
  return $button;
}


//scoreDisplay()
// Created a tag to display the score
function scoreDisplay() {
  $("#score").text('SCORE:' + score);
  let $setTheScore = $("#score");
  console.log($setTheScore)
}


//allVoiceCommands()
//Annyang voice commands and actions
function allVoiceCommands() {
  if (annyang) {
    // please reveal the correct Animal when the user says "I give up"
    let giveUp = {
      'I give up': function() {
        $('.guess').each(checkIfGood);
        score = 0;
        scoreDisplay();
        console.log("Oh So you give up?");
        setTimeout(newRound, 1000); //start a new round once displayed the correct giveAnswer
      }
    }; //end of the "I give up" Command.

    // Repeat the name of the animal again
    let repeatAgain = {
      'Say it again': function() {
        console.log("repeat");
        sayBackwards(correctAnimal);
      }
    }; // end of the "Repeat Again" Command.

    //Let the user guess Command
    let speakGuess = {
      //name of the animal that was guessed
      'I think it is *animal': function(animal) {
        console.log("animal" + animal);
        // allow the animal to be detected even to lower case
        if (animal.toLowerCase() === correctAnimal.toLowerCase()) {
          $('.guess').each(checkIfGood);
          score++;
          scoreDisplay(); //
        } else {
          score = 0;
          scoreDisplay();
        }
        //Refresh to a new round
        setTimeout(newRound, 1000);
      }
    };
    // All annyang Commands
    annyang.addCommands(giveUp);
    annyang.addCommands(speakGuess);
    annyang.addCommands(repeatAgain);
    annyang.start();
  }
} // end of voice commands


//checkIfGood()
// Check through all of the boxes and see if its correct, hightlight the correct giveAnswer
function checkIfGood() {
  if ($(this).text() == correctAnimal) {
    $(this).css("background-color", "#25e000");
  }
}


// handleGuess()
//
// Checks whether this was the correct guess (button) and
// if so starts a new round
// if not indicates it was incorrect
function handleGuess() {
  // If the button they clicked on has the same label as
  // the correct button, it must be the right giveAnswer...
  if ($(this).text() == correctAnimal) {
    // Remove all the buttons
    $('.guess').remove();
    // Start a new round
    setTimeout(newRound, 1000);
  } else {
    // if guessed animal is wrong shake and repeat correct animal name
    $('.guess').effect('shake');
    score = 0
    scoreDisplay();
    sayBackwards(correctAnimal);
  }
}


// getRandomElement(array)
//
// Returns a random element from the provided array
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}
