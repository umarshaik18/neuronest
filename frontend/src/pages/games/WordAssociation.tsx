import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { api, GameResultResponse } from '../../services/api';
import { GameResultModal } from '../../components/GameResultModal';
import { ArrowLeft, BookOpen, CheckCircle, RotateCcw, Check, Sparkles } from 'lucide-react';

interface WordChallenge {
  theme: string;
  themeDescription: string;
  options: { text: string; isRelated: boolean }[];
}

const WORD_CHALLENGES: WordChallenge[] = [
  {
    theme: 'Hospital (अस्पताल / ఆసుపత్రి)',
    themeDescription: 'Select all words directly associated with a healthcare clinic or hospital.',
    options: [
      { text: 'Doctor', isRelated: true },
      { text: 'Medicine', isRelated: true },
      { text: 'Nurse', isRelated: true },
      { text: 'Banana', isRelated: false },
      { text: 'Stethoscope', isRelated: true },
      { text: 'Cricket Bat', isRelated: false }
    ]
  },
  {
    theme: 'Kitchen (रसोई / వంటగది)',
    themeDescription: 'Select items typically found and used in a home cooking kitchen.',
    options: [
      { text: 'Teapot / Kettle', isRelated: true },
      { text: 'Fresh Spices', isRelated: true },
      { text: 'Gas Stove', isRelated: true },
      { text: 'Bicycle Helmet', isRelated: false },
      { text: 'Ceramic Plates', isRelated: true },
      { text: 'Umbrella', isRelated: false }
    ]
  },
  {
    theme: 'Local Market (बाजार / మార్కెట్)',
    themeDescription: 'Choose words related to morning shopping at a traditional Indian market.',
    options: [
      { text: 'Fresh Vegetables', isRelated: true },
      { text: 'Cloth Bag', isRelated: true },
      { text: 'Vendor Stall', isRelated: true },
      { text: 'Pillow', isRelated: false },
      { text: 'Weighing Scale', isRelated: true },
      { text: 'Toothbrush', isRelated: false }
    ]
  },
  {
    theme: 'Family Home (परिवार / కుటుంబం)',
    themeDescription: 'Select words that express family bonding, home warmth, and care.',
    options: [
      { text: 'Grandchildren', isRelated: true },
      { text: 'Evening Dinner', isRelated: true },
      { text: 'Family Photo Album', isRelated: true },
      { text: 'Traffic Light', isRelated: false },
      { text: 'Warm Tea Time', isRelated: true },
      { text: 'Airport Runway', isRelated: false }
    ]
  }
];

export const WordAssociation: React.FC = () => {
  const { t } = useLanguage();
  const { speakText } = useAccessibility();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState<number>(1);
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [gameResult, setGameResult] = useState<GameResultResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const startTimeRef = useRef<number>(0);
  const challenge = WORD_CHALLENGES[challengeIdx];

  const startChallenge = (idx = challengeIdx) => {
    setSelectedWords([]);
    startTimeRef.current = Date.now();
    const curr = WORD_CHALLENGES[idx];
    speakText(`Semantic Association: Connect the words related to ${curr.theme}.`);
  };

  useEffect(() => {
    startChallenge(challengeIdx);
  }, [challengeIdx]);

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleVerifyWords = async () => {
    const durationSec = Math.max(1.5, Number(((Date.now() - startTimeRef.current) / 1000).toFixed(1)));
    
    const correctWords = challenge.options.filter(o => o.isRelated).map(o => o.text);
    let correctCount = 0;
    let mistakeCount = 0;

    selectedWords.forEach(w => {
      if (correctWords.includes(w)) correctCount++;
      else mistakeCount++;
    });

    const accuracy = Math.round((correctCount / Math.max(correctWords.length, selectedWords.length)) * 100);
    const score = Math.max(45, Math.min(100, Math.round(accuracy * 0.85 + (correctCount * 4) - (mistakeCount * 4))));

    const payload = {
      user_id: user?.user_id || 'user-anita-01',
      game_id: 'word-association',
      score,
      accuracy,
      response_time: durationSec,
      attempts: selectedWords.length,
      difficulty_level: difficulty
    };

    const res = await api.submitGameResult('word-association', payload);
    setGameResult(res);
    setShowResultModal(true);
    speakText("Semantic answers submitted! Great job reinforcing these vocabulary connections.");
  };

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
            {WORD_CHALLENGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setChallengeIdx(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  challengeIdx === i
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Theme {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" /> Semantic Vocabulary & Association
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Word Association</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              {challenge.themeDescription}
            </p>
          </div>

          <button
            onClick={() => startChallenge(challengeIdx)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Clear Choices
          </button>
        </div>

        {/* Prompt Word Focus Card */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 rounded-3xl text-center shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-200 block mb-2">
            Central Concept
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            “{challenge.theme}”
          </h2>
          <p className="text-blue-200 text-sm mt-2 max-w-md mx-auto">
            Select all the words below that belong in this group. (Avoid unrelated items!)
          </p>
        </div>

        {/* Word Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {challenge.options.map(opt => {
            const isSelected = selectedWords.includes(opt.text);
            return (
              <button
                key={opt.text}
                onClick={() => toggleWord(opt.text)}
                className={`p-5 rounded-3xl border-2 font-bold text-left transition-all flex items-center justify-between shadow-soft ${
                  isSelected
                    ? 'bg-blue-50/80 border-brand-primary text-brand-primary ring-4 ring-blue-100 scale-[1.01]'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className="text-lg">{opt.text}</span>
                <div className={`w-8 h-8 rounded-2xl border-2 flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-brand-primary border-brand-primary text-white'
                    : 'border-slate-300 text-transparent'
                }`}>
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit Verification */}
        <div className="pt-4">
          <button
            onClick={handleVerifyWords}
            disabled={selectedWords.length === 0}
            className="w-full py-4 bg-brand-primary text-white text-lg font-bold rounded-2xl hover:bg-brand-primaryHover transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-6 h-6" /> Submit Semantic Choices
          </button>
        </div>
      </div>

      <GameResultModal
        isOpen={showResultModal}
        result={gameResult}
        onClose={() => setShowResultModal(false)}
        onPlayAgain={() => startChallenge(challengeIdx)}
      />
    </div>
  );
};
