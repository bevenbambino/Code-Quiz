var timerElement = document.querySelector("#time-left");
// buttons
var startButton = document.querySelector("#start-game-button");
var viewHighScores = document.querySelector("#view-high-scores");
var backButton = document.querySelector("#go-back-button");
var submitButton = document.querySelector("#submit-button");
var clearButton = document.querySelector("#clear-button");
//menus
var startMenu = document.querySelector(".start-container");
var quizMenu = document.querySelector(".quiz-game");
var highScoreMenu = document.querySelector(".high-score-chart");
var scoreMenu = document.querySelector(".high-score-form");
//quiz elements
var questionPrompt = document.querySelector(".q-prompt");
var optionA = document.querySelector("#A");
var optionB = document.querySelector("#B");
var optionC = document.querySelector("#C");
var optionD = document.querySelector("#D");

var allScores = document.querySelector(".all-scores");
var userScore = document.querySelector("#your-score");

var timer;
var timerCount;
var quizAnswer;

// holds the questions and answers
var questionList = [
  {
    questionText:"The condition in an if/else statement is enclosed with ______.",
    questionOptionA: "quotes",
    questionOptionB: "curly brackets",
    questionOptionC:"parenthesis",
    questionOptionD: "square brackets",
    questionAnswer: "parenthesis",
  },
  {
    questionText: "Commonly used data types DO NOT include:",
    questionOptionA: "strings",
    questionOptionB: "booleans",
    questionOptionC:"alerts",
    questionOptionD: "numbers",
    questionAnswer: "alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store:",
    questionOptionA: "strings and numbers",
    questionOptionB: "other arrays",
    questionOptionC:"booleans",
    questionOptionD: "All the above",
    questionAnswer: "All the above",
  },
  {
    questionText:"String values must be enclosed within ________ when being assigned to variables.",
    questionOptionA: "commas",
    questionOptionB: "curly brackets",
    questionOptionC:"quotes",
    questionOptionD: "parenthesis", 
    questionAnswer: "quotes",
  },
  {
    questionText:"A very useful tool used during development and debugging for printing content to the debugger is:",
    questionOptionA: "JavaScript",
    questionOptionB: "terminal/bash",
    questionOptionC:"for-loops",
    questionOptionD: "console.log", 
    questionAnswer: "console.log",
  }
];

var currentQuestion = 0; //starting point for our displayQuestions
var lastQuestion = questionList.length - 1; 

// function to make questions appear on screen
function displayQuiz() {
  quizMenu.setAttribute("style", "display: block");

  questionPrompt.textContent=questionList[currentQuestion].questionText;
  optionA.textContent=questionList[currentQuestion].questionOptionA;
  optionB.textContent=questionList[currentQuestion].questionOptionB;
  optionC.textContent=questionList[currentQuestion].questionOptionC;
  optionD.textContent=questionList[currentQuestion].questionOptionD;
}

function displayNextQuestion() {
  if (currentQuestion < lastQuestion){
    currentQuestion++;
    displayQuiz();
  } 
  else{
    finishGame();
  }
}

// function so that starting menu disappears upon start click
function startMenuDisappear() {
  startMenu.setAttribute("style", "display: none");
}

// function to see high score menu
function viewScores() {
  timerElement.textContent = 0;
  currentQuestion = 0;
  startMenu.setAttribute("style", "display: none");
  quizMenu.setAttribute("style", "display:none");
  highScoreMenu.setAttribute("style", "display:block");
  scoreMenu.setAttribute("style", "display:none");

  renderScores();
}

//function to exit the high score menu
function goBack() {
  startMenu.setAttribute("style", "display: block");
  quizMenu.setAttribute("style", "display:none");
  highScoreMenu.setAttribute("style", "display:none");
  scoreMenu.setAttribute("style", "display:none");

  viewHighScores.disabled = false;

}

function finishGame() {
  quizMenu.setAttribute("style", "display:none");
  scoreMenu.setAttribute("style", "display:block");  
  clearInterval(timer);
  // shows high score 
  userScore.textContent = timerCount;
  timerElement.textContent = timerCount;

}

//function for timer
function startTimer() {
  timerCount = 75;
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount <= 0) {
      timerCount=0;
      clearInterval(timer);
      finishGame();
    }
  }, 1000);
}

function checkAnswer(event) {
  quizAnswer = questionList[currentQuestion].questionAnswer;
  if (event.target.matches("button") ){

    if (event.target.textContent === quizAnswer){
      displayNextQuestion();
    } else {
      timerCount = timerCount - 15;
      displayNextQuestion();
    }
  }
}

// clears local history and li elements 
function clearScores(){
  allScores.innerHTML = "";
  localStorage.clear();
}

//Renders from local storage and populate the hs menu
function renderScores(){
  allScores.textContent = "";
  viewHighScores.disabled = true;

  var score = localStorage.getItem("score");
  var initials = localStorage.getItem("initials");

  var savedScore = document.createElement("li");
  var savedInitials = document.createElement("li");

  savedScore.textContent = score;
  savedInitials.textContent = initials;

  allScores.appendChild(savedInitials);
  allScores.appendChild(savedScore);
}

//sends high scores to local storage
function submitInitials(event){
  event.preventDefault();

  var score = timerCount;
  var initials = document.querySelector("#user-initials").value;

  localStorage.setItem("score", score);
  localStorage.setItem("initials", initials);

  renderScores();
  viewScores();
}

// function for startQuiz
function startQuiz() {
  startTimer();
  startMenuDisappear();
  displayQuiz();
  quizMenu.addEventListener("click", checkAnswer);
}

//set listener to start quiz button
startButton.addEventListener("click", startQuiz);
viewHighScores.addEventListener("click", viewScores);
backButton.addEventListener("click", goBack);
submitButton.addEventListener("click", submitInitials);
clearButton.addEventListener("click", clearScores);