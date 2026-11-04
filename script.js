// 性格診断・恋愛診断は専用ページで表示します
const quizzes = {
  friendship: {
    title: "友情・人間関係診断",
    question: "友達が落ち込んでいるとき、どうする？",
    answers: ["じっくり話を聞く", "気分転換に遊びへ誘う", "解決策を一緒に考える", "そっとそばにいる"],
    results: [
      ["聞き上手タイプ", "相手の気持ちを受け止めるのが得意。", "自分の気持ちも大切にしてね。"],
      ["ムードメーカータイプ", "明るさや行動で相手を支えるタイプ。", "相手が静かにしたい時は、その気持ちも尊重しよう。"],
      ["サポートタイプ", "具体的な助けや解決策を考えるタイプ。", "答えを急がず、まず気持ちを聞くのも大切。"],
      ["寄り添いタイプ", "言葉がなくても安心感を与えられるタイプ。", "必要なときは、言葉で気持ちを伝えてみよう。"]
    ]
  },
  deep: {
    title: "深層心理診断",
    question: "森の中で箱を見つけました。中に入っていたのは？",
    answers: ["古い鍵", "白い羽", "小さな鏡", "光る石"],
    results: [
      ["探求心タイプ", "新しい可能性や未知のものに惹かれるタイプ。", "焦らず、自分のペースで答えを探そう。"],
      ["自由人タイプ", "自由や軽やかさを大切にするタイプ。", "自由と同じくらい、休息も大切にしてね。"],
      ["内省タイプ", "自分の心や周囲をよく観察するタイプ。", "考えすぎたときは、気分転換もおすすめ。"],
      ["直感タイプ", "ひらめきや感覚を大切にするタイプ。", "直感と事実を合わせて考えると、判断しやすいよ。"]
    ]
  },
  fun: {
    title: "おもしろ診断",
    question: "自動販売機で願いが1つ叶うなら？",
    answers: ["一生お腹が空かない", "瞬間移動できる", "動物と話せる", "1日をやり直せる"],
    results: [
      ["のんびりタイプ", "安心や快適さを大切にするタイプ。", "小さな冒険を加えると毎日がもっと楽しくなるかも。"],
      ["自由自在タイプ", "効率や自由を求めるタイプ。", "寄り道にも意外な楽しさがあるよ。"],
      ["好奇心タイプ", "新しい知識や交流が好きなタイプ。", "自分の好奇心を大切に育てよう。"],
      ["慎重派タイプ", "失敗を減らして納得したいタイプ。", "完璧でなくても、前に進む経験が力になるよ。"]
    ]
  }
};

const topScreen = document.getElementById("top-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const quizTitle = document.getElementById("quiz-title");
const quizQuestion = document.getElementById("quiz-question");
const answerList = document.getElementById("answer-list");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const resultAdvice = document.getElementById("result-advice");
let currentCategory = null;

function showScreen(screen) {
  [topScreen, quizScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function showQuiz(category) {
  currentCategory = category;
  const quiz = quizzes[category];
  quizTitle.textContent = quiz.title;
  quizQuestion.textContent = quiz.question;
  answerList.innerHTML = "";
  quiz.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = `${"ABCD"[index]}. ${answer}`;
    button.addEventListener("click", () => showResult(index));
    answerList.appendChild(button);
  });
  showScreen(quizScreen);
}

function showResult(index) {
  const result = quizzes[currentCategory].results[index];
  resultTitle.textContent = result[0];
  resultDescription.textContent = result[1];
  resultAdvice.textContent = result[2];
  showScreen(resultScreen);
}

document.querySelectorAll(".category-button").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    if (category === "personality") {
      window.location.href = "personality.html";
    } else if (category === "love") {
      window.location.href = "love.html";
    } else {
      showQuiz(category);
    }
  });
});

document.getElementById("retry-button").addEventListener("click", () => showQuiz(currentCategory));
document.getElementById("home-button").addEventListener("click", () => showScreen(topScreen));
document.getElementById("share-button").addEventListener("click", () => {
  const text = `私の診断結果は「${resultTitle.textContent}」でした！\n${location.href}`;
  window.open(`https://line.me/R/msg/text/?${encodeURIComponent(text)}`, "_blank");
});
