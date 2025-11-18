@echo off
echo Iniciando BlockBuster...
echo.
echo Abriendo Backend en nueva ventana...
start "BlockBuster Backend" cmd /k "cd /d %~dp0backend && call venv\Scripts\activate.bat && python manage.py runserver"
timeout /t 3 /nobreak >nul
echo Abriendo Frontend en nueva ventana...
start "BlockBuster Frontend" cmd /k "cd /d %~dp0frontend && npm start"
echo.
echo ========================================
echo   Servidores iniciados!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
echo (Los servidores continuaran ejecutandose)
pause >nul

