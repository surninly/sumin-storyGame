"use strict";

/*
 * 이미지와 영상 추가하기
 * 1. 이 폴더에 images, videos 폴더를 만들고 파일을 넣어 주세요.
 * 2. 아래 빈 문자열에 상대 경로를 넣어 주세요.
 *    예: welcomeImage: "images/start.jpg"
 *        endingVideo: "videos/ending.mp4"
 * 3. 장면 이미지는 PROLOGUE와 SCENES의 image에 각각 지정합니다.
 * 경로가 비어 있거나 파일을 읽을 수 없으면 안내 영역이 표시됩니다.
 * 별도 설치나 서버 없이 index.html을 열어 실행할 수 있습니다.
 */
const MEDIA = {
  welcomeImage: "",
  endingVideo: "videos/sumin-ending.mp4",
  endingPoster: "", // 선택 사항: 엔딩 영상의 미리보기 이미지
};

// 원본 파일 이름에 맞춘 음원 연결. 배경음은 loop 속성으로 계속 반복합니다.
const AUDIO = {
  bgm: "audio/01_game_bgm_loop.wav",
  correct: "audio/02_choice_correct.wav",
  incorrect: "audio/03_choice_incorrect.wav",
  click: "audio/04_button_click.wav",
};

const PROLOGUE = {
  title: "당연했던 미래가 달라진 날",
  image: "", // 예: "images/prologue.jpg"
  imageAlt: "운동을 좋아하던 어린 수민의 이야기",
  caption: "PROLOGUE · 새로운 길을 만나기 전",
  paragraphs: [
    "수민은 어릴 때부터 운동을 좋아했어.\n땀 흘려 노력하고, 그만큼 무언가를 이루는 순간에 보람을 느꼈지.",
    "그렇게 군인이나 경찰을 꿈꾸며 준비하던 중학교 시절.",
    "가산점을 받기 위해 단증을 준비하던 수민은\n낙법 연습 중 허리로 떨어지는 사고를 겪었어.",
    "병원에서는 다리 마비로 이어질 위험이 있어\n재활에 집중해야 한다는 이야기를 들었지.",
    "그날 이후, 당연하게 생각했던 미래가 달라지기 시작했어.",
  ],
};

// next: true → 실제 경험으로 이어지는 선택, false → 현재 장면에서 다시 선택
// 마지막 장면은 모든 선택이 같은 엔딩으로 이어집니다.
const SCENES = [
  {
    title: "학교까지 40분, 어떻게 하지?",
    image: "images/scene-1.jpg",
    imageAlt: "학교와 버스가 보이는 정류장에서 책가방을 옆에 두고 고민하는 수민",
    caption: "01 · 나에게 맞는 방법 찾기",
    paragraphs: [
      "고등학교까지는 버스로 40분.",
      "수민에게는 매일 학교에 가는 일도 큰 부담이 됐어.\n학교생활도 이어가고 싶고, 재활에도 집중해야 하는데……",
    ],
    prompt: "어떻게 해야 할까?",
    choices: [
      { icon: "🎒", text: "졸업은 해야지… 일단 계속 다녀보자.", feedback: "학교에 다니고 싶은 마음은 컸지만, 통학과 재활을 함께 이어가기는 버거웠어. 지금 수민에게 맞는 방법을 다시 찾아보자.", next: false },
      { icon: "🚪", text: "자퇴하면 공부도 여기서 끝이겠지.", feedback: "학교를 떠나더라도 배우고 싶은 마음은 남아 있었어. 학교 밖에서 공부를 이어갈 방법은 없을까?", next: false },
      { icon: "📖", text: "먼저 재활하자. 공부는 검정고시로 이어가면 돼.", feedback: "수민은 고등학교를 자퇴하고 재활에 집중하기로 했어. 학업도 새로운 방법으로 이어가기로 했지.", next: true },
    ],
  },
  {
    title: "사라진 꿈 다음에는 뭐가 있을까?",
    image: "images/scene-2.jpg",
    imageAlt: "햇빛이 들어오는 창가 책상에서 노트북을 보며 새로운 목표를 떠올리는 수민",
    caption: "02 · 꿈의 이유를 돌아보기",
    paragraphs: [
      "그렇게 약 6개월이 흘렀어.",
      "오랫동안 준비하던 꿈이 한순간에 사라졌다는 생각에\n많이 우울했지.",
      "그러던 어느 날, 수민은 자신에게 물었어.",
    ],
    prompt: "“나는 왜 군인이나 경찰이 되고 싶었을까?”",
    choices: [
      { icon: "⏳", text: "예전 계획으로 돌아갈 수 있을 때까지 기다릴래.", feedback: "예전의 꿈은 여전히 소중했어. 그러면서도 생각했지. ‘기다리는 동안, 지금의 내가 시작할 수 있는 일은 없을까?’", next: false },
      { icon: "💻", text: "기술을 배워서 사람들을 도울 수도 있지 않을까?", feedback: "수민이 좋아했던 건 노력해서 무언가를 이루고, 누군가에게 도움이 되는 일이었어. ‘그렇다면 기술로도 할 수 있겠네!’ 새로운 목표가 생겼어.", next: true },
      { icon: "🌧️", text: "운동을 못 하면 내가 잘할 수 있는 건 없잖아….", feedback: "운동을 멈춰야 했지만, 끝까지 노력하던 끈질김은 수민 안에 남아 있었어. 그 힘을 다른 곳에 써볼 수 있지 않을까?", next: false },
    ],
  },
  {
    title: "열여덟의 지원, 열아홉의 시작",
    image: "images/scene-3.jpg",
    imageAlt: "대학 건물이 보이는 창가에서 합격을 상징하는 봉투를 들고 기뻐하는 수민",
    caption: "03 · 배움을 향한 새로운 시작",
    paragraphs: [
      "검정고시를 준비한 수민은\n18살에 고등학교 졸업 학력을 갖췄어.",
      "점수도 생각보다 괜찮았지!",
      "이제 기술을 배울 수 있는 대학을 찾아볼 차례야.",
      "지원 조건과 전공을 살펴보던 수민의 눈에\n경민대학교 컴퓨터소프트웨어과가 들어왔어.",
    ],
    prompt: "어떤 선택을 해볼까?",
    choices: [
      { icon: "🏫", text: "경민대학교 컴퓨터소프트웨어과에 지원해보자!", feedback: "18살 수민이 낸 원서의 결과는… 최초 합격! 그리고 이듬해, 19살부터 수민의 대학 생활이 시작됐어.", next: true },
      { icon: "😥", text: "지원할 곳 찾기가 어렵네… 대학은 포기할까?", feedback: "조건을 살펴보는 일부터 쉽지 않았어. 그래도 기술을 배우고 싶은 마음은 남아 있었지. 조금만 더 찾아보자.", next: false },
      { icon: "🎲", text: "전공은 상관없어. 들어갈 수 있는 곳부터 가자.", feedback: "원서를 쓰려던 수민의 손이 멈췄어. ‘나는 기술을 배워서 사람을 돕고 싶었던 거잖아.’ 배우고 싶은 내용을 먼저 확인해보자.", next: false },
    ],
  },
  {
    title: "코딩보다 키보드가 더 어려운데요?",
    image: "images/scene-4.jpg",
    imageAlt: "컴퓨터실에서 키보드를 한 글자씩 눌러보며 자판을 익히는 수민",
    caption: "04 · 작은 연습이 쌓이는 시간",
    paragraphs: [
      "19살에 시작한 대학 생활.\n첫 1년은 쉽지 않았어.",
      "집에 컴퓨터나 노트북이 없었던 수민은\n컴퓨터를 사용할 기회가 많지 않았거든.",
      "친구들이 코드를 작성할 때,\n수민은 자판과 기본적인 컴퓨터 조작부터 익혀야 했어.",
    ],
    prompt: "“이런 기본적인 것도 느린데… 내가 개발을 할 수 있을까?”",
    choices: [
      { icon: "🏳️", text: "시작부터 이렇게 차이 나면 따라잡기 어렵겠지….", feedback: "오늘도 남들보다 오래 걸렸어. 하지만 아직 익숙해질 시간도, 충분히 연습할 기회도 남아 있어. 작은 것부터 다시 해보자.", next: false },
      { icon: "👀", text: "친구들이 하는 걸 보고 따라 하면 되겠지?", feedback: "설명을 들을 때는 알 것 같았는데, 혼자 해보려니 다시 막혔어. 작은 기능 하나라도 직접 해보는 시간이 필요했지.", next: false },
      { icon: "⌨️", text: "느리면 더 해보지 뭐. 하나씩 익혀보자!", feedback: "자판 연습부터 작은 기능 구현까지. 수민은 막히는 부분을 하나씩 붙잡았어. 시간이 걸렸지만, 직접 해낼 수 있는 일이 조금씩 늘어났지.", next: true },
    ],
  },
  {
    title: "내가 만들고 싶은 건 화면인데!",
    image: "images/scene-5.jpg",
    imageAlt: "노트북과 휴대전화의 화면을 보며 시계와 화면 설계 노트를 곁에 두고 공부하는 수민",
    caption: "05 · 좋아하는 것을 위한 두 시간",
    paragraphs: [
      "조금씩 개발에 익숙해지면서\n좋아하는 분야도 생겼어.",
      "“나는 사용자가 직접 보는 화면을 만드는 게 재미있어!”",
      "그런데 학과 수업은 백엔드 관련 내용이 많았어.",
    ],
    prompt: "프론트엔드를 더 배우고 싶은 수민은 어떻게 했을까?",
    choices: [
      { icon: "📚", text: "학교에서 배우는 내용만 열심히 따라가자.", feedback: "수업을 통해 배운 것은 많아졌어. 직접 화면을 만들고 싶은 마음도 계속 남았지. 그 마음을 행동으로 옮겨볼까?", next: false },
      { icon: "🕑", text: "학교 공부도 하고, 하루 2시간은 프론트엔드를 공부하자.", feedback: "수민은 학교 공부와 함께 JavaScript, React, Flutter를 따로 공부하기 시작했어. 조금씩 직접 만들어보는 공부는 지금도 계속되고 있어.", next: true },
      { icon: "🔥", text: "학교 공부는 접어두고 프론트엔드만 공부할래!", feedback: "화면을 만드는 건 즐거웠어. 그런데 미뤄둔 과제와 시험 준비가 쌓이기 시작했지. 두 가지를 함께 이어갈 방법을 찾아보자.", next: false },
    ],
  },
  {
    title: "졸업장을 먼저? 취업을 먼저?",
    image: "images/scene-6.jpg",
    imageAlt: "취업 가방, 저금통, 재활 운동, 학사모를 이어 그린 노트로 앞으로의 순서를 계획하는 수민",
    caption: "06 · 원하는 미래의 순서 정하기",
    paragraphs: [
      "어느덧 3학년.",
      "졸업을 앞둔 수민에게 또 하나의 고민이 찾아왔어.",
      "4학년까지 공부해서 학사 학위를 받고 싶었지만,\n앞으로 필요할 수 있는 허리 수술과 재활,\n경제적인 준비도 생각해야 했지.",
    ],
    prompt: "“내가 원하는 것들을 어떤 순서로 이루면 좋을까?”",
    choices: [
      { icon: "🛠️", text: "먼저 취업을 준비하고, 이후에 학사 공부를 이어가자.", feedback: "수민은 3학년 졸업 후 부트캠프에서 취업을 준비할 계획을 세웠어. 취업해서 2~3년간 돈을 모으고, 이후 수술과 재활 시기에 학사 공부를 이어가고 싶어 해.", next: true },
      { icon: "🎓", text: "일단 4학년부터 가자! 다른 문제는 나중에 생각할래.", feedback: "학사 학위를 받고 싶은 마음은 분명했어. 이제 시간과 비용, 수술과 재활 계획도 함께 놓고 순서를 생각해볼 차례야.", next: false },
      { icon: "🌀", text: "생각할 게 너무 많아… 아직 아무것도 정하지 않을래.", feedback: "고민이 한꺼번에 밀려왔어. 당장 모든 답을 정하기 어렵다면, 졸업 후 첫걸음부터 생각해보는 건 어떨까?", next: false },
    ],
  },
  {
    title: "그런데, 또 계획이 바뀌면?",
    image: "images/scene-7.jpg",
    imageAlt: "붉은 가방을 메고 햇빛이 비치는 굽이진 초록 들판의 길을 걸어가는 수민",
    caption: "07 · 다음 걸음을 위한 한마디",
    paragraphs: [
      "여기까지 온 수민은 이제 알아.",
      "처음 세운 계획대로만 인생이 흘러가지는 않는다는 걸.\n앞으로도 예상하지 못한 일이 생길 수 있다는 걸.",
    ],
    prompt: "그때의 수민에게 어떤 말을 해주고 싶어?",
    choices: [
      { icon: "🧭", text: "방향이 바뀌면, 새로운 길을 찾아가면 돼.", feedback: "군인과 경찰을 꿈꾸던 마음은 기술로 사람을 돕겠다는 목표로 이어졌어. 앞으로도 수민은 자신에게 맞는 길을 찾아갈 거야.", next: true },
      { icon: "🐢", text: "조금 늦어져도, 내 속도로 계속 가면 돼.", feedback: "자판 하나를 익히는 데도 시간이 필요했던 수민. 그렇게 쌓은 작은 노력들이 여기까지 데려왔어. 다음 걸음도 하나씩 내디디면 돼.", next: true },
      { icon: "💪", text: "막히면 다시 해보자. 그게 내가 잘하는 거잖아!", feedback: "수민의 가장 큰 장점은 끈질김. 계획을 다시 세워야 하는 순간에도, 목표를 향해 도전하는 힘은 수민 안에 남아 있어.", next: true },
    ],
  },
];

const $ = (id) => document.getElementById(id);
const screens = [$("welcome-screen"), $("story-screen"), $("chapter-screen"), $("ending-screen")];
let currentScene = -1;
let selectedChoice = null;
let phase = "menu";
let readerMode = "scene";
let readerText = "";
let readerPages = [];
let readerIndex = 0;
let resizeFrame = 0;
const CHAPTER_INTRO_MS = 3500;
let chapterTimer = null;
let chapterRun = 0;
const ENDING_TITLE_MS = 3000;
const GAME_END_RISE_MS = 3000;
let endingStage = "idle";
let endingTimer = null;
let endingRun = 0;
// 브라우저 방문 기록과 별개로 게임 안에서 방문한 화면을 기억합니다.
// 다른 선택을 고르면, 되돌아간 지점부터 새로운 진행 기록을 쌓습니다.
const screenHistory = [];

const backgroundMusic = new Audio(AUDIO.bgm);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.28;
backgroundMusic.preload = "auto";
const soundEffects = Object.fromEntries(["correct", "incorrect", "click"].map((name) => {
  const audio = new Audio(AUDIO[name]);
  audio.preload = "auto";
  audio.volume = name === "click" ? 0.45 : 0.65;
  return [name, audio];
}));
let soundEnabled = true;
let musicStarted = false;

function playAudio(audio) {
  // 재생이 제한되거나 파일을 읽지 못해도 게임 진행은 계속됩니다.
  const playback = audio.play();
  if (playback?.catch) playback.catch(() => {});
}

function resumeMusic() {
  // 영상의 로딩/일시 정지 중에도 배경음이 끼어들지 않게 합니다.
  const inVideo = phase === "ending" && endingStage === "video";
  if (soundEnabled && musicStarted && !document.hidden && !inVideo) playAudio(backgroundMusic);
}

function playEffect(name) {
  if (!soundEnabled) return;
  // 이전 효과음을 정리해 연속 클릭이나 선택 때 여러 소리가 겹치지 않게 합니다.
  Object.values(soundEffects).forEach((audio) => { audio.pause(); audio.currentTime = 0; });
  playAudio(soundEffects[name]);
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  $("sound-button").setAttribute("aria-pressed", String(soundEnabled));
  $("sound-button").setAttribute("aria-label", soundEnabled ? "소리 끄기" : "소리 켜기");
  $("sound-icon").textContent = soundEnabled ? "♫" : "♪×";
  $("sound-button").querySelector(".sound-label").textContent = soundEnabled ? "소리 켜짐" : "소리 꺼짐";
  $("ending-video").muted = !soundEnabled;
  if (soundEnabled) {
    // 소리 버튼도 사용자 동작이므로 음악 재생을 시작할 수 있습니다.
    musicStarted = true;
    resumeMusic();
    playEffect("click");
  } else {
    backgroundMusic.pause();
    Object.values(soundEffects).forEach((audio) => audio.pause());
  }
}

function focusElement(element) {
  element.focus({ preventScroll: true });
}

function showScreen(id) {
  screens.forEach((screen) => { screen.hidden = screen.id !== id; });
  $("restart-button").hidden = id === "welcome-screen";
  updateHistoryControls();
}

function updateHistoryControls() {
  const canGoBack = screenHistory.length > 0;
  $("back-button").hidden = !canGoBack;
  $("back-button").disabled = !canGoBack;
  $("reader-prev").disabled = readerIndex === 0 && !canGoBack;
  $("reader-prev").setAttribute("aria-label", readerIndex > 0 ? "이전 지문" : "이전 화면으로 돌아가기");
}

function rememberScreen() {
  screenHistory.push({
    scene: currentScene,
    phase,
    selectedChoice,
    readerMode,
    readerText,
    readerOffset: readerPages[readerIndex]?.start ?? 0,
    speaker: $("speaker-name").textContent,
    outcome: $("dialogue-box").dataset.outcome,
  });
  updateHistoryControls();
}

function goBack() {
  const previous = screenHistory.pop();
  if (!previous) return;
  cancelChapterTransition();
  cancelEndingSequence();
  // 엔딩 영상에서 되돌아갈 때는 영상을 멈추고 배경음을 이어갑니다.
  phase = previous.phase;
  $("ending-video").pause();
  currentScene = previous.scene;
  if (previous.phase === "menu") {
    selectedChoice = null;
    readerPages = [];
    readerIndex = 0;
    showScreen("welcome-screen");
    focusElement($("welcome-title"));
  } else {
    renderScene();
    if (previous.phase === "choice") {
      showChoices();
    } else {
      selectedChoice = previous.selectedChoice;
      $("speaker-name").textContent = previous.speaker;
      if (previous.outcome) $("dialogue-box").dataset.outcome = previous.outcome;
      openReader(previous.readerText, previous.readerMode);
      // 창 크기가 달라져도 이전에 읽던 텍스트 위치로 돌아갑니다.
      readerIndex = Math.max(0, readerPages.findLastIndex((page) => page.start <= previous.readerOffset));
      renderReaderPage();
    }
  }
  updateHistoryControls();
  resumeMusic();
  $("game-status").textContent = previous.phase === "choice"
    ? "이전 선택지로 돌아왔어요. 다른 선택도 골라볼 수 있어요."
    : "이전 화면으로 돌아왔어요.";
}

function renderImage(container, path, alt) {
  container.style.removeProperty("--scene-image");
  const placeholder = document.createElement("div");
  placeholder.className = "image-placeholder";
  const trail = document.createElement("span");
  trail.className = "placeholder-path";
  trail.setAttribute("aria-hidden", "true");
  const title = document.createElement("strong");
  title.textContent = "수민의 이야기";
  const note = document.createElement("p");
  note.textContent = "모든 걸음에는, 나만의 이야기가 있어.";
  placeholder.append(trail, title, note);
  container.replaceChildren(placeholder);
  if (!path) return;
  const image = document.createElement("img");
  image.alt = alt;
  image.hidden = true;
  image.addEventListener("load", () => {
    image.hidden = false;
    placeholder.hidden = true;
    container.style.setProperty("--scene-image", `url("${path}")`);
  });
  image.addEventListener("error", () => {
    image.hidden = true;
    placeholder.hidden = false;
    container.style.removeProperty("--scene-image");
  });
  image.src = path;
  container.append(image);
}

function renderProgress() {
  const items = SCENES.map((scene, index) => {
    const item = document.createElement("li");
    item.textContent = index < currentScene ? "✓" : String(index + 1);
    const status = index < currentScene ? "완료" : index === currentScene ? "진행 중" : "아직 시작하지 않음";
    item.setAttribute("aria-label", `장면 ${index + 1}: ${scene.title}, ${status}`);
    if (index < currentScene) item.className = "is-complete";
    if (index === currentScene) {
      item.className = "is-current";
      item.setAttribute("aria-current", "step");
    }
    return item;
  });
  $("journey-progress").replaceChildren(...items);
}

function getScene() {
  return currentScene === -1 ? PROLOGUE : SCENES[currentScene];
}

function setPhase(nextPhase) {
  phase = nextPhase;
  $("dialogue-box").dataset.phase = nextPhase;
  $("choice-area").hidden = nextPhase !== "choice";
  $("narrative-area").hidden = nextPhase === "choice";
}

// 실제 글꼴, 줄바꿈, 대화창 크기로 지문을 측정합니다.
// 텍스트를 생략하거나 글자 크기를 줄이지 않고 여러 페이지로 나눕니다.
function paginateReader(preservePosition = false) {
  if (phase !== "narrative" || $("story-screen").hidden) return;
  const body = $("story-body");
  if (body.clientHeight < 1 || body.clientWidth < 1) return;
  const oldOffset = preservePosition ? (readerPages[readerIndex]?.start ?? 0) : 0;
  const characters = Array.from(readerText);
  const pages = [];
  let start = 0;
  while (start < characters.length) {
    let low = 1;
    let high = characters.length - start;
    let count = 1;
    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      $("dialogue-text").textContent = characters.slice(start, start + middle).join("").trim();
      const fits = body.scrollHeight <= body.clientHeight + 1 && body.scrollWidth <= body.clientWidth + 1;
      if (fits) {
        count = middle;
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }
    // 단어 중간에서 끊기지 않도록 가까운 공백/문장 경계를 우선합니다.
    if (start + count < characters.length) {
      const candidate = characters.slice(start, start + count).join("");
      const boundary = Math.max(candidate.lastIndexOf(" "), candidate.lastIndexOf("\n"));
      if (boundary > count * 0.6) count = boundary + 1;
    }
    pages.push({ start, text: characters.slice(start, start + count).join("").trim() });
    start += count;
  }
  readerPages = pages.length ? pages : [{ start: 0, text: "" }];
  readerIndex = Math.max(0, readerPages.findLastIndex((page) => page.start <= oldOffset));
  renderReaderPage();
}

function renderReaderPage() {
  if (!readerPages.length) return;
  $("dialogue-text").textContent = readerPages[readerIndex].text;
  updateHistoryControls();
  $("page-count").textContent = `${readerIndex + 1} / ${readerPages.length}`;
  const isLastPage = readerIndex === readerPages.length - 1;
  if (!isLastPage) {
    $("reader-next").textContent = "계속 읽기 ▶";
  } else if (readerMode === "feedback") {
    const choice = SCENES[currentScene].choices[selectedChoice];
    $("reader-next").textContent = choice.next
      ? (currentScene === SCENES.length - 1 ? "엔딩 보기 ▶" : "다음 장면 ▶")
      : "다시 선택 ↻";
  } else {
    $("reader-next").textContent = currentScene === -1 ? "이야기 시작 ▶" : "선택하기 ▶";
  }
}

function openReader(text, mode = "scene") {
  readerMode = mode;
  readerText = text;
  readerPages = [];
  readerIndex = 0;
  setPhase("narrative");
  $("interaction-label").textContent = mode === "feedback" ? "YOUR CHOICE" : "STORY";
  paginateReader();
  focusElement($("story-body"));
}

function buildChoices(scene) {
  $("choice-prompt").textContent = scene.prompt;
  const buttons = scene.choices.map((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    const number = document.createElement("span");
    number.className = "choice-number";
    number.textContent = String(index + 1);
    number.setAttribute("aria-hidden", "true");
    const icon = document.createElement("span");
    icon.className = "choice-icon";
    icon.textContent = choice.icon;
    icon.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.className = "choice-text";
    text.textContent = choice.text;
    button.append(number, icon, text);
    button.setAttribute("aria-keyshortcuts", String(index + 1));
    button.addEventListener("click", () => selectChoice(index));
    return button;
  });
  $("choices").replaceChildren(...buttons);
}

function renderScene() {
  const scene = getScene();
  selectedChoice = null;
  $("chapter-label").textContent = currentScene === -1 ? "프롤로그 · 이야기의 시작" : `CHAPTER ${String(currentScene + 1).padStart(2, "0")} / 07`;
  $("story-title").textContent = scene.title;
  $("scene-caption").textContent = scene.caption;
  $("speaker-name").textContent = "이야기";
  delete $("dialogue-box").dataset.outcome;
  renderImage($("story-media"), scene.image, scene.imageAlt);
  renderProgress();
  $("choices").replaceChildren();
  if (currentScene !== -1) buildChoices(scene);
  showScreen("story-screen");
  openReader(scene.paragraphs.join("\n\n"));
  $("game-status").textContent = currentScene === -1 ? "프롤로그가 시작됐어요." : `장면 ${currentScene + 1}, ${scene.title}`;
}

function cancelChapterTransition() {
  if (chapterTimer !== null) clearTimeout(chapterTimer);
  chapterTimer = null;
  chapterRun += 1;
  $("chapter-screen").classList.remove("is-presenting");
}

function showChapter(sceneIndex) {
  cancelChapterTransition();
  const run = chapterRun;
  currentScene = sceneIndex;
  selectedChoice = null;
  phase = "chapter";
  const label = `CHAPTER ${String(sceneIndex + 1).padStart(2, "0")}`;
  $("chapter-intro-label").textContent = label;
  $("chapter-intro-title").textContent = SCENES[sceneIndex].title;
  $("chapter-screen").style.setProperty("--chapter-intro-duration", `${CHAPTER_INTRO_MS}ms`);
  showScreen("chapter-screen");
  // 다시 방문한 장면도 페이드 연출이 처음부터 시작되도록 합니다.
  void $("chapter-screen").offsetWidth;
  $("chapter-screen").classList.add("is-presenting");
  focusElement($("chapter-intro-title"));
  $("game-status").textContent = `${label}. ${SCENES[sceneIndex].title}`;
  chapterTimer = setTimeout(() => {
    if (run !== chapterRun || phase !== "chapter") return;
    chapterTimer = null;
    $("chapter-screen").classList.remove("is-presenting");
    renderScene();
  }, CHAPTER_INTRO_MS);
}

function showChoices(focusIndex = null) {
  selectedChoice = null;
  setPhase("choice");
  $("speaker-name").textContent = currentScene === SCENES.length - 1 ? "수민에게 전하는 한마디" : "수민의 선택";
  $("interaction-label").textContent = "CHOOSE YOUR PATH";
  delete $("dialogue-box").dataset.outcome;
  focusElement(focusIndex === null ? $("choice-prompt") : $("choices").children[focusIndex]);
  $("game-status").textContent = "세 가지 선택 중 하나를 골라 주세요.";
}

function selectChoice(index) {
  if (phase !== "choice" || selectedChoice !== null) return;
  const choice = SCENES[currentScene].choices[index];
  if (!choice) return;
  rememberScreen();
  selectedChoice = index;
  playEffect(choice.next ? "correct" : "incorrect");
  $("speaker-name").textContent = choice.next
    ? (currentScene === SCENES.length - 1 ? "수민에게 전한 한마디" : "수민이 내디딘 한 걸음")
    : "다른 가능성";
  $("dialogue-box").dataset.outcome = choice.next ? "next" : "retry";
  openReader(choice.feedback, "feedback");
}

function advanceReader() {
  if (phase !== "narrative") return;
  if (readerIndex < readerPages.length - 1) {
    readerIndex += 1;
    renderReaderPage();
    focusElement($("story-body"));
    return;
  }
  rememberScreen();
  if (readerMode === "feedback") {
    continueStory();
  } else if (currentScene === -1) {
    showChapter(0);
  } else {
    showChoices();
  }
}

function previousPage() {
  if (phase !== "narrative") return;
  if (readerIndex === 0) {
    goBack();
    return;
  }
  readerIndex -= 1;
  renderReaderPage();
  focusElement($("story-body"));
}

function continueStory() {
  if (selectedChoice === null) return;
  const previousChoice = selectedChoice;
  const choice = SCENES[currentScene].choices[selectedChoice];
  if (!choice.next) {
    showChoices(previousChoice);
  } else if (currentScene === SCENES.length - 1) {
    selectedChoice = null;
    showEnding();
  } else {
    showChapter(currentScene + 1);
  }
}

function cancelEndingSequence() {
  if (endingTimer !== null) clearTimeout(endingTimer);
  endingTimer = null;
  endingRun += 1;
  endingStage = "idle";
}

function setEndingStage(stage) {
  endingStage = stage;
  $("ending-screen").dataset.stage = stage;
  $("ending-intro").hidden = stage !== "intro";
  $("ending-player").hidden = stage !== "video";
  $("ending-video").hidden = stage !== "video";
  $("ending-invitation").hidden = stage !== "invitation";
  $("ending-finale").hidden = stage !== "finale" && stage !== "complete";
  $("ending-restart").hidden = stage !== "complete";
}

function showEnding() {
  cancelChapterTransition();
  cancelEndingSequence();
  const run = endingRun;
  phase = "ending";
  $("ending-finale").classList.remove("is-rising", "is-complete");
  $("ending-recovery").hidden = true;
  $("ending-media-note").textContent = "";
  setEndingStage("intro");
  showScreen("ending-screen");
  focusElement($("ending-title"));
  $("game-status").textContent = "수민의 이야기. 잠시 후 엔딩 영상이 시작돼요.";
  const video = $("ending-video");
  video.muted = !soundEnabled;
  video.src = MEDIA.endingVideo;
  if (MEDIA.endingPoster) video.poster = MEDIA.endingPoster;
  video.load();
  // 제목을 보여주는 동안 영상을 미리 불러온 후 바로 재생합니다.
  endingTimer = setTimeout(() => {
    if (run !== endingRun || phase !== "ending") return;
    endingTimer = null;
    setEndingStage("video");
    backgroundMusic.pause();
    Object.values(soundEffects).forEach((audio) => audio.pause());
    attemptEndingPlayback();
  }, ENDING_TITLE_MS);
}

function showVideoRecovery(message) {
  if (phase !== "ending" || endingStage !== "video") return;
  $("ending-media-note").textContent = message;
  $("ending-recovery").hidden = false;
  focusElement($("ending-play"));
}

function attemptEndingPlayback() {
  if (phase !== "ending" || endingStage !== "video") return;
  const run = endingRun;
  const video = $("ending-video");
  $("ending-recovery").hidden = true;
  $("game-status").textContent = "엔딩 영상을 재생합니다.";
  try {
    const playback = video.play();
    if (playback?.then) {
      playback.then(() => {
        if (phase !== "ending" || endingStage !== "video") video.pause();
      }).catch((error) => {
        if (run !== endingRun) return;
        // 일부 모바일 브라우저의 자동 재생 제한에만 수동 재생 버튼을 제공합니다.
        showVideoRecovery(error.name === "NotAllowedError"
          ? "재생 버튼을 누르면 엔딩 영상이 시작돼요."
          : "영상을 재생하지 못했어요. 아래 버튼으로 다시 재생해 주세요.");
      });
    }
  } catch {
    if (run === endingRun) showVideoRecovery("영상을 재생하지 못했어요. 아래 버튼으로 다시 재생해 주세요.");
  }
}

function finishEndingVideo() {
  if (phase !== "ending" || endingStage !== "video") return;
  setEndingStage("invitation");
  $("ending-recovery").hidden = true;
  resumeMusic();
  focusElement($("journey-together"));
  $("game-status").textContent = "영상이 끝났어요. 앞으로의 여행도 함께하기 버튼을 눌러 주세요.";
}

function showGameEnd() {
  if (phase !== "ending" || endingStage !== "invitation") return;
  const run = endingRun;
  setEndingStage("finale");
  $("ending-finale").classList.remove("is-complete");
  $("ending-finale").classList.add("is-rising");
  focusElement($("game-end-title"));
  $("game-status").textContent = "Game End.";
  endingTimer = setTimeout(() => {
    if (run !== endingRun || phase !== "ending" || endingStage !== "finale") return;
    endingTimer = null;
    $("ending-finale").classList.remove("is-rising");
    $("ending-finale").classList.add("is-complete");
    setEndingStage("complete");
    focusElement($("ending-restart"));
    $("game-status").textContent = "게임 다시 시작하기 버튼으로 새로운 여정을 시작할 수 있어요.";
  }, GAME_END_RISE_MS);
}

function restart() {
  cancelChapterTransition();
  cancelEndingSequence();
  screenHistory.length = 0;
  $("ending-video").pause();
  $("ending-video").removeAttribute("src");
  $("ending-video").load();
  $("ending-video").hidden = true;
  $("ending-media-note").textContent = "";
  $("ending-recovery").hidden = true;
  setEndingStage("idle");
  currentScene = -1;
  selectedChoice = null;
  phase = "menu";
  readerPages = [];
  readerIndex = 0;
  showScreen("welcome-screen");
  focusElement($("welcome-title"));
  $("game-status").textContent = "시작 화면으로 돌아왔어요.";
  resumeMusic();
}

function scheduleReflow() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => paginateReader(true));
}

$("start-button").addEventListener("click", () => {
  // 브라우저 자동 재생 정책에 맞춰 첫 시작 버튼을 누를 때 음악을 재생합니다.
  musicStarted = true;
  resumeMusic();
  rememberScreen();
  currentScene = -1;
  renderScene();
});
$("reader-next").addEventListener("click", advanceReader);
$("reader-prev").addEventListener("click", previousPage);
$("back-button").addEventListener("click", goBack);
$("read-again").addEventListener("click", () => {
  rememberScreen();
  $("speaker-name").textContent = "이야기";
  openReader(getScene().paragraphs.join("\n\n"));
});
$("restart-button").addEventListener("click", () => {
  $("restart-dialog").returnValue = "";
  $("restart-dialog").showModal();
});
$("restart-dialog").addEventListener("close", () => {
  if ($("restart-dialog").returnValue === "restart") restart();
  $("restart-dialog").returnValue = "";
});
$("ending-restart").addEventListener("click", restart);
$("ending-video").addEventListener("error", () => {
  showVideoRecovery("영상을 불러오지 못했어요. 아래 버튼으로 다시 재생해 주세요.");
});
$("journey-together").addEventListener("click", showGameEnd);
$("ending-play").addEventListener("click", () => {
  if ($("ending-video").error) $("ending-video").load();
  attemptEndingPlayback();
});

$("sound-button").addEventListener("click", toggleSound);
// 선택 버튼에는 전용 효과음만 적용해 일반 클릭음과 중복되지 않게 합니다.
document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled || button.id === "sound-button" || button.classList.contains("choice-button")) return;
  playEffect("click");
});
// 키보드로 지문을 넘길 때도 버튼과 같은 클릭 효과음을 사용합니다.
$("ending-video").addEventListener("playing", () => {
  if (phase !== "ending" || endingStage !== "video") {
    $("ending-video").pause();
    return;
  }
  backgroundMusic.pause();
  $("ending-recovery").hidden = true;
});
$("ending-video").addEventListener("pause", resumeMusic);
$("ending-video").addEventListener("ended", finishEndingVideo);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    backgroundMusic.pause();
    Object.values(soundEffects).forEach((audio) => audio.pause());
  } else resumeMusic();
});

$("fullscreen-button").hidden = !document.fullscreenEnabled;
$("fullscreen-button").addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    $("game-status").textContent = "현재 브라우저에서는 전체 화면을 사용할 수 없어요.";
  }
});
document.addEventListener("fullscreenchange", () => {
  const active = Boolean(document.fullscreenElement);
  $("fullscreen-button").setAttribute("aria-pressed", String(active));
  $("fullscreen-button").setAttribute("aria-label", active ? "전체 화면 끝내기" : "전체 화면으로 보기");
  $("fullscreen-button").lastElementChild.textContent = active ? "전체 화면 끝내기" : "전체 화면";
  scheduleReflow();
});

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || $("restart-dialog").open) return;
  if (event.key === "ArrowLeft" && phase !== "menu") {
    event.preventDefault();
    if (readerIndex > 0 && phase === "narrative" || screenHistory.length > 0) playEffect("click");
    if (phase === "narrative") previousPage();
    else goBack();
    return;
  }
  if (phase === "choice" && /^[123]$/.test(event.key)) {
    event.preventDefault();
    selectChoice(Number(event.key) - 1);
  } else if (phase === "narrative") {
    const interactive = event.target.closest("button, input, select, textarea, a, video");
    if (event.key === "ArrowRight" || ((event.key === " " || event.key === "Enter") && !interactive)) {
      event.preventDefault();
      playEffect("click");
      advanceReader();
    }
  }
});

window.addEventListener("resize", scheduleReflow);
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(scheduleReflow).observe($("story-body"));
}
if (document.fonts?.ready) document.fonts.ready.then(scheduleReflow);

renderImage($("welcome-media"), MEDIA.welcomeImage || "images/scene-7.jpg", "자신의 길을 걸어가는 수민");
