from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Genero(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    
    def __str__(self):
        return self.nombre

class Pelicula(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    genero = models.ForeignKey(Genero, on_delete=models.CASCADE)
    director = models.CharField(max_length=200)
    año = models.IntegerField()
    duracion = models.IntegerField(help_text="Duración en minutos")
    calificacion = models.CharField(max_length=10, default="PG-13")
    stock = models.IntegerField(default=0)
    imagen = models.ImageField(upload_to='peliculas/', blank=True, null=True)
    trailer_url = models.URLField(blank=True)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.titulo

class Carrito(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Carrito de {self.usuario.username}"
    
    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())
    
    @property
    def cantidad_items(self):
        return sum(item.cantidad for item in self.items.all())

class ItemCarrito(models.Model):
    carrito = models.ForeignKey(Carrito, related_name='items', on_delete=models.CASCADE)
    pelicula = models.ForeignKey(Pelicula, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    fecha_agregado = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('carrito', 'pelicula')
    
    def __str__(self):
        return f"{self.cantidad}x {self.pelicula.titulo}"
    
    @property
    def subtotal(self):
        return self.cantidad * self.pelicula.precio

class Comentario(models.Model):
    pelicula = models.ForeignKey(Pelicula, related_name='comentarios', on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    calificacion = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('pelicula', 'usuario')
        ordering = ['-fecha_creacion']
    
    def __str__(self):
        return f"{self.usuario.username} - {self.pelicula.titulo} ({self.calificacion}/5)"