import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAuth } from '../context/AuthContext';
import {
  Brain, Globe, Eye, Mic, User, LogOut, Menu, X, ShieldAlert,
  ChevronDown, Activity, Calendar, Award, Sparkles, MapPin
} from 'lucide-react';
import { AccessibilityPanel } from './AccessibilityPanel';
import { VoiceAssistant } from './VoiceAssistant';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isAccessOpen, setIsAccessOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const isElderly = role === 'elderly';
  const isCaregiver = role === 'caregiver';
  const isAdmin = role === 'admin';

  return (
    <>
      {/* Top Medical & Academic Disclaimer Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          <strong>Notice:</strong> NeuroNest supports cognitive wellness, memory assistance and activity tracking. It does not diagnose dementia or replace professional medical care.
        </span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-teal flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 block leading-tight">
                  NeuroNest
                </span>
                <span className="text-xs font-semibold text-brand-teal tracking-wide block">
                  Personalized Cognitive Care.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {isElderly ? (
                <>
                  <Link
                    to="/elderly-dashboard"
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                      location.pathname === '/elderly-dashboard'
                        ? 'bg-blue-50 text-brand-primary'
                        : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                    }`}
                  >
                    {t('nav.home')}
                  </Link>
                  <Link
                    to="/games"
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                      location.pathname.startsWith('/games')
                        ? 'bg-blue-50 text-brand-primary'
                        : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                    }`}
                  >
                    {t('nav.games')}
                  </Link>
                  <Link
                    to="/memory-companion"
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                      location.pathname === '/memory-companion'
                        ? 'bg-blue-50 text-brand-primary'
                        : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                    }`}
                  >
                    {t('nav.memoryCompanion')}
                  </Link>
                  <Link
                    to="/daily-activities"
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                      location.pathname === '/daily-activities'
                        ? 'bg-blue-50 text-brand-primary'
                        : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                    }`}
                  >
                    {t('nav.dailyLife')}
                  </Link>
                  <Link
                    to="/progress"
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                      location.pathname === '/progress'
                        ? 'bg-blue-50 text-brand-primary'
                        : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                    }`}
                  >
                    {t('nav.progress')}
                  </Link>
                </>
              ) : isCaregiver ? (
                <>
                  <Link
                    to="/caregiver-dashboard"
                    className="px-3.5 py-2 rounded-xl text-sm font-bold bg-teal-50 text-brand-teal"
                  >
                    Caregiver Dashboard
                  </Link>
                  <Link
                    to="/progress"
                    className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-primary"
                  >
                    Cognitive Telemetry
                  </Link>
                  <Link
                    to="/memory-companion"
                    className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-primary"
                  >
                    Schedule & Tasks
                  </Link>
                </>
              ) : isAdmin ? (
                <>
                  <Link
                    to="/admin-dashboard"
                    className="px-3.5 py-2 rounded-xl text-sm font-bold bg-purple-50 text-brand-purple"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    to="/architecture"
                    className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-primary"
                  >
                    AI Architecture
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-primary">
                    {t('nav.home')}
                  </Link>
                  <a href="/#features" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-primary">
                    {t('nav.features')}
                  </a>
                  <Link to="/games" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-primary">
                    {t('nav.games')}
                  </Link>
                  <Link to="/architecture" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-primary">
                    {t('nav.aiSystem')}
                  </Link>
                  <a href="/#ner-focus" className="px-3 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-primary">
                    {t('nav.nerFocus')}
                  </a>
                </>
              )}
            </nav>

            {/* Action Tools: Accessibility, Voice, Language, Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Voice Button */}
              <button
                onClick={() => setIsVoiceOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-brand-purple font-bold text-sm hover:shadow-md transition-all"
                title={t('voice.title')}
              >
                <Mic className="w-4 h-4 text-brand-purple animate-pulse" />
                <span className="hidden sm:inline">{t('dashboard.talkAssistant')}</span>
              </button>

              {/* Accessibility Button */}
              <button
                onClick={() => setIsAccessOpen(true)}
                className="p-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                title={t('accessibility.title')}
              >
                <Eye className="w-5 h-5 text-brand-primary" />
              </button>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Globe className="w-4 h-4 text-brand-teal" />
                  <span className="uppercase">{language}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'hi', label: 'हिन्दी (Hindi)' },
                      { code: 'te', label: 'తెలుగు (Telugu)' }
                    ].map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code as any);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-semibold flex items-center justify-between hover:bg-blue-50 ${
                          language === l.code ? 'text-brand-primary bg-blue-50/50' : 'text-slate-700'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile / Auth Button */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex flex-col text-right">
                    <span className="text-xs font-black text-slate-900 leading-tight">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-bold text-brand-teal uppercase tracking-wider">
                      {user.role} ({user.region})
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2.5 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-2xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-primaryHover transition-all shadow-md"
                >
                  {t('nav.login')}
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-2xl border border-slate-200 text-slate-700"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
            <Link
              to={isElderly ? "/elderly-dashboard" : "/"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl font-bold text-slate-800 hover:bg-blue-50"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/games"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl font-bold text-slate-800 hover:bg-blue-50"
            >
              {t('nav.games')}
            </Link>
            <Link
              to="/memory-companion"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl font-bold text-slate-800 hover:bg-blue-50"
            >
              {t('nav.memoryCompanion')}
            </Link>
            <Link
              to="/daily-activities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl font-bold text-slate-800 hover:bg-blue-50"
            >
              {t('nav.dailyLife')}
            </Link>
            <Link
              to="/progress"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl font-bold text-slate-800 hover:bg-blue-50"
            >
              {t('nav.progress')}
            </Link>
            <Link
              to="/caregiver-dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl font-bold text-brand-teal hover:bg-teal-50"
            >
              {t('nav.caregiver')}
            </Link>
            <Link
              to="/admin-dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl font-bold text-brand-purple hover:bg-purple-50"
            >
              {t('nav.admin')}
            </Link>
            <Link
              to="/architecture"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl font-bold text-slate-800 hover:bg-blue-50"
            >
              {t('nav.aiSystem')}
            </Link>
          </div>
        )}
      </header>

      {/* Accessibility & Voice Dialogs */}
      <AccessibilityPanel isOpen={isAccessOpen} onClose={() => setIsAccessOpen(false)} />
      <VoiceAssistant isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </>
  );
};
