// Questions Data for Standard 1 Math Chapter 1: "વાંદરાં-ટોળી"

export const QUESTIONS_DATA = [
  // -------------------------------------------------------------
  // Question 1: અંદર - બહાર (Inside - Outside)
  // -------------------------------------------------------------
  {
    id: 'q1',
    topicId: 'inside_outside',
    topicName: { gu: 'અંદર - બહાર', en: 'Inside - Outside' },
    title: {
      gu: 'ટોપલીની અંદર (Inside) કયું ફળ છે તે બતાવો?',
      en: 'Which fruit is INSIDE the basket?'
    },
    mascotText: {
      gu: 'ચીંકુ ભૂખ્યો થયો છે! ટોપલીની અંદર કયું ફળ છે?',
      en: 'Chinku is hungry! Which fruit is INSIDE the basket?'
    },
    sceneType: 'basket_fruits',
    options: [
      { id: 'opt1', label: { gu: 'કેરી (ઝાડ પર બહાર)', en: 'Mango (Outside)' }, icon: '🥭', correct: false, reason: { gu: 'કેરી બહાર ઝાડ પર છે!', en: 'Mango is outside!' } },
      { id: 'opt2', label: { gu: 'કેળું (ટોપલીની અંદર)', en: 'Banana (Inside Basket)' }, icon: '🍌', correct: true, reason: { gu: 'શાબ્બાશ! કેળું ટોપલીની અંદર છે!', en: 'Great! Banana is inside the basket!' } },
      { id: 'opt3', label: { gu: 'સફરજન (જમીન પર બહાર)', en: 'Apple (Outside on ground)' }, icon: '🍎', correct: false, reason: { gu: 'સફરજન બહાર જમીન પર છે!', en: 'Apple is outside on the ground!' } }
    ]
  },

  // -------------------------------------------------------------
  // Question 2: ઉપર - નીચે (Above - Below / Top - Bottom)
  // -------------------------------------------------------------
  {
    id: 'q2',
    topicId: 'above_below',
    topicName: { gu: 'ઉપર - નીચે', en: 'Above - Below' },
    title: {
      gu: 'ઝાડની ઉપર (Top / Above) કયું પ્રાણી બેઠું છે?',
      en: 'Which animal is sitting ON TOP OF the tree?'
    },
    mascotText: {
      gu: 'જુઓ તો ખરા, ઝાડની સાવ ઉપર કોણ બેઠું છે?',
      en: 'Look carefully, who is sitting on top of the tree?'
    },
    sceneType: 'tree_animals',
    options: [
      { id: 'opt1', label: { gu: 'વાંદરો (ઝાડની ઉપર)', en: 'Monkey (On top of tree)' }, icon: '🐒', correct: true, reason: { gu: 'સરસ! વાંદરો ઝાડની ઉપર બેઠો છે!', en: 'Awesome! Monkey is on top of the tree!' } },
      { id: 'opt2', label: { gu: 'કૂતરો (ઝાડની નીચે)', en: 'Dog (Below the tree)' }, icon: '🐶', correct: false, reason: { gu: 'કૂતરો ઝાડની નીચે જમીન પર છે!', en: 'Dog is below the tree on the ground!' } },
      { id: 'opt3', label: { gu: 'સસલું (ઝાડની નીચે)', en: 'Rabbit (Below the tree)' }, icon: '🐰', correct: false, reason: { gu: 'સસલું નીચે છે!', en: 'Rabbit is below!' } }
    ]
  },

  // -------------------------------------------------------------
  // Question 3: સૌથી ઉપર - સૌથી નીચે (Topmost - Bottommost)
  // -------------------------------------------------------------
  {
    id: 'q3',
    topicId: 'topmost_bottommost',
    topicName: { gu: 'સૌથી ઉપર - સૌથી નીચે', en: 'Topmost - Bottommost' },
    title: {
      gu: 'માટલાની હારમાં સૌથી નીચે (Bottommost) કયું માટલું છે?',
      en: 'In the stack of pots, which pot is at the VERY BOTTOM?'
    },
    mascotText: {
      gu: 'એક પર એક માટલાં મૂક્યા છે! સૌથી નીચેનું માટલું શોધો!',
      en: 'Pots are stacked up! Find the pot at the bottommost position!'
    },
    sceneType: 'stacked_pots',
    options: [
      { id: 'opt1', label: { gu: 'પીળું માટલું (સૌથી ઉપર)', en: 'Yellow Pot (Topmost)' }, icon: '🟡🏺', correct: false, reason: { gu: 'આ માટલું તો સૌથી ઉપર છે!', en: 'This pot is at the top!' } },
      { id: 'opt2', label: { gu: 'વાદળી માટલું (વચ્ચે)', en: 'Blue Pot (Middle)' }, icon: '🔵🏺', correct: false, reason: { gu: 'આ માટલું તો વચ્ચે છે!', en: 'This pot is in the middle!' } },
      { id: 'opt3', label: { gu: 'લાલ માટલું (સૌથી નીચે)', en: 'Red Pot (Bottommost)' }, icon: '🔴🏺', correct: true, reason: { gu: 'અરે વાહ! લાલ માટલું સૌથી નીચે છે!', en: 'Bravo! Red pot is at the very bottom!' } }
    ]
  },

  // -------------------------------------------------------------
  // Question 4: નજીક - દૂર (Near - Far)
  // -------------------------------------------------------------
  {
    id: 'q4',
    topicId: 'near_far',
    topicName: { gu: 'નજીક - દૂર', en: 'Near - Far' },
    title: {
      gu: 'સૂર્યથી સૌથી દૂર (Farthest) કયું પક્ષી ઊડી રહ્યું છે?',
      en: 'Which bird is flying FARTHEST from the sun?'
    },
    mascotText: {
      gu: 'આકાશમાં સૂર્ય દાદા તપે છે! સૂર્યથી સૌથી દૂર પક્ષી શોધો!',
      en: 'Sun is shining in sky! Find the bird farthest from sun!'
    },
    sceneType: 'birds_sun',
    options: [
      { id: 'opt1', label: { gu: 'પીળું પક્ષી (સૂર્યની સૌથી નજીક)', en: 'Yellow Bird (Nearest to Sun)' }, icon: '🐤', correct: false, reason: { gu: 'પીળું પક્ષી સૂર્યની ખૂબ નજીક છે!', en: 'Yellow bird is very near the sun!' } },
      { id: 'opt2', label: { gu: 'સફેદ પક્ષી (સૂર્યથી સૌથી દૂર)', en: 'White Bird (Farthest from Sun)' }, icon: '🕊️', correct: true, reason: { gu: 'સાચું! સફેદ પક્ષી સૂર્યથી સૌથી દૂર છે!', en: 'Correct! White bird is farthest from the sun!' } }
    ]
  },

  // -------------------------------------------------------------
  // Question 5: આગળ - પાછળ (In front of - Behind)
  // -------------------------------------------------------------
  {
    id: 'q5',
    topicId: 'in_front_behind',
    topicName: { gu: 'આગળ - પાછળ', en: 'In front - Behind' },
    title: {
      gu: 'દોડની રમતમાં સૌથી આગળ (In Front / Ahead) કઈ છોકરી છે?',
      en: 'In the race, which child is IN FRONT / AHEAD?'
    },
    mascotText: {
      gu: 'બાળકો દોડી રહ્યા છે! સૌથી આગળ કોણ દોડે છે?',
      en: 'Children are running! Who is running in front?'
    },
    sceneType: 'kids_running',
    options: [
      { id: 'opt1', label: { gu: 'ગુલાબી ફ્રોકવાળી આરાધ્યા (આગળ)', en: 'Girl in Pink Dress (Ahead)' }, icon: '👧', correct: true, reason: { gu: 'વાહ! આરાધ્યા સૌથી આગળ દોડી રહી છે!', en: 'Awesome! She is running in front!' } },
      { id: 'opt2', label: { gu: 'વાદળી ટી-શર્ટવાળો આરવ (પાછળ)', en: 'Boy in Blue Shirt (Behind)' }, icon: '👦', correct: false, reason: { gu: 'આરવ પાછળ રહી ગયો છે!', en: 'He is behind in the race!' } }
    ]
  },

  // -------------------------------------------------------------
  // Question 6: સૌથી આગળ - સૌથી પાછળ (Frontmost - Rearmost)
  // -------------------------------------------------------------
  {
    id: 'q6',
    topicId: 'frontmost_rearmost',
    topicName: { gu: 'સૌથી આગળ - સૌથી પાછળ', en: 'Frontmost - Rearmost' },
    title: {
      gu: 'પ્રાણીઓની બર્થડે ટ્રેનમાં સૌથી આગળ (Frontmost) કોણ છે?',
      en: 'In the animal train, who is at the VERY FRONT (Engine driver)?'
    },
    mascotText: {
      gu: 'વાંદરાના બર્થડે પાર્ટીમાં પ્રાણીઓની ટ્રેન ચાલી! સૌથી આગળ એન્જિન પાસે કોણ છે?',
      en: 'Animal train is going to monkey’s birthday! Who is at the front near engine?'
    },
    sceneType: 'animal_train',
    options: [
      { id: 'opt1', label: { gu: 'હાથીભાઈ (સૌથી આગળ ડ્રાઇવર)', en: 'Elephant (At the very front)' }, icon: '🐘', correct: true, reason: { gu: 'શાબ્બાશ! હાથીભાઈ એન્જિનમાં સૌથી આગળ છે!', en: 'Superb! Elephant is at the very front!' } },
      { id: 'opt2', label: { gu: 'ઘેટું (વચ્ચેના ડબ્બામાં)', en: 'Sheep (Middle Coach)' }, icon: '🐑', correct: false, reason: { gu: 'ઘેટું વચ્ચે છે!', en: 'Sheep is in the middle coach!' } },
      { id: 'opt3', label: { gu: 'સસલું (સૌથી પાછળના ડબ્બામાં)', en: 'Rabbit (At the very rear)' }, icon: '🐰', correct: false, reason: { gu: 'સસલું તો સૌથી પાછળના ડબ્બામાં છે!', en: 'Rabbit is at the very rear coach!' } }
    ]
  },

  // -------------------------------------------------------------
  // Question 7: વાંદરાં-ટોળી વાર્તા મસ્તી (Story Question - Page 3)
  // -------------------------------------------------------------
  {
    id: 'q7',
    topicId: 'monkey_story',
    topicName: { gu: 'ચિત્રવાર્તા અને ગણતરી', en: 'Picture Story & Counting' },
    title: {
      gu: 'વાંદરાંઓ તળાવમાં ચમકતી કઈ વસ્તુ પકડવા એકબીજાની પૂંછડી પકડી લટક્યા?',
      en: 'What shining object were monkeys trying to catch in the pond?'
    },
    mascotText: {
      gu: 'વાંદરાં-ટોળીની વાર્તા યાદ છે ને? તળાવમાં ચમકતી કઈ વસ્તુ જોઈ?',
      en: 'Remember the story of monkeys? What shone in the pond water?'
    },
    sceneType: 'moon_pond',
    options: [
      { id: 'opt1', label: { gu: 'ચંદ્રનું પ્રતિબિંબ (ચાંદો / Moon)', en: 'Reflection of Moon' }, icon: '🌙', correct: true, reason: { gu: 'અરે વાહ! વાંદરાઓએ પાણીમાં ચાંદાનું પ્રતિબિંબ જોયું હતું!', en: 'Bravo! They saw the moon’s reflection in water!' } },
      { id: 'opt2', label: { gu: 'સોનાની ચાંદીની થાળી', en: 'Silver Plate' }, icon: '🍽️', correct: false, reason: { gu: 'ના રે ના! એ થાળી નહોતી!', en: 'No, it was not a plate!' } },
      { id: 'opt3', label: { gu: 'મોટો લાલ દડો', en: 'Big Red Ball' }, icon: '⚽', correct: false, reason: { gu: 'ના! એ દડો પણ નહોતો!', en: 'No, it was not a ball!' } }
    ]
  }
];
