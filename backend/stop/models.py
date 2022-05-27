from django.db import models
from trips.models import Trip

class Stop(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    lat = models.DecimalField(max_digits=15, decimal_places=8)
    lng = models.DecimalField(max_digits=15, decimal_places=8)
    day = models.IntegerField()
    start = models.BooleanField(default=False)
    end = models.BooleanField(default=False)
    address = models.CharField(max_length=255)