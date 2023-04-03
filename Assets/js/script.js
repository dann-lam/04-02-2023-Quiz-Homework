/*
We need a top Element with a  button that says View Highscores.
If we click on view highscores, we're brought to a page that displays the highscores.

We need an element that says "Time"
with a time variable that is defaulted to 0 unless the game begins.

We need a Screen that is basically the "Start Quiz" game that displays our game rules.

A Button that starts the game.

When we click on that button, we clear out the Title Elements and append our own elements to it.
We could do this, by turning their displays off, and then appending a preformatted thing to it, after turning them on.
We could accomplish that with data-attributes.

The game itself.
Once we start the game, the countdown begins.
The countdown is actually our score.
There is a question displayed, and correct/incorrect answers in a list, that are appended to a div of some kind.

As we click on answers, we increment through a list of the questions.


If you click on a button, the game will check to see if the answer is correct or not. Each button will have a data attribute of either "correct" or "incorrect" associated with it.

If you select the correct answer, it displays "Correct!" on the next question, and fades out after some time. You then move onto the next question.

If you select the incorrect answer, it displays "Wrong" on the next question, fades out after some time, and then moves onto the next quesiton, but substracts from the countdown.

If the timer reaches 0, then the player automatically loses, and is sent to a screen that says "Ran out of time!", which then only has one button, which is to go back to the main screen.


Once you're through the questions, it brings you to the highscore screen.
The highscore screen asks you to insert your intiializes, and to submit a score, which then brings you to the highscore screen with your updated scores.

The scores should sort themselves by highest score.

We can remember our score by storing it in the local sesssion storage.

There is also a "Go Back" Button on the highscore screen, which brings you to the start menu.

There is also a "Clear Highscores" Button, which clears out our high scores.


Hidden Bar
Hidden Status of Clicked

*/

//Get elements by their IDs
let gameArea = document.getElementById("game-area");
let topBar = document.getElementById("top-bar");



//Initialize objects for questions and scores.

let answerObjDemo = {
    questionText: "How fast does an unlaiden swallow move?",
    "Answer1":true,
    "Answer2":false,
    "Answer3":false,
    "Answer4":false,
}

// console.log(answerObjDemo.Answer1)

let questionsArr = [answerObjDemo];

//Debugging Element for inspection.
let showMeElement = (ele) => {
    console.log(ele);
    console.log("showmeElement activated");

}
// showMeElement();



//Clears the gameArea element of ANYTHING fed into it.






let showHighScoreScreen = () => {

    //An object stores the name and score as an object in the local storage.
    //Read the values from the object and put them into an array.
    //I took this code from: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    // let maxSpeed = {
    //     car: 300,
    //     bike: 60,
    //     motorbike: 200,
    //     airplane: 1000,
    //     helicopter: 400,
    //     rocket: 8 * 60 * 60
    // };
    // let sortable = [];
    // for (var vehicle in maxSpeed) {
    //     sortable.push([vehicle, maxSpeed[vehicle]]);
    // }

    // sortable.sort(function(a, b) {
    //     return a[1] - b[1];
    // });

    // [["bike", 60], ["motorbike", 200], ["car", 300],
    // ["helicopter", 400], ["airplane", 1000], ["rocket", 28800]]

    //Iterate through that object, displaying both their name and score.
    //create a list element for each object in the array.
    //Append them to the highscoresDisplay

}


let startGame = () => {

}

let showEndingScoreBoard = () => {

}

let statusChecker = () => {

}

let removeTime = () => {

}

let victory = () => {

}

let defeat = () => {

}


// --------------------------------------------
//LISTENERS for any kind of button activation.
