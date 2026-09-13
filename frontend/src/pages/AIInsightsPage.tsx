import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  Brain, Sparkles, TrendingUp, Clock, Award, Target,
  CheckCircle2, AlertCircle, ShieldCheck, Activity
} from 'lucide-react';

export const AIInsightsPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [metrics, setMetrics] = useState<any>(null);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const uid = user?.user_id || 'user-anita-01';
    api.getPerformance(uid).then(setMetrics);
    api.getWeeklyTrends(uid).then(setWeeklyData);
    api.getGames().then(() => {
      // Mock session history
      setSessions([
        { date: 'Today, 2:30 PM', game: 'Memory Match', score: 85, acc: '88%', latency: '3.8s', diff: 'Level 1' },
        { date: 'Yesterday', game: 'Word Association', score: 80, acc: '79%', latency: '3.6s', diff: 'Level 1' },
        { date: 'Yesterday', game: 'Pattern Memory', score: 82, acc: '84%', latency: '3.9s', diff: 'Level 1' },
        { date: '2 days ago', game: 'Object Recall', score: 78, acc: '76%', latency: '4.2s', diff: 'Level 1' },
        { date: '3 days ago', game: 'Sequence Recall', score: 62, acc: '61%', latency: '5.2s', diff: 'Level 1' }
      ]);
    });
  }, [user]);

  const gameAccData = [
    { name: 'Memory Match', accuracy: 88, benchmark: 75 },
    { name: 'Pattern Memory', accuracy: 84, benchmark: 70 },
    { name: 'Word Association', accuracy: 79, benchmark: 70 },
    { name: 'Object Recall', accuracy: 76, benchmark: 70 },
    { name: 'Sequence Recall', accuracy: 61, benchmark: 70 },
  ];

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> Telemetry & Machine Learning Analytics
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              AI & Progress Insights
            </h1>
            <p className="text-slate-600 text-base mt-1 max-w-2xl leading-relaxed">
              Transparent, non-diagnostic tracking of cognitive stability, working memory patterns, and reaction latencies over time.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-brand-purple text-white flex items-center justify-center font-black">
              CSI
            </div>
            <div>
              <span className="text-xs text-purple-700 font-bold block uppercase tracking-wide">
                Cognitive Stability Trend
              </span>
              <span className="text-lg font-black text-slate-900">
                {metrics?.trend || 'Stable'} ({metrics?.improvement_pct || '+11%'})
              </span>
            </div>
          </div>
        </div>

        {/* 6 Top Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-soft text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Memory</span>
            <span className="text-3xl font-black text-brand-primary">82%</span>
            <span className="text-[11px] font-bold text-green-600 block mt-1">Improving</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-soft text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Attention</span>
            <span className="text-3xl font-black text-brand-teal">74%</span>
            <span className="text-[11px] font-bold text-brand-teal block mt-1">Stable</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-soft text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Recall</span>
            <span className="text-3xl font-black text-brand-purple">79%</span>
            <span className="text-[11px] font-bold text-brand-purple block mt-1">Consistent</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-soft text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Sequence</span>
            <span className="text-3xl font-black text-amber-600">63%</span>
            <span className="text-[11px] font-bold text-amber-600 block mt-1">Needs Practice</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-soft text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Avg Latency</span>
            <span className="text-3xl font-black text-slate-800">4.1s</span>
            <span className="text-[11px] font-bold text-slate-500 block mt-1">Per Action</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-green-200 shadow-soft text-center bg-green-50/40">
            <span className="text-xs font-bold text-green-700 uppercase tracking-wide block mb-1">Weekly Delta</span>
            <span className="text-3xl font-black text-green-700">+11%</span>
            <span className="text-[11px] font-bold text-green-700 block mt-1">Net Gain</span>
          </div>
        </div>

        {/* Charts Row 1: Weekly Score & Accuracy by Game */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Weekly Cognitive Score */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Weekly Cognitive Stability Score</h3>
                <p className="text-xs text-slate-500">Day-by-day longitudinal composite score (0–100)</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary">
                <span className="w-3 h-3 rounded-full bg-brand-primary"></span>
                <span>Score Trajectory</span>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis domain={[60, 95]} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Accuracy by Game Domain */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Accuracy by Cognitive Category</h3>
                <p className="text-xs text-slate-500">Recent performance across five specialized games</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-brand-teal">
                Target: 70%+
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gameAccData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                  <YAxis type="category" dataKey="name" stroke="#64748b" width={110} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="accuracy" fill="#0d9488" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2: Response Time Latency Trend */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Motor & Reaction Latency Trend (Seconds)</h3>
              <p className="text-xs text-slate-500">Lower response time indicates faster neural processing and confidence</p>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              Improved from 4.6s to 3.9s
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis domain={[3.0, 5.5]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0' }} />
                <Line type="monotone" dataKey="responseTime" stroke="#7c3aed" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Session Log Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Recent Activity & Telemetry Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Game Exercise</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Response Latency</th>
                  <th className="py-3 px-4">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 font-medium">
                    <td className="py-3.5 px-4 text-slate-500">{s.date}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{s.game}</td>
                    <td className="py-3.5 px-4 font-black text-brand-primary">{s.score}</td>
                    <td className="py-3.5 px-4 text-brand-teal font-bold">{s.acc}</td>
                    <td className="py-3.5 px-4 text-slate-600">{s.latency}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-brand-primary">
                        {s.diff}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
