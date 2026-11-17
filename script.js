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
  endingVideo: "videos/수민_자기소개_엔딩영상_v3.1.mp4",
  endingPoster: "", // 선택 사항: 엔딩 영상의 미리보기 이미지
};

// 원본 파일 이름에 맞춘 음원 연결. 배경음은 loop 속성으로 계속 반복합니다.
const AUDIO = {
  bgm: "audio/01_game_bgm_loop.wav",
  correct: "audio/02_choice_correct.wav",
  incorrect: "audio/03_choice_incorrect.wav",
  click: "audio/04_button_click.wav",
};

// ZIP game scenario: images are mapped by filename, not chapter number.
const PROLOGUE = {
  "title": "당연했던 미래가 달라진 날",
  "image": "",
  "imageAlt": "운동을 좋아하던 어린 수민의 이야기",
  "caption": "PROLOGUE · 새로운 길을 만나기 전",
  "paragraphs": [
    "수민은 어릴 때부터 운동을 좋아했어. 땀 흘려 준비한 만큼 해냈을 때 뿌듯했고, 힘이 필요한 사람을 돕는 군인이나 경찰이 되고 싶었지.",
    "중학교 때부터 그 꿈을 위해 단증을 준비했어. 그러던 어느 날, 낙법을 연습하다 허리로 떨어졌어. 병원에서는 지금은 재활에 집중해야 한다고 했지. 당연하다고 생각했던 미래를 처음부터 다시 생각해야 했어."
  ]
};

const SCENES = [
  {
    "title": "학교까지 버스로 40분",
    "image": "images/scene-1.jpg",
    "sourceImage": "게임_01_통학과_재활_game.jpg",
    "imageAlt": "학교까지 버스로 40분 - 수민의 이야기",
    "caption": "01 · 학교까지 버스로 40분",
    "paragraphs": [
      "학교에 계속 다니고 싶었지만, 매일 버스로 40분을 이동하는 일도 몸에 부담이 됐어. 재활과 공부를 함께 이어가려면 무엇부터 결정해야 할까?"
    ],
    "prompt": "재활과 공부를 함께 이어가려면 무엇부터 결정해야 할까?",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "지금 시간표대로 다녀볼래.",
        "feedback": "학교생활을 계속할 수는 있어. 매일 통학해야 하는 부담도 그대로라서 재활에 집중할 시간을 마련하기 어려워.",
        "next": false
      },
      {
        "letter": "B",
        "icon": "",
        "text": "재활을 먼저 챙기고 공부할 방법을 찾아볼래.",
        "feedback": "수민은 자퇴하고 재활에 집중하기로 했어. 공부를 이어갈 수 있는 방법으로 검정고시를 생각하기 시작했지.",
        "next": true
      },
      {
        "letter": "C",
        "icon": "",
        "text": "학교와 공부를 모두 그만둘래.",
        "feedback": "통학 걱정은 줄었지만, 앞으로 무엇을 배우고 싶은지에 대한 답은 아직 남아 있어.",
        "next": false
      }
    ]
  },
  {
    "title": "오늘 할 수 있는 일",
    "image": "images/scene-8.jpg",
    "sourceImage": "게임_08_오늘_할_수_있는_일_game.jpg",
    "imageAlt": "오늘 할 수 있는 일 - 수민의 이야기",
    "caption": "02 · 오늘 할 수 있는 일",
    "paragraphs": [
      "오래 준비한 꿈이 무너진 뒤, 수민은 약 6개월 동안 마음이 무거웠어. 앞으로의 일을 한꺼번에 생각하면 어디서부터 시작해야 할지 더 막막했지. 지금 할 수 있는 일 하나를 골라보자."
    ],
    "prompt": "지금 할 수 있는 일 하나를 골라보자.",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "앞으로의 계획을 오늘 전부 정할래.",
        "feedback": "결정할 일이 한꺼번에 떠올라서 손이 멈췄어. 오늘 시작할 수 있는 일부터 줄여 보면 어떨까?",
        "next": false
      },
      {
        "letter": "B",
        "icon": "",
        "text": "마음이 괜찮아질 때까지 결정을 미룰래.",
        "feedback": "쉬어 가는 시간도 필요했어. 조금 숨을 돌린 뒤, 지금 살펴볼 수 있는 것 한 가지를 골라보자.",
        "next": false
      },
      {
        "letter": "C",
        "icon": "",
        "text": "지금 할 수 있는 일 한 가지부터 생각할래.",
        "feedback": "수민은 자신이 좋아했던 일부터 떠올렸어. 무엇을 좋아했는지 알면, 지금의 상황에서 할 수 있는 일도 찾아볼 수 있을 것 같았지.",
        "next": true
      }
    ]
  },
  {
    "title": "내가 좋아했던 일은 뭘까?",
    "image": "images/scene-2.jpg",
    "sourceImage": "게임_02_새로운_목표_game.jpg",
    "imageAlt": "내가 좋아했던 일은 뭘까? - 수민의 이야기",
    "caption": "03 · 내가 좋아했던 일은 뭘까?",
    "paragraphs": [
      "수민은 예전에 꿨던 꿈을 다시 떠올렸어.\n‘나는 왜 그렇게 군인이나 경찰이 되고 싶었을까?’",
      "운동이 좋았던 걸까? 누군가를 지켜주고 싶었던 걸까?\n지금 당장 몸을 쓰는 일은 어렵지만, 그때의 마음까지 버리고 싶진 않았어."
    ],
    "prompt": "‘그 꿈에서 내가 정말 좋아했던 건 뭐였지?’",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "그런 건 다 모르겠고, 좀 쉴래. 뭐라도 되겠지.",
        "feedback": "잠깐 쉬는 건 괜찮아. 수민에게도 쉬는 시간은 필요했어. 다만 ‘뭐라도 되겠지’ 하고 기다리기만 해서는, 뭘 하고 싶은지 알 수 없었지. 그 꿈이 왜 좋았는지부터 다시 생각해볼까?",
        "next": false
      },
      {
        "letter": "B",
        "icon": "",
        "text": "몸 쓰는 게 좋았던 거야. 무조건 몸 쓰는 직업을 고를래.",
        "feedback": "몸을 움직이는 게 좋았던 건 맞아. 그런데 지금은 허리 때문에 재활부터 해야 하잖아. 꼭 몸을 쓰는 일이어야만 할까? 그 일을 하면서 어떤 순간이 가장 좋았는지 다시 떠올려보자.",
        "next": false
      },
      {
        "letter": "C",
        "icon": "",
        "text": "내 힘으로 사람 돕는 게 좋았던 거잖아. 다른 방법은 없을까?",
        "feedback": "‘맞아. 내가 할 수 있는 걸로 사람을 돕는 게 좋았던 거야. 그럼 기술을 배워서 도울 수도 있겠네!’ 수민은 그렇게 새 목표를 찾았어. 먼저 검정고시부터 준비했고, 열여덟에 합격했지.",
        "next": true
      }
    ]
  },
  {
    "title": "지원할 수 있는 학교 찾기",
    "image": "images/scene-9.jpg",
    "sourceImage": "게임_09_지원_조건_확인_game.jpg",
    "imageAlt": "지원할 수 있는 학교 찾기 - 수민의 이야기",
    "caption": "04 · 지원할 수 있는 학교 찾기",
    "paragraphs": [
      "검정고시로 고등학교 졸업 학력을 갖췄지만, 당시 알아보던 대학 중 지원할 수 있는 곳은 많지 않았어. 수민은 지원 자격과 배우고 싶은 전공을 어떻게 확인해 볼까?"
    ],
    "prompt": "수민은 지원 자격과 배우고 싶은 전공을 어떻게 확인해 볼까?",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "이름이 익숙한 학교부터 원서를 넣을래.",
        "feedback": "마음이 가는 학교라도 지원 자격과 전공을 먼저 확인해야 원서를 낼 수 있어.",
        "next": false
      },
      {
        "letter": "B",
        "icon": "",
        "text": "지원 자격과 전공을 하나씩 확인할래.",
        "feedback": "수민은 자신이 지원할 수 있는 학교를 추려 봤어. 그중 IT에 관련된 학과들이 눈에 들어왔지.",
        "next": true
      },
      {
        "letter": "C",
        "icon": "",
        "text": "선택지가 적으니 이번 지원은 미룰래.",
        "feedback": "잠시 결정을 미룰 수는 있어. 남아 있는 선택지를 살펴보면 지금 가능한 방향이 더 분명해질 거야.",
        "next": false
      }
    ]
  },
  {
    "title": "열여덟의 원서",
    "image": "images/scene-3.jpg",
    "sourceImage": "게임_03_대학_최초_합격_game.jpg",
    "imageAlt": "열여덟의 원서 - 수민의 이야기",
    "caption": "05 · 열여덟의 원서",
    "paragraphs": [
      "지원 자격을 확인했고, 배우고 싶은 내용도 찾았어. 원서를 넣는 일은 여전히 떨리지만 수민에게는 선택할 근거가 생겼지. 이제 어떻게 할까?"
    ],
    "prompt": "이제 어떻게 할까?",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "지원하기 쉬운 전공부터 고를래.",
        "feedback": "지원할 곳을 정할 수는 있지만, 수민이 배우고 싶은 기술을 익힐 수 있는지 한 번 더 살펴볼 필요가 있어.",
        "next": false
      },
      {
        "letter": "B",
        "icon": "",
        "text": "합격할 자신이 생길 때까지 기다릴래.",
        "feedback": "결과가 걱정되는 건 자연스러워. 이미 확인한 자격과 배우고 싶은 내용을 기준으로 지금 결정을 내려보자.",
        "next": false
      },
      {
        "letter": "C",
        "icon": "",
        "text": "경민대학교 컴퓨터소프트웨어과에 지원할래.",
        "feedback": "18살 수민은 원서를 냈고 최초 합격했어. 이듬해, 19살부터 대학 생활이 시작됐어!",
        "next": true
      }
    ]
  },
  {
    "title": "자판부터 한 글자씩",
    "image": "images/scene-4.jpg",
    "sourceImage": "게임_04_키보드_첫걸음_game.jpg",
    "imageAlt": "자판부터 한 글자씩 - 수민의 이야기",
    "caption": "06 · 자판부터 한 글자씩",
    "paragraphs": [
      "대학 첫해에는 자판에서 글자 하나를 찾는 일부터 낯설었어. 친구들이 코드를 쓰는 동안 수민은 컴퓨터의 기본 조작부터 익혀야 했지. 어디서부터 연습하면 좋을까?"
    ],
    "prompt": "어디서부터 연습하면 좋을까?",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "기본 조작부터 익히고 작은 예제를 직접 해볼래.",
        "feedback": "자판을 찾고 파일을 열고, 한 줄씩 실행해 봤어. 시간이 걸렸지만 수민이 혼자 할 수 있는 일이 조금씩 늘어났지.",
        "next": true
      },
      {
        "letter": "B",
        "icon": "",
        "text": "친구가 만든 완성 예제부터 따라 쓸래.",
        "feedback": "완성된 모양은 볼 수 있었지만, 혼자 다시 하려니 어디에서 막혔는지 알기 어려웠어.",
        "next": false
      },
      {
        "letter": "C",
        "icon": "",
        "text": "곧바로 더 어려운 과제로 넘어갈래.",
        "feedback": "한꺼번에 익힐 내용이 많아서 막힌 이유를 찾기 어려워졌어. 연습할 범위를 조금 줄여 볼까?",
        "next": false
      }
    ]
  },
  {
    "title": "내가 만들고 싶은 화면",
    "image": "images/scene-5.jpg",
    "sourceImage": "게임_05_프론트엔드_공부_game.jpg",
    "imageAlt": "내가 만들고 싶은 화면 - 수민의 이야기",
    "caption": "07 · 내가 만들고 싶은 화면",
    "paragraphs": [
      "개발에 익숙해지면서 사용자가 직접 보는 화면을 만드는 일이 재미있어졌어. 학교에서는 백엔드를 주로 배웠지. 수민은 프론트엔드를 어떻게 더 배워볼까?"
    ],
    "prompt": "수민은 프론트엔드를 어떻게 더 배워볼까?",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "수업에서 관련 내용을 만날 때까지 기다릴래.",
        "feedback": "학교 공부는 계속할 수 있어. 관심 있는 화면을 직접 만들어 볼 시간은 스스로 마련해야 했어.",
        "next": false
      },
      {
        "letter": "B",
        "icon": "",
        "text": "학교 공부와 별도로 하루 두 시간을 써볼래.",
        "feedback": "수민은 자바스크립트, 리액트, 플러터를 따로 공부하며 작은 화면을 만들어 봤어. 그 공부는 지금도 이어지고 있어.",
        "next": true
      },
      {
        "letter": "C",
        "icon": "",
        "text": "이번 주 안에 세 가지를 전부 익힐래.",
        "feedback": "의욕은 컸지만 무엇부터 시작할지 정하기가 어려웠어. 꾸준히 해볼 수 있는 분량으로 나눠 보자.",
        "next": false
      }
    ]
  },
  {
    "title": "어디에서 막혔을까?",
    "image": "images/scene-10.jpg",
    "sourceImage": "게임_10_오류를_다시_확인_game.jpg",
    "imageAlt": "어디에서 막혔을까? - 수민의 이야기",
    "caption": "08 · 어디에서 막혔을까?",
    "paragraphs": [
      "작은 화면을 만드는 중이야. 버튼을 눌러도 다음 화면이 열리지 않아. 같은 버튼을 몇 번 눌러 봐도 달라지는 게 없네. 수민은 무엇을 확인해 볼까?"
    ],
    "prompt": "수민은 무엇을 확인해 볼까?",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "클릭과 화면 연결을 하나씩 확인해 볼래.",
        "feedback": "클릭은 들어갔지만 다음 화면으로 이어지는 연결이 빠져 있었어. 그 부분을 연결하고 다시 실행하니 버튼이 작동했지!",
        "next": true
      },
      {
        "letter": "B",
        "icon": "",
        "text": "프로젝트 전체를 처음부터 다시 만들래.",
        "feedback": "처음부터 만들 수는 있지만, 어디서 막혔는지 모르면 같은 문제가 다시 나올 수 있어.",
        "next": false
      },
      {
        "letter": "C",
        "icon": "",
        "text": "일단 버튼만 감추고 넘어갈래.",
        "feedback": "화면에서는 버튼이 사라졌지만 다음 화면으로 갈 방법도 함께 사라졌어. 필요한 동작을 어떻게 살릴지 다시 확인해 보자.",
        "next": false
      }
    ]
  },
  {
    "title": "졸업 뒤에 무엇부터 할까?",
    "image": "images/scene-6.jpg",
    "sourceImage": "게임_06_졸업_이후의_계획_game.jpg",
    "imageAlt": "졸업 뒤에 무엇부터 할까? - 수민의 이야기",
    "caption": "09 · 졸업 뒤에 무엇부터 할까?",
    "paragraphs": [
      "3학년 졸업을 앞두고, 수민은 학사 공부를 더 하고 싶었어. 앞으로의 허리 수술과 재활, 비용도 준비해야 했지. 원하는 일들을 어떤 순서로 할까?"
    ],
    "prompt": "원하는 일들을 어떤 순서로 할까?",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "학사 과정부터 신청하고 이후 계획을 짤래.",
        "feedback": "공부를 먼저 이어갈 수 있어. 생활비와 수술 준비를 어느 시기에 할지까지 생각해야 수민에게 맞는 계획이 돼.",
        "next": false
      },
      {
        "letter": "B",
        "icon": "",
        "text": "지금 정할 수 있는 일도 일단 미룰래.",
        "feedback": "앞으로의 일정이 모두 정해지기를 기다리면 당장 준비할 수 있는 일도 늦어져. 졸업 다음의 첫걸음부터 생각해 보자.",
        "next": false
      },
      {
        "letter": "C",
        "icon": "",
        "text": "취업을 준비하고, 일하면서 다음 계획을 세울래.",
        "feedback": "수민은 졸업 후 부트캠프에서 취업을 준비할 계획이야. 먼저 2~3년 일하며 돈을 모으고, 이후 수술과 재활 시기에 학사 공부를 이어가고 싶어 해.",
        "next": true
      }
    ]
  },
  {
    "title": "앞으로도 내 길을 찾는다면",
    "image": "images/scene-7.jpg",
    "sourceImage": "게임_07_나의_다음_길_game.jpg",
    "imageAlt": "앞으로도 내 길을 찾는다면 - 수민의 이야기",
    "caption": "10 · 앞으로도 내 길을 찾는다면",
    "paragraphs": [
      "수민은 재활할 시간을 마련했고, 지원할 수 있는 대학을 찾았고, 낯선 컴퓨터 앞에서는 기초부터 다시 배웠어. 막히면 살펴보고, 한 번에 풀리지 않으면 방법을 바꿔 다시 해 봤지.\n앞으로 또 고민이 생긴다면 수민에게 어떤 말을 건네고 싶어?"
    ],
    "prompt": "앞으로 또 고민이 생긴다면 수민에게 어떤 말을 건네고 싶어?",
    "choices": [
      {
        "letter": "A",
        "icon": "",
        "text": "무엇이 문제인지부터 차근차근 살펴보자.",
        "feedback": "‘응. 어디에서 막혔는지 알면 지금 할 수 있는 일도 보이더라.’",
        "next": true
      },
      {
        "letter": "B",
        "icon": "",
        "text": "한 번에 안 풀려도, 방법을 바꿔 다시 해보자.",
        "feedback": "‘그래. 자판부터 배울 때도 그렇게 하나씩 해냈어. 다음에도 한 번 더 해볼 거야.’",
        "next": true
      },
      {
        "letter": "C",
        "icon": "",
        "text": "지금의 너에게 맞는 길을 직접 골라보자.",
        "feedback": "‘좋아. 내가 중요하게 생각하는 일을 기억하면 다음 방향도 고를 수 있을 것 같아.’",
        "next": true
      }
    ]
  }
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
const CHAPTER_INTRO_MS = 2500;
let chapterTimer = null;
let chapterRun = 0;
const ENDING_FADE_MS = 900;
const ENDING_REPLY_MS = 3000;
const ENDING_REPLIES = {
  together: '"정말? 고마워.\n우리 앞으로도 친하게 지내자!"',
  finish: '"그래? 정말 아쉽다.\n그동안의 여행을 함께해 줘서 고마워."',
};
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
  // 마지막 대사와 종료 연출에서도 돌아가 두 가지 답을 다시 볼 수 있습니다.
  if (phase === "ending" && ["reply", "fade", "finale", "complete"].includes(endingStage)) {
    cancelEndingSequence();
    $("ending-finale").classList.remove("is-rising", "is-complete");
    setEndingStage("invitation");
    focusElement($("journey-together"));
    resumeMusic();
    $("game-status").textContent = "엔딩 선택지로 돌아왔어요. 다른 선택도 골라볼 수 있어요.";
    return;
  }
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
      ? (currentScene === SCENES.length - 1 ? "수민의 이야기 보기 ▶" : "다음 장면 ▶")
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
    number.textContent = choice.letter;
    number.setAttribute("aria-hidden", "true");
    const icon = document.createElement("span");
    icon.className = "choice-icon";
    icon.textContent = choice.icon;
    icon.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.className = "choice-text";
    text.textContent = choice.text;
    if (choice.icon) button.append(number, icon, text);
    else button.append(number, text);
    button.setAttribute("aria-keyshortcuts", `${index + 1} ${choice.letter}`);
    button.addEventListener("click", () => selectChoice(index));
    return button;
  });
  $("choices").replaceChildren(...buttons);
}

function renderScene() {
  const scene = getScene();
  selectedChoice = null;
  $("chapter-label").textContent = currentScene === -1 ? "프롤로그 · 이야기의 시작" : `CHAPTER ${String(currentScene + 1).padStart(2, "0")} / ${String(SCENES.length).padStart(2, "0")}`;
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
  const retainVideoFrame = ["video", "invitation", "reply", "fade", "finale", "complete"].includes(stage);
  $("ending-player").hidden = !retainVideoFrame;
  $("ending-video").hidden = !retainVideoFrame;
  $("ending-video").controls = stage === "video";
  $("ending-invitation").hidden = stage !== "invitation";
  $("ending-reply").hidden = stage !== "reply";
  $("ending-finale").hidden = stage !== "finale" && stage !== "complete";
  $("ending-restart").hidden = stage !== "complete";
}

function showEnding() {
  cancelChapterTransition();
  cancelEndingSequence();
  phase = "ending";
  $("ending-finale").classList.remove("is-rising", "is-complete");
  $("ending-recovery").hidden = true;
  $("ending-media-note").textContent = "";
  $("ending-reply-text").textContent = "";
  setEndingStage("video");
  showScreen("ending-screen");
  const video = $("ending-video");
  video.muted = !soundEnabled;
  video.src = MEDIA.endingVideo;
  if (MEDIA.endingPoster) video.poster = MEDIA.endingPoster;
  video.load();
  focusElement(video);
  backgroundMusic.pause();
  Object.values(soundEffects).forEach((audio) => audio.pause());
  // 마지막 결과의 '수민의 이야기 보기' 버튼을 누른 동작에서 바로 재생합니다.
  attemptEndingPlayback();
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
  // src/currentTime을 바꾸지 않아 마지막 영상 프레임이 그대로 남습니다.
  $("ending-video").pause();
  setEndingStage("invitation");
  $("ending-recovery").hidden = true;
  resumeMusic();
  focusElement($("journey-together"));
  $("game-status").textContent = "영상이 끝났어요. 앞으로의 여행도 함께하기 또는 여행 끝내기를 선택해 주세요.";
}

function chooseEnding(choice) {
  if (phase !== "ending" || endingStage !== "invitation") return;
  if (!Object.hasOwn(ENDING_REPLIES, choice)) return;
  const run = endingRun;
  $("ending-reply-text").textContent = ENDING_REPLIES[choice];
  setEndingStage("reply");
  focusElement($("ending-reply-text"));
  $("game-status").textContent = ENDING_REPLIES[choice];
  endingTimer = setTimeout(() => {
    if (run !== endingRun || phase !== "ending" || endingStage !== "reply") return;
    endingTimer = null;
    showGameEnd();
  }, ENDING_REPLY_MS);
}

function showGameEnd() {
  if (phase !== "ending" || endingStage !== "reply") return;
  const run = endingRun;
  setEndingStage("fade");
  $("ending-screen").style.setProperty("--ending-fade-duration", `${ENDING_FADE_MS}ms`);
  $("game-status").textContent = "여정을 마무리합니다.";
  endingTimer = setTimeout(() => {
    if (run !== endingRun || phase !== "ending" || endingStage !== "fade") return;
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
  }, ENDING_FADE_MS);
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
$("journey-together").addEventListener("click", () => chooseEnding("together"));
$("journey-finish").addEventListener("click", () => chooseEnding("finish"));
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
  if (phase === "choice" && /^[123abc]$/i.test(event.key)) {
    event.preventDefault();
    selectChoice(/^[123]$/.test(event.key) ? Number(event.key) - 1 : event.key.toUpperCase().charCodeAt(0) - 65);
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
