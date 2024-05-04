
// DOMContentLoaded = een eventlistener die wacht tot het DOM volledig is geladen voordat het wordt uitgevoerd
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

  // Array met de vraagjes en het antwoord 
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


  // houdt index bij van de huidige vraag (start bij vraag 1 (nummer 0) in de array)
  let currentQuestion = 0;

  // tekst van de vraag weergeven
  function displayQuestion() {
      questionElement.textContent = questions[currentQuestion].question;
      answerElement.value = ""; // invoerveld leegmaken
  }

  // verbergt welkomstscherm en weergeven van de eerste vraag
  function startQuiz() {
      welcomeScreen.style.display = 'none'; // welkomsbericht verbergen
      quizScreen.style.display = 'block'; // Quiz scherm tonen
      displayQuestion(); // eerste vraag
  }

  // Voorlezen van de vraag dmv de API
  function readQuestion() {
      const questionText = questions[currentQuestion].question; // tekst van de array ophalen
      const questionUtterance = new SpeechSynthesisUtterance(questionText); // nieuw obj aanmaken
      questionUtterance.lang = "nl-BE"; // de taal
      window.speechSynthesis.speak(questionUtterance); // vraag hardop voorlezen
  }

  // antwoord controleren en bepalen of het juist of fout is
  function checkAnswer(userAnswer) {
      const isCorrect = userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase(); // Controleer het antwoord
      answerElement.value = userAnswer; // Toont het antwoord voordat de melding wordt weergegeven
      
      // Verbergt de melding na 1 sec.
      setTimeout(function() {
          resultElement.textContent = "";
  
          // Ga alleen naar de volgende vraag als het antwoord correct is
          if (isCorrect) {
              currentQuestion++;
              if (currentQuestion < questions.length) {
                  displayQuestion();
              } else {
                  quizScreen.innerHTML = "<h1>Goed gedaan! Je hebt op alle vragen juist kunnen antwoorden!</h1>"; // Show quiz completed message
              }
          }
      }, 1000);
  
      // Toont de juiste melding
      if (isCorrect) {
          resultElement.textContent = "Juist!";
      } else {
          resultElement.textContent = "Fout. Probeer opnieuw.";
      }
  }
  
  
  function handleSpeechInput() {
      const recognition = new webkitSpeechRecognition(); // spraakherkenning object aanmaken
      recognition.lang = "nl-NL"; // taal
  
      // wordt uitgevoerd wnr er een resultaat is na de spraak
      recognition.onresult = function(event) {
          const speechResult = event.results[0][0].transcript; // herkennen spraak
          answerElement.value = speechResult; // spraak omzetten naar het antwoord
          checkAnswer(speechResult); // antwoord controleren
      }
  
      recognition.start(); // start spraakherkenning
  }
  
  

  startQuizButton.addEventListener('click', startQuiz);     // bij klik verbergen van het welkomsscherm
  readQuestionButton.addEventListener('click', readQuestion);   //bij klik luidop voorlezen
  submitAnswerButton.addEventListener('click', function() {     //controleren van het antwoord
      checkAnswer(answerElement.value.trim());      
  });
  speechInputButton.addEventListener('click', handleSpeechInput);    //bij klik activeert de spraakherkenning
});
