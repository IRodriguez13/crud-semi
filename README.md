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

### Opción 1: Instalación Automática (Recomendada)
```bash
git clone https://github.com/tu-usuario/blockbuster-system.git
cd blockbuster-system
chmod +x run_project.sh
./run_project.sh
```

### Opción 2: Instalación Manual

#### Backend (Django)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
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

### Usuarios de Prueba
| Rol | Email | Password | Descripción |
|-----|-------|----------|-------------|
| **Administrador** | `admin@admin.com` | `admin123` | Acceso completo al sistema |
| **Usuario Regular** | `juan@email.com` | `password123` | Usuario con datos de ejemplo |
| **Usuario Regular** | `maria@email.com` | `password123` | Usuario con datos de ejemplo |

### Funcionalidades por Rol
- **Administrador**: Gestión completa de usuarios, productos y contenido del foro
- **Usuario Regular**: Compras, participación en foro, gestión de perfil
- **Visitante**: Navegación del catálogo y lectura del foro

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