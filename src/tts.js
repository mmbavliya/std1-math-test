// Universal Instant Web Speech Engine for Math Game
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
  toDevanagari(text) {
    return text.split('').map(c => {
      const code = c.charCodeAt(0);
      return (code >= 0x0A80 && code <= 0x0AFF) ? String.fromCharCode(code - 0x0180) : c;
    }).join('');
  }

  // Transliterate Gujarati to Romanized English phonetics for Windows SAPI English voices
  toRomanized(text) {
    const clean = text.replace(/\u0ACD/g, ''); // Strip virama
    const map = {
      'અ': 'a', 'આ': 'aa', 'ઇ': 'i', 'ઈ': 'ee', 'ઉ': 'u', 'ઊ': 'oo', 'એ': 'e', 'ઐ': 'ai', 'ઓ': 'o', 'ઔ': 'au', 'અં': 'an', 'અઃ': 'ah',
      'ક': 'k', 'ખ': 'kh', 'ગ': 'g', 'ઘ': 'gh',
      'ચ': 'ch', 'છ': 'chh', 'જ': 'j', 'ઝ': 'jh',
      'ટ': 't', 'ઠ': 'th', 'ડ': 'd', 'ઢ': 'dh', 'ણ': 'n',
      'ત': 't', 'થ': 'th', 'દ': 'd', 'ધ': 'dh', 'ન': 'n',
      'પ': 'p', 'ફ': 'f', 'બ': 'b', 'ભ': 'bh', 'મ': 'm',
      'ય': 'y', 'ર': 'r', 'લ': 'l', 'વ': 'v', 'શ': 'sh', 'ષ': 'sh', 'સ': 's', 'હ': 'h', 'ળ': 'l',
      'ા': 'a', 'િ': 'i', 'ી': 'i', 'ુ': 'u', 'ૂ': 'u', 'ે': 'e', 'ૈ': 'ai', 'ો': 'o', 'ૌ': 'au', 'ં': 'n', 'ઃ': 'h'
    };
    let result = '';
    for (let i = 0; i < clean.length; i++) {
      const char = clean[i];
      result += map[char] || char;
    }
    return result;
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
    let langCode = 'en-US';

    if (targetLang === 'gu') {
      // 1. Native Gujarati Voice
      selectedVoice = voices.find(v => 
        v.lang.toLowerCase().includes('gu') || 
        v.name.toLowerCase().includes('gujarati')
      );

      if (selectedVoice) {
        textToSpeak = text;
        langCode = selectedVoice.lang || 'gu-IN';
      } else {
        // 2. Native Hindi Voice with Devanagari text
        selectedVoice = voices.find(v => 
          v.lang.toLowerCase().includes('hi') || 
          v.name.toLowerCase().includes('hindi')
        );

        if (selectedVoice) {
          textToSpeak = this.toDevanagari(text);
          langCode = selectedVoice.lang || 'hi-IN';
        } else {
          // 3. Indian English / Any English Voice with Romanized Gujarati phonetics
          selectedVoice = voices.find(v => v.lang.toLowerCase().includes('in')) || 
                          voices.find(v => v.lang.toLowerCase().includes('en')) || 
                          (voices.length > 0 ? voices[0] : null);
          
          textToSpeak = this.toRomanized(text);
          langCode = selectedVoice ? selectedVoice.lang : 'en-US';
        }
      }
    } else {
      selectedVoice = voices.find(v => v.lang.toLowerCase().includes('en')) || (voices.length > 0 ? voices[0] : null);
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

    // Small delay after synth.cancel() for Chrome WebSpeech engine to reset
    setTimeout(() => {
      try {
        this.synth.speak(utterance);
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (e) {
        console.warn('SpeechSynthesis speak failed:', e);
        this.isSpeaking = false;
      }
    }, 50);
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    return this.enabled;
  }
}

export const tts = new TextToSpeechManager();
