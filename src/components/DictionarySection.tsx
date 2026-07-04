import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { dictionaryData } from '../data/dictionary';
import { Language, TranslationSet, DictWord } from '../types';
import { Search, Volume2, BookOpen, Layers, ArrowRight } from 'lucide-react';

interface DictionarySectionProps {
  currentLang: Language;
  t: TranslationSet;
  addCoin: (amount: number) => void;
  addXP: (amount: number) => void;
  triggerAchievement: (id: string) => void;
}

export default function DictionarySection({ currentLang, t, addCoin, addXP, triggerAchievement }: DictionarySectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const categories = ['All', 'Food', 'Business', 'Travel', 'Family', 'Cars', 'Oil & Gas', 'Medicine', 'Technology', 'Islamic Terminology'];

  const handlePlaySound = (text: string) => {
    setPlayingWord(text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onend = () => setPlayingWord(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingWord(null), 1000);
    }
    // Gaining coins & XP upon listening!
    addCoin(1);
    addXP(5);
    triggerAchievement('first_word');
  };

  const filteredWords = dictionaryData.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transcription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translations[currentLang].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8" id="dictionary-module">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
          {t.dictTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {t.dictSubtitle}
        </p>
      </div>

      {/* Control Bar: Search and Category Slider */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-11 pr-5 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-slate-100 transition-all shadow-sm"
            />
          </div>

          {/* Quick stats */}
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            Showing {filteredWords.length} of {dictionaryData.length} premium terms
          </div>
        </div>

        {/* Categories Pills Container */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/15'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dictionary Cards Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredWords.map((word) => (
            <motion.div
              layout
              key={word.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/20 dark:hover:border-emerald-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-500/10">
                    {word.category}
                  </span>
                  <button
                    onClick={() => handlePlaySound(word.word)}
                    className={`p-2.5 rounded-full border transition-all ${
                      playingWord === word.word
                        ? 'bg-amber-500 text-white border-amber-500 scale-90'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary word display */}
                <div className="space-y-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-wide block font-sans" dir="rtl">
                    {word.word}
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">
                    [{word.transcription}]
                  </span>
                  <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mt-1">
                    {word.translations[currentLang]}
                  </h4>
                </div>

                {/* Example sentence */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100/50 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Contextual Example</span>
                  <span className="text-base text-slate-800 dark:text-slate-200 block text-right font-sans leading-relaxed" dir="rtl">
                    {word.exampleAr}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 block">
                    {word.exampleTranscription}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 block italic leading-relaxed">
                    "{word.exampleTranslations[currentLang]}"
                  </span>
                </div>
              </div>

              {/* Bottom Card Ribbon */}
              <div className="bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600/60" />
                  Classic Fusha MSA
                </span>
                <span className="font-mono text-[10px]">Gain +5 XP</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredWords.length === 0 && (
          <div className="col-span-full bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-800 space-y-4">
            <Layers className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">No premium words match your search</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
              Try adjusting your search criteria or selecting another category from the slider options.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
