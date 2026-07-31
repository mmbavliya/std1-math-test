// Chinku Monkey Mascot UI Controller
export class MascotController {
  constructor(mascotEl, speechEl) {
    this.mascotEl = mascotEl;
    this.speechEl = speechEl;
  }

  setSpeech(text, emotion = 'happy') {
    if (this.speechEl) {
      this.speechEl.textContent = text;
      this.speechEl.classList.remove('speech-pop');
      void this.speechEl.offsetWidth; // Trigger reflow
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
