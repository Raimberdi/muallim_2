import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TranslationSet } from '../types';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Type, Settings, Sparkles, 
  HelpCircle, CheckCircle, Award, Film, Bot, User, ArrowRight, BookOpen, 
  ChevronRight, RefreshCw, AlertCircle, Check, PlayCircle, Zap
} from 'lucide-react';

interface AIVideoSectionProps {
  currentLang: Language;
  t: TranslationSet;
  addCoin: (amount: number) => void;
  addXP: (amount: number) => void;
  triggerAchievement: (id: string) => void;
}

interface VideoLesson {
  id: string;
  title: string;
  host: string;
  avatarType: 'male' | 'female';
  subtitles: {
    start: number;
    end: number;
    text: string;
    translation: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
}

export default function AIVideoSection({ currentLang, t, addCoin, addXP, triggerAchievement }: AIVideoSectionProps) {
  // Hardcoded default interactive lessons
  const defaultLessons: VideoLesson[] = [
    {
      id: "v1",
      title: currentLang === 'ru' ? "Произношение глубоких горловых звуков" : currentLang === 'ky' ? "Терең тамак дабыштарын айтуу" : "Pronunciation of Throat Letters",
      host: "Ustadh Omar",
      avatarType: "male",
      subtitles: [
        { start: 0, end: 5, text: "السَّلَامُ عَلَيْكُمْ! الْيَوْمَ سَنَتَعَلَّمُ الْأَصْوَاتَ الْحَلْقِيَّةَ ع، ح.", translation: currentLang === 'ru' ? "Мир вам! Сегодня мы изучим горловые звуки Айн (ع) и Ха (ح)." : "Ассалому алейкум! Бүгүн биз тамак дабыштары Айн (ع) жана Ха (ح) тамгаларын үйрөнөбүз." },
        { start: 5, end: 10, text: "هَذِهِ الْحُرُوفُ تَخْرُجُ مِنْ وَسَطِ الْحَلْقِ. جَرِّبْ عَيْن!", translation: currentLang === 'ru' ? "Эти буквы выходят из середины горла. Попробуйте сказать: Айн!" : "Бул тамгалар тамактын ортосунан чыгат. Айтканга аракет кылыңыз: Айн!" },
        { start: 10, end: 15, text: "الْآنَ جَرِّبْ حَاء! هُوَ صَوْتٌ خَارِجٌ مَعَ النَّفَسِ.", translation: currentLang === 'ru' ? "А теперь попробуйте Ха! Это чистый выдыхаемый звук." : "Эми Ха деп көрүңүз! Бул дем менен кошо чыгуучу таза дабыш." },
        { start: 15, end: 20, text: "مُمْتَازٌ جِدًّا! اسْتَمِرَّ فِي التَّدْرِيبِ، وَهَيَّا إِلَى الِاخْتِبَارِ!", translation: currentLang === 'ru' ? "Отлично! Продолжайте тренироваться, а теперь перейдем к тесту!" : "Абдан сонун! Көнүгүүнү улантыңыз, эми тестке өтөлү!" }
      ],
      quiz: {
        question: currentLang === 'ru' ? "Из какой части горла произносится буква Айн (ع)?" : "Айн (ع) тамгасы тамактын кайсы жеринен чыгат?",
        options: currentLang === 'ru' 
          ? ["Из глубины горла", "Из середины горла", "У самого нёба", "Губами"]
          : ["Тамактын тереңинен", "Тамактын ортосунан", "Тилдин учунан", "Эриндерден"],
        answer: currentLang === 'ru' ? "Из середины горла" : "Тамактын ортосунан",
        explanation: currentLang === 'ru' 
          ? "Буква Айн (ع) является средне-гортанной согласной и произносится путем сужения среднего отдела глотки." 
          : "Айн (ع) тамгасы ортоңку тамак дабышы болуп саналат жана тамактын ортосу кысылуу аркылуу айтылат."
      }
    },
    {
      id: "v2",
      title: currentLang === 'ru' ? "Магия арабского трехбуквенного корня" : currentLang === 'ky' ? "Араб уңгуларынын сыйкыры" : "The Magic of 3-Letter Roots",
      host: "Ustadha Amina",
      avatarType: "female",
      subtitles: [
        { start: 0, end: 5, text: "مَرْحَبًا بِكُمْ! فِي اللُّغَةِ الْعَرَبِيَّةِ، كُلُّ كَلِمَةٍ لَهَا جَذْرٌ.", translation: currentLang === 'ru' ? "Добро пожаловать! В арабском языке у каждого слова есть корень." : "Кош келиңиздер! Араб тилинде ар бир сөздүн өзүнүн уңгусу болот." },
        { start: 5, end: 10, text: "مَثَلًا: كَتَبَ ك-ت-ب، نَحْصُلُ عَلَى كِتَاب، مَكْتَب، كَاتِب.", translation: currentLang === 'ru' ? "Например: К-Т-Б (писать). Из него получаем: книга, офис, писатель." : "Мисалы: К-Т-Б (жазуу). Мындан: китеп, кеңсе, жазуучу сөздөрү жасалат." },
        { start: 10, end: 15, text: "فَهْمُ الْجُذُورِ يُسَاعِدُكَ فِي مَعْرِفَةِ مَعْنَى الْكَلِمَاتِ بِسُرْعَةٍ.", translation: currentLang === 'ru' ? "Понимание корней помогает вам мгновенно угадывать значение сотен новых слов." : "Уңгуларды түшүнүү жүздөгөн жаңы сөздөрдүн маанисин дароо табууга жардам берет." },
        { start: 15, end: 20, text: "جَيِّدٌ جِدًّا! لِنَرَى هَلْ تَسْتَطِيعُ حَلَّ هَذَا السُّؤَالِ الْآن؟", translation: currentLang === 'ru' ? "Замечательно! Давайте проверим, сможете ли вы ответить на этот вопрос?" : "Абдан жакшы! Келиңиз, бул суроого жооп бере аласызбы, көрөлү?" }
      ],
      quiz: {
        question: currentLang === 'ru' ? "Какое значение несет в себе трехбуквенный корень Д-Р-С (د-ر-س)?" : "Д-Р-С (د-ر-س) үч тамгалуу уңгусу кандай маанини камтыйт?",
        options: currentLang === 'ru'
          ? ["Письмо и книги", "Учеба, уроки и преподавание", "Путешествия и транспорт", "Еда и напитки"]
          : ["Жазуу жана китептер", "Окуу, сабак жана окутуу", "Саякат жана унаа", "Тамак-аш жана суусундуктар"],
        answer: currentLang === 'ru' ? "Учеба, уроки и преподавание" : "Окуу, сабак жана окутуу",
        explanation: currentLang === 'ru'
          ? "Корень Д-Р-С связан с получением знаний. Из него выводятся слова 'Дарс' (урок), 'Мадраса' (школа) и 'Мударрис' (учитель)."
          : "Д-Р-С уңгусу билим алуу менен байланыштуу. Мындан 'Дарс' (сабак), 'Мадраса' (мектеп) жана 'Мударрис' (мугалим) сөздөрү куралат."
      }
    }
  ];

  const [lessons, setLessons] = useState<VideoLesson[]>(defaultLessons);
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson>(defaultLessons[0]);
  
  // Video player controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // AI Video generator state
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [errorText, setErrorText] = useState('');

  // Refs & intervals
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Sync state when selected video changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setQuizVisible(false);
    setQuizSubmitted(false);
    setSelectedOption('');
    setIsAnswerCorrect(null);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [selectedVideo]);

  // Video playback timer simulator
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 100 / playbackSpeed;
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 0.1;
          if (next >= 20) {
            setIsPlaying(false);
            setQuizVisible(true);
            if (timerRef.current) clearInterval(timerRef.current);
            return 20;
          }
          return next;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (currentTime >= 20) {
      setCurrentTime(0);
      setQuizVisible(false);
      setQuizSubmitted(false);
      setSelectedOption('');
      setIsAnswerCorrect(null);
    }
    setIsPlaying(!isPlaying);
  };

  // Get active subtitle
  const activeSub = selectedVideo.subtitles.find(
    s => currentTime >= s.start && currentTime < s.end
  );

  // Generate mock phonetic mouth-shape based on spoken text vowels
  const getPhoneticMouthShape = () => {
    if (!isPlaying) return '😐';
    const secondsInt = Math.floor(currentTime);
    if (secondsInt % 3 === 0) return '😲'; // Fathah /a/
    if (secondsInt % 3 === 1) return '😗'; // Dammah /u/
    return '😃'; // Kasrah /i/
  };

  // Custom AI Video generation handler using our new Express backend route
  const handleGenerateCustomVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setIsGenerating(true);
    setErrorText('');
    
    // Staged updates for premium AI rendering feel
    setGenerationStep(currentLang === 'ru' ? 'Консультируюсь с преподавателями...' : 'Consulting scholar database...');
    
    setTimeout(async () => {
      setGenerationStep(currentLang === 'ru' ? 'Синтезирую голос и транскрипцию...' : 'Synthesizing voice tracks and transcriptions...');
      
      try {
        const response = await fetch('/api/gemini/generate-video-lesson', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: customTopic,
            language: currentLang
          })
        });

        if (!response.ok) {
          throw new Error("Failed to contact video synthesis API");
        }

        const data: VideoLesson = await response.json();
        
        // Add random id
        const newLesson: VideoLesson = {
          ...data,
          id: `v_custom_${Date.now()}`
        };

        setLessons(prev => [newLesson, ...prev]);
        setSelectedVideo(newLesson);
        setCustomTopic('');
        triggerAchievement('ai_video');
        addXP(15);
        addCoin(3);
      } catch (err: any) {
        console.error(err);
        setErrorText(currentLang === 'ru' 
          ? "Не удалось сгенерировать видеоурок. Пожалуйста, попробуйте другую тему!"
          : "Failed to render custom video. Please try a simpler topic!");
      } finally {
        setIsGenerating(false);
      }
    }, 1800);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;

    const correct = selectedOption === selectedVideo.quiz.answer;
    setIsAnswerCorrect(correct);
    setQuizSubmitted(true);

    if (correct) {
      addXP(20);
      addCoin(5);
      triggerAchievement('video_quiz_pass');
    }
  };

  // Extract key vocabulary from current subtitle to display in Sidebar
  const getCurrentVocabulary = () => {
    if (!activeSub) return [];
    // Simple split or return relevant lexical items
    const text = activeSub.text;
    const words = text.split(' ').filter(w => w.length > 3);
    return words.slice(0, 3).map(word => {
      // Small translation mappings for interactive details
      let details = "";
      if (word.includes("سَّلَامُ")) details = "Peace (Мир)";
      else if (word.includes("عَلَيْكُمْ")) details = "Upon you (На вас)";
      else if (word.includes("تَعَلَّمُ")) details = "We learn (Учим)";
      else if (word.includes("الْحَلْقِ")) details = "Throat (Горло)";
      else if (word.includes("جَذْرٌ")) details = "Root (Корень)";
      else if (word.includes("كِتَاب")) details = "Book (Книга)";
      else if (word.includes("مَكْتَب")) details = "Office (Офис)";
      else details = "Core Vocabulary";
      
      return { word, details };
    });
  };

  return (
    <div className="space-y-8" id="ai-video-lesson-module">
      {/* 1. Header Information */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
          <Film className="w-8 h-8 text-emerald-600 animate-pulse" />
          {currentLang === 'ru' ? 'AI-Видеолекции' : currentLang === 'ky' ? 'ЖИ-Видеолекциялар' : 'AI Video Lectures'}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {currentLang === 'ru'
            ? "Уникальный интерактивный формат! Выбирайте темы, запускайте говорящего AI-аватара с живой мимикой, следите за субтитрами и сдавайте мини-тесты."
            : currentLang === 'ky'
            ? "Уникалдуу интерактивдүү формат! Теманы тандап, жасалма интеллект аватарын угуңуз, субтитрлерди карап, кыска тесттерди тапшырыңыз."
            : "Immersive multimedia experience. Play custom dynamic AI-generated video lectures, follow synchronized subtitles, and test your vocabulary skills in real-time."}
        </p>
      </div>

      {/* 2. Main Studio Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Video Lecture list */}
        <div className="xl:col-span-4 space-y-5">
          {/* Lecture list box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <Film className="w-4 h-4 text-emerald-600" />
              {currentLang === 'ru' ? 'Доступные лекции' : 'Available Lectures'}
            </h3>

            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedVideo(lesson)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 group cursor-pointer ${
                    selectedVideo.id === lesson.id
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 border-emerald-500'
                      : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 text-slate-700 dark:text-slate-200 hover:border-emerald-500/30 hover:bg-emerald-50/20'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                    selectedVideo.id === lesson.id ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block font-sans text-xs font-bold truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {lesson.title}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1 uppercase font-mono flex items-center gap-1.5">
                      <User className="w-3 h-3" /> {lesson.host}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Generator Box */}
          <div className="bg-gradient-to-tr from-slate-900 to-emerald-950 text-white rounded-3xl p-5 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="text-xs font-serif font-black tracking-widest text-amber-400 uppercase">
                {currentLang === 'ru' ? 'Сгенерировать Лекцию' : 'AI Lecture Renderer'}
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-normal">
              {currentLang === 'ru'
                ? "Укажите любую тему (например, 'арабские глаголы', 'разговор в ресторане'), и Gemini мгновенно смоделирует новый интерактивный видеоурок."
                : "Type any custom topic, and our advanced speech & text synthesizer will generate a unique personalized AI video class."}
            </p>

            <form onSubmit={handleGenerateCustomVideo} className="space-y-3">
              <input
                type="text"
                required
                disabled={isGenerating}
                placeholder={currentLang === 'ru' ? "Например: Разговор на рынке..." : "E.g. How to order flatbread..."}
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400 disabled:opacity-50"
              />

              {errorText && (
                <p className="text-[10px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errorText}
                </p>
              )}

              <button
                type="submit"
                disabled={isGenerating || !customTopic.trim()}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider shadow-md disabled:opacity-50 transition-all cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-[10px] truncate">{generationStep}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{currentLang === 'ru' ? 'Синтезировать видео' : 'Synthesize Video'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Cinematic Video Player & Quiz stage */}
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Player Container */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative bg-slate-950 rounded-3xl aspect-video border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-4 group">
                
                {/* 1. Portrait Display area */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src={selectedVideo.avatarType === 'male' 
                      ? '/src/assets/images/ustadh_omar_portrait_1783088567149.jpg' 
                      : '/src/assets/images/student_avatar_female_1783088584078.jpg'
                    }
                    alt="AI Host avatar representation"
                    className={`w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-slate-800 shadow-2xl transition-all duration-300 ${
                      isPlaying ? 'scale-105 border-emerald-500/80 animate-pulse' : 'opacity-80'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glowing gold back aura */}
                  <div className={`absolute w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl transition-opacity duration-300 ${
                    isPlaying ? 'opacity-100 animate-ping' : 'opacity-0'
                  }`} />
                </div>

                {/* 2. Audio waveform visualizer overlay at bottom of the avatar */}
                <div className="absolute inset-x-0 top-1/2 mt-16 flex items-center justify-center gap-1 pointer-events-none h-12">
                  {isPlaying ? (
                    Array.from({ length: 15 }).map((_, i) => {
                      const randomHeight = [16, 24, 32, 40, 48, 12][(i + Math.floor(currentTime * 4)) % 6];
                      return (
                        <motion.div
                          key={i}
                          animate={{ height: isMuted ? 4 : randomHeight }}
                          className="w-1 bg-gradient-to-t from-emerald-600 to-amber-400 rounded-full transition-all duration-150"
                        />
                      );
                    })
                  ) : (
                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 uppercase bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800">
                      <Zap className="w-3 h-3 text-amber-400" />
                      {currentLang === 'ru' ? 'Нажмите PLAY для воспроизведения' : 'Press PLAY to experience lecture'}
                    </div>
                  )}
                </div>

                {/* 3. Real-time Phonetic mouth guide sticker */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800 flex items-center gap-1.5 z-10">
                  <span className="text-sm">{getPhoneticMouthShape()}</span>
                  <div className="text-[9px] font-mono leading-none">
                    <span className="block text-slate-500 uppercase">SPEECH FORM</span>
                    <span className="text-amber-400 font-bold font-serif">{isPlaying ? 'Active Lip Sync' : 'Standby'}</span>
                  </div>
                </div>

                {/* 4. Captions Overlay inside player */}
                <div className="absolute inset-x-4 bottom-16 z-10 text-center pointer-events-none">
                  <AnimatePresence mode="wait">
                    {showCaptions && activeSub && (
                      <motion.div
                        key={activeSub.start}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 inline-block max-w-lg shadow-md"
                      >
                        <p className="text-base font-serif font-black text-amber-300 tracking-wide mb-1" dir="rtl">
                          {activeSub.text}
                        </p>
                        <p className="text-[10px] text-slate-300 font-sans tracking-wide leading-snug">
                          {activeSub.translation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Top Overlay controls */}
                <div className="flex items-center justify-between w-full relative z-10">
                  <div className="bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[10px] font-mono font-bold text-slate-300">
                    {selectedVideo.host}
                  </div>
                  <div className="bg-emerald-600 text-white font-mono text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest">
                    AI 108s RENDER
                  </div>
                </div>

                {/* Bottom Overlay controls */}
                <div className="w-full space-y-2 relative z-10">
                  {/* Seek Bar */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-[9px] font-mono text-slate-400">
                      {`0:${Math.floor(currentTime).toString().padStart(2, '0')}`}
                    </span>
                    <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden relative cursor-pointer" onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percent = clickX / rect.width;
                      setCurrentTime(percent * 20);
                      if (percent * 20 < 20) setQuizVisible(false);
                    }}>
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-100" 
                        style={{ width: `${(currentTime / 20) * 100}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">0:20</span>
                  </div>

                  {/* Play, speed, captions toggles */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all cursor-pointer shadow-md"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setCurrentTime(0);
                          setQuizVisible(false);
                          setQuizSubmitted(false);
                          setSelectedOption('');
                          setIsAnswerCorrect(null);
                        }}
                        className="p-2 bg-slate-900/80 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                        title="Replay"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Playback speed selector */}
                      <div className="flex bg-slate-900/80 rounded-xl p-0.5 border border-slate-800">
                        {[0.75, 1, 1.5].map(speed => (
                          <button
                            key={speed}
                            onClick={() => setPlaybackSpeed(speed)}
                            className={`px-2 py-1 text-[9px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                              playbackSpeed === speed 
                                ? 'bg-emerald-600 text-white' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>

                      {/* Captions Toggle */}
                      <button
                        onClick={() => setShowCaptions(!showCaptions)}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          showCaptions ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900/80 text-slate-500'
                        }`}
                        title="Toggle captions"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Sidebar Vocabulary panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    {currentLang === 'ru' ? 'Слова из эфира' : 'Lecture Vocabulary'}
                  </h4>

                  <div className="space-y-3">
                    {getCurrentVocabulary().map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between group hover:border-emerald-500/20 transition-all cursor-pointer"
                        onClick={() => {
                          // Soft toggle sound effect or pronunciation tip trigger
                          addXP(1);
                        }}
                      >
                        <div>
                          <span className="block font-serif text-sm font-black text-slate-800 dark:text-emerald-400 tracking-wide" dir="rtl">
                            {item.word}
                          </span>
                          <span className="block text-[9px] text-slate-400 font-mono tracking-wide mt-0.5">
                            {item.details}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                      </motion.div>
                    ))}

                    {getCurrentVocabulary().length === 0 && (
                      <p className="text-[10px] text-slate-400 text-center py-6">
                        {currentLang === 'ru' ? 'Запустите видео для разбора лексики' : 'Play video to capture vocabulary'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 font-mono border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center gap-1.5 leading-normal">
                  <Bot className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {currentLang === 'ru'
                      ? "Нажмите на любое всплывающее слово для быстрого разбора и транскрипции."
                      : "Interactive words dynamically pull spelling transcriptions during active presentation segments."}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* 3. Dynamic Interactive Video Quiz after Lecture finishes */}
          <AnimatePresence>
            {quizVisible && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-gradient-to-tr from-slate-900 to-slate-950 border-2 border-emerald-500/50 text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden"
              >
                {/* Visual decoration confetti particles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-slate-800 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg animate-bounce">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-amber-400 flex items-center gap-1.5">
                        {currentLang === 'ru' ? 'Лекционный экспресс-тест' : 'Post-Lecture Evaluation'}
                        <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-spin" />
                      </h4>
                      <p className="text-xs text-slate-400">
                        {currentLang === 'ru' ? 'Ответьте правильно, чтобы получить +20 XP и +5 монет!' : 'Confirm comprehension to receive bonuses!'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider font-extrabold shrink-0">
                    ACTIVE EXERCISE
                  </span>
                </div>

                <form onSubmit={handleQuizSubmit} className="space-y-5">
                  <p className="text-sm font-semibold tracking-wide text-slate-200">
                    {selectedVideo.quiz.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedVideo.quiz.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (quizSubmitted) return;
                          setSelectedOption(opt);
                        }}
                        className={`p-4 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between cursor-pointer ${
                          selectedOption === opt
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                            : 'bg-slate-950/40 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedOption === opt && <Check className="w-4.5 h-4.5 text-white" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTime(0);
                        setQuizVisible(false);
                        setQuizSubmitted(false);
                        setSelectedOption('');
                        setIsAnswerCorrect(null);
                      }}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                    >
                      {currentLang === 'ru' ? 'Пересмотреть лекцию' : 'Replay Lecture'}
                    </button>
                    {!quizSubmitted ? (
                      <button
                        type="submit"
                        disabled={!selectedOption}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-all disabled:opacity-50"
                      >
                        {currentLang === 'ru' ? 'Отправить ответ' : 'Verify Answer'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTime(0);
                          setQuizVisible(false);
                          setQuizSubmitted(false);
                          setSelectedOption('');
                          setIsAnswerCorrect(null);
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-xs font-black rounded-xl cursor-pointer transition-all"
                      >
                        {currentLang === 'ru' ? 'Продолжить обучение' : 'Continue Study'}
                      </button>
                    )}
                  </div>
                </form>

                {/* Question results feedback box */}
                <AnimatePresence>
                  {quizSubmitted && isAnswerCorrect !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border flex gap-3.5 ${
                        isAnswerCorrect 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="p-2 bg-slate-900 rounded-xl self-start">
                        {isAnswerCorrect ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
                      </div>
                      <div className="space-y-1">
                        <span className="block text-xs font-black uppercase tracking-wider">
                          {isAnswerCorrect 
                            ? (currentLang === 'ru' ? 'Правильный ответ! +20 XP / +5 монет' : 'Splendid, that is correct! +20 XP') 
                            : (currentLang === 'ru' ? 'Не совсем верно' : 'Incorrect choice')}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {selectedVideo.quiz.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
