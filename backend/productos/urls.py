from django.urls import path
from . import views

urlpatterns = [
    # APIs locales (base de datos)
    path('peliculas/', views.PeliculaListView.as_view(), name='peliculas-list'),
    path('peliculas/<int:pk>/', views.PeliculaDetailView.as_view(), name='pelicula-detail'),
    path('generos/', views.GeneroListView.as_view(), name='generos-list'),
    
    # APIs TMDB (externas)
    path('tmdb/peliculas/', views.peliculas_tmdb, name='peliculas-tmdb'),
    path('tmdb/generos/', views.generos_tmdb, name='generos-tmdb'),
    path('tmdb/pelicula/<int:movie_id>/', views.pelicula_tmdb_detail, name='pelicula-tmdb-detail'),
    
    # Carrito
    path('carrito/', views.carrito_view, name='carrito'),
    path('carrito/agregar/', views.agregar_al_carrito, name='agregar-carrito'),
    path('carrito/item/<int:item_id>/', views.actualizar_item_carrito, name='actualizar-item'),
    path('carrito/item/<int:item_id>/eliminar/', views.eliminar_del_carrito, name='eliminar-item'),
    
    # Comentarios
    path('peliculas/<int:pelicula_id>/comentarios/', views.comentarios_pelicula, name='comentarios-pelicula'),
    path('comentarios/<int:comentario_id>/', views.comentario_detail, name='comentario-detail'),
    
    # Foro
    path('foro/temas/', views.foro_temas, name='foro-temas'),
    path('foro/tema/<int:tema_id>/', views.foro_tema_detail, name='foro-tema-detail'),
    path('foro/tema/<int:tema_id>/respuestas/', views.foro_respuestas, name='foro-respuestas'),
    path('foro/respuesta/<int:respuesta_id>/', views.foro_respuesta_detail, name='foro-respuesta-detail'),
]