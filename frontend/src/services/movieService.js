import axios from 'axios';
import cacheService from '../utils/cacheService';

class MovieService {
  constructor() {
    this.baseURL = 'http://localhost:8000/api/tmdb';
    this.cacheTTL = {
      movies: 3600000,      // 1 hour
      genres: 86400000,     // 24 hours
      details: 7200000,     // 2 hours
      search: 1800000       // 30 minutes
    };
  }

  async getMovies(params = {}) {
    const cacheKey = cacheService.generateKey('movies', params);
    const cached = cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const queryParams = new URLSearchParams(params);
      const response = await axios.get(`${this.baseURL}/peliculas/?${queryParams}`);
      
      cacheService.set(cacheKey, response.data, this.cacheTTL.movies);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  async getGenres() {
    const cacheKey = 'genres';
    const cached = cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseURL}/generos/`);
      
      cacheService.set(cacheKey, response.data, this.cacheTTL.genres);
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }

  async getMovieDetails(movieId) {
    const cacheKey = `movie_details_${movieId}`;
    const cached = cacheService.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseURL}/pelicula/${movieId}/`);
      
      cacheService.set(cacheKey, response.data, this.cacheTTL.details);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  clearCache() {
    cacheService.clear();
  }
}

export default new MovieService();