from django.contrib import admin
from .models import Pelicula, Genero, Carrito, ItemCarrito, Comentario

@admin.register(Genero)
class GeneroAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre',)

@admin.register(Pelicula)
class PeliculaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'genero', 'director', 'año', 'precio', 'stock', 'activo')
    list_filter = ('genero', 'año', 'activo', 'fecha_creacion')
    search_fields = ('titulo', 'director', 'descripcion')
    list_editable = ('precio', 'stock', 'activo')

@admin.register(Carrito)
class CarritoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'cantidad_items', 'total', 'fecha_actualizacion')
    readonly_fields = ('total', 'cantidad_items')

@admin.register(ItemCarrito)
class ItemCarritoAdmin(admin.ModelAdmin):
    list_display = ('carrito', 'pelicula', 'cantidad', 'subtotal')
    readonly_fields = ('subtotal',)

@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('pelicula', 'usuario', 'calificacion', 'fecha_creacion')
    list_filter = ('calificacion', 'fecha_creacion')
    search_fields = ('pelicula__titulo', 'usuario__username', 'texto')