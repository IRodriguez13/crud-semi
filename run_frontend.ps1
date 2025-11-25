# Script PowerShell para iniciar solo el Frontend (React)
# Uso: .\run_frontend.ps1

Write-Host "🎨 Iniciando servidor Frontend (React)..." -ForegroundColor Green

# Cambiar al directorio frontend
Set-Location frontend

# Verificar si existen node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  No se encontraron node_modules. Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

# Iniciar servidor de desarrollo React
Write-Host "Iniciando servidor React en http://localhost:3000..." -ForegroundColor Cyan
npm start

# Volver al directorio raíz al salir
Set-Location ..

