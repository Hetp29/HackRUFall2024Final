# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from website import views

urlpatterns = [
    path('', views.Home, name='home'),
    path('register/', views.register, name='register'),
    path('api/register/', views.register, name='api-register'),
    path('admin/', admin.site.urls),
    path('api/forgot-password/', views.password_reset_request, name='password_reset_request'),
    path('api/reset-password/', views.reset_password, name='reset_password'),
    path('contacts/', include('contacts.urls')),
    path('emails/', include('emails.urls')),
    path('analytics/', include('analytics.urls')),  # Include analytics app URLs here
    path('', include('website.urls')),
]
