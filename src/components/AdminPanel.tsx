import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language, TranslationSet } from '../types';
import { Settings, Users, BookOpen, FileText, DollarSign, Send, Plus, CheckCircle, BellRing, Sparkles } from 'lucide-react';

interface AdminPanelProps {
  currentLang: Language;
  t: TranslationSet;
}

interface MetricSet {
  totalStudents: number;
  activeToday: number;
  homeworksPending: number;
  revenueThisMonth: string;
  dictionaryWordsCount: number;
  notificationsSent: number;
}

export default function AdminPanel({ currentLang, t }: AdminPanelProps) {
  const [metrics, setMetrics] = useState<MetricSet | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [homeworks, setHomeworks] = useState<any[]>([]);
  
  // Custom word builder state
  const [newWord, setNewWord] = useState('');
  const [newTranscription, setNewTranscription] = useState('');
  const [newCategory, setNewCategory] = useState('Business');
  const [newTranslationEn, setNewTranslationEn] = useState('');
  const [newTranslationRu, setNewTranslationRu] = useState('');
  const [newTranslationKy, setNewTranslationKy] = useState('');
  
  // Custom grading states
  const [selectedHwId, setSelectedHwId] = useState<string | null>(null);
  const [hwGrade, setHwGrade] = useState('Excellent (5/5)');

  // Broadcast system message
  const [sysNotice, setSysNotice] = useState('');
  const [noticeSent, setNoticeSent] = useState(false);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const mRes = await fetch('/api/admin/metrics');
      const mData = await mRes.json();
      setMetrics(mData);

      const sRes = await fetch('/api/admin/students');
      const sData = await sRes.json();
      setStudents(sData);

      const hRes = await fetch('/api/admin/homeworks');
      const hData = await hRes.json();
      setHomeworks(hData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGradeHomework = async (hwId: string) => {
    try {
      const response = await fetch(`/api/admin/homeworks/${hwId}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: hwGrade,
          status: "Approved"
        })
      });
      if (response.ok) {
        setHomeworks(prev => prev.map(h => h.id === hwId ? { ...h, status: "Approved", grade: hwGrade } : h));
        setSelectedHwId(null);
        // Refresh metrics count
        if (metrics) {
          setMetrics({ ...metrics, homeworksPending: Math.max(0, metrics.homeworksPending - 1) });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleInjectWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord || !newTranscription) return;

    try {
      const response = await fetch('/api/admin/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: newWord,
          transcription: newTranscription,
          category: newCategory,
          translations: {
            en: newTranslationEn || newWord,
            ru: newTranslationRu || newWord,
            ky: newTranslationKy || newWord,
            ar: newWord
          }
        })
      });
      if (response.ok) {
        // Reset
        setNewWord('');
        setNewTranscription('');
        setNewTranslationEn('');
        setNewTranslationRu('');
        setNewTranslationKy('');
        alert("Word added successfully to Muallim Fusha database!");
        if (metrics) {
          setMetrics({ ...metrics, dictionaryWordsCount: metrics.dictionaryWordsCount + 1 });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBroadcastNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sysNotice.trim()) return;

    setNoticeSent(true);
    setSysNotice('');
    setTimeout(() => {
      setNoticeSent(false);
      if (metrics) {
        setMetrics({ ...metrics, notificationsSent: metrics.notificationsSent + 1 });
      }
    }, 2000);
  };

  return (
    <div className="space-y-8" id="admin-module">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
          {t.adminTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {t.adminSubtitle}
        </p>
      </div>

      {/* Metrics Row */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Enrolled Students", value: metrics.totalStudents, icon: Users, color: "text-blue-500" },
            { label: "Vocabulary Database", value: metrics.dictionaryWordsCount, icon: BookOpen, color: "text-emerald-500" },
            { label: "Pending Homeworks", value: metrics.homeworksPending, icon: FileText, color: "text-amber-500" },
            { label: "Platform Revenue", value: metrics.revenueThisMonth, icon: DollarSign, color: "text-purple-500" },
          ].map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className={`p-3 bg-slate-50 dark:bg-slate-800 rounded-xl ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider">{card.label}</span>
                <span className="block text-xl font-bold text-slate-950 dark:text-white mt-0.5">{card.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Homework Review & Grading Center */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Interactive Homework Review Dashboard
            </h3>

            <div className="space-y-4">
              {homeworks.map((hw) => (
                <div key={hw.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-100 block">{hw.studentName}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{hw.lessonTitle}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold ${
                      hw.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {hw.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 italic font-sans border-l-2 border-emerald-500 pl-3">
                    "{hw.content}"
                  </p>

                  {hw.status === "Pending" ? (
                    <div>
                      {selectedHwId === hw.id ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={hwGrade}
                            onChange={(e) => setHwGrade(e.target.value)}
                            className="bg-white dark:bg-slate-800 border rounded px-2.5 py-1 text-xs"
                          />
                          <button
                            onClick={() => handleGradeHomework(hw.id)}
                            className="bg-emerald-600 text-white px-3 py-1 rounded text-[10px] font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedHwId(hw.id);
                            setHwGrade('Excellent (5/5)');
                          }}
                          className="bg-slate-950 dark:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-[10px] font-bold hover:bg-slate-800"
                        >
                          Review & Grade
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 w-fit px-2 py-0.5 rounded">
                      Graded: {hw.grade}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dictionary Word Injector & Broadcast center */}
        <div className="lg:col-span-4 space-y-6">
          {/* Word Injector */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Plus className="w-5 h-5 text-emerald-600" />
              Inject Vocabulary Card
            </h3>

            <form onSubmit={handleInjectWord} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-mono">Arabic Word (with harakat)</label>
                <input
                  type="text"
                  required
                  placeholder="مَكْتَبَة"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs border rounded-lg px-3 py-2 text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-mono">Latin Transcription</label>
                <input
                  type="text"
                  required
                  placeholder="Maktabah"
                  value={newTranscription}
                  onChange={(e) => setNewTranscription(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs border rounded-lg px-3 py-2 text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-mono">Industry/Theme</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs border rounded-lg px-3 py-2 text-slate-800 dark:text-white"
                >
                  <option>Business</option>
                  <option>Technology</option>
                  <option>Medicine</option>
                  <option>Oil & Gas</option>
                  <option>Travel</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Translation (RU)"
                  value={newTranslationRu}
                  onChange={(e) => setNewTranslationRu(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 text-[10px] border rounded-lg px-2 py-1.5 text-slate-800 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Translation (KY)"
                  value={newTranslationKy}
                  onChange={(e) => setNewTranslationKy(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 text-[10px] border rounded-lg px-2 py-1.5 text-slate-800 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs"
              >
                Inject Word Card
              </button>
            </form>
          </div>

          {/* Broadcast Center */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <BellRing className="w-5 h-5 text-emerald-600" />
              Platform Broadcast
            </h3>

            <form onSubmit={handleBroadcastNotice} className="space-y-3">
              <textarea
                placeholder="Alert all students: Special group Fusha conversation this Sunday at 18:00!"
                value={sysNotice}
                onChange={(e) => setSysNotice(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 dark:bg-slate-800 text-xs border rounded-lg p-3 text-slate-800 dark:text-white"
              />

              <button
                type="submit"
                disabled={noticeSent}
                className="w-full bg-slate-950 dark:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                {noticeSent ? "Broadcasting message..." : "Broadcast Notice"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
