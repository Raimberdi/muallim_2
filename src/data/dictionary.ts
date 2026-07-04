import { DictWord } from '../types';

export const dictionaryData: DictWord[] = [
  // Food
  {
    id: "f1",
    word: "طَعَام",
    transcription: "Ta'am",
    category: "Food",
    translations: { en: "Food", ru: "Еда / Пища", ky: "Тамак", ar: "طعام" },
    exampleAr: "هَذَا الطَّعَامُ لَذِيذٌ جِدًّا",
    exampleTranscription: "Hadha at-ta'amu ladhidhun jiddan",
    exampleTranslations: {
      en: "This food is very delicious.",
      ru: "Эта еда очень вкусная.",
      ky: "Бул тамак абдан даамдуу.",
      ar: "هذا الطعام لذيذ جداً"
    }
  },
  {
    id: "f2",
    word: "خُبْز",
    transcription: "Khubz",
    category: "Food",
    translations: { en: "Bread", ru: "Хлеб", ky: "Нан", ar: "خبز" },
    exampleAr: "أَشْتَرِي الخُبْزَ كُلَّ صَبَاحٍ",
    exampleTranscription: "Ashtari al-khubza kulla sabahin",
    exampleTranslations: {
      en: "I buy bread every morning.",
      ru: "Я покупаю хлеб каждое утро.",
      ky: "Мен күн сайын эртең менен нан сатып алам.",
      ar: "أشتري الخبز كل صباح"
    }
  },
  {
    id: "f3",
    word: "تَمْر",
    transcription: "Tamr",
    category: "Food",
    translations: { en: "Dates (fruit)", ru: "Финики", ky: "Хурма", ar: "تمر" },
    exampleAr: "التَّمْرُ مُفِيدٌ لِلصِّحَّةِ",
    exampleTranscription: "At-tamru mufidun li-sihhati",
    exampleTranslations: {
      en: "Dates are good for health.",
      ru: "Финики полезны для здоровья.",
      ky: "Хурма ден соолукка пайдалуу.",
      ar: "التمر مفيد للصحة"
    }
  },

  // Business
  {
    id: "b1",
    word: "شَرِكَة",
    transcription: "Sharikah",
    category: "Business",
    translations: { en: "Company", ru: "Компания / Фирма", ky: "Компания / Ишкана", ar: "شركة" },
    exampleAr: "أَعْمَلُ فِي شَرِكَةٍ دُوَلِيَّةٍ",
    exampleTranscription: "A'malu fi sharikatin duwaliyyatin",
    exampleTranslations: {
      en: "I work in an international company.",
      ru: "Я работаю в международной компании.",
      ky: "Мен эл аралык компанияда иштейм.",
      ar: "أعمل في شركة دولية"
    }
  },
  {
    id: "b2",
    word: "عَقْد",
    transcription: "Aqd",
    category: "Business",
    translations: { en: "Contract", ru: "Контракт / Договор", ky: "Келишим", ar: "عقد" },
    exampleAr: "وَقَّعْنَا العَقْدَ اليَوْمَ",
    exampleTranscription: "Waqqa'na al-aqda al-yawma",
    exampleTranslations: {
      en: "We signed the contract today.",
      ru: "Мы подписали контракт сегодня.",
      ky: "Биз келишимге бүгүн кол койдук.",
      ar: "وقعنا العقد اليوم"
    }
  },
  {
    id: "b3",
    word: "رِبْح",
    transcription: "Ribh",
    category: "Business",
    translations: { en: "Profit", ru: "Прибыль", ky: "Пайда", ar: "ربح" },
    exampleAr: "حَقَّقَت الشَّرِكَةُ أَرْبَاحًا كَبِيرَةً",
    exampleTranscription: "Haqqaqat ash-sharikatu arbahan kabiratan",
    exampleTranslations: {
      en: "The company made big profits.",
      ru: "Компания получила большую прибыль.",
      ky: "Компания чоң пайда алды.",
      ar: "حققت الشركة أرباحاً كبيرة"
    }
  },

  // Travel
  {
    id: "t1",
    word: "مَطَار",
    transcription: "Matar",
    category: "Travel",
    translations: { en: "Airport", ru: "Аэропорт", ky: "Аэропорт", ar: "مطار" },
    exampleAr: "المَطَارُ بَعِيدٌ عَن الفُنْدُقِ",
    exampleTranscription: "Al-mataru ba'idun 'an al-funduqi",
    exampleTranslations: {
      en: "The airport is far from the hotel.",
      ru: "Аэропорт далеко от отеля.",
      ky: "Аэропорт мейманканадан алыс.",
      ar: "المطار بعيد عن الفندق"
    }
  },
  {
    id: "t2",
    word: "جَوَاز سَفَر",
    transcription: "Jawaz Safar",
    category: "Travel",
    translations: { en: "Passport", ru: "Загранпаспорт", ky: "Паспорт", ar: "جواز سفر" },
    exampleAr: "أَيْنَ جَوَازُ السَّفَرِ الخاصُّ بِكَ؟",
    exampleTranscription: "Ayna jawazu as-safari al-khassu bika?",
    exampleTranslations: {
      en: "Where is your passport?",
      ru: "Где твой загранпаспорт?",
      ky: "Паспортуңуз кайда?",
      ar: "أين جواز السفر الخاص بك؟"
    }
  },

  // Family
  {
    id: "fa1",
    word: "أُسْرَة",
    transcription: "Usrah",
    category: "Family",
    translations: { en: "Family", ru: "Семья", ky: "Үй-бүлө", ar: "أسرة" },
    exampleAr: "أُسْرَتِي تَعِيشُ فِي مَدِينَةِ بِشْكِيك",
    exampleTranscription: "Usrati ta'ishu fi madinati Bishkek",
    exampleTranslations: {
      en: "My family lives in Bishkek city.",
      ru: "Моя семья живет в Бишкеке.",
      ky: "Үй-бүлөм Бишкек шаарында жашайт.",
      ar: "أسرتي تعيش في مدينة بشكيك"
    }
  },
  {
    id: "fa2",
    word: "وَالِدَان",
    transcription: "Walidan",
    category: "Family",
    translations: { en: "Parents", ru: "Родители", ky: "Ата-эне", ar: "والدان" },
    exampleAr: "يَجِبُ أَنْ نَحْتَرِمَ الوَالِدَيْنِ",
    exampleTranscription: "Yajibu an nahtarima al-walidayni",
    exampleTranslations: {
      en: "We must respect our parents.",
      ru: "Мы должны уважать родителей.",
      ky: "Ата-энени сыйлашыбыз керек.",
      ar: "يجب أن نحترم الوالدين"
    }
  },

  // Cars
  {
    id: "c1",
    word: "مُحَرِّك",
    transcription: "Muharrik",
    category: "Cars",
    translations: { en: "Engine", ru: "Двигатель", ky: "Кыймылдаткыч (Мотор)", ar: "محرك" },
    exampleAr: "مُحَرِّكُ هَذِهِ السَّيَّارَةِ قَوِيٌّ جِدًّا",
    exampleTranscription: "Muharriku hadhihi as-sayyarati qawiyyun jiddan",
    exampleTranslations: {
      en: "The engine of this car is very powerful.",
      ru: "Двигатель этой машины очень мощный.",
      ky: "Бул унаанын мотору абдан күчтүү.",
      ar: "محرك هذه السيارة قوي جداً"
    }
  },
  {
    id: "c2",
    word: "عَجَلَة",
    transcription: "Ajalah",
    category: "Cars",
    translations: { en: "Wheel / Tire", ru: "Колесо / Шина", ky: "Дөңгөлөк", ar: "عجلة" },
    exampleAr: "يَجِبُ تَبْدِيلُ العَجَلَاتِ قَبْلَ الشِّتَاءِ",
    exampleTranscription: "Yajibu tabdilu al-ajalat qabla ash-shita'",
    exampleTranslations: {
      en: "The tires must be changed before winter.",
      ru: "Шины нужно поменять до наступления зимы.",
      ky: "Дөңгөлөктөрдү кыш алдында алмаштыруу керек.",
      ar: "يجب تبديل العجلات قبل الشتاء"
    }
  },

  // Oil & Gas
  {
    id: "o1",
    word: "نَفْط",
    transcription: "Naft",
    category: "Oil & Gas",
    translations: { en: "Oil (Petroleum)", ru: "Нефть", ky: "Мунай", ar: "نفط" },
    exampleAr: "أَسْعَارُ النَّفْطِ تَرْتَفِعُ فِي السُّوقِ",
    exampleTranscription: "As'aru an-nafti tartafi'u fi as-suqi",
    exampleTranslations: {
      en: "Oil prices are rising in the market.",
      ru: "Цены на нефть растут на рынке.",
      ky: "Рынокто мунайдын баасы көтөрүлүп жатат.",
      ar: "أسعار النفط ترتفع في السوق"
    }
  },
  {
    id: "o2",
    word: "غَاز طَبِيعِيّ",
    transcription: "Ghaz Tabi'i",
    category: "Oil & Gas",
    translations: { en: "Natural Gas", ru: "Природный газ", ky: "Жаратылыш газы", ar: "غاز طبيعي" },
    exampleAr: "نَسْتَخْرِجُ الغَازَ الطَّبِيعِيَّ مِنَ الأَرْضِ",
    exampleTranscription: "Nastakhriju al-ghaza at-tabi'iyya min al-ardi",
    exampleTranslations: {
      en: "We extract natural gas from the earth.",
      ru: "Мы добываем природный газ из земли.",
      ky: "Биз жерден жаратылыш газын өндүрөбүз.",
      ar: "نستخرج الغاز الطبيعي من الأرض"
    }
  },

  // Medicine
  {
    id: "m1",
    word: "مُسْتَشْفَى",
    transcription: "Mustashfa",
    category: "Medicine",
    translations: { en: "Hospital", ru: "Больница", ky: "Оорукана", ar: "مستشفى" },
    exampleAr: "أَذْهَبُ إِلَى المُسْتَشْفَى لِفَحْصٍ طِبِّيٍّ",
    exampleTranscription: "Adhhabu ila al-mustashfa li-fahsin tibbiyy",
    exampleTranslations: {
      en: "I go to the hospital for a medical check-up.",
      ru: "Я иду в больницу на медицинский осмотр.",
      ky: "Мен медициналык текшерүүдөн өтүү үчүн ооруканага барам.",
      ar: "أذهب إلى المستشفى لفحص طبي"
    }
  },
  {
    id: "m2",
    word: "دَوَاء",
    transcription: "Dawa'",
    category: "Medicine",
    translations: { en: "Medicine / Drug", ru: "Лекарство", ky: "Дары", ar: "دواء" },
    exampleAr: "خُذْ هَذَا الدَّوَاءَ ثَلَاثَ مَرَّاتٍ فِي اليَوْمِ",
    exampleTranscription: "Khudh hadha ad-dawa'a thalatha marratin fi al-yawm",
    exampleTranslations: {
      en: "Take this medicine three times a day.",
      ru: "Принимайте это лекарство три раза в день.",
      ky: "Бул дарыны күнүнө үч маал ичиңиз.",
      ar: "خذ هذا الدواء ثلاث مرات في اليوم"
    }
  },

  // Technology
  {
    id: "te1",
    word: "حَاسُوب",
    transcription: "Hasub",
    category: "Technology",
    translations: { en: "Computer", ru: "Компьютер", ky: "Компьютер", ar: "حاسوب" },
    exampleAr: "أَشْتَرِي حَاسُوبًا جَدِيدًا لِلبَرْمَجَةِ",
    exampleTranscription: "Ashtari hasuban jadidan lil-barmajati",
    exampleTranslations: {
      en: "I am buying a new computer for programming.",
      ru: "Я покупаю новый компьютер для программирования.",
      ky: "Программалоо үчүн жаңы компьютер сатып алам.",
      ar: "أشتري حاسوباً جديداً للبرمجة"
    }
  },
  {
    id: "te2",
    word: "ذَكَاء اِصْطِنَاعِيّ",
    transcription: "Dhaka' Istina'i",
    category: "Technology",
    translations: { en: "Artificial Intelligence", ru: "Искусственный интеллект", ky: "Жасалма интеллект", ar: "ذكاء اصطناعي" },
    exampleAr: "الذَّكَاءُ الاصْطِنَاعِيُّ يُغَيِّرُ العَالَمَ",
    exampleTranscription: "Adh-dhaka'u al-istina'iyyu yughayyiru al-alama",
    exampleTranslations: {
      en: "Artificial Intelligence is changing the world.",
      ru: "Искусственный интеллект меняет мир.",
      ky: "Жасалма интеллект дүйнөнү өзгөртүүдө.",
      ar: "الذكاء الاصطناعي يغير العالم"
    }
  },

  // Islamic Terminology
  {
    id: "i1",
    word: "صَلَاة",
    transcription: "Salah",
    category: "Islamic Terminology",
    translations: { en: "Prayer", ru: "Молитва (Намаз)", ky: "Намаз", ar: "صلاة" },
    exampleAr: "الصَّلَاةُ عِمَادُ الدِّينِ",
    exampleTranscription: "As-salatu 'imadu ad-dini",
    exampleTranslations: {
      en: "Prayer is the pillar of religion.",
      ru: "Молитва — столп религии.",
      ky: "Намаз — диндин түркүгү.",
      ar: "الصلاة عماد الدين"
    }
  },
  {
    id: "i2",
    word: "مَسْجِد",
    transcription: "Masjid",
    category: "Islamic Terminology",
    translations: { en: "Mosque", ru: "Мечеть", ky: "Мечит", ar: "مسجد" },
    exampleAr: "أَذْهَبُ إِلَى المَسْجِدِ لِأَدَاءِ صَلَاةِ الجُمُعَةِ",
    exampleTranscription: "Adhhabu ila al-masjidi li-ada'i salati al-jumu'ati",
    exampleTranslations: {
      en: "I go to the mosque to perform Friday prayer.",
      ru: "Я иду в мечеть для совершения пятничной молитвы.",
      ky: "Жума намазын окуу үчүн мечитке барам.",
      ar: "أذهب إلى المسجد لأداء صلاة الجمعة"
    }
  }
];
