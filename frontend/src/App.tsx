import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ElderlyDashboard } from './pages/ElderlyDashboard';
import { GamesPage } from './pages/GamesPage';
import { MemoryMatch } from './pages/games/MemoryMatch';
import { ObjectRecall } from './pages/games/ObjectRecall';
import { SequenceRecall } from './pages/games/SequenceRecall';
import { PatternMemory } from './pages/games/PatternMemory';
import { WordAssociation } from './pages/games/WordAssociation';
import { MemoryCompanion } from './pages/MemoryCompanion';
import { DailyLifeActivities } from './pages/DailyLifeActivities';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { CaregiverDashboard } from './pages/CaregiverDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ArchitecturePage } from './pages/ArchitecturePage';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-warmBg text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/elderly-dashboard" element={<ElderlyDashboard />} />
          
          {/* Games */}
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/memory-match" element={<MemoryMatch />} />
          <Route path="/games/object-recall" element={<ObjectRecall />} />
          <Route path="/games/sequence-recall" element={<SequenceRecall />} />
          <Route path="/games/pattern-memory" element={<PatternMemory />} />
          <Route path="/games/word-association" element={<WordAssociation />} />

          {/* Memory & Routine */}
          <Route path="/memory-companion" element={<MemoryCompanion />} />
          <Route path="/daily-activities" element={<DailyLifeActivities />} />

          {/* Analytics & Portals */}
          <Route path="/progress" element={<AIInsightsPage />} />
          <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/architecture" element={<ArchitecturePage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
