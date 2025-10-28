from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProductoListView.as_view(), name='productos-list'),
    path('<int:pk>/', views.ProductoDetailView.as_view(), name='producto-detail'),
    path('categorias/', views.CategoriaListView.as_view(), name='categorias-list'),
]