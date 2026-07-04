import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TranslationSet } from './types';
import { languages, translations } from './data/translations';

// Components
import AlphabetSection from './components/AlphabetSection';
import DictionarySection from './components/DictionarySection';
import PracticeSection from './components/PracticeSection';
import CoursesSection from './components/CoursesSection';
import AITeacherSection from './components/AITeacherSection';
import StudentDashboard from './components/StudentDashboard';
import BlogSection from './components/BlogSection';
import AdminPanel from './components/AdminPanel';
import PricingSection from './components/PricingSection';
import FloatingChatbot from './components/FloatingChatbot';

// Icons
import {
  Flame,
  Coins,
  Award,
  Sparkles,
  BookOpen,
  GraduationCap,
  MessageSquare,
  BookmarkCheck,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Briefcase,
  Layers,
  HeartHandshake,
  Send,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function App() {
  // Core client states
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('muallim_lang');
    return (saved as Language) || 'ru';
  });
  const [hasOnboarded, setHasOnboarded] = useState(() => {
    return !!localStorage.getItem('muallim_lang');
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('muallim_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gamification user states
  const [userStats, setUserStats] = useState({
    xp: 240,
    coins: 35,
    streak: 4,
    completedLessons: ['l_intro', 'l_greetings'],
    unlockedLevels: ['A1', 'A2'],
    achievements: ['first_word'],
  });

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Theme Sync
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('muallim_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const selectLanguageOnboard = (lang: Language) => {
    setCurrentLang(lang);
    setHasOnboarded(true);
    localStorage.setItem('muallim_lang', lang);
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('muallim_lang', lang);
  };

  // Helper callbacks passed down to subsystems
  const addXP = (amount: number) => {
    setUserStats((prev) => ({ ...prev, xp: prev.xp + amount }));
  };

  const addCoin = (amount: number) => {
    setUserStats((prev) => ({ ...prev, coins: prev.coins + amount }));
  };

  const markLessonComplete = (lessonId: string) => {
    setUserStats((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
    });
  };

  const triggerAchievement = (achievementId: string) => {
    setUserStats((prev) => {
      if (prev.achievements.includes(achievementId)) return prev;
      return { ...prev, achievements: [...prev.achievements, achievementId] };
    });
  };

  const t: TranslationSet = translations[currentLang] || translations['ru'];

  // Handle support message
  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMsg) return;
    setContactSuccess(true);
    setContactName('');
    setContactMsg('');
    setTimeout(() => setContactSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-all duration-300">
      
      {/* 1. ONBOARDING LANGUAGE CHOICE OVERLAY */}
      <AnimatePresence>
        {!hasOnboarded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-emerald-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-lg w-full border border-emerald-500/20 text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Gold luxury divider strip */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600" />
              
              <div className="space-y-2">
                <span className="text-4xl block font-bold text-emerald-800 dark:text-emerald-400 font-serif">مُعَلِّم</span>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Choose Your Journey Language</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your interface language to personalize translation tracks, quizzes, and your personal AI Teacher experience.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguageOnboard(lang.code)}
                    className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all text-center group hover:scale-[1.02]"
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 block">{lang.name}</span>
                  </button>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                MUALLIM — “Your Teacher. Your Arabic Journey.”
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DOCK NAVIGATION HEADER */}
      <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 z-40 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand with 'M' + Arabic Integrated Open Book layout */}
          <div 
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/10 border border-emerald-500/20">
              <span className="font-serif text-white text-lg font-bold">M</span>
              {/* Tiny gold open book vector line */}
              <div className="absolute -bottom-1 bg-amber-500 h-1 w-6 rounded-full" />
            </div>
            <div>
              <span className="block font-serif text-xl font-black tracking-tight text-emerald-800 dark:text-emerald-400 leading-none">
                {t.brandName}
              </span>
              <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400 mt-0.5 font-bold">
                {currentLang === 'ar' ? 'رحلتك العربية' : 'Your Arabic Journey'}
              </span>
            </div>
          </div>

          {/* Large Screen Nav Menu items */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {[
              { id: 'home', label: t.navHome },
              { id: 'courses', label: t.navCourses },
              { id: 'alphabet', label: t.navAlphabet },
              { id: 'dictionary', label: t.navDict },
              { id: 'practice', label: t.navPractice },
              { id: 'ai', label: t.navAI },
              { id: 'blog', label: t.navBlog },
              { id: 'dashboard', label: t.navDashboard },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Widgets & Control buttons */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Currency/Series ticker */}
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-700/50">
              <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
                <Flame className="w-4 h-4 animate-bounce" />
                {userStats.streak}
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                <Coins className="w-4 h-4" />
                {userStats.coins}
              </span>
            </div>

            {/* Language Selector */}
            <div className="relative group">
              <button className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full transition-all">
                <Globe className="w-4.5 h-4.5 text-emerald-600" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-2.5 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      currentLang === l.code ? 'text-emerald-600 font-bold bg-emerald-50/50 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    <span>{l.nativeName}</span>
                    <span>{l.flag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full transition-all"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {/* Premium CTA tab trigger */}
            <button
              onClick={() => setActiveTab('pricing')}
              className="bg-slate-950 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-full text-xs shadow-md"
            >
              Go Premium
            </button>

            {/* Admin trigger */}
            <button
              onClick={() => setActiveTab('admin')}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full"
              title="Admin Panel"
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          {/* Mobile navigation toggle */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Currency ticker mock */}
            <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-100 dark:border-slate-700">
              <Flame className="w-3.5 h-3.5" />
              {userStats.streak}
            </span>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 3. MOBILE MENU SIDEBAR OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 z-50 p-6 flex flex-col justify-between shadow-2xl"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-800 dark:text-emerald-400 font-serif text-lg">Menu مُعَلِّم</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile tabs list */}
              <div className="space-y-1">
                {[
                  { id: 'home', label: t.navHome },
                  { id: 'courses', label: t.navCourses },
                  { id: 'alphabet', label: t.navAlphabet },
                  { id: 'dictionary', label: t.navDict },
                  { id: 'practice', label: t.navPractice },
                  { id: 'ai', label: t.navAI },
                  { id: 'blog', label: t.navBlog },
                  { id: 'dashboard', label: t.navDashboard },
                  { id: 'pricing', label: "Go Premium" },
                  { id: 'admin', label: t.navAdmin },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer Widgets */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              {/* Quick Language */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Language:</span>
                <div className="flex gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`text-xs p-1 rounded ${currentLang === l.code ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200' : ''}`}
                    >
                      {l.flag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark mode */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Dark Theme:</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN LAYOUT STAGE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && (
              /* LANDING WORKSPACE */
              <div className="space-y-16">
                
                {/* Hero section with modern displays */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20 text-xs font-bold animate-pulse">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>{t.brandSub}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                      {t.heroTitle}
                    </h1>

                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-sans max-w-xl">
                      {t.heroSubtitle}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        onClick={() => setActiveTab('courses')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-sm shadow-xl shadow-emerald-600/10 transition-all hover:scale-[1.02]"
                      >
                        {t.startBtn}
                      </button>
                      <button
                        onClick={() => setActiveTab('alphabet')}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white font-bold px-8 py-4 rounded-2xl text-sm hover:border-emerald-500 transition-all hover:scale-[1.02]"
                      >
                        {t.freeLessonBtn}
                      </button>
                    </div>
                  </div>

                  {/* Visual Decorative Right side */}
                  <div className="lg:col-span-5 relative">
                    {/* Floating Cards background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/5 to-amber-500/5 rounded-3xl blur-3xl pointer-events-none" />
                    
                    <div className="relative bg-gradient-to-tr from-emerald-800 to-emerald-950 text-white p-8 rounded-3xl border border-emerald-700/20 shadow-xl space-y-8 overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                      
                      {/* Premium Calligraphy vector placeholder */}
                      <div className="text-center py-6 space-y-4">
                        <span className="text-5xl sm:text-6xl text-amber-400 font-extrabold block tracking-wide select-none" dir="rtl">
                          أَهْلًا وَسَهْلًا
                        </span>
                        <span className="text-xs font-mono tracking-wider uppercase text-emerald-300 font-semibold block">
                          "Ahlan wa Sahlan" / Welcome
                        </span>
                      </div>

                      {/* Stat grid widgets */}
                      <div className="grid grid-cols-2 gap-4 border-t border-emerald-800/60 pt-6">
                        {[
                          { val: "1,000+", lab: t.statsLessons },
                          { val: "100,000+", lab: t.statsWords },
                          { val: "10,000+", lab: t.statsExercises },
                          { val: "24/7 AI", lab: t.statsAI },
                        ].map((item, idx) => (
                          <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <span className="block text-base font-bold text-amber-400">{item.val}</span>
                            <span className="block text-[10px] text-emerald-200 mt-0.5">{item.lab}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main section navigation preview / CTA cards */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white uppercase font-mono tracking-wider text-center lg:text-left">
                    Explore Muallim Modules
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 'courses', icon: GraduationCap, title: t.coursesTitle, sub: t.coursesSubtitle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
                      { id: 'alphabet', icon: BookOpen, title: t.alphabetTitle, sub: t.alphabetSubtitle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
                      { id: 'dictionary', icon: Layers, title: t.dictTitle, sub: t.dictSubtitle, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/20" },
                      { id: 'practice', icon: MessageSquare, title: t.practiceTitle, sub: t.practiceSubtitle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
                      { id: 'ai', icon: Sparkles, title: t.aiTitle, sub: t.aiSubtitle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/20" },
                      { id: 'blog', icon: BookmarkCheck, title: t.blogTitle, sub: t.blogSubtitle, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/20" },
                    ].map((mod) => (
                      <button
                        key={mod.id}
                        onClick={() => setActiveTab(mod.id)}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 text-left hover:shadow-md hover:border-emerald-500/20 transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className={`p-3 rounded-xl w-fit ${mod.bg} ${mod.color}`}>
                            <mod.icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-1.5">
                            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {mod.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
                              {mod.sub}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline mt-4">
                          Enter Module ✕
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive helpdesk / Contacts block */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="contacts">
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{t.contactTitle}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
                      {t.contactSubtitle}
                    </p>
                    
                    <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>+996 (555) 12-34-56 (Kyrgyzstan)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <span>support@muallim.kg</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>Bishkek, Chuy Ave 114</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSupportSubmit} className="lg:col-span-7 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-xs focus:outline-none"
                      />
                      <span className="text-xs text-slate-400 dark:text-slate-500 self-center">Our support agents respond within 3 hours.</span>
                    </div>
                    <textarea
                      required
                      placeholder="How can we assist you with group/corporate training sessions?"
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-4 text-xs focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition-all"
                    >
                      {t.send}
                    </button>

                    {contactSuccess && (
                      <div className="p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-bold animate-pulse">
                        Ма ша Аллах! Your support request has been cataloged. We will touch base shortly.
                      </div>
                    )}
                  </form>
                </div>

              </div>
            )}

            {activeTab === 'courses' && (
              <CoursesSection
                currentLang={currentLang}
                t={t}
                completedLessons={userStats.completedLessons}
                markLessonComplete={markLessonComplete}
                addCoin={addCoin}
                addXP={addXP}
                triggerAchievement={triggerAchievement}
              />
            )}

            {activeTab === 'alphabet' && (
              <AlphabetSection
                currentLang={currentLang}
                t={t}
              />
            )}

            {activeTab === 'dictionary' && (
              <DictionarySection
                currentLang={currentLang}
                t={t}
                addCoin={addCoin}
                addXP={addXP}
                triggerAchievement={triggerAchievement}
              />
            )}

            {activeTab === 'practice' && (
              <PracticeSection
                currentLang={currentLang}
                t={t}
                addCoin={addCoin}
                addXP={addXP}
                triggerAchievement={triggerAchievement}
              />
            )}

            {activeTab === 'ai' && (
              <AITeacherSection
                currentLang={currentLang}
                t={t}
                addCoin={addCoin}
                addXP={addXP}
                triggerAchievement={triggerAchievement}
              />
            )}

            {activeTab === 'blog' && (
              <BlogSection
                currentLang={currentLang}
                t={t}
              />
            )}

            {activeTab === 'dashboard' && (
              <StudentDashboard
                currentLang={currentLang}
                t={t}
                userStats={userStats}
              />
            )}

            {activeTab === 'admin' && (
              <AdminPanel
                currentLang={currentLang}
                t={t}
              />
            )}

            {activeTab === 'pricing' && (
              <PricingSection
                currentLang={currentLang}
                t={t}
                addCoin={addCoin}
                triggerAchievement={triggerAchievement}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. FOOTER */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 py-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 font-serif">MUALLIM</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('pricing')} className="hover:underline">Pricing</button>
            <span>•</span>
            <button onClick={() => setActiveTab('admin')} className="hover:underline">Admin Panel</button>
            <span>•</span>
            <a href="#contacts" onClick={() => setActiveTab('home')} className="hover:underline">Contact Helpdesk</a>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Chatbot companion */}
      <FloatingChatbot
        currentLang={currentLang}
        t={t}
        addCoin={addCoin}
        addXP={addXP}
        triggerAchievement={triggerAchievement}
      />
    </div>
  );
}
