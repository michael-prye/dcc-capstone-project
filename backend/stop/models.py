from django.db import models
from trips.models import Trip

class Stop(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    name = models.CharField(max_length=25)
    description = models.CharField(max_length=255)
    latitude = models.IntegerField()
    longitude = models.IntegerField()
    day = models.IntegerField()
    start = models.BooleanField(default=False)
    end = models.BooleanField(default=False)
    address = models.CharField(max_length=255)