import React from 'react';
import { useAccessibility, TextSize } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { Type, Eye, Volume2, Sparkles, X, Check, MousePointerClick } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    voiceEnabled,
    setVoiceEnabled,
    largeButtons,
    setLargeButtons
  } = useAccessibility();

  const { language, setLanguage, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility Settings"
      >
        <div className="bg-brand-primary text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t('accessibility.title')}</h2>
              <p className="text-sm text-blue-100">Elderly-friendly display and voice controls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Language Selector */}
          <div>
            <label className="block text-base font-semibold text-slate-800 mb-2">
              Language / भाषा / భాష
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिन्दी (Hindi)' },
                { code: 'te', label: 'తెలుగు (Telugu)' }
              ].map(item => (
                <button
                  key={item.code}
                  onClick={() => setLanguage(item.code as any)}
                  className={`py-3 px-3 rounded-2xl text-center font-medium border-2 transition-all ${
                    language === item.code
                      ? 'border-brand-primary bg-blue-50 text-brand-primary font-bold shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <Type className="w-5 h-5 text-brand-teal" />
                {t('accessibility.textSize')}
              </span>
              <span className="text-sm font-medium text-slate-500 capitalize">{textSize}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { size: 'normal', label: t('accessibility.normal') },
                { size: 'large', label: t('accessibility.large') },
                { size: 'xlarge', label: t('accessibility.xlarge') }
              ].map(btn => (
                <button
                  key={btn.size}
                  onClick={() => setTextSize(btn.size as TextSize)}
                  className={`py-3 px-2 rounded-2xl border-2 font-medium text-center transition-all ${
                    textSize === btn.size
                      ? 'border-brand-primary bg-blue-50 text-brand-primary font-bold shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-semibold text-slate-800 flex items-center gap-2">
                <Eye className="w-5 h-5 text-brand-primary" />
                {t('accessibility.highContrast')}
              </div>
              <p className="text-xs text-slate-500">Dark outlines and sharp contrast for easier visibility</p>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${
                highContrast ? 'bg-brand-primary' : 'bg-slate-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                highContrast ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Large Touch Targets */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-semibold text-slate-800 flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-brand-green" />
                {t('accessibility.largeButtons')}
              </div>
              <p className="text-xs text-slate-500">Extra large buttons for comfortable tapping</p>
            </div>
            <button
              onClick={() => setLargeButtons(!largeButtons)}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${
                largeButtons ? 'bg-brand-green' : 'bg-slate-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                largeButtons ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Voice Assistance */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-semibold text-slate-800 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-brand-purple" />
                {t('accessibility.voiceAssistance')}
              </div>
              <p className="text-xs text-slate-500">Gentle spoken audio guidance and instructions</p>
            </div>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${
                voiceEnabled ? 'bg-brand-purple' : 'bg-slate-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                voiceEnabled ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-semibold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-slate-600" />
                {t('accessibility.reduceMotion')}
              </div>
              <p className="text-xs text-slate-500">Minimizes screen movements to avoid disorientation</p>
            </div>
            <button
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${
                reduceMotion ? 'bg-brand-primary' : 'bg-slate-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${
                reduceMotion ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-3 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primaryHover transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Check className="w-5 h-5" />
            {t('accessibility.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
