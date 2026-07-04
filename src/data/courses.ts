import { CourseLevel } from '../types';

export const coursesData: CourseLevel[] = [
  {
    id: 'A1',
    title: { en: "A1: Absolute Beginner", ru: "A1: Начальный уровень", ky: "A1: Башталгыч деңгээл", ar: "A1: المبتدئ الأوّل" },
    description: {
      en: "Start your Arabic journey. Learn the letters, pronunciation, and basic daily expressions.",
      ru: "Начните свой путь. Освойте алфавит, базовую фонетику и простые бытовые выражения приветствия.",
      ky: "Саякатыңызды баштаңыз. Алфавитти, негизги тыбыштарды жана жөнөкөй саламдашуу сөздөрүн үйрөнүңүз.",
      ar: "ابدأ رحلتك اللغوية مع الحروف وأساسيات النطق والتعبيرات اليومية البسيطة للترحيب والتعارف."
    },
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
    lessons: [
      {
        id: "a1_l1",
        title: { en: "Arabic Greetings & Introduction", ru: "Приветствия и Знакомство", ky: "Саламдашуу жана Таанышуу", ar: "الترحيب والتعارف" },
        duration: "08:15",
        videoUrl: "https://www.youtube.com/embed/8o4w8_NlW20", // placeholder or educational embed
        subtitles: {
          en: ["Welcome to Muallim!", "Today we will learn common Arabic greetings.", "The most popular greeting is: As-salamu 'alaykum.", "It means 'peace be upon you'.", "To reply, we say: Wa 'alaykumu as-salam."],
          ru: ["Добро пожаловать в Muallim!", "Сегодня мы выучим основы арабского приветствия.", "Самое частое приветствие: Ас-саляму алейкум.", "Это означает 'мир вам'.", "В ответ мы говорим: Ва-алейкум ас-салям."],
          ky: ["Muallim платформасына кош келиңиз!", "Бүгүн биз негизги арабча саламдашууну үйрөнөбүз.", "Эң көп колдонулган саламдашуу: Ас-саляму алейкум.", "Бул 'сизге тынчтык болсун' дегенди билдирет.", "Жооп катары: Ва-алейкум ас-салям дейбиз."],
          ar: ["أهلاً بكم في منصة معلم!", "اليوم سنتعلم التعبيرات الأساسية للترحيب.", "التحية الأكثر شهرة هي: السلام عليكم.", "والتي تعني السلام والرحمة.", "وللرد نقول: وعليكم السلام."]
        },
        summary: {
          en: "Key phrases: As-salamu 'alaykum (Peace be upon you), Wa 'alaykumu as-salam (And upon you be peace), Ahlan wa sahlan (Welcome), Kaifa haluk? (How are you?).",
          ru: "Ключевые фразы: Ас-саляму алейкум (Мир вам), Ва-алейкум ас-салям (И вам мир), Ахлян ва сахлян (Добро пожаловать), Кайфа халюк? (Как дела?).",
          ky: "Негизги сөз айкаштары: Ас-саляму алейкум (Сизге тынчтык болсун), Ва-алейкум ас-салям (Сизге да тынчтык болсун), Ахлян ва сахлян (Кош келиңиз), Кайфа халюк? (Кандайсың?).",
          ar: "العبارات الرئيسية: السلام عليكم، وعليكم السلام، أهلاً وسهلاً، كيف حالك؟"
        },
        homeworkPrompt: {
          en: "Write down the Arabic greeting 'As-salamu 'alaykum' in your notebook 3 times. Practice reading it out loud.",
          ru: "Напишите фразу 'Ас-саляму алейкум' в своей тетради 3 раза. Потренируйтесь произносить её вслух.",
          ky: "Дептериңизге 'Ас-саляму алейкум' деген сөздү 3 жолу жазыңыз. Аны үн чыгарып айтып машыгыңыз.",
          ar: "اكتب عبارة 'السلام عليكم' في دفترك ثلاث مرات وتدرب على نطقها بوضوح."
        }
      },
      {
        id: "a1_l2",
        title: { en: "Personal Pronouns", ru: "Личные местоимения", ky: "Жактама ат атоочтор", ar: "الضمائر المنفصلة" },
        duration: "09:40",
        videoUrl: "https://www.youtube.com/embed/8o4w8_NlW20",
        subtitles: {
          en: ["Now let's learn personal pronouns.", "I in Arabic is 'Ana'.", "You (masculine) is 'Anta'.", "You (feminine) is 'Anti'."],
          ru: ["Теперь давайте разберем личные местоимения.", "Я по-арабски будет 'Ана'.", "Ты (мужской род) — 'Анта'.", "Ты (женский род) — 'Анти'."],
          ky: ["Эми жактама ат атоочторду үйрөнөлү.", "Мен арабча 'Ана' деп айтылат.", "Сен (эркек кишиге) — 'Анта'.", "Сен (аял кишиге) — 'Anti'."],
          ar: ["الآن سنتعلم الضمائر المنفصلة الأساسية.", "ضمير المتكلم 'أنا'.", "ضمير المخاطب للمذكر 'أنتَ'.", "ضمير المخاطب للمؤنث 'أنتِ'."]
        },
        summary: {
          en: "Personal pronouns: Ana (I), Anta (You m.), Anti (You f.), Huwa (He), Hiya (She).",
          ru: "Личные местоимения: Ана (Я), Анта (Ты муж.), Анти (Ты жен.), Хува (Он), Хийя (Она).",
          ky: "Жактама ат атоочтор: Ана (Мен), Анта (Сен - эркек), Анти (Сен - аял), Хува (Ал - эркек), Хийя (Ал - аял).",
          ar: "الضمائر المنفصلة: أنا، أنتَ، أنتِ، هو، هي."
        },
        homeworkPrompt: {
          en: "Translate the following sentences to Arabic: 'I am a student' (m.), 'You are Omar' (m.), 'She is Sarah'. Use our AI Teacher to check!",
          ru: "Переведите предложения на арабский язык: 'Я студент', 'Ты Омар', 'Она Сара'. Используйте нашего AI Teacher для проверки!",
          ky: "Бул сүйлөмдөрдү арабчага которуңуз: 'Мен студентмин', 'Сен Омарсың', 'Ал Сара'. Текшерүү үчүн AI Teacher кызматын колдонуңуз!",
          ar: "ترجم الجمل التالية إلى العربية: 'I am Omar' و'She is Sarah' واستعن بالمعلم الذكي للتحقق من إجابتك."
        }
      }
    ],
    quiz: [
      {
        id: "a1_q1",
        question: {
          en: "What is the standard response to 'As-salamu 'alaykum'?",
          ru: "Какой стандартный ответ на приветствие 'Ас-саляму алейкум'?",
          ky: "'Ас-саляму алейкум' деген саламдашууга кандай жооп берилет?",
          ar: "ما الرد الصحيح على 'السلام عليكم'؟"
        },
        options: {
          en: ["Ahlan bika", "Wa 'alaykumu as-salam", "Kaifa haluk", "Shukran"],
          ru: ["Ахлян бика", "Ва-алейкум ас-салям", "Кайфа халюк", "Шукран"],
          ky: ["Ахлян бика", "Ва-алейкум ас-салям", "Кайфа халюк", "Шукран"],
          ar: ["أهلاً بك", "وعليكم السلام", "كيف حالك", "شكراً"]
        },
        correctIndex: 1
      },
      {
        id: "a1_q2",
        question: {
          en: "Which pronoun represents 'You' (feminine)?",
          ru: "Какое местоимение означает 'Ты' при обращении к женщине?",
          ky: "Аял кишиге карата 'Сен' дегенди кайсы ат атооч билдирет?",
          ar: "ما هو الضمير المنفصل للمخاطب المؤنث المفرد؟"
        },
        options: {
          en: ["Anta", "Anti", "Huwa", "Ana"],
          ru: ["Анта", "Анти", "Хува", "Ана"],
          ky: ["Анта", "Анти", "Хува", "Ана"],
          ar: ["أنتَ", "أنتِ", "هو", "أنا"]
        },
        correctIndex: 1
      }
    ]
  },
  {
    id: 'A2',
    title: { en: "A2: Elementary", ru: "A2: Элементарный уровень", ky: "A2: Базалык деңгээл", ar: "A2: المبتدئ الثاني" },
    description: {
      en: "Form basic sentences, talk about family, hobbies, shopping, and tell the time.",
      ru: "Стройте простые предложения. Говорите о семье, хобби, покупках и времени.",
      ky: "Жөнөкөй сүйлөмдөрдү куруңуз. Үй-бүлө, кызыгуулар, соода кылуу жана убакыт жөнүндө сүйлөшүңүз.",
      ar: "تكوين الجمل البسيطة والتحدث عن العائلة والهوايات والتسوق والوقت اليومي بوضوح."
    },
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/50 dark:text-teal-400 dark:border-teal-800",
    lessons: [
      {
        id: "a2_l1",
        title: { en: "My Family Members", ru: "Моя семья", ky: "Үй-бүлөм", ar: "عائلتي" },
        duration: "10:30",
        videoUrl: "https://www.youtube.com/embed/8o4w8_NlW20",
        subtitles: {
          en: ["Welcome back!", "Let's learn family vocab.", "Father is 'Ab'.", "Mother is 'Umm'."],
          ru: ["С возвращением!", "Давайте выучим слова, связанные с семьей.", "Отец — 'Аб'.", "Мать — 'Умм'."],
          ky: ["Кайрадан кош келиңиз!", "Үй-бүлө мүчөлөрүнүн аталыштарын үйрөнөлү.", "Ата — 'Аб'.", "Эне — 'Умм'."],
          ar: ["مرحباً بكم من جديد!", "سنتعلم اليوم مفردات العائلة والأقارب.", "الأب هو 'أب'.", "الأم هي 'أم'."]
        },
        summary: {
          en: "Ab (Father), Umm (Mother), Akh (Brother), Ukht (Sister), Ibn (Son), Bint (Daughter).",
          ru: "Аб (Отец), Умм (Мать), Ах (Брат), Ухт (Сестра), Ибн (Сын), Бинт (Дочь).",
          ky: "Аб (Ата), Умм (Эне), Ах (Ага/Ини), Ухт (Эже/Сиңди), Ибн (Уул), Бинт (Кыз).",
          ar: "أب، أم، أخ، أخت، ابن، بنت."
        },
        homeworkPrompt: {
          en: "Describe your family in Arabic using at least 5 sentences and present it to our AI Teacher.",
          ru: "Опишите свою семью на арабском языке (минимум 5 предложений) и отправьте на проверку ИИ-преподавателю.",
          ky: "Араб тилинде өз үй-бүлөңүздү сүрөттөп кеминде 5 сүйлөм жазыңыз. Аны ИИ-мугалимге текшертиңиз.",
          ar: "اكتب خمس جمل تصف فيها أفراد عائلتك باللغة العربية واعرضها على معلمنا الذكي."
        }
      }
    ],
    quiz: [
      {
        id: "a2_q1",
        question: {
          en: "What is 'Mother' in Arabic?",
          ru: "Как по-арабски будет 'Мать'?",
          ky: "Араб тилинде 'Эне' эмне деп айтылат?",
          ar: "ما معنى كلمة 'Mother' باللغة العربية؟"
        },
        options: {
          en: ["Ab", "Umm", "Akh", "Ukht"],
          ru: ["Аб", "Умм", "Ах", "Ухт"],
          ky: ["Аб", "Умм", "Ах", "Ухт"],
          ar: ["أب", "أم", "أخ", "أخت"]
        },
        correctIndex: 1
      }
    ]
  },
  {
    id: 'B1',
    title: { en: "B1: Intermediate", ru: "B1: Средний уровень", ky: "B1: Орто деңгээл", ar: "B1: المتوسط الأول" },
    description: {
      en: "Read simple texts, understand grammar tenses, participate in daily dialogues.",
      ru: "Читайте несложные тексты, освойте времена глаголов и ведите беседу на общие темы.",
      ky: "Жөнөкөй тексттерди окуңуз, этиш чактарын өздөштүрүңүз жана күнүмдүк маселелерде сүйлөшө билиңиз.",
      ar: "قراءة النصوص المتوسطة وفهم تصريف الأفعال والمشاركة الفعالة في الحوارات اليومية."
    },
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
    lessons: [],
    quiz: []
  },
  {
    id: 'B2',
    title: { en: "B2: Upper Intermediate", ru: "B2: Выше среднего", ky: "B2: Ортодон жогору деңгээл", ar: "B2: المتوسط الثاني" },
    description: {
      en: "Engage in discussions, read news reports, express opinions on various issues.",
      ru: "Свободно выражайте мнение, читайте прессу и ведите дискуссии.",
      ky: "Ой-пикириңизди эркин билдириңиз, жаңылыктарды окуңуз жана талкууларга катышыңыз.",
      ar: "المشاركة في النقاشات وقراءة الأخبار والتعبير عن الآراء الشخصية في مختلف القضايا الاجتماعية والعملية."
    },
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800",
    lessons: [],
    quiz: []
  },
  {
    id: 'C1',
    title: { en: "C1: Advanced", ru: "C1: Продвинутый уровень", ky: "C1: Жогорку деңгээл", ar: "C1: المتقدم الأول" },
    description: {
      en: "Understand long complex articles, speak fluently on specialized professional themes.",
      ru: "Понимайте сложные узкоспециализированные тексты, свободно говорите на любые темы.",
      ky: "Калтырбай узун жана татаал макалаларды түшүнүңүз, кесиптик темаларда эркин сүйлөшүңүз.",
      ar: "فهم المقالات الطويلة والمعقدة، والتحدث بطلاقة تامة في المواضيع التخصصية والمهنية."
    },
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800",
    lessons: [],
    quiz: []
  },
  {
    id: 'C2',
    title: { en: "C2: Master / Fluent", ru: "C2: Владение в совершенстве", ky: "C2: Эркин сүйлөө (Эң жогорку)", ar: "C2: الإتقان الكامل" },
    description: {
      en: "Complete mastery of the Arabic language, equivalent to native professional speakers.",
      ru: "Совершенное владение арабским языком, аналогичное уровню носителя языка.",
      ky: "Араб тилин эне тилиңиздей кемчиликсиз өздөштүрүп, илимий жана кесиптик чөйрөдө колдонуңуз.",
      ar: "الإتقان التام الخالي من الثغرات، ومحاكاة مستوى المتحدث الأصلي بطلاقة فائقة."
    },
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
    lessons: [],
    quiz: []
  }
];
