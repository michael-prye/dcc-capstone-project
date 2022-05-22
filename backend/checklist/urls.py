from django.urls import path
from checklist import views

urlpatterns = [
    path('', views.get_checklists), # GET, POST
    #path('edit/', views.edit_checklist)
]