#!/bin/bash

echo "🚀 Iniciando proyecto CRUD Django + React"

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    pkill -f "python manage.py runserver" 2>/dev/null
    pkill -f "npm start" 2>/dev/null
    pkill -f "react-scripts start" 2>/dev/null
    exit 0
}

# Configurar trap para limpiar al salir
trap cleanup SIGINT SIGTERM

# Verificar si el proyecto está configurado
if [ ! -d "backend/venv" ] || [ ! -d "frontend/node_modules" ]; then
    echo "⚠️  El proyecto no está configurado. Ejecutando configuración..."
    ./setup_project.sh
fi

echo "🔧 Iniciando Backend (Django)..."
cd backend
source venv/bin/activate
python manage.py runserver &
BACKEND_PID=$!
cd ..

echo "⏳ Esperando que el backend inicie..."
sleep 3

echo "🎨 Iniciando Frontend (React)..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servicios iniciados:"
echo "- Backend: http://localhost:8000"
echo "- Frontend: http://localhost:3000"
echo "- Admin: http://localhost:8000/admin"
echo ""
echo "Credenciales de prueba:"
echo "- Admin: admin@admin.com / admin123"
echo "- Usuario: juan@email.com / password123"
echo ""
echo "Presiona Ctrl+C para detener ambos servicios"

# Esperar a que terminen los procesos
wait $BACKEND_PID $FRONTEND_PID