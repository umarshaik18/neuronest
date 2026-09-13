import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  CheckCircle2, Coffee, Key, ShoppingBag, Pill, Users,
  ListOrdered, Calendar, Sparkles, ArrowRight, Award, Check
} from 'lucide-react';

export const DailyLifeActivities: React.FC = () => {
  const { t } = useLanguage();
  const { speakText } = useAccessibility();

  // Interactive mini exercises states
  const [groceryChecked, setGroceryChecked] = useState<{ [key: string]: boolean }>({
    'Fresh Ginger': false,
    'Green Tea Leaves': false,
    'Pure Milk': false,
    'Cardamom Pods': false
  });

  const [keyLocationAnswer, setKeyLocationAnswer] = useState<string | null>(null);
  const [familyMatch, setFamilyMatch] = useState<{ [key: string]: string }>({});

  const toggleGrocery = (item: string) => {
    setGroceryChecked(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-brand-green text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" /> Everyday Functional Cognition
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Daily Life Activities & Exercises
          </h1>
          <p className="text-slate-600 text-base mt-2 max-w-2xl leading-relaxed">
            Real-world cognitive drills that directly reinforce functional independence in everyday home living, from remembering groceries to household item locations.
          </p>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity 1: Remember 3 Grocery Items */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">1. Grocery Memory Checklist</h3>
                <span className="text-xs text-slate-500">Working memory retention</span>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Check off the 3 grocery items you agreed to remember for morning tea:
            </p>

            <div className="space-y-2">
              {Object.keys(groceryChecked).map(item => (
                <button
                  key={item}
                  onClick={() => toggleGrocery(item)}
                  className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between text-sm font-bold transition-all ${
                    groceryChecked[item]
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{item}</span>
                  <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center ${
                    groceryChecked[item] ? 'bg-green-600 border-green-600 text-white' : 'border-slate-300'
                  }`}>
                    {groceryChecked[item] && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Activity 2: Where did you place your keys? */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-brand-primary rounded-2xl">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">2. Where did you place your keys?</h3>
                <span className="text-xs text-slate-500">Spatial object placement recall</span>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Where is the designated safe place in the house for spectacles and house keys?
            </p>

            <div className="space-y-2">
              {[
                { id: 'tray', text: 'On the carved wooden tray beside the telephone table', correct: true },
                { id: 'sofa', text: 'Under the cushions of the living room sofa', correct: false },
                { id: 'balcony', text: 'On the outside garden bench', correct: false }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setKeyLocationAnswer(opt.id);
                    if (opt.correct) {
                      speakText("Correct! The keys and glasses are safely kept on the wooden tray beside the telephone table.");
                    }
                  }}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm font-bold transition-all ${
                    keyLocationAnswer === opt.id
                      ? opt.correct
                        ? 'bg-green-50 border-green-400 text-green-900'
                        : 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {keyLocationAnswer === 'tray' && (
              <div className="p-3 bg-green-50 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Correct! Habitual location anchors prevent misplaced essentials.
              </div>
            )}
          </div>

          {/* Activity 3: Sequence Morning Routine */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 text-brand-purple rounded-2xl">
                <ListOrdered className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">3. Morning Routine Sequencing</h3>
                <span className="text-xs text-slate-500">Executive procedural sequencing</span>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Practice arranging daily activities into an easy step-by-step routine with our full game.
            </p>

            <Link
              to="/games/sequence-recall"
              className="w-full py-3.5 bg-purple-50 border border-purple-200 text-brand-purple rounded-2xl font-bold hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              Launch Sequence Practice Game <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Activity 4: Family Member Photo Drill */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-50 text-brand-teal rounded-2xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">4. Kinship & Family Faces</h3>
                <span className="text-xs text-slate-500">Social cognitive memory</span>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Recall faces, relations, and phone call times for loved ones in Guwahati and Dibrugarh.
            </p>

            <Link
              to="/memory-companion"
              className="w-full py-3.5 bg-teal-50 border border-teal-200 text-brand-teal rounded-2xl font-bold hover:bg-teal-100 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              Open Family Recall Vault <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
