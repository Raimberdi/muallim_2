import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TranslationSet } from '../types';
import { Check, ShieldCheck, Sparkles, Percent, Calendar, HeartHandshake } from 'lucide-react';

interface PricingSectionProps {
  currentLang: Language;
  t: TranslationSet;
  addCoin: (amount: number) => void;
  triggerAchievement: (id: string) => void;
}

export default function PricingSection({ currentLang, t, addCoin, triggerAchievement }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const plans = [
    {
      id: "free",
      name: { en: "Starter Free", ru: "Базовый Старт", ky: "Баштапкы Акысыз", ar: "الباقة المجانية" },
      price: "0",
      period: { en: "forever", ru: "всегда", ky: "түбөлүк", ar: "دائماً" },
      features: {
        en: ["Access A1-A2 alphabet courses", "Basic dictionary search", "1 simulated voice-check per day", "Standard community dashboard"],
        ru: ["Доступ к курсу алфавита A1-A2", "Базовый поиск по словарю", "1 голосовая проверка в день", "Стандартная панель сообщества"],
        ky: ["A1-A2 алфавиттик курсуна кирүү", "Сөздүктөн базалык издөө", "Күнүнө 1 үн текшерүү", "Стандарттык коомчулук панели"],
        ar: ["الوصول لمستويات الحروف أ١ وأ٢", "بحث مجاني في القاموس", "فحص صوتي مجاني واحد يومياً", "لوحة مشاركة مجانية"]
      },
      cta: { en: "Active Starter Plan", ru: "Активный план", ky: "Акысыз баштаңыз", ar: "بدء الباقة المجانية" },
      popular: false,
    },
    {
      id: "premium",
      name: { en: "Muallim Premium", ru: "Премиум Учитель", ky: "Премиум Мугалим", ar: "المعلم الذهبي" },
      price: "19",
      period: { en: "month", ru: "месяц", ky: "айына", ar: "شهرياً" },
      features: {
        en: ["Full A1-C2 complete curriculum", "Uncapped voice check & pronunciation", "Premium dictionary terms access", "24/7 direct Gemini Chat tutoring", "Printable certificate generation"],
        ru: ["Полная программа обучения A1-C2", "Безлимитная проверка произношения", "Доступ ко всем терминам словаря", "24/7 персональный репетитор Gemini", "Генерация печатного сертификата"],
        ky: ["A1-C2 толук окуу программасы", "Чексиз үн жана айтылыш текшерүү", "Сөздүктүн бардык терминдерине кирүү", "24/7 жеке репетитор Gemini", "Басып чыгарууга мүмкүн болгон сертификат"],
        ar: ["المنهاج الشامل من أ١ حتى ج٢", "فحص النطق والتجويد بلا حدود", "الوصول لكافة تصنيفات القاموس", "الدردشة الذكية ٢٤ ساعة يومياً", "شهادة تخرج معتمدة قابلة للطباعة"]
      },
      cta: { en: "Get Premium Access", ru: "Купить Премиум доступ", ky: "Премиум алуу", ar: "الترقية للمستوى الذهبي" },
      popular: true,
    },
    {
      id: "corporate",
      name: { en: "Corporate & Groups", ru: "Корпоративное обучение", ky: "Корпоративдик окутуу", ar: "الباقة المؤسسية" },
      price: "149",
      period: { en: "month", ru: "месяц", ky: "айына", ar: "شهرياً" },
      features: {
        en: ["Up to 15 corporate users", "Individual student metric reports", "Priority homework review from Omar", "Custom API tokens for tracking", "Tailored Islamic & Business modules"],
        ru: ["До 15 корпоративных аккаунтов", "Индивидуальные отчеты по студентам", "Приоритетная проверка работ Омаром", "Кастомные API токены отслеживания", "Специализированные бизнес-модули"],
        ky: ["15 корпоративдик аккаунтка чейин", "Студенттердин жекече отчеттору", "Омар тарабынан биринчи кезекте текшерүү", "Кастомдук API көзөмөлдөө токендери", "Ыңгайлаштырылган бизнес-модулдар"],
        ar: ["باقة مخصصة لـ ١٥ موظفاً", "تقارير تقييم الطلاب الفردية", "أولوية مراجعة الواجبات من الأستاذ عمر", "مفاتيح ربط API خاصة بالشركات", "منهاج خاص بقطاع الأعمال والشركات"]
      },
      cta: { en: "Contact Enterprise Support", ru: "Связаться с поддержкой", ky: "Сурам жөнөтүү", ar: "طلب الباقة المؤسسية" },
      popular: false,
    },
  ];

  const triggerPaySimulation = (planId: string) => {
    setSelectedPlan(planId);
    setCheckoutComplete(false);

    // Simulate payment steps
    setTimeout(() => {
      setCheckoutComplete(true);
      addCoin(100);
      triggerAchievement('first_word');
    }, 2000);
  };

  return (
    <div className="space-y-8" id="pricing-module">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
          {t.pricingTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
          {t.pricingSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white dark:bg-slate-900 rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
              plan.popular 
                ? 'border-emerald-500 shadow-xl shadow-emerald-500/5 md:scale-[1.03] z-10' 
                : 'border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-[10px] uppercase tracking-wider font-bold px-3.5 py-1 rounded-full shadow-md">
                RECOMMENDED BY TEACHER OMAR
              </span>
            )}

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name[currentLang]}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-emerald-800 dark:text-emerald-400">${plan.price}</span>
                  <span className="text-xs text-slate-400 font-mono">/ {plan.period[currentLang]}</span>
                </div>
              </div>

              {/* Features loop */}
              <ul className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {plan.features[currentLang].map((feature, fIdx) => (
                  <li key={fIdx} className="flex gap-2.5 text-xs text-slate-600 dark:text-slate-300 items-start">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA action button */}
            <div className="pt-8">
              {plan.id === "free" ? (
                <div className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-xs py-3 rounded-2xl text-center font-bold">
                  Starter Plan Active
                </div>
              ) : (
                <button
                  onClick={() => triggerPaySimulation(plan.id)}
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md ${
                    plan.popular
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/10'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                >
                  {plan.cta[currentLang]}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Checkout simulated Modal Overlay */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -15 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-slate-100 dark:border-slate-800 text-center space-y-6 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>

              {!checkoutComplete ? (
                <div className="space-y-6 py-4">
                  <div className="w-12 h-12 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white">Connecting Stripe Safe Pay Gateway...</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Processing secure payment credentials. Please hold while we confirm your Fusha classroom clearance.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 py-4 text-center">
                  <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-full w-fit mx-auto">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Payment Successful!</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Welcome to Muallim Premium! You've unlocked unlimited voice checking, printable certificates, and +100 bonus Coins.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs"
                  >
                    Enter Premium Classroom
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
