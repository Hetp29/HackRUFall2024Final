from django.urls import path
from .views import register, login_view
from . import views

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/login/', login_view, name='login'),
    path('api/forgot-password/', views.password_reset_request, name='password_reset_request'),
    path('api/reset-password/', views.reset_password, name='reset_password'),
]