import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { api, GameResultResponse } from '../../services/api';
import { GameResultModal } from '../../components/GameResultModal';
import {
  ArrowLeft, ListOrdered, ArrowUp, ArrowDown, CheckCircle,
  RotateCcw, Sparkles, Coffee, Sun, HeartPulse, Footprints, Clock
} from 'lucide-react';

interface RoutineStep {
  id: number;
  text: string;
  iconHint: string;
  correctIndex: number;
}

interface RoutineScenario {
  id: string;
  title: string;
  category: string;
  description: string;
  steps: { text: string; iconHint: string }[];
}

const SCENARIOS: RoutineScenario[] = [
  {
    id: 'morning-routine',
    title: 'Daily Morning Routine',
    category: 'Daily Living',
    description: 'Arrange these morning steps in the natural order you perform them each day.',
    steps: [
      { text: 'Wake Up & Open Window for Fresh Air', iconHint: 'Sun' },
      { text: 'Brush Teeth & Wash Face', iconHint: 'Sparkles' },
      { text: 'Enjoy Wholesome Breakfast', iconHint: 'Coffee' },
      { text: 'Take Prescribed Morning Medicine with Water', iconHint: 'HeartPulse' },
      { text: 'Go for a Gentle Walk in the Garden', iconHint: 'Footprints' }
    ]
  },
  {
    id: 'assam-tea',
    title: 'Preparing Traditional Assam Tea',
    category: 'Cultural & Culinary',
    description: 'Reorder the traditional steps to brew a warm, fragrant cup of Assam ginger tea.',
    steps: [
      { text: 'Boil Fresh Water in Saucepan', iconHint: 'Coffee' },
      { text: 'Crush Fresh Ginger and Cardamom', iconHint: 'Sparkles' },
      { text: 'Add Strong Assam Black Tea Leaves', iconHint: 'Sun' },
      { text: 'Pour Warm Milk & Let it Simmer', iconHint: 'Coffee' },
      { text: 'Strain Carefully into Favorite Cup', iconHint: 'Coffee' }
    ]
  },
  {
    id: 'evening-routine',
    title: 'Bedtime & Night Routine',
    category: 'Sleep & Wellness',
    description: 'Order the relaxing activities leading up to a peaceful night of rest.',
    steps: [
      { text: 'Eat a Warm, Light Dinner', iconHint: 'Coffee' },
      { text: 'Take Night Cognitive Health Supplement', iconHint: 'HeartPulse' },
      { text: 'Speak or Video Call with Grandchildren', iconHint: 'Sparkles' },
      { text: 'Check that House Entrance Doors are Locked', iconHint: 'Sun' },
      { text: 'Turn Off Bedroom Lamps and Sleep', iconHint: 'Footprints' }
    ]
  }
];

export const SequenceRecall: React.FC = () => {
  const { t } = useLanguage();
  const { speakText } = useAccessibility();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [currentSteps, setCurrentSteps] = useState<RoutineStep[]>([]);
  const [difficulty, setDifficulty] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<GameResultResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const startTimeRef = useRef<number>(0);

  const scenario = SCENARIOS[selectedScenarioIndex];

  const initializeScenario = (scenIdx = selectedScenarioIndex) => {
    const sc = SCENARIOS[scenIdx];
    const rawSteps = sc.steps.map((s, idx) => ({
      id: idx + 1,
      text: s.text,
      iconHint: s.iconHint,
      correctIndex: idx
    }));

    // Scramble steps ensuring it is not already in correct order
    let scrambled = [...rawSteps].sort(() => 0.5 - Math.random());
    while (scrambled.every((item, idx) => item.correctIndex === idx) && rawSteps.length > 2) {
      scrambled = [...rawSteps].sort(() => 0.5 - Math.random());
    }

    setCurrentSteps(scrambled);
    setTimerSeconds(0);
    setIsPlaying(true);
    startTimeRef.current = Date.now();

    speakText(`Let's organize ${sc.title}. Use the Up and Down buttons to place the activities in correct order.`);
  };

  useEffect(() => {
    initializeScenario(selectedScenarioIndex);
  }, [selectedScenarioIndex]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (!isPlaying) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentSteps.length) return;

    const updated = [...currentSteps];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setCurrentSteps(updated);
  };

  const handleVerifySequence = async () => {
    setIsPlaying(false);
    const durationSec = Math.max(1, (Date.now() - startTimeRef.current) / 1000);
    
    // Check correctness
    let correctCount = 0;
    currentSteps.forEach((step, idx) => {
      if (step.correctIndex === idx) {
        correctCount++;
      }
    });

    const accuracy = Math.round((correctCount / currentSteps.length) * 100);
    const avgResponseTime = Math.max(2.0, Number((durationSec / currentSteps.length).toFixed(1)));
    const score = Math.max(40, Math.min(100, Math.round(accuracy * 0.85 + (correctCount * 3))));

    const payload = {
      user_id: user?.user_id || 'user-anita-01',
      game_id: 'sequence-recall',
      score,
      accuracy,
      response_time: avgResponseTime,
      attempts: currentSteps.length,
      difficulty_level: difficulty
    };

    const res = await api.submitGameResult('sequence-recall', payload);
    setGameResult(res);
    setShowResultModal(true);
    speakText("Sequence checked! Review your performance and AI recommendation.");
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
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedScenarioIndex === idx
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Routine {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
              <ListOrdered className="w-4 h-4" /> Real-Life Executive Function
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{scenario.title}</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              {scenario.description}
            </p>
          </div>

          <button
            onClick={() => initializeScenario(selectedScenarioIndex)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Re-shuffle
          </button>
        </div>

        {/* Timer Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
            <Clock className="w-4 h-4 text-brand-teal" />
            <span>Elapsed Time:</span>
            <span className="text-slate-900 font-black">
              {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Use the Move Up / Move Down buttons to order steps 1 to {currentSteps.length}
          </span>
        </div>

        {/* Reorderable Step Cards with Accessible Move Up/Down Controls */}
        <div className="space-y-3">
          {currentSteps.map((step, idx) => (
            <div
              key={step.id}
              className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-soft flex items-center justify-between gap-4 transition-all hover:border-slate-300"
            >
              {/* Step Number & Content */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-primary font-black text-xl flex items-center justify-center shrink-0 border border-blue-100">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {step.text}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">Step {idx + 1} of {currentSteps.length}</span>
                </div>
              </div>

              {/* Move Buttons (Elderly-Friendly with Large Hit Targets) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => moveStep(idx, 'up')}
                  disabled={idx === 0}
                  className="w-12 h-12 rounded-2xl border-2 border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-50 hover:text-brand-primary hover:border-blue-300 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  aria-label="Move Up"
                  title="Move step up"
                >
                  <ArrowUp className="w-6 h-6 stroke-[2.5]" />
                </button>
                <button
                  onClick={() => moveStep(idx, 'down')}
                  disabled={idx === currentSteps.length - 1}
                  className="w-12 h-12 rounded-2xl border-2 border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-50 hover:text-brand-primary hover:border-blue-300 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  aria-label="Move Down"
                  title="Move step down"
                >
                  <ArrowDown className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Verification Button */}
        <div className="pt-4">
          <button
            onClick={handleVerifySequence}
            className="w-full py-4 bg-brand-primary text-white text-lg font-bold rounded-2xl hover:bg-brand-primaryHover transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-6 h-6" /> Check My Daily Routine Sequence
          </button>
        </div>
      </div>

      <GameResultModal
        isOpen={showResultModal}
        result={gameResult}
        onClose={() => setShowResultModal(false)}
        onPlayAgain={() => initializeScenario(selectedScenarioIndex)}
      />
    </div>
  );
};
