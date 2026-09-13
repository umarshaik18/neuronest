import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Users, Gamepad2, Activity, Globe, MapPin, Award,
  ShieldCheck, TrendingUp, Layers, CheckCircle2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [regionalData, setRegionalData] = useState<any[]>([]);

  useEffect(() => {
    api.getAdminMetrics().then(setMetrics);
    api.getRegionalData().then(setRegionalData);
  }, []);

  const langUsageData = [
    { name: 'English', value: 46, color: '#1e3a8a' },
    { name: 'हिन्दी (Hindi)', value: 32, color: '#0d9488' },
    { name: 'తెలుగు (Telugu)', value: 22, color: '#7c3aed' }
  ];

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Platform Administration & Regional Telemetry
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Admin & NER Clinical Portal
            </h1>
            <p className="text-slate-300 text-base max-w-xl">
              System-wide metrics, regional healthcare deployment across 8 North Eastern states, and multilingual adoption monitoring.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
            <Globe className="w-8 h-8 text-teal-300" />
            <div>
              <span className="text-xs text-slate-300 block font-semibold">Active NER States</span>
              <span className="text-xl font-black text-white">8 of 8 Covered</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Users</span>
              <Users className="w-5 h-5 text-brand-primary" />
            </div>
            <div className="text-3xl font-black text-slate-900">{metrics?.total_users || 148}</div>
            <span className="text-xs text-slate-500 mt-1 block">104 Seniors • 44 Caregivers</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Game Sessions</span>
              <Gamepad2 className="w-5 h-5 text-brand-teal" />
            </div>
            <div className="text-3xl font-black text-brand-teal">{metrics?.total_games_played || '3,942'}</div>
            <span className="text-xs text-green-600 font-bold mt-1 block">+312 played today</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Avg Cognitive Score</span>
              <Activity className="w-5 h-5 text-brand-purple" />
            </div>
            <div className="text-3xl font-black text-brand-purple">{metrics?.avg_cognitive_score || '76.4'}</div>
            <span className="text-xs text-slate-500 mt-1 block">Stable population index</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Retention Rate</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-black text-green-700">{metrics?.retention_rate || '92.4%'}</div>
            <span className="text-xs text-slate-500 mt-1 block">30-day senior adherence</span>
          </div>
        </div>

        {/* NER Regional Distribution Chart & Language Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* NER 8 States Bar Chart (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">NER Regional User Distribution</h3>
                <p className="text-xs text-slate-500">Elderly & caregiver registration counts across all 8 North Eastern states</p>
              </div>
              <span className="text-xs font-bold text-brand-teal bg-teal-50 px-3 py-1 rounded-full">
                NER Network
              </span>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="state" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="users" fill="#1e3a8a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Multilingual Adoption Pie Chart (1 col) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Multilingual Distribution</h3>
              <p className="text-xs text-slate-500">User language preference in UI & Voice Assistant</p>

              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={langUsageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {langUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '16px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-4">
              {langUsageData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-slate-900 font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NER State-by-State Detailed Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-teal" />
            <h3 className="text-xl font-bold text-slate-900">NER Regional Deployment Status</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Registered Seniors</th>
                  <th className="py-3 px-4">Sessions Completed</th>
                  <th className="py-3 px-4">Primary Dialect / Language</th>
                  <th className="py-3 px-4">Community Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {regionalData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.state}</td>
                    <td className="py-3.5 px-4 text-brand-primary font-black">{row.users}</td>
                    <td className="py-3.5 px-4 text-brand-teal font-bold">{row.sessions}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.language}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700">
                        <CheckCircle2 className="w-3 h-3" /> Operational
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
