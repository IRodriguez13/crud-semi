#!/bin/bash

echo "🚀 Configurando proyecto CRUD Django + React"

# Configurar Backend
echo "📦 Configurando Backend (Django)..."
cd backend

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    echo "Creando entorno virtual..."
    python3 -m venv venv
fi

# Activar entorno virtual e instalar dependencias
echo "Instalando dependencias de Python..."
source venv/bin/activate
pip install setuptools
pip install -r requirements.txt

# Solo crear migraciones si no existen
if [ ! -d "usuarios/migrations" ] || [ ! -f "usuarios/migrations/0001_initial.py" ]; then
    echo "Creando migraciones para usuarios..."
    python manage.py makemigrations usuarios
fi

if [ ! -d "productos/migrations" ] || [ ! -f "productos/migrations/0001_initial.py" ]; then
    echo "Creando migraciones para productos..."
    python manage.py makemigrations productos
fi

# Aplicar migraciones
echo "Aplicando migraciones..."
python manage.py migrate

# Crear datos de ejemplo solo si no existen
echo "Verificando datos de ejemplo..."
if ! python -c "
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proyecto.settings')
django.setup()
from usuarios.models import Usuario
exit(0 if Usuario.objects.filter(email='admin@admin.com').exists() else 1)
" 2>/dev/null; then
    echo "Creando datos de ejemplo..."
    python create_sample_data.py
else
    echo "Los datos de ejemplo ya existen."
fi

echo "✅ Backend configurado exitosamente!"

# Volver al directorio raíz
cd ..

# Configurar Frontend
echo "📦 Configurando Frontend (React)..."
cd frontend

# Instalar dependencias de Node.js
echo "Instalando dependencias de Node.js..."
npm install

echo "✅ Frontend configurado exitosamente!"

cd ..

echo ""
echo "🎉 ¡Proyecto configurado exitosamente!"
echo ""
echo "Para ejecutar el proyecto:"
echo ""
echo "Backend (Terminal 1):"
echo "cd backend"
echo "source venv/bin/activate"
echo "python manage.py runserver"
echo ""
echo "Frontend (Terminal 2):"
echo "cd frontend"
echo "npm start"
echo ""
echo "URLs:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- Admin Django: http://localhost:8000/admin"
echo ""
echo "Credenciales de prueba:"
echo "- Admin: admin@admin.com / admin123"
echo "- Usuario: juan@email.com / password123"