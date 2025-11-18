@echo off
echo Iniciando servidor Backend (Django)...
cd backend
call venv\Scripts\activate.bat
python manage.py runserver
pause

