import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TranslationSet } from '../types';
import { Send, Bot, User, Trash2, X, MessageSquare, Sparkles, ChevronDown, RefreshCw, HelpCircle } from 'lucide-react';

interface FloatingChatbotProps {
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

export default function FloatingChatbot({ currentLang, t, addCoin, addXP, triggerAchievement }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat when component mounts or language changes (if empty)
  useEffect(() => {
    if (messages.length === 0) {
      const getWelcomeMessage = () => {
        switch (currentLang) {
          case 'ru':
            return "Ас-саляму алейкум! Я твой виртуальный ассистент MUALLIM. Я могу переводить слова, объяснять правила грамматики и помогать с произношением. Задай мне любой вопрос!";
          case 'ky':
            return "Ассалому алейкум! Мен сенин виртуалдык жардамчың MUALLIM болом. Мен сөздөрдү которуп, грамматика эрежелерин түшүндүрүп жана туура айтылышына көмөктөшөм. Каалаган сурооңду бер!";
          default:
            return "As-salamu 'alaykum! I am your virtual MUALLIM assistant. I can translate terms, clarify complex grammar rules, and give you language advice. Ask me anything!";
        }
      };

      setMessages([
        {
          id: 'welcome_init',
          sender: 'bot',
          text: getWelcomeMessage(),
        }
      ]);
    }
  }, [currentLang, messages.length]);

  // Keep unread count updated when closed and bot sends a message
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Auto-scroll to the bottom of the chat box
  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle suggestions based on selected language
  const getSuggestions = () => {
    const suggestions: Record<Language, { label: string; prompt: string }[]> = {
      ru: [
        { label: "Как дела?", prompt: "Как спросить 'Как дела?' на арабском и как ответить?" },
        { label: "Объясни хамзу ʔ", prompt: "Объясни, пожалуйста, что такое буква Хамза и как она читается." },
        { label: "Переведи 'Книга'", prompt: "Как переводится слово 'Книга' на арабский с огласовками и транскрипцией?" },
        { label: "Пожелание мира", prompt: "Объясни фразу 'Ас-саляму алейкум ва рахматуллахи ва баракатух'." }
      ],
      ky: [
        { label: "Кандайсың?", prompt: "Араб тилинде 'Кандайсың?' деп кантип сурайт жана кантип жооп берет?" },
        { label: "Хамзаны түшүндүр ʔ", prompt: "Хамза тамгасы деген эмне жана ал кандайча окулат?" },
        { label: "'Китеп' котормосу", prompt: "'Китеп' сөзүн араб тилине харакаттары жана транскрипциясы менен которуп берчи." },
        { label: "Тынчтык каалоо", prompt: "'Ассалому алейкум ва рахматуллоохи ва баракатух' сөзүнүн маанисин чечмелеп берчи." }
      ],
      en: [
        { label: "How are you?", prompt: "How do you ask 'How are you?' in Arabic and how to reply?" },
        { label: "Explain Hamza ʔ", prompt: "Explain what the Hamza letter is and how to pronounce it in different positions." },
        { label: "Translate 'Book'", prompt: "What is the Arabic word for 'Book' with harakat and Latin transcription?" },
        { label: "Greeting meaning", prompt: "Explain the full meaning and breakdown of 'As-salamu 'alaykum'." }
      ],
      ar: [
        { label: "How are you?", prompt: "How do you ask 'How are you?' in Arabic and how to reply?" },
        { label: "Explain Hamza ʔ", prompt: "Explain what the Hamza letter is and how to pronounce it in different positions." },
        { label: "Translate 'Book'", prompt: "What is the Arabic word for 'Book' with harakat and Latin transcription?" },
        { label: "Greeting meaning", prompt: "Explain the full meaning and breakdown of 'As-salamu 'alaykum'." }
      ]
    };
    return suggestions[currentLang] || suggestions['ru'];
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: `u_${Date.now()}`, sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: currentLang,
          systemInstruction: `You are MUALLIM (مُعَلِّم) chatbot assistant, accessible everywhere in the web app. 
          Provide friendly, brief, and highly direct replies. Keep explanations concise so they fit perfectly in a small floating chat window.
          Use Russian for explanations if language is 'ru', Kyrgyz if language is 'ky', and English for others.
          Always write Arabic terms with full vocalization (Tashkeel/harakat) and standard Latin transcription.`
        }),
      });

      const data = await response.json();
      const botMsg: Message = { 
        id: `b_${Date.now()}`, 
        sender: 'bot', 
        text: data.text || data.fallbackText || "Apologies, I couldn't reach the server. Let's practice vocabulary!" 
      };

      setMessages(prev => [...prev, botMsg]);

      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }

      // Small reward for interacting with the floating helper
      addXP(5);
      addCoin(1);
      triggerAchievement('floating_chat');
    } catch (e) {
      const fallbackMsg: Message = {
        id: `b_err_${Date.now()}`,
        sender: 'bot',
        text: currentLang === 'ru'
          ? "Простите, мой узел размышлений временно недоступен. Давайте повторим буквы арабского алфавита!"
          : currentLang === 'ky'
          ? "Кечириңиз, менин байланыш каналым убактылуу иштебей жатат. Келиңиз, араб алфавитинин тамгаларын кайталайлы!"
          : "Pardon me, my API connection is temporarily sleeping. Let's practice Alif-Baa characters in the Alphabet tab!"
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    const welcome = messages.find(m => m.id === 'welcome_init');
    setMessages(welcome ? [welcome] : []);
  };

  return (
    <>
      {/* 1. FLOATING ACTION BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              id="floating-chat-trigger"
              layoutId="chatbot-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative p-4 bg-gradient-to-tr from-emerald-600 via-emerald-700 to-emerald-800 text-white rounded-full shadow-2xl border-2 border-amber-400 flex items-center justify-center cursor-pointer group"
              title="Chat with MUALLIM Assistant"
            >
              <Bot className="w-6 h-6 animate-pulse" />
              
              {/* Pulsing indicator ring */}
              <span className="absolute -inset-0.5 rounded-full border border-emerald-500 animate-ping opacity-30" />
              
              {/* Sparkles element */}
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 p-0.5 rounded-full text-[8px] font-bold">
                <Sparkles className="w-3 h-3 text-emerald-950" />
              </span>

              {/* Unread count notification */}
              {unreadCount > 0 && (
                <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* 2. CHATBOT WINDOW PANEL */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layoutId="chatbot-container"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="w-80 sm:w-96 h-[480px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col relative z-50"
            >
              {/* Luxury brand border strip */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600" />

              {/* Header section */}
              <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-xl shadow-inner relative">
                    <Bot className="w-4.5 h-4.5" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white dark:border-slate-900" />
                  </div>
                  <div>
                    <span className="block font-serif text-sm font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1 leading-tight">
                      Muallim Companion
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </span>
                    <span className="block text-[9px] text-slate-400 uppercase font-mono font-bold">
                      {currentLang === 'ru' ? 'AI-Ассистент 24/7' : currentLang === 'ky' ? 'ЖИ-Жардамчы 24/7' : 'AI Companion 24/7'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={clearHistory}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable conversation area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/30 dark:bg-slate-950/20">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                    >
                      <div className={`p-1.5 rounded-lg self-start ${isBot ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-emerald-600 text-white'}`}>
                        {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                      </div>

                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isBot
                          ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-800/80 shadow-sm'
                          : 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                      }`}>
                        <p className="whitespace-pre-line font-sans">{msg.text}</p>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Live formulating typing effect */}
                {isTyping && (
                  <div className="flex gap-2 max-w-[85%] mr-auto">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 self-start animate-bounce">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800/80 rounded-2xl rounded-tl-none p-3 text-[10px] font-mono text-slate-400 flex items-center gap-2 shadow-sm">
                      <span className="flex gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse delay-75" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse delay-150" />
                      </span>
                      {currentLang === 'ru' ? 'Сочиняю ответ...' : currentLang === 'ky' ? 'Жооп даярдалууда...' : 'Translating explanation...'}
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>

              {/* Quick Suggestion chips */}
              <div className="px-3.5 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth bg-white dark:bg-slate-900">
                {getSuggestions().map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(s.prompt)}
                    className="flex-shrink-0 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/60 dark:hover:bg-emerald-950/30 text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/20 px-2.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Chat typing input form */}
              <div className="p-3 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputMessage);
                  }}
                  className="flex-1 flex gap-2"
                >
                  <input
                    type="text"
                    required
                    placeholder={
                      currentLang === 'ru' 
                        ? "Перевод, правила, правописание..." 
                        : currentLang === 'ky' 
                        ? "Котормо, эрежелер, жазуу..." 
                        : "Translations, grammar, spelling..."
                    }
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
