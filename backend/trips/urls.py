from django.urls import path
from trips import views

urlpatterns = [
    path('', views.get_trip) # GET
]