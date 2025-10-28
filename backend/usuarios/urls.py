from django.urls import path
from . import views

urlpatterns = [
    path('registro/', views.RegistroView.as_view(), name='registro'),
    path('login/', views.login_view, name='login'),
    path('usuarios/', views.UsuarioListView.as_view(), name='usuarios-list'),
    path('usuarios/<int:pk>/', views.UsuarioDetailView.as_view(), name='usuario-detail'),
    path('perfil/', views.perfil_view, name='perfil'),
]