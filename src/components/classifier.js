// Classification & Sorting Activity Controller (Page 14)
import { audioSynth } from '../audio.js';
import { tts } from '../tts.js';

export class ClassifierController {
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

    // Baskets Target Definition (By Color/Type)
    this.baskets = [
      { id: 'b_red', name: { gu: 'લાલ રંગ (Red)', en: 'Red Basket' }, color: '#ef4444', icon: '🧺🔴', items: [] },
      { id: 'b_yellow', name: { gu: 'પીળો રંગ (Yellow)', en: 'Yellow Basket' }, color: '#eab308', icon: '🧺🟡', items: [] },
      { id: 'b_blue', name: { gu: 'વાદળી રંગ (Blue)', en: 'Blue Basket' }, color: '#3b82f6', icon: '🧺🔵', items: [] },
      { id: 'b_green', name: { gu: 'લીલો રંગ (Green)', en: 'Green Basket' }, color: '#22c55e', icon: '🧺🟢', items: [] }
    ];

    // Source Items to be sorted
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
    // Render Pool Items
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

    // Render Baskets
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

    // Check if finished
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
