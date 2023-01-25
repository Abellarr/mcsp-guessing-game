// Looking to take input (number) in from the user
// Checks that number against a random, secret number
// Returns an answer to the user, letting them know if its higher, lower or correct

/* I= name, numbers, and a yes/no to repeat.
   O= higher, lower, or correct answer; names in prompts/alerts; starts over if player wants to go again.
   C= only accepts numbers during the guessing game, string for name.
   E= see in coding for edge cases*/

// Sets the secret number that needs to be guessed later on.
console.log('Close the curtain!! You shouldn\'t be in here!!');
let secretNumber = getRandomNumber(1,100);
let name = getUserName();  // stores user's name
let attempts = []; // stores number of guesses per game
let nameObj = {}; // stores user's name and number of attempts of last game they played

// function to generate the random secret number and store in the 'secretNumber' variable above.
function getRandomNumber(min,max) {
    let randomNum = Math.floor(Math.random()*(max-min)+min);
    console.log(`Secret Number: ${randomNum}`);
    return randomNum;
}

// function used to get the user's name and store in the 'name' variable above.
function getUserName() {
    let userName = prompt('Welcome! Can I get your name?');
    return userName;
}

// Starts the Guessing Game, starts only the first time around and kicks it over to the main logic function.
function startTheGame() {
    alert(`Congratulations, ${name}! You are now playing the \"Guessing Game\"! In this game, you will be asked to guess a number between 1 and 100. In the prompt, type your answer (only numbers!) and we\'ll let you know if you guess it correctly. Good luck!`);
    let numInp = prompt('Go ahead and give us your best guess!');
    let num = parseInt(numInp);
    attempts.push(num);
    console.log(attempts.length, num);
    if (num === secretNumber) {
        alert(`Holy cow, ${name}! You got it on the first try! You\'re awesome!`);
        if (nameObj.hasOwnProperty(name)) {
            alert(`Awesome, you got it in ${nameObj[name] - attempts.length} less guesses than last time.`)
        }
        nameObj[name] = attempts.length;
        let restart = prompt('Would you like to play again, yes or no?')
        if (restart == 'yes' || restart == 'Yes' || restart == 'YES') { // only accepts these three forms of 'yes'.
            secretNumber = getRandomNumber(1,100);
            name = getUserName();
            attempts = [];
            startTheGame();
        }
    } else {
        startGuessing(num);
    }
}

// Main loop function to handle number guessing inputs.
function startGuessing(number) {
    let validInput = false;
    while (!validInput) {
        const result = mainGuess();
        if (result[0] === `Correct, ${name}! You got it! It only took ${attempts.length} tries. Your guesses were: ${attempts.join(", ")}.`) {
            validInput = true;
        }
        alert(result[0]);
        if (validInput == true) {
            if (nameObj.hasOwnProperty(name)) { // checks to see if the user has played before
                if (nameObj[name] > attempts.length) {
                    alert(`Awesome, you needed ${nameObj[name]-attempts.length} less guesses than last time.`)
                } else if (nameObj[name] < attempts.length) {
                    alert(`You got it in ${attempts.length-nameObj[name]} more guesses than last time.`)
                }
            }
            nameObj[name] = attempts.length;
            let restart = prompt('Would you like to play again, yes or no?');
            if (restart == 'yes' || restart == 'Yes' || restart == 'YES') {
                secretNumber = getRandomNumber(1,100);
                name = getUserName();
                attempts = [];
                startTheGame();
            }
        
        }
    }
}

// Parses the input to see what happens next.
function mainGuess() {
    let numImp = prompt('Let\'s give it another try:');
    const num = parseInt(numImp);
    attempts.push(num);
    console.log(attempts.length, num);
    // console.log(count);
    if (Number.isInteger(num)) {
        if (num < secretNumber) {
            return [`Sorry ${name}, you\'ll need to go higher next time.`, num];
        } else if (num > secretNumber) {
            return [`Sorry ${name}, you\'ll need to go lower next time.`, num];
        } else if (num === secretNumber) {
            return [`Correct, ${name}! You got it! It only took ${attempts.length} tries. Your guesses were: ${attempts.join(", ")}.`, num];
        }
    } else {
        return [`Come on now, ${name}. We told you only numbers, get it right next time!`, 1]; //edge case if they try to give a non-number input
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



