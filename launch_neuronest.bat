@echo off
title NeuroNest : Personalized Cognitive Care
echo ========================================================
echo  NeuroNest : Personalized Cognitive Care
echo  AI Cognitive Gaming & Memory Assistance Platform (NER)
echo ========================================================
echo.

set PATH=C:\Program Files\nodejs;%PATH%

echo [1/3] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "NeuroNest Backend (FastAPI)" /D "%~dp0backend" cmd /c "python -m uvicorn main:app --host 127.0.0.1 --port 8000"

timeout /t 2 >nul

echo [2/3] Starting React Frontend on http://localhost:3000 ...
start "NeuroNest Frontend (Vite)" /D "%~dp0frontend" cmd /c "npm run dev"

timeout /t 3 >nul

echo [3/3] Launching web browser ...
start http://localhost:3000

echo.
echo ========================================================
echo  Platform is LIVE!
echo  Frontend: http://localhost:3000
echo  Backend Docs: http://127.0.0.1:8000/docs
echo ========================================================
