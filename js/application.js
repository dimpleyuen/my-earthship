  var result = {};
  var finalScore = 0;
  var tipsShown = {}; //just for checking


$(document).ready(function() {

//Hide All The Q&A's Initially
  $('.answers').hide();
  $('.questions').hide();

//Show First Answer Upon Loading
  var currentAnswerIndex = 0;
  var currentAnswer;

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

//On Button Click, Store The Name Somewhere and Put it in the Span
  $('.start-quiz').click(function() {
    var name = $('.input-name').val();
    $('.username').text(name);
  })

//Accumulate Points Upon Clicking Answers & Show Relevant Tips On Results Page
  $(document).on('click', '.answer-wrapper', function() {
    var score = Number($(this).attr('data-score'));
    result["Q"+(currentQuestionIndex - 1)] = score;
  })

//Calculate Final Score In For Last Question
  $(document).on('click', '.last', function() {
    calcScores(result);
  })

//Total Up The Scores in Hash & Calculate Result
  function calcScores(obj) { 
    for (var key in obj) {
      var val = obj[key]
      finalScore += val;
    }

    if ( finalScore >= 70 ) {
      $('.results').text("You Are Master Level");
    }
    else if ( finalScore >= 40 ) {
      $('.results').text("You Made Some Good Effort");
    }
    else if ( finalScore >= 10 ) {
      $('.results').text("You Made Some Baby Steps");
    }
    else if ( finalScore >= -30 ) {
      $('.results').text("You Should Take Some Action");
    }
    else if ( finalScore >= -60 ) {
      $('.results').text("You Ain't Even Trying");
    }
    else if ( finalScore >= -90 ) {
      $('.results').text("Are 100% Failing");
    }
  }

//Hide All The Tips Initially
  
  $('.tips-wrapper').children().hide();

//Show Relevant Tips On Results Page
  $(document).on('click', '.answer-wrapper', function() {
    if ( $(this).attr('data-score' ) <= 0  ) {
      tipsShown["Tip" + (currentAnswerIndex-1)] = (currentAnswerIndex-2); //just for checking
      $($('.tips-wrapper').children()[currentAnswerIndex-2]).show();
    }
  })

//Progress Bar
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

//On Back-Arrow Click, Show Previous Q&A, Undo Score & Tips, Reverse Progress Bar
  $(document).on('click','.back-arrow', function() {
    currentAnswerIndex -= 1;
    currentQuestionIndex -= 1;

    showNextAnswer();
    showNextQuestion();

    //Undo the Last Score
    delete result["Q"+(currentAnswerIndex)]

    //Undo the Last Tip (if it was shown)
    if (  $($('.tips')[currentAnswerIndex]).attr("style", "display: block;") ) {
      $($('.tips')[currentAnswerIndex]).attr("style", "display: none;")
    }

    //Reverse Progress Bar
    progressVal -= 1;
    progressWidth -= 11.5;
    var styleValue = "width: " + progressWidth + "%;";

    $('.progress-bar').attr("aria-valuenow", progressVal);
    $('.progress-bar').attr("style", styleValue);
    $($('.progress-bar')[currentAnswerIndex-1]).text(currentAnswerIndex+"/9");
  })

})


  //progress bar generic even on page one