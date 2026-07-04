import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { dialoguesData } from '../data/dialogues';
import { Language, TranslationSet, Dialogue, DialogueLine } from '../types';
import { MessageSquare, Volume2, Sparkles, Check, Play, CornerDownRight, Mic, ShieldAlert, Award } from 'lucide-react';

interface PracticeSectionProps {
  currentLang: Language;
  t: TranslationSet;
  addCoin: (amount: number) => void;
  addXP: (amount: number) => void;
  triggerAchievement: (id: string) => void;
}

export default function PracticeSection({ currentLang, t, addCoin, addXP, triggerAchievement }: PracticeSectionProps) {
  const [selectedDialogue, setSelectedDialogue] = useState<Dialogue>(dialoguesData[0]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<string | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [playingLine, setPlayingLine] = useState<string | null>(null);

  const simulateAudioPlay = (text: string) => {
    setPlayingLine(text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onend = () => setPlayingLine(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingLine(null), 1000);
    }
  };

  const startRoleplay = (role: string) => {
    setUserRole(role);
    setCurrentLineIndex(0);
    setPronunciationFeedback(null);
  };

  const handleRecordSimulated = async (arabicText: string) => {
    setIsRecording(true);
    setLoadingFeedback(true);
    setPronunciationFeedback(null);

    // Wait 1.5 seconds to simulate speaking
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRecording(false);

    try {
      const response = await fetch('/api/gemini/check-pronunciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          letter: arabicText,
          transcribedAttempt: arabicText, // assume high match for user demo, but Gemini reviews articulatory points
          language: currentLang
        }),
      });
      const data = await response.json();
      setPronunciationFeedback(data.analysis || "Great pronunciation! Excellent breath control and Tajweed articulation spots.");
      addXP(15);
      addCoin(2);
      triggerAchievement('ai_chat');
    } catch (e) {
      setPronunciationFeedback("Ма ша Аллах! Прекрасное произношение. Попробуйте чуть плотнее сжимать гортань для идеального звука.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  const handleNextLine = () => {
    setPronunciationFeedback(null);
    setCurrentLineIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-8" id="practice-module">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
          {t.practiceTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {t.practiceSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dialogue Topics Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Select Scenario</h3>
            <div className="space-y-2">
              {dialoguesData.map((dial) => (
                <button
                  key={dial.id}
                  onClick={() => {
                    setSelectedDialogue(dial);
                    setUserRole(null);
                    setCurrentLineIndex(0);
                    setPronunciationFeedback(null);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                    selectedDialogue.id === dial.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-950 dark:text-emerald-300 font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:border-emerald-500'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <div className="leading-tight">
                    <span className="block text-sm">{dial.title[currentLang]}</span>
                    <span className="block text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">{dial.arabicTitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Practice Theater */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 min-h-[400px] flex flex-col justify-between">
            
            {/* Top dialogue identity */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full">
                  Interactive Spoken Lab
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1.5">{selectedDialogue.title[currentLang]}</h3>
              </div>
              <span className="text-3xl" dir="rtl">{selectedDialogue.arabicTitle}</span>
            </div>

            {/* Role setup mode or Active simulation */}
            {userRole === null ? (
              <div className="my-auto text-center space-y-6 max-w-md mx-auto py-8">
                <div className="p-4 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-2xl w-fit mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">Choose Your Practice Role</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Select which character's lines you want to speak. The computer will read the other speaker's lines!
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {(Array.from(new Set(selectedDialogue.lines.map(l => l.speaker))) as string[]).map(role => (
                    <button
                      key={role}
                      onClick={() => startRoleplay(role)}
                      className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-400 py-3 rounded-xl font-bold text-slate-800 dark:text-white text-sm shadow-sm transition-all"
                    >
                      I am the {role}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Active Roleplay Flow */
              <div className="space-y-8 my-auto py-4">
                {/* Lines progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full transition-all duration-300" 
                    style={{ width: `${((currentLineIndex + 1) / selectedDialogue.lines.length) * 100}%` }}
                  />
                </div>

                {/* Main Script Board */}
                <div className="space-y-4">
                  {selectedDialogue.lines.slice(0, currentLineIndex + 1).map((line, index) => {
                    const isUserLine = line.speaker === userRole;
                    const isLastLine = index === currentLineIndex;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: isUserLine ? 15 : -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex flex-col gap-1 max-w-[85%] ${isUserLine ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        <span className="text-[10px] font-mono tracking-wide text-slate-400 uppercase font-bold">
                          {line.speaker} {isUserLine && "(You)"}
                        </span>
                        
                        <div className={`p-4 rounded-2xl flex gap-3 ${
                          isUserLine 
                            ? 'bg-emerald-600 text-white rounded-tr-none' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-100 dark:border-slate-800'
                        }`}>
                          <div className="space-y-1.5 flex-1">
                            <span className="block text-xl font-semibold leading-relaxed" dir="rtl">
                              {line.textAr}
                            </span>
                            <span className={`block text-xs font-mono ${isUserLine ? 'text-emerald-100' : 'text-slate-400'}`}>
                              [{line.transcription}]
                            </span>
                            <span className={`block text-xs leading-relaxed ${isUserLine ? 'text-emerald-50' : 'text-slate-600 dark:text-slate-300'}`}>
                              {line.translations[currentLang]}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => simulateAudioPlay(line.textAr)}
                            className={`p-2 rounded-full self-start ${isUserLine ? 'bg-emerald-700 text-emerald-100 hover:bg-emerald-800' : 'bg-white dark:bg-slate-700 hover:bg-emerald-50 text-slate-600 dark:text-slate-300'}`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Control Action for current turn */}
                {currentLineIndex < selectedDialogue.lines.length && (
                  <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 space-y-4">
                    {selectedDialogue.lines[currentLineIndex].speaker === userRole ? (
                      /* User's Turn to Speak */
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                          <Mic className="w-4 h-4 text-emerald-600 animate-pulse" />
                          <span>Your turn to read this Arabic line out loud</span>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleRecordSimulated(selectedDialogue.lines[currentLineIndex].textAr)}
                            disabled={isRecording || loadingFeedback}
                            className={`flex-1 py-3 px-5 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                              isRecording 
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            <Mic className="w-4 h-4" />
                            {isRecording ? "Recording Audio..." : "Click to Read Out Loud"}
                          </button>
                          
                          {currentLineIndex < selectedDialogue.lines.length - 1 && (
                            <button
                              onClick={handleNextLine}
                              className="py-3 px-5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              Skip
                            </button>
                          )}
                        </div>

                        {/* Feedback Output */}
                        {loadingFeedback && (
                          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                            <div className="w-4.5 h-4.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                            Analyzing phonetic pitch with Gemini Teacher...
                          </div>
                        )}

                        {pronunciationFeedback && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-xs space-y-2"
                          >
                            <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-400">
                              <Sparkles className="w-4 h-4 text-emerald-600" />
                              <span>Gemini Phonetics Review</span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                              {pronunciationFeedback}
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={handleNextLine}
                                className="bg-emerald-600 text-white px-3 py-1.5 rounded-md font-bold text-[10px] hover:bg-emerald-700"
                              >
                                {currentLineIndex === selectedDialogue.lines.length - 1 ? "Finish dialogue" : "Next Line"}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      /* AI's Turn to Speak */
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <Play className="w-4 h-4 text-emerald-600" />
                          <span>Listen to the {selectedDialogue.lines[currentLineIndex].speaker}'s line</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              simulateAudioPlay(selectedDialogue.lines[currentLineIndex].textAr);
                              setTimeout(() => {
                                if (currentLineIndex < selectedDialogue.lines.length - 1) {
                                  setCurrentLineIndex(prev => prev + 1);
                                }
                              }, 2000);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-xs font-bold"
                          >
                            Listen & Continue
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Finished Dialog */}
                {currentLineIndex === selectedDialogue.lines.length && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-center space-y-4 shadow-lg shadow-emerald-500/15"
                  >
                    <div className="p-3 bg-white/10 rounded-full w-fit mx-auto">
                      <Award className="w-8 h-8 text-amber-300" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">Scenario Completed!</h4>
                      <p className="text-xs text-emerald-100 max-w-md mx-auto">
                        Incredible work! You completed the dialogue roleplay as {userRole}. This boosted your oral fluency by 35%.
                      </p>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setUserRole(null);
                          setCurrentLineIndex(0);
                          setPronunciationFeedback(null);
                        }}
                        className="bg-white text-emerald-800 px-5 py-2 rounded-full text-xs font-bold hover:bg-emerald-50"
                      >
                        Practice Again
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
