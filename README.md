# 🎬 BlockBuster - Sistema de Entretenimiento Digital

**"Nunca nos fuimos"** - La legendaria marca BlockBuster regresa con una plataforma moderna de streaming y comunidad cinematográfica.

![Django](https://img.shields.io/badge/Django-4.2.7-green)
![React](https://img.shields.io/badge/React-18-blue)
![Python](https://img.shields.io/badge/Python-3.12-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TMDB](https://img.shields.io/badge/TMDB-API-orange)

## 🎯 Funcionalidades Principales

### 🎬 **Catálogo de Películas**
- **API Externa TMDB**: Películas reales con pósters oficiales y datos actualizados
- **Filtros avanzados**: Por género, año, calificación
- **Búsqueda inteligente**: Encuentra películas por título
- **Detalles completos**: Sinopsis, reparto, director, trailers

### 🛒 **Sistema de Compras**
- **Carrito inteligente**: Agregar, modificar y eliminar películas
- **Precios dinámicos**: Basados en calificación TMDB
- **Gestión de stock**: Control de disponibilidad
- **Checkout simplificado**: Proceso de compra optimizado

### 💬 **Foro Comunitario "Ustedes"**
- **Acceso público**: Cualquiera puede leer discusiones
- **Participación autenticada**: Login requerido solo para comentar
- **CRUD completo**: Crear, editar, eliminar temas y respuestas
- **Interfaz moderna**: Diseño inspirado en redes sociales

### 👥 **Gestión de Usuarios**
- **Registro completo**: Datos personales y preferencias
- **Autenticación JWT**: Tokens seguros con refresh automático
- **Perfiles de usuario**: Información personalizada
- **Panel administrativo**: Gestión avanzada de usuarios

### 🎨 **Experiencia de Usuario**
- **Tema Netflix-inspired**: Paleta de colores oscura y moderna
- **Notificaciones elegantes**: Sistema de alertas sin popups molestos
- **Responsive design**: Optimizado para todos los dispositivos
- **Navegación intuitiva**: UX/UI centrada en el usuario

## 🚀 Instalación y Configuración

### 🐧 Linux/macOS - Instalación Automática (Recomendada)
```bash
git clone https://github.com/tu-usuario/blockbuster-system.git
cd blockbuster-system
chmod +x run_project.sh
./run_project.sh
```

### 🪟 Windows - Instalación Manual

#### Prerrequisitos Windows
- **Python 3.8+**: Descargar desde [python.org](https://python.org)
- **Node.js 16+**: Descargar desde [nodejs.org](https://nodejs.org)
- **Git**: Descargar desde [git-scm.com](https://git-scm.com)

#### Backend (Django) - Windows
```cmd
git clone https://github.com/tu-usuario/blockbuster-system.git
cd blockbuster-system\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python create_sample_data.py
python manage.py runserver
```

#### Frontend (React) - Windows
```cmd
# En una nueva terminal/cmd
cd blockbuster-system\frontend
npm install
npm start
```

### 🐧 Linux/macOS - Instalación Manual

#### Backend (Django)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python create_sample_data.py
python manage.py runserver
```

#### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## 🌐 URLs del Sistema

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Aplicación React principal |
| **Backend API** | http://localhost:8000 | API REST Django |
| **Admin Panel** | http://localhost:8000/admin | Panel administrativo Django |
| **API Docs** | http://localhost:8000/api/ | Documentación de endpoints |

## 🔐 Credenciales de Acceso

### 👤 Usuarios de Prueba
| Rol | Email | Password | Descripción |
|-----|-------|----------|-------------|
| **Administrador** | `admin@admin.com` | `admin123` | Acceso completo al sistema |
| **Usuario Regular** | `juan@email.com` | `password123` | Usuario con datos de ejemplo |
| **Usuario Regular** | `maria@email.com` | `password123` | Usuario con datos de ejemplo |

### 💬 Credenciales para Foro "Ustedes"
**Para participar en el foro (crear temas y responder), debes estar autenticado:**

#### Opción 1: Usar credenciales existentes
- **Email**: `juan@email.com` | **Password**: `password123`
- **Email**: `maria@email.com` | **Password**: `password123`
- **Email**: `admin@admin.com` | **Password**: `admin123`

#### Opción 2: Crear nueva cuenta
1. Ve a **"Registrarse"** en la navegación
2. Completa el formulario de registro
3. Inicia sesión con tus nuevas credenciales
4. ¡Ya puedes participar en el foro!

### 🔑 Funcionalidades por Rol
- **👑 Administrador**: 
  - Gestión completa de usuarios y contenido
  - Moderación del foro (editar/eliminar cualquier contenido)
  - Acceso al panel administrativo Django
- **👤 Usuario Regular**: 
  - Compras en el catálogo de películas
  - Participación completa en foro (crear temas, responder, editar propios posts)
  - Gestión de perfil personal
- **👁️ Visitante**: 
  - Navegación del catálogo de películas
  - Lectura del foro (sin poder comentar)
  - Acceso a información de la empresa

### 🚨 Nota Importante
**El foro requiere autenticación solo para escribir**. Cualquier visitante puede leer las discusiones, pero necesitas una cuenta para participar activamente.

## 🗄️ Estructura de Base de Datos

### Modelos Principales

#### **Usuario (Custom User Model)**
```python
- id: AutoField (PK)
- username: CharField(150)
- email: EmailField (unique)
- first_name: CharField(150)
- last_name: CharField(150)
- telefono: CharField(15)
- fecha_nacimiento: DateField
- direccion: TextField
- is_active: BooleanField
- date_joined: DateTimeField
```

#### **Película**
```python
- id: AutoField (PK)
- titulo: CharField(200)
- descripcion: TextField
- precio: DecimalField(10,2)
- genero: ForeignKey(Genero)
- director: CharField(200)
- año: IntegerField
- duracion: IntegerField (minutos)
- calificacion: CharField(10)
- stock: IntegerField
- imagen: ImageField
- trailer_url: URLField
- activo: BooleanField
- fecha_creacion: DateTimeField
```

#### **Carrito & Items**
```python
# Carrito
- id: AutoField (PK)
- usuario: OneToOneField(Usuario)
- fecha_creacion: DateTimeField
- fecha_actualizacion: DateTimeField

# ItemCarrito
- id: AutoField (PK)
- carrito: ForeignKey(Carrito)
- pelicula: ForeignKey(Pelicula)
- cantidad: PositiveIntegerField
- fecha_agregado: DateTimeField
```

#### **Foro (Temas & Respuestas)**
```python
# ForoTema
- id: AutoField (PK)
- titulo: CharField(200)
- descripcion: TextField
- usuario: ForeignKey(Usuario)
- fecha_creacion: DateTimeField
- activo: BooleanField

# ForoRespuesta
- id: AutoField (PK)
- tema: ForeignKey(ForoTema)
- usuario: ForeignKey(Usuario)
- contenido: TextField
- fecha_creacion: DateTimeField
- editado: BooleanField
- fecha_edicion: DateTimeField
```

## 🔌 API Endpoints

### Autenticación
```
POST /api/auth/registro/          # Registro de usuario
POST /api/auth/login/             # Inicio de sesión (JWT)
GET  /api/auth/perfil/            # Perfil del usuario actual
GET  /api/auth/usuarios/          # Lista de usuarios (admin)
```

### Películas (TMDB Integration)
```
GET  /api/tmdb/peliculas/         # Lista de películas populares
GET  /api/tmdb/peliculas/?genero=28    # Filtrar por género
GET  /api/tmdb/peliculas/?busqueda=matrix  # Buscar películas
GET  /api/tmdb/pelicula/{id}/     # Detalles de película
GET  /api/tmdb/generos/           # Lista de géneros
```

### Carrito de Compras
```
GET    /api/carrito/              # Ver carrito actual
POST   /api/carrito/agregar/      # Agregar película
PUT    /api/carrito/item/{id}/    # Actualizar cantidad
DELETE /api/carrito/item/{id}/eliminar/  # Eliminar item
```

### Foro Comunitario
```
GET  /api/foro/temas/             # Lista de temas (público)
POST /api/foro/temas/             # Crear tema (auth)
GET  /api/foro/tema/{id}/         # Detalle de tema (público)
GET  /api/foro/tema/{id}/respuestas/  # Respuestas (público)
POST /api/foro/tema/{id}/respuestas/  # Crear respuesta (auth)
```

## 🖥️ Compatibilidad Multiplataforma

### ✅ Sistemas Operativos Soportados
- **🐧 Linux**: Ubuntu 18.04+, Debian 10+, CentOS 7+
- **🍎 macOS**: macOS 10.15+ (Catalina o superior)
- **🪟 Windows**: Windows 10/11 (con PowerShell o CMD)

### 🪟 Consideraciones Especiales para Windows

#### Activación del Entorno Virtual
```cmd
# Windows CMD
venv\Scripts\activate

# Windows PowerShell
venv\Scripts\Activate.ps1

# Si hay problemas con PowerShell, ejecutar:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Rutas de Archivos
- Usar `\` en lugar de `/` para rutas
- El script `run_project.sh` no funciona en Windows (usar instalación manual)

#### Herramientas Recomendadas para Windows
- **Terminal**: Windows Terminal (Microsoft Store)
- **Editor**: VS Code con extensiones Python y React
- **Git**: Git Bash incluido con Git for Windows

#### Solución de Problemas Comunes en Windows
```cmd
# Si pip no se reconoce
python -m pip install --upgrade pip

# Si python3 no se reconoce, usar:
python

# Para verificar versiones
python --version
node --version
npm --version
```

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: Django 4.2.7 + Django REST Framework
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **Autenticación**: JWT con SimpleJWT
- **API Externa**: The Movie Database (TMDB)
- **CORS**: django-cors-headers para integración frontend

### Frontend
- **Framework**: React 18 con Hooks
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios con interceptors
- **UI Framework**: Bootstrap 5 + CSS personalizado
- **Estado Global**: Context API + useReducer
- **Notificaciones**: Sistema custom sin dependencias externas

### Herramientas de Desarrollo
- **Gestión de Dependencias**: pip (Python) + npm (Node.js)
- **Scripts de Automatización**: Bash scripts para setup y ejecución
- **Control de Versiones**: Git con commits semánticos
- **Documentación**: Markdown con badges informativos

## 🎨 Diseño y UX

### Paleta de Colores (Netflix-inspired)
```css
--primary-red: #e50914      /* Rojo principal BlockBuster */
--dark-red: #b20710         /* Rojo oscuro para hover */
--dark-bg: #141414          /* Fondo principal */
--darker-bg: #0f0f0f        /* Fondo más oscuro */
--card-bg: #1f1f1f          /* Fondo de tarjetas */
--text-primary: #ffffff     /* Texto principal */
--text-secondary: #b3b3b3   /* Texto secundario */
--text-muted: #808080       /* Texto deshabilitado */
```

### Componentes Reutilizables
- **NotificationSystem**: Alertas elegantes sin popups
- **MovieCard**: Tarjetas de película con hover effects
- **ForumCard**: Diseño moderno para discusiones
- **AuthForms**: Formularios consistentes de autenticación

## 📊 Datos de Ejemplo

El sistema incluye datos de prueba realistas:

### Usuarios
- **3 usuarios** con perfiles completos
- **Roles diferenciados** (admin, usuarios regulares)
- **Datos personales** de ejemplo

### Películas
- **Integración TMDB**: Catálogo real de miles de películas
- **Géneros variados**: Acción, drama, comedia, terror, etc.
- **Metadatos completos**: Pósters, trailers, reparto, calificaciones

### Foro
- **4 temas de discusión** sobre películas
- **7 respuestas** distribuidas entre los temas
- **Contenido realista** sobre opiniones cinematográficas

## 🔧 Solución de Problemas

### 🪟 Problemas Comunes en Windows

#### Error: "python no se reconoce como comando"
```cmd
# Solución 1: Usar python en lugar de python3
python --version

# Solución 2: Agregar Python al PATH
# Reinstalar Python marcando "Add Python to PATH"
```

#### Error: "No se puede activar el entorno virtual"
```cmd
# PowerShell - Cambiar política de ejecución
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Alternativa - Usar CMD en lugar de PowerShell
cmd
venv\Scripts\activate
```

#### Error: "npm no se reconoce como comando"
```cmd
# Verificar instalación de Node.js
node --version

# Reinstalar Node.js desde nodejs.org si es necesario
```

### 🐧 Problemas Comunes en Linux/macOS

#### Error: "Permission denied" en run_project.sh
```bash
chmod +x run_project.sh
./run_project.sh
```

#### Error: "python3: command not found"
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# macOS
brew install python3
```

### 🌐 Problemas de Conectividad

#### Error: "CORS policy" en el navegador
- Verificar que el backend esté ejecutándose en `http://localhost:8000`
- Verificar que el frontend esté en `http://localhost:3000`
- Revisar configuración CORS en `backend/proyecto/settings.py`

#### Error: "Network Error" al cargar películas
- Verificar conexión a internet (API TMDB requiere conexión)
- Verificar que la API key de TMDB sea válida
- Revisar logs del backend para errores específicos

### 💾 Problemas de Base de Datos

#### Error: "no such table" 
```bash
# Ejecutar migraciones
python manage.py makemigrations
python manage.py migrate
```

#### Error: "database is locked"
```bash
# Cerrar todas las instancias del servidor Django
# Eliminar db.sqlite3 y volver a migrar
rm db.sqlite3
python manage.py migrate
python create_sample_data.py
```

## 🚀 Próximas Funcionalidades

- [ ] **Sistema de Favoritos**: Guardar películas preferidas
- [ ] **Recomendaciones IA**: Sugerencias personalizadas
- [ ] **Streaming Real**: Integración con servicios de video
- [ ] **Notificaciones Push**: Alertas en tiempo real
- [ ] **Modo Offline**: Funcionalidad sin conexión
- [ ] **API GraphQL**: Alternativa a REST
- [ ] **Tests Automatizados**: Cobertura completa
- [ ] **Docker**: Containerización del proyecto

## 🤝 Contribución

1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver [LICENSE](LICENSE) para más detalles.

---

**BlockBuster** - *Reviviendo la magia del cine, una película a la vez* 🎬