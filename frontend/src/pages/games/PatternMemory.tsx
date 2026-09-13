import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { api, GameResultResponse } from '../../services/api';
import { GameResultModal } from '../../components/GameResultModal';
import { ArrowLeft, LayoutGrid, RotateCcw, Clock, CheckCircle2, Sparkles } from 'lucide-react';

export const PatternMemory: React.FC = () => {
  const { t } = useLanguage();
  const { speakText } = useAccessibility();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState<number>(1); // 1: 3x3, 4 cells; 2: 3x3, 5 cells; 3: 4x4, 6 cells
  const [gridSize, setGridSize] = useState<number>(3);
  const [patternCells, setPatternCells] = useState<number[]>([]);
  const [userSelectedCells, setUserSelectedCells] = useState<number[]>([]);
  const [phase, setPhase] = useState<'memorize' | 'reproduce'>('memorize');
  const [countdown, setCountdown] = useState<number>(4);
  const [gameResult, setGameResult] = useState<GameResultResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const startTimeRef = useRef<number>(0);

  const startNewGame = (diff = difficulty) => {
    const size = diff === 3 ? 4 : 3;
    setGridSize(size);
    const totalCells = size * size;
    const cellCount = diff === 1 ? 4 : diff === 2 ? 5 : 6;

    // Pick unique random cell indices
    const indices: number[] = [];
    while (indices.length < cellCount) {
      const rand = Math.floor(Math.random() * totalCells);
      if (!indices.includes(rand)) indices.push(rand);
    }

    setPatternCells(indices);
    setUserSelectedCells([]);
    setPhase('memorize');
    const memoSec = diff === 1 ? 4 : diff === 2 ? 3 : 3;
    setCountdown(memoSec);

    speakText("Watch the glowing grid pattern closely. Memorize which cells light up!");
  };

  useEffect(() => {
    startNewGame(difficulty);
  }, [difficulty]);

  useEffect(() => {
    let timer: any = null;
    if (phase === 'memorize' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(c => c - 1);
      }, 1000);
    } else if (phase === 'memorize' && countdown === 0) {
      setPhase('reproduce');
      startTimeRef.current = Date.now();
      speakText("Now tap the cells that were lit up to recreate the pattern.");
    }
    return () => clearInterval(timer);
  }, [phase, countdown]);

  const toggleCell = (index: number) => {
    if (phase !== 'reproduce') return;
    if (userSelectedCells.includes(index)) {
      setUserSelectedCells(userSelectedCells.filter(i => i !== index));
    } else {
      if (userSelectedCells.length < patternCells.length) {
        setUserSelectedCells([...userSelectedCells, index]);
      }
    }
  };

  const handleVerifyPattern = async () => {
    const durationSec = Math.max(1.5, Number(((Date.now() - startTimeRef.current) / 1000).toFixed(1)));
    
    let correctMatches = 0;
    userSelectedCells.forEach(idx => {
      if (patternCells.includes(idx)) correctMatches++;
    });

    const accuracy = Math.round((correctMatches / patternCells.length) * 100);
    const score = Math.max(40, Math.min(100, Math.round(accuracy * 0.85 + (correctMatches * 3))));

    const payload = {
      user_id: user?.user_id || 'user-anita-01',
      game_id: 'pattern-memory',
      score,
      accuracy,
      response_time: durationSec,
      attempts: userSelectedCells.length,
      difficulty_level: difficulty
    };

    const res = await api.submitGameResult('pattern-memory', payload);
    setGameResult(res);
    setShowResultModal(true);
    speakText("Pattern submitted! Let's see your spatial memory results.");
  };

  const totalCells = gridSize * gridSize;

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
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
              { level: 1, label: 'Easy (3x3, 4 Dots)' },
              { level: 2, label: 'Medium (3x3, 5 Dots)' },
              { level: 3, label: 'Hard (4x4, 6 Dots)' }
            ].map(d => (
              <button
                key={d.level}
                onClick={() => setDifficulty(d.level)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  difficulty === d.level
                    ? 'bg-brand-purple text-white shadow-md'
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              <LayoutGrid className="w-4 h-4" /> Spatial Pattern Memory
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Pattern Memory</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              {phase === 'memorize'
                ? 'Memorize the highlighted dots before they fade!'
                : `Tap the ${patternCells.length} cells to recreate the illuminated pattern.`}
            </p>
          </div>

          <button
            onClick={() => startNewGame(difficulty)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Re-pattern
          </button>
        </div>

        {/* Status indicator banner */}
        <div className={`p-4 rounded-2xl border text-center font-bold transition-all ${
          phase === 'memorize'
            ? 'bg-purple-50 border-purple-200 text-brand-purple'
            : 'bg-blue-50 border-blue-200 text-brand-primary'
        }`}>
          {phase === 'memorize' ? (
            <div className="flex items-center justify-center gap-2 text-base">
              <Clock className="w-5 h-5 animate-pulse" />
              Pattern visible for: <span className="text-2xl font-black">{countdown}s</span>
            </div>
          ) : (
            <div className="flex items-center justify-between px-4">
              <span>Recreate the pattern:</span>
              <span>{userSelectedCells.length} / {patternCells.length} selected</span>
            </div>
          )}
        </div>

        {/* Interactive Matrix Grid */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft flex items-center justify-center">
          <div
            className="grid gap-3 sm:gap-4 max-w-md w-full"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
            }}
          >
            {Array.from({ length: totalCells }).map((_, idx) => {
              const isPattern = patternCells.includes(idx);
              const isSelected = userSelectedCells.includes(idx);

              let cellStyle = 'bg-slate-100 border-slate-200 hover:bg-slate-200';
              if (phase === 'memorize') {
                cellStyle = isPattern
                  ? 'bg-brand-purple text-white shadow-elevated scale-105 border-brand-purple ring-4 ring-purple-100'
                  : 'bg-slate-100 border-slate-200 opacity-60';
              } else {
                cellStyle = isSelected
                  ? 'bg-brand-primary text-white border-brand-primary shadow-elevated ring-4 ring-blue-100'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-blue-50/50';
              }

              return (
                <button
                  key={idx}
                  onClick={() => toggleCell(idx)}
                  disabled={phase === 'memorize'}
                  className={`aspect-square rounded-2xl sm:rounded-3xl border-2 transition-all flex items-center justify-center ${cellStyle}`}
                  aria-label={`Cell ${idx + 1}`}
                >
                  {(phase === 'memorize' && isPattern) || (phase === 'reproduce' && isSelected) ? (
                    <div className="w-6 h-6 rounded-full bg-white/90 shadow-sm" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Verification */}
        {phase === 'reproduce' && (
          <div className="pt-2">
            <button
              onClick={handleVerifyPattern}
              disabled={userSelectedCells.length === 0}
              className="w-full py-4 bg-brand-primary text-white text-lg font-bold rounded-2xl hover:bg-brand-primaryHover transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-6 h-6" /> Submit Pattern Answer
            </button>
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
