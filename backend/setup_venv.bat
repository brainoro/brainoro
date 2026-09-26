@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo  Brainoro Cognitive Engine - Virtual Environment Setup
echo ========================================================

REM Check if Python is installed and usable
where python.exe >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python not found in system PATH.
    echo Attempting to check Python via winget...
    where winget.exe >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [INFO] You can install Python 3.12 automatically by running:
        echo        winget install Python.Python.3.12
    ) else (
        echo [INFO] Please download and install Python from https://www.python.org/
    )
    exit /b 1
)

REM Verify Python executable is not the Windows store stub
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Default python command points to Windows Store stub.
    echo [INFO] Please run: winget install Python.Python.3.12
    echo Or disable 'python.exe' execution alias under Windows Settings:
    echo Settings -> Apps -> Advanced app settings -> App execution aliases
    exit /b 1
)

echo [INFO] Found Python:
python --version

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo [INFO] Creating Python virtual environment in .\venv ...
    python -m venv venv
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to create virtual environment.
        exit /b 1
    )
    echo [SUCCESS] Virtual environment created.
) else (
    echo [INFO] Virtual environment .\venv already exists.
)

REM Activate and install dependencies
echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

echo [INFO] Upgrading pip...
python -m pip install --upgrade pip

echo [INFO] Installing Brainoro backend dependencies...
pip install -r requirements.txt

if not exist ".env" (
    if exist ".env.example" (
        echo [INFO] Creating .env from .env.example ...
        copy .env.example .env >nul
    )
)

echo ========================================================
echo  Brainoro Backend Setup Complete!
echo  To start the server, run:
echo    .\venv\Scripts\activate
echo    uvicorn app.main:app --reload --port 8000
echo ========================================================
