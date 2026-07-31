// Web Speech & Online TTS Engine with No-Referrer Policy for Gujarati
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
  toDevanagari(text) {
    return text.split('').map(c => {
      const code = c.charCodeAt(0);
      return (code >= 0x0A80 && code <= 0x0AFF) ? String.fromCharCode(code - 0x0180) : c;
    }).join('');
  }

  async speak(text, lang = 'gu') {
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
      try {
        const encoded = encodeURIComponent(cleanText);
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=gu&client=tw-ob`;
        
        // Fetch MP3 blob with referrerPolicy 'no-referrer' to bypass GitHub Pages 404 origin blocking
        const res = await fetch(ttsUrl, { referrerPolicy: 'no-referrer' });
        if (res.ok) {
          const blob = await res.blob();
          const blobUrl = URL.createObjectURL(blob);
          
          const audio = new Audio(blobUrl);
          this.audioPlayer = audio;

          audio.onended = () => {
            this.isSpeaking = false;
            URL.revokeObjectURL(blobUrl);
          };

          audio.onerror = () => {
            URL.revokeObjectURL(blobUrl);
            this.speakWebSpeech(cleanText, 'gu');
          };

          await audio.play();
          return;
        }
      } catch (err) {
        console.warn('Online Gujarati TTS fetch failed, using WebSpeech fallback:', err);
      }

      // WebSpeech Fallback
      this.speakWebSpeech(cleanText, 'gu');
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

    const voices = this.getAvailableVoices();
    
    let selectedVoice = null;
    let textToSpeak = text;
    let langCode = 'hi-IN';

    if (targetLang === 'gu') {
      selectedVoice = voices.find(v => 
        v.lang.toLowerCase().includes('gu') || 
        v.name.toLowerCase().includes('gujarati')
      );

      if (selectedVoice) {
        textToSpeak = text;
        langCode = selectedVoice.lang || 'gu-IN';
      } else {
        selectedVoice = voices.find(v => 
          v.lang.toLowerCase().includes('hi') || 
          v.name.toLowerCase().includes('hindi')
        );

        if (selectedVoice) {
          textToSpeak = this.toDevanagari(text);
          langCode = selectedVoice.lang || 'hi-IN';
        } else {
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
