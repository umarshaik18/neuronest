import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Brain, User, Users, ShieldCheck, ArrowRight, Calendar,
  Sparkles, CheckCircle2, Lock
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const { loginElderly, loginCaregiver, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = searchParams.get('role') === 'caregiver' ? 'caregiver' : 'elderly';
  const [selectedRole, setSelectedRole] = useState<'elderly' | 'caregiver' | 'admin'>(initialRole as any);

  // Elderly Form
  const [elderlyName, setElderlyName] = useState('Anita Sharma');
  const [elderlyDob, setElderlyDob] = useState('15/08/1954');

  // Caregiver Form
  const [careEmail, setCareEmail] = useState('priya@neuronest.org');
  const [carePassword, setCarePassword] = useState('caregiver123');

  const [isLoading, setIsLoading] = useState(false);

  const handleElderlySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await loginElderly(elderlyName, elderlyDob);
    setIsLoading(false);
    navigate('/elderly-dashboard');
  };

  const handleCaregiverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await loginCaregiver(careEmail, carePassword);
    setIsLoading(false);
    navigate('/caregiver-dashboard');
  };

  const handleAdminSubmit = async () => {
    setIsLoading(true);
    await loginAdmin();
    setIsLoading(false);
    navigate('/admin-dashboard');
  };

  const fillAnitaDemo = () => {
    setElderlyName('Anita Sharma');
    setElderlyDob('15/08/1954');
  };

  return (
    <div className="min-h-screen bg-brand-warmBg py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-8">
        {/* Top Header Card */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-brand-primary to-brand-teal flex items-center justify-center text-white shadow-md">
            <Brain className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome to NeuroNest
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Select your account type to enter your cognitive wellness portal.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-200/80 rounded-2xl">
          <button
            onClick={() => setSelectedRole('elderly')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-xs sm:text-sm transition-all ${
              selectedRole === 'elderly'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Senior Patient
          </button>
          <button
            onClick={() => setSelectedRole('caregiver')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-xs sm:text-sm transition-all ${
              selectedRole === 'caregiver'
                ? 'bg-white text-brand-teal shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Caregiver
          </button>
          <button
            onClick={() => setSelectedRole('admin')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-xs sm:text-sm transition-all ${
              selectedRole === 'admin'
                ? 'bg-white text-brand-purple shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
        </div>

        {/* 1. ELDERLY LOGIN FORM */}
        {selectedRole === 'elderly' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-elevated space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Elderly Access Login</h2>
                <p className="text-xs text-slate-500 mt-0.5">Simple, large fields designed for seniors</p>
              </div>
              <button
                type="button"
                onClick={fillAnitaDemo}
                className="px-3 py-1.5 rounded-xl bg-blue-50 text-brand-primary text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                1-Click Demo Fill
              </button>
            </div>

            <form onSubmit={handleElderlySubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Full Name / आपका नाम
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={elderlyName}
                    onChange={e => setElderlyName(e.target.value)}
                    placeholder="e.g. Anita Sharma"
                    className="w-full px-5 py-4 text-base font-semibold border-2 border-slate-200 rounded-2xl focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-blue-50"
                  />
                  <User className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Date of Birth / जन्म तिथि
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={elderlyDob}
                    onChange={e => setElderlyDob(e.target.value)}
                    placeholder="DD/MM/YYYY (e.g. 15/08/1954)"
                    className="w-full px-5 py-4 text-base font-semibold border-2 border-slate-200 rounded-2xl focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-blue-50"
                  />
                  <Calendar className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  For this prototype, your Date of Birth is used as your secure access key.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-brand-primary text-white text-lg font-black rounded-2xl hover:bg-brand-primaryHover transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Login to NeuroNest</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* 2. CAREGIVER LOGIN FORM */}
        {selectedRole === 'caregiver' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-elevated space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Caregiver Portal Login</h2>
              <p className="text-xs text-slate-500 mt-0.5">Family members and authorized care nurses</p>
            </div>

            <form onSubmit={handleCaregiverSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Caregiver Email
                </label>
                <input
                  type="email"
                  required
                  value={careEmail}
                  onChange={e => setCareEmail(e.target.value)}
                  className="w-full px-5 py-4 text-base font-semibold border-2 border-slate-200 rounded-2xl focus:border-brand-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={carePassword}
                    onChange={e => setCarePassword(e.target.value)}
                    className="w-full px-5 py-4 text-base font-semibold border-2 border-slate-200 rounded-2xl focus:border-brand-teal focus:outline-none"
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-brand-teal text-white text-lg font-black rounded-2xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Login as Caregiver</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* 3. ADMIN ACCESS */}
        {selectedRole === 'admin' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-elevated text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-50 text-brand-purple flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Clinical Administrator Portal</h2>
              <p className="text-xs text-slate-500 mt-1">Access NER telemetry data and system oversight</p>
            </div>

            <button
              onClick={handleAdminSubmit}
              disabled={isLoading}
              className="w-full py-5 bg-brand-purple text-white text-lg font-black rounded-2xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>Enter Admin Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
