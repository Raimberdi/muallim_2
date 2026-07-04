import { AlphabetLetter } from '../types';

export const alphabetData: AlphabetLetter[] = [
  {
    letter: "أ",
    name: { en: "Alif", ru: "Алиф", ky: "Алиф", ar: "أَلِف" },
    sound: "a / i / u",
    writingSteps: [
      "Draw a vertical line from top to bottom.",
      "Add a small 'hamza' on top: a semi-circle curving left, then a straight diagonal stroke back to the right."
    ],
    isolated: "أ",
    initial: "أ_",
    medial: "ـأ",
    final: "ـأ",
    exampleWord: "أَرْنَب",
    exampleWordAr: "أَرْنَب",
    exampleWordTranslation: { en: "Rabbit", ru: "Кролик", ky: "Коён", ar: "أرنب" },
    exampleWordTranscription: "Arnab",
    exampleSentenceAr: "الأَرْنَبُ يَأْكُلُ الجَزَر",
    exampleSentenceTranslation: {
      en: "The rabbit eats carrots.",
      ru: "Кролик ест морковь.",
      ky: "Коён сабиз жейт.",
      ar: "الأرنب يأكل الجزر"
    },
    exampleSentenceTranscription: "Al-arnabu ya'kulu al-jazar."
  },
  {
    letter: "ب",
    name: { en: "Baa", ru: "Ба", ky: "Ба", ar: "بَاء" },
    sound: "b",
    writingSteps: [
      "Draw a flat boat-like horizontal curve from right to left.",
      "Place one single dot directly underneath the center of the boat."
    ],
    isolated: "ب",
    initial: "بـ",
    medial: "ـبـ",
    final: "ـب",
    exampleWord: "بَيْت",
    exampleWordAr: "بَيْت",
    exampleWordTranslation: { en: "House", ru: "Дом", ky: "Үй", ar: "بيت" },
    exampleWordTranscription: "Bayt",
    exampleSentenceAr: "هَذَا بَيْتٌ جَمِيلٌ جِدًّا",
    exampleSentenceTranslation: {
      en: "This is a very beautiful house.",
      ru: "Это очень красивый дом.",
      ky: "Бул абдан кооз үй.",
      ar: "هذا بيت جميل جداً"
    },
    exampleSentenceTranscription: "Hadha baytun jamilun jidda."
  },
  {
    letter: "ت",
    name: { en: "Taa", ru: "Та", ky: "Та", ar: "تَاء" },
    sound: "t",
    writingSteps: [
      "Draw the same boat-like shape as Baa from right to left.",
      "Place two side-by-side dots inside the boat."
    ],
    isolated: "ت",
    initial: "تـ",
    medial: "ـتـ",
    final: "ـت",
    exampleWord: "تُفَّاح",
    exampleWordAr: "تُفَّاح",
    exampleWordTranslation: { en: "Apple", ru: "Яблоко", ky: "Алма", ar: "تفاح" },
    exampleWordTranscription: "Tuffah",
    exampleSentenceAr: "أَنَا أُحِبُّ أَكْلَ التُّفَّاح",
    exampleSentenceTranslation: {
      en: "I like to eat apples.",
      ru: "Я люблю есть яблоки.",
      ky: "Мен алма жегенди жакшы көрөм.",
      ar: "أنا أحب أكل التفاح"
    },
    exampleSentenceTranscription: "Ana uhibbu akla at-tuffah."
  },
  {
    letter: "ج",
    name: { en: "Jeem", ru: "Джим", ky: "Жим", ar: "جِيم" },
    sound: "j / g",
    writingSteps: [
      "Draw a small wave left-to-right at the top.",
      "Loop backward into a large semi-circle curving down and left.",
      "Place a single dot inside the belly of the semi-circle."
    ],
    isolated: "ج",
    initial: "جـ",
    medial: "ـجـ",
    final: "ـج",
    exampleWord: "جَمَل",
    exampleWordAr: "جَمَل",
    exampleWordTranslation: { en: "Camel", ru: "Верблюд", ky: "Төө", ar: "جمل" },
    exampleWordTranscription: "Jamal",
    exampleSentenceAr: "الجَمَلُ سَفِينَةُ الصَّحْرَاء",
    exampleSentenceTranslation: {
      en: "The camel is the ship of the desert.",
      ru: "Верблюд — корабль пустыни.",
      ky: "Төө — чөлдүн кемеси.",
      ar: "الجمل سفينة الصحراء"
    },
    exampleSentenceTranscription: "Al-jamalu safinatu as-sahra."
  },
  {
    letter: "د",
    name: { en: "Dal", ru: "Даль", ky: "Дал", ar: "دَال" },
    sound: "d",
    writingSteps: [
      "Draw a small diagonal curved stroke starting above the line downwards.",
      "Flatten the stroke to rest squarely along the baseline to the left."
    ],
    isolated: "د",
    initial: "د_",
    medial: "ـد",
    final: "ـد",
    exampleWord: "دَفْتَر",
    exampleWordAr: "دَفْتَر",
    exampleWordTranslation: { en: "Notebook", ru: "Тетрадь", ky: "Дептер", ar: "دفتر" },
    exampleWordTranscription: "Daftar",
    exampleSentenceAr: "أَكْتُبُ الدَّرْسَ فِي الدَّفْتَر",
    exampleSentenceTranslation: {
      en: "I write the lesson in the notebook.",
      ru: "Я пишу урок в тетрадь.",
      ky: "Мен сабакты дептерге жазам.",
      ar: "أكتب الدرس في الدفتر"
    },
    exampleSentenceTranscription: "Aktubu ad-darsa fi ad-daftar."
  },
  {
    letter: "ر",
    name: { en: "Raa", ru: "Ра", ky: "Ра", ar: "رَاء" },
    sound: "r (rolled)",
    writingSteps: [
      "Start slightly above the line, swoop down and curved below the line.",
      "Let the curve taper off smoothly to the left like a small slide."
    ],
    isolated: "ر",
    initial: "ر_",
    medial: "ـر",
    final: "ـر",
    exampleWord: "رُمَّان",
    exampleWordAr: "رُمَّان",
    exampleWordTranslation: { en: "Pomegranate", ru: "Гранат", ky: "Анар", ar: "رمان" },
    exampleWordTranscription: "Rumman",
    exampleSentenceAr: "الرُّمَّانُ فَاكِهَةٌ لَذِيذَةٌ جِدًّا",
    exampleSentenceTranslation: {
      en: "Pomegranate is a very delicious fruit.",
      ru: "Гранат — очень вкусный фрукт.",
      ky: "Анар — абдан даамдуу жемиш.",
      ar: "الرمان فاكهة لذيذة جداً"
    },
    exampleSentenceTranscription: "Ar-rummanu fakihatun ladhidhatun jidda."
  },
  {
    letter: "س",
    name: { en: "Seen", ru: "Син", ky: "Син", ar: "سِين" },
    sound: "s",
    writingSteps: [
      "Draw two small side-by-side cups (W shape) sitting on the baseline.",
      "From the right tip, pull down a large deep bowl curving deep below the line."
    ],
    isolated: "س",
    initial: "سـ",
    medial: "ـسـ",
    final: "ـس",
    exampleWord: "سَيَّارَة",
    exampleWordAr: "سَيَّارَة",
    exampleWordTranslation: { en: "Car", ru: "Машина", ky: "Унаа", ar: "سيارة" },
    exampleWordTranscription: "Sayyara",
    exampleSentenceAr: "السَّيَّارَةُ الخَضْرَاءُ سَرِيعَةٌ",
    exampleSentenceTranslation: {
      en: "The green car is fast.",
      ru: "Зеленая машина быстрая.",
      ky: "Жашыл унаа тез жүрөт.",
      ar: "السيارة الخضراء سريعة"
    },
    exampleSentenceTranscription: "As-sayyaratu al-khadra'u sari'ah."
  },
  {
    letter: "ع",
    name: { en: "Ayn", ru: "Айн", ky: "Айн", ar: "عَيْن" },
    sound: "throat-tightened 'a'",
    writingSteps: [
      "Draw a small semi-circle above the line (like a small C pointing right).",
      "Attach a larger semi-circle curving deep below the baseline."
    ],
    isolated: "ع",
    initial: "عـ",
    medial: "ـعـ",
    final: "ـع",
    exampleWord: "عَيْن",
    exampleWordAr: "عَيْن",
    exampleWordTranslation: { en: "Eye / Spring", ru: "Глаз / Источник", ky: "Көз / Булак", ar: "عين" },
    exampleWordTranscription: "Ayn",
    exampleSentenceAr: "العَيْنُ هِيَ مِفْتَاحُ النَّظَر",
    exampleSentenceTranslation: {
      en: "The eye is the key to sight.",
      ru: "Глаз — ключ к зрению.",
      ky: "Көз — көрүүнүн ачкычы.",
      ar: "العين هي مفتاح النظر"
    },
    exampleSentenceTranscription: "Al-aynu hiya miftahu an-nadhar."
  }
];
