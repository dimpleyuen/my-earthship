  var result = 0;
  var currentAnswerIndex = 0;
  var currentAnswer;

$(document).ready(function() {

  $('.answers').hide();
  $('.questions').hide();

//Show First Answer Upon Loading

  function showNextAnswer() {
    $('.answers').hide(1000);
    currentAnswer = $($('.answers')[currentAnswerIndex]);
    currentAnswer.show(1000);
  }
  showNextAnswer();

//Show First Question Upon Loading
  var currentQuestionIndex = 0;
  var currentQuestion;

  function showNextQuestion() {
    $('.questions').hide(1000);
    currentQuestion = $($('.questions')[currentAnswerIndex]);
    currentQuestion.show(1000);
  }
  showNextQuestion();


//On Button Click, Hide/Show The Next Set Of Questions/Answers
  $(document).on('click','.start-quiz, .answer-wrapper', function() {
    currentAnswerIndex += 1;
    currentQuestionIndex += 1;

    showNextAnswer();
    showNextQuestion();
  })


//On Button Click, store the input field somewhere and put it in the span
  $('.start-quiz').click(function() {
    var name = $('.input-name').val();
    $('.username').text(name);
  })

//Accumulate Points upon clicking different answers
  $(document).on('click', '.answer-wrapper', function() {
    var score = Number($(this).attr('data-score'));
    result = result + score;
    calcScores();
  })

//Add Scores
  function calcScores() { 
    if ( result == 20 ) {
      $('.results').text("Are Master Level");
    }
    if ( result === -10 || result === 0 || result === 10 ) {
      $('.results').text("Not Quite There");
    }
    if ( result === -20 ) {
      $('.results').text("Aren't Even Trying");
    }
  }

//Hide All The Tips
  $('.tips-wrapper').children().hide();

//Show Relevant Tips On Results Page
  $(document).on('click', '.answer-wrapper', function() {
    if (  $(this).attr('data-score') <= 0  ) {
      $($('.tips-wrapper').children()[currentAnswerIndex-2]).show();
    }
  })

//Update Progress Bar
  var progressVal = 1;
  var progressWidth = 11.5;


  $(document).on('click', '.answer-wrapper', function() {
    progressVal ++;
    progressWidth += 11.5;
    var styleValue = "width: " + progressWidth + "%;";

    $('.progress-bar').attr("aria-valuenow", progressVal);
    $('.progress-bar').attr("style", styleValue);
    $($('.progress-bar')[currentAnswerIndex-1]).text(currentAnswerIndex+"/9");
  })

//On Back-Arrow Click, Hide/Show The Previous Set Of Questions/Answers
  $(document).on('click','.back-arrow', function() {
    currentAnswerIndex -= 1;
    currentQuestionIndex -= 1;

    showNextAnswer();
    showNextQuestion();

    //Reverse Progress Bar
    progressVal -= 1;
    progressWidth -= 11.5;
    var styleValue = "width: " + progressWidth + "%;";

    $('.progress-bar').attr("aria-valuenow", progressVal);
    $('.progress-bar').attr("style", styleValue);
    $($('.progress-bar')[currentAnswerIndex-1]).text(currentAnswerIndex+"/9");
  })




})

//fix progress bar so when the back arrow is clicked the var values go down and run function again.