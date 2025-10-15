@echo off
echo ========================================
echo   MercadoLibre Venezuela - Full Stack
echo ========================================
echo.
echo Iniciando Backend y Frontend...
echo.

cd /d "%~dp0"

start "MercadoLibre Backend" cmd /k "node server/index.js"
timeout /t 3 /nobreak > nul
start "MercadoLibre Frontend" cmd /k "npm run dev"

echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
echo (Los servidores continuaran ejecutandose)
pause > nul

