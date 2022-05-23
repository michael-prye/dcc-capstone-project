from django.urls import path
from motorcycle import views

urlpatterns = [
    path('', views.get_motorcycle)
]