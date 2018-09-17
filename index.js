let questionNum = 1;
let indexQuestions = 0;
let score = 0;
let counter = 0;
let wrongAnswers = [];



/**When user clicks start to begin the quiz, this functions calls the other functions necessary to start the quiz. */
function clickStart(){
  $('.startButton').on('click', function(event){
    displayQuestions();
    removeBeforeStartingQuiz();
    answerSubmit();
  });
}

/**Removes starting question "Are you ready...."  */
function removeStartingQuestion(){
   $('.startingQuestion').remove();
}

/**Removes the start button */
function removeStartButton(){
   $('.startButton').remove();
}

/**Calls both functions to clearn up spaced to render the questions next */
function removeBeforeStartingQuiz(){
  removeStartButton();
  removeStartingQuestion();
}

/**Increment the counter */
function incrementCounter(){
  counter++;
}

/**Removes score board */
function removeScoreBoard(){
   $('.scoreBoard').remove();
}

/** displays the questions*/
function displayScoreQues(){
  if(counter != 0){
    removeScoreBoard();
    displayScoreU();
  }
  incrementCounter();
}

/**Generates the necessary HTML code for the scoreboard */
function generateScoreBoardHTML(){
  return `<div class = "scoreBoard"><ul>
         <li class = "quizQuestion">Question: <span>${questionNum}/5</span></li>
        <li class = "quizScore">Score: <span>${score}</span></li>
      </ul></div>`
}

/**Prepends the main. */
function prependScoreBoard(){
    $('main').prepend(generateScoreBoardHTML());
}

/**To allow me to remove and add score */
function displayScoreU(){
  prependScoreBoard();
}

/**It prepends the questions and the answers in the main container. */
function displayQuestions(){
  emptyMain();
  $('main').prepend(`<div class = "containingForm">
    <form class="questions"> 
    <fieldset>
      <legend>Answers: </legend>
      <label class = "userOption"><div>
       <input type = "radio" id = "option1" name = "answers" value = "${QUESTIONS[indexQuestions].answers[0]}" checked required><span>${QUESTIONS[indexQuestions].answers[0]}</span><br></div></label>
      <label class = "userption"><div>
        <input type = "radio" name = "answers" value = "${QUESTIONS[indexQuestions].answers[1]}" required><span>${QUESTIONS[indexQuestions].answers[1]}</span><br></div>
      </label>
      <label class = "userOption">
        <div><input type = "radio" name = "answers" value = "${QUESTIONS[indexQuestions].answers[2]}" required><span>${QUESTIONS[indexQuestions].answers[2]}<br></span></div>
      </label>
      <label class = "option">
        <div><input type = "radio" name = "answers" value = "${QUESTIONS[indexQuestions].answers[3]}" required><span>${QUESTIONS[indexQuestions].answers[3]}<br></span></div>
      </label>
    </fieldset>
    </form>
    </div>
    <button class="submit">Submit</button>`
   
  );
   $('.containingForm').prepend(`<div class = "quizQuestions"><h3>${QUESTIONS[indexQuestions].question}</h3></div>`);
   displayScoreU();
}


/**Checks if the sumbit button has been clicked if so, runs functions to check correctness of questions. */
function answerSubmit(){
  $('main button.submit').on('click',function(event){
    event.preventDefault();
    let submittedAns = $("input:radio[name=answers]:checked").val();
    checkMyAnswer(submittedAns);
  });
}

/**Removes the container with the questions */
function removeQuizQuestions(){
    $('.quizQuestions').remove();
}

/**Removes entire form */
function removeForm(){
  emptyMain();
}

/**Generates the HTML needed if user gets the question correct */
function generateHTMLQuizFeedbackCorrect(){
  return `<div class="quizFeed">
      <h2>Correct Answer, good job</h2></div>`
}

/**Appends the generated HTML */
function appendFeebackCorrect(){
    $('main').append(generateHTMLQuizFeedbackCorrect());
}

/**Generates the HTML if the user gets the question wrong */
function generateHTMLQuizFeedbackWrong(){
  return `<div class="quizFeed">
      <h2>Wrong! Answer, correct answer was ${retrieveCorrectAns()}</h2>
      <img class = "wrongAns" src = ${QUESTIONS[indexQuestions].ansIcon} alt = 'picture of ${retrieveCorrectAns()}'></div>`
}

/**Appends the generated HTML if the user gets the question wrong */
function appendFeebackWrong(){
  $('main').append(generateHTMLQuizFeedbackWrong()); 
}

function isAnswerCorrect(submittedAns){
   if(submittedAns === retrieveCorrectAns()){
    appendFeebackCorrect();
    incrementScore();
  }

  else{
       appendFeebackWrong();
  } 
}
/*This gives the feedback*/
function checkMyAnswer(submittedAns){
  //checking if answer is correct
  removeQuizQuestions();
  removeForm();
  isAnswerCorrect(submittedAns);
  addNextButton();
  clickNext();
  displayScoreQues();
  if(indexQuestions === 5){
      quizEnding();
    }
}

/**Returns the correct answer*/
function retrieveCorrectAns(){
  let ans = QUESTIONS[indexQuestions].correctAnswer;
  return ans;
}

/*increments score*/
function incrementScore(){
  return score++;
}

/*Lets write a function that presents
the user a button to move on to the next
question*/
function addNextButton(){
    $('main').append(`<button class = "nextButton">Next</button>`
  );
}

/**Increments the question number when the user progresses further into the quiz */
function incrementQuestionNum(){
  questionNum++;
}

/**Increments the indexQuestions, so we can access the next set of questions and answers from the array.
 */
function incrementIndexQuestions(){
  ++indexQuestions;
}

/**Removes the quiz feedback */
function removeQuizFeedback(){
   $('.quizFeed').remove();
}

/**Removes the next button */
function removeNextButton(){
  $('.nextButton').remove();
}

/**Checks to see if the user is on the 5th question. If so, it calls quizEnding, which restarts the quiz. If not, it displays the question. */
function isQuizComplete(){
  if(indexQuestions === 5){
    quizEnding();
  }

  else{
    displayQuestions();
    displayScoreQues();
    answerSubmit();
  }
}

/**This method is in charge of checking if the next button has been clicked. If it is, all the necessary information is update and rendered.
 */
function clickNext(){
  $('.nextButton').on('click', function(event){
    event.preventDefault();
    incrementQuestionNum()
    incrementIndexQuestions()
    removeQuizFeedback();
    isQuizComplete();
    removeNextButton();
  }); 
}

/**Empties the main container */
function emptyMain(){
   $('main').empty();
}

/**Generate the feedback that's going 
 * to be appended.*/
function generateHTMLFinalScreen(){
  return `<div class="quizFinal">
    <h3>Good job, on completing the quiz</h3>
    <p>Your overall score was ${score}/5</p>
    <button class = 'playAgain'>Play again</button>
    </div>` 
}

/**Appends the ending string onto the main */
function appendQuizFinal(){
   emptyMain();
   $('main').append(generateHTMLFinalScreen());
}

/**This function is in charge of calling    functions that  appendthe final feedback and  allow the user to play again */
function quizEnding(){
  appendQuizFinal();
  replay();
}

/**Question number is assigned 1 again in order
 * to allow the user to play again.
 */
function restartQuestionNum(){
  questionNum = 1;
}

/**indexQuestions is assigned 0 again in order
 * to allow the user to play again.
 */
function restartIndexQuestions(){
  indexQuestions = 0;
}

/**Score number is assigned 0 again in order
 * to allow the user to play again.
 */
function restartScore(){
  score = 0;
}

/**Function is in charge of restarting the game and calling functions that update all the necessary information for the user to play again.
 */
function replay(){
  $('.playAgain').on('click',function(event)
  {
    event.preventDefault();
    restartQuestionNum();
    restartIndexQuestions();
    restartScore();
    displayQuestions();
    answerSubmit();
  });
}

/**
 * Calls all the necessary functions when game is first run.
 */
function bindStartingFunctions(){
  clickStart();
  answerSubmit();
  displayScoreQues();
  clickNext();
}

$(bindStartingFunctions);

