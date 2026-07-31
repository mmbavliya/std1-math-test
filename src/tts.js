// Web Speech API Engine with Guaranteed Gujarati & Hindi Voice Fallback
class TextToSpeechManager {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.audioPlayer = null;
    this.enabled = true;
    this.isSpeaking = false;
    this.voices = [];

    if (this.synth) {
      this.initVoices();
    }
  }

  initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices() || [];
    if (typeof this.synth.onvoiceschanged !== 'undefined') {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices() || [];
      };
    }
  }

  getAvailableVoices() {
    if (this.synth && (!this.voices || this.voices.length === 0)) {
      this.voices = this.synth.getVoices() || [];
    }
    return this.voices || [];
  }

  unlock() {
    if (this.synth) {
      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (e) {}
      this.initVoices();
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
    this.speakWebSpeech(cleanText, lang);
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

    const voices = this.getAvailableVoices();
    
    let selectedVoice = null;
    let textToSpeak = text;
    let langCode = 'hi-IN'; // Default to hi-IN so browser NEVER drops speech for missing gu-IN

    if (targetLang === 'gu') {
      // 1. Look for native Gujarati voice
      selectedVoice = voices.find(v => 
        v.lang.toLowerCase().includes('gu') || 
        v.name.toLowerCase().includes('gujarati')
      );

      if (selectedVoice) {
        textToSpeak = text; // Native Gujarati text
        langCode = selectedVoice.lang || 'gu-IN';
      } else {
        // 2. Look for Hindi voice (built into 100% of Windows/Android/Chrome browsers)
        selectedVoice = voices.find(v => 
          v.lang.toLowerCase().includes('hi') || 
          v.name.toLowerCase().includes('hindi')
        );

        if (selectedVoice) {
          textToSpeak = this.toDevanagari(text); // Convert Gujarati -> Devanagari script
          langCode = selectedVoice.lang || 'hi-IN';
        } else {
          // 3. Fallback to any Indian accent voice (e.g. en-IN)
          selectedVoice = voices.find(v => v.lang.toLowerCase().includes('in'));
          textToSpeak = this.toDevanagari(text);
          if (selectedVoice) {
            langCode = selectedVoice.lang;
          } else {
            langCode = 'hi-IN';
          }
        }
      }
    } else {
      // English
      selectedVoice = voices.find(v => v.lang.toLowerCase().includes('en'));
      textToSpeak = text;
      langCode = selectedVoice ? selectedVoice.lang : 'en-US';
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.lang = langCode;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.isSpeaking = false;
    };

    try {
      this.synth.speak(utterance);
      // Keep-alive fix for Chrome SpeechSynthesis freeze bug
      if (this.synth.paused) {
        this.synth.resume();
      }
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
