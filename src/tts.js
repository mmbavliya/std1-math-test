// Web Speech & Multi-Fallback TTS Engine for Gujarati Math Game
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
      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (e) {}
      this.loadVoices();
    }
  }

  stop() {
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      } catch (e) {}
      this.audioPlayer = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (e) {}
    }
    this.isSpeaking = false;
  }

  // Transliterate Gujarati script Unicode (0x0A80-0x0AFF) to Devanagari script (0x0900-0x097F)
  // This allows Hindi Speech Engines (built into 100% of browsers) to pronounce Gujarati words accurately!
  toDevanagari(text) {
    return text.split('').map(c => {
      const code = c.charCodeAt(0);
      return (code >= 0x0A80 && code <= 0x0AFF) ? String.fromCharCode(code - 0x0180) : c;
    }).join('');
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
      // 1. Try Online Google TTS MP3 audio
      const encoded = encodeURIComponent(cleanText);
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=gu&client=tw-ob`;

      const audio = new Audio();
      this.audioPlayer = audio;

      let fallbackTriggered = false;
      const doFallback = () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          this.speakWebSpeech(cleanText, 'gu');
        }
      };

      audio.onended = () => {
        this.isSpeaking = false;
      };
      audio.onerror = () => doFallback();

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => doFallback());
      }
    } else {
      this.speakWebSpeech(cleanText, 'en');
    }
  }

  speakWebSpeech(text, targetLang = 'gu') {
    if (!this.synth) {
      this.isSpeaking = false;
      return;
    }

    try {
      this.synth.cancel();
      if (this.synth.paused) {
        this.synth.resume();
      }
    } catch (e) {}

    const voices = this.voices.length ? this.voices : (this.synth.getVoices ? this.synth.getVoices() : []);
    
    let selectedVoice = null;
    let textToSpeak = text;
    let langCode = targetLang === 'gu' ? 'gu-IN' : 'en-US';

    if (targetLang === 'gu') {
      // 1. Check for native Gujarati voice
      selectedVoice = voices.find(v => v.lang.toLowerCase().includes('gu') || v.name.toLowerCase().includes('gujarati'));

      if (!selectedVoice) {
        // 2. Fallback to Hindi voice with Devanagari script transliteration (works on 100% of browsers!)
        selectedVoice = voices.find(v => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi'));
        if (selectedVoice) {
          textToSpeak = this.toDevanagari(text);
          langCode = selectedVoice.lang || 'hi-IN';
        }
      }

      if (!selectedVoice) {
        // 3. Fallback to any Indian accent voice
        selectedVoice = voices.find(v => v.lang.toLowerCase().includes('in'));
        if (selectedVoice) {
          textToSpeak = this.toDevanagari(text);
          langCode = selectedVoice.lang || 'hi-IN';
        }
      }
    } else {
      selectedVoice = voices.find(v => v.lang.toLowerCase().includes('en'));
      if (selectedVoice) {
        langCode = selectedVoice.lang || 'en-US';
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    utterance.lang = langCode;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.isSpeaking = false;
    };

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis speak failed:', e);
      this.isSpeaking = false;
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    return this.enabled;
  }
}

export const tts = new TextToSpeechManager();
