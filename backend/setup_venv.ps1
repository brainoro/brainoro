# PowerShell Setup Script for Brainoro Backend
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " Brainoro Cognitive Engine - Virtual Environment Setup" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$pythonCmd = Get-Command python -ErrorAction SilentlyContinue

if (-not $pythonCmd) {
    Write-Host "[ERROR] Python command was not found." -ForegroundColor Red
    $wingetCmd = Get-Command winget -ErrorAction SilentlyContinue
    if ($wingetCmd) {
        Write-Host "[INFO] To install Python 3.12 automatically, run: winget install Python.Python.3.12" -ForegroundColor Yellow
    }
    Exit 1
}

# Test if Python runs successfully
$pyVer = & python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Python points to Windows Store execution alias stub." -ForegroundColor Yellow
    Write-Host "[INFO] Install Python via: winget install Python.Python.3.12" -ForegroundColor Yellow
    Write-Host "[INFO] Or disable execution alias in Windows Settings > Apps > Advanced app settings > App execution aliases." -ForegroundColor Yellow
    Exit 1
}

Write-Host "[INFO] Found Python version: $pyVer" -ForegroundColor Green

if (-not (Test-Path "venv")) {
    Write-Host "[INFO] Creating virtual environment in .\venv ..." -ForegroundColor Cyan
    & python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to create virtual environment." -ForegroundColor Red
        Exit 1
    }
    Write-Host "[SUCCESS] Virtual environment created." -ForegroundColor Green
} else {
    Write-Host "[INFO] Virtual environment already exists." -ForegroundColor Green
}

Write-Host "[INFO] Installing requirements in .\venv ..." -ForegroundColor Cyan
& .\venv\Scripts\python.exe -m pip install --upgrade pip
& .\venv\Scripts\pip.exe install -r requirements.txt

if (-not (Test-Path ".env") -and (Test-Path ".env.example")) {
    Copy-Item ".env.example" ".env"
    Write-Host "[INFO] Created .env from .env.example" -ForegroundColor Green
}

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " Brainoro Backend Setup Complete!" -ForegroundColor Green
Write-Host " Run server via:" -ForegroundColor Yellow
Write-Host "   .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000" -ForegroundColor Green
Write-Host " Or activate venv:" -ForegroundColor Yellow
Write-Host "   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass" -ForegroundColor Cyan
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
