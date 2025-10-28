# 📝 Comandos Git para el Proyecto

## 🚀 Configuración inicial del repositorio

```bash
# Inicializar repositorio
git init

# Agregar todos los archivos (respetando .gitignore)
git add .

# Primer commit
git commit -m "🎉 Initial commit: CRUD Django + React system"

# Conectar con repositorio remoto
git remote add origin <URL_DE_TU_REPOSITORIO>

# Subir al repositorio remoto
git push -u origin main
```

## 📦 Archivos que SÍ se suben al repositorio

✅ **Código fuente**
- `backend/` (sin venv/, db.sqlite3, __pycache__)
- `frontend/src/` (sin node_modules/, build/)
- `*.py`, `*.js`, `*.jsx`, `*.css`, `*.html`

✅ **Configuración**
- `requirements.txt`
- `package.json`
- `manage.py`
- Scripts de configuración (`setup_project.sh`, `run_project.sh`)

✅ **Documentación**
- `README.md`
- `INSTRUCCIONES.md`
- `RESUMEN_PROYECTO.md`

## 🚫 Archivos que NO se suben (en .gitignore)

❌ **Entornos virtuales**
- `backend/venv/`
- `node_modules/`

❌ **Base de datos**
- `db.sqlite3`
- `*.db`

❌ **Archivos compilados**
- `__pycache__/`
- `*.pyc`
- `frontend/build/`

❌ **Archivos de configuración local**
- `.env`
- `local_settings.py`

❌ **Archivos del sistema**
- `.DS_Store`
- `Thumbs.db`
- `.vscode/`
- `.idea/`

## 🔄 Comandos útiles durante desarrollo

```bash
# Ver estado de archivos
git status

# Agregar archivos específicos
git add backend/usuarios/models.py
git add frontend/src/components/

# Commit con mensaje descriptivo
git commit -m "✨ Add user search functionality"

# Subir cambios
git push origin main

# Ver historial
git log --oneline

# Ver diferencias
git diff

# Crear nueva rama para feature
git checkout -b feature/nueva-funcionalidad

# Cambiar entre ramas
git checkout main
git checkout feature/nueva-funcionalidad

# Fusionar rama
git checkout main
git merge feature/nueva-funcionalidad
```

## 📋 Convenciones para commits

```bash
# Nuevas funcionalidades
git commit -m "✨ Add user registration form"

# Corrección de bugs
git commit -m "🐛 Fix login authentication issue"

# Documentación
git commit -m "📝 Update README with installation instructions"

# Configuración
git commit -m "🔧 Update Django settings for production"

# Refactoring
git commit -m "♻️ Refactor user components"

# Estilos
git commit -m "💄 Improve responsive design"

# Tests
git commit -m "✅ Add user registration tests"
```

## 🌐 Clonar y configurar en nueva máquina

```bash
# Clonar repositorio
git clone <URL_DE_TU_REPOSITORIO>
cd crud-django-react

# Ejecutar configuración automática
./setup_project.sh

# Ejecutar proyecto
./run_project.sh
```

## 🔍 Verificar que .gitignore funciona

```bash
# Ver qué archivos están siendo trackeados
git ls-files

# Ver qué archivos están siendo ignorados
git status --ignored

# Verificar si un archivo específico está ignorado
git check-ignore backend/venv/
git check-ignore frontend/node_modules/
```