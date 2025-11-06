# 🪟 BlockBuster - Guía de Instalación para Windows

Esta guía está específicamente diseñada para usuarios de Windows 10/11.

## 📋 Prerrequisitos

### 1. Instalar Python 3.8+
1. Ve a [python.org](https://python.org/downloads/)
2. Descarga la versión más reciente de Python 3
3. **IMPORTANTE**: Durante la instalación, marca "Add Python to PATH"
4. Verifica la instalación:
```cmd
python --version
pip --version
```

### 2. Instalar Node.js 16+
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS recomendada
3. Instala con configuración por defecto
4. Verifica la instalación:
```cmd
node --version
npm --version
```

### 3. Instalar Git
1. Ve a [git-scm.com](https://git-scm.com/download/win)
2. Descarga e instala Git for Windows
3. Incluye Git Bash para mejor compatibilidad

## 🚀 Instalación del Proyecto

### Paso 1: Clonar el Repositorio
```cmd
git clone https://github.com/tu-usuario/blockbuster-system.git
cd blockbuster-system
```

### Paso 2: Configurar Backend (Django)
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python create_sample_data.py
```

### Paso 3: Configurar Frontend (React)
Abre una **nueva ventana de CMD** o **PowerShell**:
```cmd
cd blockbuster-system\frontend
npm install
```

## ▶️ Ejecutar el Proyecto

### Terminal 1 - Backend
```cmd
cd blockbuster-system\backend
venv\Scripts\activate
python manage.py runserver
```

### Terminal 2 - Frontend
```cmd
cd blockbuster-system\frontend
npm start
```

## 🌐 Acceder a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

## 🔐 Credenciales de Prueba

### Para el Foro "Ustedes"
- **Email**: `juan@email.com` | **Password**: `password123`
- **Email**: `maria@email.com` | **Password**: `password123`
- **Admin**: `admin@admin.com` | **Password**: `admin123`

## 🔧 Solución de Problemas Windows

### Error: "python no se reconoce"
```cmd
# Usar python en lugar de python3
python --version

# Si no funciona, reinstalar Python marcando "Add to PATH"
```

### Error: PowerShell no permite scripts
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "venv\Scripts\activate no funciona"
```cmd
# Usar CMD en lugar de PowerShell
cmd
cd backend
venv\Scripts\activate
```

### Error: Puerto ocupado
```cmd
# Cambiar puerto del backend
python manage.py runserver 8001

# Cambiar puerto del frontend
set PORT=3001 && npm start
```

## 📁 Estructura de Carpetas Windows

```
blockbuster-system\
├── backend\
│   ├── venv\                 # Entorno virtual Python
│   ├── manage.py            # Comando Django
│   ├── requirements.txt     # Dependencias Python
│   └── ...
├── frontend\
│   ├── node_modules\        # Dependencias Node.js
│   ├── package.json         # Configuración npm
│   └── ...
└── README.md
```

## 🎯 Próximos Pasos

1. **Explorar el catálogo** de películas
2. **Registrarte** para participar en el foro
3. **Agregar películas** al carrito
4. **Participar** en discusiones del foro "Ustedes"

¡Disfruta de BlockBuster! 🎬