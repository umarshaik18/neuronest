import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  BookOpen, Users, MapPin, Clock, Pill, FileText, Plus,
  Heart, Phone, Home, Sparkles, Check, CheckCircle2, AlertCircle
} from 'lucide-react';

export const MemoryCompanion: React.FC = () => {
  const { t } = useLanguage();
  const { speakText } = useAccessibility();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'schedule' | 'people' | 'places' | 'medicine' | 'notes'>('schedule');
  const [memories, setMemories] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', description: '', category: 'notes' });

  useEffect(() => {
    const uid = user?.user_id || 'user-anita-01';
    api.getMemories(uid).then(setMemories);
    api.getTasks(uid).then(setTasks);
  }, [user]);

  const handleAddNote = async () => {
    if (!newNote.title.trim()) return;
    const uid = user?.user_id || 'user-anita-01';
    await api.addMemory({
      user_id: uid,
      category: newNote.category,
      title: newNote.title,
      description: newNote.description
    });
    const updated = await api.getMemories(uid);
    setMemories(updated);
    setNewNote({ title: '', description: '', category: 'notes' });
    setIsAddModalOpen(false);
    speakText("New memory note added successfully.");
  };

  const people = memories.filter(m => m.category === 'people');
  const places = memories.filter(m => m.category === 'places');
  const medicines = memories.filter(m => m.category === 'medicine');
  const notes = memories.filter(m => m.category === 'notes');

  return (
    <div className="min-h-screen bg-brand-warmBg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-brand-teal text-xs font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4 text-rose-500 fill-current" /> Autobiographical & Daily Recall Support
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('memoryCompanion.title')}
            </h1>
            <p className="text-slate-600 text-base max-w-2xl">
              {t('memoryCompanion.subtitle')}
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-4 bg-brand-teal text-white font-bold rounded-2xl hover:bg-teal-600 transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <Plus className="w-5 h-5" /> Add Note / Memory
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { id: 'schedule', label: t('memoryCompanion.schedule'), icon: Clock },
            { id: 'people', label: t('memoryCompanion.people'), icon: Users },
            { id: 'places', label: t('memoryCompanion.places'), icon: MapPin },
            { id: 'medicine', label: t('memoryCompanion.medicine'), icon: Pill },
            { id: 'notes', label: t('memoryCompanion.notes'), icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Today's Daily Schedule</h2>
            <div className="space-y-3.5">
              {tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 py-2 rounded-xl bg-blue-50 text-brand-primary font-black text-sm text-center border border-blue-100">
                      {task.scheduled_time}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{task.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600">{task.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    task.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PEOPLE TO REMEMBER */}
        {activeTab === 'people' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {people.map(person => (
              <div
                key={person.memory_id}
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft flex items-start gap-5"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-500 text-white font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
                  {person.title.charAt(0)}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">{person.title}</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-brand-teal">
                      {person.relation}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{person.description}</p>
                  <button
                    onClick={() => speakText(`This is ${person.title}, your ${person.relation}. ${person.description}`)}
                    className="text-xs font-bold text-brand-teal hover:underline pt-2 flex items-center gap-1"
                  >
                    Read Aloud 🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: IMPORTANT PLACES */}
        {activeTab === 'places' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {places.map(place => (
              <div
                key={place.memory_id}
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-soft space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-primary flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">{place.title}</h3>
                <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {place.relation}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed">{place.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: MEDICINE REMINDERS */}
        {activeTab === 'medicine' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medicines.map(med => (
              <div
                key={med.memory_id}
                className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-soft flex items-start gap-4"
              >
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Pill className="w-8 h-8" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">{med.title}</h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800">
                      {med.scheduled_time || 'Daily'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{med.relation}</p>
                  <p className="text-sm text-slate-600 mt-1">{med.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: PERSONAL NOTES */}
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map(note => (
              <div
                key={note.memory_id}
                className="bg-amber-50/70 rounded-3xl p-6 border-2 border-amber-200 shadow-soft space-y-2"
              >
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <Sparkles className="w-4 h-4" /> Helpful Note
                </div>
                <h3 className="text-lg font-black text-slate-900">{note.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{note.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add Note Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Add Memory Note</h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newNote.category}
                  onChange={e => setNewNote({ ...newNote, category: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-2xl text-sm"
                >
                  <option value="notes">Personal Note</option>
                  <option value="people">Person to Remember</option>
                  <option value="places">Important Place</option>
                  <option value="medicine">Medicine Reminder</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="e.g. Garden watering schedule"
                  className="w-full p-3 border border-slate-200 rounded-2xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Details</label>
                <textarea
                  value={newNote.description}
                  onChange={e => setNewNote({ ...newNote, description: e.target.value })}
                  placeholder="Key details you wish to remember..."
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-2xl text-sm"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="flex-1 py-3 bg-brand-teal text-white rounded-2xl font-bold hover:bg-teal-600"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
