@echo off
title Brainoro Cognitive Engine - Backend
cd /d "%~dp0backend"
echo ===================================================
echo  Starting Brainoro Backend at http://localhost:8000
echo ===================================================
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
pause
