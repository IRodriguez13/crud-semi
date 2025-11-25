# 🪟 Guía de Instalación para Windows - BlockBuster

Esta guía está diseñada específicamente para Windows 10/11 y te guiará paso a paso para instalar y ejecutar el proyecto.

## 📋 Prerrequisitos (Instalar ANTES de comenzar)

### 1. Python 3.8 o superior
1. Ve a https://www.python.org/downloads/
2. Descarga la versión más reciente (Python 3.11 o 3.12)
3. **MUY IMPORTANTE**: Durante la instalación, marca la casilla **"Add Python to PATH"**
4. Verifica la instalación abriendo CMD y escribiendo:
   ```cmd
   python --version
   ```
   Debe mostrar algo como: `Python 3.12.x`

### 2. Node.js 16 o superior
1. Ve a https://nodejs.org/
2. Descarga la versión **LTS** (Long Term Support)
3. Instala con la configuración por defecto
4. Verifica la instalación:
   ```cmd
   node --version
   npm --version
   ```

### 3. Git (Opcional pero recomendado)
- Descarga desde: https://git-scm.com/download/win
- O simplemente extrae el .zip del proyecto

## 🚀 Instalación Automática (Recomendada)

### Opción 1: Script Automático
1. Extrae el proyecto del .zip
2. Abre el archivo `setup_windows.bat` haciendo doble clic
3. Espera a que termine la instalación (puede tardar varios minutos)
4. Cuando termine, ejecuta `run_windows.bat` para iniciar el proyecto

### Opción 2: Instalación Manual Paso a Paso

#### Paso 1: Extraer el proyecto
- Extrae el archivo .zip en una carpeta (ejemplo: `C:\Users\TuNombre\Desktop\crud-sem`)

#### Paso 2: Configurar Backend (Django)

1. Abre **CMD** o **PowerShell** como administrador
2. Navega a la carpeta del proyecto:
   ```cmd
   cd C:\ruta\a\tu\proyecto\crud-sem\backend
   ```
   (Reemplaza con tu ruta real)

3. Crea el entorno virtual:
   ```cmd
   python -m venv venv
   ```

4. Activa el entorno virtual:
   ```cmd
   venv\Scripts\activate
   ```
   Deberías ver `(venv)` al inicio de la línea de comandos

5. Instala las dependencias:
   ```cmd
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
   ⏱️ Esto puede tardar varios minutos

6. Crea las migraciones:
   ```cmd
   python manage.py makemigrations
   ```

7. Aplica las migraciones:
   ```cmd
   python manage.py migrate
   ```

8. Crea datos de ejemplo:
   ```cmd
   python create_sample_data.py
   ```

#### Paso 3: Configurar Frontend (React)

1. Abre una **NUEVA ventana de CMD** o **PowerShell**
2. Navega a la carpeta frontend:
   ```cmd
   cd C:\ruta\a\tu\proyecto\crud-sem\frontend
   ```

3. Instala las dependencias:
   ```cmd
   npm install
   ```
   ⏱️ Esto puede tardar varios minutos

## ▶️ Ejecutar el Proyecto

### Método 1: Script Automático (Más Fácil)
- Ejecuta `run_windows.bat` haciendo doble clic
- Se abrirán dos ventanas automáticamente

### Método 2: Manual (Dos Terminales)

**Terminal 1 - Backend:**
```cmd
cd C:\ruta\a\tu\proyecto\crud-sem\backend
venv\Scripts\activate
python manage.py runserver
```
Deberías ver: `Starting development server at http://127.0.0.1:8000/`

**Terminal 2 - Frontend:**
```cmd
cd C:\ruta\a\tu\proyecto\crud-sem\frontend
npm start
```
Se abrirá automáticamente el navegador en `http://localhost:3000`

## 🌐 Acceder a la Aplicación

Una vez que ambos servidores estén corriendo:

- **Frontend (Interfaz)**: http://localhost:3000
- **Backend (API)**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin

## 🔐 Credenciales de Prueba

Después de ejecutar `create_sample_data.py`, puedes usar:

**Administrador:**
- Email: `admin@admin.com`
- Password: `admin123`

**Usuarios de Prueba:**
- Email: `juan@email.com` / Password: `password123`
- Email: `maria@email.com` / Password: `password123`

## 🔧 Solución de Problemas Comunes

### Error: "python no se reconoce como comando"
**Solución:**
1. Reinstala Python desde python.org
2. **Asegúrate de marcar "Add Python to PATH"** durante la instalación
3. Reinicia el CMD después de instalar

### Error: "venv\Scripts\activate no funciona"
**Solución:**
- Usa CMD en lugar de PowerShell
- O ejecuta: `venv\Scripts\activate.bat`

### Error: PowerShell no permite ejecutar scripts
**Solución:**
Abre PowerShell como administrador y ejecuta:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: Puerto 8000 o 3000 ya está en uso
**Solución Backend:**
```cmd
python manage.py runserver 8001
```

**Solución Frontend:**
Crea un archivo `.env` en la carpeta `frontend` con:
```
PORT=3001
```

### Error: "ModuleNotFoundError: No module named 'django'"
**Solución:**
1. Asegúrate de haber activado el entorno virtual (`venv\Scripts\activate`)
2. Verifica que veas `(venv)` al inicio de la línea de comandos
3. Reinstala las dependencias: `pip install -r requirements.txt`

### Error: "npm ERR! code ELIFECYCLE"
**Solución:**
1. Elimina la carpeta `node_modules` en `frontend`
2. Elimina el archivo `package-lock.json`
3. Ejecuta nuevamente: `npm install`

## 📁 Estructura del Proyecto

```
crud-sem/
├── backend/              # Servidor Django
│   ├── venv/            # Entorno virtual (se crea al instalar)
│   ├── db.sqlite3       # Base de datos (se crea al migrar)
│   ├── requirements.txt # Dependencias Python
│   └── ...
├── frontend/            # Aplicación React
│   ├── node_modules/    # Dependencias Node (se crea al instalar)
│   ├── package.json     # Configuración npm
│   └── ...
├── setup_windows.bat    # Script de instalación automática
├── run_windows.bat      # Script para ejecutar el proyecto
└── INSTALACION_WINDOWS.md # Este archivo
```

## ✅ Checklist de Instalación

- [ ] Python 3.8+ instalado y en PATH
- [ ] Node.js 16+ instalado
- [ ] Proyecto extraído del .zip
- [ ] Backend configurado (`setup_windows.bat` ejecutado o pasos manuales completados)
- [ ] Frontend configurado (`npm install` ejecutado)
- [ ] Migraciones aplicadas (`python manage.py migrate`)
- [ ] Datos de ejemplo creados (`python create_sample_data.py`)
- [ ] Backend corriendo en http://localhost:8000
- [ ] Frontend corriendo en http://localhost:3000

## 🎯 Próximos Pasos

1. Abre http://localhost:3000 en tu navegador
2. Explora el catálogo de películas
3. Regístrate o usa las credenciales de prueba
4. Participa en el foro "Ustedes"
5. Agrega películas al carrito

