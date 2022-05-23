from django.urls import path
from stop import views

urlpatterns = [
    path('', views.get_stop)
]