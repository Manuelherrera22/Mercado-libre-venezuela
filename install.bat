@echo off
echo ========================================
echo   MercadoLibre Venezuela - Instalacion
echo ========================================
echo.
echo Instalando dependencias...
echo.

cd /d "%~dp0"

echo [1/3] Instalando dependencias de Node.js...
call npm install

echo.
echo [2/3] Creando archivo de configuracion...
if not exist .env (
    echo Creando archivo .env desde .env.example...
    copy .env.example .env
    echo.
    echo IMPORTANTE: Edita el archivo .env con tus configuraciones
)

echo.
echo [3/3] Verificando instalacion...
node --version
npm --version

echo.
echo ========================================
echo   Instalacion completada!
echo ========================================
echo.
echo Siguiente paso:
echo 1. Edita el archivo .env con tus configuraciones
echo 2. Asegurate de tener MongoDB corriendo
echo 3. Ejecuta start-all.bat para iniciar el proyecto
echo.
echo Para iniciar el proyecto:
echo   - Backend: start-backend.bat
echo   - Frontend: start-frontend.bat
echo   - Ambos: start-all.bat
echo.
pause

