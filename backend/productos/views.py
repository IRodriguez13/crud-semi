from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Pelicula, Genero, Carrito, ItemCarrito, Comentario
from .serializers import PeliculaSerializer, GeneroSerializer, CarritoSerializer, ItemCarritoSerializer, ComentarioSerializer
from .tmdb_service import TMDBService

class PeliculaListView(generics.ListAPIView):
    queryset = Pelicula.objects.filter(activo=True)
    serializer_class = PeliculaSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        genero = self.request.query_params.get('genero')
        busqueda = self.request.query_params.get('busqueda')
        
        if genero:
            queryset = queryset.filter(genero_id=genero)
        if busqueda:
            queryset = queryset.filter(titulo__icontains=busqueda)
            
        return queryset

class PeliculaDetailView(generics.RetrieveAPIView):
    queryset = Pelicula.objects.filter(activo=True)
    serializer_class = PeliculaSerializer
    permission_classes = [AllowAny]

class GeneroListView(generics.ListAPIView):
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
@permission_classes([AllowAny])
def peliculas_tmdb(request):
    """Obtiene películas desde TMDB API"""
    tmdb = TMDBService()
    
    # Parámetros de consulta
    genero = request.query_params.get('genero')
    busqueda = request.query_params.get('busqueda')
    page = int(request.query_params.get('page', 1))
    
    try:
        if busqueda:
            # Buscar películas por título
            data = tmdb.search_movies(busqueda, page)
        elif genero:
            # Filtrar por género
            data = tmdb.get_movies_by_genre(genero, page)
        else:
            # Películas populares
            data = tmdb.get_popular_movies(page)
        
        if not data:
            return Response({'error': 'No se pudieron obtener las películas'}, 
                          status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        # Formatear datos para nuestro frontend
        peliculas_formateadas = []
        for movie in data.get('results', []):
            pelicula_data = tmdb.format_movie_data(movie)
            peliculas_formateadas.append(pelicula_data)
        
        response_data = {
            'results': peliculas_formateadas,
            'page': data.get('page', 1),
            'total_pages': data.get('total_pages', 1),
            'total_results': data.get('total_results', 0)
        }
        
        return Response(response_data)
        
    except Exception as e:
        return Response({'error': f'Error interno: {str(e)}'}, 
                       status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def generos_tmdb(request):
    """Obtiene géneros desde TMDB API"""
    tmdb = TMDBService()
    
    try:
        data = tmdb.get_genres()
        if not data:
            return Response({'error': 'No se pudieron obtener los géneros'}, 
                          status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        return Response(data.get('genres', []))
        
    except Exception as e:
        return Response({'error': f'Error interno: {str(e)}'}, 
                       status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def pelicula_tmdb_detail(request, movie_id):
    """Obtiene detalles de una película desde TMDB"""
    tmdb = TMDBService()
    
    try:
        data = tmdb.get_movie_details(movie_id)
        if not data:
            return Response({'error': 'Película no encontrada'}, 
                          status=status.HTTP_404_NOT_FOUND)
        
        # Formatear datos detallados
        pelicula_data = {
            'id': data.get('id'),
            'titulo': data.get('title', 'Sin título'),
            'descripcion': data.get('overview', 'Sin descripción disponible'),
            'año': data.get('release_date', '')[:4] if data.get('release_date') else 'N/A',
            'duracion': data.get('runtime', 0),
            'calificacion_tmdb': round(data.get('vote_average', 0), 1),
            'votos': data.get('vote_count', 0),
            'imagen': f"{tmdb.IMAGE_BASE_URL}{data.get('poster_path')}" if data.get('poster_path') else None,
            'backdrop': f"https://image.tmdb.org/t/p/w1280{data.get('backdrop_path')}" if data.get('backdrop_path') else None,
            'generos': [g['name'] for g in data.get('genres', [])],
            'director': next((crew['name'] for crew in data.get('credits', {}).get('crew', []) 
                            if crew['job'] == 'Director'), 'Desconocido'),
            'reparto': [actor['name'] for actor in data.get('credits', {}).get('cast', [])[:5]],
            'trailer': next((video['key'] for video in data.get('videos', {}).get('results', []) 
                           if video['type'] == 'Trailer' and video['site'] == 'YouTube'), None),
            'precio': tmdb.calculate_price(data.get('vote_average', 0)),
            'stock': 99
        }
        
        return Response(pelicula_data)
        
    except Exception as e:
        return Response({'error': f'Error interno: {str(e)}'}, 
                       status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def carrito_view(request):
    carrito, created = Carrito.objects.get_or_create(usuario=request.user)
    serializer = CarritoSerializer(carrito)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def agregar_al_carrito(request):
    # Verificar si es una película de TMDB o local
    tmdb_id = request.data.get('tmdb_id')
    pelicula_id = request.data.get('pelicula_id')
    cantidad = int(request.data.get('cantidad', 1))
    
    carrito, created = Carrito.objects.get_or_create(usuario=request.user)
    
    if tmdb_id:
        # Crear película temporal desde TMDB
        titulo = request.data.get('titulo', 'Película sin título')
        precio = request.data.get('precio', 9.99)
        imagen = request.data.get('imagen', '')
        
        # Buscar si ya existe una película con este TMDB ID
        pelicula, created = Pelicula.objects.get_or_create(
            titulo=titulo,
            defaults={
                'descripcion': f'Película de TMDB ID: {tmdb_id}',
                'precio': precio,
                'genero': Genero.objects.first() or Genero.objects.create(nombre='General'),
                'director': 'Desconocido',
                'año': 2023,
                'duracion': 120,
                'stock': 99,
                'activo': True
            }
        )
    else:
        # Película local
        pelicula = get_object_or_404(Pelicula, id=pelicula_id, activo=True)
    
    item, created = ItemCarrito.objects.get_or_create(
        carrito=carrito,
        pelicula=pelicula,
        defaults={'cantidad': cantidad}
    )
    
    if not created:
        item.cantidad += cantidad
        item.save()
    
    return Response({'message': 'Película agregada al carrito'}, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def actualizar_item_carrito(request, item_id):
    item = get_object_or_404(ItemCarrito, id=item_id, carrito__usuario=request.user)
    cantidad = int(request.data.get('cantidad', 1))
    
    if cantidad > 0:
        item.cantidad = cantidad
        item.save()
        return Response({'message': 'Cantidad actualizada'})
    else:
        item.delete()
        return Response({'message': 'Item eliminado del carrito'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_del_carrito(request, item_id):
    item = get_object_or_404(ItemCarrito, id=item_id, carrito__usuario=request.user)
    item.delete()
    return Response({'message': 'Item eliminado del carrito'})

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def comentarios_pelicula(request, pelicula_id):
    pelicula = get_object_or_404(Pelicula, id=pelicula_id)
    
    if request.method == 'GET':
        comentarios = pelicula.comentarios.all()
        serializer = ComentarioSerializer(comentarios, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ComentarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(usuario=request.user, pelicula=pelicula)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def comentario_detail(request, comentario_id):
    comentario = get_object_or_404(Comentario, id=comentario_id, usuario=request.user)
    
    if request.method == 'PUT':
        serializer = ComentarioSerializer(comentario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        comentario.delete()
        return Response({'message': 'Comentario eliminado'})