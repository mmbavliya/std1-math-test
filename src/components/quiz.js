// Quiz Screen & Interactive Scene Renderer
import { audioSynth } from '../audio.js';
import { tts } from '../tts.js';

export class QuizController {
  constructor(options = {}) {
    this.stageEl = document.getElementById('scene-stage');
    this.optionsEl = document.getElementById('options-container');
    this.qTitleEl = document.getElementById('q-title');
    this.qPillEl = document.getElementById('q-number-pill');
    this.feedbackEl = document.getElementById('feedback-banner');
    this.feedbackEmojiEl = document.getElementById('feedback-emoji');
    this.feedbackMsgEl = document.getElementById('feedback-msg');
    this.nextBtn = document.getElementById('next-q-btn');
    this.mascot = options.mascot;
    this.onAnswerSubmit = options.onAnswerSubmit || (() => {});
  }

  renderQuestion(question, currentIndex, totalQuestions, lang = 'gu') {
    this.currentQuestion = question;
    this.qPillEl.textContent = lang === 'gu' ? `સવાલ ${currentIndex + 1} / ${totalQuestions}` : `Question ${currentIndex + 1} / ${totalQuestions}`;
    this.qTitleEl.textContent = question.title[lang];

    // Reset feedback overlay
    this.feedbackEl.classList.add('hidden');

    // Update Mascot Speech
    if (this.mascot) {
      this.mascot.setSpeech(question.mascotText[lang], 'think');
    }

    // Speak question aloud
    tts.speak(question.title[lang], lang);

    // Render Scene SVG
    this.renderSceneSVG(question.sceneType);

    // Render Options
    this.optionsEl.innerHTML = '';
    question.options.forEach(opt => {
      const card = document.createElement('div');
      card.className = 'option-card';
      card.dataset.optionId = opt.id;

      card.innerHTML = `
        <div class="option-card-icon">${opt.icon}</div>
        <div class="option-card-label">${opt.label[lang]}</div>
      `;

      card.addEventListener('click', () => this.handleOptionClick(opt, card, lang));
      this.optionsEl.appendChild(card);
    });
  }

  handleOptionClick(option, cardEl, lang) {
    if (this.isAnswered) return;

    audioSynth.playClick();
    const allCards = this.optionsEl.querySelectorAll('.option-card');
    
    if (option.correct) {
      this.isAnswered = true;
      cardEl.classList.add('selected-correct');
      audioSynth.playCorrect();

      if (this.mascot) {
        this.mascot.setSpeech(option.reason[lang], 'celebrate');
      }
      tts.speak(option.reason[lang], lang);

      this.showFeedback('🎉', option.reason[lang], true);
      this.onAnswerSubmit(this.currentQuestion.id, true);
    } else {
      cardEl.classList.add('selected-wrong');
      audioSynth.playWrong();

      const wrongMsg = lang === 'gu' ? 'અરેરે! ફરીથી પ્રયત્ન કરો!' : 'Oops! Try again!';
      if (this.mascot) {
        this.mascot.setSpeech(wrongMsg + ' 🤔', 'oops');
      }
      tts.speak(wrongMsg, lang);

      setTimeout(() => {
        cardEl.classList.remove('selected-wrong');
      }, 1000);

      this.onAnswerSubmit(this.currentQuestion.id, false);
    }
  }

  showFeedback(emoji, msg, isCorrect) {
    this.feedbackEmojiEl.textContent = emoji;
    this.feedbackMsgEl.textContent = msg;
    this.feedbackEl.classList.remove('hidden');
  }

  resetState() {
    this.isAnswered = false;
  }

  renderSceneSVG(sceneType) {
    let svgContent = '';

    if (sceneType === 'basket_fruits') {
      svgContent = `
        <svg class="stage-svg" viewBox="0 0 500 300">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#bae6fd"/><stop offset="100%" stop-color="#f0fdf4"/></linearGradient>
          </defs>
          <rect width="500" height="300" fill="url(#sky)"/>
          <path d="M 0 220 Q 250 200 500 220 L 500 300 L 0 300 Z" fill="#86efac"/>
          <!-- Tree -->
          <rect x="50" y="80" width="30" height="140" fill="#a16207" rx="5"/>
          <circle cx="65" cy="80" r="55" fill="#22c55e"/>
          <text x="50" y="80" font-size="32">🥭</text>
          <!-- Basket in center -->
          <path d="M 200 210 Q 250 250 300 210 L 290 170 L 210 170 Z" fill="#d97706" stroke="#78350f" stroke-width="4"/>
          <!-- Inside Basket Fruit -->
          <text x="235" y="195" font-size="40">🍌</text>
          <text x="215" y="175" font-size="20" fill="#92400e" font-weight="bold">અંદર (Inside)</text>
          <!-- Outside Fruit on ground -->
          <text x="380" y="240" font-size="35">🍎</text>
          <text x="360" y="265" font-size="16" fill="#15803d" font-weight="bold">બહાર (Outside)</text>
        </svg>
      `;
    } else if (sceneType === 'tree_animals') {
      svgContent = `
        <svg class="stage-svg" viewBox="0 0 500 300">
          <rect width="500" height="300" fill="#e0f2fe"/>
          <path d="M 0 230 Q 250 210 500 230 L 500 300 L 0 300 Z" fill="#4ade80"/>
          <!-- Big Tree -->
          <rect x="215" y="90" width="70" height="150" fill="#92400e" rx="8"/>
          <circle cx="250" cy="90" r="85" fill="#16a34a"/>
          <circle cx="200" cy="110" r="60" fill="#22c55e"/>
          <circle cx="300" cy="110" r="60" fill="#22c55e"/>
          <!-- Monkey on Top -->
          <text x="225" y="45" font-size="48">🐒</text>
          <rect x="210" y="5" width="80" height="24" rx="12" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
          <text x="220" y="22" font-size="14" fill="#854d0e" font-weight="bold">ઉપર (Top)</text>
          <!-- Dog below -->
          <text x="120" y="250" font-size="40">🐶</text>
          <text x="110" y="275" font-size="14" fill="#166534" font-weight="bold">નીચે (Below)</text>
          <!-- Rabbit below -->
          <text x="340" y="250" font-size="40">🐰</text>
        </svg>
      `;
    } else if (sceneType === 'stacked_pots') {
      svgContent = `
        <svg class="stage-svg" viewBox="0 0 500 300">
          <rect width="500" height="300" fill="#fef3c7"/>
          <rect x="50" y="240" width="400" height="60" fill="#d97706"/>
          <!-- Pots Stack -->
          <g transform="translate(200, 30)">
            <!-- Top Pot -->
            <ellipse cx="50" cy="40" rx="30" ry="25" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
            <text x="-50" y="45" font-size="16" fill="#854d0e" font-weight="bold">સૌથી ઉપર 🟡</text>
            <!-- Middle Pot -->
            <ellipse cx="50" cy="95" rx="42" ry="32" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
            <text x="-30" y="100" font-size="16" fill="#0369a1" font-weight="bold">વચ્ચે 🔵</text>
            <!-- Bottom Pot -->
            <ellipse cx="50" cy="165" rx="55" ry="40" fill="#f87171" stroke="#dc2626" stroke-width="3"/>
            <text x="-80" y="170" font-size="16" fill="#991b1b" font-weight="bold">સૌથી નીચે 🔴</text>
          </g>
        </svg>
      `;
    } else if (sceneType === 'birds_sun') {
      svgContent = `
        <svg class="stage-svg" viewBox="0 0 500 300">
          <rect width="500" height="300" fill="#38bdf8"/>
          <!-- Sun -->
          <circle cx="410" cy="70" r="45" fill="#facc15"/>
          <text x="385" y="80" font-size="40">☀️</text>
          <text x="365" y="130" font-size="14" fill="#fef08a" font-weight="bold">સૂર્ય દાદા</text>
          <!-- Near Bird -->
          <text x="310" y="100" font-size="38">🐤</text>
          <text x="290" y="125" font-size="14" fill="#ffffff" font-weight="bold">નજીક (Near)</text>
          <!-- Far Bird -->
          <text x="70" y="140" font-size="45">🕊️</text>
          <text x="40" y="175" font-size="16" fill="#ffffff" font-weight="bold">સૌથી દૂર (Farthest)</text>
        </svg>
      `;
    } else if (sceneType === 'kids_running') {
      svgContent = `
        <svg class="stage-svg" viewBox="0 0 500 300">
          <rect width="500" height="300" fill="#f0fdf4"/>
          <!-- Race track -->
          <rect x="0" y="180" width="500" height="120" fill="#cbd5e1"/>
          <line x1="0" y1="240" x2="500" y2="240" stroke="white" stroke-width="6" stroke-dasharray="20 15"/>
          <!-- Finish line -->
          <line x1="420" y1="180" x2="420" y2="300" stroke="#ef4444" stroke-width="8"/>
          <text x="425" y="210" font-size="20">🏁</text>
          <!-- Girl Ahead -->
          <text x="300" y="220" font-size="55">👧</text>
          <rect x="290" y="135" width="80" height="24" rx="12" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
          <text x="300" y="152" font-size="14" fill="#9d174d" font-weight="bold">આગળ (In front)</text>
          <!-- Boy Behind -->
          <text x="120" y="220" font-size="55">👦</text>
          <rect x="110" y="135" width="80" height="24" rx="12" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
          <text x="125" y="152" font-size="14" fill="#0369a1" font-weight="bold">પાછળ (Behind)</text>
        </svg>
      `;
    } else if (sceneType === 'animal_train') {
      svgContent = `
        <svg class="stage-svg" viewBox="0 0 500 300">
          <rect width="500" height="300" fill="#e0f2fe"/>
          <rect x="0" y="220" width="500" height="80" fill="#86efac"/>
          <!-- Tracks -->
          <line x1="0" y1="240" x2="500" y2="240" stroke="#475569" stroke-width="6"/>
          <!-- Train Engine (Front) -->
          <g transform="translate(320, 130)">
            <rect x="0" y="30" width="120" height="80" fill="#ef4444" rx="10"/>
            <text x="25" y="75" font-size="45">🐘</text>
            <circle cx="30" cy="110" r="14" fill="#1e293b"/>
            <circle cx="90" cy="110" r="14" fill="#1e293b"/>
            <rect x="-10" y="5" width="100" height="22" rx="11" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
            <text x="0" y="21" font-size="13" fill="#854d0e" font-weight="bold">સૌથી આગળ 🥇</text>
          </g>
          <!-- Middle Coach -->
          <g transform="translate(180, 150)">
            <rect x="0" y="20" width="110" height="65" fill="#facc15" rx="8"/>
            <text x="30" y="60" font-size="40">🐑</text>
            <circle cx="25" cy="85" r="12" fill="#1e293b"/>
            <circle cx="85" cy="85" r="12" fill="#1e293b"/>
          </g>
          <!-- Rear Coach -->
          <g transform="translate(40, 150)">
            <rect x="0" y="20" width="110" height="65" fill="#38bdf8" rx="8"/>
            <text x="30" y="60" font-size="40">🐰</text>
            <circle cx="25" cy="85" r="12" fill="#1e293b"/>
            <circle cx="85" cy="85" r="12" fill="#1e293b"/>
            <rect x="-10" y="-5" width="100" height="22" rx="11" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
            <text x="0" y="11" font-size="13" fill="#991b1b" font-weight="bold">સૌથી પાછળ 🥉</text>
          </g>
        </svg>
      `;
    } else if (sceneType === 'moon_pond') {
      svgContent = `
        <svg class="stage-svg" viewBox="0 0 500 300">
          <rect width="500" height="300" fill="#0f172a"/>
          <!-- Sky Moon -->
          <circle cx="420" cy="50" r="30" fill="#fef08a"/>
          <text x="402" y="58" font-size="28">🌙</text>
          <!-- Pond Water -->
          <ellipse cx="250" cy="240" rx="200" ry="50" fill="#1e3a8a"/>
          <ellipse cx="250" cy="240" rx="40" ry="12" fill="#fef08a" opacity="0.8"/>
          <text x="235" y="246" font-size="16">🌙</text>
          <text x="210" y="275" font-size="14" fill="#93c5fd" font-weight="bold">તળાવમાં ચાંદો</text>
          <!-- Hanging monkeys -->
          <text x="225" y="110" font-size="42">🐒</text>
          <text x="230" y="150" font-size="38">🐒</text>
          <text x="232" y="190" font-size="34">🐒</text>
        </svg>
      `;
    }

    this.stageEl.innerHTML = svgContent;
  }
}
