import { Dialogue } from '../types';

export const dialoguesData: Dialogue[] = [
  {
    id: "d_airport",
    title: { en: "At the Airport", ru: "В аэропорту", ky: "Аэропортто", ar: "في المطار" },
    category: "Airport",
    arabicTitle: "فِي المَطَارِ",
    icon: "Plane",
    lines: [
      {
        speaker: "Officer",
        speakerAr: "المُوَظَّف",
        textAr: "مَرْحَبًا، هَاتِ جَوَازَ سَفَرِكَ مِنْ فَضْلِكَ.",
        transcription: "Marhaban, hati jawaza safarika min fadlik.",
        translations: {
          en: "Hello, please give me your passport.",
          ru: "Здравствуйте, дайте ваш паспорт, пожалуйста.",
          ky: "Саламатсызбы, паспортуңузду бериңизчи.",
          ar: "مرحبا، هات جواز سفرك من فضلك."
        }
      },
      {
        speaker: "Passenger",
        speakerAr: "المُسَافِر",
        textAr: "تَفَضَّلْ، هَذَا هُوَ جَوَازُ سَفَرِي.",
        transcription: "Tafaddal, hadha huwa jawazu safari.",
        translations: {
          en: "Here you go, this is my passport.",
          ru: "Пожалуйста, вот мой паспорт.",
          ky: "Мынакей, бул менин паспортум.",
          ar: "تفضل، هذا هو جواز سفري."
        }
      },
      {
        speaker: "Officer",
        speakerAr: "المُوَظَّف",
        textAr: "مَا هِيَ سَبَبُ زِيَارَتِكَ لِدُبَيّ؟",
        transcription: "Ma hiya sababu ziyaratika li-Dubayy?",
        translations: {
          en: "What is the reason for your visit to Dubai?",
          ru: "Какова цель вашего визита в Дубай?",
          ky: "Дубайга келүүңүздүн максаты эмне?",
          ar: "ما هي سبب زيارتك لدبي؟"
        }
      },
      {
        speaker: "Passenger",
        speakerAr: "المُسَافِر",
        textAr: "أَنَا قَادِمٌ لِلسِّيَاحَةِ وَدِرَاسَةِ اللُّغَةِ.",
        transcription: "Ana qadimun li-siyahati wa-dirasati al-lughati.",
        translations: {
          en: "I am coming for tourism and language study.",
          ru: "Я приехал ради туризма и изучения языка.",
          ky: "Мен саякаттоо жана тил үйрөнүү үчүн келдим.",
          ar: "أنا قادم للسياحة ودراسة اللغة."
        }
      }
    ]
  },
  {
    id: "d_hotel",
    title: { en: "At the Hotel", ru: "В гостинице", ky: "Мейманканада", ar: "في الفندق" },
    category: "Hotel",
    arabicTitle: "فِي الفُنْدُقِ",
    icon: "Hotel",
    lines: [
      {
        speaker: "Receptionist",
        speakerAr: "مُوَظَّفُ الاسْتِقْبَال",
        textAr: "أَهْلًا بِكَ فِي فُنْدُقِ المَعَالِي. هَلْ لَدَيْكَ حَجْزٌ؟",
        transcription: "Ahlan bika fi funduqi al-Ma'ali. Hal ladayka hajz?",
        translations: {
          en: "Welcome to Al-Ma'ali Hotel. Do you have a reservation?",
          ru: "Добро пожаловать в отель Аль-Маали. У вас есть бронь?",
          ky: "Аль-Маали мейманканасына кош келиңиз. Бронуңуз барбы?",
          ar: "أهلاً بك في فندق المعالي. هل لديك حجز؟"
        }
      },
      {
        speaker: "Guest",
        speakerAr: "الضَّيْف",
        textAr: "نَعَمْ، حَجَزْتُ غُرْفَةً مُفْرَدَةً بِاسْمِ عُمَرَ.",
        transcription: "Na'am, hajaztu ghurfatan mufradatan bi-ismi 'Umar.",
        translations: {
          en: "Yes, I booked a single room under the name Omar.",
          ru: "Да, я забронировал одноместный номер на имя Омар.",
          ky: "Ооба, мен Омар деген атка бир кишилик бөлмө ээлеп койгом.",
          ar: "نعم، حجزت غرفة مفردة باسم عمر."
        }
      }
    ]
  },
  {
    id: "d_restaurant",
    title: { en: "At the Restaurant", ru: "В ресторане", ky: "Ресторанда", ar: "في المطعم" },
    category: "Restaurant",
    arabicTitle: "فِي المَطْعَمِ",
    icon: "Utensils",
    lines: [
      {
        speaker: "Waiter",
        speakerAr: "النَّادِل",
        textAr: "أَهْلًا وَسَهْلًا! مَاذَا تُحِبُّ أَنْ تَأْكُلَ اليَوْمَ؟",
        transcription: "Ahlan wa sahlan! Madha tuhibbu an takula al-yawma?",
        translations: {
          en: "Welcome! What would you like to eat today?",
          ru: "Добро пожаловать! Что вы желаете поесть сегодня?",
          ky: "Кош келиңиз! Бүгүн эмне жегиңиз келет?",
          ar: "أهلاً وسهلاً! ماذا تحب أن تأكل اليوم؟"
        }
      },
      {
        speaker: "Customer",
        speakerAr: "الزَّبُون",
        textAr: "أُرِيدُ كَبْسَةَ لَحْمٍ وَسَلَطَةً خَضْرَاءَ مِنْ فَضْلِكَ.",
        transcription: "Uridu kabsata lahmin wa-salatatan khadra'a min fadlik.",
        translations: {
          en: "I would like meat kabsa and a green salad, please.",
          ru: "Я бы хотел мясную кабсу и зеленый салат, пожалуйста.",
          ky: "Мага этүү кабса жана жашыл салат бериңизчи, сураныч.",
          ar: "أريد كبسة لحم وسلطة خضراء من فضلك."
        }
      }
    ]
  },
  {
    id: "d_mosque",
    title: { en: "At the Mosque", ru: "В мечети", ky: "Мечитте", ar: "في المسجد" },
    category: "Mosque",
    arabicTitle: "فِي المَسْجِدِ",
    icon: "Compass",
    lines: [
      {
        speaker: "Local student",
        speakerAr: "المُصَلِّي",
        textAr: "السَّلَامُ عَلَيْكُمْ، أَيْنَ هُوَ مَكَانُ الوُضُوءِ؟",
        transcription: "As-salamu 'alaykum, ayna huwa makanu al-wudu'?",
        translations: {
          en: "Peace be upon you, where is the place for ablution?",
          ru: "Мир вам, где находится место для омовения?",
          ky: "Ассалому алейкум, даараткана кайда?",
          ar: "السلام عليكم، أين هو مكان الوضوء؟"
        }
      },
      {
        speaker: "Resident",
        speakerAr: "الـمُجِيب",
        textAr: "وَعَلَيْكُمُ السَّلَامُ، مَكَانُ الوُضُوءِ بِجَانِبِ المَدْخَلِ الأَيْسَرِ.",
        transcription: "Wa 'alaykumu as-salam, makanu al-wudu' bi-janibi al-madkhali al-aysari.",
        translations: {
          en: "And upon you be peace, the ablution area is next to the left entrance.",
          ru: "И вам мир, место для омовения находится рядом с левым входом.",
          ky: "Ва алейкум ассалом, даарат алуучу жай сол тараптагы эшиктин жанында.",
          ar: "وعليكم السلام، مكان الوضوء بجانب المدخل الأيسر."
        }
      }
    ]
  },
  {
    id: "d_negotiations",
    title: { en: "Business Negotiations", ru: "На переговорах", ky: "Сүйлөшүүлөрдө", ar: "في المفاوضات" },
    category: "Negotiations",
    arabicTitle: "فِي الـمُفَاوَضَاتِ",
    icon: "Briefcase",
    lines: [
      {
        speaker: "Director",
        speakerAr: "المُدِير",
        textAr: "نَحْنُ نَهْتَمُّ بِتَوْسِيعِ التَّعَاوُنِ الاسْتِثْمَارِيِّ مَعَ شَرِكَتِكُمْ.",
        transcription: "Nahnu nahtammu bi-tawsi'i at-ta'awuni al-istithmariyyi ma'a sharikatikum.",
        translations: {
          en: "We are interested in expanding investment cooperation with your company.",
          ru: "Мы заинтересованы в расширении инвестиционного сотрудничества с вашей компанией.",
          ky: "Биз сиздин компанияңыз менен инвестициялык кызматташтыкты кеңейтүүгө кызыкдарбыз.",
          ar: "نحن نهتم بتوسيع التعاون الاستثماري مع شركتكم."
        }
      },
      {
        speaker: "Partner",
        speakerAr: "الشَّرِيك",
        textAr: "هَذَا مُمْتَازٌ! نَحْنُ مُسْتَعِدُّونَ لِتَوْقِيعِ مُذَكَّرَةِ التَّفَاهُمِ.",
        transcription: "Hadha mumtaz! Nahnu musta'idduna li-tawqi'i mudhakkarati at-tafahumi.",
        translations: {
          en: "That's excellent! We are ready to sign a memorandum of understanding.",
          ru: "Это отлично! Мы готовы подписать меморандум о взаимопонимании.",
          ky: "Бул абдан жакшы! Биз өз ара түшүнүшүү жөнүндө меморандумга кол коюуга даярбыз.",
          ar: "هذا ممتاز! نحن مستعدون لتوقيع مذكرة التفاهم."
        }
      }
    ]
  }
];
