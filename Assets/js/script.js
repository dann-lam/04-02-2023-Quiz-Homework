
//Get elements by their IDs
//GIVE ME ALL OF THEM >:D
//P.S. I'm sorry.
let gameArea = document.getElementById("game-area");
let topBar = document.getElementById("top-bar");
let startScreen = document.getElementById("start-screen");
let gamePlayScreen = document.getElementById("game-play-screen");
let gameOverScreen= document.getElementById("game-gameover-screen");
let highScoresScreen = document.getElementById("highscores-screen");
let hiddenZone = document.getElementById("hidden-zone");
let highScoresBtn = document.getElementById("highscoresBtn");
let goBackBtn = document.getElementById("goback")
let everything = document.getElementById("everything");
let clearScore = document.getElementById("clearscores");
let timer = document.getElementById("count");
//Okay. MAYBE this was a bad idea.
let startGame = document.getElementById("start-game-button");
let gameQuestion = document.getElementById("game-question");
let gameChoices = document.getElementById("game-choices");
let timeLeft = document.getElementById("time-left")
let timerArea = document.getElementById("timer");
let submitScore = document.getElementById("submit-button");
let inputInitials = document.getElementById("input-initials");
let scoresLocalStorage = document.getElementById("scores-localstorage");
let gameBar = document.getElementById("game-bar");
let gameResult = document.getElementById("game-choice-result");
// ----------------- GLOBAL VARIABLES //

var count = 75;
var increment = 0;
//Initializes the countdown here so it's available to all functions.
var countDown;

let initialize = () => {
    //Hides objects we want displayed and shows object of relevence.
    //This is a pretty foolish way of doing things but I want to try it.
    //I regret this.
    hiddenZone.appendChild(gamePlayScreen);
    hiddenZone.appendChild(gameOverScreen);
    hiddenZone.appendChild(highScoresScreen);
    everything.appendChild(topBar);
    everything.appendChild(gameArea);
    gameArea.appendChild(startScreen);
}


//Initialize objects for questions and scores.
let question1 = {
    questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
    "Javascript":false,
    "Terminal/bash":false,
    "for loops":false,
    "console.log":true,
}
let question2 = {
    questionText: "String values must be enclosed within ___ when being assigned to variables.",
    "commas":true,
    "curly brackets":false,
    "quotes":false,
    "parentheses":false,
}
let question3 = {
    questionText: "Arrays in Javascript can be used to store ____.",
    "numbers and strings":false,
    "other arrays":false,
    "booleans":false,
    "all of the above":true,
}
let question4 = {
    questionText: "The conditional if an if/else statement is enclosed within ____",
    "quotes":false,
    "curly brackets":true,
    "parentheses":false,
    "square brackets":false,
}
let question5 = {
    questionText: "Commonly used data types DO NOT include:",
    "strings":false,
    "booleans":false,
    "alerts":true,
    "numbers":false,
}


let questionsArr = [question5, question4, question3, question2, question1];

//Logic for displaying scores and appending them.
let showHighScoreScreen = () => {

    //Stops the timer interval and resets the game if you go to highscores while a game is occurring.
    clearInterval(countDown)
    countDown = 75;
    scoresLocalStorage.innerHTML = "";
    //Resets the local storage so that it draws a fresh one each time.

    console.log("showHighScoresScreen activated");
    //Hides anything that may be there and displays the highscore screen.
    hiddenZone.appendChild(gamePlayScreen);
    hiddenZone.appendChild(topBar);
    hiddenZone.appendChild(gameOverScreen);
    hiddenZone.appendChild(startScreen);
    gameArea.appendChild(highScoresScreen);

    //Gets our keys and values from local storage and sorts them.
    // ---------- //
    let sorted = [];
    // I got this from https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
    for (let i = 0; i < localStorage.length; i++){
            //Grab the keys and values of our object.
        let localStoreKey = (localStorage.key(i));
            //Put read the second value of the array.
        let localStoreVal = (localStorage.getItem(localStoreKey));
            //Put each of them into an array.
        sorted.push([localStoreKey, localStoreVal])
    }
        //Sort them
        //Got this from https://www.w3schools.com/jsref/jsref_sort.asp
    sorted.sort((a, b) => {
       return b[1] - a[1]
    });
    // ----------- //
    //Create an LI for each, and then append them to the child.
    for(let i = 0; i < sorted.length; i++){
        //As I go through this loop, I need to check if
        let liEle = document.createElement("li");
        liEle.innerText = `${sorted[i][0]} - ${sorted[i][1]}`
        scoresLocalStorage.appendChild(liEle);
    }
}




//Function that handles displaying the questions from our array of question objects.

let displayTheQuestions = (increment) => {
    //Checks to see if we're out of bounds, if we are, we're done with the questions.

    if(questionsArr[increment] == undefined){
        console.log("We're done.");
        showEndingScoreBoard();
    } else {

    //Get keys for objects and display them.
        for (const [key, value] of Object.entries(questionsArr[increment])) {
            //Kind of a bad way of looking through our object tbh.
            if(key.includes("questionText")){
                gameQuestion.innerHTML = questionsArr[increment].questionText
            }
            //Sets the "status" dataattribute of true or false to each question.
            //Prints the question of each key that has "Answer"
            //Because of the way of my question objects are setup, the value should return as a boolean for questions that are being asked.
            if (typeof(value) == "boolean"){
                let liEle = document.createElement("li")
                liEle.innerHTML = key;
                //I check the status of the dataset for each li element to see whether we click on the "correct" answer or not.
                liEle.dataset.status = value;

                gameChoices.appendChild(liEle);
            }
        }
    }

    //I would want to create as many questions as there are dynamically.


}
//Starts the countdown.
let startGameFunc = () => {
    //Reinitializes the countdown at the start of each game.
    count = 75;
    //Countdown that updates the countdown on our innerHTML.
    countDown = setInterval(()=>{

        timer.innerHTML = count - 1;
        if(count > 1){
            count--
            console.log(count);
        } else {
            //Game over if we hit 0.
            timer.innerHTML = "Out of time!"
            clearInterval(countDown);
            showEndingScoreBoard();
            count = 75;
        }
    }, 1000)

    //I'm essentially moving things in and out of the "hidden zone" each time to decide what to display LOL
    hiddenZone.appendChild(startScreen);
    hiddenZone.appendChild(gameOverScreen);
    gameArea.appendChild(gamePlayScreen);
    //initializes increment back to 0 as this is the start of the game and begins displaying questions
    increment = 0;
    //reinitializes the game questions + choices if a game has just started.
    gameQuestion.innerHTML = '';
    gameChoices.innerHTML = '';
    displayTheQuestions(increment);
}



let showEndingScoreBoard = () => {
    hiddenZone.appendChild(gamePlayScreen);
    gameArea.appendChild(gameOverScreen);
    timer.innerHTML = "Game Over!";
    timeLeft.innerHTML = count;
    //Stops our timer, resets the count.
    clearInterval(countDown)
}

//Function that checks the dataset for each li element clicked.
let statusChecker = (input) => {
    if(input == "false"){
        //Dings us on time if we got something wrong.
        count = count - 15
        //Moves to the next question in the array list.
        increment = increment + 1
        //Undraws our questions
        gameQuestion.innerHTML = "";
        gameChoices.innerHTML = "";
        //Redraws the new set of questions.
        displayTheQuestions(increment)
        gameResult.innerText = "Incorrect"
        setTimeout(() => {
            gameResult.innerText = "";
        }, 1000)
    } else {
        //Increment the increment.
        increment = increment + 1
        //Resets the choices and questions.
        gameQuestion.innerHTML = "";
        gameChoices.innerHTML = "";
        displayTheQuestions(increment)
        //Set the gameResult text
        gameResult.innerText = "Correct"
        setTimeout(() => {
            //Resets our result text.
            gameResult.innerText = "";
        }, 1000)
    }
}


//Starts the site.
initialize();
// --------------------------------------------
//LISTENERS for any kind of button activation.

highScoresBtn.addEventListener("click", (event) => {
    console.log("highscores screen event listener logged");
    event.stopPropagation
    //Shows high score screen.
    showHighScoreScreen();
});
goBackBtn.addEventListener("click", (event) => {
    console.log("Going back button logged");
    event.stopPropagation
    //I reset the game every time "go back" is pushed.
    initialize();
})
startGame.addEventListener("click", (event) => {
    console.log("game starting");
    event.stopPropagation
    //Runs the game.
    startGameFunc();
})
gameChoices.addEventListener("click", (event) => {
    event.stopPropagation
    //Grabs the object's value of either true or false and checks it.
    let status = event.target.dataset.status;
    statusChecker(status)
})
submitScore.addEventListener("click", (event) => {
    event.preventDefault();
    //Stores the values into local storage.
    let storedInitials = inputInitials.value;
    let storedScore = timeLeft.innerHTML;
    //Stores our typed in initials and innerHTML into the local storage.
    localStorage.setItem(storedInitials,storedScore);
    showHighScoreScreen();
})

clearScore.addEventListener("click", (federalReserve) => {
    //Activate this button whenever the US is in a financial crisis.
    //BUG: Currently increase inflation
    //Also it prevents the default behavior of buttons from working.
    federalReserve.preventDefault();
    localStorage.clear();
    scoresLocalStorage.innerHTML = "";
    showHighScoreScreen();
})
