// Looking to take input (number) in from the user
// Checks that number against a random, secret number
// Returns an answer to the user, letting them know if its higher, lower or correct

// Sets the secret number that needs to be guessed later on.
console.log('Close the curtain!! You shouldn\'t be in here!!');
const secretNumber = Math.floor(Math.random()*(100-1)+1);
console.log(`Secret Number: ${secretNumber}`);
let count = 0;
let attempts = [];
const name = getUserName();

function getUserName() {
    let userName = prompt('Welcome! Can I get your name?');
    return userName;
}

// starts the Guessing Game, should be only the first time around
function startTheGame() {
    alert(`Congratulations, ${name}! You are now playing the \"Guessing Game\"! In this game, you will be asked to guess a number between 1 and 100. In the prompt, type your answer (only numbers!) and we\'ll let you know if you guess it correctly. Good luck!`);
    let numInp = prompt('Go ahead and give us your best guess!');
    let num = parseInt(numInp);
    attempts.push(num);
    count +=1;
    console.log(count);
    if (num === secretNumber) {
        alert(`Holy cow, ${name}! You got it on the first try! You\'re awesome!`);
    } else {
        startGuessing(num);
    }
}

// Main loop function to handle inputs
function startGuessing(number) {
    let validInput = false;
    while (!validInput) {
        const result = mainGuess();
        if (result === `Correct, ${name}! You got it! It only took ${count} tries. Your guesses were: ${attempts.join(", ")}.`) {
            validInput = true;
        }
        alert(result);
    }
}

// Parses the input to see what happens next.
function mainGuess() {
    let numImp = prompt('Let\'s give it another try:');
    const num = parseInt(numImp);
    attempts.push(num)
    count +=1;
    console.log(count);
    if (Number.isInteger(num)) {
        if (num < secretNumber) {
            return `Sorry ${name}, you\'ll need to go higher next time.`;
        } else if (num > secretNumber) {
            return `Sorry ${name}, you\'ll need to go lower next time.`;
        } else if (num === secretNumber) {
            return `Correct, ${name}! You got it! It only took ${count} tries. Your guesses were: ${attempts.join(", ")}.`;
        }
    } else {
        return `Come on now, ${name}. We told you only numbers, get it right next time!`;
    }
}

startTheGame();




/* The below pseudocode was from how I originally created the code. It was functioning properly
on the page when I first wrote it but I adopted the while loop form that Phil was showing us */


// Main guessing funtion which the page should loop through. Adds 1 to the count variable.
// function startGuessing (number){
//     if (number == secretNumber) {
//         count +=1;
//         alert(`Congratulations! You got it!! Only took you ${count} tries!!`);
//     } else if (!Number.isInteger(number)) {
//         alert('Oh, come on now. We told you only numbers, get it right next time!');
//     } else if (number < secretNumber) {
//         count +=1;
//         lowerGuess(number);
//     } else if (number > secretNumber) {
//         count +=1;
//         higherGuess(number);
//     }
// }
// // Function for if the number is lower than the secret number, loops back into startGuessing and adds 1 to the count variable.
// function lowerGuess(number) {
//     alert('You\'ll need to go higher next time.');
//     let numInput = prompt('Let\'s give another guess:');
//     let num = parseInt(numInput);
//     startGuessing(num);
// }
// // Function for if the number is higher than the secret number, loops back into startGuessing and adds 1 to the count variable.
// function higherGuess(number) {
//     alert('You\'ll need to go lower next time.');
//     let numInput = prompt('Let\'s give another guess:');
//     let num = parseInt(numInput);
//     startGuessing(num);
// }



