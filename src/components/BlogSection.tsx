import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogData, instructorInfo } from '../data/blog';
import { Language, TranslationSet } from '../types';
import { FileText, Clock, User, ChevronRight, BookOpen, GraduationCap, Sparkles } from 'lucide-react';

interface BlogSectionProps {
  currentLang: Language;
  t: TranslationSet;
}

export default function BlogSection({ currentLang, t }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState(blogData[0]);

  return (
    <div className="space-y-12" id="blog-module">
      
      {/* Instructor Showcase block (О преподавателе) */}
      <div className="bg-gradient-to-tr from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 items-center relative">
          {/* Avatar / Vector Art wrapper */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/10 border-2 border-amber-500 flex items-center justify-center shadow-lg shrink-0 overflow-hidden relative group">
            <img 
              src="/src/assets/images/ustadh_omar_portrait_1783088567149.jpg" 
              alt="Ustadh Omar Al-Kyrgyzi AI Portrait" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
              <span className="text-[9px] font-mono tracking-wider font-bold text-amber-300 uppercase">AI Scholar</span>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider font-bold bg-amber-500 text-amber-950 px-3 py-1 rounded-full uppercase">
                {t.navAbout}
              </span>
              <h3 className="text-3xl font-bold font-sans mt-2">{instructorInfo.name[currentLang]}</h3>
              <p className="text-emerald-300 text-xs font-semibold font-mono tracking-wide">{instructorInfo.title[currentLang]}</p>
            </div>
            <p className="text-emerald-100/80 text-xs md:text-sm leading-relaxed max-w-2xl font-sans">
              {instructorInfo.bio[currentLang]}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-mono text-emerald-200">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                <GraduationCap className="w-4 h-4 text-amber-400" /> Al-Azhar Graduate
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-400" /> 15+ Yrs Experience
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Blog & Culture space */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
            {t.blogTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
            {t.blogSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Articles List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Latest Insights</h3>
            <div className="space-y-3">
              {blogData.map((post) => (
                <button
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`w-full text-left p-4 rounded-2xl border flex gap-4 transition-all ${
                    selectedPost.id === post.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                    <img src={post.imageUrl} alt="post representation" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wide text-emerald-600 dark:text-emerald-400 font-bold block">
                      {post.category[currentLang]}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {post.title[currentLang]}
                    </h4>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Active Post Reading Room */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPost.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6"
              >
                <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={selectedPost.imageUrl} alt="banner" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-bold text-emerald-600 font-mono uppercase bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded">
                      {selectedPost.category[currentLang]}
                    </span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>By {selectedPost.author}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedPost.title[currentLang]}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                  {selectedPost.content[currentLang]}
                </p>

                {/* Cultural/Calligraphy quote */}
                <div className="border-l-4 border-amber-500 bg-amber-500/5 p-4 rounded-r-2xl font-sans text-xs italic text-slate-500 dark:text-slate-400">
                  "The Arabic language is a canvas of mathematics and fine arts, woven together. Master the roots and you master the heart of Fusha."
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}
