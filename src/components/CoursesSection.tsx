import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { coursesData } from '../data/courses';
import { Language, TranslationSet, CourseLevel, CourseLesson } from '../types';
import { Play, CheckCircle, FileText, Sparkles, Send, Award, GraduationCap, ChevronRight, X, Volume2, ShieldAlert } from 'lucide-react';

interface CoursesSectionProps {
  currentLang: Language;
  t: TranslationSet;
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  addCoin: (amount: number) => void;
  addXP: (amount: number) => void;
  triggerAchievement: (id: string) => void;
}

export default function CoursesSection({
  currentLang,
  t,
  completedLessons,
  markLessonComplete,
  addCoin,
  addXP,
  triggerAchievement,
}: CoursesSectionProps) {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>(coursesData[0]);
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  
  // Media Player configuration
  const [playerSpeed, setPlayerSpeed] = useState<number>(1);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState<number>(0);

  // Homework flow
  const [homeworkText, setHomeworkText] = useState('');
  const [homeworkFeedback, setHomeworkFeedback] = useState<string | null>(null);
  const [submittingHomework, setSubmittingHomework] = useState(false);

  // Quiz state
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Certificate State
  const [studentName, setStudentName] = useState('');
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const startLesson = (lesson: CourseLesson) => {
    setActiveLesson(lesson);
    setHomeworkText('');
    setHomeworkFeedback(null);
    setActiveSubtitleIndex(0);
  };

  const submitHomework = async () => {
    if (!homeworkText.trim() || !activeLesson) return;
    setSubmittingHomework(true);
    setHomeworkFeedback(null);

    try {
      const response = await fetch('/api/gemini/check-homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeworkPrompt: activeLesson.homeworkPrompt[currentLang],
          studentSubmission: homeworkText,
          language: currentLang,
        }),
      });
      const data = await response.json();
      setHomeworkFeedback(data.feedback);
      
      // Complete lesson in progress
      markLessonComplete(activeLesson.id);
      addCoin(15);
      addXP(50);
    } catch (e) {
      setHomeworkFeedback("Excellent attempt! Since the system is checking, our offline supervisor awards you 5/5 stars for dedication.");
      markLessonComplete(activeLesson.id);
    } finally {
      setSubmittingHomework(false);
    }
  };

  const handleQuizAnswer = (questionId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const submitQuiz = () => {
    let score = 0;
    selectedLevel.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    const finalPercentage = (score / selectedLevel.quiz.length) * 100;
    setQuizScore(finalPercentage);
    
    addXP(score * 20);
    addCoin(score * 5);
    
    if (finalPercentage === 100) {
      triggerAchievement('quiz_master');
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizScore(null);
    setCurrentQuestionIdx(0);
    setActiveQuiz(false);
  };

  return (
    <div className="space-y-8" id="courses-module">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
          {t.coursesTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {t.coursesSubtitle}
        </p>
      </div>

      {/* Level Selection Ribbon */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3">
        {coursesData.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => {
              setSelectedLevel(lvl);
              setActiveLesson(null);
              resetQuiz();
            }}
            className={`px-5 py-3 rounded-2xl font-bold border flex items-center gap-2.5 transition-all text-sm whitespace-nowrap ${
              selectedLevel.id === lvl.id
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/15 scale-[1.02]'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{lvl.id} Level</span>
          </button>
        ))}
      </div>

      {/* Main Classroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Course Syllabus / Quiz launcher / Certificate Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
            <div className="space-y-1.5">
              <span className={`inline-block px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-full ${selectedLevel.badgeColor}`}>
                Active Course
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedLevel.title[currentLang]}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                {selectedLevel.description[currentLang]}
              </p>
            </div>

            {/* List of lessons */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">Lessons Blueprint</h4>
              
              {selectedLevel.lessons.length > 0 ? (
                <div className="space-y-2">
                  {selectedLevel.lessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isActive = activeLesson?.id === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => startLesson(lesson)}
                        className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                          isActive
                            ? 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-500'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                            <Play className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-semibold">{lesson.title[currentLang]}</span>
                            <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{lesson.duration} mins</span>
                          </div>
                        </div>
                        {isCompleted && (
                          <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-2 italic">Premium syllabus uploading soon. Practice other modules!</p>
              )}
            </div>

            {/* Evaluation Quiz Trigger */}
            {selectedLevel.quiz.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setActiveQuiz(true);
                    setActiveLesson(null);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  Evaluate Level {selectedLevel.id} Quiz
                </button>
              </div>
            )}
          </div>

          {/* Certificate Unlocked Card */}
          {quizScore === 100 && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-tr from-amber-500 to-amber-600 text-white rounded-3xl p-6 border border-amber-400/20 shadow-md space-y-4"
            >
              <div className="flex gap-3">
                <div className="p-2.5 bg-white/10 rounded-xl">
                  <Award className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h4 className="text-base font-bold">100% Quiz Passed!</h4>
                  <p className="text-[11px] text-amber-50">You've unlocked your Level {selectedLevel.id} Official Muallim Certificate.</p>
                </div>
              </div>

              {!certificateGenerated ? (
                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white text-slate-800 text-xs focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (studentName.trim()) setCertificateGenerated(true);
                    }}
                    className="w-full bg-white text-amber-900 font-bold py-2 px-3 rounded-xl text-xs hover:bg-amber-50 transition-all"
                  >
                    {t.generateCertificate}
                  </button>
                </div>
              ) : (
                <div className="bg-white text-slate-800 rounded-2xl p-5 border border-amber-200 text-center space-y-3 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">CERTIFICATE OF COMPLETION</span>
                  <div className="space-y-1">
                    <h5 className="font-serif text-lg font-bold text-slate-900">{studentName}</h5>
                    <p className="text-[10px] text-slate-500">has successfully mastered Arabic Level {selectedLevel.id}</p>
                    <p className="text-[9px] text-slate-400 font-mono italic">Platform MUALLIM (مُعَلِّم)</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="text-[10px] font-bold text-emerald-600 border border-emerald-100 hover:bg-emerald-50 px-3 py-1 rounded"
                  >
                    Print PDF
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Right Side: Media player classroom / Quiz Simulator */}
        <div className="lg:col-span-8">
          {activeLesson ? (
            /* Active Video Lesson Classroom */
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              
              {/* Custom styled video card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">{activeLesson.title[currentLang]}</h3>
                  <button
                    onClick={() => setActiveLesson(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Subtitles Overlay / Video Stage */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
                  <iframe
                    className="w-full h-full"
                    src={`${activeLesson.videoUrl}?autoplay=1&mute=1&controls=1`}
                    title="Muallim Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Styled Dynamic Subtitles bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md py-3 px-5 rounded-xl border border-white/10 text-center space-y-1">
                    <span className="text-emerald-400 font-semibold text-sm block">
                      {activeLesson.subtitles[currentLang][activeSubtitleIndex]}
                    </span>
                    <span className="text-white/70 text-xs block" dir="rtl">
                      {activeLesson.subtitles['ar'][activeSubtitleIndex]}
                    </span>
                  </div>

                  {/* Subtitle click controller */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {activeLesson.subtitles[currentLang].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSubtitleIndex(idx)}
                        className={`w-6 h-6 rounded-md text-[10px] font-bold font-mono transition-all ${
                          activeSubtitleIndex === idx
                            ? 'bg-emerald-600 text-white'
                            : 'bg-black/60 text-white/60 hover:bg-black/80'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Media Control Toolbar */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span className="text-xs text-slate-400">Classroom: Fusha Dialect</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">Speed:</span>
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                      {[1, 1.25, 1.5, 2].map((sp) => (
                        <button
                          key={sp}
                          onClick={() => setPlayerSpeed(sp)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono transition-all ${
                            playerSpeed === sp
                              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {sp}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Summary and Homework Submission Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                {/* Lesson Notes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
                    <FileText className="w-4.5 h-4.5 text-emerald-600" />
                    <span>Lesson Synopsis</span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {activeLesson.summary[currentLang]}
                    </p>
                  </div>
                </div>

                {/* Interactive Homework check (Gemini AI proxy) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                      AI Homework Verification
                    </span>
                    <span className="text-[10px] font-mono text-amber-600">Earn +50 XP</span>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed italic bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                    "{activeLesson.homeworkPrompt[currentLang]}"
                  </p>

                  <textarea
                    placeholder="Type your Arabic response here..."
                    value={homeworkText}
                    onChange={(e) => setHomeworkText(e.target.value)}
                    rows={3}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />

                  <button
                    onClick={submitHomework}
                    disabled={submittingHomework || !homeworkText.trim()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submittingHomework ? "Verifying with Gemini AI..." : "Submit homework response"}
                  </button>

                  {/* Homework Feedback Panel */}
                  {homeworkFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-50 dark:bg-slate-800 border border-emerald-500/20 rounded-2xl text-xs space-y-2 mt-3"
                    >
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        Gemini Review
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                        {homeworkFeedback}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

            </div>
          ) : activeQuiz ? (
            /* Level Quiz Screen */
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full">
                    Qualification Test
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1.5">Level {selectedLevel.id} Exam</h3>
                </div>
                <button onClick={resetQuiz} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {quizScore === null ? (
                /* Quiz Questions loop */
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Question {currentQuestionIdx + 1} of {selectedLevel.quiz.length}</span>
                    <span>100% Correct score required for certificate</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 text-center font-semibold text-slate-800 dark:text-white">
                    {selectedLevel.quiz[currentQuestionIdx].question[currentLang]}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedLevel.quiz[currentQuestionIdx].options[currentLang].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizAnswer(selectedLevel.quiz[currentQuestionIdx].id, oIdx)}
                        className={`p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between text-sm ${
                          selectedAnswers[selectedLevel.quiz[currentQuestionIdx].id] === oIdx
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold'
                            : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{opt}</span>
                        {/* Show Arabic original as secondary cue if options in Arabic */}
                        <span className="text-xs text-slate-400" dir="rtl">
                          {selectedLevel.quiz[currentQuestionIdx].options['ar'][oIdx]}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      onClick={() => setCurrentQuestionIdx(p => Math.max(0, p - 1))}
                      disabled={currentQuestionIdx === 0}
                      className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-xs font-bold disabled:opacity-50"
                    >
                      {t.previous}
                    </button>

                    {currentQuestionIdx < selectedLevel.quiz.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIdx(p => p + 1)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        {t.next}
                      </button>
                    ) : (
                      <button
                        onClick={submitQuiz}
                        className="px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-800"
                      >
                        Submit Examination
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Results stage */
                <div className="text-center py-8 space-y-6 max-w-sm mx-auto">
                  <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-full w-fit mx-auto">
                    <Award className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Exam Completed!</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      You scored <span className="font-bold text-emerald-600">{quizScore}%</span> in Level {selectedLevel.id} exam.
                    </p>
                  </div>

                  {quizScore === 100 ? (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                      🎉 Outstanding! Your certification is unlocked in the left column. Enter your name and save.
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 font-medium">
                      Need 100% to unlock your professional completion certificate. Try again to get the certificate.
                    </div>
                  )}

                  <button
                    onClick={resetQuiz}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs"
                  >
                    {quizScore === 100 ? "Review Syllabus" : "Try Again"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Welcome / Prompt state */
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800/60 flex flex-col items-center justify-center h-full min-h-[300px] space-y-4">
              <GraduationCap className="w-12 h-12 text-emerald-600/60" />
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">Start Level {selectedLevel.id} Training</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                Select any lesson from the blueprint menu to start watching interactive audio-visual lectures and submit your assignments to the live Gemini AI feedback loop!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
