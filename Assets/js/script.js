
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
//Yes. I called it everything. Yes. I regret it. It's just the top level div.
let everything = document.getElementById("everything");
let clearScore = document.getElementById("clearscores");
let timer = document.getElementById("count");
let startGame = document.getElementById("start-game-button");
let gameQuestion = document.getElementById("game-question");
let gameChoices = document.getElementById("game-choices");
let timeLeft = document.getElementById("time-left")
let timerArea = document.getElementById("timer");
let submitScore = document.getElementById("submit-button");
let inputInitials = document.getElementById("input-initials");
let scoresLocalStorage = document.getElementById("scores-localstorage");
// ----------------- GLOBAL VARIABLES //

var count = 75;
var increment = 0;


let initialize = () => {
    //Hides objects we want displayed and shows object of relevence.
    //This is a pretty foolish way of doing things but I want to try it.
    hiddenZone.appendChild(gamePlayScreen);
    hiddenZone.appendChild(gameOverScreen);
    hiddenZone.appendChild(highScoresScreen);
    everything.appendChild(topBar);
    everything.appendChild(gameArea);
    gameArea.appendChild(startScreen);
}


//Initialize objects for questions and scores.
let answerObjDemo = {
    questionText: "How fast does an unlaiden swallow move?",
    "Really fast?":true,
    "Kinda fast?":false,
    "Aaaaa3":false,
    "OH god why":false,
}
let answerObjDemo2 = {
    questionText: "How fast does an unlaiden swallow move?",
    "Yes":true,
    "Answer2":false,
    "Answer3":false,
    "Answer4":false,
}


let questionsArr = [answerObjDemo, answerObjDemo2];

//Logic for displaying scores and appending them.
let showHighScoreScreen = () => {
    //Hides anything that may be there and displays the highscore screen.
    console.log("showHighScoresScreen activated");
    console.log(localStorage)
    console.log("^^^ Local Storage ^^^")
    hiddenZone.appendChild(gamePlayScreen);
    hiddenZone.appendChild(topBar);
    hiddenZone.appendChild(gameOverScreen);
    hiddenZone.appendChild(startScreen);
    gameArea.appendChild(highScoresScreen);


    let sorted = [];
    // I got this from https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
    for (let i = 0; i < localStorage.length; i++){
            //Grab the keys and values of our object.
        let localStoreKey = (localStorage.key(i));
            //Put read the second value of the array.
        let localStoreVal = (localStorage.getItem(localStorage.key(i)));
            //Put each of them into an array.
        sorted.push([localStoreKey, localStoreVal])
    }
        //Sort them

    //Display the array within the sorted array as the top scorer.
    //Create an LI for each, and then append them to the child.
    //When we click on "Clear score button" it should change the inner html of the UL to be blank to reflect.

    // sortable.sort(function(a, b) {
    //     return a[1] - b[1];
    // });

    // [["bike", 60], ["motorbike", 200], ["car", 300],
    // ["helicopter", 400], ["airplane", 1000], ["rocket", 28800]]

    //Iterate through that object, displaying both their name and score.
    //create a list element for each object in the array.
    //Append them to the highscoresDisplay
}

//Initializes the countdown here so it's available to all functions.

var countDown;


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

        timer.innerHTML = count;
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
    //This is ugly. I know. I probably should've used data attributes for displaying or undisplaying things.
    //I'm essentially moving things in and out of the "hidden zone" each time to decide what to display LOL
    hiddenZone.appendChild(startScreen);
    hiddenZone.appendChild(gameOverScreen);
    gameArea.appendChild(gamePlayScreen);
    //initializes increment back to 0 as this is the start of the game and begins displaying questions
    increment = 0;
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
        count = count - 10
        //Moves to the next question in the array list.
        increment = increment + 1
        //Undraws our questions
        gameQuestion.innerHTML = "";
        gameChoices.innerHTML = "";
        //Redraws the new set of questions.
        displayTheQuestions(increment)
    } else {
        increment = increment + 1
        gameQuestion.innerHTML = "";
        gameChoices.innerHTML = "";
        displayTheQuestions(increment)
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
