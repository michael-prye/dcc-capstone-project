from django.urls import path
from luggage import views

urlpatterns = [
    path('', views.get_luggage)
]