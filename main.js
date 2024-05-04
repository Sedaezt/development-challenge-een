document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const startQuizButton = document.getElementById('start-quiz');
  const readQuestionButton = document.getElementById('read-question');
  const questionElement = document.getElementById('question');
  const answerElement = document.getElementById('answer');
  const submitAnswerButton = document.getElementById('submit-answer');
  const speechInputButton = document.getElementById('speech-input-button');
  const resultElement = document.getElementById('result');

  const questions = [
      { 
          question: "Vraag 1: Wat is de hoofdstad van Duitsland?",
          answer: "Berlijn"
      },
      { 
          question: "Vraag 2: Hoe heet in de psychologie het gevoel dat men een huidige situatie al eens eerder heeft meegemaakt?",
          answer: "deja vu"
      },
      { 
          question: "Vraag 3: Welke drogisterijketen heeft als slogan: Steeds verrasend altijd voordelig?",
          answer: "Kruidvat"
      },
      { 
          question: "Vraag 4: Welke kleur heeft de laatste letter van het logo van Google?",
          answer: "Rood"
      },
      { 
          question: "Vraag 5: Welke programmeertaal wordt vaak gebruikt voor front-end webontwikkeling?",
          answer: "JavaScript"
      },
      { 
          question: "Vraag 6: Wat is de betekenis van de afkorting 'HTML'?",
          answer: "HyperText Markup Language"
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

  function checkAnswer(userAnswer) {
      // Controleer het antwoord
      const isCorrect = userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase();
  
      // Toon het antwoord voordat de melding wordt weergegeven
      answerElement.value = userAnswer;
  
      // Verberg de melding na 1 seconde
      setTimeout(function() {
          resultElement.textContent = "";
  
          // Ga alleen naar de volgende vraag als het antwoord correct is
          if (isCorrect) {
              currentQuestion++;
              if (currentQuestion < questions.length) {
                  displayQuestion();
              } else {
                  quizScreen.innerHTML = "<h1>Quiz completed!</h1>"; // Show quiz completed message
              }
          }
      }, 1000);
  
      // Toon de juiste melding
      if (isCorrect) {
          resultElement.textContent = "Correct!";
      } else {
          resultElement.textContent = "Incorrect. Try again.";
      }
  }
  
  
  function handleSpeechInput() {
      const recognition = new webkitSpeechRecognition(); // Create SpeechRecognition object
      recognition.lang = "nl-NL"; // Set language for speech recognition
  
      recognition.onresult = function(event) {
          const speechResult = event.results[0][0].transcript; // Get the recognized speech
          answerElement.value = speechResult; // Set speech result as answer
          checkAnswer(speechResult); // Check the answer
      }
  
      recognition.start(); // Start speech recognition
  }
  
  

  startQuizButton.addEventListener('click', startQuiz);
  readQuestionButton.addEventListener('click', readQuestion);
  submitAnswerButton.addEventListener('click', function() {
      checkAnswer(answerElement.value.trim());
  });
  speechInputButton.addEventListener('click', handleSpeechInput);
});
