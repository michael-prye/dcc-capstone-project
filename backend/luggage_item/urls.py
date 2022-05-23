from django.urls import path
from luggage_item import views

urlpatterns = [
    path('', views.get_luggage_items)
]