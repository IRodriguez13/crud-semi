# Script PowerShell para configurar el proyecto completo
# Uso: .\setup_project.ps1

Write-Host "🚀 Configurando proyecto CRUD Django + React" -ForegroundColor Cyan

# Configurar Backend
Write-Host "📦 Configurando Backend (Django)..." -ForegroundColor Green
Set-Location backend

# Crear entorno virtual si no existe
if (-not (Test-Path "venv")) {
    Write-Host "Creando entorno virtual..." -ForegroundColor Yellow
    python -m venv venv
}

# Activar entorno virtual e instalar dependencias
Write-Host "Instalando dependencias de Python..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
pip install setuptools
pip install -r requirements.txt

# Solo crear migraciones si no existen
if (-not (Test-Path "usuarios\migrations\0001_initial.py")) {
    Write-Host "Creando migraciones para usuarios..." -ForegroundColor Yellow
    python manage.py makemigrations usuarios
}

if (-not (Test-Path "productos\migrations\0001_initial.py")) {
    Write-Host "Creando migraciones para productos..." -ForegroundColor Yellow
    python manage.py makemigrations productos
}

# Aplicar migraciones
Write-Host "Aplicando migraciones..." -ForegroundColor Yellow
python manage.py migrate

# Crear datos de ejemplo solo si no existen
Write-Host "Verificando datos de ejemplo..." -ForegroundColor Yellow
$checkData = python -c @"
import os, django, sys
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proyecto.settings')
django.setup()
from usuarios.models import Usuario
sys.exit(0 if Usuario.objects.filter(email='admin@admin.com').exists() else 1)
"@

if ($LASTEXITCODE -ne 0) {
    Write-Host "Creando datos de ejemplo..." -ForegroundColor Yellow
    python create_sample_data.py
} else {
    Write-Host "Los datos de ejemplo ya existen." -ForegroundColor Green
}

Write-Host "✅ Backend configurado exitosamente!" -ForegroundColor Green

# Volver al directorio raíz
Set-Location ..

# Configurar Frontend
Write-Host "📦 Configurando Frontend (React)..." -ForegroundColor Green
Set-Location frontend

# Instalar dependencias de Node.js
Write-Host "Instalando dependencias de Node.js..." -ForegroundColor Yellow
npm install

Write-Host "✅ Frontend configurado exitosamente!" -ForegroundColor Green

Set-Location ..

Write-Host ""
Write-Host "🎉 ¡Proyecto configurado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Para ejecutar el proyecto:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opción 1 - Ejecutar ambos servicios:" -ForegroundColor Yellow
Write-Host "  .\run_project.ps1"
Write-Host ""
Write-Host "Opción 2 - Ejecutar por separado:" -ForegroundColor Yellow
Write-Host "  Terminal 1: .\run_backend.ps1"
Write-Host "  Terminal 2: .\run_frontend.ps1"
Write-Host ""
Write-Host "URLs:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000"
Write-Host "- Backend API: http://localhost:8000"
Write-Host "- Admin Django: http://localhost:8000/admin"
Write-Host ""
Write-Host "Credenciales de prueba:" -ForegroundColor Yellow
Write-Host "- Admin: admin@admin.com / admin123"
Write-Host "- Usuario: juan@email.com / password123"

