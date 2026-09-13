import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Brain, Sparkles, Target, Users, Mic, Heart, ShieldAlert,
  ArrowRight, Play, CheckCircle2, ChevronRight, MapPin, Activity,
  Sliders, Award, BookOpen, Layers
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const nerStates = [
    { name: 'Assam', capital: 'Dispur', feature: 'Tea gardens & Brahmaputra riverfront heritage' },
    { name: 'Meghalaya', capital: 'Shillong', feature: 'Living root bridges & gentle hill communities' },
    { name: 'Manipur', capital: 'Imphal', feature: 'Loktak lake & classical Manipuri folk rhythms' },
    { name: 'Mizoram', capital: 'Aizawl', feature: 'Cheraw bamboo dance & community solidarity' },
    { name: 'Nagaland', capital: 'Kohima', feature: 'Rich handicraft & intergenerational storytelling' },
    { name: 'Tripura', capital: 'Agartala', feature: 'Ujjayanta palace & vibrant bamboo weaving' },
    { name: 'Arunachal Pradesh', capital: 'Itanagar', feature: 'Dawn-lit mountains & indigenous herbal remedies' },
    { name: 'Sikkim', capital: 'Gangtok', feature: 'Khangchendzonga vistas & peaceful valley living' }
  ];

  return (
    <div className="min-h-screen bg-brand-warmBg space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 bg-gradient-to-b from-blue-50/60 via-white to-brand-warmBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-brand-primary text-xs sm:text-sm font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-brand-teal" />
                Smart India Hackathon • Healthcare & MedTech
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {t('brand.tagline')}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                {t('brand.description')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white text-base sm:text-lg font-black rounded-2xl hover:bg-brand-primaryHover transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>{t('hero.getStarted')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/games"
                  className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-800 text-base sm:text-lg font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 text-brand-teal fill-current" />
                  <span>{t('hero.exploreGames')}</span>
                </Link>

                <Link
                  to="/login?role=caregiver"
                  className="w-full sm:w-auto px-6 py-4 bg-teal-50 border border-teal-200 text-brand-teal text-base font-bold rounded-2xl hover:bg-teal-100 transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  <span>{t('hero.caregiverLogin')}</span>
                </Link>
              </div>

              {/* Quick Demo Credentials Bar */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>One-Click Demo Ready: <strong>Anita Sharma</strong> (DOB: 15/08/1954, Assam)</span>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-elevated space-y-6 relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-teal text-white flex items-center justify-center font-black">
                      <Brain className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Anita Sharma</h3>
                      <span className="text-xs text-brand-teal font-semibold">Assam • Daily Routine Active</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                    Score: 78
                  </span>
                </div>

                {/* AI Recommendation Simulation Preview */}
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-brand-purple uppercase">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> AI Recommended Next
                    </span>
                    <span>Easy</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Sequence Recall (Assam Tea Routine)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    “Sequence accuracy lower than visual memory. Recommending step-by-step daily tea brewing practice.”
                  </p>
                </div>

                {/* Today Goal Progress Preview */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Daily Cognitive Goal</span>
                    <span className="text-brand-primary">2 / 3 Completed (67%)</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-teal to-brand-green w-2/3 rounded-full" />
                  </div>
                </div>

                {/* Floating badge */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs">
                  <span className="font-bold text-brand-primary">Caregiver Connected:</span>
                  <span className="text-slate-600">Priya Sharma (Guwahati)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIX MAIN FEATURE CARDS */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">
            Key Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Designed with Empathy, Powered by Science
          </h2>
          <p className="text-slate-600 text-base">
            Every module addresses real difficulties faced by dementia patients and their loving family caregivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: '1. Cognitive Games',
              desc: 'Simple, clinically structured games designed to exercise memory, attention, executive sequencing and recall.',
              icon: Brain,
              color: 'text-brand-primary bg-blue-50'
            },
            {
              title: '2. AI Personalization',
              desc: 'Activities are dynamically recommended using each individual user’s performance history and skill gap index.',
              icon: Sparkles,
              color: 'text-brand-purple bg-purple-50'
            },
            {
              title: '3. Adaptive Difficulty',
              desc: 'Difficulty changes automatically and gradually according to user accuracy and response time without distress.',
              icon: Sliders,
              color: 'text-brand-teal bg-teal-50'
            },
            {
              title: '4. Memory Companion',
              desc: 'Helps elderly users remember daily schedules, medication timings, family members, and important home places.',
              icon: BookOpen,
              color: 'text-amber-700 bg-amber-50'
            },
            {
              title: '5. Caregiver Support',
              desc: 'Family members and caregivers can remotely monitor daily activity, assign reminders, and review stability trends.',
              icon: Users,
              color: 'text-rose-600 bg-rose-50'
            },
            {
              title: '6. Voice Assistance',
              desc: 'Elderly users can comfortably interact with NeuroNest using simple spoken commands in English, Hindi, and Telugu.',
              icon: Mic,
              color: 'text-emerald-600 bg-emerald-50'
            }
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-brand-primary/40 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${f.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HOW THE AI WORKS WORKFLOW */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Closed-Loop Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              How the AI Works — Closed-Loop Pipeline
            </h2>
            <p className="text-slate-400 text-base">
              The continuous pipeline from gameplay telemetry to personalized therapeutic outputs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: 'OBSERVES',
                desc: 'Collects cognitive game activity, attempts, and response times in real time.'
              },
              {
                step: 'ANALYZES',
                desc: 'Measures composite score, accuracy %, response latency, and mistake patterns.'
              },
              {
                step: 'RECOMMENDS',
                desc: 'Calculates explainable 4-factor recommendation score for next exercise.'
              },
              {
                step: 'ADAPTS',
                desc: 'Increases or decreases game difficulty step-by-step to prevent frustration.'
              },
              {
                step: 'EXPLAINS',
                desc: 'Generates warm, encouraging feedback in clear, non-clinical language.'
              },
              {
                step: 'TRACKS',
                desc: 'Maintains longitudinal history and presents progress trends to caregivers.'
              }
            ].map((node, i) => (
              <div
                key={i}
                className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 flex flex-col justify-between relative group hover:bg-slate-800 transition-colors"
              >
                <div className="space-y-3">
                  <span className="text-xs font-black text-teal-400 uppercase tracking-widest">
                    Phase {i + 1}
                  </span>
                  <h3 className="text-lg font-black text-white">{node.step}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/architecture"
              className="inline-flex items-center gap-2 text-teal-300 hover:text-white font-bold text-sm"
            >
              <span>Explore Technical AI Architecture Page</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. NORTH EASTERN REGION (NER) FOCUS */}
      <section id="ner-focus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-brand-teal text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" /> Regional Inclusivity
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Empowering Seniors across North East India
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            The North Eastern Region (NER) of India faces unique geographical terrains and severe shortages of geriatric centers. NeuroNest anchors cognitive therapy in familiar cultural motifs — from Assam tea gardens to local folk tales.
          </p>
        </div>

        {/* 8 States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nerStates.map(st => (
            <div
              key={st.name}
              className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-brand-teal shadow-soft transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">{st.name}</h3>
                <span className="text-xs font-semibold text-brand-teal bg-teal-50 px-2 py-0.5 rounded-full">
                  {st.capital}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{st.feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TECHNOLOGY STACK & ETHICAL SAFETY SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-soft space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary block mb-1">
                Full-Stack Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Robust, Production-Ready Technology Stack
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Ethical AI • Non-Diagnostic</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Frontend</span>
              <strong className="text-sm font-black text-slate-900 block">React 18 / Vite</strong>
              <span className="text-[11px] text-slate-500">TypeScript • Tailwind</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Backend</span>
              <strong className="text-sm font-black text-brand-primary block">Python FastAPI</strong>
              <span className="text-[11px] text-slate-500">REST APIs • Pydantic</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Database</span>
              <strong className="text-sm font-black text-brand-teal block">SQLite / Postgres</strong>
              <span className="text-[11px] text-slate-500">10 Relational Schemas</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">AI / ML</span>
              <strong className="text-sm font-black text-brand-purple block">Scikit-Learn</strong>
              <span className="text-[11px] text-slate-500">RandomForest • Pandas</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Telemetry</span>
              <strong className="text-sm font-black text-brand-green block">Recharts</strong>
              <span className="text-[11px] text-slate-500">Longitudinal Charts</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Voice & A11y</span>
              <strong className="text-sm font-black text-rose-600 block">Web Speech API</strong>
              <span className="text-[11px] text-slate-500">EN • HI • TE Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
