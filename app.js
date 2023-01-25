// Looking to take input (number) in from the user
// Checks that number against a random, secret number
// Returns an answer to the user, letting them know if its higher, lower or correct

/* I= name, numbers, and a yes/no to repeat.
   O= higher, lower, or correct answer; names in prompts/alerts; starts over if player wants to go again.
   C= only accepts numbers during the guessing game, string for name.
   E= see in coding for edge cases*/

// Sets the secret number that needs to be guessed later on.
console.log('Close the curtain!! You shouldn\'t be in here!!');  // when in dev tools, lets me know it initalized properly
let secretNumber = getRandomNumber(1,100);                   // generates a random number between 1-100
let name = getUserName();                                    // stores user's name
let attempts = [];                                           // stores number of guesses per game
let nameObj = {};                                            // stores user's name and number of attempts of last game they played

// function to generate the random secret number and store in the 'secretNumber' variable above.
function getRandomNumber(min,max) {
    let randomNum = Math.floor(Math.random()*(max-min)+min);
    console.log(`Secret Number: ${randomNum}`);              // mainly for troubleshooting and tracking 
    return randomNum;
}

// function used to get the user's name and store in the 'name' variable above.
function getUserName() {
    let userName = prompt('Welcome! Can I get your name?');
    return userName;
}

// Starts the Guessing Game, runs only for the first guess, then invokes the main logic function.
function startTheGame() {
    alert(`Congratulations, ${name}! You are now playing the \"Guessing Game\"! In this game, you will be asked to guess a number between 1 and 100. In the prompt, type your answer (only numbers!) and we\'ll let you know if you guess it correctly. Good luck!`);
    let numInp = prompt('Go ahead and give us your best guess!');  // gets first number input from user
    let num = parseInt(numInp);                              // parses from string to number value
    attempts.push(num);                                      //pushes the number to the attempts array
    console.log(attempts.length, num);                       // mainly for troubleshooting and tracking
    if (num === secretNumber) {                              // conditional for if user correctly guesses on first try
        alert(`Holy cow, ${name}! You got it on the first try! You\'re awesome!`);
        if (nameObj.hasOwnProperty(name)) {                  // compares this game with previous games for difference of attempts
            alert(`Awesome, you got it in ${nameObj[name] - attempts.length} less guesses than last time.`)
        }
        nameObj[name] = attempts.length;                     // pushes the number of attempts to the name object for storage
        let restart = prompt('Would you like to play again, yes or no?')
        if (restart.toLowerCase() === 'yes') {               // if answer is yes, then restarts the game.
            secretNumber = getRandomNumber(1,100);           // These lines reset the secretNumber, userName and clear the attempts array
            name = getUserName();
            attempts = [];
            startTheGame();                                  //restarts the game
        } else {                                             // gives a good-bye prompt if answer is no
            alert('Ok, good bye!');
        }
    } else {
        startGuessing(num);                                  // if not correct on first try, invokes the main logic function
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
        if (validInput == true) {                            // this conditional checks if they guessed it correctly and compares against previous games
            if (nameObj.hasOwnProperty(name)) {              // checks to see if the user has played before
                if (nameObj[name] > attempts.length) {       // this conditional compares previous attempts with current attempts
                    alert(`Awesome, you needed ${nameObj[name]-attempts.length} less guesses than last time.`)
                } else if (nameObj[name] < attempts.length) {
                    alert(`You got it in ${attempts.length-nameObj[name]} more guesses than last time.`)
                }
            }
            nameObj[name] = attempts.length;                 // pushes the number of attempts to the name object for storage
            let restart = prompt('Would you like to play again, yes or no?'); // checks to see if they want to play again
            if (restart.toLowerCase() === 'yes') {           // if answer is yes, then restarts the game.
                secretNumber = getRandomNumber(1,100);       // These lines reset the secretNumber, userName and clear the attempts array
                name = getUserName();
                attempts = [];
                startTheGame();                              // restarts the game
            } else {                                         // gives a good-bye prompt if answer is no
                alert('Ok, good bye!');
            }
        
        }
    }
}

// Parses the input to see what happens next. Invoked by the main logic function
function mainGuess() {
    let numImp = prompt('Let\'s give it another try:');
    const num = parseInt(numImp);
    attempts.push(num);                                      // pushes the number to the attempts array
    console.log(attempts.length, num);                       // mainly for troubleshooting and tracking 
    if (Number.isInteger(num)) {                             // checks if the number input is valid
        if (num < secretNumber) {                            // if valid, compares it to the secretNumber
            return [`Sorry ${name}, you\'ll need to go higher next time.`, num];
        } else if (num > secretNumber) {
            return [`Sorry ${name}, you\'ll need to go lower next time.`, num];
        } else if (num === secretNumber) {
            return [`Correct, ${name}! You got it! It only took ${attempts.length} tries. Your guesses were: ${attempts.join(", ")}.`, num];
        }
    } else {
        return [`Come on now, ${name}. We told you only numbers, get it right next time!`, 0];   //edge case if they try to give a non-number input
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
// // Function for if the number is lower than the secret number, invokes startGuessing and adds 1 to the count variable.
// function lowerGuess(number) {
//     alert('You\'ll need to go higher next time.');
//     let numInput = prompt('Let\'s give another guess:');
//     let num = parseInt(numInput);
//     startGuessing(num);
// }
// // Function for if the number is higher than the secret number, invokes startGuessing and adds 1 to the count variable.
// function higherGuess(number) {
//     alert('You\'ll need to go lower next time.');
//     let numInput = prompt('Let\'s give another guess:');
//     let num = parseInt(numInput);
//     startGuessing(num);
// }



