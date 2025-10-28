from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Producto, Categoria
from .serializers import ProductoSerializer, CategoriaSerializer

class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

class ProductoDetailView(generics.RetrieveAPIView):
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]