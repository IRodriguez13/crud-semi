#!/bin/bash

echo "=========================================="
echo "  Preparando proyecto para entrega"
echo "=========================================="
echo ""

# Crear carpeta de entrega
CARPETA_ENTREGA="crud-sem-entrega"
echo "[1/4] Creando carpeta de entrega: $CARPETA_ENTREGA"
rm -rf "$CARPETA_ENTREGA"
mkdir -p "$CARPETA_ENTREGA"

# Copiar archivos esenciales
echo "[2/4] Copiando archivos esenciales..."
cp -r backend "$CARPETA_ENTREGA/"
cp -r frontend "$CARPETA_ENTREGA/"

# Excluir carpetas innecesarias
echo "[3/4] Limpiando carpetas innecesarias..."
rm -rf "$CARPETA_ENTREGA/backend/venv"
rm -rf "$CARPETA_ENTREGA/backend/**/__pycache__"
rm -rf "$CARPETA_ENTREGA/backend/**/*.pyc"
rm -rf "$CARPETA_ENTREGA/backend/db.sqlite3"
rm -rf "$CARPETA_ENTREGA/frontend/node_modules"
rm -rf "$CARPETA_ENTREGA/frontend/build"
rm -rf "$CARPETA_ENTREGA/.git"

# Copiar archivos de configuración y documentación
echo "[4/4] Copiando documentación y scripts..."
cp setup_windows.bat "$CARPETA_ENTREGA/"
cp run_windows.bat "$CARPETA_ENTREGA/"
cp run_backend.bat "$CARPETA_ENTREGA/"
cp run_frontend.bat "$CARPETA_ENTREGA/"
cp INSTALACION_WINDOWS.md "$CARPETA_ENTREGA/"
cp WINDOWS_SETUP.md "$CARPETA_ENTREGA/"
cp README.md "$CARPETA_ENTREGA/"
cp INSTRUCCIONES.md "$CARPETA_ENTREGA/"
cp RESUMEN_PROYECTO.md "$CARPETA_ENTREGA/"
cp CHECKLIST_ENTREGA.md "$CARPETA_ENTREGA/"
cp LEEME_PRIMERO.txt "$CARPETA_ENTREGA/"

# Limpiar __pycache__ recursivamente
find "$CARPETA_ENTREGA" -type d -name "__pycache__" -exec rm -r {} + 2>/dev/null
find "$CARPETA_ENTREGA" -name "*.pyc" -delete 2>/dev/null

echo ""
echo "=========================================="
echo "  ✅ Proyecto preparado para entrega"
echo "=========================================="
echo ""
echo "Carpeta creada: $CARPETA_ENTREGA"
echo ""
echo "Para crear el .zip:"
echo "  zip -r crud-sem.zip $CARPETA_ENTREGA"
echo ""
echo "O manualmente comprime la carpeta $CARPETA_ENTREGA"

