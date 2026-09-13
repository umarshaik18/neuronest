import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { GameResultResponse } from '../services/api';
import { Trophy, Clock, Target, ArrowRight, Home, BarChart2, Sparkles, AlertCircle, Play } from 'lucide-react';

interface Props {
  isOpen: boolean;
  result: GameResultResponse | null;
  onClose: () => void;
  onPlayAgain?: () => void;
}

export const GameResultModal: React.FC<Props> = ({ isOpen, result, onClose, onPlayAgain }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (!isOpen || !result) return null;

  const diffLabel = result.difficulty_adjustment?.difficulty_label || 
    (result.difficulty === 1 ? 'Easy' : result.difficulty === 2 ? 'Medium' : 'Hard');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-teal text-white p-6 text-center relative">
          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{t('results.complete')}</h2>
          <p className="text-blue-100 mt-1 font-medium">{t('results.wellDone')}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-2xl text-center">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Score</span>
              <span className="text-2xl font-black text-brand-primary">{result.score}</span>
            </div>
            <div className="p-3.5 bg-teal-50 border border-teal-100 rounded-2xl text-center">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">Accuracy</span>
              <span className="text-2xl font-black text-brand-teal">{result.accuracy.toFixed(0)}%</span>
            </div>
            <div className="p-3.5 bg-green-50 border border-green-100 rounded-2xl text-center">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Avg Response</span>
              <span className="text-2xl font-black text-brand-green">{result.response_time.toFixed(1)}s</span>
            </div>
            <div className="p-3.5 bg-purple-50 border border-purple-100 rounded-2xl text-center">
              <span className="text-xs font-bold text-brand-purple uppercase tracking-wider block mb-1">Difficulty</span>
              <span className="text-2xl font-black text-brand-purple">{diffLabel}</span>
            </div>
          </div>

          {/* Adaptive Difficulty Alert (if changed or maintained) */}
          {result.difficulty_adjustment && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
              <div className="p-1.5 bg-blue-100 text-brand-primary rounded-xl mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-slate-800">Adaptive Difficulty Engine:</div>
                <p className="text-slate-600 mt-0.5">{result.difficulty_adjustment.message}</p>
              </div>
            </div>
          )}

          {/* What NeuroNest Noticed (AI Explanation) */}
          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl">
            <div className="flex items-center gap-2 text-brand-purple font-bold text-sm mb-1.5">
              <Sparkles className="w-5 h-5" />
              {t('results.noticedTitle')}
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              “{result.ai_feedback}”
            </p>
          </div>

          {/* Recommended Next Activity */}
          {result.recommended_next_game && (
            <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-2xl">
              <div className="text-xs font-bold text-brand-teal uppercase tracking-wide mb-1">
                {t('results.nextRec')}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {result.recommended_next_game.game_name} — Easy
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md">
                    {result.recommended_next_game.reason}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {result.recommended_next_game && (
              <button
                onClick={() => {
                  onClose();
                  navigate(`/games/${result.recommended_next_game.game_id}`);
                }}
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primaryHover transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5 fill-current" />
                {t('results.playRecommended')} ({result.recommended_next_game.game_name})
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/progress');
                }}
                className="py-3.5 px-4 bg-white border-2 border-slate-200 font-bold text-slate-700 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <BarChart2 className="w-4 h-4 text-brand-teal" />
                {t('results.viewProgress')}
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/elderly-dashboard');
                }}
                className="py-3.5 px-4 bg-white border-2 border-slate-200 font-bold text-slate-700 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 text-brand-primary" />
                {t('results.returnHome')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
