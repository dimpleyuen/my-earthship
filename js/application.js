$(document).ready(function() {

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

//On Button Click, store the input field somewhere
  $('.start-quiz').click(function() {
    var userName = $('.input-name').val();
  })

//accumulate points upon clicking different answers
  var result = 0;









//accumulate whatever is the data-score into a variable called result



//