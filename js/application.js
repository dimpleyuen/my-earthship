  var result = {};
  var finalScore = 0;
  var tipsShown = {}; //just for checking
  var progressVal = 0;
  var progressWidth = 0;


$(document).ready(function() {

//Hide All The Q&A's & Tips Initially
  $('.answers').hide();
  $('.questions').hide();
  $('.tips-wrapper').children().hide();

//Function To Show First Answer Upon Loading
  var currentAnswerIndex = 0;
  var currentAnswer;

  function showNextAnswer() {
    $('.answers').hide(1000);
    currentAnswer = $($('.answers')[currentAnswerIndex]);
    currentAnswer.show(1000);
  }
  showNextAnswer();

//Function To Show First Question Upon Loading
  var currentQuestionIndex = 0;
  var currentQuestion;

  function showNextQuestion() {
    $('.questions').hide(1000);
    currentQuestion = $($('.questions')[currentAnswerIndex]);
    currentQuestion.show(1000);
  }
  showNextQuestion();

//On Button + Answer Click, Hide/Show The Next Set Of Questions/Answers
  $(document).on('click','.start-quiz, .answer-wrapper', function() {
    currentAnswerIndex += 1;
    currentQuestionIndex += 1;

    showNextAnswer();
    showNextQuestion();

//On Button + Answer Click, Update Progress Bar As Well
    progressVal ++;
    progressWidth += 11.5;
    var styleValue = "width: " + progressWidth + "%;";

    $('.progress-bar').attr("aria-valuenow", progressVal);
    $('.progress-bar').attr("style", styleValue);
    $($('.progress-bar')[currentAnswerIndex-1]).text(currentAnswerIndex+"/9");
  })

//On Start Click, Store The Name Somewhere and Put it in the Span
  $('.start-quiz').click(function() {
    var name = $('.input-name').val();
    $('.username').text(name);
  });

//On Answers Click, Store Results Into Results Hash
  $(document).on('click', '.answer-wrapper', function() {
    var score = Number($(this).attr('data-score'));
    result["Q"+(currentQuestionIndex - 1)] = score;

//On Answers Click, Show Relevant Tips in Last Page
    if ( $(this).attr('data-score' ) <= 0  ) {
      tipsShown["Tip" + (currentAnswerIndex-1)] = (currentAnswerIndex-2); //just for checking
      $($('.tips-wrapper').children()[currentAnswerIndex-2]).show();
    }
  });

//Run calcScore Function When Last Answers Are Clicked
  $(document).on('click', '.last', function() {
    calcScores(result);
  })

//calcScore Function To Total Up The Scores in Hash
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
  });
  
})
