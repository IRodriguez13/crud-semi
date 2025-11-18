@echo off
echo ========================================
echo   BlockBuster - Instalacion para Windows
echo ========================================
echo.

REM Verificar Python
echo [1/5] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no esta instalado o no esta en PATH
    echo Por favor instala Python desde https://python.org
    echo IMPORTANTE: Marca "Add Python to PATH" durante la instalacion
    pause
    exit /b 1
)
python --version
echo.

REM Verificar Node.js
echo [2/5] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado o no esta en PATH
    echo Por favor instala Node.js desde https://nodejs.org
    pause
    exit /b 1
)
node --version
echo.

REM Configurar Backend
echo [3/5] Configurando Backend (Django)...
cd backend
if not exist venv (
    echo Creando entorno virtual...
    python -m venv venv
)
echo Activando entorno virtual...
call venv\Scripts\activate.bat
echo Instalando dependencias Python...
pip install --upgrade pip
pip install -r requirements.txt
echo Creando migraciones...
python manage.py makemigrations
echo Aplicando migraciones...
python manage.py migrate
echo Creando datos de ejemplo...
python create_sample_data.py
echo.
cd ..

REM Configurar Frontend
echo [4/5] Configurando Frontend (React)...
cd frontend
echo Instalando dependencias Node.js...
call npm install
echo.
cd ..

echo [5/5] Instalacion completada!
echo.
echo ========================================
echo   Instalacion Exitosa!
echo ========================================
echo.
echo Para ejecutar el proyecto:
echo   1. Abre una terminal y ejecuta: run_backend.bat
echo   2. Abre otra terminal y ejecuta: run_frontend.bat
echo.
echo O ejecuta: run_windows.bat (abre ambas ventanas)
echo.
echo Credenciales de prueba:
echo   Admin: admin@admin.com / admin123
echo   Usuario: juan@email.com / password123
echo   Usuario: maria@email.com / password123
echo.
pause

