@echo off
echo Starting Mercado Libre Venezuela Development Server...
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting Next.js development server...
echo.
call npm run dev
pause

