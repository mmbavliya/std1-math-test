(function () {
  'use strict';

  // -------------------------------------------------------------
  // 1. QUESTIONS DATA
  // -------------------------------------------------------------
  const QUESTIONS_DATA = [
    {
      id: 'q1',
      topicId: 'inside_outside',
      topicName: { gu: 'અંદર - બહાર', en: 'Inside - Outside' },
      title: {
        gu: 'ટોપલીની અંદર (Inside) કયું ફળ છે તે બતાવો?',
        en: 'Which fruit is INSIDE the basket?'
      },
      mascotText: {
        gu: 'ચીંકુ ભૂખ્યો થયો છે! ટોપલીની અંદર કયું ફળ છે?',
        en: 'Chinku is hungry! Which fruit is INSIDE the basket?'
      },
      sceneType: 'basket_fruits',
      options: [
        { id: 'opt1', label: { gu: 'કેરી (ઝાડ પર બહાર)', en: 'Mango (Outside)' }, icon: '🥭', correct: false, reason: { gu: 'કેરી બહાર ઝાડ પર છે!', en: 'Mango is outside!' } },
        { id: 'opt2', label: { gu: 'કેળું (ટોપલીની અંદર)', en: 'Banana (Inside Basket)' }, icon: '🍌', correct: true, reason: { gu: 'શાબ્બાશ! કેળું ટોપલીની અંદર છે!', en: 'Great! Banana is inside the basket!' } },
        { id: 'opt3', label: { gu: 'સફરજન (જમીન પર બહાર)', en: 'Apple (Outside on ground)' }, icon: '🍎', correct: false, reason: { gu: 'સફરજન બહાર જમીન પર છે!', en: 'Apple is outside on the ground!' } }
      ]
    },
    {
      id: 'q2',
      topicId: 'above_below',
      topicName: { gu: 'ઉપર - નીચે', en: 'Above - Below' },
      title: {
        gu: 'ઝાડની ઉપર (Top / Above) કયું પ્રાણી બેઠું છે?',
        en: 'Which animal is sitting ON TOP OF the tree?'
      },
      mascotText: {
        gu: 'જુઓ તો ખરા, ઝાડની સાવ ઉપર કોણ બેઠું છે?',
        en: 'Look carefully, who is sitting on top of the tree?'
      },
      sceneType: 'tree_animals',
      options: [
        { id: 'opt1', label: { gu: 'વાંદરો (ઝાડની ઉપર)', en: 'Monkey (On top of tree)' }, icon: '🐒', correct: true, reason: { gu: 'સરસ! વાંદરો ઝાડની ઉપર બેઠો છે!', en: 'Awesome! Monkey is on top of the tree!' } },
        { id: 'opt2', label: { gu: 'કૂતરો (ઝાડની નીચે)', en: 'Dog (Below the tree)' }, icon: '🐶', correct: false, reason: { gu: 'કૂતરો ઝાડની નીચે જમીન પર છે!', en: 'Dog is below the tree on the ground!' } },
        { id: 'opt3', label: { gu: 'સસલું (ઝાડની નીચે)', en: 'Rabbit (Below the tree)' }, icon: '🐰', correct: false, reason: { gu: 'સસલું નીચે છે!', en: 'Rabbit is below!' } }
      ]
    },
    {
      id: 'q3',
      topicId: 'topmost_bottommost',
      topicName: { gu: 'સૌથી ઉપર - સૌથી નીચે', en: 'Topmost - Bottommost' },
      title: {
        gu: 'માટલાની હારમાં સૌથી નીચે (Bottommost) કયું માટલું છે?',
        en: 'In the stack of pots, which pot is at the VERY BOTTOM?'
      },
      mascotText: {
        gu: 'એક પર એક માટલાં મૂક્યા છે! સૌથી નીચેનું માટલું શોધો!',
        en: 'Pots are stacked up! Find the pot at the bottommost position!'
      },
      sceneType: 'stacked_pots',
      options: [
        { id: 'opt1', label: { gu: 'પીળું માટલું (સૌથી ઉપર)', en: 'Yellow Pot (Topmost)' }, icon: '🟡🏺', correct: false, reason: { gu: 'આ માટલું તો સૌથી ઉપર છે!', en: 'This pot is at the top!' } },
        { id: 'opt2', label: { gu: 'વાદળી માટલું (વચ્ચે)', en: 'Blue Pot (Middle)' }, icon: '🔵🏺', correct: false, reason: { gu: 'આ માટલું તો વચ્ચે છે!', en: 'This pot is in the middle!' } },
        { id: 'opt3', label: { gu: 'લાલ માટલું (સૌથી નીચે)', en: 'Red Pot (Bottommost)' }, icon: '🔴🏺', correct: true, reason: { gu: 'અરે વાહ! લાલ માટલું સૌથી નીચે છે!', en: 'Bravo! Red pot is at the very bottom!' } }
      ]
    },
    {
      id: 'q4',
      topicId: 'near_far',
      topicName: { gu: 'નજીક - દૂર', en: 'Near - Far' },
      title: {
        gu: 'સૂર્યથી સૌથી દૂર (Farthest) કયું પક્ષી ઊડી રહ્યું છે?',
        en: 'Which bird is flying FARTHEST from the sun?'
      },
      mascotText: {
        gu: 'આકાશમાં સૂર્ય દાદા તપે છે! સૂર્યથી સૌથી દૂર પક્ષી શોધો!',
        en: 'Sun is shining in sky! Find the bird farthest from sun!'
      },
      sceneType: 'birds_sun',
      options: [
        { id: 'opt1', label: { gu: 'પીળું પક્ષી (સૂર્યની સૌથી નજીક)', en: 'Yellow Bird (Nearest to Sun)' }, icon: '🐤', correct: false, reason: { gu: 'પીળું પક્ષી સૂર્યની ખૂબ નજીક છે!', en: 'Yellow bird is very near the sun!' } },
        { id: 'opt2', label: { gu: 'સફેદ પક્ષી (સૂર્યથી સૌથી દૂર)', en: 'White Bird (Farthest from Sun)' }, icon: '🕊️', correct: true, reason: { gu: 'સાચું! સફેદ પક્ષી સૂર્યથી સૌથી દૂર છે!', en: 'Correct! White bird is farthest from the sun!' } }
      ]
    },
    {
      id: 'q5',
      topicId: 'in_front_behind',
      topicName: { gu: 'આગળ - પાછળ', en: 'In front - Behind' },
      title: {
        gu: 'દોડની રમતમાં સૌથી આગળ (In Front / Ahead) કઈ છોકરી છે?',
        en: 'In the race, which child is IN FRONT / AHEAD?'
      },
      mascotText: {
        gu: 'બાળકો દોડી રહ્યા છે! સૌથી આગળ કોણ દોડે છે?',
        en: 'Children are running! Who is running in front?'
      },
      sceneType: 'kids_running',
      options: [
        { id: 'opt1', label: { gu: 'ગુલાબી ફ્રોકવાળી આરાધ્યા (આગળ)', en: 'Girl in Pink Dress (Ahead)' }, icon: '👧', correct: true, reason: { gu: 'વાહ! આરાધ્યા સૌથી આગળ દોડી રહી છે!', en: 'Awesome! She is running in front!' } },
        { id: 'opt2', label: { gu: 'વાદળી ટી-શર્ટવાળો આરવ (પાછળ)', en: 'Boy in Blue Shirt (Behind)' }, icon: '👦', correct: false, reason: { gu: 'આરવ પાછળ રહી ગયો છે!', en: 'He is behind in the race!' } }
      ]
    },
    {
      id: 'q6',
      topicId: 'frontmost_rearmost',
      topicName: { gu: 'સૌથી આગળ - સૌથી પાછળ', en: 'Frontmost - Rearmost' },
      title: {
        gu: 'પ્રાણીઓની બર્થડે ટ્રેનમાં સૌથી આગળ (Frontmost) કોણ છે?',
        en: 'In the animal train, who is at the VERY FRONT (Engine driver)?'
      },
      mascotText: {
        gu: 'વાંદરાના બર્થડે પાર્ટીમાં પ્રાણીઓની ટ્રેન ચાલી! સૌથી આગળ એન્જિન પાસે કોણ છે?',
        en: 'Animal train is going to monkey’s birthday! Who is at the front near engine?'
      },
      sceneType: 'animal_train',
      options: [
        { id: 'opt1', label: { gu: 'હાથીભાઈ (સૌથી આગળ ડ્રાઇવર)', en: 'Elephant (At the very front)' }, icon: '🐘', correct: true, reason: { gu: 'શાબ્બાશ! હાથીભાઈ એન્જિનમાં સૌથી આગળ છે!', en: 'Superb! Elephant is at the very front!' } },
        { id: 'opt2', label: { gu: 'ઘેટું (વચ્ચેના ડબ્બામાં)', en: 'Sheep (Middle Coach)' }, icon: '🐑', correct: false, reason: { gu: 'ઘેટું વચ્ચે છે!', en: 'Sheep is in the middle coach!' } },
        { id: 'opt3', label: { gu: 'સસલું (સૌથી પાછળના ડબ્બામાં)', en: 'Rabbit (At the very rear)' }, icon: '🐰', correct: false, reason: { gu: 'સસલું તો સૌથી પાછળના ડબ્બામાં છે!', en: 'Rabbit is at the very rear coach!' } }
      ]
    },
    {
      id: 'q7',
      topicId: 'monkey_story',
      topicName: { gu: 'ચિત્રવાર્તા અને ગણતરી', en: 'Picture Story & Counting' },
      title: {
        gu: 'વાંદરાંઓ તળાવમાં ચમકતી કઈ વસ્તુ પકડવા એકબીજાની પૂંછડી પકડી લટક્યા?',
        en: 'What shining object were monkeys trying to catch in the pond?'
      },
      mascotText: {
        gu: 'વાંદરાં-ટોળીની વાર્તા યાદ છે ને? તળાવમાં ચમકતી કઈ વસ્તુ જોઈ?',
        en: 'Remember the story of monkeys? What shone in the pond water?'
      },
      sceneType: 'moon_pond',
      options: [
        { id: 'opt1', label: { gu: 'ચંદ્રનું પ્રતિબિંબ (ચાંદો / Moon)', en: 'Reflection of Moon' }, icon: '🌙', correct: true, reason: { gu: 'અરે વાહ! વાંદરાઓએ પાણીમાં ચાંદાનું પ્રતિબિંબ જોયું હતું!', en: 'Bravo! They saw the moon’s reflection in water!' } },
        { id: 'opt2', label: { gu: 'સોનાની ચાંદીની થાળી', en: 'Silver Plate' }, icon: '🍽️', correct: false, reason: { gu: 'ના રે ના! એ થાળી નહોતી!', en: 'No, it was not a plate!' } },
        { id: 'opt3', label: { gu: 'મોટો લાલ દડો', en: 'Big Red Ball' }, icon: '⚽', correct: false, reason: { gu: 'ના! એ દડો પણ નહોતો!', en: 'No, it was not a ball!' } }
      ]
    }
  ];

  // -------------------------------------------------------------
  // 2. AUDIO SYNTHESIZER
  // -------------------------------------------------------------
  class AudioSynthesizer {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleSound() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    playCorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];

      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.4, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.25);
      });
    }

    playWrong() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.25);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    }

    playFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const melody = [
        { note: 523.25, duration: 0.15 },
        { note: 659.25, duration: 0.15 },
        { note: 783.99, duration: 0.15 },
        { note: 1046.50, duration: 0.4 }
      ];

      let time = now;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.note, time);

        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + item.duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + item.duration);

        time += item.duration;
      });
    }
  }

  const audioSynth = new AudioSynthesizer();

  // -------------------------------------------------------------
  // 3. TEXT TO SPEECH MANAGER
  // -------------------------------------------------------------
  class TextToSpeechManager {
    constructor() {
      this.synth = window.speechSynthesis || null;
      this.audioPlayer = null;
      this.enabled = true;
      this.isSpeaking = false;
    }

    stop() {
      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.audioPlayer = null;
      }
      if (this.synth && (this.synth.speaking || this.synth.pending)) {
        this.synth.cancel();
      }
      this.isSpeaking = false;
    }

    speak(text, lang = 'gu') {
      if (!this.enabled || !text) return;
      this.stop();

      const cleanText = text
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .replace(/\(.*?\)/g, '')
        .trim();

      if (!cleanText) return;

      this.isSpeaking = true;

      if (lang === 'gu') {
        const encoded = encodeURIComponent(cleanText);
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=gu&client=tw-ob`;
        
        const audio = new Audio(audioUrl);
        this.audioPlayer = audio;

        audio.onended = () => {
          this.isSpeaking = false;
        };

        audio.onerror = () => {
          this.speakWebSpeech(cleanText, 'gu-IN');
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            this.speakWebSpeech(cleanText, 'gu-IN');
          });
        }
      } else {
        this.speakWebSpeech(cleanText, 'en-US');
      }
    }

    speakWebSpeech(text, langCode) {
      if (!this.synth) return;
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      utterance.lang = langCode;

      utterance.onend = () => {
        this.isSpeaking = false;
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
      };

      if (this.synth.getVoices) {
        const voices = this.synth.getVoices();
        const guVoice = voices.find(v => v.lang.toLowerCase().includes('gu') || v.name.toLowerCase().includes('gujarati'));
        if (guVoice && langCode.startsWith('gu')) {
          utterance.voice = guVoice;
        }
      }

      this.synth.speak(utterance);
    }

    toggle() {
      this.enabled = !this.enabled;
      if (!this.enabled) this.stop();
      return this.enabled;
    }
  }

  const tts = new TextToSpeechManager();

  // -------------------------------------------------------------
  // 4. MASCOT CONTROLLER
  // -------------------------------------------------------------
  class MascotController {
    constructor(mascotEl, speechEl) {
      this.mascotEl = mascotEl;
      this.speechEl = speechEl;
    }

    setSpeech(text, emotion = 'happy') {
      if (this.speechEl) {
        this.speechEl.textContent = text;
        this.speechEl.classList.remove('speech-pop');
        void this.speechEl.offsetWidth;
        this.speechEl.classList.add('speech-pop');
      }
      this.setEmotion(emotion);
    }

    setEmotion(emotion) {
      const mouth = document.getElementById('mascot-mouth');
      if (!mouth) return;

      if (emotion === 'happy') {
        mouth.setAttribute('d', 'M 42 62 Q 50 70 58 62');
      } else if (emotion === 'celebrate') {
        mouth.setAttribute('d', 'M 40 60 Q 50 74 60 60 Z');
        mouth.setAttribute('fill', '#d35400');
      } else if (emotion === 'think') {
        mouth.setAttribute('d', 'M 42 64 Q 50 60 58 64');
      } else if (emotion === 'oops') {
        mouth.setAttribute('d', 'M 44 64 A 6 6 0 0 1 56 64');
      }
    }
  }

  // -------------------------------------------------------------
  // 5. QUIZ CONTROLLER
  // -------------------------------------------------------------
  class QuizController {
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

      this.feedbackEl.classList.add('hidden');

      if (this.mascot) {
        this.mascot.setSpeech(question.mascotText[lang], 'think');
      }

      tts.speak(question.title[lang], lang);

      this.renderSceneSVG(question.sceneType);

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
            <rect x="50" y="80" width="30" height="140" fill="#a16207" rx="5"/>
            <circle cx="65" cy="80" r="55" fill="#22c55e"/>
            <text x="50" y="80" font-size="32">🥭</text>
            <path d="M 200 210 Q 250 250 300 210 L 290 170 L 210 170 Z" fill="#d97706" stroke="#78350f" stroke-width="4"/>
            <text x="235" y="195" font-size="40">🍌</text>
            <text x="215" y="175" font-size="20" fill="#92400e" font-weight="bold">અંદર (Inside)</text>
            <text x="380" y="240" font-size="35">🍎</text>
            <text x="360" y="265" font-size="16" fill="#15803d" font-weight="bold">બહાર (Outside)</text>
          </svg>
        `;
      } else if (sceneType === 'tree_animals') {
        svgContent = `
          <svg class="stage-svg" viewBox="0 0 500 300">
            <rect width="500" height="300" fill="#e0f2fe"/>
            <path d="M 0 230 Q 250 210 500 230 L 500 300 L 0 300 Z" fill="#4ade80"/>
            <rect x="215" y="90" width="70" height="150" fill="#92400e" rx="8"/>
            <circle cx="250" cy="90" r="85" fill="#16a34a"/>
            <circle cx="200" cy="110" r="60" fill="#22c55e"/>
            <circle cx="300" cy="110" r="60" fill="#22c55e"/>
            <text x="225" y="45" font-size="48">🐒</text>
            <rect x="210" y="5" width="80" height="24" rx="12" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
            <text x="220" y="22" font-size="14" fill="#854d0e" font-weight="bold">ઉપર (Top)</text>
            <text x="120" y="250" font-size="40">🐶</text>
            <text x="110" y="275" font-size="14" fill="#166534" font-weight="bold">નીચે (Below)</text>
            <text x="340" y="250" font-size="40">🐰</text>
          </svg>
        `;
      } else if (sceneType === 'stacked_pots') {
        svgContent = `
          <svg class="stage-svg" viewBox="0 0 500 300">
            <rect width="500" height="300" fill="#fef3c7"/>
            <rect x="50" y="240" width="400" height="60" fill="#d97706"/>
            <g transform="translate(200, 30)">
              <ellipse cx="50" cy="40" rx="30" ry="25" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
              <text x="-50" y="45" font-size="16" fill="#854d0e" font-weight="bold">સૌથી ઉપર 🟡</text>
              <ellipse cx="50" cy="95" rx="42" ry="32" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
              <text x="-30" y="100" font-size="16" fill="#0369a1" font-weight="bold">વચ્ચે 🔵</text>
              <ellipse cx="50" cy="165" rx="55" ry="40" fill="#f87171" stroke="#dc2626" stroke-width="3"/>
              <text x="-80" y="170" font-size="16" fill="#991b1b" font-weight="bold">સૌથી નીચે 🔴</text>
            </g>
          </svg>
        `;
      } else if (sceneType === 'birds_sun') {
        svgContent = `
          <svg class="stage-svg" viewBox="0 0 500 300">
            <rect width="500" height="300" fill="#38bdf8"/>
            <circle cx="410" cy="70" r="45" fill="#facc15"/>
            <text x="385" y="80" font-size="40">☀️</text>
            <text x="365" y="130" font-size="14" fill="#fef08a" font-weight="bold">સૂર્ય દાદા</text>
            <text x="310" y="100" font-size="38">🐤</text>
            <text x="290" y="125" font-size="14" fill="#ffffff" font-weight="bold">નજીક (Near)</text>
            <text x="70" y="140" font-size="45">🕊️</text>
            <text x="40" y="175" font-size="16" fill="#ffffff" font-weight="bold">સૌથી દૂર (Farthest)</text>
          </svg>
        `;
      } else if (sceneType === 'kids_running') {
        svgContent = `
          <svg class="stage-svg" viewBox="0 0 500 300">
            <rect width="500" height="300" fill="#f0fdf4"/>
            <rect x="0" y="180" width="500" height="120" fill="#cbd5e1"/>
            <line x1="0" y1="240" x2="500" y2="240" stroke="white" stroke-width="6" stroke-dasharray="20 15"/>
            <line x1="420" y1="180" x2="420" y2="300" stroke="#ef4444" stroke-width="8"/>
            <text x="425" y="210" font-size="20">🏁</text>
            <text x="300" y="220" font-size="55">👧</text>
            <rect x="290" y="135" width="80" height="24" rx="12" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
            <text x="300" y="152" font-size="14" fill="#9d174d" font-weight="bold">આગળ (In front)</text>
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
            <line x1="0" y1="240" x2="500" y2="240" stroke="#475569" stroke-width="6"/>
            <g transform="translate(320, 130)">
              <rect x="0" y="30" width="120" height="80" fill="#ef4444" rx="10"/>
              <text x="25" y="75" font-size="45">🐘</text>
              <circle cx="30" cy="110" r="14" fill="#1e293b"/>
              <circle cx="90" cy="110" r="14" fill="#1e293b"/>
              <rect x="-10" y="5" width="100" height="22" rx="11" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
              <text x="0" y="21" font-size="13" fill="#854d0e" font-weight="bold">સૌથી આગળ 🥇</text>
            </g>
            <g transform="translate(180, 150)">
              <rect x="0" y="20" width="110" height="65" fill="#facc15" rx="8"/>
              <text x="30" y="60" font-size="40">🐑</text>
              <circle cx="25" cy="85" r="12" fill="#1e293b"/>
              <circle cx="85" cy="85" r="12" fill="#1e293b"/>
            </g>
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
            <circle cx="420" cy="50" r="30" fill="#fef08a"/>
            <text x="402" y="58" font-size="28">🌙</text>
            <ellipse cx="250" cy="240" rx="200" ry="50" fill="#1e3a8a"/>
            <ellipse cx="250" cy="240" rx="40" ry="12" fill="#fef08a" opacity="0.8"/>
            <text x="235" y="246" font-size="16">🌙</text>
            <text x="210" y="275" font-size="14" fill="#93c5fd" font-weight="bold">તળાવમાં ચાંદો</text>
            <text x="225" y="110" font-size="42">🐒</text>
            <text x="230" y="150" font-size="38">🐒</text>
            <text x="232" y="190" font-size="34">🐒</text>
          </svg>
        `;
      }

      this.stageEl.innerHTML = svgContent;
    }
  }

  // -------------------------------------------------------------
  // 6. CLASSIFIER CONTROLLER
  // -------------------------------------------------------------
  class ClassifierController {
    constructor(options = {}) {
      this.poolEl = document.getElementById('items-pool');
      this.basketsEl = document.getElementById('baskets-grid');
      this.finishBtn = document.getElementById('finish-sort-btn');
      this.classTitleEl = document.getElementById('class-title');
      this.classDescEl = document.getElementById('class-desc');
      this.onComplete = options.onComplete || (() => {});
      this.selectedItem = null;
    }

    init(lang = 'gu') {
      this.lang = lang;
      this.classTitleEl.textContent = lang === 'gu' ? 'બટનો અને આકારોને સાચી ટોપલીમાં મૂકો! 🎨' : 'Sort buttons & shapes into matching baskets!';
      this.classDescEl.textContent = lang === 'gu' ? 'કોઈપણ આકાર પર ક્લિક કરો અને પછી તેની યોગ્ય ટોપલી પસંદ કરો.' : 'Click any shape, then click its matching basket.';

      tts.speak(this.classTitleEl.textContent, lang);

      this.baskets = [
        { id: 'b_red', name: { gu: 'લાલ રંગ (Red)', en: 'Red Basket' }, color: '#ef4444', icon: '🧺🔴', items: [] },
        { id: 'b_yellow', name: { gu: 'પીળો રંગ (Yellow)', en: 'Yellow Basket' }, color: '#eab308', icon: '🧺🟡', items: [] },
        { id: 'b_blue', name: { gu: 'વાદળી રંગ (Blue)', en: 'Blue Basket' }, color: '#3b82f6', icon: '🧺🔵', items: [] },
        { id: 'b_green', name: { gu: 'લીલો રંગ (Green)', en: 'Green Basket' }, color: '#22c55e', icon: '🧺🟢', items: [] }
      ];

      this.poolItems = [
        { id: 'i1', icon: '🔴', targetBasket: 'b_red', name: 'Red Circle' },
        { id: 'i2', icon: '🟡', targetBasket: 'b_yellow', name: 'Yellow Circle' },
        { id: 'i3', icon: '🔵', targetBasket: 'b_blue', name: 'Blue Circle' },
        { id: 'i4', icon: '🟢', targetBasket: 'b_green', name: 'Green Circle' },
        { id: 'i5', icon: '📕', targetBasket: 'b_red', name: 'Red Book' },
        { id: 'i6', icon: '🍌', targetBasket: 'b_yellow', name: 'Yellow Banana' },
        { id: 'i7', icon: '🚙', targetBasket: 'b_blue', name: 'Blue Car' },
        { id: 'i8', icon: '🐸', targetBasket: 'b_green', name: 'Green Frog' }
      ];

      this.render();
    }

    render() {
      this.poolEl.innerHTML = '';
      this.poolItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = `sort-item ${this.selectedItem === item ? 'selected' : ''}`;
        itemEl.textContent = item.icon;
        itemEl.addEventListener('click', () => {
          audioSynth.playClick();
          this.selectedItem = item;
          this.render();
        });
        this.poolEl.appendChild(itemEl);
      });

      this.basketsEl.innerHTML = '';
      this.baskets.forEach(basket => {
        const basketCard = document.createElement('div');
        basketCard.className = 'basket-card';
        basketCard.style.borderColor = basket.color;

        basketCard.innerHTML = `
          <div class="basket-icon">${basket.icon}</div>
          <div class="basket-title" style="color:${basket.color}">${basket.name[this.lang]}</div>
          <div class="basket-slots">
            ${basket.items.map(it => `<span>${it.icon}</span>`).join('')}
          </div>
        `;

        basketCard.addEventListener('click', () => this.handleBasketClick(basket));
        this.basketsEl.appendChild(basketCard);
      });

      if (this.poolItems.length === 0) {
        this.finishBtn.style.display = 'inline-flex';
        this.finishBtn.onclick = () => {
          audioSynth.playFanfare();
          this.onComplete();
        };
      } else {
        this.finishBtn.style.display = 'none';
      }
    }

    handleBasketClick(basket) {
      if (!this.selectedItem) {
        tts.speak(this.lang === 'gu' ? 'પહેલાં ઉપરથી કોઈ વસ્તુ પસંદ કરો!' : 'Please select an item first!', this.lang);
        return;
      }

      if (this.selectedItem.targetBasket === basket.id) {
        audioSynth.playCorrect();
        basket.items.push(this.selectedItem);
        this.poolItems = this.poolItems.filter(i => i.id !== this.selectedItem.id);
        this.selectedItem = null;
        this.render();
      } else {
        audioSynth.playWrong();
        tts.speak(this.lang === 'gu' ? 'અરેરે! રંગ સરખાવો!' : 'Try again! Match the color!', this.lang);
      }
    }
  }

  // -------------------------------------------------------------
  // 7. REPORT CARD CONTROLLER
  // -------------------------------------------------------------
  class ReportCardController {
    constructor() {
      this.tbodyEl = document.getElementById('report-table-body');
      this.studentNameEl = document.getElementById('results-student-name');
      this.starsSummaryEl = document.getElementById('score-stars-summary');
    }

    renderReport(studentName, scores, totalStars, lang = 'gu') {
      this.studentNameEl.textContent = `${lang === 'gu' ? 'વિદ્યાર્થીનું નામ' : 'Student Name'}: ${studentName || 'આરાધ્યા / Aaradhya'}`;
      
      const numStars = Math.min(5, Math.ceil((totalStars / 7) * 5));
      this.starsSummaryEl.textContent = '⭐'.repeat(numStars) + '☆'.repeat(5 - numStars);

      const outcomes = [
        { id: 'inside_outside', name: { gu: 'અંદર-બહારની વસ્તુઓને ઓળખી બતાવે છે.', en: 'Identifies objects inside vs outside.' } },
        { id: 'above_below', name: { gu: 'ઉપર-નીચે ઓળખી બતાવે છે.', en: 'Identifies objects above vs below.' } },
        { id: 'topmost_bottommost', name: { gu: 'સૌથી ઉપર - સૌથી નીચે ઓળખી બતાવે છે.', en: 'Identifies topmost vs bottommost objects.' } },
        { id: 'near_far', name: { gu: 'નજીક-દૂર ઓળખી બતાવે છે.', en: 'Identifies near vs far objects.' } },
        { id: 'in_front_behind', name: { gu: 'આગળ-પાછળને ઓળખી બતાવે છે.', en: 'Identifies objects in front vs behind.' } },
        { id: 'frontmost_rearmost', name: { gu: 'સૌથી આગળ અને સૌથી પાછળને ઓળખી બતાવે છે.', en: 'Identifies frontmost vs rearmost objects.' } },
        { id: 'classification', name: { gu: 'કદ, રંગ, આકાર ગુણધર્મોના આધારે વર્ગીકરણ કરે છે.', en: 'Classifies objects by size, color & shape.' } }
      ];

      this.tbodyEl.innerHTML = '';
      outcomes.forEach((item, index) => {
        const isPassed = scores[item.id] !== false;
        const grade = isPassed ? 'A' : 'B';
        const gradeClass = `grade-${grade}`;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.name[lang]}</td>
          <td><span class="grade-badge ${gradeClass}">${grade} (${isPassed ? 'ઉત્કૃષ્ટ / Excellent' : 'સુધારાસ્પદ / Good'})</span></td>
        `;
        this.tbodyEl.appendChild(row);
      });
    }

    printCertificate() {
      window.print();
    }
  }

  // -------------------------------------------------------------
  // 8. MAIN MATH APP
  // -------------------------------------------------------------
  class MathApp {
    constructor() {
      this.currentScreen = 'welcome';
      this.currentQuestionIndex = 0;
      this.starsCount = 0;
      this.studentName = 'આરાધ્યા';
      this.lang = 'gu';
      this.scores = {};

      this.initDOM();
      this.initControllers();
      this.bindEvents();
    }

    initDOM() {
      this.screens = {
        welcome: document.getElementById('screen-welcome'),
        quiz: document.getElementById('screen-quiz'),
        classification: document.getElementById('screen-classification'),
        results: document.getElementById('screen-results')
      };

      this.starCountEl = document.getElementById('star-count');
      this.progressFillEl = document.getElementById('progress-fill');
      this.progressCounterEl = document.getElementById('progress-counter');
      this.topicBadgeTextEl = document.getElementById('topic-badge-text');
      this.langBtnTextEl = document.getElementById('lang-text');
      this.studentInputEl = document.getElementById('student-name-input');
    }

    initControllers() {
      const mascotEl = document.getElementById('chinku-mascot');
      const speechEl = document.getElementById('mascot-speech');
      this.mascot = new MascotController(mascotEl, speechEl);

      this.quizController = new QuizController({
        mascot: this.mascot,
        onAnswerSubmit: (qId, isCorrect) => this.handleAnswer(qId, isCorrect)
      });

      this.classifierController = new ClassifierController({
        onComplete: () => this.handleClassificationComplete()
      });

      this.reportCardController = new ReportCardController();
    }

    bindEvents() {
      const startBtn = document.getElementById('start-game-btn');
      if (startBtn) {
        startBtn.addEventListener('click', (e) => {
          e.preventDefault();
          audioSynth.playClick();
          const val = this.studentInputEl ? this.studentInputEl.value.trim() : '';
          if (val) this.studentName = val;
          this.startGame();
        });
      }

      const welcomeSpeakBtn = document.getElementById('welcome-speak-btn');
      if (welcomeSpeakBtn) {
        welcomeSpeakBtn.addEventListener('click', () => {
          audioSynth.playClick();
          this.speakCurrentScreenContent();
        });
      }

      document.getElementById('next-q-btn').addEventListener('click', () => {
        audioSynth.playClick();
        this.nextQuestion();
      });

      document.getElementById('sound-toggle-btn').addEventListener('click', (e) => {
        const active = audioSynth.toggleSound();
        e.currentTarget.style.opacity = active ? '1' : '0.5';
      });

      document.getElementById('tts-toggle-btn').addEventListener('click', () => {
        audioSynth.playClick();
        this.speakCurrentScreenContent();
      });

      document.getElementById('repeat-speech-btn').addEventListener('click', () => {
        audioSynth.playClick();
        this.speakCurrentScreenContent();
      });

      document.getElementById('lang-toggle-btn').addEventListener('click', () => {
        audioSynth.playClick();
        this.lang = this.lang === 'gu' ? 'en' : 'gu';
        this.langBtnTextEl.textContent = this.lang === 'gu' ? 'English 🌐' : 'ગુજરાતી 🌐';
        this.updateUILanguage();
      });

      document.getElementById('print-cert-btn').addEventListener('click', () => {
        audioSynth.playClick();
        this.reportCardController.printCertificate();
      });

      document.getElementById('restart-game-btn').addEventListener('click', () => {
        audioSynth.playClick();
        this.resetGame();
      });
    }

    speakCurrentScreenContent() {
      if (this.currentScreen === 'welcome') {
        const introMsg = this.lang === 'gu'
          ? 'ધોરણ ૧ ગણિત ગમ્મત. એકમ ૧: વાંદરાં-ટોળી! આવો ચીંકુ વાંદરા અને તેના મિત્રો સાથે ગણિતની મજેદાર રમતો રમીએ!'
          : 'Std 1 Mathematics. Chapter 1: Monkeys Group! Come, let us play fun math games with Chinku monkey!';
        tts.speak(introMsg, this.lang);
      } else if (this.currentScreen === 'quiz') {
        const q = QUESTIONS_DATA[this.currentQuestionIndex];
        if (q) {
          tts.speak(q.title[this.lang], this.lang);
        }
      } else if (this.currentScreen === 'classification') {
        const classMsg = this.lang === 'gu'
          ? 'વર્ગીકરણ પ્રવૃત્તિ. બટનો અને આકારોને તેમની સાચી ટોપલીમાં મૂકો!'
          : 'Sorting Activity. Put buttons and shapes into their correct matching baskets!';
        tts.speak(classMsg, this.lang);
      } else if (this.currentScreen === 'results') {
        const resMsg = this.lang === 'gu'
          ? `અભિનંદન ${this.studentName}! તમે એકમ ૧ વાંદરાં-ટોળીમાં ખૂબ જ સરસ પ્રદર્શન કર્યું!`
          : `Congratulations ${this.studentName}! Outstanding performance!`;
        tts.speak(resMsg, this.lang);
      }
    }

    showScreen(screenName) {
      this.currentScreen = screenName;
      Object.keys(this.screens).forEach(key => {
        if (this.screens[key]) {
          this.screens[key].classList.toggle('active', key === screenName);
        }
      });
    }

    startGame() {
      this.currentQuestionIndex = 0;
      this.starsCount = 0;
      this.scores = {};
      this.updateStarsDisplay();
      this.showScreen('quiz');
      this.loadQuestion(0);
    }

    loadQuestion(index) {
      this.quizController.resetState();
      const q = QUESTIONS_DATA[index];
      this.topicBadgeTextEl.textContent = q.topicName[this.lang];

      const total = QUESTIONS_DATA.length + 1;
      const percent = Math.round(((index + 1) / total) * 100);
      this.progressFillEl.style.width = `${percent}%`;
      this.progressCounterEl.textContent = `${index + 1} / ${total}`;

      this.quizController.renderQuestion(q, index, QUESTIONS_DATA.length, this.lang);
    }

    handleAnswer(questionId, isCorrect) {
      if (isCorrect) {
        this.starsCount += 3;
        this.scores[QUESTIONS_DATA[this.currentQuestionIndex].topicId] = true;
        this.updateStarsDisplay();
        this.triggerConfetti(50);
      } else {
        this.scores[QUESTIONS_DATA[this.currentQuestionIndex].topicId] = false;
      }
    }

    nextQuestion() {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < QUESTIONS_DATA.length) {
        this.loadQuestion(this.currentQuestionIndex);
      } else {
        this.showScreen('classification');
        this.topicBadgeTextEl.textContent = this.lang === 'gu' ? 'વર્ગીકરણ પ્રવૃત્તિ' : 'Sorting Activity';
        this.progressFillEl.style.width = `90%`;
        this.classifierController.init(this.lang);
      }
    }

    handleClassificationComplete() {
      this.starsCount += 5;
      this.scores['classification'] = true;
      this.updateStarsDisplay();
      this.triggerConfetti(150);

      this.showScreen('results');
      this.progressFillEl.style.width = `100%`;
      this.reportCardController.renderReport(this.studentName, this.scores, this.starsCount, this.lang);
    }

    updateStarsDisplay() {
      this.starCountEl.textContent = this.starsCount;
    }

    resetGame() {
      this.showScreen('welcome');
      this.progressFillEl.style.width = `0%`;
    }

    updateUILanguage() {
      if (this.currentScreen === 'quiz') {
        this.loadQuestion(this.currentQuestionIndex);
      } else if (this.currentScreen === 'classification') {
        this.classifierController.init(this.lang);
      } else if (this.currentScreen === 'results') {
        this.reportCardController.renderReport(this.studentName, this.scores, this.starsCount, this.lang);
      }
    }

    triggerConfetti(count = 100) {
      const canvas = document.getElementById('confetti-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const colors = ['#f1c40f', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#e67e22'];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -10,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 6 + 3,
          rot: Math.random() * 360,
          vr: (Math.random() - 0.5) * 10
        });
      }

      let startTime = Date.now();
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vr;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        if (Date.now() - startTime < 2500) {
          requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      animate();
    }
  }

  function initApp() {
    window.app = new MathApp();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
