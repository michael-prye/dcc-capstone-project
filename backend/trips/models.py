from django.db import models
from authentication.models import User

class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT) 
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    
