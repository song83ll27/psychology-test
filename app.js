let currentQuizIndex = 0;

function showOnly(screen, screens) {
  screens.forEach(item =>
    item.classList.add("hidden")
  );

  screen.classList.remove("hidden");
}

function openQuiz(index) {

  currentQuizIndex = index;

  const quiz = quizzes[index];

  quizNumber.textContent =
    `${pageTitle} ${index + 1} / ${quizzes.length}`;

  questionTitle.textContent = quiz.title;
  questionText.textContent = quiz.question;

  answerList.innerHTML = "";

  quiz.answers.forEach((answer, answerIndex) => {

    const button =
      document.createElement("button");

    button.textContent = answer;

    button.addEventListener(
      "click",
      () => showResult(answerIndex)
    );

    answerList.appendChild(button);
  });

  showOnly(
    questionScreen,
    [menuScreen, questionScreen, resultScreen]
  );
}

function showResult(answerIndex) {

  const result =
    quizzes[currentQuizIndex]
      .results[answerIndex];

  resultTitle.textContent =
    result.title;

  resultDetails.innerHTML = "";

  result.sections.forEach(
    ([heading, paragraph]) => {

      const section =
        document.createElement("section");

      section.className =
        "detail-section";

      const title =
        document.createElement("h4");

      title.textContent = heading;

      const text =
        document.createElement("p");

      text.textContent = paragraph;

      section.append(
        title,
        text
      );

      resultDetails.appendChild(
        section
      );
    }
  );

  showOnly(
    resultScreen,
    [menuScreen, questionScreen, resultScreen]
  );
}

const menuScreen = document.getElementById("menu-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const quizNumber = document.getElementById("quiz-number");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");

const answerList = document.getElementById("answer-list");

const resultTitle = document.getElementById("result-title");
const resultDetails = document.getElementById("result-details");
