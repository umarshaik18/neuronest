import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { api, GameResultResponse } from '../../services/api';
import { GameResultModal } from '../../components/GameResultModal';
import {
  ArrowLeft, Eye, Clock, Award, CheckCircle2, RotateCcw,
  Coffee, Key, Apple, Smartphone, Watch, Glasses, Umbrella, BookOpen, Check
} from 'lucide-react';

interface ObjectItem {
  id: string;
  name: string;
  iconName: string;
}

const POOL_OF_OBJECTS: ObjectItem[] = [
  { id: 'cup', name: 'Ceramic Tea Cup', iconName: 'Coffee' },
  { id: 'keys', name: 'Brass House Keys', iconName: 'Key' },
  { id: 'apple', name: 'Fresh Apple', iconName: 'Apple' },
  { id: 'phone', name: 'Mobile Phone', iconName: 'Smartphone' },
  { id: 'clock', name: 'Wrist Clock', iconName: 'Watch' },
  { id: 'glasses', name: 'Reading Glasses', iconName: 'Glasses' },
  { id: 'umbrella', name: 'Rain Umbrella', iconName: 'Umbrella' },
  { id: 'book', name: 'Story Book', iconName: 'BookOpen' }
];

export const ObjectRecall: React.FC = () => {
  const { t } = useLanguage();
  const { speakText } = useAccessibility();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState<number>(1);
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [countdown, setCountdown] = useState<number>(7);
  const [targetItems, setTargetItems] = useState<ObjectItem[]>([]);
  const [allOptions, setAllOptions] = useState<ObjectItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [gameResult, setGameResult] = useState<GameResultResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const startTimeRef = useRef<number>(0);

  const startNewGame = (diff = difficulty) => {
    const targetCount = diff === 1 ? 4 : diff === 2 ? 5 : 6;
    const shuffled = [...POOL_OF_OBJECTS].sort(() => 0.5 - Math.random());
    const chosen = shuffled.slice(0, targetCount);
    
    setTargetItems(chosen);
    setAllOptions([...POOL_OF_OBJECTS].sort(() => 0.5 - Math.random()));
    setSelectedIds([]);
    setPhase('memorize');
    const memorizeDuration = diff === 1 ? 8 : diff === 2 ? 6 : 5;
    setCountdown(memorizeDuration);
    
    speakText(`Look at these ${targetCount} everyday objects carefully. Remember them!`);
  };

  useEffect(() => {
    startNewGame(difficulty);
  }, [difficulty]);

  // Countdown for memorize phase
  useEffect(() => {
    let timer: any = null;
    if (phase === 'memorize' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(c => c - 1);
      }, 1000);
    } else if (phase === 'memorize' && countdown === 0) {
      setPhase('recall');
      startTimeRef.current = Date.now();
      speakText("Which objects did you see? Select the items you remember.");
    }
    return () => clearInterval(timer);
  }, [phase, countdown]);

  const toggleSelectOption = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleFinishRecall = async () => {
    const responseTimeSec = Math.max(1.5, Number(((Date.now() - startTimeRef.current) / 1000).toFixed(1)));
    
    const targetIdSet = new Set(targetItems.map(item => item.id));
    let correctCount = 0;
    let mistakeCount = 0;

    selectedIds.forEach(id => {
      if (targetIdSet.has(id)) {
        correctCount++;
      } else {
        mistakeCount++;
      }
    });

    const accuracy = Math.round((correctCount / Math.max(targetItems.length, selectedIds.length)) * 100);
    const score = Math.max(40, Math.min(100, Math.round(accuracy * 0.8 + (correctCount * 5) - (mistakeCount * 5))));

    const payload = {
      user_id: user?.user_id || 'user-anita-01',
      game_id: 'object-recall',
      score,
      accuracy,
      response_time: responseTimeSec,
      attempts: selectedIds.length,
      difficulty_level: difficulty
    };

    const res = await api.submitGameResult('object-recall', payload);
    setGameResult(res);
    setShowResultModal(true);
    speakText("Well done recalling the objects! Here is your feedback.");
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Coffee': return <Coffee className="w-10 h-10 text-amber-800" />;
      case 'Key': return <Key className="w-10 h-10 text-amber-600" />;
      case 'Apple': return <Apple className="w-10 h-10 text-rose-600" />;
      case 'Smartphone': return <Smartphone className="w-10 h-10 text-emerald-600" />;
      case 'Watch': return <Watch className="w-10 h-10 text-purple-600" />;
      case 'Glasses': return <Glasses className="w-10 h-10 text-blue-600" />;
      case 'Umbrella': return <Umbrella className="w-10 h-10 text-indigo-600" />;
      case 'BookOpen': return <BookOpen className="w-10 h-10 text-teal-600" />;
      default: return <Award className="w-10 h-10 text-brand-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </button>

          <div className="flex items-center gap-2">
            {[
              { level: 1, label: 'Easy (4 Items)' },
              { level: 2, label: 'Medium (5 Items)' },
              { level: 3, label: 'Hard (6 Items)' }
            ].map(d => (
              <button
                key={d.level}
                onClick={() => setDifficulty(d.level)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  difficulty === d.level
                    ? 'bg-brand-teal text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-teal text-xs font-bold uppercase tracking-wider mb-2">
              <Eye className="w-4 h-4" /> Immediate Short-Term Recall
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Object Recall</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              {phase === 'memorize'
                ? 'Observe these items carefully. They will hide soon!'
                : 'Which objects did you see? Tap on all the items you remember.'}
            </p>
          </div>

          <button
            onClick={() => startNewGame(difficulty)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Restart
          </button>
        </div>

        {/* PHASE 1: MEMORIZE (Showing objects with countdown) */}
        {phase === 'memorize' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-3xl p-6 text-center shadow-lg">
              <div className="flex items-center justify-center gap-2 text-lg font-bold">
                <Clock className="w-6 h-6 animate-spin" />
                Memorize Time Remaining:
              </div>
              <div className="text-5xl sm:text-6xl font-black mt-2 tracking-tight">
                {countdown}s
              </div>
              <p className="text-blue-100 text-sm mt-1">Items will conceal automatically when the timer reaches zero</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {targetItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border-2 border-brand-teal/40 shadow-soft flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200"
                >
                  <div className="p-4 bg-teal-50 rounded-2xl mb-3">
                    {renderIcon(item.iconName)}
                  </div>
                  <span className="text-base font-bold text-slate-800">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 2: RECALL (Select items seen) */}
        {phase === 'recall' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-brand-primary uppercase tracking-wide">Recall Task:</span>
                <p className="text-slate-800 font-bold text-base">Select the {targetItems.length} objects that were shown</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-600">Selected: </span>
                <span className="text-lg font-black text-brand-primary">{selectedIds.length}</span>
                <span className="text-sm text-slate-500"> / {targetItems.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {allOptions.map(option => {
                const isSelected = selectedIds.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleSelectOption(option.id)}
                    className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center justify-center text-center relative ${
                      isSelected
                        ? 'bg-teal-50 border-brand-teal shadow-elevated scale-102'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-soft'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-teal text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                    <div className="p-3 bg-slate-50 rounded-2xl mb-2">
                      {renderIcon(option.iconName)}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{option.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={handleFinishRecall}
                disabled={selectedIds.length === 0}
                className="w-full py-4 bg-brand-primary text-white text-lg font-bold rounded-2xl hover:bg-brand-primaryHover transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-6 h-6" /> Submit My Recall Answers
              </button>
            </div>
          </div>
        )}
      </div>

      <GameResultModal
        isOpen={showResultModal}
        result={gameResult}
        onClose={() => setShowResultModal(false)}
        onPlayAgain={() => startNewGame(difficulty)}
      />
    </div>
  );
};
