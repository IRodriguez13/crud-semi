# Script PowerShell para iniciar solo el Backend (Django)
# Uso: .\run_backend.ps1

Write-Host "🔧 Iniciando servidor Backend (Django)..." -ForegroundColor Green

# Cambiar al directorio backend
Set-Location backend

# Verificar si existe el entorno virtual
if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "❌ No se encontró el entorno virtual. Por favor ejecuta setup_project.ps1 primero." -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Activar entorno virtual
Write-Host "Activando entorno virtual..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Iniciar servidor Django
Write-Host "Iniciando servidor Django en http://localhost:8000..." -ForegroundColor Cyan
python manage.py runserver

# Volver al directorio raíz al salir
Set-Location ..

