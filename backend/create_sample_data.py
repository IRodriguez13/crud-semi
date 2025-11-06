#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proyecto.settings')
django.setup()

from usuarios.models import Usuario
from productos.models import Genero, Pelicula
from decimal import Decimal

def create_sample_data():
    print("Creando datos de ejemplo...")
    
    if not Usuario.objects.filter(email='admin@admin.com').exists():
        admin = Usuario.objects.create_superuser(
            username='admin',
            email='admin@admin.com',
            password='admin123',
            first_name='Administrador',
            last_name='Sistema'
        )
        print("✓ Superusuario creado: admin@admin.com / admin123")
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
    generos_ejemplo = [
        {'nombre': 'Acción', 'descripcion': 'Películas llenas de adrenalina y aventura'},
        {'nombre': 'Comedia', 'descripcion': 'Películas divertidas y entretenidas'},
        {'nombre': 'Drama', 'descripcion': 'Historias emotivas y profundas'},
        {'nombre': 'Terror', 'descripcion': 'Películas de miedo y suspenso'},
        {'nombre': 'Ciencia Ficción', 'descripcion': 'Futurismo y tecnología avanzada'},
        {'nombre': 'Romance', 'descripcion': 'Historias de amor y relaciones'}
    ]
    
    for gen_data in generos_ejemplo:
        genero, created = Genero.objects.get_or_create(
            nombre=gen_data['nombre'],
            defaults={'descripcion': gen_data['descripcion']}
        )
        if created:
            print(f"✓ Género creado: {genero.nombre}")
    peliculas_ejemplo = [
        {
            'titulo': 'Avengers: Endgame',
            'descripcion': 'Los Vengadores se unen para derrotar a Thanos en esta épica conclusión.',
            'precio': Decimal('19.99'),
            'genero': Genero.objects.get(nombre='Acción'),
            'director': 'Anthony y Joe Russo',
            'año': 2019,
            'duracion': 181,
            'calificacion': 'PG-13',
            'stock': 50
        },
        {
            'titulo': 'The Matrix',
            'descripcion': 'Un programador descubre la verdad sobre la realidad en este clásico de ciencia ficción.',
            'precio': Decimal('14.99'),
            'genero': Genero.objects.get(nombre='Ciencia Ficción'),
            'director': 'Lana y Lilly Wachowski',
            'año': 1999,
            'duracion': 136,
            'calificacion': 'R',
            'stock': 30
        },
        {
            'titulo': 'Titanic',
            'descripcion': 'Una historia de amor épica ambientada en el famoso barco.',
            'precio': Decimal('16.99'),
            'genero': Genero.objects.get(nombre='Romance'),
            'director': 'James Cameron',
            'año': 1997,
            'duracion': 194,
            'calificacion': 'PG-13',
            'stock': 25
        },
        {
            'titulo': 'The Hangover',
            'descripcion': 'Cuatro amigos intentan recordar una noche loca en Las Vegas.',
            'precio': Decimal('12.99'),
            'genero': Genero.objects.get(nombre='Comedia'),
            'director': 'Todd Phillips',
            'año': 2009,
            'duracion': 100,
            'calificacion': 'R',
            'stock': 40
        },
        {
            'titulo': 'It',
            'descripcion': 'Un grupo de niños enfrenta sus miedos contra un payaso malévolo.',
            'precio': Decimal('17.99'),
            'genero': Genero.objects.get(nombre='Terror'),
            'director': 'Andy Muschietti',
            'año': 2017,
            'duracion': 135,
            'calificacion': 'R',
            'stock': 35
        },
        {
            'titulo': 'Forrest Gump',
            'descripcion': 'La extraordinaria vida de un hombre simple con un gran corazón.',
            'precio': Decimal('15.99'),
            'genero': Genero.objects.get(nombre='Drama'),
            'director': 'Robert Zemeckis',
            'año': 1994,
            'duracion': 142,
            'calificacion': 'PG-13',
            'stock': 20
        }
    ]
    
    for pel_data in peliculas_ejemplo:
        pelicula, created = Pelicula.objects.get_or_create(
            titulo=pel_data['titulo'],
            defaults=pel_data
        )
        if created:
            print(f"✓ Película creada: {pelicula.titulo}")
    
    print("\n¡Datos de ejemplo creados exitosamente!")
    print("Puedes usar las siguientes credenciales:")
    print("Admin: admin@admin.com / admin123")
    print("Usuario: juan@email.com / password123")
    print("Usuario: maria@email.com / password123")

if __name__ == '__main__':
    create_sample_data()