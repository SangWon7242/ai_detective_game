const questions = [
  {
    id: "youtube",
    place: "유튜브",
    icon: "▶️",
    question: "유튜브가 내가 좋아할 만한 영상을 추천해줘요. 이것은 AI일까요?",
    answer: true,
    explanation: "AI예요. 내가 본 영상과 관심사를 보고 다음 영상을 추천하기 때문이에요."
  },
  {
    id: "face-unlock",
    place: "스마트폰 얼굴인식",
    icon: "📱",
    question: "스마트폰이 내 얼굴을 알아보고 잠금을 풀어줘요. 이것은 AI일까요?",
    answer: true,
    explanation: "AI예요. 얼굴의 특징을 보고 누구인지 판단하기 때문이에요."
  },
  {
    id: "translator",
    place: "번역기",
    icon: "🌐",
    question: "번역기가 한국어 문장을 영어로 바꿔줘요. 이것은 AI일까요?",
    answer: true,
    explanation: "AI예요. 문장의 뜻을 분석하고 다른 언어로 바꾸기 때문이에요."
  },
  {
    id: "calculator",
    place: "계산기",
    icon: "🧮",
    question: "계산기가 123 + 456을 계산해줘요. 이것은 AI일까요?",
    answer: false,
    explanation: "AI가 아니에요. 계산기는 정해진 계산 규칙대로 답을 구하는 프로그램에 가까워요."
  },
  {
    id: "alarm",
    place: "알람 시계",
    icon: "⏰",
    question: "정해진 시간이 되면 알람이 울려요. 이것은 AI일까요?",
    answer: false,
    explanation: "AI가 아니에요. 알람은 스스로 판단하는 것이 아니라 정해진 시간에 작동해요."
  },
  {
    id: "camera",
    place: "카메라 얼굴 보정",
    icon: "📷",
    question: "카메라 앱이 얼굴을 찾아 예쁘게 보정해줘요. 이것은 AI일까요?",
    answer: true,
    explanation: "AI예요. 사진 속에서 얼굴을 찾고 특징을 분석하기 때문이에요."
  },
  {
    id: "chatbot",
    place: "챗봇",
    icon: "🤖",
    question: "챗봇이 내 질문을 읽고 대답해줘요. 이것은 AI일까요?",
    answer: true,
    explanation: "AI예요. 글을 이해하고 알맞은 답을 만들어내기 때문이에요."
  },
  {
    id: "elevator",
    place: "엘리베이터 버튼",
    icon: "🏢",
    question: "엘리베이터 버튼을 누르면 원하는 층으로 이동해요. 이것은 AI일까요?",
    answer: false,
    explanation: "AI가 아니에요. 버튼을 누르면 정해진 규칙대로 움직이는 프로그램에 가까워요."
  },
  {
    id: "map",
    place: "지도 앱",
    icon: "🗺️",
    question: "지도 앱이 차가 막히는 길을 피해서 빠른 길을 추천해줘요. 이것은 AI일까요?",
    answer: true,
    explanation: "AI예요. 교통 정보와 길 정보를 보고 더 좋은 길을 판단해 추천하기 때문이에요."
  },
  {
    id: "shopping",
    place: "쇼핑 앱",
    icon: "🛒",
    question: "쇼핑 앱이 내가 좋아할 만한 상품을 추천해줘요. 이것은 AI일까요?",
    answer: true,
    explanation: "AI예요. 내가 본 상품이나 관심 있는 물건을 보고 비슷한 상품을 추천하기 때문이에요."
  },
  {
    id: "game",
    place: "게임 캐릭터",
    icon: "🎮",
    question: "게임 캐릭터가 정해진 길만 계속 반복해서 움직여요. 이것은 AI일까요?",
    answer: false,
    explanation: "AI가 아니에요. 스스로 판단하는 것이 아니라 미리 정해진 움직임을 반복하는 경우가 많아요."
  },
  {
    id: "voice",
    place: "음성인식",
    icon: "🎙️",
    question: "스마트폰이 내 목소리를 듣고 글자로 바꿔줘요. 이것은 AI일까요?",
    answer: true,
    explanation: "AI예요. 사람의 목소리를 듣고 어떤 말인지 알아맞히기 때문이에요."
  }
];

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const placeGrid = document.getElementById("placeGrid");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const scoreText = document.getElementById("scoreText");
const badgeText = document.getElementById("badgeText");
const progressText = document.getElementById("progressText");
const foundText = document.getElementById("foundText");
const progressBar = document.getElementById("progressBar");
const noticeText = document.getElementById("noticeText");
const finalScore = document.getElementById("finalScore");
const finalRank = document.getElementById("finalRank");

let score = 0;
let foundAiCount = 0;
let currentQuestion = null;
let answeredPlaces = new Set();
let lastFocusedPlaceButton = null;

function showScreen(screenToShow) {
  [startScreen, gameScreen, resultScreen].forEach(function (screen) {
    screen.classList.remove("is-active");
  });
  screenToShow.classList.add("is-active");
}

function startGame() {
  score = 0;
  foundAiCount = 0;
  currentQuestion = null;
  answeredPlaces = new Set();
  noticeText.textContent = "";
  renderPlaces();
  updateStatus();
  showScreen(gameScreen);
}

function renderPlaces() {
  placeGrid.innerHTML = "";

  questions.forEach(function (item, index) {
    const placeButton = document.createElement("button");
    placeButton.type = "button";
    placeButton.className = `place-card map-position-${index + 1}`;
    placeButton.dataset.id = item.id;
    placeButton.innerHTML = `
      <span class="place-icon" aria-hidden="true">${item.icon}</span>
      <span>${item.place}</span>
    `;
    placeButton.addEventListener("click", function () {
      handlePlaceClick(item, placeButton);
    });
    placeGrid.appendChild(placeButton);
  });
}

function handlePlaceClick(questionItem, placeButton) {
  if (answeredPlaces.has(questionItem.id)) {
    noticeText.textContent = "이미 조사한 장소입니다.";
    return;
  }

  noticeText.textContent = "";
  currentQuestion = questionItem;
  lastFocusedPlaceButton = placeButton;
  openQuestionModal(questionItem);
}

function openQuestionModal(questionItem) {
  modalContent.parentElement.classList.remove("is-correct", "is-wrong");
  modalContent.innerHTML = `
    <div class="modal-place">
      <span aria-hidden="true">${questionItem.icon}</span>
      <span id="modalTitle">${questionItem.place}</span>
    </div>
    <h2>이 기능은 AI일까요?</h2>
    <p class="question-text">${questionItem.question}</p>
    <div class="answer-row">
      <button class="answer-button yes" type="button" data-answer="true">AI예요</button>
      <button class="answer-button no" type="button" data-answer="false">AI가 아니에요</button>
    </div>
  `;

  modalOverlay.hidden = false;

  modalContent.querySelectorAll(".answer-button").forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedAnswer = button.dataset.answer === "true";
      checkAnswer(selectedAnswer);
    });
  });

  modalContent.querySelector(".answer-button").focus();
}

function checkAnswer(selectedAnswer) {
  if (!currentQuestion || answeredPlaces.has(currentQuestion.id)) {
    return;
  }

  const isCorrect = selectedAnswer === currentQuestion.answer;
  answeredPlaces.add(currentQuestion.id);

  if (isCorrect) {
    score += 1;
  }

  if (currentQuestion.answer) {
    foundAiCount += 1;
  }

  markPlaceAsDone(currentQuestion.id, isCorrect);
  updateStatus();
  showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
  const feedbackClass = isCorrect ? "correct" : "wrong";
  const title = isCorrect ? "정답이에요!" : "아쉬워요!";
  const correctAnswerText = currentQuestion.answer ? "정답은 AI예요." : "정답은 AI가 아니에요.";
  const modalBox = modalContent.parentElement;

  modalBox.classList.remove("is-correct", "is-wrong");
  modalBox.classList.add(isCorrect ? "is-correct" : "is-wrong");

  modalContent.innerHTML = `
    <div class="modal-place">
      <span aria-hidden="true">${currentQuestion.icon}</span>
      <span id="modalTitle">${currentQuestion.place}</span>
    </div>
    <h2 class="feedback-title ${feedbackClass}">${title}</h2>
    <p class="feedback-text">
      ${isCorrect ? "" : correctAnswerText + "<br>"}
      ${currentQuestion.explanation}
    </p>
    <button class="next-button" type="button">다음 장소 조사하기</button>
  `;

  modalContent.querySelector(".next-button").addEventListener("click", closeFeedbackModal);
  modalContent.querySelector(".next-button").focus();
}

function closeFeedbackModal() {
  modalOverlay.hidden = true;
  modalContent.innerHTML = "";

  if (answeredPlaces.size === questions.length) {
    showResult();
    return;
  }

  if (lastFocusedPlaceButton) {
    lastFocusedPlaceButton.focus();
  }
}

function markPlaceAsDone(questionId, isCorrect) {
  const placeButton = placeGrid.querySelector(`[data-id="${questionId}"]`);

  if (!placeButton) {
    return;
  }

  placeButton.classList.add("is-done");
  placeButton.setAttribute("aria-label", placeButton.textContent.trim() + " 조사 완료");

  if (isCorrect) {
    placeButton.classList.add("sparkle");
    setTimeout(function () {
      placeButton.classList.remove("sparkle");
    }, 700);
  } else {
    placeButton.classList.add("miss");
    setTimeout(function () {
      placeButton.classList.remove("miss");
    }, 560);
  }
}

function updateStatus() {
  const progressPercent = Math.round((answeredPlaces.size / questions.length) * 100);

  scoreText.textContent = `점수: ${score} / ${questions.length}`;
  badgeText.textContent = `탐정 배지: ${getRank(score)}`;
  progressText.textContent = `조사 진행률 ${progressPercent}%`;
  foundText.textContent = `찾은 AI ${foundAiCount}개`;
  progressBar.style.width = `${progressPercent}%`;
}

function showResult() {
  finalScore.textContent = `총 ${questions.length}개 중 ${score}개를 맞혔어요.`;
  finalRank.textContent = `탐정 등급: ${getRank(score)}`;
  showScreen(resultScreen);
}

function getRank(correctCount) {
  if (correctCount <= 3) {
    return "AI 탐정 연습생";
  }

  if (correctCount <= 6) {
    return "AI 탐정";
  }

  if (correctCount <= 9) {
    return "AI 명탐정";
  }

  return "AI 마스터 탐정";
}

function handleModalKeydown(event) {
  if (event.key !== "Escape" || modalOverlay.hidden) {
    return;
  }

  if (answeredPlaces.size > 0 && modalContent.querySelector(".next-button")) {
    closeFeedbackModal();
  }
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
document.addEventListener("keydown", handleModalKeydown);
