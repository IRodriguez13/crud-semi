from rest_framework import serializers
from .models import Pelicula, Genero, Carrito, ItemCarrito, Comentario, ForoTema, ForoRespuesta

class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'

class PeliculaSerializer(serializers.ModelSerializer):
    genero_nombre = serializers.CharField(source='genero.nombre', read_only=True)
    promedio_calificacion = serializers.SerializerMethodField()
    total_comentarios = serializers.SerializerMethodField()
    
    class Meta:
        model = Pelicula
        fields = ['id', 'titulo', 'descripcion', 'precio', 'genero', 'genero_nombre',
                 'director', 'año', 'duracion', 'calificacion', 'stock', 'imagen', 
                 'trailer_url', 'activo', 'fecha_creacion', 'promedio_calificacion', 'total_comentarios']
    
    def get_promedio_calificacion(self, obj):
        comentarios = obj.comentarios.all()
        if comentarios:
            return round(sum(c.calificacion for c in comentarios) / len(comentarios), 1)
        return 0
    
    def get_total_comentarios(self, obj):
        return obj.comentarios.count()

class ComentarioSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)
    
    class Meta:
        model = Comentario
        fields = ['id', 'pelicula', 'usuario', 'usuario_nombre', 'texto', 'calificacion', 'fecha_creacion']
        read_only_fields = ['usuario']

class ItemCarritoSerializer(serializers.ModelSerializer):
    pelicula_titulo = serializers.CharField(source='pelicula.titulo', read_only=True)
    pelicula_precio = serializers.DecimalField(source='pelicula.precio', max_digits=10, decimal_places=2, read_only=True)
    pelicula_imagen = serializers.ImageField(source='pelicula.imagen', read_only=True)
    subtotal = serializers.ReadOnlyField()
    
    class Meta:
        model = ItemCarrito
        fields = ['id', 'pelicula', 'pelicula_titulo', 'pelicula_precio', 'pelicula_imagen', 
                 'cantidad', 'subtotal', 'fecha_agregado']

class CarritoSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(many=True, read_only=True)
    total = serializers.ReadOnlyField()
    cantidad_items = serializers.ReadOnlyField()
    
    class Meta:
        model = Carrito
        fields = ['id', 'usuario', 'items', 'total', 'cantidad_items', 'fecha_creacion', 'fecha_actualizacion']

class ForoRespuestaSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)
    
    class Meta:
        model = ForoRespuesta
        fields = ['id', 'tema', 'usuario', 'usuario_nombre', 'contenido', 'fecha_creacion', 'editado', 'fecha_edicion']
        read_only_fields = ['tema', 'usuario', 'editado', 'fecha_edicion']

class ForoTemaSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)
    total_respuestas = serializers.ReadOnlyField()
    ultima_respuesta = serializers.SerializerMethodField()
    
    class Meta:
        model = ForoTema
        fields = ['id', 'titulo', 'descripcion', 'usuario', 'usuario_nombre', 'fecha_creacion', 
                 'activo', 'total_respuestas', 'ultima_respuesta']
        read_only_fields = ['usuario']
    

# Mostrar la respuesta del usuario.
    def get_ultima_respuesta(self, obj):
        ultima = obj.ultima_respuesta
        if ultima:
            return {
                'usuario': ultima.usuario.username,
                'fecha': ultima.fecha_creacion
            }
        return None