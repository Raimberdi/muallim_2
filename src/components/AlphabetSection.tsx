import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { alphabetData } from '../data/alphabet';
import { Language, TranslationSet } from '../types';
import { Volume2, Play, ChevronRight, PenTool } from 'lucide-react';

interface AlphabetSectionProps {
  currentLang: Language;
  t: TranslationSet;
}

export default function AlphabetSection({ currentLang, t }: AlphabetSectionProps) {
  const [selectedLetter, setSelectedLetter] = useState(alphabetData[0]);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const simulateAudioPlay = (text: string) => {
    setPlayingAudio(text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.75;
      utterance.onend = () => setPlayingAudio(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingAudio(null), 1200);
    }
  };

  return (
    <div className="space-y-8" id="alphabet-module">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
          {t.alphabetTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {t.alphabetSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Letters Grid */}
        <div className="lg:col-span-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm h-fit">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {alphabetData.map((item) => (
              <button
                key={item.letter}
                id={`letter-btn-${item.letter}`}
                onClick={() => {
                  setSelectedLetter(item);
                  setActiveStep(0);
                }}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl border text-2xl font-bold transition-all relative overflow-hidden ${
                  selectedLetter.letter === item.letter
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500'
                }`}
              >
                <span className="text-3xl mb-1">{item.letter}</span>
                <span className="text-xs font-mono font-medium opacity-85">
                  {item.name[currentLang]}
                </span>
                {selectedLetter.letter === item.letter && (
                  <motion.div
                    layoutId="active-letter-glow"
                    className="absolute inset-0 bg-emerald-500/10 pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Details & Interactive Studio */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLetter.letter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-md space-y-8"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div>
                  <h3 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    {selectedLetter.letter}
                    <span className="text-xl font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                      / {selectedLetter.name[currentLang]} /
                    </span>
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Pronunciation sound: <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-emerald-600">{selectedLetter.sound}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    id="listen-letter-btn"
                    onClick={() => simulateAudioPlay(selectedLetter.letter)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                      playingAudio === selectedLetter.letter
                        ? 'bg-amber-500 text-white scale-95 shadow-md shadow-amber-500/20'
                        : 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${playingAudio === selectedLetter.letter ? 'animate-bounce' : ''}`} />
                    Listen Pronunciation
                  </button>
                </div>
              </div>

              {/* Positions Grid */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">Letter Positions</h4>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Isolated", form: selectedLetter.isolated },
                    { label: "Initial", form: selectedLetter.initial },
                    { label: "Medial", form: selectedLetter.medial },
                    { label: "Final", form: selectedLetter.final }
                  ].map((pos, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-center border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-all">
                      <span className="text-2xl font-bold text-slate-800 dark:text-white block mb-1">{pos.form}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">{pos.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Writing Animation */}
              <div className="bg-gradient-to-tr from-emerald-50/50 to-amber-50/50 dark:from-emerald-950/20 dark:to-amber-950/10 rounded-2xl p-6 border border-emerald-500/10 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-semibold">
                  <PenTool className="w-5 h-5 text-emerald-600" />
                  <span>Interactive Writing Steps</span>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center border border-slate-100 dark:border-slate-700 shadow-inner flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden">
                  <span className="absolute top-2 left-3 text-[10px] uppercase font-mono tracking-wider text-slate-400">writing stroke board</span>
                  <motion.div 
                    key={activeStep}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white py-4 relative"
                  >
                    {selectedLetter.letter}
                    <span className="absolute -top-1 -right-4 bg-emerald-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-mono">
                      {activeStep + 1}
                    </span>
                  </motion.div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed mt-2">
                    {selectedLetter.writingSteps[activeStep]}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1">
                    {selectedLetter.writingSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          activeStep === i ? 'bg-emerald-600 w-6' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % selectedLetter.writingSteps.length)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    Next Step <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Context Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                {/* Example Word */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Example Word</h4>
                  <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 block">{selectedLetter.exampleWord}</span>
                      <span className="text-xs font-mono text-slate-500 block mt-1">{selectedLetter.exampleWordTranscription}</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 block">
                        {selectedLetter.exampleWordTranslation[currentLang]}
                      </span>
                    </div>
                    <button
                      onClick={() => simulateAudioPlay(selectedLetter.exampleWord)}
                      className="p-3 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 hover:bg-emerald-50 text-emerald-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Example Sentence */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Example Sentence</h4>
                  <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 block text-right font-sans" dir="rtl">{selectedLetter.exampleSentenceAr}</span>
                      <span className="text-[11px] font-mono text-slate-500 block mt-1">{selectedLetter.exampleSentenceTranscription}</span>
                      <span className="text-xs text-slate-700 dark:text-slate-300 mt-1 block leading-relaxed">
                        {selectedLetter.exampleSentenceTranslation[currentLang]}
                      </span>
                    </div>
                    <button
                      onClick={() => simulateAudioPlay(selectedLetter.exampleSentenceAr)}
                      className="p-3 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 hover:bg-emerald-50 text-emerald-600 self-end md:self-center"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
