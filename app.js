// ========================================
// 共通変数
// ========================================

let currentQuizIndex = 0;

// ========================================
// 要素取得
// ========================================

const menuScreen =
  document.getElementById("menu-screen");

const questionScreen =
  document.getElementById("question-screen");

const resultScreen =
  document.getElementById("result-screen");

const quizNumber =
  document.getElementById("quiz-number");

const questionTitle =
  document.getElementById("question-title");

const questionText =
  document.getElementById("question-text");

const answerList =
  document.getElementById("answer-list");

const resultTitle =
  document.getElementById("result-title");

const resultDetails =
  document.getElementById("result-details");

// ========================================
// 画面切り替え
// ========================================

function showOnly(screen) {

  [
    menuScreen,
    questionScreen,
    resultScreen
  ].forEach(item =>
    item.classList.add("hidden")
  );

  screen.classList.remove("hidden");
}

// ========================================
// 診断開始
// ========================================

function openQuiz(index) {

  currentQuizIndex = index;

  const quiz = quizzes[index];

  quizNumber.textContent =
    `${pageTitle} ${index + 1} / ${quizzes.length}`;

  questionTitle.textContent =
    quiz.title;

  questionText.textContent =
    quiz.question;

  answerList.innerHTML = "";

  quiz.answers.forEach(
    (answer, answerIndex) => {

      const button =
        document.createElement("button");

      button.textContent = answer;

      button.addEventListener(
        "click",
        () => showResult(answerIndex)
      );

      answerList.appendChild(button);

    }
  );

  showOnly(questionScreen);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ========================================
// 結果表示
// ========================================

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

      title.textContent =
        heading;

      const text =
        document.createElement("p");

      text.textContent =
        paragraph;

      section.append(
        title,
        text
      );

      resultDetails.appendChild(
        section
      );
    }
  );

  showOnly(resultScreen);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ========================================
// 診断一覧生成
// ========================================

const quizMenu =
  document.getElementById("quiz-menu");

if (quizMenu) {

  const marks = [
    "①","②","③","④","⑤",
    "⑥","⑦","⑧","⑨","⑩"
  ];

  quizzes.forEach((quiz, index) => {

    const button =
      document.createElement("button");

    button.dataset.quiz = index;

    button.innerHTML = `
      ${marks[index] || (index + 1)}
      ${quiz.title}
      ${
        quiz.description
          ? `<span>${quiz.description}</span>`
          : ""
      }
    `;

    button.addEventListener(
      "click",
      () => openQuiz(index)
    );

    quizMenu.appendChild(button);

  });
}

// ========================================
// ボタン処理
// ========================================

document
  .getElementById("back-to-menu")
  ?.addEventListener(
    "click",
    () => showOnly(menuScreen)
  );

document
  .getElementById("result-menu-button")
  ?.addEventListener(
    "click",
    () => showOnly(menuScreen)
  );

document
  .getElementById("retry-button")
  ?.addEventListener(
    "click",
    () => openQuiz(currentQuizIndex)
  );

document
  .getElementById("home-button")
  ?.addEventListener(
    "click",
    () => {
      window.location.href =
        "index.html";
    }
  );

document
  .getElementById("result-home-button")
  ?.addEventListener(
    "click",
    () => {
      window.location.href =
        "index.html";
    }
  );

// ========================================
// LINEシェア
// ========================================

document
  .getElementById("share-button")
  ?.addEventListener(
    "click",
    () => {

      const text =
        `私の診断結果は「${resultTitle.textContent}」でした！\n${location.href}`;

      const url =
        `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;

      window.open(
        url,
        "_blank"
      );

    }
  );
