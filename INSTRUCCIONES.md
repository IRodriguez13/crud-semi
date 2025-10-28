# 📋 Instrucciones de Instalación y Uso

## 🎯 Funcionalidades Implementadas

✅ **1. Formulario Registro de usuario**
- Página de registro completa con validación
- Campos: username, email, password, nombre, apellido, teléfono, fecha nacimiento, dirección

✅ **2. Página de usuarios registrados con CRUD**
- Lista de usuarios con opciones de eliminar
- Funcionalidad de edición (base implementada)
- Acceso protegido por autenticación

✅ **3. API de consulta de productos**
- Endpoint público para listar productos
- Filtrado por categorías
- Información completa de productos

✅ **4. Formulario de Ingreso (Login)**
- Autenticación con JWT
- Validación de credenciales
- Redirección automática

✅ **5. Formulario de consultas de usuarios**
- Búsqueda por nombre, email, username
- Resultados filtrados en tiempo real
- Acceso protegido

✅ **6. Página de la empresa**
- Información corporativa
- Misión, visión, valores
- Datos de contacto

## 🚀 Instalación y Ejecución

### Opción 1: Ejecutar todo automáticamente
```bash
./run_project.sh
```

### Opción 2: Configurar primero, luego ejecutar
```bash
./setup_project.sh
./run_project.sh
```

### Opción 3: Manual (dos terminales)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Instalación Manual Completa

#### Backend (Django)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install setuptools
pip install -r requirements.txt
python manage.py makemigrations usuarios productos
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

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin

## 🔑 Credenciales de Prueba

- **Administrador**: admin@admin.com / admin123
- **Usuario 1**: juan@email.com / password123
- **Usuario 2**: maria@email.com / password123

## 📡 Endpoints de la API

### Autenticación
- `POST /api/auth/registro/` - Registro de usuario
- `POST /api/auth/login/` - Inicio de sesión
- `GET /api/auth/perfil/` - Perfil del usuario actual
- `GET /api/auth/usuarios/` - Lista de usuarios (requiere auth)
- `DELETE /api/auth/usuarios/{id}/` - Eliminar usuario (requiere auth)

### Productos
- `GET /api/productos/` - Lista de productos (público)
- `GET /api/productos/{id}/` - Detalle de producto (público)
- `GET /api/productos/categorias/` - Lista de categorías (público)

## 🎨 Características del Frontend

### Componentes Principales
- **Navbar**: Navegación responsiva con autenticación
- **AuthContext**: Manejo global del estado de autenticación
- **Páginas protegidas**: Acceso controlado por autenticación

### Funcionalidades
- Autenticación JWT con refresh tokens
- Navegación condicional según estado de login
- Formularios con validación
- Interfaz responsiva con Bootstrap 5
- Manejo de errores y estados de carga

## 🛠️ Tecnologías Utilizadas

### Backend
- Django 4.2.7
- Django REST Framework
- SQLite (base de datos)
- JWT Authentication
- CORS Headers

### Frontend
- React 18
- React Router DOM
- Axios (HTTP client)
- Bootstrap 5
- Context API para estado global

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/
│   ├── proyecto/          # Configuración Django
│   ├── usuarios/          # App de usuarios
│   ├── productos/         # App de productos
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   ├── context/       # Context API
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🔧 Desarrollo y Personalización

### Agregar nuevos campos a Usuario
1. Modificar `backend/usuarios/models.py`
2. Crear migración: `python manage.py makemigrations`
3. Aplicar migración: `python manage.py migrate`
4. Actualizar serializers y formularios

### Agregar nuevas funcionalidades
1. Crear nuevos endpoints en Django
2. Agregar componentes React correspondientes
3. Actualizar rutas en `App.js`
4. Implementar en el contexto si es necesario

## 🐛 Solución de Problemas

### Error de CORS
- Verificar que `CORS_ALLOWED_ORIGINS` incluya la URL del frontend
- Comprobar que `corsheaders` esté instalado

### Error de autenticación
- Verificar que el token JWT no haya expirado
- Comprobar headers de autorización en las peticiones

### Error de base de datos
- Ejecutar migraciones: `python manage.py migrate`
- Recrear base de datos si es necesario

## 📈 Próximas Mejoras

- [ ] Edición completa de usuarios
- [ ] Paginación en listas
- [ ] Subida de imágenes para productos
- [ ] Filtros avanzados
- [ ] Notificaciones en tiempo real
- [ ] Tests unitarios
- [ ] Documentación de API con Swagger