import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TranslationSet } from '../types';
import { Send, Sparkles, MessageCircleCode, Bot, HelpCircle, ArrowRight, User, Trash2, MessageSquare, Film } from 'lucide-react';
import AIVideoSection from './AIVideoSection';

interface AITeacherSectionProps {
  currentLang: Language;
  t: TranslationSet;
  addCoin: (amount: number) => void;
  addXP: (amount: number) => void;
  triggerAchievement: (id: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function AITeacherSection({ currentLang, t, addCoin, addXP, triggerAchievement }: AITeacherSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m_init",
      sender: 'bot',
      text: currentLang === 'ru' 
        ? "Ас-саляму алейкум! Я твой AI-учитель арабского языка. Как я могу помочь тебе сегодня? Выбери одну из тем ниже или напиши свой вопрос!"
        : currentLang === 'ky'
        ? "Ассалому алейкум! Мен сенин араб тили боюнча жасалма интеллект мугалимиң болом. Бүгүн сага кантип жардам бере алам? Төмөнкү темалардан танда же сурооңду жаз!"
        : "As-salamu 'alaykum! I am your AI Arabic teacher. How can I assist you on your Arabic journey today? Select a task below or write your own question!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiSubTab, setAiSubTab] = useState<'chat' | 'video'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);

  const presets = [
    {
      label: { en: "Explain Grammar", ru: "Объясни грамматику", ky: "Грамматиканы түшүндүр", ar: "شرح القواعد" },
      prompt: {
        en: "Can you explain the difference between nominal (Jumlah Ismiyyah) and verbal (Jumlah Fi'liyyah) sentences with clear examples?",
        ru: "Объясни, пожалуйста, разницу между именным (Джумля Исмимйя) и глагольным (Джумля Фи'лийя) предложениями с примерами.",
        ky: "Араб тилиндеги заттык (Джумля Исмимйя) жана этиштик (Джумля Фи'лийя) сүйлөмдөрдүн айырмасын мисалдар менен түшүндүрүп бере аласызбы?",
        ar: "هل يمكنك شرح الفرق بين الجملة الاسمية والجملة الفعلية مع أمثلة واضحة؟"
      }
    },
    {
      label: { en: "Word Breakdown", ru: "Разбор слова", ky: "Сөздү талдоо", ar: "تحليل الكلمات" },
      prompt: {
        en: "Could you break down the word 'مُعَلِّم' (Muallim) into its root letters and explain its grammatical scale?",
        ru: "Сделай разбор слова 'مُعَلِّم' (Муаллим). Каков его трехбуквенный корень и грамматическая форма?",
        ky: "'مُعَلِّم' (Муаллим) сөзүнүн уңгусун таап, анын жасалуу жолун түшүндүрүп бере аласызбы?",
        ar: "هل يمكنك تحليل كلمة 'مُعَلِّم' وشرح جذرها الثلاثي والوزن الصرفي لها؟"
      }
    },
    {
      label: { en: "Dialogue Practice", ru: "Диалог-практика", ky: "Диалог машыгуусу", ar: "تدريب المحادثة" },
      prompt: {
        en: "Let's roleplay! You are a merchant in a gold bazaar in Dubai, and I am a buyer. Start the conversation with Greetings.",
        ru: "Давай проведем ролевую игру. Ты — торговец золотого рынка в Дубае, а я покупатель. Начни разговор с приветствия.",
        ky: "Ролдук оюн ойнойлу. Сиз Дубайдагы алтын базардын сатуучусусуз, мен кардармын. Маекти саламдашуудан баштаңыз.",
        ar: "دعنا نمارس الحوار! أنت تاجر في سوق الذهب في دبي، وأنا المشتري. ابدأ الحوار بالترحيب والتحية."
      }
    }
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = { id: `u_${Date.now()}`, sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: currentLang,
        }),
      });
      const data = await response.json();
      
      const botMsg: Message = { id: `b_${Date.now()}`, sender: 'bot', text: data.text || data.fallbackText };
      setMessages(prev => [...prev, botMsg]);

      // Boost progress
      addXP(10);
      addCoin(2);
      triggerAchievement('ai_chat');
    } catch (e) {
      const fallbackMsg: Message = {
        id: `b_${Date.now()}`,
        sender: 'bot',
        text: "Ма ша Аллах! Ваша грамматика прекрасна. В настоящее время я перехожу на более высокую ступень понимания. Давайте попрактикуемся в написании букв Alif и Baa!"
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "m_init",
        sender: 'bot',
        text: currentLang === 'ru' 
          ? "Ас-саляму алейкум! Я твой AI-учитель арабского языка. Чем могу помочь?"
          : currentLang === 'ky'
          ? "Ассалому алейкум! Мен сенин араб тили боюнча жасалма интеллект мугалимиң болом. Сага кантип жардам бере алам?"
          : "As-salamu 'alaykum! I am your AI Arabic teacher. How can I assist you today?"
      }
    ]);
  };

  return (
    <div className="space-y-8" id="ai-teacher-module">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-emerald-600 animate-pulse" />
          {t.aiTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {t.aiSubtitle}
        </p>
      </div>

      {/* AI Sub-modules Toggle Switcher */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
          <button
            onClick={() => setAiSubTab('chat')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              aiSubTab === 'chat'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md font-black'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            {currentLang === 'ru' ? 'Чат с AI-Учителем' : currentLang === 'ky' ? 'ИИ-Мугалим менен Маек' : 'Dialogue AI Tutor'}
          </button>
          
          <button
            onClick={() => setAiSubTab('video')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              aiSubTab === 'video'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md font-black'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Film className="w-4 h-4 text-emerald-600" />
            {currentLang === 'ru' ? 'AI-Видеолекции' : currentLang === 'ky' ? 'ИИ-Видеолекциялар' : 'AI Video Lectures'}
            <span className="bg-emerald-500 text-white font-mono text-[8px] px-1.5 py-0.5 rounded-full font-black animate-pulse">NEW</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {aiSubTab === 'chat' ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Presets Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                  <MessageCircleCode className="w-4.5 h-4.5 text-emerald-600" />
                  Quick Practice Presets
                </h3>
                
                <div className="space-y-2.5">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(preset.prompt[currentLang])}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all flex items-center justify-between group"
                    >
                      <span>{preset.label[currentLang]}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">Gemini 3.5 Engine</span>
                  <button
                    onClick={clearChat}
                    className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear History
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Stage */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden flex flex-col h-[550px]">
              {/* Header */}
              <div className="bg-slate-50 dark:bg-slate-800 px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 bg-emerald-600 text-white rounded-xl">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-sm text-slate-800 dark:text-white">Muallim AI Assistant</span>
                  <span className="block text-[10px] text-emerald-600 font-mono">Online 24/7 / Kyrgyz, Ru, En Support</span>
                </div>
              </div>

              {/* Messages Loop */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                    >
                      <div className={`p-2 rounded-xl self-start ${isBot ? 'bg-slate-100 dark:bg-slate-800 text-slate-600' : 'bg-emerald-600 text-white'}`}>
                        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>

                      <div className={`p-4 rounded-2xl leading-relaxed text-sm ${
                        isBot 
                          ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-800' 
                          : 'bg-emerald-600 text-white rounded-tr-none'
                      }`}>
                        {/* Render arabic word lines beautifully inside bot responses */}
                        <p className="whitespace-pre-line font-sans">{msg.text}</p>
                      </div>
                    </motion.div>
                  );
                })}

                {isTyping && (
                  <div className="flex gap-3 max-w-[85%] mr-auto">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 self-start animate-bounce">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs font-mono text-slate-400 flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
                        <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-100" />
                        <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse delay-200" />
                      </div>
                      Muallim is formulating your explanation...
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>

              {/* Form Input */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputMessage);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Ask about conjugation, translation, vocabulary..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition-all disabled:opacity-50"
                  >
                    <Send className="w-4.5 h-4.5" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <AIVideoSection
              currentLang={currentLang}
              t={t}
              addCoin={addCoin}
              addXP={addXP}
              triggerAchievement={triggerAchievement}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
