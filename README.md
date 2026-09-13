# NeuroNest : Personalized Cognitive Care
### AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)

> **Smart India Hackathon (SIH 2026) / Academic Project**  
> **Core Theme**: Healthcare & MedTech • Geriatric Care • Neuroplastic Rehabilitation  
> **Regional Focus**: Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura.

---

## 🌟 Executive Summary & Problem Statement

Dementia, Alzheimer's Disease, and Mild Cognitive Impairment (MCI) represent an escalating public health crisis among elderly populations across Northeast India. The region faces severe geographical barriers, hilly terrain, and a profound shortage of specialized geriatric memory centers.

Existing cognitive therapy apps rely almost exclusively on Western cultural contexts (subways, baseball, autumn leaves) that disorient, confuse, and distress elderly Indian seniors.

**NeuroNest** bridges **neuroplastic cognitive gaming** with **indigenous North Eastern Indian cultural heritage** and everyday life routines (Assam tea brewing, local market items, morning medicines, family kinship memory). 

### 🛡️ Medical & Ethical Safety Notice
> **Disclaimer**: NeuroNest supports cognitive wellness, memory assistance and activity tracking. It does not diagnose dementia or replace professional medical care. All AI explanations and feedback use positive, respectful, and encouraging terminology (never negative diagnostic labeling).

---

## 🧠 The AI Closed-Loop Philosophy

$$\text{User} \longrightarrow \text{Game} \longrightarrow \text{Data Collection} \longrightarrow \text{Database} \longrightarrow \text{Analytics} \longrightarrow \text{AI/ML} \longrightarrow \text{Recommendation Engine} \longrightarrow \text{Adaptive Difficulty} \longrightarrow \text{AI Explanation} \longrightarrow \text{Progress Insights}$$

```
                ┌──────────────────────────────────────────────┐
                │                 USER LAYER                   │
                │  Elderly Patient   •   Caregiver   •   Admin │
                └──────────────────────┬───────────────────────┘
                                       │
                                       ▼
                ┌──────────────────────────────────────────────┐
                │           FRONTEND PRESENTATION              │
                │  React + TypeScript + Vite + Tailwind CSS    │
                │  WCAG AAA Accessibility (Fonts, Contrast)    │
                │  Multilingual Engine (EN, HI, TE)            │
                │  Web Speech API + Synthesizer Voice Assist   │
                │  Recharts Interactive Telemetry              │
                └──────────────────────┬───────────────────────┘
                                       │ HTTPS / REST API
                                       ▼
                ┌──────────────────────────────────────────────┐
                │            FASTAPI BACKEND SERVER            │
                │  REST Endpoints • Session Data Pipeline      │
                │  CORS Middleware • Auth Router • Memory API  │
                └──────────────────────┬───────────────────────┘
                                       │
        ┌──────────────────────────────┴──────────────────────────────┐
        ▼                                                             ▼
 ┌─────────────────────────────┐                               ┌─────────────────────────────┐
 │        AI / ML ENGINE       │                               │       DATABASE LAYER        │
 │ - Performance Analyzer      │                               │ SQLite (Local Demo) /       │
 │ - Scikit-learn RF Predictor │                               │ PostgreSQL (Production DDL) │
 │ - Rule + Content Recommender│                               │ - users & caregivers        │
 │ - Dynamic Adaptive Tuning   │                               │ - games & game_sessions     │
 │ - Explainable AI Generator  │                               │ - recommendations & logs    │
 │ - Progress & Trend Tracker  │                               │ - daily_tasks & memories    │
 └─────────────────────────────┘                               └─────────────────────────────┘
```

---

## 🎮 Five Playable Cognitive Games

1. **Memory Match**: Pair familiar household objects (Keys, Glasses, Cup, Phone, Apple, Umbrella, Clock, Book) to exercise visual working memory.
2. **Object Recall**: Inspect familiar items for 5–10 seconds, hide them, and recall items from multiple-choice answers.
3. **Sequence Recall**: Re-order chronological steps of meaningful daily activities (Morning Routine, Assam Tea Preparation, Bedtime Schedule, Grocery Shopping).
4. **Pattern Memory**: Recreate dynamic illuminated grid patterns on a spatial matrix.
5. **Word Association**: Connect related everyday vocabulary and semantic neural pathways (e.g. Hospital $\to$ Doctor, Medicine, Nurse).

---

## 🤖 Explainable AI Recommendation Engine

The recommendation engine calculates a transparent, explainable score:

$$\text{Recommendation Score} = 0.35 \times \text{Skill Gap} + 0.25 \times \text{Recent Performance Need} + 0.20 \times \text{Latency Factor} + 0.20 \times \text{Difficulty Fit}$$

### Stepwise Adaptive Difficulty Controller:
- **Accuracy > 85% & Latency $\le$ 4.5s**: Difficulty stepped up (e.g., Easy $\to$ Medium).
- **Accuracy 60% – 85%**: Difficulty maintained with positive affirmation.
- **Accuracy < 60%**: Difficulty stepped down (e.g., Hard $\to$ Medium) to provide a relaxed, supportive pace.

---

## 🗣️ Voice Assistant & Multilingual Support

- **Supported Languages**:
  - English (`en.json`)
  - हिन्दी / Hindi (`hi.json`)
  - తెలుగు / Telugu (`te.json`)
- **Web Speech API integration**: Voice recognition + speech synthesis calibrated at a gentle 0.88x cadence for elderly auditory comprehension.
- **Voice Commands Supported**:
  - *"Start my memory game."*
  - *"What is my next task?"*
  - *"What is my medicine reminder?"*
  - *"How did I perform today?"*

---

## ♿ Elderly Accessibility (WCAG AAA Inspired)

- **Font Size Scaling**: Normal, Large, and Extra Large font toggles.
- **High Contrast Mode**: Crisp black/white high-contrast outlines for cataract / low-vision users.
- **Reduced Motion**: Disables disorienting animations for vestibular safety.
- **Large Touch Targets**: 56px+ oversized hit areas for seniors with hand tremors.

---

## 🚀 Quick Start Guide

### 1. Launch with One Click
Double-click `launch_neuronest.bat` in the project root:
```cmd
launch_neuronest.bat
```
This automatically starts both the Python FastAPI backend (`http://127.0.0.1:8000`) and the Vite React frontend (`http://localhost:3000`), then opens your default web browser.

### 2. Judge / Presentation Demo Flow
1. **Landing Page**: View the brand tagline, 6 core feature cards, 6-phase AI closed-loop workflow, and NER 8-state coverage.
2. **Language Switcher**: Click the language selector in the navbar to test instant switching between **English**, **हिन्दी**, and **తెలుగు**.
3. **Accessibility Panel**: Open the eye icon to test Large Font mode and High Contrast mode.
4. **Elderly Login**: Click "Get Started", select Senior Patient, and click "1-Click Demo Fill" (`Anita Sharma`, DOB: `15/08/1954`).
5. **Elderly Dashboard**:
   - Check today's goal (2 / 3 completed, 67%).
   - Inspect the AI Recommended Game (Sequence Recall — Easy) and expand *"Why this recommendation?"* to see the mathematical formula.
   - Review today's schedule and toggle task completion.
6. **Play Games**:
   - Play **Memory Match** (match cards).
   - View the **Game Result Screen** with *"What NeuroNest noticed"* AI explanation and dynamic difficulty adjustment.
   - Play **Sequence Recall** with real-world Assam Tea preparation steps.
7. **Memory Companion**: View the schedule, photos of loved ones (daughter Priya, grandson Rohan), and medicine reminders.
8. **Voice Assistant**: Click "Talk to NeuroNest", click the microphone, or click a quick prompt like *"What is my next task?"*.
9. **Caregiver Dashboard**: Switch role to Caregiver to view Anita's telemetry, longitudinal stability score, and remotely assign a new reminder.
10. **Admin Portal**: View state-by-state usage metrics across all 8 North Eastern states and language adoption statistics.
