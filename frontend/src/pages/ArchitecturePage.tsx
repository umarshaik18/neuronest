import React from 'react';
import {
  Layers, ArrowDown, Database, Server, Smartphone, Cpu,
  Sparkles, CheckCircle2, ShieldCheck, Activity, Eye, Zap
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-warmBg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-brand-purple text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> System Architecture & Data Pipeline
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            NeuroNest AI Architecture
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The closed-loop architecture powering personalized cognitive gaming, telemetry collection, explainable machine learning recommendations, and caregiver oversight.
          </p>
        </div>

        {/* Closed Loop Philosophy Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white rounded-3xl p-8 shadow-elevated text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
            Core Operating Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            “AI Observes → Analyzes → Recommends → Adapts → Explains → Tracks Progress”
          </h2>
          <p className="text-blue-200 text-sm max-w-2xl mx-auto">
            A continuous reinforcement cycle designed to preserve cognitive dignity, reduce caregiver burnout, and ensure joyful, non-distressing exercises.
          </p>
        </div>

        {/* 5 Architectural Layers Visualizer */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-6">Multi-Tier Architecture</h2>

          {/* Layer 1: User Layer */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold">
                  L1
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">1. USER LAYER</h3>
                  <p className="text-xs text-slate-500">Elderly Patients (Seniors with MCI/Dementia) & Caregiver / Family Members</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs font-bold">
                <span className="px-3 py-1 bg-blue-50 text-brand-primary rounded-xl">Play Cognitive Games</span>
                <span className="px-3 py-1 bg-teal-50 text-brand-teal rounded-xl">Voice Commands</span>
                <span className="px-3 py-1 bg-purple-50 text-brand-purple rounded-xl">Monitor Telemetry</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Layer 2: Frontend Layer */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center font-bold">
                  L2
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">2. FRONTEND CLIENT APPLICATION</h3>
                  <p className="text-xs text-slate-500">React + TypeScript + Vite + Tailwind CSS + Lucide Icons + Recharts</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs font-bold">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-xl">WCAG AAA Accessibility</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-xl">Web Speech API</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-xl">Multilingual (EN, HI, TE)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Layer 3: Backend Server */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  L3
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">3. BACKEND SERVER (Python FastAPI)</h3>
                  <p className="text-xs text-slate-500">RESTful API Endpoints • Authentication Pipeline • Session Serialization • Business Logic</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs font-bold">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl">CORS Enabled</span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl">FastAPI Routers</span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl">Pydantic Validation</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Layer 4: AI & ML Engine */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-6 border-2 border-purple-200 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple text-white flex items-center justify-center font-bold">
                  L4
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">4. INTELLIGENT AI / ML MODULE</h3>
                  <p className="text-xs text-slate-600">Scikit-learn Random Forest • Explainable Recommendation Algorithm • Adaptive Difficulty Controller</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs font-bold">
                <span className="px-3 py-1 bg-purple-100 text-brand-purple rounded-xl">4-Factor Formula</span>
                <span className="px-3 py-1 bg-purple-100 text-brand-purple rounded-xl">Stability Predictor</span>
                <span className="px-3 py-1 bg-purple-100 text-brand-purple rounded-xl">Natural Feedback</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Layer 5: Database & External */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  L5
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">5. PERSISTENCE & DATA STORAGE</h3>
                  <p className="text-xs text-slate-500">PostgreSQL (Production) / SQLite (Local Demo) • Users, Sessions, Recommendations, Tasks</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs font-bold">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl">10 Relational Schemas</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl">ACID Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step by Step AI Workflow */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-black text-slate-900 text-center">
            AI Workflow — Step by Step
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: 'STEP 1',
                title: 'OBSERVES',
                desc: 'Captures in-game telemetry: score, exact accuracy %, millisecond response times, attempts, and error categories.',
                tech: 'Game Engine • Browser Events'
              },
              {
                step: 'STEP 2',
                title: 'ANALYZES',
                desc: 'Calculates domain scores across visual memory, working recall, routine sequencing, spatial pattern, and vocabulary.',
                tech: 'Pandas • NumPy • Statistics'
              },
              {
                step: 'STEP 3',
                title: 'RECOMMENDS',
                desc: 'Calculates priority using 35% Skill Gap + 25% Recent Performance + 20% Latency Factor + 20% Difficulty Fit.',
                tech: 'Explainable Recommender'
              },
              {
                step: 'STEP 4',
                title: 'ADAPTS',
                desc: 'Increases difficulty gradually if accuracy > 85%, maintains if 60–85%, and lowers gracefully if < 60%.',
                tech: 'Adaptive Difficulty Logic'
              },
              {
                step: 'STEP 5',
                title: 'EXPLAINS',
                desc: 'Synthesizes warm, encouraging feedback in plain, respectful language with zero negative medical jargon.',
                tech: 'Natural Language Generator'
              },
              {
                step: 'STEP 6',
                title: 'TRACKS PROGRESS',
                desc: 'Logs longitudinal trend metrics and alerts caregivers of meaningful improvements or practice needs.',
                tech: 'Scikit-learn • Recharts'
              }
            ].map(card => (
              <div
                key={card.step}
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-xs font-black text-brand-primary tracking-wider uppercase block mb-1">
                    {card.step}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{card.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{card.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-brand-teal">
                  Technology: {card.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
