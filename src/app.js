// Main Application Entry Point
import { QUESTIONS_DATA } from './questions.js';
import { MascotController } from './components/mascot.js';
import { QuizController } from './components/quiz.js';
import { ClassifierController } from './components/classifier.js';
import { ReportCardController } from './components/reportCard.js';
import { audioSynth } from './audio.js';
import { tts } from './tts.js';

class MathApp {
  constructor() {
    this.currentScreen = 'welcome';
    this.currentQuestionIndex = 0;
    this.starsCount = 0;
    this.studentName = 'આરાધ્યા';
    this.lang = 'gu'; // Default Gujarati
    this.scores = {};

    this.initDOM();
    this.initControllers();
    this.bindEvents();
  }

  initDOM() {
    // Screens
    this.screens = {
      welcome: document.getElementById('screen-welcome'),
      quiz: document.getElementById('screen-quiz'),
      classification: document.getElementById('screen-classification'),
      results: document.getElementById('screen-results')
    };

    // Header controls
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
    // Unlock Audio Context & TTS on first user interaction (browser autoplay policy)
    const unlockAudio = () => {
      audioSynth.init();
      tts.unlock();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    // Start Game
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

    // Welcome screen speak button
    const welcomeSpeakBtn = document.getElementById('welcome-speak-btn');
    if (welcomeSpeakBtn) {
      welcomeSpeakBtn.addEventListener('click', () => {
        audioSynth.playClick();
        tts.unlock();
        this.speakCurrentScreenContent();
      });
    }

    // Next Question
    document.getElementById('next-q-btn').addEventListener('click', () => {
      audioSynth.playClick();
      this.nextQuestion();
    });

    // Sound FX Toggle
    document.getElementById('sound-toggle-btn').addEventListener('click', (e) => {
      const active = audioSynth.toggleSound();
      e.currentTarget.style.opacity = active ? '1' : '0.5';
    });

    // TTS Header Toggle button
    document.getElementById('tts-toggle-btn').addEventListener('click', () => {
      audioSynth.playClick();
      tts.unlock();
      this.speakCurrentScreenContent();
    });

    // Repeat speech btn
    document.getElementById('repeat-speech-btn').addEventListener('click', () => {
      audioSynth.playClick();
      tts.unlock();
      this.speakCurrentScreenContent();
    });

    // Language Toggle
    document.getElementById('lang-toggle-btn').addEventListener('click', () => {
      audioSynth.playClick();
      this.lang = this.lang === 'gu' ? 'en' : 'gu';
      this.langBtnTextEl.textContent = this.lang === 'gu' ? 'English 🌐' : 'ગુજરાતી 🌐';
      this.updateUILanguage();
    });

    // Print Cert
    document.getElementById('print-cert-btn').addEventListener('click', () => {
      audioSynth.playClick();
      this.reportCardController.printCertificate();
    });

    // Restart Game
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
      this.screens[key].classList.toggle('active', key === screenName);
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

    // Progress bar update
    const total = QUESTIONS_DATA.length + 1; // 7 Qs + 1 classification activity
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
      // Go to Classification interactive sorting activity (Page 14)
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

    // Go to final results / Report card
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

// Initialize on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new MathApp();
});
