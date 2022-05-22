from django.urls import path
from checklist_item import views

urlpatterns = [
    path('', views.get_checklist_item), # GET, POST
    
]