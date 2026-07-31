// Web Speech & Online TTS Engine for High Quality Gujarati Voice
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

    // Clean emojis and bracket notes for clean speech
    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\(.*?\)/g, '')
      .trim();

    if (!cleanText) return;

    this.isSpeaking = true;

    if (lang === 'gu') {
      // Use Google Translate Gujarati TTS Audio API for crisp natural Gujarati speech
      const encoded = encodeURIComponent(cleanText);
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=gu&client=tw-ob`;
      
      const audio = new Audio(audioUrl);
      this.audioPlayer = audio;

      audio.onended = () => {
        this.isSpeaking = false;
      };

      audio.onerror = () => {
        // Fallback to Web Speech API gu-IN if offline or blocked
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

export const tts = new TextToSpeechManager();

