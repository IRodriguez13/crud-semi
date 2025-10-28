# 🚀 CRUD Django + React

Sistema completo de gestión de usuarios y productos desarrollado con Django REST Framework y React.

![Django](https://img.shields.io/badge/Django-4.2.7-green)
![React](https://img.shields.io/badge/React-18-blue)
![Python](https://img.shields.io/badge/Python-3.12-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## 📋 Funcionalidades

✅ **Formulario Registro de usuario** - Registro completo con validación  
✅ **Página de usuarios registrados con CRUD** - Gestión de usuarios  
✅ **API de consulta de productos** - Catálogo público con filtros  
✅ **Formulario de Ingreso** - Login con JWT authentication  
✅ **Formulario de consultas de usuarios** - Búsqueda avanzada  
✅ **Página de la empresa** - Información corporativa  

## 🚀 Instalación y Ejecución

### Opción 1: Automática (Recomendada)
```bash
git clone <tu-repositorio>
cd crud-django-react
./run_project.sh
```

### Opción 2: Manual
```bash
# Configurar proyecto
./setup_project.sh

# Ejecutar servicios
./run_project.sh
```

## 🌐 URLs del Sistema

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin

## 🔑 Credenciales de Prueba

- **Admin**: admin@admin.com / admin123
- **Usuario**: juan@email.com / password123

## 🛠️ Tecnologías

### Backend
- Django 4.2.7
- Django REST Framework
- SQLite
- JWT Authentication

### Frontend
- React 18
- React Router DOM
- Axios
- Bootstrap 5

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/              # Django REST API
│   ├── proyecto/         # Configuración
│   ├── usuarios/         # App usuarios
│   ├── productos/        # App productos
│   └── requirements.txt
├── frontend/             # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   └── package.json
├── run_project.sh        # Ejecutar proyecto
├── setup_project.sh      # Configurar proyecto
└── README.md
```

## 📖 Documentación

- [Instrucciones detalladas](INSTRUCCIONES.md)
- [Resumen del proyecto](RESUMEN_PROYECTO.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.