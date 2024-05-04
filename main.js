// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const startQuizButton = document.getElementById('start-quiz');
  const readQuestionButton = document.getElementById('read-question');
  const questionElement = document.getElementById('question');
  const answerElement = document.getElementById('answer');
  const submitAnswerButton = document.getElementById('submit-answer');
  const resultElement = document.getElementById('result');

  const questions = [
      { 
          question: "Vraag 1: Wat is de hoofdstad van Duitsland?",
          answer: "Berlijn"
      },
      { 
          question: "Vraag 2: Hoe heet in de psychologie het gevoel dat men een huidige situatie al eens eerder heeft meegemaakt?",
          answer: "déjà vu"
      },
      { 
          question: "Vraag 3: Welke drogisterijketen heeft als slogan: Steeds verrasend altijd voordelig?",
          answer: "Kruidvat"
      },
      { 
          question: "Vraag 4: Welke kleur heeft de laatste letter van het logo van Google?",
          answer: "Rood"
      }
  ];

  let currentQuestion = 0;

  function displayQuestion() {
      questionElement.textContent = questions[currentQuestion].question;
      answerElement.value = ""; // Clear answer input field
  }

  function startQuiz() {
      welcomeScreen.style.display = 'none'; // Hide welcome screen
      quizScreen.style.display = 'block'; // Show quiz screen
      displayQuestion(); // Display first question
  }

  function readQuestion() {
      const questionText = questions[currentQuestion].question;
      const questionUtterance = new SpeechSynthesisUtterance(questionText);
      questionUtterance.lang = "nl-BE"; // Set language
      window.speechSynthesis.speak(questionUtterance); // Speak the question
  }

  function checkAnswer() {
      const userAnswer = answerElement.value.trim();
      if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
          resultElement.textContent = "Correct!";
      } else {
          resultElement.textContent = "Incorrect. Try again.";
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
          displayQuestion();
      } else {
          quizScreen.innerHTML = "<h1>Quiz completed!</h1>"; // Show quiz completed message
      }
  }

  // start
  startQuizButton.addEventListener('click', startQuiz);
  readQuestionButton.addEventListener('click', readQuestion);
  submitAnswerButton.addEventListener('click', checkAnswer);
});
