import requests
from django.conf import settings
from django.core.cache import cache
import hashlib

class TMDBService:
    BASE_URL = "https://api.themoviedb.org/3"
    IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
    
    def __init__(self):
        # API Key gratuita de TMDB - en producción usar variable de entorno
        self.api_key = "3fd2be6f0c70a2a598f084ddfb75487c"  # API key pública de ejemplo
    
    def _generate_cache_key(self, endpoint, params):
        """Generate a unique cache key for the request"""
        param_string = '&'.join([f"{k}={v}" for k, v in sorted(params.items())])
        cache_string = f"tmdb_{endpoint}_{param_string}"
        return hashlib.md5(cache_string.encode()).hexdigest()
    
    def _make_request(self, endpoint, params, cache_timeout=3600):
        """Make a cached request to TMDB API"""
        cache_key = self._generate_cache_key(endpoint, params)
        
        # Try to get from cache first
        cached_data = cache.get(cache_key)
        if cached_data:
            return cached_data
        
        # Make the API request
        url = f"{self.BASE_URL}{endpoint}"
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            # Cache the response
            cache.set(cache_key, data, cache_timeout)
            return data
        except requests.RequestException as e:
            print(f"Error en request a TMDB: {e}")
            return None
    
    def get_popular_movies(self, page=1):
        params = {
            'api_key': self.api_key,
            'language': 'es-ES',
            'page': page
        }
        return self._make_request('/movie/popular', params)
    
    def get_movies_by_genre(self, genre_id, page=1):
        params = {
            'api_key': self.api_key,
            'language': 'es-ES',
            'with_genres': genre_id,
            'page': page,
            'sort_by': 'popularity.desc'
        }
        return self._make_request('/discover/movie', params)
    
    def search_movies(self, query, page=1):
        params = {
            'api_key': self.api_key,
            'language': 'es-ES',
            'query': query,
            'page': page
        }
        # Shorter cache for search results
        return self._make_request('/search/movie', params, cache_timeout=1800)
    
    def get_movie_details(self, movie_id):
        params = {
            'api_key': self.api_key,
            'language': 'es-ES',
            'append_to_response': 'credits,videos'
        }
        # Longer cache for movie details (they rarely change)
        return self._make_request(f'/movie/{movie_id}', params, cache_timeout=7200)
    
    def get_genres(self):
        params = {
            'api_key': self.api_key,
            'language': 'es-ES'
        }
        # Very long cache for genres (they rarely change)
        return self._make_request('/genre/movie/list', params, cache_timeout=86400)
    
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