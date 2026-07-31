// Reliable Online & Offline Text-to-Speech Engine for Gujarati Math Game
class TextToSpeechManager {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.audioPlayer = null;
    this.enabled = true;
    this.isSpeaking = false;
    this.voices = [];

    if (this.synth) {
      this.refreshVoices();
      if (typeof this.synth.onvoiceschanged !== 'undefined') {
        this.synth.onvoiceschanged = () => this.refreshVoices();
      }
    }
  }

  refreshVoices() {
    if (this.synth && typeof this.synth.getVoices === 'function') {
      const list = this.synth.getVoices();
      if (list && list.length > 0) {
        this.voices = list;
      }
    }
  }

  unlock() {
    if (this.synth) {
      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (e) {}
      this.refreshVoices();
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
  toDevanagari(text) {
    return text.split('').map(c => {
      const code = c.charCodeAt(0);
      return (code >= 0x0A80 && code <= 0x0AFF) ? String.fromCharCode(code - 0x0180) : c;
    }).join('');
  }

  // Transliterate Gujarati to Romanized English phonetics for Windows English voices
  toRomanized(text) {
    const clean = text.replace(/\u0ACD/g, '');
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

    if (lang === 'gu') {
      // Stream natural Gujarati voice MP3 from Google TTS (unblocked by meta referrer no-referrer)
      const encoded = encodeURIComponent(cleanText);
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=gu&client=tw-ob`;

      const audio = new Audio(audioUrl);
      this.audioPlayer = audio;

      let fallbackTriggered = false;
      const doFallback = () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          this.audioPlayer = null;
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

    this.refreshVoices();
    const voices = this.voices;

    let selectedVoice = null;
    let textToSpeak = text;

    if (targetLang === 'gu') {
      selectedVoice = voices.find(v => v.lang.toLowerCase().includes('gu') || v.name.toLowerCase().includes('gujarati'));

      if (selectedVoice) {
        textToSpeak = text;
      } else {
        selectedVoice = voices.find(v => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi'));
        if (selectedVoice) {
          textToSpeak = this.toDevanagari(text);
        } else {
          selectedVoice = voices.find(v => v.lang.toLowerCase().includes('en')) || (voices.length > 0 ? voices[0] : null);
          textToSpeak = this.toRomanized(text);
        }
      }
    } else {
      selectedVoice = voices.find(v => v.lang.toLowerCase().includes('en')) || (voices.length > 0 ? voices[0] : null);
      textToSpeak = text;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = targetLang === 'gu' ? 'hi-IN' : 'en-US';
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
      this.synth.cancel();
      this.synth.resume();
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis speak error:', e);
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
