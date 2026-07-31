// Web Speech & Online TTS Engine for High Quality Gujarati Voice
class TextToSpeechManager {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.audioPlayer = null;
    this.enabled = true;
    this.isSpeaking = false;
    this.voices = [];

    if (this.synth) {
      this.loadVoices();
      if (typeof this.synth.onvoiceschanged !== 'undefined') {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (this.synth && this.synth.getVoices) {
      this.voices = this.synth.getVoices();
    }
  }

  unlock() {
    if (this.synth) {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.loadVoices();
    }
  }

  stop() {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
      this.audioPlayer = null;
    }
    if (this.synth) {
      this.synth.cancel();
      if (this.synth.paused) {
        this.synth.resume();
      }
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
      // First try Google Translate TTS audio API
      const encoded = encodeURIComponent(cleanText);
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=gu&client=tw-ob`;
      
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.src = audioUrl;
      this.audioPlayer = audio;

      audio.onended = () => {
        this.isSpeaking = false;
      };

      audio.onerror = () => {
        // Fallback to Web Speech API gu-IN
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
    if (!this.synth) {
      this.isSpeaking = false;
      return;
    }

    this.synth.cancel();
    if (this.synth.paused) {
      this.synth.resume();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.lang = langCode;

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.isSpeaking = false;
    };

    const voices = this.voices.length ? this.voices : (this.synth.getVoices ? this.synth.getVoices() : []);
    if (voices.length > 0) {
      if (langCode.startsWith('gu')) {
        let guVoice = voices.find(v => v.lang.toLowerCase().includes('gu') || v.name.toLowerCase().includes('gujarati'));
        if (!guVoice) {
          // Fallback to Hindi or Indian English voice if Gujarati voice is not installed on OS
          guVoice = voices.find(v => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi') || v.lang.toLowerCase().includes('in'));
        }
        if (guVoice) {
          utterance.voice = guVoice;
        }
      } else {
        const enVoice = voices.find(v => v.lang.toLowerCase().includes('en'));
        if (enVoice) utterance.voice = enVoice;
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
