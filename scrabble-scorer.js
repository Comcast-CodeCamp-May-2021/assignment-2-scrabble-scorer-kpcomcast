// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue);
		 }
 
	  }
	}
	return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  let inputWord = input.question("Enter a word to score: ", {
    keepWhitespace: true
  });
  while (inputWord.match(/[^a-z A-Z]/) !== null) {
    inputWord = input.question("Enter a word to score: ", {
      keepWhitespace: true
    });
   }
  return inputWord;
};

let simpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: function(word) {
    word = word.toUpperCase();
    let score = 0;
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i = 0; i < word.length; i++) {
      if (letters.includes(word[i])) {
        score += 1;
      }
    }
    return score;
  }
};

let vowelBonusScore = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: function(word) {
    word = word.toUpperCase();
    let score = 0;
    let vowels = "AEIOU";
    let consonants = "BCDFGHJKLMNPQRSTVWXYZ"
    for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
        score += 3;
      } else if (consonants.includes(word[i])) {
        score += 1;
      }
    }
    return score;
  }
};

let scrabbleScore = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: function(word) {
    word = word.toLowerCase();
    let score = 0;
    for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]]
    }
    return score;
  }
};

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt() {
  console.log(`Which scoring algorith would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`);
  let pick = Number(input.question("Enter 0, 1, or 2: "));
  while (pick !== 0 && pick !== 1 && pick !== 2) {
    pick = Number(input.question("Enter 0, 1, or 2: "));
  }
  return scoringAlgorithms[pick];
}

function transform(object) {
  let newStructure = {};
  for (let key in object) {
    for (let k in object[key]) {
      newStructure[object[key][k].toLowerCase()] = Number(key);
    }
  }
  return newStructure;
}

let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;

function runProgram() {
  wordChoice = initialPrompt();
  algoChoice = scorerPrompt();
  return console.log(`Score for '${wordChoice}': ${algoChoice.scorerFunction(wordChoice)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

