import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { api, GameResultResponse } from '../../services/api';
import { GameResultModal } from '../../components/GameResultModal';
import {
  RotateCcw, Clock, Target, Award, ArrowLeft,
  Smartphone, Key, Glasses, Coffee, Apple, Umbrella, Watch, BookOpen, Volume2
} from 'lucide-react';

interface CardItem {
  id: number;
  name: string;
  iconName: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ALL_CARDS = [
  { name: 'House Keys', iconName: 'Key', color: 'text-amber-600 bg-amber-50' },
  { name: 'Reading Glasses', iconName: 'Glasses', color: 'text-blue-600 bg-blue-50' },
  { name: 'Warm Cup', iconName: 'Coffee', color: 'text-amber-800 bg-amber-50' },
  { name: 'Mobile Phone', iconName: 'Smartphone', color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Fresh Apple', iconName: 'Apple', color: 'text-rose-600 bg-rose-50' },
  { name: 'Rain Umbrella', iconName: 'Umbrella', color: 'text-indigo-600 bg-indigo-50' },
  { name: 'Wrist Clock', iconName: 'Watch', color: 'text-purple-600 bg-purple-50' },
  { name: 'Story Book', iconName: 'BookOpen', color: 'text-teal-600 bg-teal-50' },
];

export const MemoryMatch: React.FC = () => {
  const { t } = useLanguage();
  const { speakText } = useAccessibility();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState<number>(1); // 1: Easy (4 pairs), 2: Med (6 pairs), 3: Hard (8 pairs)
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<GameResultResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const startTimeRef = useRef<number>(0);
  const clickTimesRef = useRef<number[]>([]);

  // Setup game board based on difficulty
  const startNewGame = (diffLevel = difficulty) => {
    const pairCount = diffLevel === 1 ? 4 : diffLevel === 2 ? 6 : 8;
    const selected = ALL_CARDS.slice(0, pairCount);
    
    // Duplicate and shuffle
    const deck: CardItem[] = [];
    let idCounter = 0;
    selected.forEach(item => {
      deck.push({ id: idCounter++, name: item.name, iconName: item.iconName, isFlipped: false, isMatched: false });
      deck.push({ id: idCounter++, name: item.name, iconName: item.iconName, isFlipped: false, isMatched: false });
    });

    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setAttempts(0);
    setMatches(0);
    setTimerSeconds(0);
    setIsPlaying(true);
    startTimeRef.current = Date.now();
    clickTimesRef.current = [];

    speakText("Pair the matching everyday items. Take your time, there is no rush.");
  };

  useEffect(() => {
    startNewGame(difficulty);
  }, [difficulty]);

  // Game timer loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Card click handler
  const handleCardClick = (index: number) => {
    if (!isPlaying) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (flippedIndices.length === 2) return;

    clickTimesRef.current.push(Date.now());

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(a => a + 1);
      const [firstIdx, secondIdx] = newFlipped;
      
      if (cards[firstIdx].name === cards[secondIdx].name) {
        // Match found!
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            return updated;
          });
          setFlippedIndices([]);
          setMatches(m => {
            const updatedMatches = m + 1;
            const totalPairs = cards.length / 2;
            if (updatedMatches === totalPairs) {
              handleGameCompletion(attempts + 1);
            }
            return updatedMatches;
          });
        }, 500);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };

  const handleGameCompletion = async (totalAttempts: number) => {
    setIsPlaying(false);
    const totalPairs = cards.length / 2;
    const accuracy = Math.min(100, Math.max(40, Math.round((totalPairs / Math.max(totalAttempts, totalPairs)) * 100)));
    const durationSec = Math.max(1, (Date.now() - startTimeRef.current) / 1000);
    const avgResponseTime = clickTimesRef.current.length > 1
      ? Math.max(1.5, Number((durationSec / clickTimesRef.current.length).toFixed(1)))
      : 3.5;
    const score = Math.max(50, Math.min(100, Math.round((accuracy * 0.7) + (Math.max(0, 100 - durationSec) * 0.3))));

    const payload = {
      user_id: user?.user_id || 'user-anita-01',
      game_id: 'memory-match',
      score,
      accuracy,
      response_time: avgResponseTime,
      attempts: totalAttempts,
      difficulty_level: difficulty
    };

    const res = await api.submitGameResult('memory-match', payload);
    setGameResult(res);
    setShowResultModal(true);
    speakText("Activity complete! Great job finding all the matching items.");
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Key': return <Key className="w-10 h-10 text-amber-600" />;
      case 'Glasses': return <Glasses className="w-10 h-10 text-blue-600" />;
      case 'Coffee': return <Coffee className="w-10 h-10 text-amber-800" />;
      case 'Smartphone': return <Smartphone className="w-10 h-10 text-emerald-600" />;
      case 'Apple': return <Apple className="w-10 h-10 text-rose-600" />;
      case 'Umbrella': return <Umbrella className="w-10 h-10 text-indigo-600" />;
      case 'Watch': return <Watch className="w-10 h-10 text-purple-600" />;
      case 'BookOpen': return <BookOpen className="w-10 h-10 text-teal-600" />;
      default: return <Award className="w-10 h-10 text-brand-primary" />;
    }
  };

  const totalPairs = cards.length / 2;

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Bar with Back Navigation */}
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
              { level: 1, label: 'Easy (4 Pairs)' },
              { level: 2, label: 'Medium (6 Pairs)' },
              { level: 3, label: 'Hard (8 Pairs)' }
            ].map(d => (
              <button
                key={d.level}
                onClick={() => setDifficulty(d.level)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  difficulty === d.level
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Header Title Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" /> Visual Working Memory
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Memory Match</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Click two cards to find matching everyday household items.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => startNewGame(difficulty)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>
        </div>

        {/* Telemetry HUD (Timer, Matches, Attempts) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
              <Clock className="w-4 h-4 text-brand-teal" /> Time
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
              <Target className="w-4 h-4 text-brand-green" /> Pairs Found
            </div>
            <div className="text-2xl font-black text-brand-green mt-1">
              {matches} / {totalPairs}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
              <Award className="w-4 h-4 text-brand-purple" /> Attempts
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {attempts}
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className={`grid gap-4 ${
          difficulty === 1 ? 'grid-cols-2 sm:grid-cols-4' : difficulty === 2 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4 sm:grid-cols-4'
        }`}>
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(idx)}
              disabled={card.isMatched || card.isFlipped}
              className={`h-36 sm:h-44 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-3 relative ${
                card.isMatched
                  ? 'bg-green-50 border-green-300 shadow-sm opacity-90 cursor-default scale-95'
                  : card.isFlipped
                  ? 'bg-white border-brand-primary shadow-elevated scale-100'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-soft cursor-pointer active:scale-95'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="flex flex-col items-center justify-center text-center animate-in zoom-in-75 duration-150">
                  <div className="p-3 bg-slate-50 rounded-2xl mb-2">
                    {renderIcon(card.iconName)}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                    {card.name}
                  </span>
                  {card.isMatched && (
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider mt-0.5">
                      Matched
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center">
                    <span className="text-xl font-black text-brand-primary/40">?</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 mt-2">Tap Card</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Game Result Modal with AI Explanation */}
      <GameResultModal
        isOpen={showResultModal}
        result={gameResult}
        onClose={() => setShowResultModal(false)}
        onPlayAgain={() => startNewGame(difficulty)}
      />
    </div>
  );
};
