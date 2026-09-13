import React, { createContext, useContext, useState, useEffect } from 'react';

export type TextSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (val: boolean) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (val: boolean) => void;
  largeButtons: boolean;
  setLargeButtons: (val: boolean) => void;
  speakText: (text: string, lang?: string) => void;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>(() => (localStorage.getItem('neuronest_textSize') as TextSize) || 'normal');
  const [highContrast, setHighContrast] = useState<boolean>(() => localStorage.getItem('neuronest_highContrast') === 'true');
  const [reduceMotion, setReduceMotion] = useState<boolean>(() => localStorage.getItem('neuronest_reduceMotion') === 'true');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => localStorage.getItem('neuronest_voiceEnabled') !== 'false');
  const [largeButtons, setLargeButtons] = useState<boolean>(() => localStorage.getItem('neuronest_largeButtons') === 'true');

  useEffect(() => {
    localStorage.setItem('neuronest_textSize', textSize);
    const root = document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${textSize}`);
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem('neuronest_highContrast', String(highContrast));
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('neuronest_reduceMotion', String(reduceMotion));
    const root = document.documentElement;
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  useEffect(() => {
    localStorage.setItem('neuronest_largeButtons', String(largeButtons));
    const root = document.documentElement;
    if (largeButtons) {
      root.classList.add('large-touch-targets');
    } else {
      root.classList.remove('large-touch-targets');
    }
  }, [largeButtons]);

  const speakText = (text: string, lang: string = 'en') => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // Calm, comprehensible pace for elderly listeners
    utterance.pitch = 1.0;
    
    // Choose appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'hi') {
      const hiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = 'hi-IN';
    } else if (lang === 'te') {
      const teVoice = voices.find(v => v.lang.includes('te'));
      if (teVoice) utterance.voice = teVoice;
      utterance.lang = 'te-IN';
    } else {
      const enVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-US';
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        reduceMotion,
        setReduceMotion,
        voiceEnabled,
        setVoiceEnabled,
        largeButtons,
        setLargeButtons,
        speakText,
        stopSpeaking
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
