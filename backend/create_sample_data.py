#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proyecto.settings')
django.setup()

from usuarios.models import Usuario
from productos.models import Genero, Pelicula, ForoTema, ForoRespuesta
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
    
    # Crear temas del foro
    temas_ejemplo = [
        {
            'titulo': '¿Cuál es la mejor película de superhéroes de todos los tiempos?',
            'descripcion': 'He visto muchas películas de superhéroes pero no logro decidir cuál es la mejor. ¿Qué opinan ustedes? Para mí está entre The Dark Knight y Avengers: Endgame.',
            'usuario': Usuario.objects.get(email='juan@email.com')
        },
        {
            'titulo': 'Películas que te hicieron llorar',
            'descripcion': 'Comparte esas películas que te tocaron el corazón y te sacaron lágrimas. Yo no puedo ver Coco sin llorar, especialmente la escena final.',
            'usuario': Usuario.objects.get(email='maria@email.com')
        },
        {
            'titulo': 'Recomendaciones de terror para Halloween',
            'descripcion': 'Se acerca Halloween y quiero armar una maratón de películas de terror. ¿Cuáles recomiendan que realmente den miedo?',
            'usuario': Usuario.objects.get(email='admin@admin.com')
        },
        {
            'titulo': 'Películas sobrevaloradas vs infravaloradas',
            'descripcion': '¿Hay alguna película que todos aman pero a ti no te gustó? ¿O alguna que nadie menciona pero es increíble?',
            'usuario': Usuario.objects.get(email='juan@email.com')
        }
    ]
    
    for tema_data in temas_ejemplo:
        tema, created = ForoTema.objects.get_or_create(
            titulo=tema_data['titulo'],
            defaults=tema_data
        )
        if created:
            print(f"✓ Tema del foro creado: {tema.titulo}")
    
    # Crear respuestas del foro
    respuestas_ejemplo = [
        {
            'tema': ForoTema.objects.get(titulo__contains='superhéroes'),
            'usuario': Usuario.objects.get(email='maria@email.com'),
            'contenido': 'Para mí The Dark Knight es insuperable. Heath Ledger como el Joker fue simplemente perfecto. Esa película elevó el género a otro nivel.'
        },
        {
            'tema': ForoTema.objects.get(titulo__contains='superhéroes'),
            'usuario': Usuario.objects.get(email='admin@admin.com'),
            'contenido': 'Yo voto por Spider-Man: Into the Spider-Verse. La animación es revolucionaria y la historia es emotiva. Demostró que las películas animadas pueden ser tan profundas como las de acción real.'
        },
        {
            'tema': ForoTema.objects.get(titulo__contains='llorar'),
            'usuario': Usuario.objects.get(email='juan@email.com'),
            'contenido': 'Up me destruyó en los primeros 10 minutos. Esa secuencia de la vida de Carl y Ellie es devastadora.'
        },
        {
            'tema': ForoTema.objects.get(titulo__contains='llorar'),
            'usuario': Usuario.objects.get(email='admin@admin.com'),
            'contenido': 'Forrest Gump siempre me hace llorar, especialmente cuando Jenny muere. Tom Hanks es increíble en esa película.'
        },
        {
            'tema': ForoTema.objects.get(titulo__contains='terror'),
            'usuario': Usuario.objects.get(email='maria@email.com'),
            'contenido': 'Hereditary es la película más perturbadora que he visto. No puedo quitármela de la cabeza días después de verla.'
        },
        {
            'tema': ForoTema.objects.get(titulo__contains='terror'),
            'usuario': Usuario.objects.get(email='juan@email.com'),
            'contenido': 'The Conjuring es perfecta para Halloween. Tiene sustos efectivos sin ser demasiado gore. Los Warren son personajes muy carismáticos.'
        },
        {
            'tema': ForoTema.objects.get(titulo__contains='sobrevaloradas'),
            'usuario': Usuario.objects.get(email='maria@email.com'),
            'contenido': 'Creo que Avatar está sobrevalorada. Visualmente impresionante pero la historia es muy básica. En cambio, Blade Runner 2049 está infravalorada, es una obra maestra.'
        }
    ]
    
    for resp_data in respuestas_ejemplo:
        respuesta, created = ForoRespuesta.objects.get_or_create(
            tema=resp_data['tema'],
            usuario=resp_data['usuario'],
            contenido=resp_data['contenido']
        )
        if created:
            print(f"✓ Respuesta del foro creada en: {respuesta.tema.titulo}")
    
    print("\n¡Datos de ejemplo creados exitosamente!")
    print("Puedes usar las siguientes credenciales:")
    print("Admin: admin@admin.com / admin123")
    print("Usuario: juan@email.com / password123")
    print("Usuario: maria@email.com / password123")

if __name__ == '__main__':
    create_sample_data()