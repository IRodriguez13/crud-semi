import requests
from django.conf import settings

class TMDBService:
    BASE_URL = "https://api.themoviedb.org/3"
    IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
    
    def __init__(self):
        # API Key gratuita de TMDB - en producción usar variable de entorno
        self.api_key = "3fd2be6f0c70a2a598f084ddfb75487c"  # API key pública de ejemplo
    
    def get_popular_movies(self, page=1):
        url = f"{self.BASE_URL}/movie/popular"
        params = {
            'api_key': self.api_key,
            'language': 'es-ES',
            'page': page
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error al obtener películas populares: {e}")
            return None
    
    def get_movies_by_genre(self, genre_id, page=1):
        url = f"{self.BASE_URL}/discover/movie"
        params = {
            'api_key': self.api_key,
            'language': 'es-ES',
            'with_genres': genre_id,
            'page': page,
            'sort_by': 'popularity.desc'
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error al obtener películas por género: {e}")
            return None
    
    def search_movies(self, query, page=1):
        url = f"{self.BASE_URL}/search/movie"
        params = {
            'api_key': self.api_key,
            'language': 'es-ES',
            'query': query,
            'page': page
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error al buscar películas: {e}")
            return None
    
    def get_movie_details(self, movie_id):
        url = f"{self.BASE_URL}/movie/{movie_id}"
        params = {
            'api_key': self.api_key,
            'language': 'es-ES',
            'append_to_response': 'credits,videos'
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error al obtener detalles de película: {e}")
            return None
    
    def get_genres(self):
        url = f"{self.BASE_URL}/genre/movie/list"
        params = {
            'api_key': self.api_key,
            'language': 'es-ES'
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error al obtener géneros: {e}")
            return None
    
    def format_movie_data(self, movie_data):
        return {
            'id': movie_data.get('id'),
            'titulo': movie_data.get('title', 'Sin título'),
            'descripcion': movie_data.get('overview', 'Sin descripción disponible'),
            'año': movie_data.get('release_date', '')[:4] if movie_data.get('release_date') else 'N/A',
            'calificacion': round(movie_data.get('vote_average', 0), 1),
            'imagen': f"{self.IMAGE_BASE_URL}{movie_data.get('poster_path')}" if movie_data.get('poster_path') else None,
            'backdrop': f"https://image.tmdb.org/t/p/w1280{movie_data.get('backdrop_path')}" if movie_data.get('backdrop_path') else None,
            'generos': movie_data.get('genre_ids', []),
            'popularidad': movie_data.get('popularity', 0),
            'precio': self.calculate_price(movie_data.get('vote_average', 0)),
            'stock': 99
        }
    
    def calculate_price(self, rating):
        if rating >= 8.0:
            return 19.99
        elif rating >= 7.0:
            return 16.99
        elif rating >= 6.0:
            return 14.99
        elif rating >= 5.0:
            return 12.99
        else:
            return 9.99