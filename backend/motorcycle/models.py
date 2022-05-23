from django.db import models
from authentication.models import User

class Motorcycle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    make =models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    name = models.CharField(max_length=25)


