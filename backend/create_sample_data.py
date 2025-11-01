#!/usr/bin/env python
"""
Script para crear datos de ejemplo en la base de datos
Ejecutar después de hacer las migraciones

Dummy data para la BBDD.
"""
import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proyecto.settings')
django.setup()

from usuarios.models import Usuario
from productos.models import Categoria, Producto
from decimal import Decimal

def create_sample_data():    
    # Crear superusuario si no existe
    if not Usuario.objects.filter(email='admin@admin.com').exists():
        admin = Usuario.objects.create_superuser(
            username='admin',
            email='admin@admin.com',
            password='admin123',
            first_name='Administrador',
            last_name='Sistema'
        )
    
    # Crear usuarios de ejemplo
    usuarios_ejemplo = [
        {
            'username': 'juan_perez',
            'email': 'juan@email.com',
            'password': 'password123',
            'first_name': 'Juan',
            'last_name': 'Pérez',
            'telefono': '555-0001'
        },
        {
            'username': 'maria_garcia',
            'email': 'maria@email.com',
            'password': 'password123',
            'first_name': 'María',
            'last_name': 'García',
            'telefono': '555-0002'
        }
    ]
    
    for user_data in usuarios_ejemplo:
        if not Usuario.objects.filter(email=user_data['email']).exists():
            usuario = Usuario.objects.create_user(**user_data)
            print(f"✓ Usuario creado: {user_data['email']}")
    
    # Crear categorías
    categorias_ejemplo = [
        {'nombre': 'Electrónicos', 'descripcion': 'Dispositivos electrónicos y gadgets'},
        {'nombre': 'Ropa', 'descripcion': 'Vestimenta y accesorios'},
        {'nombre': 'Hogar', 'descripcion': 'Artículos para el hogar'},
        {'nombre': 'Deportes', 'descripcion': 'Equipamiento deportivo'}
    ]
    
    for cat_data in categorias_ejemplo:
        categoria, created = Categoria.objects.get_or_create(
            nombre=cat_data['nombre'],
            defaults={'descripcion': cat_data['descripcion']}
        )
        if created:
            print(f"Categoría creada: {categoria.nombre}")
    
    # Crear productos
    productos_ejemplo = [
        {
            'nombre': 'Smartphone Samsung Galaxy',
            'descripcion': 'Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas',
            'precio': Decimal('699.99'),
            'categoria': Categoria.objects.get(nombre='Electrónicos'),
            'stock': 25
        },
        {
            'nombre': 'Laptop Dell Inspiron',
            'descripcion': 'Laptop con procesador Intel i5, 8GB RAM, 256GB SSD',
            'precio': Decimal('899.99'),
            'categoria': Categoria.objects.get(nombre='Electrónicos'),
            'stock': 15
        },
        {
            'nombre': 'Camiseta Nike Dri-FIT',
            'descripcion': 'Camiseta deportiva de alta calidad con tecnología Dri-FIT',
            'precio': Decimal('29.99'),
            'categoria': Categoria.objects.get(nombre='Deportes'),
            'stock': 50
        },
        {
            'nombre': 'Sofá 3 Plazas',
            'descripcion': 'Sofá cómodo de 3 plazas en color gris',
            'precio': Decimal('599.99'),
            'categoria': Categoria.objects.get(nombre='Hogar'),
            'stock': 8
        },
        {
            'nombre': 'Jeans Levi\'s 501',
            'descripcion': 'Jeans clásicos de corte recto',
            'precio': Decimal('79.99'),
            'categoria': Categoria.objects.get(nombre='Ropa'),
            'stock': 30
        }
    ]
    
    for prod_data in productos_ejemplo:
        producto, created = Producto.objects.get_or_create(
            nombre=prod_data['nombre'],
            defaults=prod_data
        )
        if created:
            print(f"✓ Producto creado: {producto.nombre}")
    
    print("\n¡Datos de ejemplo creados exitosamente!")
    print("Puedes usar las siguientes credenciales:")
    print("Admin: admin@admin.com / admin123")
    print("Usuario: juan@email.com / password123")
    print("Usuario: maria@email.com / password123")

if __name__ == '__main__':
    create_sample_data()