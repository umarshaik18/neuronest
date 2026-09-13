import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Brain, Sparkles, CheckCircle2, Clock, Play, HelpCircle, ChevronDown,
  ChevronUp, ArrowRight, BarChart2, Calendar, BookOpen, Mic, Heart,
  ShieldAlert, RefreshCw, Sun
} from 'lucide-react';

export const ElderlyDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { speakText } = useAccessibility();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recommendation, setRecommendation] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [performance, setPerformance] = useState<any>(null);
  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const userName = user?.name ? user.name.split(' ')[0] : 'Anita';

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const uid = user?.user_id || 'user-anita-01';
      const [recData, taskData, perfData] = await Promise.all([
        api.getRecommendation(uid),
        api.getTasks(uid),
        api.getPerformance(uid)
      ]);
      setRecommendation(recData);
      setTasks(taskData);
      setPerformance(perfData);
      setLoading(false);
    };
    loadData();
  }, [user]);

  const handleToggleTask = async (taskId: string) => {
    await api.toggleTask(taskId);
    setTasks(prev =>
      prev.map(t =>
        t.task_id === taskId
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length || 6;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-elevated border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-4 h-4 text-amber-300" /> Daily Cognitive Care Portal
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {t('dashboard.greeting')}, {userName}!
            </h1>
            <p className="text-base sm:text-lg text-blue-100 font-medium max-w-xl">
              {t('dashboard.subGreeting')}
            </p>
          </div>

          {/* Quick Voice Prompt CTA */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-3 shrink-0">
            <div className="p-3 bg-brand-teal text-white rounded-xl">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs text-blue-200 font-semibold block">Need hands-free help?</span>
              <button
                onClick={() => speakText(`Good morning ${userName}. You have completed ${completedCount} out of ${totalTasks} tasks today. Would you like to practice your sequence recall activity?`)}
                className="text-sm font-bold text-white hover:underline text-left block"
              >
                Listen to Daily Summary 🔊
              </button>
            </div>
          </div>
        </div>

        {/* TODAY'S COGNITIVE GOAL */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-brand-teal" />
              {t('dashboard.todayGoal')}
            </span>
            <span className="text-sm font-bold text-slate-700">
              {completedCount} / {totalTasks} {t('dashboard.goalProgress')} ({progressPercent}%)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
            {t('dashboard.goalDesc')}
          </h2>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-brand-teal to-brand-green rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* SECTION A: RECOMMENDED FOR YOU */}
        {recommendation && (
          <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 border-2 border-purple-200 rounded-3xl p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple text-white text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> {t('dashboard.recommendedTitle')}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {recommendation.game_name} — Easy Level
                </h2>
                <p className="text-slate-700 text-base font-medium max-w-2xl leading-relaxed">
                  “{recommendation.reason}”
                </p>

                {/* Expandable: Why this recommendation? */}
                <div>
                  <button
                    onClick={() => setIsWhyOpen(!isWhyOpen)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-purple hover:underline"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{t('dashboard.whyRecommended')}</span>
                    {isWhyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isWhyOpen && (
                    <div className="mt-3 p-4 bg-white/90 rounded-2xl border border-purple-200 text-xs sm:text-sm text-slate-700 space-y-2 animate-in fade-in duration-150">
                      <div className="font-bold text-slate-900">Explainable AI Recommendation Formulation:</div>
                      <p>
                        <p className="font-mono bg-purple-100/70 p-2 rounded-xl text-purple-900 font-bold">Recommendation Score = 35% Skill Gap + 25% Recent Performance + 20% Latency Factor + 20% Difficulty Fit</p>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-slate-600">
                        <li>Recent Visual Memory Match accuracy: <strong>88%</strong> (Strong stability)</li>
                        <li>Recent Sequence Recall accuracy: <strong>61%</strong> (Opportunity for gentle reinforcement)</li>
                        <li>Calculated Recommendation Score: <strong>0.84 / 1.00</strong></li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  to={`/games/${recommendation.game_id}`}
                  className="w-full sm:w-auto px-8 py-5 bg-brand-primary text-white text-base sm:text-lg font-black rounded-2xl hover:bg-brand-primaryHover transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  {t('dashboard.startRecommended')}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* SECTION B & C: TASKS & PERFORMANCE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SECTION B: TODAY'S TASKS (2 Columns) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block">Daily Routine</span>
                <h3 className="text-xl font-black text-slate-900">{t('dashboard.todayTasks')}</h3>
              </div>
              <Link
                to="/memory-companion"
                className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                View Full Schedule <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {tasks.map(task => {
                const isCompleted = task.status === 'completed';
                return (
                  <div
                    key={task.task_id}
                    onClick={() => handleToggleTask(task.task_id)}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer ${
                      isCompleted
                        ? 'bg-green-50/70 border-green-200 opacity-80'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-slate-300 text-transparent'
                        }`}
                        aria-label="Toggle task completion"
                      >
                        <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                      </button>
                      <div>
                        <h4 className={`text-base font-bold ${
                          isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
                        }`}>
                          {task.title}
                        </h4>
                        <p className="text-xs text-slate-500">{task.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl shrink-0">
                      <Clock className="w-3.5 h-3.5 text-brand-teal" />
                      {task.scheduled_time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION C: TODAY'S PERFORMANCE (1 Column) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-brand-purple uppercase tracking-widest block mb-1">
                Neuro-Analytics
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-6">
                {t('dashboard.todayPerf')}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wide block mb-1">
                    {t('dashboard.cognitiveScore')}
                  </span>
                  <span className="text-3xl font-black text-brand-primary">
                    {performance?.overall_score || 78}
                  </span>
                  <span className="text-[10px] text-green-600 font-bold block mt-1">+7% this week</span>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 text-center">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wide block mb-1">
                    {t('dashboard.accuracy')}
                  </span>
                  <span className="text-3xl font-black text-brand-teal">
                    {performance?.overall_accuracy ? `${performance.overall_accuracy.toFixed(0)}%` : '82%'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1">Steady accuracy</span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-center">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wide block mb-1">
                    Avg Response
                  </span>
                  <span className="text-2xl font-black text-brand-purple">
                    {performance?.avg_response_time ? `${performance.avg_response_time.toFixed(1)}s` : '4.1s'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1">Reaction speed</span>
                </div>

                <div className="p-4 rounded-2xl bg-green-50 border border-green-100 text-center">
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wide block mb-1">
                    Completed
                  </span>
                  <span className="text-3xl font-black text-brand-green">
                    {performance?.games_completed || 3}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1">Games played</span>
                </div>
              </div>
            </div>

            <Link
              to="/progress"
              className="w-full py-3.5 bg-slate-100 hover:bg-blue-50 text-brand-primary font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <BarChart2 className="w-4 h-4" /> View Detailed Insights
            </Link>
          </div>
        </div>

        {/* SECTION D: QUICK ACTIONS */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">
            {t('dashboard.quickActions')}
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              to="/games"
              className="bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-brand-primary shadow-soft hover:shadow-elevated transition-all text-center flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7" />
              </div>
              <span className="text-base font-bold text-slate-900">{t('dashboard.playGames')}</span>
              <span className="text-xs text-slate-500">5 Cognitive Exercises</span>
            </Link>

            <Link
              to="/memory-companion"
              className="bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-brand-teal shadow-soft hover:shadow-elevated transition-all text-center flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="text-base font-bold text-slate-900">{t('nav.memoryCompanion')}</span>
              <span className="text-xs text-slate-500">Family & Daily Life</span>
            </Link>

            <Link
              to="/progress"
              className="bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-brand-purple shadow-soft hover:shadow-elevated transition-all text-center flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart2 className="w-7 h-7" />
              </div>
              <span className="text-base font-bold text-slate-900">{t('nav.progress')}</span>
              <span className="text-xs text-slate-500">Longitudinal Trends</span>
            </Link>

            <Link
              to="/daily-activities"
              className="bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-brand-green shadow-soft hover:shadow-elevated transition-all text-center flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-brand-green flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <span className="text-base font-bold text-slate-900">{t('nav.dailyLife')}</span>
              <span className="text-xs text-slate-500">Real-World Tasks</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
