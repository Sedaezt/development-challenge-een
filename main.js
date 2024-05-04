const questions = [
  {
    question: "Vraag 1: Wat is de hoofdstad van Duitsland?",
    answer: "Berlijn",
    type: "open",
  },
  {
    question:
      "Vraag 2: Hoe heet in de psychologie het gevoel dat men een huidige situatie al eens eerder heeft meegemaakt?",
    answer: "déjà vu",
    type: "open",
  },
  {
    question:
      "Vraag 3: Welke drogisterijketen heeft als slogan: Steeds verrasend altijd voordelig?",
    answer: "Kruidvat",
    type: "open",
  },
  {
    question:
      "Vraag 4: Welke kleur heeft de laatste letter van het logo van Google?",
    answer: "Rood",
    type: "open",
  },
];

let currentQuestion = 0;
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const resultElement = document.getElementById("result");
const readQuestionButton = document.getElementById("read-question"); // Knop om de vraag voor te lezen
const submitAnswerButton = document.getElementById("submit-answer"); // Knop om het antwoord te controleren en naar de volgende vraag te gaan

// Functie voor het weergeven van de vraag
function displayQuestion() {
  const currentQuestionData = questions[currentQuestion];
  questionElement.textContent = currentQuestionData.question;
  answerElement.value = ""; // Leeg het inputveld

}

// Event listener voor "Lees de vraag" knop
readQuestionButton.addEventListener("click", function () {
  const currentQuestionData = questions[currentQuestion];
  const questionText = currentQuestionData.question;

  const questionUtterance = new SpeechSynthesisUtterance(questionText);
  questionUtterance.lang = "nl-BE"; // Taal instellen
  window.speechSynthesis.speak(questionUtterance); // Voorlezen van de vraag
});

// Functie voor het controleren van het antwoord en naar de volgende vraag gaan
function checkAnswer() {
  const currentQuestionData = questions[currentQuestion];
  const userAnswer = answerElement.value.trim();

  if (userAnswer.toLowerCase() === currentQuestionData.answer.toLowerCase()) {
    resultElement.textContent = "Correct!";
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(function () {
        resultElement.textContent = "";
        displayQuestion();
      }, 1000);
    } else {
      questionElement.textContent = "Quiz completed!";
      submitAnswerButton.style.display = "none"; // Verberg de "Submit Answer" knop wanneer de quiz is voltooid
    }
  } else {
    resultElement.textContent = "Incorrect. Try again.";
  }
}

submitAnswerButton.addEventListener("click", checkAnswer);

displayQuestion();
