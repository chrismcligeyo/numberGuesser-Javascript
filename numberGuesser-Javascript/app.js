// GAME FUNCTION
// player must guess a number betweesses remn min adn max
// player gets a certain amount of guainingesses
// Notify player of guessesremaining,
// notify player of correct answerif he losses
// let player choose to play again


//game values

let min = 1,
    max = 10,
    //winningNum = 2;
    winningNum = getWinningNum(min, max), //function that makes winning number a random number
    guessesLeft = 3;


//UI elements
const game = document.querySelector("#game"),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


//make min-num and max-num dynamic
minNum.textContent = min;
maxNum.innerText = max;

//play again event listener
game.addEventListener('mousedown', function(e) {

    if (e.target.className === 'play-again') {
        window.location.reload();

    }


});
//listen for guess
guessBtn.addEventListener('click', function() {

    let guess = Number(guessInput.value); //value of input field.use parseint to turn it to a number. a number is blue in console.lets say console shows 2 in black, that 2 is a string, use parseint to change to num


    //usually we checkif guess is not a string when validating. since its a number wil use function isNaN
    //validate

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }


    //check if won

    if (guess === winningNum) {
        //game over won

        gameOver(true, `${winningNum} is correct! YOU WIN`);

        //above was refactored, below is before refactoring

        // //disable input
        // guessInput.disabled = true;

        // //chnge border color to green
        // guessInput.style.borderColor = 'green';

        // //set msg
        // setMessage(`${winningNum} is correct!`, 'green');
    } else {
        //if one has entered wrong number
        guessesLeft -= 1; //means guessesLeft = guessesLeft - 1 

        if (guessesLeft === 0) {
            //gameover - lost
            guessInput.disabled = true;

            //chnge border color to green
            guessInput.style.borderColor = 'red';

            //set msg
            setMessage(`Game over you lost. The correct number was ${winningNum}`, 'red');


        } else {
            //game continues anwer wrong. they guess wrong but the game is not over

            //change border color
            guessInput.style.borderColor = 'blue';

            //clear input
            guessInput.value = '';

            //tell user its the wrong number
            setMessage(`${guess} is not correct ${guessesLeft} guesses left`, 'blue');





        }
    }

});


//we refactor the code above
function gameOver(won, msg) { //won is boolean, will be true or false, when we call the function at the top, in the win part will be value of true, lose part value of false
    // 
    let color;
    won ? color = 'green' : color = 'red'; //if you win, color is green, lose color is red
    //disable input
    guessInput.disabled = true;

    //chnge border color to green
    guessInput.style.borderColor = color;

    //
    message.style.color = color;

    //set msg
    setMessage(msg);

    //when you win, guess button is turned to play again

    guessBtn.value = 'Play Again';
    guessBtn.className += "play-again"; //append play again class to guessbtn

    //we need an event listener for play again. play-again class was added after page loads, we have to use event delegation. Meaning we have to add listener to the parent
    // since its an event listener, we add it at the top


}

//get winning number

function getWinningNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); //gives you a random nuber between 1 and 10

}


//setMessage

function setMessage(msg, color) { //setmessage hs value msg and color
    message.style.color = color; //
    message.textContent = msg;

}