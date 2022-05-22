from django.urls import path
from checklist import views

urlpatterns = [
    path('', views.get_checklists), # GET, POST, PUT, DELETE
]