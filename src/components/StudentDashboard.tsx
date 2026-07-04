import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TranslationSet } from '../types';
import { achievementsData } from '../data/blog';
import { 
  Award, Flame, Coins, Trophy, Calendar, Sparkles, CheckCircle, Clock, BookOpen, 
  Camera, Download, RefreshCw, CreditCard, ShieldCheck, Check, Image
} from 'lucide-react';

interface StudentDashboardProps {
  currentLang: Language;
  t: TranslationSet;
  userStats: {
    xp: number;
    coins: number;
    streak: number;
    completedLessons: string[];
    unlockedLevels: string[];
    achievements: string[];
  };
}

export default function StudentDashboard({ currentLang, t, userStats }: StudentDashboardProps) {
  // AI Photo Studio state variables
  const [studentName, setStudentName] = useState('Aisuluu Keneshbekova');
  const [studentMotto, setStudentMotto] = useState('طلب العلم فريضة (Seeking knowledge is a duty)');
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
  const [selectedStyle, setSelectedStyle] = useState('Modern Fusha Scholar');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [cardGenerated, setCardGenerated] = useState(true);

  const studentAvatars = {
    female: '/src/assets/images/student_avatar_female_1783088584078.jpg',
    male: '/src/assets/images/student_avatar_male_1783088597930.jpg'
  };

  const handleGenerateCard = () => {
    setIsGenerating(true);
    setGenerationStep(1);
    
    // Simulate multi-step AI rendering and styling
    setTimeout(() => {
      setGenerationStep(2);
      setTimeout(() => {
        setGenerationStep(3);
        setTimeout(() => {
          setIsGenerating(false);
          setCardGenerated(true);
        }, 1200);
      }, 1000);
    }, 1000);
  };

  // Calendar days grid mapping (heat map mock)
  const calendarDays = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    active: i === 12 || i === 13 || i === 24 || i === 25 || i === 26 || i === 27, // mock active days
    today: i === 27,
  }));

  const dailyQuests = [
    { title: { en: "Learn 5 Words", ru: "Изучить 5 слов", ky: "5 сөз жаттоо", ar: "تعلم ٥ كلمات" }, xp: 20, done: true },
    { title: { en: "Speak with AI Teacher", ru: "Поговорить с AI Teacher", ky: "AI Мугалим менен сүйлөшүү", ar: "التحدث مع المعلم الذكي" }, xp: 30, done: userStats.achievements.includes('ai_chat') },
    { title: { en: "Score 100% on a Test", ru: "Набрать 100% в тесте", ky: "Тесттен 100% алуу", ar: "الحصول على ١٠٠٪ في اختبار" }, xp: 50, done: userStats.achievements.includes('quiz_master') },
  ];

  return (
    <div className="space-y-8" id="dashboard-module">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
          {t.dashboardTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {t.dashboardSubtitle}
        </p>
      </div>

      {/* Gamification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Stats card */}
        <div className="bg-gradient-to-tr from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 border border-emerald-700/20 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4">
            <span className="font-mono text-xs text-emerald-300 font-bold">STUDENT RANK: FARES</span>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="space-y-1">
              <div className="p-2.5 bg-white/10 rounded-2xl w-fit mx-auto">
                <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>
              <span className="block text-2xl font-bold">{userStats.streak}</span>
              <span className="block text-[10px] text-emerald-300 uppercase font-mono">Days Series</span>
            </div>

            <div className="space-y-1">
              <div className="p-2.5 bg-white/10 rounded-2xl w-fit mx-auto">
                <Coins className="w-6 h-6 text-yellow-300" />
              </div>
              <span className="block text-2xl font-bold">{userStats.coins}</span>
              <span className="block text-[10px] text-emerald-300 uppercase font-mono">Muallim Coins</span>
            </div>

            <div className="space-y-1">
              <div className="p-2.5 bg-white/10 rounded-2xl w-fit mx-auto">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <span className="block text-2xl font-bold">{userStats.xp}</span>
              <span className="block text-[10px] text-emerald-300 uppercase font-mono">Total XP</span>
            </div>
          </div>

          {/* Level indicators */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-emerald-200">
              <span>Next Rank (Muallim Master)</span>
              <span>{userStats.xp} / 3000 XP</span>
            </div>
            <div className="w-full bg-emerald-900 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-400 h-full transition-all duration-300" 
                style={{ width: `${(userStats.xp / 3000) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Daily Quests Board */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-emerald-600" />
            Daily Quests (24 hrs)
          </h3>

          <div className="space-y-2.5">
            {dailyQuests.map((quest, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  quest.done 
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-700 dark:text-slate-200' 
                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1 rounded-full ${quest.done ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium">{quest.title[currentLang]}</span>
                </div>
                <span className="text-[10px] font-bold font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">
                  +{quest.xp} XP
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Heatmap activity log */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-emerald-600" />
            Learning Consistency Calendar
          </h3>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => (
              <div
                key={day.day}
                className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all relative ${
                  day.today
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/15'
                    : day.active
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-100/50 dark:border-slate-700'
                }`}
              >
                {day.day}
                {day.today && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
            <span>28 Days Record</span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block" /> Active Day
            </span>
          </div>
        </div>

      </div>

      {/* AI Photo Studio & Student ID Customizer */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Panel: Controls */}
          <div className="flex-1 space-y-5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-wider font-bold bg-amber-500 text-amber-950 px-3 py-1 rounded-full uppercase inline-block">
                {currentLang === 'ru' ? 'ИИ СТУДИЯ ПОРТРЕТОВ' : currentLang === 'ky' ? 'ЖИ ПОРТРЕТ СТУДИЯСЫ' : 'AI PORTRAIT STUDIO'}
              </span>
              <h3 className="text-2xl font-bold font-serif text-amber-400">
                {currentLang === 'ru' ? 'Твой Студенческий AI-Билет' : currentLang === 'ky' ? 'Сенин Студенттик ИИ-Билетиң' : 'Your Customized Student AI Card'}
              </h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                {currentLang === 'ru' 
                  ? 'Выберите эстетику своего ИИ-портрета, введите свое имя на арабском языке и сгенерируйте интерактивную студенческую карту с печатью мудрости.' 
                  : currentLang === 'ky'
                  ? 'Өзүңүздүн ИИ-портретиңиздин стилин тандап, атыңызды арабча жазыңыз жана расмий мөөрү бар студенттик билетти жаратыңыз.'
                  : 'Select your preferred AI portrait aesthetic, customize your credentials, and render an official virtual student badge with a digital holographic stamp.'}
              </p>
            </div>

            {/* Form controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">
                  {currentLang === 'ru' ? 'Арабское Имя / Никнейм' : currentLang === 'ky' ? 'Арабча Аты / Никнейм' : 'Arabic Name / Nickname'}
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">
                  {currentLang === 'ru' ? 'Аспирация / Девиз' : currentLang === 'ky' ? 'Ураан / Девиз' : 'Aspiration / Motto'}
                </label>
                <input
                  type="text"
                  value={studentMotto}
                  onChange={(e) => setStudentMotto(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">
                  {currentLang === 'ru' ? 'Эстетика ИИ-Фото' : currentLang === 'ky' ? 'ИИ-Сүрөт эстетикасы' : 'AI Portrait Aesthetic'}
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Modern Fusha Scholar">🎓 Modern Fusha Scholar</option>
                  <option value="Classical Calligrapher">✍️ Classical Calligrapher</option>
                  <option value="Central Asian Polyglot">🌍 Central Asian Polyglot</option>
                  <option value="Digital Oasis Pioneer">💻 Digital Oasis Pioneer</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">
                  {currentLang === 'ru' ? 'Ваш Аватар' : currentLang === 'ky' ? 'Сиздин Аватарыңыз' : 'Your Avatar Style'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGender('female')}
                    className={`py-2 px-3.5 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedGender === 'female'
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {currentLang === 'ru' ? 'Женский' : currentLang === 'ky' ? 'Аял' : 'Female'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGender('male')}
                    className={`py-2 px-3.5 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedGender === 'male'
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {currentLang === 'ru' ? 'Мужской' : currentLang === 'ky' ? 'Эркек' : 'Male'}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateCard}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 transition-all cursor-pointer"
            >
              <Camera className="w-4.5 h-4.5" />
              {isGenerating 
                ? (currentLang === 'ru' ? 'Идет рендеринг...' : currentLang === 'ky' ? 'Жаратылууда...' : 'Rendering AI Portrait...')
                : (currentLang === 'ru' ? 'Сгенерировать AI-Билет' : currentLang === 'ky' ? 'Жаңы ИИ-Билет жасоо' : 'Render AI Student ID Card')}
            </button>
          </div>

          {/* Right Panel: Student ID Card rendering with absolute precision */}
          <div className="w-full lg:w-[320px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-[280px] aspect-[5/8] bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-400 animate-pulse" />
                  <div className="w-16 h-16 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-400 animate-bounce" />
                  </div>
                  <div className="text-center space-y-2">
                    <span className="block text-[10px] font-mono text-amber-400 uppercase tracking-widest font-black animate-pulse">
                      {generationStep === 1 
                        ? 'Loading Portrait' 
                        : generationStep === 2 
                        ? 'Applying Aesthetic' 
                        : 'Embedding Security Seal'}
                    </span>
                    <p className="text-[10px] text-slate-400 leading-normal px-2">
                      {generationStep === 1 
                        ? (currentLang === 'ru' ? 'Формулирование нейро-портрета...' : 'ИИ портрет түзүлүүдө...') 
                        : generationStep === 2 
                        ? (currentLang === 'ru' ? 'Наложение выбранного стиля...' : 'Стилдер колдонулууда...') 
                        : (currentLang === 'ru' ? 'Генерация золотой печати...' : 'Алтын мөөр басылууда...')}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-[280px] aspect-[5/8] bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 border-2 border-amber-400/80 rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all duration-300"
                >
                  {/* Holographic scanner effect line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 bg-emerald-600 rounded-lg">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[9px] font-serif font-black tracking-widest text-emerald-400">MUALLIM</span>
                    </div>
                    <span className="text-[8px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded-full uppercase">
                      STUDENT
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="my-auto space-y-4 text-center">
                    {/* Portrait area */}
                    <div className="w-24 h-24 rounded-2xl bg-slate-800 border-2 border-slate-700 mx-auto overflow-hidden relative shadow-inner">
                      <img
                        src={studentAvatars[selectedGender]}
                        alt="AI Student Avatar"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-1 right-1 bg-emerald-600 text-white p-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Name & Title */}
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold tracking-tight text-white line-clamp-1">{studentName}</h4>
                      <p className="text-[9px] text-amber-400 font-mono tracking-wide uppercase">{selectedStyle}</p>
                    </div>

                    {/* Motto */}
                    <p className="text-[9px] text-slate-400 leading-relaxed italic line-clamp-2 px-1">
                      "{studentMotto}"
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-[8px] font-mono text-slate-400">
                    <div>
                      <span className="block text-slate-500 uppercase">CARD NO.</span>
                      <span className="text-slate-300 font-bold">M-2026-8941</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-slate-500 uppercase">RANK</span>
                      <span className="text-emerald-400 font-bold uppercase">FARES (A1-A2)</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Unlocked Achievements list */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5.5 h-5.5 text-emerald-600" />
          Student Achievement Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievementsData.map((ach) => {
            const isUnlocked = userStats.achievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between h-[130px] ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-50/50 to-white dark:from-slate-800 dark:to-slate-900 border-amber-400 text-slate-800 dark:text-slate-100'
                    : 'bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800 text-slate-400 grayscale'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${isUnlocked ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                    <Award className="w-5 h-5" />
                  </div>
                  {isUnlocked && (
                    <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full border border-amber-500/10">
                      Unlocked
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold">{ach.title[currentLang]}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {ach.description[currentLang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
