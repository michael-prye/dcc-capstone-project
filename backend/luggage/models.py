from django.db import models
from trips.models import Trip

class Luggage(models.Model):
    name = models.CharField(max_length=25)
    trip = models.ForeignKey(Trip, on_delete=models.PROTECT)