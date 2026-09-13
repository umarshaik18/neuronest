import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-teal flex items-center justify-center text-white">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">NeuroNest</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Personalized Cognitive Care & Memory Assistance Platform for elderly dementia patients, with specialized adaptability for North East India.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-teal">
              <Heart className="w-4 h-4 fill-current text-rose-500" />
              <span>Dedicated to compassionate geriatric care</span>
            </div>
          </div>

          {/* NER States */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-teal" />
              North Eastern Region (NER) Focus
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <li className="hover:text-white transition-colors">• Arunachal Pradesh</li>
              <li className="hover:text-white transition-colors">• Assam</li>
              <li className="hover:text-white transition-colors">• Manipur</li>
              <li className="hover:text-white transition-colors">• Meghalaya</li>
              <li className="hover:text-white transition-colors">• Mizoram</li>
              <li className="hover:text-white transition-colors">• Nagaland</li>
              <li className="hover:text-white transition-colors">• Sikkim</li>
              <li className="hover:text-white transition-colors">• Tripura</li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform Modules
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/games" className="text-slate-400 hover:text-white transition-colors">
                  5 Cognitive Games Suite
                </Link>
              </li>
              <li>
                <Link to="/memory-companion" className="text-slate-400 hover:text-white transition-colors">
                  Memory Companion & Routines
                </Link>
              </li>
              <li>
                <Link to="/daily-activities" className="text-slate-400 hover:text-white transition-colors">
                  Daily Life Activities
                </Link>
              </li>
              <li>
                <Link to="/caregiver-dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Caregiver Monitoring Portal
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Admin Analytics & Telemetry
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="text-slate-400 hover:text-white transition-colors">
                  AI Architecture & Closed-Loop
                </Link>
              </li>
            </ul>
          </div>

          {/* Medical & Ethical Disclaimer */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Ethical AI & Clinical Safety
            </h3>
            <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs text-slate-300 leading-relaxed">
              NeuroNest supports cognitive wellness, memory assistance and activity tracking. It does not diagnose dementia or replace professional medical care.
            </div>
            <p className="text-[11px] text-slate-500">
              Developed for Smart India Hackathon (SIH 2026) / Academic Research in Healthcare AI.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 NeuroNest : Personalized Cognitive Care. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>English • हिन्दी • తెలుగు</span>
            <span>WCAG AAA Accessible Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
