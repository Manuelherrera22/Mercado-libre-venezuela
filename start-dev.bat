@echo off
title Mercado Libre Venezuela - Development Server
color 0A
echo ========================================
echo   Mercado Libre Venezuela
echo   Development Server
echo ========================================
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Checking dependencies...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)
echo.
echo Starting Next.js development server...
echo.
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
call npm run dev
pause

