import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  Brain, Sparkles, Play, ArrowRight, Award,
  Clock, CheckCircle, LayoutGrid, ListOrdered, BookOpen, Eye
} from 'lucide-react';

export const GamesPage: React.FC = () => {
  const { t } = useLanguage();
  const [games, setGames] = useState<any[]>([]);
  const [recGame, setRecGame] = useState<any>(null);

  useEffect(() => {
    api.getGames().then(setGames);
    api.getRecommendation('user-anita-01').then(setRecGame);
  }, []);

  const getGameIcon = (id: string) => {
    switch (id) {
      case 'memory-match': return <Brain className="w-8 h-8 text-brand-primary" />;
      case 'object-recall': return <Eye className="w-8 h-8 text-brand-teal" />;
      case 'sequence-recall': return <ListOrdered className="w-8 h-8 text-indigo-600" />;
      case 'pattern-memory': return <LayoutGrid className="w-8 h-8 text-brand-purple" />;
      case 'word-association': return <BookOpen className="w-8 h-8 text-emerald-600" />;
      default: return <Award className="w-8 h-8 text-brand-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-warmBg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Clinically-Structured Cognitive Suite
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {t('games.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('games.subtitle')}
          </p>
        </div>

        {/* AI Highlight Banner (Recommended Game) */}
        {recGame && (
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-blue-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/30 text-purple-200 text-xs font-bold uppercase">
                <Sparkles className="w-4 h-4 text-purple-300" /> AI Priority Recommendation
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {recGame.game_name} — Easy Level
              </h2>
              <p className="text-sm sm:text-base text-blue-100 max-w-2xl">
                {recGame.reason}
              </p>
            </div>
            <Link
              to={`/games/${recGame.game_id}`}
              className="px-8 py-4 bg-brand-teal text-white text-base font-bold rounded-2xl hover:bg-teal-600 transition-all flex items-center gap-2 shadow-lg shrink-0"
            >
              <Play className="w-5 h-5 fill-current" />
              Play Recommended Now
            </Link>
          </div>
        )}

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(g => (
            <div
              key={g.game_id}
              className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-brand-primary/40 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    {getGameIcon(g.game_id)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                    {g.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{g.name}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {g.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  Level 1 • Adaptive
                </span>
                <Link
                  to={`/games/${g.game_id}`}
                  className="px-5 py-2.5 bg-brand-primary text-white text-sm font-bold rounded-2xl hover:bg-brand-primaryHover transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>{t('games.playNow')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
