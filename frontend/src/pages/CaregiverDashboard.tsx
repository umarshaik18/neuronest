import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  Users, Heart, Activity, AlertCircle, Bell, Plus, CheckCircle,
  Clock, TrendingUp, Sparkles, MapPin, Calendar, ArrowRight, ShieldCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CaregiverDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<any[]>([]);
  const [weeklyTrends, setWeeklyTrends] = useState<any[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('10:00 AM');

  useEffect(() => {
    api.getTasks('user-anita-01').then(setTasks);
    api.getWeeklyTrends('user-anita-01').then(setWeeklyTrends);
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    await api.createTask({
      user_id: 'user-anita-01',
      title: newTaskTitle,
      description: 'Scheduled by caregiver Priya Sharma',
      scheduled_time: newTaskTime
    });
    const updated = await api.getTasks('user-anita-01');
    setTasks(updated);
    setNewTaskTitle('');
    setIsTaskModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-teal-800 shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4 text-teal-400" /> Caregiver Telemetry & Remote Wellness Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Caregiver Dashboard
            </h1>
            <p className="text-teal-100 text-base max-w-xl">
              Real-time monitoring, gentle memory reminder assignment, and cognitive activity oversight for connected family members.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="px-6 py-4 bg-brand-teal text-white font-bold rounded-2xl hover:bg-teal-600 transition-all flex items-center gap-2 shadow-lg shrink-0"
            >
              <Plus className="w-5 h-5" /> Assign Reminder
            </button>
          </div>
        </div>

        {/* Connected Elderly User Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-soft">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-primary to-brand-teal text-white font-black text-3xl flex items-center justify-center shadow-md">
                AS
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-slate-900">Anita Sharma</h2>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                    Active Today
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span>Age: <strong>72</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-brand-teal" /> Assam, India (NER)
                  </span>
                  <span>•</span>
                  <span>Language: <strong>English / Assamese</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide block mb-1">Today's Goals</span>
                <span className="text-2xl font-black text-brand-primary">3 / 4</span>
              </div>
              <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl text-center">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wide block mb-1">Cognitive Score</span>
                <span className="text-2xl font-black text-brand-teal">78</span>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-center">
                <span className="text-xs font-bold text-green-700 uppercase tracking-wide block mb-1">Weekly Delta</span>
                <span className="text-2xl font-black text-brand-green">+7%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Caregiver Insights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-3xl p-6 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-brand-purple font-bold text-sm uppercase tracking-wide">
              <Sparkles className="w-5 h-5" /> Positive Cognitive Stability Observation
            </div>
            <p className="text-base text-slate-800 font-medium leading-relaxed">
              “Visual memory performance improved by <strong>8%</strong> during the last week. Anita's response times in everyday item matching showed notable consistency and speed.”
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <CheckCircle className="w-4 h-4 text-brand-green" /> Recommended: Continue encouraging morning memory games.
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase tracking-wide">
              <AlertCircle className="w-5 h-5" /> Practice Opportunity Noticed
            </div>
            <p className="text-base text-slate-800 font-medium leading-relaxed">
              “Sequence Recall currently requires additional gentle practice (recent accuracy: <strong>61%</strong>). Routine sequencing for tea brewing and medication timing has been queued.”
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-700 pt-1 font-semibold">
              <span>Adaptive Difficulty set to: <strong>Easy Mode</strong> to avoid frustration.</span>
            </div>
          </div>
        </div>

        {/* Longitudinal Chart & Today's Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">7-Day Cognitive Score Trend</h3>
                <p className="text-xs text-slate-500">Longitudinal tracking for clinical updates</p>
              </div>
              <span className="text-xs font-bold text-brand-teal bg-teal-50 px-3 py-1 rounded-full">
                Steady Progress
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrends}>
                  <defs>
                    <linearGradient id="careScoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis domain={[60, 95]} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0' }} />
                  <Area type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={3} fill="url(#careScoreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Assigned Tasks & Reminders (1 col) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Assigned Tasks</h3>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> New Task
              </button>
            </div>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto">
              {tasks.map(t => (
                <div
                  key={t.task_id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs sm:text-sm"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{t.title}</span>
                    <span className="text-slate-500 text-[11px]">{t.scheduled_time}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal: Assign Task */}
        {isTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Assign Reminder for Anita</h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Afternoon hydration and fruit snack"
                  className="w-full p-3 border border-slate-200 rounded-2xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Scheduled Time</label>
                <input
                  type="text"
                  value={newTaskTime}
                  onChange={e => setNewTaskTime(e.target.value)}
                  placeholder="e.g. 03:30 PM"
                  className="w-full p-3 border border-slate-200 rounded-2xl text-sm"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsTaskModalOpen(false)}
                  className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="flex-1 py-3 bg-brand-teal text-white rounded-2xl font-bold hover:bg-teal-600"
                >
                  Assign Reminder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
