"""drf_jwt_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/cars/', include('cars.urls')),
    path('api/checklist/', include('checklist.urls')),
    path('api/trip/', include('trips.urls')),
    path('api/list-item/', include('checklist_item.urls')),
    path('api/luggage/', include('luggage.urls')),
    path('api/luggage-item/', include('luggage_item.urls')),
    path('api/motorcycle/', include('motorcycle.urls')),
    path('api/stop/', include('stop.urls')),
]
