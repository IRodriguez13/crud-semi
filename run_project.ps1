# Script PowerShell para iniciar el proyecto completo (Backend + Frontend)
# Uso: .\run_project.ps1

Write-Host "🚀 Iniciando proyecto CRUD Django + React" -ForegroundColor Cyan

# Verificar si el proyecto está configurado
if (-not (Test-Path "backend\venv") -or -not (Test-Path "frontend\node_modules")) {
    Write-Host "⚠️  El proyecto no está configurado. Ejecutando configuración..." -ForegroundColor Yellow
    if (Test-Path "setup_project.ps1") {
        & .\setup_project.ps1
    } else {
        Write-Host "❌ No se encontró setup_project.ps1. Por favor ejecuta setup_project.sh primero." -ForegroundColor Red
        exit 1
    }
}

# Obtener la ruta absoluta del proyecto
$projectPath = (Get-Location).Path

# Iniciar Backend en nueva ventana
Write-Host "🔧 Iniciando Backend (Django) en nueva ventana..." -ForegroundColor Green
$backendScript = @"
Set-Location '$projectPath\backend'
& .\venv\Scripts\Activate.ps1
python manage.py runserver
pause
"@
$backendScript | Out-File -FilePath "$env:TEMP\run_backend_temp.ps1" -Encoding UTF8
Start-Process powershell -ArgumentList "-NoExit", "-File", "$env:TEMP\run_backend_temp.ps1" -WindowStyle Normal

# Esperar que el backend inicie
Write-Host "⏳ Esperando que el backend inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Iniciar Frontend en nueva ventana
Write-Host "🎨 Iniciando Frontend (React) en nueva ventana..." -ForegroundColor Green
$frontendScript = @"
Set-Location '$projectPath\frontend'
npm start
pause
"@
$frontendScript | Out-File -FilePath "$env:TEMP\run_frontend_temp.ps1" -Encoding UTF8
Start-Process powershell -ArgumentList "-NoExit", "-File", "$env:TEMP\run_frontend_temp.ps1" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Servicios iniciados:" -ForegroundColor Green
Write-Host "- Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "- Admin: http://localhost:8000/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "Credenciales de prueba:" -ForegroundColor Yellow
Write-Host "- Admin: admin@admin.com / admin123"
Write-Host "- Usuario: juan@email.com / password123"
Write-Host ""
Write-Host "Los servidores están ejecutándose en ventanas separadas." -ForegroundColor Green
Write-Host "Presiona cualquier tecla para cerrar esta ventana..." -ForegroundColor Yellow
Write-Host "(Los servidores continuarán ejecutándose)" -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

